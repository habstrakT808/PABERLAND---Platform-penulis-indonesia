# Physical Database Design (PDD) - PaberLand Platform

## 5.3.1 Tabel profiles

Tabel `profiles` menyimpan data profil semua pengguna platform. Tabel ini memiliki relasi dengan tabel `auth.users` dari Supabase Auth, di mana kolom `id` merupakan foreign key ke `auth.users.id`.

**Tabel 5.1 Tabel profiles Physical Database Design**

| No | Nama Kolom | Tipe Data | Constraint | Keterangan |
|----|------------|-----------|------------|------------|
| 1 | id | UUID | PRIMARY KEY, FOREIGN KEY ke auth.users.id, NOT NULL | Identifier unik pengguna |
| 2 | full_name | TEXT | NOT NULL | Nama lengkap pengguna |
| 3 | phone | TEXT | NULL | Nomor telepon (opsional) |
| 4 | bio | TEXT | NULL | Biografi pengguna |
| 5 | avatar_url | TEXT | NULL | URL gambar avatar di Supabase Storage |
| 6 | role | TEXT | DEFAULT 'Penulis', CHECK (role IN ('Penulis', 'Ilustrator', 'Kreator Buku', 'Pekerja Buku')) | Peran pengguna dalam komunitas |
| 7 | is_admin | BOOLEAN | DEFAULT false | Flag administrator |
| 8 | admin_role | TEXT | NULL, CHECK (admin_role IN ('super_admin', 'moderator')) | Peran admin khusus |
| 9 | admin_since | TIMESTAMP WITH TIME ZONE | NULL | Tanggal pengangkatan sebagai admin |
| 10 | last_admin_activity | TIMESTAMP WITH TIME ZONE | NULL | Timestamp aktivitas admin terakhir |
| 11 | created_at | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT NOW() | Timestamp pembuatan profil |
| 12 | updated_at | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT NOW() | Timestamp pembaruan terakhir |

Tabel `profiles` menggunakan PRIMARY KEY pada kolom `id` sebagai identifier unik, dengan index tambahan pada kolom `role` untuk mempercepat filter berdasarkan peran pengguna dan index pada `is_admin` untuk optimasi query admin. Sistem juga menggunakan trigger database yang secara otomatis memperbarui kolom `updated_at` setiap kali data profil diubah, memastikan timestamp selalu akurat tanpa perlu update manual.

---

## 5.3.2 Tabel articles

Tabel `articles` menyimpan semua konten artikel yang dibuat oleh penulis.

**Tabel 5.2 Tabel articles Physical Database Design**

| No | Nama Kolom | Tipe Data | Constraint | Keterangan |
|----|------------|-----------|------------|------------|
| 1 | id | UUID | PRIMARY KEY, DEFAULT gen_random_uuid(), NOT NULL | Identifier unik artikel |
| 2 | title | TEXT | NOT NULL | Judul artikel |
| 3 | content | TEXT | NOT NULL | Konten artikel dalam format HTML dari TinyMCE editor |
| 4 | excerpt | TEXT | NULL | Ringkasan artikel |
| 5 | cover_image | TEXT | NULL | URL gambar cover |
| 6 | category | TEXT | NOT NULL, CHECK (category IN ('cerpen', 'puisi', 'artikel', 'cerita-rakyat', 'novel-berseri', 'lainnya', 'info-berita', 'cermin', 'resensi-buku', 'dongeng', 'cerbung')) | Kategori artikel |
| 7 | author_id | UUID | FOREIGN KEY ke profiles.id, NOT NULL, ON DELETE CASCADE | Penulis artikel |
| 8 | published | BOOLEAN | DEFAULT false | Status publikasi |
| 9 | scheduled_at | TIMESTAMP WITH TIME ZONE | NULL | Jadwal publikasi otomatis |
| 10 | views | INTEGER | DEFAULT 0 | Jumlah views (denormalisasi) |
| 11 | likes_count | INTEGER | DEFAULT 0 | Jumlah like (denormalisasi) |
| 12 | comments_count | INTEGER | DEFAULT 0 | Jumlah komentar (denormalisasi) |
| 13 | slug | TEXT | UNIQUE, NOT NULL | URL-friendly identifier untuk SEO |
| 14 | created_at | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT NOW() | Timestamp pembuatan |
| 15 | updated_at | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT NOW() | Timestamp pembaruan |

