# ERD PaberLand - Chen Notation (100% Valid dari Database)

## 📋 Daftar Entitas (Berdasarkan Database Migration)

Berdasarkan pemeriksaan file migration, berikut adalah **12 entitas** yang ada di database:

1. **PROFILES** - User/Penulis
2. **ARTICLES** - Artikel
3. **COMMENTS** - Komentar
4. **ARTICLE_LIKES** - Junction table untuk like
5. **FOLLOWS** - Junction table untuk follow
6. **NOTIFICATIONS** - Notifikasi
7. **PORTFOLIO_WORKS** - Karya Portofolio
8. **CONTENT_REPORTS** - Laporan Konten
9. **FEATURED_CONTENT** - Konten Unggulan
10. **ADMIN_ACTIVITY_LOGS** - Log Aktivitas Admin
11. **SETTINGS** - Pengaturan Sistem
12. **PLATFORM_STATISTICS** - Statistik Platform

---

## 1. ENTITAS: PROFILES

### Entity (Kotak):
```
┌──────────────┐
│   PROFILES   │
└──────────────┘
```

### Atribut (Oval terpisah):
```
     ( id )  ← Primary key (digarisbawahi)
       │
       │
┌──────────────┐
│   PROFILES   │
└──────────────┘
       │
       ├─── ( full_name )
       ├─── ( phone )
       ├─── ( bio )
       ├─── ( avatar_url )
       ├─── ( role )
       ├─── ( is_admin )
       ├─── ( admin_role )
       ├─── ( admin_since )
       ├─── ( last_admin_activity )
       ├─── ( followers_count )
       ├─── ( following_count )
       ├─── ( member_id )
       ├─── ( prestasi )
       ├─── ( alamat )
       ├─── ( created_at )
       └─── ( updated_at )
```

**Catatan dari Database:**
- `id` = UUID, PRIMARY KEY, REFERENCES auth.users
- `role` = TEXT, CHECK (role IN ('Penulis', 'Ilustrator', 'Kreator Buku', 'Pekerja Buku')), DEFAULT 'Penulis'
- `admin_role` = TEXT, CHECK (admin_role IN ('super_admin', 'moderator'))
- `followers_count` dan `following_count` = INTEGER, DEFAULT 0 (derived dari follows table)

---

## 2. ENTITAS: ARTICLES

### Entity (Kotak):
```
┌──────────────┐
│   ARTICLES   │
└──────────────┘
```

### Atribut (Oval terpisah):
```
     ( id )  ← Primary key
       │
       │
┌──────────────┐
│   ARTICLES   │
└──────────────┘
       │
       ├─── ( title )
       ├─── ( content )
       ├─── ( excerpt )
       ├─── ( cover_image )
       ├─── ( category )
       ├─── ( published )
       ├─── ( scheduled_at )
       ├─── ( views )
       ├─── ( likes_count )
       ├─── ( comments_count )
       ├─── ( slug )  ← Unique
       ├─── ( created_at )
       └─── ( updated_at )
```

**Catatan dari Database:**
- `id` = UUID, PRIMARY KEY
- `category` = TEXT, NOT NULL, CHECK (category IN ('cerpen', 'puisi', 'artikel', 'cerita-rakyat', 'novel-berseri', 'lainnya'))
- `author_id` = UUID, NOT NULL, REFERENCES profiles(id) ON DELETE CASCADE (Foreign Key - tidak ditulis di entity)
- `slug` = TEXT, UNIQUE

---

## 3. ENTITAS: COMMENTS

### Entity (Kotak):
```
┌──────────────┐
│   COMMENTS   │
└──────────────┘
```

### Atribut (Oval terpisah):
```
     ( id )  ← Primary key
       │
       │
┌──────────────┐
│   COMMENTS   │
└──────────────┘
       │
       ├─── ( content )
       ├─── ( created_at )
       └─── ( updated_at )
```

