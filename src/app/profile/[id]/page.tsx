// src/app/profile/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SignedImage from "@/components/common/SignedImage";
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
  PencilIcon,
  ShareIcon,
  PhoneIcon,
  EnvelopeIcon,
  CheckCircleIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import {
  supabase,
  articleHelpers,
  ArticleSummary,
  likeHelpers,
  getAvatarUrl,
} from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import LikeButton from "@/components/article/LikeButton";
import toast from "react-hot-toast";

interface ProfileData {
  profile: {
    id: string;
    full_name: string;
    bio: string | null;
    avatar_url: string | null;
    phone: string | null;
    role: string;
    created_at: string;
    updated_at: string;
    member_id?: string;
    prestasi?: string;
    alamat?: string;
  };
  articles: ArticleSummary[];
  likedArticles: ArticleSummary[];
  stats: {
    totalArticles: number;
    publishedArticles: number;
    totalViews: number;
    totalLikes: number;
    totalComments: number;
    totalLikedArticles: number;
    categoriesCount: number;
    categories: Array<{
      category: string;
      count: number;
      emoji: string;
    }>;
  };
}

export default function PublicProfilePage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const profileId = params.id as string;

  const [data, setData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"articles" | "liked">("articles");
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesLoading, setArticlesLoading] = useState(false);

  const articlesPerPage = 4;
  const isOwnProfile = user?.id === profileId;

  useEffect(() => {
    if (profileId) {
      fetchProfileData();
    }
  }, [profileId]);

  useEffect(() => {
    if (data) {
      fetchTabContent();
    }
  }, [activeTab, currentPage, data?.profile.id]);

  const fetchProfileData = async () => {
    setLoading(true);
    try {
      // Fetch profile
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", profileId)
        .single();

      if (profileError || !profile) {
        console.error("Profile not found:", profileError);
        router.push("/penulis");
        return;
      }

      // Fetch articles
      const { data: articles, error: articlesError } = await supabase
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
        .eq("author_id", profileId)
        .eq("published", true)
        .order("created_at", { ascending: false });

      if (articlesError) {
        console.error("Error fetching articles:", articlesError);
        return;
      }

      // Fetch liked articles count
      const { count: likedCount, error: likedError } = await supabase
        .from("article_likes")
        .select("*", { count: "exact", head: true })
        .eq("user_id", profileId);

      if (likedError) {
        console.error("Error fetching liked articles:", likedError);
      }

      // Process stats
      const stats = processProfileStats(articles || [], likedCount || 0);

      setData({
        profile,
        articles: articles || [],
        likedArticles: [], // Will be fetched when needed
        stats,
      });
    } catch (error) {
      console.error("Error fetching profile data:", error);
      toast.error("Gagal memuat data profil");
    } finally {
      setLoading(false);
    }
  };

  const fetchTabContent = async () => {
    if (!data) return;

    setArticlesLoading(true);
    try {
      if (activeTab === "articles") {
        // Articles are already loaded
        setArticlesLoading(false);
      } else {
        // Fetch liked articles
        const { data: likedArticles, error } = await supabase
          .from("article_likes")
          .select(
            `
            articles!inner(
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
            )
          `
          )
          .eq("user_id", profileId)
          .eq("articles.published", true)
          .order("created_at", { ascending: false })
          .range(
            (currentPage - 1) * articlesPerPage,
            (currentPage - 1) * articlesPerPage + 3
          );

        if (error) {
          console.error("Error fetching liked articles:", error);
          return;
        }

        const formattedLikedArticles = (likedArticles || []).map(
          (item: any) => item.articles
        );

        setData((prev) => ({
          ...prev!,
          likedArticles: formattedLikedArticles,
        }));
      }
    } catch (error) {
      console.error("Error fetching tab content:", error);
    } finally {
      setArticlesLoading(false);
    }
  };

  const processProfileStats = (articles: any[], likedCount: number) => {
    const totalArticles = articles.length;
    const publishedArticles = articles.filter((a) => a.published).length;
    const totalViews = articles.reduce((sum, a) => sum + (a.views || 0), 0);
    const totalLikes = articles.reduce(
      (sum, a) => sum + (a.likes_count || 0),
      0
    );
    const totalComments = articles.reduce(
      (sum, a) => sum + (a.comments_count || 0),
      0
    );

    // Count categories
    const categoryCounts: { [key: string]: number } = {};
    articles.forEach((article) => {
      if (article.category) {
        categoryCounts[article.category] =
          (categoryCounts[article.category] || 0) + 1;
      }
    });

    const categories = Object.entries(categoryCounts).map(
      ([category, count]) => ({
        category,
        count,
        emoji: getCategoryEmoji(category),
      })
    );

    return {
      totalArticles,
      publishedArticles,
      totalViews,
      totalLikes,
      totalComments,
      totalLikedArticles: likedCount,
      categoriesCount: categories.length,
      categories,
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

  // Helper function to generate name-based URL slug
  const generateNameSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "") // Remove special characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-") // Replace multiple hyphens with single
      .trim();
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/profile/${profileId}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${data?.profile.full_name} - Profil PaberLand`,
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success("Link profil berhasil disalin!");
      }
    } catch (error) {
      console.error("Error sharing profile:", error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-48 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Profil Tidak Ditemukan
            </h1>
            <p className="text-gray-600 mb-6">
              Penulis yang Anda cari tidak ditemukan atau telah dihapus.
            </p>
            <Link
              href="/penulis"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Kembali ke Direktori Penulis
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const currentArticles =
    activeTab === "articles" ? data.articles : data.likedArticles;
  const totalPages =
    activeTab === "articles"
      ? Math.ceil(data.articles.length / articlesPerPage)
      : Math.ceil(data.stats.totalLikedArticles / articlesPerPage);
  const paginatedArticles =
    activeTab === "articles"
      ? currentArticles.slice(
          (currentPage - 1) * articlesPerPage,
          currentPage * articlesPerPage
        )
      : currentArticles;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-blue-600">
            Beranda
          </Link>
          <span>/</span>
          <Link href="/penulis" className="hover:text-blue-600">
            Penulis
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">
            {data.profile.full_name}
          </span>
        </nav>

        {/* Profile Header */}
        <div className="bg-white/95 rounded-xl shadow-sm p-8 mb-8 border border-blue-100">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
            {/* Profile Info */}
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-6 lg:mb-0">
              {/* Avatar */}
              <div className="relative">
                {data.profile.avatar_url ? (
                  <Image
                    src={getAvatarUrl(data.profile.avatar_url) || ""}
                    alt={data.profile.full_name}
                    width={128}
                    height={128}
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                ) : (
                  <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-4xl border-4 border-white shadow-lg">
                    {data.profile.full_name.charAt(0)}
                  </div>
                )}
                {/* Active indicator */}
                <div className="absolute bottom-2 right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                  <div className="w-4 h-4 bg-green-400 rounded-full"></div>
                </div>
              </div>

              {/* Profile Details */}
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {data.profile.full_name}
                </h1>

                {/* Role Display */}
                <div className="mb-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {data.profile.role || "Penulis"}
                  </span>
                </div>

                {data.profile.bio && (
                  <p className="text-gray-800 mb-4 leading-relaxed max-w-2xl">
                    {data.profile.bio}
                  </p>
                )}
                {/* Tambahkan styling kontras dan icon untuk info tambahan */}
                {data?.profile.member_id && (
                  <div className="mb-2 flex items-center text-base">
                    <span className="mr-2 text-blue-700 font-semibold flex items-center">
                      <UserIcon className="w-4 h-4 mr-1" /> Member ID:
                    </span>
                    <span className="text-gray-900 font-medium">
                      {data.profile.member_id}
                    </span>
                  </div>
                )}
                {/* Prestasi - Improved formatting */}
                {data?.profile.prestasi && (
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <CheckCircleIcon className="w-5 h-5 text-blue-600 mr-2" />
                      <h3 className="text-lg font-bold text-gray-900">
                        Prestasi
                      </h3>
                    </div>
                    <div className="pl-7">
                      {data.profile.prestasi
                        .split("\n")
                        .map((achievement, index) => {
                          const trimmed = achievement.trim();
                          if (!trimmed) return null;

                          // Check if it's a numbered achievement
                          const numberedMatch =
                            trimmed.match(/^(\d+)\.\s*(.+)$/);
                          if (numberedMatch) {
                            return (
                              <div
                                key={index}
                                className="mb-2 text-gray-800 flex items-start"
                              >
                                <span className="text-yellow-500 mr-2 mt-0.5">
                                  🏆
                                </span>
                                <div>
                                  <span className="font-semibold text-blue-600">
                                    {numberedMatch[1]}.
                                  </span>{" "}
                                  {numberedMatch[2]}
                                </div>
                              </div>
                            );
                          }

                          return (
                            <div
                              key={index}
                              className="mb-2 text-gray-800 flex items-start"
                            >
                              <span className="text-yellow-500 mr-2 mt-0.5">
                                🏆
                              </span>
                              <div>{trimmed}</div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}
                {/* Alamat - Improved formatting */}
                {data?.profile.alamat && (
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <MapPinIcon className="w-5 h-5 text-blue-600 mr-2" />
                      <h3 className="text-lg font-bold text-gray-900">
                        Alamat
                      </h3>
                    </div>
                    <div className="pl-7 text-gray-800">
                      {data.profile.alamat}
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <CalendarIcon className="w-4 h-4 mr-1" />
                    Bergabung {formatDate(data.profile.created_at)}
                  </div>
                  <div className="flex items-center">
                    <BookOpenIcon className="w-4 h-4 mr-1" />
                    {data.stats.publishedArticles} konten
                  </div>
                  <div className="flex items-center">
                    <HeartIcon className="w-4 h-4 mr-1" />
                    {data.stats.totalLikedArticles} konten disukai
                  </div>
                </div>

                {/* Contact Info (if available) */}
                {data.profile.phone && (
                  <div className="flex flex-wrap items-center gap-4 mt-3 text-sm">
                    {data.profile.phone && (
                      <div className="flex items-center text-gray-600">
                        <PhoneIcon className="w-4 h-4 mr-1" />
                        {data.profile.phone}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              {/* First row: Edit, Karya, Bagikan */}
              <div className="flex items-center space-x-3">
                {isOwnProfile && (
                  <Link
                    href="/profile/edit"
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    <PencilIcon className="w-4 h-4" />
                    <span>Edit</span>
                  </Link>
                )}
                <Link
                  href={`/penulis/${generateNameSlug(
                    data.profile.full_name
                  )}/portfolio`}
                  className="flex items-center space-x-2 bg-green-50 hover:bg-green-100 text-green-700 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  <BookOpenIcon className="w-4 h-4" />
                  <span>Karya</span>
                </Link>
                <button
                  onClick={handleShare}
                  className="flex items-center space-x-2 bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  <ShareIcon className="w-4 h-4" />
                  <span>Bagikan</span>
                </button>
              </div>

              {/* Second row: Kembali (right-aligned on mobile, inline on desktop) */}
              <div className="flex justify-end sm:justify-start">
                <Link
                  href="/penulis"
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <ArrowLeftIcon className="w-4 h-4" />
                  <span>Kembali</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/95 rounded-xl shadow-sm p-6 text-center border border-blue-100">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {data.stats.publishedArticles}
            </div>
            <div className="text-sm text-gray-700">Konten</div>
          </div>
          <div className="bg-white/95 rounded-xl shadow-sm p-6 text-center border border-blue-100">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {formatNumber(data.stats.totalLikes)}
            </div>
            <div className="text-sm text-gray-700">Likes</div>
          </div>
          <div className="bg-white/95 rounded-xl shadow-sm p-6 text-center border border-blue-100">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {formatNumber(data.stats.totalComments)}
            </div>
            <div className="text-sm text-gray-700">Komentar</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div id="content-section">
              {/* Tabs */}
              <div className="bg-white/95 rounded-xl shadow-sm mb-8 border border-blue-100">
                <div className="border-b border-blue-100">
                  <nav className="flex space-x-8 px-6">
                    <button
                      onClick={() => {
                        setActiveTab("articles");
                        setCurrentPage(1);
                      }}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === "articles"
                          ? "border-blue-500 text-blue-600"
                          : "border-transparent text-gray-600 hover:text-gray-800 hover:border-blue-300"
                      }`}
                    >
                      📚 Konten ({data.stats.publishedArticles})
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab("liked");
                        setCurrentPage(1);
                      }}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === "liked"
                          ? "border-blue-500 text-blue-600"
                          : "border-transparent text-gray-600 hover:text-gray-800 hover:border-blue-300"
                      }`}
                    >
                      ❤️ Disukai ({data.stats.totalLikedArticles})
                    </button>
                  </nav>
                </div>

                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    {activeTab === "articles"
                      ? `Konten dari ${data.profile.full_name}`
                      : `Konten yang Disukai ${data.profile.full_name}`}
                  </h2>
                </div>
              </div>

              {/* Content Grid */}
              {articlesLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="bg-white/95 rounded-xl p-6 border border-blue-100">
                        <div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>
                        <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : paginatedArticles.length === 0 ? (
                <div className="bg-white/95 rounded-xl shadow-sm p-12 text-center border border-blue-100">
                  <div className="text-6xl mb-4">
                    {activeTab === "articles" ? "📝" : "❤️"}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {activeTab === "articles"
                      ? "Belum Ada Konten"
                      : "Belum Ada Konten yang Disukai"}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {activeTab === "articles"
                      ? "Penulis ini belum mempublikasikan konten apapun."
                      : "Penulis ini belum menyukai konten apapun."}
                  </p>
                  {activeTab === "articles" && isOwnProfile && (
                    <Link
                      href="/write"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      Mulai Menulis
                    </Link>
                  )}
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {paginatedArticles.map((article) => (
                      <article
                        key={article.id}
                        className="bg-white/95 rounded-xl shadow-sm p-6 border border-blue-100 hover:shadow-lg transition-all duration-300"
                      >
                        {/* Article Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                                {getCategoryEmoji(article.category)}
                                {article.category.charAt(0).toUpperCase() +
                                  article.category.slice(1).replace("-", " ")}
                              </span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                              <Link
                                href={`/article/${article.slug}`}
                                className="hover:text-blue-600 transition-colors"
                              >
                                {article.title}
                              </Link>
                            </h3>
                          </div>
                        </div>

                        {/* Article Excerpt */}
                        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                          {article.excerpt}
                        </p>

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

                        {/* Article Stats */}
                        <div className="flex items-center justify-between pt-4 border-t border-blue-100">
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

                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <ClockIcon className="w-4 h-4" />
                            <span>
                              {articleHelpers.formatRelativeTime(
                                article.created_at
                              )}
                            </span>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="mt-8 flex justify-center">
                      <nav className="flex items-center space-x-2">
                        <button
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-blue-200 rounded-md hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Sebelumnya
                        </button>
                        {Array.from(
                          { length: totalPages },
                          (_, i) => i + 1
                        ).map((page) => (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-3 py-2 text-sm font-medium rounded-md ${
                              currentPage === page
                                ? "bg-blue-600 text-white"
                                : "text-gray-500 bg-white border border-blue-200 hover:bg-blue-50"
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                        <button
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-blue-200 rounded-md hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Selanjutnya
                        </button>
                      </nav>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Categories */}
            {data.stats.categories.length > 0 && (
              <div className="bg-white/95 rounded-xl shadow-sm p-6 mb-6 border border-blue-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Kategori
                </h3>
                <div className="space-y-2">
                  {data.stats.categories.map((category) => (
                    <div
                      key={category.category}
                      className="flex items-center justify-between p-2 bg-blue-50 rounded-lg"
                    >
                      <span className="text-sm text-gray-700">
                        {category.emoji}{" "}
                        {category.category.charAt(0).toUpperCase() +
                          category.category.slice(1).replace("-", " ")}
                      </span>
                      <span className="text-sm font-medium text-blue-600">
                        {category.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Stats */}
            <div className="bg-white/95 rounded-xl shadow-sm p-6 border border-blue-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Statistik Cepat
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Views</span>
                  <span className="text-sm font-medium text-gray-900">
                    {formatNumber(data.stats.totalViews)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Rata-rata Views</span>
                  <span className="text-sm font-medium text-gray-900">
                    {data.stats.publishedArticles > 0
                      ? formatNumber(
                          Math.round(
                            data.stats.totalViews / data.stats.publishedArticles
                          )
                        )
                      : "0"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Konten Disukai</span>
                  <span className="text-sm font-medium text-gray-900">
                    {data.stats.totalLikedArticles}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
