"use client";

import { useState } from "react";
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

interface ArticleFiltersProps {
  onSearchChange: (search: string) => void;
  onCategoryChange: (category: string) => void;
  onStatusChange: (status: "all" | "published" | "draft") => void;
  currentSearch: string;
  currentCategory: string;
  currentStatus: "all" | "published" | "draft";
}

const categories = [
  { value: "all", label: "🔍 Semua Kategori" },
  { value: "cerpen", label: "📖 Cerpen" },
  { value: "puisi", label: "🎭 Puisi" },
  { value: "artikel", label: "📰 Artikel" },
  { value: "cerita-rakyat", label: "🏛️ Cerita Rakyat" },
  { value: "novel-berseri", label: "📚 Novel Berseri" },
  { value: "lainnya", label: "✨ Lainnya" },
];

const statuses = [
  { value: "all", label: "📋 Semua Status" },
  { value: "published", label: "✅ Dipublikasikan" },
  { value: "draft", label: "📝 Draft" },
];

export default function ArticleFilters({
  onSearchChange,
  onCategoryChange,
  onStatusChange,
  currentSearch,
  currentCategory,
  currentStatus,
}: ArticleFiltersProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [searchInput, setSearchInput] = useState(currentSearch);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchChange(searchInput);
  };

  const clearAllFilters = () => {
    setSearchInput("");
    onSearchChange("");
    onCategoryChange("all");
    onStatusChange("all");
    setShowFilters(false);
  };

  const hasActiveFilters =
    currentSearch || currentCategory !== "all" || currentStatus !== "all";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6 border border-gray-200 dark:border-gray-700">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="flex-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Cari artikel berdasarkan judul..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
            {searchInput && (
              <button
                type="button"
                onClick={() => {
                  setSearchInput("");
                  onSearchChange("");
                }}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <XMarkIcon className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
              </button>
            )}
          </div>
        </form>

        {/* Filter Toggle Button */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`inline-flex items-center px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
            showFilters || hasActiveFilters
              ? "border-indigo-300 bg-indigo-50 text-indigo-700 dark:border-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400"
              : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
          }`}
        >
          <FunnelIcon className="w-5 h-5 mr-2" />
          Filter
          {hasActiveFilters && (
            <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-indigo-600 rounded-full">
              {
                [
                  currentSearch,
                  currentCategory !== "all",
                  currentStatus !== "all",
                ].filter(Boolean).length
              }
            </span>
          )}
        </button>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="inline-flex items-center px-4 py-2 border border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg text-sm font-medium hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
          >
            <XMarkIcon className="w-5 h-5 mr-2" />
            Clear
          </button>
        )}
      </div>

      {/* Expanded Filters */}
      {showFilters && (
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Kategori
              </label>
              <select
                value={currentCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status
              </label>
              <select
                value={currentStatus}
                onChange={(e) =>
                  onStatusChange(
                    e.target.value as "all" | "published" | "draft"
                  )
                }
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {statuses.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 flex flex-wrap gap-2">
          {currentSearch && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400">
              Search: "{currentSearch}"
              <button
                onClick={() => onSearchChange("")}
                className="ml-2 hover:text-blue-600 dark:hover:text-blue-300"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            </span>
          )}

          {currentCategory !== "all" && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400">
              {categories.find((c) => c.value === currentCategory)?.label}
              <button
                onClick={() => onCategoryChange("all")}
                className="ml-2 hover:text-green-600 dark:hover:text-green-300"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            </span>
          )}

          {currentStatus !== "all" && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-400">
              {statuses.find((s) => s.value === currentStatus)?.label}
              <button
                onClick={() => onStatusChange("all")}
                className="ml-2 hover:text-purple-600 dark:hover:text-purple-300"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