**Catatan dari Database:**
- `id` = UUID, PRIMARY KEY
- `article_id` = UUID, NOT NULL, REFERENCES articles(id) ON DELETE CASCADE (Foreign Key)
- `author_id` = UUID, NOT NULL, REFERENCES profiles(id) ON DELETE CASCADE (Foreign Key)
- `parent_id` = UUID, REFERENCES comments(id) ON DELETE CASCADE (Foreign Key untuk self-reference)

---

## 4. ENTITAS: ARTICLE_LIKES (Junction Table)

### Entity (Kotak):
```
┌──────────────┐
│ARTICLE_LIKES │
└──────────────┘
```

### Atribut (Oval terpisah):
```
     ( id )  ← Primary key
       │
       │
┌──────────────┐
│ARTICLE_LIKES │
└──────────────┘
       │
       └─── ( created_at )
```

**Catatan dari Database:**
- `id` = UUID, PRIMARY KEY
- `article_id` = UUID, NOT NULL, REFERENCES articles(id) ON DELETE CASCADE
- `user_id` = UUID, NOT NULL, REFERENCES profiles(id) ON DELETE CASCADE
- UNIQUE(article_id, user_id) - mencegah duplikasi like

---

## 5. ENTITAS: FOLLOWS (Junction Table)

### Entity (Kotak):
```
┌──────────────┐
│   FOLLOWS    │
└──────────────┘
```

### Atribut (Oval terpisah):
```
     ( id )  ← Primary key
       │
       │
┌──────────────┐
│   FOLLOWS    │
└──────────────┘
       │
       └─── ( created_at )
```

**Catatan dari Database:**
- `id` = UUID, PRIMARY KEY
- `follower_id` = UUID, NOT NULL, REFERENCES profiles(id) ON DELETE CASCADE
- `following_id` = UUID, NOT NULL, REFERENCES profiles(id) ON DELETE CASCADE
- UNIQUE(follower_id, following_id) - mencegah duplikasi follow

---

## 6. ENTITAS: NOTIFICATIONS

### Entity (Kotak):
```
┌──────────────┐
│NOTIFICATIONS │
└──────────────┘
```

### Atribut (Oval terpisah):
```
     ( id )  ← Primary key
       │
       │
┌──────────────┐
│NOTIFICATIONS │
└──────────────┘
       │
       ├─── ( type )
       ├─── ( read )
       └─── ( created_at )
```

**Catatan dari Database:**
- `id` = UUID, PRIMARY KEY
- `type` = TEXT, NOT NULL, CHECK (type IN ('follow', 'like', 'comment', 'mention'))
- `actor_id` = UUID, NOT NULL, REFERENCES profiles(id) ON DELETE CASCADE
- `target_id` = UUID, NOT NULL, REFERENCES profiles(id) ON DELETE CASCADE
- `article_id` = UUID, REFERENCES articles(id) ON DELETE CASCADE (optional)
- `comment_id` = UUID, REFERENCES comments(id) ON DELETE CASCADE (optional)

---

## 7. ENTITAS: PORTFOLIO_WORKS

### Entity (Kotak):
```
┌──────────────────┐
│ PORTFOLIO_WORKS  │
└──────────────────┘
```

### Atribut (Oval terpisah):
```
     ( id )  ← Primary key
       │
       │
┌──────────────────┐
│ PORTFOLIO_WORKS  │
└──────────────────┘
       │
       ├─── ( title )
       ├─── ( description )
       ├─── ( category )
       ├─── ( genre )
       ├─── ( year_created )
       ├─── ( status )
       ├─── ( publisher )
       ├─── ( isbn )
       ├─── ( cover_image )
       ├─── ( external_link )
       ├─── ( awards )
       ├─── ( tags )
       ├─── ( created_at )
       └─── ( updated_at )
```

