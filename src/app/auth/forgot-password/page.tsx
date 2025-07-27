"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });
      if (error) {
        setError(error.message || "Gagal mengirim email reset password.");
      } else {
        setSuccess(
          "Link reset password telah dikirim ke email Anda. Silakan cek kotak masuk/spam."
        );
      }
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan. Coba lagi nanti.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-pink-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">
          Lupa Password?
        </h1>
        <p className="text-gray-700 mb-6 text-center">
          Masukkan email akun Anda dan kami akan mengirimkan link untuk mereset
          password.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-900 placeholder-gray-400"
              placeholder="you@email.com"
              disabled={loading}
            />
          </div>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          {success && <div className="text-green-600 text-sm">{success}</div>}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:opacity-60"
            disabled={loading || !email}
          >
            {loading ? "Mengirim..." : "Kirim Link Reset Password"}
          </button>
        </form>
        <div className="mt-6 flex justify-between text-sm">
          <Link href="/auth/login" className="text-blue-600 hover:underline">
            ← Kembali ke Login
          </Link>
          <Link href="/auth/register" className="text-blue-600 hover:underline">
            Daftar Akun Baru
          </Link>
        </div>
      </div>
    </div>
  );
}
