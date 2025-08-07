import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PaberLand - Komunitas Penulis Bacaan Anak Indonesia",
  description:
    "Platform komunitas penulis bacaan anak Indonesia untuk berbagi karya sastra, cerpen, puisi, dan artikel.",
  keywords: "member, sastra, cerpen, puisi, artikel, indonesia, komunitas",
  authors: [{ name: "PaberLand Team" }],
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-64x64.png", sizes: "64x64", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon-128x128.png", sizes: "128x128", type: "image/png" },
      { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon-256x256.png", sizes: "256x256", type: "image/png" },
      { url: "/logo_header.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/logo_header.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon-256x256.png",
    other: [{ url: "/favicon.ico", type: "image/x-icon" }],
  },
  openGraph: {
    title: "PaberLand - Komunitas Penulis Bacaan Anak Indonesia",
    description:
      "Platform komunitas penulis bacaan anak Indonesia untuk berbagi karya sastra, cerpen, puisi, dan artikel.",
    type: "website",
    locale: "id_ID",
    images: [
      {
        url: "/logo_header.png",
        width: 1200,
        height: 630,
        alt: "PaberLand Logo",
      },
    ],
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
          href="/favicon-16x16.png"
          type="image/png"
          sizes="16x16"
        />
        <link
          rel="icon"
          href="/favicon-32x32.png"
          type="image/png"
          sizes="32x32"
        />
        <link
          rel="icon"
          href="/favicon-48x48.png"
          type="image/png"
          sizes="48x48"
        />
        <link
          rel="icon"
          href="/favicon-64x64.png"
          type="image/png"
          sizes="64x64"
        />
        <link
          rel="icon"
          href="/favicon-96x96.png"
          type="image/png"
          sizes="96x96"
        />
        <link
          rel="icon"
          href="/favicon-128x128.png"
          type="image/png"
          sizes="128x128"
        />
        <link
          rel="icon"
          href="/favicon-192x192.png"
          type="image/png"
          sizes="192x192"
        />
        <link
          rel="icon"
          href="/favicon-256x256.png"
          type="image/png"
          sizes="256x256"
        />
        <link
          rel="icon"
          href="/logo_header.png"
          type="image/png"
          sizes="512x512"
        />
        <link rel="apple-touch-icon" href="/logo_header.png" sizes="180x180" />
        <link rel="shortcut icon" href="/favicon-256x256.png" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileImage" content="/favicon-256x256.png" />
      </head>
      <body
        className={`${inter.className} min-h-screen bg-white dark:bg-gray-900`}
      >
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 pt-24">{children}</main>
            <Footer />
          </div>
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
        </AuthProvider>
      </body>
    </html>
  );
}
