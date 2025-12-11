# Alur Proses Sequence Diagrams

Dokumen ini berisi deskripsi alur proses untuk setiap sequence diagram yang digunakan dalam BAB 5.

---

## 5.2.1 Sequence Diagram Daftar Akun Baru

Gambaran proses interaksi antar sistem saat pengguna akan melakukan registrasi dapat diamati pada Gambar 5.2. Sequence diagram ini menggambarkan alur registrasi menggunakan Email/Password atau Google OAuth melalui Supabase Auth.

**Gambar 5.2 Sequence Diagram Daftar Akun Baru**

### Alur Proses:

1. User membuka halaman beranda dan klik tombol Daftar/Masuk
2. Sistem menampilkan form registrasi dengan opsi Email/Password dan Google
3. User memilih metode registrasi
4. **Jika memilih Email/Password:**
   - User mengisi nama lengkap, email, password, dan konfirmasi password
   - Sistem memvalidasi format email, kekuatan password (minimal 8 karakter), dan kecocokan password
   - Jika validasi berhasil, sistem memanggil `signUp(email, password, metadata)`
   - Sistem membuat akun baru di Supabase Auth dengan status unverified
   - Sistem membuat record di tabel profiles dengan role member dan is_admin=false
   - Sistem mengirim email verifikasi ke alamat email yang didaftarkan
   - Sistem mengarahkan user ke halaman profil untuk melengkapi data
5. **Jika memilih Google:**
   - User klik "Masuk dengan Google"
   - Sistem mengarahkan user ke halaman OAuth Google
   - User mengonfirmasi autentikasi Google
   - Sistem menerima token OAuth dan mengambil data profil pengguna
   - Sistem membuat akun baru di Supabase Auth dengan status verified
   - Sistem membuat record di tabel profiles dengan role member dan is_admin=false
   - Sistem mengarahkan user ke halaman profil untuk melengkapi data
6. **Alternative Flows:**
   - Jika email sudah terdaftar, sistem menampilkan pesan "Email sudah terdaftar" dan menawarkan opsi login
   - Jika password tidak memenuhi kriteria, sistem menampilkan pesan error spesifik
   - Jika konfirmasi password tidak cocok, sistem menampilkan pesan error
7. **Exception Flows:**
   - Jika koneksi terputus saat registrasi, sistem menampilkan pesan error dan meminta user mencoba lagi
   - Jika server error, sistem menampilkan pesan error dan menyarankan mencoba beberapa saat lagi

---

## 5.2.2 Sequence Diagram Login Pengguna

Gambaran proses interaksi antar sistem saat pengguna akan melakukan login dapat diamati pada Gambar 5.3. Sequence diagram ini menggambarkan alur autentikasi menggunakan email/password atau Google OAuth melalui Supabase Auth.

**Gambar 5.3 Sequence Diagram Login Pengguna**

### Alur Proses:

1. User membuka halaman login atau klik tombol "Masuk"
2. Sistem menampilkan form email/password dan opsi Google OAuth
3. **Jika memilih Email/Password:**
   - User memasukkan email dan password, lalu klik tombol "Masuk"
   - Sistem memverifikasi kredensial ke Supabase Auth menggunakan `signInWithPassword(email, password)`
   - Jika kredensial valid, sistem memuat data profil pengguna dari tabel profiles
   - Sistem menentukan role dan permissions pengguna berdasarkan data profil
   - Sistem mengarahkan user ke dashboard sesuai peran (beranda untuk member, /admin untuk admin/moderator)
   - Sistem menampilkan notifikasi login berhasil
4. **Jika memilih Google:**
   - User klik "Masuk dengan Google"
   - Sistem mengarahkan user ke halaman OAuth Google
   - User mengonfirmasi autentikasi Google
   - Sistem menerima token OAuth dan mengambil data profil pengguna
   - Sistem memverifikasi atau membuat akun di Supabase Auth
   - Sistem memuat data profil pengguna
   - Sistem mengarahkan user ke dashboard sesuai peran
5. **Alternative Flows:**
   - Jika pengguna klik "Lupa Password", sistem menampilkan form reset password
6. **Exception Flows:**
   - Jika kredensial salah, sistem menampilkan pesan "Email atau password salah" tanpa mengungkapkan bagian yang salah
   - Jika akun belum terverifikasi, sistem menampilkan pesan dan opsi kirim ulang email verifikasi
   - Jika akun di-ban, sistem menampilkan pesan "Akun Anda telah dinonaktifkan. Hubungi administrator untuk informasi lebih lanjut"
   - Jika koneksi terputus, sistem menampilkan pesan error dan memungkinkan user mencoba lagi

---

## 5.2.3 Sequence Diagram Reset Password

Gambaran proses interaksi antar sistem saat pengguna akan mereset password yang lupa dapat diamati pada Gambar 5.4. Sequence diagram ini menggambarkan alur reset password dengan email verification.

**Gambar 5.4 Sequence Diagram Reset Password**

### Alur Proses:

**Fase 1: Request Reset Password**
1. User klik "Lupa Password" di halaman login
2. Sistem menampilkan form untuk memasukkan email
3. User memasukkan email dan klik "Kirim Link Reset"
4. Sistem memverifikasi email terdaftar menggunakan `resetPasswordForEmail(email, redirectTo)`
5. Jika email valid, sistem menghasilkan token reset password yang berlaku 1 jam
6. Sistem mengirim email berisi link reset yang berlaku 1 jam
7. Sistem menampilkan pesan konfirmasi pengiriman email (meskipun email tidak terdaftar, untuk keamanan)

**Fase 2: Reset Password dengan Token**
8. User membuka link dari email
9. Sistem memverifikasi token reset secara otomatis (Supabase auto-verify saat link diklik)
10. Jika token valid, sistem menampilkan form password baru
11. User memasukkan password baru dan konfirmasi lalu klik "Reset Password"
12. Sistem memvalidasi password baru (strength, match)
13. Sistem memperbarui password di Supabase Auth menggunakan `updateUser({ password })`
14. Sistem membatalkan token reset password
15. Sistem menampilkan notifikasi sukses dan opsi login

**Alternative Flows:**
- Jika email tidak terdaftar, sistem tetap menampilkan pesan konfirmasi untuk menjaga keamanan
- Jika token expired atau tidak valid, sistem menampilkan pesan error dan opsi kirim ulang link reset

**Exception Flows:**
- Jika email gagal terkirim karena server error, sistem menampilkan pesan error dan opsi mencoba kembali
- Jika token sudah digunakan, sistem menampilkan pesan error

---

## 5.2.4 Sequence Diagram Lihat Beranda (Homepage)

Gambaran proses interaksi antar sistem saat pengguna akan melihat halaman beranda dapat diamati pada Gambar 5.5. Sequence diagram ini menggambarkan alur loading homepage dengan featured content, latest articles, dan kategori.

**Gambar 5.5 Sequence Diagram Lihat Beranda**

### Alur Proses:

1. User membuka URL beranda `https://paberland.com/`
2. Sistem memuat halaman beranda dan menampilkan loading state
3. Sistem secara paralel memanggil beberapa service:
   - **Memuat Konten Pilihan:** `getFeaturedArticles()`
     - Query ke tabel `featured_content` dengan `active=true`
     - JOIN dengan tabel `articles` untuk mendapatkan data lengkap artikel
     - Mengembalikan array featured articles
   - **Memuat Artikel Terbaru:** `getLatestArticles(limit=5)`
     - Query ke tabel `articles` dengan `published=true`
     - Diurutkan berdasarkan `created_at DESC`
     - Limit 5 artikel
     - Mengembalikan array latest articles
   - **Memuat Kategori:** `getCategories()`
     - Query ke tabel `articles` untuk menghitung jumlah artikel per kategori
     - Mengembalikan array categories dengan jumlah artikel
4. Setelah seluruh data dimuat, sistem menampilkan:
   - Hero section dengan deskripsi komunitas
   - Blok Konten Pilihan (jika tersedia)
   - Blok Artikel Terbaru
   - Grid kategori dengan ikon dan jumlah artikel
   - Footer dengan informasi kontak

**Alternative Flows:**
- Jika tidak ada konten pilihan, sistem hanya menampilkan artikel terbaru
- Jika tidak ada artikel, sistem menampilkan pesan "Belum ada artikel" dengan CTA untuk menulis

**Exception Flows:**
- Jika gagal memuat data, sistem menampilkan pesan error dan opsi refresh
- Jika koneksi lambat, sistem menampilkan skeleton loader selama loading

---

## 5.2.5 Sequence Diagram Melihat Kategori

Gambaran proses interaksi antar sistem saat pengguna akan melihat halaman detail kategori dapat diamati pada Gambar 5.8. Sequence diagram ini menggambarkan alur kategori dengan statistik dan daftar artikel.

**Gambar 5.8 Sequence Diagram Melihat Kategori**

### Alur Proses:

1. User membuka halaman kategori melalui URL `/kategori/[slug]` (contoh: `/kategori/cerpen`)
2. CategoryDetailPage component dimuat dan menampilkan loading state
3. CategoryDetailPage memanggil `getCategoryInfo(categorySlug)` untuk verifikasi kategori valid
4. Sistem melakukan query ke database untuk memverifikasi kategori
5. Jika kategori valid, sistem memanggil `getArticlesByCategory(category, page=1, limit=20)`
6. Sistem melakukan query ke tabel `articles` dengan:
   - Filter: `category = categorySlug`, `published = true`
   - Sort berdasarkan parameter (newest, oldest, popular, most_liked)
   - Pagination (limit 20 per halaman)
7. Sistem melakukan JOIN dengan `profiles` untuk mendapatkan data penulis
8. Sistem memanggil `getCategoryStats(category)` untuk menghitung statistik:
   - COUNT artikel dengan kategori tersebut dan `published=true`
   - SUM views dari artikel kategori tersebut
   - SUM likes_count dari artikel kategori tersebut
   - SUM comments_count dari artikel kategori tersebut
9. Sistem mengembalikan response dengan data artikel dan statistik
10. CategoryDetailPage menampilkan:
    - Header kategori dengan nama, deskripsi, dan statistik
    - Dropdown sorting: Terbaru, Terlama, Terpopuler, Paling Disukai
    - Daftar artikel dengan card layout (judul, penulis, tanggal, views, likes, excerpt)
    - Pagination controls
    - Tombol "Tulis [Nama Kategori]" untuk mendorong partisipasi
