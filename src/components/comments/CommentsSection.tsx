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
  const [isHydrated, setIsHydrated] = useState(false);

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

  // Initialize component after hydration
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Fetch comments after hydration
  useEffect(() => {
    if (isHydrated) {
      fetchComments();
    }
  }, [articleId, isHydrated]);

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
    // Update comment count in parent component if needed
    if (isHydrated && typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("commentCountUpdated", {
          detail: { articleId, count: comments.length },
        })
      );
    }
  };

  const handleCommentAdded = () => {
    fetchComments(true);
    // Update comment count in parent component if needed
    if (isHydrated && typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("commentCountUpdated", {
          detail: { articleId, count: comments.length + 1 },
        })
      );
    }
  };

  const handleCommentDeleted = () => {
    fetchComments(true);
    // Update comment count in parent component if needed
    if (isHydrated && typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("commentCountUpdated", {
          detail: { articleId, count: Math.max(0, comments.length - 1) },
        })
      );
    }
  };

  const handleRefresh = () => {
    fetchComments(true);
  };

  const sortOptions = [
    { value: "newest", label: "Terbaru", icon: ClockIcon },
    { value: "oldest", label: "Terlama", icon: ClockIcon },
    { value: "popular", label: "Populer", icon: FireIcon },
  ];

  const currentSortLabel =
    sortOptions.find((opt) => opt.value === sortBy)?.label || "Terbaru";

  return (
    <div className="bg-white/95 rounded-lg shadow-lg border border-blue-100">
      {/* Header */}
      <div className="p-6 border-b border-blue-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ChatBubbleLeftIcon className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Komentar ({isHydrated ? comments.length : initialCommentsCount})
            </h3>
          </div>

          <div className="flex items-center space-x-2">
            {/* Sort Options */}
            <div className="relative">
              <button
                onClick={() => setShowSortOptions(!showSortOptions)}
                className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                <FunnelIcon className="w-4 h-4" />
                <span>
                  {sortBy === "newest" && "Terbaru"}
                  {sortBy === "oldest" && "Terlama"}
                  {sortBy === "popular" && "Populer"}
                </span>
              </button>

              {showSortOptions && (
                <div className="absolute right-0 mt-2 w-32 bg-white border border-blue-200 rounded-lg shadow-lg z-10">
                  <button
                    onClick={() => handleSortChange("newest")}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                  >
                    Terbaru
                  </button>
                  <button
                    onClick={() => handleSortChange("oldest")}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                  >
                    Terlama
                  </button>
                  <button
                    onClick={() => handleSortChange("popular")}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                  >
                    Populer
                  </button>
                </div>
              )}
            </div>

            {/* Refresh Button */}
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors disabled:opacity-50"
            >
              <ArrowPathIcon
                className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="p-6">
        {!isHydrated ? (
          // Show initial state during hydration
          <div className="text-center py-8">
            <div className="text-gray-500">Memuat komentar...</div>
          </div>
        ) : loading ? (
          // Loading skeleton
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="flex space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-blue-100 rounded w-1/4 mb-2"></div>
                    <div className="h-3 bg-blue-100 rounded w-3/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : comments.length === 0 ? (
          // Empty state
          <div className="text-center py-8">
            <ChatBubbleLeftIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">
              Belum ada komentar
            </h4>
            <p className="text-gray-600">
              Jadilah yang pertama untuk memberikan komentar!
            </p>
          </div>
        ) : (
          // Comments list
          <div className="space-y-6">
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
      </div>

      {/* Comment Form */}
      {isHydrated && (
        <div className="p-6 border-t border-blue-100">
          <CommentForm
            articleId={articleId}
            onCommentAdded={handleCommentAdded}
          />
        </div>
      )}
    </div>
  );
}
