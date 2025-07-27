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
      // Featured content (if table exists)
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

    // Ambil daftar featured_content
    const { data: featuredData, error: featuredError } = await supabase
      .from('featured_content')
      .select('content_id')
      .eq('content_type', 'article')
      .eq('active', true);
    const featuredIds = (featuredData || []).map((f: any) => f.content_id);

    // Tandai artikel featured
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
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', articleId);

      if (error) throw error;

      // Log admin activity
      await this.logAdminActivity(adminId, 'delete_article', 'article', articleId, { reason });

      return { success: true };
    } catch (error) {
      console.error('Error deleting article:', error);
      return { success: false, error: 'Failed to delete article' };
    }
  },

  async promoteToAdmin(userId: string, adminId: string) {
    try {
      const { error } = await supabase.rpc('promote_to_admin', {
        p_user_id: userId
      });

      if (error) throw error;

      await this.logAdminActivity(adminId, 'promote_to_admin', 'user', userId);

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

      await this.logAdminActivity(adminId, 'resolve_report', 'report', reportId, { status, notes });

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

      await this.logAdminActivity(
        adminId, 
        featured ? 'feature_content' : 'unfeature_content', 
        contentType, 
        contentId
      );

      return { success: true };
    } catch (error) {
      console.error('Error toggling featured content:', error);
      return { success: false, error: 'Failed to update featured status' };
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

  // Log admin activity
  async logAdminActivity(adminId: string, action: string, targetType: string, targetId: string, details?: any) {
    try {
      await supabase.rpc('log_admin_activity', {
        p_admin_id: adminId,
        p_action: action,
        p_target_type: targetType,
        p_target_id: targetId,
        p_details: details || null
      });
    } catch (error) {
      console.error('Error logging admin activity:', error);
    }
  },

  async deleteUser(userId: string, adminId: string) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId)
        .select(); // Supabase akan mengembalikan row yang dihapus
      console.log('Delete user result:', { data, error, userId });
      if (error) {
        console.error('Supabase delete error:', error);
        return { success: false, error: error.message || 'Failed to delete user' };
      }
      if (!data || (typeof data === 'object' && Array.isArray(data) && data.length === 0)) {
        return { success: false, error: 'User not found or already deleted' };
      }
      await this.logAdminActivity(adminId, 'delete_user', 'user', userId);
      return { success: true };
    } catch (error) {
      console.error('Error deleting user:', error);
      return { success: false, error: (error instanceof Error ? error.message : 'Failed to delete user') };
    }
  }
};