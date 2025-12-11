# **BAB 6 IMPLEMENTASI** {#bab-6-implementasi}

Bab ini berisi kumpulan kode implementasi sistem platform PaberLand untuk setiap fitur-fiturnya. Implementasi dilakukan menggunakan teknologi Next.js 15, TypeScript, Supabase, dan TinyMCE Editor.

## **1. Login** {#login}

Program login menggunakan komponen `LoginForm` yang memanfaatkan Supabase Auth untuk verifikasi email dan password. Program login dijelaskan mengenai verifikasi email dan password sebagaimana ditampilkan pada tabel [Tabel 6.1](#tabel-6.1-kode-program-dari-fungsi-login).

**Tabel 6.1 Kode program dari fungsi login**

| | |
| :---- | :---- |
| 1 | `const handleSubmit = async (e: React.FormEvent) => {` |
| 2 | `  e.preventDefault();` |
| 3 | `  if (!formData.email || !formData.password) {` |
| 4 | `    toast.error("Email dan password harus diisi!");` |
| 5 | `    return;` |
| 6 | `  }` |
| 7 | `  setIsLoading(true);` |
| 8 | `  try {` |
| 9 | `    const { data, error } = await supabase.auth.signInWithPassword({` |
| 10 | `      email: formData.email,` |
| 11 | `      password: formData.password,` |
| 12 | `    });` |
| 13 | `    if (error) {` |
| 14 | `      if (error.message.includes("Invalid login credentials")) {` |
| 15 | `        toast.error("Email atau password salah!");` |
| 16 | `      } else if (error.message.includes("Email not confirmed")) {` |
| 17 | `        toast.error("Silakan verifikasi email Anda terlebih dahulu!");` |
| 18 | `      } else {` |
| 19 | `        toast.error(error.message);` |
| 20 | `      }` |
| 21 | `      return;` |
| 22 | `    }` |
| 23 | `    if (data.user) {` |
| 24 | `      toast.success("Login berhasil! Selamat datang di PaberLand!");` |
| 25 | `      router.push("/");` |
| 26 | `    }` |
| 27 | `  } catch (error) {` |
| 28 | `    toast.error("Terjadi kesalahan saat login");` |
| 29 | `  } finally {` |
| 30 | `    setIsLoading(false);` |
| 31 | `  }` |
| 32 | `};` |

## **2. Register** {#register}

Pada program register menggunakan fungsi `handleSubmit()` yang terdapat dalam komponen `RegisterForm`. Fungsi ini menggunakan Supabase Auth untuk pendaftaran pengguna baru dengan validasi lengkap. Bentuk dan isi dari fungsi register ditampilkan pada [Tabel 6.2](#tabel-6.2-kode-program-dari-fungsi-register).

**Tabel 6.2 Kode program dari fungsi register**

| | |
| :---- | :---- |
| 1 | `const handleSubmit = async (e: React.FormEvent) => {` |
| 2 | `  e.preventDefault();` |
| 3 | `  if (!formData.fullName || !formData.email || !formData.password || !formData.phone || !formData.role) {` |
| 4 | `    toast.error("Semua field harus diisi!");` |
| 5 | `    return;` |
| 6 | `  }` |
| 7 | `  if (formData.password !== formData.confirmPassword) {` |
| 8 | `    toast.error("Password dan konfirmasi password tidak sama!");` |
| 9 | `    return;` |
| 10 | `  }` |
| 11 | `  if (formData.password.length < 6) {` |
| 12 | `    toast.error("Password minimal 6 karakter!");` |
| 13 | `    return;` |
| 14 | `  }` |
| 15 | `  setIsLoading(true);` |
| 16 | `  try {` |
| 17 | `    const { data, error } = await supabase.auth.signUp({` |
| 18 | `      email: formData.email,` |
| 19 | `      password: formData.password,` |
| 20 | `      options: {` |
| 21 | `        emailRedirectTo: \`${window.location.origin}/auth/callback\`,` |
| 22 | `        data: {` |
| 23 | `          full_name: formData.fullName,` |
| 24 | `          phone: formData.phone,` |
| 25 | `          role: formData.role,` |
| 26 | `        },` |
| 27 | `      },` |
| 28 | `    });` |
| 29 | `    if (error) {` |
| 30 | `      toast.error(error.message || "Database error saving new user");` |
| 31 | `      return;` |
| 32 | `    }` |
| 33 | `    if (data.user) {` |
| 34 | `      toast.success("Pendaftaran berhasil! Silakan cek email untuk verifikasi.");` |
| 35 | `      router.push("/auth/login?message=check_email");` |
| 36 | `    }` |
| 37 | `  } catch (error) {` |
| 38 | `    toast.error("Terjadi kesalahan saat mendaftar");` |
| 39 | `  } finally {` |
| 40 | `    setIsLoading(false);` |
| 41 | `  }` |
| 42 | `};` |

## **3. Logout** {#logout}

Pada program logout menggunakan fungsi `signOut()` yang terdapat dalam `AuthContext`. Fungsi ini menghapus session pengguna dan mengarahkan ke halaman beranda. Bentuk dan isi dari fungsi logout ditampilkan pada [Tabel 6.3](#tabel-6.3-kode-program-dari-fungsi-logout).

**Tabel 6.3 Kode program dari fungsi logout**

| | |
| :---- | :---- |
| 1 | `const signOut = async () => {` |
| 2 | `  try {` |
| 3 | `    const { error } = await supabase.auth.signOut();` |
| 4 | `    if (error) {` |
| 5 | `      console.error("❌ Error signing out:", error);` |
| 6 | `    } else {` |
| 7 | `      setUser(null);` |
| 8 | `      router.push("/");` |
| 9 | `      router.refresh();` |
| 10 | `    }` |
| 11 | `  } catch (error) {` |
| 12 | `    console.error("❌ Unexpected error in signOut:", error);` |
| 13 | `  }` |
| 14 | `};` |

## **4. Reset Password** {#reset-password}

Pada program reset password menggunakan fungsi `handleSubmit()` yang terdapat dalam komponen `ResetPasswordPage`. Fungsi ini menggunakan Supabase Auth untuk mengubah password pengguna setelah verifikasi token. Bentuk dan isi dari fungsi reset password ditampilkan pada [Tabel 6.4](#tabel-6.4-kode-program-dari-fungsi-reset-password).

**Tabel 6.4 Kode program dari fungsi reset password**

| | |
| :---- | :---- |
| 1 | `const handleSubmit = async (e: React.FormEvent) => {` |
| 2 | `  e.preventDefault();` |
| 3 | `  setError("");` |
| 4 | `  setSuccess("");` |
| 5 | `  if (password.length < 8) {` |
| 6 | `    setError("Password minimal 8 karakter.");` |
| 7 | `    return;` |
| 8 | `  }` |
| 9 | `  if (password !== confirmPassword) {` |
| 10 | `    setError("Konfirmasi password tidak cocok.");` |
| 11 | `    return;` |
| 12 | `  }` |
| 13 | `  setLoading(true);` |
| 14 | `  try {` |
| 15 | `    const { error } = await supabase.auth.updateUser({ password });` |
| 16 | `    if (error) {` |
| 17 | `      setError(error.message || "Gagal mengubah password.");` |
| 18 | `    } else {` |
| 19 | `      setSuccess("Password berhasil diubah! Anda akan diarahkan ke halaman login...");` |
| 20 | `      setTimeout(() => {` |
| 21 | `        router.push("/auth/login");` |
| 22 | `      }, 2000);` |
| 23 | `    }` |
| 24 | `  } catch (err: any) {` |
| 25 | `    setError(err.message || "Terjadi kesalahan. Coba lagi nanti.");` |
| 26 | `  } finally {` |
| 27 | `    setLoading(false);` |
| 28 | `  }` |
| 29 | `};` |

## **5. Tambah Artikel** {#tambah-artikel}

Pada program tambah artikel menggunakan fungsi `handleSubmit()` yang terdapat dalam komponen `WriteArticleForm`. Fungsi ini menyimpan artikel baru ke database dengan validasi judul, konten, dan kategori. Bentuk dan isi dari fungsi tambah artikel ditampilkan pada [Tabel 6.5](#tabel-6.5-kode-program-dari-fungsi-tambah-artikel).

**Tabel 6.5 Kode program dari fungsi tambah artikel**

| | |
| :---- | :---- |
| 1 | `const handleSubmit = async (e: React.FormEvent | null, published: boolean) => {` |
| 2 | `  if (e) e.preventDefault();` |
| 3 | `  if (!formData.title || !formData.content || !formData.category) {` |
| 4 | `    toast.error("Judul, konten, dan kategori harus diisi!");` |
| 5 | `    return;` |
| 6 | `  }` |
| 7 | `  if (!user) {` |
| 8 | `    toast.error("Anda harus login terlebih dahulu!");` |
| 9 | `    return;` |
| 10 | `  }` |
| 11 | `  setIsLoading(true);` |
| 12 | `  try {` |
| 13 | `    const now = new Date().toISOString();` |
| 14 | `    let slug = generateSlug(formData.title);` |
| 15 | `    let uniqueSlug = slug;` |
| 16 | `    let counter = 1;` |
| 17 | `    while (true) {` |
| 18 | `      const { data: existing } = await supabase` |
| 19 | `        .from("articles")` |
| 20 | `        .select("id")` |
| 21 | `        .eq("slug", uniqueSlug)` |
| 22 | `        .single();` |
| 23 | `      if (!existing) break;` |
| 24 | `      uniqueSlug = \`${slug}-${counter++}\`;` |
| 25 | `    }` |
| 26 | `    const articleData = {` |
| 27 | `      title: formData.title,` |
| 28 | `      content: formData.content,` |
| 29 | `      excerpt: formData.excerpt || formData.content.slice(0, 200) + "...",` |
| 30 | `      category: formData.category,` |
| 31 | `      cover_image: formData.coverImage || null,` |
| 32 | `      author_id: user.id,` |
| 33 | `      published: published,` |
| 34 | `      slug: uniqueSlug,` |
| 35 | `      created_at: now,` |
| 36 | `      updated_at: now,` |
| 37 | `    };` |
| 38 | `    const { data, error } = await supabase` |
| 39 | `      .from("articles")` |
| 40 | `      .insert([articleData])` |
| 41 | `      .select()` |
| 42 | `      .single();` |
| 43 | `    if (error) {` |
| 44 | `      toast.error("Gagal menyimpan konten: " + error.message);` |
| 45 | `      return;` |
| 46 | `    }` |
| 47 | `    if (published) {` |
| 48 | `      toast.success("🎉 Konten berhasil dipublikasikan!");` |
| 49 | `      router.push(\`/article/${data.slug}\`);` |
| 50 | `    } else {` |
| 51 | `      toast.success("📝 Konten berhasil disimpan sebagai draft!");` |
| 52 | `      router.push("/");` |
| 53 | `    }` |
| 54 | `  } catch (error) {` |
| 55 | `    toast.error("Terjadi kesalahan saat menyimpan konten");` |
| 56 | `  } finally {` |
| 57 | `    setIsLoading(false);` |
| 58 | `  }` |
| 59 | `};` |

## **6. Update Artikel** {#update-artikel}

Pada program update artikel menggunakan fungsi `updateArticle()` yang terdapat dalam `articleManagement`. Fungsi ini memperbarui artikel yang sudah ada dengan validasi kepemilikan. Bentuk dan isi dari fungsi update artikel ditampilkan pada [Tabel 6.6](#tabel-6.6-kode-program-dari-fungsi-update-artikel).

**Tabel 6.6 Kode program dari fungsi update artikel**

| | |
| :---- | :---- |
| 1 | `async updateArticle(articleId: string, userId: string, updates: Partial<Article>) {` |
| 2 | `  const { data, error } = await supabase` |
| 3 | `    .from('articles')` |
| 4 | `    .update({` |
| 5 | `      ...updates,` |
| 6 | `      updated_at: new Date().toISOString()` |
| 7 | `    })` |
| 8 | `    .eq('id', articleId)` |
| 9 | `    .eq('author_id', userId)` |
| 10 | `    .select()` |
| 11 | `    .single();` |
| 12 | `  if (error) {` |
| 13 | `    console.error('Error updating article:', error);` |
| 14 | `    return { success: false, error: error.message };` |
| 15 | `  }` |
| 16 | `  return { success: true, data, error: undefined };` |
| 17 | `}` |

## **7. Hapus Artikel** {#hapus-artikel}

Pada program hapus artikel menggunakan fungsi `deleteArticle()` yang terdapat dalam `articleManagement`. Fungsi ini menghapus artikel dari database dengan validasi kepemilikan. Bentuk dan isi dari fungsi hapus artikel ditampilkan pada [Tabel 6.7](#tabel-6.7-kode-program-dari-fungsi-hapus-artikel).

**Tabel 6.7 Kode program dari fungsi hapus artikel**

| | |
| :---- | :---- |
| 1 | `async deleteArticle(articleId: string, userId: string) {` |
| 2 | `  const { error } = await supabase` |
| 3 | `    .from('articles')` |
| 4 | `    .delete()` |
| 5 | `    .eq('id', articleId)` |
| 6 | `    .eq('author_id', userId);` |
| 7 | `  if (error) {` |
| 8 | `    console.error('Error deleting article:', error);` |
| 9 | `    throw error;` |
| 10 | `  }` |
| 11 | `  return { success: true };` |
| 12 | `}` |

## **8. Tambah Komentar** {#tambah-komentar}

Pada program tambah komentar menggunakan fungsi `addComment()` yang terdapat dalam `commentHelpers`. Fungsi ini menambahkan komentar baru pada artikel dengan update real-time pada jumlah komentar. Bentuk dan isi dari fungsi tambah komentar ditampilkan pada [Tabel 6.8](#tabel-6.8-kode-program-dari-fungsi-tambah-komentar).

**Tabel 6.8 Kode program dari fungsi tambah komentar**

| | |
| :---- | :---- |
| 1 | `async addComment(articleId: string, authorId: string, content: string, parentId?: string) {` |
| 2 | `  try {` |
| 3 | `    const { data, error } = await supabase` |
| 4 | `      .from('comments')` |
| 5 | `      .insert([{` |
| 6 | `        article_id: articleId,` |
| 7 | `        author_id: authorId,` |
| 8 | `        content: content.trim(),` |
| 9 | `        parent_id: parentId || null,` |
| 10 | `      }])` |
| 11 | `      .select()` |
| 12 | `      .single();` |
| 13 | `    if (error) {` |
| 14 | `      console.error('Error adding comment:', error);` |
| 15 | `      return { success: false, error: error.message };` |
| 16 | `    }` |
| 17 | `    await this.updateArticleCommentCount(articleId);` |
| 18 | `    return { success: true, data };` |
| 19 | `  } catch (error) {` |
| 20 | `    console.error('Unexpected error adding comment:', error);` |
| 21 | `    return { success: false, error: 'Terjadi kesalahan saat menambahkan komentar' };` |
| 22 | `  }` |
| 23 | `}` |

## **9. Update Komentar** {#update-komentar}

Pada program update komentar menggunakan fungsi `updateComment()` yang terdapat dalam `commentHelpers`. Fungsi ini memperbarui komentar yang sudah ada dengan validasi kepemilikan. Bentuk dan isi dari fungsi update komentar ditampilkan pada [Tabel 6.9](#tabel-6.9-kode-program-dari-fungsi-update-komentar).

**Tabel 6.9 Kode program dari fungsi update komentar**

| | |
| :---- | :---- |
| 1 | `async updateComment(commentId: string, authorId: string, content: string) {` |
| 2 | `  const { data, error } = await supabase` |
| 3 | `    .from('comments')` |
| 4 | `    .update({` |
| 5 | `      content: content.trim(),` |
| 6 | `      updated_at: new Date().toISOString()` |
| 7 | `    })` |
| 8 | `    .eq('id', commentId)` |
| 9 | `    .eq('author_id', authorId)` |
| 10 | `    .select()` |
| 11 | `    .single();` |
| 12 | `  if (error) {` |
| 13 | `    console.error('Error updating comment:', error);` |
| 14 | `    return { success: false, error: error.message };` |
| 15 | `  }` |
| 16 | `  return { success: true, data };` |
| 17 | `}` |

## **10. Hapus Komentar** {#hapus-komentar}

Pada program hapus komentar menggunakan fungsi `deleteComment()` yang terdapat dalam `commentHelpers`. Fungsi ini menghapus komentar dari database dengan validasi kepemilikan dan update real-time pada jumlah komentar. Bentuk dan isi dari fungsi hapus komentar ditampilkan pada [Tabel 6.10](#tabel-6.10-kode-program-dari-fungsi-hapus-komentar).

**Tabel 6.10 Kode program dari fungsi hapus komentar**

| | |
| :---- | :---- |
| 1 | `async deleteComment(commentId: string, authorId: string) {` |
| 2 | `  try {` |
| 3 | `    const { data: comment, error: fetchError } = await supabase` |
| 4 | `      .from('comments')` |
| 5 | `      .select('article_id')` |
| 6 | `      .eq('id', commentId)` |
| 7 | `      .eq('author_id', authorId)` |
| 8 | `      .single();` |
| 9 | `    if (fetchError) {` |
| 10 | `      return { success: false, error: 'Komentar tidak ditemukan' };` |
| 11 | `    }` |
| 12 | `    const { error } = await supabase` |
| 13 | `      .from('comments')` |
| 14 | `      .delete()` |
| 15 | `      .eq('id', commentId)` |
| 16 | `      .eq('author_id', authorId);` |
| 17 | `    if (error) {` |
| 18 | `      return { success: false, error: error.message };` |
| 19 | `    }` |
| 20 | `    if (comment?.article_id) {` |
| 21 | `      await this.updateArticleCommentCount(comment.article_id);` |
| 22 | `    }` |
| 23 | `    return { success: true };` |
| 24 | `  } catch (error) {` |
| 25 | `    return { success: false, error: 'Terjadi kesalahan saat menghapus komentar' };` |
| 26 | `  }` |
| 27 | `}` |

## **11. Like Artikel** {#like-artikel}

Pada program like artikel menggunakan fungsi `toggleLike()` yang terdapat dalam `likeHelpers`. Fungsi ini menambahkan atau menghapus like pada artikel dengan update real-time pada jumlah like. Bentuk dan isi dari fungsi like artikel ditampilkan pada [Tabel 6.11](#tabel-6.11-kode-program-dari-fungsi-like-artikel).

**Tabel 6.11 Kode program dari fungsi like artikel**

| | |
| :---- | :---- |
| 1 | `async toggleLike(articleId: string, userId: string): Promise<{ success: boolean; isLiked: boolean; error?: string }> {` |
| 2 | `  try {` |
| 3 | `    const { data: existingLike, error: checkError } = await supabase` |
| 4 | `      .from('article_likes')` |
| 5 | `      .select('id')` |
| 6 | `      .eq('article_id', articleId)` |
| 7 | `      .eq('user_id', userId)` |
| 8 | `      .single();` |
| 9 | `    if (existingLike) {` |
| 10 | `      const { error: deleteError } = await supabase` |
| 11 | `        .from('article_likes')` |
| 12 | `        .delete()` |
| 13 | `        .eq('article_id', articleId)` |
| 14 | `        .eq('user_id', userId);` |
| 15 | `      if (deleteError) {` |
| 16 | `        return { success: false, isLiked: true, error: deleteError.message };` |
| 17 | `      }` |
| 18 | `      await this.syncLikesCount(articleId);` |
| 19 | `      return { success: true, isLiked: false };` |
| 20 | `    } else {` |
| 21 | `      const { error: insertError } = await supabase` |
| 22 | `        .from('article_likes')` |
| 23 | `        .insert([{` |
| 24 | `          article_id: articleId,` |
| 25 | `          user_id: userId` |
| 26 | `        }]);` |
| 27 | `      if (insertError) {` |
| 28 | `        return { success: false, isLiked: false, error: insertError.message };` |
| 29 | `      }` |
| 30 | `      await this.syncLikesCount(articleId);` |
| 31 | `      return { success: true, isLiked: true };` |
| 32 | `    }` |
| 33 | `  } catch (error) {` |
| 34 | `    return { success: false, isLiked: false, error: 'Terjadi kesalahan sistem' };` |
| 35 | `  }` |
| 36 | `}` |

## **12. Kelola Pengguna (Admin)** {#kelola-pengguna-admin}

Pada program kelola pengguna menggunakan fungsi `promoteToAdmin()` dan `deleteUser()` yang terdapat dalam `adminHelpers`. Fungsi-fungsi ini digunakan untuk mengelola pengguna oleh administrator. Bentuk dan isi dari fungsi kelola pengguna ditampilkan pada [Tabel 6.12](#tabel-6.12-kode-program-dari-fungsi-kelola-pengguna).

**Tabel 6.12 Kode program dari fungsi kelola pengguna**

| | |
| :---- | :---- |
| 1 | `async promoteToAdmin(userId: string, adminId: string) {` |
| 2 | `  try {` |
| 3 | `    const { error } = await supabase.rpc('promote_to_admin', {` |
| 4 | `      p_user_id: userId` |
| 5 | `    });` |
| 6 | `    if (error) throw error;` |
| 7 | `    this.logAdminActivity(adminId, 'promote_to_admin', 'user', userId)` |
| 8 | `      .catch(logError => {` |
| 9 | `        console.warn('⚠️ Failed to log admin activity:', logError);` |
| 10 | `      });` |
| 11 | `    return { success: true };` |
| 12 | `  } catch (error) {` |
| 13 | `    return { success: false, error: 'Failed to promote user' };` |
| 14 | `  }` |
| 15 | `}` |

## **13. Tinjau Laporan (Admin)** {#tinjau-laporan-admin}

Pada program tinjau laporan menggunakan fungsi `resolveReport()` yang terdapat dalam `adminHelpers`. Fungsi ini digunakan untuk meninjau dan menyelesaikan laporan konten oleh administrator. Bentuk dan isi dari fungsi tinjau laporan ditampilkan pada [Tabel 6.13](#tabel-6.13-kode-program-dari-fungsi-tinjau-laporan).

**Tabel 6.13 Kode program dari fungsi tinjau laporan**

| | |
| :---- | :---- |
| 1 | `async resolveReport(reportId: string, adminId: string, status: 'resolved' | 'dismissed', notes?: string) {` |
| 2 | `  try {` |
| 3 | `    const { error } = await supabase` |
| 4 | `      .from('content_reports')` |
| 5 | `      .update({` |
| 6 | `        status,` |
| 7 | `        reviewed_by: adminId,` |
| 8 | `        reviewed_at: new Date().toISOString(),` |
| 9 | `        admin_notes: notes` |
| 10 | `      })` |
| 11 | `      .eq('id', reportId);` |
| 12 | `    if (error) throw error;` |
| 13 | `    this.logAdminActivity(adminId, 'resolve_report', 'report', reportId, { status, notes })` |
| 14 | `      .catch(logError => {` |
| 15 | `        console.warn('⚠️ Failed to log admin activity:', logError);` |
| 16 | `      });` |
| 17 | `    return { success: true };` |
| 18 | `  } catch (error) {` |
| 19 | `    return { success: false, error: 'Failed to resolve report' };` |
| 20 | `  }` |
| 21 | `}` |

## **14. Tambah Konten Featured (Admin)** {#tambah-konten-featured-admin}

Pada program tambah konten featured menggunakan fungsi `toggleFeaturedContent()` yang terdapat dalam `adminHelpers`. Fungsi ini digunakan untuk menambahkan atau menghapus konten dari featured content oleh administrator. Bentuk dan isi dari fungsi tambah konten featured ditampilkan pada [Tabel 6.14](#tabel-6.14-kode-program-dari-fungsi-tambah-konten-featured).

**Tabel 6.14 Kode program dari fungsi tambah konten featured**

| | |
| :---- | :---- |
| 1 | `async toggleFeaturedContent(contentType: 'article' | 'user', contentId: string, adminId: string, featured: boolean) {` |
| 2 | `  try {` |
| 3 | `    if (featured) {` |
| 4 | `      const { error } = await supabase` |
| 5 | `        .from('featured_content')` |
| 6 | `        .insert({` |
| 7 | `          content_type: contentType,` |
| 8 | `          content_id: contentId,` |
| 9 | `          featured_by: adminId` |
| 10 | `        });` |
| 11 | `      if (error) throw error;` |
| 12 | `    } else {` |
| 13 | `      const { error } = await supabase` |
| 14 | `        .from('featured_content')` |
| 15 | `        .delete()` |
| 16 | `        .eq('content_type', contentType)` |
| 17 | `        .eq('content_id', contentId);` |
| 18 | `      if (error) throw error;` |
| 19 | `    }` |
| 20 | `    this.logAdminActivity(` |
| 21 | `      adminId,` |
| 22 | `      featured ? 'feature_content' : 'unfeature_content',` |
| 23 | `      contentType,` |
| 24 | `      contentId` |
| 25 | `    ).catch(logError => {` |
| 26 | `      console.warn('⚠️ Failed to log admin activity:', logError);` |
| 27 | `    });` |
| 28 | `    return { success: true };` |
| 29 | `  } catch (error) {` |
| 30 | `    return { success: false, error: 'Failed to update konten pilihan status' };` |
| 31 | `  }` |
| 32 | `}` |

## **15. Lihat Analytics (Admin)** {#lihat-analytics-admin}

Pada program lihat analytics menggunakan fungsi `getAdminStats()` yang terdapat dalam `adminHelpers`. Fungsi ini mengambil statistik platform untuk ditampilkan di dashboard administrator. Bentuk dan isi dari fungsi lihat analytics ditampilkan pada [Tabel 6.15](#tabel-6.15-kode-program-dari-fungsi-lihat-analytics).

**Tabel 6.15 Kode program dari fungsi lihat analytics**

| | |
| :---- | :---- |
| 1 | `async getAdminStats(): Promise<AdminStats> {` |
| 2 | `  const today = new Date().toISOString().split('T')[0];` |
| 3 | `  try {` |
| 4 | `    const results = await Promise.allSettled([` |
| 5 | `      supabase.from('profiles').select('*', { count: 'exact', head: true }),` |
| 6 | `      supabase.from('articles').select('*', { count: 'exact', head: true }),` |
| 7 | `      supabase.from('comments').select('*', { count: 'exact', head: true }),` |
| 8 | `      supabase.from('content_reports').select('*', { count: 'exact', head: true }),` |
| 9 | `      supabase.from('profiles').select('*', { count: 'exact', head: true })` |
| 10 | `        .gte('created_at', \`${today}T00:00:00.000Z\`),` |
| 11 | `      supabase.from('articles').select('*', { count: 'exact', head: true })` |
| 12 | `        .gte('created_at', \`${today}T00:00:00.000Z\`),` |
| 13 | `      supabase.from('content_reports').select('*', { count: 'exact', head: true })` |
| 14 | `        .eq('status', 'pending'),` |
| 15 | `      supabase.from('featured_content').select('*', { count: 'exact', head: true })` |
| 16 | `        .eq('active', true)` |
| 17 | `    ]);` |
| 18 | `    const stats = {` |
| 19 | `      totalUsers: results[0].status === 'fulfilled' ? (results[0].value.count || 0) : 0,` |
| 20 | `      totalArticles: results[1].status === 'fulfilled' ? (results[1].value.count || 0) : 0,` |
| 21 | `      totalComments: results[2].status === 'fulfilled' ? (results[2].value.count || 0) : 0,` |
| 22 | `      totalReports: results[3].status === 'fulfilled' ? (results[3].value.count || 0) : 0,` |
| 23 | `      newUsersToday: results[4].status === 'fulfilled' ? (results[4].value.count || 0) : 0,` |
| 24 | `      newArticlesToday: results[5].status === 'fulfilled' ? (results[5].value.count || 0) : 0,` |
| 25 | `      pendingReports: results[6].status === 'fulfilled' ? (results[6].value.count || 0) : 0,` |
| 26 | `      featuredContent: results[7].status === 'fulfilled' ? (results[7].value.count || 0) : 0` |
| 27 | `    };` |
| 28 | `    return stats;` |
| 29 | `  } catch (error) {` |
| 30 | `    return {` |
| 31 | `      totalUsers: 0, totalArticles: 0, totalComments: 0, totalReports: 0,` |
| 32 | `      newUsersToday: 0, newArticlesToday: 0, pendingReports: 0, featuredContent: 0` |
| 33 | `    };` |
| 34 | `  }` |
| 35 | `}` |

