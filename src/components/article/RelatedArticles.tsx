"use client";

import SignedImage from "@/components/common/SignedImage";
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
  currentCategory?: string;
}

export default function RelatedArticles({
  articles,
  title = "Artikel Terkait",
  currentCategory,
}: RelatedArticlesProps) {
  if (articles.length === 0) {
    return null;
  }

  // Determine the category for the "View More" link
  const getCategoryLink = () => {
    if (currentCategory) {
      return `/kategori/${currentCategory}`;
    }
    // If no current category, use the first article's category
    if (articles.length > 0) {
      return `/kategori/${articles[0].category}`;
    }
    // Fallback to general categories page
    return `/kategori`;
  };

  return (
    <div className="bg-white/95 rounded-lg shadow-lg p-6 border border-blue-100">
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
        <span className="w-1 h-6 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full mr-3"></span>
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
                      <SignedImage
                        src={article.cover_image}
                        alt={article.title}
                        className="object-cover group-hover:scale-105 transition-transform duration-200 w-full h-full absolute inset-0"
                      />
                    </div>
                  ) : (
                    <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
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
                  <h4 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {article.title}
                  </h4>

                  <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                    {article.excerpt}
                  </p>

                  {/* Article Meta */}
                  <div className="flex items-center space-x-3 text-xs text-gray-500">
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
      <div className="mt-6 pt-4 border-t border-blue-100">
        <Link
          href={getCategoryLink()}
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
        >
          Lihat konten lainnya →
        </Link>
      </div>
    </div>
  );
}
