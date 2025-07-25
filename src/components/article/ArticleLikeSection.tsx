"use client";
import { useState } from "react";
import LikeButton from "./LikeButton";
import LikesModal from "./LikesModal";
import { EyeIcon, ChatBubbleLeftIcon } from "@heroicons/react/24/outline";

export default function ArticleLikeSection({
  articleId,
  views,
  likesCount,
  commentsCount,
  articleTitle,
}: {
  articleId: string;
  views: number;
  likesCount: number;
  commentsCount: number;
  articleTitle: string;
}) {
  const [showLikesModal, setShowLikesModal] = useState(false);

  return (
    <div className="flex items-center space-x-6">
      <span className="flex items-center text-gray-600 dark:text-gray-400">
        <EyeIcon className="w-5 h-5 mr-2" />
        {views.toLocaleString()} views
      </span>
      <LikeButton
        articleId={articleId}
        initialLikesCount={likesCount}
        size="md"
        showCount={true}
      />
      {likesCount > 0 && (
        <button
          onClick={() => setShowLikesModal(true)}
          className="text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          Lihat siapa yang menyukai
        </button>
      )}
      <span className="flex items-center text-gray-600 dark:text-gray-400">
        <ChatBubbleLeftIcon className="w-5 h-5 mr-2" />
        {commentsCount} komentar
      </span>
      <LikesModal
        isOpen={showLikesModal}
        onClose={() => setShowLikesModal(false)}
        articleId={articleId}
        articleTitle={articleTitle}
      />
    </div>
  );
}
