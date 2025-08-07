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
import { supabase, getAvatarUrl } from "@/lib/supabase";

export default function Header() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);

  // Admin states
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminStats, setAdminStats] = useState({ pendingReports: 0 });

  // User profile state
  const [userProfile, setUserProfile] = useState<any>(null);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrollY(scrollPosition);
      setIsScrolled(scrollPosition > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const mobileMenu = document.getElementById("mobile-menu");
      const mobileMenuButton = document.getElementById("mobile-menu-button");

      if (isMenuOpen && mobileMenu && mobileMenuButton) {
        if (
          !mobileMenu.contains(target) &&
          !mobileMenuButton.contains(target)
        ) {
          setIsMenuOpen(false);
        }
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

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

  // Fetch user profile effect
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        try {
          const { data, error } = await supabase
            .from("profiles")
            .select("full_name, avatar_url")
            .eq("id", user.id)
            .single();

          if (!error && data) {
            setUserProfile(data);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      } else {
        setUserProfile(null);
      }
    };

    fetchUserProfile();
  }, [user]);

  // Calculate header styles based on scroll
  const headerStyles = {
    background: isScrolled
      ? `rgba(255, 255, 255, ${Math.min(0.95, 0.8 + scrollY * 0.0001)})`
      : "rgba(255, 255, 255, 0.9)",
    backdropFilter: isScrolled ? "blur(20px)" : "blur(10px)",
    boxShadow: isScrolled
      ? `0 4px 20px rgba(0, 0, 0, ${0.1 + scrollY * 0.0001})`
      : "0 2px 10px rgba(0, 0, 0, 0.05)",
    borderBottom: isScrolled
      ? `1px solid rgba(59, 130, 246, ${0.2 + scrollY * 0.0001})`
      : "1px solid rgba(59, 130, 246, 0.1)",
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
        isScrolled ? "py-2" : "py-4"
      }`}
      style={headerStyles}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div
          className={`flex justify-between items-center transition-all duration-300 ${
            isScrolled ? "h-14" : "h-16"
          }`}
        >
          {/* Logo with scale animation */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center group">
              <div
                className={`transition-all duration-300 ${
                  isScrolled ? "scale-90" : "scale-100"
                } group-hover:scale-105`}
              >
                <Image
                  src="/logo.png"
                  alt="PaberLand"
                  width={160}
                  height={60}
                  className={`transition-all duration-300 ${
                    isScrolled ? "h-16 sm:h-20" : "h-20 sm:h-24"
                  } w-auto`}
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation with enhanced animations */}
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/"
              className={`px-3 py-2 text-sm font-medium transition-all duration-300 rounded-md relative overflow-hidden group ${
                pathname === "/"
                  ? "text-blue-600 bg-blue-50 border border-blue-200 shadow-sm"
                  : "text-gray-800 hover:text-blue-600 hover:bg-blue-50"
              }`}
            >
              <span className="relative z-10">Beranda</span>
              {pathname === "/" && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-blue-50 animate-pulse"></div>
              )}
            </Link>
            <Link
              href="/kategori"
              className={`px-3 py-2 text-sm font-medium transition-all duration-300 rounded-md relative overflow-hidden group ${
                pathname.startsWith("/kategori")
                  ? "text-blue-600 bg-blue-50 border border-blue-200 shadow-sm"
                  : "text-gray-800 hover:text-blue-600 hover:bg-blue-50"
              }`}
            >
              <span className="relative z-10">Kategori</span>
              {pathname.startsWith("/kategori") && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-blue-50 animate-pulse"></div>
              )}
            </Link>
            <Link
              href="/member"
              className={`px-3 py-2 text-sm font-medium transition-all duration-300 rounded-md relative overflow-hidden group ${
                pathname.startsWith("/member")
                  ? "text-blue-600 bg-blue-50 border border-blue-200 shadow-sm"
                  : "text-gray-800 hover:text-blue-600 hover:bg-blue-50"
              }`}
            >
              <span className="relative z-10">Member</span>
              {pathname.startsWith("/member") && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-blue-50 animate-pulse"></div>
              )}
            </Link>
            <Link
              href="/tentang"
              className={`px-3 py-2 text-sm font-medium transition-all duration-300 rounded-md relative overflow-hidden group ${
                pathname.startsWith("/tentang")
                  ? "text-blue-700 bg-blue-50 border border-blue-200 shadow-sm"
                  : "text-gray-800 hover:text-blue-600 hover:bg-blue-50"
              }`}
            >
              <span className="relative z-10">Tentang</span>
              {pathname.startsWith("/tentang") && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-blue-50 animate-pulse"></div>
              )}
            </Link>
          </nav>

          {/* Enhanced Search Bar with glass effect - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8 relative">
            <form onSubmit={handleSearch} className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon
                  className={`h-5 w-5 transition-colors duration-300 ${
                    isScrolled ? "text-blue-500" : "text-gray-400"
                  }`}
                />
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
                placeholder="Cari konten, member..."
                className={`block w-full pl-10 pr-12 py-2 border rounded-lg leading-5 bg-white/80 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300 ${
                  isScrolled
                    ? "border-blue-300 shadow-lg"
                    : "border-blue-200 shadow-md"
                }`}
              />
              <button
                type="submit"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <div
                  className={`p-1.5 rounded-md transition-all duration-300 ${
                    isScrolled
                      ? "bg-blue-600 hover:bg-blue-700 shadow-lg"
                      : "bg-blue-500 hover:bg-blue-600 shadow-md"
                  }`}
                >
                  <MagnifyingGlassIcon className="h-4 w-4 text-white" />
                </div>
              </button>
            </form>

            {/* Search Suggestions Dropdown with glass effect */}
            {showSearchSuggestions && searchQuery.trim().length >= 2 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white/95 backdrop-blur-md border border-blue-200 rounded-lg shadow-xl z-50 animate-in slide-in-from-top-2 duration-200">
                <div className="py-2">
                  {getSearchSuggestions().map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full text-left px-4 py-2 hover:bg-blue-50 flex items-center space-x-3 transition-all duration-200 hover:translate-x-1"
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
                      className="w-full text-left px-4 py-2 hover:bg-blue-50 flex items-center space-x-3 text-blue-600 transition-all duration-200 hover:translate-x-1"
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

          {/* Right Side with enhanced animations */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* User Menu or Auth Buttons */}
            {user ? (
              <div className="flex items-center space-x-2 sm:space-x-4">
                <NotificationSystem />
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-1 sm:space-x-2 text-gray-800 hover:text-blue-600 transition-all duration-300 hover:scale-105"
                  >
                    {userProfile?.avatar_url ? (
                      <div
                        className={`transition-all duration-300 ${
                          isScrolled
                            ? "ring-2 ring-blue-200"
                            : "ring-2 ring-blue-100"
                        }`}
                      >
                        <Image
                          src={getAvatarUrl(userProfile.avatar_url) || ""}
                          alt={userProfile.full_name || "User"}
                          width={32}
                          height={32}
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover"
                        />
                      </div>
                    ) : (
                      <div
                        className={`w-7 h-7 sm:w-8 sm:h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm transition-all duration-300 ${
                          isScrolled
                            ? "ring-2 ring-blue-200"
                            : "ring-2 ring-blue-100"
                        }`}
                      >
                        {getUserInitial()}
                      </div>
                    )}
                    <span className="hidden sm:block text-sm font-medium">
                      {userProfile?.full_name ||
                        user.user_metadata?.full_name ||
                        "User"}
                    </span>
                    <ChevronDownIcon
                      className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 ${
                        isUserMenuOpen ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>

                  {/* User Dropdown Menu with glass effect */}
                  {isUserMenuOpen && (
                    <div
                      ref={userMenuRef}
                      className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-md shadow-xl py-1 z-50 border border-blue-100 animate-in slide-in-from-top-2 duration-200"
                    >
                      <Link
                        href={user ? `/profile/${user.id}` : "/profile"}
                        className="block px-4 py-2 text-sm text-gray-800 hover:bg-blue-50 transition-all duration-200 hover:translate-x-1"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        👤 Profil
                      </Link>
                      <Link
                        href="/write"
                        className="block px-4 py-2 text-sm text-gray-800 hover:bg-blue-50 transition-all duration-200 hover:translate-x-1"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        ✍️ Tulis Konten
                      </Link>
                      <Link
                        href="/my-articles"
                        className="block px-4 py-2 text-sm text-gray-800 hover:bg-blue-50 transition-all duration-200 hover:translate-x-1"
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
                            className="block px-4 py-2 text-sm text-blue-700 hover:bg-blue-50 transition-all duration-200 hover:translate-x-1 font-medium"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            🛡️ Admin Dashboard
                          </Link>
                          <Link
                            href="/admin/users"
                            className="block px-4 py-2 text-sm text-blue-700 hover:bg-blue-50 transition-all duration-200 hover:translate-x-1"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            👥 Kelola Users
                          </Link>
                          <Link
                            href="/admin/articles"
                            className="block px-4 py-2 text-sm text-blue-700 hover:bg-blue-50 transition-all duration-200 hover:translate-x-1"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            📚 Kelola Artikel
                          </Link>
                          <Link
                            href="/admin/reports"
                            className="flex items-center justify-between px-4 py-2 text-sm text-blue-700 hover:bg-blue-50 transition-all duration-200 hover:translate-x-1"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <span>🚨 Laporan</span>
                            {adminStats.pendingReports > 0 && (
                              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full min-w-[20px] text-center animate-pulse">
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
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-all duration-200 hover:translate-x-1"
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
                  className="text-gray-800 hover:text-blue-600 px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium transition-all duration-300 hover:scale-105"
                >
                  Masuk
                </Link>
                <Link
                  href="/auth/register"
                  className={`px-2 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-all duration-300 hover:scale-105 ${
                    isScrolled
                      ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                      : "bg-blue-500 hover:bg-blue-600 text-white shadow-md"
                  }`}
                >
                  Daftar
                </Link>
              </>
            )}

            {/* Mobile menu button with animation */}
            <button
              id="mobile-menu-button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-1.5 sm:p-2 text-gray-500 hover:text-blue-600 transition-all duration-300 hover:scale-110"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-5 w-5 sm:h-6 sm:w-6" />
              ) : (
                <Bars3Icon className="h-5 w-5 sm:h-6 sm:w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation with glass effect */}
        {isMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden py-4 border-t border-blue-100 bg-white/95 backdrop-blur-md animate-in slide-in-from-top-2 duration-200"
          >
            <div className="space-y-2">
              <Link
                href="/"
                className={`block px-3 py-2 transition-all duration-300 rounded-md hover:translate-x-1 ${
                  pathname === "/"
                    ? "text-blue-600 bg-blue-50 border border-blue-200 shadow-sm"
                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Beranda
              </Link>
              <Link
                href="/kategori"
                className={`block px-3 py-2 transition-all duration-300 rounded-md hover:translate-x-1 ${
                  pathname.startsWith("/kategori")
                    ? "text-blue-600 bg-blue-50 border border-blue-200 shadow-sm"
                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Kategori
              </Link>
              <Link
                href="/member"
                className={`block px-3 py-2 transition-all duration-300 rounded-md hover:translate-x-1 ${
                  pathname.startsWith("/member")
                    ? "text-blue-600 bg-blue-50 border border-blue-200 shadow-sm"
                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Member
              </Link>
              <Link
                href="/tentang"
                className={`block px-3 py-2 transition-all duration-300 rounded-md hover:translate-x-1 ${
                  pathname.startsWith("/tentang")
                    ? "text-blue-700 bg-blue-50 border border-blue-200 shadow-sm"
                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Tentang
              </Link>

              {/* Mobile Search with glass effect */}
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
                      placeholder="Cari konten, member..."
                      className="block w-full pl-10 pr-12 py-2 border border-blue-200 rounded-lg leading-5 bg-white/80 backdrop-blur-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300"
                    />
                    <button
                      type="submit"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <div className="bg-blue-600 hover:bg-blue-700 text-white p-1.5 rounded-md transition-all duration-300 hover:scale-110">
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
                    className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-all duration-300 hover:translate-x-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    👤 Profil
                  </Link>
                  <Link
                    href="/write"
                    className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-all duration-300 hover:translate-x-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    ✍️ Tulis Konten
                  </Link>
                  <Link
                    href="/my-articles"
                    className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-all duration-300 hover:translate-x-1"
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
                        className="block px-3 py-2 text-blue-600 hover:text-blue-700 transition-all duration-300 hover:translate-x-1 font-medium"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        🛡️ Admin Dashboard
                      </Link>
                      <Link
                        href="/admin/users"
                        className="block px-3 py-2 text-blue-600 hover:text-blue-700 transition-all duration-300 hover:translate-x-1"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        👥 Kelola Users
                      </Link>
                      <Link
                        href="/admin/articles"
                        className="block px-3 py-2 text-blue-600 hover:text-blue-700 transition-all duration-300 hover:translate-x-1"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        📚 Kelola Artikel
                      </Link>
                      <div className="flex items-center justify-between px-3 py-2">
                        <Link
                          href="/admin/reports"
                          className="text-blue-600 hover:text-blue-700 transition-all duration-300 hover:translate-x-1"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          🚨 Laporan
                        </Link>
                        {adminStats.pendingReports > 0 && (
                          <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
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
                    className="block w-full text-left px-3 py-2 text-red-600 transition-all duration-300 hover:translate-x-1"
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
