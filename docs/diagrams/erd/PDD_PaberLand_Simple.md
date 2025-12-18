# Physical Database Design (PDD) - PaberLand Platform (Simple Version)

## Format dbdiagram.io

File ini berisi Physical Database Design (PDD) versi sederhana untuk platform PaberLand dengan hanya tabel-tabel utama.

## Cara Menggunakan:

1. Buka https://dbdiagram.io/d
2. Copy seluruh kode di dalam file `PDD_PaberLand_Simple.dbml`
3. Paste ke editor di dbdiagram.io
4. Diagram akan otomatis ter-render
5. Bisa export sebagai PNG, PDF, atau SQL

## Tabel Utama:

1. **profiles** - Tabel profil pengguna
2. **articles** - Tabel artikel yang dibuat oleh penulis
3. **comments** - Tabel komentar artikel (mendukung nested comments)
4. **article_likes** - Tabel like artikel
5. **portfolio_works** - Tabel portofolio karya penulis
6. **notifications** - Tabel notifikasi sistem
7. **content_reports** - Tabel laporan konten untuk moderasi
8. **featured_content** - Tabel konten featured di homepage

## Kode dbdiagram.io:

```dbml
// Physical Database Design (PDD) - PaberLand Platform (Simple Version)
// Format dbdiagram.io - Copy ke https://dbdiagram.io/d untuk melihat visualisasi
// Versi: Simplified - Hanya tabel utama

Table profiles {
  id uuid [primary key]
  full_name text [not null]
  bio text
  avatar_url text
  role text [default: 'Penulis']
  is_admin boolean [default: false]
  created_at timestamp [not null]
  updated_at timestamp [not null]
  
  Note: 'Tabel profil pengguna'
}

Table articles {
  id uuid [primary key]
  title text [not null]
  content text [not null]
  cover_image text
  category text [not null]
  author_id uuid [not null]
  published boolean [default: false]
  views integer [default: 0]
  likes_count integer [default: 0]
  comments_count integer [default: 0]
  slug text [unique]
  created_at timestamp [not null]
  updated_at timestamp [not null]
  
  Note: 'Tabel artikel yang dibuat oleh penulis'
}

Table comments {
  id uuid [primary key]
  article_id uuid [not null]
  author_id uuid [not null]
  content text [not null]
  parent_id uuid
  created_at timestamp [not null]
  updated_at timestamp [not null]
  
  Note: 'Tabel komentar artikel (mendukung nested comments)'
}

Table article_likes {
  id uuid [primary key]
  article_id uuid [not null]
  user_id uuid [not null]
  created_at timestamp [not null]
  
  Note: 'Tabel like artikel'
}

Table portfolio_works {
  id uuid [primary key]
  author_id uuid [not null]
  title text [not null]
  description text
  category text [not null]
  cover_image text
  created_at timestamp [not null]
  updated_at timestamp [not null]
  
  Note: 'Tabel portofolio karya penulis'
}

Table notifications {
  id uuid [primary key]
  type text [not null]
  actor_id uuid [not null]
  target_id uuid [not null]
  article_id uuid
  read boolean [default: false]
  created_at timestamp [not null]
  
  Note: 'Tabel notifikasi sistem'
}

Table content_reports {
  id uuid [primary key]
  reporter_id uuid [not null]
  content_type text [not null]
  content_id uuid [not null]
  reason text [not null]
  status text [default: 'pending']
  reviewed_by uuid
  created_at timestamp [not null]
  
  Note: 'Tabel laporan konten untuk moderasi'
}

Table featured_content {
  id uuid [primary key]
  content_type text [not null]
  content_id uuid [not null]
  featured_by uuid [not null]
  active boolean [default: true]
  created_at timestamp [not null]
  
  Note: 'Tabel konten featured di homepage'
}

// Relasi
Ref: articles.author_id > profiles.id
Ref: comments.article_id > articles.id
Ref: comments.author_id > profiles.id
Ref: comments.parent_id > comments.id
Ref: article_likes.article_id > articles.id
Ref: article_likes.user_id > profiles.id
Ref: portfolio_works.author_id > profiles.id
Ref: notifications.target_id > profiles.id
Ref: notifications.actor_id > profiles.id
Ref: notifications.article_id > articles.id
Ref: content_reports.reporter_id > profiles.id
Ref: content_reports.reviewed_by > profiles.id
Ref: featured_content.featured_by > profiles.id
Ref: featured_content.content_id > articles.id
```

