// src/components/admin/AdminSidebar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  UsersIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  ChartBarIcon,
  StarIcon,
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: HomeIcon,
    exact: true,
  },
  {
    name: "Manajemen User",
    href: "/admin/users",
    icon: UsersIcon,
  },
  {
    name: "Manajemen Konten",
    href: "/admin/articles",
    icon: DocumentTextIcon,
  },
  {
    name: "Laporan Konten",
    href: "/admin/reports",
    icon: ExclamationTriangleIcon,
    badge: "pending",
  },
  {
    name: "Konten Featured",
    href: "/admin/featured",
    icon: StarIcon,
  },
  {
    name: "Analytics",
    href: "/admin/analytics",
    icon: ChartBarIcon,
  },
  {
    name: "Activity Logs",
    href: "/admin/logs",
    icon: ClipboardDocumentListIcon,
  },
  {
    name: "Pengaturan",
    href: "/admin/settings",
    icon: Cog6ToothIcon,
  },
];

interface AdminSidebarProps {
  pendingReports?: number;
}

export default function AdminSidebar({
  pendingReports = 0,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (href: string, exact?: boolean) => {
    if (exact) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <div
      className={`bg-white/95 shadow-sm border-r border-blue-100 transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 border-b border-blue-100">
        {!collapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Admin Panel</h2>
              <p className="text-xs text-gray-600">PaberLand Management</p>
            </div>
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
        >
          {collapsed ? (
            <ChevronRightIcon className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronLeftIcon className="w-4 h-4 text-gray-500" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const IconComponent = item.icon;
            const active = isActive(item.href, item.exact);

            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-700 hover:bg-blue-50"
                  }`}
                  title={collapsed ? item.name : undefined}
                >
                  <IconComponent className="w-5 h-5 flex-shrink-0" />

                  {!collapsed && (
                    <>
                      <span className="ml-3">{item.name}</span>

                      {/* Badge for pending reports */}
                      {item.badge === "pending" && pendingReports > 0 && (
                        <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full min-w-[20px] text-center">
                          {pendingReports > 99 ? "99+" : pendingReports}
                        </span>
                      )}
                    </>
                  )}

                  {/* Collapsed badge */}
                  {collapsed &&
                    item.badge === "pending" &&
                    pendingReports > 0 && (
                      <span className="absolute left-8 top-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[16px] text-center">
                        {pendingReports > 9 ? "9+" : pendingReports}
                      </span>
                    )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Back to Main Site */}
    </div>
  );
}