11. User dapat mengubah sorting dan halaman akan refresh dengan data baru
12. User dapat mengklik artikel untuk melihat detail

**Alternative Flows:**
- Jika user membuka halaman daftar kategori `/kategori`, sistem menampilkan semua kategori dengan jumlah artikel
- Jika kategori tidak memiliki artikel, sistem menampilkan pesan "Belum ada artikel dalam kategori ini"

**Exception Flows:**
- Jika kategori tidak ditemukan, sistem menampilkan halaman 404
- Jika gagal memuat data, sistem menampilkan pesan error

---

## 5.2.6 Sequence Diagram Baca Artikel

Gambaran proses interaksi antar sistem saat pengguna akan membaca artikel secara lengkap dapat diamati pada Gambar 5.9. Sequence diagram ini menggambarkan alur membaca artikel dengan konten, penulis, komentar, dan artikel terkait.

**Gambar 5.9 Sequence Diagram Baca Artikel**

### Alur Proses:

1. User klik artikel dari beranda, kategori, atau hasil pencarian
2. Sistem mengarahkan ke halaman detail artikel melalui URL `/article/[slug]`
3. ArticleDetailPage component dimuat dan menampilkan loading state
4. ArticleDetailPage memanggil `getArticle(slug)` untuk mengambil data artikel lengkap
5. Sistem melakukan query ke tabel `articles` berdasarkan slug dengan filter `published=true`
6. Sistem melakukan JOIN dengan tabel `profiles` untuk mendapatkan data penulis lengkap
7. Sistem memverifikasi artikel ditemukan dan berstatus published
8. Jika artikel valid, sistem secara paralel memanggil:
   - **Memuat Artikel Terkait:** `getRelatedArticles(articleId, category)`
     - Query ke tabel `articles` dengan `category = article.category`, `id != articleId`, `published=true`
     - Diurutkan berdasarkan views DESC
     - Limit 4 artikel
   - **Memuat Jumlah Komentar:** `getCommentCount(articleId)`
     - COUNT komentar dari tabel `comments` dengan `article_id = articleId`
9. Sistem menambah nilai view count artikel menggunakan `incrementViews(articleId)`
10. Setelah seluruh data dimuat, sistem menampilkan:
    - Header artikel berisi judul dan metadata (penulis, tanggal, kategori, reading time)
    - Cover image artikel (atau placeholder jika tidak ada)
    - Konten artikel dalam bentuk HTML dari TinyMCE
    - Informasi penulis dengan tautan ke halaman profil
    - Tombol like dan komentar
    - Section komentar dengan daftar komentar
    - Artikel terkait berdasarkan kategori
    - Tombol bagikan artikel (social share)
11. User dapat membaca artikel secara lengkap
12. User dapat melakukan like, komentar, dan membagikan artikel
13. User dapat melihat artikel terkait dan mengklik untuk membaca

**Alternative Flows:**
- Jika pengguna membuka artikel draft milik sendiri, sistem menampilkan artikel dengan badge Draft
- Jika artikel tidak memiliki cover image, sistem menggunakan gambar placeholder

**Exception Flows:**
- Jika artikel tidak ditemukan atau tidak berstatus published, sistem menampilkan halaman 404
- Jika artikel telah dihapus, sistem menampilkan pesan "Artikel tidak tersedia"

---

## 5.2.7 Sequence Diagram Cari Konten

Gambaran proses interaksi antar sistem saat pengguna akan mencari artikel dan member berdasarkan keyword dapat diamati pada Gambar 5.10. Sequence diagram ini menggambarkan alur pencarian full-text dengan filter dan pagination.

**Gambar 5.10 Sequence Diagram Cari Konten**

### Alur Proses:

1. User memasukkan keyword di search bar atau membuka halaman `/search`
2. Sistem menampilkan halaman pencarian dengan form search
3. User memasukkan keyword dan klik tombol Cari atau tekan Enter
4. SearchPage component memanggil `performSearch(keyword, type='all', category, page)`
5. SearchService memanggil API route `/api/search` dengan query parameters:
   - `q`: keyword pencarian
   - `type`: 'all', 'articles', atau 'authors'
   - `category`: kategori filter (opsional)
   - `page`: halaman saat ini
   - `limit`: jumlah hasil per halaman (default 10)
6. API route melakukan validasi keyword minimal 2 karakter
7. **Jika type='all' atau type='articles':**
   - API route melakukan query ke tabel `articles` dengan:
     - Filter: `published=true`
     - Full-text search: `title ILIKE %keyword%` OR `excerpt ILIKE %keyword%` OR `content ILIKE %keyword%`
     - Filter kategori jika dipilih
     - Sort: `created_at DESC`
     - Pagination: `LIMIT 10 OFFSET (page-1)*10`
   - API route melakukan JOIN dengan tabel `profiles` untuk mendapatkan data penulis
8. **Jika type='all' atau type='authors':**
   - API route melakukan query ke tabel `profiles` dengan:
     - Full-text search: `full_name ILIKE %keyword%` OR `bio ILIKE %keyword%`
     - Sort: `full_name ASC`
     - Limit: maksimal 100 hasil (frontend menampilkan 6 per halaman)
9. API route menghitung total hasil untuk pagination
10. API route mengembalikan response dengan:
    - Array artikel (jika ada)
    - Array member (jika ada)
    - Total count untuk artikel dan member
    - Pagination info (currentPage, totalPages)
11. SearchService memperbarui state dengan hasil pencarian
12. SearchPage menampilkan hasil pencarian dengan:
    - Filter tabs: All, Articles, Members
    - Hasil artikel dengan highlight keyword (jika ditemukan)
    - Hasil member dengan highlight keyword (jika ditemukan)
    - Pagination controls
    - Summary: jumlah artikel dan member ditemukan
13. User dapat mengklik hasil untuk melihat detail artikel atau profil member
14. User dapat mengubah filter (All/Articles/Members) dan hasil akan di-refresh
15. User dapat mengubah halaman pagination untuk melihat hasil lebih banyak

**Alternative Flows:**
- Jika pengguna memilih filter "Articles", sistem hanya melakukan pencarian di tabel articles dan menampilkan hasil artikel saja
- Jika pengguna memilih filter "Members", sistem hanya melakukan pencarian di tabel profiles dan menampilkan hasil member saja
- Jika keyword kosong atau kurang dari 2 karakter, sistem menampilkan pesan "Masukkan keyword untuk mencari" atau "Query minimal 2 karakter"
- Jika hasil pencarian kosong, sistem menampilkan pesan "Tidak ada hasil" dengan tips pencarian

**Exception Flows:**
- Jika pencarian gagal karena server error, sistem menampilkan pesan error dan opsi untuk mencoba lagi
- Jika koneksi terputus, sistem menampilkan pesan error dan opsi untuk mencoba lagi

---

## 5.2.8 Sequence Diagram Tulis Artikel Baru

Gambaran proses interaksi antar sistem saat penulis akan menulis dan menyimpan artikel baru dapat diamati pada Gambar 5.11. Sequence diagram ini menggambarkan alur penulisan artikel dengan editor TinyMCE, auto-save draft, dan upload cover image.

**Gambar 5.11 Sequence Diagram Tulis Artikel Baru**

### Alur Proses:

1. Penulis klik tombol "Tulis Konten Baru" atau membuka halaman `/write`
2. Sistem memverifikasi user sudah login dengan role member atau lebih tinggi
3. WriteArticleForm component dimuat dan memanggil `loadEditor()`
4. Sistem memuat editor TinyMCE dengan konfigurasi lengkap
5. Sistem memuat daftar kategori dari database
6. Sistem menampilkan halaman editor dengan form kosong
7. Penulis mengisi form artikel (judul, kategori, konten)
8. Sistem memvalidasi input secara real-time pada judul, kategori, dan konten
9. Penulis menulis konten di editor TinyMCE
10. Sistem melakukan auto-save draft setiap 30 detik atau setelah user berhenti mengetik selama 3 detik:
    - WriteArticleForm memanggil `autoSaveDraft(articleData)`
    - Sistem menyimpan draft sementara di localStorage sebagai backup
    - Jika artikel baru (belum ada id), sistem melakukan INSERT ke tabel `articles` dengan `published=false`
    - Jika artikel existing (sudah ada id), sistem melakukan UPDATE ke tabel `articles`
    - Sistem menampilkan indikator "Draft tersimpan" (fade in/out, 2 detik)
11. **Jika penulis mengunggah cover image (opsional):**
    - Penulis memilih file gambar
    - Sistem memvalidasi format dan ukuran gambar
    - Sistem mengunggah gambar ke Supabase Storage bucket 'article-covers'
    - Sistem menampilkan preview gambar setelah upload berhasil
12. Penulis klik tombol "Simpan sebagai Draft" atau "Publikasikan"
13. Sistem memvalidasi keseluruhan form artikel (judul, konten, kategori wajib diisi)
14. **Jika memilih "Simpan sebagai Draft":**
    - Sistem menyimpan artikel dengan `published=false`
    - Sistem menampilkan notifikasi sukses
    - Penulis dapat melanjutkan menulis artikel kapan saja
15. **Jika memilih "Publikasikan":**
    - Sistem menyimpan artikel dengan `published=true`
    - Sistem menampilkan notifikasi sukses
    - Sistem mengarahkan penulis ke halaman detail artikel yang baru dipublikasikan
    - Proses auto-save berhenti

**Alternative Flows:**
- Jika penulis memilih template artikel, sistem mengisi form dengan konten dari template
- Jika auto-save gagal, sistem menampilkan notifikasi "Gagal menyimpan draft" dan menyimpan data secara lokal di localStorage
- Jika penulis klik tombol "Publikasikan", sistem melanjutkan proses ke UC-09 (Publikasikan Artikel)

**Exception Flows:**
- Jika editor gagal dimuat, sistem menampilkan pesan error dan opsi refresh
- Jika auto-save gagal berkali-kali, sistem menampilkan warning dan menyimpan draft di localStorage
- Jika upload gambar gagal (format tidak valid atau ukuran terlalu besar), sistem menampilkan pesan error spesifik

---

## 5.2.9 Sequence Diagram Publikasikan Artikel

Gambaran proses interaksi antar sistem saat penulis akan mempublikasikan artikel agar dapat diakses oleh pengguna lain dapat diamati pada Gambar 5.12. Sequence diagram ini menggambarkan alur publikasi artikel dengan validasi, generate slug, dan notifikasi.

