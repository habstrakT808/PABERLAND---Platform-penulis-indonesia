// src/components/layout/Header.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import {
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import { useAuth } from "@/contexts/AuthContext";
import toast from "react-hot-toast";
import NotificationSystem from "@/components/notifications/NotificationSystem";
import { adminHelpers } from "@/lib/adminHelpers";

export default function Header() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);

  // Admin states
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminStats, setAdminStats] = useState({ pendingReports: 0 });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success("Logout berhasil!");
      router.push("/");
      setIsUserMenuOpen(false);
    } catch (error) {
      toast.error("Gagal logout");
    }
  };

  const getUserInitial = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name.charAt(0).toUpperCase();
    }
    return user?.email?.charAt(0).toUpperCase() || "U";
  };

  // Handle search functionality
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim().length < 2) {
      toast.error("Masukkan minimal 2 karakter untuk pencarian");
      return;
    }

    // Navigate to search page with query
    const params = new URLSearchParams({
      q: searchQuery.trim(),
      type: "all",
    });

    router.push(`/search?${params}`);
    setSearchQuery(""); // Clear search after submit
    setShowSearchSuggestions(false);

    // Close mobile menu if open
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  // Handle search input changes
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    // Show suggestions if query length >= 2
    if (value.trim().length >= 2) {
      setShowSearchSuggestions(true);
    } else {
      setShowSearchSuggestions(false);
    }
  };

  // Quick search suggestions (you can expand this with real API calls)
  const getSearchSuggestions = () => {
    if (searchQuery.trim().length < 2) return [];

    // Mock suggestions - you can replace with real API call
    const mockSuggestions = [
      { type: "query", text: searchQuery.trim(), icon: "🔍" },
      {
        type: "category",
        text: `${searchQuery.trim()} dalam Cerpen`,
        icon: "📖",
      },
      {
        type: "category",
        text: `${searchQuery.trim()} dalam Puisi`,
        icon: "🎭",
      },
      {
        type: "category",
        text: `${searchQuery.trim()} dalam Artikel`,
        icon: "📰",
      },
    ];

    return mockSuggestions.slice(0, 4);
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: any) => {
    if (suggestion.type === "query") {
      const params = new URLSearchParams({
        q: suggestion.text,
        type: "all",
      });
      router.push(`/search?${params}`);
    } else if (suggestion.type === "category") {
      const category = suggestion.text.includes("Cerpen")
        ? "cerpen"
        : suggestion.text.includes("Puisi")
        ? "puisi"
        : suggestion.text.includes("Artikel")
        ? "artikel"
        : "all";

      const params = new URLSearchParams({
        q: searchQuery.trim(),
        type: "articles",
        category,
      });
      router.push(`/search?${params}`);
    }

    setSearchQuery("");
    setShowSearchSuggestions(false);
  };

  // Handle click outside to close suggestions
  const handleSearchBlur = () => {
    // Delay to allow suggestion clicks
    setTimeout(() => {
      setShowSearchSuggestions(false);
    }, 200);
  };

  // Admin check effect
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        try {
          const adminStatus = await adminHelpers.isUserAdmin(user.id);
          setIsAdmin(adminStatus);

          if (adminStatus) {
            // Fetch basic admin stats for notifications
            const stats = await adminHelpers.getAdminStats();
            setAdminStats({ pendingReports: stats.pendingReports });
          }
        } catch (error) {
          console.error("Error checking admin status:", error);
        }
      } else {
        setIsAdmin(false);
        setAdminStats({ pendingReports: 0 });
      }
    };

    checkAdminStatus();
  }, [user]);

  return (
    <header className="bg-gradient-to-br from-white via-blue-50 to-pink-50 shadow-md border-b border-blue-100 relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Only - No Text */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="PaberLand"
                width={160}
                height={60}
                className="h-24 w-auto sm:h-26"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/"
              className={`px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                pathname === "/"
                  ? "text-blue-600 bg-blue-50 border border-blue-200"
                  : "text-gray-800 hover:text-blue-600 hover:bg-blue-50"
              }`}
            >
              Beranda
            </Link>
            <Link
              href="/kategori"
              className={`px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                pathname.startsWith("/kategori")
                  ? "text-blue-600 bg-blue-50 border border-blue-200"
                  : "text-gray-800 hover:text-blue-600 hover:bg-blue-50"
              }`}
            >
              Kategori
            </Link>
            <Link
              href="/penulis"
              className={`px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                pathname.startsWith("/penulis")
                  ? "text-blue-600 bg-blue-50 border border-blue-200"
                  : "text-gray-800 hover:text-blue-600 hover:bg-blue-50"
              }`}
            >
              Penulis
            </Link>
            {/* Hapus menu Tulis dan Artikel Saya dari navbar utama */}
          </nav>

          {/* Enhanced Search Bar with Suggestions */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8 relative">
            <form onSubmit={handleSearch} className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchInputChange}
                onFocus={() =>
                  searchQuery.trim().length >= 2 &&
                  setShowSearchSuggestions(true)
                }
                onBlur={handleSearchBlur}
                placeholder="Cari konten, penulis..."
                className="block w-full pl-10 pr-12 py-2 border border-blue-200 rounded-lg leading-5 bg-white text-gray-900 placeholder-black focus:outline-none focus:placeholder-black focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
              />
              <button
                type="submit"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <div className="bg-blue-600 hover:bg-blue-700 text-white p-1.5 rounded-md transition-colors">
                  <MagnifyingGlassIcon className="h-4 w-4 text-white" />
                </div>
              </button>
            </form>

            {/* Search Suggestions Dropdown */}
            {showSearchSuggestions && searchQuery.trim().length >= 2 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-blue-200 rounded-lg shadow-lg z-50">
                <div className="py-2">
                  {getSearchSuggestions().map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full text-left px-4 py-2 hover:bg-blue-50 flex items-center space-x-3 transition-colors"
                    >
                      <span className="text-lg">{suggestion.icon}</span>
                      <span className="text-gray-900">{suggestion.text}</span>
                    </button>
                  ))}

                  {/* Quick access to advanced search */}
                  <div className="border-t border-blue-200 mt-2 pt-2">
                    <Link
                      href={`/search?q=${encodeURIComponent(
                        searchQuery.trim()
                      )}&type=all`}
                      className="w-full text-left px-4 py-2 hover:bg-blue-50 flex items-center space-x-3 text-blue-600 transition-colors"
                      onClick={() => {
                        setSearchQuery("");
                        setShowSearchSuggestions(false);
                      }}
                    >
                      <span className="text-lg">🔍</span>
                      <span>
                        Pencarian lanjutan untuk "{searchQuery.trim()}"
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            {/* Remove dark mode toggle for a consistent light theme */}

            {/* User Menu or Auth Buttons */}
            {user ? (
              <div className="flex items-center space-x-4">
                <NotificationSystem />
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 text-gray-800 hover:text-blue-600 transition-colors"
                  >
                    <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {getUserInitial()}
                    </div>
                    <span className="hidden sm:block text-sm font-medium">
                      {user.user_metadata?.full_name || "User"}
                    </span>
                    <ChevronDownIcon className="w-4 h-4" />
                  </button>

                  {/* User Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div
                      ref={userMenuRef}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-blue-100"
                    >
                      <Link
                        href={user ? `/profile/${user.id}` : "/profile"}
                        className="block px-4 py-2 text-sm text-gray-800 hover:bg-blue-50 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        👤 Profil
                      </Link>
                      <Link
                        href="/write"
                        className="block px-4 py-2 text-sm text-gray-800 hover:bg-blue-50 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        ✍️ Tulis Konten
                      </Link>
                      <Link
                        href="/my-articles"
                        className="block px-4 py-2 text-sm text-gray-800 hover:bg-blue-50 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        📚 Konten Saya
                      </Link>
                      {/* Admin Menu Section */}
                      {isAdmin && (
                        <>
                          <hr className="my-1 border-blue-100" />
                          <div className="px-4 py-2">
                            <p className="text-xs font-medium text-gray-600 uppercase tracking-wider">
                              Admin Panel
                            </p>
                          </div>
                          <Link
                            href="/admin"
                            className="block px-4 py-2 text-sm text-blue-700 hover:bg-blue-50 transition-colors font-medium"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            🛡️ Admin Dashboard
                          </Link>
                          <Link
                            href="/admin/users"
                            className="block px-4 py-2 text-sm text-blue-700 hover:bg-blue-50 transition-colors"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            👥 Kelola Users
                          </Link>
                          <Link
                            href="/admin/articles"
                            className="block px-4 py-2 text-sm text-blue-700 hover:bg-blue-50 transition-colors"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            📚 Kelola Artikel
                          </Link>
                          <Link
                            href="/admin/reports"
                            className="flex items-center justify-between px-4 py-2 text-sm text-blue-700 hover:bg-blue-50 transition-colors"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <span>🚨 Laporan</span>
                            {adminStats.pendingReports > 0 && (
                              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full min-w-[20px] text-center">
                                {adminStats.pendingReports > 99
                                  ? "99+"
                                  : adminStats.pendingReports}
                              </span>
                            )}
                          </Link>
                        </>
                      )}
                      <hr className="my-1 border-blue-100" />
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-blue-50 transition-colors"
                      >
                        🚪 Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="text-gray-800 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Masuk
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Daftar
                </Link>
              </>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-500"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-blue-100">
            <div className="space-y-2">
              <Link
                href="/"
                className={`block px-3 py-2 transition-colors rounded-md ${
                  pathname === "/"
                    ? "text-blue-600 bg-blue-50 border border-blue-200"
                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Beranda
              </Link>
              <Link
                href="/kategori"
                className={`block px-3 py-2 transition-colors rounded-md ${
                  pathname.startsWith("/kategori")
                    ? "text-blue-600 bg-blue-50 border border-blue-200"
                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Kategori
              </Link>
              <Link
                href="/penulis"
                className={`block px-3 py-2 transition-colors rounded-md ${
                  pathname.startsWith("/penulis")
                    ? "text-blue-600 bg-blue-50 border border-blue-200"
                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Penulis
              </Link>
              {/* Hapus menu Tulis dan Artikel Saya dari mobile menu */}

              {/* Mobile Search */}
              <div className="px-3 py-2">
                <form onSubmit={handleSearch}>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Cari konten, penulis..."
                      className="block w-full pl-10 pr-12 py-2 border border-blue-200 rounded-lg leading-5 bg-white text-gray-800 placeholder-black focus:outline-none focus:placeholder-black focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                    />
                    <button
                      type="submit"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <div className="bg-blue-600 hover:bg-blue-700 text-white p-1.5 rounded-md transition-colors">
                        <MagnifyingGlassIcon className="h-4 w-4 text-white" />
                      </div>
                    </button>
                  </div>
                </form>
              </div>

              {/* Mobile User Menu */}
              {user && (
                <>
                  <hr className="my-2 border-blue-100" />

                  <Link
                    href={user ? `/profile/${user.id}` : "/profile"}
                    className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    👤 Profil
                  </Link>
                  <Link
                    href="/write"
                    className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    ✍️ Tulis Konten
                  </Link>
                  <Link
                    href="/my-articles"
                    className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    📚 Konten Saya
                  </Link>
                  {/* Mobile Admin Menu */}
                  {isAdmin && (
                    <>
                      <hr className="my-2 border-blue-100" />
                      <div className="px-3 py-1">
                        <p className="text-xs font-medium text-gray-600 uppercase tracking-wider">
                          Admin Panel
                        </p>
                      </div>
                      <Link
                        href="/admin"
                        className="block px-3 py-2 text-blue-600 hover:text-blue-700 transition-colors font-medium"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        🛡️ Admin Dashboard
                      </Link>
                      <Link
                        href="/admin/users"
                        className="block px-3 py-2 text-blue-600 hover:text-blue-700 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        👥 Kelola Users
                      </Link>
                      <Link
                        href="/admin/articles"
                        className="block px-3 py-2 text-blue-600 hover:text-blue-700 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        📚 Kelola Artikel
                      </Link>
                      <div className="flex items-center justify-between px-3 py-2">
                        <Link
                          href="/admin/reports"
                          className="text-blue-600 hover:text-blue-700 transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          🚨 Laporan
                        </Link>
                        {adminStats.pendingReports > 0 && (
                          <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                            {adminStats.pendingReports}
                          </span>
                        )}
                      </div>
                    </>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-red-600 transition-colors"
                  >
                    🚪 Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
