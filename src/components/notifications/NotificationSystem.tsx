// src/components/notifications/NotificationSystem.tsx
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase, getAvatarUrl } from "@/lib/supabase";
import {
  BellIcon,
  UserPlusIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { BellIcon as BellSolid } from "@heroicons/react/24/solid";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";

interface Notification {
  id: string;
  type: "follow" | "like" | "comment";
  actor_id: string;
  target_id: string;
  article_id?: string;
  read: boolean;
  created_at: string;
  actor_profile: {
    full_name: string;
    avatar_url: string | null;
  };
  article?: {
    title: string;
    slug: string;
  };
}

export default function NotificationSystem() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchNotifications();
      subscribeToNotifications();
    }
  }, [user]);

  const fetchNotifications = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("notifications")
        .select(
          `
          id,
          type,
          actor_id,
          target_id,
          article_id,
          read,
          created_at,
          actor_profile:actor_id (
            full_name,
            avatar_url
          ),
          article:article_id (
            title,
            slug
          )
        `
        )
        .eq("target_id", user.id)
        .order("created_at", { ascending: false })
        .limit(20);

      if (error) {
        console.error("Error fetching notifications:", error);
        return;
      }

      setNotifications(
        (data || []).map((n: any) => ({
          ...n,
          actor_profile: Array.isArray(n.actor_profile)
            ? n.actor_profile[0]
            : n.actor_profile,
          article: Array.isArray(n.article) ? n.article[0] : n.article,
        }))
      );
      setUnreadCount((data || []).filter((n) => !n.read).length);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to clean up old notifications when count exceeds 20
  const cleanupOldNotifications = async () => {
    if (!user) return;

    try {
      // Get total count of notifications for this user
      const { count, error: countError } = await supabase
        .from("notifications")
        .select("*", { count: "exact", head: true })
        .eq("target_id", user.id);

      if (countError) {
        console.error("Error counting notifications:", countError);
        return;
      }

      // If more than 20 notifications, delete the oldest ones
      if (count && count > 20) {
        // Get the 20th newest notification's created_at timestamp
        const { data: cutoffData, error: cutoffError } = await supabase
          .from("notifications")
          .select("created_at")
          .eq("target_id", user.id)
          .order("created_at", { ascending: false })
          .range(19, 19)
          .single();

        if (cutoffError) {
          console.error("Error getting cutoff timestamp:", cutoffError);
          return;
        }

        if (cutoffData) {
          // Delete notifications older than the 20th newest
          const { error: deleteError } = await supabase
            .from("notifications")
            .delete()
            .eq("target_id", user.id)
            .lt("created_at", cutoffData.created_at);

          if (deleteError) {
            console.error("Error deleting old notifications:", deleteError);
          }
        }
      }
    } catch (error) {
      console.error("Error cleaning up old notifications:", error);
    }
  };

  const subscribeToNotifications = () => {
    if (!user) return;

    const channel = supabase
      .channel("notifications")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `target_id=eq.${user.id}`,
        },
        async (payload) => {
          // Clean up old notifications first
          await cleanupOldNotifications();

          // Fetch the new notification with profile data
          fetchNotifications();

          // Show toast notification
          const newNotification = payload.new as any;
          if (newNotification.type === "follow") {
            toast.success("Ada yang mulai mengikuti Anda!", {
              duration: 4000,
              icon: "👤",
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const markAsRead = async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from("notifications")
        .update({ read: true })
        .eq("id", notificationId);

      if (error) {
        console.error("Error marking notification as read:", error);
        return;
      }

      setNotifications((prev) =>
        prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const markAllAsRead = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from("notifications")
        .update({ read: true })
        .eq("target_id", user.id)
        .eq("read", false);

      if (error) {
        console.error("Error marking all notifications as read:", error);
        return;
      }

      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "follow":
        return <UserPlusIcon className="w-5 h-5 text-blue-500" />;
      case "like":
        return <HeartIcon className="w-5 h-5 text-red-500" />;
      case "comment":
        return <ChatBubbleLeftIcon className="w-5 h-5 text-green-500" />;
      default:
        return <BellIcon className="w-5 h-5 text-gray-500" />;
    }
  };

  const getNotificationText = (notification: Notification) => {
    switch (notification.type) {
      case "follow":
        return `${notification.actor_profile.full_name} mulai mengikuti Anda`;
      case "like":
        return `${notification.actor_profile.full_name} menyukai artikel "${notification.article?.title}"`;
      case "comment":
        return `${notification.actor_profile.full_name} berkomentar di artikel "${notification.article?.title}"`;
      default:
        return "Notifikasi baru";
    }
  };

  const getNotificationLink = (notification: Notification) => {
    switch (notification.type) {
      case "follow":
        return `/profile/${notification.actor_id}`;
      case "like":
      case "comment":
        return `/article/${notification.article?.slug}`;
      default:
        return "#";
    }
  };

  const formatTime = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "Baru saja";
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} menit lalu`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} jam lalu`;
    if (diffInSeconds < 2592000)
      return `${Math.floor(diffInSeconds / 86400)} hari lalu`;

    return date.toLocaleDateString("id-ID");
  };

  if (!user) return null;

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        {unreadCount > 0 ? (
          <BellSolid className="w-6 h-6" />
        ) : (
          <BellIcon className="w-6 h-6" />
        )}

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center md:absolute md:inset-auto md:right-0 md:mt-2 md:w-80 md:bg-white md:rounded-xl md:shadow-2xl md:border md:border-blue-200">
          <div className="w-full max-w-sm mx-4 bg-white rounded-xl shadow-2xl border border-blue-200 md:mx-0 md:max-w-none">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-blue-100">
              <h3 className="text-lg font-bold text-gray-900">Notifikasi</h3>
              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Tandai Semua
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <XMarkIcon className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto">
              {loading ? (
                <div className="p-4">
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="flex items-center space-x-3 animate-pulse"
                      >
                        <div className="w-10 h-10 bg-blue-100 rounded-full"></div>
                        <div className="flex-1">
                          <div className="h-4 bg-blue-100 rounded w-3/4"></div>
                          <div className="h-3 bg-blue-100 rounded w-1/2 mt-1"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <BellIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500">Belum ada notifikasi</p>
                </div>
              ) : (
                <div className="divide-y divide-blue-100">
                  {notifications.map((notification) => (
                    <Link
                      key={notification.id}
                      href={getNotificationLink(notification)}
                      onClick={() => {
                        if (!notification.read) {
                          markAsRead(notification.id);
                        }
                        setIsOpen(false);
                      }}
                      className={`block p-4 hover:bg-blue-50 transition-colors ${
                        !notification.read ? "bg-blue-50" : ""
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        {/* Actor Avatar */}
                        <div className="flex-shrink-0">
                          {notification.actor_profile.avatar_url ? (
                            <Image
                              src={
                                getAvatarUrl(
                                  notification.actor_profile.avatar_url
                                ) || ""
                              }
                              alt={notification.actor_profile.full_name}
                              width={40}
                              height={40}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                              {notification.actor_profile.full_name.charAt(0)}
                            </div>
                          )}
                        </div>

                        {/* Notification Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <p className="text-sm text-gray-900">
                              {getNotificationText(notification)}
                            </p>
                            <div className="flex items-center space-x-2 ml-2">
                              {getNotificationIcon(notification.type)}
                              {!notification.read && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              )}
                            </div>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">
                            {formatTime(notification.created_at)}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
