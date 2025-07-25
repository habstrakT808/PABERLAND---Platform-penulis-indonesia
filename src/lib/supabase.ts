// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types untuk TypeScript
export interface Article {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  cover_image: string | null;
  category: string;
  author_id: string;
  published: boolean;
  scheduled_at: string | null;
  slug: string;
  views: number;
  likes_count: number;
  comments_count: number;
  created_at: string;
  updated_at: string;
  // Joined data
  profiles?: {
    id: string;
    full_name: string;
    avatar_url: string | null;
    bio: string | null;
  };
}

export interface Profile {
  id: string;
  full_name: string;
  phone: string | null;
  bio: string | null;
  avatar_url: string | null;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
}

// Tambahkan tipe summary untuk artikel
export interface ArticleSummary {
  id: string;
  title: string;
  excerpt: string;
  cover_image: string | null;
  category: string;
  slug: string;
  views: number;
  likes_count: number;
  comments_count?: number;
  created_at: string;
  profiles?: {
    full_name: string;
    avatar_url: string | null;
  };
}

// ==============================
// LIKE SYSTEM TYPES & HELPERS
// ==============================

// Like System Types
export interface ArticleLike {
  id: string;
  article_id: string;
  user_id: string;
  created_at: string;
}

// Like System Helper Functions
export const likeHelpers = {
  // Check if user has liked an article
  async checkUserLike(articleId: string, userId: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('article_likes')
      .select('id')
      .eq('article_id', articleId)
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error checking user like:', error);
      return false;
    }

    return !!data;
  },

  // Toggle like status
  async toggleLike(articleId: string, userId: string): Promise<{ success: boolean; isLiked: boolean; error?: string }> {
    try {
      // First check if user has already liked
      const { data: existingLike, error: checkError } = await supabase
        .from('article_likes')
        .select('id')
        .eq('article_id', articleId)
        .eq('user_id', userId)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        console.error('Error checking existing like:', checkError);
        return { success: false, isLiked: false, error: checkError.message };
      }

      if (existingLike) {
        // Unlike - remove the like
        const { error: deleteError } = await supabase
          .from('article_likes')
          .delete()
          .eq('article_id', articleId)
          .eq('user_id', userId);

        if (deleteError) {
          console.error('Error removing like:', deleteError);
          return { success: false, isLiked: true, error: deleteError.message };
        }

        return { success: true, isLiked: false };
      } else {
        // Like - add the like
        const { error: insertError } = await supabase
          .from('article_likes')
          .insert([{
            article_id: articleId,
            user_id: userId
          }]);

        if (insertError) {
          console.error('Error adding like:', insertError);
          return { success: false, isLiked: false, error: insertError.message };
        }

        return { success: true, isLiked: true };
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      return { success: false, isLiked: false, error: 'Terjadi kesalahan sistem' };
    }
  },

  // Get article likes with user info
  async getArticleLikes(articleId: string, limit: number = 10): Promise<Array<{
    id: string;
    user_id: string;
    created_at: string;
    profiles: {
      full_name: string;
      avatar_url: string | null;
    };
  }>> {
    const { data, error } = await supabase
      .from('article_likes')
      .select(`
        id,
        user_id,
        created_at,
        profiles:user_id (
          full_name,
          avatar_url
        )
      `)
      .eq('article_id', articleId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching article likes:', error);
      return [];
    }

    return data?.map((like: any) => ({
      ...like,
      profiles: Array.isArray(like.profiles) ? like.profiles[0] : like.profiles
    })) || [];
  },

  // Get user's liked articles
  async getUserLikedArticles(userId: string, page: number = 1, limit: number = 10) {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await supabase
      .from('article_likes')
      .select(`
        created_at,
        articles:article_id (
          id,
          title,
          excerpt,
          cover_image,
          category,
          slug,
          views,
          likes_count,
          comments_count,
          created_at,
          profiles:author_id (
            id,
            full_name,
            avatar_url
          )
        )
      `, { count: 'exact' })
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) {
      console.error('Error fetching user liked articles:', error);
      return { articles: [], totalCount: 0, totalPages: 0 };
    }

    const articles = data?.map((like: any) => ({
      ...like.articles,
      liked_at: like.created_at,
      profiles: Array.isArray(like.articles?.profiles) 
        ? like.articles.profiles[0] 
        : like.articles?.profiles
    })).filter(article => article.id) || [];

    return {
      articles,
      totalCount: count || 0,
      totalPages: Math.ceil((count || 0) / limit)
    };
  }
};

