// src/components/social/FollowButton.tsx
"use client";

import { useState, useEffect } from "react";
import {
  UserPlusIcon,
  UserMinusIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "@/contexts/AuthContext";
import { followHelpers } from "@/lib/supabase";
import toast from "react-hot-toast";

interface FollowButtonProps {
  targetUserId: string;
  targetUserName: string;
  initialIsFollowing?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outline" | "minimal";
  showText?: boolean;
  className?: string;
  onFollowChange?: (isFollowing: boolean) => void;
}

export default function FollowButton({
  targetUserId,
  targetUserName,
  initialIsFollowing = false,
  size = "md",
  variant = "default",
  showText = true,
  className = "",
  onFollowChange,
}: FollowButtonProps) {
  const { user } = useAuth();
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [isLoading, setIsLoading] = useState(false);

  // Check user's follow status on mount
  useEffect(() => {
    if (user && targetUserId) {
      checkUserFollowStatus();
    }
  }, [user, targetUserId]);

  const checkUserFollowStatus = async () => {
    if (!user) return;

    try {
      const following = await followHelpers.checkUserFollow(
        user.id,
        targetUserId
      );
      setIsFollowing(following);
    } catch (error) {
      console.error("Error checking follow status:", error);
    }
  };

  const handleFollowToggle = async () => {
    if (!user) {
      toast.error("Silakan login untuk mengikuti penulis");
      return;
    }

    if (isLoading) return;

    setIsLoading(true);

    // Optimistic update
    const newIsFollowing = !isFollowing;
    setIsFollowing(newIsFollowing);

    try {
      const result = await followHelpers.toggleFollow(user.id, targetUserId);

      if (result.success) {
        // Update with actual result
        setIsFollowing(result.isFollowing);
        onFollowChange?.(result.isFollowing);

        // Show success message
        toast.success(
          result.isFollowing
            ? `✅ Berhasil mengikuti ${targetUserName}!`
            : `❌ Berhenti mengikuti ${targetUserName}`,
          { duration: 3000 }
        );
      } else {
        // Revert optimistic update on error
        setIsFollowing(!newIsFollowing);
        toast.error(result.error || "Gagal memperbarui status follow");
      }
    } catch (error) {
      // Revert optimistic update on error
      setIsFollowing(!newIsFollowing);
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
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };

  const getVariantClasses = () => {
    if (variant === "outline") {
      return isFollowing
        ? "border-2 border-green-500 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30"
        : "border-2 border-indigo-500 text-indigo-600 dark:text-indigo-400 bg-white dark:bg-gray-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20";
    }

    if (variant === "minimal") {
      return isFollowing
        ? "text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20"
        : "text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20";
    }

    // Default variant
    return isFollowing
      ? "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/30"
      : "bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-indigo-500 dark:hover:bg-indigo-600";
  };

  // Pindahkan pengecekan ke bagian return
  if (user?.id === targetUserId) {
    return null;
  }

  return (
    <button
      onClick={handleFollowToggle}
      disabled={isLoading}
      className={`
        inline-flex items-center space-x-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed
        ${getVariantClasses()}
        ${buttonSizeClasses[size]}
        ${className}
      `}
      title={
        isFollowing
          ? `Berhenti mengikuti ${targetUserName}`
          : `Ikuti ${targetUserName}`
      }
    >
      {/* Follow Icon with Animation */}
      <div className="relative">
        {isLoading ? (
          <div className={`${sizeClasses[size]} animate-spin`}>
            <div className="w-full h-full border-2 border-current border-t-transparent rounded-full"></div>
          </div>
        ) : isFollowing ? (
          <CheckIcon className={`${sizeClasses[size]} animate-pulse`} />
        ) : (
          <UserPlusIcon
            className={`${sizeClasses[size]} transition-transform`}
          />
        )}
      </div>

      {/* Follow Text */}
      {showText && (
        <span className="font-bold">
          {isLoading ? "..." : isFollowing ? "Mengikuti" : "Ikuti"}
        </span>
      )}
    </button>
  );
}
