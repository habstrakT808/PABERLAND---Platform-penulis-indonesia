// src/components/social/FollowersModal.tsx
"use client";

import { useState, useEffect } from "react";
import { XMarkIcon, UsersIcon } from "@heroicons/react/24/outline";
import { followHelpers } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";
import FollowButton from "./FollowButton";

interface FollowersModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  userName: string;
  type: "followers" | "following";
}

export default function FollowersModal({
  isOpen,
  onClose,
  userId,
  userName,
  type,
}: FollowersModalProps) {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && userId) {
      fetchUsers();
    }
  }, [isOpen, userId, type]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const usersData =
        type === "followers"
          ? await followHelpers.getUserFollowers(userId, 50)
          : await followHelpers.getUserFollowing(userId, 50);
      setUsers(usersData);
    } catch (error) {
      console.error(`Error fetching ${type}:`, error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!isOpen) return null;

  const title = type === "followers" ? "Pengikut" : "Mengikuti";
  const emptyMessage =
    type === "followers"
      ? "Belum ada yang mengikuti"
      : "Belum mengikuti siapa pun";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <UsersIcon className="w-6 h-6 text-indigo-500" />
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-48">
                {userName}
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
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                  </div>
                ))}
              </div>
            </div>
          ) : users.length === 0 ? (
            <div className="p-12 text-center">
              <UsersIcon className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">{emptyMessage}</p>
            </div>
          ) : (
            <div className="p-4">
              <div className="space-y-3">
                {users.map((user) => {
                  const profileData = user.profiles;
                  const targetId =
                    type === "followers" ? user.follower_id : user.following_id;

                  return (
                    <div
                      key={user.id}
                      className="flex items-center space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <Link
                        href={`/profile/${targetId}`}
                        className="flex-shrink-0"
                      >
                        {profileData?.avatar_url ? (
                          <Image
                            src={profileData.avatar_url}
                            alt={profileData?.full_name || "User"}
                            width={48}
                            height={48}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                            {profileData?.full_name?.charAt(0) || "U"}
                          </div>
                        )}
                      </Link>

                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/profile/${targetId}`}
                          className="font-medium text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors block"
                        >
                          {profileData?.full_name || "User"}
                        </Link>
                        {profileData?.bio && (
                          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                            {profileData.bio}
                          </p>
                        )}
                        <p className="text-xs text-gray-400 dark:text-gray-500">
                          {formatDate(user.created_at)}
                        </p>
                      </div>

                      <FollowButton
                        targetUserId={targetId}
                        targetUserName={profileData?.full_name || "User"}
                        size="sm"
                        variant="outline"
                        showText={false}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {users.length > 0 && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {users.length} {type === "followers" ? "pengikut" : "mengikuti"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
