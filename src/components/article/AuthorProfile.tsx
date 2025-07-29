// src/components/article/AuthorProfile.tsx (Updated)
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { UserIcon } from "@heroicons/react/24/outline";
import { articleManagement, getAvatarUrl } from "@/lib/supabase";

interface AuthorProfileProps {
  author: {
    id: string;
    full_name: string;
    avatar_url: string | null;
    bio: string | null;
    role?: string;
  };
  authorArticles?: Array<{
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    created_at: string;
  }>;
}

export default function AuthorProfile({
  author,
  authorArticles = [],
}: AuthorProfileProps) {
  const [authorStats, setAuthorStats] = useState({
    totalArticles: 0,
    totalLikes: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAuthorData();
  }, [author.id]);

  const fetchAuthorData = async () => {
    try {
      const stats = await articleManagement.getUserStats(author.id);
      setAuthorStats({
        totalArticles: stats.totalArticles,
        totalLikes: stats.totalLikes,
      });
    } catch (error) {
      console.error("Error fetching author data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/95 rounded-lg shadow-lg p-6 border border-blue-100">
      {/* Author Header */}
      <div className="flex items-start space-x-4 mb-6">
        <div className="relative">
          {author.avatar_url ? (
            <Image
              src={getAvatarUrl(author.avatar_url) || ""}
              alt={author.full_name}
              width={80}
              height={80}
              className="rounded-full object-cover aspect-square ring-4 ring-blue-100"
            />
          ) : (
            <div className="w-20 h-20 aspect-square bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center ring-4 ring-blue-100">
              <UserIcon className="w-10 h-10 text-white" />
            </div>
          )}
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-bold text-gray-900">
              {author.full_name}
            </h3>
          </div>

          <div className="flex items-center space-x-2 mb-3">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {author.role || "Member"}
            </span>
            <span className="text-sm text-gray-600">
              • Bergabung {new Date().getFullYear()}
            </span>
          </div>
        </div>
      </div>

      {/* Author Bio */}
      {author.bio && (
        <div className="mb-6">
          <p className="text-gray-700 leading-relaxed">{author.bio}</p>
        </div>
      )}

      {/* Author Stats */}
      <div className="grid grid-cols-2 gap-2 mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <div className="text-center">
          <div className="text-lg font-bold text-blue-600">
            {loading ? "..." : authorStats.totalArticles}
          </div>
          <div className="text-xs text-gray-600">Konten</div>
        </div>

        <div className="text-center">
          <div className="text-lg font-bold text-blue-600">
            {loading ? "..." : authorStats.totalLikes.toLocaleString()}
          </div>
          <div className="text-xs text-gray-600">Likes</div>
        </div>
      </div>

      {/* Other Articles by Author */}
      {authorArticles.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            Konten Lainnya
          </h4>
          <div className="space-y-3">
            {authorArticles.slice(0, 3).map((article) => (
              <Link
                key={article.id}
                href={`/article/${article.slug}`}
                className="block p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors border border-blue-100"
              >
                <h5 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2">
                  {article.title}
                </h5>
                <p className="text-xs text-gray-600 line-clamp-2">
                  {article.excerpt}
                </p>
                <div className="text-xs text-gray-500 mt-2">
                  {new Date(article.created_at).toLocaleDateString("id-ID")}
                </div>
              </Link>
            ))}
          </div>

          <Link
            href={`/penulis/${author.id}`}
            className="inline-flex items-center mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Lihat semua konten →
          </Link>
        </div>
      )}
    </div>
  );
}
