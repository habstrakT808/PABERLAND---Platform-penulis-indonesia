// src/app/admin/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { adminHelpers, AdminStats } from "@/lib/adminHelpers";
import AdminProtectedRoute from "@/components/admin/AdminProtectedRoute";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminStatsCards from "@/components/admin/AdminStatsCards";
import Link from "next/link";
import {
  ArrowPathIcon,
  ExclamationTriangleIcon,
  ChartBarIcon,
  UsersIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

function AdminDashboardContent() {
  const { user } = useAuth();
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
    fetchStats();
  }, []);

  const fetchStats = async (showRefreshIndicator = false) => {
    if (showRefreshIndicator) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      const adminStats = await adminHelpers.getAdminStats();
      setStats(adminStats);
    } catch (error) {
      console.error("Error fetching admin stats:", error);
      toast.error("Gagal memuat statistik admin");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    fetchStats(true);
    toast.success("Data berhasil diperbarui!");
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              🛡️ Admin Dashboard
            </h1>
            <p className="text-gray-700 mt-1">
              Selamat datang, {user?.user_metadata?.full_name || "Admin"}!
              Kelola platform PaberLand.
            </p>
          </div>

          <button
            onClick={handleRefresh}
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

      {/* Quick Actions & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            🚀 Aksi Cepat
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/admin/users"
              className="block bg-white/95 p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-blue-100"
            >
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <UsersIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Kelola Users
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {stats.totalUsers} total users
                  </p>
                </div>
              </div>
            </Link>

            <Link
              href="/admin/articles"
              className="block bg-white/95 p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-blue-100"
            >
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <DocumentTextIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Kelola Konten
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {stats.totalArticles} total konten
                  </p>
                </div>
              </div>
            </Link>

            <Link
              href="/admin/reports"
              className="block bg-white/95 p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-blue-100"
            >
              <div className="flex items-center">
                <div className="p-3 bg-red-100 rounded-lg">
                  <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Laporan Konten
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {stats.pendingReports} pending reports
                  </p>
                </div>
              </div>
            </Link>

            <Link
              href="/admin/analytics"
              className="block bg-white/95 p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-blue-100"
            >
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <ChartBarIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Analytics
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Lihat statistik detail
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Alerts & Notifications */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            🔔 Alerts & Status
          </h2>
          <div className="space-y-4">
            {/* Pending Reports Alert */}
            {stats.pendingReports > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start">
                  <ExclamationTriangleIcon className="w-5 h-5 text-red-600 mt-0.5" />
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      Laporan Pending
                    </h3>
                    <p className="text-sm text-red-700 mt-1">
                      Ada {stats.pendingReports} laporan yang perlu ditinjau.
                    </p>
                    <Link
                      href="/admin/reports"
                      className="text-sm font-medium text-red-600 hover:text-red-700 mt-2 inline-block"
                    >
                      Tinjau Sekarang →
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* System Status */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">
                    System Status
                  </h3>
                  <p className="text-sm text-green-700 mt-1">
                    Semua sistem berjalan normal
                  </p>
                </div>
              </div>
            </div>

            {/* Activity Summary */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-blue-800 mb-2">
                Aktivitas Hari Ini
              </h3>
              <div className="space-y-1 text-sm text-blue-700">
                <p>• {stats.newUsersToday} user baru mendaftar</p>
                <p>• {stats.newArticlesToday} konten baru dipublikasikan</p>
                <p>• {stats.featuredContent} konten sedang di-featured</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                📊 Quick Stats
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Users:</span>
                  <span className="font-medium text-gray-900">
                    {stats.totalUsers.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Konten:</span>
                  <span className="font-medium text-gray-900">
                    {stats.totalArticles.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Komentar:</span>
                  <span className="font-medium text-gray-900">
                    {stats.totalComments.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Preview */}
      <div className="bg-white/95 rounded-xl shadow-sm p-6 border border-blue-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            �� Platform Overview
          </h2>
          <Link
            href="/admin/analytics"
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            Lihat Detail →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {(
                (stats.newUsersToday / Math.max(stats.totalUsers, 1)) *
                100
              ).toFixed(1)}
              %
            </div>
            <p className="text-sm text-gray-600">Growth Rate Hari Ini</p>
          </div>

          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {Math.round(
                (stats.totalComments / Math.max(stats.totalArticles, 1)) * 10
              ) / 10}
            </div>
            <p className="text-sm text-gray-600">Avg Comments per Konten</p>
          </div>

          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {stats.pendingReports === 0 ? "✅" : "⚠️"}
            </div>
            <p className="text-sm text-gray-600">Moderation Status</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <AdminProtectedRoute>
      <AdminLayout>
        <AdminDashboardContent />
      </AdminLayout>
    </AdminProtectedRoute>
  );
}