**Gambar 5.12 Sequence Diagram Publikasikan Artikel**

### Alur Proses:

1. Penulis klik tombol "Publikasikan" di editor
2. WriteArticleForm component memanggil `validateArticle(articleData)` untuk memvalidasi artikel:
   - Validasi judul tidak kosong
   - Validasi kategori valid
   - Validasi konten minimal 100 kata
   - Validasi slug unik
3. Jika validasi berhasil, sistem memanggil `publishArticle(articleData)`
4. Sistem menghasilkan slug dari judul artikel menggunakan `generateSlug(title)`:
   - Mengkonversi judul ke lowercase
   - Menghapus karakter khusus
   - Mengganti spasi dengan tanda hubung
5. Sistem melakukan pengecekan slug unik di database:
   - Query ke tabel `articles` untuk memeriksa apakah slug sudah ada
   - Jika slug sudah ada, sistem menambahkan angka di akhir slug (contoh: `judul-artikel-2`)
   - Proses diulang hingga mendapatkan slug yang unik
6. Sistem menyimpan artikel dengan status published:
   - INSERT/UPDATE ke tabel `articles` dengan `published=true`
   - Mencatat timestamp `published_at` dengan nilai `NOW()`
   - Menyimpan slug unik yang telah di-generate
7. Sistem mengirim notifikasi ke penulis menggunakan `sendNotification(userId, 'article_published')`
8. Sistem menampilkan notifikasi sukses publikasi
9. Sistem mengarahkan penulis ke halaman detail artikel yang baru dipublikasikan melalui URL `/article/[slug]`

**Alternative Flows:**
- Jika slug sudah ada, sistem menambahkan angka di akhir slug (contoh: `judul-artikel-2`, `judul-artikel-3`, dst.) hingga mendapatkan slug yang unik
- Jika penulis memilih "Jadwalkan Publikasi", sistem menyimpan artikel dengan `scheduled_at` dan status `scheduled` (bukan `published`). Artikel akan otomatis dipublikasikan pada waktu yang dijadwalkan oleh background job

**Exception Flows:**
- Jika validasi gagal (judul kosong, kategori invalid, konten kurang dari 100 kata), sistem menampilkan pesan error spesifik untuk setiap field yang tidak valid
- Jika proses penyimpanan gagal karena server error, sistem menampilkan pesan error dan menyimpan artikel sebagai draft (`published=false`) untuk mencegah kehilangan data

---

## 5.2.10 Sequence Diagram Edit Artikel

Gambaran proses interaksi antar sistem saat penulis akan mengubah dan memperbarui artikel yang telah dibuat dapat diamati pada Gambar 5.13. Sequence diagram ini menggambarkan alur edit artikel dengan loading data, validasi real-time, auto-save, dan update artikel.

**Gambar 5.13 Sequence Diagram Edit Artikel**

### Alur Proses:

1. Penulis membuka halaman `/write?edit=article_id` atau `/my-articles` dan klik tombol edit
2. WritePage component memanggil `loadArticleForEdit(articleId)` untuk memuat artikel yang akan diedit
3. Sistem memanggil `getArticleForEdit(articleId, userId)` untuk mengambil data artikel:
   - Query ke tabel `articles` dengan kondisi `id=? AND author_id=?` untuk memastikan artikel milik penulis
   - Verifikasi ownership artikel sebelum mengizinkan edit
4. Jika artikel ditemukan dan milik penulis, sistem memuat editor dengan data artikel:
   - Initialize form dengan data artikel (title, content, category, excerpt, cover_image)
   - Initialize TinyMCE editor dengan konten artikel
   - Tampilkan status artikel saat ini (draft atau published)
5. Sistem menampilkan form yang sudah terisi dengan data artikel dan editor TinyMCE dengan konten artikel
6. Penulis mengubah konten artikel (judul, konten, kategori, dll.)
7. Sistem memvalidasi perubahan secara real-time menggunakan `validateInput(changes)`:
   - Validasi format input
   - Validasi panjang konten
   - Update state dengan perubahan
8. Sistem melakukan auto-save perubahan:
   - Simpan draft sementara di localStorage sebagai backup
   - Panggil `autoSaveDraft(articleId, changes)` untuk menyimpan ke database
   - Update artikel di database dengan `updated_at=NOW()`
   - Tampilkan indikator "Draft tersimpan" kepada penulis
9. Penulis klik tombol "Simpan Perubahan" atau "Perbarui"
10. Sistem memvalidasi seluruh form artikel menggunakan `validateForm(articleData)`:
    - Validasi judul tidak kosong
    - Validasi kategori valid
    - Validasi konten minimal 100 kata
11. Setelah validasi berhasil, sistem memperbarui artikel di database:
    - Panggil `updateArticle(articleId, userId, updates)` dengan data perubahan
    - UPDATE ke tabel `articles` dengan kondisi `id=? AND author_id=?`
    - Update field: title, content, excerpt, category, cover_image, updated_at
12. Sistem mencatat timestamp `updated_at` dengan nilai `NOW()`
13. Sistem menampilkan notifikasi sukses "Artikel berhasil diperbarui"
14. Sistem mengarahkan penulis ke halaman detail artikel yang telah diperbarui

**Alternative Flows:**
- Jika artikel berstatus draft (`published=false`), sistem membuka editor dengan status draft dan menampilkan badge "Draft"
- Jika artikel berstatus published (`published=true`), sistem membuka editor dengan status published dan menampilkan badge "Published". Perubahan akan langsung terlihat di halaman publik setelah update
- Jika penulis mengubah artikel yang sudah published, sistem memperbarui artikel dan mempertahankan status published. Artikel tetap dapat diakses publik dengan perubahan terbaru

**Exception Flows:**
- Jika artikel tidak ditemukan atau bukan milik penulis, sistem menampilkan status 403 "Tidak memiliki akses untuk mengedit artikel ini" dan redirect ke halaman `/my-articles`
- Jika artikel sedang diedit oleh orang lain sehingga terjadi konflik (deteksi melalui `updated_at` yang baru), sistem menampilkan warning "Artikel mungkin sedang diedit oleh pengguna lain"
- Jika proses penyimpanan gagal karena server error atau database error, sistem menampilkan pesan error spesifik dan tidak melakukan update

---

## 5.2.11 Sequence Diagram Hapus Artikel

Gambaran proses interaksi antar sistem saat penulis akan menghapus artikel miliknya dari sistem dapat diamati pada Gambar 5.14. Sequence diagram ini menggambarkan alur penghapusan artikel dengan konfirmasi modal, validasi ownership, dan penghapusan data terkait.

**Gambar 5.14 Sequence Diagram Hapus Artikel**

### Alur Proses:

1. Penulis membuka halaman `/my-articles` atau halaman detail artikel miliknya
2. Sistem menampilkan daftar artikel beserta tombol Hapus untuk setiap artikel
3. Penulis menekan tombol Hapus pada artikel yang ingin dihapus
4. Sistem menampilkan modal konfirmasi dengan peringatan "Apakah Anda yakin ingin menghapus konten ini? Tindakan ini tidak dapat dibatalkan"
5. Penulis mengonfirmasi penghapusan dengan klik tombol "Hapus" di modal
6. Sistem memanggil `deleteArticle(articleId, userId)` untuk memvalidasi bahwa artikel adalah milik penulis:
   - Query ke tabel `articles` dengan kondisi `id=? AND author_id=?` untuk memastikan artikel milik penulis
   - Verifikasi ownership sebelum melakukan penghapusan
7. Setelah validasi berhasil, sistem menghapus artikel dari database:
   - Query untuk mendapatkan path cover image (jika ada)
   - DELETE dari tabel `articles` dengan kondisi `id=? AND author_id=?`
   - Database secara otomatis menghapus data terkait melalui ON DELETE CASCADE:
     - Semua komentar terkait (comments.article_id)
     - Semua like terkait (article_likes.article_id)
     - Semua laporan terkait (content_reports.content_id)
     - Featured content jika ada (featured_content.content_id)
     - Notifikasi terkait (notifications.article_id)
8. Sistem menghapus cover image dari storage jika tersedia:
   - Panggil `deleteImage(cover_image_path)` untuk menghapus file dari storage bucket
   - Hanya dilakukan jika artikel memiliki cover image
9. Sistem mencatat aktivitas penghapusan (jika menggunakan activity logs)
10. Sistem menampilkan notifikasi berhasil "Konten berhasil dihapus"
11. Sistem mengarahkan penulis ke halaman `/my-articles` dengan daftar artikel yang telah diperbarui

**Alternative Flows:**
- Jika penulis membatalkan penghapusan dengan klik tombol "Batal" di modal, sistem menutup modal dan tidak melakukan perubahan apapun. Artikel tetap ada di database
- Jika sistem menggunakan metode soft delete (tidak diimplementasikan di codebase saat ini), sistem hanya mengubah status artikel menjadi `deleted=true` tanpa menghapus data fisik dari database

**Exception Flows:**
- Jika artikel tidak ditemukan (tidak ada di database), sistem menampilkan error 404 "Artikel tidak ditemukan" dan tidak melakukan penghapusan
- Jika artikel bukan milik penulis (author_id tidak cocok), sistem menampilkan error 403 "Tidak memiliki akses untuk menghapus artikel ini" dan tidak melakukan penghapusan
- Jika proses penghapusan gagal karena server error atau database error, sistem menampilkan pesan error spesifik dan artikel tetap ada di database

---

## 5.2.12 Sequence Diagram Kelola Artikel Saya

Gambaran proses interaksi antar sistem saat penulis akan melihat, memfilter, mengedit, dan menghapus artikel miliknya dapat diamati pada Gambar 5.15. Sequence diagram ini menggambarkan alur pengelolaan artikel dengan loading, filtering, pagination, dan statistik.

**Gambar 5.15 Sequence Diagram Kelola Artikel Saya**

### Alur Proses:

