"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ClockIcon,
  EyeIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
} from "@heroicons/react/24/outline";
import { ArticleSummary, articleHelpers } from "@/lib/supabase";
import LikeButton from "./LikeButton";

interface RelatedArticlesProps {
  articles: ArticleSummary[];
  title?: string;
}

export default function RelatedArticles({
  articles,
  title = "Artikel Terkait",
}: RelatedArticlesProps) {
  if (articles.length === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
        <span className="w-1 h-6 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full mr-3"></span>
        {title}
      </h3>

      <div className="space-y-6">
        {articles.map((article) => (
          <article key={article.id} className="group">
            <Link href={`/article/${article.slug}`} className="block">
              <div className="flex space-x-4">
                {/* Article Image */}
                <div className="flex-shrink-0">
                  {article.cover_image ? (
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                      <Image
                        src={article.cover_image}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                  ) : (
                    <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">
                        {article.category === "cerpen" && "📖"}
                        {article.category === "puisi" && "🎭"}
                        {article.category === "artikel" && "📰"}
                        {article.category === "cerita-rakyat" && "🏛️"}
                        {article.category === "novel-berseri" && "📚"}
                        {![
                          "cerpen",
                          "puisi",
                          "artikel",
                          "cerita-rakyat",
                          "novel-berseri",
                        ].includes(article.category) && "✨"}
                      </span>
                    </div>
                  )}
                </div>

                {/* Article Content */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-2 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {article.title}
                  </h4>

                  <p className="text-xs text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                    {article.excerpt}
                  </p>

                  {/* Article Meta */}
                  <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <ClockIcon className="w-3 h-3" />
                      <span>
                        {articleHelpers.formatRelativeTime(article.created_at)}
                      </span>
                    </div>

                    <div className="flex items-center space-x-1">
                      <EyeIcon className="w-3 h-3" />
                      <span>{article.views}</span>
                    </div>

                    <div className="flex items-center space-x-1">
                      <LikeButton
                        articleId={article.id}
                        initialLikesCount={article.likes_count}
                        size="sm"
                        showCount={true}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>

      {/* View More Button */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <Link
          href="/articles"
          className="inline-flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
        >
          Lihat artikel lainnya →
        </Link>
      </div>
    </div>
  );
}
