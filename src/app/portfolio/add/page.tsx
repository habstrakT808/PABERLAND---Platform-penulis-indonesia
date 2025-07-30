"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import {
  portfolioHelpers,
  uploadImageToStorage,
  checkBucketExists,
  testBucketUpload,
} from "@/lib/supabase";
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
} from "@heroicons/react/24/outline";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
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

function AddPortfolioWorkContent() {
  const { user } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "artikel",
    genre: "",
    year_created: "",
    status: "unpublished" as const,
    publisher: "",
    isbn: "",
    cover_image: "",
    external_link: "",
    awards: [] as string[],
    tags: [] as string[],
  });

  const [isLoading, setIsLoading] = useState(false);
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

    console.log(
      "handleCoverImageChange: File selected:",
      file.name,
      file.size,
      file.type
    );

    setCoverImageFile(file);
    setCoverImagePreview(URL.createObjectURL(file)); // hanya untuk preview
    setIsLoading(true);

    try {
      // Test bucket first
      console.log("handleCoverImageChange: Testing bucket access...");
      const bucketExists = await checkBucketExists("images");
      console.log("handleCoverImageChange: Bucket exists:", bucketExists);

      if (!bucketExists) {
        toast.error("Bucket 'images' tidak ditemukan di Supabase!");
        setIsLoading(false);
        return;
      }

      const uploadTest = await testBucketUpload("images");
      console.log("handleCoverImageChange: Upload test result:", uploadTest);

      if (!uploadTest) {
        toast.error(
          "Tidak dapat upload ke bucket 'images'. Cek policy Supabase!"
        );
        setIsLoading(false);
        return;
      }

      // Proceed with actual upload
      console.log("handleCoverImageChange: Starting actual upload...");
      const filePath = await uploadImageToStorage(file, "portfolio-covers");

      if (filePath) {
        setFormData({ ...formData, cover_image: filePath }); // simpan filePath ke database
        toast.success("Cover image berhasil diupload!");
        console.log(
          "handleCoverImageChange: Upload successful, saved path:",
          filePath
        );
      } else {
        toast.error("Gagal upload cover image");
        console.error("handleCoverImageChange: Upload failed");
      }
    } catch (error) {
      console.error("handleCoverImageChange: Error:", error);
      toast.error("Terjadi kesalahan saat upload");
    } finally {
      setIsLoading(false);
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

    setIsLoading(true);

    try {
      const workData = {
        ...formData,
        year_created: formData.year_created
          ? parseInt(formData.year_created)
          : null,
        awards: formData.awards.length > 0 ? formData.awards : null,
        tags: formData.tags.length > 0 ? formData.tags : null,
      };

      const result = await portfolioHelpers.createPortfolioWork(
        user.id,
        workData
      );

      if (result.success) {
        toast.success("🎉 Karya berhasil ditambahkan ke portofolio!");

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
        toast.error("Gagal menambahkan karya: " + result.error);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Terjadi kesalahan saat menyimpan karya");
    } finally {
      setIsLoading(false);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-pink-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            ✨ Tambah Karya Portofolio
          </h1>
          <p className="text-gray-600">
            Tambahkan karya untuk melengkapi portofolio, menunjukan prestasi,
            dan pengalaman menulis kamu.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-blue-100">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Basic Information */}
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
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Masukkan kategori karya..."
                  className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Deskripsi
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                placeholder="Jelaskan tentang karya Anda..."
                className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500"
              />
            </div>

            {/* Additional Information */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Genre
                </label>
                <input
                  type="text"
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                  placeholder="Contoh: Fiksi, Non-fiksi, Drama..."
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
                  max={new Date().getFullYear()}
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
            </div>

            {/* Publication Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
            </div>

            {/* Cover Image & External Link */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Cover Image
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

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Link Eksternal
                </label>
                <input
                  type="url"
                  name="external_link"
                  value={formData.external_link}
                  onChange={handleChange}
                  placeholder="https://example.com/karya"
                  className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500"
                />
              </div>
            </div>

            {/* Awards */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Penghargaan
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newAward}
                  onChange={(e) => setNewAward(e.target.value)}
                  placeholder="Masukkan penghargaan..."
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
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800"
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

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Tag
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Masukkan tag..."
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
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700"
                    >
                      #{tag}
                      <button
                        type="button"
                        onClick={() => removeTag(index)}
                        className="ml-2 text-gray-500 hover:text-gray-700"
                      >
                        <XMarkIcon className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-blue-100">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {isLoading ? "⏳ Menyimpan..." : "💾 Simpan Karya"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function AddPortfolioWorkPage() {
  return (
    <ProtectedRoute>
      <AddPortfolioWorkContent />
    </ProtectedRoute>
  );
}
