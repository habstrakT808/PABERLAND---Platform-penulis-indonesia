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
import { getSupabaseClient } from "@/lib/supabase";
import { platformStatsHelpers, getAvatarUrl } from "@/lib/supabase";
import { toast } from "react-toastify";

// Animation keyframes styles
const animationStyles = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  
  @keyframes floatSlow {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-15px) rotate(2deg); }
  }
  
  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 20px rgba(123, 178, 177, 0.3); }
    50% { box-shadow: 0 0 40px rgba(123, 178, 177, 0.6); }
  }
  
  @keyframes gradient-shift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes fadeInScale {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  
  .animate-float-slow {
    animation: floatSlow 8s ease-in-out infinite;
  }
  
  .animate-pulse-glow {
    animation: pulse-glow 3s ease-in-out infinite;
  }
  
  .animate-gradient {
    background-size: 200% 200%;
    animation: gradient-shift 4s ease infinite;
  }
  
  .animate-slide-up {
    animation: slideInUp 0.8s ease-out forwards;
  }
  
  .animate-slide-left {
    animation: slideInLeft 0.8s ease-out forwards;
  }
  
  .animate-slide-right {
    animation: slideInRight 0.8s ease-out forwards;
  }
  
  .animate-fade-scale {
    animation: fadeInScale 0.6s ease-out forwards;
  }
  
  .hover-lift {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .hover-lift:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }
  
  .stagger-1 { animation-delay: 0.1s; }
  .stagger-2 { animation-delay: 0.2s; }
  .stagger-3 { animation-delay: 0.3s; }
  .stagger-4 { animation-delay: 0.4s; }
  .stagger-5 { animation-delay: 0.5s; }
`;

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
  const supabase = getSupabaseClient(); // ✅ Use singleton
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalContent: 0,
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
  const [showContentOnMobile, setShowContentOnMobile] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoadingContent, setIsLoadingContent] = useState(false);

  // Debug authentication
  useEffect(() => {
    const debugAuth = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      console.log("🔍 Debug - Current session:", session ? "exists" : "none");
      console.log("🔍 Debug - Session error:", error);
      console.log("🔍 Debug - User from context:", user ? user.email : "none");
    };

    debugAuth();
  }, [user, supabase.auth]);

  useEffect(() => {
    fetchStats();
    fetchFeaturedArticles();
    fetchLatestArticles();
    fetchCategories();
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const message = urlParams.get("message");
    const welcome = urlParams.get("welcome");
    if (message === "email_verified" && welcome === "true") {
      toast.success(
        "🎉 Email berhasil diverifikasi! Selamat datang di PaberLand!"
      );
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // Deteksi ukuran layar untuk mobile
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768; // md breakpoint
      setIsMobile(mobile);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Deteksi scroll untuk menampilkan konten di mobile
  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Jika user scroll lebih dari 50% dari tinggi layar, tampilkan konten
      if (scrollY > windowHeight * 0.5) {
        setShowContentOnMobile(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  const fetchStats = async () => {
    try {
      // ✅ FIXED: Use homepage-specific statistics
      const platformStats = await platformStatsHelpers.getHomepageStatistics();

      setStats({
        totalUsers: platformStats.total_users, // ✅ All registered users (10)
        totalContent: platformStats.total_content, // Total konten (17)
        totalViews: platformStats.total_views, // Total views (7105)
        totalLikes: platformStats.total_likes, // Total likes (16)
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
            avatar_url,
            role
          )
        `
        )
        .in("id", featuredIds)
        .eq("published", true)
        .order("created_at", { ascending: false });

      if (articlesError) {
        console.error("Error fetching konten pilihan:", articlesError);
        return;
      }

      // Sort articles by the priority order from featured_content
      const sortedArticles = featuredIds
        .map((id) => articles?.find((article) => article.id === id))
        .filter(Boolean);

      setFeaturedArticles(sortedArticles || []);
    } catch (error) {
      console.error("Error in fetchKontenPilihan:", error);
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
            avatar_url,
            role
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

      // Define category order and colors (matching /kategori page)
      const categoryOrder = [
        { key: "info-berita", name: "Info/Berita", color: "bg-cyan-500" },
        { key: "cerpen", name: "Cerpen", color: "bg-blue-500" },
        { key: "dongeng", name: "Dongeng", color: "bg-lime-500" },
        { key: "cerita-rakyat", name: "Cerita Rakyat", color: "bg-yellow-500" },
        { key: "cermin", name: "Cermin (Cerita Mini)", color: "bg-pink-500" },
        { key: "puisi", name: "Puisi", color: "bg-purple-500" },
        { key: "cerbung", name: "Cerbung", color: "bg-indigo-500" },
        { key: "novel", name: "Novel", color: "bg-emerald-500" },
        { key: "serial", name: "Serial", color: "bg-rose-500" },
        { key: "resensi-buku", name: "Resensi Buku", color: "bg-amber-500" },
        { key: "artikel", name: "Artikel", color: "bg-green-500" },
      ];

      // Create category list in correct order
      const categoryList = categoryOrder.map((cat) => ({
        name: cat.name,
        count: categoryCounts[cat.key] || 0,
        color: cat.color,
        href: `/kategori/${cat.key}`,
      }));
      // Remove filter to show all categories, even with 0 articles

      setCategories(categoryList);
    } catch (error) {
      console.error("Error in fetchCategories:", error);
    } finally {
      setLoadingCategories(false);
    }
  };

  const scrollToContent = () => {
    // Jika di mobile, tampilkan konten terlebih dahulu
    if (isMobile) {
      setIsLoadingContent(true);
      setShowContentOnMobile(true);
      // Tunggu sebentar agar state terupdate, lalu scroll
      setTimeout(() => {
        const element = document.getElementById("content");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
        setIsLoadingContent(false);
      }, 500);
    } else {
      // Di desktop, langsung scroll
      const element = document.getElementById("content");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
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
    <>
      <style jsx global>
        {animationStyles}
      </style>
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-pink-50 animate-gradient">
        {/* Hero Section dengan Background Light Cyan */}
        <section
          className="relative h-[92vh] md:h-[92vh] flex flex-col justify-center items-center overflow-hidden"
          style={{ backgroundColor: "#d8ebeb" }}
        >
          {/* Animated Oval Decorations */}
          <div
            className="absolute top-20 left-10 w-20 h-12 rounded-full opacity-30 animate-float stagger-1"
            style={{ backgroundColor: "#7bb2b1" }}
          ></div>
          <div
            className="absolute top-32 right-20 w-16 h-10 rounded-full opacity-40 animate-float-slow stagger-2"
            style={{ backgroundColor: "#7bb2b1" }}
          ></div>
          <div
            className="absolute top-16 right-1/3 w-12 h-8 rounded-full opacity-35 animate-float stagger-3"
            style={{ backgroundColor: "#7bb2b1" }}
          ></div>
          <div
            className="absolute top-40 left-1/4 w-14 h-9 rounded-full opacity-25 animate-float-slow stagger-4"
            style={{ backgroundColor: "#7bb2b1" }}
          ></div>
          <div
            className="absolute top-24 left-1/2 w-18 h-11 rounded-full opacity-30 animate-float stagger-5"
            style={{ backgroundColor: "#7bb2b1" }}
          ></div>

          {/* Additional floating elements for more magic */}
          <div
            className="absolute top-60 left-16 w-8 h-5 rounded-full opacity-20 animate-float-slow"
            style={{ backgroundColor: "#7bb2b1" }}
          ></div>
          <div
            className="absolute top-72 right-32 w-10 h-6 rounded-full opacity-25 animate-float stagger-2"
            style={{ backgroundColor: "#7bb2b1" }}
          ></div>
          <div
            className="absolute top-80 left-1/3 w-6 h-4 rounded-full opacity-30 animate-float-slow stagger-4"
            style={{ backgroundColor: "#7bb2b1" }}
          ></div>

          {/* Content */}
          <div
            className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-scale"
            style={{ marginTop: "-200px" }}
          >
            <div className="mb-6 sm:mb-8">
              <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-6 leading-tight text-gray-900 text-center animate-slide-up">
                <span className="block sm:inline">Selamat Datang di</span>
                <span
                  className="inline-block font-bold mt-2 sm:mt-0 sm:ml-2 hover:scale-105 transition-transform duration-300"
                  style={{
                    fontFamily: "inherit",
                    fontSize: "1em",
                    lineHeight: 1,
                  }}
                >
                  <span
                    style={{ color: "#00AEEF" }}
                    className="hover:drop-shadow-lg transition-all duration-300"
                  >
                    Paber
                  </span>
                  <span
                    style={{
                      background:
                        "linear-gradient(180deg, #FFB800 0%, #FF6B00 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontWeight: "bold",
                    }}
                    className="hover:drop-shadow-lg transition-all duration-300 inline-block hover:rotate-12"
                  >
                    L
                  </span>
                  <span
                    style={{ color: "#00AEEF" }}
                    className="hover:drop-shadow-lg transition-all duration-300"
                  >
                    and
                  </span>
                </span>
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed text-gray-800 font-medium animate-slide-up stagger-2">
                Platform Forum Penulis Bacaan Anak untuk Berbagi Cerita dan
                Karya.
                <br />
                Mari ciptakan bacaan anak yang sehat, kreatif, dan sesuai dengan
                perkembangan anak-anak Indonesia.
              </p>
            </div>

            {/* CTA Button */}
            <div className="mb-8 sm:mb-12 relative z-20 animate-slide-up stagger-3">
              <Link
                href="/write"
                className="group text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 shadow-lg hover:shadow-2xl inline-flex items-center animate-pulse-glow relative overflow-hidden"
                style={{ backgroundColor: "#7bb2b1" }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                <span className="relative z-10">Mulai Menulis</span>
                <svg
                  className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300"
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
              </Link>
            </div>

            {/* Bear Image - Positioned behind button */}
            <div
              className="absolute left-1/2 transform -translate-x-1/2 w-full max-w-4xl -z-10 animate-slide-up stagger-4"
              style={{
                bottom: isMobile ? "-150px" : "-300px",
                background: "transparent",
              }}
            >
              <div className="hover:scale-105 transition-transform duration-700 ease-out">
                <Image
                  src="/hero_section.png"
                  alt="Bear Illustration"
                  width={800}
                  height={400}
                  className="w-full h-auto max-w-4xl block mx-auto drop-shadow-2xl"
                  style={{
                    margin: 0,
                    padding: 0,
                    background: "transparent",
                  }}
                  priority
                />
              </div>
            </div>

            {/* Stats Preview - Commented out for now */}
            {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg flex flex-col items-center">
              <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">
                {loading ? "..." : stats.totalContent}
              </div>
              <div className="text-gray-900 text-xs md:text-sm font-semibold">
                Total Konten
              </div>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg flex flex-col items-center">
              <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">
                {loading ? "..." : stats.totalUsers}
              </div>
              <div className="text-gray-900 text-xs md:text-sm font-semibold">
                Total User
              </div>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg flex flex-col items-center">
              <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">
                {loading ? "..." : stats.totalLikes}
              </div>
              <div className="text-gray-900 text-xs md:text-sm font-semibold">
                Total Likes
              </div>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg flex flex-col items-center">
              <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">
                {loading ? "..." : stats.totalViews}
              </div>
              <div className="text-gray-900 text-xs md:text-sm font-semibold">
                Total Views
              </div>
            </div>
          </div> */}
          </div>

          {/* Scroll Down Indicator */}
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10 animate-slide-up stagger-5">
            <button
              onClick={scrollToContent}
              className={`flex items-center justify-center text-gray-800 hover:text-blue-600 font-bold transition-all duration-500 group
                ${
                  isMobile
                    ? "bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 hover:-translate-y-2"
                    : "hover:scale-125 hover:-translate-y-3"
                }
              `}
              aria-label="Lihat Konten"
            >
              <ChevronDownIcon className="w-7 h-7 animate-bounce group-hover:scale-125 group-hover:text-blue-600 transition-all duration-300" />
            </button>
          </div>
        </section>

        {/* Main Content - Starts after scroll */}
        <div
          id="content"
          className={`bg-gradient-to-br from-white via-blue-50 to-pink-50 transition-all duration-700 ease-out ${
            isMobile && !showContentOnMobile
              ? "opacity-0 translate-y-8 pointer-events-none"
              : "opacity-100 translate-y-0"
          } ${isMobile ? "pt-8" : ""}`}
        >
          {/* Loading indicator untuk mobile */}
          {isMobile && isLoadingContent && (
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                <p className="text-gray-600 text-sm">Memuat konten...</p>
              </div>
            </div>
          )}

          {/* Konten Pilihan Section */}
          <section
            className={`py-16 bg-white/90 backdrop-blur-md rounded-3xl shadow-xl mx-2 md:mx-0 hover-lift ${
              isMobile && isLoadingContent
                ? "opacity-50 pointer-events-none"
                : ""
            }`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12 animate-slide-up">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 hover:scale-105 transition-transform duration-300">
                  🌟 Konten Pilihan
                </h2>
                <p className="text-lg text-gray-800 max-w-2xl mx-auto animate-slide-up stagger-1">
                  Cerita dan Karya Terbaik Member PaberLand
                </p>
              </div>

              <div className="space-y-8">
                {featuredArticles.map((article, index) => (
                  <article
                    key={article.id}
                    className={`bg-white/95 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-[1.02] border border-blue-100 animate-slide-up group ${
                      index % 2 === 1 ? "lg:flex-row-reverse" : ""
                    }`}
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className="lg:flex">
                      <div className="lg:w-1/2 flex items-stretch">
                        <div className="w-full aspect-[16/5] rounded-2xl overflow-hidden flex items-stretch group-hover:scale-105 transition-transform duration-500">
                          <SignedImage
                            src={article.cover_image}
                            alt={article.title}
                            width={600}
                            height={200}
                            className="w-full h-full object-cover rounded-2xl group-hover:brightness-110 transition-all duration-500"
                          />
                        </div>
                      </div>
                      <div className="p-8 lg:w-1/2 flex flex-col justify-center">
                        <div className="flex items-center mb-4">
                          <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-bold hover:scale-105 transition-transform duration-300 animate-gradient">
                            {article.category}
                          </span>
                          <span className="text-gray-700 text-sm ml-4 flex items-center hover:text-blue-600 transition-colors duration-300">
                            <ClockIcon className="w-4 h-4 mr-1" />
                            {formatRelativeTime(article.created_at)}
                          </span>
                        </div>

                        <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                          <Link
                            href={`/article/${article.slug}`}
                            className="hover:text-blue-600 transition-all duration-300 hover:drop-shadow-lg"
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
                            {article.profiles?.avatar_url ? (
                              <Image
                                src={
                                  getAvatarUrl(article.profiles.avatar_url) ||
                                  ""
                                }
                                alt={article.profiles.full_name}
                                width={40}
                                height={40}
                                className="w-10 h-10 rounded-full object-cover mr-3"
                              />
                            ) : (
                              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                                {article.profiles?.full_name?.charAt(0) || "U"}
                              </div>
                            )}
                            <div>
                              <div className="font-semibold text-gray-900">
                                {article.profiles?.full_name || "Anonymous"}
                              </div>
                              <div className="text-sm text-gray-700">
                                {article.profiles?.role || "Member"}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-6 text-gray-500">
                            <span className="flex items-center hover:text-blue-600 transition-all duration-300 hover:scale-110 cursor-pointer">
                              <EyeIcon className="w-5 h-5 mr-1" />
                              {article.views}
                            </span>
                            <span className="flex items-center hover:text-red-500 transition-all duration-300 hover:scale-110 cursor-pointer">
                              <HeartIcon className="w-5 h-5 mr-1" />
                              {article.likes_count}
                            </span>
                            <span className="flex items-center hover:text-blue-500 transition-all duration-300 hover:scale-110 cursor-pointer">
                              <ChatBubbleLeftIcon className="w-5 h-5 mr-1" />
                              {article.comments_count}
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
          <section
            className={`py-16 bg-blue-50/60 rounded-3xl shadow-lg mx-2 md:mx-0 mt-8 hover-lift ${
              isMobile && isLoadingContent
                ? "opacity-50 pointer-events-none"
                : ""
            }`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Latest Articles */}
                <div className="lg:col-span-2">
                  <div className="text-center lg:text-left mb-12 animate-slide-left">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 hover:scale-105 transition-transform duration-300">
                      📚 Konten Terbaru
                    </h2>
                    <p className="text-lg text-gray-800 animate-slide-left stagger-1">
                      Cerita dan Karya Segar Member PaberLand
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
                      latestArticles.map((article, index) => (
                        <article
                          key={article.id}
                          className="bg-white/95 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02] border border-blue-100 animate-slide-up"
                          style={{ animationDelay: `${index * 0.1}s` }}
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
                              {article.profiles?.avatar_url ? (
                                <Image
                                  src={
                                    getAvatarUrl(article.profiles.avatar_url) ||
                                    ""
                                  }
                                  alt={article.profiles.full_name}
                                  width={32}
                                  height={32}
                                  className="w-8 h-8 rounded-full object-cover mr-3"
                                />
                              ) : (
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                                  {article.profiles?.full_name?.charAt(0) ||
                                    "U"}
                                </div>
                              )}
                              <div>
                                <div className="font-medium text-gray-900">
                                  {article.profiles?.full_name || "Anonymous"}
                                </div>
                                <div className="text-xs text-gray-600">
                                  {article.profiles?.role || "Member"}
                                </div>
                              </div>
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
                  <div className="bg-white/90 rounded-xl shadow-lg p-6 hover-lift animate-slide-right">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 hover:scale-105 transition-transform duration-300">
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
                            className="flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 transition-all duration-300 group hover:scale-105 hover:-translate-y-1"
                          >
                            <div className="flex items-center">
                              <div
                                className={`w-3 h-3 rounded-full ${category.color} mr-3 group-hover:scale-125 transition-transform duration-300`}
                              ></div>
                              <span className="text-gray-800 font-medium group-hover:text-blue-600 transition-colors duration-300">
                                {category.name}
                              </span>
                            </div>
                            <span className="text-gray-700 font-bold group-hover:scale-110 transition-transform duration-300">
                              {category.count}
                            </span>
                          </Link>
                        ))
                      )}
                    </div>
                  </div>
                  {/* User Recommendations */}
                  {user && (
                    <div className="animate-slide-right stagger-1">
                      <UserRecommendations />
                    </div>
                  )}
                  {/* Call to Action */}
                  <div className="bg-gradient-to-br from-yellow-200 via-pink-200 to-blue-200 rounded-xl shadow-lg p-6 text-gray-900 text-center hover-lift animate-slide-right stagger-2 animate-gradient">
                    <div className="text-3xl mb-3 animate-float">✨</div>
                    <h3 className="text-xl font-bold mb-2 hover:scale-105 transition-transform duration-300">
                      Mulai Menulis Hari Ini
                    </h3>
                    <p className="text-gray-800 mb-4 leading-relaxed text-sm">
                      Bagikan cerita dan karya terbaikmu di sini. Biarkan ribuan
                      pembaca mengapresiasinya.
                    </p>
                    <Link
                      href="/write"
                      className="bg-white text-blue-700 px-6 py-2 rounded-lg font-bold hover:bg-blue-50 transition-all duration-500 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-xl inline-block relative overflow-hidden group"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                      <span className="relative z-10">🚀 Tulis Sekarang</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
