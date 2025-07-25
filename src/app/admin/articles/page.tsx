// src/app/admin/articles/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { adminHelpers } from "@/lib/adminHelpers";
import AdminProtectedRoute from "@/components/admin/AdminProtectedRoute";
import AdminLayout from "@/components/admin/AdminLayout";
import Image from "next/image";
import Link from "next/link";
import {
  MagnifyingGlassIcon,
  EyeIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  TrashIcon,
  StarIcon,
  EllipsisVerticalIcon,
  ArrowPathIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  cover_image: string | null;
  category: string;
  author_id: string;
  published: boolean;
  scheduled_at: string | null;
  slug: string;
  views: number;
  likes_count: number;
  comments_count: number;
  created_at: string;
  updated_at: string;
  profiles: {
    id: string;
    full_name: string;
    avatar_url: string | null;
  };
}

function AdminArticlesContent() {
  const { user: currentUser } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Pagination & Filters
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState<"all" | "published" | "draft">("all");

  // UI States
  const [showArticleMenu, setShowArticleMenu] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [featuredArticles, setFeaturedArticles] = useState<Set<string>>(
    new Set()
  );

  const itemsPerPage = 20;

  const categories = [
    { value: "all", label: "Semua Kategori", emoji: "📚" },
    { value: "cerpen", label: "Cerpen", emoji: "📖" },
    { value: "puisi", label: "Puisi", emoji: "🎭" },
    { value: "artikel", label: "Artikel", emoji: "📰" },
    { value: "cerita-rakyat", label: "Cerita Rakyat", emoji: "🏛️" },
    { value: "novel-berseri", label: "Novel Berseri", emoji: "📚" },
    { value: "lainnya", label: "Lainnya", emoji: "✨" },
  ];

  useEffect(() => {
    fetchArticles();
    fetchFeaturedArticles();
  }, [currentPage, search, category, status]);

  const fetchArticles = async (showRefreshIndicator = false) => {
    if (showRefreshIndicator) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      const result = await adminHelpers.getArticlesForAdmin(
        currentPage,
        itemsPerPage,
        search || undefined,
        category !== "all" ? category : undefined,
        status
      );

      setArticles(
        result.articles.map((article: any) => ({
          ...article,
          profiles: Array.isArray(article.profiles)
            ? article.profiles[0] || { id: "", full_name: "", avatar_url: null }
            : article.profiles,
        }))
      );
      setTotalPages(result.totalPages);
      setTotalCount(result.totalCount);
    } catch (error) {
      console.error("Error fetching articles:", error);
      toast.error("Gagal memuat data artikel");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const fetchFeaturedArticles = async () => {
    try {
      // This would be a specific API call to get featured articles
      // For now, we'll simulate it
      const featured = new Set<string>();
      setFeaturedArticles(featured);
    } catch (error) {
      console.error("Error fetching featured articles:", error);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchArticles();
  };

  const handleDeleteArticle = async (
    articleId: string,
    articleTitle: string
  ) => {
    if (!currentUser) return;

    if (
      !confirm(`Apakah Anda yakin ingin menghapus artikel "${articleTitle}"?`)
    ) {
      return;
    }

    setActionLoading(articleId);
    try {
      const result = await adminHelpers.deleteArticle(
        articleId,
        currentUser.id,
        "Dihapus oleh admin"
      );

      if (result.success) {
        toast.success(`Artikel "${articleTitle}" berhasil dihapus!`);
        fetchArticles(true);
      } else {
        toast.error(result.error || "Gagal menghapus artikel");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan sistem");
    } finally {
      setActionLoading(null);
      setShowArticleMenu(null);
    }
  };

  const handleToggleFeatured = async (
    articleId: string,
    articleTitle: string,
    featured: boolean
  ) => {
    if (!currentUser) return;

    setActionLoading(articleId);
    try {
      const result = await adminHelpers.toggleFeaturedContent(
        "article",
        articleId,
        currentUser.id,
        !featured
      );

      if (result.success) {
        const newFeatured = new Set(featuredArticles);
        if (featured) {
          newFeatured.delete(articleId);
        } else {
          newFeatured.add(articleId);
        }
        setFeaturedArticles(newFeatured);

        toast.success(
          `Artikel "${articleTitle}" berhasil ${
            featured ? "diunfeature" : "di-feature"
          }!`
        );
      } else {
        toast.error(result.error || "Gagal mengubah status featured");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan sistem");
    } finally {
      setActionLoading(null);
      setShowArticleMenu(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  const getCategoryEmoji = (category: string) => {
    const cat = categories.find((c) => c.value === category);
    return cat?.emoji || "📝";
  };

  if (loading && !refreshing) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-8"></div>
          <div className="space-y-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-xl">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
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
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              📚 Manajemen Artikel
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Kelola semua artikel di platform PaberLand
            </p>
          </div>

          <button
            onClick={() => fetchArticles(true)}
            disabled={refreshing}
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
          >
            <ArrowPathIcon
              className={`w-5 h-5 mr-2 ${refreshing ? "animate-spin" : ""}`}
            />
            {refreshing ? "Memuat..." : "Refresh"}
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 max-w-md">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari judul artikel..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </form>

          <div className="flex items-center space-x-4">
            {/* Category Filter */}
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.emoji} {cat.label}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value as "all" | "published" | "draft");
                setCurrentPage(1);
              }}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">Semua Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>
      </div>

      {/* Articles List */}
      {articles.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-12 text-center border border-gray-200 dark:border-gray-700">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-gray-400"
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
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Tidak Ada Artikel
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {search || category !== "all" || status !== "all"
              ? "Tidak ditemukan artikel yang sesuai dengan filter."
              : "Belum ada artikel yang dipublikasikan."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {articles.map((article) => {
            const isFeatured = featuredArticles.has(article.id);

            return (
              <div
                key={article.id}
                className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border transition-all duration-300 hover:shadow-lg ${
                  isFeatured
                    ? "border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/10"
                    : "border-gray-200 dark:border-gray-700"
                }`}
              >
                <div className="flex items-start space-x-4">
                  {/* Article Image */}
                  <div className="flex-shrink-0">
                    {article.cover_image ? (
                      <Image
                        src={article.cover_image}
                        alt={article.title}
                        width={80}
                        height={80}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">
                          {getCategoryEmoji(article.category)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Article Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        {/* Title & Status */}
                        <div className="flex items-center space-x-3 mb-2">
                          <Link
                            href={`/article/${article.slug}`}
                            className="text-lg font-bold text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors line-clamp-1"
                          >
                            {article.title}
                          </Link>

                          {isFeatured && (
                            <StarSolid
                              className="w-5 h-5 text-yellow-500"
                              title="Featured Article"
                            />
                          )}

                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              article.published
                                ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200"
                                : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                            }`}
                          >
                            {article.published ? "Published" : "Draft"}
                          </span>

                          <span className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full text-xs font-medium">
                            {getCategoryEmoji(article.category)}{" "}
                            {article.category.charAt(0).toUpperCase() +
                              article.category.slice(1).replace("-", " ")}
                          </span>
                        </div>

                        {/* Author */}
                        <div className="flex items-center space-x-2 mb-2">
                          {article.profiles.avatar_url ? (
                            <Image
                              src={article.profiles.avatar_url}
                              alt={article.profiles.full_name}
                              width={24}
                              height={24}
                              className="w-6 h-6 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                              {article.profiles.full_name.charAt(0)}
                            </div>
                          )}
                          <Link
                            href={`/profile/${article.profiles.id}`}
                            className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                          >
                            {article.profiles.full_name}
                          </Link>
                        </div>

                        {/* Excerpt */}
                        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-3">
                          {article.excerpt}
                        </p>

                        {/* Stats & Meta */}
                        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                          <span className="flex items-center">
                            <EyeIcon className="w-4 h-4 mr-1" />
                            {formatNumber(article.views)}
                          </span>
                          <span className="flex items-center">
                            <HeartIcon className="w-4 h-4 mr-1" />
                            {formatNumber(article.likes_count)}
                          </span>
                          <span className="flex items-center">
                            <ChatBubbleLeftIcon className="w-4 h-4 mr-1" />
                            {formatNumber(article.comments_count)}
                          </span>
                          <span className="flex items-center">
                            <ClockIcon className="w-4 h-4 mr-1" />
                            {formatDate(article.created_at)}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="relative ml-4">
                        <button
                          onClick={() =>
                            setShowArticleMenu(
                              showArticleMenu === article.id ? null : article.id
                            )
                          }
                          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                          disabled={actionLoading === article.id}
                        >
                          {actionLoading === article.id ? (
                            <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <EllipsisVerticalIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                          )}
                        </button>

                        {/* Action Menu */}
                        {showArticleMenu === article.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                            <div className="py-1">
                              <Link
                                href={`/article/${article.slug}`}
                                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                onClick={() => setShowArticleMenu(null)}
                              >
                                <EyeIcon className="w-4 h-4 inline mr-2" />
                                Lihat Artikel
                              </Link>

                              <button
                                onClick={() =>
                                  handleToggleFeatured(
                                    article.id,
                                    article.title,
                                    isFeatured
                                  )
                                }
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                              >
                                <StarIcon className="w-4 h-4 inline mr-2" />
                                {isFeatured ? "Unfeature" : "Feature"} Artikel
                              </button>

                              <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>

                              <button
                                onClick={() =>
                                  handleDeleteArticle(article.id, article.title)
                                }
                                className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                              >
                                <TrashIcon className="w-4 h-4 inline mr-2" />
                                Hapus Artikel
                              </button>

                              <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>

                              <button
                                onClick={() => setShowArticleMenu(null)}
                                className="w-full text-left px-4 py-2 text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                              >
                                Tutup
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm font-medium text-gray-500 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Sebelumnya
            </button>

            {/* Page Numbers */}
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum =
                Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    currentPage === pageNum
                      ? "bg-indigo-600 text-white"
                      : "text-gray-500 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
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
              className="px-4 py-2 text-sm font-medium text-gray-500 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Selanjutnya
            </button>
          </div>
        </div>
      )}

      {/* Results Info */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Menampilkan {articles.length} dari {totalCount} artikel
          {search && ` untuk pencarian "${search}"`}
          {category !== "all" && ` dalam kategori ${category}`}
          {status !== "all" && ` dengan status ${status}`}
        </p>
      </div>
    </div>
  );
}

export default function AdminArticlesPage() {
  return (
    <AdminProtectedRoute>
      <AdminLayout>
        <AdminArticlesContent />
      </AdminLayout>
    </AdminProtectedRoute>
  );
}
