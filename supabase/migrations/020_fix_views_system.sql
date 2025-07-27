-- src/supabase/migrations/020_fix_views_system.sql

-- Fix views system and ensure data consistency

-- Step 1: Ensure views column has proper default and constraints
DO $$
BEGIN
  -- Check if views column exists and has proper default
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'articles' 
    AND column_name = 'views'
  ) THEN
    -- Update NULL views to 0
    UPDATE articles 
    SET views = 0 
    WHERE views IS NULL AND published = true;
    
    -- Ensure default value is set
    ALTER TABLE articles 
    ALTER COLUMN views SET DEFAULT 0;
    
    RAISE NOTICE '✅ Views column fixed and NULL values updated';
  ELSE
    RAISE NOTICE '❌ Views column missing from articles table';
  END IF;
END $$;

-- Step 2: Create function to safely increment views
CREATE OR REPLACE FUNCTION increment_article_views(article_id UUID)
RETURNS INTEGER AS $$
DECLARE
  current_views INTEGER;
  new_views INTEGER;
BEGIN
  -- Get current views with NULL handling
  SELECT COALESCE(views, 0) INTO current_views
  FROM articles 
  WHERE id = article_id AND published = true;
  
  IF NOT FOUND THEN
    RAISE NOTICE 'Article % not found or not published', article_id;
    RETURN 0;
  END IF;
  
  -- Calculate new views
  new_views := current_views + 1;
  
  -- Update views
  UPDATE articles 
  SET views = new_views, updated_at = NOW()
  WHERE id = article_id;
  
  RAISE NOTICE 'Incremented views for article %: % -> %', article_id, current_views, new_views;
  RETURN new_views;
  
EXCEPTION
  WHEN OTHERS THEN
    RAISE WARNING 'Error incrementing views for article %: %', article_id, SQLERRM;
    RETURN current_views;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 3: Create trigger for automatic view tracking (optional)
-- This can be used for more sophisticated view tracking
CREATE OR REPLACE FUNCTION log_article_view()
RETURNS TRIGGER AS $$
BEGIN
  -- This function can be extended to log individual views
  -- For now, we'll just increment the counter
  PERFORM increment_article_views(NEW.article_id);
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    RAISE WARNING 'Error in view logging: %', SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Step 4: Verify and fix existing data
DO $$
DECLARE
  total_articles INTEGER;
  articles_with_null_views INTEGER;
  articles_with_zero_views INTEGER;
  total_views INTEGER;
BEGIN
  -- Count total published articles
  SELECT COUNT(*) INTO total_articles 
  FROM articles WHERE published = true;
  
  -- Count articles with NULL views
  SELECT COUNT(*) INTO articles_with_null_views 
  FROM articles WHERE views IS NULL AND published = true;
  
  -- Count articles with 0 views
  SELECT COUNT(*) INTO articles_with_zero_views 
  FROM articles WHERE views = 0 AND published = true;
  
  -- Calculate total views
  SELECT COALESCE(SUM(views), 0) INTO total_views 
  FROM articles WHERE published = true;
  
  RAISE NOTICE '=== VIEWS SYSTEM DIAGNOSTIC ===';
  RAISE NOTICE 'Total published articles: %', total_articles;
  RAISE NOTICE 'Articles with NULL views: %', articles_with_null_views;
  RAISE NOTICE 'Articles with 0 views: %', articles_with_zero_views;
  RAISE NOTICE 'Total views across all articles: %', total_views;
  
  -- Fix any remaining NULL views
  IF articles_with_null_views > 0 THEN
    UPDATE articles 
    SET views = 0, updated_at = NOW()
    WHERE views IS NULL AND published = true;
    RAISE NOTICE 'Fixed % articles with NULL views', articles_with_null_views;
  END IF;
  
  RAISE NOTICE '=== END DIAGNOSTIC ===';
END $$;

-- Step 5: Test the increment function
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
    -- Test the increment function
    SELECT increment_article_views(test_article_id) INTO test_views;
    RAISE NOTICE 'Test increment for article %: views = %', test_article_id, test_views;
  ELSE
    RAISE NOTICE 'No published articles found for testing';
  END IF;
END $$; 