**Catatan dari Database:**
- `id` = UUID, PRIMARY KEY
- `author_id` = UUID, NOT NULL, REFERENCES profiles(id) ON DELETE CASCADE
- `category` = TEXT, NOT NULL, CHECK (category IN ('cerpen', 'puisi', 'artikel', 'cerita-rakyat', 'novel-berseri', 'lainnya', 'buku'))
- `status` = TEXT, CHECK (status IN ('published', 'unpublished', 'in_progress', 'completed')), DEFAULT 'unpublished'
- `awards` = TEXT[] (array)
- `tags` = TEXT[] (array)

---

## 8. ENTITAS: CONTENT_REPORTS

### Entity (Kotak):
```
┌──────────────┐
│CONTENT_REPORTS│
└──────────────┘
```

### Atribut (Oval terpisah):
```
     ( id )  ← Primary key
       │
       │
┌──────────────┐
│CONTENT_REPORTS│
└──────────────┘
       │
       ├─── ( content_type )
       ├─── ( reason )
       ├─── ( description )
       ├─── ( status )
       ├─── ( reviewed_at )
       ├─── ( admin_notes )
       └─── ( created_at )
```

**Catatan dari Database:**
- `id` = UUID, PRIMARY KEY
- `reporter_id` = UUID, NOT NULL, REFERENCES profiles(id) ON DELETE CASCADE
- `content_type` = TEXT, NOT NULL, CHECK (content_type IN ('article', 'comment', 'user'))
- `content_id` = UUID, NOT NULL
- `reason` = TEXT, NOT NULL, CHECK (reason IN ('spam', 'inappropriate', 'harassment', 'copyright', 'other'))
- `status` = TEXT, DEFAULT 'pending', CHECK (status IN ('pending', 'reviewed', 'resolved', 'dismissed'))
- `reviewed_by` = UUID, REFERENCES profiles(id) ON DELETE SET NULL

---

## 9. ENTITAS: FEATURED_CONTENT

### Entity (Kotak):
```
┌──────────────┐
│FEATURED_CONTENT│
└──────────────┘
```

### Atribut (Oval terpisah):
```
     ( id )  ← Primary key
       │
       │
┌──────────────┐
│FEATURED_CONTENT│
└──────────────┘
       │
       ├─── ( content_type )
       ├─── ( priority )
       ├─── ( active )
       ├─── ( featured_at )
       └─── ( expires_at )
```

**Catatan dari Database:**
- `id` = UUID, PRIMARY KEY
- `content_type` = TEXT, NOT NULL, CHECK (content_type IN ('article', 'user'))
- `content_id` = UUID, NOT NULL
- `featured_by` = UUID, NOT NULL, REFERENCES profiles(id) ON DELETE CASCADE
- `priority` = INTEGER, DEFAULT 1
- `active` = BOOLEAN, DEFAULT true
- UNIQUE(content_type, content_id) - satu konten hanya bisa di-featured sekali

---

## 10. ENTITAS: ADMIN_ACTIVITY_LOGS

### Entity (Kotak):
```
┌──────────────┐
│ADMIN_ACTIVITY│
│    _LOGS     │
└──────────────┘
```

### Atribut (Oval terpisah):
```
     ( id )  ← Primary key
       │
       │
┌──────────────┐
│ADMIN_ACTIVITY│
│    _LOGS     │
└──────────────┘
       │
       ├─── ( action )
       ├─── ( target_type )
       ├─── ( target_id )
       ├─── ( details )
       ├─── ( ip_address )
       ├─── ( user_agent )
       └─── ( created_at )
```

**Catatan dari Database:**
- `id` = UUID, PRIMARY KEY
- `admin_id` = UUID, NOT NULL, REFERENCES profiles(id) ON DELETE CASCADE
- `action` = TEXT, NOT NULL
- `target_type` = TEXT, NOT NULL
- `target_id` = UUID, NOT NULL
- `details` = JSONB
- `ip_address` = INET
- `user_agent` = TEXT

---

## 11. ENTITAS: SETTINGS

