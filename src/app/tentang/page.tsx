"use client";

import Image from "next/image";
import {
  ChevronDownIcon,
  SparklesIcon,
  HeartIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { useRef, useEffect, useState } from "react";

const members = [
  { name: "Ali Muakhir", img: "/img/ali-muakhir.jpg", role: "Pengawas" },
  { name: "Dewi Rieka", img: "/img/dewi-rieka.jpg", role: "Direktur" },
  {
    name: "Mita Akhsayanti",
    img: "/img/mita-akhsayanti.jpg",
    role: "Sekretaris I",
  },
  {
    name: "Tethy Ezokanzo",
    img: "/img/tethy-ezokanzo.jpg",
    role: "Sekretaris II",
  },
  { name: "Fita Chakra", img: "/img/fita-chakra.jpg", role: "Keuangan I" },
  { name: "Gina Sonia", img: "/img/gina-sonia.jpg", role: "Keuangan II" },
  { name: "Lina Herlina", img: "/img/lina-herlina.jpg", role: "Markom I" },
  {
    name: "Pramesetya Aniendita",
    img: "/img/pramesetya.jpg",
    role: "Markom II",
  },
  { name: "Sokat Rachman", img: "/img/sokat.jpg", role: "Div. Literasi I" },
  {
    name: "Syifa Nurhalimah",
    img: "/img/syifa-nurhalimah.jpg",
    role: "Div. Literasi II",
  },
];

const achievements = [
  {
    icon: "🏆",
    title: "JakBook Award 2012",
    desc: "Penghargaan bergengsi di bidang literasi",
  },
  {
    icon: "🎯",
    title: "Fasilitasi Kemendikbudristek 2023",
    desc: "Dipercaya pemerintah sebagai mitra",
  },
  {
    icon: "⭐",
    title: "Dominasi Lomba Nasional",
    desc: "Ratusan prestasi member di kompetisi",
  },
  {
    icon: "📚",
    title: "1000+ Karya Terbit",
    desc: "Ribuan buku anak telah diterbitkan",
  },
];

const stats = [
  { number: "22.000", label: "Facebook", color: "blue", icon: "👥" },
  { number: "1.025", label: "WhatsApp", color: "green", icon: "💬" },
  { number: "1.553", label: "Telegram", color: "pink", icon: "📱" },
  { number: "2.974", label: "Instagram", color: "yellow", icon: "📸" },
];

export default function Tentang() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleScroll = () => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-pink-50">
      {/* Floating Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-200/30 rounded-full blur-xl animate-float" />
        <div className="absolute top-32 right-20 w-16 h-16 bg-pink-200/30 rounded-full blur-lg animate-float-delayed" />
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-blue-200/30 rounded-full blur-xl animate-float" />
        <div className="absolute top-1/2 right-10 w-12 h-12 bg-purple-200/30 rounded-full blur-lg animate-float-delayed" />
      </div>

      {/* Hero Section Fullscreen */}
      <section className="relative h-screen flex flex-col justify-center items-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100" />
        <div className="absolute inset-0 bg-white/60" />
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/40 via-pink-200/40 to-blue-200/40" />

        {/* Large Decorative Circles */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-pink-300/20 to-yellow-200/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-tr from-blue-300/20 to-pink-200/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-purple-200/15 to-yellow-100/5 rounded-full blur-2xl animate-spin-slow" />

        {/* Content */}
        <div
          className={`relative z-10 max-w-4xl mx-auto px-6 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Sparkle Icons */}
          <div className="absolute -top-8 left-1/4 animate-bounce">
            <SparklesIcon className="w-8 h-8 text-yellow-400" />
          </div>
          <div className="absolute -top-4 right-1/4 animate-bounce delay-300">
            <StarIcon className="w-6 h-6 text-pink-400" />
          </div>

          <div className="mb-6">
            <span className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-semibold text-gray-700 shadow-lg border border-white/50">
              <HeartIcon className="w-4 h-4 mr-2 text-pink-500" />
              Sejak 2010 - 14 Tahun Bersama
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
            <span className="text-gray-900 drop-shadow-lg">Tentang </span>
            <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x">
              PaberLand
            </span>
          </h1>

          <div className="relative">
            <h2 className="text-xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-8 drop-shadow-sm">
              ✨ Merawat Sastra & Literasi Bacaan Anak ✨
            </h2>
          </div>

          <div className="max-w-3xl mx-auto mb-12">
            <p className="text-lg md:text-xl text-gray-800 leading-relaxed drop-shadow-sm bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/60">
              Forum Penulis Bacaan Anak{" "}
              <strong className="text-pink-600">PABERLAND</strong> adalah
              komunitas sastra dan literasi bacaan anak yang ramah untuk seluruh
              pegiat literasi bacaan anak. Berdiri sejak{" "}
              <strong className="text-blue-600">2 Mei 2010</strong>, PaberLand
              telah menjadi wadah inspirasi, edukasi, dan kolaborasi bagi{" "}
              <strong className="text-yellow-600">
                ribuan penulis, ilustrator, dan pegiat literasi
              </strong>{" "}
              di Indonesia.
            </p>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <button
              onClick={handleScroll}
              className="group relative bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full shadow-2xl hover:shadow-pink-200/50 transform hover:scale-105 transition-all duration-300 font-semibold text-lg"
            >
              <span className="flex items-center">
                Jelajahi Lebih Lanjut
                <SparklesIcon className="w-5 h-5 ml-2 group-hover:animate-spin" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </button>

            <button
              onClick={handleScroll}
              className="mt-4 flex items-center justify-center bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group border border-white/60"
              aria-label="Scroll ke Konten"
            >
              <ChevronDownIcon className="w-8 h-8 animate-bounce group-hover:scale-110 transition-transform text-blue-500" />
            </button>
          </div>
        </div>

        {/* Floating Text Elements */}
        <div className="absolute top-20 left-20 animate-float opacity-60">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border border-white/60">
            <span className="text-sm font-semibold text-gray-700">
              📚 Literasi
            </span>
          </div>
        </div>
        <div className="absolute bottom-32 right-20 animate-float-delayed opacity-60">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border border-white/60">
            <span className="text-sm font-semibold text-gray-700">
              ✍️ Kreatif
            </span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div ref={contentRef} className="relative z-10 pt-16 pb-20 px-4">
        {/* Achievements Section */}
        <section className="max-w-6xl mx-auto mb-20">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-black bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-4">
              🏆 Prestasi & Pencapaian
            </h3>
            <p className="text-gray-600 text-lg">
              Bangga dengan perjalanan dan prestasi yang telah diraih
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, i) => (
              <div
                key={i}
                className="group bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/60 hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:border-yellow-200"
                onMouseEnter={() => setActiveCard(i)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {achievement.icon}
                </div>
                <h4 className="font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors">
                  {achievement.title}
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {achievement.desc}
                </p>
                <div
                  className={`mt-4 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full transform origin-left transition-transform duration-300 ${
                    activeCard === i ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Profil Singkat */}
        <section className="max-w-4xl mx-auto mb-20">
          <div className="bg-gradient-to-br from-white/95 to-blue-50/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/60 p-8 md:p-12">
            <div className="text-center mb-8">
              <h3 className="text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                💫 Profil Singkat
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border-l-4 border-yellow-400 shadow-lg">
                  <h4 className="font-black text-yellow-700 mb-3 flex items-center">
                    <span className="text-2xl mr-2">🎯</span> VISI
                  </h4>
                  <p className="text-gray-800 leading-relaxed">
                    Terciptanya bacaan yang sehat, kreatif, dan sesuai dengan
                    anak-anak Indonesia.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 border-l-4 border-pink-400 shadow-lg">
                  <h4 className="font-black text-pink-700 mb-3 flex items-center">
                    <span className="text-2xl mr-2">🚀</span> MISI
                  </h4>
                  <p className="text-gray-800 leading-relaxed">
                    Menciptakan SDM di bidang tulis-menulis, menjalin kerjasama,
                    melindungi dan memberdayakan member.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border-l-4 border-blue-400 shadow-lg">
                  <h4 className="font-black text-blue-700 mb-3 flex items-center">
                    <span className="text-2xl mr-2">💎</span> BUDAYA
                  </h4>
                  <p className="text-gray-800 leading-relaxed">
                    <strong>A</strong>dvantageous, <strong>P</strong>
                    rofessional, <strong>I</strong>ntegrious, <strong>N</strong>
                    ationalistic, <strong>D</strong>edicated, <strong>O</strong>
                    bjective.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border-l-4 border-green-400 shadow-lg">
                  <h4 className="font-black text-green-700 mb-3 flex items-center">
                    <span className="text-2xl mr-2">🛠️</span> LAYANAN
                  </h4>
                  <p className="text-gray-800 leading-relaxed">
                    Bantuan hukum, pendampingan, pelatihan, konsultasi, ruang
                    belajar, ruang berprestasi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pengurus & Member Inti */}
        <section className="max-w-7xl mx-auto mb-20">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-black bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
              👥 Tim Hebat Kami
            </h3>
            <p className="text-gray-600 text-lg">
              Orang-orang luar biasa di balik kesuksesan PaberLand
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {members.map((member, i) => (
              <div
                className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/60 p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:border-pink-200"
                key={i}
              >
                <div className="relative mb-4">
                  <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-4 border-gradient-to-r from-pink-400 to-purple-400 shadow-lg group-hover:border-yellow-400 transition-all duration-300">
                    <Image
                      src={member.img}
                      alt={member.name}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <StarIcon className="w-3 h-3 text-white" />
                  </div>
                </div>

                <div className="text-center">
                  <h4 className="font-bold text-gray-900 text-sm mb-1 group-hover:text-pink-600 transition-colors">
                    {member.name}
                  </h4>
                  <p className="text-xs text-gray-500 font-medium">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Statistik Member */}
        <section className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
              📊 Komunitas Besar Kami
            </h3>
            <p className="text-gray-600 text-lg">
              Bergabunglah dengan ribuan member di berbagai platform
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div
                key={i}
                className={`group bg-gradient-to-br ${
                  stat.color === "blue"
                    ? "from-blue-50 to-blue-100 border-blue-200 hover:border-blue-300"
                    : stat.color === "green"
                    ? "from-green-50 to-green-100 border-green-200 hover:border-green-300"
                    : stat.color === "pink"
                    ? "from-pink-50 to-pink-100 border-pink-200 hover:border-pink-300"
                    : "from-yellow-50 to-yellow-100 border-yellow-200 hover:border-yellow-300"
                } backdrop-blur-sm rounded-2xl p-8 shadow-lg border-2 hover:shadow-2xl hover:scale-105 transition-all duration-300`}
              >
                <div className="text-center">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div
                    className={`text-4xl font-black mb-2 ${
                      stat.color === "blue"
                        ? "text-blue-600"
                        : stat.color === "green"
                        ? "text-green-600"
                        : stat.color === "pink"
                        ? "text-pink-600"
                        : "text-yellow-600"
                    } group-hover:scale-110 transition-transform duration-300`}
                  >
                    {stat.number}
                  </div>
                  <div className="font-bold text-gray-700 text-lg">
                    {stat.label}
                  </div>
                  <div className="text-sm text-gray-500 mt-2">Member Aktif</div>
                </div>
              </div>
            ))}
          </div>

          {/* Total Summary */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/60">
              <h4 className="text-2xl font-black text-gray-800 mb-4">
                🎉 Total Komunitas
              </h4>
              <div className="text-6xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                27.552+
              </div>
              <p className="text-gray-600 text-lg font-semibold">
                Member tersebar di seluruh platform digital
              </p>
              <div className="mt-6 flex justify-center space-x-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" />
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse delay-100" />
                <div className="w-3 h-3 bg-pink-400 rounded-full animate-pulse delay-200" />
                <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse delay-300" />
              </div>
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes gradient-x {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </div>
  );
}