1. Penulis membuka halaman `/my-articles`
2. MyArticlesPage component memanggil `loadUserArticles(userId)` untuk memuat daftar artikel milik penulis
3. Sistem melakukan dua operasi secara bersamaan (concurrent) menggunakan `Promise.all()`:
   - **Load Articles**: Memanggil `getUserArticles(userId, page, limit, search, category, status)` untuk mengambil artikel dengan:
     - Filter berdasarkan status (all, draft, published)
     - Filter berdasarkan kategori (jika dipilih)
     - Filter berdasarkan search query (jika ada)
     - Pagination (page, limit)
     - Query ke tabel `articles` dengan kondisi `author_id=?` dan filter yang diterapkan
   - **Load Stats**: Memanggil `getUserStats(userId)` untuk mengambil statistik artikel:
     - Total artikel
     - Jumlah artikel published
     - Jumlah artikel draft
     - Total views, likes, dan comments
4. Setelah data dimuat, sistem menampilkan daftar artikel dalam bentuk tabel atau list dengan informasi:
   - Judul artikel
   - Kategori
   - Status (draft/published)
   - Tanggal update
   - Metrik (views, likes, comments)
5. Sistem menampilkan filter artikel (All, Draft, Published) untuk memfilter artikel berdasarkan status
6. Sistem menampilkan statistik artikel (total artikel, jumlah published, jumlah draft) dalam bentuk kartu statistik
7. Sistem menampilkan tombol "Tulis Baru" yang mengarahkan ke halaman `/write`
8. Sistem menampilkan aksi per artikel berupa:
   - **Lihat**: Preview artikel
   - **Edit**: Mengarahkan ke `/write?edit=article_id`
   - **Hapus**: Menampilkan modal konfirmasi dan menghapus artikel

**Alternative Flows:**
- Jika penulis belum memiliki artikel (artikel list kosong), sistem menampilkan pesan "Belum ada artikel" disertai tombol CTA "Tulis Artikel Pertama" yang mengarahkan ke halaman `/write`
- Jika penulis memilih filter "Draft", sistem hanya menampilkan artikel dengan status `published=false` dengan memanggil `getUserArticles(..., status='draft')`
- Jika penulis memilih filter "Published", sistem hanya menampilkan artikel dengan status `published=true` dengan memanggil `getUserArticles(..., status='published')`
- Jika penulis memilih filter "All", sistem menampilkan semua artikel tanpa filter status
- Jika artikel lebih dari batas per halaman (pagination), penulis dapat klik halaman berikutnya untuk memuat artikel halaman selanjutnya. Sistem memanggil `getUserArticles(..., page=2)` dengan `LIMIT` dan `OFFSET` yang sesuai

**Exception Flows:**
- Jika sistem gagal memuat data artikel karena server error atau database error, sistem menampilkan pesan error "Gagal memuat konten" dan tidak menampilkan daftar artikel

---

## 5.2.13 Sequence Diagram Like Artikel

Gambaran proses interaksi antar sistem saat pengguna akan memberikan atau membatalkan like pada artikel dapat diamati pada Gambar 5.16. Sequence diagram ini menggambarkan alur like/unlike artikel dengan pengecekan status, update database, dan sinkronisasi likes count.

**Gambar 5.16 Sequence Diagram Like Artikel**

### Alur Proses:

1. Pengguna membuka halaman detail artikel
2. ArticleDetailPage component memanggil `checkUserLike(articleId, userId)` untuk memeriksa apakah pengguna sudah pernah menyukai artikel tersebut:
   - Query ke tabel `article_likes` dengan kondisi `article_id=? AND user_id=?`
   - Mengembalikan status like pengguna (true/false)
3. Sistem menampilkan tombol like beserta jumlah like saat ini berdasarkan status yang diperoleh
4. Pengguna menekan tombol "Like"
5. ArticleDetailPage component memanggil `toggleLike(articleId, userId)` untuk toggle status like
6. Sistem memeriksa apakah pengguna sudah pernah menyukai artikel tersebut:
   - Query ke tabel `article_likes` untuk memeriksa existing like
7. **Jika belum pernah like:**
   - Sistem menambahkan data ke tabel `article_likes` dengan INSERT
   - Database trigger `update_article_likes_count` secara otomatis memperbarui `likes_count` pada tabel `articles` dengan menambahkan 1
   - Sistem memanggil `syncLikesCount(articleId)` untuk memastikan likes count sinkron
   - Sistem mengembalikan success dengan `isLiked: true`
   - Sistem menampilkan animasi like, memperbarui jumlah like di UI, dan menampilkan notifikasi sukses "Artikel ditambahkan ke favorit!"
8. **Jika sudah pernah like (Unlike):**
   - Sistem menghapus data dari tabel `article_likes` dengan DELETE
   - Database trigger `update_article_likes_count` secara otomatis memperbarui `likes_count` pada tabel `articles` dengan mengurangi 1
   - Sistem memanggil `syncLikesCount(articleId)` untuk memastikan likes count sinkron
   - Sistem mengembalikan success dengan `isLiked: false`
   - Sistem memperbarui UI dan menampilkan notifikasi sukses "Artikel dihapus dari favorit!"

**Alternative Flows:**
- Jika pengguna sudah pernah like, tombol berubah menjadi "Unlike" dan ketika diklik sistem akan melakukan proses unlike dengan menghapus record dari tabel `article_likes` dan mengurangi likes count

**Exception Flows:**
- Jika proses like gagal karena server error atau database error, sistem menampilkan pesan error "Gagal memperbarui like" dan mengembalikan UI ke kondisi semula (rollback optimistic update)
- Jika koneksi terputus, sistem tetap menampilkan perubahan menggunakan optimistic update. UI menampilkan perubahan sementara sebelum konfirmasi dari server, memberikan pengalaman pengguna yang lebih responsif

---

## 5.2.14 Sequence Diagram Komentar Artikel

Gambaran proses interaksi antar sistem saat pengguna akan menambahkan, membalas, mengedit, dan menghapus komentar pada artikel dapat diamati pada Gambar 5.17. Sequence diagram ini menggambarkan alur komentar artikel dengan validasi, penyimpanan, dan update comments count.

**Gambar 5.17 Sequence Diagram Komentar Artikel**

### Alur Proses:

1. Pengguna membuka halaman detail artikel
2. ArticleDetailPage component memanggil `getArticleComments(articleId)` untuk memuat daftar komentar:
   - Query ke tabel `comments` dengan kondisi `article_id=?`
   - Mengembalikan komentar dalam struktur nested (parent-child) untuk reply
3. Sistem menampilkan form komentar dan daftar komentar yang sudah ada
4. Pengguna mengetik komentar pada form komentar dan menekan tombol "Kirim"
5. ArticleDetailPage component memanggil `validateComment(content)` untuk memvalidasi isi komentar:
   - Validasi content tidak kosong (trimmed)
   - Validasi content tidak melebihi 1000 karakter
6. Setelah validasi berhasil, sistem memanggil `addComment(articleId, userId, content)` untuk menyimpan komentar:
   - INSERT ke tabel `comments` dengan `article_id`, `author_id`, `content`, dan `parent_id` (null untuk komentar utama)
7. Sistem memanggil `updateArticleCommentCount(articleId)` untuk memperbarui jumlah komentar:
   - Query COUNT dari tabel `comments` untuk artikel tersebut
   - UPDATE tabel `articles` dengan `comments_count` yang baru
8. Sistem menampilkan komentar baru di halaman artikel dan memperbarui jumlah komentar (comments count)

**Alternative Flows:**
- **Reply Komentar**: Jika pengguna melakukan reply pada komentar lain, sistem menampilkan form reply dengan `parent_id` yang diisi. Ketika dikirim, sistem menyimpan komentar dengan `parent_id` yang sesuai, dan komentar ditampilkan sebagai sub-komentar dengan indentasi di bawah komentar parent
- **Edit Komentar**: Jika pengguna mengedit komentar miliknya sendiri, sistem menampilkan form edit dengan konten lama. Setelah disimpan, sistem memanggil `updateComment(commentId, userId, content)` untuk UPDATE komentar di database dengan kondisi `id=? AND author_id=?` untuk memastikan hanya pemilik yang bisa mengedit
- **Hapus Komentar**: Jika pengguna menghapus komentar miliknya sendiri, sistem memanggil `deleteComment(commentId, userId)` untuk DELETE komentar dari database dengan kondisi `id=? AND author_id=?`. Setelah penghapusan, sistem memperbarui comments count dan menghapus komentar dari list

**Exception Flows:**
- Jika komentar kosong (setelah trim), sistem menampilkan pesan validasi "Komentar tidak boleh kosong" dan tidak melakukan penyimpanan
- Jika komentar terlalu panjang (lebih dari 1000 karakter), sistem menampilkan pesan error "Komentar terlalu panjang" dan tidak melakukan penyimpanan
- Jika proses penyimpanan gagal karena server error atau database error, sistem menampilkan pesan error "Gagal menambahkan komentar" dan tidak menambahkan komentar ke list

---

## 5.2.15 Sequence Diagram Laporkan Konten

Gambaran proses interaksi antar sistem saat pengguna akan melaporkan artikel yang melanggar aturan dapat diamati pada Gambar 5.18. Sequence diagram ini menggambarkan alur pelaporan konten dengan validasi, pengecekan duplikasi, dan penyimpanan laporan.

**Gambar 5.18 Sequence Diagram Laporkan Konten**

### Alur Proses:

1. Pengguna membuka halaman detail artikel dan melihat tombol "Laporkan"
2. Pengguna menekan tombol "Laporkan"
3. Sistem menampilkan modal form laporan dengan pilihan alasan:
   - Spam
   - Konten tidak pantas
   - Pelecehan
   - Pelanggaran hak cipta
   - Lainnya
4. Pengguna memilih alasan laporan
5. Sistem memvalidasi alasan menggunakan `validateReason(reason)` untuk memastikan alasan dipilih
6. Pengguna mengisi detail laporan (opsional) untuk memberikan konteks tambahan
7. Sistem memvalidasi detail laporan (jika diisi)
8. Pengguna menekan tombol "Kirim Laporan"
9. Sistem memanggil `submitReport(contentType, contentId, reason, description)` untuk menyimpan laporan
10. Sistem memeriksa apakah pengguna sudah pernah melaporkan artikel yang sama:
    - Query ke tabel `content_reports` dengan kondisi `reporter_id=? AND content_type=? AND content_id=?`
    - Jika sudah ada, sistem menampilkan pesan "Anda sudah melaporkan artikel ini"
11. Jika laporan baru, sistem memverifikasi user profile:
    - Query ke tabel `profiles` untuk memastikan user profile valid
