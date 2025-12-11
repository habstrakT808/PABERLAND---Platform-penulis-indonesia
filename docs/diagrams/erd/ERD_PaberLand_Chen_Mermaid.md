# ERD PaberLand - Chen Notation Murni

## Diagram ERD Chen Notation (Murni - Tanpa ID)

```mermaid
flowchart TB
    %% ============================================
    %% ENTITAS (Chen Notation - Rectangle)
    %% Hanya atribut bisnis, TIDAK ada ID
    %% ============================================
    
    PROFILES["`**PROFILES**<br/>━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br/>full_name<br/>phone<br/>bio<br/>avatar_url<br/>role<br/>is_admin<br/>admin_role<br/>admin_since<br/>last_admin_activity<br/>followers_count<br/>following_count<br/>created_at<br/>updated_at`"]
    
    ARTICLES["`**ARTICLES**<br/>━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br/>title<br/>content<br/>excerpt<br/>cover_image<br/>category<br/>published<br/>scheduled_at<br/>views<br/>likes_count<br/>comments_count<br/>slug<br/>created_at<br/>updated_at`"]
    
    COMMENTS["`**COMMENTS**<br/>━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br/>content<br/>created_at<br/>updated_at`"]
    
    PORTFOLIO["`**PORTFOLIO_WORKS**<br/>━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br/>title<br/>description<br/>category<br/>genre<br/>year_created<br/>status<br/>publisher<br/>isbn<br/>cover_image<br/>external_link<br/>awards<br/>tags<br/>created_at<br/>updated_at`"]
    
    LIKES["`**ARTICLE_LIKES**<br/>━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br/>created_at`"]
    
    FOLLOWS["`**FOLLOWS**<br/>━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br/>created_at`"]
    
    NOTIF["`**NOTIFICATIONS**<br/>━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br/>type<br/>read<br/>created_at`"]
    
    REPORTS["`**CONTENT_REPORTS**<br/>━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br/>content_type<br/>reason<br/>description<br/>status<br/>reviewed_at<br/>admin_notes<br/>created_at`"]
    
    FEATURED["`**FEATURED_CONTENT**<br/>━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br/>content_type<br/>priority<br/>active<br/>featured_at<br/>expires_at`"]
    
    LOGS["`**ADMIN_ACTIVITY_LOGS**<br/>━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br/>action<br/>target_type<br/>target_id<br/>details<br/>ip_address<br/>user_agent<br/>created_at`"]
    
    SETTINGS["`**SETTINGS**<br/>━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br/>key<br/>value<br/>description<br/>category<br/>created_at<br/>updated_at`"]
    
    %% ============================================
    %% ATRIBUT PRIMARY KEY (Oval - Chen Notation)
    %% ============================================
    
    PK_PROFILES(("`<u>id</u>`"))
    PK_ARTICLES(("`<u>id</u>`"))
    PK_COMMENTS(("`<u>id</u>`"))
    PK_PORTFOLIO(("`<u>id</u>`"))
    PK_LIKES(("`<u>id</u>`"))
    PK_FOLLOWS(("`<u>id</u>`"))
    PK_NOTIF(("`<u>id</u>`"))
    PK_REPORTS(("`<u>id</u>`"))
    PK_FEATURED(("`<u>id</u>`"))
    PK_LOGS(("`<u>id</u>`"))
    PK_SETTINGS(("`<u>id</u>`"))
    
    %% ============================================
    %% ATRIBUT UNIQUE (Oval - Chen Notation)
    %% ============================================
    
    UQ_ARTICLES(("`<u>slug</u>`"))
    UQ_SETTINGS(("`<u>key</u>`"))
    
    %% ============================================
    %% RELASI (Chen Notation - Diamond Shape)
    %% ============================================
    
    R1{"`**menulis**`"}
    R2{"`**mengomentari**`"}
    R3{"`**memiliki_portfolio**`"}
    R4{"`**menerima_notif**`"}
    R5{"`**melaporkan**`"}
    R6{"`**meninjau**`"}
    R7{"`**melakukan_log**`"}
    R8{"`**memiliki_comment**`"}
    R9{"`**mendapat_like**`"}
    R10{"`**ditandai_featured**`"}
    R11{"`**menandai_featured**`"}
    R12{"`**melike**`"}
    R13{"`**mengikuti**`"}
    R14{"`**diikuti**`"}
    R15{"`**parent_comment**`"}
    R16{"`**memicu_notif**`"}
    R17{"`**memicu_notif_comment**`"}
    
    %% ============================================
    %% HUBUNGAN ENTITAS - RELASI (Chen Style)
    %% ============================================
    
    %% Relasi dari PROFILES (1:N)
    PROFILES ---|"1"| R1
    R1 ---|"N"| ARTICLES
    
    PROFILES ---|"1"| R2
    R2 ---|"N"| COMMENTS
    
    PROFILES ---|"1"| R3
    R3 ---|"N"| PORTFOLIO
    
    PROFILES ---|"1"| R4
    R4 ---|"N"| NOTIF
    
    PROFILES ---|"1"| R5
    R5 ---|"N"| REPORTS
    
    PROFILES ---|"1"| R6
    R6 ---|"N"| REPORTS
    
    PROFILES ---|"1"| R7
    R7 ---|"N"| LOGS
    
    PROFILES ---|"1"| R11
    R11 ---|"N"| FEATURED
    
    %% Relasi dari ARTICLES (1:N)
    ARTICLES ---|"1"| R8
    R8 ---|"N"| COMMENTS
    
    ARTICLES ---|"1"| R9
    R9 ---|"N"| LIKES
    
    ARTICLES ---|"1"| R10
    R10 ---|"1"| FEATURED
    
    ARTICLES ---|"1"| R16
    R16 ---|"N"| NOTIF
    
    %% Relasi dari COMMENTS (1:N)
    COMMENTS ---|"1"| R15
    R15 ---|"N"| COMMENTS
    
    COMMENTS ---|"1"| R17
    R17 ---|"N"| NOTIF
    
    %% Relasi Many-to-Many (N:M)
    PROFILES ---|"N"| R12
    R12 ---|"N"| LIKES
    
    PROFILES ---|"N"| R13
    R13 ---|"N"| FOLLOWS
    
    PROFILES ---|"N"| R14
    R14 ---|"N"| FOLLOWS
    
    %% ============================================
    %% HUBUNGAN ATRIBUT KE ENTITAS (Chen Style)
    %% ============================================
    
    PK_PROFILES --- PROFILES
    PK_ARTICLES --- ARTICLES
    PK_COMMENTS --- COMMENTS
    PK_PORTFOLIO --- PORTFOLIO
    PK_LIKES --- LIKES
    PK_FOLLOWS --- FOLLOWS
    PK_NOTIF --- NOTIF
    PK_REPORTS --- REPORTS
    PK_FEATURED --- FEATURED
    PK_LOGS --- LOGS
    PK_SETTINGS --- SETTINGS
    
    UQ_ARTICLES --- ARTICLES
    UQ_SETTINGS --- SETTINGS
    
    %% Styling untuk Chen Notation
    classDef entityStyle fill:#e1f5ff,stroke:#01579b,stroke-width:3px,color:#000
    classDef relationshipStyle fill:#fff9c4,stroke:#f57f17,stroke-width:3px,color:#000
    classDef attributeStyle fill:#c8e6c9,stroke:#2e7d32,stroke-width:2px,color:#000
    
    class PROFILES,ARTICLES,COMMENTS,PORTFOLIO,LIKES,FOLLOWS,NOTIF,REPORTS,FEATURED,LOGS,SETTINGS entityStyle
    class R1,R2,R3,R4,R5,R6,R7,R8,R9,R10,R11,R12,R13,R14,R15,R16,R17 relationshipStyle
    class PK_PROFILES,PK_ARTICLES,PK_COMMENTS,PK_PORTFOLIO,PK_LIKES,PK_FOLLOWS,PK_NOTIF,PK_REPORTS,PK_FEATURED,PK_LOGS,PK_SETTINGS,UQ_ARTICLES,UQ_SETTINGS attributeStyle
```

