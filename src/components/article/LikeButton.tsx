// src/components/article/LikeButton.tsx
"use client";

import { useState, useEffect } from "react";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { useAuth } from "@/contexts/AuthContext";
import { likeHelpers } from "@/lib/supabase";
import toast from "react-hot-toast";

interface LikeButtonProps {
  articleId: string;
  initialLikesCount: number;
  initialIsLiked?: boolean;
  size?: "sm" | "md" | "lg";
  showCount?: boolean;
  className?: string;
}

export default function LikeButton({
  articleId,
  initialLikesCount,
  initialIsLiked = false,
  size = "md",
  showCount = true,
  className = "",
}: LikeButtonProps) {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const [isLoading, setIsLoading] = useState(false);

  // Check user's like status on mount
  useEffect(() => {
    if (user && articleId) {
      checkUserLikeStatus();
    }
  }, [user, articleId]);

  const checkUserLikeStatus = async () => {
    if (!user) return;

    try {
      const liked = await likeHelpers.checkUserLike(articleId, user.id);
      setIsLiked(liked);
    } catch (error) {
      console.error("Error checking like status:", error);
    }
  };

  const handleLikeToggle = async () => {
    if (!user) {
      toast.error("Silakan login untuk menyukai artikel");
      return;
    }

    if (isLoading) return;

    setIsLoading(true);

    // Optimistic update
    const newIsLiked = !isLiked;
    const newLikesCount = newIsLiked ? likesCount + 1 : likesCount - 1;

    setIsLiked(newIsLiked);
    setLikesCount(newLikesCount);

    try {
      const result = await likeHelpers.toggleLike(articleId, user.id);

      if (result.success) {
        // Update with actual result
        setIsLiked(result.isLiked);

        // Show success message
        toast.success(
          result.isLiked ? "❤️ Artikel disukai!" : "💔 Batal menyukai artikel",
          { duration: 2000 }
        );
      } else {
        // Revert optimistic update on error
        setIsLiked(!newIsLiked);
        setLikesCount(likesCount);
        toast.error(result.error || "Gagal memperbarui status like");
      }
    } catch (error) {
      // Revert optimistic update on error
      setIsLiked(!newIsLiked);
      setLikesCount(likesCount);
      toast.error("Terjadi kesalahan sistem");
    } finally {
      setIsLoading(false);
    }
  };

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const buttonSizeClasses = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2",
    lg: "px-4 py-3 text-lg",
  };

  return (
    <button
      onClick={handleLikeToggle}
      disabled={isLoading}
      className={`
        inline-flex items-center space-x-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed
        ${
          isLiked
            ? "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30"
            : "bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-red-500 dark:hover:text-red-400"
        }
        ${buttonSizeClasses[size]}
        ${className}
      `}
      title={isLiked ? "Batal menyukai" : "Sukai artikel ini"}
    >
      {/* Heart Icon with Animation */}
      <div className="relative">
        {isLiked ? (
          <HeartSolid
            className={`${sizeClasses[size]} text-red-500 animate-pulse`}
          />
        ) : (
          <HeartOutline className={`${sizeClasses[size]} transition-colors`} />
        )}

        {/* Loading Spinner */}
        {isLoading && (
          <div className={`absolute inset-0 ${sizeClasses[size]} animate-spin`}>
            <div className="w-full h-full border-2 border-gray-300 border-t-red-500 rounded-full"></div>
          </div>
        )}
      </div>

      {/* Like Count */}
      {showCount && (
        <span
          className={`font-bold ${
            isLiked ? "text-red-600 dark:text-red-400" : ""
          }`}
        >
          {likesCount.toLocaleString()}
        </span>
      )}

      {/* Like Text (for larger sizes) */}
      {size === "lg" && (
        <span className="hidden sm:inline">{isLiked ? "Disukai" : "Suka"}</span>
      )}
    </button>
  );
}
