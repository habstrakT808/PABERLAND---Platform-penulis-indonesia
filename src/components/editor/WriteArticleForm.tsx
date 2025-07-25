"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { supabase, articleManagement } from "@/lib/supabase";
import toast from "react-hot-toast";
import {
  PhotoIcon,
  ClockIcon,
  EyeIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import TinyMCEEditor from "@/components/editor/TinyMCEEditor";
import { Article } from "@/lib/supabase";

const categories = [
  { value: "cerpen", label: "📖 Cerpen" },
  { value: "puisi", label: "🎭 Puisi" },
  { value: "artikel", label: "📰 Artikel" },
  { value: "cerita-rakyat", label: "🏛️ Cerita Rakyat" },
  { value: "novel-berseri", label: "📚 Novel Berseri" },
  { value: "lainnya", label: "✨ Lainnya" },
];

interface WriteArticleFormProps {
  editArticle?: Article | null;
}

export default function WriteArticleForm({
  editArticle,
}: WriteArticleFormProps) {
  const { user } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: editArticle?.title || "",
    content: editArticle?.content || "",
    excerpt: editArticle?.excerpt || "",
    category: editArticle?.category || "artikel",
    coverImage: editArticle?.cover_image || "",
    published: editArticle?.published || false,
    scheduledAt: editArticle?.scheduled_at || "",
  });

  // Sync formData if editArticle changes
  useEffect(() => {
    if (editArticle) {
      setFormData({
        title: editArticle.title || "",
        content: editArticle.content || "",
        excerpt: editArticle.excerpt || "",
        category: editArticle.category || "artikel",
        coverImage: editArticle.cover_image || "",
        published: editArticle.published || false,
        scheduledAt: editArticle.scheduled_at || "",
      });
    }
  }, [editArticle]);

  const [isLoading, setIsLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [wordCount, setWordCount] = useState(0);

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

  const handleContentChange = (content: string) => {
    setFormData({
      ...formData,
      content: content,
    });

    // Count words
    const textContent = content.replace(/<[^>]*>/g, "");
    const words = textContent
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0);
    setWordCount(words.length);

    // Auto-generate excerpt from HTML content
    if (!formData.excerpt && content) {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = content;
      const plainText = tempDiv.textContent || tempDiv.innerText || "";
      const excerpt =
        plainText.slice(0, 200) + (plainText.length > 200 ? "..." : "");

      setFormData((prev) => ({
        ...prev,
        excerpt: excerpt,
      }));
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.content || !formData.category) {
      toast.error("Judul, konten, dan kategori harus diisi!");
      return;
    }

    if (!user) {
      toast.error("Anda harus login terlebih dahulu!");
      return;
    }

    setIsLoading(true);

    try {
      const now = new Date().toISOString();

      if (editArticle) {
        // Update existing article
        const result = await articleManagement.updateArticle(
          editArticle.id,
          user.id,
          {
            title: formData.title,
            content: formData.content,
            excerpt: formData.excerpt || formData.content.slice(0, 200) + "...",
            category: formData.category,
            cover_image: formData.coverImage || null,
            published: formData.published,
            scheduled_at: formData.scheduledAt || null,
            slug: generateSlug(formData.title),
            updated_at: now,
          }
        );

        if (result.success) {
          if (formData.published) {
            toast.success("🎉 Artikel berhasil diperbarui dan dipublikasikan!");
            router.push(`/article/${result.data.slug}`);
          } else {
            toast.success("📝 Artikel berhasil diperbarui sebagai draft!");
            router.push("/my-articles");
          }
        } else {
          toast.error("Gagal memperbarui artikel: " + result.error);
        }
      } else {
        // Create new article (existing code)
        let slug = generateSlug(formData.title);
        // Cek slug unik, jika sudah ada tambahkan angka di belakang
        let uniqueSlug = slug;
        let counter = 1;
        while (true) {
          const { data: existing } = await supabase
            .from("articles")
            .select("id")
            .eq("slug", uniqueSlug)
            .single();
          if (!existing) break;
          uniqueSlug = `${slug}-${counter++}`;
        }
        slug = uniqueSlug;
        const articleData = {
          title: formData.title,
          content: formData.content,
          excerpt: formData.excerpt || formData.content.slice(0, 200) + "...",
          category: formData.category,
          cover_image: formData.coverImage || null,
          author_id: user.id,
          published: formData.published,
          scheduled_at: formData.scheduledAt || null,
          slug: slug,
          created_at: now,
          updated_at: now,
        };

        const { data, error } = await supabase
          .from("articles")
          .insert([articleData])
          .select()
          .single();

        if (error) {
          console.error("Error creating article:", error);
          toast.error("Gagal menyimpan artikel: " + error.message);
          return;
        }

        if (formData.published) {
          toast.success("🎉 Artikel berhasil dipublikasikan!");
          router.push(`/article/${data.slug}`);
        } else {
          toast.success("📝 Artikel berhasil disimpan sebagai draft!");
          router.push("/dashboard");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Terjadi kesalahan saat menyimpan artikel");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveDraft = () => {
    setFormData({ ...formData, published: false });
    handleSubmit(new Event("submit") as any);
  };

  const handlePublish = () => {
    setFormData({ ...formData, published: true });
    handleSubmit(new Event("submit") as any);
  };

  const getReadingTime = () => {
    return Math.ceil(wordCount / 200); // Asumsi 200 kata per menit
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={() => setPreviewMode(!previewMode)}
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <EyeIcon className="w-4 h-4" />
              <span>{previewMode ? "Edit" : "Preview"}</span>
            </button>

            {/* Word Count Display */}
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-1">
                <DocumentTextIcon className="w-4 h-4" />
                <span>{wordCount} kata</span>
              </div>
              {wordCount > 0 && <div>⏱️ {getReadingTime()} menit baca</div>}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={handleSaveDraft}
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
            >
              💾 Simpan Draft
            </button>
            <button
              type="button"
              onClick={handlePublish}
              disabled={isLoading}
              className="px-6 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
            >
              {isLoading ? "⏳ Menyimpan..." : "🚀 Publikasikan"}
            </button>
          </div>
        </div>

        {/* Article Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Judul Artikel
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Masukkan judul artikel yang menarik..."
                className="w-full px-4 py-3 text-lg border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>

            {/* Content Editor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Konten Artikel
              </label>

              {previewMode ? (
                <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-6 bg-white dark:bg-gray-700 min-h-[500px]">
                  <div
                    className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300"
                    dangerouslySetInnerHTML={{ __html: formData.content }}
                  />
                </div>
              ) : (
                <TinyMCEEditor
                  value={formData.content}
                  onChange={handleContentChange}
                  height={500}
                  disabled={isLoading}
                  placeholder="Mulai menulis artikel Anda di sini... Atau klik '📝 Template' di toolbar untuk menggunakan template siap pakai!"
                />
              )}

              <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 space-y-1">
                <p>
                  💡 <strong>Tips:</strong> Klik "📝 Template" di toolbar untuk
                  template siap pakai
                </p>
                <p>
                  🖼️ Drag & drop gambar langsung ke editor, atau gunakan Ctrl+V
                  untuk paste
                </p>
                <p>💾 Auto-save aktif setiap 30 detik - tulisan Anda aman!</p>
                <p>
                  📊 Klik "📊 Stats" di toolbar untuk melihat statistik tulisan
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Writing Progress */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">
                📈 Progress Menulis
              </h3>
              <div className="space-y-2 text-xs text-blue-700 dark:text-blue-300">
                <div className="flex justify-between">
                  <span>Kata:</span>
                  <span className="font-semibold">{wordCount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Waktu baca:</span>
                  <span className="font-semibold">
                    {getReadingTime()} menit
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Karakter:</span>
                  <span className="font-semibold">
                    {formData.content.replace(/<[^>]*>/g, "").length}
                  </span>
                </div>

                {/* Progress bar untuk target kata */}
                <div className="mt-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Target: 500 kata</span>
                    <span>
                      {Math.min(100, Math.round((wordCount / 500) * 100))}%
                    </span>
                  </div>
                  <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.min(100, (wordCount / 500) * 100)}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Kategori
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Cover Image */}
            <div>
              <label
                htmlFor="coverImage"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Gambar Cover (URL)
              </label>
              <div className="relative">
                <input
                  type="url"
                  id="coverImage"
                  name="coverImage"
                  value={formData.coverImage}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-3 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
                <PhotoIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
              {formData.coverImage && (
                <div className="mt-2">
                  <img
                    src={formData.coverImage}
                    alt="Cover preview"
                    className="w-full h-32 object-cover rounded-lg shadow-md"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>

            {/* Excerpt */}
            <div>
              <label
                htmlFor="excerpt"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Ringkasan{" "}
                <span className="text-xs text-gray-500">(Auto-generated)</span>
              </label>
              <textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                rows={3}
                placeholder="Ringkasan akan dibuat otomatis dari konten..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>

            {/* Schedule Publishing */}
            <div>
              <label
                htmlFor="scheduledAt"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Jadwal Publikasi (Opsional)
              </label>
              <div className="relative">
                <input
                  type="datetime-local"
                  id="scheduledAt"
                  name="scheduledAt"
                  value={formData.scheduledAt}
                  onChange={handleChange}
                  className="w-full px-3 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <ClockIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Kosongkan untuk publikasi langsung
              </p>
            </div>

            {/* TinyMCE Features Guide */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
              <h3 className="text-sm font-semibold text-green-900 dark:text-green-100 mb-2">
                🚀 Fitur Editor
              </h3>
              <ul className="text-xs text-green-700 dark:text-green-300 space-y-1">
                <li>• 📝 Template siap pakai untuk berbagai jenis tulisan</li>
                <li>• 🖼️ Drag & drop gambar langsung ke editor</li>
                <li>• 📊 Statistik tulisan real-time</li>
                <li>• 💾 Auto-save setiap 30 detik</li>
                <li>• 🌙 Mode fullscreen untuk fokus maksimal</li>
                <li>• 📋 Copy-paste dari Word/Google Docs</li>
                <li>• 🎨 Rich formatting & styling</li>
              </ul>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
