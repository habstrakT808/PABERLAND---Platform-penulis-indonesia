-- Test and debug the get_user_stats function
-- First, let's check if there are any articles in the database
DO $$
DECLARE
  total_articles INTEGER;
  total_published INTEGER;
  sample_user_id UUID;
  user_stats RECORD;
BEGIN
  -- Check total articles
  SELECT COUNT(*) INTO total_articles FROM articles;
  SELECT COUNT(*) INTO total_published FROM articles WHERE published = true;
  
  RAISE NOTICE 'Total articles in database: %', total_articles;
  RAISE NOTICE 'Total published articles: %', total_published;
  
  -- Get a sample user with articles
  SELECT author_id INTO sample_user_id 
  FROM articles 
  WHERE published = true 
  LIMIT 1;
  
  IF sample_user_id IS NOT NULL THEN
    RAISE NOTICE 'Testing with user ID: %', sample_user_id;
    
    -- Test the function
    SELECT * INTO user_stats FROM get_user_stats(sample_user_id);
    
    RAISE NOTICE 'User stats - Articles: %, Likes: %', user_stats.totalArticles, user_stats.totalLikes;
    
    -- Manual verification
    SELECT COUNT(*) INTO total_articles 
    FROM articles 
    WHERE author_id = sample_user_id AND published = true;
    
    SELECT COALESCE(SUM(likes_count), 0) INTO total_published 
    FROM articles 
    WHERE author_id = sample_user_id AND published = true;
    
    RAISE NOTICE 'Manual verification - Articles: %, Likes: %', total_articles, total_published;
  ELSE
    RAISE NOTICE 'No published articles found for testing';
  END IF;
END $$; 