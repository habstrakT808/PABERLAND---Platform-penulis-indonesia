// src/lib/supabase.ts
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Validate environment variables
if (!supabaseUrl) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable');
}

if (!supabaseAnonKey) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable');
}

console.log('🔧 Supabase Config:', {
  url: supabaseUrl,
  keyLength: supabaseAnonKey.length,
  environment: process.env.NODE_ENV
});

let globalSupabaseClient: SupabaseClient | null = null;

export const createSupabaseClient = () => createClientComponentClient()

export const getSupabaseClient = (): SupabaseClient => {
  if (typeof window !== 'undefined') {
    // Client-side: gunakan auth helpers
    return createClientComponentClient()
  } else {
    // Server-side: gunakan client biasa
    return createClient(supabaseUrl, supabaseAnonKey)
  }
}

export const supabase = getSupabaseClient();

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

  // Sync likes count for an article
  async syncLikesCount(articleId: string): Promise<number> {
    try {
      // Get real count from article_likes table
      const { count, error } = await supabase
        .from('article_likes')
        .select('*', { count: 'exact', head: true })
        .eq('article_id', articleId);

      if (error) {
        console.error('Error counting likes:', error);
        return 0;
      }

      const realCount = count || 0;

      // Update articles table with real count
      const { error: updateError } = await supabase
        .from('articles')
        .update({ 
          likes_count: realCount,
          updated_at: new Date().toISOString()
        })
        .eq('id', articleId);

      if (updateError) {
        console.error('Error updating article likes count:', updateError);
      }

      return realCount;
    } catch (error) {
      console.error('Error syncing likes count:', error);
      return 0;
    }
  },

  // Toggle like status with improved sync
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

        // Sync likes count after unlike
        await this.syncLikesCount(articleId);

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

        // Sync likes count after like
        await this.syncLikesCount(articleId);

        return { success: true, isLiked: true };
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      return { success: false, isLiked: false, error: 'Terjadi kesalahan sistem' };
    }
  },

  // Get real-time likes count for an article
  async getLikesCount(articleId: string): Promise<number> {
    try {
      const { count, error } = await supabase
        .from('article_likes')
        .select('*', { count: 'exact', head: true })
        .eq('article_id', articleId);

      if (error) {
        console.error('Error getting likes count:', error);
        return 0;
      }

      return count || 0;
    } catch (error) {
      console.error('Error getting likes count:', error);
      return 0;
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
      role: string | null;
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
          avatar_url,
          role
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
      .select('id, views, likes_count, comments_count')
      .eq('author_id', userId)
      .eq('published', true);

    const totalViews = articles?.reduce((sum, article) => sum + (article.views || 0), 0) || 0;

    // Get total likes from article_likes table for accuracy
    const { count: totalLikes } = await supabase
      .from('article_likes')
      .select('*', { count: 'exact', head: true })
      .in('article_id', articles?.map(article => article.id) || []);

    // Get total comments from comments table for accuracy
    const { count: totalComments } = await supabase
      .from('comments')
      .select('*', { count: 'exact', head: true })
      .in('article_id', articles?.map(article => article.id) || []);

    return {
      totalArticles: totalArticles || 0,
      publishedArticles: publishedArticles || 0,
      draftArticles: draftArticles || 0,
      totalViews,
      totalLikes: totalLikes || 0,
      totalComments: totalComments || 0
    };
  }
};

// ==============================
// ARTICLE HELPERS
// ==============================

