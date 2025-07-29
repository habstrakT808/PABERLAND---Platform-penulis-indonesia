-- src/supabase/migrations/034_fix_active_authors_stats.sql

-- Update the platform statistics function to count active authors only
CREATE OR REPLACE FUNCTION update_platform_statistics()
RETURNS void AS $$
BEGIN
  -- Update total_users to count ACTIVE AUTHORS only (authors with published articles)
  UPDATE platform_statistics 
  SET stat_value = (
    SELECT COUNT(DISTINCT author_id) 
    FROM articles 
    WHERE published = true
  ),
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

-- Refresh statistics with new logic
SELECT update_platform_statistics();