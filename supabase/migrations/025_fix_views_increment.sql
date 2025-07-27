-- src/supabase/migrations/025_fix_views_increment.sql

-- Fix views increment to ensure only +1 per call

-- Drop and recreate the function with better safety
DROP FUNCTION IF EXISTS increment_article_views_safe(UUID);

CREATE OR REPLACE FUNCTION increment_article_views_safe(article_id UUID)
RETURNS INTEGER AS $$
DECLARE
  current_views INTEGER;
  new_views INTEGER;
  article_title TEXT;
  is_published BOOLEAN;
BEGIN
  -- Get current views and article info with explicit checks
  SELECT COALESCE(views, 0), title, published INTO current_views, article_title, is_published
  FROM articles 
  WHERE id = article_id;
  
  IF NOT FOUND THEN
    RAISE NOTICE 'Article % not found', article_id;
    RETURN 0;
  END IF;
  
  IF NOT is_published THEN
    RAISE NOTICE 'Article "%" is not published, skipping view increment', article_title;
    RETURN current_views;
  END IF;
  
  -- Calculate new views (always +1)
  new_views := current_views + 1;
  
  -- Update views with explicit value and better error handling
  UPDATE articles 
  SET views = new_views, updated_at = NOW()
  WHERE id = article_id AND published = true;
  
  -- Verify the update was successful
  IF NOT FOUND THEN
    RAISE WARNING 'Update failed for article %', article_id;
    RETURN current_views;
  END IF;
  
  RAISE NOTICE 'Incremented views for article "%" (%): % -> % (+1)', article_title, article_id, current_views, new_views;
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

-- Create a function to check if views were incremented correctly
CREATE OR REPLACE FUNCTION verify_views_increment(article_id UUID)
RETURNS TABLE(old_views INTEGER, new_views INTEGER, increment_amount INTEGER) AS $$
DECLARE
  current_views INTEGER;
  updated_views INTEGER;
BEGIN
  -- Get current views
  SELECT COALESCE(views, 0) INTO current_views
  FROM articles 
  WHERE id = article_id;
  
  -- Increment views
  SELECT increment_article_views_safe(article_id) INTO updated_views;
  
  -- Return the results
  RETURN QUERY SELECT current_views, updated_views, (updated_views - current_views);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Test the function with the specific article
DO $$
DECLARE
  test_article_id UUID;
  test_views INTEGER;
  test_title TEXT;
  increment_result INTEGER;
BEGIN
  -- Get the specific article that's having issues
  SELECT id, title, views INTO test_article_id, test_title, test_views
  FROM articles 
  WHERE title = 'Bayang-Bayang Luka – Bab 10'
  LIMIT 1;
  
  IF test_article_id IS NOT NULL THEN
    RAISE NOTICE 'Testing increment for article: "%" (ID: %, Current views: %)', test_title, test_article_id, test_views;
    
    -- Test single increment
    SELECT increment_article_views_safe(test_article_id) INTO increment_result;
    RAISE NOTICE 'After single increment: % views (increment: +%)', increment_result, (increment_result - test_views);
    
    -- Test multiple increments to ensure they work correctly
    SELECT increment_article_views_safe(test_article_id) INTO increment_result;
    RAISE NOTICE 'After second increment: % views', increment_result;
    
  ELSE
    RAISE NOTICE 'Article "Bayang-Bayang Luka – Bab 10" not found';
  END IF;
END $$;

-- Create a function to reset views for testing
CREATE OR REPLACE FUNCTION reset_article_views(article_id UUID, new_views INTEGER DEFAULT 0)
RETURNS INTEGER AS $$
BEGIN
  UPDATE articles 
  SET views = new_views, updated_at = NOW()
  WHERE id = article_id;
  
  RETURN new_views;
EXCEPTION
  WHEN OTHERS THEN
    RAISE WARNING 'Error resetting views for article %: %', article_id, SQLERRM;
    RETURN 0;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION reset_article_views(UUID, INTEGER) TO authenticated;
GRANT EXECUTE ON FUNCTION reset_article_views(UUID, INTEGER) TO anon; 