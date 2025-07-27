-- src/supabase/migrations/012_fix_platform_statistics.sql

-- Drop existing triggers and function
DROP TRIGGER IF EXISTS trigger_update_stats_on_profiles_change ON profiles;
DROP TRIGGER IF EXISTS trigger_update_stats_on_articles_change ON articles;
DROP TRIGGER IF EXISTS trigger_update_stats_on_portfolio_works_change ON portfolio_works;
DROP TRIGGER IF EXISTS trigger_update_stats_on_article_likes_change ON article_likes;
DROP FUNCTION IF EXISTS update_platform_statistics();
DROP FUNCTION IF EXISTS refresh_platform_statistics();

-- Recreate improved function to update platform statistics
CREATE OR REPLACE FUNCTION update_platform_statistics()
RETURNS void AS $$
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
    COALESCE((SELECT COUNT(*) FROM articles WHERE published = true), 0) +
    COALESCE((SELECT COUNT(*) FROM portfolio_works WHERE status = 'published'), 0)
  ),
      last_updated = timezone('utc'::text, now())
  WHERE stat_key = 'total_content';

  -- Update total_views (from articles)
  UPDATE platform_statistics 
  SET stat_value = COALESCE((SELECT SUM(views) FROM articles WHERE published = true), 0),
      last_updated = timezone('utc'::text, now())
  WHERE stat_key = 'total_views';

  -- Update total_likes
  UPDATE platform_statistics 
  SET stat_value = (SELECT COUNT(*) FROM article_likes),
      last_updated = timezone('utc'::text, now())
  WHERE stat_key = 'total_likes';

END;
$$ LANGUAGE plpgsql;

-- Create improved trigger function
CREATE OR REPLACE FUNCTION trigger_update_platform_statistics()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM update_platform_statistics();
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Create triggers
CREATE TRIGGER trigger_update_stats_on_profiles_change
  AFTER INSERT OR DELETE ON profiles
  FOR EACH ROW EXECUTE FUNCTION trigger_update_platform_statistics();

CREATE TRIGGER trigger_update_stats_on_articles_change
  AFTER INSERT OR UPDATE OR DELETE ON articles
  FOR EACH ROW EXECUTE FUNCTION trigger_update_platform_statistics();

CREATE TRIGGER trigger_update_stats_on_portfolio_works_change
  AFTER INSERT OR UPDATE OR DELETE ON portfolio_works
  FOR EACH ROW EXECUTE FUNCTION trigger_update_platform_statistics();

CREATE TRIGGER trigger_update_stats_on_article_likes_change
  AFTER INSERT OR DELETE ON article_likes
  FOR EACH ROW EXECUTE FUNCTION trigger_update_platform_statistics();

-- Manual refresh function
CREATE OR REPLACE FUNCTION refresh_platform_statistics()
RETURNS void AS $$
BEGIN
  PERFORM update_platform_statistics();
END;
$$ LANGUAGE plpgsql;

-- Initialize statistics with current data
SELECT update_platform_statistics();