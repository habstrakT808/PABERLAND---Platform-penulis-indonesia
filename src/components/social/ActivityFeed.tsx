// src/components/social/ActivityFeed.tsx
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase, ArticleSummary, articleHelpers } from "@/lib/supabase";
import {
  ClockIcon,
  EyeIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  SparklesIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import LikeButton from "@/components/article/LikeButton";

interface ActivityItem extends ArticleSummary {
  author_name: string;
  author_avatar: string | null;
  author_id: string;
}

export default function ActivityFeed() {
  const { user } = useAuth();
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const itemsPerPage = 5;

  useEffect(() => {
    if (user) {
      fetchActivityFeed();
    }
  }, [user]);

  const fetchActivityFeed = async (pageNum = 1) => {
    if (!user) return;

    setLoading(pageNum === 1);
    setLoadingMore(pageNum > 1);

    try {
      // Get users that current user follows
      const { data: following, error: followError } = await supabase
        .from("follows")
        .select("following_id")
        .eq("follower_id", user.id);

      if (followError) {
        console.error("Error fetching following:", followError);
        return;
      }

      if (!following || following.length === 0) {
        setActivities([]);
        setHasMore(false);
        return;
      }

      const followingIds = following.map((f) => f.following_id);

      // Get articles from followed users
      const from = (pageNum - 1) * itemsPerPage;
      const to = from + itemsPerPage - 1;

      const { data: articles, error: articlesError } = await supabase
        .from("articles")
        .select(
          `
          id,
          title,
          excerpt,
          cover_image,
          category,
          slug,
          views,
          likes_count,
          comments_count,
          created_at,
          profiles:author_id (
            id,
            full_name,
            avatar_url
          )
        `
        )
        .in("author_id", followingIds)
        .eq("published", true)
        .order("created_at", { ascending: false })
        .range(from, to);

      if (articlesError) {
        console.error("Error fetching activity feed:", articlesError);
        return;
      }

      const formattedArticles: ActivityItem[] = (articles || []).map(
        (article: any) => ({
          ...article,
          author_name: article.profiles?.full_name || "Unknown",
          author_avatar: article.profiles?.avatar_url || null,
          author_id: article.profiles?.id || "",
          profiles: article.profiles,
        })
      );

      if (pageNum === 1) {
        setActivities(formattedArticles);
      } else {
        setActivities((prev) => [...prev, ...formattedArticles]);
      }

      setHasMore(formattedArticles.length === itemsPerPage);
      setPage(pageNum);
    } catch (error) {
      console.error("Error fetching activity feed:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMore = () => {
    if (!loadingMore && hasMore) {
      fetchActivityFeed(page + 1);
    }
  };

  const getCategoryEmoji = (category: string) => {
    const emojiMap: { [key: string]: string } = {
      cerpen: "📖",
      puisi: "🎭",
      artikel: "📰",
      "cerita-rakyat": "🏛️",
      "novel-berseri": "📚",
      lainnya: "✨",
    };
    return emojiMap[category] || "📝";
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  if (!user) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 text-center">
        <BookOpenIcon className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Login untuk Melihat Feed
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Login untuk melihat artikel terbaru dari penulis yang Anda ikuti.
        </p>
        <Link
          href="/auth/login"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Login Sekarang
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 animate-pulse"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/6 mt-1"></div>
              </div>
            </div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  if (activities.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Feed Header */}
      <div className="flex items-center space-x-3 mb-6">
        <SparklesIcon className="w-6 h-6 text-indigo-500" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Feed Aktivitas
        </h2>
      </div>

      {/* Activity Items */}
      {activities.map((activity) => (
        <article
          key={activity.id}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-300"
        >
          {/* Author Info */}
          <div className="flex items-center space-x-3 mb-4">
            <Link
              href={`/profile/${activity.author_id}`}
              className="flex-shrink-0"
            >
              {activity.author_avatar ? (
                <Image
                  src={activity.author_avatar}
                  alt={activity.author_name}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {activity.author_name.charAt(0)}
                </div>
              )}
            </Link>

            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <Link
                  href={`/profile/${activity.author_id}`}
                  className="font-medium text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  {activity.author_name}
                </Link>
                <span className="text-gray-500 dark:text-gray-400 text-sm">
                  mempublikasikan artikel baru
                </span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <ClockIcon className="w-4 h-4" />
                <span>
                  {articleHelpers.formatRelativeTime(activity.created_at)}
                </span>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="mb-4">
            {/* Category Badge */}
            <div className="flex items-center justify-between mb-3">
              <span className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                <span className="mr-1">
                  {getCategoryEmoji(activity.category)}
                </span>
                {activity.category.charAt(0).toUpperCase() +
                  activity.category.slice(1).replace("-", " ")}
              </span>
            </div>

            {/* Article Title */}
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
              <Link
                href={`/article/${activity.slug}`}
                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                {activity.title}
              </Link>
            </h3>

            {/* Article Excerpt */}
            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed">
              {activity.excerpt}
            </p>

            {/* Article Image */}
            {activity.cover_image && (
              <div className="mb-4">
                <Link href={`/article/${activity.slug}`}>
                  <Image
                    src={activity.cover_image}
                    alt={activity.title}
                    width={600}
                    height={300}
                    className="w-full h-48 object-cover rounded-lg hover:opacity-90 transition-opacity"
                  />
                </Link>
              </div>
            )}
          </div>

          {/* Article Stats & Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-6">
              <span className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <EyeIcon className="w-4 h-4 mr-1" />
                {formatNumber(activity.views)}
              </span>

              <LikeButton
                articleId={activity.id}
                initialLikesCount={activity.likes_count}
                size="sm"
                showCount={true}
              />

              <span className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <ChatBubbleLeftIcon className="w-4 h-4 mr-1" />
                {formatNumber(activity.comments_count || 0)}
              </span>
            </div>

            <Link
              href={`/article/${activity.slug}`}
              className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium text-sm transition-colors"
            >
              Baca Artikel →
            </Link>
          </div>
        </article>
      ))}

      {/* Load More Button */}
      {hasMore && (
        <div className="text-center">
          <button
            onClick={loadMore}
            disabled={loadingMore}
            className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loadingMore ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                <span>Memuat...</span>
              </div>
            ) : (
              "Muat Lebih Banyak"
            )}
          </button>
        </div>
      )}
    </div>
  );
}
