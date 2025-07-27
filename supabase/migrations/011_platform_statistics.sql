-- src/supabase/migrations/011_platform_statistics.sql

-- Create platform_statistics table for real-time platform stats
CREATE TABLE IF NOT EXISTS public.platform_statistics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  stat_key TEXT UNIQUE NOT NULL,
  stat_value INTEGER DEFAULT 0,
  stat_description TEXT,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert initial statistics
INSERT INTO public.platform_statistics (stat_key, stat_value, stat_description) VALUES
  ('total_users', 0, 'Total akun pengguna yang terdaftar'),
  ('total_content', 0, 'Total konten yang dipublikasi (artikel + portfolio works)'),
  ('total_views', 0, 'Total views dari semua konten'),
  ('total_likes', 0, 'Total likes dari semua konten'),
  ('total_articles', 0, 'Total artikel yang dipublikasi'),
  ('total_portfolio_works', 0, 'Total karya portofolio yang dipublikasi')
ON CONFLICT (stat_key) DO NOTHING;

-- Create function to update platform statistics
CREATE OR REPLACE FUNCTION update_platform_statistics()
RETURNS TRIGGER AS $$
BEGIN
  -- Update total_users
  UPDATE platform_statistics 
  SET stat_value = (SELECT COUNT(*) FROM profiles),
      last_updated = timezone('utc'::text, now())
  WHERE stat_key = 'total_users';

  -- Update total_articles
  UPDATE platform_statistics 
  SET stat_value = (SELECT COUNT(*) FROM articles WHERE published = true),
      last_updated = timezone('utc'::text, now())
  WHERE stat_key = 'total_articles';

  -- Update total_portfolio_works
  UPDATE platform_statistics 
  SET stat_value = (SELECT COUNT(*) FROM portfolio_works WHERE status = 'published'),
      last_updated = timezone('utc'::text, now())
  WHERE stat_key = 'total_portfolio_works';

  -- Update total_content (articles + portfolio works)
  UPDATE platform_statistics 
  SET stat_value = (
    (SELECT COUNT(*) FROM articles WHERE published = true) +
    (SELECT COUNT(*) FROM portfolio_works WHERE status = 'published')
  ),
      last_updated = timezone('utc'::text, now())
  WHERE stat_key = 'total_content';

  -- Update total_views (from articles only for now, since portfolio_works doesn't have views yet)
  UPDATE platform_statistics 
  SET stat_value = (SELECT COALESCE(SUM(views), 0) FROM articles WHERE published = true),
      last_updated = timezone('utc'::text, now())
  WHERE stat_key = 'total_views';

  -- Update total_likes
  UPDATE platform_statistics 
  SET stat_value = (SELECT COUNT(*) FROM article_likes),
      last_updated = timezone('utc'::text, now())
  WHERE stat_key = 'total_likes';

  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to automatically update statistics
CREATE TRIGGER trigger_update_stats_on_profiles_change
  AFTER INSERT OR DELETE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_platform_statistics();

CREATE TRIGGER trigger_update_stats_on_articles_change
  AFTER INSERT OR UPDATE OR DELETE ON articles
  FOR EACH ROW EXECUTE FUNCTION update_platform_statistics();

CREATE TRIGGER trigger_update_stats_on_portfolio_works_change
  AFTER INSERT OR UPDATE OR DELETE ON portfolio_works
  FOR EACH ROW EXECUTE FUNCTION update_platform_statistics();

CREATE TRIGGER trigger_update_stats_on_article_likes_change
  AFTER INSERT OR DELETE ON article_likes
  FOR EACH ROW EXECUTE FUNCTION update_platform_statistics();

-- Create function to manually refresh all statistics
CREATE OR REPLACE FUNCTION refresh_platform_statistics()
RETURNS void AS $$
BEGIN
  PERFORM update_platform_statistics();
END;
$$ LANGUAGE plpgsql;

-- Enable RLS
ALTER TABLE public.platform_statistics ENABLE ROW LEVEL SECURITY;

-- RLS Policies for platform_statistics
CREATE POLICY "Everyone can view platform statistics" ON public.platform_statistics
  FOR SELECT USING (true);

CREATE POLICY "Only admins can update platform statistics" ON public.platform_statistics
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND is_admin = true
    )
  ); 