## Penjelasan ERD Chen Notation Murni

### **1. Entitas dan Atributnya**

#### **PROFILES** (User/Penulis)
- **full_name**: Nama lengkap user
- **phone**: Nomor telepon
- **bio**: Bio/deskripsi user
- **avatar_url**: URL foto profil
- **role**: Peran user (default: 'Penulis')
- **is_admin**: Status admin (default: false)
- **admin_role**: Peran admin (jika admin)
- **admin_since**: Kapan menjadi admin
- **last_admin_activity**: Aktivitas admin terakhir
- **followers_count**: Jumlah follower (derived)
- **following_count**: Jumlah following (derived)
- **created_at**: Waktu dibuat
- **updated_at**: Waktu diupdate
- **Primary Key**: `id` (digarisbawahi, ditampilkan sebagai oval terpisah)

#### **ARTICLES** (Artikel)
- **title**: Judul artikel
- **content**: Isi artikel (HTML)
- **excerpt**: Ringkasan artikel
- **cover_image**: URL gambar cover
- **category**: Kategori artikel
- **published**: Status publish (default: false)
- **scheduled_at**: Jadwal publish
- **views**: Jumlah view (derived)
- **likes_count**: Jumlah like (derived)
- **comments_count**: Jumlah komentar (derived)
- **slug**: URL slug unik
- **created_at**: Waktu dibuat
- **updated_at**: Waktu diupdate
- **Primary Key**: `id` (digarisbawahi)
- **Unique**: `slug` (digarisbawahi)

