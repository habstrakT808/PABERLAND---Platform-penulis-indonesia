-- Create settings table for admin configuration
CREATE TABLE IF NOT EXISTS public.settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    key TEXT UNIQUE NOT NULL,
    value JSONB NOT NULL,
    description TEXT,
    category TEXT NOT NULL DEFAULT 'general',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default settings
INSERT INTO public.settings (key, value, description, category) VALUES
-- Site Settings
('site_name', '"PaberLand"', 'Nama website', 'site'),
('site_description', '"Platform Komunitas Penulis Indonesia"', 'Deskripsi website', 'site'),
('maintenance_mode', 'false', 'Mode maintenance website', 'site'),

-- User Settings
('allow_registration', 'true', 'Izinkan pendaftaran user baru', 'users'),
('require_email_verification', 'true', 'Wajibkan verifikasi email', 'users'),
('auto_approve_users', 'true', 'Otomatis approve user baru', 'users'),

-- Content Settings
('auto_approve_articles', 'true', 'Otomatis publish artikel', 'content'),
('require_moderation', 'false', 'Wajibkan moderasi artikel', 'content'),
('max_article_length', '50000', 'Panjang maksimal artikel (karakter)', 'content'),
('allow_anonymous_comments', 'false', 'Izinkan komentar anonim', 'content'),

-- Notification Settings
('email_notifications', 'true', 'Notifikasi email', 'notifications'),
('admin_notifications', 'true', 'Notifikasi admin', 'notifications'),
('report_notifications', 'true', 'Notifikasi laporan', 'notifications'),
('weekly_digest', 'true', 'Ringkasan mingguan', 'notifications')

ON CONFLICT (key) DO NOTHING;

-- Create function to get settings by category
CREATE OR REPLACE FUNCTION get_settings_by_category(p_category TEXT)
RETURNS TABLE(key TEXT, value JSONB, description TEXT) AS $$
BEGIN
    RETURN QUERY
    SELECT s.key, s.value, s.description
    FROM public.settings s
    WHERE s.category = p_category
    ORDER BY s.key;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to update setting
CREATE OR REPLACE FUNCTION update_setting(p_key TEXT, p_value JSONB)
RETURNS BOOLEAN AS $$
BEGIN
    UPDATE public.settings 
    SET value = p_value, updated_at = NOW()
    WHERE key = p_key;
    
    RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to get all settings
CREATE OR REPLACE FUNCTION get_all_settings()
RETURNS TABLE(key TEXT, value JSONB, description TEXT, category TEXT) AS $$
BEGIN
    RETURN QUERY
    SELECT s.key, s.value, s.description, s.category
    FROM public.settings s
    ORDER BY s.category, s.key;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add RLS policies
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Only admins can read settings
CREATE POLICY "Admins can read settings" ON public.settings
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND is_admin = true
        )
    );

-- Only admins can update settings
CREATE POLICY "Admins can update settings" ON public.settings
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND is_admin = true
        )
    );

-- Only admins can insert settings
CREATE POLICY "Admins can insert settings" ON public.settings
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND is_admin = true
        )
    );

-- Only admins can delete settings
CREATE POLICY "Admins can delete settings" ON public.settings
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND is_admin = true
        )
    );
