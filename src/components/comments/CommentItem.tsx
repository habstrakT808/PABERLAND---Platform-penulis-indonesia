"use client";

import { useState } from "react";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { Comment, commentHelpers } from "@/lib/supabase";
import CommentForm from "./CommentForm";
import toast from "react-hot-toast";
import {
  ChatBubbleLeftIcon,
  TrashIcon,
  PencilIcon,
  UserIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import ReportButton from "@/components/reports/ReportButton";

interface CommentItemProps {
  comment: Comment;
  articleId: string;
  onCommentUpdate: () => void;
  depth?: number;
}

export default function CommentItem({
  comment,
  articleId,
  onCommentUpdate,
  depth = 0,
}: CommentItemProps) {
  const { user } = useAuth();
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showReplies, setShowReplies] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const isAuthor = user?.id === comment.author_id;
  const hasReplies = comment.replies && comment.replies.length > 0;
  const maxDepth = 3; // Maximum nesting depth

  const handleDelete = async () => {
    if (!confirm("Apakah Anda yakin ingin menghapus komentar ini?")) {
      return;
    }

    setIsDeleting(true);

    try {
      const result = await commentHelpers.deleteComment(
        comment.id,
        comment.author_id
      );

      if (result.success) {
        toast.success("🗑️ Komentar berhasil dihapus");
        onCommentUpdate();
      } else {
        toast.error("Gagal menghapus komentar: " + result.error);
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error("Terjadi kesalahan saat menghapus komentar");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdate = async () => {
    if (!editContent.trim()) {
      toast.error("Komentar tidak boleh kosong");
      return;
    }

    setIsUpdating(true);

    try {
      const result = await commentHelpers.updateComment(
        comment.id,
        comment.author_id,
        editContent
      );

      if (result.success) {
        toast.success("✏️ Komentar berhasil diperbarui");
        setIsEditing(false);
        onCommentUpdate();
      } else {
        toast.error("Gagal memperbarui komentar: " + result.error);
      }
    } catch (error) {
      console.error("Error updating comment:", error);
      toast.error("Terjadi kesalahan saat memperbarui komentar");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleReplyAdded = () => {
    setShowReplyForm(false);
    setShowReplies(true);
    onCommentUpdate();
  };

  return (
    <div className={`${depth > 0 ? "ml-8 md:ml-12" : ""}`}>
      <div className="bg-white/95 rounded-lg border border-blue-100 p-4 mb-4">
        {/* Comment Header */}
        <div className="flex items-start space-x-3 mb-3">
          {/* Avatar */}
          <div className="flex-shrink-0">
            {comment.profiles?.avatar_url ? (
              <Image
                src={comment.profiles.avatar_url}
                alt={comment.profiles.full_name}
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <UserIcon className="w-5 h-5 text-white" />
              </div>
            )}
          </div>

          {/* Comment Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h4 className="font-semibold text-gray-900 text-sm">
                {comment.profiles?.full_name || "Pengguna Anonim"}
              </h4>
              <span className="text-xs text-gray-600">
                {commentHelpers.formatCommentDate(comment.created_at)}
              </span>
              {comment.updated_at !== comment.created_at && (
                <span className="text-xs text-gray-500 italic">(diedit)</span>
              )}
            </div>

            {/* Comment Content */}
            {isEditing ? (
              <div className="space-y-3">
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 resize-none"
                  disabled={isUpdating}
                />
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleUpdate}
                    disabled={!editContent.trim() || isUpdating}
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {isUpdating ? "Menyimpan..." : "Simpan"}
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setEditContent(comment.content);
                    }}
                    disabled={isUpdating}
                    className="px-3 py-1 bg-blue-50 text-gray-700 text-sm rounded-lg hover:bg-blue-100 transition-colors border border-blue-200"
                  >
                    Batal
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                {comment.content}
              </div>
            )}
          </div>
        </div>

        {/* Comment Actions */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-blue-100">
          <div className="flex items-center space-x-4">
            {/* Reply Button */}
            {depth < maxDepth && (
              <button
                onClick={() => setShowReplyForm(!showReplyForm)}
                className="flex items-center space-x-1 text-sm text-gray-500 hover:text-blue-600 transition-colors"
              >
                <ChatBubbleLeftIcon className="w-4 h-4" />
                <span>Balas</span>
              </button>
            )}

            {/* Report Button */}
            <ReportButton
              contentType="comment"
              contentId={comment.id}
              className="text-xs"
            />

            {/* Show/Hide Replies */}
            {hasReplies && (
              <button
                onClick={() => setShowReplies(!showReplies)}
                className="flex items-center space-x-1 text-sm text-gray-500 hover:text-blue-600 transition-colors"
              >
                {showReplies ? (
                  <ChevronUpIcon className="w-4 h-4" />
                ) : (
                  <ChevronDownIcon className="w-4 h-4" />
                )}
                <span>
                  {showReplies ? "Sembunyikan" : "Tampilkan"}{" "}
                  {comment.reply_count} balasan
                </span>
              </button>
            )}
          </div>

          {/* Author Actions */}
          {isAuthor && (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsEditing(true)}
                className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                title="Edit komentar"
              >
                <PencilIcon className="w-4 h-4" />
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="p-1 text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50"
                title="Hapus komentar"
              >
                {isDeleting ? (
                  <div className="w-4 h-4 border border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  <TrashIcon className="w-4 h-4" />
                )}
              </button>
            </div>
          )}
        </div>

        {/* Reply Form */}
        {showReplyForm && (
          <div className="mt-4 pt-4 border-t border-blue-100">
            <CommentForm
              articleId={articleId}
              parentId={comment.id}
              placeholder="Tulis balasan Anda..."
              onCommentAdded={handleReplyAdded}
              onCancel={() => setShowReplyForm(false)}
              autoFocus={true}
            />
          </div>
        )}
      </div>

      {/* Nested Replies */}
      {hasReplies && showReplies && (
        <div className="space-y-0">
          {comment.replies!.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              articleId={articleId}
              onCommentUpdate={onCommentUpdate}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
