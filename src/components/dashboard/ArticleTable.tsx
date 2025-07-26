"use client";

import { useState } from "react";
import SignedImage from "@/components/common/SignedImage";
import Link from "next/link";
import {
  PencilIcon,
  TrashIcon,
  EyeIcon,
  EyeSlashIcon,
  CalendarIcon,
  ClockIcon,
  DocumentTextIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { Article, articleHelpers, articleManagement } from "@/lib/supabase";
import toast from "react-hot-toast";
import LikeButton from "../article/LikeButton";

interface ArticleTableProps {
  articles: Article[];
  onArticleUpdate: () => void;
}

const categoryLabels: { [key: string]: string } = {
  cerpen: "Cerpen",
  puisi: "Puisi",
  artikel: "Konten",
  "cerita-rakyat": "Cerita Rakyat",
  "novel-berseri": "Novel Berseri",
  lainnya: "Lainnya",
};

const categoryColors: { [key: string]: string } = {
  cerpen: "bg-blue-100 text-blue-800",
  puisi: "bg-purple-100 text-purple-800",
  artikel: "bg-green-100 text-green-800",
  "cerita-rakyat": "bg-yellow-100 text-yellow-800",
  "novel-berseri": "bg-red-100 text-red-800",
  lainnya: "bg-gray-100 text-gray-800",
};

export default function ArticleTable({
  articles,
  onArticleUpdate,
}: ArticleTableProps) {
  const [loadingStates, setLoadingStates] = useState<{
    [key: string]: boolean;
  }>({});
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const setLoading = (articleId: string, loading: boolean) => {
    setLoadingStates((prev) => ({ ...prev, [articleId]: loading }));
  };

  const handleTogglePublish = async (article: Article) => {
    setLoading(article.id, true);

    try {
      const result = await articleManagement.togglePublishStatus(
        article.id,
        article.author_id,
        !article.published
      );

      if (result.success) {
        toast.success(
          article.published
            ? "📝 Konten berhasil dijadikan draft"
            : "🚀 Konten berhasil dipublikasikan"
        );
        onArticleUpdate();
      } else {
        toast.error("Gagal mengubah status konten: " + result.error);
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat mengubah status konten");
      console.error("Toggle publish error:", error);
    } finally {
      setLoading(article.id, false);
    }
  };

  const handleDeleteArticle = async (articleId: string, authorId: string) => {
    setLoading(articleId, true);

    try {
      const result = await articleManagement.deleteArticle(articleId, authorId);

      if (result.success) {
        toast.success("🗑️ Konten berhasil dihapus");
        onArticleUpdate();
        setDeleteConfirm(null);
      } else {
        toast.error("Gagal menghapus konten: " + result.error);
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat menghapus konten");
      console.error("Delete article error:", error);
    } finally {
      setLoading(articleId, false);
    }
  };

  if (articles.length === 0) {
    return (
      <div className="bg-white/95 rounded-lg shadow-lg p-8 text-center border border-blue-100">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <DocumentTextIcon className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Belum ada konten
        </h3>
        <p className="text-gray-700 mb-6">
          Mulai menulis konten pertama Anda dan bagikan dengan komunitas
          PaberLand
        </p>
        <Link
          href="/write"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Tulis Konten Baru
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white/95 rounded-lg shadow-lg overflow-hidden border border-blue-100">
      {/* Mobile View */}
      <div className="block md:hidden">
        <div className="divide-y divide-blue-100">
          {articles.map((article) => (
            <div key={article.id} className="p-4">
              <div className="flex items-start space-x-3">
                {/* Article Image */}
                <div className="flex-shrink-0">
                  {article.cover_image ? (
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                      <SignedImage
                        src={article.cover_image}
                        alt={article.title}
                        className="object-cover w-full h-full absolute inset-0"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                      <PencilIcon className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Article Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        categoryColors[article.category] ||
                        categoryColors.lainnya
                      }`}
                    >
                      {categoryLabels[article.category] || "Lainnya"}
                    </span>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        article.published
                          ? "bg-blue-100 text-blue-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {article.published ? "Published" : "Draft"}
                    </span>
                  </div>

                  <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2">
                    {article.title}
                  </h3>

                  <div className="flex items-center space-x-4 text-xs text-gray-600 mb-3">
                    <span className="flex items-center">
                      <EyeIcon className="w-3 h-3 mr-1" />
                      {article.views}
                    </span>
                    <span className="flex items-center">
                      <CalendarIcon className="w-3 h-3 mr-1" />
                      {articleHelpers.formatRelativeTime(article.updated_at)}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    <Link
                      href={`/write?edit=${article.id}`}
                      className="inline-flex items-center px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                    >
                      <PencilIcon className="w-3 h-3 mr-1" />
                      Edit
                    </Link>

                    <button
                      onClick={() => handleTogglePublish(article)}
                      disabled={loadingStates[article.id]}
                      className={`inline-flex items-center px-3 py-1 text-xs rounded-lg transition-colors ${
                        article.published
                          ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                          : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                      } disabled:opacity-50`}
                    >
                      {loadingStates[article.id] ? (
                        <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin mr-1" />
                      ) : article.published ? (
                        <EyeSlashIcon className="w-3 h-3 mr-1" />
                      ) : (
                        <EyeIcon className="w-3 h-3 mr-1" />
                      )}
                      {article.published ? "Unpublish" : "Publish"}
                    </button>

                    <button
                      onClick={() => setDeleteConfirm(article.id)}
                      className="inline-flex items-center px-3 py-1 text-xs bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      <TrashIcon className="w-3 h-3 mr-1" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        <table className="min-w-full divide-y divide-blue-100">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Konten
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Kategori
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Stats
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Terakhir Update
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-blue-100">
            {articles.map((article) => (
              <tr key={article.id} className="hover:bg-blue-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-12 w-12">
                      {article.cover_image ? (
                        <div className="relative h-12 w-12 rounded-lg overflow-hidden">
                          <SignedImage
                            src={article.cover_image}
                            alt={article.title}
                            className="object-cover w-full h-full absolute inset-0"
                          />
                        </div>
                      ) : (
                        <div className="h-12 w-12 bg-gray-200 rounded-lg flex items-center justify-center">
                          <PencilIcon className="h-6 w-6 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 line-clamp-2">
                        {article.title}
                      </div>
                      <div className="text-sm text-gray-600 line-clamp-1">
                        {article.excerpt}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      categoryColors[article.category] || categoryColors.lainnya
                    }`}
                  >
                    {categoryLabels[article.category] || "Lainnya"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      article.published
                        ? "bg-blue-100 text-blue-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {article.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <EyeIcon className="w-4 h-4 mr-1" />
                      {article.views}
                    </div>
                    <div className="flex items-center space-x-3">
                      <LikeButton
                        articleId={article.id}
                        initialLikesCount={article.likes_count}
                        size="sm"
                        showCount={true}
                      />
                      <span>💬 {article.comments_count}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  <div className="flex items-center">
                    <ClockIcon className="w-4 h-4 mr-1" />
                    {articleHelpers.formatRelativeTime(article.updated_at)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    {article.published && (
                      <Link
                        href={`/article/${article.slug}`}
                        className="text-blue-600 hover:text-blue-900"
                        title="Lihat konten"
                      >
                        <EyeIcon className="w-5 h-5" />
                      </Link>
                    )}

                    <Link
                      href={`/write?edit=${article.id}`}
                      className="text-blue-600 hover:text-blue-900"
                      title="Edit konten"
                    >
                      <PencilIcon className="w-5 h-5" />
                    </Link>

                    <button
                      onClick={() => handleTogglePublish(article)}
                      disabled={loadingStates[article.id]}
                      className={`${
                        article.published
                          ? "text-blue-600 hover:text-blue-900"
                          : "text-blue-600 hover:text-blue-900"
                      } disabled:opacity-50`}
                      title={
                        article.published ? "Jadikan draft" : "Publikasikan"
                      }
                    >
                      {loadingStates[article.id] ? (
                        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      ) : article.published ? (
                        <EyeSlashIcon className="w-5 h-5" />
                      ) : (
                        <EyeIcon className="w-5 h-5" />
                      )}
                    </button>

                    <button
                      onClick={() => setDeleteConfirm(article.id)}
                      className="text-red-600 hover:text-red-900"
                      title="Hapus konten"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 border border-blue-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Konfirmasi Hapus Konten
            </h3>
            <p className="text-gray-700 mb-6">
              Apakah Anda yakin ingin menghapus konten ini? Tindakan ini tidak
              dapat dibatalkan.
            </p>
            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 text-gray-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  const article = articles.find((a) => a.id === deleteConfirm);
                  if (article) {
                    handleDeleteArticle(article.id, article.author_id);
                  }
                }}
                disabled={loadingStates[deleteConfirm]}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {loadingStates[deleteConfirm] ? "Menghapus..." : "Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
