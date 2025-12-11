# Daftar File dan Baris untuk Pseudocode BAB 7

## 1. Fungsi Login Pengguna (F-01)

**File:** `src/components/auth/LoginForm.tsx`  
**Fungsi:** `handleSubmit`  
**Baris:** 46-83

**Detail:**
- Baris 46-47: `const handleSubmit = async (e: React.FormEvent) => { e.preventDefault(); }`
- Baris 50-53: Validasi email dan password kosong
- Baris 55: `setIsLoading(true)`
- Baris 57-61: `supabase.auth.signInWithPassword`
- Baris 63-72: Penanganan error (Invalid login credentials, Email not confirmed, error lainnya)
- Baris 74-77: Success case dengan redirect
- Baris 78-79: Catch exception
- Baris 80-82: Finally block dengan `setIsLoading(false)`

**Status:** ✅ Pseudocode sesuai dengan kode aktual

---

## 2. Fungsi Tambah Artikel (F-03)

**File:** `src/components/editor/WriteArticleForm.tsx`  
**Fungsi:** `handleSubmit` (bagian create new article)  
**Baris:** 162-268 (bagian create: 213-260)

**Detail:**
- Baris 162-166: `const handleSubmit = async (e: React.FormEvent | null, published: boolean) => { if (e) e.preventDefault(); }`
- Baris 168-171: Validasi judul, konten, dan kategori kosong
- Baris 173-176: Validasi user tidak login
- Baris 178: `setIsLoading(true)`
- Baris 180: `try {`
- Baris 214: `let slug = generateSlug(formData.title);`
- Baris 216-217: `let uniqueSlug = slug; let counter = 1;`
- Baris 218-226: Loop while untuk cek slug unik
- Baris 228-240: Membuat articleData object
- Baris 242-246: Insert ke database
- Baris 248-251: Penanganan error
- Baris 254-260: Success case dengan redirect berdasarkan published
- Baris 262-264: Catch exception
- Baris 265-267: Finally block dengan `setIsLoading(false)`

**Status:** ✅ Pseudocode sesuai dengan kode aktual (bagian create new article)

---

## 3. Fungsi Update Artikel (F-03)

**File:** `src/lib/supabase.ts`  
**Fungsi:** `updateArticle` (dalam object `articleManagement`)  
**Baris:** 651-669

**Detail:**
- Baris 651: `async updateArticle(articleId: string, userId: string, updates: Partial<Article>) {`
- Baris 652-661: Update query dengan `.eq('id', articleId).eq('author_id', userId)`
- Baris 663-666: Penanganan error dengan return `{ success: false, error: error.message }`
- Baris 668: Return `{ success: true, data, error: undefined }`

**Status:** ✅ Pseudocode sesuai dengan kode aktual

---

## 4. Fungsi Hapus Artikel (F-03)

**File:** `src/lib/supabase.ts`  
**Fungsi:** `deleteArticle` (dalam object `articleManagement`)  
**Baris:** 671-684

**Detail:**
- Baris 671: `async deleteArticle(articleId: string, userId: string) {`
- Baris 672-676: Delete query dengan `.eq('id', articleId).eq('author_id', userId)`
- Baris 678-680: Penanganan error dengan `throw error`
- Baris 683: Return `{ success: true }`

**Status:** ✅ Pseudocode sesuai dengan kode aktual

---

## 5. Fungsi Kelola Pengguna (Admin) (F-08)

**File:** `src/lib/adminHelpers.ts`  
**Fungsi:** `promoteToAdmin` (dalam object `adminHelpers`)  
**Baris:** 449-468

**Detail:**
- Baris 449: `async promoteToAdmin(userId: string, adminId: string) {`
- Baris 450: `try {`
- Baris 451-453: `supabase.rpc('promote_to_admin', { p_user_id: userId })`
- Baris 455: `if (error) throw error;`
- Baris 457-461: `this.logAdminActivity()` dengan catch untuk non-blocking
- Baris 463: Return `{ success: true }`
- Baris 464-467: Catch exception dengan return `{ success: false, error: 'Failed to promote user' }`

**Status:** ✅ Pseudocode sesuai dengan kode aktual

---

## Ringkasan

| No | Fungsi | File | Baris | Status |
|----|--------|------|-------|--------|
| 1 | Login Pengguna | `src/components/auth/LoginForm.tsx` | 46-83 | ✅ Sesuai |
| 2 | Tambah Artikel | `src/components/editor/WriteArticleForm.tsx` | 162-268 (create: 213-260) | ✅ Sesuai |
| 3 | Update Artikel | `src/lib/supabase.ts` | 651-669 | ✅ Sesuai |
| 4 | Hapus Artikel | `src/lib/supabase.ts` | 671-684 | ✅ Sesuai |
| 5 | Kelola Pengguna (Admin) | `src/lib/adminHelpers.ts` | 449-468 | ✅ Sesuai |

## Catatan

1. **Fungsi Tambah Artikel**: Pseudocode di BAB 7 hanya mencakup bagian create new article (baris 213-260), tidak termasuk bagian update existing article (baris 183-211). Ini sudah sesuai karena pseudocode fokus pada alur tambah artikel baru.

2. **Fungsi Update Artikel**: Pseudocode sudah sesuai dengan implementasi di `articleManagement.updateArticle()`.

3. **Fungsi Hapus Artikel**: Pseudocode sudah sesuai dengan implementasi di `articleManagement.deleteArticle()`.

4. **Fungsi Kelola Pengguna**: Pseudocode sudah sesuai dengan implementasi di `adminHelpers.promoteToAdmin()`, termasuk penanganan logAdminActivity yang non-blocking.

Semua pseudocode di BAB 7 sudah sesuai dengan kode aktual di project.