12. Setelah verifikasi berhasil, sistem menyimpan laporan ke database:
    - INSERT ke tabel `content_reports` dengan `reporter_id`, `content_type`, `content_id`, `reason`, `description`, dan `status='pending'`
13. Sistem menampilkan notifikasi sukses "Laporan berhasil dikirim! Tim moderasi akan meninjau dalam 24 jam"
14. Sistem menutup modal dan mereset form

**Alternative Flows:**
- Jika pengguna memilih "Hubungi Moderator", sistem menampilkan form tambahan untuk mengirim pesan langsung ke moderator. Laporan disimpan dengan flag `escalate=true` untuk prioritas lebih tinggi

**Exception Flows:**
- Jika pengguna sudah pernah melaporkan artikel yang sama (laporan duplikat), sistem menampilkan pesan "Anda sudah melaporkan konten ini sebelumnya" dan tidak melakukan penyimpanan
- Jika validasi gagal (alasan tidak dipilih), sistem menampilkan pesan "Silakan pilih alasan laporan" dan tidak melakukan penyimpanan
- Jika laporan gagal disimpan karena server error atau database error, sistem menampilkan pesan error "Gagal mengirim laporan. Silakan coba lagi" dan tidak menyimpan laporan

---

## 5.2.16 Sequence Diagram Tinjau Laporan Konten (Moderator)

Gambaran proses interaksi antar sistem saat moderator akan meninjau, menerima, atau menolak laporan konten dari pengguna dapat diamati pada Gambar 5.19. Sequence diagram ini menggambarkan alur tinjau laporan dengan filter, detail laporan, dan keputusan moderator.

**Gambar 5.19 Sequence Diagram Tinjau Laporan Konten (Moderator)**

### Alur Proses:

1. Moderator membuka halaman `/admin/reports`
2. AdminReportsPage component memanggil `getReports(filter)` untuk memuat daftar laporan:
   - Query ke tabel `content_reports` dengan filter status (All, Pending, Resolved, Rejected)
   - Sorting berdasarkan `created_at DESC` untuk menampilkan laporan terbaru
3. Sistem menampilkan daftar laporan dengan filter All, Pending, Resolved, dan Rejected
4. Moderator memilih salah satu laporan untuk ditinjau
5. Sistem memanggil `getReportDetails(reportId)` untuk memuat detail laporan lengkap:
   - Query ke tabel `content_reports` untuk mendapatkan detail laporan
   - Jika `content_type='article'`, query ke tabel `articles` untuk mendapatkan detail artikel yang dilaporkan
6. Sistem menampilkan detail laporan lengkap beserta tombol aksi "Terima" dan "Tolak"
7. Moderator meninjau artikel yang dilaporkan dengan melihat preview artikel
8. **Jika moderator menekan tombol "Terima Laporan":**
    - Sistem memanggil `resolveReport(reportId, adminId, 'resolved', notes)` untuk menyelesaikan laporan
    - UPDATE ke tabel `content_reports` dengan `status='resolved'`, `reviewed_by=adminId`, `reviewed_at=NOW()`, dan `admin_notes` (jika ada)
    - Sistem mencatat aktivitas ke `admin_activity_logs` dengan action `'resolve_report'`
    - Sistem mengirim notifikasi ke pelapor (jika diimplementasikan)
    - Sistem menampilkan notifikasi sukses "Laporan berhasil diselesaikan!"
9. **Jika moderator menekan tombol "Tolak Laporan":**
    - Sistem memanggil `resolveReport(reportId, adminId, 'dismissed', notes)` untuk menolak laporan
    - UPDATE ke tabel `content_reports` dengan `status='dismissed'`, `reviewed_by=adminId`, `reviewed_at=NOW()`, dan `admin_notes` (alasan penolakan)
    - Sistem mencatat aktivitas ke `admin_activity_logs` dengan action `'resolve_report'` dan status `'dismissed'`
    - Sistem mengirim notifikasi ke pelapor (jika diimplementasikan)
    - Sistem menampilkan notifikasi sukses "Laporan berhasil ditolak!"

**Alternative Flows:**
- Jika moderator ingin menambahkan catatan internal, sistem menampilkan form catatan admin. Setelah diisi dan disimpan, catatan disimpan di field `admin_notes` pada tabel `content_reports`
- Jika moderator ingin melihat artikel lengkap, sistem membuka artikel di tab baru dengan link `/article/[slug]` untuk memudahkan moderator meninjau konten yang dilaporkan

**Exception Flows:**
- Jika laporan sudah ditangani moderator lain (status != 'pending'), sistem menampilkan peringatan "Laporan sudah ditangani" dan tidak mengizinkan perubahan status
- Jika artikel sudah dihapus (tidak ditemukan di database), sistem menampilkan pesan "Artikel tidak ditemukan" atau "Konten tidak tersedia atau telah dihapus" pada preview
- Jika proses penyimpanan gagal karena server error atau database error, sistem menampilkan pesan error "Gagal menyelesaikan laporan" dan tidak melakukan update

---

## 5.2.17 Sequence Diagram Tambah Konten Featured (Moderator)

Gambaran proses interaksi antar sistem saat moderator akan menambahkan artikel ke dalam konten featured di halaman utama dapat diamati pada Gambar 5.20. Sequence diagram ini menggambarkan alur tambah konten featured dengan validasi kuota, priority, dan penyimpanan.

**Gambar 5.20 Sequence Diagram Tambah Konten Featured (Moderator)**

### Alur Proses:

1. Moderator membuka halaman `/admin/featured`
2. AdminFeaturedPage component memanggil `getArticlesForAdmin(published)` untuk memuat daftar artikel yang sudah dipublikasikan:
   - Query ke tabel `articles` dengan kondisi `published=true`
   - LEFT JOIN dengan tabel `featured_content` untuk menandai artikel yang sudah featured
3. Sistem menampilkan daftar konten featured saat ini dan form untuk menambah featured
4. Moderator memilih artikel dari daftar atau melalui pencarian
5. Sistem menampilkan daftar artikel yang dapat di-featured dengan badge "🌟 Pilihan" untuk artikel yang sudah featured
6. Moderator memilih artikel dan menekan tombol "Tambah ke Featured" atau "Jadikan Pilihan"
7. AdminFeaturedPage component memanggil `addFeatured(articleId, priority?)` untuk menambahkan featured
8. Sistem memvalidasi kuota slot featured maksimal 6 artikel:
   - Query COUNT ke tabel `featured_content` dengan kondisi `content_type='article' AND active=true`
   - Jika count >= 6, sistem menampilkan pesan "Kuota featured sudah penuh"
9. Jika kuota belum penuh, sistem memeriksa apakah artikel sudah di-featured:
   - Query ke tabel `featured_content` dengan kondisi `content_type='article' AND content_id=?`
   - Jika sudah featured, sistem menampilkan pesan "Artikel sudah di-featured"
10. Jika artikel belum featured dan kuota tersedia, sistem meminta pengaturan priority opsional (1-10)
11. Sistem menyimpan data ke `featured_content`:
    - INSERT ke tabel `featured_content` dengan `content_type='article'`, `content_id`, `featured_by=adminId`, `priority` (default 1 jika tidak diatur), dan `active=true`
12. Sistem mencatat aktivitas ke `admin_activity_logs` dengan action `'feature_content'`
13. Sistem menampilkan notifikasi sukses "Konten berhasil dijadikan pilihan!"
14. Sistem memperbarui daftar featured dengan refresh data
15. Artikel otomatis muncul di section "Konten Pilihan" pada homepage dengan urutan berdasarkan priority (semakin tinggi priority, semakin atas posisinya)

**Alternative Flows:**
- Jika kuota featured sudah penuh (>= 6 artikel), sistem menampilkan pesan "Kuota featured sudah penuh" dan menyediakan opsi untuk menghapus featured yang ada. Moderator dapat menghapus featured yang ada terlebih dahulu sebelum menambahkan featured baru
- Jika moderator mengatur priority (1-10), sistem menyimpan priority dan mengurutkan artikel berdasarkan priority DESC. Artikel dengan priority lebih tinggi akan muncul lebih dulu di homepage

**Exception Flows:**
- Jika artikel sudah di-featured (unique constraint violation), sistem menampilkan pesan "Artikel ini sudah di-featured" dan tidak melakukan penyimpanan
- Jika penyimpanan gagal karena server error atau database error, sistem menampilkan pesan error "Gagal mengubah status pilihan" dan tidak menambahkan artikel ke featured

---

## 5.2.18 Sequence Diagram Kelola Pengguna (Administrator)

Gambaran proses interaksi antar sistem saat administrator akan mengelola data pengguna, termasuk mengubah role, melakukan ban dan unban pengguna dapat diamati pada Gambar 5.21. Sequence diagram ini menggambarkan alur kelola pengguna dengan fitur filter, pencarian, dan manajemen role/status.

**Gambar 5.21 Sequence Diagram Kelola Pengguna (Administrator)**

### Alur Proses:

1. Administrator membuka halaman `/admin/users`
2. AdminUsersPage component memanggil `getUsers(page, limit, search, filter)` untuk memuat daftar pengguna:
   - Query ke tabel `profiles` dengan pagination
   - Filter berdasarkan role (all, admin, regular) jika dipilih
   - Search berdasarkan `full_name` atau `phone` menggunakan `ILIKE` jika keyword ada
3. Sistem memuat statistik pengguna dengan `getUserRoleCounts()`:
   - COUNT admin users (`is_admin=true`)
   - COUNT regular users (`is_admin=false`)
4. Sistem menampilkan tabel semua pengguna dengan fitur filter dan pencarian, beserta statistik total, active, banned, dan pending
5. Administrator mencari atau memfilter pengguna:
   - Jika administrator memasukkan keyword, sistem melakukan pencarian di `full_name` dan `phone` menggunakan `ILIKE`
   - Jika administrator memilih filter (All, Admin, Regular), sistem memfilter tabel berdasarkan `is_admin`
6. Sistem memfilter tabel secara real-time dengan debounce 500ms
7. Administrator memilih salah satu pengguna untuk dikelola
8. Sistem menampilkan detail pengguna dan opsi aksi seperti Edit Role, Ban, Unban, dan Reset Password
9. Jika administrator mengubah role:
   - Sistem menampilkan modal konfirmasi dengan informasi role baru
   - Administrator mengonfirmasi perubahan
   - Sistem memanggil `updateUserRole(userId, newRole)` untuk memperbarui role di database:
     - UPDATE tabel `profiles` dengan `is_admin` dan `admin_role` sesuai role baru
   - Sistem mencatat aktivitas ke `admin_activity_logs` dengan action `'update_role'`
   - Sistem mengirim notifikasi ke pengguna jika role ditingkatkan (opsional)
   - Sistem menampilkan notifikasi sukses dan refresh daftar pengguna
