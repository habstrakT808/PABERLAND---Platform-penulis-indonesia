// src/lib/adminHelpers.ts
import { supabase } from './supabase';

export interface AdminStats {
  totalUsers: number;
  totalArticles: number;
  totalComments: number;
  totalReports: number;
  newUsersToday: number;
  newArticlesToday: number;
  pendingReports: number;
  featuredContent: number;
}

export interface ContentReport {
  id: string;
  reporter_id: string;
  content_type: 'article' | 'comment' | 'user';
  content_id: string;
  reason: string;
  description: string | null;
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed';
  reviewed_by: string | null;
  reviewed_at: string | null;
  admin_notes: string | null;
  created_at: string;
  reporter_profile: {
    full_name: string;
    avatar_url: string | null;
  };
  content_details?: any;
}

export interface AdminActivity {
  id: string;
  admin_id: string;
  action: string;
  target_type: string;
  target_id: string;
  details: any;
  created_at: string;
  admin_profile: {
    full_name: string;
    avatar_url: string | null;
  };
}

export const adminHelpers = {
  // Check if user is admin
  async isUserAdmin(userId: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', userId)
      .single();

    if (error || !data) return false;
    return data.is_admin === true;
  },

  // Get admin dashboard stats with improved error handling
async getAdminStats(): Promise<AdminStats> {
  const today = new Date().toISOString().split('T')[0];

  try {
    console.log('🔄 Fetching admin stats...');

    // Use Promise.allSettled to handle partial failures
    const results = await Promise.allSettled([
      // Total users
      supabase.from('profiles').select('*', { count: 'exact', head: true }),
      // Total articles
      supabase.from('articles').select('*', { count: 'exact', head: true }),
      // Total comments
      supabase.from('comments').select('*', { count: 'exact', head: true }),
      // Total reports (if table exists)
      supabase.from('content_reports').select('*', { count: 'exact', head: true }),
      // New users today
      supabase.from('profiles').select('*', { count: 'exact', head: true })
        .gte('created_at', `${today}T00:00:00.000Z`),
      // New articles today
      supabase.from('articles').select('*', { count: 'exact', head: true })
        .gte('created_at', `${today}T00:00:00.000Z`),
      // Pending reports (if table exists)
      supabase.from('content_reports').select('*', { count: 'exact', head: true })
        .eq('status', 'pending'),
      // Konten pilihan (if table exists)
      supabase.from('featured_content').select('*', { count: 'exact', head: true })
        .eq('active', true)
    ]);

    const [
      usersResult,
      articlesResult,
      commentsResult,
      reportsResult,
      newUsersResult,
      newArticlesResult,
      pendingReportsResult,
      featuredResult
    ] = results;

    const stats = {
      totalUsers: usersResult.status === 'fulfilled' ? (usersResult.value.count || 0) : 0,
      totalArticles: articlesResult.status === 'fulfilled' ? (articlesResult.value.count || 0) : 0,
      totalComments: commentsResult.status === 'fulfilled' ? (commentsResult.value.count || 0) : 0,
      totalReports: reportsResult.status === 'fulfilled' ? (reportsResult.value.count || 0) : 0,
      newUsersToday: newUsersResult.status === 'fulfilled' ? (newUsersResult.value.count || 0) : 0,
      newArticlesToday: newArticlesResult.status === 'fulfilled' ? (newArticlesResult.value.count || 0) : 0,
      pendingReports: pendingReportsResult.status === 'fulfilled' ? (pendingReportsResult.value.count || 0) : 0,
      featuredContent: featuredResult.status === 'fulfilled' ? (featuredResult.value.count || 0) : 0
    };

    console.log('✅ Admin stats fetched:', stats);
    return stats;

  } catch (error) {
    console.error('❌ Error fetching admin stats:', error);
    return {
      totalUsers: 0,
      totalArticles: 0,
      totalComments: 0,
      totalReports: 0,
      newUsersToday: 0,
      newArticlesToday: 0,
      pendingReports: 0,
      featuredContent: 0
    };
  }
},

  // Get all users with pagination and search
  async getUsers(page: number = 1, limit: number = 20, search?: string, filter?: 'all' | 'admin' | 'regular') {
    let query = supabase
      .from('profiles')
      .select(`
        id,
        full_name,
        phone,
        bio,
        avatar_url,
        is_admin,
        admin_role,
        admin_since,
        created_at,
        updated_at
      `, { count: 'exact', head: false })
      .order('created_at', { ascending: false });

    // Apply search
    if (search) {
      query = query.or(`full_name.ilike.%${search}%,phone.ilike.%${search}%`);
    }

    // Apply filter
    if (filter === 'admin') {
      query = query.eq('is_admin', true);
    } else if (filter === 'regular') {
      query = query.eq('is_admin', false);
    }

    // Apply pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) {
      console.error('Error fetching users:', error);
      return { users: [], totalCount: 0, totalPages: 0 };
    }

    return {
      users: data || [],
      totalCount: count || 0,
      totalPages: Math.ceil((count || 0) / limit)
    };
  },

  // Get all articles with admin info
  async getArticlesForAdmin(page: number = 1, limit: number = 10, search?: string, category?: string, status?: 'all' | 'published' | 'draft') {
    let query = supabase
      .from('articles')
      .select(`
        id,
        title,
        excerpt,
        cover_image,
        category,
        author_id,
        published,
        scheduled_at,
        slug,
        views,
        likes_count,
        comments_count,
        created_at,
        updated_at,
        profiles:author_id (
          id,
          full_name,
          avatar_url
        )
      `, { count: 'exact', head: false })
      .order('created_at', { ascending: false });

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
      console.error('Error fetching articles for admin:', error);
      return { articles: [], totalCount: 0, totalPages: 0 };
    }

            // Ambil daftar konten pilihan
    const { data: featuredData, error: featuredError } = await supabase
      .from('featured_content')
      .select('content_id')
      .eq('content_type', 'article')
      .eq('active', true);
    const featuredIds = (featuredData || []).map((f: any) => f.content_id);

            // Tandai artikel pilihan
    const articles = (data || []).map((article: any) => ({
      ...article,
      featured: featuredIds.includes(article.id),
    }));

    return {
      articles,
      totalCount: count || 0,
      totalPages: Math.ceil((count || 0) / limit)
    };
  },

  // Get content reports
  async getContentReports(page: number = 1, limit: number = 20, status?: string) {
    let query = supabase
      .from('content_reports')
      .select(`
        id,
        reporter_id,
        content_type,
        content_id,
        reason,
        description,
        status,
        reviewed_by,
        reviewed_at,
        admin_notes,
        created_at,
        reporter_profile:reporter_id (
          full_name,
          avatar_url
        )
      `)
      .order('created_at', { ascending: false });

    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) {
      console.error('Error fetching content reports:', error);
      return { reports: [], totalCount: 0, totalPages: 0 };
    }

    // Fetch content details for each report
    const reportsWithDetails = await Promise.all(
      (data || []).map(async (report: any) => {
        let contentDetails = null;

        if (report.content_type === 'article') {
          const { data: article } = await supabase
            .from('articles')
            .select('id, title, author_id, profiles:author_id(full_name)')
            .eq('id', report.content_id)
            .single();
          contentDetails = article;
        } else if (report.content_type === 'comment') {
          const { data: comment } = await supabase
            .from('comments')
            .select('id, content, author_id, profiles:author_id(full_name)')
            .eq('id', report.content_id)
            .single();
          contentDetails = comment;
        }

        return {
          ...report,
          reporter_profile: Array.isArray(report.reporter_profile) 
            ? report.reporter_profile[0] 
            : report.reporter_profile,
          content_details: contentDetails
        };
      })
    );

    return {
      reports: reportsWithDetails,
      totalCount: count || 0,
      totalPages: Math.ceil((count || 0) / limit)
    };
  },

  // Admin actions
  async deleteArticle(articleId: string, adminId: string, reason?: string) {
    try {
      console.log('🔄 Attempting to delete article:', articleId);
      
      // First, verify the article exists
      const { data: existingArticle, error: checkError } = await supabase
        .from('articles')
        .select('id, title, author_id')
        .eq('id', articleId)
        .single();

      if (checkError || !existingArticle) {
        console.error('❌ Article not found:', checkError);
        return { success: false, error: 'Article not found' };
      }

      console.log('✅ Article found:', existingArticle.title);

      // Delete related data first to avoid foreign key constraints
      console.log('🔄 Deleting related data...');

      // Delete article likes
      const { error: likesError } = await supabase
        .from('article_likes')
        .delete()
        .eq('article_id', articleId);

      if (likesError) {
        console.warn('⚠️ Error deleting article likes:', likesError);
      } else {
        console.log('✅ Article likes deleted');
      }

      // Delete comments
      const { error: commentsError } = await supabase
        .from('comments')
        .delete()
        .eq('article_id', articleId);

      if (commentsError) {
        console.warn('⚠️ Error deleting comments:', commentsError);
      } else {
        console.log('✅ Comments deleted');
      }

              // Delete from konten pilihan if exists
      const { error: featuredError } = await supabase
        .from('featured_content')
        .delete()
        .eq('content_type', 'article')
        .eq('content_id', articleId);

      if (featuredError) {
        console.warn('⚠️ Error deleting from konten pilihan:', featuredError);
      } else {
        console.log('✅ Konten pilihan entry deleted');
      }

      // Delete content reports if exists
      const { error: reportsError } = await supabase
        .from('content_reports')
        .delete()
        .eq('content_type', 'article')
        .eq('content_id', articleId);

      if (reportsError) {
        console.warn('⚠️ Error deleting content reports:', reportsError);
      } else {
        console.log('✅ Content reports deleted');
      }

      // Now delete the article itself
      console.log('🔄 Deleting article...');
      const { data: deletedData, error: deleteError } = await supabase
        .from('articles')
        .delete()
        .eq('id', articleId)
        .select(); // Return deleted rows to verify

      if (deleteError) {
        console.error('❌ Error deleting article from database:', deleteError);
        throw deleteError;
      }

      // Verify deletion was successful
      if (!deletedData || deletedData.length === 0) {
        console.error('❌ No rows were deleted - article may still be protected');
        return { success: false, error: 'Article could not be deleted - may be protected by RLS policy' };
      }

      console.log('✅ Article deleted successfully from database:', deletedData.length, 'row(s) affected');

      // Double-check by trying to fetch the article again
      const { data: verifyData, error: verifyError } = await supabase
        .from('articles')
        .select('id')
        .eq('id', articleId)
        .single();

      if (verifyData) {
        console.error('❌ Article still exists after deletion attempt!');
        return { success: false, error: 'Article deletion failed - still exists in database' };
      }

      if (verifyError && verifyError.code !== 'PGRST116') {
        console.error('❌ Error verifying deletion:', verifyError);
        return { success: false, error: 'Could not verify deletion' };
      }

      console.log('✅ Deletion verified - article no longer exists in database');

      return { success: true };
    } catch (error) {
      console.error('❌ Error in deleteArticle:', error);
      return { success: false, error: 'Failed to delete article' };
    }
  },

  async promoteToAdmin(userId: string, adminId: string) {
    try {
      const { error } = await supabase.rpc('promote_to_admin', {
        p_user_id: userId
      });

      if (error) throw error;

      // Log admin activity (non-blocking)
      this.logAdminActivity(adminId, 'promote_to_admin', 'user', userId)
        .catch(logError => {
          console.warn('⚠️ Failed to log admin activity, but promotion was successful:', logError);
        });

      return { success: true };
    } catch (error) {
      console.error('Error promoting user to admin:', error);
      return { success: false, error: 'Failed to promote user' };
    }
  },

  async resolveReport(reportId: string, adminId: string, status: 'resolved' | 'dismissed', notes?: string) {
    try {
      const { error } = await supabase
        .from('content_reports')
        .update({
          status,
          reviewed_by: adminId,
          reviewed_at: new Date().toISOString(),
          admin_notes: notes
        })
        .eq('id', reportId);

      if (error) throw error;

      // Log admin activity (non-blocking)
      this.logAdminActivity(adminId, 'resolve_report', 'report', reportId, { status, notes })
        .catch(logError => {
          console.warn('⚠️ Failed to log admin activity, but report resolution was successful:', logError);
        });

      return { success: true };
    } catch (error) {
      console.error('Error resolving report:', error);
      return { success: false, error: 'Failed to resolve report' };
    }
  },

  async toggleFeaturedContent(contentType: 'article' | 'user', contentId: string, adminId: string, featured: boolean) {
    try {
      if (featured) {
        const { error } = await supabase
          .from('featured_content')
          .insert({
            content_type: contentType,
            content_id: contentId,
            featured_by: adminId
          });

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('featured_content')
          .delete()
          .eq('content_type', contentType)
          .eq('content_id', contentId);

        if (error) throw error;
      }

      // Log admin activity (non-blocking)
      this.logAdminActivity(
        adminId,
        featured ? 'feature_content' : 'unfeature_content',
        contentType,
        contentId
      ).catch(logError => {
        console.warn('⚠️ Failed to log admin activity, but konten pilihan toggle was successful:', logError);
      });

      return { success: true };
    } catch (error) {
      console.error('Error toggling konten pilihan:', error);
              return { success: false, error: 'Failed to update konten pilihan status' };
    }
  },

  // Get admin activity logs
  async getAdminActivityLogs(page: number = 1, limit: number = 50) {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await supabase
      .from('admin_activity_logs')
      .select(`
        id,
        admin_id,
        action,
        target_type,
        target_id,
        details,
        created_at,
        admin_profile:admin_id (
          full_name,
          avatar_url
        )
      `)
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) {
      console.error('Error fetching admin activity logs:', error);
      return { activities: [], totalCount: 0, totalPages: 0 };
    }

    return {
      activities: (data || []).map((activity: any) => ({
        ...activity,
        admin_profile: Array.isArray(activity.admin_profile) 
          ? activity.admin_profile[0] 
          : activity.admin_profile
      })),
      totalCount: count || 0,
      totalPages: Math.ceil((count || 0) / limit)
    };
  },

  // Log admin activity - Made completely optional to not break main operations
  async logAdminActivity(adminId: string, action: string, targetType: string, targetId: string, details?: any) {
    // Make logging completely optional and silent
    try {
      console.log('🔄 Attempting to log admin activity:', { adminId, action, targetType, targetId });
      
      // Check if admin_activity_logs table exists first
      const { data: tableCheck, error: tableError } = await supabase
        .from('admin_activity_logs')
        .select('id')
        .limit(1);

      if (tableError) {
        console.warn('⚠️ admin_activity_logs table not accessible, skipping logging:', tableError.message);
        return;
      }

      // Try direct insert
      const { data, error } = await supabase
        .from('admin_activity_logs')
        .insert({
          admin_id: adminId,
          action: action,
          target_type: targetType,
          target_id: targetId,
          details: details || null,
          created_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) {
        console.warn('⚠️ Direct insert failed, trying RPC fallback:', error.message);
        
        // Fallback to RPC if direct insert fails
        const { error: rpcError } = await supabase.rpc('log_admin_activity', {
          p_admin_id: adminId,
          p_action: action,
          p_target_type: targetType,
          p_target_id: targetId,
          p_details: details || null
        });
        
        if (rpcError) {
          console.warn('⚠️ Both direct insert and RPC failed, logging skipped:', rpcError.message);
          // Silently fail - logging is not critical
        } else {
          console.log('✅ Admin activity logged via RPC fallback');
        }
      } else {
        console.log('✅ Admin activity logged via direct insert');
      }
    } catch (error) {
      console.warn('⚠️ Admin activity logging failed, but this is not critical:', error instanceof Error ? error.message : 'Unknown error');
      // Silently fail - logging should never break the main operation
    }
  },

  async deleteUser(userId: string, adminId: string) {
    try {
      console.log('🔄 Attempting to delete user:', userId);
      
      // First, check if user exists and get their name for logging
      const { data: userCheck, error: checkError } = await supabase
        .from('profiles')
        .select('id, full_name')
        .eq('id', userId)
        .single();

      if (checkError || !userCheck) {
        console.error('User not found:', checkError);
        return { success: false, error: 'User not found' };
      }

      console.log('✅ User found:', userCheck.full_name);

      // Delete the user (CASCADE will handle related data)
      const { data, error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId)
        .select();

      console.log('Delete user result:', { data, error, userId });
      
      if (error) {
        console.error('Supabase delete error:', error);
        return { success: false, error: error.message || 'Failed to delete user' };
      }

      // Check if any rows were actually deleted
      if (!data || (Array.isArray(data) && data.length === 0)) {
        console.log('⚠️ No rows deleted - user may have been already deleted');
        return { success: false, error: 'User not found or already deleted' };
      }

      console.log('✅ User successfully deleted');
      await this.logAdminActivity(adminId, 'delete_user', 'user', userId, {
        deleted_user_name: userCheck.full_name
      });
      
      return { success: true };
    } catch (error) {
      console.error('Error deleting user:', error);
      return { 
        success: false, 
        error: (error instanceof Error ? error.message : 'Failed to delete user') 
      };
    }
  },

  // Get global admin/regular user counts
  async getUserRoleCounts() {
    // Count admin
    const { count: adminCount, error: adminError } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .eq('is_admin', true);
    // Count regular
    const { count: regularCount, error: regularError } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .eq('is_admin', false);
    if (adminError || regularError) {
      console.error('Error fetching user role counts:', adminError, regularError);
      return { admin: 0, regular: 0 };
    }
    return { admin: adminCount || 0, regular: regularCount || 0 };
  },

  // Settings management functions
  async getAllSettings() {
    try {
      const { data, error } = await supabase.rpc('get_all_settings');
      
      if (error) {
        console.error('Error fetching settings:', error);
        return {};
      }

      const settings: any = {};
      (data || []).forEach((setting: any) => {
        settings[setting.key] = setting.value;
      });

      return settings;
    } catch (error) {
      console.error('Error in getAllSettings:', error);
      return {};
    }
  },

  async getSettingsByCategory(category: string) {
    try {
      const { data, error } = await supabase.rpc('get_settings_by_category', {
        p_category: category
      });
      
      if (error) {
        console.error('Error fetching settings by category:', error);
        return {};
      }

      const settings: any = {};
      (data || []).forEach((setting: any) => {
        settings[setting.key] = setting.value;
      });

      return settings;
    } catch (error) {
      console.error('Error in getSettingsByCategory:', error);
      return {};
    }
  },

  async updateSetting(key: string, value: any) {
    try {
      const { data, error } = await supabase.rpc('update_setting', {
        p_key: key,
        p_value: value
      });
      
      if (error) {
        console.error('Error updating setting:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error('Error in updateSetting:', error);
      return { success: false, error: 'Failed to update setting' };
    }
  },

  async updateMultipleSettings(settings: Record<string, any>) {
    try {
      const updatePromises = Object.entries(settings).map(([key, value]) =>
        this.updateSetting(key, value)
      );

      const results = await Promise.all(updatePromises);
      const failedUpdates = results.filter(result => !result.success);

      if (failedUpdates.length > 0) {
        console.error('Some settings failed to update:', failedUpdates);
        return { 
          success: false, 
          error: `${failedUpdates.length} settings failed to update`,
          failedUpdates 
        };
      }

      // Clear settings cache after successful update
      try {
        const { clearSettingsCache } = await import('./settingsUtils');
        clearSettingsCache();
      } catch (cacheError) {
        console.warn('Failed to clear settings cache:', cacheError);
      }

      return { success: true };
    } catch (error) {
      console.error('Error in updateMultipleSettings:', error);
      return { success: false, error: 'Failed to update settings' };
    }
  },

  // Backup and recovery functions
  async createBackup() {
    try {
      console.log('Creating database backup...');
      
      // Import backup script (Node.js version)
      const { createBackup: createBackupScript } = require('../../scripts/backup-database.js');
      
      // Execute backup script
      const result = await createBackupScript();
      
      if (result.success) {
        console.log('Backup created successfully:', result.backup.id);
        return {
          success: true,
          backup: {
            id: result.backup.id,
            created_at: result.backup.created_at,
            size: result.backup.size,
            status: 'completed',
            expires_at: result.backup.expires_at
          }
        };
      } else {
        console.error('Backup failed:', result.error);
        return { success: false, error: result.error || 'Failed to create backup' };
      }
    } catch (error: any) {
      console.error('Error creating backup:', error);
      return { success: false, error: error.message || 'Failed to create backup' };
    }
  },

  async getBackupStatus() {
    try {
      const fs = require('fs');
      const path = require('path');
      
      const BACKUP_DIR = process.env.BACKUP_DIR || path.join(process.cwd(), 'backups');
      
      // Check if backup directory exists
      if (!fs.existsSync(BACKUP_DIR)) {
        return {
          success: true,
          lastBackup: null,
          message: 'No backups found. Backup directory does not exist.'
        };
      }
      
      // Find all backup files
      const files = fs.readdirSync(BACKUP_DIR);
      const backupFiles = files
        .filter((f: string) => f.startsWith('backup_') && f.endsWith('.sql.gz'))
        .map((f: string) => {
          const filePath = path.join(BACKUP_DIR, f);
          const stats = fs.statSync(filePath);
          return {
            name: f,
            path: filePath,
            size: stats.size,
            modified: stats.mtime
          };
        })
        .sort((a: any, b: any) => b.modified.getTime() - a.modified.getTime()); // Sort by date, newest first
      
      if (backupFiles.length === 0) {
        return {
          success: true,
          lastBackup: null,
          message: 'No backups found.'
        };
      }
      
      // Get latest backup
      const latestBackup = backupFiles[0];
      const sizeMB = (latestBackup.size / 1024 / 1024).toFixed(2);
      
      // Try to read metadata file
      let metadata = null;
      const metadataFile = latestBackup.name.replace('.sql.gz', '.json');
      const metadataPath = path.join(BACKUP_DIR, metadataFile);
      
      if (fs.existsSync(metadataPath)) {
        try {
          metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
        } catch (error) {
          console.error('Error reading metadata file:', error);
        }
      }
      
      // Calculate next scheduled backup (daily at 02:00 WIB)
      const now = new Date();
      const nextBackup = new Date(now);
      nextBackup.setHours(2, 0, 0, 0);
      if (nextBackup <= now) {
        nextBackup.setDate(nextBackup.getDate() + 1);
      }
      
      return {
        success: true,
        lastBackup: {
          id: metadata?.backup_id || latestBackup.name.replace('.sql.gz', ''),
          created_at: latestBackup.modified.toISOString(),
          size: `${sizeMB} MB`,
          size_bytes: latestBackup.size,
          status: 'completed',
          file_name: latestBackup.name,
          expires_at: metadata?.expires_at || null
        },
        totalBackups: backupFiles.length,
        nextScheduled: nextBackup.toISOString(),
        retentionDays: 30
      };
    } catch (error: any) {
      console.error('Error getting backup status:', error);
      return { success: false, error: error.message || 'Failed to get backup status' };
    }
  },

  async listBackups() {
    try {
      const fs = require('fs');
      const path = require('path');
      
      const BACKUP_DIR = process.env.BACKUP_DIR || path.join(process.cwd(), 'backups');
      
      if (!fs.existsSync(BACKUP_DIR)) {
        return { success: true, backups: [] };
      }
      
      const files = fs.readdirSync(BACKUP_DIR);
      const backupFiles = files
        .filter((f: string) => f.startsWith('backup_') && f.endsWith('.sql.gz'))
        .map((f: string) => {
          const filePath = path.join(BACKUP_DIR, f);
          const stats = fs.statSync(filePath);
          
          // Try to read metadata
          let metadata = null;
          const metadataFile = f.replace('.sql.gz', '.json');
          const metadataPath = path.join(BACKUP_DIR, metadataFile);
          
          if (fs.existsSync(metadataPath)) {
            try {
              metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
            } catch (error) {
              // Ignore metadata read errors
            }
          }
          
          return {
            id: metadata?.backup_id || f.replace('.sql.gz', ''),
            file_name: f,
            created_at: stats.mtime.toISOString(),
            size: `${(stats.size / 1024 / 1024).toFixed(2)} MB`,
            size_bytes: stats.size,
            status: 'completed',
            expires_at: metadata?.expires_at || null
          };
        })
        .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      
      return {
        success: true,
        backups: backupFiles,
        total: backupFiles.length
      };
    } catch (error: any) {
      console.error('Error listing backups:', error);
      return { success: false, error: error.message || 'Failed to list backups' };
    }
  }
};