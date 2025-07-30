// src/components/article/LikesModal.tsx
"use client";

import { useState, useEffect } from "react";
import { XMarkIcon, HeartIcon } from "@heroicons/react/24/outline";
import { likeHelpers, getAvatarUrl } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";

interface LikesModalProps {
  isOpen: boolean;
  onClose: () => void;
  articleId: string;
  articleTitle: string;
}

export default function LikesModal({
  isOpen,
  onClose,
  articleId,
  articleTitle,
}: LikesModalProps) {
  const [likes, setLikes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && articleId) {
      fetchLikes();
    }
  }, [isOpen, articleId]);

  const fetchLikes = async () => {
    setLoading(true);
    try {
      const likesData = await likeHelpers.getArticleLikes(articleId, 50);
      setLikes(likesData);
    } catch (error) {
      console.error("Error fetching likes:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Helper function to generate name-based URL slug with sequential numbering for duplicates
  const generateNameSlug = (name: string, userId: string) => {
    const baseSlug = name
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "") // Remove special characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-") // Replace multiple hyphens with single
      .trim();

    // For now, return base slug. In a real implementation, you would need to check for duplicates
    // This is a simplified version for the component
    return baseSlug;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <HeartIcon className="w-6 h-6 text-red-500" />
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Disukai oleh
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-48">
                {articleTitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <XMarkIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="max-h-96 overflow-y-auto">
          {loading ? (
            <div className="p-6">
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-3 animate-pulse"
                  >
                    <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mt-1"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : likes.length === 0 ? (
            <div className="p-12 text-center">
              <HeartIcon className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                Belum ada yang menyukai artikel ini
              </p>
            </div>
          ) : (
            <div className="p-4">
              <div className="space-y-3">
                {likes.map((like) => (
                  <div
                    key={like.id}
                    className="flex items-center space-x-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <Link
                      href={`/penulis/${like.user_id}`}
                      className="flex-shrink-0"
                    >
                      {like.profiles?.avatar_url ? (
                        <Image
                          src={getAvatarUrl(like.profiles.avatar_url) || ""}
                          alt={like.profiles?.full_name || "User"}
                          width={48}
                          height={48}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                          {like.profiles?.full_name?.charAt(0) || "U"}
                        </div>
                      )}
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/penulis/${generateNameSlug(
                          like.full_name,
                          like.user_id
                        )}`}
                        className="font-medium text-gray-900 hover:text-blue-600 transition-colors"
                      >
                        {like.full_name}
                      </Link>
                      <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                        <span>{like.profiles?.role || "Member"}</span>
                        <span>•</span>
                        <span>{formatDate(like.created_at)}</span>
                      </div>
                    </div>
                    <HeartIcon className="w-5 h-5 text-red-500" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {likes.length > 0 && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {likes.length} orang menyukai artikel ini
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
