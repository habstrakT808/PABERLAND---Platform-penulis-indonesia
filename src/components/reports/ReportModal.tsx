// src/components/reports/ReportModal.tsx
"use client";

import { useState } from "react";
import {
  XMarkIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  contentType: "article" | "comment" | "user";
  contentId: string;
  contentTitle?: string;
}

export default function ReportModal({
  isOpen,
  onClose,
  contentType,
  contentId,
  contentTitle,
}: ReportModalProps) {
  const { user } = useAuth();
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const reasons = [
    {
      value: "spam",
      label: "🚫 Spam",
      description: "Konten berulang atau tidak relevan",
    },
    {
      value: "inappropriate",
      label: "⚠️ Konten Tidak Pantas",
      description: "Konten yang melanggar norma",
    },
    {
      value: "harassment",
      label: "😡 Pelecehan",
      description: "Bullying atau intimidasi",
    },
    {
      value: "copyright",
      label: "©️ Pelanggaran Hak Cipta",
      description: "Penggunaan konten tanpa izin",
    },
    {
      value: "other",
      label: "❓ Lainnya",
      description: "Alasan lain yang perlu ditinjau",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || !reason) {
      toast.error("Silakan pilih alasan laporan");
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase.from("content_reports").insert([
        {
          reporter_id: user.id,
          content_type: contentType,
          content_id: contentId,
          reason,
          description: description.trim() || null,
        },
      ]);

      if (error) {
        throw error;
      }

      toast.success(
        "Laporan berhasil dikirim! Tim moderasi akan meninjau dalam 24 jam."
      );
      onClose();
      setReason("");
      setDescription("");
    } catch (error) {
      console.error("Error submitting report:", error);
      toast.error("Gagal mengirim laporan. Silakan coba lagi.");
    } finally {
      setSubmitting(false);
    }
  };

  const getContentTypeLabel = () => {
    switch (contentType) {
      case "article":
        return "artikel";
      case "comment":
        return "komentar";
      case "user":
        return "user";
      default:
        return "konten";
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <ExclamationTriangleIcon className="w-6 h-6 text-red-500" />
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Laporkan {getContentTypeLabel()}
              </h3>
              {contentTitle && (
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-64">
                  {contentTitle}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <XMarkIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Bantu kami menjaga kualitas platform dengan melaporkan konten yang
              melanggar aturan.
            </p>

            {/* Reason Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Pilih alasan laporan:
              </label>
              <div className="space-y-2">
                {reasons.map((reasonOption) => (
                  <label
                    key={reasonOption.value}
                    className={`flex items-start space-x-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                      reason === reasonOption.value
                        ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                        : "border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    <input
                      type="radio"
                      name="reason"
                      value={reasonOption.value}
                      checked={reason === reasonOption.value}
                      onChange={(e) => setReason(e.target.value)}
                      className="mt-1 text-red-600 focus:ring-red-500"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {reasonOption.label}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {reasonOption.description}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Deskripsi tambahan (opsional):
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Jelaskan lebih detail tentang masalah yang Anda laporkan..."
                rows={4}
                maxLength={500}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {description.length}/500 karakter
              </div>
            </div>

            {/* Guidelines */}
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                📋 Panduan Pelaporan:
              </h4>
              <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                <li>• Laporan akan ditinjau dalam 24 jam</li>
                <li>• Laporan palsu dapat mengakibatkan sanksi</li>
                <li>• Identitas pelapor akan dirahasiakan</li>
                <li>• Kami akan mengirim notifikasi hasil peninjauan</li>
              </ul>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
            >
              Batal
            </button>

            <button
              type="submit"
              disabled={!reason || submitting}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Mengirim...
                </div>
              ) : (
                "Kirim Laporan"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
