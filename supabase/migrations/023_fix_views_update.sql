-- src/supabase/migrations/023_fix_views_update.sql

-- Fix views update issues

-- Step 1: Check if there are any RLS policies blocking updates
DO $$
BEGIN
  RAISE NOTICE '=== CHECKING RLS POLICIES ===';
  
  -- Check articles table policies
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'articles' 
    AND policyname = 'articles_update_policy'
  ) THEN
    RAISE NOTICE '✅ articles UPDATE policy exists';
  ELSE
    RAISE NOTICE '❌ articles UPDATE policy missing';
  END IF;
  
  -- Check if RLS is enabled
  IF EXISTS (
    SELECT 1 FROM pg_tables 
    WHERE tablename = 'articles' 
    AND rowsecurity = true
  ) THEN
    RAISE NOTICE '✅ RLS is enabled on articles table';
  ELSE
    RAISE NOTICE '❌ RLS is not enabled on articles table';
  END IF;
END $$;

-- Step 2: Create a function to increment views that bypasses RLS
CREATE OR REPLACE FUNCTION increment_article_views_safe(article_id UUID)
RETURNS INTEGER AS $$
DECLARE
  current_views INTEGER;
  new_views INTEGER;
BEGIN
  -- Get current views
  SELECT COALESCE(views, 0) INTO current_views
  FROM articles 
  WHERE id = article_id AND published = true;
  
  IF NOT FOUND THEN
    RAISE NOTICE 'Article % not found or not published', article_id;
    RETURN 0;
  END IF;
  
  -- Calculate new views
  new_views := current_views + 1;
  
  -- Update views with SECURITY DEFINER to bypass RLS
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

-- Step 3: Test the safe increment function
DO $$
DECLARE
  test_article_id UUID;
  test_views INTEGER;
BEGIN
  -- Get a test article
  SELECT id INTO test_article_id 
  FROM articles 
  WHERE published = true AND views = 0
  LIMIT 1;
  
  IF test_article_id IS NOT NULL THEN
    -- Test the safe increment function
    SELECT increment_article_views_safe(test_article_id) INTO test_views;
    RAISE NOTICE 'Test safe increment for article %: views = %', test_article_id, test_views;
  ELSE
    RAISE NOTICE 'No articles with 0 views found for testing';
  END IF;
END $$;

-- Step 4: Create a trigger to automatically increment views on page load
-- (This is an alternative approach)
CREATE OR REPLACE FUNCTION log_article_view()
RETURNS TRIGGER AS $$
BEGIN
  -- This function can be called to log a view
  PERFORM increment_article_views_safe(NEW.article_id);
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    RAISE WARNING 'Error in view logging: %', SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 5: Ensure the views column has proper constraints
ALTER TABLE articles 
ALTER COLUMN views SET DEFAULT 0;

-- Update any NULL views to 0
UPDATE articles 
SET views = 0 
WHERE views IS NULL AND published = true;

-- Step 6: Create index for better performance
CREATE INDEX IF NOT EXISTS idx_articles_id_views ON articles(id, views) WHERE published = true;

-- Step 7: Test the current state
DO $$
DECLARE
  test_article_id UUID;
  test_views INTEGER;
BEGIN
  -- Get the specific article that's having issues
  SELECT id INTO test_article_id 
  FROM articles 
  WHERE title = 'Aku Mencintaimu dengan Sederhana'
  LIMIT 1;
  
  IF test_article_id IS NOT NULL THEN
    -- Check current views
    SELECT views INTO test_views 
    FROM articles 
    WHERE id = test_article_id;
    
    RAISE NOTICE 'Current views for "Aku Mencintaimu dengan Sederhana": %', test_views;
    
    -- Test increment
    SELECT increment_article_views_safe(test_article_id) INTO test_views;
    RAISE NOTICE 'After increment: %', test_views;
  ELSE
    RAISE NOTICE 'Article "Aku Mencintaimu dengan Sederhana" not found';
  END IF;
END $$; 