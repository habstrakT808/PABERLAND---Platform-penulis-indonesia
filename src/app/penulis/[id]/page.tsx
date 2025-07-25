// src/app/penulis/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeftIcon,
  CalendarIcon,
  EyeIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  ClockIcon,
  BookOpenIcon,
  ChartBarIcon,
  UserIcon,
  MapPinIcon,
  LinkIcon,
  ShareIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { supabase, articleHelpers, ArticleSummary } from "@/lib/supabase";
import toast from "react-hot-toast";

interface AuthorData {
  profile: {
    id: string;
    full_name: string;
    bio: string | null;
    avatar_url: string | null;
    phone: string | null;
    created_at: string;
    updated_at: string;
  };
  articles: ArticleSummary[];
  stats: {
    totalArticles: number;
    publishedArticles: number;
    totalViews: number;
    totalLikes: number;
    totalComments: number;
    avgViewsPerArticle: number;
    categoriesCount: number;
    categories: Array<{
      category: string;
      count: number;
      emoji: string;
    }>;
    monthlyStats: Array<{
      month: string;
      articles: number;
      views: number;
    }>;
  };
}

export default function AuthorProfilePage() {
  const params = useParams();
  const router = useRouter();
  const authorId = params.id as string;

  const [data, setData] = useState<AuthorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [articlesLoading, setArticlesLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<
    "newest" | "oldest" | "popular" | "most_liked"
  >("newest");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const articlesPerPage = 6;

  useEffect(() => {
    if (authorId) {
      fetchAuthorData();
    }
  }, [authorId]);

  useEffect(() => {
    if (data) {
      fetchAuthorArticles();
    }
  }, [currentPage, sortBy, selectedCategory, searchQuery, data?.profile.id]);

  const fetchAuthorData = async () => {
    setLoading(true);
    try {
      // Fetch author profile
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", authorId)
        .single();

      if (profileError || !profile) {
        console.error("Author not found:", profileError);
        router.push("/penulis");
        return;
      }

      // Fetch author stats
      const { data: articles, error: articlesError } = await supabase
        .from("articles")
        .select("*")
        .eq("author_id", authorId);

      if (articlesError) {
        console.error("Error fetching author articles:", articlesError);
        return;
      }

      // Process statistics
      const publishedArticles =
        articles?.filter((article) => article.published) || [];
      const stats = processAuthorStats(publishedArticles);

      setData({
        profile,
        articles: [], // Will be populated by fetchAuthorArticles
        stats: {
          ...stats,
          totalArticles: articles?.length || 0,
          publishedArticles: publishedArticles.length,
        },
      });
    } catch (error) {
      console.error("Error fetching author data:", error);
      toast.error("Gagal memuat profil penulis");
      router.push("/penulis");
    } finally {
      setLoading(false);
    }
  };

  const fetchAuthorArticles = async () => {
    if (!data?.profile.id) return;

    setArticlesLoading(true);
    try {
      const from = (currentPage - 1) * articlesPerPage;
      const to = from + articlesPerPage - 1;

      let query = supabase
        .from("articles")
        .select(
          `
          id,
          title,
          excerpt,
          cover_image,
          category,
          slug,
          views,
          likes_count,
          comments_count,
          created_at,
          published
        `
        )
        .eq("author_id", data.profile.id)
        .eq("published", true);

      // Apply search filter
      if (searchQuery.trim()) {
        query = query.or(
          `title.ilike.%${searchQuery}%,excerpt.ilike.%${searchQuery}%`
        );
      }

      // Apply category filter
      if (selectedCategory && selectedCategory !== "all") {
        query = query.eq("category", selectedCategory);
      }

      // Apply sorting
      switch (sortBy) {
        case "newest":
          query = query.order("created_at", { ascending: false });
          break;
        case "oldest":
          query = query.order("created_at", { ascending: true });
          break;
        case "popular":
          query = query.order("views", { ascending: false });
          break;
        case "most_liked":
          query = query.order("likes_count", { ascending: false });
          break;
      }

      // Apply pagination
      query = query.range(from, to);

      const { data: articles, error } = await query;

      if (error) {
        console.error("Error fetching articles:", error);
        return;
      }

      setData((prev) => ({
        ...prev!,
        articles: articles || [],
      }));
    } catch (error) {
      console.error("Error fetching author articles:", error);
    } finally {
      setArticlesLoading(false);
    }
  };

  const processAuthorStats = (articles: any[]) => {
    const totalViews = articles.reduce(
      (sum, article) => sum + (article.views || 0),
      0
    );
    const totalLikes = articles.reduce(
      (sum, article) => sum + (article.likes_count || 0),
      0
    );
    const totalComments = articles.reduce(
      (sum, article) => sum + (article.comments_count || 0),
      0
    );

    // Category stats
    const categoryMap = new Map<string, number>();
    articles.forEach((article) => {
      categoryMap.set(
        article.category,
        (categoryMap.get(article.category) || 0) + 1
      );
    });

    const categories = Array.from(categoryMap.entries())
      .map(([category, count]) => ({
        category,
        count,
        emoji: getCategoryEmoji(category),
      }))
      .sort((a, b) => b.count - a.count);

    // Monthly stats (last 6 months)
    const monthlyMap = new Map<string, { articles: number; views: number }>();
    const now = new Date();

    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthKey = date.toLocaleDateString("id-ID", {
        year: "numeric",
        month: "short",
      });
      monthlyMap.set(monthKey, { articles: 0, views: 0 });
    }

    articles.forEach((article) => {
      const articleDate = new Date(article.created_at);
      const monthKey = articleDate.toLocaleDateString("id-ID", {
        year: "numeric",
        month: "short",
      });

      if (monthlyMap.has(monthKey)) {
        const existing = monthlyMap.get(monthKey)!;
        existing.articles += 1;
        existing.views += article.views || 0;
      }
    });

    const monthlyStats = Array.from(monthlyMap.entries()).map(
      ([month, stats]) => ({
        month,
        ...stats,
      })
    );

    return {
      totalViews,
      totalLikes,
      totalComments,
      avgViewsPerArticle:
        articles.length > 0 ? Math.round(totalViews / articles.length) : 0,
      categoriesCount: categories.length,
      categories,
      monthlyStats,
    };
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
      day: "numeric",
    });
  };

  const handleShare = async () => {
    const url = window.location.href;
    const text = `Lihat profil penulis ${data?.profile.full_name} di PaberLand`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Profil ${data?.profile.full_name}`,
          text,
          url,
        });
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(url);
        toast.success("Link profil disalin ke clipboard!");
      } catch (error) {
        toast.error("Gagal menyalin link");
      }
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({
      top: document.getElementById("articles-section")?.offsetTop || 0,
      behavior: "smooth",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            {/* Header skeleton */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 mb-8">
              <div className="flex items-center space-x-6">
                <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
              </div>
            </div>

            {/* Stats skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6"
                >
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Penulis Tidak Ditemukan
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Penulis yang Anda cari tidak ditemukan atau telah dihapus.
          </p>
          <Link
            href="/penulis"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Kembali ke Direktori Penulis
          </Link>
        </div>
      </div>
    );
  }

  const totalPages = Math.ceil(data.stats.publishedArticles / articlesPerPage);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
          <Link
            href="/"
            className="hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            Beranda
          </Link>
          <span>/</span>
          <Link
            href="/penulis"
            className="hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            Penulis
          </Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-white font-medium">
            {data.profile.full_name}
          </span>
        </nav>

        {/* Author Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
            {/* Author Info */}
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-6 lg:mb-0">
              {/* Avatar */}
              <div className="relative">
                {data.profile.avatar_url ? (
                  <Image
                    src={data.profile.avatar_url}
                    alt={data.profile.full_name}
                    width={128}
                    height={128}
                    className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg"
                  />
                ) : (
                  <div className="w-32 h-32 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-4xl border-4 border-white dark:border-gray-700 shadow-lg">
                    {data.profile.full_name.charAt(0)}
                  </div>
                )}
                {/* Verified badge (you can implement verification system) */}
                <div className="absolute bottom-2 right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-800">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              {/* Author Details */}
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {data.profile.full_name}
                </h1>

                {data.profile.bio && (
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed max-w-2xl">
                    {data.profile.bio}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <CalendarIcon className="w-4 h-4 mr-1" />
                    Bergabung {formatDate(data.profile.created_at)}
                  </div>
                  <div className="flex items-center">
                    <BookOpenIcon className="w-4 h-4 mr-1" />
                    {data.stats.publishedArticles} artikel dipublikasikan
                  </div>
                  <div className="flex items-center">
                    <ChartBarIcon className="w-4 h-4 mr-1" />
                    {data.stats.categoriesCount} kategori
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <button
                onClick={handleShare}
                className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-medium transition-colors"
              >
                <ShareIcon className="w-4 h-4" />
                <span>Bagikan</span>
              </button>

              <Link
                href="/penulis"
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <ArrowLeftIcon className="w-4 h-4" />
                <span>Kembali</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Author Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
              {data.stats.publishedArticles}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Artikel
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
              {formatNumber(data.stats.totalViews)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Total Views
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">
              {formatNumber(data.stats.totalLikes)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Total Likes
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {formatNumber(data.stats.totalComments)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Komentar
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content - Articles */}
          <div className="lg:col-span-3">
            <div id="articles-section">
              {/* Articles Header & Filters */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  📚 Artikel dari {data.profile.full_name}
                </h2>

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  {/* Search */}
                  <form
                    onSubmit={handleSearchSubmit}
                    className="flex-1 max-w-md"
                  >
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Cari artikel..."
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </form>

                  <div className="flex items-center space-x-4">
                    {/* Category Filter */}
                    <select
                      value={selectedCategory}
                      onChange={(e) => {
                        setSelectedCategory(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="all">Semua Kategori</option>
                      {data.stats.categories.map((cat) => (
                        <option key={cat.category} value={cat.category}>
                          {cat.emoji}{" "}
                          {cat.category.charAt(0).toUpperCase() +
                            cat.category.slice(1).replace("-", " ")}{" "}
                          ({cat.count})
                        </option>
                      ))}
                    </select>

                    {/* Sort */}
                    <select
                      value={sortBy}
                      onChange={(e) => {
                        setSortBy(e.target.value as typeof sortBy);
                        setCurrentPage(1);
                      }}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="newest">Terbaru</option>
                      <option value="oldest">Terlama</option>
                      <option value="popular">Terpopuler</option>
                      <option value="most_liked">Paling Disukai</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Articles Grid */}
              {articlesLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-3"></div>
                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : data.articles.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-12 text-center">
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {searchQuery.trim() || selectedCategory !== "all"
                      ? "Tidak Ada Hasil"
                      : "Belum Ada Artikel"}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {searchQuery.trim() || selectedCategory !== "all"
                      ? "Tidak ditemukan artikel yang sesuai dengan filter yang dipilih."
                      : `${data.profile.full_name} belum mempublikasikan artikel apapun.`}
                  </p>
                  {(searchQuery.trim() || selectedCategory !== "all") && (
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedCategory("all");
                        setCurrentPage(1);
                      }}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      Lihat Semua Artikel
                    </button>
                  )}
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {data.articles.map((article) => (
                      <article
                        key={article.id}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                      >
                        {/* Article Image */}
                        {article.cover_image && (
                          <div className="aspect-w-16 aspect-h-9">
                            <Image
                              src={article.cover_image}
                              alt={article.title}
                              width={400}
                              height={225}
                              className="w-full h-48 object-cover"
                            />
                          </div>
                        )}

                        <div className="p-6">
                          {/* Article Meta */}
                          <div className="flex items-center justify-between mb-3">
                            <span className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                              <span className="mr-1">
                                {getCategoryEmoji(article.category)}
                              </span>
                              {article.category.charAt(0).toUpperCase() +
                                article.category.slice(1).replace("-", " ")}
                            </span>
                            <span className="text-gray-500 dark:text-gray-400 text-sm flex items-center">
                              <ClockIcon className="w-4 h-4 mr-1" />
                              {articleHelpers.formatRelativeTime(
                                article.created_at
                              )}
                            </span>
                          </div>

                          {/* Article Title */}
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                            <Link
                              href={`/article/${article.slug}`}
                              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                            >
                              {article.title}
                            </Link>
                          </h3>

                          {/* Article Excerpt */}
                          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed">
                            {article.excerpt}
                          </p>

                          {/* Article Stats */}
                          <div className="flex items-center justify-between">
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
                                {formatNumber(article.comments_count || 0)}
                              </span>
                            </div>

                            <Link
                              href={`/article/${article.slug}`}
                              className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium text-sm transition-colors"
                            >
                              Baca →
                            </Link>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
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
                          { length: Math.min(5, totalPages) },
                          (_, i) => {
                            const pageNum =
                              Math.max(
                                1,
                                Math.min(totalPages - 4, currentPage - 2)
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
                          disabled={currentPage === totalPages}
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
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Author Categories */}
              {data.stats.categories.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    📂 Kategori Tulisan
                  </h3>
                  <div className="space-y-2">
                    {data.stats.categories.map((category) => (
                      <button
                        key={category.category}
                        onClick={() => {
                          setSelectedCategory(category.category);
                          setCurrentPage(1);
                        }}
                        className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                          selectedCategory === category.category
                            ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
                            : "hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        <div className="flex items-center">
                          <span className="text-lg mr-3">{category.emoji}</span>
                          <span className="font-medium capitalize">
                            {category.category.replace("-", " ")}
                          </span>
                        </div>
                        <span className="text-sm font-bold">
                          {category.count}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Monthly Activity */}
              {data.stats.monthlyStats.some((stat) => stat.articles > 0) && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    📊 Aktivitas 6 Bulan Terakhir
                  </h3>
                  <div className="space-y-3">
                    {data.stats.monthlyStats.map((stat) => (
                      <div
                        key={stat.month}
                        className="flex items-center justify-between"
                      >
                        <span className="text-gray-600 dark:text-gray-400 text-sm">
                          {stat.month}
                        </span>
                        <div className="flex items-center space-x-2">
                          <span className="text-indigo-600 dark:text-indigo-400 font-bold text-sm">
                            {stat.articles}
                          </span>
                          <span className="text-gray-500 dark:text-gray-500 text-xs">
                            artikel
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Stats */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  ⚡ Statistik Cepat
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">
                      Rata-rata Views
                    </span>
                    <span className="font-bold text-green-600 dark:text-green-400">
                      {formatNumber(data.stats.avgViewsPerArticle)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">
                      Total Interaksi
                    </span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">
                      {formatNumber(
                        data.stats.totalLikes + data.stats.totalComments
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">
                      Kategori Aktif
                    </span>
                    <span className="font-bold text-purple-600 dark:text-purple-400">
                      {data.stats.categoriesCount}
                    </span>
                  </div>
                </div>
              </div>

              {/* Browse Other Authors */}
              <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl p-6 text-white text-center">
                <div className="text-3xl mb-3">👥</div>
                <h3 className="text-lg font-bold mb-2">
                  Jelajahi Penulis Lain
                </h3>
                <p className="text-white/90 mb-4 text-sm leading-relaxed">
                  Temukan penulis berbakat lainnya di komunitas PaberLand.
                </p>
                <Link
                  href="/penulis"
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-medium transition-colors inline-block backdrop-blur-sm"
                >
                  🔍 Lihat Semua Penulis
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
