"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { articleManagement } from "@/lib/supabase";
import toast from "react-hot-toast";
import { Article } from "@/lib/supabase";
import {
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/outline";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import WriteArticleForm from "@/components/editor/WriteArticleForm";

function WriteArticleContent() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");
  const [editArticle, setEditArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);

  // Deteksi mode responsif
  useEffect(() => {
    const checkScreenSize = () => {
      // Gunakan breakpoint yang lebih kecil untuk mobile yang benar-benar kecil
      // MacBook Air 1280x800 tidak akan terdeteksi sebagai mobile
      const isMobileView = window.innerWidth < 640; // sm breakpoint (640px)
      setIsMobile(isMobileView);
      setScreenWidth(window.innerWidth);

      // Debug: log ukuran layar
      console.log(
        `Screen width: ${window.innerWidth}px, isMobile: ${isMobileView}`
      );
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

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
          "Konten tidak ditemukan atau Anda tidak memiliki akses untuk mengeditnya"
        );
      }
    } catch (error) {
      console.error("Error fetching article for edit:", error);
      toast.error("Gagal memuat konten untuk diedit");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-700">Memuat konten untuk diedit...</p>
        </div>
      </div>
    );
  }

  // Tampilkan pesan untuk mode responsif
  if (isMobile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-pink-50 flex items-center justify-center p-4">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <DevicePhoneMobileIcon className="w-16 h-16 text-red-500" />
                <ComputerDesktopIcon className="w-8 h-8 text-blue-600 absolute -bottom-2 -right-2" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              📱 Mode Responsif Terdeteksi
            </h1>

            <div className="space-y-4 text-gray-700">
              <p>
                Editor penulisan konten membutuhkan layar yang lebih besar untuk
                memberikan pengalaman menulis yang optimal. Silakan gunakan
                perangkat dengan layar yang lebih lebar untuk mengakses area
                penulisan yang nyaman.
              </p>

              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <p className="font-semibold text-blue-800 mb-2">
                  💡 Mohon buka di layar yang lebih besar (640px atau lebih
                  lebar)
                </p>
                <p className="text-sm text-blue-700">
                  Editor TinyMCE membutuhkan ruang yang cukup untuk toolbar dan
                  area penulisan yang nyaman.
                </p>
              </div>

              <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  <strong>Tips:</strong> Gunakan laptop, desktop, atau tablet
                  dalam orientasi landscape untuk pengalaman menulis yang
                  optimal.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                Halaman ini akan otomatis menampilkan editor saat dibuka di
                layar yang lebih besar.
              </p>
              <p className="text-xs text-gray-400 mt-2">
                Debug: Layar terdeteksi {screenWidth}px
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-pink-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {editArticle ? "✏️ Edit Konten" : "✍️ Tulis Konten Baru"}
          </h1>
          <p className="text-gray-800">
            {editArticle
              ? "Perbarui konten Anda dan bagikan kembali dengan komunitas"
              : "Bagikan Cerita dan Karya Terbaik Kamu Supaya Dunia Melihat."}
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
