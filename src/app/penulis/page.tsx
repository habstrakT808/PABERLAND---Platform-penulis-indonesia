// src/app/penulis/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MagnifyingGlassIcon,
  UserGroupIcon,
  ChartBarIcon,
  EyeIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  BookOpenIcon,
  CalendarIcon,
  AdjustmentsHorizontalIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";

interface AuthorProfile {
  id: string;
  full_name: string;
  bio: string | null;
  avatar_url: string | null;
  created_at: string;
  // Computed stats
  article_count: number;
  total_views: number;
  total_likes: number;
  total_comments: number;
  latest_article?: {
    title: string;
    created_at: string;
    category: string;
  };
  categories: string[];
}

interface AuthorsPageData {
  authors: AuthorProfile[];
  totalCount: number;
  totalPages: number;
  platformStats: {
    totalAuthors: number;
    totalArticles: number;
    totalViews: number;
    totalLikes: number;
    topCategories: Array<{
      category: string;
      count: number;
    }>;
  };
}

export default function AuthorsPage() {
  const [data, setData] = useState<AuthorsPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<
    "newest" | "oldest" | "most_articles" | "most_popular" | "alphabetical"
  >("most_articles");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchAuthorsData();
  }, [currentPage, sortBy, searchQuery]);

  const fetchAuthorsData = async () => {
    setLoading(true);
    try {
      await Promise.all([fetchAuthors(), fetchPlatformStats()]);
    } catch (error) {
      console.error("Error fetching authors data:", error);
      toast.error("Gagal memuat data penulis");
    } finally {
      setLoading(false);
    }
  };

  const fetchAuthors = async () => {
    const limit = 12;
    const from = (currentPage - 1) * limit;
    const to = from + limit - 1;

    // First, get all profiles with basic info
    let profilesQuery = supabase
      .from("profiles")
      .select("id, full_name, bio, avatar_url, created_at");

    // Apply search filter
    if (searchQuery.trim()) {
      profilesQuery = profilesQuery.or(
        `full_name.ilike.%${searchQuery}%,bio.ilike.%${searchQuery}%`
      );
    }

    const { data: profiles, error: profilesError } = await profilesQuery;

    if (profilesError) {
      console.error("Error fetching profiles:", profilesError);
      return;
    }

    if (!profiles || profiles.length === 0) {
      setData((prev) => ({
        ...prev!,
        authors: [],
        totalCount: 0,
        totalPages: 0,
      }));
      return;
    }

    // Get article stats for each author
    const authorIds = profiles.map((p) => p.id);
    const { data: articleStats, error: statsError } = await supabase
      .from("articles")
      .select(
        `
        author_id,
        views,
        likes_count,
        comments_count,
        title,
        created_at,
        category,
        published
      `
      )
      .in("author_id", authorIds)
      .eq("published", true)
      .order("created_at", { ascending: false });

    if (statsError) {
      console.error("Error fetching article stats:", statsError);
      return;
    }

    // Process authors with their stats
    const authorsWithStats: AuthorProfile[] = profiles.map((profile) => {
      const authorArticles =
        articleStats?.filter((article) => article.author_id === profile.id) ||
        [];

      const stats = {
        article_count: authorArticles.length,
        total_views: authorArticles.reduce(
          (sum, article) => sum + (article.views || 0),
          0
        ),
        total_likes: authorArticles.reduce(
          (sum, article) => sum + (article.likes_count || 0),
          0
        ),
        total_comments: authorArticles.reduce(
          (sum, article) => sum + (article.comments_count || 0),
          0
        ),
        latest_article: authorArticles[0]
          ? {
              title: authorArticles[0].title,
              created_at: authorArticles[0].created_at,
              category: authorArticles[0].category,
            }
          : undefined,
        categories: [
          ...new Set(authorArticles.map((article) => article.category)),
        ],
      };

      return {
        ...profile,
        ...stats,
      };
    });

    // Filter out authors with no articles (optional - you might want to keep them)
    const activeAuthors = authorsWithStats.filter(
      (author) => author.article_count > 0
    );

    // Apply sorting
    let sortedAuthors = [...activeAuthors];
    switch (sortBy) {
      case "newest":
        sortedAuthors.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        break;
      case "oldest":
        sortedAuthors.sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
        break;
      case "most_articles":
        sortedAuthors.sort((a, b) => b.article_count - a.article_count);
        break;
      case "most_popular":
        sortedAuthors.sort((a, b) => b.total_views - a.total_views);
        break;
      case "alphabetical":
        sortedAuthors.sort((a, b) => a.full_name.localeCompare(b.full_name));
        break;
    }

    // Apply pagination
    const paginatedAuthors = sortedAuthors.slice(from, to + 1);
    const totalPages = Math.ceil(sortedAuthors.length / limit);

    setData((prev) => ({
      ...prev!,
      authors: paginatedAuthors,
      totalCount: sortedAuthors.length,
      totalPages,
    }));
  };

  const fetchPlatformStats = async () => {
    try {
      // Get total authors
      const { count: authorsCount } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true });

      // Get total articles and stats
      const { data: articlesData, count: articlesCount } = await supabase
        .from("articles")
        .select("views, likes_count, category")
        .eq("published", true);

      const totals = articlesData?.reduce(
        (acc, article) => ({
          totalViews: acc.totalViews + (article.views || 0),
          totalLikes: acc.totalLikes + (article.likes_count || 0),
        }),
        { totalViews: 0, totalLikes: 0 }
      ) || { totalViews: 0, totalLikes: 0 };

      // Get top categories
      const categoryCounts = new Map<string, number>();
      articlesData?.forEach((article) => {
        categoryCounts.set(
          article.category,
          (categoryCounts.get(article.category) || 0) + 1
        );
      });

      const topCategories = Array.from(categoryCounts.entries())
        .map(([category, count]) => ({ category, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      setData((prev) => ({
        authors: prev?.authors || [],
        totalCount: prev?.totalCount || 0,
        totalPages: prev?.totalPages || 0,
        platformStats: {
          totalAuthors: authorsCount || 0,
          totalArticles: articlesCount || 0,
          totalViews: totals.totalViews,
          totalLikes: totals.totalLikes,
          topCategories,
        },
      }));
    } catch (error) {
      console.error("Error fetching platform stats:", error);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handleSortChange = (newSort: typeof sortBy) => {
    setSortBy(newSort);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
    });
  };

  const getCategoryEmoji = (category: string) => {
    const emojiMap: { [key: string]: string } = {
      cerpen: "📖",
      puisi: "🎭",
      artikel: "📰",
      "cerita-rakyat": "🏛️",
      "novel-berseri": "📚",
      lainnya: "✨",
    };
    return emojiMap[category] || "📝";
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            👥 Direktori Penulis
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Temukan dan kenali para penulis berbakat di komunitas PaberLand
          </p>
        </div>

        {/* Platform Stats */}
        {data?.platformStats && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <ChartBarIcon className="w-6 h-6 mr-2" />
              Statistik Komunitas
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">
                  {formatNumber(data.platformStats.totalAuthors)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Total Penulis
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
                  {formatNumber(data.platformStats.totalArticles)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Total Artikel
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                  {formatNumber(data.platformStats.totalViews)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Total Views
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-red-600 dark:text-red-400 mb-1">
                  {formatNumber(data.platformStats.totalLikes)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Total Likes
                </div>
              </div>
            </div>

            {/* Top Categories */}
            {data.platformStats.topCategories.length > 0 && (
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Kategori Populer:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.platformStats.topCategories.map((cat) => (
                    <Link
                      key={cat.category}
                      href={`/kategori/${cat.category}`}
                      className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                    >
                      <span>{getCategoryEmoji(cat.category)}</span>
                      <span className="capitalize">
                        {cat.category.replace("-", " ")}
                      </span>
                      <span className="text-xs">({cat.count})</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                {/* Search */}
                <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Cari penulis..."
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </form>

                {/* Sort Options */}
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                    Urutkan:
                  </span>
                  <select
                    value={sortBy}
                    onChange={(e) =>
                      handleSortChange(e.target.value as typeof sortBy)
                    }
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="most_articles">Paling Produktif</option>
                    <option value="most_popular">Paling Populer</option>
                    <option value="newest">Bergabung Terbaru</option>
                    <option value="oldest">Bergabung Terlama</option>
                    <option value="alphabetical">A-Z</option>
                  </select>
                </div>
              </div>

              {/* Results Count */}
              {data && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {searchQuery.trim() ? (
                      <>
                        Menampilkan {data.authors.length} dari {data.totalCount}{" "}
                        penulis untuk "{searchQuery}"
                      </>
                    ) : (
                      <>
                        Menampilkan {data.authors.length} dari {data.totalCount}{" "}
                        penulis
                      </>
                    )}
                  </p>
                </div>
              )}
            </div>

            {/* Authors Grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                        <div className="flex-1">
                          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                        </div>
                      </div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : data?.authors.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-12 text-center">
                <div className="text-6xl mb-4">👤</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {searchQuery.trim()
                    ? "Penulis Tidak Ditemukan"
                    : "Belum Ada Penulis"}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {searchQuery.trim()
                    ? `Tidak ditemukan penulis yang cocok dengan "${searchQuery}".`
                    : "Belum ada penulis yang terdaftar di platform ini."}
                </p>
                {searchQuery.trim() ? (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setCurrentPage(1);
                    }}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    Lihat Semua Penulis
                  </button>
                ) : (
                  <Link
                    href="/auth/register"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-block"
                  >
                    Bergabung Sebagai Penulis
                  </Link>
                )}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {data?.authors.map((author) => (
                    <div
                      key={author.id}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                    >
                      {/* Author Header */}
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="relative">
                          {author.avatar_url ? (
                            <Image
                              src={author.avatar_url}
                              alt={author.full_name}
                              width={64}
                              height={64}
                              className="w-16 h-16 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                              {author.full_name.charAt(0)}
                            </div>
                          )}
                          {/* Online indicator (you can implement real online status) */}
                          <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">
                            <Link
                              href={`/penulis/${author.id}`}
                              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                            >
                              {author.full_name}
                            </Link>
                          </h3>
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <CalendarIcon className="w-4 h-4 mr-1" />
                            Bergabung {formatDate(author.created_at)}
                          </div>
                        </div>
                      </div>

                      {/* Author Bio */}
                      {author.bio && (
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2 leading-relaxed">
                          {author.bio}
                        </p>
                      )}

                      {/* Author Stats */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                            {author.article_count}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Artikel
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-bold text-green-600 dark:text-green-400">
                            {formatNumber(author.total_views)}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Views
                          </div>
                        </div>
                      </div>

                      {/* Categories */}
                      {author.categories.length > 0 && (
                        <div className="mb-4">
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                            Menulis tentang:
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {author.categories.slice(0, 3).map((category) => (
                              <span
                                key={category}
                                className="inline-flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs"
                              >
                                <span>{getCategoryEmoji(category)}</span>
                                <span className="capitalize">
                                  {category.replace("-", " ")}
                                </span>
                              </span>
                            ))}
                            {author.categories.length > 3 && (
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                +{author.categories.length - 3} lainnya
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Latest Article */}
                      {author.latest_article && (
                        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                            Artikel Terbaru:
                          </div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white truncate mb-1">
                            {author.latest_article.title}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {formatDate(author.latest_article.created_at)}
                          </div>
                        </div>
                      )}

                      {/* View Profile Button */}
                      <div className="mt-4">
                        <Link
                          href={`/penulis/${author.id}`}
                          className="w-full bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 py-2 px-4 rounded-lg font-medium text-sm transition-colors flex items-center justify-center space-x-2"
                        >
                          <UserGroupIcon className="w-4 h-4" />
                          <span>Lihat Profil</span>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {data && data.totalPages > 1 && (
                  <div className="flex justify-center">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 text-sm font-medium text-gray-500 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Sebelumnya
                      </button>

                      {/* Page Numbers */}
                      {Array.from(
                        { length: Math.min(5, data.totalPages) },
                        (_, i) => {
                          const pageNum =
                            Math.max(
                              1,
                              Math.min(data.totalPages - 4, currentPage - 2)
                            ) + i;
                          return (
                            <button
                              key={pageNum}
                              onClick={() => handlePageChange(pageNum)}
                              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                                currentPage === pageNum
                                  ? "bg-indigo-600 text-white"
                                  : "text-gray-500 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        }
                      )}

                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === data.totalPages}
                        className="px-4 py-2 text-sm font-medium text-gray-500 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Selanjutnya
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Join Community CTA */}
              <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl p-6 text-white text-center">
                <div className="text-3xl mb-3">✍️</div>
                <h3 className="text-lg font-bold mb-2">
                  Bergabung dengan Komunitas
                </h3>
                <p className="text-white/90 mb-4 text-sm leading-relaxed">
                  Jadilah bagian dari komunitas penulis Indonesia dan bagikan
                  karya terbaikmu.
                </p>
                <Link
                  href="/auth/register"
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-medium transition-colors inline-block backdrop-blur-sm"
                >
                  🚀 Daftar Sekarang
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  📊 Statistik Cepat
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">
                      Penulis Aktif
                    </span>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">
                      {data?.totalCount || 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">
                      Rata-rata Artikel
                    </span>
                    <span className="font-bold text-green-600 dark:text-green-400">
                      {data?.totalCount
                        ? Math.round(
                            (data.platformStats?.totalArticles || 0) /
                              data.totalCount
                          )
                        : 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">
                      Total Interaksi
                    </span>
                    <span className="font-bold text-red-600 dark:text-red-400">
                      {formatNumber(
                        (data?.platformStats?.totalViews || 0) +
                          (data?.platformStats?.totalLikes || 0)
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* Browse by Category */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  📂 Jelajahi Kategori
                </h3>
                <div className="space-y-2">
                  {[
                    { key: "cerpen", name: "Cerpen", emoji: "📖" },
                    { key: "puisi", name: "Puisi", emoji: "🎭" },
                    { key: "artikel", name: "Artikel", emoji: "📰" },
                    {
                      key: "cerita-rakyat",
                      name: "Cerita Rakyat",
                      emoji: "🏛️",
                    },
                    {
                      key: "novel-berseri",
                      name: "Novel Berseri",
                      emoji: "📚",
                    },
                  ].map((category) => (
                    <Link
                      key={category.key}
                      href={`/kategori/${category.key}`}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                    >
                      <div className="flex items-center">
                        <span className="text-lg mr-3">{category.emoji}</span>
                        <span className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                          {category.name}
                        </span>
                      </div>
                      <svg
                        className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:translate-x-1 transition-all"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
