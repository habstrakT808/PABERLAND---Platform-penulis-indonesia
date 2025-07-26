import Link from "next/link";
import { HomeIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-pink-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
            <svg
              className="w-10 h-10 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Halaman Tidak Ditemukan
          </h1>

          <p className="text-gray-600 mb-8">
            Maaf, halaman yang Anda cari tidak ditemukan. Silakan periksa
            kembali URL atau kembali ke beranda.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center space-x-2 w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <HomeIcon className="w-5 h-5" />
            <span>Kembali ke Beranda</span>
          </Link>

          <Link
            href="/kategori"
            className="inline-flex items-center justify-center space-x-2 w-full px-6 py-3 border border-blue-200 text-gray-700 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <MagnifyingGlassIcon className="w-5 h-5" />
            <span>Jelajahi Kategori</span>
          </Link>
        </div>

        <div className="mt-8 pt-8 border-t border-blue-100">
          <p className="text-sm text-gray-500">
            Butuh bantuan?{" "}
            <Link href="/contact" className="text-blue-600 hover:underline">
              Hubungi kami
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