export const articleHelpers = {
  async getArticle(identifier: string): Promise<Article | null> {
    try {
      console.log(`🔍 Fetching article: ${identifier}`);
      
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

      if (data) {
        console.log(`📊 Article "${data.title}" - Views from DB: ${data.views}`);
    }

    return data;
    } catch (error) {
      console.error('Unexpected error in getArticle:', error);
      return null;
    }
  },

  // Increment view count with improved error handling
  async incrementViews(articleId: string): Promise<void> {
    try {
      console.log(`🔄 Incrementing views for article: ${articleId}`);
      
      // Get current views with explicit NULL handling
      const { data, error: fetchError } = await supabase
        .from('articles')
        .select('views, title, published')
        .eq('id', articleId)
        .single();

      if (fetchError) {
        console.error(`❌ Error fetching article ${articleId}:`, fetchError);
        return;
      }

      if (!data) {
        console.error(`❌ Article ${articleId} not found`);
        return;
      }

      if (!data.published) {
        console.log(`ℹ️  Article ${articleId} is not published, skipping view increment`);
        return;
      }

      // Handle NULL views - set to 0 if NULL
      const currentViews = data.views ?? 0;
      const newViews = currentViews + 1;

      console.log(`📊 Article: ${data.title}`);
      console.log(`📊 Current views: ${currentViews} -> New views: ${newViews}`);

      // Increment views with explicit value and better error handling
      const { data: updateData, error: updateError } = await supabase
        .from('articles')
        .update({ 
          views: newViews,
          updated_at: new Date().toISOString()
        })
        .eq('id', articleId)
        .select('views')
        .single();

      if (updateError) {
        console.error(`❌ Error updating views for article ${articleId}:`, updateError);
        return;
      }

      if (!updateData) {
        console.error(`❌ No data returned after update for article ${articleId}`);
        return;
      }

      console.log(`✅ Successfully incremented views for article ${articleId}`);
      console.log(`✅ Updated views in database: ${updateData.views}`);
      
      // Verify the update was successful
      const { data: verifyData, error: verifyError } = await supabase
        .from('articles')
        .select('views')
        .eq('id', articleId)
        .single();

      if (verifyError) {
        console.error(`❌ Error verifying update for article ${articleId}:`, verifyError);
      } else {
        console.log(`🔍 Verification - Views in database: ${verifyData?.views}`);
      }
      
    } catch (error) {
      console.error(`❌ Unexpected error incrementing views for article ${articleId}:`, error);
    }
  },

  // Manual increment as fallback - IMPROVED VERSION
  async manualIncrementViews(articleId: string): Promise<void> {
    try {
      // Get current views with explicit NULL handling
      const { data, error: fetchError } = await supabase
        .from('articles')
        .select('views, title, published')
        .eq('id', articleId)
        .single();

      if (fetchError || !data || !data.published) {
        console.error(`❌ Manual increment failed for article ${articleId}:`, fetchError);
        return;
      }

      // Handle NULL views - set to 0 if NULL
      const currentViews = data.views ?? 0;
      const newViews = currentViews + 1;

      // Increment views with explicit value
      const { error: updateError } = await supabase
        .from('articles')
        .update({ 
          views: newViews,
          updated_at: new Date().toISOString()
        })
        .eq('id', articleId);

      if (updateError) {
        console.error(`❌ Manual increment update failed for article ${articleId}:`, updateError);
        return;
      }

      console.log(`✅ Manual increment successful for article ${articleId}: ${currentViews} -> ${newViews}`);
    } catch (error) {
      console.error(`❌ Manual increment error for article ${articleId}:`, error);
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

  // Get portfolio work by ID with success/error format
  async getPortfolioWorkById(workId: string): Promise<{ success: boolean; data?: PortfolioWork; error?: string }> {
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
      return { success: false, error: error.message };
    }

    return { success: true, data };
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
        totalWorks: 0,
        publishedWorks: 0,
        totalViews: 0,
        avgRating: 0,
        unpublished: 0,
        inProgress: 0,
        completed: 0,
        categories: {}
      };
    }

    const stats = {
      totalWorks: data.length,
      publishedWorks: data.filter(w => w.status === 'published').length,
      totalViews: 0, // Portfolio works don't have views yet, but we can add this later
      avgRating: 0, // Portfolio works don't have ratings yet, but we can add this later
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

// ==============================
// PLATFORM STATISTICS SYSTEM (IMPROVED)
// ==============================

export interface PlatformStatistics {
  total_users: number;
  total_content: number;
  total_views: number;
  total_likes: number;
  total_articles: number;
  total_portfolio_works: number;
  last_updated: string;
}

export const platformStatsHelpers = {
  // Get all platform statistics with fallback calculation
  async getPlatformStatistics(): Promise<PlatformStatistics> {
    try {
      console.log('🔄 Fetching platform statistics...');
      
      // First try to get from platform_statistics table
      const { data: statsData, error: statsError } = await supabase
        .from('platform_statistics')
        .select('stat_key, stat_value, last_updated')
        .order('stat_key');

      if (statsError) {
        console.error('❌ Error fetching platform statistics:', statsError);
        // Fallback to manual calculation
        return await this.calculateStatisticsManually();
      }

      if (!statsData || statsData.length === 0) {
        console.warn('⚠️ No statistics data found, calculating manually...');
        return await this.calculateStatisticsManually();
      }

      const stats: any = {};
      let lastUpdated = new Date().toISOString();

      statsData.forEach((item: any) => {
        const key = item.stat_key as keyof PlatformStatistics;
        if (key && key !== 'last_updated') {
          stats[key] = item.stat_value || 0;
        }
        if (item.last_updated) {
          lastUpdated = item.last_updated;
        }
      });

      const result = {
        total_users: stats.total_users || 0,
        total_content: stats.total_content || 0,
        total_views: stats.total_views || 0,
        total_likes: stats.total_likes || 0,
        total_articles: stats.total_articles || 0,
        total_portfolio_works: stats.total_portfolio_works || 0,
        last_updated: lastUpdated
      };

      console.log('✅ Platform statistics fetched:', result);
      return result;

    } catch (error) {
      console.error('❌ Unexpected error in getPlatformStatistics:', error);
      return await this.calculateStatisticsManually();
    }
  },

  // NEW METHOD: Get platform statistics for HOMEPAGE (all registered users)
  async getHomepageStatistics(): Promise<PlatformStatistics> {
    try {
      console.log('🔄 Fetching homepage statistics...');

      const [
        totalUsersResult,
        articlesResult,
        portfolioResult,
        viewsResult,
        likesResult
      ] = await Promise.all([
        // ✅ HOMEPAGE: Get ALL registered users from profiles
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        // Total published articles
        supabase.from('articles').select('*', { count: 'exact', head: true })
          .eq('published', true),
        // Total published portfolio works
        supabase.from('portfolio_works').select('*', { count: 'exact', head: true })
          .eq('status', 'published'),
        // Total views from published articles
        supabase.from('articles').select('views')
          .eq('published', true)
          .not('views', 'is', null),
        // Total likes
        supabase.from('article_likes').select('*', { count: 'exact', head: true })
      ]);

      const totalUsers = totalUsersResult.count || 0; // ALL registered users
      const totalArticles = articlesResult.count || 0;
      const totalPortfolioWorks = portfolioResult.count || 0;
      const totalContent = totalArticles + totalPortfolioWorks;
      
      const totalViews = viewsResult.data?.reduce((sum, article) => {
        const views = article.views || 0;
        return sum + views;
      }, 0) || 0;
      
      const totalLikes = likesResult.count || 0;

      console.log('📊 Homepage statistics:');
      console.log('- Total Users (all registered):', totalUsers);
      console.log('- Total Content:', totalContent);
      console.log('- Total Views:', totalViews);
      console.log('- Total Likes:', totalLikes);

      const result = {
        total_users: totalUsers, // ✅ ALL registered users for homepage
        total_content: totalContent,
        total_views: totalViews,
        total_likes: totalLikes,
        total_articles: totalArticles,
        total_portfolio_works: totalPortfolioWorks,
        last_updated: new Date().toISOString(),
      };

      console.log('✅ Homepage statistics completed:', result);
      return result;

    } catch (error) {
      console.error('❌ Error in getHomepageStatistics:', error);
      return {
        total_users: 0,
        total_content: 0,
        total_views: 0,
        total_likes: 0,
        total_articles: 0,
        total_portfolio_works: 0,
        last_updated: new Date().toISOString()
      };
    }
  },

  // NEW METHOD: Get platform statistics for AUTHORS PAGE (active authors only)
  async getAuthorsPageStatistics(): Promise<{
    totalActiveAuthors: number;
    totalContent: number;
    totalViews: number;
    totalLikes: number;
  }> {
    try {
      console.log('🔄 Fetching authors page statistics...');

      const [
        activeAuthorsResult,
        articlesResult,
        portfolioResult,
        viewsResult,
        likesResult
      ] = await Promise.all([
        // ✅ AUTHORS PAGE: Get active authors (users with published articles)
        supabase.from('articles').select('author_id').eq('published', true),
        // Total published articles
        supabase.from('articles').select('*', { count: 'exact', head: true })
          .eq('published', true),
        // Total published portfolio works
        supabase.from('portfolio_works').select('*', { count: 'exact', head: true })
          .eq('status', 'published'),
        // Total views from published articles
        supabase.from('articles').select('views')
          .eq('published', true)
          .not('views', 'is', null),
        // Total likes
        supabase.from('article_likes').select('*', { count: 'exact', head: true })
      ]);

      // Calculate unique active authors
      const uniqueAuthorIds = [...new Set(activeAuthorsResult.data?.map(a => a.author_id) || [])];
      const totalActiveAuthors = uniqueAuthorIds.length;

      const totalArticles = articlesResult.count || 0;
      const totalPortfolioWorks = portfolioResult.count || 0;
      const totalContent = totalArticles + totalPortfolioWorks;
      
      const totalViews = viewsResult.data?.reduce((sum, article) => {
        const views = article.views || 0;
        return sum + views;
      }, 0) || 0;
      
      const totalLikes = likesResult.count || 0;

      console.log('📊 Authors page statistics:');
      console.log('- Active Authors:', totalActiveAuthors);
      console.log('- Total Content:', totalContent);
      console.log('- Total Views:', totalViews);
      console.log('- Total Likes:', totalLikes);

      const result = {
        totalActiveAuthors,
        totalContent,
        totalViews,
        totalLikes,
      };

      console.log('✅ Authors page statistics completed:', result);
      return result;

    } catch (error) {
      console.error('❌ Error in getAuthorsPageStatistics:', error);
      return {
        totalActiveAuthors: 0,
        totalContent: 0,
        totalViews: 0,
        totalLikes: 0,
      };
    }
  },

  // NEW METHOD: Get total users count (all registered users)
  async getTotalUsersCount(): Promise<number> {
    try {
      console.log('🔄 Calculating total users count...');
      
      // Get all users from profiles table
      const { count, error } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      if (error) {
        console.error('❌ Error fetching total users:', error);
        return 0;
      }

      const totalUsers = count || 0;
      console.log('✅ Total users count:', totalUsers);
      return totalUsers;
    } catch (error) {
      console.error('❌ Error in getTotalUsersCount:', error);
      return 0;
    }
  },

  // NEW METHOD: Get active authors count
  async getActiveAuthorsCount(): Promise<number> {
    try {
      console.log('🔄 Calculating active authors count...');
      
      // Get unique author IDs from published articles
      const { data: articles, error } = await supabase
        .from('articles')
        .select('author_id')
        .eq('published', true);

      if (error) {
        console.error('❌ Error fetching articles for active authors:', error);
        return 0;
      }

      // Get unique author IDs
      const uniqueAuthorIds = [...new Set(articles?.map(a => a.author_id) || [])];
      const activeAuthorsCount = uniqueAuthorIds.length;

      console.log('✅ Active authors count:', activeAuthorsCount);
      return activeAuthorsCount;
    } catch (error) {
      console.error('❌ Error in getActiveAuthorsCount:', error);
      return 0;
    }
  },

  // Keep existing calculateStatisticsManually for backward compatibility
  // but make it use ALL registered users (for homepage)
  async calculateStatisticsManually(): Promise<PlatformStatistics> {
    console.log('🔄 Using homepage statistics for manual calculation...');
    return await this.getHomepageStatistics();
  },

  // Update platform_statistics table with calculated values
  async updateStatisticsTable(stats: PlatformStatistics): Promise<void> {
    try {
      console.log('🔄 Updating platform_statistics table...');

      const updates = [
        { stat_key: 'total_users', stat_value: stats.total_users },
        { stat_key: 'total_content', stat_value: stats.total_content },
        { stat_key: 'total_views', stat_value: stats.total_views },
        { stat_key: 'total_likes', stat_value: stats.total_likes },
        { stat_key: 'total_articles', stat_value: stats.total_articles },
        { stat_key: 'total_portfolio_works', stat_value: stats.total_portfolio_works }
      ];

      for (const update of updates) {
        await supabase
          .from('platform_statistics')
          .upsert({
            ...update,
            last_updated: new Date().toISOString()
          }, {
            onConflict: 'stat_key'
          });
      }

      console.log('✅ Platform statistics table updated');
    } catch (error) {
      console.error('❌ Error updating platform_statistics table:', error);
    }
  },

  // Manually refresh platform statistics
  async refreshPlatformStatistics(): Promise<{ success: boolean; error?: string }> {
    try {
      console.log('🔄 Refreshing platform statistics...');
      
      // Try using the database function first
      const { error: rpcError } = await supabase.rpc('refresh_platform_statistics');
      
      if (rpcError) {
        console.warn('⚠️ RPC refresh failed, trying manual refresh:', rpcError);
        // Fallback to manual calculation
        const stats = await this.calculateStatisticsManually();
        console.log('✅ Manual refresh completed:', stats);
        return { success: true };
      }

      console.log('✅ RPC refresh completed');
      return { success: true };
    } catch (error) {
      console.error('❌ Error in refreshPlatformStatistics:', error);
      return { success: false, error: 'Terjadi kesalahan sistem' };
    }
  },

  // Get top categories with counts
  async getTopCategories(): Promise<Array<{ category: string; count: number }>> {
    try {
      console.log('🔄 Fetching top categories...');

      // Get categories from articles and portfolio works in parallel
      const [articlesResult, portfolioResult] = await Promise.all([
        supabase
          .from('articles')
          .select('category')
          .eq('published', true),
        
        supabase
          .from('portfolio_works')
          .select('category')
          .eq('status', 'published')
      ]);

      if (articlesResult.error) {
        console.error('❌ Error fetching articles for categories:', articlesResult.error);
      }
      if (portfolioResult.error) {
        console.error('❌ Error fetching portfolio works for categories:', portfolioResult.error);
      }

      // Combine and count categories
      const categoryCounts = new Map<string, number>();
      
      // Count from articles
      (articlesResult.data || []).forEach((article) => {
        if (article.category) {
          categoryCounts.set(
            article.category,
            (categoryCounts.get(article.category) || 0) + 1
          );
        }
      });

      // Count from portfolio works
      (portfolioResult.data || []).forEach((work) => {
        if (work.category) {
          categoryCounts.set(
            work.category,
            (categoryCounts.get(work.category) || 0) + 1
          );
        }
      });

      // Convert to array and sort by count
      const topCategories = Array.from(categoryCounts.entries())
        .map(([category, count]) => ({ category, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      console.log('✅ Top categories fetched:', topCategories);
      return topCategories;
    } catch (error) {
      console.error('❌ Error in getTopCategories:', error);
      return [];
    }
  },

  // Debug function to check data availability
  async debugStatistics(): Promise<void> {
    try {
      console.log('🔍 DEBUG: Checking data availability...');

      const [profiles, articles, portfolioWorks, likes] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('articles').select('*', { count: 'exact', head: true }),
        supabase.from('portfolio_works').select('*', { count: 'exact', head: true }),
        supabase.from('article_likes').select('*', { count: 'exact', head: true })
      ]);

      console.log('📊 Data counts:');
      console.log('- Profiles:', profiles.count);
      console.log('- Articles:', articles.count);
      console.log('- Portfolio Works:', portfolioWorks.count);
      console.log('- Article Likes:', likes.count);

      // Check published articles specifically
      const { count: publishedArticles } = await supabase
        .from('articles')
        .select('*', { count: 'exact', head: true })
        .eq('published', true);
      
      console.log('- Published Articles:', publishedArticles);

      // Check portfolio works with published status
      const { count: publishedWorks } = await supabase
        .from('portfolio_works')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'published');
      
      console.log('- Published Portfolio Works:', publishedWorks);

      // Check views
      const { data: viewsData } = await supabase
        .from('articles')
        .select('views')
        .eq('published', true);
      
      const totalViews = viewsData?.reduce((sum, article) => sum + (article.views || 0), 0) || 0;
      console.log('- Total Views:', totalViews);

    } catch (error) {
      console.error('❌ Debug error:', error);
    }
  },

  // Debug function specifically for views
  async debugViews(): Promise<void> {
    try {
      console.log('🔍 DEBUG VIEWS: Starting analysis...');

      // Check articles with views
      const { data: articlesWithViews } = await supabase
        .from('articles')
        .select('id, title, views, published, created_at')
        .eq('published', true)
        .order('views', { ascending: false })
        .limit(10);

      console.log('📊 Top 10 articles by views:');
      articlesWithViews?.forEach((article, index) => {
        console.log(`${index + 1}. "${article.title}" - Views: ${article.views ?? 'NULL'}`);
      });

      // Check total views calculation
      const { data: allViews } = await supabase
        .from('articles')
        .select('views')
        .eq('published', true);

      const totalViews = allViews?.reduce((sum, article) => sum + (article.views || 0), 0) || 0;
      const nullViewsCount = allViews?.filter(article => article.views === null).length || 0;
      const zeroViewsCount = allViews?.filter(article => article.views === 0).length || 0;

      console.log('📈 Views Analysis:');
      console.log(`- Total published articles: ${allViews?.length || 0}`);
      console.log(`- Articles with NULL views: ${nullViewsCount}`);
      console.log(`- Articles with 0 views: ${zeroViewsCount}`);
      console.log(`- Total views (calculated): ${totalViews}`);

      // Check platform_statistics table
      const { data: platformStats } = await supabase
        .from('platform_statistics')
        .select('stat_key, stat_value')
        .eq('stat_key', 'total_views')
        .single();

      console.log(`- Platform stats total_views: ${platformStats?.stat_value ?? 'NOT FOUND'}`);

    } catch (error) {
      console.error('❌ Debug views error:', error);
    }
  }
};

/**
 * Get the correct avatar URL for display
 * @param avatarUrl string from database (could be file path or full URL)
 * @returns string URL for display
 */
export function getAvatarUrl(avatarUrl: string | null): string | null {
  if (!avatarUrl) return null;
  
  // If it's already a full URL, return as is
  if (avatarUrl.startsWith('http')) {
    return avatarUrl;
  }
  
  // If it's a file path, construct the public URL
  return `https://ujbygopdxsarjkkgkvmv.supabase.co/storage/v1/object/public/images/${avatarUrl}`;
}

export async function debugCoverImages(): Promise<void> {
  try {
    console.log('debugCoverImages: Starting debug...');
    
    const { data, error } = await supabase
      .from('articles')
      .select('id, title, cover_image')
      .not('cover_image', 'is', null)
      .limit(10);
    
    if (error) {
      console.error('debugCoverImages: Error fetching articles:', error);
      return;
    }
    
    console.log('debugCoverImages: Found articles with cover images:');
    data?.forEach((article, index) => {
      console.log(`${index + 1}. ID: ${article.id}`);
      console.log(`   Title: ${article.title}`);
      console.log(`   Cover Image: ${article.cover_image}`);
      console.log(`   Is URL: ${article.cover_image?.startsWith('http')}`);
      console.log('---');
    });
    
    // Test a specific cover image
    if (data && data.length > 0) {
      const testArticle = data[0];
      console.log('debugCoverImages: Testing first article cover image...');
      
      if (testArticle.cover_image) {
        // Test if it's a URL
        if (testArticle.cover_image.startsWith('http')) {
          console.log('debugCoverImages: Testing direct URL access...');
          try {
            const response = await fetch(testArticle.cover_image, { method: 'HEAD' });
            console.log('debugCoverImages: URL status:', response.status);
            console.log('debugCoverImages: URL headers:', response.headers);
          } catch (error) {
            console.error('debugCoverImages: Error testing URL:', error);
          }
        } else {
          // Test if it's a file path
          console.log('debugCoverImages: Testing file path access...');
          const result = await checkBucketAndFile(testArticle.cover_image);
          console.log('debugCoverImages: File check result:', result);
        }
      }
    }
  } catch (error) {
    console.error('debugCoverImages: Unexpected error:', error);
  }
}

export async function checkBucketAndFile(filePath: string): Promise<{ exists: boolean; publicUrl?: string; error?: string }> {
  if (!filePath) {
    return { exists: false, error: 'No file path provided' };
  }

  try {
    console.log('checkBucketAndFile: Checking file:', filePath);
    
    // First, try to get public URL
    const { data: publicData } = supabase.storage.from('images').getPublicUrl(filePath);
    
    if (publicData?.publicUrl) {
      console.log('checkBucketAndFile: Public URL available:', publicData.publicUrl);
      
      // Test if the URL is accessible
      try {
        const response = await fetch(publicData.publicUrl, { method: 'HEAD' });
        if (response.ok) {
          return { exists: true, publicUrl: publicData.publicUrl };
        } else {
          console.log('checkBucketAndFile: Public URL not accessible, status:', response.status);
        }
      } catch (error) {
        console.log('checkBucketAndFile: Error testing public URL:', error);
      }
    }
    
    // Try signed URL as fallback
    const { data: signedData, error: signedError } = await supabase.storage
      .from('images')
      .createSignedUrl(filePath, 60);
    
    if (signedData?.signedUrl && !signedError) {
      console.log('checkBucketAndFile: Signed URL available');
      return { exists: true, publicUrl: signedData.signedUrl };
    }
    
    if (signedError) {
      console.log('checkBucketAndFile: Signed URL error:', signedError);
      return { exists: false, error: signedError.message };
    }
    
    return { exists: false, error: 'File not found' };
  } catch (error) {
    console.error('checkBucketAndFile: Unexpected error:', error);
    return { exists: false, error: 'Unexpected error' };
  }
}