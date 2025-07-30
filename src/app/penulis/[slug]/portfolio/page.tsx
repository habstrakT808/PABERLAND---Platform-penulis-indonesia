"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { portfolioHelpers, supabase } from "@/lib/supabase";
import {
  BookOpenIcon,
  CalendarIcon,
  TagIcon,
  TrophyIcon,
  ArrowTopRightOnSquareIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "@/contexts/AuthContext";
import SignedImage from "@/components/common/SignedImage";
import { debugPortfolioWorks, cleanInvalidCoverImages } from "@/lib/supabase";
import toast from "react-hot-toast";

export default function PortfolioPage() {
  const params = useParams();
  const { user } = useAuth();
  const [portfolioWorks, setPortfolioWorks] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [authorProfile, setAuthorProfile] = useState<any>(null);

  const slug = params.slug as string;

  const handleDeleteWork = async (workId: string) => {
    if (!user || !authorProfile || user.id !== authorProfile.id) return;

    if (!confirm("Apakah Anda yakin ingin menghapus karya ini?")) return;

    try {
      const result = await portfolioHelpers.deletePortfolioWork(
        workId,
        user.id
      );
      if (result.success) {
        toast.success("Karya berhasil dihapus!");
        fetchPortfolioData(authorProfile.id); // reload data
      } else {
        toast.error("Gagal menghapus karya: " + result.error);
      }
    } catch (error) {
      console.error("Error deleting work:", error);
      toast.error("Terjadi kesalahan saat menghapus karya");
    }
  };

  useEffect(() => {
    if (slug) {
      fetchAuthorProfile();
    }
    // Deteksi mode responsif
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [slug]);

  const fetchAuthorProfile = async () => {
    try {
      // Check if slug is a UUID or name slug
      let profile;
      let profileError;

      // Try to find by UUID first
      const { data: uuidProfile, error: uuidError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", slug)
        .single();

      if (uuidProfile) {
        profile = uuidProfile;
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
              profile = nameProfiles[number - 1];
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
            profile = nameProfiles[0]; // For backward compatibility, take the first (oldest) user
          } else {
            profileError = nameError;
          }
        }
      }

      if (profileError || !profile) {
        console.error("Author not found:", profileError);
        console.error("Slug attempted:", slug); // Added for debugging
        notFound();
        return;
      }
      console.log("Found profile:", profile.full_name, "for slug:", slug); // Added for debugging

      setAuthorProfile(profile);
      fetchPortfolioData(profile.id);
    } catch (error) {
      console.error("Error fetching author profile:", error);
      notFound();
    }
  };

  const fetchPortfolioData = async (authorId: string) => {
    try {
      const [works, portfolioStats] = await Promise.all([
        portfolioHelpers.getAuthorPortfolio(authorId),
        portfolioHelpers.getPortfolioStats(authorId),
      ]);

      setPortfolioWorks(works);
      setStats(portfolioStats);

      // Debug: Check portfolio works and their cover images
      await debugPortfolioWorks(authorId);

      // Clean invalid cover images
      await cleanInvalidCoverImages(authorId);
    } catch (error) {
      console.error("Error fetching portfolio data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-700">Memuat portofolio...</p>
        </div>
      </div>
    );
  }

  if (!authorProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Member Tidak Ditemukan
          </h1>
          <p className="text-gray-700 mb-6">
            Member yang Anda cari tidak ditemukan atau telah dihapus.
          </p>
          <Link
            href="/penulis"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Kembali ke Direktori Member
          </Link>
        </div>
      </div>
    );
  }

  const isOwnPortfolio = user && user.id === authorProfile.id;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
            {authorProfile.full_name}
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">Portfolio</span>
        </nav>

        {/* Header */}
        <div className="bg-white/95 rounded-xl shadow-sm p-8 mb-8 border border-blue-100">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                📚 Portfolio Karya {authorProfile.full_name}
              </h1>
              <p className="text-gray-700">
                Koleksi karya terbaik dari member PaberLand
              </p>
            </div>

            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              {isOwnPortfolio && (
                <Link
                  href="/portfolio/add"
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  <PlusIcon className="w-4 h-4" />
                  <span>Tambah Prestasi</span>
                </Link>
              )}

              <Link
                href={`/penulis/${slug}`}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <BookOpenIcon className="w-4 h-4" />
                <span>Kembali ke Profil</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-center mb-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/95 rounded-xl shadow-sm p-6 text-center border border-blue-100">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {stats.totalWorks || 0}
              </div>
              <div className="text-sm text-gray-700">Total Karya</div>
            </div>

            <div className="bg-white/95 rounded-xl shadow-sm p-6 text-center border border-blue-100">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {stats.publishedWorks || 0}
              </div>
              <div className="text-sm text-gray-700">Karya Dipublikasikan</div>
            </div>
          </div>
        </div>

        {/* Portfolio Works */}
        {portfolioWorks.length === 0 ? (
          <div className="bg-white/95 rounded-xl shadow-sm p-12 text-center border border-blue-100">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Belum Ada Karya Portfolio
            </h3>
            <p className="text-gray-700 mb-6">
              {isOwnPortfolio
                ? "Anda belum menambahkan karya portfolio apapun."
                : `${authorProfile.full_name} belum menambahkan karya portfolio apapun.`}
            </p>
            {isOwnPortfolio && (
              <Link
                href="/portfolio/add"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-block"
              >
                Tambah Karya Pertama
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioWorks.map((work) => (
              <div
                key={work.id}
                className="bg-white/95 rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-blue-100"
              >
                {/* Cover Image */}
                {work.cover_image && (
                  <div className="aspect-w-16 aspect-h-9">
                    <SignedImage
                      src={work.cover_image}
                      alt={work.title}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                )}

                <div className="p-6">
                  {/* Work Meta */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                      <TrophyIcon className="w-4 h-4 mr-1" />
                      {work.category}
                    </span>
                    <span className="text-gray-600 text-sm flex items-center">
                      <CalendarIcon className="w-4 h-4 mr-1" />
                      {new Date(work.created_at).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  {/* Work Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {work.title}
                  </h3>

                  {/* Work Description */}
                  <p className="text-gray-700 mb-4 line-clamp-3 leading-relaxed">
                    {work.description.length > 150
                      ? `${work.description.substring(0, 150)}...`
                      : work.description}
                  </p>

                  {/* Read More Link */}
                  {work.description.length > 150 && (
                    <div className="mb-4">
                      <Link
                        href={`/penulis/${slug}/portfolio/${work.id}`}
                        className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
                      >
                        Baca selengkapnya →
                      </Link>
                    </div>
                  )}

                  {/* Work Stats */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <TagIcon className="w-4 h-4 mr-1" />
                        {work.genre || "N/A"}
                      </span>
                      {work.published && (
                        <span className="flex items-center text-green-600">
                          <BookOpenIcon className="w-4 h-4 mr-1" />
                          Dipublikasikan
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-2">
                    {work.external_link && (
                      <a
                        href={work.external_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 py-2 px-3 rounded-lg font-medium text-sm transition-colors flex items-center justify-center space-x-1"
                      >
                        <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                        <span>Lihat</span>
                      </a>
                    )}

                    {isOwnPortfolio && (
                      <>
                        <Link
                          href={`/portfolio/edit/${work.id}`}
                          className="flex-1 bg-green-50 hover:bg-green-100 text-green-600 py-2 px-3 rounded-lg font-medium text-sm transition-colors flex items-center justify-center space-x-1"
                        >
                          <PencilIcon className="w-4 h-4" />
                          <span>Edit</span>
                        </Link>

                        <button
                          onClick={() => handleDeleteWork(work.id)}
                          className="bg-red-50 hover:bg-red-100 text-red-600 py-2 px-3 rounded-lg font-medium text-sm transition-colors flex items-center justify-center space-x-1"
                        >
                          <TrashIcon className="w-4 h-4" />
                          <span className={isMobile ? "hidden" : ""}>
                            Hapus
                          </span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
