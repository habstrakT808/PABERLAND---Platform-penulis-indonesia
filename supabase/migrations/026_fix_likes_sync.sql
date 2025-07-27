-- src/supabase/migrations/026_fix_likes_sync.sql

-- Fix likes synchronization between articles and article_likes tables

-- Step 1: Create a function to sync all article likes counts
CREATE OR REPLACE FUNCTION sync_all_article_likes_counts()
RETURNS VOID AS $$
DECLARE
  article_record RECORD;
  real_likes_count INTEGER;
BEGIN
  RAISE NOTICE '🔄 Starting sync of all article likes counts...';
  
  FOR article_record IN 
    SELECT id, title, likes_count FROM articles WHERE published = true
  LOOP
    -- Get real likes count from article_likes table
    SELECT COUNT(*) INTO real_likes_count
    FROM article_likes 
    WHERE article_id = article_record.id;
    
    -- Update articles table
    UPDATE articles 
    SET likes_count = real_likes_count,
        updated_at = NOW()
    WHERE id = article_record.id;
    
    RAISE NOTICE 'Synced article "%" (ID: %): % likes', article_record.title, article_record.id, real_likes_count;
  END LOOP;
  
  RAISE NOTICE '✅ All article likes counts synced successfully';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 2: Create a function to sync a specific article's likes count
CREATE OR REPLACE FUNCTION sync_article_likes_count(article_id UUID)
RETURNS INTEGER AS $$
DECLARE
  real_likes_count INTEGER;
  article_title TEXT;
BEGIN
  -- Get real likes count from article_likes table
  SELECT COUNT(*) INTO real_likes_count
  FROM article_likes 
  WHERE article_id = sync_article_likes_count.article_id;
  
  -- Get article title for logging
  SELECT title INTO article_title
  FROM articles 
  WHERE id = sync_article_likes_count.article_id;
  
  -- Update articles table
  UPDATE articles 
  SET likes_count = real_likes_count,
      updated_at = NOW()
  WHERE id = sync_article_likes_count.article_id;
  
  RAISE NOTICE 'Synced article "%" (ID: %): % likes', article_title, sync_article_likes_count.article_id, real_likes_count;
  
  RETURN real_likes_count;
EXCEPTION
  WHEN OTHERS THEN
    RAISE WARNING 'Error syncing likes for article %: %', sync_article_likes_count.article_id, SQLERRM;
    RETURN 0;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 3: Improve the existing update_article_likes_count trigger
DROP TRIGGER IF EXISTS update_article_likes_count ON article_likes;

CREATE OR REPLACE FUNCTION update_article_likes_count()
RETURNS TRIGGER AS $$
DECLARE
  new_count INTEGER;
BEGIN
  -- Get the new count of likes for this article
  SELECT COUNT(*) INTO new_count
  FROM article_likes 
  WHERE article_id = COALESCE(NEW.article_id, OLD.article_id);
  
  -- Update the articles table
  UPDATE articles 
  SET likes_count = new_count,
      updated_at = NOW()
  WHERE id = COALESCE(NEW.article_id, OLD.article_id);
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger
CREATE TRIGGER update_article_likes_count
  AFTER INSERT OR DELETE ON article_likes
  FOR EACH ROW
  EXECUTE FUNCTION update_article_likes_count();

-- Step 4: Grant permissions
GRANT EXECUTE ON FUNCTION sync_all_article_likes_counts() TO authenticated;
GRANT EXECUTE ON FUNCTION sync_all_article_likes_counts() TO anon;
GRANT EXECUTE ON FUNCTION sync_article_likes_count(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION sync_article_likes_count(UUID) TO anon;

-- Step 5: Sync all existing articles
DO $$
DECLARE
  article_record RECORD;
  real_likes_count INTEGER;
  total_synced INTEGER := 0;
BEGIN
  RAISE NOTICE '🔄 Syncing all existing articles...';
  
  FOR article_record IN 
    SELECT id, title, likes_count FROM articles WHERE published = true
  LOOP
    -- Get real likes count from article_likes table
    SELECT COUNT(*) INTO real_likes_count
    FROM article_likes 
    WHERE article_id = article_record.id;
    
    -- Only update if different
    IF real_likes_count != article_record.likes_count THEN
      UPDATE articles 
      SET likes_count = real_likes_count,
          updated_at = NOW()
      WHERE id = article_record.id;
      
      total_synced := total_synced + 1;
      RAISE NOTICE 'Fixed article "%" (ID: %): % -> % likes', 
        article_record.title, article_record.id, article_record.likes_count, real_likes_count;
    END IF;
  END LOOP;
  
  RAISE NOTICE '✅ Sync completed. Fixed % articles', total_synced;
END $$;

-- Step 6: Test the sync for the specific article mentioned
DO $$
DECLARE
  test_article_id UUID;
  test_title TEXT;
  test_likes_count INTEGER;
  real_likes_count INTEGER;
BEGIN
  -- Find the article "Aku Mencintaimu dengan Sederhana"
  SELECT id, title, likes_count INTO test_article_id, test_title, test_likes_count
  FROM articles 
  WHERE title = 'Aku Mencintaimu dengan Sederhana'
  LIMIT 1;
  
  IF test_article_id IS NOT NULL THEN
    -- Get real likes count
    SELECT COUNT(*) INTO real_likes_count
    FROM article_likes 
    WHERE article_id = test_article_id;
    
    RAISE NOTICE 'Article: "%" (ID: %)', test_title, test_article_id;
    RAISE NOTICE 'Current likes_count in articles table: %', test_likes_count;
    RAISE NOTICE 'Real likes count from article_likes table: %', real_likes_count;
    
    -- Sync if different
    IF real_likes_count != test_likes_count THEN
      PERFORM sync_article_likes_count(test_article_id);
      RAISE NOTICE '✅ Article synced successfully';
    ELSE
      RAISE NOTICE '✅ Article already in sync';
    END IF;
  ELSE
    RAISE NOTICE 'Article "Aku Mencintaimu dengan Sederhana" not found';
  END IF;
END $$; 