### Entity (Kotak):
```
┌──────────────┐
│   SETTINGS   │
└──────────────┘
```

### Atribut (Oval terpisah):
```
     ( id )  ← Primary key
       │
       │
┌──────────────┐
│   SETTINGS   │
└──────────────┘
       │
       ├─── ( key )  ← Unique
       ├─── ( value )
       ├─── ( description )
       ├─── ( category )
       ├─── ( created_at )
       └─── ( updated_at )
```

**Catatan dari Database:**
- `id` = UUID, PRIMARY KEY
- `key` = TEXT, UNIQUE, NOT NULL
- `value` = JSONB, NOT NULL
- `description` = TEXT
- `category` = TEXT, NOT NULL, DEFAULT 'general'

---

## 12. ENTITAS: PLATFORM_STATISTICS

### Entity (Kotak):
```
┌──────────────┐
│PLATFORM_STATS│
└──────────────┘
```

### Atribut (Oval terpisah):
```
     ( id )  ← Primary key
       │
       │
┌──────────────┐
│PLATFORM_STATS│
└──────────────┘
       │
       ├─── ( stat_key )  ← Unique
       ├─── ( stat_value )
       ├─── ( stat_description )
       └─── ( last_updated )
```

**Catatan dari Database:**
- `id` = UUID, PRIMARY KEY
- `stat_key` = TEXT, UNIQUE, NOT NULL
- `stat_value` = INTEGER, DEFAULT 0
- `stat_description` = TEXT
- `last_updated` = TIMESTAMP WITH TIME ZONE, NOT NULL

**Catatan:** Tabel ini biasanya standalone (tidak ada relasi ke entity lain)

---

## RELASI DAN CARDINALITY (Crow's Foot Notation)

### A. Relasi One-to-Many (1:N) dari PROFILES

#### 1. PROFILES → ARTICLES (menulis)
```
┌──────────┐    |    ◇─────────    |||    ┌──────────┐
│ PROFILES │────│ menulis │───────│ ARTICLES │
└──────────┘    └─────────┘       └──────────┘
```
- **Cardinality:** | (one) ke ||| (many)
- **Foreign Key:** articles.author_id → profiles.id
- **Constraint:** ON DELETE CASCADE

#### 2. PROFILES → COMMENTS (mengomentari)
```
┌──────────┐    |    ◇─────────    |||    ┌──────────┐
│ PROFILES │────│mengomentari│───────│ COMMENTS │
└──────────┘    └───────────┘       └──────────┘
```
- **Cardinality:** | (one) ke ||| (many)
- **Foreign Key:** comments.author_id → profiles.id
- **Constraint:** ON DELETE CASCADE

#### 3. PROFILES → PORTFOLIO_WORKS (memiliki_portfolio)
```
┌──────────┐    |    ◇─────────    |||    ┌──────────────┐
│ PROFILES │────│memiliki_│────────│PORTFOLIO_WORKS│
└──────────┘    │portfolio│        └──────────────┘
                └─────────┘
```
- **Cardinality:** | (one) ke ||| (many)
- **Foreign Key:** portfolio_works.author_id → profiles.id
- **Constraint:** ON DELETE CASCADE

#### 4. PROFILES → NOTIFICATIONS (menerima_notif)
```
┌──────────┐    |    ◇─────────    |||    ┌──────────────┐
│ PROFILES │────│menerima_│────────│NOTIFICATIONS │
└──────────┘    │  notif  │        └──────────────┘
                └─────────┘
```
- **Cardinality:** | (one) ke ||| (many)
- **Foreign Key:** notifications.target_id → profiles.id
- **Constraint:** ON DELETE CASCADE

#### 5. PROFILES → NOTIFICATIONS (melakukan_notif)
```
┌──────────┐    |    ◇─────────    |||    ┌──────────────┐
│ PROFILES │────│melakukan_│───────│NOTIFICATIONS │
└──────────┘    │  notif   │       └──────────────┘
                └──────────┘
```
- **Cardinality:** | (one) ke ||| (many)
- **Foreign Key:** notifications.actor_id → profiles.id
- **Constraint:** ON DELETE CASCADE

