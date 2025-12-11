# Physical Database Design (PDD) - PaberLand Platform

## Format dbdiagram.io (Copy ke https://dbdiagram.io/d)

File ini berisi Physical Database Design (PDD) untuk platform PaberLand **tanpa fitur Follow**.

## Cara Menggunakan:

1. Buka https://dbdiagram.io/d
2. Copy seluruh kode di dalam blok ```dbml``` di bawah ini
3. Paste ke editor di dbdiagram.io
4. Diagram akan otomatis ter-render
5. Bisa export sebagai PNG, PDF, atau SQL

## Kode dbdiagram.io:

```dbml
// Physical Database Design (PDD) - PaberLand Platform
// Format dbdiagram.io - Copy ke https://dbdiagram.io/d untuk melihat visualisasi
// Docs: https://dbml.dbdiagram.io/docs
// Versi: Tanpa fitur Follow

Table profiles {
  id uuid [primary key]
  full_name text [not null]
  phone text
  bio text
  avatar_url text
  role text [default: 'Penulis', note: 'Penulis, Ilustrator, Kreator Buku, Pekerja Buku']
  is_admin boolean [default: false]
  admin_role text [note: 'super_admin, moderator']
  admin_since timestamp
  last_admin_activity timestamp
  created_at timestamp [not null]
  updated_at timestamp [not null]
  
  Note: 'Tabel profil pengguna. id adalah foreign key ke auth.users.id (Supabase Auth).'
}

Table articles {
  id uuid [primary key]
  title text [not null]
  content text [not null, note: 'HTML content dari TinyMCE editor']
  excerpt text
  cover_image text
  category text [not null, note: 'cerpen, puisi, artikel, cerita-rakyat, novel-berseri, lainnya']
  author_id uuid [not null]
  published boolean [default: false]
  scheduled_at timestamp
  views integer [default: 0]
  likes_count integer [default: 0]
  comments_count integer [default: 0]
  slug text [unique]
  created_at timestamp [not null]
  updated_at timestamp [not null]
  
  Note: 'Tabel artikel yang dibuat oleh penulis. Mendukung draft, published, dan scheduled.'
}

Table comments {
  id uuid [primary key]
  article_id uuid [not null]
  author_id uuid [not null]
  content text [not null]
  parent_id uuid
  created_at timestamp [not null]
  updated_at timestamp [not null]
  
  Note: 'Tabel komentar berulir (threaded comments). parent_id untuk komentar nested.'
}

Table article_likes {
  id uuid [primary key]
  article_id uuid [not null]
  user_id uuid [not null]
  created_at timestamp [not null, default: `timezone('utc'::text, now())`]
  
  Note: 'Junction table untuk relasi many-to-many antara pengguna dan artikel yang disukai. UNIQUE(article_id, user_id).'
}

Table portfolio_works {
  id uuid [primary key]
  author_id uuid [not null]
  title text [not null]
  description text
  category text [not null, note: 'cerpen, puisi, artikel, cerita-rakyat, novel-berseri, lainnya']
  genre text
  year_created integer
  status text [default: 'unpublished', note: 'published, unpublished, in_progress, completed']
  publisher text
  isbn text
  cover_image text
  external_link text
  awards text[]
  tags text[]
  created_at timestamp [not null]
  updated_at timestamp [not null]
  
  Note: 'Tabel portofolio karya penulis (buku, ilustrasi, dll).'
}

Table notifications {
  id uuid [primary key]
  type text [not null, note: 'like, comment, mention']
  actor_id uuid [not null]
  target_id uuid [not null]
  article_id uuid
  comment_id uuid
  read boolean [default: false]
  created_at timestamp [not null, default: `timezone('utc'::text, now())`]
  
  Note: 'Tabel notifikasi sistem. type: like, comment, mention (tanpa follow).'
}

Table content_reports {
  id uuid [primary key]
  reporter_id uuid [not null]
  content_type text [not null, note: 'article, comment, user']
  content_id uuid [not null]
  reason text [not null, note: 'spam, inappropriate, harassment, copyright, other']
  description text
  status text [default: 'pending', note: 'pending, reviewed, resolved, dismissed']
  reviewed_by uuid
  reviewed_at timestamp
  admin_notes text
  created_at timestamp [not null, default: `timezone('utc'::text, now())`]
  
  Note: 'Tabel laporan konten dari pengguna untuk moderasi.'
}

Table featured_content {
  id uuid [primary key]
  content_type text [not null, note: 'article, user']
  content_id uuid [not null]
  featured_by uuid [not null]
  featured_at timestamp [not null, default: `timezone('utc'::text, now())`]
  expires_at timestamp
  priority integer [default: 1]
  active boolean [default: true]
  
  Note: 'Tabel konten yang ditampilkan di homepage. UNIQUE(content_type, content_id).'
}

Table admin_activity_logs {
  id uuid [primary key]
  admin_id uuid [not null]
  action text [not null]
  target_type text [not null]
  target_id uuid [not null]
  details jsonb
  ip_address inet
  user_agent text
  created_at timestamp [not null, default: `timezone('utc'::text, now())`]
  
  Note: 'Tabel log aktivitas admin untuk audit trail.'
}

Table settings {
  id uuid [primary key]
  key text [unique, not null]
  value jsonb [not null]
  description text
  category text [not null, default: 'general']
  created_at timestamp
  updated_at timestamp
  
  Note: 'Tabel pengaturan platform (key-value pairs).'
}

Table platform_statistics {
  id uuid [primary key]
  stat_key text [unique, not null]
  stat_value integer [default: 0]
  stat_description text
  last_updated timestamp [not null]
  
  Note: 'Tabel statistik platform real-time (total_users, total_articles, total_views, dll).'
}

// Relasi One-to-Many (1:N)
Ref: articles.author_id > profiles.id // many-to-one: profiles menulis articles
Ref: comments.author_id > profiles.id // many-to-one: profiles mengomentari comments
Ref: comments.article_id > articles.id // many-to-one: articles memiliki comments
Ref: portfolio_works.author_id > profiles.id // many-to-one: profiles memiliki portfolio_works
Ref: notifications.target_id > profiles.id // many-to-one: profiles menerima notifications
Ref: notifications.actor_id > profiles.id // many-to-one: profiles melakukan notifications
Ref: notifications.article_id > articles.id // many-to-one: articles memicu notifications
Ref: notifications.comment_id > comments.id // many-to-one: comments memicu notifications
Ref: content_reports.reporter_id > profiles.id // many-to-one: profiles melaporkan content_reports
Ref: content_reports.reviewed_by > profiles.id // many-to-one: profiles meninjau content_reports
Ref: featured_content.featured_by > profiles.id // many-to-one: profiles menandai featured_content
Ref: admin_activity_logs.admin_id > profiles.id // many-to-one: profiles melakukan admin_activity_logs

// Relasi Self-Referencing (Recursive)
Ref: comments.parent_id > comments.id // many-to-one: comments memiliki parent comment

// Relasi Many-to-Many melalui Junction Table
Ref: article_likes.article_id > articles.id // many-to-one: articles mendapat article_likes
Ref: article_likes.user_id > profiles.id // many-to-one: profiles melike article_likes

// Relasi One-to-One
Ref: featured_content.content_id > articles.id // one-to-one: articles ditandai featured_content
```

