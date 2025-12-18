# Class Diagram Simple - Platform PaberLand

Diagram ini menggambarkan struktur class diagram Platform PaberLand dalam versi yang sangat sederhana, mengikuti pola inheritance seperti contoh yang diberikan.

## Struktur Diagram

Diagram ini terdiri dari 2 bagian utama:
1. **Controller/API Layer**: Base class Controller dengan class-class turunan untuk menangani HTTP requests
2. **Model Layer**: Base class Model dengan class-class turunan untuk representasi data

## Penjelasan Diagram

### Gambar 5.1 Rancangan Class Diagram Controller

Class diagram controller menggambarkan struktur pengendali sistem pada Platform PaberLand yang menggunakan pola pewarisan dengan kelas dasar `Controller` sebagai kelas abstrak. Diagram controller dibagi menjadi dua bagian yaitu controller fungsional (Gambar 5.1) yang terdiri dari delapan pengendali untuk fitur utama pengguna seperti `ArticleController`, `AuthController`, `CommentController`, `LikeController`, `ProfileController`, `PortfolioController`, `BerandaController`, dan `SearchController`, serta controller administrasi (Gambar 5.2) yang terdiri dari lima pengendali untuk fitur admin seperti `UserController`, `ReportController`, `FeaturedController`, `AnalyticsController`, dan `LogsController`. Semua pengendali mewarisi operasi dasar dari kelas `Controller` seperti `handleRequest()`, `validateRequest()`, `sendResponse()`, `handleError()`, `authenticate()`, dan `authorize()` untuk menjaga konsistensi implementasi sistem.

### Gambar 5.3 Rancangan Class Diagram Model

Class diagram model menggambarkan struktur data yang digunakan pada Platform PaberLand yang menggunakan pola pewarisan dengan kelas dasar `Model` sebagai kelas abstrak. Diagram model dibagi menjadi dua bagian yaitu model inti (Gambar 5.3) yang terdiri dari enam model utama yaitu `Article`, `Profile`, `Comment`, `ArticleLike`, `Notification`, dan `ContentReport` yang merepresentasikan data dan operasi inti platform, serta model pendukung (Gambar 5.4) yang terdiri dari enam model yaitu `PortfolioWork`, `FeaturedContent`, `Analytics`, `Logs`, `Konten`, dan `Auth` yang menyediakan fitur pendukung seperti portofolio, konten featured, analytics, activity logs, konten beranda, dan autentikasi. Semua model mewarisi operasi dasar dari kelas `Model` seperti `all()`, `find()`, `save()`, dan `delete()` untuk memastikan konsistensi dalam operasi database.

## Cara Menggunakan

