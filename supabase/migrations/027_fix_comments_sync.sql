-- src/supabase/migrations/027_fix_comments_sync.sql

-- Fix comments synchronization between articles and comments tables

-- Step 1: Create a function to sync all article comments counts
CREATE OR REPLACE FUNCTION sync_all_article_comments_counts()
RETURNS VOID AS $$
DECLARE
  article_record RECORD;
  real_comments_count INTEGER;
BEGIN
  RAISE NOTICE '🔄 Starting sync of all article comments counts...';
  
  FOR article_record IN 
    SELECT id, title, comments_count FROM articles WHERE published = true
  LOOP
    -- Get real comments count from comments table
    SELECT COUNT(*) INTO real_comments_count
    FROM comments 
    WHERE article_id = article_record.id;
    
    -- Update articles table
    UPDATE articles 
    SET comments_count = real_comments_count,
        updated_at = NOW()
    WHERE id = article_record.id;
    
    RAISE NOTICE 'Synced article "%" (ID: %): % comments', article_record.title, article_record.id, real_comments_count;
  END LOOP;
  
  RAISE NOTICE '✅ All article comments counts synced successfully';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 2: Create a function to sync a specific article's comments count
CREATE OR REPLACE FUNCTION sync_article_comments_count(article_id UUID)
RETURNS INTEGER AS $$
DECLARE
  real_comments_count INTEGER;
  article_title TEXT;
BEGIN
  -- Get real comments count from comments table
  SELECT COUNT(*) INTO real_comments_count
  FROM comments 
  WHERE article_id = sync_article_comments_count.article_id;
  
  -- Get article title for logging
  SELECT title INTO article_title
  FROM articles 
  WHERE id = sync_article_comments_count.article_id;
  
  -- Update articles table
  UPDATE articles 
  SET comments_count = real_comments_count,
      updated_at = NOW()
  WHERE id = sync_article_comments_count.article_id;
  
  RAISE NOTICE 'Synced article "%" (ID: %): % comments', article_title, sync_article_comments_count.article_id, real_comments_count;
  
  RETURN real_comments_count;
EXCEPTION
  WHEN OTHERS THEN
    RAISE WARNING 'Error syncing comments for article %: %', sync_article_comments_count.article_id, SQLERRM;
    RETURN 0;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 3: Improve the existing update_article_comments_count trigger
DROP TRIGGER IF EXISTS update_article_comments_count_trigger ON comments;

CREATE OR REPLACE FUNCTION update_article_comments_count()
RETURNS TRIGGER AS $$
DECLARE
  new_count INTEGER;
BEGIN
  -- Get the new count of comments for this article
  SELECT COUNT(*) INTO new_count
  FROM comments 
  WHERE article_id = COALESCE(NEW.article_id, OLD.article_id);
  
  -- Update the articles table
  UPDATE articles 
  SET comments_count = new_count,
      updated_at = NOW()
  WHERE id = COALESCE(NEW.article_id, OLD.article_id);
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger
CREATE TRIGGER update_article_comments_count_trigger
  AFTER INSERT OR DELETE ON comments
  FOR EACH ROW
  EXECUTE FUNCTION update_article_comments_count();

-- Step 4: Grant permissions
GRANT EXECUTE ON FUNCTION sync_all_article_comments_counts() TO authenticated;
GRANT EXECUTE ON FUNCTION sync_all_article_comments_counts() TO anon;
GRANT EXECUTE ON FUNCTION sync_article_comments_count(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION sync_article_comments_count(UUID) TO anon;

-- Step 5: Sync all existing articles
DO $$
DECLARE
  article_record RECORD;
  real_comments_count INTEGER;
  total_synced INTEGER := 0;
BEGIN
  RAISE NOTICE '🔄 Syncing all existing articles comments...';
  
  FOR article_record IN 
    SELECT id, title, comments_count FROM articles WHERE published = true
  LOOP
    -- Get real comments count from comments table
    SELECT COUNT(*) INTO real_comments_count
    FROM comments 
    WHERE article_id = article_record.id;
    
    -- Only update if different
    IF real_comments_count != article_record.comments_count THEN
      UPDATE articles 
      SET comments_count = real_comments_count,
          updated_at = NOW()
      WHERE id = article_record.id;
      
      total_synced := total_synced + 1;
      RAISE NOTICE 'Fixed article "%" (ID: %): % -> % comments', 
        article_record.title, article_record.id, article_record.comments_count, real_comments_count;
    END IF;
  END LOOP;
  
  RAISE NOTICE '✅ Comments sync completed. Fixed % articles', total_synced;
END $$;

-- Step 6: Test the sync for articles with comments
DO $$
DECLARE
  test_article_id UUID;
  test_title TEXT;
  test_comments_count INTEGER;
  real_comments_count INTEGER;
BEGIN
  -- Find an article that might have comments
  SELECT id, title, comments_count INTO test_article_id, test_title, test_comments_count
  FROM articles 
  WHERE published = true
  ORDER BY created_at DESC
  LIMIT 1;
  
  IF test_article_id IS NOT NULL THEN
    -- Get real comments count
    SELECT COUNT(*) INTO real_comments_count
    FROM comments 
    WHERE article_id = test_article_id;
    
    RAISE NOTICE 'Article: "%" (ID: %)', test_title, test_article_id;
    RAISE NOTICE 'Current comments_count in articles table: %', test_comments_count;
    RAISE NOTICE 'Real comments count from comments table: %', real_comments_count;
    
    -- Sync if different
    IF real_comments_count != test_comments_count THEN
      PERFORM sync_article_comments_count(test_article_id);
      RAISE NOTICE '✅ Article comments synced successfully';
    ELSE
      RAISE NOTICE '✅ Article comments already in sync';
    END IF;
  ELSE
    RAISE NOTICE 'No published articles found for testing';
  END IF;
END $$;

-- Step 7: Update getUserStats function to use real comments count
-- This will be handled in the application code 