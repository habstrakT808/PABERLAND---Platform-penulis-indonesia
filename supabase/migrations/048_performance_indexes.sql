-- Performance Optimization Indexes
-- Migration: 048_performance_indexes.sql
-- Created: 2024-01-XX for Hostinger Performance Optimization

-- 1. Search Performance Indexes
-- Full-text search index untuk articles (title, excerpt, content)
CREATE INDEX IF NOT EXISTS idx_articles_search_fts 
ON articles USING gin(to_tsvector('indonesian', title || ' ' || excerpt || ' ' || content));

-- Index untuk category filtering
CREATE INDEX IF NOT EXISTS idx_articles_category 
ON articles(category) WHERE published = true;

-- Index untuk published articles
CREATE INDEX IF NOT EXISTS idx_articles_published 
ON articles(published, created_at DESC) WHERE published = true;

-- Composite index untuk homepage queries
CREATE INDEX IF NOT EXISTS idx_articles_homepage 
ON articles(published, created_at DESC, category) WHERE published = true;

-- 2. User/Profile Performance Indexes
-- Index untuk profile lookup by id (most common query)
CREATE INDEX IF NOT EXISTS idx_profiles_created 
ON profiles(created_at DESC);

-- Index untuk admin users
CREATE INDEX IF NOT EXISTS idx_profiles_admin 
ON profiles(is_admin, created_at DESC);

-- 3. Comments Performance Indexes
-- Index untuk article comments
CREATE INDEX IF NOT EXISTS idx_comments_article_created 
ON comments(article_id, created_at DESC);

-- Index untuk comment replies
CREATE INDEX IF NOT EXISTS idx_comments_parent_replies 
ON comments(parent_id, created_at ASC) WHERE parent_id IS NOT NULL;

-- 4. Likes Performance Indexes
-- Index untuk article likes count
CREATE INDEX IF NOT EXISTS idx_article_likes_article_user 
ON article_likes(article_id, user_id);

-- Index untuk user's liked articles
CREATE INDEX IF NOT EXISTS idx_article_likes_user_created 
ON article_likes(user_id, created_at DESC);

-- 5. Portfolio Performance Indexes
-- Index untuk author portfolio
CREATE INDEX IF NOT EXISTS idx_portfolio_works_author_status 
ON portfolio_works(author_id, status, created_at DESC);

-- Index untuk portfolio category
CREATE INDEX IF NOT EXISTS idx_portfolio_works_category 
ON portfolio_works(category, created_at DESC) WHERE status = 'published';

-- 6. Statistics Performance Indexes
-- Index untuk platform statistics calculation
CREATE INDEX IF NOT EXISTS idx_articles_stats 
ON articles(published, created_at, views, likes_count) WHERE published = true;

-- 7. Featured Content Performance
-- Index untuk featured content
CREATE INDEX IF NOT EXISTS idx_featured_content_active 
ON featured_content(content_type, active, priority DESC) WHERE active = true;

-- 8. Admin Performance Indexes
-- Index untuk admin queries
CREATE INDEX IF NOT EXISTS idx_articles_admin_search 
ON articles(created_at DESC, published, author_id);

-- 9. Additional Performance Indexes (only for existing tables)
-- Note: Views and notifications tables will be indexed separately if they exist

-- Performance Analysis Query
-- Run this to check index usage after deployment:
/*
SELECT 
  schemaname,
  tablename,
  indexname,
  idx_scan as index_scans,
  idx_tup_read as tuples_read,
  idx_tup_fetch as tuples_fetched
FROM pg_stat_user_indexes 
WHERE schemaname = 'public'
ORDER BY idx_scan DESC;
*/

-- Success message
SELECT 'Performance indexes created successfully! 🚀' as status;

-- Note: Run VACUUM ANALYZE separately after index creation:
-- VACUUM ANALYZE articles;
-- VACUUM ANALYZE profiles;
-- VACUUM ANALYZE comments;
-- VACUUM ANALYZE article_likes;
-- VACUUM ANALYZE portfolio_works;