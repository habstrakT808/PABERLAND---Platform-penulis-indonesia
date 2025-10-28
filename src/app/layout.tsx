import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MaintenanceMode from "@/components/common/MaintenanceMode";
import { AuthProvider } from "@/contexts/AuthContext";
import { SettingsProvider } from "@/contexts/SettingsContext";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

// Use a single base URL for absolute metadata links
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "PaberLand - Komunitas Penulis Bacaan Anak Indonesia",
  description:
    "Platform komunitas penulis bacaan anak Indonesia untuk berbagi karya sastra, cerpen, puisi, dan artikel.",
  keywords: "member, sastra, cerpen, puisi, artikel, indonesia, komunitas",
  authors: [{ name: "PaberLand Team" }],
  icons: {
    icon: [
      { url: "/favicon-16x16.png?v=2", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png?v=2", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png?v=2", sizes: "48x48", type: "image/png" },
      { url: "/favicon-64x64.png?v=2", sizes: "64x64", type: "image/png" },
      { url: "/favicon-96x96.png?v=2", sizes: "96x96", type: "image/png" },
      { url: "/favicon-128x128.png?v=2", sizes: "128x128", type: "image/png" },
      { url: "/favicon-192x192.png?v=2", sizes: "192x192", type: "image/png" },
      { url: "/favicon-256x256.png?v=2", sizes: "256x256", type: "image/png" },
      { url: "/logo_header.png?v=2", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/logo_header.png?v=2", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon-256x256.png?v=2",
    other: [{ url: "/favicon.ico?v=2", type: "image/x-icon" }],
  },
  openGraph: {
    title: "PaberLand - Komunitas Penulis Bacaan Anak Indonesia",
    description:
      "Platform komunitas penulis bacaan anak Indonesia untuk berbagi karya sastra, cerpen, puisi, dan artikel.",
    type: "website",
    locale: "id_ID",
    url: BASE_URL,
    images: [
      {
        url: `${BASE_URL}/logo_header.png?v=2`,
        width: 1200,
        height: 630,
        alt: "PaberLand Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PaberLand - Komunitas Penulis Bacaan Anak Indonesia",
    description:
      "Platform komunitas penulis bacaan anak Indonesia untuk berbagi karya sastra, cerpen, puisi, dan artikel.",
    images: [`${BASE_URL}/logo_header.png?v=2`],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link
          rel="icon"
          href="/favicon-16x16.png?v=2"
          type="image/png"
          sizes="16x16"
        />
        <link
          rel="icon"
          href="/favicon-32x32.png?v=2"
          type="image/png"
          sizes="32x32"
        />
        <link
          rel="icon"
          href="/favicon-48x48.png?v=2"
          type="image/png"
          sizes="48x48"
        />
        <link
          rel="icon"
          href="/favicon-64x64.png?v=2"
          type="image/png"
          sizes="64x64"
        />
        <link
          rel="icon"
          href="/favicon-96x96.png?v=2"
          type="image/png"
          sizes="96x96"
        />
        <link
          rel="icon"
          href="/favicon-128x128.png?v=2"
          type="image/png"
          sizes="128x128"
        />
        <link
          rel="icon"
          href="/favicon-192x192.png?v=2"
          type="image/png"
          sizes="192x192"
        />
        <link
          rel="icon"
          href="/favicon-256x256.png?v=2"
          type="image/png"
          sizes="256x256"
        />
        <link
          rel="icon"
          href="/logo_header.png?v=2"
          type="image/png"
          sizes="512x512"
        />
        <link rel="apple-touch-icon" href="/logo_header.png?v=2" sizes="180x180" />
        <link rel="shortcut icon" href="/favicon-256x256.png?v=2" />
        <link rel="icon" href="/favicon.ico?v=2" type="image/x-icon" />
        <link rel="manifest" href="/manifest.json?v=2" />
        <meta name="msapplication-TileImage" content="/favicon-256x256.png?v=2" />
      </head>
      <body
        className={`${inter.className} min-h-screen bg-white dark:bg-gray-900`}
      >
        <AuthProvider>
          <SettingsProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-1 pt-24">{children}</main>
              <Footer />
            </div>
            <MaintenanceMode />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: "#363636",
                  color: "#fff",
                },
              }}
            />
          </SettingsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
