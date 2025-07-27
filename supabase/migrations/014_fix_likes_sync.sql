-- src/supabase/migrations/014_fix_likes_sync.sql

-- Function to sync all article likes counts
CREATE OR REPLACE FUNCTION sync_all_article_likes_counts()
RETURNS void AS $$
DECLARE
  article_record RECORD;
BEGIN
  -- Loop through all articles and sync their likes counts
  FOR article_record IN 
    SELECT id FROM articles WHERE published = true
  LOOP
    -- Get real count from article_likes table
    UPDATE articles 
    SET likes_count = (
      SELECT COALESCE(COUNT(*), 0) 
      FROM article_likes 
      WHERE article_id = article_record.id
    ),
    updated_at = NOW()
    WHERE id = article_record.id;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Function to sync likes count for a specific article
CREATE OR REPLACE FUNCTION sync_article_likes_count(article_id UUID)
RETURNS INTEGER AS $$
DECLARE
  real_count INTEGER;
BEGIN
  -- Get real count from article_likes table
  SELECT COALESCE(COUNT(*), 0) INTO real_count
  FROM article_likes 
  WHERE article_id = sync_article_likes_count.article_id;
  
  -- Update articles table with real count
  UPDATE articles 
  SET likes_count = real_count,
      updated_at = NOW()
  WHERE id = sync_article_likes_count.article_id;
  
  RETURN real_count;
END;
$$ LANGUAGE plpgsql;

-- Improve the existing trigger function to be more robust
CREATE OR REPLACE FUNCTION update_article_likes_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    -- Increment likes count
    UPDATE articles 
    SET likes_count = COALESCE(likes_count, 0) + 1,
        updated_at = NOW()
    WHERE id = NEW.article_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    -- Decrement likes count, but don't go below 0
    UPDATE articles 
    SET likes_count = GREATEST(COALESCE(likes_count, 0) - 1, 0),
        updated_at = NOW()
    WHERE id = OLD.article_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Ensure the trigger exists and is working
DROP TRIGGER IF EXISTS on_article_like_change ON public.article_likes;
CREATE TRIGGER on_article_like_change
  AFTER INSERT OR DELETE ON public.article_likes
  FOR EACH ROW EXECUTE FUNCTION update_article_likes_count();

-- Sync all existing likes counts
SELECT sync_all_article_likes_counts();

-- Update platform statistics to reflect correct likes count
UPDATE platform_statistics 
SET stat_value = (SELECT COUNT(*) FROM article_likes),
    last_updated = NOW()
WHERE stat_key = 'total_likes'; 