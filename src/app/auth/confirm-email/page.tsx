"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import toast from "react-hot-toast";

export default function ConfirmEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClientComponentClient();
  const [isLoading, setIsLoading] = useState(true);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleEmailConfirmation = async () => {
      try {
        const token = searchParams.get("token");
        const type = searchParams.get("type");

        if (!token) {
          setError("Token konfirmasi tidak ditemukan");
          setIsLoading(false);
          return;
        }

        console.log("🔍 Processing email confirmation...");
        console.log("📋 Token type:", type);

        // Exchange the token for a session
        const { data, error } = await supabase.auth.verifyOtp({
          token_hash: token,
          type: "signup",
        });

        if (error) {
          console.error("❌ Email confirmation error:", error);
          setError("Gagal mengkonfirmasi email. Silakan coba lagi.");
        } else if (data.user) {
          console.log("✅ Email confirmed successfully:", data.user.email);
          setIsConfirmed(true);
          toast.success("Email berhasil dikonfirmasi!");
        }
      } catch (err) {
        console.error("❌ Unexpected error:", err);
        setError("Terjadi kesalahan sistem. Silakan coba lagi.");
      } finally {
        setIsLoading(false);
      }
    };

    handleEmailConfirmation();
  }, [searchParams, supabase.auth]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-md w-full mx-auto p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Memproses Verifikasi...
            </h2>
            <p className="text-gray-600">
              Mohon tunggu sebentar, kami sedang memverifikasi email Anda.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-pink-50">
        <div className="max-w-md w-full mx-auto p-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">❌</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Verifikasi Gagal
            </h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <div className="space-y-3">
              <Link
                href="/auth/register"
                className="block w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Daftar Ulang
              </Link>
              <Link
                href="/"
                className="block w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Kembali ke Beranda
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isConfirmed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="max-w-md w-full mx-auto p-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            {/* Success Icon */}
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">✅</span>
            </div>

            {/* Success Message */}
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              Verifikasi Sukses!
            </h1>

            <div className="bg-green-50 border-l-4 border-green-400 p-6 mb-8 rounded-r-lg">
              <p className="text-lg text-gray-800 leading-relaxed">
                <strong>
                  Sekarang coba login kembali menggunakan akun yang anda buat.
                </strong>
              </p>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8 rounded-r-lg">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <span className="text-blue-500 text-lg">💡</span>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">
                    Akun Anda Sudah Aktif
                  </h3>
                  <p className="text-sm text-blue-700 mt-1">
                    Email telah berhasil diverifikasi. Anda dapat langsung login
                    dengan email dan password yang telah didaftarkan.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <Link
              href="/auth/login"
              className="inline-block bg-blue-600 text-white py-4 px-8 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              🔐 Login Sekarang
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
