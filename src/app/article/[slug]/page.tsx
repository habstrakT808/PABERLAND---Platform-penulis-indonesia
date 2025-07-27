import { Metadata } from "next";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { EyeIcon, ChatBubbleLeftIcon } from "@heroicons/react/24/outline";

import {
  supabase,
  articleHelpers,
  commentHelpers,
  getAvatarUrl,
} from "@/lib/supabase";
import ArticleContent from "@/components/article/ArticleContent";
import ArticleMetadata from "@/components/article/ArticleMetadata";
import AuthorProfile from "@/components/article/AuthorProfile";
import RelatedArticles from "@/components/article/RelatedArticles";
import SocialShare from "@/components/article/SocialShare";
import CommentsSection from "@/components/comments/CommentsSection"; // Import baru
import ArticleLikeSection from "@/components/article/ArticleLikeSection";
import SignedImage from "@/components/common/SignedImage";
import ViewTracker from "@/components/article/ViewTracker";

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate metadata for SEO - sama seperti sebelumnya
export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const article = await articleHelpers.getArticle(resolvedParams.slug);

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
  // Disable caching to ensure views increment on every visit
  noStore();

  // Await params for Next.js 15 compatibility
  const resolvedParams = await params;

  // Fetch article data
  const article = await articleHelpers.getArticle(resolvedParams.slug);

  if (!article || !article.published) {
    notFound();
  }

  // REMOVED: Server-side increment - now handled by client-side ViewTracker
  // This prevents double incrementing

  // Fetch fresh article data to get current views
  const freshArticle = await articleHelpers.getArticle(resolvedParams.slug);
  const articleWithUpdatedViews = freshArticle || article;

  // Get current views from database
  let finalViews = articleWithUpdatedViews.views;
  try {
    const { data: viewsData, error: viewsError } = await supabase
      .from("articles")
      .select("views")
      .eq("id", article.id)
      .single();

    if (!viewsError && viewsData) {
      finalViews = viewsData.views || 0;
      console.log(`🔍 Server: Current views from DB: ${finalViews}`);
    } else if (viewsError) {
      console.error("Error fetching views directly:", viewsError);
    }
  } catch (error) {
    console.error("Error fetching views directly:", error);
  }

  // Fetch related data and real-time comment count
  const [relatedArticles, authorArticles, realTimeCommentCount] =
    await Promise.all([
      articleHelpers.getRelatedArticles(
        articleWithUpdatedViews.id,
        articleWithUpdatedViews.category,
        4
      ),
      articleHelpers.getAuthorArticles(
        articleWithUpdatedViews.author_id,
        articleWithUpdatedViews.id,
        3
      ),
      commentHelpers.getCommentCount(articleWithUpdatedViews.id),
    ]);

  const readingTime = articleHelpers.calculateReadingTime(
    articleWithUpdatedViews.content
  );
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const articleUrl = `${baseUrl}/article/${articleWithUpdatedViews.slug}`;

  // Use real-time comment count instead of stored count
  const updatedArticle = {
    ...articleWithUpdatedViews,
    views: finalViews, // Use the current views count
    comments_count: realTimeCommentCount,
  };

  console.log(
    `📊 Server: Article "${updatedArticle.title}" - Current Views: ${updatedArticle.views}`
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-pink-50">
      {/* ViewTracker component to ensure views increment on every visit */}
      <ViewTracker
        articleId={updatedArticle.id}
        articleSlug={updatedArticle.slug}
      />

      {/* Header */}
      <div className="bg-white/95 shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
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
            <article className="bg-white/95 rounded-lg shadow-lg overflow-hidden border border-blue-100">
              {/* Cover Image */}
              {article.cover_image && (
                <div className="relative h-64 md:h-80 lg:h-96">
                  <SignedImage
                    src={article.cover_image}
                    alt={article.title}
                    className="object-cover w-full h-full absolute inset-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
              )}

              {/* Article Header */}
              <div className="p-6 md:p-8">
                <header className="mb-8">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                    {article.title}
                  </h1>

                  {/* Article Metadata Section dengan Like System */}
                  <ArticleLikeSection
                    articleId={updatedArticle.id}
                    views={updatedArticle.views}
                    likesCount={updatedArticle.likes_count}
                    commentsCount={updatedArticle.comments_count}
                    articleTitle={updatedArticle.title}
                  />
                  {/* End Article Metadata Section */}

                  {/* Author Info */}
                  {updatedArticle.profiles && (
                    <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg mt-6 border border-blue-100">
                      <div className="relative">
                        {updatedArticle.profiles.avatar_url ? (
                          <Image
                            src={
                              getAvatarUrl(
                                updatedArticle.profiles.avatar_url
                              ) || ""
                            }
                            alt={updatedArticle.profiles.full_name}
                            width={48}
                            height={48}
                            className="rounded-full object-cover aspect-square"
                          />
                        ) : (
                          <div className="w-12 h-12 aspect-square bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                            {updatedArticle.profiles.full_name
                              .charAt(0)
                              .toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div>
                        <Link
                          href={`/penulis/${updatedArticle.profiles.id}`}
                          className="font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                        >
                          {updatedArticle.profiles.full_name}
                        </Link>
                        <p className="text-sm text-gray-600">
                          Dipublikasikan{" "}
                          {articleHelpers.formatRelativeTime(
                            updatedArticle.created_at
                          )}
                        </p>
                      </div>
                    </div>
                  )}
                </header>

                {/* Article Content */}
                <div className="prose prose-lg max-w-none">
                  <ArticleContent
                    content={updatedArticle.content}
                    articleId={updatedArticle.id}
                    articleTitle={updatedArticle.title}
                  />
                </div>

                {/* Article Footer */}
                <footer className="mt-12 pt-8 border-t border-blue-100">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="text-sm text-gray-600">
                      Terakhir diperbarui:{" "}
                      {articleHelpers.formatDate(updatedArticle.updated_at)}
                    </div>
                  </div>
                </footer>
              </div>
            </article>
            {/* Comments Section - 👈 TAMBAHAN BARU */}
            <CommentsSection
              articleId={updatedArticle.id}
              initialCommentsCount={updatedArticle.comments_count}
            />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Social Share */}
            <SocialShare
              title={updatedArticle.title}
              url={articleUrl}
              excerpt={updatedArticle.excerpt}
            />

            {/* Author Profile */}
            {updatedArticle.profiles && (
              <AuthorProfile
                author={{
                  ...updatedArticle.profiles,
                  role: "Penulis",
                }}
                authorArticles={authorArticles}
              />
            )}

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <RelatedArticles
                articles={relatedArticles}
                currentCategory={updatedArticle.category}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
