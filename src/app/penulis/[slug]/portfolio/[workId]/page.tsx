"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SignedImage from "@/components/common/SignedImage";
import {
  ArrowLeftIcon,
  CalendarIcon,
  TagIcon,
  TrophyIcon,
  BookOpenIcon,
  PencilIcon,
  TrashIcon,
  MapPinIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "@/contexts/AuthContext";
import {
  portfolioHelpers,
  supabase,
  getAvatarUrl,
  PortfolioWork,
} from "@/lib/supabase";
import toast from "react-hot-toast";

interface AuthorProfile {
  id: string;
  full_name: string;
  avatar_url: string;
  role: string;
}

export default function PortfolioWorkDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const slug = params.slug as string;
  const workId = params.workId as string;

  const [work, setWork] = useState<PortfolioWork | null>(null);
  const [author, setAuthor] = useState<AuthorProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (workId && slug) {
      fetchWorkData();
    }
  }, [workId, slug]);

  const fetchWorkData = async () => {
    try {
      // First, get the author profile with proper slug resolution
      let authorProfile;
      let profileError;

      // Try to find by UUID first
      const { data: uuidProfile, error: uuidError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", slug)
        .single();

      if (uuidProfile) {
        authorProfile = uuidProfile;
      } else {
        // If not found by UUID, try to find by name slug with sequential numbering
        const slugParts = slug.split("-");
        if (
          slugParts.length >= 2 &&
          !isNaN(Number(slugParts[slugParts.length - 1]))
        ) {
          // New format: name-number (e.g., mamat-alamat-2)
          const number = parseInt(slugParts[slugParts.length - 1]);
          const namePart = slugParts.slice(0, -1).join("-");
          const nameSlug = namePart.replace(/-/g, " ").toLowerCase();
          const { data: nameProfiles, error: nameError } = await supabase
            .from("profiles")
            .select("*")
            .ilike("full_name", `%${nameSlug}%`)
            .order("created_at", { ascending: true });
          if (nameProfiles && nameProfiles.length > 0) {
            if (number > 0 && number <= nameProfiles.length) {
              authorProfile = nameProfiles[number - 1];
            } else {
              profileError = new Error("User not found at specified position");
            }
          } else {
            profileError = nameError;
          }
        } else {
          // Old format: name only (for backward compatibility)
          const nameSlug = slug.replace(/-/g, " ").toLowerCase();
          const { data: nameProfiles, error: nameError } = await supabase
            .from("profiles")
            .select("*")
            .ilike("full_name", `%${nameSlug}%`)
            .order("created_at", { ascending: true }); // Order by creation date
          if (nameProfiles && nameProfiles.length > 0) {
            authorProfile = nameProfiles[0]; // For backward compatibility, take the first (oldest) user
          } else {
            profileError = nameError;
          }
        }
      }

      if (profileError || !authorProfile) {
        console.error("Author not found:", profileError);
        console.error("Slug attempted:", slug);
        toast.error("Author tidak ditemukan");
        router.push("/penulis");
        return;
      }

      console.log("Found profile:", authorProfile.full_name, "for slug:", slug);

      setAuthor(authorProfile);

      // Then, get the portfolio work
      const result = await portfolioHelpers.getPortfolioWorkById(workId);
      if (result.success && result.data) {
        setWork(result.data);
      } else {
        toast.error("Karya portfolio tidak ditemukan");
        router.push(`/penulis/${slug}/portfolio`);
      }
    } catch (error) {
      console.error("Error fetching work data:", error);
      toast.error("Gagal memuat data karya");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteWork = async () => {
    if (!user || !work || user.id !== work.author_id) return;

    if (!confirm("Apakah Anda yakin ingin menghapus karya ini?")) return;

    try {
      const result = await portfolioHelpers.deletePortfolioWork(
        work.id,
        user.id
      );
      if (result.success) {
        toast.success("Karya berhasil dihapus!");
        router.push(`/penulis/${slug}/portfolio`);
      } else {
        toast.error("Gagal menghapus karya: " + result.error);
      }
    } catch (error) {
      console.error("Error deleting work:", error);
      toast.error("Terjadi kesalahan saat menghapus karya");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-700">Memuat detail karya...</p>
        </div>
      </div>
    );
  }

  if (!work || !author) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Karya Tidak Ditemukan
          </h1>
          <p className="text-gray-700 mb-6">
            Karya yang Anda cari tidak ditemukan atau telah dihapus.
          </p>
          <Link
            href={`/penulis/${slug}/portfolio`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Kembali ke Portfolio
          </Link>
        </div>
      </div>
    );
  }

  const isOwnWork = user && user.id === work.author_id;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-pink-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-blue-600">
            Beranda
          </Link>
          <span>/</span>
          <Link href="/penulis" className="hover:text-blue-600">
            Member
          </Link>
          <span>/</span>
          <Link href={`/penulis/${slug}`} className="hover:text-blue-600">
            {author.full_name}
          </Link>
          <span>/</span>
          <Link
            href={`/penulis/${slug}/portfolio`}
            className="hover:text-blue-600"
          >
            Portfolio
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{work.title}</span>
        </nav>

        {/* Header */}
        <div className="bg-white/95 rounded-xl shadow-sm p-8 mb-8 border border-blue-100">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                📚 {work.title}
              </h1>

              {/* Author Info */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600">Oleh:</span>
                  <Link
                    href={`/penulis/${slug}`}
                    className="font-medium text-blue-600 hover:text-blue-700"
                  >
                    {author.full_name}
                  </Link>
                </div>
                <span className="text-gray-400">•</span>
                <div className="flex items-center text-sm text-gray-600">
                  <CalendarIcon className="w-4 h-4 mr-1" />
                  Ditambahkan {formatDate(work.created_at)}
                </div>
              </div>

              {/* Status Badge */}
              <div className="mb-6">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    work.status === "published"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  <BookOpenIcon className="w-4 h-4 mr-1" />
                  {work.status === "published" ? "Dipublikasikan" : "Draft"}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              {isOwnWork && (
                <>
                  <Link
                    href={`/portfolio/edit/${work.id}`}
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    <PencilIcon className="w-4 h-4" />
                    <span>Edit</span>
                  </Link>

                  <button
                    onClick={handleDeleteWork}
                    className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    <TrashIcon className="w-4 h-4" />
                    <span>Hapus</span>
                  </button>
                </>
              )}

              <Link
                href={`/penulis/${slug}/portfolio`}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeftIcon className="w-4 h-4" />
                <span>Kembali</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Cover Image */}
            {work.cover_image && (
              <div className="bg-white/95 rounded-xl shadow-sm p-6 mb-8 border border-blue-100">
                <div className="aspect-w-16 aspect-h-9">
                  <SignedImage
                    src={work.cover_image}
                    alt={work.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              </div>
            )}

            {/* Description */}
            <div className="bg-white/95 rounded-xl shadow-sm p-8 mb-8 border border-blue-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                📖 Deskripsi Karya
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                  {work.description || "Tidak ada deskripsi"}
                </p>
              </div>
            </div>

            {/* Awards */}
            {work.awards && work.awards.length > 0 && (
              <div className="bg-white/95 rounded-xl shadow-sm p-8 mb-8 border border-blue-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  🏆 Penghargaan
                </h2>
                <div className="space-y-3">
                  {work.awards.map((award, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <StarIcon className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                      <span className="text-gray-800">{award}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {work.tags && work.tags.length > 0 && (
              <div className="bg-white/95 rounded-xl shadow-sm p-8 border border-blue-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  🏷️ Tag
                </h2>
                <div className="flex flex-wrap gap-2">
                  {work.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Work Details */}
              <div className="bg-white/95 rounded-xl shadow-sm p-6 border border-blue-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  📋 Detail Karya
                </h3>
                <div className="space-y-4">
                  <div>
                    <span className="text-sm font-medium text-gray-600">
                      Kategori
                    </span>
                    <p className="text-gray-900">{work.category}</p>
                  </div>

                  {work.genre && (
                    <div>
                      <span className="text-sm font-medium text-gray-600">
                        Genre
                      </span>
                      <p className="text-gray-900">{work.genre}</p>
                    </div>
                  )}

                  {work.publisher && (
                    <div>
                      <span className="text-sm font-medium text-gray-600">
                        Penerbit
                      </span>
                      <p className="text-gray-900">{work.publisher}</p>
                    </div>
                  )}

                  {work.year_created && (
                    <div>
                      <span className="text-sm font-medium text-gray-600">
                        Tahun Dibuat
                      </span>
                      <p className="text-gray-900">{work.year_created}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* External Link */}
              {work.external_link && (
                <div className="bg-white/95 rounded-xl shadow-sm p-6 border border-blue-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    🔗 Link Eksternal
                  </h3>
                  <a
                    href={work.external_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    <TrophyIcon className="w-4 h-4" />
                    <span>Lihat Karya</span>
                  </a>
                </div>
              )}

              {/* Author Info */}
              <div className="bg-white/95 rounded-xl shadow-sm p-6 border border-blue-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  👤 Tentang Penulis
                </h3>
                <div className="flex items-center space-x-3 mb-4">
                  {author.avatar_url ? (
                    <Image
                      src={getAvatarUrl(author.avatar_url) || ""}
                      alt={author.full_name}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      {author.full_name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <Link
                      href={`/penulis/${slug}`}
                      className="font-medium text-gray-900 hover:text-blue-600"
                    >
                      {author.full_name}
                    </Link>
                    <p className="text-sm text-gray-600">{author.role}</p>
                  </div>
                </div>
                <Link
                  href={`/penulis/${slug}/portfolio`}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Lihat Portfolio Lengkap →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
