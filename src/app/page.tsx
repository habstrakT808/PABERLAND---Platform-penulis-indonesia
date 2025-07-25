"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ClockIcon,
  EyeIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import ActivityFeed from "@/components/social/ActivityFeed";
import UserRecommendations from "@/components/social/UserRecommendations";
import { useAuth } from "@/contexts/AuthContext";

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

const latestArticles = [
  {
    id: 3,
    title: "Legenda Danau Toba",
    excerpt:
      "Cerita rakyat tentang asal mula terbentuknya Danau Toba yang terkenal, kisah Samosir dan ikan mas yang berubah menjadi danau terbesar di Indonesia.",
    author: "Maria Sari",
    category: "Cerita Rakyat",
    views: 432,
    likes: 34,
    comments: 8,
    createdAt: "1 jam lalu",
  },
  {
    id: 4,
    title: "Tips Menulis Cerpen yang Menarik",
    excerpt:
      "Panduan lengkap untuk pemula yang ingin mulai menulis cerpen dengan teknik storytelling yang baik dan menarik pembaca.",
    author: "Budi Santoso",
    category: "Artikel",
    views: 678,
    likes: 45,
    comments: 12,
    createdAt: "3 jam lalu",
  },
  {
    id: 5,
    title: "Malam di Kota Tua",
    excerpt:
      "Sepenggal kisah tentang nostalgia dan kenangan masa lalu yang terpancar dari setiap sudut bangunan bersejarah di Jakarta.",
    author: "Dewi Lestari",
    category: "Cerpen",
    views: 523,
    likes: 41,
    comments: 9,
    createdAt: "5 jam lalu",
  },
];

const categories = [
  {
    name: "Cerpen",
    count: 234,
    color: "bg-blue-500",
    href: "/kategori/cerpen",
  },
  {
    name: "Puisi",
    count: 156,
    color: "bg-purple-500",
    href: "/kategori/puisi",
  },
  {
    name: "Artikel",
    count: 445,
    color: "bg-green-500",
    href: "/kategori/artikel",
  },
  {
    name: "Cerita Rakyat",
    count: 89,
    color: "bg-yellow-500",
    href: "/kategori/cerita-rakyat",
  },
  {
    name: "Novel Berseri",
    count: 67,
    color: "bg-red-500",
    href: "/kategori/novel-berseri",
  },
  {
    name: "Lainnya",
    count: 123,
    color: "bg-gray-500",
    href: "/kategori/lainnya",
  },
];

