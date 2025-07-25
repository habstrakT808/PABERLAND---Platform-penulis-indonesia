// src/app/profile/[id]/page.tsx
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
  PencilIcon,
  ShareIcon,
  PhoneIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import {
  supabase,
  articleHelpers,
  ArticleSummary,
  likeHelpers,
} from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import LikeButton from "@/components/article/LikeButton";
import toast from "react-hot-toast";
import FollowButton from "@/components/social/FollowButton";
import FollowersModal from "@/components/social/FollowersModal";
import { followHelpers } from "@/lib/supabase";

interface ProfileData {
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
  const [followCounts, setFollowCounts] = useState({
    followersCount: 0,
    followingCount: 0,
  });
  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);

  const articlesPerPage = 6;
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

      // Fetch profile stats
      const { data: articles, error: articlesError } = await supabase
        .from("articles")
        .select("*")
        .eq("author_id", profileId)
        .eq("published", true);

      if (articlesError) {
        console.error("Error fetching profile articles:", articlesError);
        return;
      }

      // Get liked articles count
      const { count: likedCount } = await supabase
        .from("article_likes")
        .select("*", { count: "exact", head: true })
        .eq("user_id", profileId);

      // Process statistics
      const stats = processProfileStats(articles || [], likedCount || 0);
      // Fetch follow counts
      const followCountsData = await followHelpers.getFollowCounts(profileId);
      setFollowCounts(followCountsData);

      setData({
        profile,
        articles: [], // Will be populated by fetchTabContent
        likedArticles: [], // Will be populated by fetchTabContent
        stats,
      });
    } catch (error) {
      console.error("Error fetching profile data:", error);
      toast.error("Gagal memuat profil");
      router.push("/penulis");
    } finally {
      setLoading(false);
    }
  };

  const fetchTabContent = async () => {
    if (!data?.profile.id) return;

    setArticlesLoading(true);
    try {
      if (activeTab === "articles") {
        // Fetch user's articles
        const from = (currentPage - 1) * articlesPerPage;
        const to = from + articlesPerPage - 1;

        const { data: articles, error } = await supabase
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
            created_at
          `
          )
          .eq("author_id", data.profile.id)
          .eq("published", true)
          .order("created_at", { ascending: false })
          .range(from, to);

        if (error) {
          console.error("Error fetching articles:", error);
          return;
        }

        setData((prev) => ({
          ...prev!,
          articles: articles || [],
        }));
      } else if (activeTab === "liked") {
        // Fetch liked articles
        const { articles: likedArticles } =
          await likeHelpers.getUserLikedArticles(
            data.profile.id,
            currentPage,
            articlesPerPage
          );

        setData((prev) => ({
          ...prev!,
          likedArticles: likedArticles || [],
        }));
      }
    } catch (error) {
      console.error("Error fetching tab content:", error);
    } finally {
      setArticlesLoading(false);
    }
  };

  const processProfileStats = (articles: any[], likedCount: number) => {
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

    return {
      totalArticles: articles.length,
      publishedArticles: articles.length,
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

  const handleShare = async () => {
    const url = window.location.href;
    const text = `Lihat profil ${data?.profile.full_name} di PaberLand`;

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({
      top: document.getElementById("content-section")?.offsetTop || 0,
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
            Profil Tidak Ditemukan
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Profil yang Anda cari tidak ditemukan atau telah dihapus.
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

  const currentArticles =
    activeTab === "articles" ? data.articles : data.likedArticles;
  const totalPages = Math.ceil(
    (activeTab === "articles"
      ? data.stats.publishedArticles
      : data.stats.totalLikedArticles) / articlesPerPage
  );

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

        {/* Profile Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
            {/* Profile Info */}
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
                {/* Active indicator */}
                <div className="absolute bottom-2 right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-800">
                  <div className="w-4 h-4 bg-green-400 rounded-full"></div>
                </div>
              </div>

              {/* Profile Details */}
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
                    {data.stats.publishedArticles} artikel
                  </div>
                  <div className="flex items-center">
                    <HeartIcon className="w-4 h-4 mr-1" />
                    {data.stats.totalLikedArticles} artikel disukai
                  </div>
                </div>

                {/* Contact Info (if available) */}
                {data.profile.phone && (
                  <div className="flex flex-wrap items-center gap-4 mt-3 text-sm">
                    {data.profile.phone && (
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <PhoneIcon className="w-4 h-4 mr-1" />
                        {data.profile.phone}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              {!isOwnProfile && (
                <FollowButton
                  targetUserId={profileId}
                  targetUserName={data.profile.full_name}
                  size="md"
                  onFollowChange={(isFollowing) => {
                    setFollowCounts((prev) => ({
                      ...prev,
                      followersCount: isFollowing
                        ? prev.followersCount + 1
                        : Math.max(prev.followersCount - 1, 0),
                    }));
                  }}
                />
              )}
              {isOwnProfile && (
                <Link
                  href="/profile/edit"
                  className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  <PencilIcon className="w-4 h-4" />
                  <span>Edit Profil</span>
                </Link>
              )}
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

        {/* Profile Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
              {data.stats.publishedArticles}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Artikel
            </div>
          </div>
          <button
            onClick={() => setShowFollowersModal(true)}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 text-center hover:shadow-lg transition-shadow"
          >
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
              {followCounts.followersCount}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Pengikut
            </div>
          </button>
          <button
            onClick={() => setShowFollowingModal(true)}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 text-center hover:shadow-lg transition-shadow"
          >
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {followCounts.followingCount}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Mengikuti
            </div>
          </button>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">
              {formatNumber(data.stats.totalLikes)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Likes
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              {formatNumber(data.stats.totalComments)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Komentar
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div id="content-section">
              {/* Tabs */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm mb-8">
                <div className="border-b border-gray-200 dark:border-gray-700">
                  <nav className="flex space-x-8 px-6">
                    <button
                      onClick={() => {
                        setActiveTab("articles");
                        setCurrentPage(1);
                      }}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === "articles"
                          ? "border-indigo-500 text-indigo-600 dark:text-indigo-400"
                          : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300"
                      }`}
                    >
                      📚 Artikel ({data.stats.publishedArticles})
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab("liked");
                        setCurrentPage(1);
                      }}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === "liked"
                          ? "border-indigo-500 text-indigo-600 dark:text-indigo-400"
                          : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300"
                      }`}
                    >
                      ❤️ Disukai ({data.stats.totalLikedArticles})
                    </button>
                  </nav>
                </div>

                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {activeTab === "articles"
                      ? `Artikel dari ${data.profile.full_name}`
                      : `Artikel yang Disukai ${data.profile.full_name}`}
                  </h2>
                </div>
              </div>

              {/* Content Grid */}
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
              ) : currentArticles.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-12 text-center">
                  <div className="text-6xl mb-4">
                    {activeTab === "articles" ? "📝" : "❤️"}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {activeTab === "articles"
                      ? "Belum Ada Artikel"
                      : "Belum Ada Artikel yang Disukai"}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {activeTab === "articles"
                      ? `${data.profile.full_name} belum mempublikasikan artikel apapun.`
                      : `${data.profile.full_name} belum menyukai artikel apapun.`}
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {currentArticles.map((article) => (
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

                              <LikeButton
                                articleId={article.id}
                                initialLikesCount={article.likes_count}
                                size="sm"
                                showCount={true}
                              />

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
              {/* Categories */}
              {data.stats.categories.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    📂 Kategori Tulisan
                  </h3>
                  <div className="space-y-2">
                    {data.stats.categories.map((category) => (
                      <div
                        key={category.category}
                        className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700"
                      >
                        <div className="flex items-center">
                          <span className="text-lg mr-3">{category.emoji}</span>
                          <span className="font-medium text-gray-700 dark:text-gray-300 capitalize">
                            {category.category.replace("-", " ")}
                          </span>
                        </div>
                        <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                          {category.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Actions */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  🔗 Aksi Cepat
                </h3>
                <div className="space-y-3">
                  <Link
                    href={`/penulis/${data.profile.id}`}
                    className="w-full flex items-center justify-center space-x-2 bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 py-2 px-4 rounded-lg font-medium transition-colors"
                  >
                    <UserIcon className="w-4 h-4" />
                    <span>Lihat di Direktori</span>
                  </Link>

                  {isOwnProfile && (
                    <Link
                      href="/profile/edit"
                      className="w-full flex items-center justify-center space-x-2 bg-green-50 dark:bg-green-900/30 hover:bg-green-100 dark:hover:bg-green-900/50 text-green-600 dark:text-green-400 py-2 px-4 rounded-lg font-medium transition-colors"
                    >
                      <PencilIcon className="w-4 h-4" />
                      <span>Edit Profil</span>
                    </Link>
                  )}
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

      {/* Follow Modals */}
      <FollowersModal
        isOpen={showFollowersModal}
        onClose={() => setShowFollowersModal(false)}
        userId={profileId}
        userName={data.profile.full_name}
        type="followers"
      />
      <FollowersModal
        isOpen={showFollowingModal}
        onClose={() => setShowFollowingModal(false)}
        userId={profileId}
        userName={data.profile.full_name}
        type="following"
      />
    </div>
  );
}