1. Buka [Mermaid Live Editor](https://mermaid.live)
2. Copy kode Mermaid di bawah ini
3. Paste ke editor
4. Export sebagai PNG dengan nama `bab5-class-diagram-simple.png`

## Kode Mermaid

### Gambar 5.1 Rancangan Class Diagram Controller - Controller Fungsional

```mermaid
classDiagram
    direction TB
    
    class Controller {
        <<abstract>>
        +handleRequest()
        +validateRequest()
        +sendResponse()
        +handleError()
        +authenticate()
        +authorize()
    }
    
    class ArticleController {
        +simpanArtikel(data, status)
        +publikasikanArtikel(artikelId)
        +validasiArtikel()
        +muatDataArtikel(artikelId)
        +muatDetailArtikel(slug)
        +updateArtikel(artikelId, data)
        +hapusArtikel(artikelId)
    }
    
    class AuthController {
        +login(email, password)
        +daftarAkun(email, password, nama)
        +daftarDenganGoogle()
        +redirectKeGoogle()
        +logout()
        +resetPassword()
    }
    
    class CommentController {
        +tambahKomentar(artikelId, komentar)
        +getComments(articleId)
        +updateComment(id)
        +deleteComment(id)
        +getCommentCount(articleId)
    }
    
    class LikeController {
        +toggleLike(artikelId)
        +getLikes(articleId)
        +checkLiked(articleId)
    }
    
    class ProfileController {
        +muatDataProfil()
        +updateProfil(data)
    }
    
    class PortfolioController {
        +simpanPortofolio(data)
    }
    
    class BerandaController {
        +muatKontenBeranda()
    }
    
    class SearchController {
        +search()
        +searchArticles(query)
        +searchUsers(query)
        +searchCategories(query)
    }
    
    Controller <|-- ArticleController
    Controller <|-- AuthController
    Controller <|-- CommentController
    Controller <|-- LikeController
    Controller <|-- ProfileController
    Controller <|-- PortfolioController
    Controller <|-- BerandaController
    Controller <|-- SearchController
```

### Gambar 5.2 Rancangan Class Diagram Controller - Controller Administrasi

```mermaid
classDiagram
    direction TB
    
    class Controller {
        <<abstract>>
        +handleRequest()
        +validateRequest()
        +sendResponse()
        +handleError()
        +authenticate()
        +authorize()
    }
    
    class UserController {
        +muatDaftarPengguna()
        +ubahRole(userId, roleBaru)
        +toggleBan(userId)
        +getUserById(id)
        +getProfile(id)
    }
    
    class ReportController {
        +kirimLaporan(artikelId, alasan, detail)
        +muatDaftarLaporan()
        +muatDetailLaporan(laporanId)
        +terimaLaporan(laporanId)
        +tolakLaporan(laporanId)
    }
    
    class FeaturedController {
        +muatDaftarFeatured()
        +tambahFeatured(artikelId)
    }
    
    class AnalyticsController {
        +muatDataAnalytics()
        +muatDataAnalytics(tanggalMulai, tanggalAkhir)
    }
    
    class LogsController {
        +muatActivityLogs()
        +filterLogs(kriteria)
        +muatDetailLog(logId)
    }
    
    Controller <|-- UserController
    Controller <|-- ReportController
    Controller <|-- FeaturedController
    Controller <|-- AnalyticsController
    Controller <|-- LogsController
```

### Gambar 5.3 Rancangan Class Diagram Model - Model Inti

```mermaid
classDiagram
    direction TB
    
    class Model {
        <<abstract>>
        +all()
        +find(id)
        +save()
        +delete()
    }
    
    class Article {
        #table: articles
        +id: uuid
        +title: string
        +content: string
        +excerpt: string
        +category: string
        +author_id: uuid
        +published: boolean
        +slug: string
        +views: number
        +likes_count: number
        +comments_count: number
        +created_at: timestamp
        +updated_at: timestamp
        +all()
        +find(id)
        +save()
        +delete()
        +simpanArtikelBaru(data, status)
        +publikasikanArtikel(artikelId)
        +ambilArtikel(slug)
        +ambilArtikel(artikelId)
        +perbaruiArtikel(artikelId, data)
        +ambilDaftarFeatured()
        +cekStatusFeatured(artikelId)
        +setFeatured(artikelId)
        +findByAuthor(authorId)
        +findByCategory(category)
    }
    
    class Profile {
        #table: profiles
        +id: uuid
        +full_name: string
        +email: string
        +bio: string
        +avatar_url: string
        +role: string
        +is_admin: boolean
        +created_at: timestamp
        +updated_at: timestamp
        +all()
        +find(id)
        +save()
        +delete()
        +create(data)
        +update(id, data)
        +ambilDataProfil()
        +perbaruiProfil(data)
        +ambilSemuaPengguna()
        +updateRole(userId, roleBaru)
        +updateStatusBan(userId)
        +findByEmail(email)
        +getUserStats(id)
    }
    
    class Comment {
        #table: comments
        +id: uuid
        +article_id: uuid
        +author_id: uuid
        +content: string
        +parent_id: uuid
        +created_at: timestamp
        +updated_at: timestamp
        +all()
        +find(id)
        +save()
        +delete()
        +create(data)
        +update(id, data)
        +simpanKomentar(artikelId, komentar)
        +findByArticle(articleId)
        +findByAuthor(authorId)
        +getNestedComments(articleId)
        +getCommentCount(articleId)
    }
    
    class ArticleLike {
        #table: article_likes
        +id: uuid
        +article_id: uuid
        +user_id: uuid
        +created_at: timestamp
        +all()
        +find(id)
        +save()
        +delete()
        +create(data)
        +tambahLike(artikelId)
        +hapusLike(artikelId)
        +checkLiked(articleId, userId)
        +getLikesCount(articleId)
        +findByArticle(articleId)
        +findByUser(userId)
    }
    
    class Notification {
        #table: notifications
        +id: uuid
        +type: string
        +actor_id: uuid
        +target_id: uuid
        +article_id: uuid
        +read: boolean
        +created_at: timestamp
        +all()
        +find(id)
        +save()
        +delete()
        +create(data)
        +findByTarget(targetId)
        +getUnreadCount(targetId)
        +markAsRead(id)
        +markAllAsRead(targetId)
    }
    
    class ContentReport {
        #table: content_reports
        +id: uuid
        +content_id: uuid
        +content_type: string
        +reporter_id: uuid
        +reason: string
        +status: string
        +reviewed_by: uuid
        +created_at: timestamp
        +all()
        +find(id)
        +save()
        +delete()
        +create(data)
        +update(id, data)
        +ambilLaporan()
        +ambilDetailLaporan(laporanId)
        +findByStatus(status)
        +findByContent(contentId, contentType)
        +resolveReport(id, reviewerId)
        +rejectReport(id, reviewerId)
    }
    
    Model <|-- Article
    Model <|-- Profile
    Model <|-- Comment
    Model <|-- ArticleLike
    Model <|-- Notification
    Model <|-- ContentReport
```

### Gambar 5.4 Rancangan Class Diagram Model - Model Pendukung

```mermaid
classDiagram
    direction TB
    
    class Model {
        <<abstract>>
        +all()
        +find(id)
        +save()
        +delete()
    }
    
    class PortfolioWork {
        #table: portfolio_works
        +id: uuid
        +author_id: uuid
        +title: string
        +description: string
        +category: string
        +cover_image: string
        +created_at: timestamp
        +updated_at: timestamp
        +all()
        +find(id)
        +save()
        +delete()
        +create(data)
        +update(id, data)
        +simpanPortofolioBaru(data)
        +findByAuthor(authorId)
        +findByCategory(category)
    }
    
    class FeaturedContent {
        #table: featured_content
        +id: uuid
        +content_type: string
        +content_id: uuid
        +featured_by: uuid
        +priority: number
        +active: boolean
        +created_at: timestamp
        +all()
        +find(id)
        +save()
        +delete()
        +create(data)
        +update(id, data)
        +getActive()
        +findByContent(contentId, contentType)
        +addFeatured(contentId, contentType, featuredBy)
        +removeFeatured(id)
    }
    
    class Analytics {
        +all()
        +find(id)
        +save()
        +delete()
        +ambilStatistik()
        +ambilGrafikPertumbuhan()
        +ambilGrafikKategori()
        +ambilArtikelPopuler()
        +ambilStatistikPeriode(tanggalMulai, tanggalAkhir)
    }
    
    class Logs {
        +all()
        +find(id)
        +save()
        +delete()
        +ambilActivityLogs()
        +cariLogs(kriteria)
        +ambilDetailLog(logId)
    }
    
    class Konten {
        +all()
        +find(id)
        +save()
        +delete()
        +ambilKontenPilihan()
        +ambilArtikelTerbaru()
        +ambilDaftarKategori()
    }
    
    class Auth {
        +all()
        +find(id)
        +save()
        +delete()
        +cocokkanKredensial(email, password)
        +validasiDaftar(email, password)
        +redirectKeGoogle()
    }
    
    Model <|-- PortfolioWork
    Model <|-- FeaturedContent
    Model <|-- Analytics
    Model <|-- Logs
    Model <|-- Konten
    Model <|-- Auth
```

