# Entity Relationship Diagram (ERD) - PaberLand Platform

## Format dbdiagram.io (Copy ke https://dbdiagram.io/d)

```dbml
// ERD PaberLand Platform
// Copy kode ini ke https://dbdiagram.io/d untuk melihat visualisasi
// Docs: https://dbml.dbdiagram.io/docs

Table profiles {
  id uuid [primary key]
  full_name text [not null]
  phone text
  bio text
  avatar_url text
  role text [default: 'Penulis']
  is_admin boolean [default: false]
  admin_role text
  admin_since timestamp
  last_admin_activity timestamp
  followers_count integer [default: 0]
  following_count integer [default: 0]
  created_at timestamp [not null]
  updated_at timestamp [not null]
}

Table articles {
  id uuid [primary key]
  title text [not null]
  content text [not null, note: 'HTML content dari TinyMCE editor']
  excerpt text
  cover_image text
  category text [not null]
  author_id uuid [not null]
  published boolean [default: false]
  scheduled_at timestamp
  views integer [default: 0]
  likes_count integer [default: 0]
  comments_count integer [default: 0]
  slug text [unique]
  created_at timestamp [not null]
  updated_at timestamp [not null]
}

Table comments {
  id uuid [primary key]
  article_id uuid [not null]
  author_id uuid [not null]
  content text [not null]
  parent_id uuid
  created_at timestamp [not null]
  updated_at timestamp [not null]
}

Table article_likes {
  id uuid [primary key]
  article_id uuid [not null]
  user_id uuid [not null]
  created_at timestamp
}

Table follows {
  id uuid [primary key]
  follower_id uuid [not null]
  following_id uuid [not null]
  created_at timestamp
}

Table portfolio_works {
  id uuid [primary key]
  author_id uuid [not null]
  title text [not null]
  description text
  category text [not null]
  genre text
  year_created integer
  status text [default: 'unpublished']
  publisher text
  isbn text
  cover_image text
  external_link text
  awards text[]
  tags text[]
  created_at timestamp [not null]
  updated_at timestamp [not null]
}

Table notifications {
  id uuid [primary key]
  type text [not null, note: 'follow, like, comment, mention']
  actor_id uuid [not null]
  target_id uuid [not null]
  article_id uuid
  comment_id uuid
  read boolean [default: false]
  created_at timestamp [not null]
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
  created_at timestamp [not null]
}

Table featured_content {
  id uuid [primary key]
  content_type text [not null, note: 'article, user']
  content_id uuid [not null]
  featured_by uuid [not null]
  featured_at timestamp [not null]
  expires_at timestamp
  priority integer [default: 1]
  active boolean [default: true]
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
  created_at timestamp [not null]
}

Table settings {
  id uuid [primary key]
  key text [unique, not null]
  value jsonb [not null]
  description text
  category text [not null, default: 'general']
  created_at timestamp
  updated_at timestamp
}

// Relasi One-to-Many
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
Ref: follows.follower_id > profiles.id // many-to-one: profiles mengikuti follows
Ref: follows.following_id > profiles.id // many-to-one: profiles diikuti follows

// Relasi One-to-One
Ref: featured_content.content_id > articles.id // one-to-one: articles ditandai featured_content
```

## Cara Menggunakan:

1. Buka https://dbdiagram.io/d
2. Copy seluruh kode di dalam blok ```dbml``` di atas
3. Paste ke editor di dbdiagram.io
4. Diagram akan otomatis ter-render
5. Bisa export sebagai PNG, PDF, atau SQL

## Format PlantUML Chen Notation (Copy ke http://www.plantuml.com/plantuml/uml/)

File lengkap tersedia di `ERD_PaberLand_Chen.puml` atau copy kode berikut:

