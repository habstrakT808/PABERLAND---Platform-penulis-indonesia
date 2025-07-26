// src/app/admin/reports/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { adminHelpers, ContentReport } from "@/lib/adminHelpers";
import AdminProtectedRoute from "@/components/admin/AdminProtectedRoute";
import AdminLayout from "@/components/admin/AdminLayout";
import Image from "next/image";
import Link from "next/link";
import {
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  EyeIcon,
  ClockIcon,
  UserIcon,
  DocumentTextIcon,
  ChatBubbleLeftIcon,
  ArrowPathIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

function AdminReportsContent() {
  const { user: currentUser } = useAuth();
  const [reports, setReports] = useState<ContentReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Pagination & Filters
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [statusFilter, setStatusFilter] = useState("pending");

  // UI States
  const [selectedReport, setSelectedReport] = useState<ContentReport | null>(
    null
  );
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [resolveNotes, setResolveNotes] = useState("");
  const [showResolveModal, setShowResolveModal] = useState(false);
  const [resolveAction, setResolveAction] = useState<"resolved" | "dismissed">(
    "resolved"
  );

  const itemsPerPage = 15;

  const statusOptions = [
    {
      value: "pending",
      label: "Pending",
      count: 0,
      color: "text-yellow-600 bg-yellow-100",
    },
    {
      value: "reviewed",
      label: "Reviewed",
      count: 0,
      color: "text-blue-600 bg-blue-100",
    },
    {
      value: "resolved",
      label: "Resolved",
      count: 0,
      color: "text-green-600 bg-green-100",
    },
    {
      value: "dismissed",
      label: "Dismissed",
      count: 0,
      color: "text-gray-600 bg-gray-100",
    },
    {
      value: "all",
      label: "Semua",
      count: 0,
      color: "text-blue-600 bg-blue-100",
    },
  ];

  const reasonLabels = {
    spam: "🚫 Spam",
    inappropriate: "⚠️ Konten Tidak Pantas",
    harassment: "😡 Pelecehan",
    copyright: "©️ Pelanggaran Hak Cipta",
    other: "❓ Lainnya",
  };

  useEffect(() => {
    fetchReports();
  }, [currentPage, statusFilter]);

  const fetchReports = async (showRefreshIndicator = false) => {
    if (showRefreshIndicator) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      const result = await adminHelpers.getContentReports(
        currentPage,
        itemsPerPage,
        statusFilter !== "all" ? statusFilter : undefined
      );

      setReports(result.reports);
      setTotalPages(result.totalPages);
      setTotalCount(result.totalCount);
    } catch (error) {
      console.error("Error fetching reports:", error);
      toast.error("Gagal memuat laporan");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleResolveReport = async (
    reportId: string,
    status: "resolved" | "dismissed",
    notes?: string
  ) => {
    if (!currentUser) return;

    setActionLoading(reportId);
    try {
      const result = await adminHelpers.resolveReport(
        reportId,
        currentUser.id,
        status,
        notes
      );

      if (result.success) {
        toast.success(
          `Laporan berhasil ${
            status === "resolved" ? "diselesaikan" : "ditolak"
          }!`
        );
        fetchReports(true);
        setShowResolveModal(false);
        setSelectedReport(null);
        setResolveNotes("");
      } else {
        toast.error(result.error || "Gagal menyelesaikan laporan");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan sistem");
    } finally {
      setActionLoading(null);
    }
  };

  const openResolveModal = (
    report: ContentReport,
    action: "resolved" | "dismissed"
  ) => {
    setSelectedReport(report);
    setResolveAction(action);
    setShowResolveModal(true);
    setResolveNotes("");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case "article":
        return <DocumentTextIcon className="w-5 h-5" />;
      case "comment":
        return <ChatBubbleLeftIcon className="w-5 h-5" />;
      case "user":
        return <UserIcon className="w-5 h-5" />;
      default:
        return <ExclamationTriangleIcon className="w-5 h-5" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = statusOptions.find((s) => s.value === status);
    if (!statusConfig) return null;

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}
      >
        {statusConfig.label}
      </span>
    );
  };

  const renderContentPreview = (report: ContentReport) => {
    if (report.content_type === "article" && report.content_details) {
      return (
        <div className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-100">
          <div className="flex items-center space-x-2 mb-2">
            <DocumentTextIcon className="w-4 h-4 text-gray-500" />
            <div className="text-sm text-gray-600">
              Konten: {report.content_details.title}
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <Link
                href={`/article/${report.content_details.slug}`}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Lihat Konten →
              </Link>
            </div>
          </div>
          <p className="text-xs text-gray-600">
            Oleh: {report.content_details.profiles?.full_name}
          </p>
        </div>
      );
    }

    if (report.content_type === "comment" && report.content_details) {
      return (
        <div className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-100">
          <div className="flex items-center space-x-2 mb-2">
            <ChatBubbleLeftIcon className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Komentar</span>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">
            "{report.content_details.content}"
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Oleh: {report.content_details.profiles?.full_name}
          </p>
        </div>
      );
    }

    return (
      <div className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-100">
        <p className="text-sm text-gray-600">
          Konten tidak tersedia atau telah dihapus
        </p>
      </div>
    );
  };

  if (loading && !refreshing) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-blue-100 rounded w-1/3 mb-8"></div>
          <div className="space-y-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-white/95 p-6 rounded-xl border border-blue-100"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full"></div>
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
            <h1 className="text-3xl font-bold text-black">🚨 Laporan Konten</h1>
            <p className="text-gray-700 mt-1">
              Kelola laporan dari pengguna tentang konten yang bermasalah
            </p>
          </div>

          <button
            onClick={() => fetchReports(true)}
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

      {/* Status Filter Tabs */}
      <div className="bg-white/95 rounded-xl shadow-sm p-6 mb-8 border border-blue-100">
        <div className="flex items-center space-x-2 mb-4">
          <FunnelIcon className="w-5 h-5 text-gray-500" />
          <h3 className="text-lg font-medium text-gray-900">Filter Status</h3>
        </div>

        <div className="flex flex-wrap gap-2">
          {statusOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                setStatusFilter(option.value);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                statusFilter === option.value
                  ? option.color
                  : "text-gray-600 bg-blue-100 hover:bg-blue-200"
              }`}
            >
              {option.label}
              {option.value === statusFilter && (
                <span className="ml-2 bg-white text-xs px-2 py-1 rounded-full">
                  {totalCount}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Reports List */}
      {reports.length === 0 ? (
        <div className="bg-white/95 rounded-xl shadow-sm p-12 text-center border border-blue-100">
          <ExclamationTriangleIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {statusFilter === "pending"
              ? "Tidak Ada Laporan Pending"
              : "Tidak Ada Laporan"}
          </h3>
          <p className="text-gray-600">
            {statusFilter === "pending"
              ? "Semua laporan telah ditangani. Platform dalam kondisi baik!"
              : `Tidak ada laporan dengan status ${statusFilter}.`}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {reports.map((report) => (
            <div
              key={report.id}
              className={`bg-white/95 rounded-xl shadow-sm p-6 border transition-all duration-300 hover:shadow-lg ${
                report.status === "pending"
                  ? "border-yellow-200 bg-yellow-50"
                  : "border-blue-100"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  {/* Reporter Avatar */}
                  <div className="flex-shrink-0">
                    {report.reporter_profile?.avatar_url ? (
                      <Image
                        src={report.reporter_profile.avatar_url}
                        alt={report.reporter_profile.full_name}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                        {report.reporter_profile?.full_name?.charAt(0) || "U"}
                      </div>
                    )}
                  </div>

                  {/* Report Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="flex items-center space-x-2">
                        {getContentTypeIcon(report.content_type)}
                        <span className="font-medium text-gray-900">
                          {report.reporter_profile?.full_name || "User"}
                        </span>
                      </div>

                      {getStatusBadge(report.status)}

                      <span className="text-sm text-gray-500">
                        {reasonLabels[
                          report.reason as keyof typeof reasonLabels
                        ] || report.reason}
                      </span>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                      <span className="flex items-center">
                        <ClockIcon className="w-4 h-4 mr-1" />
                        {formatDate(report.created_at)}
                      </span>

                      <span className="capitalize">
                        {report.content_type === "article" && "📄 Konten"}
                        {report.content_type === "comment" && "💬 Komentar"}
                        {report.content_type === "user" && "👤 User"}
                      </span>
                    </div>

                    {/* Report Description */}
                    {report.description && (
                      <div className="mb-3">
                        <p className="text-gray-700 text-sm bg-blue-50 p-3 rounded-lg border border-blue-100">
                          <strong>Alasan:</strong> {report.description}
                        </p>
                      </div>
                    )}

                    {/* Content Preview */}
                    {renderContentPreview(report)}

                    {/* Admin Notes */}
                    {report.admin_notes && (
                      <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                        <p className="text-sm text-blue-800">
                          <strong>Catatan Admin:</strong> {report.admin_notes}
                        </p>
                        {report.reviewed_at && (
                          <p className="text-xs text-blue-600 mt-1">
                            Ditinjau pada {formatDate(report.reviewed_at)}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                {report.status === "pending" && (
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => openResolveModal(report, "resolved")}
                      disabled={actionLoading === report.id}
                      className="inline-flex items-center px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
                    >
                      <CheckCircleIcon className="w-4 h-4 mr-1" />
                      Selesaikan
                    </button>

                    <button
                      onClick={() => openResolveModal(report, "dismissed")}
                      disabled={actionLoading === report.id}
                      className="inline-flex items-center px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
                    >
                      <XCircleIcon className="w-4 h-4 mr-1" />
                      Tolak
                    </button>
                  </div>
                )}

                {report.status !== "pending" && (
                  <div className="ml-4">
                    <span className="text-sm text-gray-500">
                      {report.status === "resolved" && "✅ Diselesaikan"}
                      {report.status === "dismissed" && "❌ Ditolak"}
                      {report.status === "reviewed" && "👁️ Ditinjau"}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
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
          Menampilkan {reports.length} dari {totalCount} laporan
          {statusFilter !== "all" && ` dengan status ${statusFilter}`}
        </p>
      </div>

      {/* Resolve Modal */}
      {showResolveModal && selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 rounded-xl shadow-2xl max-w-md w-full border border-blue-100">
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                {resolveAction === "resolved"
                  ? "Selesaikan Laporan"
                  : "Tolak Laporan"}
              </h3>

              <p className="text-gray-600 mb-4">
                Apakah Anda yakin ingin{" "}
                {resolveAction === "resolved" ? "menyelesaikan" : "menolak"}{" "}
                laporan ini?
              </p>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Catatan Admin (opsional):
                </label>
                <textarea
                  value={resolveNotes}
                  onChange={(e) => setResolveNotes(e.target.value)}
                  placeholder="Tambahkan catatan untuk tindakan ini..."
                  rows={3}
                  className="w-full px-3 py-2 border border-blue-200 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex items-center justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowResolveModal(false);
                    setSelectedReport(null);
                    setResolveNotes("");
                  }}
                  className="px-4 py-2 text-gray-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200"
                >
                  Batal
                </button>

                <button
                  onClick={() =>
                    handleResolveReport(
                      selectedReport.id,
                      resolveAction,
                      resolveNotes || undefined
                    )
                  }
                  disabled={actionLoading === selectedReport.id}
                  className={`px-4 py-2 text-white rounded-lg font-medium transition-colors disabled:opacity-50 ${
                    resolveAction === "resolved"
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-gray-600 hover:bg-gray-700"
                  }`}
                >
                  {actionLoading === selectedReport.id ? (
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Memproses...
                    </div>
                  ) : resolveAction === "resolved" ? (
                    "Selesaikan"
                  ) : (
                    "Tolak"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminReportsPage() {
  return (
    <AdminProtectedRoute>
      <AdminLayout>
        <AdminReportsContent />
      </AdminLayout>
    </AdminProtectedRoute>
  );
}