// ==============================
// FOLLOW SYSTEM TYPES & HELPERS
// ==============================

export interface Follow {
  id: string;
  follower_id: string;
  following_id: string;
  created_at: string;
}

export const followHelpers = {
  // Check if user is following another user
  async checkUserFollow(followerId: string, followingId: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('follows')
      .select('id')
      .eq('follower_id', followerId)
      .eq('following_id', followingId)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error checking user follow:', error);
      return false;
    }

    return !!data;
  },

  // Toggle follow status
  async toggleFollow(followerId: string, followingId: string): Promise<{ success: boolean; isFollowing: boolean; error?: string }> {
    if (followerId === followingId) {
      return { success: false, isFollowing: false, error: 'Tidak bisa mengikuti diri sendiri' };
    }

    try {
      // Check if already following
      const { data: existingFollow, error: checkError } = await supabase
        .from('follows')
        .select('id')
        .eq('follower_id', followerId)
        .eq('following_id', followingId)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        console.error('Error checking existing follow:', checkError);
        return { success: false, isFollowing: false, error: checkError.message };
      }

      if (existingFollow) {
        // Unfollow - remove the follow
        const { error: deleteError } = await supabase
          .from('follows')
          .delete()
          .eq('follower_id', followerId)
          .eq('following_id', followingId);

        if (deleteError) {
          console.error('Error removing follow:', deleteError);
          return { success: false, isFollowing: true, error: deleteError.message };
        }

        return { success: true, isFollowing: false };
      } else {
        // Follow - add the follow
        const { error: insertError } = await supabase
          .from('follows')
          .insert([{
            follower_id: followerId,
            following_id: followingId
          }]);

        if (insertError) {
          console.error('Error adding follow:', insertError);
          return { success: false, isFollowing: false, error: insertError.message };
        }

        return { success: true, isFollowing: true };
      }
    } catch (error) {
      console.error('Error toggling follow:', error);
      return { success: false, isFollowing: false, error: 'Terjadi kesalahan sistem' };
    }
  },

  // Get user's followers with profile info
  async getUserFollowers(userId: string, limit: number = 20): Promise<Array<{
    id: string;
    follower_id: string;
    created_at: string;
    profiles: {
      id: string;
      full_name: string;
      avatar_url: string | null;
      bio: string | null;
    };
  }>> {
    const { data, error } = await supabase
      .from('follows')
      .select(`
        id,
        follower_id,
        created_at,
        profiles:follower_id (
          id,
          full_name,
          avatar_url,
          bio
        )
      `)
      .eq('following_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching followers:', error);
      return [];
    }

    return data?.map((follow: any) => ({
      ...follow,
      profiles: Array.isArray(follow.profiles) ? follow.profiles[0] : follow.profiles
    })) || [];
  },

  // Get user's following with profile info
  async getUserFollowing(userId: string, limit: number = 20): Promise<Array<{
    id: string;
    following_id: string;
    created_at: string;
    profiles: {
      id: string;
      full_name: string;
      avatar_url: string | null;
      bio: string | null;
    };
  }>> {
    const { data, error } = await supabase
      .from('follows')
      .select(`
        id,
        following_id,
        created_at,
        profiles:following_id (
          id,
          full_name,
          avatar_url,
          bio
        )
      `)
      .eq('follower_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching following:', error);
      return [];
    }

    return data?.map((follow: any) => ({
      ...follow,
      profiles: Array.isArray(follow.profiles) ? follow.profiles[0] : follow.profiles
    })) || [];
  },

  // Get follow counts for a user
  async getFollowCounts(userId: string): Promise<{ followersCount: number; followingCount: number }> {
    const [followersResult, followingResult] = await Promise.all([
      supabase
        .from('follows')
        .select('*', { count: 'exact', head: true })
        .eq('following_id', userId),
      supabase
        .from('follows')
        .select('*', { count: 'exact', head: true })
        .eq('follower_id', userId)
    ]);

    return {
      followersCount: followersResult.count || 0,
      followingCount: followingResult.count || 0
    };
  },

  // Get mutual follows (users who follow each other)
  async getMutualFollows(userId: string, otherUserId: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('follows')
      .select('id')
      .or(`and(follower_id.eq.${userId},following_id.eq.${otherUserId}),and(follower_id.eq.${otherUserId},following_id.eq.${userId})`);

    if (error) {
      console.error('Error checking mutual follows:', error);
      return false;
    }

    return (data?.length || 0) === 2;
  },

  // Get recommended users to follow (users with most followers that current user doesn't follow)
  async getRecommendedUsers(userId: string, limit: number = 5): Promise<Array<{
    id: string;
    full_name: string;
    avatar_url: string | null;
    bio: string | null;
    followersCount: number;
    articlesCount: number;
  }>> {
    // This is a complex query, we'll implement a simpler version
    const { data: profiles, error } = await supabase
      .from('profiles')
      .select(`
        id,
        full_name,
        avatar_url,
        bio
      `)
      .neq('id', userId)
      .limit(limit * 2); // Get more to filter out already followed

    if (error || !profiles) {
      console.error('Error fetching recommended users:', error);
      return [];
    }

    // Get users current user is already following
    const { data: following } = await supabase
      .from('follows')
      .select('following_id')
      .eq('follower_id', userId);

    const followingIds = new Set(following?.map(f => f.following_id) || []);

    // Filter out already followed users and get stats
    const recommendations = [];
    for (const profile of profiles) {
      if (followingIds.has(profile.id)) continue;

      // Get follow and article counts
      const [followCount, articleCount] = await Promise.all([
        supabase
          .from('follows')
          .select('*', { count: 'exact', head: true })
          .eq('following_id', profile.id),
        supabase
          .from('articles')
          .select('*', { count: 'exact', head: true })
          .eq('author_id', profile.id)
          .eq('published', true)
      ]);

      recommendations.push({
        ...profile,
        followersCount: followCount.count || 0,
        articlesCount: articleCount.count || 0
      });

      if (recommendations.length >= limit) break;
    }

    return recommendations.sort((a, b) => b.followersCount - a.followersCount);
  }
};

