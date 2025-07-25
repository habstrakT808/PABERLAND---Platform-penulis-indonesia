"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { articleManagement } from "@/lib/supabase";
import toast from "react-hot-toast";
import { Article } from "@/lib/supabase";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import WriteArticleForm from "@/components/editor/WriteArticleForm";

function WriteArticleContent() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  const [editArticle, setEditArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editId && user) {
      fetchArticleForEdit();
    }
  }, [editId, user]);

  const fetchArticleForEdit = async () => {
    if (!editId || !user) return;

    setLoading(true);
    try {
      const article = await articleManagement.getArticleForEdit(
        editId,
        user.id
      );

      if (article) {
        setEditArticle(article);
      } else {
        toast.error(
          "Artikel tidak ditemukan atau Anda tidak memiliki akses untuk mengeditnya"
        );
      }
    } catch (error) {
      console.error("Error fetching article for edit:", error);
      toast.error("Gagal memuat artikel untuk diedit");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Memuat artikel untuk diedit...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {editArticle ? "✏️ Edit Artikel" : "✍️ Tulis Artikel Baru"}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {editArticle
              ? "Perbarui artikel Anda dan bagikan kembali dengan komunitas"
              : "Bagikan ide, cerita, dan karya terbaik Anda dengan komunitas penulis Indonesia"}
          </p>
        </div>

        <WriteArticleForm editArticle={editArticle} />
      </div>
    </div>
  );
}

export default function WritePage() {
  return (
    <ProtectedRoute>
      <WriteArticleContent />
    </ProtectedRoute>
  );
}
