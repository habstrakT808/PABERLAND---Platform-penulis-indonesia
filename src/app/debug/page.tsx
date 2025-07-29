"use client";

import { useEffect, useState } from "react";
import { getSupabaseClient } from "@/lib/supabase";

export default function DebugPage() {
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkEverything = async () => {
      const supabase = getSupabaseClient();

      try {
        // Test environment variables
        const envVars = {
          supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
          supabaseKeyExists: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          supabaseKeyLength: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length,
          nodeEnv: process.env.NODE_ENV,
          vercelEnv: process.env.VERCEL_ENV,
          vercelUrl: process.env.VERCEL_URL,
        };

        // Test Supabase connection
        const { data: testData, error: testError } = await supabase
          .from("articles")
          .select("count")
          .limit(1);

        // Test session
        const { data: sessionData, error: sessionError } =
          await supabase.auth.getSession();

        setDebugInfo({
          envVars,
          supabaseTest: {
            success: !testError,
            error: testError?.message,
            data: testData,
          },
          session: {
            hasSession: !!sessionData.session,
            hasUser: !!sessionData.session?.user,
            userEmail: sessionData.session?.user?.email,
            error: sessionError?.message,
          },
          window: {
            location:
              typeof window !== "undefined" ? window.location.href : "server",
            domain:
              typeof window !== "undefined"
                ? window.location.hostname
                : "server",
          },
        });
      } catch (err) {
        setDebugInfo({ error: err });
      } finally {
        setLoading(false);
      }
    };

    checkEverything();
  }, []);

  if (loading) return <div className="p-8">Loading debug info...</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🔍 Debug Information</h1>
      <pre className="bg-gray-100 p-4 rounded text-xs overflow-auto whitespace-pre-wrap">
        {JSON.stringify(debugInfo, null, 2)}
      </pre>
    </div>
  );
}