#### 6. PROFILES → CONTENT_REPORTS (melaporkan)
```
┌──────────┐    |    ◇─────────    |||    ┌──────────────┐
│ PROFILES │────│melaporkan│───────│CONTENT_REPORTS│
└──────────┘    └──────────┘       └──────────────┘
```
- **Cardinality:** | (one) ke ||| (many)
- **Foreign Key:** content_reports.reporter_id → profiles.id
- **Constraint:** ON DELETE CASCADE

#### 7. PROFILES → CONTENT_REPORTS (meninjau)
```
┌──────────┐    |    ◇─────────    O|||    ┌──────────────┐
│ PROFILES │────│ meninjau │───────│CONTENT_REPORTS│
└──────────┘    └─────────┘        └──────────────┘
```
- **Cardinality:** | (one) ke O||| (zero or many - optional)
- **Foreign Key:** content_reports.reviewed_by → profiles.id
- **Constraint:** ON DELETE SET NULL (bukan CASCADE!)

#### 8. PROFILES → FEATURED_CONTENT (menandai_featured)
```
┌──────────┐    |    ◇─────────    |||    ┌──────────────┐
│ PROFILES │────│menandai_│───────│FEATURED_CONTENT│
└──────────┘    │featured │        └──────────────┘
                └─────────┘
```
- **Cardinality:** | (one) ke ||| (many)
- **Foreign Key:** featured_content.featured_by → profiles.id
- **Constraint:** ON DELETE CASCADE

#### 9. PROFILES → ADMIN_ACTIVITY_LOGS (melakukan_log)
```
┌──────────┐    |    ◇─────────    |||    ┌──────────────┐
│ PROFILES │────│melakukan_│───────│ADMIN_ACTIVITY│
└──────────┘    │   log   │       │    _LOGS     │
                └─────────┘       └──────────────┘
```
- **Cardinality:** | (one) ke ||| (many)
- **Foreign Key:** admin_activity_logs.admin_id → profiles.id
- **Constraint:** ON DELETE CASCADE

---

### B. Relasi One-to-Many (1:N) dari ARTICLES

#### 10. ARTICLES → COMMENTS (memiliki_comment)
```
┌──────────┐    |    ◇─────────    |||    ┌──────────┐
│ ARTICLES │────│memiliki_│────────│ COMMENTS │
└──────────┘    │ comment │        └──────────┘
                └─────────┘
```
- **Cardinality:** | (one) ke ||| (many)
- **Foreign Key:** comments.article_id → articles.id
- **Constraint:** ON DELETE CASCADE

#### 11. ARTICLES → ARTICLE_LIKES (mendapat_like)
```
┌──────────┐    |    ◇─────────    |||    ┌──────────────┐
│ ARTICLES │────│mendapat_│────────│ARTICLE_LIKES │
└──────────┘    │  like   │        └──────────────┘
                └─────────┘
```
- **Cardinality:** | (one) ke ||| (many)
- **Foreign Key:** article_likes.article_id → articles.id
- **Constraint:** ON DELETE CASCADE

#### 12. ARTICLES → NOTIFICATIONS (memicu_notif)
```
┌──────────┐    |    ◇─────────    O|||    ┌──────────────┐
│ ARTICLES │────│memicu_│──────────│NOTIFICATIONS │
└──────────┘    │ notif │          └──────────────┘
                └───────┘
```
- **Cardinality:** | (one) ke O||| (zero or many - optional)
- **Foreign Key:** notifications.article_id → articles.id
- **Constraint:** ON DELETE CASCADE

---

### C. Relasi One-to-One (1:1)

