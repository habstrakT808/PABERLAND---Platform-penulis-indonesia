-- src/supabase/migrations/024_ensure_views_function.sql

-- Ensure the increment_article_views_safe function exists and works properly

-- Drop and recreate the function to ensure it's up to date
DROP FUNCTION IF EXISTS increment_article_views_safe(UUID);

CREATE OR REPLACE FUNCTION increment_article_views_safe(article_id UUID)
RETURNS INTEGER AS $$
DECLARE
  current_views INTEGER;
  new_views INTEGER;
  article_title TEXT;
BEGIN
  -- Get current views and article info
  SELECT COALESCE(views, 0), title INTO current_views, article_title
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
  
  RAISE NOTICE 'Incremented views for article "%" (%): % -> %', article_title, article_id, current_views, new_views;
  RETURN new_views;
  
EXCEPTION
  WHEN OTHERS THEN
    RAISE WARNING 'Error incrementing views for article %: %', article_id, SQLERRM;
    RETURN current_views;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated and anon users
GRANT EXECUTE ON FUNCTION increment_article_views_safe(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION increment_article_views_safe(UUID) TO anon;

-- Test the function
DO $$
DECLARE
  test_article_id UUID;
  test_views INTEGER;
  test_title TEXT;
BEGIN
  -- Get the specific article that's having issues
  SELECT id, title, views INTO test_article_id, test_title, test_views
  FROM articles 
  WHERE title = 'Aku Mencintaimu dengan Sederhana'
  LIMIT 1;
  
  IF test_article_id IS NOT NULL THEN
    RAISE NOTICE 'Testing function for article: "%" (ID: %, Current views: %)', test_title, test_article_id, test_views;
    
    -- Test increment
    SELECT increment_article_views_safe(test_article_id) INTO test_views;
    RAISE NOTICE 'After increment: % views', test_views;
  ELSE
    RAISE NOTICE 'Article "Aku Mencintaimu dengan Sederhana" not found';
  END IF;
END $$;

-- Create a simple function to get article views
CREATE OR REPLACE FUNCTION get_article_views(article_id UUID)
RETURNS INTEGER AS $$
DECLARE
  article_views INTEGER;
BEGIN
  SELECT COALESCE(views, 0) INTO article_views
  FROM articles 
  WHERE id = article_id AND published = true;
  
  RETURN COALESCE(article_views, 0);
EXCEPTION
  WHEN OTHERS THEN
    RETURN 0;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION get_article_views(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION get_article_views(UUID) TO anon; 