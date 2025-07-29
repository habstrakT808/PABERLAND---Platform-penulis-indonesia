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
import SignedImage from "@/components/common/SignedImage";
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
    fetchActivityFeed();
  }, []);

  const fetchActivityFeed = async (pageNum = 1) => {
    setLoading(pageNum === 1);
    setLoadingMore(pageNum > 1);

    try {
      // Get latest articles from all users
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
            avatar_url,
            role
          )
        `
        )
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

  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-sm p-6 animate-pulse"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/6 mt-1"></div>
              </div>
            </div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
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
        <h2 className="text-2xl font-bold text-gray-900">Konten Terbaru</h2>
      </div>

      {/* Activity Items */}
      {activities.map((activity) => (
        <article
          key={activity.id}
          className="bg-gradient-to-br from-yellow-200 via-pink-200 to-blue-200 rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-300"
        >
          {/* Author Info */}
          <div className="flex items-center space-x-3 mb-4">
            <Link
              href={`/penulis/${activity.author_id}`}
              className="flex-shrink-0"
            >
              {activity.author_avatar ? (
                <SignedImage
                  src={activity.author_avatar}
                  alt={activity.author_name}
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
                  href={`/penulis/${activity.author_id}`}
                  className="font-medium text-gray-900 hover:text-blue-600 transition-colors"
                >
                  {activity.profiles?.full_name || "Pengguna Anonim"}
                </Link>
                <span className="text-gray-500 text-sm">
                  mempublikasikan konten baru
                </span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>{activity.profiles?.role || "Member"}</span>
                <span>•</span>
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
              <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                <span className="mr-1">
                  {getCategoryEmoji(activity.category)}
                </span>
                {activity.category.charAt(0).toUpperCase() +
                  activity.category.slice(1).replace("-", " ")}
              </span>
            </div>

            {/* Article Title */}
            <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
              <Link
                href={`/article/${activity.slug}`}
                className="hover:text-indigo-600 transition-colors"
              >
                {activity.title}
              </Link>
            </h3>

            {/* Article Excerpt */}
            <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
              {activity.excerpt}
            </p>

            {/* Article Image */}
            {activity.cover_image && (
              <div className="mb-4">
                <Link href={`/article/${activity.slug}`}>
                  <SignedImage
                    src={activity.cover_image}
                    alt={activity.title}
                    className="w-full h-48 object-cover rounded-lg hover:opacity-90 transition-opacity"
                  />
                </Link>
              </div>
            )}
          </div>

          {/* Article Stats & Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-6">
              <span className="flex items-center text-sm text-gray-500">
                <EyeIcon className="w-4 h-4 mr-1" />
                {formatNumber(activity.views)}
              </span>

              <LikeButton
                articleId={activity.id}
                initialLikesCount={activity.likes_count}
                size="sm"
                showCount={true}
              />

              <span className="flex items-center text-sm text-gray-500">
                <ChatBubbleLeftIcon className="w-4 h-4 mr-1" />
                {formatNumber(activity.comments_count || 0)}
              </span>
            </div>

            <Link
              href={`/article/${activity.slug}`}
              className="text-indigo-600 hover:text-indigo-700 font-medium text-sm transition-colors"
            >
              Baca Konten →
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
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
