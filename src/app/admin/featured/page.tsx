"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { adminHelpers } from "@/lib/adminHelpers";
import SignedImage from "@/components/common/SignedImage";
import AdminProtectedRoute from "@/components/admin/AdminProtectedRoute";
import AdminLayout from "@/components/admin/AdminLayout";
import toast from "react-hot-toast";
import Link from "next/link";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  cover_image: string | null;
  category: string;
  published: boolean;
  featured: boolean;
  slug: string;
}

export default function AdminFeaturedPage() {
  const { user } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const result = await adminHelpers.getArticlesForAdmin(
        1,
        100,
        undefined,
        undefined,
        "published"
      );
      setArticles(result.articles);
    } catch (error) {
      toast.error("Gagal memuat data artikel");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFeatured = async (article: Article) => {
    if (!user) return;
    setActionLoading(article.id);
    try {
      const result = await adminHelpers.toggleFeaturedContent(
        "article",
        article.id,
        user.id,
        !article.featured
      );
      if (result.success) {
        toast.success(
          `Konten \"${article.title}\" berhasil ${
            article.featured ? "diunfeature" : "di-feature"
          }!`
        );
        fetchArticles();
      } else {
        toast.error(result.error || "Gagal mengubah status featured");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan sistem");
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <AdminProtectedRoute>
      <AdminLayout>
        <div className="max-w-4xl mx-auto py-10 px-4">
          <h1 className="text-3xl font-bold mb-6 text-black">
            🌟 Pilih Konten Featured
          </h1>
          <p className="mb-8 text-black">
            Pilih konten yang akan ditampilkan di beranda pada bagian{" "}
            <b>🌟 Konten Pilihan</b>.
          </p>
          {loading ? (
            <div>Memuat data...</div>
          ) : (
            <div className="space-y-6">
              {articles.map((article) => (
                <div
                  key={article.id}
                  className={`flex items-center bg-white rounded-lg shadow p-4 border ${
                    article.featured
                      ? "border-yellow-300 bg-yellow-50"
                      : "border-blue-100"
                  }`}
                >
                  <div className="w-24 h-16 rounded-lg overflow-hidden mr-4 flex-shrink-0">
                    {article.cover_image && (
                      <SignedImage
                        src={article.cover_image}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">
                      <Link href={`/article/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-1">
                      {article.excerpt}
                    </p>
                    <span className="inline-block px-2 py-1 text-xs rounded bg-blue-100 text-blue-700 mr-2">
                      {article.category}
                    </span>
                    {article.featured && (
                      <span className="inline-block px-2 py-1 text-xs rounded bg-yellow-200 text-yellow-800">
                        🌟 Featured
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleToggleFeatured(article)}
                    disabled={actionLoading === article.id}
                    className={`ml-4 px-4 py-2 rounded-lg font-medium transition-colors ${
                      article.featured
                        ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                        : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                    } disabled:opacity-50`}
                  >
                    {actionLoading === article.id
                      ? "Menyimpan..."
                      : article.featured
                      ? "Hapus Featured"
                      : "Jadikan Featured"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </AdminLayout>
    </AdminProtectedRoute>
  );
}