// ==============================
// ARTICLE HELPER FUNCTIONS
// ==============================

// Article helper functions
export const articleHelpers = {
  // Get single article by ID or slug
  async getArticle(identifier: string): Promise<Article | null> {
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(identifier);
    
    const { data, error } = await supabase
      .from('articles')
      .select(`
        *,
        profiles:author_id (
          id,
          full_name,
          avatar_url,
          bio
        )
      `)
      .eq(isUUID ? 'id' : 'slug', identifier)
      .eq('published', true)
      .single();

    if (error) {
      console.error('Error fetching article:', error);
      return null;
    }

    return data;
  },

  // Increment view count
  async incrementViews(articleId: string): Promise<void> {
    // Ambil views sekarang
    const { data, error: fetchError } = await supabase
      .from('articles')
      .select('views')
      .eq('id', articleId)
      .single();

    if (fetchError) {
      console.error('Error fetching views:', fetchError);
      return;
    }

    const { error } = await supabase
      .from('articles')
      .update({ views: (data?.views || 0) + 1 })
      .eq('id', articleId);

    if (error) {
      console.error('Error incrementing views:', error);
    }
  },

  // Get related articles (same category, exclude current)
  async getRelatedArticles(articleId: string, category: string, limit: number = 3): Promise<ArticleSummary[]> {
    const { data, error } = await supabase
      .from('articles')
      .select(`
        id,
        title,
        excerpt,
        cover_image,
        category,
        slug,
        views,
        likes_count,
        comments_count,
        created_at,
        profiles:author_id (
          full_name,
          avatar_url
        )
      `)
      .eq('category', category)
      .eq('published', true)
      .neq('id', articleId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching related articles:', error);
      return [];
    }

    // Map profiles dari array ke objek tunggal (ambil [0])
    return (data || []).map((item: any) => ({
      ...item,
      profiles: Array.isArray(item.profiles) ? item.profiles[0] : item.profiles
    }));
  },

  // Get articles by author (for author profile section)
  async getAuthorArticles(authorId: string, currentArticleId: string, limit: number = 3): Promise<ArticleSummary[]> {
    const { data, error } = await supabase
      .from('articles')
      .select(`
        id,
        title,
        excerpt,
        cover_image,
        slug,
        views,
        likes_count,
        created_at,
        category
      `)
      .eq('author_id', authorId)
      .eq('published', true)
      .neq('id', currentArticleId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching author articles:', error);
      return [];
    }

    return data || [];
  },

  // Calculate reading time
  calculateReadingTime(content: string): number {
    const wordsPerMinute = 200;
    const textContent = content.replace(/<[^>]*>/g, ''); // Remove HTML tags
    const wordCount = textContent.trim().split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  },

  // Format date
  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  },

  // Format relative time
  formatRelativeTime(dateString: string): string {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Baru saja';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} menit yang lalu`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} jam yang lalu`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} hari yang lalu`;
    
    return articleHelpers.formatDate(dateString);
  }
};

