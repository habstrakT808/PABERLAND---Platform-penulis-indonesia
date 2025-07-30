// src/app/kategori/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  BookOpenIcon,
  SparklesIcon,
  NewspaperIcon,
  HeartIcon,
  GlobeAltIcon,
  EllipsisHorizontalIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";
import { useAuth } from "@/contexts/AuthContext";

interface CategoryStats {
  category: string;
  count: number;
  latest_article?: {
    title: string;
    created_at: string;
    author_name: string;
  };
}

// New category config as per user request
const categoryConfig = {
  "info-berita": {
    name: "Info/Berita",
    description: "Ragam Informasi dan Berita Tentang PaberLand.",
    extra: "",
    emoji: "📰",
  },
  cerpen: {
    name: "Cerpen",
    description: "Cerita Pendek yang mendidik dan menghibur untuk anak.",
    extra: "Maksimal 1000 kata",
    emoji: "📖",
  },
  dongeng: {
    name: "Dongeng",
    description:
      "Cerita Fantasi yang membuat imajinasi anak-anak melambung ke awan.",
    extra: "Maksimal 1000 kata",
    emoji: "🧚",
  },
  "cerita-rakyat": {
    name: "Cerita Rakyat",
    description:
      "Karya Lisan yang mengandung nilai-nilai budaya, moral, dan sejarah.",
    extra: "Maksimal 1000 kata",
    emoji: "🏛️",
  },
  cermin: {
    name: "Cermin (Cerita Mini)",
    description: "Cerita Singkat yang ringan, menghibung, dan bermakna.",
    extra: "Maksimal 200 kata",
    emoji: "🔎",
  },
  puisi: {
    name: "Puisi",
    description:
      "Karya Sastra yang diungkapkan dengan bahasa yang indah dan bermakna.",
    extra: "Maksimal 1000 kata",
    emoji: "🎭",
  },
  cerbung: {
    name: "Cerbung",
    description: "Cerita Bersambung yang membuat pembaca penasaran.",
    extra: "Maksimal 10 bagian",
    emoji: "📝",
  },
  novel: {
    name: "Novel",
    description:
      "Cerita Panjang yang menonjolkan tokoh, watak, dan perubahan para tokoh.",
    extra: "Minimal 11 – 50 bab (pagination aktif)",
    emoji: "📚",
  },
  serial: {
    name: "Serial",
    description: "Cerita Seru dengan tokoh yang sama.",
    extra: "Maksimal 1000 kata/judul. Judul tidak dibatasi",
    emoji: "📚",
  },
  "resensi-buku": {
    name: "Resensi Buku",
    description:
      "Tulisan yang berisi penilaian atau komentar pada sebuah buku.",
    extra: "Maksimal 1000 kata",
    emoji: "📖",
  },
  artikel: {
    name: "Artikel",
    description:
      "Karya tulis yang berisi informasi, opini, atau analisis topik tertentu.",
    extra: "",
    emoji: "📰",
  },
};

export default function CategoriesPage() {
  const { user } = useAuth();
  const [categoryStats, setCategoryStats] = useState<CategoryStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategoryStats();
  }, []);

  const fetchCategoryStats = async () => {
    try {
      const stats: CategoryStats[] = [];

      for (const categoryKey of Object.keys(categoryConfig)) {
        // Get article count for this category
        const { count, error: countError } = await supabase
          .from("articles")
          .select("*", { count: "exact", head: true })
          .eq("category", categoryKey)
          .eq("published", true);

        if (countError) {
          console.error(`Error fetching count for ${categoryKey}:`, countError);
        }

        // Get latest article for this category
        const { data: latestArticle, error: latestError } = await supabase
          .from("articles")
          .select(
            `
            title,
            created_at,
            profiles!inner(full_name)
          `
          )
          .eq("category", categoryKey)
          .eq("published", true)
          .order("created_at", { ascending: false })
          .limit(1)
          .single();

        if (latestError && latestError.code !== "PGRST116") {
          console.error(
            `Error fetching latest article for ${categoryKey}:`,
            latestError
          );
        }

        stats.push({
          category: categoryKey,
          count: count || 0,
          latest_article: latestArticle
            ? {
                title: latestArticle.title,
                created_at: latestArticle.created_at,
                author_name:
                  (latestArticle.profiles as any)?.full_name || "Anonymous",
              }
            : undefined,
        });
      }

      setCategoryStats(stats);
    } catch (error) {
      console.error("Error fetching category stats:", error);
      toast.error("Gagal memuat statistik kategori");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Kategori Konten
          </h1>
          <p className="text-lg text-gray-800 max-w-2xl mx-auto">
            Jelajahi Cerita dan Karya Terbaik Member PaberLand
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(categoryConfig).map(([categoryKey, config]) => {
            const stats = categoryStats.find((s) => s.category === categoryKey);
            return (
              <Link
                key={categoryKey}
                href={`/kategori/${categoryKey}`}
                className="group"
              >
                <div className="bg-white/95 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-blue-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white text-xl`}
                      >
                        {config.emoji}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">
                          {config.name}
                        </h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-700">
                          <span>{stats?.count || 0} konten</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-800 text-sm mb-2 leading-relaxed">
                    {config.description}
                  </p>
                  {config.extra && (
                    <p className="text-blue-600 text-xs mb-2 font-semibold">
                      {config.extra}
                    </p>
                  )}
                  {/* Latest Article */}
                  {stats?.latest_article && (
                    <div className="border-t border-blue-100 pt-4">
                      <div className="text-xs text-gray-600 mb-1">
                        Konten Terbaru:
                      </div>
                      <div className="text-sm font-medium text-gray-900 truncate mb-1">
                        {stats.latest_article.title}
                      </div>
                      <div className="text-xs text-gray-600">
                        oleh {stats.latest_article.author_name} •{" "}
                        {formatDate(stats.latest_article.created_at)}
                      </div>
                    </div>
                  )}
                  {!stats?.count && (
                    <div className="border-t border-blue-100 pt-4 text-center">
                      <div className="text-2xl mb-2">📝</div>
                      <div className="text-sm text-gray-600">
                        Belum ada konten dalam kategori ini
                      </div>
                    </div>
                  )}
                  <div className="flex justify-end mt-4">
                    <div className="text-blue-600 group-hover:translate-x-1 transition-transform duration-200">
                      <svg
                        className="w-5 h-5"
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
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-br from-yellow-200 via-pink-200 to-blue-200 rounded-xl p-8 text-gray-900">
            <div className="text-3xl mb-4">✍️</div>
            <h3 className="text-2xl font-bold mb-2">
              Punya Karya untuk Dibagikan?
            </h3>
            <p className="text-gray-800 mb-6 max-w-2xl mx-auto">
              Bergabunglah dengan komunitas penulis PaberLand dan bagikan karya
              terbaikmu dalam kategori yang sesuai.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <Link
                  href="/write"
                  className="bg-white text-blue-700 px-6 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors inline-flex items-center justify-center"
                >
                  🚀 Mulai Menulis
                </Link>
              ) : (
                <Link
                  href="/auth/register"
                  className="border-2 border-blue-500 text-blue-700 px-6 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors inline-flex items-center justify-center"
                >
                  📝 Bergabung Sekarang
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
