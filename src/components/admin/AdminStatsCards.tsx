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
      color: "bg-blue-50 text-blue-600",
      iconBg: "bg-blue-100",
      change: `+${stats.newUsersToday} hari ini`,
    },
    {
      title: "Total Konten",
      value: stats.totalArticles,
      icon: DocumentTextIcon,
      color: "bg-blue-50 text-blue-600",
      iconBg: "bg-blue-100",
      change: `+${stats.newArticlesToday} hari ini`,
    },
    {
      title: "Total Komentar",
      value: stats.totalComments,
      icon: ChatBubbleLeftIcon,
      color: "bg-blue-50 text-blue-600",
      iconBg: "bg-blue-100",
      change: "Semua waktu",
    },
    {
      title: "Laporan Pending",
      value: stats.pendingReports,
      icon: ExclamationTriangleIcon,
      color: "bg-red-50 text-red-600",
      iconBg: "bg-red-100",
      change: `${stats.totalReports} total`,
      urgent: stats.pendingReports > 0,
    },
    {
      title: "User Baru Hari Ini",
      value: stats.newUsersToday,
      icon: UserPlusIcon,
      color: "bg-blue-50 text-blue-600",
      iconBg: "bg-blue-100",
      change: "24 jam terakhir",
    },
    {
      title: "Konten Baru Hari Ini",
      value: stats.newArticlesToday,
      icon: PlusCircleIcon,
      color: "bg-blue-50 text-blue-600",
      iconBg: "bg-blue-100",
      change: "24 jam terakhir",
    },
    {
      title: "Konten Featured",
      value: stats.featuredContent,
      icon: StarIcon,
      color: "bg-blue-50 text-blue-600",
      iconBg: "bg-blue-100",
      change: "Aktif sekarang",
    },
    {
      title: "Total Laporan",
      value: stats.totalReports,
      icon: ClockIcon,
      color: "bg-blue-50 text-blue-600",
      iconBg: "bg-blue-100",
      change: "Semua status",
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="bg-white/95 p-6 rounded-xl shadow-sm animate-pulse border border-blue-100"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg"></div>
              <div className="ml-4 flex-1">
                <div className="h-4 bg-blue-100 rounded w-3/4 mb-2"></div>
                <div className="h-6 bg-blue-100 rounded w-1/2"></div>
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
            className={`bg-white/95 p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-blue-100 ${
              stat.urgent ? "ring-2 ring-red-200" : ""
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
                <p className="text-sm font-medium text-gray-600">
                  {stat.title}
                </p>
                <div className="flex items-baseline">
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value.toLocaleString()}
                  </p>
                  {stat.urgent && (
                    <span className="ml-2 px-2 py-1 bg-red-100 text-red-600 text-xs font-medium rounded-full">
                      Perlu Perhatian
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-600 mt-1">{stat.change}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