#### 13. ARTICLES → FEATURED_CONTENT (ditandai_featured)
```
┌──────────┐    |    ◇─────────    O|    ┌──────────────┐
│ ARTICLES │────│ditandai_│───────│FEATURED_CONTENT│
└──────────┘    │featured │        └──────────────┘
                └─────────┘
```
- **Cardinality:** | (one) ke O| (zero or one - optional)
- **Foreign Key:** featured_content.content_id → articles.id (jika content_type = 'article')
- **Constraint:** UNIQUE(content_type, content_id) - satu artikel maksimal satu featured

---

### D. Relasi Many-to-Many (N:M)

#### 14. PROFILES ↔ ARTICLE_LIKES ↔ ARTICLES (melike)
```
┌──────────┐    |||    ◇─────────    |||    ┌──────────────┐    |    ◇─────────    |||    ┌──────────┐
│ PROFILES │────│ melike │────────│ARTICLE_LIKES │────│mendapat_│────────│ ARTICLES │
└──────────┘    └────────┘        └──────────────┘    │  like   │        └──────────┘
                                                        └─────────┘
```
- **Cardinality:** ||| (many) ke ||| (many) via junction table
- **Foreign Keys:**
  - article_likes.user_id → profiles.id
  - article_likes.article_id → articles.id
- **Constraint:** UNIQUE(article_id, user_id)

#### 15. PROFILES ↔ FOLLOWS ↔ PROFILES (mengikuti/diikuti)
```
┌──────────┐    |||    ◇─────────    |||    ┌──────────┐    |||    ◇─────────    |||    ┌──────────┐
│ PROFILES │────│mengikuti│───────│ FOLLOWS │────│ diikuti │────────│ PROFILES │
└──────────┘    └────────┘        └──────────┘    └────────┘        └──────────┘
```
- **Cardinality:** ||| (many) ke ||| (many) via junction table (self-referencing)
- **Foreign Keys:**
  - follows.follower_id → profiles.id
  - follows.following_id → profiles.id
- **Constraint:** UNIQUE(follower_id, following_id)

---

### E. Relasi Self-Referencing (1:N)

#### 16. COMMENTS → COMMENTS (parent_comment)
```
┌──────────┐    |    ◇─────────    O|||    ┌──────────┐
│ COMMENTS │────│parent_│────────│ COMMENTS │
└──────────┘    │comment│        └──────────┘
                └───────┘
```
- **Cardinality:** | (one) ke O||| (zero or many - optional)
- **Foreign Key:** comments.parent_id → comments.id
- **Constraint:** ON DELETE CASCADE
- **Catatan:** parent_id bisa NULL (komentar top-level)

#### 17. COMMENTS → NOTIFICATIONS (memicu_notif_comment)
```
┌──────────┐    |    ◇─────────    O|||    ┌──────────────┐
│ COMMENTS │────│memicu_│──────────│NOTIFICATIONS │
└──────────┘    │notif_ │          └──────────────┘
                │comment│
                └───────┘
```
- **Cardinality:** | (one) ke O||| (zero or many - optional)
- **Foreign Key:** notifications.comment_id → comments.id
- **Constraint:** ON DELETE CASCADE

---

## FUNGSI ADMIN YANG TIDAK MUNCUL SEBAGAI RELASI DI ERD

**PENTING:** ERD hanya menampilkan **relasi data** (foreign key), bukan **operasi/fungsi** aplikasi.

### Fungsi Admin yang TIDAK Muncul di ERD (karena ini operasi, bukan relasi data):

1. **Delete User** - Operasi DELETE pada PROFILES
   - Tidak ada relasi, hanya operasi aplikasi
   - Dicatat di ADMIN_ACTIVITY_LOGS (ada relasi)

2. **Update User** - Operasi UPDATE pada PROFILES
   - Tidak ada relasi, hanya operasi aplikasi
   - Dicatat di ADMIN_ACTIVITY_LOGS (ada relasi)

