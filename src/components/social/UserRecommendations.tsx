// src/components/social/UserRecommendations.tsx
"use client";

import { useState, useEffect } from "react";
import { SparklesIcon } from "@heroicons/react/24/outline";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import Image from "next/image";
import { supabase, getAvatarUrl } from "@/lib/supabase";

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
      // First try to get users with role column
      let { data: users, error } = await supabase
        .from("profiles")
        .select("id, full_name, avatar_url, role")
        .neq("id", user.id)
        .order("created_at", { ascending: false })
        .limit(3);

      // If error occurs (possibly role column doesn't exist), try without role
      if (error) {
        console.warn(
          "Role column might not exist, trying without it:",
          error.message
        );
        const fallbackQuery = await supabase
          .from("profiles")
          .select("id, full_name, avatar_url, role")
          .neq("id", user.id)
          .order("created_at", { ascending: false })
          .limit(3);

        if (fallbackQuery.error) {
          console.error("Error fetching recommendations:", fallbackQuery.error);
          setRecommendations([]);
        } else {
          // Use users with their original roles
          setRecommendations(fallbackQuery.data || []);
        }
      } else {
        // Add default role for users that don't have role set
        const usersWithDefaultRole =
          users?.map((user) => ({
            ...user,
            role: user.role || "Member",
          })) || [];
        setRecommendations(usersWithDefaultRole);
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  };

  if (!user || loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mt-1"></div>
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
    <div className="bg-gradient-to-br from-yellow-200 via-pink-200 to-blue-200 rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-2 mb-4">
        <SparklesIcon className="w-5 h-5 text-indigo-500" />
        <h3 className="text-lg font-bold text-gray-900">Member Rekomendasi</h3>
      </div>

      <div className="space-y-4">
        {recommendations.map((user) => (
          <div
            key={user.id}
            className="flex items-center space-x-3 p-3 bg-white/80 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <Link href={`/penulis/${user.id}`} className="flex-shrink-0">
              {user.avatar_url ? (
                <Image
                  src={getAvatarUrl(user.avatar_url) || ""}
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
                href={`/penulis/${user.id}`}
                className="font-medium text-gray-900 hover:text-indigo-600 transition-colors block"
              >
                {user.full_name}
              </Link>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <span>{user.role || "Member"}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Link
        href="/penulis"
        className="block text-center mt-4 text-sm text-indigo-600 hover:text-indigo-700 font-medium"
      >
        Lihat semua member →
      </Link>
    </div>
  );
}
