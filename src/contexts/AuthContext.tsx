"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        console.log("🔍 AuthContext: Initializing auth...");
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        console.log("🔍 AuthContext: Session check result:", {
          hasSession: !!session,
          hasUser: !!session?.user,
          userEmail: session?.user?.email,
          error: error?.message,
        });

        if (error) {
          console.error("❌ AuthContext: Error getting session:", error);
        } else if (session?.user) {
          console.log(
            "✅ AuthContext: Initial session found:",
            session.user.email
          );
          if (mounted) setUser(session.user);
        } else {
          console.log("ℹ️ AuthContext: No initial session");
        }
      } catch (error) {
        console.error("❌ AuthContext: Error in initializeAuth:", error);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log(
        "🔄 AuthContext: Auth state change:",
        event,
        session?.user?.email
      );
      if (!mounted) return;
      switch (event) {
        case "SIGNED_IN":
          if (session?.user) {
            console.log("✅ AuthContext: User signed in:", session.user.email);
            setUser(session.user);
            router.refresh(); // Refresh server components
          }
          break;
        case "SIGNED_OUT":
          console.log("👋 AuthContext: User signed out");
          setUser(null);
          router.refresh();
          break;
        case "TOKEN_REFRESHED":
          if (session?.user) {
            console.log(
              "🔄 AuthContext: Token refreshed for:",
              session.user.email
            );
            setUser(session.user);
          }
          break;
      }
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [router, supabase.auth]);

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("❌ Error signing out:", error);
      } else {
        setUser(null);
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error("❌ Unexpected error in signOut:", error);
    }
  };

  const refreshUser = async () => {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) {
        console.error("❌ Error refreshing user:", error);
        setUser(null);
      } else {
        console.log("✅ User refreshed:", user?.email);
        setUser(user);
      }
    } catch (error) {
      console.error("❌ Error in refreshUser:", error);
      setUser(null);
    }
  };

  const value = {
    user,
    loading,
    signOut,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
