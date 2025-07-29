import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pastikan environment variables tersedia di client
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_TINYMCE_API_KEY: process.env.NEXT_PUBLIC_TINYMCE_API_KEY,
  },
  
  // Untuk debugging di production
  ...(process.env.NODE_ENV === 'development' && {
    logging: {
      fetches: {
        fullUrl: true,
      },
    },
  }),

  // Headers untuk CORS jika diperlukan
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ];
  },
};

export default nextConfig;
