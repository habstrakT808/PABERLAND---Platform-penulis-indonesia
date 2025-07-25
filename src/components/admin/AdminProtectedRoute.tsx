// src/components/admin/AdminProtectedRoute.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { adminHelpers } from "@/lib/adminHelpers";

interface AdminProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export default function AdminProtectedRoute({
  children,
  redirectTo = "/",
}: AdminProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!loading) {
        if (!user) {
          router.push("/auth/login");
          return;
        }

        try {
          const adminStatus = await adminHelpers.isUserAdmin(user.id);
          if (!adminStatus) {
            router.push(redirectTo);
            return;
          }
          setIsAdmin(true);
        } catch (error) {
          console.error("Error checking admin status:", error);
          router.push(redirectTo);
        } finally {
          setChecking(false);
        }
      }
    };

    checkAdminStatus();
  }, [user, loading, redirectTo, router]);

  // Show loading spinner while checking
  if (loading || checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Memverifikasi akses admin...
          </p>
        </div>
      </div>
    );
  }

  // Don't render children if not admin
  if (!isAdmin) {
    return null;
  }

  return <>{children}</>;
}
