-- src/supabase/migrations/008_admin_system.sql

-- Add admin-related fields to profiles (is_admin sudah ada)
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS admin_role TEXT DEFAULT NULL CHECK (admin_role IN ('super_admin', 'moderator')),
ADD COLUMN IF NOT EXISTS admin_since TIMESTAMP WITH TIME ZONE DEFAULT NULL,
ADD COLUMN IF NOT EXISTS last_admin_activity TIMESTAMP WITH TIME ZONE DEFAULT NULL;

-- Create content_reports table for user reports
CREATE TABLE IF NOT EXISTS public.content_reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  reporter_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  content_type TEXT NOT NULL CHECK (content_type IN ('article', 'comment', 'user')),
  content_id UUID NOT NULL,
  reason TEXT NOT NULL CHECK (reason IN ('spam', 'inappropriate', 'harassment', 'copyright', 'other')),
  description TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'resolved', 'dismissed')),
  reviewed_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  reviewed_at TIMESTAMP WITH TIME ZONE,
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create featured_content table
CREATE TABLE IF NOT EXISTS public.featured_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content_type TEXT NOT NULL CHECK (content_type IN ('article', 'user')),
  content_id UUID NOT NULL,
  featured_by UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  featured_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE,
  priority INTEGER DEFAULT 1,
  active BOOLEAN DEFAULT true,
  UNIQUE(content_type, content_id)
);

-- Create admin_activity_logs table
CREATE TABLE IF NOT EXISTS public.admin_activity_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  action TEXT NOT NULL,
  target_type TEXT NOT NULL,
  target_id UUID NOT NULL,
  details JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_content_reports_status ON public.content_reports(status);
CREATE INDEX IF NOT EXISTS idx_content_reports_content_type ON public.content_reports(content_type);
CREATE INDEX IF NOT EXISTS idx_featured_content_active ON public.featured_content(active);
CREATE INDEX IF NOT EXISTS idx_admin_activity_logs_admin_id ON public.admin_activity_logs(admin_id);
CREATE INDEX IF NOT EXISTS idx_admin_activity_logs_created_at ON public.admin_activity_logs(created_at DESC);

-- Enable RLS
ALTER TABLE public.content_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.featured_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_activity_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Content Reports
CREATE POLICY "Users can create reports" ON public.content_reports 
  FOR INSERT WITH CHECK (auth.uid() = reporter_id);
CREATE POLICY "Users can view their own reports" ON public.content_reports 
  FOR SELECT USING (auth.uid() = reporter_id);
CREATE POLICY "Admins can manage all reports" ON public.content_reports 
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- Featured Content
CREATE POLICY "Everyone can view active featured content" ON public.featured_content 
  FOR SELECT USING (active = true);
CREATE POLICY "Admins can manage featured content" ON public.featured_content 
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- Admin Activity Logs
CREATE POLICY "Admins can view activity logs" ON public.admin_activity_logs 
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND is_admin = true
    )
  );
CREATE POLICY "System can insert activity logs" ON public.admin_activity_logs 
  FOR INSERT WITH CHECK (true);

-- Function to log admin activities
CREATE OR REPLACE FUNCTION log_admin_activity(
  p_admin_id UUID,
  p_action TEXT,
  p_target_type TEXT,
  p_target_id UUID,
  p_details JSONB DEFAULT NULL
)
RETURNS void AS $$
BEGIN
  INSERT INTO admin_activity_logs (admin_id, action, target_type, target_id, details)
  VALUES (p_admin_id, p_action, p_target_type, p_target_id, p_details);
END;
$$ LANGUAGE plpgsql;

-- Function to promote user to admin
CREATE OR REPLACE FUNCTION promote_to_admin(
  p_user_id UUID,
  p_admin_role TEXT DEFAULT 'super_admin'
)
RETURNS boolean AS $$
BEGIN
  UPDATE profiles 
  SET 
    is_admin = true,
    admin_role = p_admin_role,
    admin_since = NOW(),
    updated_at = NOW()
  WHERE id = p_user_id;
  
  RETURN FOUND;
END;
$$ LANGUAGE plpgsql;

-- Create first admin (replace with actual user ID)
-- UPDATE profiles SET is_admin = true, admin_role = 'super_admin', admin_since = NOW() 
-- WHERE email = 'your-admin@email.com';