// ==============================
// ARTICLE MANAGEMENT FUNCTIONS
// ==============================

// Article management helper functions
export const articleManagement = {
  // Get user's articles with pagination
  async getUserArticles(
    userId: string, 
    page: number = 1, 
    limit: number = 10,
    search?: string,
    category?: string,
    status?: 'all' | 'published' | 'draft'
  ) {
    let query = supabase
      .from('articles')
      .select(`
        id,
        title,
        excerpt,
        cover_image,
        category,
        published,
        scheduled_at,
        slug,
        views,
        likes_count,
        comments_count,
        created_at,
        updated_at,
        content,
        author_id
      `)
      .eq('author_id', userId)
      .order('updated_at', { ascending: false });

    // Apply filters
    if (search) {
      query = query.ilike('title', `%${search}%`);
    }

    if (category && category !== 'all') {
      query = query.eq('category', category);
    }

    if (status === 'published') {
      query = query.eq('published', true);
    } else if (status === 'draft') {
      query = query.eq('published', false);
    }

    // Apply pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) {
      console.error('Error fetching user articles:', error);
      return { articles: [], totalCount: 0, totalPages: 0 };
    }

    // Get total count
    let countQuery = supabase
      .from('articles')
      .select('*', { count: 'exact', head: true })
      .eq('author_id', userId);

    if (search) {
      countQuery = countQuery.ilike('title', `%${search}%`);
    }
    if (category && category !== 'all') {
      countQuery = countQuery.eq('category', category);
    }
    if (status === 'published') {
      countQuery = countQuery.eq('published', true);
    } else if (status === 'draft') {
      countQuery = countQuery.eq('published', false);
    }

    const { count: totalCount } = await countQuery;

    return {
      articles: data || [],
      totalCount: totalCount || 0,
      totalPages: Math.ceil((totalCount || 0) / limit)
    };
  },

  // Get single article for editing (must be owned by user)
  async getArticleForEdit(articleId: string, userId: string): Promise<Article | null> {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('id', articleId)
      .eq('author_id', userId)
      .single();

    if (error) {
      console.error('Error fetching article for edit:', error);
      return null;
    }

    return data;
  },

  // Update article
  async updateArticle(articleId: string, userId: string, updates: Partial<Article>) {
    const { data, error } = await supabase
      .from('articles')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', articleId)
      .eq('author_id', userId)
      .select()
      .single();

    if (error) {
      console.error('Error updating article:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  },

  // Delete article
  async deleteArticle(articleId: string, userId: string) {
    const { error } = await supabase
      .from('articles')
      .delete()
      .eq('id', articleId)
      .eq('author_id', userId);

    if (error) {
      console.error('Error deleting article:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  },

  // Toggle publish status
  async togglePublishStatus(articleId: string, userId: string, published: boolean) {
    const { data, error } = await supabase
      .from('articles')
      .update({ 
        published,
        updated_at: new Date().toISOString()
      })
      .eq('id', articleId)
      .eq('author_id', userId)
      .select()
      .single();

    if (error) {
      console.error('Error toggling publish status:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  },

  // Get user article statistics
  async getUserStats(userId: string) {
    const { data, error } = await supabase
      .from('articles')
      .select('published, views, likes_count, comments_count')
      .eq('author_id', userId);

    if (error) {
      console.error('Error fetching user stats:', error);
      return {
        totalArticles: 0,
        publishedArticles: 0,
        draftArticles: 0,
        totalViews: 0,
        totalLikes: 0,
        totalComments: 0
      };
    }

    const stats = data.reduce((acc, article) => {
      acc.totalArticles++;
      if (article.published) {
        acc.publishedArticles++;
      } else {
        acc.draftArticles++;
      }
      acc.totalViews += article.views;
      acc.totalLikes += article.likes_count;
      acc.totalComments += article.comments_count;
      return acc;
    }, {
      totalArticles: 0,
      publishedArticles: 0,
      draftArticles: 0,
      totalViews: 0,
      totalLikes: 0,
      totalComments: 0
    });

    return stats;
  }
};

// ==============================
// COMMENT SYSTEM
// ==============================

// Comment interface
export interface Comment {
  id: string;
  article_id: string;
  author_id: string;
  content: string;
  parent_id: string | null;
  created_at: string;
  updated_at: string;
  // Joined data
  profiles?: {
    id: string;
    full_name: string;
    avatar_url: string | null;
  };
  // For nested comments
  replies?: Comment[];
  reply_count?: number;
}

// Comment helper functions
export const commentHelpers = {
  // Get comments for an article with nested structure
  async getArticleComments(articleId: string): Promise<Comment[]> {
    const { data, error } = await supabase
      .from('comments')
      .select(`
        id,
        article_id,
        author_id,
        content,
        parent_id,
        created_at,
        updated_at,
        profiles:author_id (
          id,
          full_name,
          avatar_url
        )
      `)
      .eq('article_id', articleId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching comments:', error);
      return [];
    }

    // Organize comments into nested structure
    const comments = data || [];
    const commentMap = new Map<string, Comment>();
    const rootComments: Comment[] = [];

    // First pass: create comment objects
    comments.forEach(comment => {
      const commentObj: Comment = {
        ...comment,
        profiles: Array.isArray(comment.profiles) ? comment.profiles[0] : comment.profiles,
        replies: [],
        reply_count: 0
      };
      commentMap.set(comment.id, commentObj);
    });

    // Second pass: organize into tree structure
    comments.forEach(comment => {
      const commentObj = commentMap.get(comment.id)!;
      
      if (comment.parent_id) {
        // This is a reply
        const parent = commentMap.get(comment.parent_id);
        if (parent) {
          parent.replies!.push(commentObj);
          parent.reply_count = (parent.reply_count || 0) + 1;
        }
      } else {
        // This is a root comment
        rootComments.push(commentObj);
      }
    });

    return rootComments;
  },

  // Add a new comment
  async addComment(articleId: string, authorId: string, content: string, parentId?: string) {
    const { data, error } = await supabase
      .from('comments')
      .insert([{
        article_id: articleId,
        author_id: authorId,
        content: content.trim(),
        parent_id: parentId || null
      }])
      .select(`
        id,
        article_id,
        author_id,
        content,
        parent_id,
        created_at,
        updated_at,
        profiles:author_id (
          id,
          full_name,
          avatar_url
        )
      `)
      .single();

    if (error) {
      console.error('Error adding comment:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  },

  // Update a comment
  async updateComment(commentId: string, authorId: string, content: string) {
    const { data, error } = await supabase
      .from('comments')
      .update({ 
        content: content.trim(),
        updated_at: new Date().toISOString()
      })
      .eq('id', commentId)
      .eq('author_id', authorId)
      .select(`
        id,
        article_id,
        author_id,
        content,
        parent_id,
        created_at,
        updated_at,
        profiles:author_id (
          id,
          full_name,
          avatar_url
        )
      `)
      .single();

    if (error) {
      console.error('Error updating comment:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  },

  // Delete a comment
  async deleteComment(commentId: string, authorId: string) {
    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', commentId)
      .eq('author_id', authorId);

    if (error) {
      console.error('Error deleting comment:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  },

  // Get comment count for an article
  async getCommentCount(articleId: string): Promise<number> {
    const { count, error } = await supabase
      .from('comments')
      .select('*', { count: 'exact', head: true })
      .eq('article_id', articleId);

    if (error) {
      console.error('Error getting comment count:', error);
      return 0;
    }

    return count || 0;
  },

  // Format comment date
  formatCommentDate(dateString: string): string {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Baru saja';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} menit yang lalu`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} jam yang lalu`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} hari yang lalu`;
    
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
};