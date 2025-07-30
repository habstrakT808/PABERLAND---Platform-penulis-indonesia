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
  openGraph: {
    title: "PaberLand - Komunitas Penulis Bacaan Anak Indonesia",
    description:
      "Platform komunitas penulis bacaan anak Indonesia untuk berbagi karya sastra, cerpen, puisi, dan artikel.",
    type: "website",
    locale: "id_ID",
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/logo_header.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo_header.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="msapplication-TileImage" content="/logo_header.png" />
      </head>
      <body
        className={`${inter.className} min-h-screen bg-white dark:bg-gray-900`}
      >
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
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