10. Jika administrator melakukan ban atau unban:
    - Sistem memanggil `banUser(userId)` atau `unbanUser(userId)`
    - Sistem memperbarui status pengguna di tabel `profiles` dengan `suspended=true` (ban) atau `suspended=false` (unban)
    - Sistem mencatat aktivitas ke `admin_activity_logs` dengan action `'ban_user'` atau `'unban_user'`
    - Sistem mengirim notifikasi ke pengguna (opsional)
    - Sistem menampilkan notifikasi sukses dan refresh daftar pengguna

**Alternative Flows:**
- Jika administrator mencari dengan keyword, sistem melakukan pencarian di `full_name`, `phone`, dan `bio` menggunakan `ILIKE` dengan operator `OR`. Hasil pencarian ditampilkan secara real-time dengan debounce
- Jika administrator melihat detail pengguna, sistem menampilkan statistik pengguna seperti jumlah artikel, likes, dan komentar dengan query ke tabel terkait

**Exception Flows:**
- Jika pengguna tidak ditemukan (user ID tidak valid atau sudah dihapus), sistem menampilkan pesan "Pengguna tidak ditemukan" dan tidak melakukan perubahan apapun
- Jika perubahan role gagal karena server error atau database error (misalnya constraint violation, permission denied), sistem menampilkan pesan error spesifik dan tidak memperbarui role pengguna

---

## 5.2.19 Sequence Diagram Lihat Analytics (Administrator/Moderator)

Gambaran proses interaksi antar sistem saat administrator atau moderator akan melihat statistik dan tren aktivitas pada platform dapat diamati pada Gambar 5.22. Sequence diagram ini menggambarkan alur lihat analytics dengan fitur filter periode dan kategori.

**Gambar 5.22 Sequence Diagram Lihat Analytics (Administrator/Moderator)**

### Alur Proses:

1. Administrator atau Moderator membuka halaman `/admin/analytics`
2. AdminAnalyticsPage component memanggil `getAdminStats()` untuk memuat data statistik
3. AnalyticsService melakukan query aggregate ke berbagai tabel secara paralel menggunakan `Promise.allSettled`:
   - Query ke tabel `profiles` untuk total pengguna dan new users today (dengan filter `created_at >= today`)
   - Query ke tabel `articles` untuk total artikel, new articles today, published count, dan draft count
   - Query aggregate ke tabel `articles` untuk total views (SUM views) dan total likes (SUM likes_count)
   - Query ke tabel `comments` untuk total komentar
   - Query ke tabel `content_reports` untuk total laporan dan pending reports (dengan filter `status='pending'`)
   - Query ke tabel `featured_content` untuk jumlah konten featured (dengan filter `active=true`)
4. Setelah semua query selesai, AnalyticsService mengembalikan data statistik lengkap ke AdminAnalyticsPage
5. Sistem menampilkan dashboard analytics berisi:
   - Kartu statistik utama (KPI cards) dengan total pengguna, total artikel, total views, total likes, total komentar, total laporan, pending reports, dan featured content
   - Grafik pertumbuhan berupa progress bar untuk user growth rate, article growth rate, dan engagement rate
   - Platform health indicators untuk content moderation, user activity, dan content quality
   - Detailed statistics dengan breakdown per kategori (user metrics, article metrics, engagement metrics, moderation metrics)
6. Administrator atau Moderator dapat melihat tren dan statistik platform secara real-time

**Alternative Flows:**
- Jika administrator memilih filter periode (hari ini, minggu ini, bulan ini, tahun ini), sistem memanggil `getAdminStats(period)` dengan parameter periode. Query ke database akan difilter berdasarkan `created_at >= period_start` untuk setiap metrik. Dashboard akan diperbarui dengan data terfilter sesuai periode yang dipilih
- Jika administrator memilih filter periode custom, sistem menampilkan form input tanggal mulai dan tanggal akhir. Setelah administrator mengisi tanggal, sistem memanggil `getAdminStats(startDate, endDate)` dengan parameter custom. Query ke database akan difilter berdasarkan `created_at BETWEEN startDate AND endDate`. Dashboard akan diperbarui dengan data untuk periode custom
- Jika administrator memilih kategori tertentu, sistem memanggil `getAdminStats(category)` dengan parameter kategori. Query ke tabel `articles` akan difilter berdasarkan `category=?`. Dashboard akan menampilkan statistik khusus untuk kategori yang dipilih (misalnya jumlah artikel per kategori, views per kategori, likes per kategori)

**Exception Flows:**
- Jika data tidak tersedia (semua query mengembalikan count = 0 atau null), sistem menampilkan pesan "Data tidak tersedia" dan dashboard menampilkan nilai 0 untuk semua metrik
- Jika gagal memuat data karena server error atau database error (misalnya koneksi database terputus, query timeout), sistem menampilkan pesan error dan dashboard menampilkan state error dengan opsi untuk retry

---

## 5.2.20 Sequence Diagram Lihat Activity Logs (Administrator)

Gambaran proses interaksi antar sistem saat administrator akan memantau seluruh aktivitas yang terjadi di dalam sistem dapat diamati pada Gambar 5.23. Sequence diagram ini menggambarkan alur lihat activity logs dengan fitur pagination, filter, dan pencarian.

**Gambar 5.23 Sequence Diagram Lihat Activity Logs (Administrator)**

### Alur Proses:

1. Administrator membuka halaman `/admin/logs`
2. AdminLogsPage component memanggil `getAdminActivityLogs(page, limit)` untuk memuat data activity logs dengan pagination (default 25 items per page)
3. LogsService melakukan query ke tabel `admin_activity_logs`:
   - Query COUNT untuk mendapatkan total count
   - Query SELECT dengan ORDER BY `created_at DESC`, LIMIT, dan OFFSET untuk pagination
4. LogsService melakukan JOIN dengan tabel `profiles` untuk mendapatkan informasi admin (full_name, avatar_url) berdasarkan `admin_id`
5. LogsService mengembalikan logs dengan pagination info (totalCount, totalPages) ke AdminLogsPage
6. Sistem menampilkan tabel logs dengan kolom:
   - Timestamp (created_at dengan format relatif atau lengkap)
   - Actor (admin profile dengan nama dan avatar)
   - Action (tipe aksi dengan icon dan label, misalnya "Menghapus Konten", "Promosi ke Admin")
   - Target (target_type dan target_id)
   - Payload (details dalam format JSON)
7. Administrator melakukan filter atau pencarian log:
   - Filter berdasarkan kategori: All, User Management, Content Management, Settings, Reports
   - Filter berdasarkan actor (admin tertentu)
   - Pencarian dengan keyword (mencari di action, target_type, atau details)
8. Sistem memfilter tabel secara real-time dengan memanggil `getAdminActivityLogs(page, filter, search)` dengan parameter filter dan search
9. Query ke database akan difilter berdasarkan kondisi yang dipilih (WHERE action=?, WHERE admin_id=?, atau WHERE action/target_type/details ILIKE ?)
10. Sistem memperbarui tabel dengan hasil filter
11. Administrator memilih salah satu log untuk melihat detail
12. Sistem menampilkan modal detail lengkap log termasuk:
    - Timestamp lengkap (tanggal dan jam)
    - Actor lengkap (admin profile dengan nama dan avatar)
    - Action dan label lengkap
    - Target type dan target ID
    - Details (payload dalam format JSON viewer)
    - Nilai sebelum dan sesudah perubahan (jika tersedia di details)

**Alternative Flows:**
- Jika administrator memfilter berdasarkan action (User Management, Content Management, Settings, Reports), sistem memanggil `getAdminActivityLogs(..., action=?)` dengan parameter action. Query ke database akan difilter berdasarkan `action=?`. Tabel akan menampilkan hanya logs dengan action tertentu
- Jika administrator memfilter berdasarkan actor (admin tertentu), sistem memanggil `getAdminActivityLogs(..., admin_id=?)` dengan parameter admin_id. Query ke database akan difilter berdasarkan `admin_id=?`. Tabel akan menampilkan hanya logs dari actor tertentu

**Exception Flows:**
- Jika tidak terdapat activity logs (total count = 0), sistem menampilkan pesan "Tidak ada activity logs" dan tabel menampilkan state empty dengan pesan informatif
- Jika gagal memuat logs karena server error atau database error (misalnya koneksi database terputus, query timeout, atau tabel tidak ada), sistem menampilkan pesan error dan tabel menampilkan state error dengan opsi untuk retry

---

## 5.2.21 Sequence Diagram Tambah Portofolio

Gambaran proses interaksi antar sistem saat penulis akan menambahkan portofolio baru ke dalam sistem dapat diamati pada Gambar 5.24. Sequence diagram ini menggambarkan alur tambah portofolio dengan validasi form, upload cover image, dan penyimpanan data.

**Gambar 5.24 Sequence Diagram Tambah Portofolio**

### Alur Proses:

1. Penulis membuka halaman profil sendiri dan menekan tombol "Tambah Portofolio" atau membuka halaman `/portfolio/add`
2. AddPortfolioWorkPage component memverifikasi penulis sudah login
3. Sistem menampilkan form tambah portofolio dengan field:
   - Judul Karya (required)
   - Kategori (required): cerpen, puisi, artikel, cerita-rakyat, novel-berseri, lainnya
   - Deskripsi (optional)
   - Genre (optional)
   - Tahun Dibuat (optional)
   - Status (optional): published, unpublished, in_progress, completed
   - Publisher (optional)
   - ISBN (optional)
   - Cover Image (optional, file upload)
   - Link Eksternal (optional)
   - Awards (optional, array)
   - Tags (optional, array)
4. Penulis mengisi form portofolio dengan judul, kategori, dan deskripsi
5. Sistem memvalidasi input secara real-time:
   - Judul tidak kosong
   - Kategori harus valid (dalam daftar kategori yang diizinkan)
   - Deskripsi (jika diisi) tidak terlalu panjang
