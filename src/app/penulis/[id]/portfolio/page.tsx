"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { portfolioHelpers } from "@/lib/supabase";
import {
  BookOpenIcon,
  CalendarIcon,
  TagIcon,
  TrophyIcon,
  ArrowTopRightOnSquareIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "@/contexts/AuthContext";
import SignedImage from "@/components/common/SignedImage";
import { debugPortfolioWorks, cleanInvalidCoverImages } from "@/lib/supabase";
import toast from "react-hot-toast";

export default function PortfolioPage() {
  const params = useParams();
  const { user } = useAuth();
  const [portfolioWorks, setPortfolioWorks] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const authorId = params.id as string;

  const handleDeleteWork = async (workId: string) => {
    if (!user || user.id !== authorId) return;

    if (!confirm("Apakah Anda yakin ingin menghapus karya ini?")) return;

    try {
      const result = await portfolioHelpers.deletePortfolioWork(
        workId,
        user.id
      );
      if (result.success) {
        toast.success("Karya berhasil dihapus!");
        fetchPortfolioData(); // reload data
      } else {
        toast.error("Gagal menghapus karya: " + result.error);
      }
    } catch (error) {
      console.error("Error deleting work:", error);
      toast.error("Terjadi kesalahan saat menghapus karya");
    }
  };

  useEffect(() => {
    if (authorId) {
      fetchPortfolioData();
    }
    // Deteksi mode responsif
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [authorId]);

  const fetchPortfolioData = async () => {
    try {
      const [works, portfolioStats] = await Promise.all([
        portfolioHelpers.getAuthorPortfolio(authorId),
        portfolioHelpers.getPortfolioStats(authorId),
      ]);

      setPortfolioWorks(works);
      setStats(portfolioStats);

      // Debug: Check portfolio works and their cover images
      await debugPortfolioWorks(authorId);

      // Clean invalid cover images
      await cleanInvalidCoverImages(authorId);
    } catch (error) {
      console.error("Error fetching portfolio data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-700">Memuat portofolio...</p>
        </div>
      </div>
    );
  }

  if (portfolioWorks.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            {!isMobile && <div className="text-6xl mb-4">📚</div>}
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Belum ada karya dalam portofolio
            </h3>
            <p className="text-gray-600 mb-6">
              Penulis ini belum menambahkan karya ke dalam portofolio mereka.
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                href={`/penulis/${authorId}`}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                ← Kembali
              </Link>
              {user && user.id === authorId && (
                <Link
                  href="/portfolio/add"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Tambah Karya
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const author = portfolioWorks[0]?.profiles;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {!isMobile && "📚 "}Portofolio Karya
              </h1>
              <p className="text-gray-600">
                Koleksi karya {author?.full_name || "Penulis"}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              {user && user.id === authorId && (
                <Link
                  href="/portfolio/add"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Tambah Karya
                </Link>
              )}
              <Link
                href={`/penulis/${authorId}`}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                ← Kembali
              </Link>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-blue-100 p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {stats.total}
              </div>
              <div className="text-sm text-gray-600">Total Karya</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-green-100 p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {stats.published}
              </div>
              <div className="text-sm text-gray-600">Terbit</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-yellow-100 p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {stats.completed}
              </div>
              <div className="text-sm text-gray-600">Selesai</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-purple-100 p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {stats.inProgress}
              </div>
              <div className="text-sm text-gray-600">Sedang Dikerjakan</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 text-center">
              <div className="text-2xl font-bold text-gray-600">
                {stats.unpublished}
              </div>
              <div className="text-sm text-gray-600">Draft</div>
            </div>
          </div>
        </div>

        {/* Portfolio Works Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioWorks.map((work) => (
            <div
              key={work.id}
              className="bg-white rounded-xl shadow-lg border border-blue-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Cover Image */}
              {work.cover_image && (
                <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 relative overflow-hidden">
                  <SignedImage
                    src={work.cover_image}
                    alt={work.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        work.status === "published"
                          ? "bg-green-100 text-green-800"
                          : work.status === "completed"
                          ? "bg-blue-100 text-blue-800"
                          : work.status === "in_progress"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {portfolioHelpers.getStatusLabel(work.status)}
                    </span>
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                {/* Category Badge */}
                <div className="mb-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {portfolioHelpers.getCategoryLabel(work.category)}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                  {work.title}
                </h3>

                {/* Description */}
                {work.description && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {work.description}
                  </p>
                )}

                {/* Metadata */}
                <div className="space-y-2 mb-4">
                  {work.year_created && (
                    <div className="flex items-center text-sm text-gray-500">
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      {work.year_created}
                    </div>
                  )}

                  {work.genre && (
                    <div className="flex items-center text-sm text-gray-500">
                      <BookOpenIcon className="w-4 h-4 mr-2" />
                      {work.genre}
                    </div>
                  )}

                  {work.publisher && (
                    <div className="flex items-center text-sm text-gray-500">
                      <PencilIcon className="w-4 h-4 mr-2" />
                      {work.publisher}
                    </div>
                  )}

                  {work.isbn && (
                    <div className="flex items-center text-sm text-gray-500">
                      <TagIcon className="w-4 h-4 mr-2" />
                      ISBN: {work.isbn}
                    </div>
                  )}
                </div>

                {/* Awards */}
                {work.awards && work.awards.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <TrophyIcon className="w-4 h-4 mr-2" />
                      Penghargaan:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {work.awards.map((award: any, index: number) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"
                        >
                          🏆 {award}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                {work.tags && work.tags.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {work.tags.map((tag: any, index: number) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* External Link */}
                {work.external_link && (
                  <div className="mt-4">
                    <a
                      href={work.external_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <ArrowTopRightOnSquareIcon className="w-4 h-4 mr-1" />
                      Lihat Karya
                    </a>
                  </div>
                )}

                {/* Created Date */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500">
                    Ditambahkan:{" "}
                    {portfolioHelpers.formatPortfolioDate(work.created_at)}
                  </p>
                </div>

                {/* Edit/Delete Buttons */}
                {user && user.id === authorId && (
                  <div className="mt-4 flex items-center space-x-2">
                    <Link
                      href={`/portfolio/edit/${work.id}`}
                      className="inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      <PencilIcon className="w-4 h-4 mr-1" />
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteWork(work.id)}
                      className="inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
                    >
                      <TrashIcon className="w-4 h-4 mr-1" />
                      Hapus
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {portfolioWorks.length === 0 && (
          <div className="text-center py-12">
            {!isMobile && <div className="text-6xl mb-4">📚</div>}
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Belum ada karya dalam portofolio
            </h3>
            <p className="text-gray-600 mb-6">
              Penulis ini belum menambahkan karya ke dalam portofolio mereka.
            </p>
            <Link
              href={`/penulis/${params.id}`}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              ← Kembali
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
