"use client";

import { useState, useEffect } from "react";
import { Comment, commentHelpers } from "@/lib/supabase";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import {
  ChatBubbleLeftIcon,
  ArrowPathIcon,
  FunnelIcon,
  ClockIcon,
  FireIcon,
} from "@heroicons/react/24/outline";

interface CommentsSectionProps {
  articleId: string;
  initialCommentsCount?: number;
}

type SortOption = "newest" | "oldest" | "popular";

export default function CommentsSection({
  articleId,
  initialCommentsCount = 0,
}: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [showSortOptions, setShowSortOptions] = useState(false);

  const fetchComments = async (showRefreshIndicator = false) => {
    if (showRefreshIndicator) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      const fetchedComments = await commentHelpers.getArticleComments(
        articleId
      );

      // Sort comments based on selected option
      const sortedComments = sortComments(fetchedComments, sortBy);
      setComments(sortedComments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const sortComments = (
    commentsToSort: Comment[],
    sortOption: SortOption
  ): Comment[] => {
    const sorted = [...commentsToSort];

    switch (sortOption) {
      case "newest":
        return sorted.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      case "oldest":
        return sorted.sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      case "popular":
        // Sort by reply count (most replies first)
        return sorted.sort(
          (a, b) => (b.reply_count || 0) - (a.reply_count || 0)
        );
      default:
        return sorted;
    }
  };

  const handleSortChange = (newSort: SortOption) => {
    setSortBy(newSort);
    setShowSortOptions(false);
    const sortedComments = sortComments(comments, newSort);
    setComments(sortedComments);
  };

  const handleCommentUpdate = () => {
    fetchComments(true);
  };

  const handleCommentAdded = () => {
    fetchComments(true);
  };

  const handleRefresh = () => {
    fetchComments(true);
  };

  useEffect(() => {
    fetchComments();
  }, [articleId]);

  const sortOptions = [
    { value: "newest", label: "Terbaru", icon: ClockIcon },
    { value: "oldest", label: "Terlama", icon: ClockIcon },
    { value: "popular", label: "Populer", icon: FireIcon },
  ];

  const currentSortLabel =
    sortOptions.find((opt) => opt.value === sortBy)?.label || "Terbaru";

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="animate-pulse">
          <div className="flex items-center mb-6">
            <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded mr-3"></div>
            <div className="w-32 h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>

          <div className="space-y-4 mb-6">
            <div className="w-full h-24 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
            <div className="w-24 h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>

          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
              >
                <div className="flex space-x-3">
                  <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="w-32 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                    <div className="w-full h-16 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      {/* Comments Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
            <ChatBubbleLeftIcon className="w-6 h-6 mr-2 text-indigo-600 dark:text-indigo-400" />
            Komentar ({comments.length})
          </h3>

          <div className="flex items-center space-x-3">
            {/* Sort Options */}
            <div className="relative">
              <button
                onClick={() => setShowSortOptions(!showSortOptions)}
                className="flex items-center space-x-2 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <FunnelIcon className="w-4 h-4" />
                <span>{currentSortLabel}</span>
              </button>

              {showSortOptions && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 z-10">
                  <div className="py-2">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() =>
                          handleSortChange(option.value as SortOption)
                        }
                        className={`w-full flex items-center space-x-2 px-4 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors ${
                          sortBy === option.value
                            ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400"
                            : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        <option.icon className="w-4 h-4" />
                        <span>{option.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Refresh Button */}
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors disabled:opacity-50"
              title="Refresh komentar"
            >
              <ArrowPathIcon
                className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
              />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>

        {/* Comment Form */}
        <CommentForm
          articleId={articleId}
          onCommentAdded={handleCommentAdded}
          placeholder="Bagikan pendapat Anda tentang artikel ini..."
        />
      </div>

      {/* Comments List */}
      <div className="p-6">
        {comments.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <ChatBubbleLeftIcon className="w-8 h-8 text-gray-400" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Belum ada komentar
            </h4>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Jadilah yang pertama untuk berkomentar tentang artikel ini
            </p>
          </div>
        ) : (
          <div className="space-y-0">
            {comments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                articleId={articleId}
                onCommentUpdate={handleCommentUpdate}
              />
            ))}
          </div>
        )}

        {/* Load More Button (for future pagination) */}
        {comments.length >= 10 && (
          <div className="text-center mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              Muat Komentar Lainnya
            </button>
          </div>
        )}
      </div>

      {/* Click outside to close sort options */}
      {showSortOptions && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => setShowSortOptions(false)}
        />
      )}
    </div>
  );
}
