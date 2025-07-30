"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { portfolioHelpers } from "@/lib/supabase";
import toast from "react-hot-toast";
import {
  BookOpenIcon,
  CalendarIcon,
  TagIcon,
  TrophyIcon,
  ArrowTopRightOnSquareIcon,
  PencilIcon,
  PlusIcon,
  XMarkIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { uploadImageToStorage } from "@/lib/supabase";
import SignedImage from "@/components/common/SignedImage";
import { supabase } from "@/lib/supabase";

const categories = [
  { value: "cerpen", label: "📖 Cerpen" },
  { value: "puisi", label: "🎭 Puisi" },
  { value: "artikel", label: "📰 Artikel" },
  { value: "cerita-rakyat", label: "🏛️ Cerita Rakyat" },
  { value: "novel-berseri", label: "📚 Novel Berseri" },
  { value: "lainnya", label: "✨ Lainnya" },
];

const statusOptions = [
  { value: "published", label: "📖 Terbit" },
  { value: "unpublished", label: "📝 Draft" },
  { value: "in_progress", label: "🔄 Sedang Dikerjakan" },
  { value: "completed", label: "✅ Selesai" },
];

function EditPortfolioWorkContent() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const workId = params.id as string;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "artikel",
    genre: "",
    year_created: "",
    status: "unpublished" as
      | "published"
      | "unpublished"
      | "in_progress"
      | "completed",
    publisher: "",
    isbn: "",
    cover_image: "",
    external_link: "",
    awards: [] as string[],
    tags: [] as string[],
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [newAward, setNewAward] = useState("");
  const [newTag, setNewTag] = useState("");
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string>("");
  const [userProfile, setUserProfile] = useState<any>(null);

  // Fetch user profile to get full_name
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        try {
          const { data: profile, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();

          if (profile) {
            setUserProfile(profile);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }
    };

    fetchUserProfile();
  }, [user]);

  // Load existing data
  useEffect(() => {
    const loadWorkData = async () => {
      if (!workId || !user) return;

      try {
        const work = await portfolioHelpers.getPortfolioWork(workId);
        if (!work) {
          toast.error("Karya tidak ditemukan!");
          router.push("/my-articles");
          return;
        }

        // Check if user owns this work
        if (work.author_id !== user.id) {
          toast.error("Anda tidak memiliki akses untuk mengedit karya ini!");
          router.push("/my-articles");
          return;
        }

        setFormData({
          title: work.title || "",
          description: work.description || "",
          category: work.category || "artikel",
          genre: work.genre || "",
          year_created: work.year_created?.toString() || "",
          status: work.status || "unpublished",
          publisher: work.publisher || "",
          isbn: work.isbn || "",
          cover_image: work.cover_image || "",
          external_link: work.external_link || "",
          awards: work.awards || [],
          tags: work.tags || [],
        });
      } catch (error) {
        console.error("Error loading work data:", error);
        toast.error("Gagal memuat data karya!");
      } finally {
        setIsLoading(false);
      }
    };

    loadWorkData();
  }, [workId, user, router]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCoverImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverImageFile(file);
    setCoverImagePreview(URL.createObjectURL(file)); // hanya untuk preview
    setIsSaving(true);
    const filePath = await uploadImageToStorage(file, "portfolio-covers");
    setIsSaving(false);
    if (filePath) {
      setFormData({ ...formData, cover_image: filePath }); // simpan filePath ke database
      toast.success("Cover image berhasil diupload!");
    } else {
      toast.error("Gagal upload cover image");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.category) {
      toast.error("Judul dan kategori harus diisi!");
      return;
    }

    if (!user) {
      toast.error("Anda harus login terlebih dahulu!");
      return;
    }

    setIsSaving(true);

    try {
      const workData = {
        ...formData,
        year_created: formData.year_created
          ? parseInt(formData.year_created)
          : null,
        awards: formData.awards.length > 0 ? formData.awards : null,
        tags: formData.tags.length > 0 ? formData.tags : null,
      };

      const result = await portfolioHelpers.updatePortfolioWork(
        workId,
        user.id,
        workData
      );

      if (result.success) {
        toast.success("🎉 Karya berhasil diperbarui!");

        // Generate name-based URL for redirect
        if (userProfile?.full_name) {
          const nameSlug = userProfile.full_name
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
            .trim();

          router.push(`/penulis/${nameSlug}/portfolio`);
        } else {
          router.push(`/penulis/${user?.id}/portfolio`);
        }
      } else {
        toast.error("Gagal memperbarui karya: " + result.error);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Terjadi kesalahan saat menyimpan karya");
    } finally {
      setIsSaving(false);
    }
  };

  const addAward = () => {
    if (newAward.trim() && !formData.awards.includes(newAward.trim())) {
      setFormData({
        ...formData,
        awards: [...formData.awards, newAward.trim()],
      });
      setNewAward("");
    }
  };

  const removeAward = (index: number) => {
    setFormData({
      ...formData,
      awards: formData.awards.filter((_, i) => i !== index),
    });
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()],
      });
      setNewTag("");
    }
  };

  const removeTag = (index: number) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((_, i) => i !== index),
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-700">Memuat data karya...</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-pink-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => router.back()}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-600 bg-white rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  <ArrowLeftIcon className="w-4 h-4 mr-2" />
                  Kembali
                </button>
                <h1 className="text-3xl font-bold text-gray-900">
                  Edit Karya Portfolio
                </h1>
              </div>
            </div>
            <p className="text-gray-600">
              Perbarui informasi karya Anda untuk menampilkan portofolio yang
              lebih baik.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <BookOpenIcon className="w-6 h-6 mr-2 text-blue-600" />
                Informasi Dasar
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    Judul Karya *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Masukkan judul karya..."
                    className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    Kategori *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                    required
                  >
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Deskripsi
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Jelaskan karya Anda secara singkat..."
                  className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500"
                />
              </div>
            </div>

            {/* Additional Details */}
            <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <PencilIcon className="w-6 h-6 mr-2 text-blue-600" />
                Detail Tambahan
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    Genre
                  </label>
                  <input
                    type="text"
                    name="genre"
                    value={formData.genre}
                    onChange={handleChange}
                    placeholder="Genre karya..."
                    className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    Tahun Dibuat
                  </label>
                  <input
                    type="number"
                    name="year_created"
                    value={formData.year_created}
                    onChange={handleChange}
                    placeholder="2024"
                    min="1900"
                    max="2030"
                    className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                  >
                    {statusOptions.map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    Penerbit
                  </label>
                  <input
                    type="text"
                    name="publisher"
                    value={formData.publisher}
                    onChange={handleChange}
                    placeholder="Nama penerbit..."
                    className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    ISBN
                  </label>
                  <input
                    type="text"
                    name="isbn"
                    value={formData.isbn}
                    onChange={handleChange}
                    placeholder="ISBN buku..."
                    className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    Link Eksternal
                  </label>
                  <input
                    type="url"
                    name="external_link"
                    value={formData.external_link}
                    onChange={handleChange}
                    placeholder="https://..."
                    className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500"
                  />
                </div>
              </div>
            </div>

            {/* Cover Image */}
            <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <BookOpenIcon className="w-6 h-6 mr-2 text-blue-600" />
                Cover Image
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Upload Cover Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCoverImageChange}
                  className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500"
                />
                {coverImagePreview ? (
                  <img
                    src={coverImagePreview}
                    alt="Preview Cover"
                    className="mt-2 rounded-lg max-h-48 border border-blue-100 shadow"
                  />
                ) : formData.cover_image ? (
                  <SignedImage
                    src={formData.cover_image}
                    alt="Preview Cover"
                    className="mt-2 rounded-lg max-h-48 border border-blue-100 shadow"
                  />
                ) : null}
              </div>
            </div>

            {/* Awards */}
            <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <TrophyIcon className="w-6 h-6 mr-2 text-blue-600" />
                Penghargaan
              </h2>

              <div className="space-y-4">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newAward}
                    onChange={(e) => setNewAward(e.target.value)}
                    placeholder="Tambahkan penghargaan..."
                    className="flex-1 px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500"
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addAward())
                    }
                  />
                  <button
                    type="button"
                    onClick={addAward}
                    className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <PlusIcon className="w-5 h-5" />
                  </button>
                </div>

                {formData.awards.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.awards.map((award, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800"
                      >
                        🏆 {award}
                        <button
                          type="button"
                          onClick={() => removeAward(index)}
                          className="ml-2 text-yellow-600 hover:text-yellow-800"
                        >
                          <XMarkIcon className="w-4 h-4" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <TagIcon className="w-6 h-6 mr-2 text-blue-600" />
                Tag
              </h2>

              <div className="space-y-4">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Tambahkan tag..."
                    className="flex-1 px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500"
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addTag())
                    }
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <PlusIcon className="w-5 h-5" />
                  </button>
                </div>

                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
                      >
                        #{tag}
                        <button
                          type="button"
                          onClick={() => removeTag(index)}
                          className="ml-2 text-gray-600 hover:text-gray-800"
                        >
                          <XMarkIcon className="w-4 h-4" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <PencilIcon className="w-4 h-4 mr-2" />
                    Simpan Perubahan
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default function EditPortfolioWorkPage() {
  return <EditPortfolioWorkContent />;
}
