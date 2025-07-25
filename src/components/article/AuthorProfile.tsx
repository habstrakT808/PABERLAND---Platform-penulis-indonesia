// src/components/article/AuthorProfile.tsx (Updated)
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { UserIcon, UsersIcon } from "@heroicons/react/24/outline";
import { followHelpers } from "@/lib/supabase";
import FollowButton from "@/components/social/FollowButton";
import FollowersModal from "@/components/social/FollowersModal";

interface AuthorProfileProps {
  author: {
    id: string;
    full_name: string;
    avatar_url: string | null;
    bio: string | null;
  };
  authorArticles?: Array<{
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    created_at: string;
  }>;
}

export default function AuthorProfile({
  author,
  authorArticles = [],
}: AuthorProfileProps) {
  const [followCounts, setFollowCounts] = useState({
    followersCount: 0,
    followingCount: 0,
  });
  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFollowCounts();
  }, [author.id]);

  const fetchFollowCounts = async () => {
    try {
      const counts = await followHelpers.getFollowCounts(author.id);
      setFollowCounts(counts);
    } catch (error) {
      console.error("Error fetching follow counts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFollowChange = (isFollowing: boolean) => {
    setFollowCounts((prev) => ({
      ...prev,
      followersCount: isFollowing
        ? prev.followersCount + 1
        : Math.max(prev.followersCount - 1, 0),
    }));
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        {/* Author Header */}
        <div className="flex items-start space-x-4 mb-6">
          <div className="relative">
            {author.avatar_url ? (
              <Image
                src={author.avatar_url}
                alt={author.full_name}
                width={80}
                height={80}
                className="rounded-full object-cover ring-4 ring-indigo-100 dark:ring-indigo-900"
              />
            ) : (
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center ring-4 ring-indigo-100 dark:ring-indigo-900">
                <UserIcon className="w-10 h-10 text-white" />
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
          </div>

          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {author.full_name}
              </h3>
              <FollowButton
                targetUserId={author.id}
                targetUserName={author.full_name}
                size="sm"
                onFollowChange={handleFollowChange}
              />
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              Penulis • Bergabung {new Date().getFullYear()}
            </p>
          </div>
        </div>

        {/* Author Bio */}
        {author.bio && (
          <div className="mb-6">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {author.bio}
            </p>
          </div>
        )}

        {/* Author Stats */}
        <div className="grid grid-cols-4 gap-2 mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <div className="text-center">
            <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
              {authorArticles.length}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Artikel
            </div>
          </div>

          <button
            onClick={() => setShowFollowersModal(true)}
            className="text-center hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md p-1 transition-colors"
            disabled={loading}
          >
            <div className="text-lg font-bold text-green-600 dark:text-green-400">
              {loading ? "..." : followCounts.followersCount}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Pengikut
            </div>
          </button>

          <button
            onClick={() => setShowFollowingModal(true)}
            className="text-center hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md p-1 transition-colors"
            disabled={loading}
          >
            <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
              {loading ? "..." : followCounts.followingCount}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Mengikuti
            </div>
          </button>

          <div className="text-center">
            <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
              {Math.floor(Math.random() * 1000) + 500}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Likes
            </div>
          </div>
        </div>

        {/* Other Articles by Author */}
        {authorArticles.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Artikel Lainnya
            </h4>
            <div className="space-y-3">
              {authorArticles.slice(0, 3).map((article) => (
                <Link
                  key={article.id}
                  href={`/article/${article.slug}`}
                  className="block p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <h5 className="font-medium text-gray-900 dark:text-white text-sm mb-1 line-clamp-2">
                    {article.title}
                  </h5>
                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                    {new Date(article.created_at).toLocaleDateString("id-ID")}
                  </div>
                </Link>
              ))}
            </div>

            <Link
              href={`/penulis/${author.id}`}
              className="inline-flex items-center mt-4 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium"
            >
              Lihat semua artikel →
            </Link>
          </div>
        )}
      </div>

      {/* Modals */}
      <FollowersModal
        isOpen={showFollowersModal}
        onClose={() => setShowFollowersModal(false)}
        userId={author.id}
        userName={author.full_name}
        type="followers"
      />

      <FollowersModal
        isOpen={showFollowingModal}
        onClose={() => setShowFollowingModal(false)}
        userId={author.id}
        userName={author.full_name}
        type="following"
      />
    </>
  );
}
