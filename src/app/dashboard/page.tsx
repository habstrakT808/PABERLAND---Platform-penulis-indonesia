"use client";

import { useAuth } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Link from "next/link";

function DashboardContent() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              🎉 Selamat Datang, {user?.user_metadata?.full_name || "Penulis"}!
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Kelola artikel dan pantau performa tulisan Anda di dashboard ini.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-100 mb-2">
                📝 Total Artikel
              </h3>
              <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                0
              </p>
              <p className="text-indigo-700 dark:text-indigo-300 text-sm">
                Artikel yang ditulis
              </p>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
                👁️ Total Views
              </h3>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                0
              </p>
              <p className="text-green-700 dark:text-green-300 text-sm">
                Pembaca artikel
              </p>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2">
                ❤️ Total Likes
              </h3>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                0
              </p>
              <p className="text-purple-700 dark:text-purple-300 text-sm">
                Apresiasi pembaca
              </p>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
                💬 Total Komentar
              </h3>
              <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
                0
              </p>
              <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                Interaksi pembaca
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Quick Actions */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                🚀 Aksi Cepat
              </h2>
              <div className="space-y-4">
                <Link
                  href="/write"
                  className="block bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-lg transition-colors"
                >
                  <h3 className="font-semibold mb-2">✍️ Tulis Artikel Baru</h3>
                  <p className="text-indigo-100">
                    Bagikan ide dan cerita Anda dengan komunitas
                  </p>
                </Link>
                <Link
                  href="/my-articles"
                  className="block bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg transition-colors"
                >
                  <h3 className="font-semibold mb-2">📚 Kelola Artikel</h3>
                  <p className="text-purple-100">
                    Edit atau hapus artikel yang sudah ditulis
                  </p>
                </Link>
                <Link
                  href="/profile"
                  className="block bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg transition-colors"
                >
                  <h3 className="font-semibold mb-2">👤 Edit Profil</h3>
                  <p className="text-green-100">
                    Perbarui informasi profil penulis Anda
                  </p>
                </Link>
              </div>
            </div>

            {/* Profile Info */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                👤 Informasi Profil
              </h2>
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                    {user?.user_metadata?.full_name?.charAt(0) ||
                      user?.email?.charAt(0) ||
                      "U"}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {user?.user_metadata?.full_name || "Nama belum diisi"}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {user?.email}
                    </p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Nomor HP:</strong>{" "}
                    {user?.user_metadata?.phone || "Belum diisi"}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Bergabung:</strong>{" "}
                    {new Date(user?.created_at || "").toLocaleDateString(
                      "id-ID"
                    )}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Status:</strong>
                    <span className="ml-2 px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-xs">
                      Aktif
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