6. Jika penulis mengunggah cover image (opsional):
   - Sistem memvalidasi file cover image (format: JPG, PNG, GIF, WebP; size maksimal: 5MB)
   - Sistem memanggil `uploadImageToStorage(file, "portfolio-covers")` untuk mengunggah gambar ke Supabase Storage bucket `images/portfolio-covers`
   - Sistem menghasilkan nama file unik dengan format `timestamp-random.ext`
   - Sistem mengunggah file ke storage dan mendapatkan file path
   - Sistem menampilkan preview cover image di form
7. Jika penulis mengisi link eksternal (opsional):
   - Sistem memvalidasi format URL menggunakan regex atau URL constructor
   - Jika URL tidak valid, sistem menampilkan pesan error
8. Penulis menekan tombol "Simpan Portofolio"
9. Sistem memvalidasi seluruh form:
   - Judul tidak kosong
   - Kategori valid
   - Cover image (jika ada) sudah terupload
   - Link eksternal (jika ada) format valid
10. Setelah validasi berhasil, sistem memanggil `createPortfolioWork(authorId, workData)` untuk menyimpan portofolio:
    - INSERT ke tabel `portfolio_works` dengan data: `author_id`, `title`, `category`, `description`, `genre`, `year_created`, `status`, `publisher`, `isbn`, `cover_image`, `external_link`, `awards` (array), `tags` (array), `created_at`, `updated_at`
11. Sistem mencatat aktivitas di activity logs (opsional, jika ada sistem logging)
12. Sistem menampilkan notifikasi sukses "🎉 Karya berhasil ditambahkan ke portofolio!"
13. Sistem mengarahkan penulis ke halaman detail portofolio (`/member/[slug]/portfolio`) dengan menggunakan slug dari nama penulis

**Alternative Flows:**
- Jika penulis memilih kategori "Award" atau kategori tertentu yang memerlukan informasi tambahan, sistem menampilkan field tambahan untuk informasi award. Penulis dapat menambahkan multiple awards dengan tombol "Tambah Award". Awards disimpan sebagai array di database
- Jika penulis tidak mengunggah cover image, sistem menggunakan placeholder image default atau mengeset `cover_image = null`. Placeholder image akan ditampilkan saat portofolio ditampilkan di halaman profil

**Exception Flows:**
- Jika validasi gagal (judul kosong, kategori tidak valid, atau field required lainnya tidak diisi), sistem menampilkan pesan error spesifik untuk setiap field yang tidak valid dan tidak melakukan penyimpanan
- Jika unggah gambar gagal karena format tidak valid, size terlalu besar, atau error dari storage (misalnya bucket tidak ada, permission denied), sistem menampilkan pesan error "Gagal upload cover image" dan tidak menyimpan cover image. Penulis dapat mencoba upload ulang atau melanjutkan tanpa cover image
- Jika penyimpanan data gagal karena server error atau database error (misalnya constraint violation, koneksi database terputus), sistem menampilkan pesan error "Gagal menyimpan portofolio" dan tidak menyimpan data. Form tetap terbuka dengan data yang sudah diisi agar penulis dapat mencoba menyimpan ulang

---

## 5.2.22 Sequence Diagram Lihat Profil Member

Gambaran proses interaksi antar sistem saat pengguna akan melihat profil lengkap member di platform dapat diamati pada Gambar 5.25. Sequence diagram ini menggambarkan alur lihat profil member dengan data profil, artikel, portofolio, dan statistik.

**Gambar 5.25 Sequence Diagram Lihat Profil Member**

### Alur Proses:

1. Pengguna membuka profil member dari beranda, artikel, atau direktori member dengan mengklik link ke `/member/[slug]` atau `/profile/[id]`
2. AuthorProfilePage component memanggil `getAuthorProfile(slug)` untuk memuat data profil member:
   - Mengkonversi slug ke user ID menggunakan `getUserIdBySlug(slug)` jika menggunakan slug
   - Query ke tabel `profiles` dengan kondisi `id=?` untuk mendapatkan data profil (full_name, bio, avatar_url, role, created_at, dll)
3. Sistem mengambil data artikel yang diterbitkan:
   - Query ke tabel `articles` dengan kondisi `author_id=? AND published=true`
   - ORDER BY `created_at DESC` untuk menampilkan artikel terbaru terlebih dahulu
   - SELECT field: id, title, excerpt, cover_image, category, slug, views, likes_count, comments_count, created_at
4. Sistem mengambil data portofolio:
   - Query ke tabel `portfolio_works` dengan kondisi `author_id=?`
   - ORDER BY `created_at DESC` untuk menampilkan portofolio terbaru terlebih dahulu
5. Sistem menghitung statistik profil:
   - Total articles: COUNT artikel yang published
   - Total views: SUM views dari semua artikel
   - Total likes: SUM likes_count dari semua artikel
   - Total comments: SUM comments_count dari semua artikel
6. Setelah data dimuat, sistem menampilkan:
   - Header profil dengan avatar (menggunakan `getAvatarUrl()`), nama lengkap, bio, dan role badge
   - Statistik profil dalam bentuk cards: jumlah artikel, total views, total likes, total comments
   - Daftar artikel dengan pagination (default 4-6 artikel per halaman) dengan cover image, judul, excerpt, kategori, views, likes, comments, dan tanggal
   - Daftar portofolio (jika ada) dengan preview cover image, judul, kategori, dan link ke detail portofolio
   - Link ke portofolio lengkap (`/member/[slug]/portfolio`)

**Alternative Flows:**
- Jika pengguna membuka profil sendiri (user.id === profileId), sistem menampilkan tombol "Edit Profil" dan "Kelola Artikel". Sistem juga menampilkan opsi tambahan seperti "Artikel Saya", "Portofolio Saya", dan "Pengaturan"
- Jika member tidak memiliki artikel (articles array kosong), sistem hanya menampilkan profil dan portofolio. Sistem menampilkan pesan informatif "Belum ada artikel" di section artikel dan tetap menampilkan statistik profil (dengan nilai 0 untuk artikel-related stats)

**Exception Flows:**
- Jika member tidak ditemukan (profile query mengembalikan null atau error), sistem menampilkan halaman 404 dengan pesan "Member tidak ditemukan" dan mengarahkan pengguna kembali ke halaman direktori member (`/member`)
- Jika gagal memuat data karena server error atau database error (misalnya koneksi database terputus, query timeout), sistem menampilkan pesan error "Gagal memuat profil" dan menampilkan state error dengan opsi untuk retry atau kembali ke halaman sebelumnya

---

## 5.2.23 Sequence Diagram Edit Profil

Gambaran proses interaksi antar sistem saat penulis akan mengubah dan memperbarui data profil pribadi dapat diamati pada Gambar 5.26. Sequence diagram ini menggambarkan alur edit profil dengan validasi form, upload avatar, dan update database.

**Gambar 5.26 Sequence Diagram Edit Profil**

### Alur Proses:

1. Penulis membuka profil sendiri dan klik tombol "Edit Profil" atau membuka halaman `/profile/edit`
2. EditProfilePage component memverifikasi penulis sudah login
3. Sistem memanggil `getCurrentProfile(userId)` untuk memuat data profil saat ini:
   - Query ke tabel `profiles` dengan kondisi `id=?` (user.id)
   - SELECT semua field profil: full_name, bio, phone, avatar_url, role, member_id, prestasi, alamat
4. Sistem menampilkan form edit profil dengan data saat ini yang sudah terisi di setiap field
5. Penulis mengubah data profil:
   - Mengubah nama lengkap (full_name)
   - Mengubah bio
   - Mengubah nomor telepon (phone)
   - Mengubah role (jika diizinkan)
   - Mengubah informasi tambahan (member_id, prestasi, alamat)
6. Sistem memvalidasi perubahan secara real-time:
   - Nama lengkap: tidak kosong, minimal 2 karakter, maksimal 100 karakter
   - Bio: maksimal 500 karakter (jika diisi)
   - Nomor telepon: format valid (regex: `^[\d\-\+\(\)\s]+$`) jika diisi
   - Link sosial media (jika ada): format URL valid