3. **Delete Article** - Operasi DELETE pada ARTICLES
   - Tidak ada relasi, hanya operasi aplikasi
   - Dicatat di ADMIN_ACTIVITY_LOGS (ada relasi)

4. **Manage Content (CRUD)** - Operasi CREATE/UPDATE/DELETE pada ARTICLES
   - Tidak ada relasi, hanya operasi aplikasi
   - Dicatat di ADMIN_ACTIVITY_LOGS (ada relasi)

5. **View Analytics** - Query data dari berbagai tabel
   - Tidak ada relasi, hanya query/read operation
   - Menggunakan PLATFORM_STATISTICS (standalone)

6. **Change User Role** - Operasi UPDATE pada PROFILES.role
   - Tidak ada relasi, hanya operasi aplikasi
   - Dicatat di ADMIN_ACTIVITY_LOGS (ada relasi)

### Fungsi Admin yang MUNCUL di ERD (karena ada relasi data):

1. **Meninjau Laporan** - PROFILES → CONTENT_REPORTS (relasi `reviewed_by`)
2. **Menandai Featured** - PROFILES → FEATURED_CONTENT (relasi `featured_by`)
3. **Logging Aktivitas** - PROFILES → ADMIN_ACTIVITY_LOGS (relasi `admin_id`)
4. **Manage Settings** - PROFILES → SETTINGS (tidak ada relasi eksplisit, tapi admin bisa akses)

---

## RINGKASAN RELASI LENGKAP

| No | Relasi | Dari | Ke | Cardinality | Foreign Key |
|----|--------|------|-----|-------------|-------------|
| 1 | menulis | PROFILES | ARTICLES | \| ke \|\|\| | articles.author_id |
| 2 | mengomentari | PROFILES | COMMENTS | \| ke \|\|\| | comments.author_id |
| 3 | memiliki_portfolio | PROFILES | PORTFOLIO_WORKS | \| ke \|\|\| | portfolio_works.author_id |
| 4 | menerima_notif | PROFILES | NOTIFICATIONS | \| ke \|\|\| | notifications.target_id |
| 5 | melakukan_notif | PROFILES | NOTIFICATIONS | \| ke \|\|\| | notifications.actor_id |
| 6 | melaporkan | PROFILES | CONTENT_REPORTS | \| ke \|\|\| | content_reports.reporter_id |
| 7 | meninjau | PROFILES | CONTENT_REPORTS | \| ke O\|\|\| | content_reports.reviewed_by |
| 8 | menandai_featured | PROFILES | FEATURED_CONTENT | \| ke \|\|\| | featured_content.featured_by |
| 9 | melakukan_log | PROFILES | ADMIN_ACTIVITY_LOGS | \| ke \|\|\| | admin_activity_logs.admin_id |
| 10 | memiliki_comment | ARTICLES | COMMENTS | \| ke \|\|\| | comments.article_id |
| 11 | mendapat_like | ARTICLES | ARTICLE_LIKES | \| ke \|\|\| | article_likes.article_id |
| 12 | memicu_notif | ARTICLES | NOTIFICATIONS | \| ke O\|\|\| | notifications.article_id |
| 13 | ditandai_featured | ARTICLES | FEATURED_CONTENT | \| ke O\| | featured_content.content_id |
| 14 | melike | PROFILES | ARTICLE_LIKES | \|\|\| ke \|\|\| | article_likes.user_id |
| 15 | mengikuti | PROFILES | FOLLOWS | \|\|\| ke \|\|\| | follows.follower_id |
| 16 | diikuti | PROFILES | FOLLOWS | \|\|\| ke \|\|\| | follows.following_id |
| 17 | parent_comment | COMMENTS | COMMENTS | \| ke O\|\|\| | comments.parent_id |
| 18 | memicu_notif_comment | COMMENTS | NOTIFICATIONS | \| ke O\|\|\| | notifications.comment_id |

---

## CATATAN PENTING DARI DATABASE

