// src/app/admin/logs/page.tsx
"use client";

import { useState, useEffect } from "react";
import { adminHelpers, AdminActivity } from "@/lib/adminHelpers";
import AdminProtectedRoute from "@/components/admin/AdminProtectedRoute";
import AdminLayout from "@/components/admin/AdminLayout";
import Image from "next/image";
import {
  ClipboardDocumentListIcon,
  ArrowPathIcon,
  FunnelIcon,
  ClockIcon,
  UserIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  TrashIcon,
  StarIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { supabase, getAvatarUrl } from "@/lib/supabase";

function AdminLogsContent() {
  const [activities, setActivities] = useState<AdminActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const itemsPerPage = 25;

  useEffect(() => {
    fetchActivityLogs();
  }, [currentPage]);

  const fetchActivityLogs = async (showRefreshIndicator = false) => {
    if (showRefreshIndicator) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      const result = await adminHelpers.getAdminActivityLogs(
        currentPage,
        itemsPerPage
      );
      setActivities(result.activities);
      setTotalPages(result.totalPages);
      setTotalCount(result.totalCount);
    } catch (error) {
      console.error("Error fetching activity logs:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case "delete_article":
        return <TrashIcon className="w-5 h-5 text-red-500" />;
      case "promote_to_admin":
        return <ShieldCheckIcon className="w-5 h-5 text-yellow-500" />;
      case "suspend_user":
      case "unsuspend_user":
        return <ExclamationTriangleIcon className="w-5 h-5 text-orange-500" />;
      case "feature_content":
      case "unfeature_content":
        return <StarIcon className="w-5 h-5 text-purple-500" />;
      case "resolve_report":
        return <ExclamationTriangleIcon className="w-5 h-5 text-green-500" />;
      default:
        return <ClipboardDocumentListIcon className="w-5 h-5 text-gray-500" />;
    }
  };

  const getActionLabel = (action: string) => {
    const actionLabels: { [key: string]: string } = {
      delete_article: "Menghapus Konten",
      promote_to_admin: "Promosi ke Admin",
      suspend_user: "Suspend User",
      unsuspend_user: "Unsuspend User",
      feature_content: "Feature Konten",
      unfeature_content: "Unfeature Konten",
      resolve_report: "Menyelesaikan Laporan",
    };
    return actionLabels[action] || action.replace(/_/g, " ");
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case "delete_article":
        return "text-red-600 bg-red-100";
      case "promote_to_admin":
        return "text-yellow-600 bg-yellow-100";
      case "suspend_user":
        return "text-orange-600 bg-orange-100";
      case "unsuspend_user":
        return "text-green-600 bg-green-100";
      case "feature_content":
        return "text-purple-600 bg-purple-100";
      case "unfeature_content":
        return "text-gray-600 bg-gray-100";
      case "resolve_report":
        return "text-blue-600 bg-blue-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const formatRelativeTime = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} detik lalu`;
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} menit lalu`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} jam lalu`;
    if (diffInSeconds < 2592000)
      return `${Math.floor(diffInSeconds / 86400)} hari lalu`;

    return formatDate(dateString);
  };

  const renderActivityDetails = (activity: AdminActivity) => {
    if (activity.details) {
      return (
        <div className="mt-2 text-xs text-gray-600">
          {activity.details.reason && (
            <p>
              <strong>Alasan:</strong> {activity.details.reason}
            </p>
          )}
          {activity.details.notes && (
            <p>
              <strong>Catatan:</strong> {activity.details.notes}
            </p>
          )}
          {activity.details.status && (
            <p>
              <strong>Status:</strong> {activity.details.status}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  if (loading && !refreshing) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-blue-100 rounded w-1/3 mb-8"></div>
          <div className="space-y-4">
            {Array.from({ length: 15 }).map((_, i) => (
              <div
                key={i}
                className="bg-white/95 p-6 rounded-xl border border-blue-100"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-blue-100 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-blue-100 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-black">📋 Activity Logs</h1>
            <p className="text-gray-700 mt-1">
              Log semua aktivitas admin di platform PaberLand
            </p>
          </div>

          <button
            onClick={() => fetchActivityLogs(true)}
            disabled={refreshing}
            className="inline-flex items-center px-4 py-2 border border-blue-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-blue-50 transition-colors disabled:opacity-50"
          >
            <ArrowPathIcon
              className={`w-5 h-5 mr-2 ${refreshing ? "animate-spin" : ""}`}
            />
            {refreshing ? "Memuat..." : "Refresh"}
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="bg-white/95 rounded-xl shadow-sm p-6 mb-8 border border-blue-100">
        <div className="flex items-center space-x-2 mb-4">
          <ClipboardDocumentListIcon className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-medium text-gray-900">
            Summary Aktivitas
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-100">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {totalCount}
            </div>
            <div className="text-sm text-gray-700">Total Activities</div>
          </div>

          <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-100">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {
                activities.filter(
                  (a) =>
                    a.created_at >
                    new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
                ).length
              }
            </div>
            <div className="text-sm text-gray-700">Last 24 Hours</div>
          </div>

          <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-100">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {new Set(activities.map((a) => a.admin_id)).size}
            </div>
            <div className="text-sm text-gray-700">Active Admins</div>
          </div>

          <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-100">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {new Set(activities.map((a) => a.action)).size}
            </div>
            <div className="text-sm text-gray-700">Action Types</div>
          </div>
        </div>
      </div>

      {/* Activity Timeline */}
      {activities.length === 0 ? (
        <div className="bg-white/95 rounded-xl shadow-sm p-12 text-center border border-blue-100">
          <ClipboardDocumentListIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Belum Ada Activity Logs
          </h3>
          <p className="text-gray-600">
            Activity logs akan muncul di sini ketika admin melakukan tindakan.
          </p>
        </div>
      ) : (
        <div className="bg-white/95 rounded-xl shadow-sm border border-blue-100">
          <div className="p-6 border-b border-blue-100">
            <h3 className="text-lg font-bold text-gray-900">
              Timeline Aktivitas
            </h3>
          </div>

          <div className="divide-y divide-blue-100">
            {activities.map((activity, index) => (
              <div
                key={activity.id}
                className="p-6 hover:bg-blue-50 transition-colors"
              >
                <div className="flex items-start space-x-4">
                  {/* Timeline Indicator */}
                  <div className="relative">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      {getActionIcon(activity.action)}
                    </div>
                    {index !== activities.length - 1 && (
                      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-0.5 h-6 bg-blue-200"></div>
                    )}
                  </div>

                  {/* Activity Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        {/* Admin Avatar */}
                        {activity.admin_profile?.avatar_url ? (
                          <Image
                            src={
                              getAvatarUrl(activity.admin_profile.avatar_url) ||
                              ""
                            }
                            alt={activity.admin_profile.full_name}
                            width={32}
                            height={32}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {activity.admin_profile?.full_name?.charAt(0) ||
                              "A"}
                          </div>
                        )}

                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {activity.admin_profile?.full_name || "Admin"}
                          </p>
                          <p className="text-xs text-gray-600">
                            {formatRelativeTime(activity.created_at)}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getActionColor(
                          activity.action
                        )}`}
                      >
                        {getActionLabel(activity.action)}
                      </span>
                    </div>

                    {/* Activity Description */}
                    <div className="mb-2">
                      <p className="text-gray-700">
                        <strong>
                          {activity.admin_profile?.full_name || "Admin"}
                        </strong>{" "}
                        melakukan{" "}
                        <strong className="text-blue-600">
                          {getActionLabel(activity.action)}
                        </strong>{" "}
                        pada{" "}
                        <strong className="text-gray-900">
                          {activity.target_type === "article" && "konten"}
                          {activity.target_type === "user" && "user"}
                          {activity.target_type === "report" && "laporan"}
                          {activity.target_type === "comment" && "komentar"}
                        </strong>
                      </p>
                    </div>

                    {/* Activity Details */}
                    {renderActivityDetails(activity)}

                    {/* Metadata */}
                    <div className="mt-3 flex items-center space-x-4 text-xs text-gray-600">
                      <span className="flex items-center">
                        <ClockIcon className="w-3 h-3 mr-1" />
                        {formatDate(activity.created_at)}
                      </span>

                      <span className="flex items-center">
                        <svg
                          className="w-3 h-3 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                          />
                        </svg>
                        ID: {activity.target_id.slice(0, 8)}...
                      </span>

                      <span className="flex items-center">
                        <UserIcon className="w-3 h-3 mr-1" />
                        {activity.target_type}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Sebelumnya
            </button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum =
                Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    currentPage === pageNum
                      ? "bg-blue-600 text-white"
                      : "text-gray-500 bg-white border border-blue-200 hover:bg-blue-50"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Selanjutnya
            </button>
          </div>
        </div>
      )}

      {/* Results Info */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Menampilkan {activities.length} dari {totalCount} aktivitas
        </p>
      </div>
    </div>
  );
}

export default function AdminLogsPage() {
  return (
    <AdminProtectedRoute>
      <AdminLayout>
        <AdminLogsContent />
      </AdminLayout>
    </AdminProtectedRoute>
  );
}
