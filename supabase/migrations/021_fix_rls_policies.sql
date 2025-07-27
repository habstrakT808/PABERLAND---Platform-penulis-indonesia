-- src/supabase/migrations/021_fix_rls_policies.sql

-- Fix RLS policies for article_likes table

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view all likes" ON article_likes;
DROP POLICY IF EXISTS "Users can like articles" ON article_likes;
DROP POLICY IF EXISTS "Users can unlike their own likes" ON article_likes;
DROP POLICY IF EXISTS "Likes are viewable by everyone" ON article_likes;
DROP POLICY IF EXISTS "Users can manage their own likes" ON article_likes;

-- Create improved RLS policies for article_likes
CREATE POLICY "article_likes_select_policy" ON article_likes
  FOR SELECT USING (true);

CREATE POLICY "article_likes_insert_policy" ON article_likes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "article_likes_delete_policy" ON article_likes
  FOR DELETE USING (auth.uid() = user_id);

-- Ensure RLS is enabled
ALTER TABLE article_likes ENABLE ROW LEVEL SECURITY;

-- Fix RLS policies for profiles table
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

CREATE POLICY "profiles_select_policy" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "profiles_insert_policy" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_update_policy" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Ensure RLS is enabled for profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Fix RLS policies for articles table
DROP POLICY IF EXISTS "Published articles are viewable by everyone" ON articles;
DROP POLICY IF EXISTS "Users can insert their own articles" ON articles;
DROP POLICY IF EXISTS "Users can update own articles" ON articles;
DROP POLICY IF EXISTS "Users can delete own articles" ON articles;

CREATE POLICY "articles_select_policy" ON articles
  FOR SELECT USING (published = true OR auth.uid() = author_id);

CREATE POLICY "articles_insert_policy" ON articles
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "articles_update_policy" ON articles
  FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "articles_delete_policy" ON articles
  FOR DELETE USING (auth.uid() = author_id);

-- Ensure RLS is enabled for articles
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Fix RLS policies for comments table
DROP POLICY IF EXISTS "Comments are viewable by everyone" ON comments;
DROP POLICY IF EXISTS "Authenticated users can insert comments" ON comments;
DROP POLICY IF EXISTS "Users can update own comments" ON comments;
DROP POLICY IF EXISTS "Users can delete own comments" ON comments;

CREATE POLICY "comments_select_policy" ON comments
  FOR SELECT USING (true);

CREATE POLICY "comments_insert_policy" ON comments
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "comments_update_policy" ON comments
  FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "comments_delete_policy" ON comments
  FOR DELETE USING (auth.uid() = author_id);

-- Ensure RLS is enabled for comments
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Test the policies
DO $$
BEGIN
  RAISE NOTICE '=== RLS POLICIES VERIFICATION ===';
  
  -- Check if policies exist
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'article_likes' 
    AND policyname = 'article_likes_select_policy'
  ) THEN
    RAISE NOTICE '✅ article_likes SELECT policy exists';
  ELSE
    RAISE NOTICE '❌ article_likes SELECT policy missing';
  END IF;
  
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'article_likes' 
    AND policyname = 'article_likes_insert_policy'
  ) THEN
    RAISE NOTICE '✅ article_likes INSERT policy exists';
  ELSE
    RAISE NOTICE '❌ article_likes INSERT policy missing';
  END IF;
  
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'profiles' 
    AND policyname = 'profiles_select_policy'
  ) THEN
    RAISE NOTICE '✅ profiles SELECT policy exists';
  ELSE
    RAISE NOTICE '❌ profiles SELECT policy missing';
  END IF;
  
  RAISE NOTICE '=== END VERIFICATION ===';
END $$; 