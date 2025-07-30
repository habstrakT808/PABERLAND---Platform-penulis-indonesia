// src/app/search/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SignedImage from "@/components/common/SignedImage";
import {
  MagnifyingGlassIcon,
  EyeIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  ClockIcon,
  UserIcon,
  AdjustmentsHorizontalIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  articleHelpers,
  getAvatarUrl,
  generateNameSlug,
  generateNameSlugSync,
} from "@/lib/supabase";
import toast from "react-hot-toast";

interface SearchResult {
  articles: any[];
  authors: any[];
  totalArticles: number;
  totalAuthors: number;
  currentPage: number;
  totalPages: number;
  query: string;
  type: string;
  category?: string;
}

const categories = [
  { value: "all", label: "Semua Kategori" },
  { value: "cerpen", label: "Cerpen" },
  { value: "puisi", label: "Puisi" },
  { value: "artikel", label: "Artikel" },
  { value: "cerita-rakyat", label: "Cerita Rakyat" },
  { value: "novel-berseri", label: "Novel Berseri" },
  { value: "lainnya", label: "Lainnya" },
];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [results, setResults] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [searchType, setSearchType] = useState(
    searchParams.get("type") || "all"
  );
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "all"
  );
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") || "1")
  );
  const [showFilters, setShowFilters] = useState(false);
  const [authorSlugs, setAuthorSlugs] = useState<{ [key: string]: string }>({});

  // Generate author slugs when results change
  useEffect(() => {
    if (results?.authors) {
      generateAuthorSlugs();
    }
  }, [results?.authors]);

  const generateAuthorSlugs = async () => {
    if (!results?.authors) return;

    const slugs: { [key: string]: string } = {};
    for (const author of results.authors) {
      try {
        const slug = await generateNameSlug(author.full_name, author.id);
        slugs[author.id] = slug;
      } catch (error) {
        // Fallback to sync version
        slugs[author.id] = generateNameSlugSync(author.full_name);
      }
    }
    setAuthorSlugs(slugs);
  };

  // Perform search
  const performSearch = async (
    query: string,
    type: string = "all",
    category: string = "all",
    page: number = 1
  ) => {
    if (!query.trim() || query.trim().length < 2) {
      toast.error("Masukkan minimal 2 karakter untuk pencarian");
      return;
    }

    setLoading(true);
    try {
      const params = new URLSearchParams({
        q: query.trim(),
        type,
        page: page.toString(),
        limit: "10",
      });

      if (category && category !== "all") {
        params.append("category", category);
      }

      const response = await fetch(`/api/search?${params}`);
      const data = await response.json();

      if (data.success) {
        setResults(data);

        // Update URL
        const newParams = new URLSearchParams({
          q: query.trim(),
          type,
          page: page.toString(),
        });
        if (category && category !== "all") {
          newParams.append("category", category);
        }

        router.push(`/search?${newParams}`, { scroll: false });
      } else {
        toast.error(data.message || "Terjadi kesalahan saat mencari");
      }
    } catch (error) {
      console.error("Search error:", error);
      toast.error("Terjadi kesalahan saat mencari");
    } finally {
      setLoading(false);
    }
  };

  // Initial search on page load
  useEffect(() => {
    const query = searchParams.get("q");
    const type = searchParams.get("type") || "all";
    const category = searchParams.get("category") || "all";
    const page = parseInt(searchParams.get("page") || "1");

    if (query) {
      setSearchQuery(query);
      setSearchType(type);
      setSelectedCategory(category);
      setCurrentPage(page);
      performSearch(query, type, category, page);
    }
  }, [searchParams]);

  // Handle search form submit
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    performSearch(searchQuery, searchType, selectedCategory, 1);
  };

  // Handle filter changes
  const handleTypeChange = (type: string) => {
    setSearchType(type);
    setCurrentPage(1);
    if (searchQuery.trim()) {
      performSearch(searchQuery, type, selectedCategory, 1);
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    if (searchQuery.trim()) {
      performSearch(searchQuery, searchType, category, 1);
    }
  };

  // Handle pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    performSearch(searchQuery, searchType, selectedCategory, page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="bg-white/95 rounded-xl shadow-sm p-6 mb-8 border border-blue-100">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Search Form */}
            <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari konten, member..."
                  className="block w-full pl-10 pr-12 py-3 border border-blue-200 rounded-lg leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <div className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white p-2 rounded-md transition-colors">
                    <MagnifyingGlassIcon className="h-4 w-4" />
                  </div>
                </button>
              </div>
            </form>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 lg:hidden"
            >
              <AdjustmentsHorizontalIcon className="w-5 h-5" />
              <span>Filter</span>
            </button>
          </div>

          {/* Search Filters */}
          <div className={`mt-6 ${showFilters ? "block" : "hidden lg:block"}`}>
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              {/* Search Type */}
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-800 whitespace-nowrap">
                  Cari dalam:
                </span>
                <div className="flex space-x-2">
                  {[
                    { value: "all", label: "Semua" },
                    { value: "articles", label: "Artikel" },
                    { value: "authors", label: "Member" },
                  ].map((type) => (
                    <button
                      key={type.value}
                      onClick={() => handleTypeChange(type.value)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        searchType === type.value
                          ? "bg-blue-600 text-white"
                          : "bg-blue-50 text-gray-700 hover:bg-blue-100"
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              {(searchType === "all" || searchType === "articles") && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-800 whitespace-nowrap">
                    Kategori:
                  </span>
                  <select
                    value={selectedCategory}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="px-3 py-1 border border-blue-200 rounded-md text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Clear Filters */}
              {(searchType !== "all" || selectedCategory !== "all") && (
                <button
                  onClick={() => {
                    setSearchType("all");
                    setSelectedCategory("all");
                    if (searchQuery.trim()) {
                      performSearch(searchQuery, "all", "all", 1);
                    }
                  }}
                  className="flex items-center space-x-1 text-sm text-red-600 hover:text-red-700"
                >
                  <XMarkIcon className="w-4 h-4" />
                  <span>Reset Filter</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Search Results */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-700">Mencari...</p>
          </div>
        ) : results ? (
          <div className="space-y-8">
            {/* Results Summary */}
            <div className="bg-white/95 rounded-xl shadow-sm p-6 border border-blue-100">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Hasil Pencarian untuk "{results.query}"
              </h2>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-700">
                {results.totalArticles > 0 && (
                  <span>📚 {results.totalArticles} artikel</span>
                )}
                {results.totalAuthors > 0 && (
                  <span>👤 {results.totalAuthors} member</span>
                )}
                {results.totalArticles === 0 && results.totalAuthors === 0 && (
                  <span className="text-gray-500">
                    Tidak ada hasil ditemukan
                  </span>
                )}
              </div>
            </div>

            {/* Authors Results */}
            {results.authors.length > 0 && (
              <div className="bg-white/95 rounded-xl shadow-sm p-6 border border-blue-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <UserIcon className="w-5 h-5 mr-2" />
                  Member ({results.totalAuthors})
                </h3>
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {results.authors.slice(0, 6).map((author) => (
                    <Link
                      key={author.id}
                      href={`/penulis/${
                        authorSlugs[author.id] ||
                        generateNameSlugSync(author.full_name)
                      }`}
                      className="flex items-center min-w-[220px] space-x-3 p-4 rounded-lg border border-blue-200 hover:border-blue-300 transition-colors bg-white/80"
                    >
                      {author.avatar_url ? (
                        <Image
                          src={getAvatarUrl(author.avatar_url) || ""}
                          alt={author.full_name}
                          width={48}
                          height={48}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                          {author.full_name?.charAt(0) || "U"}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 truncate">
                          {author.full_name}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                {results.totalAuthors > 6 && (
                  <div className="text-right mt-2 text-xs text-gray-500">
                    Scroll untuk melihat lebih banyak member
                  </div>
                )}
              </div>
            )}

            {/* Articles Results */}
            {results.articles.length > 0 && (
              <div className="bg-white/95 rounded-xl shadow-sm p-6 border border-blue-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  📚 Konten ({results.totalArticles})
                </h3>
                <div className="space-y-6">
                  {results.articles.map((article) => (
                    <article
                      key={article.id}
                      className="border-b border-blue-100 last:border-b-0 pb-6 last:pb-0"
                    >
                      <div className="flex flex-col lg:flex-row lg:space-x-6">
                        {/* Article Image */}
                        {article.cover_image && (
                          <div className="lg:w-48 mb-4 lg:mb-0">
                            <SignedImage
                              src={article.cover_image}
                              alt={article.title}
                              className="w-full lg:w-48 h-32 object-cover rounded-lg"
                            />
                          </div>
                        )}

                        {/* Article Content */}
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                              {article.category}
                            </span>
                            <span className="text-gray-600 text-sm ml-3 flex items-center">
                              <ClockIcon className="w-4 h-4 mr-1" />
                              {articleHelpers.formatRelativeTime(
                                article.created_at
                              )}
                            </span>
                          </div>

                          <h4 className="text-xl font-bold text-gray-900 mb-2">
                            <Link
                              href={`/article/${article.slug}`}
                              className="hover:text-blue-600 transition-colors"
                            >
                              {article.title}
                            </Link>
                          </h4>

                          <p className="text-gray-700 mb-4 leading-relaxed">
                            {article.excerpt}
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              {article.profiles?.avatar_url ? (
                                <Image
                                  src={
                                    getAvatarUrl(article.profiles.avatar_url) ||
                                    ""
                                  }
                                  alt={article.profiles.full_name}
                                  width={32}
                                  height={32}
                                  className="w-8 h-8 rounded-full object-cover mr-3"
                                />
                              ) : (
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                                  {article.profiles?.full_name?.charAt(0) ||
                                    "U"}
                                </div>
                              )}
                              <span className="font-medium text-gray-900">
                                {article.profiles?.full_name || "Anonymous"}
                              </span>
                            </div>

                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <span className="flex items-center">
                                <EyeIcon className="w-4 h-4 mr-1" />
                                {article.views}
                              </span>
                              <span className="flex items-center">
                                <HeartIcon className="w-4 h-4 mr-1" />
                                {article.likes_count}
                              </span>
                              <span className="flex items-center">
                                <ChatBubbleLeftIcon className="w-4 h-4 mr-1" />
                                {article.comments_count}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Pagination */}
                {results.totalPages > 1 && (
                  <div className="mt-8 flex justify-center">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-blue-200 rounded-md hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Sebelumnya
                      </button>

                      {/* Page Numbers */}
                      {Array.from(
                        { length: Math.min(5, results.totalPages) },
                        (_, i) => {
                          const pageNum =
                            Math.max(
                              1,
                              Math.min(results.totalPages - 4, currentPage - 2)
                            ) + i;
                          return (
                            <button
                              key={pageNum}
                              onClick={() => handlePageChange(pageNum)}
                              className={`px-3 py-2 text-sm font-medium rounded-md ${
                                currentPage === pageNum
                                  ? "bg-blue-600 text-white"
                                  : "text-gray-500 bg-white border border-blue-200 hover:bg-blue-50"
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        }
                      )}

                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === results.totalPages}
                        className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-blue-200 rounded-md hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Selanjutnya
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* No Results */}
            {results.articles.length === 0 && results.authors.length === 0 && (
              <div className="bg-white/95 rounded-xl shadow-sm p-12 text-center border border-blue-100">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Tidak ada hasil ditemukan
                </h3>
                <p className="text-gray-700 mb-6">
                  Coba gunakan kata kunci yang berbeda atau periksa ejaan Anda.
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>💡 Tips pencarian:</p>
                  <ul className="space-y-1">
                    <li>• Gunakan kata kunci yang lebih umum</li>
                    <li>• Periksa ejaan kata kunci</li>
                    <li>• Coba kategori yang berbeda</li>
                    <li>• Gunakan sinonim atau kata terkait</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Mulai Pencarian
            </h3>
            <p className="text-gray-700 mb-6">
              Masukkan kata kunci di atas untuk mencari konten dan member.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
