"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import {
  supabase,
  articleManagement,
  uploadImageToStorage,
} from "@/lib/supabase";
import SignedImage from "@/components/common/SignedImage";
import toast from "react-hot-toast";
import {
  PhotoIcon,
  ClockIcon,
  EyeIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import TinyMCEEditor from "@/components/editor/DynamicTinyMCEEditor";
import { Article } from "@/lib/supabase";
import ArticleContent from "@/components/article/ArticleContent";

// Category limits config
const categoryLimits: Record<
  string,
  { maxWords?: number; minParts?: number; maxParts?: number; info: string }
> = {
  "info-berita": { info: "" },
  cerpen: { maxWords: 1000, info: "Maksimal 1000 kata" },
  dongeng: { maxWords: 1000, info: "Maksimal 1000 kata" },
  "cerita-rakyat": { maxWords: 1000, info: "Maksimal 1000 kata" },
  cermin: { maxWords: 200, info: "Maksimal 200 kata" },
  puisi: { maxWords: 1000, info: "Maksimal 1000 kata" },
  cerbung: { maxParts: 10, info: "Maksimal 10 bagian (part)" },
  novel: {
    minParts: 11,
    maxParts: 50,
    info: "Minimal 11 – 50 bab (pagination aktif)",
  },
  serial: {
    maxWords: 1000,
    info: "Maksimal 1000 kata/judul. Judul tidak dibatasi",
  },
  "resensi-buku": { maxWords: 1000, info: "Maksimal 1000 kata" },
  artikel: { info: "" },
};

// Define categories array after categoryLimits
const categories: { value: string; label: string }[] = [
  { value: "info-berita", label: "📰 Info/Berita" },
  { value: "cerpen", label: "📖 Cerpen" },
  { value: "dongeng", label: "🧚 Dongeng" },
  { value: "cerita-rakyat", label: "🏛️ Cerita Rakyat" },
  { value: "cermin", label: "🔎 Cermin (Cerita Mini)" },
  { value: "puisi", label: "🎭 Puisi" },
  { value: "cerbung", label: "📝 Cerbung" },
  { value: "novel", label: "📚 Novel" },
  { value: "serial", label: "📚 Serial" },
  { value: "resensi-buku", label: "📖 Resensi Buku" },
  { value: "artikel", label: "📰 Artikel" },
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
      setDraftArticleId(editArticle.id);
    }
  }, [editArticle]);

  const [isLoading, setIsLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string>("");
  // Add state for part count (for cerbung/novel/serial)
  const [partCount, setPartCount] = useState(1);
  // Auto-save states
  const [draftArticleId, setDraftArticleId] = useState<string | null>(
    editArticle?.id || null
  );
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setHasUnsavedChanges(true);
  };

  const handleContentChange = (content: string) => {
    setFormData({
      ...formData,
      content: content,
    });
    setHasUnsavedChanges(true);

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
        plainText.slice(0, 500) + (plainText.length > 500 ? "..." : "");

      setFormData((prev) => ({
        ...prev,
        excerpt: excerpt,
      }));
    }
  };

  // Batasi excerpt maksimal 500 karakter
  const handleExcerptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let value = e.target.value;
    if (value.length > 500) value = value.slice(0, 500);
    setFormData((prev) => ({ ...prev, excerpt: value }));
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  // Function to count words from HTML content
  const countWordsFromHTML = (html: string): number => {
    if (!html) return 0;
    // Remove HTML tags
    const textContent = html.replace(/<[^>]*>/g, "");
    // Split by whitespace and filter empty strings
    const words = textContent
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0);
    return words.length;
  };

  // Ubah handleSubmit agar menerima parameter published
  const handleSubmit = async (
    e: React.FormEvent | null,
    published: boolean
  ) => {
    if (e) e.preventDefault();

    if (!formData.title || !formData.content || !formData.category) {
      toast.error("Judul, konten, dan kategori harus diisi!");
      return;
    }

    if (!user) {
      toast.error("Anda harus login terlebih dahulu!");
      return;
    }

    // Validasi minimal 100 kata untuk publikasi
    if (published) {
      const contentWordCount = countWordsFromHTML(formData.content);
      if (contentWordCount < 100) {
        toast.error(
          `Konten artikel harus minimal 100 kata untuk dapat dipublikasikan. Saat ini: ${contentWordCount} kata.`,
          { duration: 5000 }
        );
        return;
      }
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
            published: published,
            scheduled_at: formData.scheduledAt || null,
            slug: generateSlug(formData.title),
            updated_at: now,
          }
        );

        if (result.success) {
          setHasUnsavedChanges(false);
          if (published) {
            toast.success("🎉 Konten berhasil diperbarui dan dipublikasikan!");
            router.push(`/article/${result.data.slug}`);
          } else {
            toast.success("📝 Konten berhasil diperbarui sebagai draft!");
            router.push("/my-articles");
          }
        } else {
          toast.error("Gagal memperbarui konten: " + result.error);
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
          published: published,
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
          toast.error("Gagal menyimpan konten: " + error.message);
          return;
        }

        setDraftArticleId(data.id);
        setHasUnsavedChanges(false);
        if (published) {
          toast.success("🎉 Konten berhasil dipublikasikan!");
          router.push(`/article/${data.slug}`);
        } else {
          toast.success("📝 Konten berhasil disimpan sebagai draft!");
          router.push("/");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Terjadi kesalahan saat menyimpan konten");
    } finally {
      setIsLoading(false);
    }
  };

  // Handler baru untuk onSubmit form
  const onFormSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    handleSubmit(e, formData.published);
  };

  // Use ref to track if auto-save is in progress to prevent multiple simultaneous saves
  const isAutoSavingRef = useRef(false);

  // Auto-save draft function
  const autoSaveDraft = useCallback(async (silent: boolean = true) => {
    // Skip auto-save if already saving or no changes or no content
    if (isAutoSavingRef.current || !hasUnsavedChanges || !formData.title || !formData.content) {
      return;
    }

    if (!user) {
      return;
    }

    isAutoSavingRef.current = true;
    setIsAutoSaving(true);

    try {
      const now = new Date().toISOString();

      if (draftArticleId) {
        // Update existing draft
        const result = await articleManagement.updateArticle(
          draftArticleId,
          user.id,
          {
            title: formData.title,
            content: formData.content,
            excerpt: formData.excerpt || formData.content.slice(0, 200) + "...",
            category: formData.category,
            cover_image: formData.coverImage || null,
            published: false, // Always save as draft
            scheduled_at: formData.scheduledAt || null,
            slug: generateSlug(formData.title),
            updated_at: now,
          }
        );

        if (result.success) {
          setLastSaved(new Date());
          setHasUnsavedChanges(false);
          if (!silent) {
            toast.success("💾 Draft tersimpan!", { duration: 2000 });
          }
        }
      } else {
        // Create new draft
        let slug = generateSlug(formData.title);
        // Check for unique slug
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
          published: false, // Always save as draft
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
          console.error("Error auto-saving draft:", error);
          if (!silent) {
            toast.error("Gagal menyimpan draft: " + error.message);
          }
          return;
        }

        if (data) {
          setDraftArticleId(data.id);
          setLastSaved(new Date());
          setHasUnsavedChanges(false);
          if (!silent) {
            toast.success("💾 Draft tersimpan!", { duration: 2000 });
          }
        }
      }
    } catch (error) {
      console.error("Error in auto-save:", error);
      if (!silent) {
        toast.error("Gagal menyimpan draft");
      }
    } finally {
      isAutoSavingRef.current = false;
      setIsAutoSaving(false);
    }
  }, [formData, hasUnsavedChanges, user, draftArticleId]);

  // Auto-save every 30 seconds
  useEffect(() => {
    if (!user || !hasUnsavedChanges || isLoading) {
      return;
    }

    // Only auto-save if there's meaningful content
    if (!formData.title.trim() && !formData.content.trim()) {
      return;
    }

    const interval = setInterval(() => {
      autoSaveDraft(true);
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [hasUnsavedChanges, user, isLoading, autoSaveDraft, formData.title, formData.content]);

  // Auto-save on idle (3 seconds after user stops typing)
  useEffect(() => {
    if (!user || !hasUnsavedChanges || isLoading) {
      return;
    }

    // Only auto-save if there's meaningful content
    if (!formData.title.trim() && !formData.content.trim()) {
      return;
    }

    const timeoutId = setTimeout(() => {
      autoSaveDraft(true);
    }, 3000); // 3 seconds idle

    return () => clearTimeout(timeoutId);
  }, [formData.title, formData.content, formData.category, formData.excerpt, hasUnsavedChanges, user, isLoading, autoSaveDraft]);

  // Ubah handleSaveDraft dan handlePublish
  const handleSaveDraft = () => {
    handleSubmit(null, false);
  };

  const handlePublish = () => {
    handleSubmit(null, true);
  };

  const handleCoverImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverImageFile(file);
    setCoverImagePreview(URL.createObjectURL(file));
    setIsLoading(true);
    const url = await uploadImageToStorage(file, "article-covers");
    setIsLoading(false);
    if (url) {
      setFormData({ ...formData, coverImage: url });
      toast.success("Cover image berhasil diupload!");
    } else {
      toast.error("Gagal upload cover image");
    }
  };

  const getReadingTime = () => {
    return Math.ceil(wordCount / 200); // Asumsi 200 kata per menit
  };

  // Show info for selected category
  const selectedLimit = categoryLimits[formData.category] || {};

  return (
    <div className="bg-white/95 rounded-lg shadow-lg border border-blue-100">
      <form onSubmit={onFormSubmit} className="p-6 space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-blue-100">
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={() => setPreviewMode(!previewMode)}
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <EyeIcon className="w-4 h-4" />
              <span>{previewMode ? "Edit" : "Preview"}</span>
            </button>

            {/* Word Count Display */}
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <DocumentTextIcon className="w-4 h-4" />
                <span className={wordCount < 100 ? "text-red-600 font-semibold" : "text-gray-600"}>
                  {wordCount} kata
                </span>
                {wordCount < 100 && (
                  <span className="text-red-600 text-xs">
                    (Minimal 100 kata untuk publikasi)
                  </span>
                )}
              </div>
              {wordCount > 0 && <div className="text-gray-600">⏱️ {getReadingTime()} menit baca</div>}
            </div>

            {/* Auto-save Status Indicator */}
            <div className="flex items-center space-x-2 text-xs">
              {isAutoSaving ? (
                <span className="text-blue-600 flex items-center space-x-1">
                  <span className="animate-spin">⏳</span>
                  <span>Menyimpan...</span>
                </span>
              ) : lastSaved ? (
                <span className="text-green-600 flex items-center space-x-1">
                  <span>💾</span>
                  <span>
                    Tersimpan{" "}
                    {lastSaved.toLocaleTimeString("id-ID", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </span>
              ) : hasUnsavedChanges ? (
                <span className="text-orange-600 flex items-center space-x-1">
                  <span>⚠️</span>
                  <span>Belum tersimpan</span>
                </span>
              ) : null}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={handleSaveDraft}
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors disabled:opacity-50"
            >
              💾 Simpan Draft
            </button>
            <button
              type="button"
              onClick={handlePublish}
              disabled={isLoading}
              className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
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
                className="block text-sm font-medium text-gray-800 mb-2"
              >
                Judul Konten
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Masukkan judul konten yang menarik..."
                className="w-full px-4 py-3 text-lg border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500"
              />
            </div>

            {/* Content Editor */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Konten
              </label>

              {previewMode ? (
                <>
                  {/* Fullscreen Preview Overlay */}
                  <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
                    {/* Preview Header Bar */}
                    <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
                      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <h2 className="text-lg font-semibold text-gray-900">
                              Preview Artikel
                            </h2>
                            <span className="text-sm text-gray-500">
                              {formData.title || "Tanpa Judul"}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setPreviewMode(false)}
                            className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                          >
                            <EyeIcon className="w-4 h-4" />
                            <span>Keluar Preview</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Preview Content */}
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                      <div className="bg-white rounded-lg">
                        {/* Preview Header - Mirip dengan artikel yang dipublikasikan */}
                        {formData.title && (
                          <header className="mb-8 pb-6 border-b border-blue-100">
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                              {formData.title}
                            </h1>
                            {formData.excerpt && (
                              <p className="text-lg text-gray-600 italic">
                                {formData.excerpt}
                              </p>
                            )}
                            {formData.coverImage && (
                              <div className="mt-6 relative h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden">
                                <SignedImage
                                  src={formData.coverImage}
                                  alt={formData.title}
                                  className="object-cover w-full h-full"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                              </div>
                            )}
                          </header>
                        )}
                        
                        {/* Preview Content - Menggunakan komponen ArticleContent yang sama */}
                        <div className="prose prose-lg max-w-none">
                          <ArticleContent
                            content={formData.content || "<p>Mulai menulis konten Anda...</p>"}
                            className=""
                          />
                        </div>
                        
                        {/* Preview Footer */}
                        {formData.category && (
                          <footer className="mt-12 pt-8 border-t border-blue-100">
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                                {categories.find(cat => cat.value === formData.category)?.label || formData.category}
                              </span>
                              {wordCount > 0 && (
                                <span>⏱️ {getReadingTime()} menit baca</span>
                              )}
                              {wordCount > 0 && (
                                <span>📝 {wordCount} kata</span>
                              )}
                            </div>
                          </footer>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <TinyMCEEditor
                  value={formData.content}
                  onChange={handleContentChange}
                  height={500}
                  disabled={isLoading}
                  placeholder="Mulai menulis konten Anda di sini... Atau klik '📝 Template' di toolbar untuk menggunakan template siap pakai!"
                />
              )}

              <div className="mt-2 text-xs text-gray-600 space-y-1">
                <p>
                  💡 <strong>Tips:</strong> Klik "📝 Template" di toolbar untuk
                  template siap pakai
                </p>
                <p>
                  🖼️ Drag & drop gambar langsung ke editor, atau gunakan Ctrl+V
                  untuk paste
                </p>
                <p>
                  💾 Auto-save aktif setiap 30 detik atau setelah 3 detik idle
                  - tulisan Anda aman!
                </p>
                <p>
                  📊 Klik "📊 Stats" di toolbar untuk melihat statistik tulisan
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Writing Progress */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
              <h3 className="text-sm font-semibold text-blue-900 mb-2">
                📈 Progress Menulis
              </h3>
              <div className="space-y-2 text-xs text-blue-700">
                <div className="flex justify-between">
                  <span>Kata:</span>
                  <span className={`font-semibold ${wordCount < 100 ? "text-red-600" : ""}`}>
                    {wordCount}
                    {wordCount < 100 && (
                      <span className="ml-1 text-red-600">/ 100 (minimal)</span>
                    )}
                  </span>
                </div>
                {wordCount < 100 && (
                  <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-red-700 text-xs">
                    ⚠️ Konten harus minimal 100 kata untuk dapat dipublikasikan
                  </div>
                )}
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
                {selectedLimit.info && (
                  <div className="mt-2 text-blue-800 font-semibold">
                    {selectedLimit.info}
                  </div>
                )}
                {/* For part count (cerbung/novel/serial) */}
                {(formData.category === "cerbung" ||
                  formData.category === "novel" ||
                  formData.category === "serial") && (
                  <div className="flex items-center mt-2">
                    <span className="mr-2">Jumlah Part/Bab:</span>
                    <input
                      type="number"
                      min={selectedLimit.minParts || 1}
                      max={selectedLimit.maxParts || 99}
                      value={partCount}
                      onChange={(e) => setPartCount(Number(e.target.value))}
                      className="w-16 px-2 py-1 border border-blue-300 rounded text-blue-900 text-xs"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-800 mb-2"
              >
                Kategori
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
              >
                {categories.map((cat: { value: string; label: string }) => (
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
                className="block text-sm font-medium text-gray-800 mb-2"
              >
                Gambar Cover
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleCoverImageChange}
                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500"
              />
              {(coverImagePreview || formData.coverImage) && (
                <div className="mt-2">
                  {coverImagePreview ? (
                    <img
                      src={coverImagePreview}
                      alt="Cover preview"
                      className="w-full h-32 object-cover rounded-lg shadow-md"
                    />
                  ) : formData.coverImage ? (
                    <SignedImage
                      src={formData.coverImage}
                      alt="Cover preview"
                      className="w-full h-32 object-cover rounded-lg shadow-md"
                    />
                  ) : null}
                </div>
              )}
            </div>

            {/* Excerpt */}
            <div>
              <label
                htmlFor="excerpt"
                className="block text-sm font-medium text-gray-800 mb-2"
              >
                Ringkasan{" "}
                <span className="text-xs text-gray-600">(Auto-generated)</span>
              </label>
              <textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleExcerptChange}
                rows={3}
                placeholder="Ringkasan akan dibuat otomatis dari konten..."
                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500"
              />
              <div className="text-xs text-gray-500 text-right mt-1">
                {formData.excerpt.length}/500 karakter
              </div>
            </div>

            {/* Schedule Publishing */}
            <div>
              <label
                htmlFor="scheduledAt"
                className="block text-sm font-medium text-gray-800 mb-2"
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
                  className="w-full px-3 py-2 pl-10 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                />
                <ClockIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
              <p className="mt-1 text-xs text-gray-600">
                Kosongkan untuk publikasi langsung
              </p>
            </div>

            {/* TinyMCE Features Guide */}
            {/* <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
              <h3 className="text-sm font-semibold text-green-900 mb-2">
                🚀 Fitur Editor
              </h3>
              <ul className="text-xs text-green-700 space-y-1">
                <li>• 📝 Template siap pakai untuk berbagai jenis tulisan</li>
                <li>• 🖼️ Drag & drop gambar langsung ke editor</li>
                <li>• 📊 Statistik tulisan real-time</li>
                <li>• 💾 Auto-save setiap 30 detik</li>
                <li>• 🌙 Mode fullscreen untuk fokus maksimal</li>
                <li>• 📋 Copy-paste dari Word/Google Docs</li>
                <li>• 🎨 Rich formatting & styling</li>
              </ul>
            </div> */}
          </div>
        </div>
      </form>
    </div>
  );
}
