-- src/supabase/migrations/005_like_system.sql

-- Create article_likes table
CREATE TABLE IF NOT EXISTS article_likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  article_id UUID NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(article_id, user_id)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_article_likes_article_id ON article_likes(article_id);
CREATE INDEX IF NOT EXISTS idx_article_likes_user_id ON article_likes(user_id);

-- Enable RLS
ALTER TABLE article_likes ENABLE ROW LEVEL SECURITY;

-- RLS Policies for article_likes
CREATE POLICY "Users can view all likes" ON article_likes FOR SELECT USING (true);
CREATE POLICY "Users can like articles" ON article_likes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can unlike their own likes" ON article_likes FOR DELETE USING (auth.uid() = user_id);

-- Function to update article likes count
CREATE OR REPLACE FUNCTION update_article_likes_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE articles 
    SET likes_count = likes_count + 1 
    WHERE id = NEW.article_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE articles 
    SET likes_count = GREATEST(likes_count - 1, 0) 
    WHERE id = OLD.article_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for auto-updating likes count
DROP TRIGGER IF EXISTS trigger_update_article_likes_count ON article_likes;
CREATE TRIGGER trigger_update_article_likes_count
  AFTER INSERT OR DELETE ON article_likes
  FOR EACH ROW EXECUTE FUNCTION update_article_likes_count();