7. Jika penulis mengunggah avatar baru (opsional):
   - Sistem memvalidasi file avatar (format: image/*, size maksimal: 5MB)
   - Sistem memanggil `uploadImageToStorage(file, "avatars")` untuk mengunggah gambar ke Supabase Storage bucket `images/avatars`
   - Sistem menghasilkan nama file unik dengan format `timestamp-random.ext`
   - Sistem mengunggah file ke storage dan mendapatkan file path
   - Sistem menampilkan preview avatar baru di form
8. Penulis klik "Simpan Perubahan"
9. Sistem memvalidasi form lengkap dengan memanggil `validateProfileForm()`:
   - Memeriksa semua field required
   - Memeriksa format dan panjang setiap field
10. Setelah validasi berhasil, sistem memanggil `updateProfile(userId, profileData)` untuk memperbarui profil:
    - UPDATE ke tabel `profiles` dengan data: `full_name`, `bio`, `phone`, `avatar_url`, `role`, `member_id`, `prestasi`, `alamat`, `updated_at=NOW()` dengan kondisi `id=?`
    - UPDATE auth metadata di Supabase Auth dengan `updateUser({data: {full_name, role}})` untuk sinkronisasi data
11. Sistem memperbarui avatar di storage (jika avatar baru diupload, avatar lama tetap tersimpan di storage untuk referensi)
12. Sistem mencatat aktivitas di activity logs (opsional, jika ada sistem logging)
13. Sistem memanggil `refreshUser()` untuk memperbarui user context di aplikasi
14. Sistem menampilkan notifikasi sukses "✅ Profil berhasil diperbarui!"
15. Sistem memperbarui UI profil dengan data terbaru dan mengarahkan ke halaman profil publik (`/profile/[id]`) setelah 1.5 detik

**Alternative Flows:**
- Jika penulis tidak mengubah avatar (tidak upload file baru), sistem mempertahankan avatar lama dengan tidak mengubah field `avatar_url` di database. Avatar lama tetap tersimpan di storage
- Jika penulis mengubah username/slug (melalui perubahan full_name), sistem memvalidasi keunikan dengan memeriksa apakah ada user lain dengan nama yang sama. Jika unik, sistem memperbarui URL profil dengan slug baru yang dihasilkan dari nama baru. Jika tidak unik, sistem menambahkan angka di akhir slug (misalnya: `nama-baru-2`)

**Exception Flows:**
- Jika validasi gagal (nama kosong, bio terlalu panjang, format nomor telepon tidak valid), sistem menampilkan pesan error spesifik untuk setiap field yang tidak valid dan tidak melakukan update. Form tetap terbuka dengan data yang sudah diisi
- Jika upload avatar gagal karena format tidak valid (bukan image), size terlalu besar (>5MB), atau error dari storage (misalnya bucket tidak ada, permission denied), sistem menampilkan pesan error "Gagal upload foto profil" dan tidak menyimpan avatar baru. Penulis dapat mencoba upload ulang atau melanjutkan tanpa mengubah avatar
- Jika username sudah digunakan (untuk validasi keunikan slug), sistem menampilkan pesan error "Username sudah digunakan" dan tidak memperbarui profil. Penulis harus memilih nama lain atau sistem akan otomatis menambahkan angka di akhir slug

---

## 5.2.24 Sequence Diagram Lihat Direktori Member

Gambaran proses interaksi antar sistem saat pengguna akan melihat daftar seluruh member yang terdaftar di platform dapat diamati pada Gambar 5.27. Sequence diagram ini menggambarkan alur lihat direktori member dengan pagination, filter, dan pencarian.

**Gambar 5.27 Sequence Diagram Lihat Direktori Member**

### Alur Proses:

1. Pengguna membuka halaman `/member` atau klik menu "Member" di navigasi
2. AuthorsPage component memuat halaman direktori member
3. Sistem memanggil `getMembers(page, filter, search)` untuk memuat data member dengan pagination (default 6 member per halaman)
4. MemberService melakukan query ke tabel `profiles`:
   - SELECT field: id, full_name, avatar_url, role, created_at, bio
   - Apply pagination dengan LIMIT dan OFFSET
   - Apply sorting berdasarkan pilihan (newest, oldest, most_articles, most_popular, alphabetical)
5. Sistem mengambil statistik artikel untuk setiap member:
   - Query ke tabel `articles` dengan kondisi `published=true`
   - GROUP BY `author_id` untuk menghitung jumlah artikel per author
   - Calculate stats: article_count, total_views, total_likes, total_comments
6. Sistem menggabungkan data profil dengan statistik artikel untuk setiap member
7. Setelah data dimuat, sistem menampilkan:
   - Grid member dengan card untuk setiap member yang berisi:
     - Avatar (menggunakan `getAvatarUrl()`)
     - Nama lengkap
     - Bio singkat (truncated jika terlalu panjang)
     - Badge role (Penulis, Ilustrator, dll)
     - Statistik: jumlah artikel published
     - Tombol "Lihat Profil" yang mengarah ke `/member/[slug]`
   - Filter options: All, Active Writers, New Members
   - Search bar untuk pencarian member
   - Pagination controls (Previous, Next, page numbers)
8. Pengguna memfilter atau mencari member:
   - Jika pengguna memilih filter, sistem memanggil `getMembers(..., filter)` dengan parameter filter
   - Jika pengguna memasukkan keyword di search bar, sistem memanggil `getMembers(..., search)` dengan parameter search
9. Sistem memfilter grid secara real-time dengan debounce (500ms) untuk search:
   - Query ke database akan difilter berdasarkan kondisi yang dipilih
   - Untuk search: WHERE `full_name ILIKE ? OR bio ILIKE ?`
   - Untuk filter Active Writers: WHERE id IN (SELECT DISTINCT author_id FROM articles WHERE published=true)
10. Sistem memperbarui grid dengan hasil filter atau pencarian

**Alternative Flows:**
- Jika pengguna memfilter "Active Writers", sistem hanya menampilkan member dengan minimal 1 artikel published. Query ke database akan menggunakan subquery untuk mendapatkan author_id yang memiliki artikel published, kemudian filter profiles berdasarkan author_id tersebut
- Jika pengguna mencari dengan keyword, sistem melakukan pencarian berdasarkan nama (`full_name`) dan bio menggunakan `ILIKE` dengan operator `OR`. Hasil pencarian ditampilkan secara real-time dengan debounce untuk mengurangi jumlah query ke database

**Exception Flows:**
- Jika tidak ada member (profiles query mengembalikan empty array atau count = 0), sistem menampilkan pesan "Belum ada member" dan grid menampilkan state empty dengan pesan informatif dan ilustrasi
- Jika gagal memuat data karena server error atau database error (misalnya koneksi database terputus, query timeout), sistem menampilkan pesan error "Gagal memuat data member" dan grid menampilkan state error dengan opsi untuk retry

---

## 5.2.25 Sequence Diagram Lihat Halaman Tentang

Gambaran proses interaksi antar sistem saat pengguna akan melihat informasi tentang komunitas secara lengkap dapat diamati pada Gambar 5.28. Sequence diagram ini menggambarkan alur lihat halaman tentang dengan konten statis atau dinamis dari database/CMS.

**Gambar 5.28 Sequence Diagram Lihat Halaman Tentang**

### Alur Proses:

1. Pengguna membuka halaman `/tentang` atau klik menu "Tentang" di navigasi
2. TentangPage component memuat halaman tentang
3. Sistem memanggil `getAboutPageContent()` untuk memuat konten halaman:
   - Jika menggunakan CMS atau database: Query ke tabel `about_page_content` atau `cms_pages` dengan kondisi `active=true` atau `page_type='about'`
   - Jika menggunakan konten statis: Load konten yang sudah di-hardcode di komponen (seperti di `src/app/tentang/page.tsx`)
4. Sistem mengambil informasi tentang komunitas:
   - Sejarah komunitas (berdiri sejak 2 Mei 2010, deskripsi komunitas)
   - Visi dan Misi (visi: terciptanya bacaan yang sehat, kreatif, dan sesuai dengan anak-anak Indonesia; misi: menciptakan SDM di bidang tulis-menulis, menjalin kerjasama, melindungi dan memberdayakan member)
   - Tujuan komunitas
   - Cara bergabung (informasi cara menjadi member)
   - Kontak resmi (email, alamat, nomor telepon jika ada)
   - Link ke media sosial komunitas (Facebook, WhatsApp, Telegram, Instagram dengan jumlah member per platform)
   - Prestasi & pencapaian (JakBook Award 2012, Fasilitasi Kemendikbudristek 2023, dll)
   - Tim pengurus (daftar pengurus dengan nama, foto, dan role)
5. Setelah data dimuat, sistem menampilkan halaman tentang dengan section:
   - Hero section dengan judul "Tentang PaberLand" dan tagline
   - Section Prestasi & Pencapaian dengan cards achievement
   - Section Profil Singkat dengan Visi, Misi, Budaya, dan Layanan
   - Section Tim Pengurus dengan grid foto dan nama pengurus
   - Section Statistik Komunitas dengan jumlah member per platform (Facebook, WhatsApp, Telegram, Instagram) dan total komunitas
   - Section Cara Bergabung (jika ada)
   - Section Kontak Resmi dengan informasi kontak dan link media sosial

**Alternative Flows:**
- Jika halaman tentang menggunakan CMS (Content Management System), sistem mengambil konten langsung dari database dengan query ke tabel `cms_pages` atau `about_page_content`. Konten dapat diupdate oleh admin tanpa perlu deploy ulang aplikasi. Sistem menampilkan konten dinamis yang dapat berubah sesuai update dari admin

**Exception Flows:**
- Jika gagal memuat konten dari database (misalnya tabel tidak ada, query error, atau koneksi database terputus), sistem melakukan fallback ke konten statis default yang sudah di-hardcode di komponen. Sistem menampilkan halaman dengan konten default dan menampilkan pesan warning (jika diperlukan) bahwa konten mungkin tidak terbaru. Halaman tetap dapat diakses dengan konten statis

---

## 5.2.26 Sequence Diagram Logout

Gambaran proses interaksi antar sistem saat pengguna akan keluar dari sistem dengan aman dapat diamati pada Gambar 5.29. Sequence diagram ini menggambarkan alur logout dengan penghapusan session, token autentikasi, dan pembersihan data pengguna.

**Gambar 5.29 Sequence Diagram Logout**

### Alur Proses:

1. Pengguna klik tombol "Logout" di menu profil atau navigasi (di Header component)
2. Header component memanggil `handleLogout()` yang akan memanggil `signOut()` dari AuthContext
3. Jika sistem menggunakan konfirmasi logout (opsional), sistem menampilkan modal konfirmasi dengan pesan "Apakah Anda yakin ingin logout?" dan tombol "Ya" dan "Batal"
4. Pengguna mengonfirmasi logout (jika ada konfirmasi) atau logout langsung dilakukan
5. AuthContext memanggil `supabase.auth.signOut()` untuk menghapus session:
   - Supabase Auth menghapus session dari server
   - Supabase Auth menghapus token autentikasi (access token dan refresh token) dari cookies
   - Supabase Auth mengembalikan event `SIGNED_OUT` ke AuthContext
6. AuthContext membersihkan data pengguna dari client:
   - Memanggil `setUser(null)` untuk menghapus user state dari context
   - Membersihkan data pengguna dari localStorage/sessionStorage (jika ada data yang disimpan)
7. AuthContext memanggil `router.push("/")` untuk mengarahkan pengguna ke halaman beranda
8. AuthContext memanggil `router.refresh()` untuk refresh server components dan memastikan semua data terbaru
9. Header component menampilkan notifikasi sukses "Logout berhasil!" menggunakan toast notification
10. Sistem mengarahkan pengguna ke halaman beranda (`/`) dan pengguna tidak lagi terautentikasi

**Alternative Flows:**
- Jika sistem tidak menggunakan konfirmasi logout, logout langsung dilakukan setelah pengguna klik tombol "Logout". Sistem langsung memanggil `signOut()` tanpa menampilkan modal konfirmasi

**Exception Flows:**
- Jika logout gagal karena server error atau network error (misalnya koneksi terputus, Supabase Auth service tidak tersedia), sistem menampilkan pesan error "Gagal logout" dan pengguna tetap dalam state terautentikasi. Pengguna dapat mencoba logout ulang atau refresh halaman

---

## Catatan

- Semua sequence diagram menggunakan format PlantUML
- Method/fungsi yang digunakan sesuai dengan implementasi di codebase
- Diagram dibuat ringkas namun tetap mencakup semua alur penting
- Alternative flows dan exception flows dijelaskan secara detail dalam alur proses

