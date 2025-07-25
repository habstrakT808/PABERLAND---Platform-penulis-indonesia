-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.article_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.follows ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Articles policies
CREATE POLICY "Published articles are viewable by everyone" ON public.articles 
  FOR SELECT USING (published = true OR auth.uid() = author_id);
CREATE POLICY "Users can insert their own articles" ON public.articles 
  FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Users can update own articles" ON public.articles 
  FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Users can delete own articles" ON public.articles 
  FOR DELETE USING (auth.uid() = author_id);

-- Comments policies
CREATE POLICY "Comments are viewable by everyone" ON public.comments FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert comments" ON public.comments 
  FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Users can update own comments" ON public.comments 
  FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Users can delete own comments" ON public.comments 
  FOR DELETE USING (auth.uid() = author_id);

-- Article likes policies
CREATE POLICY "Likes are viewable by everyone" ON public.article_likes FOR SELECT USING (true);
CREATE POLICY "Users can manage their own likes" ON public.article_likes 
  FOR ALL USING (auth.uid() = user_id);

-- Follows policies
CREATE POLICY "Follows are viewable by everyone" ON public.follows FOR SELECT USING (true);
CREATE POLICY "Users can manage their own follows" ON public.follows 
  FOR ALL USING (auth.uid() = follower_id);