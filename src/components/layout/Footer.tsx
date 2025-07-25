import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-white via-blue-50 to-pink-50 border-t border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description - No Text, Only Logo */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-1 justify-start">
              <div className="w-full max-w-md h-16 overflow-hidden flex items-center">
                <Image
                  src="/logo.png"
                  alt="PaberLand"
                  width={400}
                  height={160}
                  className="h-auto w-full object-contain object-left"
                  style={{
                    objectFit: "contain",
                    objectPosition: "left center",
                    backgroundColor: "transparent",
                  }}
                />
              </div>
            </div>
            <p className="text-gray-800 mb-4 max-w-md">
              Platform komunitas penulis Indonesia untuk berbagi karya sastra,
              cerpen, puisi, dan artikel. Mari bersama membangun literasi
              Indonesia.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-blue-400 hover:text-blue-600 transition-colors"
              >
                <span className="sr-only">Facebook</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-pink-400 hover:text-pink-600 transition-colors"
              >
                <span className="sr-only">Instagram</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.73-3.016-1.789L4.659 16.5c-.568-1.059-.568-2.371 0-3.43l.774-1.302c.568-1.059 1.719-1.789 3.016-1.789h7.103c1.297 0 2.448.73 3.016 1.789l.774 1.302c.568 1.059.568 2.371 0 3.43l-.774 1.302c-.568 1.059-1.719 1.789-3.016 1.789H8.449z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-sky-400 hover:text-sky-600 transition-colors"
              >
                <span className="sr-only">Twitter</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Navigasi
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-800 hover:text-blue-600">
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  href="/kategori"
                  className="text-gray-800 hover:text-blue-600"
                >
                  Kategori
                </Link>
              </li>
              <li>
                <Link
                  href="/penulis"
                  className="text-gray-800 hover:text-blue-600"
                >
                  Penulis
                </Link>
              </li>
              <li>
                <Link
                  href="/write"
                  className="text-gray-800 hover:text-blue-600"
                >
                  Tulis Konten
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Kategori
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/kategori/cerpen"
                  className="text-gray-800 hover:text-blue-600"
                >
                  Cerpen
                </Link>
              </li>
              <li>
                <Link
                  href="/kategori/puisi"
                  className="text-gray-800 hover:text-blue-600"
                >
                  Puisi
                </Link>
              </li>
              <li>
                <Link
                  href="/kategori/artikel"
                  className="text-gray-800 hover:text-blue-600"
                >
                  Artikel
                </Link>
              </li>
              <li>
                <Link
                  href="/kategori/cerita-rakyat"
                  className="text-gray-800 hover:text-blue-600"
                >
                  Cerita Rakyat
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-blue-100">
          <div className="flex justify-between items-center">
            <p className="text-gray-700">
              © 2025 PaberLand. All rights reserved.
            </p>
            <p className="text-gray-700">
              Website by : Hafiyan Al Muqaffi Umary
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
