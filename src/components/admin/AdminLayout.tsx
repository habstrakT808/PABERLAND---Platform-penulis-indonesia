// src/components/admin/AdminLayout.tsx
"use client";

import { useState, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import { adminHelpers, AdminStats } from "@/lib/adminHelpers";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const adminStats = await adminHelpers.getAdminStats();
      setStats(adminStats);
    } catch (error) {
      console.error("Error fetching admin stats:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 flex">
      <AdminSidebar pendingReports={stats?.pendingReports || 0} />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