Tabel `articles` dilengkapi dengan PRIMARY KEY pada `id`, UNIQUE INDEX pada `slug` untuk memastikan URL artikel unik, serta index pada `author_id`, `category`, dan `published` untuk mempercepat query artikel per penulis, filter kategori, dan filter artikel yang dipublikasikan. Index pada `created_at DESC` digunakan untuk sorting artikel terbaru. Sistem menggunakan trigger untuk auto-update `updated_at` saat artikel diubah, serta trigger yang secara otomatis memperbarui `likes_count` dan `comments_count` di tabel articles setiap kali ada perubahan pada tabel `article_likes` atau `comments`, memastikan data denormalisasi selalu sinkron.

---

## 5.3.3 Tabel comments

Tabel `comments` menyimpan komentar berulir pada artikel.

**Tabel 5.3 Tabel comments Physical Database Design**

| No | Nama Kolom | Tipe Data | Constraint | Keterangan |
|----|------------|-----------|------------|------------|
| 1 | id | UUID | PRIMARY KEY, DEFAULT gen_random_uuid(), NOT NULL | Identifier unik komentar |
| 2 | article_id | UUID | FOREIGN KEY ke articles.id, NOT NULL, ON DELETE CASCADE | Artikel yang dikomentari |
| 3 | author_id | UUID | FOREIGN KEY ke profiles.id, NOT NULL, ON DELETE CASCADE | Penulis komentar |
| 4 | content | TEXT | NOT NULL | Isi komentar |
| 5 | parent_id | UUID | FOREIGN KEY ke comments.id, NULL, ON DELETE CASCADE | Komentar induk untuk threading |
| 6 | created_at | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT NOW() | Timestamp pembuatan |
| 7 | updated_at | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT NOW() | Timestamp pembaruan |

Tabel `comments` menggunakan PRIMARY KEY pada `id` dan index pada `article_id`, `author_id`, serta `parent_id` untuk mempercepat query komentar per artikel, per penulis, dan untuk struktur komentar berulir (threaded comments). Sistem menggunakan trigger untuk auto-update `updated_at` saat komentar diubah, serta trigger yang secara otomatis memperbarui `comments_count` di tabel articles setiap kali ada komentar baru atau dihapus, menjaga konsistensi data denormalisasi.

---

## 5.3.4 Tabel article_likes

Tabel `article_likes` merupakan junction table untuk relasi many-to-many antara articles dan profiles.

**Tabel 5.4 Tabel article_likes Physical Database Design**

| No | Nama Kolom | Tipe Data | Constraint | Keterangan |
|----|------------|-----------|------------|------------|
| 1 | id | UUID | PRIMARY KEY, DEFAULT gen_random_uuid(), NOT NULL | Identifier unik like |
| 2 | article_id | UUID | FOREIGN KEY ke articles.id, NOT NULL, ON DELETE CASCADE | Artikel yang dilike |
| 3 | user_id | UUID | FOREIGN KEY ke profiles.id, NOT NULL, ON DELETE CASCADE | Pengguna yang memberikan like |
| 4 | created_at | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT NOW() | Timestamp pemberian like |

Tabel `article_likes` menggunakan PRIMARY KEY pada `id` dan UNIQUE INDEX pada kombinasi `(article_id, user_id)` untuk mencegah seorang pengguna memberikan like ganda pada artikel yang sama. Index pada `article_id` dan `user_id` mempercepat query untuk melihat daftar like per artikel dan daftar artikel yang dilike oleh pengguna tertentu. Sistem menggunakan trigger yang secara otomatis memperbarui `likes_count` di tabel articles setiap kali ada like baru atau dihapus, memastikan counter selalu akurat.

---

## 5.3.5 Tabel portfolio_works

Tabel `portfolio_works` menyimpan karya portofolio penulis.

**Tabel 5.5 Tabel portfolio_works Physical Database Design**