### 1. Constraint ON DELETE:
- **CASCADE:** profiles, articles, comments, article_likes, follows, notifications, portfolio_works, featured_content, admin_activity_logs
- **SET NULL:** content_reports.reviewed_by (karena laporan harus tetap ada meski admin dihapus)

### 2. Unique Constraints:
- `article_likes`: UNIQUE(article_id, user_id)
- `follows`: UNIQUE(follower_id, following_id)
- `articles.slug`: UNIQUE
- `settings.key`: UNIQUE
- `featured_content`: UNIQUE(content_type, content_id)
- `platform_statistics.stat_key`: UNIQUE

### 3. Check Constraints:
- `articles.category`: IN ('cerpen', 'puisi', 'artikel', 'cerita-rakyat', 'novel-berseri', 'lainnya')
- `portfolio_works.category`: IN ('cerpen', 'puisi', 'artikel', 'cerita-rakyat', 'novel-berseri', 'lainnya', 'buku')
- `portfolio_works.status`: IN ('published', 'unpublished', 'in_progress', 'completed')
- `profiles.role`: IN ('Penulis', 'Ilustrator', 'Kreator Buku', 'Pekerja Buku')
- `profiles.admin_role`: IN ('super_admin', 'moderator')
- `notifications.type`: IN ('follow', 'like', 'comment', 'mention')
- `content_reports.content_type`: IN ('article', 'comment', 'user')
- `content_reports.reason`: IN ('spam', 'inappropriate', 'harassment', 'copyright', 'other')
- `content_reports.status`: IN ('pending', 'reviewed', 'resolved', 'dismissed')
- `featured_content.content_type`: IN ('article', 'user')

### 4. Derived Attributes (tidak perlu di ERD):
- `profiles.followers_count` - dihitung dari follows table
- `profiles.following_count` - dihitung dari follows table
- `articles.likes_count` - dihitung dari article_likes table
- `articles.comments_count` - dihitung dari comments table
- `articles.views` - diupdate via trigger

---

## LAYOUT DIAGRAM YANG DISARANKAN

```
                    ┌──────────────┐
                    │   PROFILES   │  (Pusat)
                    └──────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
   ┌──────────┐      ┌──────────┐      ┌──────────────┐
   │ ARTICLES │      │ COMMENTS │      │PORTFOLIO_WORKS│
   └──────────┘      └──────────┘      └──────────────┘
        │                 │
        │                 │
   ┌──────────────┐  ┌──────────────┐
   │ARTICLE_LIKES │  │NOTIFICATIONS │
   └──────────────┘  └──────────────┘
        │
   ┌──────────┐
   │  FOLLOWS │
   └──────────┘

   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
   │CONTENT_REPORTS│  │FEATURED_CONTENT│ │ADMIN_ACTIVITY│
   └──────────────┘  └──────────────┘  │    _LOGS     │
                                      └──────────────┘
   ┌──────────────┐  ┌──────────────┐
   │   SETTINGS   │  │PLATFORM_STATS│
   └──────────────┘  └──────────────┘
```

---

## CHECKLIST VALIDASI ERD

- [x] 12 entitas sesuai database (termasuk PLATFORM_STATISTICS)
- [x] Semua atribut sesuai kolom di database
- [x] Primary key digarisbawahi di setiap entitas
- [x] Foreign key tidak ditulis di entity (hanya di relasi)
- [x] 18 relasi lengkap dengan cardinality yang benar
- [x] Cardinality menggunakan Crow's Foot notation (|, |||, O|, O|||)
- [x] Constraint ON DELETE sudah benar (CASCADE vs SET NULL)
- [x] Unique constraints sudah dicatat
- [x] Check constraints sudah dicatat
- [x] Self-referencing relationship sudah benar (COMMENTS → COMMENTS)
- [x] Many-to-many via junction table sudah benar

---

**ERD ini 100% valid berdasarkan struktur database yang sebenarnya!**

