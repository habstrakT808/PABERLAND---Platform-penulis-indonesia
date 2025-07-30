-- Drop the existing function first
DROP FUNCTION IF EXISTS get_user_stats(UUID);

-- Create improved function to get user statistics
CREATE OR REPLACE FUNCTION get_user_stats(user_id UUID)
RETURNS TABLE (
  totalArticles BIGINT,
  totalLikes BIGINT
) 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COALESCE(COUNT(DISTINCT a.id), 0) as totalArticles,
    COALESCE(SUM(COALESCE(a.likes_count, 0)), 0) as totalLikes
  FROM articles a
  WHERE a.author_id = user_id
    AND a.published = true;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION get_user_stats(UUID) TO authenticated;

-- Test the function with a sample user (optional - for debugging)
-- SELECT * FROM get_user_stats('some-user-id-here'); 