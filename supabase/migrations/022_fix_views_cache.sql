-- src/supabase/migrations/022_fix_views_cache.sql

-- Fix views caching and consistency issues

-- Step 1: Check current views data
DO $$
DECLARE
  article_record RECORD;
  total_articles INTEGER;
  articles_with_zero_views INTEGER;
  articles_with_null_views INTEGER;
BEGIN
  RAISE NOTICE '=== VIEWS DATA DIAGNOSTIC ===';
  
  -- Count total published articles
  SELECT COUNT(*) INTO total_articles 
  FROM articles WHERE published = true;
  
  -- Count articles with 0 views
  SELECT COUNT(*) INTO articles_with_zero_views 
  FROM articles WHERE views = 0 AND published = true;
  
  -- Count articles with NULL views
  SELECT COUNT(*) INTO articles_with_null_views 
  FROM articles WHERE views IS NULL AND published = true;
  
  RAISE NOTICE 'Total published articles: %', total_articles;
  RAISE NOTICE 'Articles with 0 views: %', articles_with_zero_views;
  RAISE NOTICE 'Articles with NULL views: %', articles_with_null_views;
  
  -- Show sample articles with their views
  RAISE NOTICE 'Sample articles and their views:';
  FOR article_record IN 
    SELECT id, title, views, published, created_at 
    FROM articles 
    WHERE published = true 
    ORDER BY created_at DESC 
    LIMIT 5
  LOOP
    RAISE NOTICE '  - %: "%" (views: %, published: %, created: %)', 
      article_record.id, 
      article_record.title, 
      article_record.views, 
      article_record.published, 
      article_record.created_at;
  END LOOP;
  
  RAISE NOTICE '=== END DIAGNOSTIC ===';
END $$;

-- Step 2: Create a function to force refresh views
CREATE OR REPLACE FUNCTION refresh_article_views(article_id UUID)
RETURNS INTEGER AS $$
DECLARE
  current_views INTEGER;
BEGIN
  -- Get current views from database
  SELECT COALESCE(views, 0) INTO current_views
  FROM articles 
  WHERE id = article_id AND published = true;
  
  IF NOT FOUND THEN
    RAISE NOTICE 'Article % not found or not published', article_id;
    RETURN 0;
  END IF;
  
  -- Force update to trigger any cache invalidation
  UPDATE articles 
  SET updated_at = NOW()
  WHERE id = article_id;
  
  RAISE NOTICE 'Refreshed views for article %: %', article_id, current_views;
  RETURN current_views;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 3: Create a function to get real-time views
CREATE OR REPLACE FUNCTION get_article_views(article_id UUID)
RETURNS INTEGER AS $$
DECLARE
  current_views INTEGER;
BEGIN
  -- Get current views with explicit query
  SELECT COALESCE(views, 0) INTO current_views
  FROM articles 
  WHERE id = article_id AND published = true;
  
  IF NOT FOUND THEN
    RETURN 0;
  END IF;
  
  RETURN current_views;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 4: Test the functions
DO $$
DECLARE
  test_article_id UUID;
  test_views INTEGER;
BEGIN
  -- Get a test article
  SELECT id INTO test_article_id 
  FROM articles 
  WHERE published = true 
  LIMIT 1;
  
  IF test_article_id IS NOT NULL THEN
    -- Test the refresh function
    SELECT refresh_article_views(test_article_id) INTO test_views;
    RAISE NOTICE 'Test refresh for article %: views = %', test_article_id, test_views;
    
    -- Test the get views function
    SELECT get_article_views(test_article_id) INTO test_views;
    RAISE NOTICE 'Test get views for article %: views = %', test_article_id, test_views;
  ELSE
    RAISE NOTICE 'No published articles found for testing';
  END IF;
END $$;

-- Step 5: Ensure all articles have proper views data
UPDATE articles 
SET views = COALESCE(views, 0)
WHERE published = true AND views IS NULL;

-- Step 6: Create index for better performance
CREATE INDEX IF NOT EXISTS idx_articles_views ON articles(views) WHERE published = true;
CREATE INDEX IF NOT EXISTS idx_articles_slug_published ON articles(slug, published) WHERE published = true; 