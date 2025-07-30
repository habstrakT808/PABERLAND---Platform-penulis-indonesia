-- Comprehensive debugging for user stats issue
DO $$
DECLARE
  test_user_id UUID;
  article_count INTEGER;
  total_likes INTEGER;
  sample_article RECORD;
  user_stats RECORD;
BEGIN
  -- Find a user who has published articles
  SELECT author_id INTO test_user_id 
  FROM articles 
  WHERE published = true 
  LIMIT 1;
  
  IF test_user_id IS NULL THEN
    RAISE NOTICE '❌ No published articles found in database';
    RETURN;
  END IF;
  
  RAISE NOTICE '🔍 Testing with user ID: %', test_user_id;
  
  -- Get user's profile info
  SELECT full_name INTO sample_article FROM profiles WHERE id = test_user_id;
  RAISE NOTICE '👤 User name: %', sample_article.full_name;
  
  -- Manual count of user's articles
  SELECT COUNT(*) INTO article_count 
  FROM articles 
  WHERE author_id = test_user_id AND published = true;
  
  RAISE NOTICE '📊 Manual count - Articles: %', article_count;
  
  -- Manual sum of likes from user's articles
  SELECT COALESCE(SUM(likes_count), 0) INTO total_likes 
  FROM articles 
  WHERE author_id = test_user_id AND published = true;
  
  RAISE NOTICE '❤️ Manual count - Total likes: %', total_likes;
  
  -- Show sample articles by this user
  RAISE NOTICE '📝 Sample articles by this user:';
  FOR sample_article IN 
    SELECT id, title, likes_count, published 
    FROM articles 
    WHERE author_id = test_user_id 
    ORDER BY created_at DESC 
    LIMIT 3
  LOOP
    RAISE NOTICE '  - % (likes: %, published: %)', 
      sample_article.title, 
      sample_article.likes_count, 
      sample_article.published;
  END LOOP;
  
  -- Test the function
  SELECT * INTO user_stats FROM get_user_stats(test_user_id);
  RAISE NOTICE '🔧 Function result - Articles: %, Likes: %', 
    user_stats.totalArticles, user_stats.totalLikes;
  
  -- Check if there's a mismatch
  IF user_stats.totalArticles != article_count OR user_stats.totalLikes != total_likes THEN
    RAISE NOTICE '❌ MISMATCH DETECTED! Function is not working correctly.';
    RAISE NOTICE '   Expected: Articles=%, Likes=%', article_count, total_likes;
    RAISE NOTICE '   Got: Articles=%, Likes=%', user_stats.totalArticles, user_stats.totalLikes;
  ELSE
    RAISE NOTICE '✅ Function working correctly!';
  END IF;
  
END $$;

-- Check RLS policies on articles table (simplified)
DO $$
DECLARE
  policy_name TEXT;
  policy_cmd TEXT;
BEGIN
  RAISE NOTICE '🔒 RLS policies on articles table:';
  
  -- Show all policies
  FOR policy_name, policy_cmd IN 
    SELECT policyname, cmd
    FROM pg_policies 
    WHERE tablename = 'articles'
  LOOP
    RAISE NOTICE '  Policy: % (%s)', policy_name, policy_cmd;
  END LOOP;
END $$; 