## Perbedaan dengan Versi Sebelumnya:

1. **Tabel `follows` dihapus** - Tidak ada lagi tabel untuk relasi follow antar pengguna
2. **Kolom `followers_count` dan `following_count` dihapus dari `profiles`** - Tidak ada lagi kolom denormalisasi untuk menghitung followers/following
3. **Tipe notifikasi `follow` dihapus** - Tabel `notifications` hanya mendukung `like`, `comment`, dan `mention`
4. **Tabel `platform_statistics` ditambahkan** - Untuk statistik platform real-time

## Tabel yang Tersedia:

1. **profiles** - Data profil pengguna
2. **articles** - Artikel yang dibuat penulis
3. **comments** - Komentar berulir pada artikel
4. **article_likes** - Junction table untuk like artikel
5. **portfolio_works** - Portofolio karya penulis
6. **notifications** - Notifikasi sistem (tanpa follow)
7. **content_reports** - Laporan konten untuk moderasi
8. **featured_content** - Konten yang ditampilkan di homepage
9. **admin_activity_logs** - Log aktivitas admin
10. **settings** - Pengaturan platform
11. **platform_statistics** - Statistik platform real-time

## Catatan:

- Semua relasi menggunakan `ON DELETE CASCADE` kecuali `content_reports.reviewed_by` yang menggunakan `ON DELETE SET NULL`
- Tabel `article_likes` memiliki constraint `UNIQUE(article_id, user_id)` untuk mencegah duplikasi like
- Tabel `featured_content` memiliki constraint `UNIQUE(content_type, content_id)` untuk mencegah duplikasi featured content
- Tabel `settings` memiliki constraint `UNIQUE(key)` untuk memastikan setiap key unik
- Tabel `platform_statistics` memiliki constraint `UNIQUE(stat_key)` untuk memastikan setiap statistik key unik

