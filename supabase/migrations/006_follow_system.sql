-- src/supabase/migrations/006_follow_system.sql

-- Add follow counts to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS followers_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS following_count INTEGER DEFAULT 0;

-- Function to update profile follow counts
CREATE OR REPLACE FUNCTION update_profile_follow_counts()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    -- Increment following count for follower
    UPDATE profiles 
    SET following_count = following_count + 1 
    WHERE id = NEW.follower_id;
    
    -- Increment followers count for following
    UPDATE profiles 
    SET followers_count = followers_count + 1 
    WHERE id = NEW.following_id;
    
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    -- Decrement following count for follower
    UPDATE profiles 
    SET following_count = GREATEST(following_count - 1, 0) 
    WHERE id = OLD.follower_id;
    
    -- Decrement followers count for following
    UPDATE profiles 
    SET followers_count = GREATEST(followers_count - 1, 0) 
    WHERE id = OLD.following_id;
    
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for auto-updating follow counts
DROP TRIGGER IF EXISTS trigger_update_profile_follow_counts ON follows;
CREATE TRIGGER trigger_update_profile_follow_counts
  AFTER INSERT OR DELETE ON follows
  FOR EACH ROW EXECUTE FUNCTION update_profile_follow_counts();

-- Initialize existing follow counts (run once)
UPDATE profiles SET 
  followers_count = (
    SELECT COUNT(*) FROM follows WHERE following_id = profiles.id
  ),
  following_count = (
    SELECT COUNT(*) FROM follows WHERE follower_id = profiles.id
  );