#### **COMMENTS** (Komentar)
- **content**: Isi komentar
- **created_at**: Waktu dibuat
- **updated_at**: Waktu diupdate
- **Primary Key**: `id` (digarisbawahi)

#### **PORTFOLIO_WORKS** (Karya Portofolio)
- **title**: Judul karya
- **description**: Deskripsi karya
- **category**: Kategori karya
- **genre**: Genre karya
- **year_created**: Tahun dibuat
- **status**: Status (default: 'unpublished')
- **publisher**: Penerbit
- **isbn**: ISBN
- **cover_image**: URL gambar cover
- **external_link**: Link eksternal
- **awards**: Array penghargaan
- **tags**: Array tag
- **created_at**: Waktu dibuat
- **updated_at**: Waktu diupdate
- **Primary Key**: `id` (digarisbawahi)

#### **ARTICLE_LIKES** (Junction Table - Like Artikel)
- **created_at**: Waktu like
- **Primary Key**: `id` (digarisbawahi)

#### **FOLLOWS** (Junction Table - Follow User)
- **created_at**: Waktu follow
- **Primary Key**: `id` (digarisbawahi)

#### **NOTIFICATIONS** (Notifikasi)
- **type**: Tipe notifikasi ('follow', 'like', 'comment', 'mention')
- **read**: Status baca (default: false)
- **created_at**: Waktu dibuat
- **Primary Key**: `id` (digarisbawahi)

#### **CONTENT_REPORTS** (Laporan Konten)
- **content_type**: Tipe konten ('article', 'comment', 'user')
- **reason**: Alasan laporan
- **description**: Deskripsi laporan
- **status**: Status ('pending', 'reviewed', 'resolved', 'dismissed')
- **reviewed_at**: Waktu ditinjau
- **admin_notes**: Catatan admin
- **created_at**: Waktu dibuat
- **Primary Key**: `id` (digarisbawahi)

#### **FEATURED_CONTENT** (Konten Unggulan)
- **content_type**: Tipe konten ('article', 'user')
- **priority**: Prioritas tampil (default: 1)
- **active**: Status aktif (default: true)
- **featured_at**: Waktu ditandai
- **expires_at**: Waktu kadaluarsa (optional)
- **Primary Key**: `id` (digarisbawahi)

