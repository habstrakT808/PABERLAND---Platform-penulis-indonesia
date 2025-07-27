-- src/supabase/migrations/013_fix_views.sql

-- Update NULL views to 0 for published articles
UPDATE articles 
SET views = 0 
WHERE views IS NULL AND published = true;

-- Ensure views field has default value
ALTER TABLE articles 
ALTER COLUMN views SET DEFAULT 0;

-- Update platform statistics manually
UPDATE platform_statistics 
SET stat_value = (
  SELECT COALESCE(SUM(views), 0) 
  FROM articles 
  WHERE published = true
),
last_updated = timezone('utc'::text, now())
WHERE stat_key = 'total_views';

-- Update other statistics as well
UPDATE platform_statistics 
SET stat_value = (
  SELECT COUNT(*) 
  FROM articles 
  WHERE published = true
),
last_updated = timezone('utc'::text, now())
WHERE stat_key = 'total_articles';

UPDATE platform_statistics 
SET stat_value = (
  SELECT COUNT(*) 
  FROM portfolio_works 
  WHERE status = 'published'
),
last_updated = timezone('utc'::text, now())
WHERE stat_key = 'total_portfolio_works';

UPDATE platform_statistics 
SET stat_value = (
  SELECT COUNT(*) 
  FROM profiles
),
last_updated = timezone('utc'::text, now())
WHERE stat_key = 'total_users';

UPDATE platform_statistics 
SET stat_value = (
  SELECT COUNT(*) 
  FROM article_likes
),
last_updated = timezone('utc'::text, now())
WHERE stat_key = 'total_likes';

-- Update total_content (articles + portfolio works)
UPDATE platform_statistics 
SET stat_value = (
  (SELECT COUNT(*) FROM articles WHERE published = true) +
  (SELECT COUNT(*) FROM portfolio_works WHERE status = 'published')
),
last_updated = timezone('utc'::text, now())
WHERE stat_key = 'total_content'; 