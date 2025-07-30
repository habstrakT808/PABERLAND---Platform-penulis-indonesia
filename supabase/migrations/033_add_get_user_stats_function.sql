-- Create function to get user statistics
CREATE OR REPLACE FUNCTION get_user_stats(user_id UUID)
RETURNS TABLE (
  totalArticles BIGINT,
  totalLikes BIGINT
) 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COALESCE(COUNT(DISTINCT a.id), 0) as totalArticles,
    COALESCE(SUM(a.likes_count), 0) as totalLikes
  FROM articles a
  WHERE a.author_id = user_id;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION get_user_stats(UUID) TO authenticated; 