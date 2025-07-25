import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { EyeIcon, ChatBubbleLeftIcon } from "@heroicons/react/24/outline";

import { articleHelpers } from "@/lib/supabase";
import ArticleContent from "@/components/article/ArticleContent";
import ArticleMetadata from "@/components/article/ArticleMetadata";
import AuthorProfile from "@/components/article/AuthorProfile";
import RelatedArticles from "@/components/article/RelatedArticles";
import SocialShare from "@/components/article/SocialShare";
import CommentsSection from "@/components/comments/CommentsSection"; // �� Import baru
import ArticleLikeSection from "@/components/article/ArticleLikeSection";

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

// Generate metadata for SEO - sama seperti sebelumnya
export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const article = await articleHelpers.getArticle(params.slug);

  if (!article) {
    return {
      title: "Artikel Tidak Ditemukan - PaberLand",
      description: "Artikel yang Anda cari tidak ditemukan atau telah dihapus.",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const articleUrl = `${baseUrl}/article/${article.slug}`;

  return {
    title: `${article.title} - PaberLand`,
    description: article.excerpt,
    keywords: `${article.category}, artikel, PaberLand, ${article.profiles?.full_name}`,
    authors: [{ name: article.profiles?.full_name || "Penulis PaberLand" }],
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: articleUrl,
      siteName: "PaberLand",
      images: article.cover_image
        ? [
            {
              url: article.cover_image,
              width: 1200,
              height: 630,
              alt: article.title,
            },
          ]
        : [],
      locale: "id_ID",
      type: "article",
      publishedTime: article.created_at,
      modifiedTime: article.updated_at,
      authors: [article.profiles?.full_name || "Penulis PaberLand"],
      section: article.category,
      tags: [article.category, "PaberLand", "artikel"],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: article.cover_image ? [article.cover_image] : [],
      creator: `@${
        article.profiles?.full_name?.replace(/\s+/g, "") || "PaberLand"
      }`,
    },
    alternates: {
      canonical: articleUrl,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  // Fetch article data
  const article = await articleHelpers.getArticle(params.slug);

  if (!article || !article.published) {
    notFound();
  }

  // Increment view count (fire and forget)
  articleHelpers.incrementViews(article.id).catch(console.error);

  // Fetch related data
  const [relatedArticles, authorArticles] = await Promise.all([
    articleHelpers.getRelatedArticles(article.id, article.category, 4),
    articleHelpers.getAuthorArticles(article.author_id, article.id, 3),
  ]);

  const readingTime = articleHelpers.calculateReadingTime(article.content);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const articleUrl = `${baseUrl}/article/${article.slug}`;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span>Kembali ke beranda</span>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {" "}
            {/* 👈 Tambah space-y-8 */}
            <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              {/* Cover Image */}
              {article.cover_image && (
                <div className="relative h-64 md:h-80 lg:h-96">
                  <Image
                    src={article.cover_image}
                    alt={article.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
              )}

              {/* Article Header */}
              <div className="p-6 md:p-8">
                <header className="mb-8">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                    {article.title}
                  </h1>

                  {/* Article Metadata Section dengan Like System */}
                  <ArticleLikeSection
                    articleId={article.id}
                    views={article.views}
                    likesCount={article.likes_count}
                    commentsCount={article.comments_count}
                    articleTitle={article.title}
                  />
                  {/* End Article Metadata Section */}

                  {/* Author Info */}
                  {article.profiles && (
                    <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg mt-6">
                      <div className="relative">
                        {article.profiles.avatar_url ? (
                          <Image
                            src={article.profiles.avatar_url}
                            alt={article.profiles.full_name}
                            width={48}
                            height={48}
                            className="rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                            {article.profiles.full_name.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div>
                        <Link
                          href={`/author/${article.profiles.id}`}
                          className="font-semibold text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                        >
                          {article.profiles.full_name}
                        </Link>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Dipublikasikan{" "}
                          {articleHelpers.formatRelativeTime(
                            article.created_at
                          )}
                        </p>
                      </div>
                    </div>
                  )}
                </header>

                {/* Article Content */}
                <div className="prose prose-lg max-w-none">
                  <ArticleContent
                    content={article.content}
                    articleId={article.id}
                    articleTitle={article.title}
                  />
                </div>

                {/* Article Footer */}
                <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Terakhir diperbarui:{" "}
                      {articleHelpers.formatDate(article.updated_at)}
                    </div>
                  </div>
                </footer>
              </div>
            </article>
            {/* Comments Section - 👈 TAMBAHAN BARU */}
            <CommentsSection
              articleId={article.id}
              initialCommentsCount={article.comments_count}
            />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Social Share */}
            <SocialShare
              title={article.title}
              url={articleUrl}
              excerpt={article.excerpt}
            />

            {/* Author Profile */}
            {article.profiles && (
              <AuthorProfile
                author={article.profiles}
                authorArticles={authorArticles}
              />
            )}

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <RelatedArticles articles={relatedArticles} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
