"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  PencilIcon,
  TrashIcon,
  EyeIcon,
  EyeSlashIcon,
  CalendarIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { Article, articleHelpers, articleManagement } from "@/lib/supabase";
import toast from "react-hot-toast";
import LikeButton from "../article/LikeButton";

interface ArticleTableProps {
  articles: Article[];
  onArticleUpdate: () => void;
}

const categoryColors: { [key: string]: string } = {
  cerpen: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
  puisi:
    "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
  artikel:
    "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
  "cerita-rakyat":
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
  "novel-berseri":
    "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
  lainnya: "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400",
};

const categoryNames: { [key: string]: string } = {
  cerpen: "Cerpen",
  puisi: "Puisi",
  artikel: "Artikel",
  "cerita-rakyat": "Cerita Rakyat",
  "novel-berseri": "Novel Berseri",
  lainnya: "Lainnya",
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
            ? "📝 Artikel berhasil dijadikan draft"
            : "🚀 Artikel berhasil dipublikasikan"
        );
        onArticleUpdate();
      } else {
        toast.error("Gagal mengubah status artikel: " + result.error);
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat mengubah status artikel");
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
        toast.success("🗑️ Artikel berhasil dihapus");
        onArticleUpdate();
        setDeleteConfirm(null);
      } else {
        toast.error("Gagal menghapus artikel: " + result.error);
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat menghapus artikel");
      console.error("Delete article error:", error);
    } finally {
      setLoading(articleId, false);
    }
  };

  if (articles.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
          <PencilIcon className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Belum ada artikel
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Mulai menulis artikel pertama Anda dan bagikan dengan komunitas
          PaberLand
        </p>
        <Link
          href="/write"
          className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <PencilIcon className="w-5 h-5 mr-2" />
          Tulis Artikel Baru
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      {/* Mobile View */}
      <div className="block md:hidden">
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {articles.map((article) => (
            <div key={article.id} className="p-4">
              <div className="flex items-start space-x-3">
                {/* Article Image */}
                <div className="flex-shrink-0">
                  {article.cover_image ? (
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                      <Image
                        src={article.cover_image}
                        alt={article.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
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
                      {categoryNames[article.category] || "Lainnya"}
                    </span>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        article.published
                          ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                      }`}
                    >
                      {article.published ? "Published" : "Draft"}
                    </span>
                  </div>

                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
                    {article.title}
                  </h3>

                  <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400 mb-3">
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
                          ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                          : "bg-green-100 text-green-700 hover:bg-green-200"
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
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Artikel
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Kategori
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Stats
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Terakhir Update
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {articles.map((article) => (
              <tr
                key={article.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-12 w-12">
                      {article.cover_image ? (
                        <div className="relative h-12 w-12 rounded-lg overflow-hidden">
                          <Image
                            src={article.cover_image}
                            alt={article.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                          <PencilIcon className="h-6 w-6 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">
                        {article.title}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
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
                    {categoryNames[article.category] || "Lainnya"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      article.published
                        ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                    }`}
                  >
                    {article.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
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
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
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
                        className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300"
                        title="Lihat artikel"
                      >
                        <EyeIcon className="w-5 h-5" />
                      </Link>
                    )}

                    <Link
                      href={`/write?edit=${article.id}`}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300"
                      title="Edit artikel"
                    >
                      <PencilIcon className="w-5 h-5" />
                    </Link>

                    <button
                      onClick={() => handleTogglePublish(article)}
                      disabled={loadingStates[article.id]}
                      className={`${
                        article.published
                          ? "text-yellow-600 dark:text-yellow-400 hover:text-yellow-900 dark:hover:text-yellow-300"
                          : "text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300"
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
                      className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                      title="Hapus artikel"
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
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Konfirmasi Hapus Artikel
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Apakah Anda yakin ingin menghapus artikel ini? Tindakan ini tidak
              dapat dibatalkan.
            </p>
            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
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