```plantuml
@startchen

entity PROFILES {
  id : UUID <<key>>
  full_name : TEXT
  phone : TEXT
  bio : TEXT
  avatar_url : TEXT
  role : TEXT
  is_admin : BOOLEAN
  admin_role : TEXT
  admin_since : TIMESTAMP
  last_admin_activity : TIMESTAMP
  followers_count : INTEGER <<derived>>
  following_count : INTEGER <<derived>>
  created_at : TIMESTAMP
  updated_at : TIMESTAMP
}

entity ARTICLES {
  id : UUID <<key>>
  title : TEXT
  content : TEXT
  excerpt : TEXT
  cover_image : TEXT
  category : TEXT
  author_id : UUID
  published : BOOLEAN
  scheduled_at : TIMESTAMP
  views : INTEGER <<derived>>
  likes_count : INTEGER <<derived>>
  comments_count : INTEGER <<derived>>
  slug : TEXT <<unique>>
  created_at : TIMESTAMP
  updated_at : TIMESTAMP
}

entity COMMENTS {
  id : UUID <<key>>
  article_id : UUID
  author_id : UUID
  content : TEXT
  parent_id : UUID
  created_at : TIMESTAMP
  updated_at : TIMESTAMP
}

entity ARTICLE_LIKES {
  id : UUID <<key>>
  article_id : UUID
  user_id : UUID
  created_at : TIMESTAMP
}

entity FOLLOWS {
  id : UUID <<key>>
  follower_id : UUID
  following_id : UUID
  created_at : TIMESTAMP
}

entity PORTFOLIO_WORKS {
  id : UUID <<key>>
  author_id : UUID
  title : TEXT
  description : TEXT
  category : TEXT
  genre : TEXT
  year_created : INTEGER
  status : TEXT
  publisher : TEXT
  isbn : TEXT
  cover_image : TEXT
  external_link : TEXT
  awards : TEXT <<multi>>
  tags : TEXT <<multi>>
  created_at : TIMESTAMP
  updated_at : TIMESTAMP
}

entity NOTIFICATIONS {
  id : UUID <<key>>
  type : TEXT
  actor_id : UUID
  target_id : UUID
  article_id : UUID
  comment_id : UUID
  read : BOOLEAN
  created_at : TIMESTAMP
}

entity CONTENT_REPORTS {
  id : UUID <<key>>
  reporter_id : UUID
  content_type : TEXT
  content_id : UUID
  reason : TEXT
  description : TEXT
  status : TEXT
  reviewed_by : UUID
  reviewed_at : TIMESTAMP
  admin_notes : TEXT
  created_at : TIMESTAMP
}

entity FEATURED_CONTENT {
  id : UUID <<key>>
  content_type : TEXT
  content_id : UUID
  featured_by : UUID
  featured_at : TIMESTAMP
  expires_at : TIMESTAMP
  priority : INTEGER
  active : BOOLEAN
}

entity ADMIN_ACTIVITY_LOGS {
  id : UUID <<key>>
  admin_id : UUID
  action : TEXT
  target_type : TEXT
  target_id : UUID
  details : JSONB
  ip_address : INET
  user_agent : TEXT
  created_at : TIMESTAMP
}

entity SETTINGS {
  id : UUID <<key>>
  key : TEXT <<unique>>
  value : JSONB
  description : TEXT
  category : TEXT
  created_at : TIMESTAMP
  updated_at : TIMESTAMP
}

' Relasi One-to-Many (1:N)
PROFILES ||--o{ ARTICLES : "menulis"
PROFILES ||--o{ COMMENTS : "mengomentari"
PROFILES ||--o{ PORTFOLIO_WORKS : "memiliki"
PROFILES ||--o{ NOTIFICATIONS : "menerima"
PROFILES ||--o{ NOTIFICATIONS : "melakukan"
PROFILES ||--o{ CONTENT_REPORTS : "melaporkan"
PROFILES ||--o{ CONTENT_REPORTS : "meninjau"
PROFILES ||--o{ FEATURED_CONTENT : "menandai"
PROFILES ||--o{ ADMIN_ACTIVITY_LOGS : "melakukan"
ARTICLES ||--o{ COMMENTS : "memiliki"
ARTICLES ||--o{ ARTICLE_LIKES : "mendapat"
ARTICLES ||--o{ NOTIFICATIONS : "memicu"
COMMENTS ||--o{ COMMENTS : "memiliki_parent"
COMMENTS ||--o{ NOTIFICATIONS : "memicu"

' Relasi Many-to-Many (N:M) melalui Junction Table
PROFILES ||--o{ ARTICLE_LIKES : "melike"
PROFILES ||--o{ FOLLOWS : "mengikuti"
PROFILES ||--o{ FOLLOWS : "diikuti"

' Relasi One-to-One (1:1)
ARTICLES ||--|| FEATURED_CONTENT : "ditandai"

@endchen
```

## Cara Menggunakan PlantUML Chen:

1. Buka http://www.plantuml.com/plantuml/uml/ atau install PlantUML extension di VS Code
2. Copy kode di atas atau buka file `ERD_PaberLand_Chen.puml`
3. Paste ke editor PlantUML
4. Diagram akan otomatis ter-render dengan notasi Chen
5. Bisa export sebagai PNG, SVG, atau PDF

## Catatan:

- Semua relasi menggunakan notasi `Ref: table.column > referenced_table.id`
- Komentar menjelaskan jenis relasi (many-to-one, one-to-one)
- Format mengikuti template standar dbdiagram.io untuk kemudahan penggunaan
- Format PlantUML Chen menggunakan notasi Chen yang lebih detail dengan attributes terpisah
