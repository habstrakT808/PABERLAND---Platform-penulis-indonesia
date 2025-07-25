"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import SignedImage from "@/components/common/SignedImage";
import {
  ClockIcon,
  EyeIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import UserRecommendations from "@/components/social/UserRecommendations";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";

// Dummy data dengan gambar real dari Unsplash
const featuredArticles = [
  {
    id: 1,
    title: "Kisah Cinta di Kampung Halaman",
    excerpt:
      "Sebuah cerita tentang cinta yang tumbuh di antara sawah dan ladang, mengisahkan perjalanan dua insan yang saling mencinta dalam kesederhanaan hidup di desa.",
    author: "Siti Nurhaliza",
    category: "Cerpen",
    coverImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop&crop=center",
    views: 1234,
    likes: 89,
    comments: 23,
    createdAt: "2 jam lalu",
  },
  {
    id: 2,
    title: "Hujan di Atas Genting",
    excerpt:
      "Puisi tentang kerinduan dan harapan yang mengalir seperti air hujan di atas genting rumah tua, membawa kenangan masa lalu yang tak terlupakan.",
    author: "Ahmad Fauzi",
    category: "Puisi",
    coverImage:
      "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&h=400&fit=crop&crop=center",
    views: 856,
    likes: 67,
    comments: 15,
    createdAt: "4 jam lalu",
  },
];

export default function HomePage() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalAuthors: 0,
    totalArticles: 0,
    totalViews: 0,
    totalLikes: 0,
  });
  const [loading, setLoading] = useState(true);
  const [featuredArticles, setFeaturedArticles] = useState<any[]>([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true);
  const [latestArticles, setLatestArticles] = useState<any[]>([]);
  const [loadingLatest, setLoadingLatest] = useState(true);
  const [categories, setCategories] = useState<any[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    fetchStats();
    fetchFeaturedArticles();
    fetchLatestArticles();
    fetchCategories();
  }, []);

  const fetchStats = async () => {
    try {
      // Get total articles
      const { count: articlesCount } = await supabase
        .from("articles")
        .select("*", { count: "exact", head: true })
        .eq("published", true);

      // Get total authors (users who have published articles)
      const { count: authorsCount } = await supabase
        .from("articles")
        .select("author_id", { count: "exact", head: true })
        .eq("published", true);

      // Get total views
      const { data: viewsData } = await supabase
        .from("articles")
        .select("views")
        .eq("published", true);

      const totalViews =
        viewsData?.reduce((sum, article) => sum + (article.views || 0), 0) || 0;

      // Get total likes
      const { data: likesData } = await supabase
        .from("articles")
        .select("likes_count")
        .eq("published", true);

      const totalLikes =
        likesData?.reduce(
          (sum, article) => sum + (article.likes_count || 0),
          0
        ) || 0;

      setStats({
        totalAuthors: authorsCount || 0,
        totalArticles: articlesCount || 0,
        totalViews: totalViews,
        totalLikes: totalLikes,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFeaturedArticles = async () => {
    setLoadingFeatured(true);
    try {
      // Fetch featured content from featured_content table
      const { data: featuredData, error: featuredError } = await supabase
        .from("featured_content")
        .select("content_id, priority")
        .eq("content_type", "article")
        .eq("active", true)
        .order("priority", { ascending: false });

      if (featuredError) {
        console.error("Error fetching featured content:", featuredError);
        return;
      }

      if (!featuredData || featuredData.length === 0) {
        setFeaturedArticles([]);
        return;
      }

      // Get the featured article IDs
      const featuredIds = featuredData.map((f) => f.content_id);

      // Fetch the actual articles
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
          profiles:author_id (
            full_name,
            avatar_url
          )
        `
        )
        .in("id", featuredIds)
        .eq("published", true)
        .order("created_at", { ascending: false });

      if (articlesError) {
        console.error("Error fetching featured articles:", articlesError);
        return;
      }

      // Sort articles by the priority order from featured_content
      const sortedArticles = featuredIds
        .map((id) => articles?.find((article) => article.id === id))
        .filter(Boolean);

      setFeaturedArticles(sortedArticles || []);
    } catch (error) {
      console.error("Error in fetchFeaturedArticles:", error);
    } finally {
      setLoadingFeatured(false);
    }
  };

  const fetchLatestArticles = async () => {
    setLoadingLatest(true);
    try {
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
          created_at,
          profiles:author_id (
            full_name,
            avatar_url
          )
        `
        )
        .eq("published", true)
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) {
        console.error("Error fetching latest articles:", error);
        return;
      }

      setLatestArticles(articles || []);
    } catch (error) {
      console.error("Error in fetchLatestArticles:", error);
    } finally {
      setLoadingLatest(false);
    }
  };

  const fetchCategories = async () => {
    setLoadingCategories(true);
    try {
      // Get all published articles with their categories
      const { data: articles, error } = await supabase
        .from("articles")
        .select("category")
        .eq("published", true);

      if (error) {
        console.error("Error fetching categories:", error);
        return;
      }

      // Count articles per category
      const categoryCounts: { [key: string]: number } = {};
      articles?.forEach((article) => {
        categoryCounts[article.category] =
          (categoryCounts[article.category] || 0) + 1;
      });

      // Create category objects with colors
      const categoryColors: { [key: string]: string } = {
        cerpen: "bg-blue-500",
        puisi: "bg-purple-500",
        artikel: "bg-green-500",
        "cerita-rakyat": "bg-yellow-500",
        "novel-berseri": "bg-red-500",
        lainnya: "bg-gray-500",
      };

      const categoryList = Object.entries(categoryCounts).map(
        ([name, count]) => ({
          name: name.charAt(0).toUpperCase() + name.slice(1).replace("-", " "),
          count,
          color: categoryColors[name] || "bg-gray-500",
          href: `/kategori/${name}`,
        })
      );

      setCategories(categoryList);
    } catch (error) {
      console.error("Error in fetchCategories:", error);
    } finally {
      setLoadingCategories(false);
    }
  };

  const scrollToContent = () => {
    const element = document.getElementById("content");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const formatRelativeTime = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "Baru saja";
    if (diffInHours < 24) return `${diffInHours} jam lalu`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} hari lalu`;

    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) return `${diffInWeeks} minggu lalu`;

    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) return `${diffInMonths} bulan lalu`;

    const diffInYears = Math.floor(diffInDays / 365);
    return `${diffInYears} tahun lalu`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-pink-50">
      {/* Compact Hero Section - Tidak Full Screen */}
      <section className="relative h-[92vh] flex flex-col justify-between items-center bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100 text-gray-900 pb-2 shadow-md">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-white/60"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/40 via-pink-200/40 to-blue-200/40"></div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight text-gray-900">
              Selamat Datang di{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                PaberLand
              </span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed text-gray-800">
              Platform komunitas penulis Indonesia untuk berbagi karya sastra,
              cerpen, puisi, dan artikel. Mari bersama membangun literasi
              Indonesia.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/write"
              className="group bg-white text-blue-700 px-8 py-3 rounded-lg font-bold text-base hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <span className="flex items-center justify-center">
                ✍️ Mulai Menulis
                <svg
                  className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </Link>
            {!user && (
              <Link
                href="/auth/register"
                className="group border-2 border-blue-500 text-blue-700 px-8 py-3 rounded-lg font-bold text-base hover:bg-blue-50 hover:text-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <span className="flex items-center justify-center">
                  🚀 Bergabung Sekarang
                  <svg
                    className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
              </Link>
            )}
          </div>

          {/* Stats Preview - Lebih Compact */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg p-4 border border-blue-200 shadow flex flex-col items-center">
              <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">
                {loading ? "..." : stats.totalAuthors}
              </div>
              <div className="text-gray-900 text-xs md:text-sm font-semibold">
                Penulis Aktif
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-blue-200 shadow flex flex-col items-center">
              <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">
                {loading ? "..." : stats.totalArticles}
              </div>
              <div className="text-gray-900 text-xs md:text-sm font-semibold">
                Karya Terpublikasi
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-blue-200 shadow flex flex-col items-center">
              <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">
                {loading ? "..." : stats.totalViews}
              </div>
              <div className="text-gray-900 text-xs md:text-sm font-semibold">
                Pembaca
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-blue-200 shadow flex flex-col items-center">
              <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">
                {loading ? "..." : stats.totalLikes}
              </div>
              <div className="text-gray-900 text-xs md:text-sm font-semibold">
                Total Views
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="relative z-10 mb-8">
          <button
            onClick={scrollToContent}
            className="flex flex-col items-center text-blue-700 hover:text-blue-900 font-bold transition-colors group"
          >
            <span className="text-sm mb-1 font-bold uppercase tracking-wide">
              Jelajahi Konten
            </span>
            <ChevronDownIcon className="w-6 h-6 animate-bounce group-hover:scale-110 transition-transform text-blue-500" />
          </button>
        </div>
      </section>

      {/* Main Content - Starts after scroll */}
      <div
        id="content"
        className="bg-gradient-to-br from-white via-blue-50 to-pink-50"
      >
        {/* Featured Articles Section */}
        <section className="py-16 bg-white/90 backdrop-blur-md rounded-3xl shadow-xl mx-2 md:mx-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                🌟 Konten Pilihan
              </h2>
              <p className="text-lg text-gray-800 max-w-2xl mx-auto">
                Karya-karya terbaik dari komunitas penulis PaberLand
              </p>
            </div>

            <div className="space-y-8">
              {featuredArticles.map((article, index) => (
                <article
                  key={article.id}
                  className={`bg-white/95 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-blue-100 ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div className="lg:flex">
                    <div className="lg:w-1/2 flex items-stretch">
                      <div className="w-full aspect-[16/5] rounded-2xl overflow-hidden flex items-stretch">
                        <SignedImage
                          src={article.cover_image}
                          alt={article.title}
                          width={600}
                          height={200}
                          className="w-full h-full object-cover rounded-2xl"
                        />
                      </div>
                    </div>
                    <div className="p-8 lg:w-1/2 flex flex-col justify-center">
                      <div className="flex items-center mb-4">
                        <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                          {article.category}
                        </span>
                        <span className="text-gray-700 text-sm ml-4 flex items-center">
                          <ClockIcon className="w-4 h-4 mr-1" />
                          {formatRelativeTime(article.created_at)}
                        </span>
                      </div>

                      <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                        <Link
                          href={`/article/${article.slug}`}
                          className="hover:text-blue-600 transition-colors"
                        >
                          {article.title}
                        </Link>
                      </h3>

                      <p className="text-gray-800 mb-6 text-lg leading-relaxed">
                        {article.excerpt.length > 250
                          ? `${article.excerpt.slice(0, 250)}... `
                          : article.excerpt}
                        {article.excerpt.length > 250 && (
                          <Link
                            href={`/article/${article.slug}`}
                            className="text-blue-600 hover:underline ml-1 text-base"
                          >
                            (baca selengkapnya)
                          </Link>
                        )}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                            {article.profiles?.full_name?.charAt(0) || "U"}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">
                              {article.profiles?.full_name || "Anonymous"}
                            </div>
                            <div className="text-sm text-gray-700">Penulis</div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-6 text-gray-500">
                          <span className="flex items-center hover:text-blue-600 transition-colors">
                            <EyeIcon className="w-5 h-5 mr-1" />
                            {article.views}
                          </span>
                          <span className="flex items-center hover:text-red-500 transition-colors">
                            <HeartIcon className="w-5 h-5 mr-1" />
                            {article.likes}
                          </span>
                          <span className="flex items-center hover:text-blue-500 transition-colors">
                            <ChatBubbleLeftIcon className="w-5 h-5 mr-1" />
                            {article.comments}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Latest Articles & Sidebar */}
        <section className="py-16 bg-blue-50/60 rounded-3xl shadow-lg mx-2 md:mx-0 mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Latest Articles */}
              <div className="lg:col-span-2">
                <div className="text-center lg:text-left mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    📚 Konten Terbaru
                  </h2>
                  <p className="text-lg text-gray-800">
                    Karya-karya segar dari para penulis
                  </p>
                </div>

                <div className="space-y-6">
                  {loadingLatest ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                      <p className="mt-2 text-gray-600">
                        Memuat konten terbaru...
                      </p>
                    </div>
                  ) : latestArticles.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-600">
                        Belum ada konten yang dipublikasikan.
                      </p>
                    </div>
                  ) : (
                    latestArticles.map((article) => (
                      <article
                        key={article.id}
                        className="bg-white/95 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-blue-100"
                      >
                        <div className="flex items-center mb-4">
                          <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                            {article.category.charAt(0).toUpperCase() +
                              article.category.slice(1).replace("-", " ")}
                          </span>
                          <span className="text-gray-700 text-sm ml-3 flex items-center">
                            <ClockIcon className="w-4 h-4 mr-1" />
                            {formatRelativeTime(article.created_at)}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                          <Link
                            href={`/article/${article.slug}`}
                            className="hover:text-blue-600 transition-colors"
                          >
                            {article.title}
                          </Link>
                        </h3>

                        <p className="text-gray-800 mb-4 leading-relaxed">
                          {article.excerpt.length > 200
                            ? `${article.excerpt.slice(0, 200)}...`
                            : article.excerpt}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                              {article.profiles?.full_name?.charAt(0) || "U"}
                            </div>
                            <span className="font-medium text-gray-900">
                              {article.profiles?.full_name || "Anonymous"}
                            </span>
                          </div>

                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <EyeIcon className="w-4 h-4 mr-1" />
                              {article.views || 0}
                            </span>
                            <span className="flex items-center">
                              <HeartIcon className="w-4 h-4 mr-1" />
                              {article.likes_count || 0}
                            </span>
                            <span className="flex items-center">
                              <ChatBubbleLeftIcon className="w-4 h-4 mr-1" />
                              {article.comments_count || 0}
                            </span>
                          </div>
                        </div>
                      </article>
                    ))
                  )}
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-8">
                {/* Categories */}
                <div className="bg-white/90 rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    📂 Kategori
                  </h3>
                  <div className="space-y-3">
                    {loadingCategories ? (
                      <div className="text-center py-4">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-2 text-gray-600 text-sm">
                          Memuat kategori...
                        </p>
                      </div>
                    ) : categories.length === 0 ? (
                      <div className="text-center py-4">
                        <p className="text-gray-600 text-sm">
                          Belum ada kategori.
                        </p>
                      </div>
                    ) : (
                      categories.map((category) => (
                        <Link
                          key={category.name}
                          href={category.href}
                          className="flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 transition-all duration-200 group"
                        >
                          <div className="flex items-center">
                            <div
                              className={`w-3 h-3 rounded-full ${category.color} mr-3 group-hover:scale-110 transition-transform`}
                            ></div>
                            <span className="text-gray-800 font-medium group-hover:text-blue-600">
                              {category.name}
                            </span>
                          </div>
                          <span className="text-gray-700 font-bold">
                            {category.count}
                          </span>
                        </Link>
                      ))
                    )}
                  </div>
                </div>
                {/* User Recommendations */}
                {user && <UserRecommendations />}
                {/* Call to Action */}
                <div className="bg-gradient-to-br from-yellow-200 via-pink-200 to-blue-200 rounded-xl shadow-lg p-6 text-gray-900 text-center">
                  <div className="text-3xl mb-3">✨</div>
                  <h3 className="text-xl font-bold mb-2">
                    Mulai Menulis Hari Ini!
                  </h3>
                  <p className="text-gray-800 mb-4 leading-relaxed text-sm">
                    Bagikan karya terbaikmu dengan komunitas penulis Indonesia
                    dan raih apresiasi dari ribuan pembaca.
                  </p>
                  <Link
                    href="/write"
                    className="bg-white text-blue-700 px-6 py-2 rounded-lg font-bold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg inline-block"
                  >
                    🚀 Tulis Sekarang
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