export default function HomePage() {
  const { user } = useAuth();
  const scrollToContent = () => {
    const element = document.getElementById("main-content");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Compact Hero Section - Tidak Full Screen */}
      <section className="relative h-[92vh] flex flex-col justify-between items-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white pb-2">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-purple-900/30 to-pink-900/30"></div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Selamat Datang di{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                PaberLand
              </span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed text-gray-100">
              Platform komunitas penulis Indonesia untuk berbagi karya sastra,
              cerpen, puisi, dan artikel. Mari bersama membangun literasi
              Indonesia.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/write"
              className="group bg-white text-indigo-600 px-8 py-3 rounded-lg font-bold text-base hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
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
            <Link
              href="/auth/register"
              className="group border-2 border-white text-white px-8 py-3 rounded-lg font-bold text-base hover:bg-white hover:text-indigo-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
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
          </div>

          {/* Stats Preview - Lebih Compact */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-2xl md:text-3xl font-bold text-yellow-300 mb-1">
                500+
              </div>
              <div className="text-white/90 text-xs md:text-sm">
                Penulis Aktif
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-2xl md:text-3xl font-bold text-green-300 mb-1">
                1,200+
              </div>
              <div className="text-white/90 text-xs md:text-sm">
                Karya Terpublikasi
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-2xl md:text-3xl font-bold text-blue-300 mb-1">
                15K+
              </div>
              <div className="text-white/90 text-xs md:text-sm">Pembaca</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-2xl md:text-3xl font-bold text-pink-300 mb-1">
                50K+
              </div>
              <div className="text-white/90 text-xs md:text-sm">
                Total Views
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="relative z-10 mb-8">
          <button
            onClick={scrollToContent}
            className="flex flex-col items-center text-white/80 hover:text-white transition-colors group"
          >
            <span className="text-xs mb-1 font-medium">Jelajahi Konten</span>
            <ChevronDownIcon className="w-6 h-6 animate-bounce group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </section>

      {/* Main Content - Starts after scroll */}
      <div id="main-content" className="bg-gray-50 dark:bg-gray-900">
        {/* Featured Articles Section */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                🌟 Artikel Pilihan
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Karya-karya terbaik dari komunitas penulis PaberLand
              </p>
            </div>

            <div className="space-y-8">
              {featuredArticles.map((article, index) => (
                <article
                  key={article.id}
                  className={`bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div className="lg:flex">
                    <div className="lg:w-1/2">
                      <Image
                        src={article.coverImage}
                        alt={article.title}
                        width={600}
                        height={400}
                        className="w-full h-64 lg:h-full object-cover"
                      />
                    </div>
                    <div className="p-8 lg:w-1/2 flex flex-col justify-center">
                      <div className="flex items-center mb-4">
                        <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                          {article.category}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400 text-sm ml-4 flex items-center">
                          <ClockIcon className="w-4 h-4 mr-1" />
                          {article.createdAt}
                        </span>
                      </div>

                      <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                        <Link
                          href={`/article/${article.id}`}
                          className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                        >
                          {article.title}
                        </Link>
                      </h3>

                      <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed">
                        {article.excerpt}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                            {article.author.charAt(0)}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 dark:text-white">
                              {article.author}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              Penulis
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-6 text-gray-500 dark:text-gray-400">
                          <span className="flex items-center hover:text-indigo-600 transition-colors">
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
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Latest Articles */}
              <div className="lg:col-span-2">
                <div className="text-center lg:text-left mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    📚 Artikel Terbaru
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    Karya-karya segar dari para penulis
                  </p>
                </div>

                <div className="space-y-6">
                  {latestArticles.map((article) => (
                    <article
                      key={article.id}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <div className="flex items-center mb-4">
                        <span className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm font-medium">
                          {article.category}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400 text-sm ml-3 flex items-center">
                          <ClockIcon className="w-4 h-4 mr-1" />
                          {article.createdAt}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        <Link
                          href={`/article/${article.id}`}
                          className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                        >
                          {article.title}
                        </Link>
                      </h3>

                      <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                        {article.excerpt}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                            {article.author.charAt(0)}
                          </div>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {article.author}
                          </span>
                        </div>

                        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                          <span className="flex items-center">
                            <EyeIcon className="w-4 h-4 mr-1" />
                            {article.views}
                          </span>
                          <span className="flex items-center">
                            <HeartIcon className="w-4 h-4 mr-1" />
                            {article.likes}
                          </span>
                          <span className="flex items-center">
                            <ChatBubbleLeftIcon className="w-4 h-4 mr-1" />
                            {article.comments}
                          </span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
                {/* Activity Feed for Logged In Users */}
                {user && (
                  <section className="mb-16">
                    <div className="max-w-4xl mx-auto">
                      <ActivityFeed />
                    </div>
                  </section>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-8">
                {/* Categories */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    📂 Kategori
                  </h3>
                  <div className="space-y-3">
                    {categories.map((category) => (
                      <Link
                        key={category.name}
                        href={category.href}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 group"
                      >
                        <div className="flex items-center">
                          <div
                            className={`w-3 h-3 rounded-full ${category.color} mr-3 group-hover:scale-110 transition-transform`}
                          ></div>
                          <span className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                            {category.name}
                          </span>
                        </div>
                        <span className="text-gray-500 dark:text-gray-400 font-bold">
                          {category.count}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
                {/* User Recommendations */}
                <UserRecommendations />
                {/* Call to Action */}
                <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl shadow-lg p-6 text-white text-center">
                  <div className="text-3xl mb-3">✨</div>
                  <h3 className="text-xl font-bold mb-2">
                    Mulai Menulis Hari Ini!
                  </h3>
                  <p className="text-indigo-100 mb-4 leading-relaxed text-sm">
                    Bagikan karya terbaikmu dengan komunitas penulis Indonesia
                    dan raih apresiasi dari ribuan pembaca.
                  </p>
                  <Link
                    href="/write"
                    className="bg-white text-indigo-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg inline-block"
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
