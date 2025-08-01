// src/app/admin/users/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { adminHelpers } from "@/lib/adminHelpers";
import { supabase, getAvatarUrl } from "@/lib/supabase";
import AdminProtectedRoute from "@/components/admin/AdminProtectedRoute";
import AdminLayout from "@/components/admin/AdminLayout";
import Image from "next/image";
import {
  MagnifyingGlassIcon,
  UserPlusIcon,
  ShieldCheckIcon,
  NoSymbolIcon,
  EllipsisVerticalIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

interface User {
  id: string;
  full_name: string;
  phone: string | null;
  bio: string | null;
  avatar_url: string | null;
  is_admin: boolean;
  admin_role: string | null;
  admin_since: string | null;
  created_at: string;
  updated_at: string;
  suspended?: boolean;
}

function AdminUsersContent() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Pagination & Filters
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "admin" | "regular">("all");

  // UI States
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserMenu, setShowUserMenu] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const itemsPerPage = 10;

  useEffect(() => {
    fetchUsers();
  }, [currentPage, search, filter]);

  const fetchUsers = async (showRefreshIndicator = false) => {
    if (showRefreshIndicator) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      const result = await adminHelpers.getUsers(
        currentPage,
        itemsPerPage,
        search || undefined,
        filter
      );

      setUsers(result.users);
      setTotalPages(result.totalPages);
      setTotalCount(result.totalCount);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Gagal memuat data users");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchUsers();
  };

  const handleFilterChange = (newFilter: "all" | "admin" | "regular") => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  const handlePromoteToAdmin = async (userId: string, userName: string) => {
    if (!currentUser) return;

    setActionLoading(userId);
    try {
      const result = await adminHelpers.promoteToAdmin(userId, currentUser.id);

      if (result.success) {
        toast.success(`${userName} berhasil dipromosikan menjadi admin!`);
        fetchUsers(true);
      } else {
        toast.error(result.error || "Gagal mempromosikan user");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan sistem");
    } finally {
      setActionLoading(null);
      setShowUserMenu(null);
    }
  };

  const handleDeleteUser = async (userId: string, userName: string) => {
    if (!currentUser) return;
    if (
      !confirm(
        `Yakin ingin menghapus user "${userName}"? Tindakan ini tidak dapat dibatalkan!`
      )
    )
      return;
    setActionLoading(userId);
    try {
      const result = await adminHelpers.deleteUser(userId, currentUser.id);
      if (result.success) {
        toast.success(`User "${userName}" berhasil dihapus.`);
        fetchUsers();
      } else {
        toast.error(result.error || "Gagal menghapus user");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat menghapus user");
    } finally {
      setActionLoading(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getUserInitial = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  const getFilterCounts = () => {
    // This would ideally come from the API, but for now we'll calculate from current data
    const adminCount = users.filter((u) => u.is_admin).length;
    const regularCount = users.filter((u) => !u.is_admin).length;

    return {
      all: totalCount,
      admin: adminCount,
      regular: regularCount,
    };
  };

  if (loading && !refreshing) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-blue-100 rounded w-1/3 mb-8"></div>
          <div className="space-y-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="bg-white/95 p-6 rounded-xl border border-blue-100"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-blue-100 rounded w-1/3 mb-2"></div>
                    <div className="h-3 bg-blue-100 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              👥 Manajemen Users
            </h1>
            <p className="text-gray-700 mt-1">
              Kelola semua users platform PaberLand
            </p>
          </div>

          <button
            onClick={() => fetchUsers(true)}
            disabled={refreshing}
            className="inline-flex items-center px-4 py-2 border border-blue-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-blue-50 transition-colors disabled:opacity-50"
          >
            <ArrowPathIcon
              className={`w-5 h-5 mr-2 ${refreshing ? "animate-spin" : ""}`}
            />
            {refreshing ? "Memuat..." : "Refresh"}
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/95 rounded-xl shadow-sm p-6 mb-8 border border-blue-100">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 max-w-md">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari nama atau nomor HP..."
                className="block w-full pl-10 pr-3 py-2 border border-blue-200 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </form>

          {/* Filter Tabs */}
          <div className="flex items-center space-x-1 bg-blue-100 rounded-lg p-1">
            {(["all", "admin", "regular"] as const).map((filterOption) => (
              <button
                key={filterOption}
                onClick={() => handleFilterChange(filterOption)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  filter === filterOption
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {filterOption === "all" && `Semua (${getFilterCounts().all})`}
                {filterOption === "admin" &&
                  `Admin (${getFilterCounts().admin})`}
                {filterOption === "regular" &&
                  `Regular (${getFilterCounts().regular})`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Users List */}
      {users.length === 0 ? (
        <div className="bg-white/95 rounded-xl shadow-sm p-12 text-center border border-blue-100">
          <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
            <UserPlusIcon className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Tidak Ada Users
          </h3>
          <p className="text-gray-600">
            {search || filter !== "all"
              ? "Tidak ditemukan users yang sesuai dengan filter."
              : "Belum ada users yang terdaftar."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white/95 rounded-xl shadow-sm p-6 border border-blue-100 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Avatar */}
                  <div className="relative">
                    {user.avatar_url ? (
                      <Image
                        src={getAvatarUrl(user.avatar_url) || ""}
                        alt={user.full_name}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                        {getUserInitial(user.full_name)}
                      </div>
                    )}

                    {user.is_admin && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center border-2 border-white">
                        <ShieldCheckIcon className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>

                  {/* User Info */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-bold text-gray-900">
                        {user.full_name}
                      </h3>

                      {user.is_admin && (
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                          {user.admin_role === "super_admin"
                            ? "Super Admin"
                            : "Admin"}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 mt-1 text-sm text-gray-600">
                      <span>📧 {user.id}</span>
                      {user.phone && <span>📱 {user.phone}</span>}
                      <span>📅 Bergabung {formatDate(user.created_at)}</span>
                      {user.admin_since && (
                        <span>
                          👑 Admin sejak {formatDate(user.admin_since)}
                        </span>
                      )}
                    </div>

                    {user.bio && (
                      <p className="text-gray-600 mt-2 line-clamp-2">
                        {user.bio}
                      </p>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="relative">
                  <button
                    onClick={() =>
                      setShowUserMenu(showUserMenu === user.id ? null : user.id)
                    }
                    className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                    disabled={actionLoading === user.id}
                  >
                    {actionLoading === user.id ? (
                      <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <EllipsisVerticalIcon className="w-5 h-5 text-gray-500" />
                    )}
                  </button>

                  {/* Action Menu */}
                  {showUserMenu === user.id && (
                    <div className="absolute right-0 mt-2 w-48 bg-white/95 rounded-lg shadow-lg border border-blue-100 z-10">
                      <div className="py-1">
                        {!user.is_admin && (
                          <button
                            onClick={() =>
                              handlePromoteToAdmin(user.id, user.full_name)
                            }
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
                          >
                            <ShieldCheckIcon className="w-4 h-4 inline mr-2" />
                            Jadikan Admin
                          </button>
                        )}

                        <button
                          onClick={() =>
                            handleDeleteUser(user.id, user.full_name)
                          }
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-blue-50 transition-colors"
                        >
                          <NoSymbolIcon className="w-4 h-4 inline mr-2" />
                          Hapus User
                        </button>

                        <div className="border-t border-blue-100 my-1"></div>

                        <button
                          onClick={() => setShowUserMenu(null)}
                          className="w-full text-left px-4 py-2 text-sm text-gray-500 hover:bg-blue-50 transition-colors"
                        >
                          Tutup
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Sebelumnya
            </button>

            {/* Page Numbers */}
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum =
                Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    currentPage === pageNum
                      ? "bg-blue-600 text-white"
                      : "text-gray-500 bg-white border border-blue-200 hover:bg-blue-50"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Selanjutnya
            </button>
          </div>
        </div>
      )}

      {/* Results Info */}
      <div className="mt-4 text-sm text-gray-600 text-center">
        Menampilkan {users.length} dari {totalCount} users
      </div>
    </div>
  );
}

export default function AdminUsersPage() {
  return (
    <AdminProtectedRoute>
      <AdminLayout>
        <AdminUsersContent />
      </AdminLayout>
    </AdminProtectedRoute>
  );
}
