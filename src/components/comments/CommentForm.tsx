"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { commentHelpers } from "@/lib/supabase";
import toast from "react-hot-toast";
import { PaperAirplaneIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface CommentFormProps {
  articleId: string;
  parentId?: string;
  placeholder?: string;
  onCommentAdded: () => void;
  onCancel?: () => void;
  autoFocus?: boolean;
}

export default function CommentForm({
  articleId,
  parentId,
  placeholder = "Tulis komentar Anda...",
  onCommentAdded,
  onCancel,
  autoFocus = false,
}: CommentFormProps) {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      toast.error("Komentar tidak boleh kosong");
      return;
    }

    if (!user) {
      toast.error("Anda harus login untuk berkomentar");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await commentHelpers.addComment(
        articleId,
        user.id,
        content,
        parentId
      );

      if (result.success) {
        toast.success(
          parentId
            ? "💬 Balasan berhasil ditambahkan!"
            : "💬 Komentar berhasil ditambahkan!"
        );
        setContent("");
        onCommentAdded();
        if (onCancel) onCancel();
      } else {
        toast.error("Gagal menambahkan komentar: " + result.error);
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
      toast.error("Terjadi kesalahan saat menambahkan komentar");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="bg-blue-50 rounded-lg p-4 text-center border border-blue-100">
        <p className="text-gray-700 mb-4">Anda harus login untuk berkomentar</p>
        <a
          href="/auth/login"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Login untuk Berkomentar
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          rows={parentId ? 3 : 4}
          className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500 resize-none"
          disabled={isSubmitting}
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          {content.length}/1000 karakter
        </div>

        <div className="flex items-center space-x-3">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className="px-4 py-2 text-gray-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors disabled:opacity-50 border border-blue-200"
            >
              <XMarkIcon className="w-4 h-4 mr-2 inline" />
              Batal
            </button>
          )}

          <button
            type="submit"
            disabled={!content.trim() || isSubmitting || content.length > 1000}
            className="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Mengirim...
              </>
            ) : (
              <>
                <PaperAirplaneIcon className="w-4 h-4 mr-2" />
                {parentId ? "Balas" : "Kirim Komentar"}
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
