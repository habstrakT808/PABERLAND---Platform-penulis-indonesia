// src/components/social/UserRecommendations.tsx
"use client";

import { useState, useEffect } from "react";
import { UsersIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { followHelpers } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import Image from "next/image";
import FollowButton from "./FollowButton";

export default function UserRecommendations() {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchRecommendations();
    }
  }, [user]);

  const fetchRecommendations = async () => {
    if (!user) return;

    try {
      const users = await followHelpers.getRecommendedUsers(user.id, 3);
      setRecommendations(users);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!user || loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mt-1"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-2 mb-4">
        <SparklesIcon className="w-5 h-5 text-indigo-500" />
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Penulis Rekomendasi
        </h3>
      </div>

      <div className="space-y-4">
        {recommendations.map((user) => (
          <div
            key={user.id}
            className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <Link href={`/profile/${user.id}`} className="flex-shrink-0">
              {user.avatar_url ? (
                <Image
                  src={user.avatar_url}
                  alt={user.full_name}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {user.full_name.charAt(0)}
                </div>
              )}
            </Link>

            <div className="flex-1 min-w-0">
              <Link
                href={`/profile/${user.id}`}
                className="font-medium text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors block"
              >
                {user.full_name}
              </Link>
              <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                <span>{user.followersCount} pengikut</span>
                <span>•</span>
                <span>{user.articlesCount} artikel</span>
              </div>
            </div>

            <FollowButton
              targetUserId={user.id}
              targetUserName={user.full_name}
              size="sm"
              showText={false}
            />
          </div>
        ))}
      </div>

      <Link
        href="/penulis"
        className="block text-center mt-4 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium"
      >
        Lihat semua penulis →
      </Link>
    </div>
  );
}
