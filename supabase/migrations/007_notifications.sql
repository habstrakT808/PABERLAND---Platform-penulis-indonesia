-- src/supabase/migrations/007_notifications.sql

-- Create notifications table
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('follow', 'like', 'comment', 'mention')),
  actor_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  target_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  article_id UUID REFERENCES public.articles(id) ON DELETE CASCADE,
  comment_id UUID REFERENCES public.comments(id) ON DELETE CASCADE,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_notifications_target_id ON public.notifications(target_id);
CREATE INDEX IF NOT EXISTS idx_notifications_actor_id ON public.notifications(actor_id);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON public.notifications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON public.notifications(read);

-- Enable RLS
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for notifications
CREATE POLICY "Users can view their own notifications" ON public.notifications 
  FOR SELECT USING (auth.uid() = target_id);
CREATE POLICY "Users can update their own notifications" ON public.notifications 
  FOR UPDATE USING (auth.uid() = target_id);
CREATE POLICY "System can insert notifications" ON public.notifications 
  FOR INSERT WITH CHECK (true);

-- Function to create follow notification
CREATE OR REPLACE FUNCTION create_follow_notification()
RETURNS TRIGGER AS $$
BEGIN
  -- Don't create notification if user follows themselves
  IF NEW.follower_id = NEW.following_id THEN
    RETURN NEW;
  END IF;

  -- Create follow notification
  INSERT INTO notifications (type, actor_id, target_id)
  VALUES ('follow', NEW.follower_id, NEW.following_id);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to create like notification
CREATE OR REPLACE FUNCTION create_like_notification()
RETURNS TRIGGER AS $$
DECLARE
  article_author_id UUID;
BEGIN
  -- Get article author
  SELECT author_id INTO article_author_id
  FROM articles
  WHERE id = NEW.article_id;

  -- Don't create notification if user likes their own article
  IF NEW.user_id = article_author_id THEN
    RETURN NEW;
  END IF;

  -- Create like notification
  INSERT INTO notifications (type, actor_id, target_id, article_id)
  VALUES ('like', NEW.user_id, article_author_id, NEW.article_id);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to create comment notification
CREATE OR REPLACE FUNCTION create_comment_notification()
RETURNS TRIGGER AS $$
DECLARE
  article_author_id UUID;
BEGIN
  -- Get article author
  SELECT author_id INTO article_author_id
  FROM articles
  WHERE id = NEW.article_id;

  -- Don't create notification if user comments on their own article
  IF NEW.author_id = article_author_id THEN
    RETURN NEW;
  END IF;

  -- Create comment notification
  INSERT INTO notifications (type, actor_id, target_id, article_id, comment_id)
  VALUES ('comment', NEW.author_id, article_author_id, NEW.article_id, NEW.id);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for notifications
DROP TRIGGER IF EXISTS trigger_create_follow_notification ON follows;
CREATE TRIGGER trigger_create_follow_notification
  AFTER INSERT ON follows
  FOR EACH ROW EXECUTE FUNCTION create_follow_notification();

DROP TRIGGER IF EXISTS trigger_create_like_notification ON article_likes;
CREATE TRIGGER trigger_create_like_notification
  AFTER INSERT ON article_likes
  FOR EACH ROW EXECUTE FUNCTION create_like_notification();

DROP TRIGGER IF EXISTS trigger_create_comment_notification ON comments;
CREATE TRIGGER trigger_create_comment_notification
  AFTER INSERT ON comments
  FOR EACH ROW EXECUTE FUNCTION create_comment_notification();

-- Function to clean old notifications (optional, for maintenance)
CREATE OR REPLACE FUNCTION clean_old_notifications()
RETURNS void AS $$
BEGIN
  -- Delete notifications older than 3 months
  DELETE FROM notifications 
  WHERE created_at < NOW() - INTERVAL '3 months';
END;
$$ LANGUAGE plpgsql;