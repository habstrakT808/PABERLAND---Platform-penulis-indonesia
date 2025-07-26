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
  { value: "all", label: "📂 Semua Kategori" },
  { value: "cerpen", label: "📖 Cerpen" },
  { value: "puisi", label: "🎭 Puisi" },
  { value: "artikel", label: "📰 Konten" },
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
    <div className="bg-white/95 rounded-lg shadow-lg p-6 border border-blue-100 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cari Konten
          </label>
          <input
            type="text"
            value={currentSearch}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari konten berdasarkan judul..."
            className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500"
          />
        </div>

        {/* Filter Toggle Button */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`inline-flex items-center px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
            showFilters || hasActiveFilters
              ? "border-blue-300 bg-blue-50 text-blue-700"
              : "border-blue-200 bg-white text-gray-700 hover:bg-blue-50"
          }`}
        >
          <FunnelIcon className="w-5 h-5 mr-2" />
          Filter
          {hasActiveFilters && (
            <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-blue-600 rounded-full">
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
            className="inline-flex items-center px-4 py-2 border border-red-300 bg-red-50 text-red-700 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
          >
            <XMarkIcon className="w-5 h-5 mr-2" />
            Clear
          </button>
        )}
      </div>

      {/* Expanded Filters */}
      {showFilters && (
        <div className="mt-6 pt-6 border-t border-blue-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Kategori
              </label>
              <select
                value={currentCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="block w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
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
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Status
              </label>
              <select
                value={currentStatus}
                onChange={(e) =>
                  onStatusChange(
                    e.target.value as "all" | "published" | "draft"
                  )
                }
                className="block w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
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
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
              Search: "{currentSearch}"
              <button
                onClick={() => onSearchChange("")}
                className="ml-2 hover:text-blue-600"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            </span>
          )}

          {currentCategory !== "all" && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
              {categories.find((c) => c.value === currentCategory)?.label}
              <button
                onClick={() => onCategoryChange("all")}
                className="ml-2 hover:text-blue-600"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            </span>
          )}

          {currentStatus !== "all" && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
              {statuses.find((s) => s.value === currentStatus)?.label}
              <button
                onClick={() => onStatusChange("all")}
                className="ml-2 hover:text-blue-600"
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