#### **ADMIN_ACTIVITY_LOGS** (Log Aktivitas Admin)
- **action**: Aksi yang dilakukan
- **target_type**: Tipe target
- **target_id**: ID target
- **details**: Detail aksi (JSON)
- **ip_address**: IP address
- **user_agent**: User agent browser
- **created_at**: Waktu dibuat
- **Primary Key**: `id` (digarisbawahi)

#### **SETTINGS** (Pengaturan Sistem)
- **key**: Key pengaturan (unique)
- **value**: Nilai pengaturan (JSON)
- **description**: Deskripsi pengaturan
- **category**: Kategori (default: 'general')
- **created_at**: Waktu dibuat
- **updated_at**: Waktu diupdate
- **Primary Key**: `id` (digarisbawahi)
- **Unique**: `key` (digarisbawahi)

### **2. Relasi dan Kardinalitasnya**

#### **Relasi One-to-Many (1:N)**

1. **PROFILES (1) --[menulis]-- (N) ARTICLES**
   - Satu user menulis banyak artikel

2. **PROFILES (1) --[mengomentari]-- (N) COMMENTS**
   - Satu user membuat banyak komentar

3. **PROFILES (1) --[memiliki_portfolio]-- (N) PORTFOLIO_WORKS**
   - Satu user memiliki banyak karya portofolio

4. **PROFILES (1) --[menerima_notif]-- (N) NOTIFICATIONS**
   - Satu user menerima banyak notifikasi

5. **PROFILES (1) --[melaporkan]-- (N) CONTENT_REPORTS**
   - Satu user bisa membuat banyak laporan

6. **PROFILES (1) --[meninjau]-- (N) CONTENT_REPORTS**
   - Satu admin bisa meninjau banyak laporan

7. **PROFILES (1) --[melakukan_log]-- (N) ADMIN_ACTIVITY_LOGS**
   - Satu admin melakukan banyak log aktivitas

8. **PROFILES (1) --[menandai_featured]-- (N) FEATURED_CONTENT**
   - Satu admin bisa menandai banyak konten sebagai featured

9. **ARTICLES (1) --[memiliki_comment]-- (N) COMMENTS**
   - Satu artikel memiliki banyak komentar

10. **ARTICLES (1) --[mendapat_like]-- (N) ARTICLE_LIKES**
    - Satu artikel mendapat banyak like

11. **ARTICLES (1) --[memicu_notif]-- (N) NOTIFICATIONS**
    - Satu artikel bisa memicu banyak notifikasi

12. **COMMENTS (1) --[parent_comment]-- (N) COMMENTS**
    - Satu komentar bisa punya banyak komentar child (nested comments)

13. **COMMENTS (1) --[memicu_notif_comment]-- (N) NOTIFICATIONS**
    - Satu komentar bisa memicu banyak notifikasi

#### **Relasi One-to-One (1:1)**

14. **ARTICLES (1) --[ditandai_featured]-- (1) FEATURED_CONTENT**
    - Satu artikel maksimal satu featured content

#### **Relasi Many-to-Many (N:M)**

15. **PROFILES (N) --[melike]-- (N) ARTICLE_LIKES --[mendapat_like]-- (N) ARTICLES**
    - Banyak user bisa like banyak artikel

16. **PROFILES (N) --[mengikuti]-- (N) FOLLOWS --[diikuti]-- (N) PROFILES**
    - Banyak user bisa follow banyak user lain

### **3. Ringkasan Alur Data**

- **PROFILES** adalah entitas sentral yang menulis artikel, membuat komentar, memiliki portofolio, dan terlibat dalam semua aktivitas
- **ARTICLES** adalah konten utama yang mendapat komentar, like, dan bisa ditandai sebagai featured
- **COMMENTS** mendukung nested comments (parent-child relationship)
- **NOTIFICATIONS** dikirim otomatis via trigger saat ada follow, like, atau comment
- **ADMIN** (via PROFILES dengan is_admin=true) mengelola featured content, meninjau laporan, dan melakukan logging aktivitas