| No | Nama Kolom | Tipe Data | Constraint | Keterangan |
|----|------------|-----------|------------|------------|
| 1 | id | UUID | PRIMARY KEY, DEFAULT gen_random_uuid(), NOT NULL | Identifier unik karya |
| 2 | author_id | UUID | FOREIGN KEY ke profiles.id, NOT NULL, ON DELETE CASCADE | Pemilik karya |
| 3 | title | TEXT | NOT NULL | Judul karya |
| 4 | description | TEXT | NULL | Deskripsi lengkap karya |
| 5 | category | TEXT | NOT NULL, CHECK (category IN ('info/berita', 'cerpen', 'dongeng', 'cerita-rakyat', 'cermin (cerita mini)', 'puisi', 'cerbung', 'novel', 'serial', 'resensi buku', 'artikel', 'buku')) | Kategori karya |
| 6 | genre | TEXT | NULL | Genre karya |
| 7 | year_created | INTEGER | NULL | Tahun pembuatan |
| 8 | status | TEXT | DEFAULT 'unpublished', CHECK (status IN ('published', 'unpublished', 'in_progress', 'completed')) | Status karya |
| 9 | publisher | TEXT | NULL | Nama penerbit |
| 10 | isbn | TEXT | NULL | ISBN jika karya berupa buku |
| 11 | cover_image | TEXT | NULL | URL gambar cover |
| 12 | external_link | TEXT | NULL | Tautan eksternal karya |
| 13 | awards | TEXT[] | NULL | Array penghargaan |
| 14 | tags | TEXT[] | NULL | Array tag |
| 15 | created_at | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT NOW() | Timestamp pembuatan |
| 16 | updated_at | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT NOW() | Timestamp pembaruan |

Tabel `portfolio_works` menggunakan PRIMARY KEY pada `id` dan index pada `author_id`, `category`, `status`, serta `created_at DESC` untuk mempercepat query karya per penulis, filter berdasarkan kategori dan status, serta sorting karya terbaru. Sistem menggunakan trigger untuk auto-update `updated_at` setiap kali data portofolio diubah.

---

## 5.3.6 Tabel notifications

Tabel `notifications` menyimpan semua notifikasi sistem untuk pengguna.

**Tabel 5.6 Tabel notifications Physical Database Design**

| No | Nama Kolom | Tipe Data | Constraint | Keterangan |
|----|------------|-----------|------------|------------|
| 1 | id | UUID | PRIMARY KEY, DEFAULT gen_random_uuid(), NOT NULL | Identifier unik notifikasi |
| 2 | type | TEXT | NOT NULL, CHECK (type IN ('like', 'comment', 'mention')) | Tipe notifikasi |
| 3 | actor_id | UUID | FOREIGN KEY ke profiles.id, NOT NULL, ON DELETE CASCADE | Pengguna yang melakukan aksi |
| 4 | target_id | UUID | FOREIGN KEY ke profiles.id, NOT NULL, ON DELETE CASCADE | Pengguna yang menerima notifikasi |
| 5 | article_id | UUID | FOREIGN KEY ke articles.id, NULL, ON DELETE CASCADE | Artikel terkait |
| 6 | comment_id | UUID | FOREIGN KEY ke comments.id, NULL, ON DELETE CASCADE | Komentar terkait |
| 7 | read | BOOLEAN | DEFAULT false | Status notifikasi sudah dibaca |
| 8 | created_at | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT NOW() | Timestamp pembuatan |

Tabel `notifications` menggunakan PRIMARY KEY pada `id` dan index pada `target_id`, `actor_id`, `created_at DESC`, serta `read` untuk mempercepat query notifikasi per penerima, per aktor, sorting notifikasi terbaru, dan filter notifikasi yang belum dibaca. Sistem menggunakan trigger yang secara otomatis membuat notifikasi baru ketika ada aktivitas like atau comment baru, memastikan pengguna selalu mendapat notifikasi real-time.

---

## 5.3.7 Tabel content_reports

Tabel `content_reports` menyimpan laporan konten oleh pengguna.

**Tabel 5.7 Tabel content_reports Physical Database Design**

