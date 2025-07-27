"use client";

import {
  CalendarIcon,
  ClockIcon,
  EyeIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import { articleHelpers } from "@/lib/supabase";
import LikeButton from "./LikeButton";

interface ArticleMetadataProps {
  category: string;
  publishedAt: string;
  views: number;
  likesCount: number;
  commentsCount: number;
  readingTime: number;
  className?: string;
}

const categoryIcons: { [key: string]: string } = {
  cerpen: "📖",
  puisi: "🎭",
  artikel: "📰",
  "cerita-rakyat": "🏛️",
  "novel-berseri": "📚",
  lainnya: "✨",
};

const categoryNames: { [key: string]: string } = {
  cerpen: "Cerpen",
  puisi: "Puisi",
  artikel: "Artikel",
  "cerita-rakyat": "Cerita Rakyat",
  "novel-berseri": "Novel Berseri",
  lainnya: "Lainnya",
};

export default function ArticleMetadata({
  category,
  publishedAt,
  views,
  likesCount,
  commentsCount,
  readingTime,
  className = "",
}: ArticleMetadataProps) {
  return (
    <div
      className={`flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 ${className}`}
    >
      {/* Category */}
      <div className="flex items-center space-x-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full">
        <span>{categoryIcons[category] || "✨"}</span>
        <span className="font-medium">
          {categoryNames[category] || "Lainnya"}
        </span>
      </div>

      {/* Publish Date */}
      <div className="flex items-center space-x-1">
        <CalendarIcon className="w-4 h-4" />
        <span>{articleHelpers.formatDate(publishedAt)}</span>
      </div>

      {/* Reading Time */}
      <div className="flex items-center space-x-1">
        <ClockIcon className="w-4 h-4" />
        <span>{readingTime} menit baca</span>
      </div>

      {/* Views */}
      <div className="flex items-center space-x-1">
        <EyeIcon className="w-4 h-4" />
        <span>{views.toLocaleString()}</span>
      </div>

      {/* Likes */}
      <div className="flex items-center space-x-1">
        <HeartIcon className="w-4 h-4" />
        <span>{likesCount.toLocaleString()}</span>
      </div>

      {/* Comments */}
      <div className="flex items-center space-x-1">
        <ChatBubbleLeftIcon className="w-4 h-4" />
        <span>{commentsCount.toLocaleString()}</span>
      </div>
    </div>
  );
}
