# Class Diagram Database Models

Diagram ini menggambarkan struktur model data yang merepresentasikan entitas dalam database PostgreSQL. Setiap model sesuai dengan tabel dalam ERD yang telah dibuat pada BAB 4. Class diagram database models terdiri dari:

1. **Core User Models**: ProfileModel yang menyimpan data profil pengguna termasuk informasi personal (full_name, bio, avatar_url), role dalam komunitas (role), dan informasi admin (is_admin, admin_role, admin_since). Model ini menjadi pusat relasi dengan model lainnya.

2. **Content Models**: ArticleModel yang menyimpan data artikel (title, content, excerpt, category, cover_image, slug, status published/scheduled), dan PortfolioWorkModel yang menyimpan data portofolio karya penulis (buku, ilustrasi, dll) dengan informasi lengkap seperti publisher, ISBN, awards, dan external link.

3. **Interaction Models**: CommentModel untuk komentar berulir dengan parent_id untuk mendukung nested comments, dan ArticleLikeModel untuk relasi many-to-many antara pengguna dan artikel yang disukai.

4. **Notification Models**: NotificationModel yang menyimpan notifikasi sistem untuk berbagai jenis aktivitas (like, comment) dengan relasi ke actor (yang melakukan aksi) dan target (yang menerima notifikasi).

5. **Moderation Models**: ContentReportModel untuk laporan konten dari pengguna dengan status pending/resolved/rejected, dan AdminActivityLogModel untuk mencatat semua aktivitas admin termasuk action, target, dan metadata (IP address, user agent).

6. **Feature Models**: FeaturedContentModel untuk mengelola konten yang ditampilkan di homepage dengan priority dan expiry date, dan SettingsModel untuk pengaturan platform yang disimpan sebagai key-value pairs dengan kategori.

Relasi one-to-many (1 --> *) menunjukkan bahwa satu ProfileModel dapat memiliki banyak ArticleModel, CommentModel, PortfolioWorkModel, dan model lainnya. ArticleModel memiliki relasi one-to-many dengan CommentModel dan ArticleLikeModel. CommentModel memiliki relasi self-referencing untuk mendukung komentar berulir. Setiap model menggunakan UUID sebagai primary key dan timestamp untuk created_at dan updated_at untuk tracking perubahan data.

## Cara Menggunakan

1. Buka [Mermaid Live Editor](https://mermaid.live)
2. Copy kode Mermaid di bawah ini
3. Paste ke editor
4. Export sebagai PNG dengan nama `bab5-class-diagram-models.png`

## Kode Mermaid

```mermaid
classDiagram
    %% Core Models
    class ProfileModel {
        +id: uuid
        +full_name: string
        +phone: string | null
        +bio: string | null
        +avatar_url: string | null
        +role: string
        +is_admin: boolean
        +admin_role: string | null
        +admin_since: timestamp | null
        +last_admin_activity: timestamp | null
        +created_at: timestamp
        +updated_at: timestamp
    }
    
    class ArticleModel {
        +id: uuid
        +title: string
        +content: string
        +excerpt: string | null
        +cover_image: string | null
        +category: string
        +author_id: uuid
        +published: boolean
        +scheduled_at: timestamp | null
        +slug: string
        +views: number
        +likes_count: number
        +comments_count: number
        +created_at: timestamp
        +updated_at: timestamp
    }
    
    class CommentModel {
        +id: uuid
        +article_id: uuid
        +author_id: uuid
        +content: string
        +parent_id: uuid | null
        +created_at: timestamp
        +updated_at: timestamp
    }
    
    class ArticleLikeModel {
        +id: uuid
        +article_id: uuid
        +user_id: uuid
        +created_at: timestamp
    }
    
    class PortfolioWorkModel {
        +id: uuid
        +author_id: uuid
        +title: string
        +description: string | null
        +category: string
        +genre: string | null
        +year_created: number | null
        +status: string
        +publisher: string | null
        +isbn: string | null
        +cover_image: string | null
        +external_link: string | null
        +awards: string[]
        +tags: string[]
        +created_at: timestamp
        +updated_at: timestamp
    }
    
    class NotificationModel {
        +id: uuid
        +type: string
        +actor_id: uuid
        +target_id: uuid
        +article_id: uuid | null
        +comment_id: uuid | null
        +read: boolean
        +created_at: timestamp
    }
    
    class ContentReportModel {
        +id: uuid
        +reporter_id: uuid
        +content_type: string
        +content_id: uuid
        +reason: string
        +description: string | null
        +status: string
        +reviewed_by: uuid | null
        +reviewed_at: timestamp | null
        +admin_notes: string | null
        +created_at: timestamp
    }
    
    class FeaturedContentModel {
        +id: uuid
        +content_type: string
        +content_id: uuid
        +featured_by: uuid
        +featured_at: timestamp
        +expires_at: timestamp | null
        +priority: number
        +active: boolean
    }
    
    class AdminActivityLogModel {
        +id: uuid
        +admin_id: uuid
        +action: string
        +target_type: string
        +target_id: uuid
        +details: jsonb
        +ip_address: string | null
        +user_agent: string | null
        +created_at: timestamp
    }
    
    class SettingsModel {
        +id: uuid
        +key: string
        +value: jsonb
        +description: string | null
        +category: string
        +created_at: timestamp
        +updated_at: timestamp
    }
    
    %% Relationships - One-to-Many
    ProfileModel "1" --> "*" ArticleModel : author_id
    ProfileModel "1" --> "*" CommentModel : author_id
    ProfileModel "1" --> "*" PortfolioWorkModel : author_id
    ProfileModel "1" --> "*" NotificationModel : target_id
    ProfileModel "1" --> "*" NotificationModel : actor_id
    ProfileModel "1" --> "*" ContentReportModel : reporter_id
    ProfileModel "1" --> "*" ContentReportModel : reviewed_by
    ProfileModel "1" --> "*" FeaturedContentModel : featured_by
    ProfileModel "1" --> "*" AdminActivityLogModel : admin_id
    
    ArticleModel "1" --> "*" CommentModel : article_id
    ArticleModel "1" --> "*" ArticleLikeModel : article_id
    ArticleModel "1" --> "*" NotificationModel : article_id
    ArticleModel "1" --> "*" ContentReportModel : content_id
    ArticleModel "1" --> "*" FeaturedContentModel : content_id
    
    CommentModel "1" --> "*" CommentModel : parent_id
    CommentModel "1" --> "*" NotificationModel : comment_id
    
    ProfileModel "1" --> "*" ArticleLikeModel : user_id
```

