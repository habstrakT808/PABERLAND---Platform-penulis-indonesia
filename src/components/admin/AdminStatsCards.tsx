// src/components/admin/AdminStatsCards.tsx
"use client";

import { AdminStats } from "@/lib/adminHelpers";
import {
  UsersIcon,
  DocumentTextIcon,
  ChatBubbleLeftIcon,
  ExclamationTriangleIcon,
  UserPlusIcon,
  PlusCircleIcon,
  ClockIcon,
  StarIcon,
} from "@heroicons/react/24/outline";

interface AdminStatsCardsProps {
  stats: AdminStats;
  loading?: boolean;
}

export default function AdminStatsCards({
  stats,
  loading,
}: AdminStatsCardsProps) {
  const statsConfig = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: UsersIcon,
      color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
      iconBg: "bg-blue-100 dark:bg-blue-900/30",
      change: `+${stats.newUsersToday} hari ini`,
    },
    {
      title: "Total Artikel",
      value: stats.totalArticles,
      icon: DocumentTextIcon,
      color:
        "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400",
      iconBg: "bg-green-100 dark:bg-green-900/30",
      change: `+${stats.newArticlesToday} hari ini`,
    },
    {
      title: "Total Komentar",
      value: stats.totalComments,
      icon: ChatBubbleLeftIcon,
      color:
        "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
      iconBg: "bg-purple-100 dark:bg-purple-900/30",
      change: "Semua waktu",
    },
    {
      title: "Laporan Pending",
      value: stats.pendingReports,
      icon: ExclamationTriangleIcon,
      color: "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400",
      iconBg: "bg-red-100 dark:bg-red-900/30",
      change: `${stats.totalReports} total`,
      urgent: stats.pendingReports > 0,
    },
    {
      title: "User Baru Hari Ini",
      value: stats.newUsersToday,
      icon: UserPlusIcon,
      color:
        "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400",
      iconBg: "bg-indigo-100 dark:bg-indigo-900/30",
      change: "24 jam terakhir",
    },
    {
      title: "Artikel Baru Hari Ini",
      value: stats.newArticlesToday,
      icon: PlusCircleIcon,
      color: "bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400",
      iconBg: "bg-teal-100 dark:bg-teal-900/30",
      change: "24 jam terakhir",
    },
    {
      title: "Konten Featured",
      value: stats.featuredContent,
      icon: StarIcon,
      color:
        "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400",
      iconBg: "bg-yellow-100 dark:bg-yellow-900/30",
      change: "Aktif sekarang",
    },
    {
      title: "Total Laporan",
      value: stats.totalReports,
      icon: ClockIcon,
      color: "bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400",
      iconBg: "bg-gray-100 dark:bg-gray-600",
      change: "Semua status",
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm animate-pulse"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              <div className="ml-4 flex-1">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statsConfig.map((stat, index) => {
        const IconComponent = stat.icon;

        return (
          <div
            key={index}
            className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 ${
              stat.urgent ? "ring-2 ring-red-200 dark:ring-red-800" : ""
            }`}
          >
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.iconBg}`}>
                <IconComponent
                  className={`w-6 h-6 ${stat.color
                    .split(" ")
                    .slice(-2)
                    .join(" ")}`}
                />
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.title}
                </p>
                <div className="flex items-baseline">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value.toLocaleString()}
                  </p>
                  {stat.urgent && (
                    <span className="ml-2 px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-medium rounded-full">
                      Perlu Perhatian
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {stat.change}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