| No | Nama Kolom | Tipe Data | Constraint | Keterangan |
|----|------------|-----------|------------|------------|
| 1 | id | UUID | PRIMARY KEY, DEFAULT gen_random_uuid(), NOT NULL | Identifier unik laporan |
| 2 | reporter_id | UUID | FOREIGN KEY ke profiles.id, NOT NULL, ON DELETE CASCADE | Pengguna yang melaporkan |
| 3 | content_type | TEXT | NOT NULL, CHECK (content_type IN ('article', 'comment', 'user')) | Tipe konten yang dilaporkan |
| 4 | content_id | UUID | NOT NULL | ID konten yang dilaporkan |
| 5 | reason | TEXT | NOT NULL, CHECK (reason IN ('spam', 'inappropriate', 'harassment', 'copyright', 'other')) | Alasan laporan |
| 6 | description | TEXT | NULL | Deskripsi detail alasan |
| 7 | status | TEXT | DEFAULT 'pending', CHECK (status IN ('pending', 'reviewed', 'resolved', 'dismissed')) | Status laporan |
| 8 | reviewed_by | UUID | FOREIGN KEY ke profiles.id, NULL, ON DELETE SET NULL | Admin yang meninjau |
| 9 | reviewed_at | TIMESTAMP WITH TIME ZONE | NULL | Timestamp peninjauan |
| 10 | admin_notes | TEXT | NULL | Catatan admin |
| 11 | created_at | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT NOW() | Timestamp pembuatan |

Tabel `content_reports` menggunakan PRIMARY KEY pada `id` dan index pada `status`, `content_type`, `reporter_id`, serta `created_at DESC` untuk mempercepat filter laporan berdasarkan status dan tipe konten, query laporan per pelapor, serta sorting laporan terbaru yang memudahkan admin dalam proses moderasi.

---

## 5.3.8 Tabel featured_content

Tabel `featured_content` menyimpan daftar konten yang ditandai sebagai featured.

**Tabel 5.8 Tabel featured_content Physical Database Design**

| No | Nama Kolom | Tipe Data | Constraint | Keterangan |
|----|------------|-----------|------------|------------|
| 1 | id | UUID | PRIMARY KEY, DEFAULT gen_random_uuid(), NOT NULL | Identifier unik featured |
| 2 | content_type | TEXT | NOT NULL, CHECK (content_type IN ('article', 'user')) | Tipe konten yang di-featured |
| 3 | content_id | UUID | NOT NULL | ID konten yang di-featured |
| 4 | featured_by | UUID | FOREIGN KEY ke profiles.id, NOT NULL, ON DELETE CASCADE | Admin yang menandai featured |
| 5 | featured_at | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT NOW() | Timestamp saat konten di-featured |
| 6 | expires_at | TIMESTAMP WITH TIME ZONE | NULL | Timestamp berakhir featured |
| 7 | priority | INTEGER | DEFAULT 1 | Prioritas urutan featured (1–10) |
| 8 | active | BOOLEAN | DEFAULT true | Status aktif featured |

Tabel `featured_content` menggunakan PRIMARY KEY pada `id` dan UNIQUE INDEX pada kombinasi `(content_type, content_id)` untuk memastikan satu konten hanya dapat di-featured sekali. Index pada `active` mempercepat query featured content yang aktif, sementara index pada `priority DESC` memungkinkan sorting berdasarkan prioritas untuk menentukan urutan tampilan di homepage.

---

## 5.3.9 Tabel admin_activity_logs

Tabel `admin_activity_logs` menyimpan catatan aktivitas admin untuk audit trail.

**Tabel 5.9 Tabel admin_activity_logs Physical Database Design**

| No | Nama Kolom | Tipe Data | Constraint | Keterangan |
|----|------------|-----------|------------|------------|
| 1 | id | UUID | PRIMARY KEY, DEFAULT gen_random_uuid(), NOT NULL | Identifier unik log |
| 2 | admin_id | UUID | FOREIGN KEY ke profiles.id, NOT NULL, ON DELETE CASCADE | Admin yang melakukan aksi |
| 3 | action | TEXT | NOT NULL | Tipe aksi (contoh: delete_article, ban_user) |
| 4 | target_type | TEXT | NOT NULL | Tipe target (contoh: article, user) |
| 5 | target_id | UUID | NOT NULL | ID target aksi |
| 6 | details | JSONB | NULL | Detail tambahan dalam format JSON |
| 7 | ip_address | INET | NULL | Alamat IP admin |
| 8 | user_agent | TEXT | NULL | User agent browser |
| 9 | created_at | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT NOW() | Timestamp aktivitas |

