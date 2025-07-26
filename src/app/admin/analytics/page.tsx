// src/app/admin/analytics/page.tsx
"use client";

import { useState, useEffect } from "react";
import AdminProtectedRoute from "@/components/admin/AdminProtectedRoute";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminStatsCards from "@/components/admin/AdminStatsCards";
import { adminHelpers, AdminStats } from "@/lib/adminHelpers";
import {
  ChartBarIcon,
  UsersIcon,
  DocumentTextIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

function AdminAnalyticsContent() {
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalArticles: 0,
    totalComments: 0,
    totalReports: 0,
    newUsersToday: 0,
    newArticlesToday: 0,
    pendingReports: 0,
    featuredContent: 0,
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async (showRefreshIndicator = false) => {
    if (showRefreshIndicator) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      const adminStats = await adminHelpers.getAdminStats();
      setStats(adminStats);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const calculateGrowthRate = (current: number, total: number) => {
    if (total === 0) return "0";
    return ((current / total) * 100).toFixed(1);
  };

  const calculateEngagementRate = () => {
    if (stats.totalArticles === 0) return "0";
    return ((stats.totalComments / stats.totalArticles) * 100).toFixed(1);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              📊 Analytics Dashboard
            </h1>
            <p className="text-gray-700 mt-1">
              Analisis mendalam tentang performa platform PaberLand
            </p>
          </div>

          <button
            onClick={() => fetchAnalytics(true)}
            disabled={refreshing}
            className="inline-flex items-center px-4 py-2 border border-blue-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-blue-50 transition-colors disabled:opacity-50"
          >
            <ArrowPathIcon
              className={`w-5 h-5 mr-2 ${refreshing ? "animate-spin" : ""}`}
            />
            {refreshing ? "Memuat..." : "Refresh Data"}
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <AdminStatsCards stats={stats} loading={loading} />

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Growth Metrics */}
        <div className="bg-white/95 rounded-xl shadow-sm p-6 border border-blue-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">
              📈 Metrics Pertumbuhan
            </h3>
            <ChartBarIcon className="w-6 h-6 text-green-500" />
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  User Growth Rate (Hari Ini)
                </span>
                <span className="text-sm font-bold text-green-600">
                  +{calculateGrowthRate(stats.newUsersToday, stats.totalUsers)}%
                </span>
              </div>
              <div className="w-full bg-blue-100 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${Math.min(
                      100,
                      parseFloat(
                        calculateGrowthRate(
                          stats.newUsersToday,
                          stats.totalUsers
                        )
                      ) * 10
                    )}%`,
                  }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Article Growth Rate (Hari Ini)
                </span>
                <span className="text-sm font-bold text-blue-600">
                  +
                  {calculateGrowthRate(
                    stats.newArticlesToday,
                    stats.totalArticles
                  )}
                  %
                </span>
              </div>
              <div className="w-full bg-blue-100 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${Math.min(
                      100,
                      parseFloat(
                        calculateGrowthRate(
                          stats.newArticlesToday,
                          stats.totalArticles
                        )
                      ) * 10
                    )}%`,
                  }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Engagement Rate
                </span>
                <span className="text-sm font-bold text-blue-600">
                  {calculateEngagementRate()}%
                </span>
              </div>
              <div className="w-full bg-blue-100 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${Math.min(
                      100,
                      parseFloat(calculateEngagementRate())
                    )}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Platform Health */}
        <div className="bg-white/95 rounded-xl shadow-sm p-6 border border-blue-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">
              🏥 Platform Health
            </h3>
            <ChartBarIcon className="w-6 h-6 text-blue-500" />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-100">
              <div>
                <p className="font-medium text-gray-900">Content Moderation</p>
                <p className="text-sm text-gray-600">
                  {stats.pendingReports} laporan pending
                </p>
              </div>
              <div
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  stats.pendingReports === 0
                    ? "bg-green-100 text-green-800"
                    : stats.pendingReports < 5
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {stats.pendingReports === 0
                  ? "Excellent"
                  : stats.pendingReports < 5
                  ? "Good"
                  : "Needs Attention"}
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-100">
              <div>
                <p className="font-medium text-gray-900">User Activity</p>
                <p className="text-sm text-gray-600">
                  {stats.newUsersToday} user baru hari ini
                </p>
              </div>
              <div
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  stats.newUsersToday > 10
                    ? "bg-green-100 text-green-800"
                    : stats.newUsersToday > 5
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-blue-100 text-gray-800"
                }`}
              >
                {stats.newUsersToday > 10
                  ? "High"
                  : stats.newUsersToday > 5
                  ? "Medium"
                  : "Low"}
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-100">
              <div>
                <p className="font-medium text-gray-900">Content Quality</p>
                <p className="text-sm text-gray-600">
                  {stats.featuredContent} konten featured
                </p>
              </div>
              <div className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                Curated
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="bg-white/95 rounded-xl shadow-sm p-6 border border-blue-100">
        <h3 className="text-lg font-bold text-gray-900 mb-6">
          📋 Detailed Statistics
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
              <UsersIcon className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">
              User Metrics
            </h4>
            <div className="space-y-1 text-sm text-gray-600">
              <p>
                Total Users:{" "}
                <span className="font-medium text-gray-900">
                  {stats.totalUsers.toLocaleString()}
                </span>
              </p>
              <p>
                New Today:{" "}
                <span className="font-medium text-green-600">
                  +{stats.newUsersToday}
                </span>
              </p>
              <p>
                Growth:{" "}
                <span className="font-medium text-blue-600">
                  {calculateGrowthRate(stats.newUsersToday, stats.totalUsers)}%
                </span>
              </p>
            </div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
              <DocumentTextIcon className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">
              Content Metrics
            </h4>
            <div className="space-y-1 text-sm text-gray-600">
              <p>
                Total Articles:{" "}
                <span className="font-medium text-gray-900">
                  {stats.totalArticles.toLocaleString()}
                </span>
              </p>
              <p>
                New Today:{" "}
                <span className="font-medium text-green-600">
                  +{stats.newArticlesToday}
                </span>
              </p>
              <p>
                Featured:{" "}
                <span className="font-medium text-yellow-600">
                  {stats.featuredContent}
                </span>
              </p>
            </div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
              <ChartBarIcon className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">Engagement</h4>
            <div className="space-y-1 text-sm text-gray-600">
              <p>
                Total Comments:{" "}
                <span className="font-medium text-gray-900">
                  {stats.totalComments.toLocaleString()}
                </span>
              </p>
              <p>
                Avg per Article:{" "}
                <span className="font-medium text-blue-600">
                  {(
                    stats.totalComments / Math.max(stats.totalArticles, 1)
                  ).toFixed(1)}
                </span>
              </p>
              <p>
                Rate:{" "}
                <span className="font-medium text-blue-600">
                  {calculateEngagementRate()}%
                </span>
              </p>
            </div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">Moderation</h4>
            <div className="space-y-1 text-sm text-gray-600">
              <p>
                Total Reports:{" "}
                <span className="font-medium text-gray-900">
                  {stats.totalReports.toLocaleString()}
                </span>
              </p>
              <p>
                Pending:{" "}
                <span className="font-medium text-red-600">
                  {stats.pendingReports}
                </span>
              </p>
              <p>
                Status:{" "}
                <span
                  className={`font-medium ${
                    stats.pendingReports === 0
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {stats.pendingReports === 0 ? "Clean" : "Review Needed"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminAnalyticsPage() {
  return (
    <AdminProtectedRoute>
      <AdminLayout>
        <AdminAnalyticsContent />
      </AdminLayout>
    </AdminProtectedRoute>
  );
}
