// src/app/kategori/[category]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SignedImage from "@/components/common/SignedImage";
import {
  BookOpenIcon,
  SparklesIcon,
  NewspaperIcon,
  HeartIcon,
  GlobeAltIcon,
  EllipsisHorizontalIcon,
  EyeIcon,
  ChatBubbleLeftIcon,
  ClockIcon,
  AdjustmentsHorizontalIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  ArrowLeftIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import { supabase, articleHelpers, ArticleSummary } from "@/lib/supabase";
import toast from "react-hot-toast";

const categoryConfig = {
  cerpen: {
    name: "Cerpen",
    description: "Cerita pendek yang menghibur dan menginspirasi",
    icon: BookOpenIcon,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    textColor: "text-blue-600",
    emoji: "📖",
  },
  puisi: {
    name: "Puisi",
    description: "Karya sastra penuh makna dan keindahan kata",
    icon: SparklesIcon,
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    textColor: "text-purple-600",
    emoji: "🎭",
  },
  artikel: {
    name: "Artikel",
    description: "Tulisan informatif dan edukatif",
    icon: NewspaperIcon,
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    textColor: "text-green-600",
    emoji: "📰",
  },
  "cerita-rakyat": {
    name: "Cerita Rakyat",
    description: "Warisan budaya dan kearifan lokal",
    icon: GlobeAltIcon,
    color: "from-yellow-500 to-yellow-600",
    bgColor: "bg-yellow-50",
    textColor: "text-yellow-600",
    emoji: "🏛️",
  },
  lainnya: {
    name: "Lainnya",
    description: "Karya kreatif dan eksperimental",
    icon: EllipsisHorizontalIcon,
    color: "from-gray-500 to-gray-600",
    bgColor: "bg-gray-50",
    textColor: "text-gray-600",
    emoji: "✨",
  },
  "info-berita": {
    name: "Info/Berita",
    description: "Informasi dan berita terkini seputar literasi dan budaya",
    icon: NewspaperIcon,
    color: "from-cyan-500 to-cyan-600",
    bgColor: "bg-cyan-50",
    textColor: "text-cyan-600",
    emoji: "📰",
  },
  cermin: {
    name: "Cermin (Cerita Mini)",
    description: "Cerita mini yang singkat, padat, dan berkesan",
    icon: BookOpenIcon,
    color: "from-pink-500 to-pink-600",
    bgColor: "bg-pink-50",
    textColor: "text-pink-600",
    emoji: "🔎",
  },
  "resensi-buku": {
    name: "Resensi Buku",
    description: "Ulasan dan penilaian terhadap buku bacaan",
    icon: DocumentTextIcon,
    color: "from-amber-500 to-amber-600",
    bgColor: "bg-amber-50",
    textColor: "text-amber-600",
    emoji: "📚",
  },
  dongeng: {
    name: "Dongeng",
    description: "Kisah dongeng penuh pesan moral dan imajinasi",
    icon: GlobeAltIcon,
    color: "from-lime-500 to-lime-600",
    bgColor: "bg-lime-50",
    textColor: "text-lime-600",
    emoji: "🧚",
  },
  cerbung: {
    name: "Cerbung (Cerita Bersambung)",
    description: "Cerita bersambung dengan alur yang memikat",
    icon: HeartIcon,
    color: "from-indigo-500 to-indigo-600",
    bgColor: "bg-indigo-50",
    textColor: "text-indigo-600",
    emoji: "📝",
  },
  novel: {
    name: "Novel",
    description:
      "Karya sastra panjang dengan plot yang kompleks dan karakter yang mendalam",
    icon: BookOpenIcon,
    color: "from-emerald-500 to-emerald-600",
    bgColor: "bg-emerald-50",
    textColor: "text-emerald-600",
    emoji: "📚",
  },
  serial: {
    name: "Serial",
    description: "Cerita berseri dengan episode-episode yang saling terhubung",
    icon: HeartIcon,
    color: "from-rose-500 to-rose-600",
    bgColor: "bg-rose-50",
    textColor: "text-rose-600",
    emoji: "📚",
  },
};

interface CategoryPageData {
  articles: ArticleSummary[];
  totalCount: number;
  totalPages: number;
  categoryStats: {
    totalArticles: number;
    totalViews: number;
    totalLikes: number;
    totalComments: number;
    topAuthors: Array<{
      author_name: string;
      article_count: number;
    }>;
  };
}

// Tambahkan tipe untuk artikel dan profil jika belum ada
type ArticleProfile = {
  full_name: string;
  avatar_url?: string;
};

type Article = {
  profiles: ArticleProfile | ArticleProfile[] | null;
  views?: number;
  likes_count?: number;
  comments_count?: number;
  // ... properti lain sesuai kebutuhan
};

// Tambahkan mapping untuk CTA kategori
const categoryWritePrompts: Record<string, { title: string; desc: string }> = {
  "resensi-buku": {
    title: "Tulis Resensi Buku",
    desc: "Bagikan resensi buku terbaik yang sudah kamu baca di sini",
  },
  "info-berita": {
    title: "Tulis Info/Berita",
    desc: "Bagikan info/berita terpenting di sini",
  },
  cerpen: {
    title: "Tulis Cerpen",
    desc: "Bagikan cerpen terhebat yang kamu tulis di sini",
  },
  dongeng: {
    title: "Tulis Dongeng",
    desc: "Bagikan dongeng imaginatif yang kamu tulis di sini",
  },
  "cerita-rakyat": {
    title: "Tulis Cerita Rakyat",
    desc: "Bagikan cerita rakyat yang kamu tulis di sini",
  },
  cermin: {
    title: "Tulis Cermin (Cerita Mini)",
    desc: "Bagikan cermin terkeren yang kamu tulis di sini",
  },
  puisi: {
    title: "Tulis Puisi",
    desc: "Bagikan puisi terindah yang kamu tulis di sini",
  },
  cerbung: {
    title: "Tulis Cerbung",
    desc: "Bagikan cerita bersambung yang bikin penasaran pembaca di sini",
  },
  novel: {
    title: "Tulis Novel",
    desc: "Bagikan novel luar biasa yang kamu tulis di sini",
  },
  serial: {
    title: "Tulis Serial",
    desc: "Bagikan serial menakjubkan yang kamu tulis di sini",
  },
  artikel: {
    title: "Tulis Artikel",
    desc: "Bagikan artikel yang bermanfaat di sini",
  },
};

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const category = params.category as string;

  const [data, setData] = useState<CategoryPageData>({
    articles: [],
    totalCount: 0,
    totalPages: 0,
    categoryStats: {
      totalArticles: 0,
      totalViews: 0,
      totalLikes: 0,
      totalComments: 0,
      topAuthors: [],
    },
  });
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<
    "newest" | "oldest" | "popular" | "most_liked"
  >("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const config = categoryConfig[category as keyof typeof categoryConfig];

  useEffect(() => {
    if (!config) {
      // Category not found, redirect to 404 or categories page
      router.push("/kategori");
      return;
    }

    fetchCategoryData();
  }, [category, currentPage, sortBy, searchQuery]);

  const fetchCategoryData = async () => {
    if (!config) return;

    setLoading(true);
    try {
      await Promise.all([fetchArticles(), fetchCategoryStats()]);
    } catch (error) {
      console.error("Error fetching category data:", error);
      toast.error("Gagal memuat data kategori");
    } finally {
      setLoading(false);
    }
  };

  const fetchArticles = async () => {
    try {
      const limit = 6;
      const from = (currentPage - 1) * limit;
      const to = from + limit - 1;

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
          profiles:author_id (
            id,
            full_name,
            avatar_url
          )
        `
        )
        .eq("published", true)
        .eq("category", category);

      // Apply search filter
      if (searchQuery.trim()) {
        query = query.or(
          `title.ilike.%${searchQuery}%,excerpt.ilike.%${searchQuery}%`
        );
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

      const { data: articles, error, count } = await query;

      if (error) {
        console.error("Error fetching articles:", error);
        toast.error("Gagal memuat artikel");
        return;
      }

      // Get total count for pagination
      let countQuery = supabase
        .from("articles")
        .select("*", { count: "exact", head: true })
        .eq("published", true)
        .eq("category", category);

      if (searchQuery.trim()) {
        countQuery = countQuery.or(
          `title.ilike.%${searchQuery}%,excerpt.ilike.%${searchQuery}%`
        );
      }

      const { count: totalCount, error: countError } = await countQuery;

      if (countError) {
        console.error("Error fetching count:", countError);
        return;
      }

      const processedArticles =
        articles?.map((article: any) => ({
          ...article,
          profiles: Array.isArray(article.profiles)
            ? article.profiles[0]
            : article.profiles,
        })) || [];

      setData((prev) => ({
        ...prev,
        articles: processedArticles,
        totalCount: totalCount || 0,
        totalPages: Math.ceil((totalCount || 0) / limit),
      }));
    } catch (error) {
      console.error("Error fetching articles:", error);
      toast.error("Gagal memuat artikel");
    }
  };

  const fetchCategoryStats = async () => {
    try {
      // Get category statistics
      const { data: statsData, error: statsError } = await supabase
        .from("articles")
        .select(
          `
          views,
          likes_count,
          comments_count,
          profiles:author_id (
            full_name
          )
        `
        )
        .eq("published", true)
        .eq("category", category);

      if (statsError) {
        console.error("Error fetching category stats:", statsError);
        toast.error("Gagal memuat statistik kategori");
        return;
      }

      // Process statistics
      const stats = {
        totalArticles: statsData?.length || 0,
        totalViews: 0,
        totalLikes: 0,
        totalComments: 0,
        topAuthors: [] as Array<{ author_name: string; article_count: number }>,
      };

      const authorCounts = new Map<string, number>();

      statsData?.forEach((article: Article) => {
        stats.totalViews += article.views || 0;
        stats.totalLikes += article.likes_count || 0;
        stats.totalComments += article.comments_count || 0;

        let authorName = "Anonymous";
        if (Array.isArray(article.profiles)) {
          authorName =
            (article.profiles[0]?.full_name as string) || "Anonymous";
        } else if (article.profiles && typeof article.profiles === "object") {
          authorName = (article.profiles.full_name as string) || "Anonymous";
        }

        authorCounts.set(authorName, (authorCounts.get(authorName) || 0) + 1);
      });

      // Get top 5 authors
      stats.topAuthors = Array.from(authorCounts.entries())
        .map(([author_name, article_count]) => ({ author_name, article_count }))
        .sort((a, b) => b.article_count - a.article_count)
        .slice(0, 5);

      setData((prev) => ({
        articles: prev.articles,
        totalCount: prev.totalCount,
        totalPages: prev.totalPages,
        categoryStats: stats,
      }));
    } catch (error) {
      console.error("Error fetching category stats:", error);
      toast.error("Gagal memuat statistik kategori");
    }
  };

  const handleSortChange = (newSort: typeof sortBy) => {
    setSortBy(newSort);
    setCurrentPage(1);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchArticles();
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

  if (!config) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Kategori Tidak Ditemukan
          </h1>
          <p className="text-gray-600 mb-6">
            Kategori yang Anda cari tidak tersedia.
          </p>
          <Link
            href="/kategori"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Kembali ke Kategori
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-blue-600">
            Beranda
          </Link>
          <span>/</span>
          <Link href="/kategori" className="hover:text-blue-600">
            Kategori
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{config.name}</span>
        </nav>

        {/* Category Header */}
        <div
          className={`${config.bgColor} rounded-xl p-8 mb-8 border border-blue-100`}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center space-x-4 mb-6 lg:mb-0">
              <div
                className={`w-16 h-16 bg-gradient-to-br ${config.color} rounded-xl flex items-center justify-center text-white text-2xl`}
              >
                {config.emoji}
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${config.textColor} mb-2`}>
                  {config.name}
                </h1>
                <p className="text-gray-600 text-lg">{config.description}</p>
              </div>
            </div>

            {/* Back Button */}
            <Link
              href="/kategori"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span>Kembali ke Kategori</span>
            </Link>
          </div>

          {/* Category Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-blue-100">
            <div className="text-center">
              <div className={`text-2xl font-bold ${config.textColor} mb-1`}>
                {formatNumber(data.categoryStats.totalArticles)}
              </div>
              <div className="text-sm text-gray-600">Konten</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${config.textColor} mb-1`}>
                {formatNumber(data.categoryStats.totalViews)}
              </div>
              <div className="text-sm text-gray-600">Views</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${config.textColor} mb-1`}>
                {formatNumber(data.categoryStats.totalLikes)}
              </div>
              <div className="text-sm text-gray-600">Likes</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${config.textColor} mb-1`}>
                {formatNumber(data.categoryStats.totalComments)}
              </div>
              <div className="text-sm text-gray-600">Komentar</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Filters */}
            <div className="bg-white/95 rounded-xl shadow-lg p-6 mb-8 border border-blue-100">
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
                      placeholder={`Cari dalam ${config.name.toLowerCase()}...`}
                      className="block w-full pl-10 pr-3 py-2 border border-blue-200 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </form>

                {/* Sort Options */}
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                    Urutkan:
                  </span>
                  <select
                    value={sortBy}
                    onChange={(e) =>
                      handleSortChange(e.target.value as typeof sortBy)
                    }
                    className="px-3 py-2 border border-blue-200 rounded-lg text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="newest">Terbaru</option>
                    <option value="oldest">Terlama</option>
                    <option value="popular">Terpopuler</option>
                    <option value="most_liked">Paling Disukai</option>
                  </select>
                </div>
              </div>

              {/* Results Count */}
              <div className="mt-4 pt-4 border-t border-blue-100">
                <p className="text-sm text-gray-600">
                  {searchQuery.trim() ? (
                    <>
                      Menampilkan {data.articles.length} dari {data.totalCount}{" "}
                      konten untuk "{searchQuery}"
                    </>
                  ) : (
                    <>
                      Menampilkan {data.articles.length} dari {data.totalCount}{" "}
                      konten
                    </>
                  )}
                </p>
              </div>
            </div>

            {/* Articles Grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-blue-100 h-48 rounded-xl mb-4"></div>
                    <div className="h-4 bg-blue-100 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-blue-100 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : data.articles.length === 0 ? (
              <div className="bg-white/95 rounded-xl shadow-lg p-12 text-center border border-blue-100">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {searchQuery.trim()
                    ? "Tidak Ada Hasil Pencarian"
                    : "Belum Ada Konten"}
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchQuery.trim()
                    ? `Tidak ditemukan konten yang cocok dengan "${searchQuery}" dalam kategori ${config.name}.`
                    : `Belum ada konten dalam kategori ${config.name}. Jadilah yang pertama untuk berkontribusi!`}
                </p>
                {searchQuery.trim() ? (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setCurrentPage(1);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    Lihat Semua Artikel
                  </button>
                ) : (
                  <Link
                    href="/write"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-block"
                  >
                    Tulis Konten Pertama
                  </Link>
                )}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {data.articles.map((article) => (
                    <article
                      key={article.id}
                      className="bg-white/95 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-blue-100"
                    >
                      {/* Article Image */}
                      {article.cover_image && (
                        <div className="aspect-w-16 aspect-h-9">
                          <SignedImage
                            src={article.cover_image}
                            alt={article.title}
                            className="w-full h-48 object-cover"
                          />
                        </div>
                      )}

                      <div className="p-6">
                        {/* Article Meta */}
                        <div className="flex items-center justify-between mb-3">
                          <span
                            className={`${config.bgColor} ${config.textColor} px-3 py-1 rounded-full text-sm font-medium`}
                          >
                            {config.emoji} {config.name}
                          </span>
                          <span className="text-gray-500 text-sm flex items-center">
                            <ClockIcon className="w-4 h-4 mr-1" />
                            {articleHelpers.formatRelativeTime(
                              article.created_at
                            )}
                          </span>
                        </div>

                        {/* Article Title */}
                        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                          <Link
                            href={`/article/${article.slug}`}
                            className="hover:text-blue-600 transition-colors"
                          >
                            {article.title}
                          </Link>
                        </h3>

                        {/* Article Excerpt */}
                        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                          {article.excerpt}
                        </p>

                        {/* Article Footer */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                              {article.profiles?.full_name?.charAt(0) || "A"}
                            </div>
                            <span className="font-medium text-gray-900 text-sm">
                              {article.profiles?.full_name || "Anonymous"}
                            </span>
                          </div>

                          <div className="flex items-center space-x-4 text-sm text-gray-500">
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
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Pagination */}
                {data.totalPages > 1 && (
                  <div className="flex justify-center">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
                                  ? `bg-gradient-to-r ${config.color} text-white`
                                  : "text-gray-500 bg-white border border-blue-200 hover:bg-blue-50"
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
                        className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
              {/* Top Authors in Category */}
              {data.categoryStats.topAuthors.length > 0 && (
                <div className="bg-white/95 rounded-xl shadow-lg p-6 border border-blue-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    👑 Member Teratas
                  </h3>
                  <div className="space-y-3">
                    {data.categoryStats.topAuthors.map((author, index) => (
                      <div
                        key={author.author_name}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center">
                          <div
                            className={`w-8 h-8 bg-gradient-to-r ${config.color} rounded-full flex items-center justify-center text-white font-bold text-sm mr-3`}
                          >
                            {author.author_name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 text-sm">
                              {author.author_name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {author.article_count} konten
                            </div>
                          </div>
                        </div>
                        <div
                          className={`text-lg ${
                            index === 0
                              ? "🥇"
                              : index === 1
                              ? "🥈"
                              : index === 2
                              ? "🥉"
                              : "🏅"
                          }`}
                        >
                          {index === 0
                            ? "🥇"
                            : index === 1
                            ? "🥈"
                            : index === 2
                            ? "🥉"
                            : "🏅"}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Other Categories */}
              <div className="bg-white/95 rounded-xl shadow-lg p-6 border border-blue-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  📂 Kategori Lainnya
                </h3>
                <div className="space-y-2">
                  {Object.entries(categoryConfig)
                    .filter(([key]) => key !== category)
                    .map(([key, otherConfig]) => (
                      <Link
                        key={key}
                        href={`/kategori/${key}`}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 transition-colors group"
                      >
                        <div className="flex items-center">
                          <span className="text-lg mr-3">
                            {otherConfig.emoji}
                          </span>
                          <span className="text-gray-700 font-medium group-hover:text-blue-600">
                            {otherConfig.name}
                          </span>
                        </div>
                        <svg
                          className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all"
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

              {/* Write Article CTA */}
              <div
                className={`bg-gradient-to-br ${config.color} rounded-xl p-6 text-white text-center`}
              >
                <div className="text-3xl mb-3">{config.emoji}</div>
                <h3 className="text-lg font-bold mb-2">
                  {categoryWritePrompts[category]?.title ||
                    `Tulis ${config.name}`}
                </h3>
                <p className="text-white/90 mb-4 text-sm leading-relaxed">
                  {categoryWritePrompts[category]?.desc ||
                    `Bagikan karya ${config.name.toLowerCase()} terbaikmu dengan komunitas PaberLand.`}
                </p>
                <Link
                  href="/write"
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-medium transition-colors inline-block backdrop-blur-sm"
                >
                  ✍️ Mulai Menulis
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
