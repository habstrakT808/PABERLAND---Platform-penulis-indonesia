// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

/**
 * Upload image to Supabase Storage and return the file path (NOT signed URL)
 * @param file File object
 * @param folder string folder name (e.g. 'portfolio-covers')
 * @returns file path string or null
 */
export async function uploadImageToStorage(file: File, folder: string = 'portfolio-covers'): Promise<string | null> {
  if (!file) {
    console.error('uploadImageToStorage: No file provided');
    return null;
  }
  
  console.log('uploadImageToStorage: Starting upload for file:', file.name);
  console.log('uploadImageToStorage: File size:', file.size, 'bytes');
  console.log('uploadImageToStorage: File type:', file.type);
  
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 8)}.${fileExt}`;
  const filePath = `${folder}/${fileName}`;
  
  console.log('uploadImageToStorage: Generated file path:', filePath);

  try {
    const { data, error } = await supabase.storage.from('images').upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });
    
    if (error) {
      console.error('uploadImageToStorage: Upload error:', error);
      return null;
    }
    
    if (!data) {
      console.error('uploadImageToStorage: No data returned from upload');
      return null;
    }
    
    console.log('uploadImageToStorage: Upload successful, data:', data);
    
    // Verify file exists after upload
    const { data: listData, error: listError } = await supabase.storage.from('images').list(folder);
    if (listError) {
      console.error('uploadImageToStorage: Error listing files after upload:', listError);
    } else {
      console.log('uploadImageToStorage: Files in folder after upload:', listData);
      const fileExists = listData?.some(f => f.name === fileName);
      console.log('uploadImageToStorage: File exists after upload:', fileExists);
    }
    
    // Return filePath
    console.log('uploadImageToStorage: Returning file path:', filePath);
    return filePath;
  } catch (error) {
    console.error('uploadImageToStorage: Unexpected error:', error);
    return null;
  }
}

/**
 * Get signed URL for an existing image in storage
 * @param filePath string path to the image (e.g. 'portfolio-covers/filename.jpg')
 * @param expiresIn number of seconds until URL expires (default: 1 hour)
 * @returns signed URL string or null
 */
export async function getSignedImageUrl(filePath: string, expiresIn: number = 3600): Promise<string | null> {
  if (!filePath) {
    console.error('getSignedImageUrl: filePath is empty');
    return null;
  }
  
  console.log('getSignedImageUrl: Attempting to get signed URL for:', filePath);
  
  try {
    const { data, error } = await supabase.storage.from('images').createSignedUrl(filePath, expiresIn);
    
    if (error) {
      console.error('getSignedImageUrl: Error creating signed URL:', error);
      console.error('getSignedImageUrl: File path was:', filePath);
      return null;
    }
    
    if (data?.signedUrl) {
      console.log('getSignedImageUrl: Successfully created signed URL');
      return data.signedUrl;
    } else {
      console.error('getSignedImageUrl: No signed URL returned');
      return null;
    }
  } catch (error) {
    console.error('getSignedImageUrl: Unexpected error:', error);
    return null;
  }
}

/**
 * Check if a file exists in storage by trying to get its URL
 * @param filePath string path to the file
 * @returns boolean
 */
export async function checkFileExists(filePath: string): Promise<boolean> {
  if (!filePath) return false;
  
  try {
    console.log('checkFileExists: Checking file:', filePath);
    
    // Try to get public URL first (faster)
    const { data: publicData } = supabase.storage.from('images').getPublicUrl(filePath);
    if (publicData?.publicUrl) {
      console.log('checkFileExists: File exists (public URL):', publicData.publicUrl);
      return true;
    }
    
    // If public URL fails, try signed URL
    const { data: signedData, error: signedError } = await supabase.storage.from('images').createSignedUrl(filePath, 60);
    if (signedData?.signedUrl && !signedError) {
      console.log('checkFileExists: File exists (signed URL):', signedData.signedUrl);
      return true;
    }
    
    console.log('checkFileExists: File does not exist or no access:', filePath);
    if (signedError) {
      console.error('checkFileExists: Signed URL error:', signedError);
    }
    
    return false;
  } catch (error) {
    console.error('checkFileExists: Unexpected error:', error);
    return false;
  }
}

/**
 * List all files in a folder
 * @param folder string folder name
 * @returns array of file names
 */
export async function listFilesInFolder(folder: string): Promise<string[]> {
  try {
    const { data, error } = await supabase.storage.from('images').list(folder);
    
    if (error) {
      console.error('listFilesInFolder: Error listing files:', error);
      return [];
    }
    
    const fileNames = data?.map(file => `${folder}/${file.name}`) || [];
    console.log('listFilesInFolder: Files in', folder, ':', fileNames);
    return fileNames;
  } catch (error) {
    console.error('listFilesInFolder: Unexpected error:', error);
    return [];
  }
}

/**
 * Check if bucket exists and is accessible
 * @param bucketName string
 * @returns boolean
 */
export async function checkBucketExists(bucketName: string): Promise<boolean> {
  try {
    console.log('checkBucketExists: Checking bucket:', bucketName);
    
    const { data, error } = await supabase.storage.listBuckets();
    
    if (error) {
      console.error('checkBucketExists: Error listing buckets:', error);
      return false;
    }
    
    const bucketExists = data?.some(bucket => bucket.name === bucketName);
    console.log('checkBucketExists: Bucket exists:', bucketExists);
    console.log('checkBucketExists: Available buckets:', data?.map(b => b.name));
    
    return bucketExists || false;
  } catch (error) {
    console.error('checkBucketExists: Unexpected error:', error);
    return false;
  }
}

/**
 * Test upload with a small file to verify bucket permissions
 * @param bucketName string
 * @returns boolean
 */
export async function testBucketUpload(bucketName: string): Promise<boolean> {
  try {
    console.log('testBucketUpload: Testing upload to bucket:', bucketName);
    
    // Create a small test file
    const testContent = 'test';
    const testFile = new File([testContent], 'test.txt', { type: 'text/plain' });
    
    const { data, error } = await supabase.storage.from(bucketName).upload('test.txt', testFile, {
      upsert: true
    });
    
    if (error) {
      console.error('testBucketUpload: Upload test failed:', error);
      return false;
    }
    
    console.log('testBucketUpload: Upload test successful:', data);
    
    // Clean up test file
    await supabase.storage.from(bucketName).remove(['test.txt']);
    
    return true;
  } catch (error) {
    console.error('testBucketUpload: Unexpected error:', error);
    return false;
  }
}

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

export interface PortfolioWork {
  id: string;
  author_id: string;
  title: string;
  description: string | null;
  category: string;
  genre: string | null;
  year_created: number | null;
  status: 'published' | 'unpublished' | 'in_progress' | 'completed';
  publisher: string | null;
  isbn: string | null;
  cover_image: string | null;
  external_link: string | null;
  awards: string[] | null;
  tags: string[] | null;
  created_at: string;
  updated_at: string;
  // Joined data
  profiles?: {
    id: string;
    full_name: string;
    avatar_url: string | null;
  };
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
// ARTICLE MANAGEMENT HELPERS
// ==============================

export const articleManagement = {
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
      .select('*', { count: 'exact' })
      .eq('author_id', userId);

    // Apply filters
    if (search) {
      query = query.ilike('title', `%${search}%`);
    }
    if (category && category !== 'all') {
      query = query.eq('category', category);
    }
    if (status && status !== 'all') {
      query = query.eq('published', status === 'published');
    }

    // Apply pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to).order('created_at', { ascending: false });

    const { data, error, count } = await query;

    if (error) {
      console.error('Error fetching user articles:', error);
      throw error;
    }

    return {
      articles: data || [],
      totalCount: count || 0,
      totalPages: Math.ceil((count || 0) / limit)
    };
  },

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

    return { success: true, data, error: undefined };
  },

  async deleteArticle(articleId: string, userId: string) {
    const { error } = await supabase
      .from('articles')
      .delete()
      .eq('id', articleId)
      .eq('author_id', userId);

    if (error) {
      console.error('Error deleting article:', error);
      throw error;
    }

    return { success: true };
  },

  async togglePublishStatus(articleId: string, userId: string, published: boolean) {
    const { error } = await supabase
      .from('articles')
      .update({
        published,
        updated_at: new Date().toISOString()
      })
      .eq('id', articleId)
      .eq('author_id', userId);

    if (error) {
      console.error('Error toggling publish status:', error);
      throw error;
    }

    return { success: true };
  },

  async getUserStats(userId: string) {
    // Get total articles
    const { count: totalArticles } = await supabase
      .from('articles')
      .select('*', { count: 'exact', head: true })
      .eq('author_id', userId);

    // Get published articles
    const { count: publishedArticles } = await supabase
      .from('articles')
      .select('*', { count: 'exact', head: true })
      .eq('author_id', userId)
      .eq('published', true);

    // Get draft articles
    const { count: draftArticles } = await supabase
      .from('articles')
      .select('*', { count: 'exact', head: true })
      .eq('author_id', userId)
      .eq('published', false);

    // Get total views, likes, and comments
    const { data: articles } = await supabase
      .from('articles')
      .select('views, likes_count, comments_count')
      .eq('author_id', userId)
      .eq('published', true);

    const totalViews = articles?.reduce((sum, article) => sum + (article.views || 0), 0) || 0;
    const totalLikes = articles?.reduce((sum, article) => sum + (article.likes_count || 0), 0) || 0;
    const totalComments = articles?.reduce((sum, article) => sum + (article.comments_count || 0), 0) || 0;

    return {
      totalArticles: totalArticles || 0,
      publishedArticles: publishedArticles || 0,
      draftArticles: draftArticles || 0,
      totalViews,
      totalLikes,
      totalComments
    };
  }
};

// ==============================
// ARTICLE HELPERS
// ==============================

export const articleHelpers = {
  async getArticle(identifier: string): Promise<Article | null> {
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
      .eq('slug', identifier)
      .eq('published', true)
      .single();

    if (error) {
      console.error('Error fetching article:', error);
      return null;
    }

    return data;
  },

  // Increment view count with improved error handling
  async incrementViews(articleId: string): Promise<void> {
    try {
      // Use manual increment approach for reliability
      await this.manualIncrementViews(articleId);
    } catch (error) {
      console.error('Unexpected error in incrementViews:', error);
    }
  },

  // Manual increment as fallback
  async manualIncrementViews(articleId: string): Promise<void> {
    try {
      console.log(`Starting manual increment for article ${articleId}`);
      
      // Get current views
      const { data, error: fetchError } = await supabase
        .from('articles')
        .select('views, title')
        .eq('id', articleId)
        .single();

      if (fetchError) {
        console.error('Error fetching views:', fetchError);
        return;
      }

      const currentViews = data?.views || 0;
      const newViews = currentViews + 1;
      const articleTitle = data?.title || 'Unknown';
      
      console.log(`Article "${articleTitle}" (${articleId}): Current views = ${currentViews}, New views = ${newViews}`);

      // Increment views
      const { error } = await supabase
        .from('articles')
        .update({ 
          views: newViews,
          updated_at: new Date().toISOString()
        })
        .eq('id', articleId);

      if (error) {
        console.error('Error in manual increment views:', error);
        console.error('Error details:', {
          articleId,
          currentViews,
          newViews,
          error: error.message
        });
      } else {
        console.log(`✅ Successfully incremented views for article "${articleTitle}" (${articleId}) from ${currentViews} to ${newViews}`);
      }
    } catch (error) {
      console.error('Unexpected error in manualIncrementViews:', error);
      console.error('Error details:', {
        articleId,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  },

  // Get total views for statistics
  async getTotalViews(): Promise<number> {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('views')
        .eq('published', true);

      if (error) {
        console.error('Error fetching total views:', error);
        return 0;
      }

      const totalViews = data?.reduce((sum, article) => sum + (article.views || 0), 0) || 0;
      return totalViews;
    } catch (error) {
      console.error('Unexpected error in getTotalViews:', error);
      return 0;
    }
  },

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

    // Process profiles data to match ArticleSummary interface
    return (data || []).map((item: any) => ({
      ...item,
      profiles: Array.isArray(item.profiles) ? item.profiles[0] : item.profiles
    }));
  },

  async getAuthorArticles(authorId: string, currentArticleId: string, limit: number = 3): Promise<ArticleSummary[]> {
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
      .eq('author_id', authorId)
      .eq('published', true)
      .neq('id', currentArticleId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching author articles:', error);
      return [];
    }

    // Process profiles data to match ArticleSummary interface
    return (data || []).map((item: any) => ({
      ...item,
      profiles: Array.isArray(item.profiles) ? item.profiles[0] : item.profiles
    }));
  },

  calculateReadingTime(content: string): number {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  },

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  },

  formatRelativeTime(dateString: string): string {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return 'Baru saja';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} menit yang lalu`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} jam yang lalu`;
    } else if (diffInSeconds < 2592000) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} hari yang lalu`;
    } else {
      return this.formatDate(dateString);
    }
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

  // Update article comment count in real-time
  async updateArticleCommentCount(articleId: string): Promise<void> {
    try {
      const { count, error: countError } = await supabase
        .from('comments')
        .select('*', { count: 'exact', head: true })
        .eq('article_id', articleId);
      
      if (countError) {
        console.error('Error counting comments:', countError);
        return;
      }

      const { error } = await supabase
        .from('articles')
        .update({ 
          comments_count: count || 0,
          updated_at: new Date().toISOString()
        })
        .eq('id', articleId);

      if (error) {
        console.error('Error updating article comment count:', error);
      }
    } catch (error) {
      console.error('Unexpected error updating comment count:', error);
    }
  },

  // Enhanced add comment with real-time count update
  async addComment(articleId: string, authorId: string, content: string, parentId?: string) {
    try {
      const { data, error } = await supabase
        .from('comments')
        .insert([{
          article_id: articleId,
          author_id: authorId,
          content: content.trim(),
          parent_id: parentId || null,
        }])
        .select()
        .single();

      if (error) {
        console.error('Error adding comment:', error);
        return { success: false, error: error.message };
      }

      // Update article comment count in real-time
      await this.updateArticleCommentCount(articleId);

      return { success: true, data };
    } catch (error) {
      console.error('Unexpected error adding comment:', error);
      return { success: false, error: 'Terjadi kesalahan saat menambahkan komentar' };
    }
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

  // Enhanced delete comment with real-time count update
  async deleteComment(commentId: string, authorId: string) {
    try {
      // Get article ID before deleting
      const { data: comment, error: fetchError } = await supabase
        .from('comments')
        .select('article_id')
        .eq('id', commentId)
        .eq('author_id', authorId)
        .single();

      if (fetchError) {
        console.error('Error fetching comment for deletion:', fetchError);
        return { success: false, error: 'Komentar tidak ditemukan' };
      }

      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', commentId)
        .eq('author_id', authorId);

      if (error) {
        console.error('Error deleting comment:', error);
        return { success: false, error: error.message };
      }

      // Update article comment count in real-time
      if (comment?.article_id) {
        await this.updateArticleCommentCount(comment.article_id);
      }

      return { success: true };
    } catch (error) {
      console.error('Unexpected error deleting comment:', error);
      return { success: false, error: 'Terjadi kesalahan saat menghapus komentar' };
    }
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

// ==============================
// PORTFOLIO WORKS SYSTEM
// ==============================

export const portfolioHelpers = {
  // Get all portfolio works for an author
  async getAuthorPortfolio(authorId: string): Promise<PortfolioWork[]> {
    const { data, error } = await supabase
      .from('portfolio_works')
      .select(`
        *,
        profiles:author_id (
          id,
          full_name,
          avatar_url
        )
      `)
      .eq('author_id', authorId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching portfolio works:', error);
      return [];
    }

    return data || [];
  },

  // Get single portfolio work
  async getPortfolioWork(workId: string): Promise<PortfolioWork | null> {
    const { data, error } = await supabase
      .from('portfolio_works')
      .select(`
        *,
        profiles:author_id (
          id,
          full_name,
          avatar_url
        )
      `)
      .eq('id', workId)
      .single();

    if (error) {
      console.error('Error fetching portfolio work:', error);
      return null;
    }

    return data;
  },

  // Create new portfolio work
  async createPortfolioWork(authorId: string, workData: Partial<PortfolioWork>) {
    const { data, error } = await supabase
      .from('portfolio_works')
      .insert([{
        author_id: authorId,
        ...workData
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating portfolio work:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  },

  // Update portfolio work
  async updatePortfolioWork(workId: string, authorId: string, updates: Partial<PortfolioWork>) {
    const { data, error } = await supabase
      .from('portfolio_works')
      .update(updates)
      .eq('id', workId)
      .eq('author_id', authorId)
      .select()
      .single();

    if (error) {
      console.error('Error updating portfolio work:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  },

  // Delete portfolio work
  async deletePortfolioWork(workId: string, authorId: string) {
    const { error } = await supabase
      .from('portfolio_works')
      .delete()
      .eq('id', workId)
      .eq('author_id', authorId);

    if (error) {
      console.error('Error deleting portfolio work:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  },

  // Get portfolio statistics for an author
  async getPortfolioStats(authorId: string) {
    const { data, error } = await supabase
      .from('portfolio_works')
      .select('status, category')
      .eq('author_id', authorId);

    if (error) {
      console.error('Error fetching portfolio stats:', error);
      return {
        total: 0,
        published: 0,
        unpublished: 0,
        inProgress: 0,
        completed: 0,
        categories: {}
      };
    }

    const stats = {
      total: data.length,
      published: data.filter(w => w.status === 'published').length,
      unpublished: data.filter(w => w.status === 'unpublished').length,
      inProgress: data.filter(w => w.status === 'in_progress').length,
      completed: data.filter(w => w.status === 'completed').length,
      categories: {} as Record<string, number>
    };

    // Count by category
    data.forEach(work => {
      stats.categories[work.category] = (stats.categories[work.category] || 0) + 1;
    });

    return stats;
  },

  // Format portfolio work date
  formatPortfolioDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  },

  // Get status label
  getStatusLabel(status: string): string {
    const labels = {
      published: '📖 Terbit',
      unpublished: '📝 Draft',
      in_progress: '🔄 Sedang Dikerjakan',
      completed: '✅ Selesai'
    };
    return labels[status as keyof typeof labels] || status;
  },

  // Get category label
  getCategoryLabel(category: string): string {
    const labels = {
      cerpen: '📖 Cerpen',
      puisi: '🎭 Puisi',
      artikel: '📰 Artikel',
      'cerita-rakyat': '🏛️ Cerita Rakyat',
      'novel-berseri': '📚 Novel Berseri',
      lainnya: '✨ Lainnya'
    };
    return labels[category as keyof typeof labels] || category;
  }
};

/**
 * Debug function to check portfolio works and their cover images
 * @param authorId string
 */
export async function debugPortfolioWorks(authorId: string) {
  try {
    console.log('=== DEBUG PORTFOLIO WORKS ===');
    
    // Get portfolio works
    const works = await portfolioHelpers.getAuthorPortfolio(authorId);
    console.log('Portfolio works:', works);
    
    // Check each work's cover_image
    for (const work of works) {
      console.log(`Work: ${work.title}`);
      console.log(`Cover image: ${work.cover_image}`);
      
      if (work.cover_image && !work.cover_image.startsWith('http')) {
        const exists = await checkFileExists(work.cover_image);
        console.log(`File exists: ${exists}`);
        
        if (!exists) {
          const folder = work.cover_image.split('/').slice(0, -1).join('/');
          const files = await listFilesInFolder(folder);
          console.log(`Files in ${folder}:`, files);
        }
      }
    }
    
    console.log('=== END DEBUG ===');
  } catch (error) {
    console.error('Debug error:', error);
  }
}

/**
 * Clean invalid cover_image URLs in portfolio works
 * @param authorId string
 */
export async function cleanInvalidCoverImages(authorId: string) {
  try {
    console.log('=== CLEANING INVALID COVER IMAGES ===');
    
    // Get portfolio works
    const works = await portfolioHelpers.getAuthorPortfolio(authorId);
    
    for (const work of works) {
      let shouldUpdate = false;
      let newCoverImage = work.cover_image;
      
      // Check if cover_image is invalid
      if (work.cover_image) {
        if (work.cover_image.startsWith('blob:') || 
            work.cover_image.includes('google.com/url') ||
            work.cover_image.includes('googleusercontent.com') ||
            work.cover_image.includes('localhost')) {
          console.log(`Cleaning invalid cover_image for work: ${work.title}`);
          newCoverImage = null;
          shouldUpdate = true;
        }
      }
      
      // Update if needed
      if (shouldUpdate) {
        const result = await portfolioHelpers.updatePortfolioWork(work.id, authorId, {
          cover_image: newCoverImage
        });
        
        if (result.success) {
          console.log(`Successfully cleaned cover_image for: ${work.title}`);
        } else {
          console.error(`Failed to clean cover_image for: ${work.title}`, result.error);
        }
      }
    }
    
    console.log('=== END CLEANING ===');
  } catch (error) {
    console.error('Clean error:', error);
  }
}