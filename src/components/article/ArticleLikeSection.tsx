"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { likeHelpers } from "@/lib/supabase";
import {
  HeartIcon,
  EyeIcon,
  ChatBubbleLeftIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

interface ArticleLikeSectionProps {
  articleId: string;
  views: number;
  likesCount: number;
  commentsCount: number;
  articleTitle: string;
}

export default function ArticleLikeSection({
  articleId,
  views: initialViews,
  likesCount: initialLikesCount,
  commentsCount: initialCommentsCount,
  articleTitle,
}: ArticleLikeSectionProps) {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const [views, setViews] = useState(initialViews);
  const [commentsCount, setCommentsCount] = useState(initialCommentsCount);
  const [isLoading, setIsLoading] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Check if user has liked the article on component mount
  useEffect(() => {
    if (user) {
      likeHelpers.checkUserLike(articleId, user.id).then(setIsLiked);
    }
    setIsHydrated(true);
  }, [user, articleId]);

  const handleLike = async () => {
    if (!user) {
      toast.error("Anda harus login terlebih dahulu untuk memberikan like!");
      return;
    }

    setIsLoading(true);
    try {
      const result = await likeHelpers.toggleLike(articleId, user.id);

      if (result.success) {
        setIsLiked(result.isLiked);
        setLikesCount((prev) => (result.isLiked ? prev + 1 : prev - 1));

        if (result.isLiked) {
          toast.success("❤️ Artikel ditambahkan ke favorit!");
        } else {
          toast.success("💔 Artikel dihapus dari favorit!");
        }
      } else {
        toast.error("Gagal memperbarui like: " + result.error);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
      toast.error("Terjadi kesalahan saat memperbarui like");
    } finally {
      setIsLoading(false);
    }
  };

  // Real-time updates for views and comments - only after hydration
  useEffect(() => {
    if (!isHydrated) return;

    const interval = setInterval(async () => {
      try {
        // Fetch updated counts from server
        const response = await fetch(`/api/article/${articleId}/stats`);
        if (response.ok) {
          const data = await response.json();
          setViews(data.views);
          setLikesCount(data.likesCount);
          setCommentsCount(data.commentsCount);
        }
      } catch (error) {
        console.error("Error fetching real-time stats:", error);
      }
    }, 30000); // Update every 30 seconds

    // Listen for comment count updates
    const handleCommentCountUpdate = (event: CustomEvent) => {
      if (event.detail.articleId === articleId) {
        // Use the provided count or increment/decrement based on action
        const newCount =
          event.detail.count !== undefined ? event.detail.count : commentsCount;
        setCommentsCount(newCount);
      }
    };

    window.addEventListener(
      "commentCountUpdated",
      handleCommentCountUpdate as EventListener
    );

    return () => {
      clearInterval(interval);
      window.removeEventListener(
        "commentCountUpdated",
        handleCommentCountUpdate as EventListener
      );
    };
  }, [articleId, isHydrated]);

  // Use initial values until hydration is complete
  const displayViews = isHydrated ? views : initialViews;
  const displayLikesCount = isHydrated ? likesCount : initialLikesCount;
  const displayCommentsCount = isHydrated
    ? commentsCount
    : initialCommentsCount;

  return (
    <div className="flex items-center justify-between py-4 border-b border-blue-100">
      <div className="flex items-center space-x-6 text-gray-600">
        {/* Views */}
        <div className="flex items-center space-x-2">
          <EyeIcon className="w-5 h-5" />
          <span className="text-sm font-medium">{displayViews} views</span>
        </div>

        {/* Likes */}
        <button
          onClick={handleLike}
          disabled={isLoading}
          className={`flex items-center space-x-2 transition-colors ${
            isLiked
              ? "text-red-500 hover:text-red-600"
              : "text-gray-600 hover:text-red-500"
          } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <HeartIcon className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
          <span className="text-sm font-medium">{displayLikesCount}</span>
        </button>

        {/* Comments */}
        <div className="flex items-center space-x-2">
          <ChatBubbleLeftIcon className="w-5 h-5" />
          <span className="text-sm font-medium">
            {displayCommentsCount} komentar
          </span>
        </div>
      </div>

      {/* Share Button */}
      <button
        onClick={() => {
          if (navigator.share) {
            navigator.share({
              title: articleTitle,
              url: window.location.href,
            });
          } else {
            navigator.clipboard.writeText(window.location.href);
            toast.success("Link artikel berhasil disalin!");
          }
        }}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
      >
        Bagikan
      </button>
    </div>
  );
}
