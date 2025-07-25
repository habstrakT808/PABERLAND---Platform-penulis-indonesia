"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PlusIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import { useAuth } from "@/contexts/AuthContext";
import { articleManagement, Article } from "@/lib/supabase";
import toast from "react-hot-toast";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import ArticleStatsCards from "@/components/dashboard/ArticleStatsCards";
import ArticleFilters from "@/components/dashboard/ArticleFilters";
import ArticleTable from "@/components/dashboard/ArticleTable";
import Pagination from "@/components/dashboard/Pagination";

function MyArticlesContent() {
  const { user } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [stats, setStats] = useState({
    totalArticles: 0,
    publishedArticles: 0,
    draftArticles: 0,
    totalViews: 0,
    totalLikes: 0,
    totalComments: 0,
  });

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Filter states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState<"all" | "published" | "draft">("all");

  const itemsPerPage = 10;

  const fetchArticles = async (showRefreshIndicator = false) => {
    if (!user) return;

    if (showRefreshIndicator) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      const [articlesResult, statsResult] = await Promise.all([
        articleManagement.getUserArticles(
          user.id,
          currentPage,
          itemsPerPage,
          search || undefined,
          category !== "all" ? category : undefined,
          status
        ),
        articleManagement.getUserStats(user.id),
      ]);

      setArticles(articlesResult.articles);
      setTotalPages(articlesResult.totalPages);
      setTotalCount(articlesResult.totalCount);
      setStats(statsResult);
    } catch (error) {
      console.error("Error fetching articles:", error);
      toast.error("Gagal memuat artikel");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchArticles();
  }, [user]);

  // Refetch when filters change
  useEffect(() => {
    if (user) {
      setCurrentPage(1); // Reset to first page when filters change
      fetchArticles();
    }
  }, [search, category, status]);

  // Refetch when page changes
  useEffect(() => {
    if (user && currentPage > 1) {
      fetchArticles();
    }
  }, [currentPage]);

  const handleRefresh = () => {
    fetchArticles(true);
  };

  const handleSearchChange = (newSearch: string) => {
    setSearch(newSearch);
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
  };

  const handleStatusChange = (newStatus: "all" | "published" | "draft") => {
    setStatus(newStatus);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading && !refreshing) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Memuat artikel Anda...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                📚 Artikel Saya
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Kelola semua artikel yang telah Anda tulis
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
              >
                <ArrowPathIcon
                  className={`w-5 h-5 mr-2 ${refreshing ? "animate-spin" : ""}`}
                />
                {refreshing ? "Memuat..." : "Refresh"}
              </button>

              <Link
                href="/write"
                className="inline-flex items-center px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl"
              >
                <PlusIcon className="w-5 h-5 mr-2" />
                Tulis Artikel Baru
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <ArticleStatsCards stats={stats} />

        {/* Filters */}
        <ArticleFilters
          onSearchChange={handleSearchChange}
          onCategoryChange={handleCategoryChange}
          onStatusChange={handleStatusChange}
          currentSearch={search}
          currentCategory={category}
          currentStatus={status}
        />

        {/* Results Info */}
        {totalCount > 0 && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Menampilkan {articles.length} dari {totalCount} artikel
              {search && ` untuk pencarian "${search}"`}
              {category !== "all" && ` dalam kategori ${category}`}
              {status !== "all" && ` dengan status ${status}`}
            </p>
          </div>
        )}

        {/* Articles Table */}
        <ArticleTable articles={articles} onArticleUpdate={handleRefresh} />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalCount}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
            />
          </div>
        )}

        {/* Empty State */}
        {totalCount === 0 && !loading && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {search || category !== "all" || status !== "all"
                ? "Tidak ada artikel yang sesuai"
                : "Belum ada artikel"}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
              {search || category !== "all" || status !== "all"
                ? "Coba ubah filter pencarian atau buat artikel baru."
                : "Mulai menulis artikel pertama Anda dan bagikan dengan komunitas PaberLand."}
            </p>

            {search || category !== "all" || status !== "all" ? (
              <button
                onClick={() => {
                  setSearch("");
                  setCategory("all");
                  setStatus("all");
                }}
                className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              >
                Reset Filter
              </button>
            ) : (
              <Link
                href="/write"
                className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl"
              >
                <PlusIcon className="w-5 h-5 mr-2" />
                Tulis Artikel Pertama
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function MyArticlesPage() {
  return (
    <ProtectedRoute>
      <MyArticlesContent />
    </ProtectedRoute>
  );
}