Tabel `admin_activity_logs` menggunakan PRIMARY KEY pada `id` dan index pada `admin_id`, `created_at DESC`, `target_type`, serta `action` untuk mempercepat query log per admin, sorting log terbaru, dan filter berdasarkan tipe target dan aksi yang dilakukan, memudahkan proses audit trail dan investigasi aktivitas admin.

---

## 5.3.10 Tabel settings

Tabel `settings` menyimpan konfigurasi platform yang dapat diubah oleh admin.

**Tabel 5.10 Tabel settings Physical Database Design**

| No | Nama Kolom | Tipe Data | Constraint | Keterangan |
|----|------------|-----------|------------|------------|
| 1 | id | UUID | PRIMARY KEY, DEFAULT gen_random_uuid(), NOT NULL | Identifier unik setting |
| 2 | key | TEXT | UNIQUE, NOT NULL | Kunci setting (contoh: site_name) |
| 3 | value | JSONB | NOT NULL | Nilai setting dalam format JSON |
| 4 | description | TEXT | NULL | Deskripsi setting |
| 5 | category | TEXT | NOT NULL, DEFAULT 'general' | Kategori setting |
| 6 | created_at | TIMESTAMP WITH TIME ZONE | DEFAULT NOW() | Timestamp pembuatan |
| 7 | updated_at | TIMESTAMP WITH TIME ZONE | DEFAULT NOW() | Timestamp pembaruan |

Tabel `settings` menggunakan PRIMARY KEY pada `id`, UNIQUE INDEX pada `key` untuk memastikan setiap setting memiliki kunci unik, serta index pada `category` untuk mempercepat query setting per kategori. Sistem menggunakan trigger untuk auto-update `updated_at` setiap kali konfigurasi diubah, memastikan timestamp selalu akurat.

---

## 5.3.11 Tabel platform_statistics

Tabel `platform_statistics` menyimpan statistik platform secara real-time untuk keperluan dashboard dan analytics.

**Tabel 5.11 Tabel platform_statistics Physical Database Design**

| No | Nama Kolom | Tipe Data | Constraint | Keterangan |
|----|------------|-----------|------------|------------|
| 1 | id | UUID | PRIMARY KEY, DEFAULT gen_random_uuid(), NOT NULL | Identifier unik statistik |
| 2 | stat_key | TEXT | UNIQUE, NOT NULL | Kunci statistik (contoh: 'total_users', 'total_articles') |
| 3 | stat_value | INTEGER | DEFAULT 0 | Nilai statistik |
| 4 | stat_description | TEXT | NULL | Deskripsi statistik |
| 5 | last_updated | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT NOW() | Timestamp pembaruan terakhir |

Tabel `platform_statistics` menggunakan PRIMARY KEY pada `id`, UNIQUE INDEX pada `stat_key` untuk memastikan setiap statistik memiliki kunci unik. Statistik yang tersimpan meliputi: `total_users`, `total_articles`, `total_portfolio_works`, `total_content`, `total_views`, dan `total_likes`. Sistem menggunakan trigger yang secara otomatis memperbarui statistik setiap kali ada perubahan pada tabel `profiles`, `articles`, `portfolio_works`, atau `article_likes`, memastikan data statistik selalu up-to-date tanpa perlu query manual.

---

## 5.3.12 Konfigurasi Database

Database platform PaberLand menggunakan PostgreSQL 16 yang dihosting melalui Supabase dengan konfigurasi keamanan dan performa yang optimal. Semua tabel memiliki Row Level Security (RLS) enabled untuk memastikan keamanan data, di mana policy RLS memastikan pengguna hanya dapat mengakses data yang diizinkan sesuai peran mereka. Sistem menggunakan Supabase connection pooler untuk optimasi koneksi dengan maksimal 100 koneksi simultan, memungkinkan aplikasi menangani banyak request secara efisien. Backup otomatis dilakukan setiap hari dengan retensi 30 hari dan disimpan di Supabase storage untuk memastikan data dapat dipulihkan jika terjadi masalah. Untuk optimasi performa, database menggunakan index strategis pada kolom yang sering digunakan dalam query, GIN index untuk full-text search pada kolom content artikel, serta materialized view untuk statistik yang sering diakses, memastikan query berjalan dengan cepat meskipun data terus bertambah.

