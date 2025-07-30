-- Create a public function that bypasses RLS for user stats
-- This will help us determine if the issue is with RLS policies

CREATE OR REPLACE FUNCTION get_user_stats_public(user_id UUID)
RETURNS TABLE (
  totalArticles BIGINT,
  totalLikes BIGINT
) 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Temporarily disable RLS for this function
  SET row_security = off;
  
  RETURN QUERY
  SELECT 
    COALESCE(COUNT(DISTINCT a.id), 0) as totalArticles,
    COALESCE(SUM(COALESCE(a.likes_count, 0)), 0) as totalLikes
  FROM articles a
  WHERE a.author_id = user_id
    AND a.published = true;
    
  -- Re-enable RLS
  SET row_security = on;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION get_user_stats_public(UUID) TO authenticated;

-- Test the new function
DO $$
DECLARE
  test_user_id UUID;
  user_stats RECORD;
BEGIN
  -- Find a user with articles
  SELECT author_id INTO test_user_id 
  FROM articles 
  WHERE published = true 
  LIMIT 1;
  
  IF test_user_id IS NOT NULL THEN
    RAISE NOTICE '🧪 Testing public function with user: %', test_user_id;
    
    SELECT * INTO user_stats FROM get_user_stats_public(test_user_id);
    RAISE NOTICE '📊 Public function result - Articles: %, Likes: %', 
      user_stats.totalArticles, user_stats.totalLikes;
  END IF;
END $$; 