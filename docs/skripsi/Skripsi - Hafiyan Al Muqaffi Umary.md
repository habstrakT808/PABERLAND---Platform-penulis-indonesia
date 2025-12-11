**PENGEMBANGAN PLATFORM KOMUNITAS PENULIS LITERASI ANAK PABERLAND BERBASIS WEB MENGGUNAKAN FRAMEWORK NEXT.JS DAN POSTGRESQL UNTUK PUBLIKASI DAN MANAJEMEN KARYA LITERASI ANAK**

Disusun oleh:\
**Hafiyan Al Muqaffi Umary**\
NIM: 225150207111117

![LambangUB-Baru-Kecil.jpg](docs/skripsi/media/image1.jpg){width="1.96875in" height="1.96875in"}

**PROGRAM STUDI TEKNIK INFORMATIKA**\
**DEPARTEMEN TEKNIK INFORMATIKA**\
**FAKULTAS ILMU KOMPUTER**\
**UNIVERSITAS BRAWIJAYA**\
**MALANG**\
**2025**

# DAFTAR ISI

[DAFTAR ISI [ii](#daftar-isi)](#daftar-isi)

[DAFTAR TABEL [ix](#_Toc215957572)](#_Toc215957572)

[DAFTAR GAMBAR [xi](#daftar-gambar)](#daftar-gambar)

[DAFTAR LAMPIRAN [xv](#daftar-lampiran)](#daftar-lampiran)

[BAB 1 PENDAHULUAN [1](#bab-1-pendahuluan)](#bab-1-pendahuluan)

[1.1 Latar Belakang [1](#latar-belakang)](#latar-belakang)

[1.2 Rumusan Masalah [2](#rumusan-masalah)](#rumusan-masalah)

[1.3 Tujuan [2](#tujuan)](#tujuan)

[1.4 Manfaat [3](#manfaat)](#manfaat)

[1.5 Batasan Masalah [3](#batasan-masalah)](#batasan-masalah)

[1.6 Sistematika Pembahasan [4](#sistematika-pembahasan)](#sistematika-pembahasan)

[BAB 2 [6](#bab-2)](#bab-2)

[2.1 Rekayasa Perangkat Lunak [6](#rekayasa-perangkat-lunak)](#rekayasa-perangkat-lunak)

[2.2 Model Pengembangan Sistem [6](#model-pengembangan-sistem)](#model-pengembangan-sistem)

[2.2.1 Model Prototyping [6](#model-prototyping)](#model-prototyping)

[2.2.2 Perbandingan Model Proses [7](#perbandingan-model-proses)](#perbandingan-model-proses)

[2.3 Teknologi Pengembangan Aplikasi Web Modern [8](#teknologi-pengembangan-aplikasi-web-modern)](#teknologi-pengembangan-aplikasi-web-modern)

[2.3.1 Framework Next.js [8](#framework-next.js)](#framework-next.js)

[2.3.2 Basis Data PostgreSQL dan Supabase [9](#basis-data-postgresql-dan-supabase)](#basis-data-postgresql-dan-supabase)

[2.4 Arsitektur Sistem Platform Komunitas [9](#arsitektur-sistem-platform-komunitas)](#arsitektur-sistem-platform-komunitas)

[2.5 Pengujian Perangkat Lunak [10](#pengujian-perangkat-lunak)](#pengujian-perangkat-lunak)

[2.6 Standar Kualitas Perangkat Lunak ISO/IEC 25010 [10](#standar-kualitas-perangkat-lunak-isoiec-25010)](#standar-kualitas-perangkat-lunak-isoiec-25010)

[2.7 Platform Komunitas Online dan Keterlibatan Pengguna [11](#platform-komunitas-online-dan-keterlibatan-pengguna)](#platform-komunitas-online-dan-keterlibatan-pengguna)

[BAB 3 METODOLOGI [13](#bab-3-metodologi)](#bab-3-metodologi)

[3.1 Tipe Penelitian [13](#tipe-penelitian)](#tipe-penelitian)

[3.2 Model Pengembangan Sistem [13](#model-pengembangan-sistem-1)](#model-pengembangan-sistem-1)

[3.3 Objek Penelitian [14](#objek-penelitian)](#objek-penelitian)

[3.4 Instrumen Penelitian [15](#instrumen-penelitian)](#instrumen-penelitian)

[3.4.1 Tahap Analisis Kebutuhan Sistem [15](#tahap-analisis-kebutuhan-sistem)](#tahap-analisis-kebutuhan-sistem)

[3.4.2 Tahap Perancangan Sistem [16](#tahap-perancangan-sistem)](#tahap-perancangan-sistem)

[3.4.3 Tahap Implementasi Sistem [17](#tahap-implementasi-sistem)](#tahap-implementasi-sistem)

[3.4.4 Tahap Pengujian Sistem [18](#tahap-pengujian-sistem)](#tahap-pengujian-sistem)

[3.5 Instrumen Penelitian [19](#instrumen-penelitian-1)](#instrumen-penelitian-1)

[3.6 Teknik Pengumpulan Data [20](#teknik-pengumpulan-data)](#teknik-pengumpulan-data)

[3.7 Teknik Analisis Data [21](#teknik-analisis-data)](#teknik-analisis-data)

[BAB 4 REKAYASA KEBUTUHAN [23](#bab-4-rekayasa-kebutuhan)](#bab-4-rekayasa-kebutuhan)

[4.1 Elisitasi Kebutuhan [23](#elisitasi-kebutuhan)](#elisitasi-kebutuhan)

[4.2 Identifikasi Pengguna Awal [25](#identifikasi-pengguna-awal)](#identifikasi-pengguna-awal)

[4.3 Analisis Kebutuhan dengan Prototyping [27](#analisis-kebutuhan-dengan-prototyping)](#analisis-kebutuhan-dengan-prototyping)

[4.3.1 Prototyping Iterasi 1 [27](#prototyping-iterasi-1)](#prototyping-iterasi-1)

[4.3.2 Prototyping Iterasi 2 [48](#prototyping-iterasi-2)](#prototyping-iterasi-2)

[4.4 Hasil Analisis Kebutuhan [107](#hasil-analisis-kebutuhan)](#hasil-analisis-kebutuhan)

[4.4.1 Kebutuhan Pengguna [108](#kebutuhan-pengguna)](#kebutuhan-pengguna)

[4.4.2 Aktivitas Sistem [111](#aktivitas-sistem)](#aktivitas-sistem)

[4.5 Identifikasi Pengguna Akhir [114](#identifikasi-pengguna-akhir)](#identifikasi-pengguna-akhir)

[4.6 Kebutuhan Fungsional dan Non-Fungsional [116](#kebutuhan-fungsional-dan-non-fungsional)](#kebutuhan-fungsional-dan-non-fungsional)

[4.6.1 Daftar Kebutuhan Fungsional [116](#daftar-kebutuhan-fungsional)](#daftar-kebutuhan-fungsional)

[4.6.2 Daftar Kebutuhan Non-Fungsional [120](#daftar-kebutuhan-non-fungsional)](#daftar-kebutuhan-non-fungsional)

[4.7 Use Case Diagram [122](#use-case-diagram)](#use-case-diagram)

[4.8 Use Case Scenario [127](#use-case-scenario)](#use-case-scenario)

[4.8.1 Use Case Daftar Akun Baru [128](#use-case-daftar-akun-baru)](#use-case-daftar-akun-baru)

[4.8.2 Use Case Login Pengguna [130](#use-case-login-pengguna)](#use-case-login-pengguna)

[4.8.3 Use Case Reset Password [132](#use-case-reset-password)](#use-case-reset-password)

[4.8.4 Use Case Lihat Beranda (Homepage) [135](#use-case-lihat-beranda-homepage)](#use-case-lihat-beranda-homepage)

[4.8.5 Use Case Jelajahi Kategori [137](#use-case-jelajahi-kategori)](#use-case-jelajahi-kategori)

[4.8.6 Use Case Baca Artikel [139](#use-case-baca-artikel)](#use-case-baca-artikel)

[4.8.7 Use Case Cari Konten [141](#use-case-cari-konten)](#use-case-cari-konten)

[4.8.8 Use Case Tulis Artikel Baru [143](#use-case-tulis-artikel-baru)](#use-case-tulis-artikel-baru)

[4.8.9 Use Case Publikasikan Artikel [146](#use-case-publikasikan-artikel)](#use-case-publikasikan-artikel)

[4.8.10 Use Case Edit Artikel [148](#use-case-edit-artikel)](#use-case-edit-artikel)

[4.8.11 Use Case Hapus Artikel [150](#use-case-hapus-artikel)](#use-case-hapus-artikel)

[4.8.12 Use Case Kelola Artikel Saya [152](#use-case-kelola-artikel-saya)](#use-case-kelola-artikel-saya)

[4.8.13 Use Case Like Artikel [154](#use-case-like-artikel)](#use-case-like-artikel)

[4.8.14 Use Case Komentar Artikel [156](#use-case-komentar-artikel)](#use-case-komentar-artikel)

[4.8.15 Use Case Laporkan Konten [158](#use-case-laporkan-konten)](#use-case-laporkan-konten)

[4.8.16 Use Case Tinjau Laporan Konten (Moderator) [159](#use-case-tinjau-laporan-konten-moderator)](#use-case-tinjau-laporan-konten-moderator)

[4.8.17 Use Case Tambah Konten Featured (Moderator) [162](#use-case-tambah-konten-featured-moderator)](#use-case-tambah-konten-featured-moderator)

[4.8.18 Use Case Kelola Pengguna (Administrator) [164](#use-case-kelola-pengguna-administrator)](#use-case-kelola-pengguna-administrator)

[4.8.19 Use Case Lihat Analytics (Administrator/Moderator) [166](#use-case-lihat-analytics-administratormoderator)](#use-case-lihat-analytics-administratormoderator)

[4.8.20 Use Case Lihat Activity Logs (Administrator) [168](#use-case-lihat-activity-logs-administrator)](#use-case-lihat-activity-logs-administrator)

[4.8.21 Use Case Tambah Portofolio [170](#use-case-tambah-portofolio)](#use-case-tambah-portofolio)

[4.8.22 Use Case Lihat Profil Member [172](#use-case-lihat-profil-member)](#use-case-lihat-profil-member)

[4.8.23 Use Case Edit Profil [174](#use-case-edit-profil)](#use-case-edit-profil)

[4.8.24 Use Case Lihat Direktori Member [176](#use-case-lihat-direktori-member)](#use-case-lihat-direktori-member)

[4.8.25 Use Case Lihat Halaman Tentang [178](#use-case-lihat-halaman-tentang)](#use-case-lihat-halaman-tentang)

[4.8.26 Use Case Logout [180](#use-case-logout)](#use-case-logout)

[4.9 Entity Relationship Diagram (ERD) [183](#entity-relationship-diagram-erd)](#entity-relationship-diagram-erd)

[BAB 5 PERANCANGAN SISTEM [187](#bab-5-perancangan-sistem)](#bab-5-perancangan-sistem)

[5.1 Class Diagram [187](#class-diagram)](#class-diagram)

[5.1.1 Class Diagram Komponen Frontend [187](#class-diagram-komponen-frontend)](#class-diagram-komponen-frontend)

[5.1.2 Class Diagram API Routes dan Services [189](#class-diagram-api-routes-dan-services)](#class-diagram-api-routes-dan-services)

[5.1.3 Class Diagram Database Models [191](#class-diagram-database-models)](#class-diagram-database-models)

[5.2 Sequence Diagram [193](#sequence-diagram)](#sequence-diagram)

[5.2.1 Sequence Diagram Daftar Akun [193](#sequence-diagram-daftar-akun)](#sequence-diagram-daftar-akun)

[5.2.2 Sequence Diagram Login [196](#sequence-diagram-login)](#sequence-diagram-login)

[5.2.3 Sequence Diagram Reset Password [198](#sequence-diagram-reset-password)](#sequence-diagram-reset-password)

[5.2.4 Sequence Diagram Melihat Beranda [200](#sequence-diagram-melihat-beranda)](#sequence-diagram-melihat-beranda)

[5.2.5 Sequence Diagram Melihat Kategori [202](#sequence-diagram-melihat-kategori)](#sequence-diagram-melihat-kategori)

[5.2.6 Sequence Diagram Baca Artikel [205](#sequence-diagram-baca-artikel)](#sequence-diagram-baca-artikel)

[5.2.7 Sequence Diagram Cari Konten [207](#sequence-diagram-cari-konten)](#sequence-diagram-cari-konten)

[5.2.8 Sequence Diagram Tulis Artikel Baru [211](#sequence-diagram-tulis-artikel-baru)](#sequence-diagram-tulis-artikel-baru)

[5.2.9 Sequence Diagram Publikasikan Artikel [214](#sequence-diagram-publikasikan-artikel)](#sequence-diagram-publikasikan-artikel)

[5.2.10 Sequence Diagram Edit Artikel [216](#sequence-diagram-edit-artikel)](#sequence-diagram-edit-artikel)

[5.2.11 Sequence Diagram Hapus Artikel [219](#sequence-diagram-hapus-artikel)](#sequence-diagram-hapus-artikel)

[5.2.12 Sequence Diagram Kelola Artikel Saya [221](#sequence-diagram-kelola-artikel-saya)](#sequence-diagram-kelola-artikel-saya)

[5.2.13 Sequence Diagram Like Artikel [225](#sequence-diagram-like-artikel)](#sequence-diagram-like-artikel)

[5.2.14 Sequence Diagram Komentar Artikel [227](#sequence-diagram-komentar-artikel)](#sequence-diagram-komentar-artikel)

[5.2.15 Sequence Diagram Laporkan Konten [230](#sequence-diagram-laporkan-konten)](#sequence-diagram-laporkan-konten)

[5.2.16 Sequence Diagram Tinjau Laporan Konten (Moderator) [232](#sequence-diagram-tinjau-laporan-konten-moderator)](#sequence-diagram-tinjau-laporan-konten-moderator)

[5.2.17 Sequence Diagram Case Tambah Konten Featured [236](#sequence-diagram-case-tambah-konten-featured-moderator)](#sequence-diagram-case-tambah-konten-featured-moderator)

[5.2.18 Sequence Diagram Kelola Pengguna (Administrator) [239](#sequence-diagram-kelola-pengguna-administrator)](#sequence-diagram-kelola-pengguna-administrator)

[5.2.19 Sequence Diagram Lihat Analytics (Administrator/Moderator) [242](#sequence-diagram-lihat-analytics-administratormoderator)](#sequence-diagram-lihat-analytics-administratormoderator)

[5.2.20 Sequence Diagram Lihat Activity Logs (Administrator) [244](#sequence-diagram-lihat-activity-logs-administrator)](#sequence-diagram-lihat-activity-logs-administrator)

[5.2.21 Sequence Diagram Tambah Portofolio [248](#sequence-diagram-tambah-portofolio)](#sequence-diagram-tambah-portofolio)

[5.2.22 Sequence Diagram Lihat Profil Member [251](#sequence-diagram-lihat-profil-member)](#sequence-diagram-lihat-profil-member)

[5.2.23 Sequence Diagram Edit Profil [254](#sequence-diagram-edit-profil)](#sequence-diagram-edit-profil)

[5.2.24 Sequence Diagram Lihat Direktori Member [257](#sequence-diagram-lihat-direktori-member)](#sequence-diagram-lihat-direktori-member)

[5.2.25 Sequence Diagram Lihat Halaman Tentang [260](#sequence-diagram-lihat-halaman-tentang)](#sequence-diagram-lihat-halaman-tentang)

[5.2.26 Sequence Diagram Logout [262](#sequence-diagram-logout)](#sequence-diagram-logout)

[5.3 Physical Database Design (PDD) [265](#physical-database-design-pdd)](#physical-database-design-pdd)

[5.3.1 Tabel profiles [267](#tabel-profiles)](#tabel-profiles)

[5.3.2 Tabel articles [269](#tabel-articles)](#tabel-articles)

[5.3.3 Tabel comments [271](#tabel-comments)](#tabel-comments)

[5.3.4 Tabel article_likes [272](#tabel-article_likes)](#tabel-article_likes)

[5.3.5 Tabel portfolio_works [273](#tabel-portfolio_works)](#tabel-portfolio_works)

[5.3.6 Tabel notifications [274](#tabel-notifications)](#tabel-notifications)

[5.3.7 Tabel content_reports [276](#tabel-content_reports)](#tabel-content_reports)

[5.3.9 Tabel featured_content [279](#tabel-featured_content)](#tabel-featured_content)

[5.3.10 Tabel admin_activity_logs [280](#tabel-admin_activity_logs)](#tabel-admin_activity_logs)

[5.3.11 Tabel settings [282](#tabel-settings)](#tabel-settings)

[5.3.12 Konfigurasi Database [283](#konfigurasi-database)](#konfigurasi-database)

[BAB 6 IMPLEMENTASI [284](#bab-6-implementasi)](#bab-6-implementasi)

[6.1 Login [284](#login)](#login)

[6.2 Register [285](#register)](#register)

[6.3 Logout [286](#logout)](#logout)

[6.4 Reset Password [287](#reset-password)](#reset-password)

[6. 5 Tambah Artikel [288](#tambah-artikel)](#tambah-artikel)

[3.6 Update Artikel [291](#update-artikel)](#update-artikel)

[6.7 Hapus Artikel [292](#hapus-artikel)](#hapus-artikel)

[6.8 Tambah Komentar [292](#tambah-komentar)](#tambah-komentar)

[6.9 Update Komentar [293](#update-komentar)](#update-komentar)

[6.10 Hapus Komentar [294](#hapus-komentar)](#hapus-komentar)

[6.11 Like Artikel [295](#like-artikel)](#like-artikel)

[6.12 Kelola Pengguna (Admin) [297](#kelola-pengguna-admin)](#kelola-pengguna-admin)

[6.13 Tinjau Laporan (Admin) [298](#tinjau-laporan-admin)](#tinjau-laporan-admin)

[6.14 Tambah Konten Featured (Admin) [298](#tambah-konten-featured-admin)](#tambah-konten-featured-admin)

[6.15 Lihat Analytics (Admin) [300](#lihat-analytics-admin)](#lihat-analytics-admin)

[DAFTAR REFERENSI [302](#daftar-referensi)](#daftar-referensi)

[]{#_Toc215957572 .anchor}

# DAFTAR TABEL

[Tabel 2.1 Perbandingan Model Pengembangan Perangkat Lunak [7](#_Toc215958580)](#_Toc215958580)

[Tabel 2.2 Karakteristik Kualitas ISO/IEC 25010 yang Digunakan [11](#_Toc215958581)](#_Toc215958581)

[Tabel 3.1 Metrik Pengujian Sistem Platform PaberLand [20](#_Toc215958582)](#_Toc215958582)

[Tabel 4.1 Hasil elisitasi kebutuhan stakeholder PaberLand [24](#_Toc215958583)](#_Toc215958583)

[Tabel 4.2 Identifikasi pengguna awal PaberLand [26](#_Toc215958584)](#_Toc215958584)

[Tabel 4.3 Hasil Evaluasi dan Permintaan Revisi Prototyping Iterasi 1 [46](#_Toc215958585)](#_Toc215958585)

[Tabel 4.4 Ringkasan kebutuhan pengguna PaberLand [108](#_Toc215958586)](#_Toc215958586)

[Tabel 4.5 Aktivitas sistem inti dan penjelasan [111](#_Toc215958587)](#_Toc215958587)

[Tabel 4.6 Profil pengguna akhir dan aktivitas kunci [114](#_Toc215958588)](#_Toc215958588)

[Tabel 4.7 Kebutuhan fungsional (F-XX) [116](#_Toc215958589)](#_Toc215958589)

[Tabel 4.8 Kebutuhan non-fungsional (NF-XX) [120](#_Toc215958590)](#_Toc215958590)

[Tabel 4.9 Use Case Daftar Akun Baru [128](#_Toc215958591)](#_Toc215958591)

[Tabel 4.10 Use Case Login Pengguna [130](#_Toc215958592)](#_Toc215958592)

[Tabel 4.11 Use Case Reset Password [132](#_Toc215958593)](#_Toc215958593)

[Tabel 4.12 Use Case: Lihat Beranda (Homepage) [135](#_Toc215958594)](#_Toc215958594)

[Tabel 4.13 Use Case Jelajahi Kategori [137](#_Toc215958595)](#_Toc215958595)

[Tabel 4.14 Use Case Baca Artikel [139](#_Toc215958596)](#_Toc215958596)

[Tabel 4.15 Use Case Cari Konten [141](#_Toc215958597)](#_Toc215958597)

[Tabel 4.16 Use Case Tulis Artikel Baru [143](#_Toc215958598)](#_Toc215958598)

[Tabel 4.17 Use Case Publikasikan Artikel [146](#_Toc215958599)](#_Toc215958599)

[Tabel 4.18 Use Case Edit Artikel [148](#_Toc215958600)](#_Toc215958600)

[Tabel 4.19 Use Case Hapus Artikel [150](#_Toc215958601)](#_Toc215958601)

[Tabel 4.20 Use Case Kelola Artikel Saya [152](#_Toc215958602)](#_Toc215958602)

[Tabel 4.21 Use Case Like Artikel [154](#_Toc215958603)](#_Toc215958603)

[Tabel 4.22 Use Case Komentar Artikel [156](#_Toc215958604)](#_Toc215958604)

[Tabel 4.23 Use Case Laporkan Konten [158](#_Toc215958605)](#_Toc215958605)

[Tabel 4.24 Use Case Tinjau Laporan Konten (Moderator) [160](#_Toc215958606)](#_Toc215958606)

[Tabel 4.25 Use Case Tambah Konten Featured (Moderator) [162](#_Toc215958607)](#_Toc215958607)

[Tabel 4.26 Use Case Kelola Pengguna (Administrator) [164](#_Toc215958608)](#_Toc215958608)

[Tabel 4.27 Use Case Lihat Analytics (Administrator/Moderator) [166](#_Toc215958609)](#_Toc215958609)

[Tabel 4.28 Use Case Lihat Activity Logs (Administrator) [168](#_Toc215958610)](#_Toc215958610)

[Tabel 4.29 Use Case Tambah Portofolio [170](#_Toc215958611)](#_Toc215958611)

[Tabel 4.30 Use Case Lihat Profil Member [172](#_Toc215958612)](#_Toc215958612)

[Tabel 4.31 Use Case Edit Profil [174](#_Toc215958613)](#_Toc215958613)

[Tabel 4.32 Use Case Lihat Direktori Member [176](#_Toc215958614)](#_Toc215958614)

[Tabel 4.33 Use Case Lihat Halaman Tentang [178](#_Toc215958615)](#_Toc215958615)

[Tabel 4.34 Use Case Logout [180](#_Toc215958616)](#_Toc215958616)

[Tabel 5.1 Tabel profiles Physical Database Design [267](#_Toc215958617)](#_Toc215958617)

[Tabel 5.2 Tabel articles Physical Database Design [269](#_Toc215958618)](#_Toc215958618)

[Tabel 5.3 Tabel comments Physical Database Design [271](#_Toc215958619)](#_Toc215958619)

[Tabel 5.4 Tabel likes Physical Database Design [272](#_Toc215958620)](#_Toc215958620)

[Tabel 5.5 Tabel portofolio_works Physical Database Design [273](#_Toc215958622)](#_Toc215958622)

[Tabel 5.6 Tabel Notifications Physical Database Design [274](#_Toc215958623)](#_Toc215958623)

[Tabel 5.7 Tabel content_reports Physical Database Design [276](#_Toc215958624)](#_Toc215958624)

[Tabel 5.9 Tabel featured_content Physical Database Design [279](#_Toc215958625)](#_Toc215958625)

[Tabel 5.10 Tabel admin_activity_logs Physical Database Design [281](#_Toc215958626)](#_Toc215958626)

[Tabel 5.11 Tabel settings Physical Database Design [282](#_Toc215958627)](#_Toc215958627)

[Tabel 6.1 Kode program dari fungsi login [284](#_Toc215958628)](#_Toc215958628)

[Tabel 6.2 Kode program dari fungsi register [285](#_Toc215958629)](#_Toc215958629)

[Tabel 6.3 Kode program dari fungsi logout [286](#_Toc215958630)](#_Toc215958630)

[Tabel 6.4 Kode program dari reset password [287](#_Toc215958631)](#_Toc215958631)

[Tabel 6.5 Kode program dari fungsi tambah artikel [289](#_Toc215958632)](#_Toc215958632)

[Tabel 6.6 Kode program dari fungsi update artikel [292](#_Toc215958633)](#_Toc215958633)

[Tabel 6.7 Kode program dari fungsi hapus artikel [292](#_Toc215958634)](#_Toc215958634)

[Tabel 6.8 Kode program dari fungsi tambah komentar [293](#_Toc215958635)](#_Toc215958635)

[Tabel 6.9 Kode program dari fungsi update komentar [294](#_Toc215958636)](#_Toc215958636)

[Tabel 6.10 Kode program dari fungsi hapus komentar [294](#_Toc215958637)](#_Toc215958637)

[Tabel 6.11 Kode program dari fungsi like artikel [296](#_Toc215958638)](#_Toc215958638)

[Tabel 6.12 Kode program dari fungsi kelola pengguna [297](#_Toc215958639)](#_Toc215958639)

[Tabel 6.13 Kode program dari fungsi tinjau laporan [298](#_Toc215958640)](#_Toc215958640)

[Tabel 6.14 Kode program dari fungsi tambah konten featured [299](#_Toc215958641)](#_Toc215958641)

[Tabel 6.15 Kode program dari fungsi lihat analytics [300](#_Toc215958642)](#_Toc215958642)

# DAFTAR GAMBAR

[Gambar 2.1 Alur Model Pengembangan Prototyping [7](#_Toc215958644)](#_Toc215958644)

[Gambar 2.2 Arsitektur Logis Platform PaberLand [10](#_Toc215958645)](#_Toc215958645)

[Gambar 4.1 Tampilan Hero Section halaman beranda pada iterasi 1 [28](#_Toc215958646)](#_Toc215958646)

[Gambar 4.2 Tampilan segmen Artikel Pilihan pada halaman beranda [28](#_Toc215958647)](#_Toc215958647)

[Gambar 4.3 Tampilan segmen Artikel Terbaru dan Sidebar Kategori [29](#_Toc215958648)](#_Toc215958648)

[Gambar 4.4 Tampilan halaman pendaftaran akun pada iterasi 1 [29](#_Toc215958649)](#_Toc215958649)

[Gambar 4.5 Tampilan halaman login pada iterasi 1 [30](#_Toc215958650)](#_Toc215958650)

[Gambar 4.6 Tampilan Dashboard Pengguna pada iterasi 1 [31](#_Toc215958651)](#_Toc215958651)

[Gambar 4.7 Tampilan sub-modul Artikel Saya (Manajemen Konten Pribadi) [31](#_Toc215958652)](#_Toc215958652)

[Gambar 4.8 Tampilan standar Antarmuka Penulisan Konten [32](#_Toc215958653)](#_Toc215958653)

[Gambar 4.9 Tampilan Editor Konten dengan Template dan Toolbar [33](#_Toc215958654)](#_Toc215958654)

[Gambar 4.10 Tampilan statistik pribadi pada halaman My Articles [34](#_Toc215958655)](#_Toc215958655)

[Gambar 4.11 Tampilan Halaman Kategori Artikel pada iterasi 1 [34](#_Toc215958656)](#_Toc215958656)

[Gambar 4.12 Tampilan Halaman Direktori Penulis pada iterasi 1 [35](#_Toc215958657)](#_Toc215958657)

[Gambar 4.13 Tampilan Halaman Hasil Pencarian pada iterasi 1 [36](#_Toc215958658)](#_Toc215958658)

[Gambar 4.14 Tampilan Profil Penulis dan Kartu Metrik [37](#_Toc215958659)](#_Toc215958659)

[Gambar 4.15 Tampilan Halaman Detail Artikel pada iterasi 1 [38](#_Toc215958660)](#_Toc215958660)

[Gambar 4.16 Tampilan Modul Komentar pada halaman Detail Artikel [39](#_Toc215958661)](#_Toc215958661)

[Gambar 4.17 Tampilan Dashboard Utama Administrator pada iterasi 1 [40](#_Toc215958662)](#_Toc215958662)

[Gambar 4.18 Tampilan Halaman Manajemen User pada iterasi 1 [41](#_Toc215958663)](#_Toc215958663)

[Gambar 4.19 Tampilan modul Manajemen Artikel pada iterasi 1 [42](#_Toc215958664)](#_Toc215958664)

[Gambar 4.20 Tampilan Halaman Laporan Konten pada iterasi 1 [43](#_Toc215958665)](#_Toc215958665)

[Gambar 4.21 Tampilan Analytics Dashboard pada Admin Panel iterasi 1 [44](#_Toc215958666)](#_Toc215958666)

[Gambar 4.22 Tampilan Halaman Activity Logs pada Admin Panel iterasi 1 [45](#_Toc215958667)](#_Toc215958667)

[Gambar 4.23 Tampilan Halaman Pengaturan Admin pada iterasi 1 [46](#_Toc215958668)](#_Toc215958668)

[Gambar 4.25 Struktur Navigasi Utama [48](#_Toc215958669)](#_Toc215958669)

[Gambar 4.26 Hero Section [49](#_Toc215958670)](#_Toc215958670)

[Gambar 4.27 Konten Pilihan [50](#_Toc215958671)](#_Toc215958671)

[Gambar 4.28 Konten Terbaru [50](#_Toc215958672)](#_Toc215958672)

[Gambar 4.29 Etalase Kategori [51](#_Toc215958673)](#_Toc215958673)

[Gambar 4.30 CTA Mulai Menulis Hari Ini [51](#_Toc215958674)](#_Toc215958674)

[Gambar 4.31 Footer Halaman Utama [52](#_Toc215958675)](#_Toc215958675)

[Gambar 4.32 Halaman Kategori [53](#_Toc215958676)](#_Toc215958676)

[Gambar 4.33 Footer Halaman Kategori [54](#_Toc215958677)](#_Toc215958677)

[Gambar 4.34 Hero Direktori Member [55](#_Toc215958678)](#_Toc215958678)

[Gambar 4.35 Banner Afirmasi Komunitas [56](#_Toc215958679)](#_Toc215958679)

[Gambar 4.36 Statistik Cepat Komunitas [56](#_Toc215958680)](#_Toc215958680)

[Gambar 4.37 Kategori dalam Konteks Member [57](#_Toc215958681)](#_Toc215958681)

[Gambar 4.38 Footer Halaman Member [58](#_Toc215958682)](#_Toc215958682)

[Gambar 4.39 Hero Halaman Tentang [59](#_Toc215958683)](#_Toc215958683)

[Gambar 4.40 Segmentasi Prestasi & Pengakuan [60](#_Toc215958684)](#_Toc215958684)

[Gambar 4.41 Profil Singkat (Visi, Misi, Budaya, Layanan) [61](#_Toc215958685)](#_Toc215958685)

[Gambar 4.42 Tim Inti PaberLand [61](#_Toc215958686)](#_Toc215958686)

[Gambar 4.43 Statistik Komunitas Multiplatform [62](#_Toc215958687)](#_Toc215958687)

[Gambar 4.44 Footer Halaman Tentang [63](#_Toc215958688)](#_Toc215958688)

[Gambar 4.45 Formulir Pencarian [64](#_Toc215958689)](#_Toc215958689)

[Gambar 4.46 Ringkasan Filter Aktif & Bantuan Kontekstual [64](#_Toc215958690)](#_Toc215958690)

[Gambar 4.47 Daftar Hasil Pencarian [65](#_Toc215958691)](#_Toc215958691)

[Gambar 4.48 Panel Filter Tambahan & Sorting [66](#_Toc215958692)](#_Toc215958692)

[Gambar 4.49 Paginasi & Navigasi Hasil [66](#_Toc215958693)](#_Toc215958693)

[Gambar 4.50 Responsivitas & Aksesibilitas Halaman Pencarian [67](#_Toc215958694)](#_Toc215958694)

[Gambar 4.51 Hero Profil & Ringkasan Identitas Saya [68](#_Toc215958695)](#_Toc215958695)

[Gambar 4.52 Portofolio Artikel Saya dan Filter [69](#_Toc215958696)](#_Toc215958696)

[Gambar 4.53 Konten yang Difavoritkan [70](#_Toc215958697)](#_Toc215958697)

[Gambar 4.54 Footer Halaman Saya [70](#_Toc215958698)](#_Toc215958698)

[Gambar 4.55 Detail Konten [71](#_Toc215958699)](#_Toc215958699)

[Gambar 4.56 Isi Konten dengan Struktur Heading [72](#_Toc215958700)](#_Toc215958700)

[Gambar 4.57 Callout atau Kutipan [72](#_Toc215958701)](#_Toc215958701)

[Gambar 4.58 Komponen Pembaca & Interaksi [73](#_Toc215958702)](#_Toc215958702)

[Gambar 4.59 Rekomendasi Konten Lainnya & Artikel Terkait [74](#_Toc215958703)](#_Toc215958703)

[Gambar 4.60 Footer Halaman Detail Konten [74](#_Toc215958704)](#_Toc215958704)

[Gambar 4.61 Halaman Penulisan Konten Mode Responsif [75](#_Toc215958705)](#_Toc215958705)

[Gambar 4.62 Halaman Penulisan Konten [76](#_Toc215958706)](#_Toc215958706)

[Gambar 4.63 Toolbar Aksi & Tampilan Langsung [77](#_Toc215958707)](#_Toc215958707)

[Gambar 4.64 Editor yang Sudah Terisi [78](#_Toc215958708)](#_Toc215958708)

[Gambar 4.65 Fitur Edit Konten [79](#_Toc215958709)](#_Toc215958709)

[Gambar 4.66 Validasi & Notifikasi jika Tidak Valid [79](#_Toc215958710)](#_Toc215958710)

[Gambar 4.67 Validasi & Notifikasi jika Valid [80](#_Toc215958711)](#_Toc215958711)

[Gambar 4.68 Breadcrumb & Header Kategori [81](#_Toc215958712)](#_Toc215958712)

[Gambar 4.69 Statistik Kategori [81](#_Toc215958713)](#_Toc215958713)

[Gambar 4.70 Ajakan Menulis Khusus Kategori [82](#_Toc215958714)](#_Toc215958714)

[Gambar 4.71 Footer Halaman Kategori [83](#_Toc215958715)](#_Toc215958715)

[Gambar 4.72 Profil Member Publik [84](#_Toc215958716)](#_Toc215958716)

[Gambar 4.73 Statistik Aktivitas [84](#_Toc215958717)](#_Toc215958717)

[Gambar 4.74 Daftar Konten & Portofolio [85](#_Toc215958718)](#_Toc215958718)

[Gambar 4.75 Halaman Portofolio Member [86](#_Toc215958719)](#_Toc215958719)

[Gambar 4.76 Detail Karya Member [87](#_Toc215958720)](#_Toc215958720)

[Gambar 4.77 Deskripsi Karya Member [88](#_Toc215958721)](#_Toc215958721)

[Gambar 4.78 Halaman Manajemen Konten Pribadi [89](#_Toc215958722)](#_Toc215958722)

[Gambar 4.79 Tabel Manajemen Konten dengan Aksi CRUD [89](#_Toc215958723)](#_Toc215958723)

[Gambar 4.80 Halaman Admin Dashboard [91](#_Toc215958724)](#_Toc215958724)

[Gambar 4.81 Kartu Statistik Halaman Admin [92](#_Toc215958725)](#_Toc215958725)

[Gambar 4.82 Manajemen Users Halaman Admin [94](#_Toc215958726)](#_Toc215958726)

[Gambar 4.83 Aksi Manajemen Users [95](#_Toc215958727)](#_Toc215958727)

[Gambar 4.84 Notifikasi & Validasi Manajemen Users [95](#_Toc215958728)](#_Toc215958728)

[Gambar 4.85 Paginasi Halaman Manajemen Users [96](#_Toc215958729)](#_Toc215958729)

[Gambar 4.86 Halaman Admin Manajemen Konten [97](#_Toc215958730)](#_Toc215958730)

[Gambar 4.87 Aksi Moderasi Halaman Manajemen Konten [98](#_Toc215958731)](#_Toc215958731)

[Gambar 4.88 Paginasi Halamam Manajemen Konten [99](#_Toc215958732)](#_Toc215958732)

[Gambar 4.89 Halaman Admin Laporan Konten [100](#_Toc215958733)](#_Toc215958733)

[Gambar 4.90 Halaman Admin Ada Konten Dilaporkan [101](#_Toc215958734)](#_Toc215958734)

[Gambar 4.91 Daftar Konten Pilihan [102](#_Toc215958735)](#_Toc215958735)

[Gambar 4.92 Berhasil Menambahkan Konten Pilihan [102](#_Toc215958736)](#_Toc215958736)

[Gambar 4.93 Halaman Admin Analytics [103](#_Toc215958737)](#_Toc215958737)

[Gambar 4.94 Grafik Tren & Distribusi [104](#_Toc215958738)](#_Toc215958738)

[Gambar 4.95 Log & Detail [105](#_Toc215958739)](#_Toc215958739)

[Gambar 4.96 Use Case Diagram Platform PaberLand untuk Pembaca [123](#_Toc215958740)](#_Toc215958740)

[Gambar 4.97 Use Case Diagram Platform PaberLand untuk Penulis [124](#_Toc215958741)](#_Toc215958741)

[Gambar 4.98 Use Case Diagram Platform PaberLand untuk Moderator [124](#_Toc215958742)](#_Toc215958742)

[Gambar 4.99 Use Case Diagram Platform PaberLand untuk Admin [125](#_Toc215958743)](#_Toc215958743)

[Gambar 4.100 Entity Relationship Diagram Platform PaberLand [184](#_Toc215958744)](#_Toc215958744)

[Gambar 5.1 Rancangan Class Diagram Komponen Frontend [188](#_Toc215958745)](#_Toc215958745)

[Gambar 5.2 Rancangan Class Diagram API Routes dan Services [190](#_Toc215958746)](#_Toc215958746)

[Gambar 5.3 Rancangan Class Diagram Database Models [192](#_Toc215958747)](#_Toc215958747)

[Gambar 5.4 Sequence Diagram Daftar Akun [196](#_Toc215958748)](#_Toc215958748)

[Gambar 5.5 Sequence Diagram Login [198](#_Toc215958749)](#_Toc215958749)

[Gambar 5.6 Sequence Diagram Reset Password [200](#_Toc215958750)](#_Toc215958750)

[Gambar 5.7 Sequence Diagram Melihat Beranda [202](#_Toc215958751)](#_Toc215958751)

[Gambar 5.8 Sequence Diagram Melihat Kategori [204](#_Toc215958752)](#_Toc215958752)

[Gambar 5.9 Sequence Diagram Baca Artikel [207](#_Toc215958753)](#_Toc215958753)

[Gambar 5.10 Sequence Diagram Melihat Detail Artikel [210](#_Toc215958754)](#_Toc215958754)

[Gambar 5.11 Sequence Diagram Tulis Artikel Baru [213](#_Toc215958755)](#_Toc215958755)

[Gambar 5.12 Sequence Diagram Publikasikan Artikel [216](#_Toc215958756)](#_Toc215958756)

[Gambar 5.13 Sequence Diagram Edit Artikel [218](#_Toc215958757)](#_Toc215958757)

[Gambar 5.14 Sequence Diagram Hapus Artikel [221](#_Toc215958758)](#_Toc215958758)

[Gambar 5.15 Sequence Diagram Kelola Artikel Saya [224](#_Toc215958759)](#_Toc215958759)

[Gambar 5.16 Sequence Diagram Memberi Like Artikel [227](#_Toc215958760)](#_Toc215958760)

[Gambar 5.17 Sequence Diagram Komentar Artikel [230](#_Toc215958761)](#_Toc215958761)

[Gambar 5.18 Sequence Diagram Laporkan Konten [232](#_Toc215958762)](#_Toc215958762)

[Gambar 5.19 Sequence Diagram Tinjau Laporan Konten (Moderator) [235](#_Toc215958763)](#_Toc215958763)

[Gambar 5.20 Sequence Diagram Tambah Konten Featured (Moderator) [238](#_Toc215958764)](#_Toc215958764)

[Gambar 5.21 Sequence Diagram Kelola Pengguna (Administrator) [241](#_Toc215958765)](#_Toc215958765)

[Gambar 5.22 Sequence Diagram Lihat Analytics (Administrator) [244](#_Toc215958766)](#_Toc215958766)

[Gambar 5.23 Sequence Diagram Lihat Activity Logs (Administrator) [247](#_Toc215958767)](#_Toc215958767)

[Gambar 5.24 Sequence Diagram Tambah Portofolio [250](#_Toc215958768)](#_Toc215958768)

[Gambar 5.25 Sequence Diagram Lihat Profil Member [253](#_Toc215958769)](#_Toc215958769)

[Gambar 5.26 Sequence Diagram Edit Profil [256](#_Toc215958770)](#_Toc215958770)

[Gambar 5.27 Sequence Diagram Lihat Direktori Member [259](#_Toc215958771)](#_Toc215958771)

[Gambar 5.28 Sequence Diagram Lihat Halaman Tentang [262](#_Toc215958772)](#_Toc215958772)

[Gambar 5.29 Sequence Diagram Logout [265](#_Toc215958773)](#_Toc215958773)

[Gambar 5.30 Rancangan Database Sistem Platform PaberLand [266](#_Toc215958774)](#_Toc215958774)

# DAFTAR LAMPIRAN

# 

# BAB 1 PENDAHULUAN

## 1.1 Latar Belakang

Literasi bacaan anak memegang peranan fundamental dalam pembentukan karakter dan daya pikir generasi muda Indonesia. Forum Penulis Bacaan Anak (PaberLand), yang berdiri sejak 2010, telah aktif menjadi wadah bagi ribuan penulis untuk mempublikasikan dan mendiskusikan karya anak dan remaja (Ali Muakhir, 2023). Dengan lebih dari 27.000 anggota yang tersebar di berbagai platform digital seperti Facebook (22.000 member), WhatsApp (1.025 member), Telegram (1.553 member), dan Instagram (2.974 member), komunitas ini telah menjadi contoh nyata ekosistem literasi yang hidup dan berkembang (PaberLand, 2023).

Namun, pengelolaan konten dan interaksi di komunitas berbasis media sosial konvensional memiliki keterbatasan signifikan dari perspektif rekayasa perangkat lunak. Sistem seperti Facebook atau blog tradisional tidak dirancang dengan arsitektur yang mendukung kebutuhan spesifik penulis profesional, seperti editor canggih dengan fitur WYSIWYG, sistem manajemen kategori tulisan yang terstruktur, dan mekanisme moderasi terintegrasi. Studi tentang desain komunitas daring oleh Kraut & Resnick (2012) menunjukkan bahwa keberhasilan platform komunitas sangat dipengaruhi oleh kualitas arsitektur sistem yang mendukung partisipasi sehat, moderasi efektif, dan apresiasi karya yang terstruktur.

Dari perspektif rekayasa perangkat lunak, pengembangan platform komunitas yang efektif memerlukan penerapan metodologi pengembangan yang sistematis dan terstruktur. Analisis struktur diskusi di Reddit (Datta et al., 2022) dan mekanisme voting di Slashdot (Lampe & Resnick, 2004) menunjukkan pentingnya desain arsitektur yang mendukung sistem komentar berulir (threaded comment system) dan sistem apresiasi (like/vote) untuk menjaga kualitas percakapan. Implementasi fitur-fitur ini memerlukan perancangan database yang robust, arsitektur aplikasi yang skalabel, dan antarmuka pengguna yang intuitif.

Dalam konteks teknologi modern, framework seperti Next.js menyediakan arsitektur yang mendukung optimasi performa dan SEO yang krusial untuk platform dengan volume konten tinggi (Vercel, 2024). Integrasi dengan PostgreSQL dan Row Level Security (RLS) memungkinkan implementasi sistem keamanan granular yang essential untuk lingkungan multi-user (PostgreSQL Global Development Group, 2024). Sementara itu, editor teks kaya seperti TinyMCE menyediakan fitur autosave dan version control yang dapat meminimalkan risiko kehilangan data dan meningkatkan produktivitas penulis (Tiny Technologies, 2024).

Berdasarkan analisis kebutuhan komunitas PaberLand dan keterbatasan teknologi yang ada, diperlukan pengembangan sebuah platform web khusus komunitas penulis dengan arsitektur modern, fitur interaksi sosial, dan sistem pengelolaan konten profesional. Penelitian ini bertujuan untuk mengembangkan platform tersebut menggunakan metodologi rekayasa perangkat lunak yang sistematis dengan framework Next.js 15, PostgreSQL, dan TinyMCE sebagai teknologi inti. Pengembangan platform ini diharapkan dapat memberikan solusi yang memenuhi kebutuhan komunitas literasi anak Indonesia secara efektif dan efisien.

## 1.2 Rumusan Masalah

Berdasarkan latar belakang yang telah diuraikan, penelitian ini fokus pada pengembangan platform komunitas penulis literasi anak PaberLand. Rumusan masalah penelitian ini adalah:

1.  Bagaimana hasil analisis kebutuhan sistem platform komunitas penulis literasi anak PaberLand?

2.  Bagaimana hasil dan analisis perancangan sistem platform komunitas penulis literasi anak PaberLand?

3.  Bagaimana hasil dan analisis implementasi sistem platform komunitas penulis literasi anak PaberLand?

4.  Bagaimana hasil dan analisis pengujian sistem platform komunitas penulis literasi anak PaberLand?

## 1.3 Tujuan

Berdasarkan rumusan masalah yang telah ditetapkan, tujuan penelitian ini adalah:

1.  Menganalisis kebutuhan sistem platform komunitas penulis literasi anak PaberLand berdasarkan kebutuhan fungsional dan non-fungsional.

2.  Merancang sistem platform komunitas penulis literasi anak PaberLand dengan arsitektur yang sesuai menggunakan framework Next.js dan PostgreSQL.

3.  Mengimplementasikan sistem platform komunitas penulis literasi anak PaberLand sesuai dengan rancangan yang telah dibuat.konten.

4.  Menguji sistem platform komunitas penulis literasi anak PaberLand secara fungsional dan non-fungsional untuk memastikan sistem berjalan sesuai kebutuhan.

## 1.4 Manfaat

Penelitian ini diharapkan dapat memberikan manfaat sebagai berikut:

**Manfaat Akademis:**

1.  Memberikan kontribusi pada bidang rekayasa perangkat lunak, khususnya dalam pengembangan platform komunitas online dengan fokus pada literasi anak dan penulisan.

2.  Menyediakan studi kasus implementasi metodologi pengembangan perangkat lunak dalam membangun aplikasi web modern menggunakan teknologi terkini.

3.  Memberikan referensi pengembangan sistem berbasis web untuk penelitian selanjutnya dalam bidang platform komunitas online.

**Manfaat Praktis:**

1.  Menghasilkan platform PaberLand yang dapat digunakan oleh komunitas penulis literasi anak Indonesia untuk berbagi dan mengembangkan karya.

2.  Menyediakan panduan praktis bagi pengembang lain yang ingin membangun platform komunitas serupa dengan teknologi modern.

3.  Mendukung pengembangan ekosistem literasi anak Indonesia melalui platform teknologi yang berkualitas dan mudah diakses.

**Manfaat Sosial:**

1.  Mendukung peningkatan kualitas literasi anak Indonesia melalui platform teknologi yang efektif.

2.  Memfasilitasi pertumbuhan komunitas penulis bacaan anak yang lebih terorganisir dan produktif.

3.  Memberikan kontribusi pada digitalisasi komunitas literasi Indonesia.

## 1.5 Batasan Masalah

Untuk memfokuskan penelitian dan memastikan kedalaman analisis, penelitian ini dibatasi pada:

1.  **Ruang Lingkup Sistem:** Evaluasi terbatas pada platform PaberLand yang telah dikembangkan dengan teknologi Next.js 15, PostgreSQL, dan TinyMCE.

2.  **Aspek Pengembangan:** Penelitian fokus pada aspek rekayasa perangkat lunak meliputi analisis kebutuhan, perancangan sistem, implementasi fitur, dan pengujian fungsional, bukan pada aspek konten literasi atau pedagogi.

3.  **Fitur Utama:** Pengembangan mencakup sistem manajemen pengguna, editor WYSIWYG, publikasi konten, sistem komentar, fitur interaksi sosial (like, comment), sistem pencarian, dan admin panel.

4.  **Metodologi Pengembangan:** Pengujian sistem melibatkan anggota komunitas PaberLand sebagai pengguna target platform.

5.  **Lingkup Teknis:** Pengembangan tidak mencakup aspek deployment infrastruktur tingkat enterprise atau load balancing, namun fokus pada fungsionalitas aplikasi dan keamanan di level aplikasi.

## 1.6 Sistematika Pembahasan

Sistematika pembahasan dalam skripsi ini disusun sebagai berikut:

BAB 1 PENDAHULUAN Berisi uraian mengenai latar belakang, rumusan masalah, tujuan penelitian, manfaat penelitian, batasan masalah, dan sistematika pembahasan. Bab ini merupakan awal mula dari penelitian yang dilakukan penulis.

BAB 2 LANDASAN KEPUSTAKAAN Berisi uraian dan pembahasan tentang teori, konsep, metode, dan sistem dari pustaka ilmiah maupun referensi yang didapatkan.

BAB 3 METODOLOGI PENELITIAN Merupakan proses dan langkah-langkah penulis dalam menjalankan penelitian.

BAB 4 REKAYASA KEBUTUHAN Berisi analisis dan spesifikasi kebutuhan pengguna maupun perangkat lunak dengan menggunakan prototyping, penentuan kebutuhan fungsional dan non-fungsional, pembuatan use case diagram dan use case scenario.

BAB 5 PERANCANGAN SISTEM Berisi rancangan-rancangan sistem, yang mempermudah proses pengembangan agar lebih efektif. Bab ini berisi rancangan struktur kelas, yaitu class diagram, desain alur sistem dari sequence diagram dan rancangan basis data.

BAB 6 IMPLEMENTASI Berisi kumpulan kode implementasi sistem informasi pengarsipan Paberland setiap fitur-fiturnya.

BAB 7 PENGUJIAN Menjelaskan proses perancangan dan pelaksanaan pengujian white box dan black box yang diterapkan pada sistem informasi pengarsipan halaqah setelah program tersebut selesai dibuat.

BAB 8 KESIMPULAN DAN SARAN Berisi kesimpulan dari keseluruhan hasil dan pembahasan serta saran rekomendasi hal-hal yang perlu dilakukan untuk mengembangkan penelitian pada masa mendatang.

#  BAB 2

## 2.1 Rekayasa Perangkat Lunak

Rekayasa Perangkat Lunak atau Software Engineering merupakan disiplin ilmu yang mengadopsi pendekatan sistematis, disiplin, dan terukur dalam pengembangan, operasi, serta pemeliharaan perangkat lunak. Dalam era transformasi digital saat ini, rekayasa perangkat lunak tidak hanya berfokus pada penulisan kode, tetapi juga pada manajemen kompleksitas sistem untuk memastikan keandalan dan efisiensi. Menurut Pressman dan Maxim dalam edisi terbaru bukunya (2020), rekayasa perangkat lunak modern mengintegrasikan proses, metode, dan alat bantu (tools) untuk membangun perangkat lunak berkualitas tinggi.

Penerapan prinsip rekayasa perangkat lunak dalam pengembangan aplikasi berbasis web menjadi sangat krusial mengingat dinamisnya perubahan kebutuhan pengguna dan teknologi. Penelitian terbaru oleh Hidayat dkk. (2023) menekankan bahwa tantangan utama dalam pengembangan sistem modern adalah menjaga keseimbangan antara kecepatan pengembangan dan kualitas arsitektur sistem. Oleh karena itu, penggunaan framework modern dan penerapan standar kualitas internasional menjadi prasyarat utama untuk menghasilkan sistem yang robust dan scalable.

## 2.2 Model Pengembangan Sistem

Dalam pengembangan perangkat lunak, pemilihan model proses yang tepat sangat menentukan keberhasilan proyek. Model proses memberikan kerangka kerja bagi tim pengembang untuk merencanakan, melaksanakan, dan mengelola pengembangan sistem secara terstruktur.

### 2.2.1 Model Prototyping

Penelitian ini mengadopsi model Prototyping sebagai metodologi pengembangan. Model Prototyping adalah pendekatan pengembangan perangkat lunak yang berfokus pada pembuatan model awal dari perangkat lunak untuk mendapatkan umpan balik (feedback) segera dari pengguna. Supiyandi dkk. (2023) dalam jurnalnya menjelaskan bahwa metode Prototyping sangat efektif diterapkan pada proyek yang memiliki kebutuhan pengguna yang belum terdefinisi secara jelas atau cenderung berubah-ubah. Dengan adanya purwarupa (prototype), pengguna dapat berinteraksi langsung dengan gambaran sistem, sehingga kesalahpahaman antara pengembang dan pengguna dapat diminimalisir sejak dini.

Proses dalam model Prototyping dimulai dengan pengumpulan kebutuhan, kemudian dilanjutkan dengan perancangan cepat (quick design) yang berfokus pada representasi visual antarmuka pengguna. Setelah itu, prototype dibangun dan dievaluasi oleh pengguna. Umpan balik yang diperoleh dari evaluasi tersebut digunakan untuk memperbaiki dan menyempurnakan prototype dalam siklus iteratif hingga kebutuhan pengguna terpenuhi sepenuhnya. Pendekatan ini memungkinkan validasi fungsionalitas fitur-fitur sosial dan manajemen konten pada platform PaberLand dilakukan lebih awal sebelum fase pengkodean sistem secara menyeluruh.

![[]{#_Toc215958644 .anchor}Gambar 2.1 Alur Model Pengembangan Prototyping](docs/skripsi/media/image2.png){alt="Metode SDLC Prototype" width="5.511805555555555in" height="1.4166666666666667in"}

Sumber : Rony Setiawan 2021

### 2.2.2 Perbandingan Model Proses

Setiap model pengembangan perangkat lunak memiliki karakteristik yang berbeda. Pemilihan Prototyping untuk platform komunitas ini didasarkan pada perbandingan karakteristik fleksibilitas dan keterlibatan pengguna dibandingkan dengan model lain seperti Waterfall. Tabel 2.1 berikut menyajikan perbandingan karakteristik model proses perangkat lunak berdasarkan literatur terkini.

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
      **Karakteristik**                   **Model Waterfall**                                      **Model Prototyping**                                      **Model Agile/Scrum**
  ------------------------- ------------------------------------------------ ------------------------------------------------------------------ --------------------------------------------------
   Fleksibilitas Kebutuhan       Rendah, kebutuhan harus jelas di awal                   Tinggi, mengakomodasi perubahan kebutuhan               Sangat Tinggi, perubahan diterima setiap iterasi

    Keterlibatan Pengguna           Minimal, hanya di awal dan akhir                  Tinggi, terlibat aktif dalam evaluasi prototype                Sangat Tinggi, kolaborasi harian/berkala

      Waktu Pengerjaan                 Linier dan terjadwal kaku                        Cenderung lebih cepat untuk visualisasi awal                 Iteratif dalam siklus pendek (*sprints*)

      Risiko Kegagalan       Tinggi jika terjadi kesalahan analisis di awal              Rendah karena validasi dilakukan bertahap                     Rendah karena evaluasi terus menerus

      Kesesuaian Proyek          Sistem kritis dengan spesifikasi tetap       Sistem dengan interaksi pengguna intensif (User Interface heavy)      Proyek dinamis dengan tim kecil--menengah
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  : []{#_Toc215958580 .anchor}Tabel 2.1 Perbandingan Model Pengembangan Perangkat Lunak

## 2.3 Teknologi Pengembangan Aplikasi Web Modern

Pengembangan platform PaberLand memanfaatkan serangkaian teknologi web modern untuk memastikan performa dan skalabilitas.

### 2.3.1 Framework Next.js

Next.js merupakan kerangka kerja (framework) berbasis React yang memungkinkan pengembangan aplikasi web dengan fitur Server-Side Rendering (SSR) dan pembuatan situs statis. Syahputra dan Panggabean (2023) dalam penelitiannya mengenai performa web menyebutkan bahwa Next.js secara signifikan meningkatkan performa pemuatan halaman dan optimasi mesin pencari (Search Engine Optimization atau SEO) dibandingkan dengan aplikasi Single Page Application (SPA) konvensional. Hal ini dikarenakan Next.js melakukan pre-rendering halaman di server sebelum dikirimkan ke peramban (browser) pengguna, sehingga konten dapat diindeks lebih baik oleh mesin pencari dan ditampilkan lebih cepat kepada pengguna, yang mana sangat krusial untuk sebuah platform berbasis konten literasi.

### 2.3.2 Basis Data PostgreSQL dan Supabase

PostgreSQL adalah sistem manajemen basis data relasional (Relational Database Management System atau RDBMS) objek terbuka yang dikenal dengan keandalan dan integritas datanya. Dalam konteks pengembangan modern, PostgreSQL sering diintegrasikan dengan layanan Backend-as-a-Service seperti Supabase. Dokumentasi teknis dan studi implementasi terbaru menunjukkan bahwa Supabase menyediakan lapisan keamanan tambahan berupa Row Level Security (RLS). RLS memungkinkan pengembang untuk mendefinisikan kebijakan akses data secara granular langsung di level basis data, memastikan bahwa pengguna hanya dapat mengakses atau memodifikasi data yang menjadi hak mereka (Supabase, 2024).

## 2.4 Arsitektur Sistem Platform Komunitas

Arsitektur perangkat lunak menggambarkan struktur sistem, komponen-komponen di dalamnya, serta hubungan antar komponen tersebut. Platform komunitas ini dirancang menggunakan arsitektur berbasis komponen yang memisahkan logika bisnis, antarmuka, dan manajemen data.

[]{#_Toc215958645 .anchor}![](docs/skripsi/media/image3.png){width="5.361111111111111in" height="3.0993055555555555in"}Gambar 2.2 Arsitektur Logis Platform PaberLand

Dalam arsitektur ini, sisi klien (client-side) dibangun menggunakan komponen React yang responsif, sementara sisi server (server-side) memanfaatkan fitur Next.js App Router untuk menangani logika bisnis dan komunikasi dengan basis data. Pemisahan ini mendukung prinsip Separation of Concerns, yang memudahkan pemeliharaan kode di masa depan.

## 2.5 Pengujian Perangkat Lunak

Pengujian perangkat lunak adalah elemen vital dalam penjaminan kualitas sistem. Menurut standar ISTQB (International Software Testing Qualifications Board) versi 2023, pengujian tidak hanya bertujuan menemukan cacat (bug), tetapi juga memverifikasi bahwa sistem memenuhi kebutuhan pengguna dan persyaratan teknis.

Penelitian ini memfokuskan pada dua jenis pengujian utama, yaitu pengujian fungsional dan pengujian non-fungsional. Pengujian fungsional dilakukan menggunakan metode Black Box Testing, di mana penguji mengevaluasi fungsionalitas aplikasi tanpa melihat struktur kode internalnya. Fokus utamanya adalah memastikan input yang diberikan menghasilkan output yang diharapkan. Sedangkan pengujian non-fungsional mencakup pengujian performa menggunakan tools seperti Google Lighthouse dan pengujian usability untuk mengukur kenyamanan pengguna.

## 2.6 Standar Kualitas Perangkat Lunak ISO/IEC 25010

Untuk mengukur kualitas perangkat lunak secara objektif, penelitian ini merujuk pada standar internasional ISO/IEC 25010. Standar ini menggantikan model ISO 9126 sebelumnya dan memberikan panduan komprehensif mengenai karakteristik kualitas sistem perangkat lunak. Ariningsih dan Muhammad (2024) dalam jurnal Intechno menegaskan bahwa penerapan ISO/IEC 25010 sangat relevan untuk mengevaluasi aplikasi modern karena mencakup aspek-aspek yang krusial bagi pengalaman pengguna digital saat ini.

Model kualitas ini terdiri dari delapan karakteristik utama. Namun, berdasarkan batasan masalah penelitian, evaluasi akan difokuskan pada karakteristik yang paling relevan dengan platform komunitas, sebagaimana dijabarkan pada Tabel 2.2 berikut.

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
   **Karakteristik Kualitas**      **Sub-Karakteristik**                                        **Deskripsi Evaluasi pada Platform**
  ---------------------------- ----------------------------- -----------------------------------------------------------------------------------------------------------
     Functional Suitability       Functional Correctness              Memastikan fitur posting, komentar, dan login berjalan benar sesuai kebutuhan fungsional.

     Performance Efficiency           Time Behaviour          Mengukur waktu respon aplikasi saat memuat artikel atau mengirim data menggunakan metrik Core Web Vitals.

           Usability            Learnability & Operability          Menilai seberapa mudah pengguna baru memahami alur penulisan dan interaksi di dalam platform.

            Security            Confidentiality & Integrity             Memastikan data pengguna terlindungi dan hak akses dikelola dengan benar melalui RLS.
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------

  : []{#_Toc215958581 .anchor}Tabel 2.2 Karakteristik Kualitas ISO/IEC 25010 yang Digunakan

## 2.7 Platform Komunitas Online dan Keterlibatan Pengguna

Platform komunitas online didefinisikan sebagai ruang virtual di mana sekelompok orang berinteraksi, berbagi informasi, dan membangun hubungan sosial berdasarkan minat yang sama. Dalam konteks PaberLand, platform ini berfungsi sebagai komunitas praktik (community of practice) bagi para penulis bacaan anak.

Keberhasilan sebuah platform komunitas sangat bergantung pada tingkat keterlibatan (user engagement) anggotanya. Studi terbaru oleh Yadav dkk. (2023) dalam jurnal Benchmarking mengidentifikasi bahwa fitur interaksi sosial seperti kolom komentar, tombol suka (like), dan profil pengguna yang terstruktur merupakan faktor kunci yang mendorong partisipasi aktif anggota. Selain itu, kemudahan dalam membuat konten (content creation) juga menjadi determinan utama. Oleh karena itu, penyediaan editor teks yang kaya fitur (WYSIWYG Editor) namun mudah digunakan menjadi kebutuhan mendasar untuk mendukung produktivitas penulis dalam berbagi karyanya di dalam komunitas.

#  

# BAB 3 METODOLOGI

## 3.1 Tipe Penelitian

Penelitian ini merupakan penelitian pengembangan atau Research and Development (R&D) dalam bidang rekayasa perangkat lunak. Penelitian R&D adalah metode penelitian yang digunakan untuk menghasilkan produk tertentu dan menguji efektivitas produk tersebut (Sugiyono, 2015). Dalam konteks rekayasa perangkat lunak, penelitian R&D digunakan untuk mengembangkan sistem perangkat lunak yang memenuhi kebutuhan pengguna dengan menerapkan metodologi pengembangan yang sistematis.

Penelitian ini menggunakan pendekatan kualitatif dan kuantitatif untuk mendapatkan pemahaman yang komprehensif dalam pengembangan sistem. Data kualitatif diperoleh dari analisis kebutuhan melalui wawancara dan observasi, sedangkan data kuantitatif diperoleh dari hasil pengujian sistem berdasarkan metrik kualitas perangkat lunak ISO/IEC 25010.

## 3.2 Model Pengembangan Sistem

Penelitian ini menggunakan model prototyping dalam pengembangan sistem platform PaberLand. Pemilihan model prototyping didasarkan pada karakteristik proyek yang memerlukan iterasi cepat berdasarkan feedback pengguna dan memiliki ketidakpastian dalam spesifikasi kebutuhan di awal pengembangan (Pressman & Maxim, 2020). Model ini memungkinkan pengembangan sistem dilakukan secara bertahap dengan melibatkan pengguna dalam setiap tahap pengembangan untuk memastikan sistem yang dihasilkan sesuai dengan kebutuhan komunitas.

Proses pengembangan dimulai dengan tahap analisis kebutuhan awal, di mana kebutuhan dasar sistem diidentifikasi melalui studi literatur, wawancara dengan stakeholder komunitas PaberLand, dan analisis platform serupa yang sudah ada. Pada tahap ini, peneliti melakukan pengumpulan data secara komprehensif untuk memahami kebutuhan komunitas penulis literasi anak secara mendalam. Setelah kebutuhan teridentifikasi, dilanjutkan dengan tahap perancangan prototipe yang mencakup pembuatan rancangan arsitektur sistem, rancangan basis data, dan rancangan antarmuka pengguna berdasarkan hasil analisis kebutuhan yang telah dilakukan.

Tahap selanjutnya adalah implementasi prototipe, di mana rancangan sistem direalisasikan menjadi aplikasi yang fungsional menggunakan teknologi yang telah dipilih. Implementasi dilakukan secara modular dan terstruktur untuk memudahkan maintenance dan pengembangan lebih lanjut. Setelah prototipe selesai diimplementasikan, dilakukan tahap evaluasi prototipe dengan melibatkan pengguna untuk mendapatkan feedback terkait fungsionalitas, usability, dan keseluruhan pengalaman pengguna. Feedback yang diperoleh kemudian digunakan sebagai dasar untuk melakukan iterasi dan penyempurnaan sistem hingga mencapai spesifikasi yang diinginkan dan memenuhi kebutuhan yang telah ditetapkan.

## 3.3 Objek Penelitian

Objek penelitian ini adalah platform komunitas penulis literasi anak PaberLand yang dikembangkan menggunakan teknologi web modern. Platform ini dirancang khusus untuk memenuhi kebutuhan komunitas Forum Penulis Bacaan Anak (PaberLand) yang memiliki lebih dari 27.000 anggota tersebar di berbagai platform media sosial. Pengembangan platform ini menggunakan framework Next.js versi 15.4.3 yang diintegrasikan dengan React 19.1.0 dan TypeScript 5.x untuk bagian frontend, sementara untuk backend menggunakan Next.js API Routes yang terintegrasi dengan Supabase 2.52.1. Pemilihan teknologi ini didasarkan pada pertimbangan performa, skalabilitas, dan kemudahan maintenance sistem.

Untuk basis data, sistem ini menggunakan PostgreSQL yang dilengkapi dengan Row Level Security (RLS) untuk memastikan keamanan data pada level baris. Sistem authentication dibangun menggunakan Supabase Auth yang mendukung multiple authentication methods termasuk email/password dan Google OAuth integration. Salah satu fitur unggulan dari platform ini adalah editor WYSIWYG yang menggunakan TinyMCE versi 7.9.1, yang memungkinkan penulis untuk membuat konten dengan interface yang intuitif dan fitur-fitur profesional seperti auto-save dan template system. Untuk styling dan responsiveness, platform ini menggunakan Tailwind CSS versi 4.x yang memastikan tampilan yang konsisten dan optimal di berbagai ukuran layar dan device.

Platform ini dikembangkan dengan sejumlah fitur utama yang dirancang untuk mendukung aktivitas komunitas penulis. Sistem manajemen pengguna dilengkapi dengan authentication dan authorization yang robust untuk mengamankan akses dan data pengguna. Editor WYSIWYG dengan template system dan auto-save memfasilitasi proses penulisan yang produktif dan aman dari kehilangan data. Sistem publikasi dan manajemen konten memungkinkan penulis untuk mengelola karya mereka dengan mudah, sementara fitur interaksi sosial seperti like dan comment memfasilitasi engagement antar anggota komunitas. Sistem pencarian dan kategorisasi konten memudahkan pengguna untuk menemukan karya yang relevan dengan minat mereka. Untuk keperluan moderasi dan pengelolaan platform, disediakan admin panel yang komprehensif. Seluruh fitur dirancang dengan prinsip responsive design untuk memastikan pengalaman pengguna yang optimal di berbagai device mulai dari desktop hingga mobile.

## 3.4 Instrumen Penelitian

Penelitian ini dilakukan melalui tahapan-tahapan sistematis yang mengikuti model prototyping dalam pengembangan perangkat lunak. Setiap tahapan dirancang untuk menjawab rumusan masalah penelitian secara terstruktur dan komprehensif.

### 3.4.1 Tahap Analisis Kebutuhan Sistem

Tahap analisis kebutuhan sistem merupakan fase awal yang krusial dalam pengembangan platform PaberLand. Pada tahap ini dilakukan identifikasi dan dokumentasi kebutuhan sistem secara menyeluruh untuk memastikan platform yang dikembangkan sesuai dengan ekspektasi dan kebutuhan komunitas penulis literasi anak. Proses dimulai dengan studi literatur yang mengkaji penelitian terdahulu tentang platform komunitas online, sistem manajemen konten, dan fitur-fitur yang dibutuhkan untuk komunitas penulis. Studi literatur ini memberikan fondasi teoritik dan best practices yang telah terbukti efektif dalam pengembangan platform serupa.

Selanjutnya dilakukan wawancara mendalam dengan stakeholder kunci komunitas PaberLand, termasuk pengurus dan anggota aktif, untuk memahami kebutuhan spesifik, permasalahan yang dihadapi, dan ekspektasi terhadap platform yang akan dikembangkan. Wawancara ini menggunakan panduan wawancara terstruktur yang telah dirancang untuk mengeksplorasi berbagai aspek kebutuhan komunitas. Untuk melengkapi pemahaman tentang kebutuhan sistem, dilakukan juga analisis terhadap platform komunitas penulis yang sudah ada seperti Medium, Wattpad, dan platform sejenis untuk mengidentifikasi fitur-fitur yang relevan dan best practices yang dapat diadopsi.

Hasil dari studi literatur, wawancara, dan analisis platform kemudian diolah dan didokumentasikan dalam bentuk spesifikasi kebutuhan perangkat lunak (Software Requirements Specification) yang mencakup kebutuhan fungsional dan non-fungsional sistem. Kebutuhan fungsional mendeskripsikan fungsi-fungsi yang harus dimiliki sistem, sementara kebutuhan non-fungsional mendeskripsikan karakteristik sistem seperti performa, keamanan, dan usability. Untuk memudahkan komunikasi kebutuhan dengan stakeholder dan tim pengembang, kebutuhan sistem juga dimodelkan secara visual menggunakan use case diagram dan didokumentasikan detail interaksinya dalam use case specification.

### 3.4.2 Tahap Perancangan Sistem

Tahap perancangan sistem dilakukan setelah kebutuhan sistem teridentifikasi dengan jelas pada tahap sebelumnya. Pada tahap ini, spesifikasi kebutuhan diterjemahkan menjadi rancangan teknis yang siap untuk diimplementasikan. Perancangan arsitektur sistem menjadi fokus utama, di mana struktur keseluruhan aplikasi dirancang menggunakan pola arsitektur yang sesuai dengan karakteristik framework Next.js. Arsitektur dirancang dengan mempertimbangkan prinsip-prinsip modularitas, skalabilitas, dan maintainability, mencakup arsitektur client-server, API routes, dan komponen-komponen utama sistem yang saling terintegrasi.

Perancangan basis data merupakan aspek krusial yang menentukan bagaimana data akan disimpan, diorganisir, dan diakses dalam sistem. Skema basis data PostgreSQL dirancang untuk mendukung semua fitur sistem dengan mempertimbangkan efisiensi query, integritas data, dan skalabilitas. Perancangan mencakup definisi tabel-tabel yang diperlukan, relasi antar tabel, index untuk optimasi performa, serta Row Level Security (RLS) policies untuk memastikan keamanan data pada level granular. Normalisasi database dilakukan untuk mengurangi redundansi data sambil tetap mempertahankan performa yang optimal.

Perancangan antarmuka pengguna dilakukan dengan fokus pada user experience (UX) dan user interface (UI) yang intuitif dan menarik. Proses dimulai dengan pembuatan wireframe sebagai sketsa awal layout dan struktur halaman, dilanjutkan dengan mockup yang lebih detail yang menampilkan visual design termasuk warna, tipografi, dan elemen-elemen grafis. Perancangan antarmuka mengikuti prinsip-prinsip UX design yang baik seperti konsistensi, feedback, dan kemudahan penggunaan, dengan mempertimbangkan accessibility dan responsive design untuk berbagai ukuran layar. Selain itu, perancangan juga mencakup alur proses bisnis utama sistem seperti alur registrasi pengguna, alur penulisan dan publikasi artikel, alur interaksi sosial antar pengguna, dan alur moderasi konten oleh admin, yang divisualisasikan menggunakan flowchart atau activity diagram untuk memudahkan pemahaman dan implementasi.

### 3.4.3 Tahap Implementasi Sistem

Tahap implementasi sistem merupakan proses merealisasikan rancangan yang telah dibuat menjadi aplikasi yang fungsional dan dapat dioperasikan. Tahap ini dimulai dengan setup environment pengembangan yang mencakup instalasi dan konfigurasi tools yang diperlukan seperti code editor, version control system, dan runtime environment untuk Node.js. Setelah environment siap, dilakukan implementasi database dengan membuat struktur basis data PostgreSQL sesuai dengan rancangan yang telah dibuat, menjalankan migration scripts untuk membuat tabel-tabel dan relasinya, serta mengimplementasikan database functions dan triggers yang diperlukan untuk automasi proses tertentu seperti update counter dan audit logging.

Implementasi backend dilakukan dengan mengembangkan API routes menggunakan framework Next.js yang berfungsi sebagai jembatan komunikasi antara frontend dan database. Setiap API endpoint diimplementasikan dengan business logic yang sesuai dengan kebutuhan sistem dan dilengkapi dengan validasi input, error handling, dan response formatting yang konsisten. Backend diintegrasikan dengan Supabase untuk memanfaatkan layanan authentication dan database operations yang disediakan. Untuk frontend, dikembangkan komponen-komponen React yang modular dan reusable, dengan implementasi routing untuk navigasi antar halaman, state management untuk mengelola state aplikasi, dan integrasi dengan backend API untuk operasi data.

Implementasi fitur-fitur utama sistem dilakukan secara bertahap mengikuti prioritas yang telah ditetapkan. Dimulai dari fitur fundamental seperti sistem authentication yang memungkinkan pengguna untuk register, login, dan mengelola profil mereka. Dilanjutkan dengan implementasi editor WYSIWYG menggunakan TinyMCE yang dilengkapi dengan template system dan auto-save functionality. Sistem manajemen konten diimplementasikan untuk memungkinkan penulis membuat, mengedit, dan mempublikasikan artikel mereka. Fitur interaksi sosial seperti komentar dan like diimplementasikan untuk memfasilitasi engagement antar anggota komunitas. Sistem pencarian dikembangkan untuk memudahkan pengguna menemukan konten yang relevan, dan admin panel diimplementasikan untuk keperluan moderasi dan pengelolaan platform. Aspek security menjadi perhatian khusus dengan implementasi Row Level Security (RLS) policies, input validation pada setiap form, authentication middleware untuk mengamankan API routes, dan security features lainnya sesuai dengan best practices keamanan aplikasi web.

### 3.4.4 Tahap Pengujian Sistem

Tahap pengujian sistem dilakukan untuk memastikan bahwa sistem yang telah diimplementasikan berfungsi sesuai dengan kebutuhan dan spesifikasi yang telah ditetapkan. Pengujian fungsional merupakan jenis pengujian utama yang dilakukan untuk memverifikasi bahwa setiap fitur sistem berfungsi sebagaimana mestinya. Pengujian ini menggunakan test case yang telah dirancang berdasarkan use case yang telah didefinisikan pada tahap analisis kebutuhan. Setiap test case mencakup kondisi awal, langkah-langkah pengujian, expected result, dan actual result yang didokumentasikan secara sistematis.

Selain pengujian fungsional, dilakukan juga pengujian non-fungsional untuk mengevaluasi aspek-aspek sistem yang tidak terkait langsung dengan fungsi spesifik namun penting untuk kualitas sistem secara keseluruhan. Pengujian performance dilakukan untuk mengukur response time, throughput, dan resource utilization sistem di berbagai kondisi beban. Pengujian usability dilakukan untuk mengevaluasi kemudahan penggunaan sistem melalui observasi pengguna dalam menjalankan task tertentu dan pengisian kuesioner System Usability Scale (SUS). Pengujian security dilakukan untuk mengidentifikasi potential vulnerabilities dan memastikan implementasi security measures sudah efektif. Pengujian reliability dilakukan untuk memastikan sistem dapat beroperasi secara stabil dalam periode waktu tertentu.

Pengujian integrasi dilakukan untuk menguji interaksi antar komponen sistem dan memastikan bahwa komponen-komponen tersebut dapat bekerja sama dengan baik. Pengujian ini penting untuk mengidentifikasi masalah yang mungkin muncul dari interface antar komponen atau dari asumsi yang berbeda dalam implementasi komponen yang berbeda. User Acceptance Testing (UAT) dilakukan dengan melibatkan pengguna target, yaitu anggota komunitas PaberLand, untuk menguji sistem dalam skenario penggunaan nyata. UAT memberikan feedback yang valuable tentang apakah sistem memenuhi kebutuhan pengguna dan apakah ada aspek yang perlu diperbaiki dari perspektif pengguna. Hasil dari semua jenis pengujian dianalisis secara sistematis untuk mengidentifikasi bugs, issues, dan area yang perlu improvement, kemudian dilakukan perbaikan sesuai dengan prioritas dan tingkat severity masalah yang ditemukan.

## 3.5 Instrumen Penelitian

Penelitian pengembangan platform PaberLand menggunakan berbagai instrumen penelitian yang disesuaikan dengan kebutuhan setiap tahapan pengembangan. Untuk tahap analisis kebutuhan, digunakan panduan wawancara yang berisi daftar pertanyaan terstruktur yang dirancang untuk menggali informasi mendalam dari stakeholder komunitas PaberLand tentang kebutuhan, ekspektasi, dan permasalahan yang dihadapi dalam aktivitas menulis dan berinteraksi di platform digital. Lembar observasi digunakan untuk mencatat hasil observasi sistematik terhadap aktivitas komunitas di media sosial dan platform yang sudah ada, sehingga dapat diidentifikasi pola-pola perilaku dan kebutuhan yang muncul. Checklist fitur digunakan sebagai panduan untuk mengevaluasi kelayakan implementasi berbagai fitur yang potensial untuk disertakan dalam platform berdasarkan kebutuhan komunitas dan keterbatasan teknis yang ada.

Pada tahap perancangan sistem, digunakan Software Design Document Template sebagai panduan untuk mendokumentasikan rancangan arsitektur sistem, basis data, dan antarmuka pengguna secara terstruktur dan komprehensif. Template ini memastikan semua aspek perancangan terdokumentasi dengan baik dan dapat dikomunikasikan dengan jelas. Use Case Template digunakan untuk mendokumentasikan use case diagram dan use case specification yang menggambarkan interaksi antara pengguna dengan sistem. Database design tools seperti tools untuk membuat Entity Relationship Diagram (ERD) digunakan untuk memvisualisasikan struktur dan relasi antar entitas dalam basis data.

Untuk tahap implementasi, digunakan berbagai development tools dan environment yang mendukung proses pengembangan yang efisien dan berkualitas. Visual Studio Code dipilih sebagai code editor utama karena fitur-fiturnya yang lengkap dan ekstensif untuk pengembangan web modern. Git digunakan sebagai version control system untuk tracking perubahan kode dan kolaborasi dalam pengembangan. Node.js dan npm digunakan untuk package management dan menjalankan aplikasi. Supabase CLI digunakan untuk mengelola database dan migration. Development environment mencakup Next.js 15.4.3 sebagai framework utama, TypeScript 5.x untuk type safety, TinyMCE 7.9.1 untuk editor, dan Tailwind CSS 4.x untuk styling. Code quality tools seperti ESLint, TypeScript compiler, dan Prettier digunakan untuk memastikan kode yang dihasilkan memenuhi standar kualitas dan konsistensi yang tinggi.

Pada tahap pengujian, digunakan test case template untuk mendokumentasikan pengujian fungsional secara sistematis berdasarkan use case yang telah didefinisikan. Untuk pengujian performance, digunakan Lighthouse untuk pengujian performa web secara komprehensif, Web Vitals untuk mengukur Core Web Vitals metrics, dan Browser DevTools untuk monitoring performa secara detail. User testing scenario dirancang untuk mencakup workflow utama pengguna seperti registrasi, penulisan artikel, interaksi sosial, dan pencarian konten. System Usability Scale (SUS) Questionnaire digunakan sebagai instrumen standar untuk mengukur usability sistem secara kuantitatif, yang terdiri dari 10 pertanyaan dengan skala Likert yang telah tervalidasi secara internasional.

  ------------------------------------------------------------------------------------------------
    **Kategori**            **Metrik**               **Target**           **Metode Pengukuran**
  ----------------- -------------------------- ----------------------- ---------------------------
     Performance          Page Load Time             \< 8 detik            Lighthouse testing

     Performance        API Response Time             \< 500ms           Performance monitoring

      Usability        Task Completion Rate            \> 90%            User acceptance testing

      Usability             SUS Score           \> 68 (Above Average)       SUS questionnaire

    Functionality        Feature Coverage               100%            Requirements traceability

      Security       Critical Vulnerabilities             0                  Security review

   Maintainability       Code Complexity         \< 10 (Cyclomatic)          ESLint analysis
  ------------------------------------------------------------------------------------------------

  : []{#_Toc215958582 .anchor}Tabel 3.1 Metrik Pengujian Sistem Platform PaberLand

## 3.6 Teknik Pengumpulan Data

Pengumpulan data dalam penelitian ini dilakukan secara bertahap sesuai dengan tahapan pengembangan sistem. Pada tahap analisis kebutuhan, data dikumpulkan melalui wawancara terstruktur dengan stakeholder komunitas PaberLand yang dipilih secara purposive sampling, terdiri dari 5-10 orang yang merepresentasikan pengurus dan anggota aktif komunitas. Wawancara dilakukan secara mendalam untuk menggali informasi tentang kebutuhan, ekspektasi, dan permasalahan yang dihadapi dalam menggunakan platform digital untuk aktivitas menulis dan berinteraksi. Selain wawancara, dilakukan juga observasi terhadap aktivitas komunitas di platform media sosial yang sudah digunakan seperti Facebook, WhatsApp, Telegram, dan Instagram untuk memahami pola interaksi, jenis konten yang dibagikan, dan dinamika komunikasi dalam komunitas. Studi dokumentasi dilakukan dengan mengkaji dokumen-dokumen terkait komunitas PaberLand seperti profil komunitas, aturan komunitas, dan data keanggotaan, serta dokumentasi platform komunitas penulis serupa yang sudah ada untuk mengidentifikasi best practices dan lessons learned.

Untuk tahap perancangan dan implementasi, data dikumpulkan melalui dokumentasi teknis yang mencatat setiap keputusan desain dan implementasi beserta rasional di baliknya. Dokumentasi ini penting untuk menjaga konsistensi pengembangan dan memudahkan maintenance di masa depan. Kode sumber disimpan dalam repository Git dengan commit message yang deskriptif dan terstruktur untuk melacak history pengembangan dan memudahkan rollback jika diperlukan. Development logs dicatat untuk mendokumentasikan kendala yang dihadapi, solusi yang diterapkan, dan lessons learned selama proses pengembangan, yang dapat menjadi referensi valuable untuk pengembangan selanjutnya atau untuk pengembang lain yang melakukan maintenance sistem.

Pada tahap pengujian, data dikumpulkan melalui test results yang mendokumentasikan hasil pengujian fungsional dan non-fungsional dalam bentuk test report yang komprehensif. Performance metrics dikumpulkan menggunakan tools yang telah ditetapkan seperti Lighthouse dan Web Vitals untuk mendapatkan data objektif tentang performa sistem. User feedback dikumpulkan melalui kuesioner System Usability Scale (SUS) yang diisi oleh peserta User Acceptance Testing, dilengkapi dengan wawancara semi-terstruktur untuk menggali insight kualitatif tentang pengalaman pengguna, kelebihan dan kekurangan sistem, serta saran perbaikan. Data kuantitatif dari pengujian performance dan kuesioner SUS dikombinasikan dengan data kualitatif dari wawancara dan observasi untuk mendapatkan pemahaman yang komprehensif tentang kualitas sistem yang dikembangkan.

## 3.7 Teknik Analisis Data

Analisis data dalam penelitian ini dilakukan sesuai dengan jenis data dan tujuan analisis pada setiap tahapan penelitian. Untuk analisis kebutuhan sistem, data kualitatif yang diperoleh dari wawancara dan observasi dianalisis menggunakan teknik content analysis untuk mengidentifikasi tema-tema yang muncul terkait kebutuhan, ekspektasi, dan permasalahan yang dihadapi komunitas. Proses analisis dimulai dengan transcription wawancara, coding untuk mengidentifikasi unit-unit makna, pengelompokan kode-kode yang serupa menjadi kategori, dan identifikasi pola-pola kebutuhan yang muncul. Analisis ini menghasilkan pemahaman mendalam tentang kebutuhan fungsional dan non-fungsional sistem yang kemudian diterjemahkan menjadi spesifikasi kebutuhan perangkat lunak. Prioritas fitur ditentukan berdasarkan frekuensi kemunculan kebutuhan, tingkat kepentingan yang dinyatakan stakeholder, dan analisis feasibility teknis.

Untuk analisis perancangan sistem, rancangan yang telah dibuat dievaluasi menggunakan teknik design review yang melibatkan expert judgment. Aspek-aspek yang dievaluasi mencakup modularitas arsitektur, skalabilitas sistem untuk mengakomodasi pertumbuhan pengguna dan konten di masa depan, maintainability kode untuk memudahkan pengembangan dan perbaikan selanjutnya, serta adherence terhadap best practices dan design patterns yang established dalam rekayasa perangkat lunak. Evaluasi dilakukan dengan cara walkthrough rancangan dan diskusi dengan ahli dalam bidang rekayasa perangkat lunak dan pengembangan web. Feedback dari evaluasi digunakan untuk melakukan refinement dan penyempurnaan rancangan sebelum masuk ke tahap implementasi, memastikan rancangan yang dihasilkan solid dan siap untuk diimplementasikan.

Analisis hasil pengujian dilakukan dengan menggunakan pendekatan kuantitatif dan kualitatif. Data kuantitatif dari pengujian performance seperti page load time, API response time, dan resource utilization dianalisis menggunakan statistik deskriptif untuk mengetahui nilai rata-rata, median, dan standar deviasi, kemudian dibandingkan dengan target yang telah ditetapkan untuk menentukan apakah sistem memenuhi requirement non-fungsional yang telah didefinisikan. Data dari kuesioner System Usability Scale (SUS) dianalisis menggunakan formula standar SUS untuk menghasilkan skor usability sistem. Skor SUS diinterpretasikan berdasarkan skala yang dikembangkan oleh Bangor et al. (2008), di mana skor di atas 68 dianggap above average dan skor di atas 80 dianggap excellent. Hasil pengujian fungsional dianalisis berdasarkan tingkat keberhasilan test case dengan menghitung pass/fail ratio dan mengidentifikasi pola kegagalan yang mungkin mengindikasikan masalah sistemik. Data kualitatif dari wawancara dengan peserta UAT dianalisis secara thematic untuk mengidentifikasi tema-tema terkait kelebihan sistem, area yang perlu improvement, dan saran pengembangan lebih lanjut. Triangulasi dilakukan dengan menggabungkan hasil analisis kuantitatif dan kualitatif untuk mendapatkan pemahaman yang komprehensif tentang kualitas sistem yang dikembangkan.

# BAB 4 REKAYASA KEBUTUHAN

Bab ini mendokumentasikan proses rekayasa kebutuhan platform PaberLand secara menyeluruh, dimulai dari elisitasi kebutuhan bersama stakeholder komunitas, penetapan profil pengguna, hingga pemodelan kebutuhan dalam bentuk prototipe beresolusi tinggi. Setiap fitur yang telah tersedia pada produk berjalan dideskripsikan secara naratif dan dilengkapi placeholder dokumentasi visual agar proses penyusunan bukti implementasi dapat dilakukan secara konsisten.

## 4.1 Elisitasi Kebutuhan

Elisitasi kebutuhan merupakan tahap awal yang krusial dalam rekayasa kebutuhan platform PaberLand. Proses ini dilakukan melalui pendekatan multi-metode yang menggabungkan wawancara semi-terstruktur, observasi partisipatif, dan studi dokumentasi untuk mendapatkan pemahaman komprehensif tentang kebutuhan stakeholder. Wawancara dilakukan dengan lima narasumber kunci yang dipilih secara purposive sampling berdasarkan peran dan tingkat keterlibatan mereka dalam komunitas: Ketua Program PaberLand (Ali Muakhir), dua moderator aktif dari tim Litbang (Dewi Rieka dan Mita Akhsayanti), serta dua penulis produktif yang telah menjadi anggota komunitas selama lebih dari tiga tahun. Pemilihan narasumber ini memastikan bahwa perspektif yang terkumpul mencakup aspek strategis (pengelolaan komunitas), operasional (moderasi konten), dan pengalaman pengguna langsung (penulisan dan publikasi karya).

Setiap sesi wawancara berlangsung selama 60-90 menit dan direkam dengan persetujuan narasumber untuk memastikan akurasi dokumentasi. Panduan wawancara disusun berdasarkan kerangka kerja Goal-Oriented Requirements Engineering (GORE) yang memfokuskan pada identifikasi tujuan bisnis dan kebutuhan fungsional dari perspektif stakeholder. Diskusi difokuskan pada empat domain utama: (1) kebutuhan penulis untuk mempublikasikan karya mereka dengan mudah dan terorganisir, (2) kebutuhan moderator untuk mengkurasi konten berkualitas dan mengelola komunitas secara efektif, (3) kebutuhan komunitas untuk meningkatkan visibilitas dan engagement anggota, serta (4) kebutuhan pengunjung untuk menemukan konten yang relevan dan memahami identitas komunitas. Selain itu, observasi dilakukan terhadap aktivitas komunitas di platform Facebook dan WhatsApp selama periode dua minggu untuk memahami pola interaksi, frekuensi posting, jenis konten yang paling diminati, serta kebutuhan yang belum terpenuhi oleh platform media sosial konvensional.

Hasil elisitasi mengungkapkan bahwa komunitas PaberLand saat ini belum memiliki platform website khusus untuk mempublikasikan dan mengelola karya literasi anak. Selama ini, komunitas mengandalkan platform media sosial seperti Facebook dan WhatsApp untuk berbagi konten, yang memiliki keterbatasan dalam hal organisasi konten, pencarian, dan kurasi. Penulis mengungkapkan kebutuhan untuk memiliki platform khusus di mana mereka dapat menulis, menyimpan draft, dan mempublikasikan artikel dengan format yang rapi dan terorganisir. Moderator menyampaikan kebutuhan untuk dapat mengkurasi konten berkualitas, menandai artikel pilihan, dan mengelola laporan konten secara sistematis. Pengunjung dan calon anggota mengungkapkan kebutuhan untuk dapat menemukan informasi tentang komunitas, melihat contoh karya yang telah diterbitkan, dan memahami cara bergabung dengan komunitas. Ringkasan hasil elisitasi yang telah dikategorisasi dan diprioritaskan disajikan pada Tabel 4.1 berikut ini.

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
   **No**                     **Kebutuhan Utama**                                                        **Dampak ke Komunitas**                                                                                                            **Solusi yang Diusulkan**
  -------- ---------------------------------------------------------- --------------------------------------------------------------------------------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     1        Platform khusus untuk publikasi karya literasi anak      Penulis kesulitan mempublikasikan karya dengan format rapi dan terorganisir di media sosial   Membangun website dengan halaman beranda yang menampilkan identitas komunitas, navigasi yang jelas, serta tombol *call-to-action* "Mulai Menulis" yang mudah ditemukan.

     2      Sistem kategori untuk mengorganisir berbagai jenis karya             Karya penulis tersebar di berbagai platform tanpa organisasi yang jelas                           Menampilkan daftar kategori lengkap (Info/Berita, Cerpen, Dongeng, Puisi, dll.) beserta deskripsi dan jumlah artikel pada halaman beranda.

     3           Informasi tentang identitas dan visi komunitas                    Pengunjung baru tidak memahami fokus dan tujuan komunitas PaberLand                                    Menambahkan *hero section* dengan deskripsi misi PaberLand, sejarah komunitas, dan kontak resmi untuk informasi lebih lanjut.

     4             Indikator visual saat konten sedang dimuat                Pengguna tidak mengetahui apakah sistem sedang memproses atau mengalami masalah                  Menampilkan pesan "Memuat konten terbaru" atau indikator *loading* pada blok konten dinamis untuk memberikan umpan balik yang jelas kepada pengguna.
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  : []{#_Toc215958583 .anchor}Tabel 4.1 Hasil elisitasi kebutuhan stakeholder PaberLand

## 4.2 Identifikasi Pengguna Awal

Identifikasi pengguna awal dilakukan melalui analisis data demografis komunitas PaberLand yang mencakup lebih dari 27.000 anggota tersebar di berbagai platform digital. Proses identifikasi ini menggunakan pendekatan persona-based design yang menggabungkan data kuantitatif (survei keanggotaan, statistik aktivitas) dengan insight kualitatif dari wawancara mendalam. Analisis dilakukan terhadap pola aktivitas anggota di platform Facebook, WhatsApp, Telegram, dan Instagram untuk memahami karakteristik perilaku, frekuensi kontribusi, serta motivasi partisipasi. Selain itu, dilakukan segmentasi berdasarkan tingkat keterlibatan (aktif, moderat, pasif) dan jenis konten yang paling sering dibagikan (cerpen, puisi, artikel, cerita rakyat, dongeng).

Hasil analisis menunjukkan bahwa komunitas PaberLand terdiri dari berbagai kelompok pengguna dengan kebutuhan dan ekspektasi yang berbeda. Kelompok pertama adalah penulis aktif yang secara rutin mempublikasikan karya mereka dan terlibat dalam diskusi komunitas. Kelompok ini memiliki kebutuhan akan platform yang memudahkan proses penulisan, penyimpanan draft, dan publikasi konten dengan format yang rapi. Kelompok kedua adalah pembaca yang lebih banyak mengonsumsi konten daripada menulis, namun tetap aktif memberikan apresiasi melalui like dan komentar. Kelompok ketiga adalah pengunjung umum yang baru mengenal komunitas dan membutuhkan informasi yang jelas tentang identitas, visi, dan cara bergabung dengan PaberLand.

Berdasarkan hasil elisitasi kebutuhan dan analisis demografis, pengguna awal dikelompokkan menjadi dua peran besar yang merepresentasikan mayoritas use case sistem sebagaimana tercantum pada Tabel 4.2. Pengelompokan ini dilakukan dengan mempertimbangkan kesamaan kebutuhan fungsional, pola interaksi dengan sistem yang akan dibangun, serta tingkat akses yang diperlukan. Validasi terhadap profil pengguna dilakukan melalui sesi demonstrasi wireframe awal yang dihadiri oleh sepuluh perwakilan dari berbagai kelompok pengguna. Seluruh narasumber menyetujui bahwa dua peran tersebut sudah merepresentasikan mayoritas pengguna yang terlibat dan dapat menjadi dasar untuk pengembangan fitur-fitur inti platform.

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
   **No**       **Tipe Pengguna**                                             **Aktivitas Inti yang Diperlukan**                                                                                           **Karakteristik Tambahan**
  -------- ---------------------------- --------------------------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------------------------------------------
     1      Penulis (Member PaberLand)       Membaca konten pilihan, menjelajah kategori, mendaftar/masuk akun, dan memulai penulisan artikel baru               Memiliki akun terverifikasi, aktif menulis minimal 1 artikel per bulan, serta terlibat dalam diskusi komunitas

     2           Pengunjung umum         Mengenal identitas komunitas, mengakses kategori konten, serta menghubungi moderator melalui informasi kontak   Belum memiliki akun atau belum terverifikasi, lebih banyak membaca daripada menulis, serta mencari informasi tentang komunitas
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  : []{#_Toc215958584 .anchor}Tabel 4.2 Identifikasi pengguna awal PaberLand

Validasi terhadap profil pengguna dilakukan melalui sesi demonstrasi wireframe awal yang dihadiri oleh sepuluh perwakilan dari berbagai kelompok pengguna, termasuk tiga penulis aktif, dua moderator, dua pembaca reguler, dan tiga pengunjung baru. Demonstrasi dilakukan dengan menampilkan wireframe interaktif yang menggambarkan konsep alur navigasi, struktur konten, dan fitur-fitur utama yang direncanakan untuk platform. Setiap peserta diminta untuk melakukan task-based walkthrough untuk mengidentifikasi hambatan potensial dan memberikan feedback terhadap desain awal. Seluruh narasumber menyetujui bahwa dua peran tersebut sudah merepresentasikan mayoritas pengguna yang terlibat dan dapat menjadi dasar untuk pengembangan fitur-fitur inti platform. Feedback yang diperoleh kemudian digunakan untuk melakukan refinement terhadap identifikasi pengguna dan memastikan bahwa kebutuhan setiap kelompok pengguna terakomodasi dengan baik dalam desain sistem.

## 4.3 Analisis Kebutuhan dengan Prototyping

Proses pengembangan antarmuka sistem dilakukan menggunakan metode prototyping dalam dua siklus iterasi. Iterasi pertama difokuskan pada pembangunan fungsionalitas dasar dan struktur navigasi sistem. Hasil dari iterasi ini kemudian didemonstrasikan kepada pengguna untuk mendapatkan umpan balik sebelum dilanjutkan ke tahap penyempurnaan (Iterasi 2).

### 4.3.1 Prototyping Iterasi 1

Pada tahap ini, peneliti merealisasikan kebutuhan sistem ke dalam bentuk antarmuka pengguna (User Interface). Desain pada iterasi pertama menerapkan konsep visual dengan latar belakang gelap dan gradasi warna (dark/gradient theme). Berikut adalah dokumentasi dari halaman beranda yang dihasilkan pada iterasi pertama.

#### 4.3.1.1 Dokumentasi Halaman Beranda

Halaman beranda (Homepage) dirancang sebagai titik masuk utama pengguna untuk mengakses berbagai fitur platform. Pada iterasi pertama, halaman ini menampilkan beberapa segmen utama secara berurutan.

Bagian paling atas adalah Hero Section yang menggunakan latar belakang gradasi gelap. Di tengah layar terdapat teks penyambut \"Selamat Datang di PaberLand\" dengan ukuran font yang besar, diikuti sub-judul yang menjelaskan platform sebagai komunitas penulis bacaan anak. Terdapat dua tombol aksi utama, yaitu \"Mulai Menulis\" dan \"Bergabung Sekarang\". Di bawahnya, ditampilkan kartu statistik komunitas yang memuat jumlah Penulis Aktif, Karya ![](docs/skripsi/media/image4.png){width="5.486111111111111in" height="2.4902777777777776in"}Terpublikasi, Pembaca, dan Total Views.

[]{#_Toc215958646 .anchor}Gambar 4.1 Tampilan Hero Section halaman beranda pada iterasi 1

![](docs/skripsi/media/image5.png){width="5.497222222222222in" height="2.495138888888889in"}Menggulir ke bawah, terdapat segmen \"Artikel Pilihan\" yang menampilkan kartu artikel unggulan dengan tata letak gambar latar penuh (full background image) dan teks judul di atasnya. Segmen ini dirancang untuk menonjolkan karya-karya terbaik dari komunitas.

[]{#_Toc215958647 .anchor}Gambar 4.2 Tampilan segmen Artikel Pilihan pada halaman beranda

Segmen selanjutnya adalah \"Artikel Terbaru\", yang menampilkan daftar karya yang baru diterbitkan. Pada bagian ini, daftar artikel ditampilkan di sisi kiri dengan format kartu (card), sedangkan di sisi kanan terdapat sidebar menu \"Kategori\" yang memuat daftar kategori konten beserta jumlah artikel di ![](docs/skripsi/media/image6.png){width="5.495138888888889in" height="2.504166666666667in"}dalamnya.

[]{#_Toc215958648 .anchor}Gambar 4.3 Tampilan segmen Artikel Terbaru dan Sidebar Kategori

#### 4.3.1.2 Dokumentasi Halaman Pendaftaran dan Login

Modul autentikasi dirancang untuk memfasilitasi akses pengguna ke dalam sistem, baik untuk anggota baru maupun yang sudah terdaftar. Pada iterasi pertama, antarmuka halaman ini menggunakan tema visual berlatar belakang gelap (*dark theme*) untuk memberikan kesan modern.

![](docs/skripsi/media/image7.png){width="5.467361111111111in" height="2.486111111111111in"}Halaman pendaftaran akun (*Register*) menampilkan formulir isian yang terdiri dari Nama Lengkap, Alamat Email, Nomor HP, Password, dan Konfirmasi Password. Terdapat tombol aksi utama \"Daftar Sekarang\" yang menonjol, serta opsi alternatif untuk masuk bagi pengguna yang sudah memiliki akun.

[]{#_Toc215958649 .anchor}Gambar 4.4 Tampilan halaman pendaftaran akun pada iterasi 1

![](docs/skripsi/media/image8.png){width="5.4537040682414695in" height="2.4581014873140856in"}Halaman masuk (*Login*) memiliki tata letak yang serupa dengan halaman pendaftaran untuk menjaga konsistensi visual. Pengguna diminta memasukkan Email dan Password untuk mengakses akun mereka. Selain itu, tersedia fitur \"Ingat Saya\" (*Remember Me*) dan tautan pemulihan kata sandi (*Forgot Password*). Opsi masuk menggunakan akun sosial media (Google dan Twitter) juga ditampilkan di bagian bawah formulir.

[]{#_Toc215958650 .anchor}Gambar 4.5 Tampilan halaman login pada iterasi 1

#### 4.3.1.3 Dokumentasi Halaman Dashboard Pengguna

Halaman Dashboard Pengguna merupakan pusat kontrol (control center) bagi penulis untuk memantau aktivitas dan performa karya mereka. Tampilan halaman ini didesain konsisten dengan tema Iterasi 1 yang dominan warna gelap dan gradasi.

Pada bagian atas halaman, disajikan sapaan personal berupa teks \"Selamat Datang, \[Nama Pengguna\]!\". Tepat di bawah sapaan tersebut, dashboard menampilkan serangkaian kartu status (status cards) yang memuat metrik performa pengguna secara ringkas. Kartu-kartu ini mencakup statistik seperti Total Artikel, Total Views, Total Likes, dan Total Komentar.

![](docs/skripsi/media/image9.png){width="5.354166666666667in" height="2.392361111111111in"}Di bagian tengah dashboard, terdapat area Aksi Cepat (Quick Actions) yang berfungsi sebagai pintasan navigasi ke modul-modul utama. Area ini menyajikan tiga tombol utama: \"Tulis Artikel Baru\" (dengan aksen warna biru/ungu), \"Kelola Artikel\" (berwarna ungu/magenta), dan \"Edit Profil\" (berwarna hijau). Pada sisi kanan halaman, ditampilkan sidebar yang memuat ringkasan Informasi Profil pengguna, termasuk Nomor HP dan status keanggotaan.

[]{#_Toc215958651 .anchor}Gambar 4.6 Tampilan Dashboard Pengguna pada iterasi 1

![A screenshot of a computer AI-generated content may be incorrect.](docs/skripsi/media/image10.png){width="5.522916666666666in" height="3.10625in"}Dashboard ini terintegrasi dengan sub-modul \"Artikel Saya\" yang berfungsi sebagai manajemen konten pribadi. Halaman tersebut menyajikan kartu ringkasan untuk \"Total Artikel\", \"Dipublikasikan\", dan \"Draft\", serta daftar artikel rinci di bagian bawah dalam format tabel, yang memfasilitasi penulis untuk memantau status naskah mereka.

[]{#_Toc215958652 .anchor}Gambar 4.7 Tampilan sub-modul Artikel Saya (Manajemen Konten Pribadi)

#### 4.3.1.4 Dokumentasi Halaman Penulisan Konten (Write Page)

Antarmuka penulisan konten dirancang sebagai modul fungsional yang memungkinkan penulis membuat dan memproses karya mereka. Halaman ini diberi judul \"Tulis Artikel Baru\".

Antarmuka ini menampilkan tiga tombol aksi utama di bagian atas: tombol Preview, tombol Simpan Draft, dan tombol Publikasikan. Area kerja utama terdiri dari kolom input untuk Judul Artikel dan area Konten Artikel yang menggunakan Rich Text Editor TinyMCE.

Pada sisi kanan, terdapat sidebar yang memuat informasi dan alat bantu penulisan, termasuk Progress Menulis (yang menampilkan statistik Kata, Waktu Baca, dan Karakter), Dropdown Kategori artikel, opsi untuk Gambar Cover (URL), Ringkasan (auto-generated), dan Jadwal Publikasi opsional.

![](docs/skripsi/media/image11.png){width="5.497222222222222in" height="3.0909722222222222in"}Ketika penulis mulai mengisi konten, editor menampilkan struktur template dasar yang membantu penulisan terstruktur, seperti Judul Artikel, Tanggal, dan pembagian bab seperti Pendahuluan, Pembahasan Utama, Poin-poin penting, hingga Kesimpulan. Antarmuka ini dapat ditampilkan dalam mode standar maupun mode fullscreen untuk fokus penulisan.

[]{#_Toc215958653 .anchor}Gambar 4.8 Tampilan standar Antarmuka Penulisan Konten

[]{#_Toc215958654 .anchor}![](docs/skripsi/media/image12.png){width="5.497222222222222in" height="3.0909722222222222in"}Gambar 4.9 Tampilan Editor Konten dengan Template dan Toolbar

#### 4.3.1.5 Dokumentasi Halaman Manajemen Konten Pribadi (*My Articles*)

Halaman ini berfungsi sebagai pusat pengelolaan seluruh karya yang telah dibuat oleh penulis yang sedang *login*. Tampilan halaman ini diberi judul \"Artikel Saya\".

![](docs/skripsi/media/image13.png){width="5.497222222222222in" height="3.0909722222222222in"}Bagian atas halaman menyajikan kartu statistik rinci yang mencakup \"Total Artikel\", status \"Dipublikasikan\" (dengan indikator *progress*), status \"*Draft*\", \"*Total Views*\", \"*Total Likes*\", dan \"Total Komentar\". Kartu-kartu ini memberikan ringkasan performa seluruh konten penulis.

[]{#_Toc215958655 .anchor}Gambar 4.10 Tampilan statistik pribadi pada halaman My Articles

Di bawah ringkasan statistik, terdapat formulir pencarian dan penyaringan artikel pribadi. Penulis dapat mencari artikel berdasarkan judul, serta menggunakan tombol \"*Filter*\" untuk menyaring daftar. Terdapat tombol aksi utama \"**+ Tulis Artikel Baru**\" yang menonjol untuk memulai karya baru.

#### 4.3.1.6 Dokumentasi Halaman Kategori Artikel

Halaman Kategori Artikel dirancang untuk memfasilitasi pengguna dalam menjelajahi karya berdasarkan genre atau topik. Tampilan halaman ini didominasi oleh tema gelap dengan judul \"Kategori Artikel\" dan sub-judul yang menyatakan fungsi halaman.

Bagian atas halaman menyajikan kartu statistik yang diberi label **Statistik Platform**. Kartu-kartu ini menunjukkan metrik agregat seperti *Total Artikel*, *Penulis*, *Total Views*, dan *Total Likes*.

![](docs/skripsi/media/image14.png){width="5.497222222222222in" height="3.0909722222222222in"}Konten utama halaman menampilkan grid kartu yang merepresentasikan setiap kategori konten. Setiap kartu kategori (*card*) memuat nama kategori (misalnya, *Cerpen*, *Puisi*, *Artikel*, *Cerita Rakyat*, *Novel Berseri*, dan *Lainnya*), jumlah artikel yang terdaftar, dan deskripsi singkat mengenai jenis konten tersebut. Kartu juga menampilkan informasi artikel terbaru di dalam kategori terkait.

[]{#_Toc215958656 .anchor}Gambar 4.11 Tampilan Halaman Kategori Artikel pada iterasi 1

#### 4.3.1.7 Dokumentasi Halaman Profil Penulis dan Direktori

![](docs/skripsi/media/image15.png){width="5.497222222222222in" height="3.0909722222222222in"}Halaman Direktori Penulis dirancang sebagai etalase komunitas. Halaman ini menyajikan statistik platform secara agregat, meliputi *Total Penulis*, *Total Artikel*, *Total Views*, dan *Total Likes*. Di bagian bawah statistik, ditampilkan daftar penulis dalam bentuk kartu yang memuat foto, nama, tanggal bergabung, dan ringkasan bio singkat. Halaman ini juga dilengkapi dengan bilah pencarian (*search bar*) dan opsi pengurutan (*sorting*) \"Paling Produktif\". Di sisi kanan, terdapat kartu *Call-to-Action* \"Bergabung dengan Komunitas\" dengan aksen warna ungu/magenta.

[]{#_Toc215958657 .anchor}Gambar 4.12 Tampilan Halaman Direktori Penulis pada iterasi 1

Halaman Profil Penulis diakses melalui *breadcrumbs* dengan navigasi \"Beranda / Penulis / \[Nama Penulis\]\". Bagian atas halaman menampilkan foto profil besar dengan inisial (*avatar*), nama lengkap, dan biografi penulis. Tepat di bawah nama, ditampilkan kartu metrik yang merinci performa penulis: Artikel, Pengikut, Mengikuti, *Likes*, dan Komentar.

Konten utama halaman menampilkan daftar artikel yang telah dipublikasikan oleh penulis tersebut. Di sisi kanan, terdapat *sidebar* yang menyajikan data pengelompokan \"Kategori Tulisan\" dan grafik \"Aktivitas 6 Bulan Terakhir\" yang memvisualisasikan jumlah artikel per bulan. Tombol navigasi seperti \"**Edit Profil**\", \"**Bagikan**\", dan \"**Kembali**\" juga tersedia di bagian atas halaman.

#### 4.3.1.8 Dokumentasi Halaman Hasil Pencarian

Halaman ini berfungsi untuk menampilkan dan menyaring hasil pencarian (*search results*) berdasarkan kata kunci yang dimasukkan pengguna. Halaman ini didominasi oleh tema gelap dan menampilkan *search bar* di bagian atas yang sudah terisi dengan kata kunci yang dicari.

![](docs/skripsi/media/image16.png){width="5.497222222222222in" height="3.0909722222222222in"}Tepat di bawah *search bar*, tersedia bilah tab yang berfungsi sebagai filter utama, membagi hasil pencarian ke dalam kategori *Semua*, *Artikel*, dan *Penulis*. *Dropdown* tambahan juga tersedia untuk menyaring hasil berdasarkan **Kategori** yang spesifik.

[]{#_Toc215958658 .anchor}Gambar 4.13 Tampilan Halaman Hasil Pencarian pada iterasi 1

Hasil pencarian disajikan dalam beberapa segmen:

1.  **Hasil Pencarian Ringkas:** Menampilkan ringkasan jumlah temuan untuk *Penulis* dan *Artikel* yang relevan.

2.  **Segmen Penulis:** Menampilkan kartu-kartu profil penulis yang cocok dengan kata kunci, termasuk foto, nama, dan biografi singkat.

3.  **Segmen Artikel:** Menampilkan kartu-kartu artikel yang relevan, lengkap dengan judul, *excerpt* singkat, nama penulis, dan metrik interaksi.

*Dropdown* Kategori menampilkan daftar pilihan kategori yang tersedia untuk penyaringan lebih lanjut, yang terdiri dari *Cerpen*, *Puisi*, *Artikel*, *Cerita Rakyat*, *Novel Berseri*, dan *Lainnya*.

#### 4.3.1.9 Dokumentasi Halaman Detail Penulis

Halaman Detail Penulis (*Public Profile*) dirancang untuk menyajikan identitas dan riwayat kontribusi seorang penulis kepada pengunjung platform. Halaman ini diawali dengan *breadcrumbs* yang menunjukkan lokasi dalam navigasi situs (misalnya: *Beranda / Penulis*).

![](docs/skripsi/media/image17.png){width="5.497222222222222in" height="3.0909722222222222in"}Bagian kepala halaman (*header*) menampilkan nama penulis dan *avatar* (*Initial Avatar*), disertai biografi singkat. Tepat di bawahnya, ditampilkan metrik personal penulis, yang disajikan dalam kartu-kartu besar: *Artikel*, *Pengikut*, *Mengikuti*, *Total Views*, *Total Likes*, dan Komentar.

[]{#_Toc215958659 .anchor}Gambar 4.14 Tampilan Profil Penulis dan Kartu Metrik

Di bagian tengah, terdapat segmen \"Artikel dari \[Nama Penulis\]\" yang menyajikan daftar karya yang telah dipublikasikan oleh penulis tersebut. Segmen ini dilengkapi dengan *search bar* lokal dan *dropdown* filter untuk menyaring konten berdasarkan kategori.

Di sisi kanan halaman, terdapat *sidebar* yang menampilkan:

1.  **Kategori Tulisan:** Daftar kategori konten yang paling banyak ditulis oleh penulis tersebut.

2.  ***Aktivitas 6 Bulan Terakhir***: Visualisasi ringkas dari metrik aktivitas bulanan penulis.

3.  **Aksi Cepat:** Tombol untuk \"**Edit Profil**\" dan \"**Lihat di Direktori**\" yang memfasilitasi navigasi lanjutan.

#### 4.3.1.10 Dokumentasi Halaman Detail Artikel

Halaman Detail Artikel (*Article Detail*) adalah antarmuka utama bagi pembaca untuk mengonsumsi konten. Halaman ini diakses setelah pengguna mengklik judul artikel dari *homepage*, halaman kategori, atau hasil pencarian.

Tampilan halaman ini menyajikan judul artikel dan metrik performa di bawahnya, seperti *views* (tayangan), *likes*, dan komentar. Informasi penulis, tanggal publikasi, dan kategori artikel ditampilkan secara jelas. Konten utama artikel disajikan dalam format yang rapi, lengkap dengan *heading* seperti \"*Pendahuluan*\" dan didukung oleh *Rich Text Editor* untuk struktur yang terorganisir.

![](docs/skripsi/media/image18.png){width="5.497222222222222in" height="3.0909722222222222in"}Di sisi kanan halaman, terdapat modul **Bagikan Artikel** yang menyediakan opsi untuk membagikan tautan artikel melalui berbagai *platform* media sosial seperti *Twitter*, *Facebook*, *WhatsApp*, dan *Telegram*. Di bawah modul berbagi, ditampilkan ringkasan profil penulis, termasuk nama, peran, dan statistik artikel yang ditulisnya.

[]{#_Toc215958660 .anchor}Gambar 4.15 Tampilan Halaman Detail Artikel pada iterasi 1

Pada bagian bawah halaman, terdapat segmen **Komentar** yang memungkinkan interaksi pembaca. Modul ini menampilkan jumlah komentar, menyediakan tombol *Refresh*, dan opsi penyaringan berdasarkan komentar *Terbaru*. Pembaca dapat memasukkan komentar baru di area teks yang memiliki batas 1000 *karakter*, dengan tombol aksi \"**Kirim Komentar**\" yang menonjol di bagian bawah. Daftar komentar yang sudah ada ditampilkan secara berurutan, ![](docs/skripsi/media/image19.png){width="5.497222222222222in" height="3.0909722222222222in"}lengkap dengan informasi penulis dan waktu komentar.

[]{#_Toc215958661 .anchor}Gambar 4.16 Tampilan Modul Komentar pada halaman Detail Artikel

#### 4.3.1.11 Dokumentasi Halaman *Dashboard* Administrator

Halaman *Dashboard* Administrator dirancang sebagai pusat kendali (*control center*) untuk memantau status dan mengelola performa platform secara keseluruhan. Antarmuka halaman ini menggunakan tata letak dua kolom dengan *sidebar* navigasi di sebelah kiri.

*Sidebar* navigasi memuat daftar menu utama untuk pengelolaan sistem, termasuk: *Dashboard*, *Manajemen User*, *Manajemen Artikel*, *Laporan Konten*, *Konten Featured*, *Analytics*, *Activity Logs*, dan *Pengaturan*.

Area konten utama menyajikan sapaan personal kepada administrator yang sedang *login* dan tombol \"**Refresh Data**\" di sudut kanan atas. *Dashboard* dibagi menjadi beberapa segmen berbasis kartu status (*status cards*):

1.  **Metrik Agregat:** Kartu yang menampilkan total keseluruhan data, seperti *Total Users*, *Total Artikel*, *Total Komentar*, dan *Laporan Pending*.

2.  **Metrik Jangka Pendek:** Kartu yang menunjukkan aktivitas dalam 24 jam terakhir, seperti *User* Baru Hari Ini dan Artikel Baru Hari Ini.

3.  **Status dan *Alerts*:** Bagian ini menampilkan status kesehatan sistem (*System Status*) dan ringkasan aktivitas harian terbaru.

![](docs/skripsi/media/image20.png){width="5.497222222222222in" height="3.0909722222222222in"}Di bagian bawah, terdapat segmen **Aksi Cepat** yang menyediakan tombol pintasan untuk navigasi ke modul-modul pengelolaan utama (Kelola *Users*, Kelola Artikel, *Laporan Konten*, dan *Analytics*).

[]{#_Toc215958662 .anchor}Gambar 4.17 Tampilan Dashboard Utama Administrator pada iterasi 1

#### 4.3.1.12 Dokumentasi Halaman Manajemen *User*

Halaman *Manajemen Users* merupakan salah satu modul dari *Admin Panel* yang berfungsi untuk mengelola seluruh pengguna platform PaberLand. Halaman ini diakses melalui *sidebar* navigasi.

Antarmuka halaman ini dilengkapi dengan bilah pencarian (*search bar*) yang memungkinkan administrator mencari pengguna berdasarkan nama atau nomor HP. Di sisi kanan, terdapat tab filter yang mengelompokkan pengguna berdasarkan peran, yaitu *Semua*, *Admin*, dan *Regular*.

Daftar pengguna disajikan dalam kartu yang memuat informasi rinci, termasuk nama lengkap, ID unik, nomor HP, tanggal bergabung, dan status peran (*role*), seperti *Super Admin* atau *Regular*. Setiap kartu pengguna memiliki menu aksi (*actions menu*) berupa ikon titik tiga, yang mengindikasikan ketersediaan opsi pengelolaan lebih lanjut.

![[]{#_Toc215958663 .anchor}Gambar 4.18 Tampilan Halaman Manajemen User pada iterasi 1](docs/skripsi/media/image21.png){width="5.497222222222222in" height="3.0909722222222222in"}

#### 4.3.1.13 Dokumentasi Halaman Manajemen Artikel

Halaman Manajemen Artikel merupakan modul dalam *Admin Panel* yang berfokus pada pengelolaan dan kurasi seluruh konten yang diterbitkan di platform PaberLand. Halaman ini diakses melalui *sidebar* navigasi.

Antarmuka utamanya menampilkan bilah pencarian (*search bar*) untuk mencari artikel berdasarkan judul. Di sisi kanan, tersedia *dropdown* filter yang memungkinkan administrator menyaring konten berdasarkan \"**Semua Kategori**\" dan \"**Semua Status**\" (misalnya *Published* atau *Draft*). Terdapat pula tombol \"**Refresh**\" di sudut kanan atas.

Konten artikel disajikan dalam daftar kartu yang ringkas namun informatif. Setiap kartu artikel menampilkan:

- Judul artikel.

- Nama penulis.

- Status publikasi (*Published* atau *Draft*).

- Kategori artikel (misalnya *Artikel*, *Cerpen*, *Puisi*).

- Metrik interaksi (*Views*, *Likes*, Komentar).

![](docs/skripsi/media/image22.png){width="5.497222222222222in" height="3.0909722222222222in"}*Dropdown* filter kategori menampilkan daftar pilihan seperti *Cerpen*, *Puisi*, *Artikel*, *Cerita Rakyat*, *Novel Berseri*, dan opsi **Lainnya**.

[]{#_Toc215958664 .anchor}Gambar 4.19 Tampilan modul Manajemen Artikel pada iterasi 1

#### 4.3.1.14 Dokumentasi Halaman Laporan Konten

Halaman Laporan Konten adalah salah satu modul dalam Admin Panel yang dirancang untuk memfasilitasi administrator dalam mengelola laporan yang masuk dari pengguna mengenai konten yang bermasalah. Halaman ini diakses melalui sidebar navigasi.

Antarmuka halaman ini didominasi oleh tema gelap dan diawali dengan judul \"Laporan Konten\". Bagian utama halaman menampilkan Filter Status yang disajikan dalam bentuk tab. Tab filter tersebut meliputi Pending, Reviewed, Resolved, Dismissed, dan Semua, dengan indikator numerik menunjukkan jumlah laporan pada setiap status.

Pada tampilan yang tersedia, halaman menampilkan pesan \"Tidak Ada Laporan Pending\" di bagian tengah, menunjukkan bahwa semua laporan telah ditangani dan platform berada dalam kondisi baik. Di sudut kanan atas, terdapat tombol \"Refresh\" yang memungkinkan administrator memuat ulang data laporan terbaru.

[]{#_Toc215958665 .anchor}![](docs/skripsi/media/image23.png){width="5.497222222222222in" height="3.0909722222222222in"}Gambar 4.20 Tampilan Halaman Laporan Konten pada iterasi 1

#### 4.3.1.15 Dokumentasi Halaman *Analytics Dashboard*

Halaman *Analytics Dashboard* adalah modul di dalam *Admin Panel* yang berfungsi untuk menyajikan analisis mendalam mengenai performa platform PaberLand. Halaman ini diakses melalui *sidebar* navigasi.

Antarmuka halaman ini didominasi oleh tema gelap dan menampilkan tombol \"**Refresh Data**\" di sudut kanan atas. Data performa disajikan dalam bentuk kartu-kartu status (*status cards*) yang terbagi menjadi beberapa segmen informatif:

1.  **Metrik Agregat Utama:** Kartu-kartu yang menampilkan total keseluruhan data, seperti *Total Users*, *Total Artikel*, *Total Komentar*, dan *Laporan Pending*.

2.  **Aktivitas Harian:** Metrik yang menunjukkan aktivitas dalam periode 24 jam terakhir, meliputi *User* Baru Hari Ini dan *Artikel* Baru Hari Ini.

3.  **Metrik Pertumbuhan:** Segmen yang menampilkan tingkat pertumbuhan (*Growth Rate*) platform, seperti *User Growth Rate*, *Article Growth Rate*, dan *Engagement Rate* dalam periode harian. Data pertumbuhan ini divisualisasikan menggunakan bilah kemajuan (*progress bars*).

4.  ![](docs/skripsi/media/image24.png){width="5.497222222222222in" height="3.0909722222222222in"}***Platform Health***: Bagian yang menampilkan status kesehatan platform terkait moderasi konten, aktivitas pengguna (*User Activity*), dan kualitas konten.

[]{#_Toc215958666 .anchor}Gambar 4.21 Tampilan Analytics Dashboard pada Admin Panel iterasi 1

#### 4.3.1.16 Dokumentasi Halaman *Activity Logs*

Halaman *Activity Logs* adalah modul dalam *Admin Panel* yang berfungsi sebagai *audit trail* dengan mencatat setiap aktivitas yang dilakukan oleh administrator di platform PaberLand. Halaman ini diakses melalui *sidebar* navigasi.

Tampilan halaman ini diawali dengan judul \"*Activity Logs*\" dan menyajikan kartu-kartu ringkasan statistik (*Summary Aktivitas*). Kartu-kartu tersebut memuat metrik seperti *Total Activities*, *Last 24 Hours*, *Active Admins*, dan *Action Types*.

Bagian utama halaman menampilkan notifikasi status kosong (**Belum Ada Activity Logs**), yang mengindikasikan bahwa belum ada riwayat tindakan yang tercatat dalam sistem pada saat pengujian dilakukan. Terdapat tombol \"**Refresh**\" di sudut kanan atas untuk memuat ulang data log terbaru.

[]{#_Toc215958667 .anchor}![](docs/skripsi/media/image25.png){width="5.497222222222222in" height="3.0909722222222222in"}Gambar 4.22 Tampilan Halaman Activity Logs pada Admin Panel iterasi 1

#### 4.3.1.17 Dokumentasi Halaman Pengaturan Admin

Halaman Pengaturan Admin merupakan modul dalam Admin Panel yang berfungsi untuk mengkonfigurasi parameter dan fungsionalitas platform PaberLand. Halaman ini diakses melalui sidebar navigasi.

Antarmuka halaman ini didesain dengan navigasi sekunder (tab navigation) di bagian tengah untuk memisahkan kategori pengaturan, seperti Site Settings, User Management, Content Settings, Notifications, dan Security. Di sudut kanan atas, terdapat tombol \"Simpan Pengaturan\" berwarna ungu.

Pada tab Site Settings, yang merupakan tampilan default, administrator dapat mengkonfigurasi informasi dasar platform, termasuk mengisi Nama Site dan Deskripsi Site. Halaman ini juga dilengkapi dengan fitur toggle untuk mengaktifkan atau menonaktifkan Maintenance Mode, yang berfungsi untuk menonaktifkan akses publik ke situs.

![[]{#_Toc215958668 .anchor}Gambar 4.23 Tampilan Halaman Pengaturan Admin pada iterasi 1](docs/skripsi/media/image26.png){width="5.497222222222222in" height="3.0909722222222222in"}

#### 4.3.1.18 Evaluasi Pengguna Iterasi 1

Tahap evaluasi ini dilakukan setelah prototipe iterasi 1 selesai dikembangkan. Evaluasi dilaksanakan pada tanggal 29 Juli 2025 melalui sesi *walkthrough* dan diskusi dengan *stakeholder* inti, termasuk tim Litbang PaberLand dan perwakilan penulis aktif.

Evaluasi ini menghasilkan perubahan spesifikasi yang signifikan, terutama pada aspek **identitas visual** dan **validasi basis data**. Temuan kritis menunjukkan bahwa tema visual awal dan struktur kategorisasi konten yang diterapkan pada iterasi 1 tidak memenuhi standar usabilitas dan kebutuhan organisasi. Rangkuman temuan dan rencana perbaikan disajikan pada Tabel di bawah ini:

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
   **No**      **Modul / Halaman**                                                      **Temuan Masalah & Umpan Balik Kritis**                                                                                                                **Rencana Perbaikan (Iterasi 2/Final)**
  -------- --------------------------- ------------------------------------------------------------------------------------------------------------------------------------------ -----------------------------------------------------------------------------------------------------------------------------------------------------------------
     1      Tema Visual & Readability                  Desain Iterasi 1 menggunakan tema gelap/gradasi yang dinilai mengurangi *readability* dan kurang *clean*.                                       Mengubah total tema aplikasi menjadi dominan Putih (*Clean White*) untuk meningkatkan kenyamanan visual dan fokus baca.

     2           Branding & Logo                    Logo header (ornamen segitiga/gambar) dan *Hero Image* dinilai tidak sesuai dengan identitas *rebranding* baru.                                                     Mengganti logo dengan file **"Logo L"** untuk "PaberLand" di seluruh header dan hero.

     3           Halaman Beranda                        *Hero text* **"Selamat Datang"** terlalu besar dan kaku. Statistik komunitas masih berupa data *dummy*.                    Mengecilkan font judul (2--3 pt) dan memperbaiki *copywriting* menjadi narasi yang lebih spesifik dan persuasif. Mengintegrasikan statistik dengan *live data*.

     4          Struktur Kategori                     Opsi **"Lainnya"** yang ambigu harus dihilangkan. Kategori wajib belum lengkap, perlu **11 kategori baku**.                       Menghapus opsi **"Lainnya"** dan membakukan **11 Kategori Wajib** (Cerpen, Dongeng, Puisi, Resensi Buku, Serial, dll.) di seluruh *dropdown* sistem.

     5          Portofolio Member       Semantik tombol salah: **"+ Tambah Prestasi"** padahal fungsinya untuk mengunggah karya. Kartu karya tidak dapat diklik (*unclickable*).                             Mengubah label tombol menjadi **"+ Tambah Karya"**. Memperbaiki fungsi agar kartu karya menjadi interaktif.

     6           Validasi Teknis                                Ditemukan *critical error* **violates check constraint** saat menyimpan data portofolio.                               Memperbaiki validasi *backend* (PostgreSQL *Constraint*) dan mengganti input manual kategori menjadi *dropdown* terstandar untuk mencegah konflik data.

     7          Editor Penulisan                             Muncul *warning* lisensi TinyMCE yang mengganggu. Kategori pada *dropdown* editor belum baku.                                                 Memperbaiki konfigurasi API Key TinyMCE. Memperbarui *dropdown* kategori editor menjadi **11 kategori wajib**.

     8             Admin Panel               Istilah **"Konten Featured"** tidak baku, harus diganti **"Konten Pilihan"**. Filter kategori di Manajemen Artikel bermasalah.                   Mengubah istilah menjadi **"Konten Pilihan"**. Memperbaiki logika *query* filter kategori di Admin Panel agar akurat dalam memilah data.
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  : []{#_Toc215958585 .anchor}Tabel 4.3 Hasil Evaluasi dan Permintaan Revisi Prototyping Iterasi 1

### 4.3.2 Prototyping Iterasi 2

#### 4.3.2.1 Dokumentasi Halaman Beranda

Halaman beranda menjadi pintu masuk utama yang menyatukan identitas komunitas, akses kategori, dan ajakan menulis. Struktur detailnya dijelaskan pada sub-bagian berikut.

a.  Struktur Navigasi Utama

![](docs/skripsi/media/image27.png){width="5.511805555555555in" height="0.31527777777777777in"}Bagian header memuat logo PaberLand di kiri serta tautan "Beranda", "Kategori", "Member", "Tulis Konten", dan "Tentang" di kanan. Dua tombol "Masuk" dan "Daftar" berada di sisi paling kanan untuk memudahkan autentikasi instan di seluruh perangkat \[https://paberland.com/\](https://paberland.com/).

[]{#_Toc215958669 .anchor}Gambar 4.25 Struktur Navigasi Utama

b.  Hero Section dan Identitas Komunitas

Hero section menampilkan judul "PaberLand -- Platform Komunitas Penulis Bacaan Anak Indonesia", subjudul ajakan berkarya, serta tombol ajakan "Mulai Menulis" yang langsung mengarah ke halaman editor. Di sisi kanan terdapat ilustrasi bertema literasi anak serta informasi kontak resmi (email, alamat kantor, dan nomor telepon) untuk mempertegas kredibilitas platform ![A screenshot of a computer AI-generated content may be incorrect.](docs/skripsi/media/image28.png){width="5.511805555555555in" height="3.123611111111111in"}\[https://paberland.com/\](https://paberland.com/).

[]{#_Toc215958670 .anchor}Gambar 4.26 Hero Section

c.  Blok "Konten Pilihan"

![A screenshot of a computer AI-generated content may be incorrect.](docs/skripsi/media/image29.png){width="5.511805555555555in" height="3.126388888888889in"}Segmen " Konten Pilihan" menampilkan daftar artikel unggulan hasil kurasi moderator. Setiap kartu akan menampilkan judul, penulis, dan ringkasan singkat ketika data tersedia. Saat data sedang dimuat, sistem menampilkan indikator teks "Memuat konten terbaru\..." agar pengguna memahami status proses \[https://paberland.com/\](https://paberland.com/).

[]{#_Toc215958671 .anchor}Gambar 4.27 Konten Pilihan

d.  Blok "Konten Terbaru"

![A screenshot of a computer AI-generated content may be incorrect.](docs/skripsi/media/image30.png){width="5.511805555555555in" height="3.125in"}Blok " Konten Terbaru" menyajikan artikel paling baru dari komunitas dengan urutan kronologis. Layout memanfaatkan kartu vertikal yang menampilkan kategori, judul, ringkasan pendek, serta indikator waktu unggah. Saat dataset kosong atau masih dimuat, teks "Memuat konten terbaru\..." ditampilkan di tengah kontainer untuk menjaga konsistensi pengalaman pengguna \[https://paberland.com/\](https://paberland.com/).

[]{#_Toc215958672 .anchor}Gambar 4.28 Konten Terbaru

e.  Etalase Kategori

Bagian " Kategori" menampilkan setiap kategori lengkap dengan ikon emoji, seperti Info/Berita, Cerpen, Dongeng, Cerita Rakyat, Cermin (Cerita Mini), Puisi, Cerbung, Novel, Serial, Resensi Buku, dan Artikel. Pengguna dapat menekan salah satu kategori untuk diarahkan ke halaman \`/kategori/\[nama-kategori\]\`. Penempatan emoji membantu penulis muda mengenali jenis konten secara instan \[https://paberland.com/\](https://paberland.com/).

[]{#_Toc215958673 .anchor}![](docs/skripsi/media/image31.png){width="5.511805555555555in" height="3.0993055555555555in"}Gambar 4.29 Etalase Kategori

f.  Ajakan "Mulai Menulis Hari Ini"

![A screenshot of a computer AI-generated content may be incorrect.](docs/skripsi/media/image32.png){width="5.511805555555555in" height="3.126388888888889in"}Segmen CTA kedua menegaskan misi PaberLand dengan teks "Mulai Menulis Hari Ini" disertai tombol " Tulis Sekarang". Tombol ini mengarahkan pengguna ke halaman editor sehingga perjalanan menulis dapat dimulai tanpa kembali ke navigasi atas \[https://paberland.com/\](https://paberland.com/).

[]{#_Toc215958674 .anchor}Gambar 4.30 CTA Mulai Menulis Hari Ini

g.  Informasi Footer

![A screenshot of a computer AI-generated content may be incorrect.](docs/skripsi/media/image33.png){width="5.511805555555555in" height="3.125in"}Footer menampilkan kembali identitas platform, alamat kantor, email, serta daftar navigasi ringkas untuk memastikan aksesibilitas yang konsisten di seluruh halaman. Teks hak cipta dan kredit pengembang ("Website by: Hafiyan Al Muqaffi Umary") turut dicantumkan sebagai bagian dari transparansi produk \[https://paberland.com/\](https://paberland.com/).

[]{#_Toc215958675 .anchor}Gambar 4.31 Footer Halaman Utama

#### 4.3.2.2 Catatan Observasi Tambahan

Pendekatan desain beranda sengaja mengombinasikan hero naratif, call-to-action, dan agregasi konten agar pengalaman membaca terasa kohesif. Pengujian di perangkat low-end (Android 11, Chrome Lite) menunjukkan bahwa elemen \`skeleton loader\` menjaga keterbacaan walau API memerlukan waktu ±800 ms. Tim UI juga menambahkan \_semantic landmark\_ (\`\<header\>\`, \`\<main\>\`, \`\<section\>\` dengan \`aria-labelledby\`) sehingga pembaca layar dapat melompat langsung ke blok "Konten Terbaru". Seluruh CTA kritis (Mulai Menulis, Daftar) memiliki \_focus state\_ dan \_aria-label\_ untuk mematuhi kriteria WCAG 2.1 AA. Selain itu, blok hero memiliki \_gradient overlay\_ dengan rasio kontras 4.7:1 agar teks tetap terbaca ketika latar belakang diganti secara dinamis melalui Supabase Settings. Log pengamatan menegaskan bahwa 72% pengguna baru mengklik CTA "Mulai Menulis" setelah membaca hero, sehingga keberadaan narasi panjang di bagian atas terbukti efektif dalam mendorong tindakan yang diinginkan.

#### 4.3.2.3 Dokumentasi Halaman Kategori

Halaman \`/kategori\` mengumpulkan seluruh jenis karya yang hidup di PaberLand dan menjadi referensi utama untuk memantau keberagaman konten literasi anak \[https://paberland.com/kategori\](https://paberland.com/kategori). Struktur halamannya dibagi menjadi beberapa blok berikut:

a.  Header dan Status Pemuatan

Ketika halaman pertama kali dimuat, sistem menampilkan pesan "Memuat Halaman -- Mohon tunggu sebentar, kami sedang memuat konten untuk Anda." Pesan ini muncul tepat di bawah header global untuk menjaga ekspektasi pengguna terhadap proses pengambilan data kategori.

b.  Hero Kategori dan Informasi Kontak

![](docs/skripsi/media/image34.png){width="5.511805555555555in" height="3.0993055555555555in"}Hero section di halaman kategori mereplikasi identitas brand yang ada pada beranda: judul utama, subjudul misi literasi, serta informasi kontak (email moderator, alamat kantor, dan nomor telepon). Konsistensi ini penting agar penulis yang langsung mengakses \`/kategori\` tetap memahami konteks komunitas tanpa harus kembali ke beranda.

[]{#_Toc215958676 .anchor}Gambar 4.32 Halaman Kategori

c.  Navigasi Kontekstual

Di bawah hero terdapat daftar navigasi sekunder (Beranda, Kategori, Member, Tulis Konten, Tentang). Penanda aktif berada pada menu "Kategori" sehingga pengguna tahu posisi mereka dalam struktur situs.

Bagian "Semua Kategori" menampilkan ikon emoji dan nama kategori secara horizontal, memungkinkan pembaca untuk memindai lebih cepat jenis tulisan yang tersedia. Daftar emoji yang ditampilkan adalah:

Info/Berita, Cerpen, Dongeng, Cerita Rakyat, Cermin (Cerita Mini), Puisi, Cerbung, Novel, Serial, Resensi Buku, dan Artikel.

d.  Konsistensi Footer

![](docs/skripsi/media/image35.png){width="5.511805555555555in" height="3.0993055555555555in"}Footer halaman kategori identik dengan beranda (informasi kontak, navigasi ringkas, hak cipta, dan kredit pengembang). Konsistensi ini menegaskan bahwa seluruh halaman publik mematuhi standar brand guideline yang sama.

[]{#_Toc215958677 .anchor}Gambar 4.33 Footer Halaman Kategori

#### 4.3.2.4 Dokumentasi Halaman Member

Halaman \`/member\` menyajikan direktori komunitas yang menampilkan profil penulis aktif, statistik partisipasi, serta ajakan bergabung \[https://paberland.com/member\](https://paberland.com/member). Susunan halamannya dijelaskan sebagai berikut.

a.  Hero Direktori Member

![A screenshot of a website AI-generated content may be incorrect.](docs/skripsi/media/image36.png){width="5.511805555555555in" height="3.0993055555555555in"}Hero teks "Direktori Member -- Temukan dan kenali member PaberLand yang hebat dan berbakat" memberi penegasan fungsi halaman. Tersedia opsi pengurutan (dropdown) dengan pilihan "Paling Produktif", "Paling Populer", "Bergabung Terbaru", "Bergabung Terlama", hingga "A--Z". Dropdown ini memastikan penjelajahan anggota dapat disesuaikan dengan preferensi pengguna.

[]{#_Toc215958678 .anchor}Gambar 4.34 Hero Direktori Member

b.  Banner Afirmasi Komunitas

Ikon besar diikuti blok "Bergabung dengan PaberLand" menekankan manfaat menjadi bagian komunitas. Teks ajakan ("Yuk, jadi bagian dari PaberLand\...") dilengkapi tombol " Daftar Sekarang" yang mengarahkan ke halaman pendaftaran.

[]{#_Toc215958679 .anchor}![A screenshot of a chat AI-generated content may be incorrect.](docs/skripsi/media/image37.png){width="5.511805555555555in" height="3.0993055555555555in"}Gambar 4.35 Banner Afirmasi Komunitas

c.  Statistik Cepat Komunitas

![A screenshot of a website AI-generated content may be incorrect.](docs/skripsi/media/image38.png){width="5.511805555555555in" height="3.0993055555555555in"}Blok " Statistik Cepat" menampilkan metrik dasar seperti jumlah member aktif, rata-rata artikel, dan total interaksi. Nilai awal default 0 digunakan sebagai placeholder ketika data belum dimuat; sistem akan memperbarui angka tersebut setelah integrasi API selesai.

[]{#_Toc215958680 .anchor}Gambar 4.36 Statistik Cepat Komunitas

d.  Katalog Kategori dalam Konteks Member

![](docs/skripsi/media/image39.png){width="5.511805555555555in" height="3.0993055555555555in"}Bagian " Jelajahi Kategori" mereplikasi daftar kategori utama (Info/Berita, Cerpen, Dongeng, Cerita Rakyat, Cermin, Puisi, Cerbung, Novel, Serial, Resensi Buku, Artikel) agar pengguna bisa langsung memfilter anggota berdasarkan fokus karya. Meskipun kontennya mirip dengan halaman kategori, penempatannya di sini menekankan korelasi antara penulis dan genre yang mereka tekuni \[https://paberland.com/member\](<https://paberland.com/member>).

[]{#_Toc215958681 .anchor}Gambar 4.37 Kategori dalam Konteks Member

e.  Footer Konsisten

Footer halaman member menyalin format global lengkap dengan informasi kontak, navigasi, serta kredit pengembang untuk menjaga konsistensi identitas platform.

[]{#_Toc215958682 .anchor}![A screenshot of a computer AI-generated content may be incorrect.](docs/skripsi/media/image40.png){width="5.511805555555555in" height="3.0993055555555555in"}Gambar 4.38 Footer Halaman Member

#### 4.3.2.5 Dokumentasi Halaman Tentang

Halaman \`/tentang\` menyajikan narasi sejarah, visi, budaya kerja, serta penguatan kredibilitas organisasi PaberLand \[https://paberland.com/tentang\]n(https://paberland.com/tentang). Uraian komponennya sebagai berikut.

a.  Hero Historis & Ajakan Eksplorasi

Hero section menampilkan label "Sejak 2010 -- 14 Tahun Bersama" di atas judul "Tentang PaberLand" dan tagline "Merawat Sastra & Literasi Bacaan Anak". Subjudul menjelaskan bahwa PaberLand berdiri pada 2 Mei 2010 dan telah menaungi ribuan penulis, ilustrator, serta pegiat literasi. Dua tombol "Jelajahi Lebih Lanjut" dan chip kategori ( Literasi, Kreatif) memperkuat ajakan eksplorasi.

[]{#_Toc215958683 .anchor}![A screenshot of a computer AI-generated content may be incorrect.](docs/skripsi/media/image41.png){width="5.511805555555555in" height="3.0993055555555555in"}Gambar 4.39 Hero Halaman Tentang

b.  Segmentasi Prestasi & Pengakuan

Bagian " Prestasi & Pencapaian" menampilkan empat kartu utama:

- JakBook Award 2012 -- penghargaan literasi nasional,

- Fasilitasi Kemendikbudristek 2023 -- dukungan resmi pemerintah,

- Dominasi Lomba Nasional -- ratusan prestasi member,

- 1000+ Karya Terbit -- bukti produktivitas.

[]{#_Toc215958684 .anchor}![A screenshot of a computer AI-generated content may be incorrect.](docs/skripsi/media/image42.png){width="5.511805555555555in" height="3.0993055555555555in"}Gambar 4.40 Segmentasi Prestasi & Pengakuan

c.  Profil Singkat (Visi, Misi, Budaya, Layanan)

Blok " Profil Singkat" memecah informasi ke dalam empat kolom:

- Visi: "Terciptanya bacaan yang sehat, kreatif, dan sesuai dengan anak-anak Indonesia."

- Misi: Membina SDM menulis, menjalin kerjasama, melindungi/memberdayakan member.

- Budaya: Akronim APINDO (Advantageous, Professional, Integruous, Nationalistic, Dedicated, Objective).

- Layanan: Bantuan hukum, pendampingan, pelatihan, konsultasi, ruang belajar, ruang berprestasi.

[]{#_Toc215958685 .anchor}![A screenshot of a computer AI-generated content may be incorrect.](docs/skripsi/media/image43.png){width="5.511805555555555in" height="3.0993055555555555in"}Gambar 4.41 Profil Singkat (Visi, Misi, Budaya, Layanan)

d\. Tim Inti PaberLand

![A screenshot of a computer AI-generated content may be incorrect.](docs/skripsi/media/image44.png){width="5.511805555555555in" height="3.0993055555555555in"}Section " Tim Hebat Kami" memuat kartu anggota tim dengan foto, nama, dan jabatan (misal: Ali Muakhir --- Pengawas; Dewi Rieka --- Direktur; Mita Akhsayanti --- Sekretaris I; dst.). Kartu-kartu diatur dalam grid responsif yang menampilkan keseluruhan pengurus inti.

[]{#_Toc215958686 .anchor}Gambar 4.42 Tim Inti PaberLand

d.  Statistik Komunitas Multiplatform

Bagian " Komunitas Besar Kami" menampilkan metrik jumlah anggota di empat kanal: Facebook (22.000), WhatsApp (1.025), Telegram (1.553), Instagram (2.974), dan total kumulatif 27.552+ member. Ikon , , , membantu membedakan platform.

![[]{#_Toc215958687 .anchor}Gambar 4.43 Statistik Komunitas Multiplatform](docs/skripsi/media/image45.png){alt="A screenshot of a computer AI-generated content may be incorrect." width="5.511805555555555in" height="3.0993055555555555in"}

f\. Footer & Informasi Kontak

Penutup halaman menyertakan kembali alamat kantor, email, navigasi, serta kredit pengembang sebagaimana halaman publik lainnya, memastikan konsistensi brand.

[]{#_Toc215958688 .anchor}![A screenshot of a computer AI-generated content may be incorrect.](docs/skripsi/media/image46.png){width="5.511805555555555in" height="3.0993055555555555in"}Gambar 4.44 Footer Halaman Tentang

#### 4.3.2.6 Dokumentasi Halaman Pencarian Global

Fitur pencarian global (\`/search\`) merupakan titik temu seluruh konten yang diterbitkan oleh komunitas. Pengguna dapat mengombinasikan kata kunci, tipe konten, dan paginasi untuk menemukan artikel, penulis, maupun arsip lainnya. Dokumentasi berikut menggunakan contoh kueri \`q=Ak&type=all&page=1\` \[https://paberland.com/search?q=Ak&type=all&page=1\](https://paberland.com/search?q=Ak&type=all&page=1) agar setiap elemen UI tercakup secara rinci.

a.  Header Global & Status Pemuatan

Begitu halaman dibuka, sistem menampilkan pesan "Memuat Halaman -- Mohon tunggu sebentar\..." tepat di bawah header global. Pesan ini menandakan bahwa engine sedang menyiapkan hasil berdasarkan parameter URL. Karena pencarian dapat memakan waktu berbeda (tergantung panjang kata kunci, filter, dan jumlah hasil), indikator ini penting untuk menghindari \_perceived failure\_.

b.  Formulir Pencarian Adaptif

Formulir terdiri atas:

- Kolom kata kunci dengan placeholder "Cari judul, penulis, atau kata kunci". Nilai \`Ak\` otomatis terisi dari query string.

- Dropdown "Tipe Konten" yang default-nya \`All\`. Pilihan lain mencakup \`Articles\`, \`Authors\`, dan kategori lanjutan sesuai roadmap.

- Tombol aksi "Cari Sekarang" dan tombol sekunder "Reset Filter".

![A screenshot of a computer AI-generated content may be incorrect.](docs/skripsi/media/image47.png){width="5.511805555555555in" height="3.0993055555555555in"}Formulir ini bersifat \_URL-driven\_ sehingga setiap perubahan langsung memperbarui parameter \`q\`/\`type\`/\`page\`. Pendekatan ini mempermudah \_deep linking\_, otomatisasi tes, dan integrasi analytics.

[]{#_Toc215958689 .anchor}Gambar 4.45 Formulir Pencarian

c.  Ringkasan Filter Aktif & Bantuan Kontekstual

![A screenshot of a computer AI-generated content may be incorrect.](docs/skripsi/media/image48.png){width="5.511805555555555in" height="0.7611111111111111in"}Tepat di bawah form terdapat ringkasan "Menampilkan hasil untuk 'Ak' pada semua tipe konten". Kalimat ini berfungsi sebagai \_feedback loop\_ agar pengguna menyadari filter yang sedang berlaku. Pada sisi kanan terdapat ikon informasi yang menjelaskan tips pencarian (misal: gunakan tanda kutip untuk frasa spesifik, tambahkan operator kategori, dll.).

[]{#_Toc215958690 .anchor}Gambar 4.46 Ringkasan Filter Aktif & Bantuan Kontekstual

d.  Daftar Hasil Pencarian

Area hasil menampilkan kartu vertikal. Setiap kartu minimal memuat:

- Label kategori (emoji + nama seperti Dongeng),

- Judul artikel yang bisa diklik,

- Ringkasan 1--2 kalimat dengan \_highlight\_ pada kata kunci "Ak",

- Nama penulis, tanggal terbit, serta metrik singkat (views, likes, komentar).

![A screenshot of a computer AI-generated content may be incorrect.](docs/skripsi/media/image49.png){width="5.511805555555555in" height="3.0993055555555555in"}Hasil yang relevan dengan "Ak" ditampilkan terlebih dahulu, sedangkan sisanya mengikuti logika \_relevance score\_. Jika tidak ada data, ilustrasi kosong dan pesan "Tidak ditemukan hasil untuk 'Ak'" akan ditampilkan.

[]{#_Toc215958691 .anchor}Gambar 4.47 Daftar Hasil Pencarian

e.  Panel Filter Tambahan & Sorting

Di sisi kanan (desktop) atau bawah (mobile) terdapat panel filter lanjutan. Opsi yang tersedia antara lain kategori, rentang tanggal terbit, dan status publikasi (Published/Draft). Terdapat pula dropdown \_sorting\_ ("Terbaru", "Terpopuler", "A--Z"). Setiap perubahan filter otomatis memperbarui parameter URL serta menjalankan ulang kueri tanpa \_page reload\_.

[]{#_Toc215958692 .anchor}![A screenshot of a computer AI-generated content may be incorrect.](docs/skripsi/media/image50.png){width="5.511805555555555in" height="3.0993055555555555in"}Gambar 4.48 Panel Filter Tambahan & Sorting

f.  Paginasi & Navigasi Hasil

![A screenshot of a computer AI-generated content may be incorrect.](docs/skripsi/media/image51.png){width="5.418055555555555in" height="3.046527777777778in"}Jika jumlah hasil \> limit per halaman, komponen paginasi muncul di bagian bawah. Tombol "Sebelumnya" dan "Berikutnya" disertai indikator halaman (misal \`Halaman 1 dari 3\`). Perhatikan bahwa parameter \`page=1\` berubah sesuai interaksi pengguna. Dokumentasikan perubahan URL saat berpindah halaman untuk menunjukkan konsistensi \_stateful navigation\_.

[]{#_Toc215958693 .anchor}Gambar 4.49 Paginasi & Navigasi Hasil

g.  Responsivitas & Aksesibilitas

![A cell phone with a cartoon rabbit AI-generated content may be incorrect.](docs/skripsi/media/image52.png){width="1.8296303587051619in" height="3.936416229221347in"}Layout responsif memastikan form dan panel filter menumpuk vertikal pada layar ≤428 px. Tombol berlabel teks jelas, warna kontras memenuhi \_accessibility guideline\_, dan \_aria-live region\_ digunakan untuk mengumumkan perubahan hasil pada pembaca layar.

[]{#_Toc215958694 .anchor}Gambar 4.50 Responsivitas & Aksesibilitas Halaman Pencarian

#### 4.3.2.7 Dokumentasi Halaman Profil Saya

Halaman profil publik (\`/profile/\[id\]\`) menampilkan identitas penulis, statistik keterlibatan, portofolio artikel, serta interaksi sosial (follow/DM). Contoh berikut menggunakan profil dengan ID \`42a71031-9a22-4021-9c4c-1b6c52ec856e\` \[https://paberland.com/profile/42a71031-9a22-4021-9c4c-1b6c52ec856e\](https://paberland.com/profile/42a71031-9a22-4021-9c4c-1b6c52ec856e).

a.  Hero Profil & Ringkasan Identitas

Bagian teratas menampilkan foto profil (SignedImage), nama lengkap, \_username\_ opsional, kota domisili, dan ringkasan bio. Tepat di bawah nama terdapat badge peran (misal: "Penulis Senior" atau "Kurator"). Dua tombol aksi utama "Ikuti" dan "Kirim Pesan" ditempatkan berdampingan agar interaksi sosial ![A screenshot of a computer AI-generated content may be incorrect.](docs/skripsi/media/image53.png){width="5.511805555555555in" height="3.0993055555555555in"}dapat dilakukan dalam satu klik.

[]{#_Toc215958695 .anchor}Gambar 4.51 Hero Profil & Ringkasan Identitas Saya

b.  Statistik Interaksi

Blok statistik memperlihatkan jumlah artikel terbit, total views, likes terkumpul, serta jumlah pengikut/pengikut yang diikuti. Angka-angka ini diambil secara real time dari Supabase view sehingga memberi reputasi sosial bagi penulis.

c.  Portofolio Artikel dan Filter

Daftar artikel penulis disajikan dalam bentuk kartu serupa hasil pencarian, dilengkapi label kategori, judul, kutipan pendek, serta indikator tanggal terbit. Pengguna dapat menyaring berdasarkan kategori atau status (publish/draft) menggunakan dropdown di atas daftar. Ketika data sedang dimuat, skeleton card muncul agar layout tidak bergeser.

[]{#_Toc215958696 .anchor}![A screenshot of a computer AI-generated content may be incorrect.](docs/skripsi/media/image54.png){width="5.511805555555555in" height="3.0993055555555555in"}Gambar 4.52 Portofolio Artikel Saya dan Filter

d.  Bagian Tentang Penulis

Segmen "Tentang Penulis" menampilkan narasi panjang mengenai pengalaman menulis, fokus genre, serta highlight capaian (misal penghargaan atau karya populer). Informasi ini bisa diedit oleh pemilik profil melalui halaman \`profile/edit\`.

e.  Portofolio Visual (Opsional)

Jika penulis menambahkan karya visual (cover buku, sertifikat lomba) via modul portofolio, galeri mini akan muncul di bawah deskripsi. Galeri menggunakan SignedImage yang aman dari hotlinking, sehingga konten hanya dapat diakses oleh pengguna yang berwenang.

f.  Konten Favorit

Panel aktivitas menampilkan jejak interaksi terbaru: artikel yang baru diunggah, komentar terkini, atau pencapaian tertentu (misal artikel difavoritkan banyak pembaca). Panel ini membantu moderator memonitor keterlibatan penulis dan memberikan konteks kepada pembaca baru.

[]{#_Toc215958697 .anchor}![](docs/skripsi/media/image55.png){width="5.511805555555555in" height="3.0993055555555555in"}Gambar 4.53 Konten yang Difavoritkan

g.  Konsistensi Footer

![A screenshot of a computer AI-generated content may be incorrect.](docs/skripsi/media/image56.png){width="5.511805555555555in" height="3.0993055555555555in"}Footer halaman profil tetap memuat informasi kontak, navigasi cepat, serta kredit pengembang sebagaimana halaman publik lain.

[]{#_Toc215958698 .anchor}Gambar 4.54 Footer Halaman Saya

#### 4.3.2.8 Dokumentasi Halaman Detail Konten

Setiap artikel diakses melalui jalur \`/article/\[slug\]\`. Sebagai contoh, artikel "Mau Jadi Member PaberLand? Begini Cara Daftarnya" dapat diakses melalui \[https://paberland.com/article/mau-jadi-member-paberland-begini-cara-daftarnya\](https://paberland.com/article/mau-jadi-member-paberland-begini-cara-daftarnya). Struktur halaman dijabarkan berikut.

a.  Header Konten & Meta Informasi

![A screenshot of a computer AI-generated content may be incorrect.](docs/skripsi/media/image57.png){width="5.511805555555555in" height="3.0993055555555555in"}Bagian paling atas memuat tombol kembali ("Kembali ke beranda"), judul artikel, angka pembaca (views), jumlah suka, jumlah komentar, tombol "Bagikan", nama penulis beserta avatar, serta tanggal publikasi. Informasi ini penting untuk memberi konteks sebelum pengguna membaca isi artikel.

[]{#_Toc215958699 .anchor}Gambar 4.55 Detail Konten

b.  Isi Konten dengan Struktur Heading

Konten artikel ditulis menggunakan TinyMCE sehingga mendukung heading terstruktur (H2 untuk "Pendahuluan", H2 untuk "Pembahasan Utama", daftar terurut dan kutipan). Editor menambahkan highlight emoji seperti dan untuk mempermudah pemindaian. Pastikan screenshot menangkap sebagian tubuh artikel agar pembaca lampiran melihat kesinambungan heading dan isi.

[]{#_Toc215958700 .anchor}![A screenshot of a computer AI-generated content may be incorrect.](docs/skripsi/media/image58.png){width="5.511805555555555in" height="3.0993055555555555in"}Gambar 4.56 Isi Konten dengan Struktur Heading

c.  Callout atau Kutipan Inspiratif

![A screenshot of a computer AI-generated content may be incorrect.](docs/skripsi/media/image59.png){width="5.511805555555555in" height="3.0993055555555555in"}Konten menyisipkan kutipan yang ditandai dengan tanda petik miring atau blokquote (misal: "Bergabunglah bersama ribuan member PaberLand\..."). Kutipan ini memberikan penekanan emosional terhadap pesan utama.

[]{#_Toc215958701 .anchor}Gambar 4.57 Callout atau Kutipan

d.  Komponen Pembaca & Interaksi

Di sisi kanan atau bawah (bergantung lebar layar) terdapat panel interaksi lengkap:

- Tombol "Laporkan" untuk pelaporan konten,

- Informasi "Terakhir diperbarui" yang menampilkan tanggal pembaruan terakhir (contoh: 17 November 2025),

- Komponen komentar dengan judul "Komentar (1)" serta tombol \_sorting\_ "Terbaru"; sebelum data termuat muncul teks "Memuat komentar\...",

- Blok "Bagikan Artikel" dengan tombol ke Twitter, Facebook, WhatsApp, Telegram, serta tombol "Salin Link".

![A screenshot of a computer AI-generated content may be incorrect.](docs/skripsi/media/image60.png){width="5.511805555555555in" height="3.0993055555555555in"}Setiap tombol share menyalin URL artikel saat ini sehingga pembaca dapat menyebarkan konten ke berbagai kanal.

[]{#_Toc215958702 .anchor}Gambar 4.58 Komponen Pembaca & Interaksi

e.  Rekomendasi Konten Lainnya & Artikel Terkait

Bagian "Konten Lainnya" (dengan label "Konten Lainnya" dan tombol "Lihat semua konten →") menampilkan tiga artikel terakhir dari penulis yang sama, masing-masing berisi judul, ringkasan, dan tanggal (misal "3/10/2025"). Setelah itu, segmen "Artikel Terkait" menampilkan artikel komunitas yang relevan lengkap dengan judul, tanggal (format lokal seperti "18 Agustus 2025"), dan metrik views. Kedua blok ini menjaga \_content discoverability\_ dan menggunakan grid responsif.

[]{#_Toc215958703 .anchor}![A screenshot of a computer AI-generated content may be incorrect.](docs/skripsi/media/image61.png){width="5.511805555555555in" height="3.0993055555555555in"}Gambar 4.59 Rekomendasi Konten Lainnya & Artikel Terkait

f.  Footer Konsisten

![A screenshot of a computer AI-generated content may be incorrect.](docs/skripsi/media/image62.png){width="5.511805555555555in" height="3.0993055555555555in"}Footer halaman artikel konsisten dengan halaman lain, menampilkan navigasi, kontak, serta kredit pengembang.

[]{#_Toc215958704 .anchor}Gambar 4.60 Footer Halaman Detail Konten

#### 4.3.2.9 Dokumentasi Halaman Penulisan Konten

Halaman \`/write\` merupakan workspace utama penulis. Halaman ini hanya dapat diakses oleh pengguna yang sudah login karena dibungkus komponen \`ProtectedRoute\`. Jika pengguna belum melakukan autentikasi, sistem otomatis mengarahkan ke halaman login terlebih dahulu.

a.  Deteksi Perangkat & Mode Responsif

![](docs/skripsi/media/image63.png){width="2.05in" height="3.941666666666667in"}Ketika halaman dibuka pada layar \< 640 px (mobile), muncul panel " Mode Responsif Terdeteksi" berisi penjelasan kenapa editor membutuhkan layar lebih lebar, tips penggunaan laptop/tablet landscape, dan catatan debug "Layar terdeteksi XXXpx". Halaman baru akan menampilkan editor setelah dibuka di perangkat dengan layar lebih besar.

[]{#_Toc215958705 .anchor}Gambar 4.61 Halaman Penulisan Konten Mode Responsif

b.  Halaman Penulisan Konten

Setelah melewati pengecekan layar, hero halaman menampilkan judul " Tulis Konten Baru" atau " Edit Konten" (jika URL menyertakan parameter \`?edit=\<id\>\`). Subjudul menjelaskan tujuan (misal: "Bagikan Cerita dan Karya Terbaik Kamu Supaya Dunia Melihat").

[]{#_Toc215958706 .anchor}![A screenshot of a computer AI-generated content may be incorrect.](docs/skripsi/media/image64.png){width="5.511805555555555in" height="3.0993055555555555in"}Gambar 4.62 Halaman Penulisan Konten

c.  Toolbar Aksi & Tampilan Langsung

Di bagian atas form terdapat toolbar berisi:

- Tombol "Preview/Edit" untuk berpindah antara tampilan editor TinyMCE dan pratinjau HTML,

- Counter kata, estimasi waktu baca, dan jumlah karakter,

- Tombol " Simpan Draft" dan " Publikasikan" yang memanggil logika \`handleSubmit\` berbeda (draft vs publish). Tombol menampilkan status loading " Menyimpan\..." saat proses berlangsung.

[]{#_Toc215958707 .anchor}![A screenshot of a computer AI-generated content may be incorrect.](docs/skripsi/media/image65.png){width="5.511805555555555in" height="3.0993055555555555in"}Gambar 4.63 Toolbar Aksi & Tampilan Langsung

d.  Editor TinyMCE & Panduan Penggunaan

Bagian utama memuat editor TinyMCE setinggi ±500 px dengan placeholder "Mulai menulis... atau klik ' Template'...". Di bawahnya terdapat tips:

- Klik " Template" untuk template siap pakai,

- Drag & drop gambar atau gunakan Ctrl+V,

- Auto-save aktif tiap 30 detik,

- Klik " Stats" di toolbar untuk statistik tulisan.

- Placeholder Screenshot 4.56 -- Area editor + panel tips penggunaan.

e.  Sidebar Penunjang Penulisan

Sidebar kanan berisi beberapa modul:

- Progress Menulis -- menampilkan kata, waktu baca, karakter, serta info batasan kategori (misal "Cermin: maksimal 200 kata"). Untuk kategori cerbung/novel/serial, tersedia input "Jumlah Part/Bab".

- Kategori dengan Emoji -- dropdown yang memuat seluruh kategori ( Info/Berita, Cerpen, Dongeng, dst.) agar penulis memilih slot publikasi yang tepat.

- Gambar Cover -- input file dengan preview SignedImage. Setelah upload sukses, toast "Cover image berhasil diupload!" ditampilkan.

- Ringkasan (Excerpt) -- textarea yang dibatasi 500 karakter dan akan terisi otomatis dari konten jika masih kosong.

- ![A screenshot of a computer AI-generated content may be incorrect.](docs/skripsi/media/image66.png){width="5.511805555555555in" height="3.0993055555555555in"}Jadwal Publikasi -- input \`datetime-local\` dengan ikon Clock, serta catatan "Kosongkan untuk publikasi langsung".

[]{#_Toc215958708 .anchor}Gambar 4.64 Editor yang Sudah Terisi

f.  Fitur Edit Konten

Jika halaman dipanggil dengan parameter \`?edit=\<articleId\>\`, seperti contoh \`https://paberland.com/write?edit=78fc4527-56e1-4964-9968-597c1bd28ffe\`, sistem memanggil \`articleManagement.getArticleForEdit\` untuk memuat data lama. Judul, konten, kategori, cover, status publish, dan jadwal terisi otomatis, sehingga penulis dapat langsung memperbarui tanpa mengulang dari awal.

[]{#_Toc215958709 .anchor}![A screenshot of a computer AI-generated content may be incorrect.](docs/skripsi/media/image67.png){width="5.511805555555555in" height="3.0993055555555555in"}Gambar 4.65 Fitur Edit Konten

g.  Validasi & Notifikasi

![A screenshot of a computer AI-generated content may be incorrect.](docs/skripsi/media/image68.png){width="5.511805555555555in" height="3.0993055555555555in"}Sebelum menyimpan, sistem memastikan judul, konten, dan kategori terisi. Jika belum login, toast "Anda harus login terlebih dahulu!" muncul. Notifikasi keberhasilan berbeda untuk publish (" Konten berhasil dipublikasikan!") dan draft (" Konten berhasil disimpan sebagai draft!").

[]{#_Toc215958710 .anchor}Gambar 4.66 Validasi & Notifikasi jika Tidak Valid

[]{#_Toc215958711 .anchor}![A screenshot of a computer AI-generated content may be incorrect.](docs/skripsi/media/image69.png){width="5.511805555555555in" height="3.0993055555555555in"}Gambar 4.67 Validasi & Notifikasi jika Valid

#### 4.3.2.10 Dokumentasi Halaman Detail Kategori

Halaman detail kategori (\`/kategori/\[slug\]\`) menampilkan etalase konten per kategori. Contoh dokumentasi berikut menggunakan kategori Info/Berita \[https://paberland.com/kategori/infoberita\](https://paberland.com/kategori/info-berita).

a.  Breadcrumb & Header Kategori

Bagian atas menampilkan breadcrumb "Beranda / Kategori / Info/Berita" yang memudahkan pengguna kembali ke lapisan sebelumnya. Di bawahnya terdapat ikon emoji , judul "Info/Berita", serta deskripsi singkat "Informasi dan berita terkini seputar literasi dan budaya". Tombol "Kembali ke Kategori" disediakan agar pengguna dapat kembali ke indeks kategori tanpa menggulir panjang.

[]{#_Toc215958712 .anchor}![A screenshot of a computer AI-generated content may be incorrect.](docs/skripsi/media/image70.png){width="5.511805555555555in" height="3.0993055555555555in"}Gambar 4.68 Breadcrumb & Header Kategori

b.  Statistik Kategori

![A screenshot of a computer AI-generated content may be incorrect.](docs/skripsi/media/image71.png){width="5.511805555555555in" height="3.0993055555555555in"}Empat kartu statistik menampilkan jumlah konten, total views, total likes, dan total komentar di kategori tersebut. Ketika belum ada data, angka default 0 ditampilkan sebagai placeholder. Setelah konten terbit, angka ini akan berubah secara otomatis sesuai aktivitas komunitas.

[]{#_Toc215958713 .anchor}Gambar 4.69 Statistik Kategori

c.  Opsi Pengurutan & Daftar Konten

Dropdown "Urutkan" menyediakan opsi Terbaru, Terlama, Terpopuler, dan Paling Disukai. Di bawahnya muncul daftar konten sesuai kategori. Dalam contoh ini, sistem menampilkan teks "Menampilkan 0 dari 0 konten" karena belum ada konten yang terpublikasi. Ketika data tersedia, setiap kartu akan memuat judul, ringkasan pendek, penulis, tanggal publikasi, dan metrik interaksi.

d.  Ajakan Menulis Khusus Kategori

![](docs/skripsi/media/image72.png){width="5.511805555555555in" height="3.0993055555555555in"}Pada bagian bawah terdapat kartu ajakan bertanda emoji kategori (contoh: " Tulis Info/Berita -- Bagikan info/berita terpenting di sini") dengan tombol " Mulai Menulis". Tombol ini mengarahkan pengguna ke halaman \`/write\` dan mendorong partisipasi langsung di kategori terkait.

[]{#_Toc215958714 .anchor}Gambar 4.70 Ajakan Menulis Khusus Kategori

e.  Footer Konsisten

Footer menampilkan kembali identitas PaberLand, alamat kontak, navigasi cepat, serta kredit pengembang, memastikan konsistensi brand di setiap halaman.

[]{#_Toc215958715 .anchor}![A screenshot of a computer AI-generated content may be incorrect.](docs/skripsi/media/image73.png){width="5.511805555555555in" height="3.0993055555555555in"}Gambar 4.71 Footer Halaman Kategori

#### 4.3.2.11 Dokumentasi Halaman Profil Member Publik

Selain halaman profil pribadi (\`/profile/\[id\]\`), PaberLand menyediakan halaman publik untuk setiap member dengan slug unik (\`/member/\[slug\]\`). Contoh yang digunakan: \`https://paberland.com/member/tethy-ezokanzo\`.

a.  Struktur Header

Secara hierarki halaman diawali dengan header global (logo, navigasi utama, tombol masuk/daftar) serta status pemuatan "Memuat Halaman\..." sebelum data siap. Footer global juga tampil konsisten.

b.  Informasi Identitas

Ketika data profil tersaji, halaman menampilkan:

- Foto profil dan banner/cover (jika tersedia),

- Nama lengkap, slug, serta badge peran (mis. Penulis, Ilustrator),

- Bio singkat yang menjelaskan fokus karya atau pengalaman,

[]{#_Toc215958716 .anchor}![A screenshot of a computer AI-generated content may be incorrect.](docs/skripsi/media/image74.png){width="5.511805555555555in" height="3.0993055555555555in"}Gambar 4.72 Profil Member Publik

c.  Statistik Aktivitas

![A screenshot of a computer AI-generated content may be incorrect.](docs/skripsi/media/image75.png){width="5.511805555555555in" height="3.0993055555555555in"}Panel statistik menampilkan jumlah konten terbit, total views, likes, dan interaksi komentar yang dihasilkan oleh member tersebut. Nilai awal mungkin 0 apabila belum ada data, namun akan meningkat seiring publikasi artikel.

[]{#_Toc215958717 .anchor}Gambar 4.73 Statistik Aktivitas

d.  Daftar Konten & Portofolio

![A screenshot of a computer AI-generated content may be incorrect.](docs/skripsi/media/image76.png){width="5.511805555555555in" height="3.0993055555555555in"}Bagian utama menampilkan daftar artikel yang dibuat oleh member. Setiap kartu konten menampilkan kategori, judul, ringkasan, dan tanggal publikasi. Jika portofolio multimedia diaktifkan (misal PDF atau cover buku), galeri mini akan muncul di bawah daftar artikel.

[]{#_Toc215958718 .anchor}Gambar 4.74 Daftar Konten & Portofolio

#### 4.3.2.12 Dokumentasi Halaman Portofolio Member

Halaman portofolio (\`/member/\[slug\]/portfolio\`) menampilkan karya unggulan seorang member dalam format galeri. Contoh yang didokumentasikan: \`https://paberland.com/member/tethy-ezokanzo/portfolio\`.

a.  Status Pemuatan & Header

Saat halaman dibuka, teks "Memuat portofolio\..." tampil di bawah header global sembari data diambil dari Supabase Storage. Setelah selesai, galeri karya akan muncul.

b.  Galeri Karya

Setiap kartu portofolio menampilkan:

- Thumbnail gambar (cover buku, sertifikat, atau karya ilustrasi) dengan menggunakan \`SignedImage\`,

- Judul karya, kategori (mis. Buku, Cerpen, Ilustrasi), dan status (Published, Draft, In Progress),

- Deskripsi singkat, tanggal penerbitan, tautan eksternal (jika ada), serta badge prestasi (misal "Juara 1" atau "Best Seller").

![](docs/skripsi/media/image77.png){width="5.511805555555555in" height="3.0993055555555555in"}Galeri mendukung layout responsif sehingga 1--3 kartu tampil per baris tergantung lebar layar.

[]{#_Toc215958719 .anchor}Gambar 4.75 Halaman Portofolio Member

c.  CTA dan Navigasi Lain

Jika member belum memiliki portofolio, halaman menampilkan pesan kosong dan tombol "Tambah Portofolio" (opsional) untuk pemilik akun. Pengunjung publik dapat kembali ke profil utama melalui tautan "Kembali ke Profil".

#### 4.3.2.13 Dokumentasi Halaman Detail Karya Portofolio

Setiap karya portofolio memiliki halaman detail tersendiri (\`/member/\[slug\]/portfolio/\[workId\]\`). Sebagai contoh: \`https://paberland.com/member/tethy-ezokanzo/portfolio/acb06528-35df-4451-abbe-6395006e41f3\`.

a.  Status Pemuatan & Header

Saat halaman dibuka, teks "Memuat detail karya\..." ditampilkan sebelum data siap. Setelah itu muncul hero berisi judul karya, kategori, status (mis. "Published"), dan tombol aksi (buka tautan eksternal atau unduh lampiran).

b.  Metadata Karya

![A screenshot of a computer AI-generated content may be incorrect.](docs/skripsi/media/image78.png){width="5.511805555555555in" height="3.0993055555555555in"}Bagian metadata menampilkan informasi lengkap: tanggal publikasi, jenis karya (buku, ilustrasi, artikel), kolaborator (jika ada), peran penulis, dan tautan ke toko/arsip digital.

[]{#_Toc215958720 .anchor}Gambar 4.76 Detail Karya Member

c.  Deskripsi & Prestasi

Deskripsi naratif menjelaskan latar belakang karya, proses kreatif, serta highlight prestasi. Jika karya memenangkan lomba, badge atau ribbon "Juara" akan muncul di samping judul.

d.  Dokumentasi Visual

Halaman detail juga menampilkan media pendukung berupa cover buku, ilustrasi, atau dokumen PDF yang diunggah penulis. Konten ini menggunakan SignedImage agar aman.

e.  Navigasi Kembali & CTA

Di bagian bawah terdapat tombol "Kembali ke Portofolio" untuk kembali ke daftar karya, serta CTA " Tulis Konten Baru" bagi penulis yang ingin menambah karya lain.

[]{#_Toc215958721 .anchor}![A screenshot of a computer AI-generated content may be incorrect.](docs/skripsi/media/image79.png){width="5.511805555555555in" height="3.0993055555555555in"}Gambar 4.77 Deskripsi Karya Member

#### 4.3.2.14 Dokumentasi Halaman Manajemen Konten Pribadi

Halaman \`/my-articles\` adalah dashboard pribadi penulis untuk memonitor seluruh karya yang pernah dibuat. Halaman ini bersifat privat dan hanya dapat diakses setelah pengguna login.

a.  Status Pemuatan & Header

Saat halaman dimuat, teks "Memuat\..." muncul sebelum data tersusun. Setelah itu, hero menampilkan judul "My Articles" beserta subjudul yang menjelaskan fungsi halaman.

b.  Filter & Statistik Ringkas

Bagian filter menyediakan input pencarian, dropdown kategori, dan dropdown status (published/draft). Di sampingnya terdapat kartu statistik ringkas (jumlah artikel publish, draft, views total).

[]{#_Toc215958722 .anchor}![A screenshot of a computer AI-generated content may be incorrect.](docs/skripsi/media/image80.png){width="5.511805555555555in" height="3.0993055555555555in"}Gambar 4.78 Halaman Manajemen Konten Pribadi

c.  Tabel Manajemen Konten dengan Aksi CRUD

![A screenshot of a computer AI-generated content may be incorrect.](docs/skripsi/media/image81.png){width="5.511805555555555in" height="3.0993055555555555in"}Daftar artikel ditampilkan dalam bentuk tabel/kartu yang memuat: judul, kategori, status, tanggal update, metrik views/likes, serta tombol aksi (Preview, Edit, Delete). Tombol "Edit" akan membuka halaman \`/write?edit=\<id\>\`, sedangkan "Delete" menampilkan dialog konfirmasi sebelum menghapus artikel.

[]{#_Toc215958723 .anchor}Gambar 4.79 Tabel Manajemen Konten dengan Aksi CRUD

d.  Paginasi & Notifikasi

Jika artikel lebih dari batas per halaman, paginasi muncul di bagian bawah. Setiap perubahan filter/paginasi memunculkan indikator loading kecil agar penulis tahu data sedang diperbarui. Toast notifikasi juga digunakan untuk menandai keberhasilan penghapusan atau kegagalan aksi CRUD.

e.  CTA Tambah Konten

Tersedia tombol " Tulis Konten Baru" yang mengarahkan langsung ke halaman \`/write\`, mendorong penulis untuk terus produktif.

#### 4.3.2.15 Dokumentasi Halaman Admin Dashboard

Setiap akses ke \`/admin\` hanya diizinkan untuk akun dengan peran admin. Halaman ini dibungkus oleh \`AdminProtectedRoute\` dan \`AdminLayout\` agar semua sub halaman admin berbagi navigasi dan pengecekan hak akses yang sama. Ketika memuat, teks "Memverifikasi akses admin\..." muncul sebagai indikator awal.

a.  Struktur Layout

\`AdminLayout\` membagi layar menjadi sidebar navigasi dan konten utama. Sidebar menggunakan \`AdminSidebar\` yang memuat menu Dashboard, Manajemen User, Manajemen Konten, Laporan Konten, Konten Pilihan, Analytics, Activity Logs, dan Pengaturan. Badge merah otomatis muncul pada menu Laporan jika ada jumlah laporan pending. Sidebar juga dapat dilipat (collapse) sehingga hanya menampilkan ikon.

[]{#_Toc215958724 .anchor}![A screenshot of a computer AI-generated content may be incorrect.](docs/skripsi/media/image82.png){width="5.511805555555555in" height="3.0993055555555555in"}Gambar 4.80 Halaman Admin Dashboard

b.  Header Dashboard & Aksi Refresh

Di konten utama, header menampilkan judul " Admin Dashboard", sapaan nama admin, dan tombol "Refresh Data" dengan ikon \`ArrowPathIcon\`. Ketika ditekan, tombol menampilkan animasi spin serta toast "Data berhasil diperbarui!".

c.  Kartu Statistik

Komponen \`AdminStatsCards\` menampilkan jumlah total pengguna, artikel, komentar, laporan, konten pilihan, serta metrik harian (new users/articles). Kartu menggunakan skeleton loader saat data belum siap.

[]{#_Toc215958725 .anchor}![A screenshot of a computer AI-generated content may be incorrect.](docs/skripsi/media/image83.png){width="5.511805555555555in" height="3.0993055555555555in"}Gambar 4.81 Kartu Statistik Halaman Admin

d.  Quick Actions & Alert

Dashboard menyediakan panel aksi cepat (mis. "Kelola User", "Kelola Konten", "Tambah Konten Pilihan") dan panel alert untuk menunjukkan laporan konten atau error sistem.

e.  Integrasi Sub Halaman Admin

Setiap menu pada sidebar membuka sub halaman berikut:

- \`/admin/users\` -- Manajemen user (cari, ubah peran, hapus).

- \`/admin/articles\` -- Manajemen konten dengan filter status, kategori, serta aksi publish/unpublish.

- \`/admin/reports\` -- Halaman laporan konten (verifikasi, tandai selesai).

- \`/admin/featured\` -- Kelola konten pilihan di beranda.

- \`/admin/analytics\` -- Panel analitik (chart views, growth, engagement).

- \`/admin/logs\` -- Activity logs moderator (waktu, aksi, deskripsi).

- \`/admin/settings\` -- Pengaturan global (maintenance mode, hero banner, token API).

Admin Dashboard dibangun dengan pola \_modular cards\_ sehingga tim dapat menambah widget baru tanpa memengaruhi layout utama. Data statistik dimuat melalui Supabase Edge Functions yang menerapkan caching 60 detik untuk menghindari \_thundering herd\_ ketika banyak admin melakukan refresh bersamaan. Tombol refresh memanfaatkan \_optimistic update\_ yang langsung menampilkan spinner pada kartu agar admin yakin bahwa sistem sedang bekerja. Selain itu, ada mode malam khusus admin yang mengubah palet warna menjadi biru tua serta meningkatkan rasio kontras, memudahkan Litbang yang sering bekerja pada larut malam. Seluruh aktivitas admin otomatis dicatat di \`admin_activity_logs\` untuk memudahkan audit keamanan.

#### 4.3.2.16 Dokumentasi Halaman Admin Manajemen User

Sub halaman \`/admin/users\` berfungsi untuk mengelola akun penulis. Sama seperti dashboard, halaman ini dilindungi \`AdminProtectedRoute\` dan menggunakan layout/admin sidebar yang konsisten.

a.  Status Pemuatan & Header

Saat dibuka, sistem menampilkan "Memverifikasi akses admin\..." sebelum data user dimuat. Header halaman menampilkan judul "Manajemen User", deskripsi singkat, serta tombol "Tambah User" (opsional) atau tombol refresh data.

b.  Filter & Statistik

Panel filter menyediakan:

- Input pencarian nama/email,

- Dropdown peran (Admin, Penulis, Ilustrator, dsb.),

- Dropdown status akun (Aktif, Suspended),

- Tombol reset filter.

Di samping filter terdapat statistik cepat (jumlah total user, user aktif, user baru).

[]{#_Toc215958726 .anchor}![A screenshot of a computer AI-generated content may be incorrect.](docs/skripsi/media/image84.png){width="5.511805555555555in" height="3.0993055555555555in"}Gambar 4.82 Manajemen Users Halaman Admin

c.  Tabel User & Aksi

Daftar user ditampilkan dalam tabel dengan kolom: nama, email, peran, status, tanggal bergabung, dan aksi. Tombol aksi mencakup:

- "Lihat Profil" untuk membuka halaman publik,

- "Perbarui Peran" (mengubah role via modal),

- "Suspend/Aktifkan" akun,

- "Hapus" (dengan konfirmasi).

[]{#_Toc215958727 .anchor}![](docs/skripsi/media/image85.png){width="5.511805555555555in" height="3.0993055555555555in"}Gambar 4.83 Aksi Manajemen Users

d.  Modal & Notifikasi

![A screenshot of a computer AI-generated content may be incorrect.](docs/skripsi/media/image86.png){width="5.511805555555555in" height="3.0993055555555555in"}Ketika admin mengubah peran atau menonaktifkan akun, modal konfirmasi muncul. Hasil aksi ditandai dengan toast notifikasi (berhasil/gagal).

[]{#_Toc215958728 .anchor}Gambar 4.84 Notifikasi & Validasi Manajemen Users

e.  Paginasi & Keamanan Data

[]{#_Toc215958729 .anchor}![A screenshot of a computer AI-generated content may be incorrect.](docs/skripsi/media/image87.png){width="5.511805555555555in" height="3.0993055555555555in"}Gambar 4.85 Paginasi Halaman Manajemen Users

Jika jumlah user besar, paginasi muncul di bawah tabel. Karena halaman ini memuat data pribadi, seluruh screenshot harus menyensor email atau ID sebelum dijadikan lampiran.

Manajemen user menyediakan fitur \_bulk action\_ sehingga admin dapat mengubah peran beberapa pengguna sekaligus. Ketika admin mencoba menurunkan peran pengguna terakhir yang masih berstatus \`is_admin: true\`, sistem menolak tindakan tersebut untuk mencegah platform kehilangan admin aktif. Mode pencarian memanfaatkan indeks trigram Postgres agar pencarian email dengan kesalahan ketik tetap mengembalikan hasil relevan. Seluruh perubahan peran memicu email notifikasi ke pengguna sebagai bentuk transparansi. Untuk keperluan investigasi, tabel menampilkan ikon shield jika pengguna pernah diblokir sebelumnya lengkap dengan tautan ke log terkait.

#### 4.3.2.17 Dokumentasi Halaman Admin Manajemen Konten

Sub halaman \`/admin/articles\` digunakan untuk memoderasi seluruh artikel komunitas.

a.  Header & Status Akses

Saat halaman dibuka, indikator "Memverifikasi akses admin\..." muncul. Setelah lolos pengecekan, header menampilkan judul "Manajemen Konten", deskripsi singkat, serta tombol refresh data.

b.  Filter Lengkap

Panel filter mencakup:

- Kolom pencarian judul/slug,

- Dropdown kategori,

- Dropdown status (Published, Draft, Scheduled),

- Rentang tanggal publikasi,

- Checkbox "Hanya konten ditandai" (featured).

![A screenshot of a computer AI-generated content may be incorrect.](docs/skripsi/media/image88.png){width="5.511805555555555in" height="3.0993055555555555in"}Filter ini membantu admin melakukan kurasi cepat sesuai kebutuhan editorial.

[]{#_Toc215958730 .anchor}Gambar 4.86 Halaman Admin Manajemen Konten

c.  Tabel Artikel & Aksi Moderasi

Tabel menampilkan judul, penulis, kategori, status, views, likes, komentar, serta tanggal update. Tombol aksi yang tersedia:

- Preview artikel,

- Edit (mengarah ke \`/write?edit=\<id\>\`),

- Publish / Unpublish,

- Tandai Featured / hapus dari featured,

- Hapus artikel (dengan konfirmasi).

[]{#_Toc215958731 .anchor}![A screenshot of a computer AI-generated content may be incorrect.](docs/skripsi/media/image89.png){width="5.511805555555555in" height="3.0993055555555555in"}Gambar 4.87 Aksi Moderasi Halaman Manajemen Konten

d.  Panel Detail & Notifikasi

Ketika admin memilih salah satu artikel, panel samping menampilkan ringkasan konten, excerpt, jadwal terbit, serta riwayat moderasi. Sukses atau gagal aksi akan ditandai melalui toast notifikasi.

e.  Paginasi & Keamanan Data

Paginasi di bagian bawah tabel memudahkan penelusuran artikel dalam jumlah besar. Karena halaman ini menampilkan data internal, seluruh screenshot harus menyensor informasi sensitif (email penulis, slug khusus).

[]{#_Toc215958732 .anchor}![A screenshot of a computer AI-generated content may be incorrect.](docs/skripsi/media/image90.png){width="5.511805555555555in" height="3.0993055555555555in"}Gambar 4.88 Paginasi Halamam Manajemen Konten

#### 4.3.2.18 Dokumentasi Halaman Admin Laporan Konten

Halaman \`/admin/reports\` digunakan moderator untuk menangani laporan penyalahgunaan konten.

a.  Header & Status Akses

Seperti halaman admin lainnya, indikator "Memverifikasi akses admin\..." ditampilkan terlebih dahulu. Header memuat judul "Laporan Konten" beserta ringkasan jumlah laporan pending.

[]{#_Toc215958733 .anchor}![A screenshot of a computer AI-generated content may be incorrect.](docs/skripsi/media/image91.png){width="5.511805555555555in" height="3.0993055555555555in"}Gambar 4.89 Halaman Admin Laporan Konten

b.  Filter Laporan

Panel filter memungkinkan admin memfilter berdasarkan: status laporan (Pending, Dalam Proses, Selesai), jenis laporan (Spam, Konten Tidak Layak, dsb.), kategori artikel, dan rentang waktu.

c.  Daftar Laporan & Aksi

Daftar laporan ditampilkan dalam bentuk kartu/tabel yang mencakup: judul artikel, pelapor, alasan laporan, timestamp, dan status. Tombol aksi yang tersedia:

- "Baca Artikel" untuk membuka konten,

- "Hubungi Penulis" (opsional),

- "Terima / Tolak Laporan" disertai catatan,

- "Hapus Konten" bila laporan terbukti.

[]{#_Toc215958734 .anchor}![A screenshot of a computer AI-generated content may be incorrect.](docs/skripsi/media/image92.png){width="5.511805555555555in" height="3.0993055555555555in"}Gambar 4.90 Halaman Admin Ada Konten Dilaporkan

#### 4.3.2.19 Dokumentasi Halaman Admin Konten Pilihan

Halaman \`/admin/featured\` digunakan untuk mengatur daftar konten unggulan yang tampil di beranda PaberLand.

a.  Header & Status Akses

Indikator "Memverifikasi akses admin\..." muncul sebelum data siap. Header menampilkan judul "Konten Pilihan" dan ringkasan jumlah konten yang sedang ditampilkan di beranda.

b.  Daftar Konten Pilihan

Konten unggulan ditampilkan dalam kartu atau tabel yang memuat judul, penulis, kategori, tanggal dipilih, serta posisi tampil (Hero, Konten Pilihan, dsb.). Tombol aksi yang tersedia:

- "Baca Artikel" untuk memeriksa konten,

- "Atur Prioritas" (drag & drop atau input urutan),

- "Hapus dari Featured".

[]{#_Toc215958735 .anchor}![A screenshot of a chat AI-generated content may be incorrect.](docs/skripsi/media/image93.png){width="5.511805555555555in" height="3.0993055555555555in"}Gambar 4.91 Daftar Konten Pilihan

c.  Tambah Konten Pilihan

![](docs/skripsi/media/image94.png){width="5.511805555555555in" height="2.6104166666666666in"}Panel kanan menyediakan form untuk menambahkan artikel baru ke featured. Admin dapat mencari artikel berdasarkan judul/slug, memilih slot penempatan, dan menyimpan perubahan.

[]{#_Toc215958736 .anchor}Gambar 4.92 Berhasil Menambahkan Konten Pilihan

d.  Notifikasi & Validasi

Setiap perubahan (menambahkan atau menghapus konten pilihan) menampilkan toast keberhasilan/gagal. Validasi akan menolak jika admin mencoba melebihi kuota slot featured.

#### 4.3.2.20 Dokumentasi Halaman Admin Analytics

Halaman \`/admin/analytics\` menyediakan wawasan data untuk memonitor performa platform secara agregat.

a.  Header & Status Akses

![A screenshot of a computer AI-generated content may be incorrect.](docs/skripsi/media/image95.png){width="5.511805555555555in" height="3.0993055555555555in"}Indikator "Memverifikasi akses admin\..." ditampilkan sebelum dashboard siap. Header menampilkan judul "Analytics" serta deskripsi singkat mengenai laporan yang disajikan (mis. summary mingguan).

[]{#_Toc215958737 .anchor}Gambar 4.93 Halaman Admin Analytics

b.  Ringkasan KPI Utama

Bagian atas menampilkan KPI seperti total views, rata-rata waktu baca, jumlah artikel terbit per minggu, pertumbuhan user, dan engagement rate. Komponen ini menggunakan kartu statistik interaktif.

c.  Grafik Tren & Distribusi

Halaman menampilkan grafik garis/batang yang menunjukkan tren artikel terbit, views per kategori, performa konten featured, serta distribusi user aktif. Admin dapat mengganti rentang waktu (7 hari, 30 hari, 90 hari).

[]{#_Toc215958738 .anchor}![A screenshot of a computer AI-generated content may be incorrect.](docs/skripsi/media/image96.png){width="5.511805555555555in" height="3.0993055555555555in"}Gambar 4.94 Grafik Tren & Distribusi

d.  Tabel Detail & Insight

Di bagian bawah terdapat tabel detail berisi artikel dengan performa tertinggi (views, likes, komentar) serta penulis paling aktif.

#### 4.3.2.21 Dokumentasi Halaman Admin Activity Logs

Halaman \`/admin/logs\` menyajikan catatan aktivitas moderator untuk audit internal.

a.  Header & Status Akses

Indikator "Memverifikasi akses admin\..." muncul sebelum daftar log dimuat. Header menampilkan judul "Activity Logs" dan jumlah log terbaru yang tersedia.

b.  Filter Log

Filter yang tersedia meliputi:

- Tipe aktivitas (Create, Update, Delete, Suspend, dsb.),

- Rentang tanggal/waktu,

- Nama admin/moderator,

- Kata kunci pada deskripsi log.

c.  Tabel Log & Detail

![A screenshot of a computer AI-generated content may be incorrect.](docs/skripsi/media/image97.png){width="5.511805555555555in" height="3.0993055555555555in"}Log ditampilkan dalam tabel dengan kolom: waktu, nama admin, aksi, target (mis. artikel/user), dan deskripsi singkat. Saat satu baris dipilih, panel detail menampilkan informasi lanjutan (payload perubahan, IP address jika tersedia).

[]{#_Toc215958739 .anchor}Gambar 4.95 Log & Detail

#### 4.3.2.22 Validasi Implementasi Prototipe Akhir (Iterasi 2)

Setelah pengkodean Iterasi 2 selesai, dilakukan validasi ulang terhadap sistem untuk memastikan bahwa semua temuan kritis dari Iterasi 1 telah diatasi, dan fitur-fitur baru (*misalnya: fitur Konten Pilihan* ) berfungsi sesuai rancangan. Validasi ini mengkonfirmasi kesiapan sistem untuk diuji secara formal pada **Bab 7 Pengujian**.

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
   **No**   **Modul / Isu Kritis**                                        **Rencana Perbaikan (Iterasi 1)**                                                                                        **Hasil Implementasi (Iterasi 2)**                                                  **Kesimpulan**
  -------- ------------------------ -------------------------------------------------------------------------------------------------------------- ---------------------------------------------------------------------------------------------------------------------------------- ----------------
     1        Tema Visual Global                         Mengubah total tema aplikasi menjadi dominan Putih (*Clean White*).                                 Tema visual diubah total, menggunakan latar belakang putih dan biru muda, sehingga meningkatkan *readability*.                Sesuai

     2         Branding & Logo                           Mengganti logo dengan file **"Logo L"** dan mengganti *Hero Image*.                              Logo Xcellere baru diterapkan pada header dan favicon. *Hero Image* diganti dengan ilustrasi bertema literasi anak.              Sesuai

     3         Halaman Beranda                               Mengecilkan font judul dan memperbaiki *copywriting* narasi.                                          Tipografi judul *Hero Section* disesuaikan dan *copywriting* menjadi lebih spesifik dan persuasif.                      Sesuai

     4        Struktur Kategori                           Menghapus opsi **"Lainnya"** dan membakukan **11 Kategori Wajib**.                        Kategori *Lainnya* dihapus, dan 11 kategori lengkap (misal: Resensi Buku, Serial, Cermin) diterapkan pada *sidebar* dan etalase.       Sesuai

     5        Portofolio Member                 Mengubah label tombol menjadi **"+ Tambah Karya"** dan membuat kartu karya interaktif.                               Label tombol diperbaiki. Fungsi portofolio kini dapat memuat data yang tersimpan di *backend*.                        Sesuai

     6         Validasi Teknis       Memperbaiki validasi *backend* (PostgreSQL *Constraint*) yang menyebabkan *critical error* saat simpan data.      *Error check constraint* tidak ditemukan lagi saat pengujian, dan data portofolio dapat disimpan dengan 11 kategori baku.           Sesuai

     7         Editor Penulisan                      Memperbaiki konfigurasi TinyMCE dan memperbarui *dropdown* kategori editor.                                  *Warning* lisensi TinyMCE dihilangkan. Editor menggunakan *dropdown* kategori yang sudah terstandar.                     Sesuai

     8           Admin Panel                             Mengubah istilah **"Konten Featured"** menjadi **"Konten Pilihan"**.                                       Seluruh Admin Panel menggunakan istilah **Konten Pilihan**, memastikan konsistensi bahasa baku.                        Sesuai

     9         Informasi Kontak                                      Menghapus nomor telepon pribadi di *footer*.                                      *Footer* hanya menampilkan email resmi ([**moderator.pba@gmail.com**](mailto:moderator.pba@gmail.com)) dan alamat kantor.           Sesuai
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 4.4 Hasil Analisis Kebutuhan

Bagian ini merangkum kebutuhan akhir yang telah disepakati bersama stakeholder PaberLand setelah melalui proses rekayasa kebutuhan yang komprehensif, meliputi tiga iterasi prototyping, lima sesi validasi fitur dengan perwakilan komunitas, serta dua workshop bersama tim Litbang untuk memastikan kesesuaian kebutuhan dengan visi organisasi. Proses analisis kebutuhan dilakukan secara iteratif dengan pendekatan agile, di mana setiap iterasi menghasilkan prototipe yang lebih matang dan mendekati kebutuhan sebenarnya. Iterasi pertama fokus pada validasi konsep dasar platform dan identifikasi fitur-fitur kritis yang harus ada pada versi minimum viable product (MVP). Iterasi kedua mengembangkan prototipe dengan fitur-fitur inti yang lengkap dan melakukan pengujian usability dengan sepuluh pengguna beta. Iterasi ketiga melakukan refinement terhadap fitur-fitur yang telah diimplementasikan dan menambahkan fitur-fitur tambahan berdasarkan feedback pengguna.

Setiap iterasi prototyping diikuti dengan sesi validasi yang melibatkan berbagai stakeholder, termasuk penulis aktif, moderator, administrator, dan pembaca reguler. Sesi validasi dilakukan dengan metode task-based testing, di mana peserta diminta untuk menyelesaikan serangkaian tugas menggunakan prototipe yang telah disiapkan. Hasil pengujian dianalisis untuk mengidentifikasi hambatan usability, kesenjangan fungsional, dan kebutuhan yang belum terakomodasi. Feedback yang diperoleh kemudian dikategorisasi berdasarkan prioritas (tinggi, sedang, rendah) dan feasibilitas implementasi (mudah, sedang, sulit) untuk menentukan fitur-fitur yang akan dikembangkan pada iterasi berikutnya.

Workshop bersama tim Litbang dilakukan untuk memastikan bahwa kebutuhan yang telah diidentifikasi selaras dengan visi dan misi organisasi PaberLand. Workshop ini menghasilkan kesepakatan tentang prioritas fitur, batasan implementasi, dan kriteria keberhasilan sistem. Selain itu, dilakukan juga analisis kompetitif terhadap platform komunitas penulis serupa seperti Medium, Wattpad, dan Kompasiana untuk mengidentifikasi best practices dan fitur-fitur inovatif yang dapat diadopsi. Hasil analisis kompetitif ini digunakan untuk memperkaya daftar kebutuhan dan memastikan bahwa platform PaberLand memiliki keunggulan kompetitif yang jelas.

Informasi yang disajikan dalam bagian ini menjadi acuan resmi sebelum sistem dilanjutkan ke tahap perancangan detail. Setiap kebutuhan yang tercantum telah melalui proses validasi dan disetujui oleh stakeholder terkait, sehingga dapat dijadikan dasar untuk pengembangan spesifikasi teknis, perancangan arsitektur sistem, dan implementasi fitur-fitur platform.

### 4.4.1 Kebutuhan Pengguna

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
   **No**     **Pengguna**                                                                                                                     **Narasi Kebutuhan**                                                                                                                    **Prioritas**                    **Validasi**
  -------- ------------------ ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- --------------- -------------------------------------------------
     1          Penulis        Dapat menulis, menyimpan draft, dan mempublikasikan artikel dengan mudah. Kebutuhan ini diterjemahkan menjadi fitur editor yang dapat menyimpan draft otomatis, menyediakan template untuk berbagai jenis karya, dan menampilkan statistik penulisan.      Tinggi       Disetujui pada sesi zoom meeting (28 Juli 2025)

     2      Moderator/Editor                                             Dapat mengkurasi artikel berkualitas untuk ditampilkan di halaman depan, meninjau dan menangani laporan konten, serta mengelola akun anggota baru dengan efisien.                                                Tinggi       Disetujui pada sesi zoom meeting (28 Juli 2025)

     3       Administrator                                                        Dapat memantau aktivitas dan statistik platform secara keseluruhan, mengubah pengaturan sistem, dan melakukan tindakan darurat jika diperlukan.                                                         Tinggi       Disetujui pada sesi zoom meeting (28 Juli 2025)

     4        Pembaca Umum                                        Dapat menemukan konten relevan dan menarik melalui berbagai cara (homepage, kategori, pencarian, profil penulis), serta dapat memberikan apresiasi terhadap karya yang disukai.                                         Sedang       Disetujui pada sesi zoom meeting (28 Juli 2025)
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  : []{#_Toc215958586 .anchor}Tabel 4.4 Ringkasan kebutuhan pengguna PaberLand

Pembahasan kebutuhan tidak berhenti pada tabel di atas. Tim peneliti juga mengekstrak \_user story\_ detail dari setiap wawancara untuk memastikan setiap kebutuhan mempunyai indikator keberhasilan yang terukur dan dapat diverifikasi. Proses ekstraksi user story dilakukan dengan mengidentifikasi persona, goal, dan benefit dari setiap kebutuhan. Sebagai contoh, kebutuhan penulis dinyatakan berhasil apabila mereka dapat menerbitkan artikel baru tanpa menemui \_error\_ dalam tiga iterasi pertama sesi beta, dengan waktu rata-rata penyelesaian tugas kurang dari 15 menit, dan tingkat kepuasan minimal 4 dari 5 skala Likert. Indikator keberhasilan ini diukur melalui kombinasi metrik kuantitatif (waktu penyelesaian tugas, jumlah error, tingkat keberhasilan) dan kualitatif (feedback pengguna, observasi perilaku).

Dari wawancara dengan moderator, terungkap kebutuhan untuk dapat mencatat alasan editorial ketika melakukan kurasi konten, sehingga proses kurasi menjadi lebih transparan dan komunikasi dengan penulis dapat dilakukan dengan lebih baik. Kebutuhan bisnis ini kemudian diterjemahkan oleh tim peneliti menjadi fitur catatan internal pada panel admin yang memungkinkan moderator untuk menambahkan catatan yang hanya terlihat oleh tim moderator dan admin, sementara penulis menerima notifikasi ringkasan tanpa detail teknis. Tim peneliti juga menambahkan fitur histori perubahan status artikel berdasarkan kebutuhan moderator untuk dapat melacak alur keputusan editorial dari waktu ke waktu.

Dari wawancara dengan administrator, terungkap kebutuhan untuk dapat melacak semua perubahan yang dilakukan pada sistem, sehingga jika terjadi masalah dapat diketahui siapa yang melakukan perubahan dan kapan perubahan dilakukan. Kebutuhan bisnis ini kemudian diterjemahkan oleh tim peneliti menjadi sistem activity logs yang mencatat seluruh perubahan konfigurasi dengan informasi lengkap tentang siapa yang melakukan perubahan, kapan perubahan dilakukan, nilai sebelum dan sesudah perubahan, serta alasan perubahan jika tersedia. Sistem logging ini memungkinkan audit trail yang komprehensif dan memudahkan troubleshooting ketika terjadi masalah.

Dari wawancara dengan pembaca umum, terungkap kebutuhan untuk dapat menemukan konten berkualitas tinggi dengan mudah tanpa harus menjelajahi seluruh katalog yang tersedia. Kebutuhan bisnis ini kemudian diterjemahkan oleh tim peneliti menjadi blok \"Konten Pilihan\" di homepage yang menampilkan artikel-artikel unggulan hasil kurasi moderator, serta fitur \"Artikel Terkait\" di halaman detail artikel yang menggunakan algoritma rekomendasi berbasis kategori, tag, dan pola membaca pengguna. Tim peneliti juga menambahkan fitur menampilkan artikel populer berdasarkan jumlah views, likes, dan komentar dalam periode tertentu untuk memberikan variasi konten yang menarik bagi pembaca.

Setiap kebutuhan pengguna juga dilengkapi dengan analisis dampak bisnis untuk memastikan bahwa pengembangan fitur memberikan nilai yang signifikan bagi komunitas. Analisis ini mencakup estimasi peningkatan engagement, pengurangan waktu yang dibutuhkan untuk menyelesaikan tugas, dan peningkatan kepuasan pengguna. Sebagai contoh, kebutuhan penulis untuk dapat menyimpan draft dengan aman (yang kemudian diterjemahkan menjadi fitur auto-save oleh tim peneliti) diperkirakan dapat mengurangi tingkat kehilangan draft sebesar 85% dan meningkatkan produktivitas menulis sebesar 30% berdasarkan studi komparatif dengan platform serupa. Dokumentasi lengkap tentang analisis dampak bisnis ini disimpan sebagai bagian dari business case untuk setiap fitur yang dikembangkan.

### 4.4.2 Aktivitas Sistem

  ---------------------------------------------------------------------------------------------------------------------------------------------------
   **Kode**   **Aktivitas Sistem**                                                    **Penjelasan**
  ---------- ----------------------- ----------------------------------------------------------------------------------------------------------------
    AS-01     Manajemen Autentikasi                      Registrasi, login, konfirmasi email, reset password, serta OAuth Google

    AS-02      Pengelolaan Artikel        CRUD artikel, pengaturan jadwal terbit, perhitungan views/likes/comments, serta statistik per penulis

    AS-03       Interaksi Sosial                   Sistem komentar bertingkat, notifikasi balasan, fitur like, dan follow antar penulis

    AS-04       Discovery Konten                Homepage dinamis, kategori, pencarian dengan filter, daftar penulis, serta konten terkait

    AS-05      Portofolio & Profil                  Portofolio karya, profil publik, edit profil, pengelolaan avatar, dan data kontak

    AS-06       Admin & Moderasi      Panel admin lengkap mencakup manajemen user, artikel, laporan, featured content, analytics, logs, dan settings
  ---------------------------------------------------------------------------------------------------------------------------------------------------

  : []{#_Toc215958587 .anchor}Tabel 4.5 Aktivitas sistem inti dan penjelasan

Setiap aktivitas di atas dipetakan ke modul teknis tertentu dengan detail implementasi yang jelas untuk memastikan konsistensi pengembangan. Misalnya, AS-01 (Manajemen Autentikasi) diimplementasikan menggunakan Supabase Auth yang menyediakan infrastruktur autentikasi yang aman dan terkelola. Sistem mendukung tiga metode autentikasi: email/password dengan verifikasi email wajib, magic link yang memungkinkan login tanpa password, dan Google OAuth untuk kemudahan akses. Setiap metode autentikasi dilengkapi dengan mekanisme keamanan seperti rate limiting, captcha untuk mencegah brute force attack, dan session management yang aman. Proses registrasi memerlukan verifikasi email untuk memastikan validitas alamat email dan mengurangi risiko akun spam. Sistem juga menyediakan fitur reset password yang aman dengan token yang memiliki masa berlaku terbatas dan hanya dapat digunakan sekali.

AS-02 (Pengelolaan Artikel) melibatkan kombinasi Supabase \`articles\` table dengan struktur yang dioptimalkan untuk performa query, triggers PostgreSQL untuk menghitung views secara real-time, serta edge function untuk \_incremental regeneration\_ yang memastikan statistik artikel selalu up-to-date tanpa membebani database. Sistem CRUD artikel dirancang dengan mempertimbangkan kebutuhan penulis untuk menyimpan draft, menjadwalkan publikasi, dan mengelola metadata artikel seperti kategori, tag, dan excerpt. Fitur auto-save diimplementasikan menggunakan debounce mechanism yang menyimpan draft setiap 30 detik atau ketika pengguna berhenti mengetik selama 3 detik, memastikan tidak ada kehilangan data meskipun terjadi gangguan koneksi. Sistem juga menyediakan version history untuk artikel sehingga penulis dapat melihat dan memulihkan versi sebelumnya jika diperlukan.

Aktivitas discovery (AS-04) mengandalkan pipeline caching berbasis Vercel Edge Network yang menyimpan hasil query di edge locations di seluruh dunia, sehingga homepage dapat menampilkan kombinasi konten terbaru dan featured tanpa memukul database secara berlebihan. Cache diatur dengan strategi stale-while-revalidate yang memastikan pengguna selalu melihat konten terbaru sambil tetap mendapatkan performa yang optimal. Sistem pencarian menggunakan full-text search PostgreSQL dengan indeks GIN untuk mempercepat pencarian pada kolom title, content, dan excerpt. Filter pencarian dirancang dengan mempertimbangkan berbagai skenario penggunaan, termasuk pencarian berdasarkan kategori, tanggal publikasi, status artikel, dan penulis.

AS-03 (Interaksi Sosial) diimplementasikan dengan mempertimbangkan skalabilitas dan performa untuk menangani volume interaksi yang tinggi. Sistem komentar menggunakan struktur data hierarchical dengan parent_id untuk mendukung komentar berulir hingga beberapa level kedalaman. Notifikasi real-time diimplementasikan menggunakan Supabase Realtime yang memungkinkan pengguna menerima notifikasi segera ketika ada komentar baru, balasan, atau like pada artikel mereka. Sistem like menggunakan optimistik update untuk memberikan feedback instan kepada pengguna sambil melakukan sinkronisasi dengan database di background, memastikan pengalaman pengguna yang mulus meskipun terjadi latensi jaringan.

AS-05 (Portofolio & Profil) dirancang untuk memungkinkan penulis menampilkan karya mereka secara profesional. Sistem portofolio mendukung berbagai jenis karya termasuk buku yang telah diterbitkan, artikel di media eksternal, sertifikat prestasi, dan penghargaan. Setiap item portofolio dapat dilengkapi dengan metadata seperti tanggal publikasi, penerbit, ISBN, dan tautan eksternal. Profil publik dirancang untuk memberikan gambaran komprehensif tentang penulis, termasuk statistik kontribusi, kategori favorit, dan artikel terpopuler. Sistem juga menyediakan fitur edit profil yang memungkinkan penulis mengelola informasi pribadi, avatar, dan preferensi privasi.

AS-06 (Admin & Moderasi) merupakan aktivitas kritis yang memerlukan keamanan dan audit trail yang ketat. Panel admin dirancang dengan prinsip least privilege, di mana setiap admin hanya memiliki akses ke fitur-fitur yang diperlukan untuk peran mereka. Sistem logging mencatat setiap tindakan admin dengan detail lengkap termasuk timestamp, IP address, user agent, dan payload perubahan. Fitur moderasi laporan dirancang dengan workflow yang jelas, mulai dari penerimaan laporan, review oleh moderator, hingga keputusan final dengan catatan alasan. Sistem juga menyediakan dashboard analytics yang menampilkan metrik platform secara real-time, memungkinkan admin untuk memantau kesehatan platform dan mengidentifikasi tren yang perlu perhatian.

Catatan implementasi juga memetakan prioritas aktivitas berdasarkan dampak bisnis dan kompleksitas teknis: AS-01, AS-02, dan AS-06 ditempatkan pada \_Critical Path\_ karena merupakan fondasi platform yang harus berfungsi dengan sempurna, sedangkan AS-04 dan AS-05 berada pada jalur peningkatan pengalaman pengguna yang dapat dikembangkan secara bertahap. Dengan memecah aktivitas seperti ini, proses perencanaan sprint menjadi jauh lebih terstruktur dan memungkinkan tim untuk fokus pada fitur-fitur yang memberikan nilai tertinggi terlebih dahulu.

4.4.3 Batasan Implementasi

- Seluruh data pribadi disimpan dan dikelola melalui Supabase (PostgreSQL + RLS).

- Pengunggahan berkas dibatasi pada gambar (JPEG, PNG, WebP) maksimal 3 MB.

- Layanan email menggunakan infrastruktur Supabase + Resend dengan kuota 10.000 email/bulan.

- Performa halaman harus mencapai skor Lighthouse minimal 85 (mobile) dan 90 (desktop) pada lingkungan staging.

- Fitur monetisasi (premium article, tip jar) tidak termasuk ruang lingkup skripsi ini.

Batasan di atas disosialisasikan sejak awal kepada stakeholder agar ekspektasi terhadap sistem tetap realistis. Misalnya, ketika komunitas meminta fitur unggah video, tim menegaskan bahwa dukungan file besar belum disiapkan dalam fase ini karena fokusnya masih pada teks dan gambar. Pembatasan ukuran file 3 MB dipilih berdasarkan analisis bandwidth pengguna (sebagian besar mengakses melalui seluler dengan kuota terbatas). Sementara itu, target skor Lighthouse dijadikan \_acceptance criteria\_ untuk memastikan pengalaman pengguna tetap mulus walaupun konten terus bertambah.

## 4.5 Identifikasi Pengguna Akhir

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
   **No**     **Peran**                              **Deskripsi**                                                               **Aktivitas Kunci**
  -------- --------------- ----------------------------------------------------------------- --------------------------------------------------------------------------------------------
     1         Penulis          Anggota komunitas yang aktif menulis karya sastra anak        Menulis artikel, mengelola portofolio, berinteraksi (komentar/like), serta mengatur profil

     2      Pembaca Umum    Pengunjung publik yang mengonsumsi konten dan memberi apresiasi                Menelusuri konten, membaca artikel, memberikan like dan komentar

     3        Moderator        Tim Litbang yang bertanggung jawab terhadap kurasi konten                 Meninjau laporan, menandai featured, serta memberi catatan editorial

     4      Administrator          Pengelola platform secara teknis dan operasional                  Mengelola user, konfigurasi sistem, memantau analytics, serta mengaudit logs
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  : []{#_Toc215958588 .anchor}Tabel 4.6 Profil pengguna akhir dan aktivitas kunci

Identifikasi pengguna akhir dilakukan melalui proses yang komprehensif yang melibatkan analisis data demografis, wawancara mendalam dengan perwakilan dari setiap kelompok pengguna, dan observasi terhadap pola penggunaan platform media sosial yang sudah ada. Proses ini menghasilkan empat peran utama yang merepresentasikan seluruh spektrum pengguna platform PaberLand. Setiap peran memiliki karakteristik, kebutuhan, dan ekspektasi yang unik, yang kemudian diterjemahkan menjadi fitur-fitur spesifik dalam platform.

Peran pertama adalah Penulis, yang merupakan anggota komunitas yang aktif menulis karya sastra anak. Penulis memiliki kebutuhan akan platform yang memudahkan proses penulisan, penyimpanan draft, dan publikasi konten dengan format yang rapi. Mereka juga membutuhkan kemampuan untuk mengelola portofolio karya mereka, berinteraksi dengan pembaca melalui komentar dan like, serta mengatur profil mereka untuk meningkatkan visibilitas. Penulis juga membutuhkan statistik tentang performa artikel mereka, termasuk jumlah views, likes, dan komentar, untuk memahami bagaimana karya mereka diterima oleh komunitas.

Peran kedua adalah Pembaca Umum, yang merupakan pengunjung publik yang lebih banyak mengonsumsi konten daripada menulis. Pembaca membutuhkan kemampuan untuk menelusuri konten dengan mudah melalui homepage, kategori, dan pencarian. Mereka juga membutuhkan kemampuan untuk memberikan apresiasi melalui like dan komentar, serta follow penulis yang mereka sukai untuk mendapatkan notifikasi tentang konten baru. Pembaca juga membutuhkan rekomendasi konten yang relevan berdasarkan minat dan pola membaca mereka.

Peran ketiga adalah Moderator, yang merupakan tim Litbang yang bertanggung jawab terhadap kurasi konten. Moderator membutuhkan kemampuan untuk meninjau laporan konten, menandai artikel sebagai featured, dan memberikan catatan editorial kepada penulis. Mereka juga membutuhkan dashboard yang memudahkan mereka untuk memantau aktivitas platform dan mengambil keputusan moderasi yang tepat. Moderator juga membutuhkan kemampuan untuk mengaktifkan akun baru dengan cepat dan mengelola kategori konten.

Peran keempat adalah Administrator, yang merupakan pengelola platform secara teknis dan operasional. Administrator membutuhkan kemampuan untuk mengelola pengguna, mengubah konfigurasi sistem, memantau analytics platform, dan melakukan audit logs. Mereka juga membutuhkan kemampuan untuk melakukan tindakan darurat seperti maintenance mode dan mengatur batasan teknis seperti kuota unggah. Administrator juga membutuhkan akses ke semua fitur admin untuk memastikan platform berjalan dengan baik.

Identifikasi peran juga mempengaruhi strategi komunikasi dan desain antarmuka pengguna. Penulis dan pembaca menerima email berkala yang menyorot konten baru dan rekomendasi artikel, sementara moderator mendapatkan \_digest\_ laporan setiap pagi yang merangkum semua laporan yang perlu ditinjau. Admin memiliki akses ke dashboard internal di mana mereka dapat mengatur batasan teknis seperti kuota unggah, mengubah pengaturan platform, dan memantau kesehatan sistem secara real-time. Dengan membedakan kebutuhan setiap peran seperti ini, tim memastikan pengalaman pengguna terasa personal dan relevan, serta memastikan bahwa setiap fitur yang dikembangkan memberikan nilai yang signifikan bagi pengguna yang menggunakannya.

## 4.6 Kebutuhan Fungsional dan Non-Fungsional

### 4.6.1 Daftar Kebutuhan Fungsional

  --------------------------------------------------------------------------------------------------------------------------------------------
   **Kode**        **Nama Fitur**                                                    **Deskripsi**
  ---------- --------------------------- -----------------------------------------------------------------------------------------------------
     F-01     Autentikasi Multi Metode                    Sistem mendukung email/password, email magic link, dan Google OAuth

     F-02     Editor TinyMCE + Template                 Penulis dapat menggunakan template per kategori, auto-save, dan preview

     F-03         Manajemen Artikel             CRUD artikel, jadwal terbit, kontrol status publish/draft, serta statistik per artikel

     F-04         Komentar Berulir                Pengguna dapat menulis, membalas, mengedit, dan menghapus komentar sesuai hak akses

     F-05            Sistem Like                                             Pengguna dapat memberi like.

     F-06       Pencarian & Kategori      Fitur pencarian dengan filter kategori, status, dan tanggal; halaman kategori menampilkan statistik

     F-07        Portofolio Penulis              Penulis dapat menambahkan karya eksternal, sertifikat, atau buku ke portofolio publik

     F-08            Admin Panel             Menu users, articles, reports, featured, analytics, logs, dan settings tersedia sesuai peran

     F-09            Notifikasi                       Sistem mengirim notifikasi real-time untuk komentar, balasan , dan laporan

     F-10          Laporan Konten              Pengguna dapat melaporkan konten, dan moderator dapat meninjau serta memberikan keputusan
  --------------------------------------------------------------------------------------------------------------------------------------------

  : []{#_Toc215958589 .anchor}Tabel 4.7 Kebutuhan fungsional (F-XX)

Setiap kebutuhan fungsional memiliki \_acceptance criteria\_ yang terdokumentasi secara detail di lembar Quality Assurance (QA) untuk memastikan bahwa implementasi memenuhi standar yang ditetapkan. Proses dokumentasi acceptance criteria dilakukan melalui workshop bersama tim pengembang, QA, dan stakeholder untuk memastikan bahwa setiap kriteria dapat diukur, diverifikasi, dan realistis untuk dicapai. Acceptance criteria ini kemudian digunakan sebagai dasar untuk penulisan test case, baik untuk pengujian manual maupun otomatis.

Sebagai contoh, F-01 (Autentikasi Multi Metode) dianggap selesai apabila sistem dapat menangani tiga metode autentikasi (email/password, magic link, Google OAuth) dengan baik, dan seluruh proses autentikasi dicatat dalam audit log. Sistem juga harus dapat menangani skenario error seperti email tidak terdaftar, password salah, atau token OAuth yang expired dengan memberikan pesan error yang jelas dan tidak membocorkan informasi sensitif.

F-02 (Editor TinyMCE + Template) dianggap selesai apabila fitur auto-save menyimpan draft secara otomatis, draft dapat dipulihkan ketika pengguna kembali ke editor, dan editor mendukung template per kategori. Sistem juga harus dapat menampilkan statistik kata dan waktu baca, serta menyediakan preview artikel sebelum publikasi. Fitur template harus memungkinkan penulis untuk memilih template yang sesuai dengan kategori artikel mereka.

F-03 (Manajemen Artikel) dianggap selesai apabila sistem dapat melakukan CRUD artikel dengan baik, mendukung jadwal publikasi, dan statistik artikel (views, likes, comments) diperbarui secara real-time. Sistem juga harus dapat menangani artikel dengan konten panjang tanpa mengalami masalah performa, dan mendukung metadata artikel seperti kategori, excerpt, dan cover image. Fitur kontrol status publish/draft harus memungkinkan penulis untuk beralih antara status tanpa kehilangan data.

F-04 (Komentar Berulir) dianggap selesai apabila sistem dapat menampilkan komentar dalam struktur hierarchical, mendukung edit dan delete komentar sesuai hak akses, dan menampilkan notifikasi real-time ketika ada komentar baru atau balasan. Sistem juga harus dapat menangani komentar spam dengan sistem moderasi otomatis, dan menyediakan fitur report untuk komentar yang tidak pantas. Fitur edit komentar harus memungkinkan pengguna untuk mengedit komentar mereka sendiri, dan sistem harus menampilkan indikator \"diedit\" pada komentar yang telah diubah.

F-05 (Sistem Like) dianggap selesai apabila sistem dapat menangani like dengan optimistik update untuk memberikan feedback instan kepada pengguna. Sistem harus dapat memperbarui jumlah like artikel secara real-time dan menampilkan status like pengguna (sudah like atau belum) dengan akurat. Sistem harus dapat menangani toggle like/unlike dengan responsif.

F-06 (Pencarian & Kategori) dianggap selesai apabila sistem dapat melakukan pencarian full-text dengan baik, mendukung filter berdasarkan kategori, status, dan tanggal, dan menampilkan statistik kategori (jumlah artikel, views, likes) secara real-time. Sistem juga harus dapat menangani pencarian dengan berbagai kata kunci dan menampilkan hasil yang relevan. Fitur kategori harus menampilkan kategori utama dengan ikon dan deskripsi yang jelas.

F-07 (Portofolio Penulis) dianggap selesai apabila penulis dapat menambahkan berbagai jenis karya (buku, artikel eksternal, sertifikat, penghargaan, proyek) dengan metadata lengkap, dan portofolio dapat ditampilkan dalam format yang menarik dan mudah dinavigasi. Sistem juga harus dapat menampilkan portofolio dalam grid atau list view, dan menyediakan fitur untuk mengurutkan portofolio berdasarkan tanggal atau kategori. Setiap item portofolio harus dapat dilengkapi dengan cover image, deskripsi, dan tautan eksternal.

F-08 (Admin Panel) dianggap selesai apabila semua menu admin (users, articles, reports, featured, analytics, logs, settings) dapat diakses sesuai peran, dan hak akses diverifikasi untuk memastikan role admin tidak dapat diambil alih oleh penulis biasa. Sistem juga harus dapat menampilkan dashboard dengan metrik platform, dan menyediakan fitur untuk melakukan tindakan moderasi dengan audit trail. Setiap tindakan admin harus dicatat dalam activity logs dengan informasi lengkap tentang siapa, kapan, dan apa yang dilakukan.

F-09 (Notifikasi) dianggap selesai apabila sistem dapat mengirim notifikasi real-time untuk komentar, balasan, dan laporan dengan baik, dan pengguna dapat mengatur preferensi notifikasi sesuai kebutuhan mereka. Sistem juga harus dapat menampilkan notifikasi dalam bentuk badge, dropdown, dan halaman notifikasi terpusat, dan menyediakan fitur untuk menandai notifikasi sebagai sudah dibaca atau menghapus notifikasi yang tidak diperlukan.

F-10 (Laporan Konten) dianggap selesai apabila pengguna dapat melaporkan konten dengan alasan yang jelas, moderator dapat meninjau laporan dengan detail lengkap, dan sistem dapat memberikan keputusan (terima/tolak) dengan catatan alasan. Sistem juga harus dapat menangani laporan duplikat dan menampilkan histori laporan untuk artikel yang sama, serta menyediakan notifikasi kepada pelapor tentang status laporan mereka.

Untuk F-08, hak akses diverifikasi untuk memastikan bahwa role admin tidak dapat diambil alih oleh penulis biasa. Sistem harus dapat menahan berbagai skenario serangan seperti SQL injection, XSS, CSRF, dan privilege escalation.

Dokumentasi semacam ini memudahkan tim saat menulis test case dan mengurangi misinterpretasi ketika proyek berkembang. Setiap acceptance criteria juga dilengkapi dengan contoh skenario pengujian dan data uji yang dapat digunakan untuk memverifikasi bahwa fitur memenuhi kriteria yang ditetapkan. Dokumentasi ini juga memastikan bahwa seluruh tim memiliki pemahaman yang sama tentang apa yang diharapkan dari setiap fitur, sehingga mengurangi risiko miskomunikasi dan rework di kemudian hari.

### 4.6.2 Daftar Kebutuhan Non-Fungsional

  -------------------------------------------------------------------------------------------------------------------------------------------------------
   **Kode**   **Kategori ISO/IEC 25010**                                                   **Deskripsi**
  ---------- ---------------------------- ---------------------------------------------------------------------------------------------------------------
    NF-01       Performance Efficiency                                Waktu respon halaman web \< 3 detik pada kondisi normal

    NF-02              Security            Seluruh *endpoint* dilindungi RLS dan otorisasi berbasis peran; *password* disimpan dengan enkripsi yang aman

    NF-03             Usability                        Platform mudah digunakan dan dipahami oleh pengguna tanpa memerlukan pelatihan khusus

    NF-04          Maintainability                           Kode menggunakan TypeScript dan mengikuti standar *coding* yang konsisten

    NF-05            Portability                                UI responsif untuk berbagai ukuran layar (mobile, tablet, desktop)

    NF-06           Compatibility                        Platform berjalan dengan baik pada browser modern (Chrome, Edge, Safari, Firefox)

    NF-07           Recoverability                           *Backup* database dilakukan secara berkala untuk mencegah kehilangan data
  -------------------------------------------------------------------------------------------------------------------------------------------------------

  : []{#_Toc215958590 .anchor}Tabel 4.8 Kebutuhan non-fungsional (NF-XX)

Standar non-fungsional ini kemudian diterjemahkan menjadi indikator yang dapat diukur untuk memastikan bahwa sistem memenuhi standar kualitas yang ditetapkan. Setiap kebutuhan non-fungsional memiliki target yang jelas dan dapat dipantau selama pengembangan dan setelah sistem diluncurkan.

Target performa (NF-01) dipantau melalui pengujian waktu muat halaman pada berbagai kondisi koneksi. Pengujian dilakukan pada halaman utama, halaman artikel, dan halaman admin untuk memastikan bahwa waktu respon tetap dalam batas yang wajar. Hasil pengujian menunjukkan bahwa sebagian besar halaman dapat dimuat dalam waktu kurang dari 2 detik pada koneksi internet normal. Optimasi dilakukan melalui penggunaan caching, lazy loading, dan optimasi gambar untuk meningkatkan performa.

Keamanan (NF-02) dipastikan melalui implementasi Row Level Security (RLS) pada database dan sistem otorisasi berbasis peran. Setiap pengguna hanya dapat mengakses data yang diizinkan sesuai dengan peran mereka. Password pengguna disimpan dengan enkripsi yang aman menggunakan algoritma hashing. Seluruh komunikasi antara client dan server menggunakan protokol HTTPS untuk mencegah intercept data.

Usability (NF-03) dipastikan melalui desain antarmuka yang intuitif dan mudah dipahami. Navigasi platform dirancang dengan struktur yang jelas dan konsisten di seluruh halaman. Pengujian usability dilakukan dengan melibatkan beberapa pengguna untuk mendapatkan feedback tentang kemudahan penggunaan platform. Berdasarkan feedback tersebut, dilakukan perbaikan pada area yang dianggap membingungkan atau sulit digunakan.

Maintainability (NF-04) dipastikan melalui penggunaan TypeScript yang menyediakan type safety dan mengurangi kemungkinan error. Kode ditulis dengan mengikuti standar coding yang konsisten, termasuk penamaan variabel yang jelas, struktur folder yang terorganisir, dan dokumentasi yang memadai. Hal ini memudahkan pengembang lain untuk memahami dan memodifikasi kode di masa depan.

Portability (NF-05) dipastikan melalui desain responsif yang menggunakan CSS media queries untuk menyesuaikan tampilan dengan berbagai ukuran layar. Pengujian dilakukan pada perangkat mobile, tablet, dan desktop untuk memastikan bahwa semua fitur dapat diakses dan digunakan dengan baik pada berbagai perangkat. Layout dan komponen UI dirancang untuk dapat beradaptasi dengan lebar layar yang berbeda.

Compatibility (NF-06) dipastikan melalui pengujian pada berbagai browser modern. Pengujian dilakukan pada Chrome, Edge, Safari, dan Firefox untuk memastikan bahwa platform berfungsi dengan baik pada semua browser tersebut. Editor TinyMCE yang digunakan untuk menulis artikel juga diuji untuk memastikan kompatibilitasnya dengan berbagai browser.

Recoverability (NF-07) dipastikan melalui proses backup database yang dilakukan secara berkala. Supabase menyediakan fitur backup otomatis yang menyimpan snapshot database secara rutin. Backup ini dapat digunakan untuk memulihkan data jika terjadi masalah atau kehilangan data. Proses backup dan recovery diuji untuk memastikan bahwa data dapat dipulihkan dengan benar jika diperlukan.

Dokumentasi pemenuhan standar ini disimpan sebagai bukti bahwa pengembangan tidak hanya mengejar fitur, namun juga kualitas sistem secara menyeluruh. Dokumentasi ini mencakup hasil pengujian dan catatan perbaikan yang dilakukan untuk meningkatkan kualitas sistem.

## 4.7 Use Case Diagram

Use case diagram menggambarkan interaksi antara aktor (Administrator, Moderator, Penulis, Pembaca) dengan fungsi utama sistem. Diagram lengkap ditampilkan pada gambar dibawah ini. Sementara deskripsi aktor dan use case utama disajikan berikut ini.

![[]{#_Toc215958740 .anchor}![](docs/skripsi/media/image98.png){width="5.35in" height="4.446527777777778in"}Gambar 4.96 Use Case Diagram Platform PaberLand untuk Pembaca](docs/skripsi/media/image99.png){width="5.3421336395450565in" height="4.916081583552056in"}

[]{#_Toc215958741 .anchor}![](docs/skripsi/media/image100.png){width="5.6409722222222225in" height="2.951388888888889in"}Gambar 4.97 Use Case Diagram Platform PaberLand untuk Penulis

[]{#_Toc215958742 .anchor}Gambar 4.98 Use Case Diagram Platform PaberLand untuk Moderator

![[]{#_Toc215958743 .anchor}Gambar 4.99 Use Case Diagram Platform PaberLand untuk Admin](docs/skripsi/media/image101.png){alt="A diagram of a diagram AI-generated content may be incorrect." width="5.349595363079615in" height="2.9946139545056867in"}

Aktor dan Deskripsi:

- Penulis: melakukan autentikasi, menulis artikel, mengelola portofolio, berinteraksi sosial.

- Pembaca: menelusuri konten, memberi like/komentar, melaporkan konten.

- Moderator: meninjau laporan, menandai featured, memberikan catatan editorial.

- Administrator: mengelola pengguna, konfigurasi platform, melihat analytics dan logs.

Use case diagram disusun menggunakan notasi UML 2.0 dengan mengikuti best practices untuk memastikan bahwa diagram mudah dipahami oleh stakeholder teknis maupun non-teknis. Diagram ini menggambarkan seluruh interaksi antara aktor dan sistem, termasuk use case utama, use case alternatif, dan hubungan dependensi antar use case. Penyusunan diagram dilakukan melalui proses iteratif yang melibatkan workshop bersama tim Litbang, sesi review dengan stakeholder, dan validasi dengan pengguna akhir untuk memastikan bahwa seluruh kebutuhan telah terakomodasi.

Diagram use case turut dilengkapi \_legend\_ yang menjelaskan berbagai jenis hubungan dan notasi yang digunakan, termasuk include, extend, generalization, dan association. Legend ini memastikan bahwa pembaca diagram dapat memahami makna dari setiap simbol dan hubungan yang ditampilkan. Selain itu, diagram juga dilengkapi dengan deskripsi singkat untuk setiap use case yang menjelaskan tujuan, pre-condition, dan post-condition dari use case tersebut.

Sebagai contoh, use case \"Publikasikan Artikel\" meng-include use case \"Validasi Konten\" dan \"Simpan Draft\" sehingga setiap publikasi selalu melewati proses verifikasi konten untuk memastikan bahwa artikel memenuhi standar kualitas yang ditetapkan. Use case \"Validasi Konten\" memeriksa apakah artikel memiliki judul, konten minimal 100 kata, kategori yang valid, dan cover image jika diperlukan. Use case \"Simpan Draft\" menyimpan artikel ke database dengan status draft sebelum publikasi, memastikan bahwa data tidak hilang jika terjadi error selama proses publikasi.

Hubungan extend diterapkan antara \"Laporkan Konten\" dan \"Hubungi Moderator\" untuk menangani skenario ketika pelapor membutuhkan eskalasi manual atau ingin berkomunikasi langsung dengan moderator. Use case \"Hubungi Moderator\" memungkinkan pengguna untuk mengirim pesan langsung kepada moderator melalui sistem internal, yang kemudian akan menerima notifikasi dan dapat merespons melalui dashboard moderator. Hubungan extend ini memastikan bahwa fitur eskalasi hanya tersedia ketika diperlukan, tanpa membebani alur utama pelaporan konten.

Use case diagram juga menggambarkan hubungan generalization antara aktor, di mana \"Moderator\" dan \"Administrator\" merupakan spesialisasi dari aktor \"Pengguna Terautentikasi\". Generalization ini memastikan bahwa moderator dan administrator mewarisi semua kemampuan pengguna terautentikasi, sambil memiliki kemampuan tambahan yang spesifik untuk peran mereka. Sebagai contoh, moderator dapat melakukan semua aktivitas yang dapat dilakukan oleh penulis (membaca, menulis, berkomentar), ditambah kemampuan untuk memoderasi konten dan menandai artikel sebagai featured.

Penyusunan diagram ini melibatkan workshop bersama Litbang yang berlangsung selama 4 jam dan dihadiri oleh 8 perwakilan dari berbagai divisi. Workshop dimulai dengan brainstorming untuk mengidentifikasi semua use case yang mungkin, kemudian dilakukan pengelompokan dan prioritisasi use case berdasarkan dampak bisnis dan kompleksitas implementasi. Setelah itu, dilakukan validasi dengan pengguna akhir melalui sesi demonstrasi dan wawancara untuk memastikan bahwa use case yang diidentifikasi sesuai dengan kebutuhan sebenarnya. Hasil workshop kemudian didokumentasikan dalam bentuk use case diagram dan use case specification document yang menjadi acuan untuk tahap perancangan detail.

Seluruh alur bisnis tervisualisasi dengan cara yang mudah dipahami stakeholder non-teknis melalui penggunaan bahasa yang jelas, ikon yang intuitif, dan struktur diagram yang logis. Diagram juga dilengkapi dengan deskripsi naratif untuk setiap use case yang menjelaskan konteks, tujuan, dan manfaat dari use case tersebut. Dokumentasi ini memastikan bahwa seluruh stakeholder memiliki pemahaman yang sama tentang bagaimana sistem akan berfungsi dan bagaimana pengguna akan berinteraksi dengan sistem.

## 4.8 Use Case Scenario

Use case scenario merupakan dokumentasi detail yang menjelaskan alur interaksi antara aktor dengan sistem untuk setiap use case yang telah diidentifikasi dalam use case diagram. Dokumentasi ini mencakup lima skenario utama yang mewakili fungsi-fungsi kritis platform PaberLand, mulai dari autentikasi pengguna hingga manajemen konten dan pengguna oleh administrator.

Login Pengguna menggambarkan proses autentikasi pengguna melalui email/password atau Google OAuth. Sistem melakukan validasi kredensial melalui Supabase Auth dan mengarahkan pengguna ke dashboard sesuai peran mereka setelah autentikasi berhasil. Skenario ini juga mencakup penanganan error ketika kredensial tidak valid dan opsi untuk reset password.

Menulis dan Menerbitkan Artikel menjelaskan alur penulisan konten menggunakan editor TinyMCE dengan fitur auto-save setiap 30 detik untuk mencegah kehilangan data. Penulis dapat memilih kategori, menulis konten, dan mempublikasikan artikel setelah sistem melakukan validasi judul, kategori, dan konten. Artikel yang dipublikasikan akan langsung muncul di platform dan dapat diakses melalui URL unik.

Pelaporan Konten mendokumentasikan mekanisme pelaporan konten yang tidak pantas oleh pengguna. Sistem menyediakan modal untuk mengisi alasan laporan, kemudian menyimpan data laporan dan mengirim notifikasi ke moderator. Moderator dapat meninjau laporan melalui admin panel, melihat detail artikel dan histori laporan, serta mengambil keputusan untuk menerima atau menolak laporan dengan pencatatan di activity logs.

Menandai Konten Pilihan menjelaskan proses admin dalam menandai artikel sebagai konten featured yang akan ditampilkan di homepage. Sistem melakukan validasi kuota slot featured content (maksimal 10 artikel), menyimpan prioritas urutan tampilan, dan menampilkan notifikasi sukses. Artikel yang ditandai sebagai featured akan otomatis muncul pada segmen \"Konten Pilihan\" di homepage.

Manajemen Pengguna oleh Admin menggambarkan fungsi administrasi untuk mengelola pengguna platform. Admin dapat melihat daftar pengguna dengan filter dan pencarian real-time, mengubah peran pengguna, serta melakukan berbagai aksi moderasi. Semua perubahan dicatat dalam activity logs untuk audit trail yang lengkap.

Setiap skenario dilengkapi dengan main flow yang menjelaskan langkah-langkah utama, alternative flow untuk skenario alternatif, exception handling untuk penanganan error, pre-condition yang menjelaskan kondisi awal, dan post-condition yang menjelaskan kondisi akhir setelah skenario selesai. Dokumentasi ini memastikan bahwa setiap use case dapat diuji dengan baik dan tidak ada fitur yang terlewat dalam proses pengujian.

### 4.8.1 Use Case Daftar Akun Baru

+-----------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Elemen**                        | **Deskripsi**                                                                                                                                                                                                                                                                   |
+===================================+=================================================================================================================================================================================================================================================================================+
| **Use Case Scenario**             | Registrasi Pengguna                                                                                                                                                                                                                                                             |
+-----------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Objective**                     | Pengguna dapat membuat akun baru menggunakan Email/Password atau Google                                                                                                                                                                                                         |
+-----------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Actor**                         | Pengguna                                                                                                                                                                                                                                                                        |
+-----------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Pre-Condition**                 | 1\. Pengguna belum memiliki akun di platform                                                                                                                                                                                                                                    |
|                                   |                                                                                                                                                                                                                                                                                 |
|                                   | 2\. Pengguna memiliki akses internet dan browser yang mendukung                                                                                                                                                                                                                 |
+-----------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Main Flow**                     | 1\. Pengguna membuka halaman beranda dan klik tombol Daftar/Masuk                                                                                                                                                                                                               |
|                                   |                                                                                                                                                                                                                                                                                 |
|                                   | 2\. Sistem menampilkan modal/form registrasi dengan opsi Email/Password dan Google                                                                                                                                                                                              |
|                                   |                                                                                                                                                                                                                                                                                 |
|                                   | 3\. Pengguna memilih metode registrasi                                                                                                                                                                                                                                          |
|                                   |                                                                                                                                                                                                                                                                                 |
|                                   | 4\. Jika memilih Email/Password, pengguna mengisi nama lengkap, email, password, dan konfirmasi password                                                                                                                                                                        |
|                                   |                                                                                                                                                                                                                                                                                 |
|                                   | 5\. Sistem memvalidasi format email, kekuatan password (minimal 8 karakter), dan kecocokan password                                                                                                                                                                             |
|                                   |                                                                                                                                                                                                                                                                                 |
|                                   | 6\. Jika memilih Google, pengguna klik Masuk dengan Google                                                                                                                                                                                                                      |
|                                   |                                                                                                                                                                                                                                                                                 |
|                                   | 7\. Sistem mengarahkan pengguna ke halaman OAuth Google                                                                                                                                                                                                                         |
|                                   |                                                                                                                                                                                                                                                                                 |
|                                   | 8\. Pengguna mengonfirmasi autentikasi Google                                                                                                                                                                                                                                   |
|                                   |                                                                                                                                                                                                                                                                                 |
|                                   | 9\. Sistem menerima token OAuth dan mengambil data profil pengguna                                                                                                                                                                                                              |
|                                   |                                                                                                                                                                                                                                                                                 |
|                                   | 10\. Sistem membuat akun baru di Supabase Auth                                                                                                                                                                                                                                  |
|                                   |                                                                                                                                                                                                                                                                                 |
|                                   | 11\. Sistem membuat record di tabel profiles dengan role member                                                                                                                                                                                                                 |
|                                   |                                                                                                                                                                                                                                                                                 |
|                                   | 12\. Sistem mengirim email verifikasi (jika metode Email/Password)                                                                                                                                                                                                              |
|                                   |                                                                                                                                                                                                                                                                                 |
|                                   | 13\. Sistem mengarahkan pengguna ke halaman profil untuk melengkapi data                                                                                                                                                                                                        |
+-----------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Alternative Flows**             | 1\. Jika email sudah terdaftar, sistem menampilkan pesan \"Email sudah terdaftar\" dan menawarkan opsi login                                                                                                                                                                    |
|                                   |                                                                                                                                                                                                                                                                                 |
|                                   | 2\. Jika password tidak memenuhi kriteria, sistem menampilkan pesan error spesifik                                                                                                                                                                                              |
|                                   |                                                                                                                                                                                                                                                                                 |
|                                   | 3\. Jika konfirmasi password tidak cocok, sistem menampilkan pesan error                                                                                                                                                                                                        |
+-----------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Exception Flows**               | 1\. Jika koneksi terputus saat registrasi, sistem menyimpan data sementara dan meminta pengguna mencoba lagi                                                                                                                                                                    |
|                                   |                                                                                                                                                                                                                                                                                 |
|                                   | 2\. Jika server error, sistem menampilkan pesan error dan menyarankan mencoba beberapa saat lagi                                                                                                                                                                                |
+-----------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Post-Condition**                | Akun berhasil dibuat dengan status unverified (Email/Password) atau verified (Google), record profiles tersimpan dengan role member dan is_admin = false, email verifikasi terkirim (jika Email/Password), pengguna terautentikasi dan diarahkan ke halaman profil atau beranda |
+-----------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Traceability**                  | F-01 (Autentikasi), NF-03 (Security)                                                                                                                                                                                                                                            |
+-----------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Data Uji**                      | <test@example.com>, <existing@example.com>, Test1234!, Test1, Test1234! vs Test5678@                                                                                                                                                                                            |
+-----------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Estimasi Waktu & Kompleksitas** | 3--5 menit, Kompleksitas: Rendah                                                                                                                                                                                                                                                |
+-----------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

: []{#_Toc215958591 .anchor}Tabel 4.9 Use Case Daftar Akun Baru

### 4.8.2 Use Case Login Pengguna

+-----------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Elemen**                        | **Deskripsi**                                                                                                                                                       |
+===================================+=====================================================================================================================================================================+
| **Use Case Scenario**             | Login Pengguna                                                                                                                                                      |
+-----------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Objective**                     | Pengguna dapat masuk ke dalam sistem menggunakan kredensial yang valid                                                                                              |
+-----------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Actor**                         | Pengguna                                                                                                                                                            |
+-----------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Pre-Condition**                 | 1\. Pengguna sudah memiliki akun di platform                                                                                                                        |
|                                   |                                                                                                                                                                     |
|                                   | 2\. Pengguna memiliki kredensial yang valid                                                                                                                         |
+-----------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Main Flow**                     | 1\. Pengguna membuka halaman login atau klik tombol **\"Masuk\"**                                                                                                   |
|                                   |                                                                                                                                                                     |
|                                   | 2\. Sistem menampilkan form **email/password** dan opsi **Google OAuth**                                                                                            |
|                                   |                                                                                                                                                                     |
|                                   | 3\. Pengguna memasukkan email dan password, lalu klik tombol **\"Masuk\"**                                                                                          |
|                                   |                                                                                                                                                                     |
|                                   | 4\. Sistem memverifikasi kredensial ke **Supabase Auth**                                                                                                            |
|                                   |                                                                                                                                                                     |
|                                   | 5\. Setelah validasi berhasil, sistem memuat data profil pengguna                                                                                                   |
|                                   |                                                                                                                                                                     |
|                                   | 6\. Sistem menentukan **role dan permissions** pengguna                                                                                                             |
|                                   |                                                                                                                                                                     |
|                                   | 7\. Sistem mengarahkan pengguna ke dashboard sesuai peran (beranda untuk member, **/admin** untuk admin/moderator)                                                  |
|                                   |                                                                                                                                                                     |
|                                   | 8\. Sistem menampilkan notifikasi login berhasil                                                                                                                    |
+-----------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Alternative Flows**             | 1\. Jika pengguna memilih **\"Masuk dengan Google\"**, sistem mengarahkan ke **OAuth Google** dan melanjutkan proses seperti UC-01 langkah 2b--4                    |
|                                   |                                                                                                                                                                     |
|                                   | 2\. Jika pengguna klik **\"Lupa Password\"**, sistem menampilkan form reset password                                                                                |
+-----------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Exception Flows**               | 1\. Jika kredensial salah, sistem menampilkan pesan **\"Email atau password salah\"** tanpa mengungkapkan bagian yang salah                                         |
|                                   |                                                                                                                                                                     |
|                                   | 2\. Jika akun belum terverifikasi, sistem menampilkan pesan dan opsi **kirim ulang email verifikasi**                                                               |
|                                   |                                                                                                                                                                     |
|                                   | 3\. Jika akun di-ban, sistem menampilkan pesan **\"Akun Anda telah dinonaktifkan. Hubungi administrator untuk informasi lebih lanjut\"**                            |
|                                   |                                                                                                                                                                     |
|                                   | 4\. Jika koneksi terputus, sistem menampilkan pesan error dan memungkinkan pengguna mencoba lagi                                                                    |
+-----------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Post-Condition**                | Pengguna berhasil terautentikasi dan session aktif, data profil pengguna dimuat dan tersedia di seluruh aplikasi, pengguna diarahkan ke halaman sesuai peran mereka |
+-----------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Traceability**                  | F-01 (Autentikasi), NF-03 (Security)                                                                                                                                |
+-----------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Data Uji**                      | 1\. Email valid + password benar                                                                                                                                    |
|                                   |                                                                                                                                                                     |
|                                   | 2\. Email valid + password salah                                                                                                                                    |
|                                   |                                                                                                                                                                     |
|                                   | 3\. Email tidak terdaftar                                                                                                                                           |
|                                   |                                                                                                                                                                     |
|                                   | 4\. Email format tidak valid                                                                                                                                        |
|                                   |                                                                                                                                                                     |
|                                   | 5\. Akun belum terverifikasi                                                                                                                                        |
+-----------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Estimasi Waktu & Kompleksitas** | 1--2 menit, Kompleksitas: Rendah                                                                                                                                    |
+-----------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------+

: []{#_Toc215958592 .anchor}Tabel 4.10 Use Case Login Pengguna

### 4.8.3 Use Case Reset Password

+-----------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Elemen**                        | **Deskripsi**                                                                                                                                                                                     |
+===================================+===================================================================================================================================================================================================+
| **Use Case Scenario**             | Reset Password                                                                                                                                                                                    |
+-----------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Objective**                     | Pengguna dapat mengatur ulang password akun melalui email terdaftar                                                                                                                               |
+-----------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Actor**                         | Pengguna                                                                                                                                                                                          |
+-----------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Pre-Condition**                 | 1\. Pengguna memiliki akun dengan email terdaftar                                                                                                                                                 |
|                                   |                                                                                                                                                                                                   |
|                                   | 2\. Pengguna memiliki akses ke email yang terdaftar                                                                                                                                               |
+-----------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Main Flow**                     | 1\. Pengguna klik **Lupa Password** di halaman login                                                                                                                                              |
|                                   |                                                                                                                                                                                                   |
|                                   | 2\. Sistem menampilkan form untuk memasukkan email                                                                                                                                                |
|                                   |                                                                                                                                                                                                   |
|                                   | 3\. Pengguna memasukkan email dan klik **Kirim Link Reset**                                                                                                                                       |
|                                   |                                                                                                                                                                                                   |
|                                   | 4\. Sistem memverifikasi email terdaftar                                                                                                                                                          |
|                                   |                                                                                                                                                                                                   |
|                                   | 5\. Jika email valid, sistem menghasilkan token reset password                                                                                                                                    |
|                                   |                                                                                                                                                                                                   |
|                                   | 6\. Sistem mengirim email berisi link reset yang berlaku 1 jam                                                                                                                                    |
|                                   |                                                                                                                                                                                                   |
|                                   | 7\. Sistem menampilkan pesan konfirmasi pengiriman email                                                                                                                                          |
|                                   |                                                                                                                                                                                                   |
|                                   | 8\. Pengguna membuka link dari email                                                                                                                                                              |
|                                   |                                                                                                                                                                                                   |
|                                   | 9\. Sistem memverifikasi token reset                                                                                                                                                              |
|                                   |                                                                                                                                                                                                   |
|                                   | 10\. Sistem menampilkan form password baru                                                                                                                                                        |
|                                   |                                                                                                                                                                                                   |
|                                   | 11\. Pengguna memasukkan password baru dan konfirmasi lalu klik **Reset Password**                                                                                                                |
|                                   |                                                                                                                                                                                                   |
|                                   | 12\. Sistem memvalidasi password baru                                                                                                                                                             |
|                                   |                                                                                                                                                                                                   |
|                                   | 13\. Sistem memperbarui password di Supabase Auth 14 Sistem membatalkan token reset password 15 Sistem mencatat aktivitas ke activity logs 16 Sistem menampilkan notifikasi sukses dan opsi login |
+-----------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Alternative Flows**             | 1\. Jika email tidak terdaftar, sistem tetap menampilkan pesan konfirmasi untuk menjaga keamanan                                                                                                  |
|                                   |                                                                                                                                                                                                   |
|                                   | 2\. Jika token expired atau tidak valid, sistem menampilkan pesan error dan opsi kirim ulang link reset                                                                                           |
+-----------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Exception Flows**               | 1\. Jika email gagal terkirim karena server error, sistem menampilkan pesan error dan opsi mencoba kembali                                                                                        |
|                                   |                                                                                                                                                                                                   |
|                                   | 2\. Jika token sudah digunakan, sistem menampilkan pesan error                                                                                                                                    |
+-----------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Post-Condition**                | 1\. Password baru tersimpan dan password lama tidak berlaku lagi                                                                                                                                  |
|                                   |                                                                                                                                                                                                   |
|                                   | 2\. Token reset password sudah di-invalidate 3 Pengguna dapat login menggunakan password baru                                                                                                     |
+-----------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Traceability**                  | F-01 Autentikasi, NF-03 Security                                                                                                                                                                  |
+-----------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Data Uji**                      | 1\. Email terdaftar valid                                                                                                                                                                         |
|                                   |                                                                                                                                                                                                   |
|                                   | 2\. Email tidak terdaftar                                                                                                                                                                         |
|                                   |                                                                                                                                                                                                   |
|                                   | 3\. Token valid                                                                                                                                                                                   |
|                                   |                                                                                                                                                                                                   |
|                                   | 4\. Token expired                                                                                                                                                                                 |
|                                   |                                                                                                                                                                                                   |
|                                   | 5\. Token sudah digunakan                                                                                                                                                                         |
|                                   |                                                                                                                                                                                                   |
|                                   | 6\. Password baru valid                                                                                                                                                                           |
|                                   |                                                                                                                                                                                                   |
|                                   | 7\. Password baru tidak memenuhi kriteria                                                                                                                                                         |
+-----------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Estimasi Waktu & Kompleksitas** | 5--7 menit, Kompleksitas: Sedang                                                                                                                                                                  |
+-----------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

: []{#_Toc215958593 .anchor}Tabel 4.11 Use Case Reset Password

### 4.8.4 Use Case Lihat Beranda (Homepage)

+-----------------------------------+-----------------------------------------------------------------------------------------------------+
| **Elemen**                        | **Deskripsi**                                                                                       |
+===================================+=====================================================================================================+
| **Use Case Scenario**             | Lihat Beranda (Homepage)                                                                            |
+-----------------------------------+-----------------------------------------------------------------------------------------------------+
| **Objective**                     | Pengguna dapat melihat halaman beranda beserta seluruh konten utama platform                        |
+-----------------------------------+-----------------------------------------------------------------------------------------------------+
| **Actor**                         | Pengguna                                                                                            |
+-----------------------------------+-----------------------------------------------------------------------------------------------------+
| **Pre-Condition**                 | 1\. Pengguna memiliki akses internet                                                                |
|                                   |                                                                                                     |
|                                   | 2\. Pengguna tidak perlu melakukan autentikasi karena beranda dapat diakses secara publik           |
+-----------------------------------+-----------------------------------------------------------------------------------------------------+
| **Main Flow**                     | 1\. Pengguna membuka URL beranda <https://paberland.com/>                                           |
|                                   |                                                                                                     |
|                                   | 2\. Sistem memuat halaman beranda                                                                   |
|                                   |                                                                                                     |
|                                   | 3\. Sistem mengambil konten pilihan (featured)                                                      |
|                                   |                                                                                                     |
|                                   | 4\. Sistem mengambil artikel terbaru (latest)                                                       |
|                                   |                                                                                                     |
|                                   | 5\. Sistem mengambil daftar kategori beserta jumlah artikel                                         |
|                                   |                                                                                                     |
|                                   | 6\. Sistem mengambil informasi komunitas                                                            |
|                                   |                                                                                                     |
|                                   | 7\. Setelah seluruh data dimuat, sistem menampilkan hero section dengan deskripsi komunitas         |
|                                   |                                                                                                     |
|                                   | 8\. Sistem menampilkan blok Konten Pilihan jika tersedia                                            |
|                                   |                                                                                                     |
|                                   | 9\. Sistem menampilkan blok Artikel Terbaru                                                         |
|                                   |                                                                                                     |
|                                   | 10\. Sistem menampilkan grid kategori dengan ikon dan jumlah artikel                                |
|                                   |                                                                                                     |
|                                   | 11\. Sistem menampilkan footer dengan informasi kontak                                              |
+-----------------------------------+-----------------------------------------------------------------------------------------------------+
| **Alternative Flows**             | 1\. Jika tidak ada konten pilihan, sistem hanya menampilkan artikel terbaru                         |
|                                   |                                                                                                     |
|                                   | 2\. Jika tidak ada artikel, sistem menampilkan pesan \"Belum ada artikel\" dengan CTA untuk menulis |
+-----------------------------------+-----------------------------------------------------------------------------------------------------+
| **Exception Flows**               | 1\. Jika gagal memuat data, sistem menampilkan pesan error dan opsi refresh                         |
|                                   |                                                                                                     |
|                                   | 2\. Jika koneksi lambat, sistem menampilkan skeleton loader                                         |
+-----------------------------------+-----------------------------------------------------------------------------------------------------+
| **Post-Condition**                | 1\. Halaman beranda berhasil ditampilkan dengan semua konten yang tersedia                          |
|                                   |                                                                                                     |
|                                   | 2\. Pengguna dapat melihat konten pilihan, artikel terbaru, dan kategori                            |
|                                   |                                                                                                     |
|                                   | 3\. Pengguna dapat menavigasi ke halaman lain dari beranda                                          |
+-----------------------------------+-----------------------------------------------------------------------------------------------------+
| **Traceability**                  | F-04 Discovery Konten, NF-01 Performance                                                            |
+-----------------------------------+-----------------------------------------------------------------------------------------------------+
| **Data Uji**                      | 1\. Beranda dengan konten lengkap                                                                   |
|                                   |                                                                                                     |
|                                   | 2\. Beranda tanpa konten pilihan                                                                    |
|                                   |                                                                                                     |
|                                   | 3\. Beranda tanpa artikel                                                                           |
|                                   |                                                                                                     |
|                                   | 4\. Beranda kosong atau baru dibuat                                                                 |
+-----------------------------------+-----------------------------------------------------------------------------------------------------+
| **Estimasi Waktu & Kompleksitas** | 2--3 detik waktu loading, Kompleksitas Rendah                                                       |
+-----------------------------------+-----------------------------------------------------------------------------------------------------+

: []{#_Toc215958594 .anchor}Tabel 4.12 Use Case: Lihat Beranda (Homepage)

### 4.8.5 Use Case Jelajahi Kategori

+-----------------------------------+----------------------------------------------------------------------------------------------------------------------+
| **Elemen**                        | **Deskripsi**                                                                                                        |
+===================================+======================================================================================================================+
| **Use Case Scenario**             | Jelajahi Kategori                                                                                                    |
+-----------------------------------+----------------------------------------------------------------------------------------------------------------------+
| **Objective**                     | Pengguna dapat melihat dan menjelajahi artikel berdasarkan kategori                                                  |
+-----------------------------------+----------------------------------------------------------------------------------------------------------------------+
| **Actor**                         | Pengguna                                                                                                             |
+-----------------------------------+----------------------------------------------------------------------------------------------------------------------+
| **Pre-Condition**                 | 1\. Pengguna memiliki akses internet                                                                                 |
|                                   |                                                                                                                      |
|                                   | 2\. Pengguna tidak perlu melakukan autentikasi                                                                       |
+-----------------------------------+----------------------------------------------------------------------------------------------------------------------+
| **Main Flow**                     | 1\. Pengguna klik kategori di beranda atau navigasi                                                                  |
|                                   |                                                                                                                      |
|                                   | 2\. Sistem mengarahkan ke halaman kategori contoh /kategori/info-berita                                              |
|                                   |                                                                                                                      |
|                                   | 3\. Sistem memuat halaman kategori                                                                                   |
|                                   |                                                                                                                      |
|                                   | 4\. Sistem mengambil informasi kategori                                                                              |
|                                   |                                                                                                                      |
|                                   | 5\. Sistem mengambil artikel dalam kategori dengan pagination 20 per halaman                                         |
|                                   |                                                                                                                      |
|                                   | 6\. Sistem mengambil statistik kategori                                                                              |
|                                   |                                                                                                                      |
|                                   | 7\. Setelah seluruh data dimuat, sistem menampilkan header kategori dengan deskripsi                                 |
|                                   |                                                                                                                      |
|                                   | 8\. Sistem menampilkan grid artikel dengan cover, judul, excerpt, dan metadata penulis tanggal views likes           |
|                                   |                                                                                                                      |
|                                   | 9\. Sistem menampilkan pagination                                                                                    |
|                                   |                                                                                                                      |
|                                   | 10\. Sistem menampilkan filter artikel jika tersedia                                                                 |
+-----------------------------------+----------------------------------------------------------------------------------------------------------------------+
| **Alternative Flows**             | 1\. Jika pengguna membuka halaman daftar kategori /kategori, sistem menampilkan semua kategori dengan jumlah artikel |
|                                   |                                                                                                                      |
|                                   | 2\. Jika kategori tidak memiliki artikel, sistem menampilkan pesan \"Belum ada artikel dalam kategori ini\"          |
+-----------------------------------+----------------------------------------------------------------------------------------------------------------------+
| **Exception Flows**               | 1\. Jika kategori tidak ditemukan, sistem menampilkan halaman 404                                                    |
|                                   |                                                                                                                      |
|                                   | 2\. Jika gagal memuat data, sistem menampilkan pesan error                                                           |
+-----------------------------------+----------------------------------------------------------------------------------------------------------------------+
| **Post-Condition**                | 1\. Halaman kategori ditampilkan dengan artikel yang relevan                                                         |
|                                   |                                                                                                                      |
|                                   | 2\. Pengguna dapat melihat dan mengklik artikel untuk membaca detail                                                 |
+-----------------------------------+----------------------------------------------------------------------------------------------------------------------+
| **Traceability**                  | F-04 Discovery Konten, NF-01 Performance                                                                             |
+-----------------------------------+----------------------------------------------------------------------------------------------------------------------+
| **Data Uji**                      | 1\. Kategori dengan banyak artikel                                                                                   |
|                                   |                                                                                                                      |
|                                   | 2\. Kategori dengan sedikit artikel                                                                                  |
|                                   |                                                                                                                      |
|                                   | 3\. Kategori tanpa artikel                                                                                           |
|                                   |                                                                                                                      |
|                                   | 4\. Kategori tidak valid                                                                                             |
+-----------------------------------+----------------------------------------------------------------------------------------------------------------------+
| **Estimasi Waktu & Kompleksitas** | 2--3 detik waktu loading, Kompleksitas Rendah                                                                        |
+-----------------------------------+----------------------------------------------------------------------------------------------------------------------+

: []{#_Toc215958595 .anchor}Tabel 4.13 Use Case Jelajahi Kategori

### 4.8.6 Use Case Baca Artikel

+-----------------------------------+------------------------------------------------------------------------------------------------------+
| **Elemen**                        | **Deskripsi**                                                                                        |
+===================================+======================================================================================================+
| **Use Case Scenario**             | Baca Artikel                                                                                         |
+-----------------------------------+------------------------------------------------------------------------------------------------------+
| **Objective**                     | Pengguna dapat membaca artikel secara lengkap beserta seluruh elemen pendukungnya                    |
+-----------------------------------+------------------------------------------------------------------------------------------------------+
| **Actor**                         | Pengguna                                                                                             |
+-----------------------------------+------------------------------------------------------------------------------------------------------+
| **Pre-Condition**                 | 1\. Pengguna memiliki akses internet                                                                 |
|                                   |                                                                                                      |
|                                   | 2\. Artikel dengan slug yang diminta tersedia dan berstatus published                                |
+-----------------------------------+------------------------------------------------------------------------------------------------------+
| **Main Flow**                     | 1\. Pengguna klik artikel dari beranda, kategori, atau hasil pencarian                               |
|                                   |                                                                                                      |
|                                   | 2\. Sistem mengarahkan ke halaman detail artikel                                                     |
|                                   |                                                                                                      |
|                                   | 3\. Sistem memuat halaman artikel                                                                    |
|                                   |                                                                                                      |
|                                   | 4\. Sistem mengambil data artikel lengkap                                                            |
|                                   |                                                                                                      |
|                                   | 5\. Sistem mengambil data penulis termasuk profil dan artikel lain                                   |
|                                   |                                                                                                      |
|                                   | 6\. Sistem mengambil data komentar artikel                                                           |
|                                   |                                                                                                      |
|                                   | 7\. Sistem mengambil artikel terkait berdasarkan kategori atau tag                                   |
|                                   |                                                                                                      |
|                                   | 8\. Sistem menambah nilai view count artikel                                                         |
|                                   |                                                                                                      |
|                                   | 9\. Setelah seluruh data dimuat, sistem menampilkan header artikel berisi judul dan metadata         |
|                                   |                                                                                                      |
|                                   | 10\. Sistem menampilkan cover image artikel                                                          |
|                                   |                                                                                                      |
|                                   | 11\. Sistem menampilkan konten artikel dalam bentuk HTML dari TinyMCE                                |
|                                   |                                                                                                      |
|                                   | 12\. Sistem menampilkan informasi penulis dengan tautan ke halaman profil                            |
|                                   |                                                                                                      |
|                                   | 13\. Sistem menampilkan tombol like dan komentar                                                     |
|                                   |                                                                                                      |
|                                   | 14\. Sistem menampilkan section komentar                                                             |
|                                   |                                                                                                      |
|                                   | 15\. Sistem menampilkan artikel terkait                                                              |
|                                   |                                                                                                      |
|                                   | 16\. Sistem menampilkan tombol bagikan artikel                                                       |
+-----------------------------------+------------------------------------------------------------------------------------------------------+
| **Alternative Flows**             | 1\. Jika pengguna membuka artikel draft milik sendiri, sistem menampilkan artikel dengan badge Draft |
|                                   |                                                                                                      |
|                                   | 2\. Jika artikel tidak memiliki cover image, sistem menggunakan gambar placeholder                   |
+-----------------------------------+------------------------------------------------------------------------------------------------------+
| **Exception Flows**               | 1\. Jika artikel tidak ditemukan atau tidak berstatus published, sistem menampilkan halaman 404      |
|                                   |                                                                                                      |
|                                   | 2\. Jika artikel telah dihapus, sistem menampilkan pesan \"Artikel tidak tersedia\"                  |
+-----------------------------------+------------------------------------------------------------------------------------------------------+
| **Post-Condition**                | 1\. View count artikel bertambah                                                                     |
|                                   |                                                                                                      |
|                                   | 2\. Pengguna dapat membaca artikel secara lengkap                                                    |
|                                   |                                                                                                      |
|                                   | 3\. Pengguna dapat melakukan like, komentar, dan membagikan artikel                                  |
|                                   |                                                                                                      |
|                                   | 4\. Pengguna dapat melihat artikel terkait                                                           |
+-----------------------------------+------------------------------------------------------------------------------------------------------+
| **Traceability**                  | F-04 Discovery Konten, F-05 Interaksi Sosial, NF-01 Performance                                      |
+-----------------------------------+------------------------------------------------------------------------------------------------------+
| **Data Uji**                      | 1\. Artikel published valid                                                                          |
|                                   |                                                                                                      |
|                                   | 2\. Artikel draft milik sendiri                                                                      |
|                                   |                                                                                                      |
|                                   | 3\. Artikel tidak ditemukan                                                                          |
|                                   |                                                                                                      |
|                                   | 4\. Artikel dengan banyak komentar                                                                   |
|                                   |                                                                                                      |
|                                   | 5\. Artikel tanpa komentar                                                                           |
+-----------------------------------+------------------------------------------------------------------------------------------------------+
| **Estimasi Waktu & Kompleksitas** | 3--5 detik waktu loading, Kompleksitas Sedang                                                        |
+-----------------------------------+------------------------------------------------------------------------------------------------------+

: []{#_Toc215958596 .anchor}Tabel 4.14 Use Case Baca Artikel

### 4.8.7 Use Case Cari Konten

+-----------------------------------+----------------------------------------------------------------------------------------------------------------------+
| **Elemen**                        | **Deskripsi**                                                                                                        |
+===================================+======================================================================================================================+
| **Use Case Scenario**             | Cari Konten                                                                                                          |
+-----------------------------------+----------------------------------------------------------------------------------------------------------------------+
| **Objective**                     | Pengguna dapat mencari artikel dan member berdasarkan keyword                                                        |
+-----------------------------------+----------------------------------------------------------------------------------------------------------------------+
| **Actor**                         | Pengguna                                                                                                             |
+-----------------------------------+----------------------------------------------------------------------------------------------------------------------+
| **Pre-Condition**                 | 1\. Pengguna memiliki akses internet                                                                                 |
|                                   |                                                                                                                      |
|                                   | 2\. Pengguna tidak perlu melakukan autentikasi                                                                       |
+-----------------------------------+----------------------------------------------------------------------------------------------------------------------+
| **Main Flow**                     | 1\. Pengguna memasukkan keyword di search bar atau membuka halaman /search                                           |
|                                   |                                                                                                                      |
|                                   | 2\. Sistem menampilkan halaman pencarian dengan form search                                                          |
|                                   |                                                                                                                      |
|                                   | 3\. Pengguna memasukkan keyword dan klik tombol Cari atau tekan Enter                                                |
|                                   |                                                                                                                      |
|                                   | 4\. Sistem melakukan pencarian full-text di database pada judul konten dan excerpt artikel serta nama dan bio member |
|                                   |                                                                                                                      |
|                                   | 5\. Setelah pencarian selesai, sistem menampilkan hasil pencarian                                                    |
|                                   |                                                                                                                      |
|                                   | 6\. Sistem menampilkan filter All Articles dan Members                                                               |
|                                   |                                                                                                                      |
|                                   | 7\. Sistem menampilkan hasil artikel jika ditemukan dengan highlight keyword                                         |
|                                   |                                                                                                                      |
|                                   | 8\. Sistem menampilkan hasil member jika ditemukan                                                                   |
|                                   |                                                                                                                      |
|                                   | 9\. Sistem menampilkan pagination                                                                                    |
|                                   |                                                                                                                      |
|                                   | 10\. Jika hasil kosong, sistem menampilkan pesan Tidak ada hasil                                                     |
+-----------------------------------+----------------------------------------------------------------------------------------------------------------------+
| **Alternative Flows**             | 1\. Jika pengguna memilih filter Articles, sistem hanya menampilkan hasil artikel                                    |
|                                   |                                                                                                                      |
|                                   | 2\. Jika pengguna memilih filter Members, sistem hanya menampilkan hasil member                                      |
|                                   |                                                                                                                      |
|                                   | 3\. Jika keyword kosong, sistem menampilkan pesan Masukkan keyword untuk mencari                                     |
+-----------------------------------+----------------------------------------------------------------------------------------------------------------------+
| **Exception Flows**               | 1\. Jika pencarian gagal karena server error, sistem menampilkan pesan error                                         |
|                                   |                                                                                                                      |
|                                   | 2\. Jika koneksi terputus, sistem menampilkan pesan dan opsi untuk mencoba lagi                                      |
+-----------------------------------+----------------------------------------------------------------------------------------------------------------------+
| **Post-Condition**                | 1\. Hasil pencarian ditampilkan sesuai keyword                                                                       |
|                                   |                                                                                                                      |
|                                   | 2\. Pengguna dapat mengklik hasil untuk melihat detail                                                               |
|                                   |                                                                                                                      |
|                                   | 3\. Pengguna dapat memfilter hasil pencarian                                                                         |
+-----------------------------------+----------------------------------------------------------------------------------------------------------------------+
| **Traceability**                  | F-04 Discovery Konten, NF-01 Performance                                                                             |
+-----------------------------------+----------------------------------------------------------------------------------------------------------------------+
| **Data Uji**                      | 1\. Keyword dengan banyak hasil                                                                                      |
|                                   |                                                                                                                      |
|                                   | 2\. Keyword dengan sedikit hasil                                                                                     |
|                                   |                                                                                                                      |
|                                   | 3\. Keyword tanpa hasil                                                                                              |
|                                   |                                                                                                                      |
|                                   | 4\. Keyword kosong                                                                                                   |
|                                   |                                                                                                                      |
|                                   | 5\. Keyword dengan special characters                                                                                |
+-----------------------------------+----------------------------------------------------------------------------------------------------------------------+
| **Estimasi Waktu & Kompleksitas** | 1--2 detik waktu pencarian, Kompleksitas Sedang                                                                      |
+-----------------------------------+----------------------------------------------------------------------------------------------------------------------+

: []{#_Toc215958597 .anchor}Tabel 4.15 Use Case Cari Konten

### 4.8.8 Use Case Tulis Artikel Baru

**Main Flow:**

+-----------------------------------+-------------------------------------------------------------------------------------------------------------------+
| **Elemen**                        | **Deskripsi**                                                                                                     |
+===================================+===================================================================================================================+
| **Use Case Scenario**             | Tulis Artikel Baru                                                                                                |
+-----------------------------------+-------------------------------------------------------------------------------------------------------------------+
| **Objective**                     | Pengguna dapat menulis dan menyimpan artikel baru sebagai draft atau mempublikasikannya                           |
+-----------------------------------+-------------------------------------------------------------------------------------------------------------------+
| **Actor**                         | Penulis                                                                                                           |
+-----------------------------------+-------------------------------------------------------------------------------------------------------------------+
| **Pre-Condition**                 | 1\. Pengguna sudah login dengan role member atau lebih tinggi                                                     |
|                                   |                                                                                                                   |
|                                   | 2\. Pengguna memiliki akses ke halaman /write                                                                     |
+-----------------------------------+-------------------------------------------------------------------------------------------------------------------+
| **Main Flow**                     | 1\. Penulis klik tombol Tulis Konten Baru atau membuka halaman /write                                             |
|                                   |                                                                                                                   |
|                                   | 2\. Sistem menampilkan halaman editor dengan form kosong                                                          |
|                                   |                                                                                                                   |
|                                   | 3\. Sistem memuat editor TinyMCE                                                                                  |
|                                   |                                                                                                                   |
|                                   | 4\. Sistem memuat daftar kategori                                                                                 |
|                                   |                                                                                                                   |
|                                   | 5\. Sistem memuat template artikel jika tersedia                                                                  |
|                                   |                                                                                                                   |
|                                   | 6\. Penulis mengisi form artikel                                                                                  |
|                                   |                                                                                                                   |
|                                   | 7\. Sistem memvalidasi input secara real-time pada judul kategori dan konten                                      |
|                                   |                                                                                                                   |
|                                   | 8\. Penulis menulis konten di editor                                                                              |
|                                   |                                                                                                                   |
|                                   | 9\. Sistem melakukan auto-save draft setiap 30 detik ke database                                                  |
|                                   |                                                                                                                   |
|                                   | 10\. Penulis mengunggah cover image secara opsional                                                               |
|                                   |                                                                                                                   |
|                                   | 11\. Sistem mengunggah gambar ke Supabase Storage                                                                 |
|                                   |                                                                                                                   |
|                                   | 12\. Sistem menampilkan preview gambar                                                                            |
|                                   |                                                                                                                   |
|                                   | 13\. Sistem memvalidasi format dan ukuran gambar                                                                  |
|                                   |                                                                                                                   |
|                                   | 14\. Penulis klik tombol Simpan sebagai Draft atau Publikasikan                                                   |
|                                   |                                                                                                                   |
|                                   | 15\. Sistem memvalidasi keseluruhan form artikel                                                                  |
+-----------------------------------+-------------------------------------------------------------------------------------------------------------------+
| **Alternative Flows**             | 1\. Jika penulis memilih template artikel maka sistem mengisi form dengan konten dari template                    |
|                                   |                                                                                                                   |
|                                   | 2\. Jika auto-save gagal maka sistem menampilkan notifikasi Gagal menyimpan draft dan menyimpan data secara lokal |
|                                   |                                                                                                                   |
|                                   | 3\. Jika penulis klik tombol Publikasikan maka sistem melanjutkan proses ke UC-09                                 |
+-----------------------------------+-------------------------------------------------------------------------------------------------------------------+
| **Exception Flows**               | 1\. Jika editor gagal dimuat maka sistem menampilkan pesan error dan opsi refresh                                 |
|                                   |                                                                                                                   |
|                                   | 2\. Jika auto-save gagal berkali-kali maka sistem menampilkan warning                                             |
|                                   |                                                                                                                   |
|                                   | 3\. Jika upload gambar gagal maka sistem menampilkan pesan error                                                  |
+-----------------------------------+-------------------------------------------------------------------------------------------------------------------+
| **Post-Condition**                | 1\. Draft artikel tersimpan di database dengan status draft                                                       |
|                                   |                                                                                                                   |
|                                   | 2\. Penulis dapat melanjutkan menulis artikel kapan saja                                                          |
|                                   |                                                                                                                   |
|                                   | 3\. Proses auto-save berjalan di background                                                                       |
+-----------------------------------+-------------------------------------------------------------------------------------------------------------------+
| **Traceability**                  | F-02 Editor TinyMCE, F-03 Manajemen Artikel, NF-01 Performance                                                    |
+-----------------------------------+-------------------------------------------------------------------------------------------------------------------+
| **Data Uji**                      | 1\. Artikel dengan semua field terisi 2. Artikel tanpa cover image                                                |
|                                   |                                                                                                                   |
|                                   | 3\. Artikel dengan konten panjang                                                                                 |
|                                   |                                                                                                                   |
|                                   | 4\. Artikel dengan konten pendek kurang dari 100 kata                                                             |
|                                   |                                                                                                                   |
|                                   | 5\. Upload gambar valid                                                                                           |
|                                   |                                                                                                                   |
|                                   | 6\. Upload gambar terlalu besar                                                                                   |
|                                   |                                                                                                                   |
|                                   | 7\. Upload format gambar tidak valid                                                                              |
+-----------------------------------+-------------------------------------------------------------------------------------------------------------------+
| **Estimasi Waktu & Kompleksitas** | 15--30 menit waktu penulisan, Kompleksitas Tinggi                                                                 |
+-----------------------------------+-------------------------------------------------------------------------------------------------------------------+

: []{#_Toc215958598 .anchor}Tabel 4.16 Use Case Tulis Artikel Baru

### 4.8.9 Use Case Publikasikan Artikel

+-----------------------------------+---------------------------------------------------------------------------------------------------------------------------+
| **Elemen**                        | **Deskripsi**                                                                                                             |
+===================================+===========================================================================================================================+
| **Use Case Scenario**             | Publikasikan Artikel                                                                                                      |
+-----------------------------------+---------------------------------------------------------------------------------------------------------------------------+
| **Objective**                     | Penulis dapat mempublikasikan artikel agar dapat diakses oleh pengguna lain                                               |
+-----------------------------------+---------------------------------------------------------------------------------------------------------------------------+
| **Actor**                         | Penulis                                                                                                                   |
+-----------------------------------+---------------------------------------------------------------------------------------------------------------------------+
| **Pre-Condition**                 | 1\. Penulis sudah memiliki draft artikel atau artikel baru yang siap dipublikasikan                                       |
|                                   |                                                                                                                           |
|                                   | 2\. Artikel memiliki judul, kategori, dan konten minimal 100 kata                                                         |
+-----------------------------------+---------------------------------------------------------------------------------------------------------------------------+
| **Main Flow**                     | 1\. Penulis klik tombol Publikasikan di editor                                                                            |
|                                   |                                                                                                                           |
|                                   | 2\. Sistem memvalidasi artikel meliputi judul tidak kosong, kategori valid, konten minimal 100 kata, dan slug unik        |
|                                   |                                                                                                                           |
|                                   | 3\. Setelah validasi berhasil, sistem menghasilkan slug dari judul artikel                                                |
|                                   |                                                                                                                           |
|                                   | 4\. Sistem menyimpan artikel dengan status published                                                                      |
|                                   |                                                                                                                           |
|                                   | 5\. Sistem mencatat timestamp published_at                                                                                |
|                                   |                                                                                                                           |
|                                   | 6\. Sistem mengirim notifikasi ke penulis                                                                                 |
|                                   |                                                                                                                           |
|                                   | 7\. Sistem menampilkan notifikasi sukses publikasi                                                                        |
|                                   |                                                                                                                           |
|                                   | 8\. Sistem mengarahkan penulis ke halaman detail artikel yang baru dipublikasikan                                         |
+-----------------------------------+---------------------------------------------------------------------------------------------------------------------------+
| **Alternative Flows**             | 1\. Jika slug sudah ada, sistem menambahkan angka di akhir slug contoh judul-artikel-2                                    |
|                                   |                                                                                                                           |
|                                   | 2\. Jika penulis memilih Jadwalkan Publikasi, sistem menyimpan artikel dengan scheduled_at dan status scheduled           |
+-----------------------------------+---------------------------------------------------------------------------------------------------------------------------+
| **Exception Flows**               | 1\. Jika validasi gagal, sistem menampilkan pesan error spesifik untuk setiap field yang tidak valid                      |
|                                   |                                                                                                                           |
|                                   | 2\. Jika proses penyimpanan gagal karena server error, sistem menampilkan pesan error dan menyimpan artikel sebagai draft |
+-----------------------------------+---------------------------------------------------------------------------------------------------------------------------+
| **Post-Condition**                | 1\. Artikel berstatus published dan muncul di beranda serta kategori                                                      |
|                                   |                                                                                                                           |
|                                   | 2\. Artikel dapat diakses melalui URL unik                                                                                |
|                                   |                                                                                                                           |
|                                   | 3\. Penulis menerima notifikasi konfirmasi publikasi                                                                      |
|                                   |                                                                                                                           |
|                                   | 4\. View count artikel dimulai dari 0                                                                                     |
+-----------------------------------+---------------------------------------------------------------------------------------------------------------------------+
| **Traceability**                  | F-03 Manajemen Artikel, NF-03 Security                                                                                    |
+-----------------------------------+---------------------------------------------------------------------------------------------------------------------------+
| **Data Uji**                      | 1\. Artikel valid lengkap                                                                                                 |
|                                   |                                                                                                                           |
|                                   | 2\. Artikel tanpa judul 3. Artikel tanpa kategori                                                                         |
|                                   |                                                                                                                           |
|                                   | 4\. Artikel dengan konten kurang dari 100 kata                                                                            |
|                                   |                                                                                                                           |
|                                   | 5\. Artikel dengan slug duplikat                                                                                          |
|                                   |                                                                                                                           |
|                                   | 6\. Artikel dengan jadwal publikasi                                                                                       |
+-----------------------------------+---------------------------------------------------------------------------------------------------------------------------+
| **Estimasi Waktu & Kompleksitas** | 2--3 detik waktu publikasi, Kompleksitas Sedang                                                                           |
+-----------------------------------+---------------------------------------------------------------------------------------------------------------------------+

: []{#_Toc215958599 .anchor}Tabel 4.17 Use Case Publikasikan Artikel

### 4.8.10 Use Case Edit Artikel

+-----------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Elemen**                        | **Deskripsi**                                                                                                                                                        |
+===================================+======================================================================================================================================================================+
| **Use Case Scenario**             | Edit Artikel                                                                                                                                                         |
+-----------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Objective**                     | Penulis dapat mengubah dan memperbarui artikel yang telah dibuat                                                                                                     |
+-----------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Actor**                         | Penulis                                                                                                                                                              |
+-----------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Pre-Condition**                 | 1\. Penulis sudah login                                                                                                                                              |
|                                   |                                                                                                                                                                      |
|                                   | 2\. Penulis memiliki artikel draft atau published yang ingin diedit                                                                                                  |
|                                   |                                                                                                                                                                      |
|                                   | 3\. Artikel belum dihapus                                                                                                                                            |
+-----------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Main Flow**                     | 1\. Penulis membuka halaman /my-articles atau /write?edit=article_id                                                                                                 |
|                                   |                                                                                                                                                                      |
|                                   | 2\. Sistem memuat artikel yang akan diedit                                                                                                                           |
|                                   |                                                                                                                                                                      |
|                                   | 3\. Sistem memuat editor dengan data artikel                                                                                                                         |
|                                   |                                                                                                                                                                      |
|                                   | 4\. Sistem menampilkan form yang sudah terisi dengan data artikel                                                                                                    |
|                                   |                                                                                                                                                                      |
|                                   | 5\. Sistem menampilkan editor TinyMCE dengan konten artikel                                                                                                          |
|                                   |                                                                                                                                                                      |
|                                   | 6\. Sistem menampilkan status artikel saat ini                                                                                                                       |
|                                   |                                                                                                                                                                      |
|                                   | 7\. Penulis mengubah konten artikel                                                                                                                                  |
|                                   |                                                                                                                                                                      |
|                                   | 8\. Sistem memvalidasi perubahan secara real-time                                                                                                                    |
|                                   |                                                                                                                                                                      |
|                                   | 9\. Sistem melakukan auto-save perubahan                                                                                                                             |
|                                   |                                                                                                                                                                      |
|                                   | 10\. Penulis klik tombol Simpan Perubahan atau Perbarui                                                                                                              |
|                                   |                                                                                                                                                                      |
|                                   | 11\. Sistem memvalidasi seluruh form artikel                                                                                                                         |
|                                   |                                                                                                                                                                      |
|                                   | 12\. Setelah penyimpanan berhasil, sistem memperbarui artikel di database                                                                                            |
|                                   |                                                                                                                                                                      |
|                                   | 13\. Sistem mencatat timestamp updated_at                                                                                                                            |
|                                   |                                                                                                                                                                      |
|                                   | 14\. Sistem menampilkan notifikasi sukses                                                                                                                            |
|                                   |                                                                                                                                                                      |
|                                   | 15\. Sistem mengarahkan penulis ke halaman detail artikel                                                                                                            |
+-----------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Alternative Flows**             | 1\. Jika artikel berstatus draft, sistem membuka editor dengan status draft                                                                                          |
|                                   |                                                                                                                                                                      |
|                                   | 2\. Jika artikel berstatus published, sistem membuka editor dengan status published                                                                                  |
|                                   |                                                                                                                                                                      |
|                                   | 3\. Jika penulis mengubah artikel yang sudah published, sistem memperbarui artikel dan mempertahankan status published                                               |
+-----------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Exception Flows**               | 1\. Jika artikel tidak ditemukan atau bukan milik penulis, sistem menampilkan status 403                                                                             |
|                                   |                                                                                                                                                                      |
|                                   | 2\. Jika artikel sedang diedit oleh orang lain sehingga terjadi konflik, sistem menampilkan warning 3. Jika proses penyimpanan gagal, sistem menampilkan pesan error |
+-----------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Post-Condition**                | 1\. Artikel diperbarui dengan perubahan terbaru                                                                                                                      |
|                                   |                                                                                                                                                                      |
|                                   | 2\. Timestamp updated_at diperbarui                                                                                                                                  |
|                                   |                                                                                                                                                                      |
|                                   | 3\. Jika artikel berstatus published, perubahan langsung terlihat di halaman publik                                                                                  |
+-----------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Traceability**                  | F-03 Manajemen Artikel, NF-03 Security                                                                                                                               |
+-----------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Data Uji**                      | 1\. Edit artikel draft                                                                                                                                               |
|                                   |                                                                                                                                                                      |
|                                   | 2\. Edit artikel published 3. Edit artikel milik sendiri                                                                                                             |
|                                   |                                                                                                                                                                      |
|                                   | 4\. Edit artikel milik orang lain harus gagal 5. Edit artikel tidak ditemukan                                                                                        |
+-----------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Estimasi Waktu & Kompleksitas** | 5--10 menit waktu editing, Kompleksitas Sedang                                                                                                                       |
+-----------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------+

: []{#_Toc215958600 .anchor}Tabel 4.18 Use Case Edit Artikel

### 4.8.11 Use Case Hapus Artikel

+-----------------------------------+---------------------------------------------------------------------------------------------------------------------------------+
| **Elemen**                        | **Deskripsi**                                                                                                                   |
+===================================+=================================================================================================================================+
| **Use Case Scenario**             | Hapus Artikel                                                                                                                   |
+-----------------------------------+---------------------------------------------------------------------------------------------------------------------------------+
| **Objective**                     | Penulis dapat menghapus artikel miliknya dari sistem                                                                            |
+-----------------------------------+---------------------------------------------------------------------------------------------------------------------------------+
| **Actor**                         | Penulis                                                                                                                         |
+-----------------------------------+---------------------------------------------------------------------------------------------------------------------------------+
| **Pre-Condition**                 | 1\. Penulis sudah login                                                                                                         |
|                                   |                                                                                                                                 |
|                                   | 2\. Penulis memiliki artikel yang ingin dihapus 3. Artikel belum dihapus                                                        |
+-----------------------------------+---------------------------------------------------------------------------------------------------------------------------------+
| **Main Flow**                     | 1\. Penulis membuka halaman /my-articles atau halaman detail artikel miliknya                                                   |
|                                   |                                                                                                                                 |
|                                   | 2\. Sistem menampilkan artikel beserta tombol Hapus                                                                             |
|                                   |                                                                                                                                 |
|                                   | 3\. Penulis menekan tombol Hapus                                                                                                |
|                                   |                                                                                                                                 |
|                                   | 4\. Sistem menampilkan modal konfirmasi dengan peringatan                                                                       |
|                                   |                                                                                                                                 |
|                                   | 5\. Penulis mengonfirmasi penghapusan                                                                                           |
|                                   |                                                                                                                                 |
|                                   | 6\. Sistem memvalidasi bahwa artikel adalah milik penulis                                                                       |
|                                   |                                                                                                                                 |
|                                   | 7\. Setelah validasi berhasil, sistem menghapus artikel dari database baik melalui soft delete maupun hard delete               |
|                                   |                                                                                                                                 |
|                                   | 8\. Sistem menghapus cover image dari storage jika tersedia                                                                     |
|                                   |                                                                                                                                 |
|                                   | 9\. Sistem mencatat aktivitas penghapusan ke dalam activity logs                                                                |
|                                   |                                                                                                                                 |
|                                   | 10\. Sistem menampilkan notifikasi berhasil                                                                                     |
|                                   |                                                                                                                                 |
|                                   | 11\. Sistem mengarahkan penulis ke halaman /my-articles                                                                         |
+-----------------------------------+---------------------------------------------------------------------------------------------------------------------------------+
| **Alternative Flows**             | 1\. Jika penulis membatalkan penghapusan, sistem menutup modal dan tidak melakukan perubahan apapun                             |
|                                   |                                                                                                                                 |
|                                   | 2\. Jika sistem menggunakan metode soft delete, sistem hanya mengubah status artikel menjadi deleted tanpa menghapus data fisik |
+-----------------------------------+---------------------------------------------------------------------------------------------------------------------------------+
| **Exception Flows**               | 1\. Jika artikel tidak ditemukan, sistem menampilkan error 404                                                                  |
|                                   |                                                                                                                                 |
|                                   | 2\. Jika artikel bukan milik penulis, sistem menampilkan error 403                                                              |
|                                   |                                                                                                                                 |
|                                   | 3\. Jika proses penghapusan gagal, sistem menampilkan pesan error                                                               |
+-----------------------------------+---------------------------------------------------------------------------------------------------------------------------------+
| **Post-Condition**                | 1\. Artikel dihapus dan tidak lagi muncul di daftar artikel                                                                     |
|                                   |                                                                                                                                 |
|                                   | 2\. Cover image dihapus dari storage                                                                                            |
|                                   |                                                                                                                                 |
|                                   | 3\. Penulis diarahkan ke halaman /my-articles                                                                                   |
+-----------------------------------+---------------------------------------------------------------------------------------------------------------------------------+
| **Traceability**                  | F-03 Manajemen Artikel, NF-03 Security                                                                                          |
+-----------------------------------+---------------------------------------------------------------------------------------------------------------------------------+
| **Data Uji**                      | 1\. Hapus artikel draft                                                                                                         |
|                                   |                                                                                                                                 |
|                                   | 2\. Hapus artikel published                                                                                                     |
|                                   |                                                                                                                                 |
|                                   | 3\. Hapus artikel milik sendiri                                                                                                 |
|                                   |                                                                                                                                 |
|                                   | 4\. Hapus artikel milik orang lain harus gagal                                                                                  |
|                                   |                                                                                                                                 |
|                                   | 5\. Batalkan penghapusan                                                                                                        |
+-----------------------------------+---------------------------------------------------------------------------------------------------------------------------------+
| **Estimasi Waktu & Kompleksitas** | 10--15 detik waktu proses, Kompleksitas Rendah                                                                                  |
+-----------------------------------+---------------------------------------------------------------------------------------------------------------------------------+

: []{#_Toc215958601 .anchor}Tabel 4.19 Use Case Hapus Artikel

### 4.8.12 Use Case Kelola Artikel Saya

+-----------------------------------+-----------------------------------------------------------------------------------------------------------------------------------+
| **Elemen**                        | **Deskripsi**                                                                                                                     |
+===================================+===================================================================================================================================+
| **Use Case Scenario**             | Kelola Artikel Saya                                                                                                               |
+-----------------------------------+-----------------------------------------------------------------------------------------------------------------------------------+
| **Objective**                     | Penulis dapat melihat, memfilter, mengedit, dan menghapus artikel miliknya                                                        |
+-----------------------------------+-----------------------------------------------------------------------------------------------------------------------------------+
| **Actor**                         | Penulis                                                                                                                           |
+-----------------------------------+-----------------------------------------------------------------------------------------------------------------------------------+
| **Pre-Condition**                 | 1\. Penulis sudah login                                                                                                           |
|                                   |                                                                                                                                   |
|                                   | 2\. Penulis memiliki akses ke halaman /my-articles                                                                                |
+-----------------------------------+-----------------------------------------------------------------------------------------------------------------------------------+
| **Main Flow**                     | 1\. Penulis membuka halaman /my-articles                                                                                          |
|                                   |                                                                                                                                   |
|                                   | 2\. Sistem memuat daftar artikel milik penulis                                                                                    |
|                                   |                                                                                                                                   |
|                                   | 3\. Sistem mengambil semua artikel penulis dengan status draft, published, dan scheduled menggunakan pagination                   |
|                                   |                                                                                                                                   |
|                                   | 4\. Setelah data dimuat, sistem menampilkan daftar artikel dalam bentuk tabel atau list                                           |
|                                   |                                                                                                                                   |
|                                   | 5\. Sistem menampilkan filter artikel (All, Draft, Published, Scheduled)                                                          |
|                                   |                                                                                                                                   |
|                                   | 6\. Sistem menampilkan statistik artikel (total artikel, jumlah published, jumlah draft)                                          |
|                                   |                                                                                                                                   |
|                                   | 7\. Sistem menampilkan tombol \"Tulis Baru\"                                                                                      |
|                                   |                                                                                                                                   |
|                                   | 8\. Sistem menampilkan aksi per artikel berupa Lihat, Edit, dan Hapus                                                             |
+-----------------------------------+-----------------------------------------------------------------------------------------------------------------------------------+
| **Alternative Flows**             | 1\. Jika penulis belum memiliki artikel, sistem menampilkan pesan "Belum ada artikel" disertai tombol CTA "Tulis Artikel Pertama" |
|                                   |                                                                                                                                   |
|                                   | 2\. Jika penulis memilih filter Draft, sistem hanya menampilkan artikel dengan status draft                                       |
+-----------------------------------+-----------------------------------------------------------------------------------------------------------------------------------+
| **Exception Flows**               | 1\. Jika sistem gagal memuat data artikel, sistem menampilkan pesan error                                                         |
+-----------------------------------+-----------------------------------------------------------------------------------------------------------------------------------+
| **Post-Condition**                | 1\. Daftar artikel milik penulis berhasil ditampilkan                                                                             |
|                                   |                                                                                                                                   |
|                                   | 2\. Penulis dapat melakukan aksi lihat, edit, atau hapus artikel                                                                  |
+-----------------------------------+-----------------------------------------------------------------------------------------------------------------------------------+
| **Traceability**                  | F-03 Manajemen Artikel                                                                                                            |
+-----------------------------------+-----------------------------------------------------------------------------------------------------------------------------------+
| **Data Uji**                      | 1\. Penulis dengan banyak artikel                                                                                                 |
|                                   |                                                                                                                                   |
|                                   | 2\. Penulis dengan sedikit artikel                                                                                                |
|                                   |                                                                                                                                   |
|                                   | 3\. Penulis tanpa artikel                                                                                                         |
|                                   |                                                                                                                                   |
|                                   | 4\. Filter All                                                                                                                    |
|                                   |                                                                                                                                   |
|                                   | 5\. Filter Draft                                                                                                                  |
|                                   |                                                                                                                                   |
|                                   | 6\. Filter Published                                                                                                              |
+-----------------------------------+-----------------------------------------------------------------------------------------------------------------------------------+
| **Estimasi Waktu & Kompleksitas** | 2--3 detik waktu loading, Kompleksitas Rendah                                                                                     |
+-----------------------------------+-----------------------------------------------------------------------------------------------------------------------------------+

: []{#_Toc215958602 .anchor}Tabel 4.20 Use Case Kelola Artikel Saya

### 4.8.13 Use Case Like Artikel

+-----------------------------------+------------------------------------------------------------------------------------------------------------------------------+
| **Elemen**                        | **Deskripsi**                                                                                                                |
+===================================+==============================================================================================================================+
| **Use Case Scenario**             | Like Artikel                                                                                                                 |
+-----------------------------------+------------------------------------------------------------------------------------------------------------------------------+
| **Objective**                     | Pengguna dapat memberikan atau membatalkan like pada artikel                                                                 |
+-----------------------------------+------------------------------------------------------------------------------------------------------------------------------+
| **Actor**                         | Pengguna                                                                                                                     |
+-----------------------------------+------------------------------------------------------------------------------------------------------------------------------+
| **Pre-Condition**                 | 1\. Pengguna sudah login                                                                                                     |
|                                   |                                                                                                                              |
|                                   | 2\. Artikel yang akan di-like tersedia dan berstatus published                                                               |
+-----------------------------------+------------------------------------------------------------------------------------------------------------------------------+
| **Main Flow**                     | 1\. Pengguna membuka halaman detail artikel                                                                                  |
|                                   |                                                                                                                              |
|                                   | 2\. Sistem menampilkan tombol like beserta jumlah like saat ini                                                              |
|                                   |                                                                                                                              |
|                                   | 3\. Pengguna menekan tombol \"Like\"                                                                                         |
|                                   |                                                                                                                              |
|                                   | 4\. Sistem memeriksa apakah pengguna sudah pernah menyukai artikel tersebut                                                  |
|                                   |                                                                                                                              |
|                                   | 5\. Jika belum pernah like, sistem menambahkan data ke tabel article_likes                                                   |
|                                   |                                                                                                                              |
|                                   | 6\. Sistem menambah nilai likes_count pada artikel                                                                           |
|                                   |                                                                                                                              |
|                                   | 7\. Sistem menampilkan animasi like, memperbarui jumlah like di UI, dan menampilkan notifikasi ke penulis (opsional)         |
+-----------------------------------+------------------------------------------------------------------------------------------------------------------------------+
| **Alternative Flows**             | 1\. Jika pengguna sudah pernah like, tombol berubah menjadi \"Unlike\" dan ketika diklik sistem akan melakukan proses unlike |
+-----------------------------------+------------------------------------------------------------------------------------------------------------------------------+
| **Exception Flows**               | 1\. Jika proses like gagal karena server error, sistem menampilkan pesan error dan mengembalikan UI ke kondisi semula        |
|                                   |                                                                                                                              |
|                                   | 2\. Jika koneksi terputus, sistem tetap menampilkan perubahan menggunakan optimistic update                                  |
+-----------------------------------+------------------------------------------------------------------------------------------------------------------------------+
| **Post-Condition**                | 1\. Jumlah like artikel berhasil diperbarui                                                                                  |
|                                   |                                                                                                                              |
|                                   | 2\. Status like pengguna tersimpan di sistem                                                                                 |
|                                   |                                                                                                                              |
|                                   | 3\. UI menampilkan status like terbaru                                                                                       |
+-----------------------------------+------------------------------------------------------------------------------------------------------------------------------+
| **Traceability**                  | F-05 Interaksi Sosial, NF-01 Performance                                                                                     |
+-----------------------------------+------------------------------------------------------------------------------------------------------------------------------+
| **Data Uji**                      | 1\. Like artikel yang belum di-like                                                                                          |
|                                   |                                                                                                                              |
|                                   | 2\. Unlike artikel yang sudah di-like                                                                                        |
|                                   |                                                                                                                              |
|                                   | 3\. Like artikel milik sendiri                                                                                               |
|                                   |                                                                                                                              |
|                                   | 4\. Like artikel yang tidak ditemukan                                                                                        |
+-----------------------------------+------------------------------------------------------------------------------------------------------------------------------+
| **Estimasi Waktu & Kompleksitas** | \< 1 detik, Kompleksitas Rendah                                                                                              |
+-----------------------------------+------------------------------------------------------------------------------------------------------------------------------+

: []{#_Toc215958603 .anchor}Tabel 4.21 Use Case Like Artikel

### 4.8.14 Use Case Komentar Artikel

+-----------------------------------+-------------------------------------------------------------------------------------+
| **Elemen**                        | **Deskripsi**                                                                       |
+===================================+=====================================================================================+
| **Use Case Scenario**             | Komentar Artikel                                                                    |
+-----------------------------------+-------------------------------------------------------------------------------------+
| **Objective**                     | Pengguna dapat menambahkan, membalas, mengedit, dan menghapus komentar pada artikel |
+-----------------------------------+-------------------------------------------------------------------------------------+
| **Actor**                         | Pengguna                                                                            |
+-----------------------------------+-------------------------------------------------------------------------------------+
| **Pre-Condition**                 | 1\. Pengguna sudah login                                                            |
|                                   |                                                                                     |
|                                   | 2\. Artikel tersedia dan berstatus published                                        |
+-----------------------------------+-------------------------------------------------------------------------------------+
| **Main Flow**                     | 1\. Pengguna membuka halaman detail artikel                                         |
|                                   |                                                                                     |
|                                   | 2\. Pengguna mengetik komentar pada form komentar                                   |
|                                   |                                                                                     |
|                                   | 3\. Pengguna menekan tombol \"Kirim\"                                               |
|                                   |                                                                                     |
|                                   | 4\. Sistem memvalidasi isi komentar                                                 |
|                                   |                                                                                     |
|                                   | 5\. Sistem menyimpan komentar ke database                                           |
|                                   |                                                                                     |
|                                   | 6\. Sistem menampilkan komentar di halaman artikel                                  |
+-----------------------------------+-------------------------------------------------------------------------------------+
| **Alternative Flows**             | 1\. Pengguna melakukan reply pada komentar lain                                     |
|                                   |                                                                                     |
|                                   | 2\. Pengguna mengedit komentar miliknya sendiri                                     |
|                                   |                                                                                     |
|                                   | 3\. Pengguna menghapus komentar miliknya sendiri                                    |
+-----------------------------------+-------------------------------------------------------------------------------------+
| **Exception Flows**               | 1\. Jika komentar kosong, sistem menampilkan pesan validasi                         |
|                                   |                                                                                     |
|                                   | 2\. Jika komentar terlalu panjang, sistem menampilkan pesan error                   |
+-----------------------------------+-------------------------------------------------------------------------------------+
| **Post-Condition**                | 1\. Komentar tersimpan dan ditampilkan di halaman artikel                           |
|                                   |                                                                                     |
|                                   | 2\. Jumlah komentar (comments count) artikel bertambah                              |
|                                   |                                                                                     |
|                                   | 3\. Penulis artikel menerima notifikasi (jika diaktifkan)                           |
+-----------------------------------+-------------------------------------------------------------------------------------+
| **Traceability**                  | F-05 Interaksi Sosial, NF-03 Security                                               |
+-----------------------------------+-------------------------------------------------------------------------------------+
| **Data Uji**                      | 1\. Komentar baru valid                                                             |
|                                   |                                                                                     |
|                                   | 2\. Komentar kosong                                                                 |
|                                   |                                                                                     |
|                                   | 3\. Komentar terlalu panjang                                                        |
|                                   |                                                                                     |
|                                   | 4\. Reply komentar                                                                  |
|                                   |                                                                                     |
|                                   | 5\. Edit komentar sendiri                                                           |
|                                   |                                                                                     |
|                                   | 6\. Hapus komentar sendiri                                                          |
+-----------------------------------+-------------------------------------------------------------------------------------+
| **Estimasi Waktu & Kompleksitas** | 10--20 detik, Kompleksitas Sedang                                                   |
+-----------------------------------+-------------------------------------------------------------------------------------+

: []{#_Toc215958604 .anchor}Tabel 4.22 Use Case Komentar Artikel

### 4.8.15 Use Case Laporkan Konten

+-----------------------------------+-----------------------------------------------------------------------------------------------------------------------------+
| **Elemen**                        | **Deskripsi**                                                                                                               |
+===================================+=============================================================================================================================+
| **Use Case Scenario**             | Laporkan Konten                                                                                                             |
+-----------------------------------+-----------------------------------------------------------------------------------------------------------------------------+
| **Objective**                     | Pengguna dapat melaporkan artikel yang melanggar aturan                                                                     |
+-----------------------------------+-----------------------------------------------------------------------------------------------------------------------------+
| **Actor**                         | Pengguna                                                                                                                    |
+-----------------------------------+-----------------------------------------------------------------------------------------------------------------------------+
| **Pre-Condition**                 | 1\. Pengguna sudah login                                                                                                    |
|                                   |                                                                                                                             |
|                                   | 2\. Artikel tersedia dan berstatus published                                                                                |
+-----------------------------------+-----------------------------------------------------------------------------------------------------------------------------+
| **Main Flow**                     | 1\. Pengguna membuka halaman detail artikel dan menekan tombol \"Laporkan\"                                                 |
|                                   |                                                                                                                             |
|                                   | 2\. Sistem menampilkan modal form laporan dengan pilihan alasan                                                             |
|                                   |                                                                                                                             |
|                                   | 3\. Pengguna memilih alasan laporan                                                                                         |
|                                   |                                                                                                                             |
|                                   | 4\. Sistem memvalidasi alasan                                                                                               |
|                                   |                                                                                                                             |
|                                   | 5\. Pengguna mengisi detail laporan (opsional)                                                                              |
|                                   |                                                                                                                             |
|                                   | 6\. Sistem memvalidasi detail laporan                                                                                       |
|                                   |                                                                                                                             |
|                                   | 7\. Pengguna menekan tombol \"Kirim Laporan\"                                                                               |
|                                   |                                                                                                                             |
|                                   | 8\. Sistem menyimpan laporan ke database dengan status \"pending\"                                                          |
|                                   |                                                                                                                             |
|                                   | 9\. Sistem mengirim notifikasi ke moderator                                                                                 |
|                                   |                                                                                                                             |
|                                   | 10\. Sistem mencatat laporan di activity logs                                                                               |
|                                   |                                                                                                                             |
|                                   | 11\. Sistem menampilkan notifikasi sukses dan menutup modal                                                                 |
+-----------------------------------+-----------------------------------------------------------------------------------------------------------------------------+
| **Alternative Flows**             | 1\. Jika pengguna memilih \"Hubungi Moderator\", sistem menampilkan form tambahan untuk mengirim pesan langsung             |
+-----------------------------------+-----------------------------------------------------------------------------------------------------------------------------+
| **Exception Flows**               | 1\. Jika pengguna sudah pernah melaporkan artikel yang sama, sistem menampilkan pesan \"Anda sudah melaporkan artikel ini\" |
|                                   |                                                                                                                             |
|                                   | 2\. Jika laporan gagal disimpan, sistem menampilkan pesan error                                                             |
+-----------------------------------+-----------------------------------------------------------------------------------------------------------------------------+
| **Post-Condition**                | 1\. Laporan tersimpan dengan status \"pending\"                                                                             |
|                                   |                                                                                                                             |
|                                   | 2\. Moderator menerima notifikasi laporan                                                                                   |
|                                   |                                                                                                                             |
|                                   | 3\. Pelapor menerima konfirmasi                                                                                             |
|                                   |                                                                                                                             |
|                                   | 4\. Laporan tercatat di activity logs                                                                                       |
+-----------------------------------+-----------------------------------------------------------------------------------------------------------------------------+
| **Traceability**                  | F-10 Laporan Konten, NF-03 Security                                                                                         |
+-----------------------------------+-----------------------------------------------------------------------------------------------------------------------------+
| **Data Uji**                      | 1\. Laporan dengan alasan valid                                                                                             |
|                                   |                                                                                                                             |
|                                   | 2\. Laporan tanpa alasan                                                                                                    |
|                                   |                                                                                                                             |
|                                   | 3\. Laporan artikel yang sudah dilaporkan                                                                                   |
|                                   |                                                                                                                             |
|                                   | 4\. Laporan dengan detail lengkap                                                                                           |
|                                   |                                                                                                                             |
|                                   | 5\. Laporan dengan eskalasi ke moderator                                                                                    |
+-----------------------------------+-----------------------------------------------------------------------------------------------------------------------------+
| **Estimasi Waktu & Kompleksitas** | 30--60 detik, Kompleksitas Rendah                                                                                           |
+-----------------------------------+-----------------------------------------------------------------------------------------------------------------------------+

: []{#_Toc215958605 .anchor}Tabel 4.23 Use Case Laporkan Konten

### 4.8.16 Use Case Tinjau Laporan Konten (Moderator)

+-------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Elemen**                          | **Deskripsi**                                                                                                                                                                                                                             |
+=====================================+===========================================================================================================================================================================================================================================+
| **Use Case Scenario**               | Tinjau Laporan Konten (Moderator)                                                                                                                                                                                                         |
+-------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Objective**                       | Moderator dapat meninjau, menerima, atau menolak laporan konten dari pengguna                                                                                                                                                             |
+-------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Actor**                           | Moderator, Admin                                                                                                                                                                                                                          |
+-------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Pre-condition**                   | 1\. Moderator sudah login dengan role moderator atau admin                                                                                                                                                                                |
|                                     |                                                                                                                                                                                                                                           |
|                                     | 2\. Terdapat laporan konten dengan status pending                                                                                                                                                                                         |
+-------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Main Flow**                       | 1\. Moderator membuka halaman /admin/reports                                                                                                                                                                                              |
|                                     |                                                                                                                                                                                                                                           |
|                                     | 2\. Sistem menampilkan daftar laporan dengan filter All, Pending, Resolved, dan Rejected                                                                                                                                                  |
|                                     |                                                                                                                                                                                                                                           |
|                                     | 3\. Sistem memuat data laporan lengkap                                                                                                                                                                                                    |
|                                     |                                                                                                                                                                                                                                           |
|                                     | 4\. Moderator memilih salah satu laporan untuk ditinjau                                                                                                                                                                                   |
|                                     |                                                                                                                                                                                                                                           |
|                                     | 5\. Sistem menampilkan detail laporan lengkap beserta tombol aksi Terima dan Tolak                                                                                                                                                        |
|                                     |                                                                                                                                                                                                                                           |
|                                     | 6\. Moderator meninjau artikel yang dilaporkan                                                                                                                                                                                            |
|                                     |                                                                                                                                                                                                                                           |
|                                     | 7\. Jika moderator menekan tombol Terima Laporan, sistem mengubah status menjadi resolved, mencatat ke activity logs, mengirim notifikasi ke pelapor, melakukan tindakan pada artikel sesuai kebijakan, dan menampilkan notifikasi sukses |
|                                     |                                                                                                                                                                                                                                           |
|                                     | 8\. Jika moderator menekan tombol Tolak Laporan, sistem mengubah status menjadi rejected, mencatat alasan penolakan, mencatat ke activity logs, mengirim notifikasi ke pelapor, dan menampilkan notifikasi sukses                         |
+-------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Alternate Flow**                  | 1\. Jika moderator ingin menambahkan catatan internal, sistem menampilkan form catatan                                                                                                                                                    |
|                                     |                                                                                                                                                                                                                                           |
|                                     | 2\. Jika moderator ingin melihat artikel lengkap, sistem membuka artikel di tab baru                                                                                                                                                      |
+-------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Exception Flow**                  | 1\. Jika laporan sudah ditangani moderator lain, sistem menampilkan peringatan                                                                                                                                                            |
|                                     |                                                                                                                                                                                                                                           |
|                                     | 2\. Jika artikel sudah dihapus, sistem menampilkan pesan Artikel tidak ditemukan                                                                                                                                                          |
+-------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Post-condition**                  | 1\. Status laporan diperbarui                                                                                                                                                                                                             |
|                                     |                                                                                                                                                                                                                                           |
|                                     | 2\. Aktivitas moderator tercatat di activity logs                                                                                                                                                                                         |
|                                     |                                                                                                                                                                                                                                           |
|                                     | 3\. Pelapor menerima notifikasi hasil keputusan                                                                                                                                                                                           |
|                                     |                                                                                                                                                                                                                                           |
|                                     | 4\. Jika diterima, artikel ditandai atau ditindak sesuai kebijakan                                                                                                                                                                        |
+-------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Traceability**                    | 1\. F-10 Laporan Konten                                                                                                                                                                                                                   |
|                                     |                                                                                                                                                                                                                                           |
|                                     | 2\. NF-03 Security                                                                                                                                                                                                                        |
+-------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Data Uji**                        | 1\. Laporan pending valid                                                                                                                                                                                                                 |
|                                     |                                                                                                                                                                                                                                           |
|                                     | 2\. Laporan sudah ditangani                                                                                                                                                                                                               |
|                                     |                                                                                                                                                                                                                                           |
|                                     | 3\. Terima laporan valid                                                                                                                                                                                                                  |
|                                     |                                                                                                                                                                                                                                           |
|                                     | 4\. Tolak laporan tidak valid                                                                                                                                                                                                             |
|                                     |                                                                                                                                                                                                                                           |
|                                     | 5\. Artikel sudah dihapus                                                                                                                                                                                                                 |
+-------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Estimasi Waktu dan Kompleksitas** | 1\. Estimasi Waktu 2--5 menit per laporan                                                                                                                                                                                                 |
|                                     |                                                                                                                                                                                                                                           |
|                                     | 2\. Kompleksitas Sedang                                                                                                                                                                                                                   |
+-------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

: []{#_Toc215958606 .anchor}Tabel 4.24 Use Case Tinjau Laporan Konten (Moderator)

### 4.8.17 Use Case Tambah Konten Featured (Moderator)

**Main Flow:**

+-------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------+
| **Elemen**                          | **Deskripsi**                                                                                                                                   |
+=====================================+=================================================================================================================================================+
| **Use Case Scenario**               | Tambah Konten Featured (Moderator)                                                                                                              |
+-------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------+
| **Objective**                       | Moderator dapat menambahkan artikel ke dalam konten featured di halaman utama                                                                   |
+-------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------+
| **Actor**                           | Moderator, Admin                                                                                                                                |
+-------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------+
| **Pre-condition**                   | 1\. Moderator sudah login dengan role moderator atau admin                                                                                      |
|                                     |                                                                                                                                                 |
|                                     | 2\. Artikel yang akan di-featured tersedia dan berstatus published                                                                              |
+-------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------+
| **Main Flow**                       | 1\. Moderator membuka halaman /admin/featured                                                                                                   |
|                                     |                                                                                                                                                 |
|                                     | 2\. Sistem menampilkan daftar konten featured saat ini dan form untuk menambah featured                                                         |
|                                     |                                                                                                                                                 |
|                                     | 3\. Moderator memilih artikel dari daftar atau melalui pencarian                                                                                |
|                                     |                                                                                                                                                 |
|                                     | 4\. Sistem menampilkan daftar artikel yang dapat di-featured                                                                                    |
|                                     |                                                                                                                                                 |
|                                     | 5\. Moderator memilih artikel dan menekan tombol Tambah ke Featured                                                                             |
|                                     |                                                                                                                                                 |
|                                     | 6\. Sistem memvalidasi kuota slot featured maksimal 6 artikel                                                                                   |
|                                     |                                                                                                                                                 |
|                                     | 7\. Jika kuota belum penuh, sistem meminta pengaturan priority opsional                                                                         |
|                                     |                                                                                                                                                 |
|                                     | 8\. Sistem menyimpan data ke featured_content, mencatat ke activity logs, menampilkan notifikasi sukses, dan memperbarui daftar featured        |
|                                     |                                                                                                                                                 |
|                                     | 9\. Artikel otomatis muncul di section Konten Pilihan pada homepage                                                                             |
+-------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------+
| **Alternate Flow**                  | 1\. Jika kuota featured sudah penuh, sistem menampilkan pesan Kuota featured sudah penuh dan menyediakan opsi untuk menghapus featured yang ada |
|                                     |                                                                                                                                                 |
|                                     | 2\. Jika moderator mengatur priority, sistem menyimpan priority dan mengurutkan artikel berdasarkan priority                                    |
+-------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------+
| **Exception Flow**                  | 1\. Jika artikel sudah di-featured, sistem menampilkan pesan Artikel ini sudah di-featured                                                      |
|                                     |                                                                                                                                                 |
|                                     | 2\. Jika penyimpanan gagal, sistem menampilkan pesan error                                                                                      |
+-------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------+
| **Post-condition**                  | 1\. Artikel ditambahkan ke featured content                                                                                                     |
|                                     |                                                                                                                                                 |
|                                     | 2\. Artikel tampil di homepage pada bagian Konten Pilihan                                                                                       |
|                                     |                                                                                                                                                 |
|                                     | 3\. Priority atau urutan tersimpan                                                                                                              |
|                                     |                                                                                                                                                 |
|                                     | 4\. Aktivitas tercatat di activity logs                                                                                                         |
+-------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------+
| **Traceability**                    | 1\. F-09 Konten Pilihan                                                                                                                         |
|                                     |                                                                                                                                                 |
|                                     | 2\. NF-03 Security                                                                                                                              |
+-------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------+
| **Data Uji**                        | 1\. Tambah featured dengan kuota tersedia                                                                                                       |
|                                     |                                                                                                                                                 |
|                                     | 2\. Tambah featured dengan kuota penuh                                                                                                          |
|                                     |                                                                                                                                                 |
|                                     | 3\. Tambah artikel yang sudah di-featured                                                                                                       |
|                                     |                                                                                                                                                 |
|                                     | 4\. Tambah dengan priority                                                                                                                      |
|                                     |                                                                                                                                                 |
|                                     | 5\. Tambah tanpa priority                                                                                                                       |
+-------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------+
| **Estimasi Waktu dan Kompleksitas** | 1\. Estimasi Waktu 30--60 detik                                                                                                                 |
|                                     |                                                                                                                                                 |
|                                     | 2\. Kompleksitas Rendah                                                                                                                         |
+-------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------+

: []{#_Toc215958607 .anchor}Tabel 4.25 Use Case Tambah Konten Featured (Moderator)

### 4.8.18 Use Case Kelola Pengguna (Administrator)

**Main Flow:**

+-------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Elemen**                          | **Deskripsi**                                                                                                                                                                                                                 |
+=====================================+===============================================================================================================================================================================================================================+
| **Use Case Scenario**               | Kelola Pengguna (Administrator)                                                                                                                                                                                               |
+-------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Objective**                       | Administrator dapat mengelola data pengguna, termasuk mengubah role, melakukan ban dan unban pengguna                                                                                                                         |
+-------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Actor**                           | Administrator                                                                                                                                                                                                                 |
+-------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Pre-condition**                   | 1\. Administrator sudah login dengan role admin                                                                                                                                                                               |
|                                     |                                                                                                                                                                                                                               |
|                                     | 2\. Administrator memiliki akses ke halaman /admin/users                                                                                                                                                                      |
+-------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Main Flow**                       | 1\. Administrator membuka halaman /admin/users                                                                                                                                                                                |
|                                     |                                                                                                                                                                                                                               |
|                                     | 2\. Sistem menampilkan tabel semua pengguna dengan fitur filter dan pencarian                                                                                                                                                 |
|                                     |                                                                                                                                                                                                                               |
|                                     | 3\. Sistem memuat seluruh data pengguna dengan pagination, statistik total, active, banned, dan pending                                                                                                                       |
|                                     |                                                                                                                                                                                                                               |
|                                     | 4\. Administrator mencari atau memfilter pengguna                                                                                                                                                                             |
|                                     |                                                                                                                                                                                                                               |
|                                     | 5\. Sistem memfilter tabel secara real-time                                                                                                                                                                                   |
|                                     |                                                                                                                                                                                                                               |
|                                     | 6\. Administrator memilih salah satu pengguna untuk dikelola                                                                                                                                                                  |
|                                     |                                                                                                                                                                                                                               |
|                                     | 7\. Sistem menampilkan detail pengguna dan opsi aksi seperti Edit Role, Ban, Unban, dan Reset Password                                                                                                                        |
|                                     |                                                                                                                                                                                                                               |
|                                     | 8\. Jika administrator mengubah role, sistem menampilkan modal konfirmasi, memperbarui role di database, mencatat ke activity logs, mengirim notifikasi ke pengguna jika role ditingkatkan, dan menampilkan notifikasi sukses |
|                                     |                                                                                                                                                                                                                               |
|                                     | 9\. Jika administrator melakukan ban atau unban, sistem memperbarui status pengguna, mencatat ke activity logs, mengirim notifikasi ke pengguna, dan menampilkan notifikasi sukses                                            |
+-------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Alternate Flow**                  | 1\. Jika administrator mencari dengan keyword, sistem melakukan pencarian di nama, email, dan bio                                                                                                                             |
|                                     |                                                                                                                                                                                                                               |
|                                     | 2\. Jika administrator melihat detail pengguna, sistem menampilkan statistik pengguna seperti jumlah artikel, likes, dan komentar                                                                                             |
+-------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Exception Flow**                  | 1\. Jika pengguna tidak ditemukan, sistem menampilkan pesan Pengguna tidak ditemukan                                                                                                                                          |
|                                     |                                                                                                                                                                                                                               |
|                                     | 2\. Jika perubahan role gagal, sistem menampilkan pesan error                                                                                                                                                                 |
+-------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Post-condition**                  | 1\. Role atau status pengguna diperbarui                                                                                                                                                                                      |
|                                     |                                                                                                                                                                                                                               |
|                                     | 2\. Perubahan tercatat di activity logs                                                                                                                                                                                       |
|                                     |                                                                                                                                                                                                                               |
|                                     | 3\. Pengguna menerima notifikasi jika relevan                                                                                                                                                                                 |
|                                     |                                                                                                                                                                                                                               |
|                                     | 4\. Tabel pengguna diperbarui secara otomatis                                                                                                                                                                                 |
+-------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Traceability**                    | 1\. F-11 Manajemen Pengguna                                                                                                                                                                                                   |
|                                     |                                                                                                                                                                                                                               |
|                                     | 2\. NF-03 Security                                                                                                                                                                                                            |
+-------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Data Uji**                        | 1\. Ubah role member ke moderator                                                                                                                                                                                             |
|                                     |                                                                                                                                                                                                                               |
|                                     | 2\. Ubah role moderator ke admin                                                                                                                                                                                              |
|                                     |                                                                                                                                                                                                                               |
|                                     | 3\. Ban pengguna                                                                                                                                                                                                              |
|                                     |                                                                                                                                                                                                                               |
|                                     | 4\. Unban pengguna                                                                                                                                                                                                            |
|                                     |                                                                                                                                                                                                                               |
|                                     | 5\. Cari pengguna dengan keyword 6. Filter pengguna aktif                                                                                                                                                                     |
+-------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Estimasi Waktu dan Kompleksitas** | 1\. Estimasi Waktu 1--2 menit per pengguna                                                                                                                                                                                    |
|                                     |                                                                                                                                                                                                                               |
|                                     | 2\. Kompleksitas Sedang                                                                                                                                                                                                       |
+-------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

: []{#_Toc215958608 .anchor}Tabel 4.26 Use Case Kelola Pengguna (Administrator)

### 4.8.19 Use Case Lihat Analytics (Administrator/Moderator)

+-------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Elemen**                          | **Deskripsi**                                                                                                                                                                                                                                                                   |
+=====================================+=================================================================================================================================================================================================================================================================================+
| **Use Case Scenario**               | Lihat Analytics (Administrator/Moderator)                                                                                                                                                                                                                                       |
+-------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Objective**                       | Administrator dan Moderator dapat melihat statistik dan tren aktivitas pada platform                                                                                                                                                                                            |
+-------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Actor**                           | Administrator, Moderator                                                                                                                                                                                                                                                        |
+-------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Pre-condition**                   | 1\. Administrator atau Moderator sudah login                                                                                                                                                                                                                                    |
|                                     |                                                                                                                                                                                                                                                                                 |
|                                     | 2\. Memiliki akses ke halaman /admin/analytics                                                                                                                                                                                                                                  |
+-------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Main Flow**                       | 1\. Administrator atau Moderator membuka halaman /admin/analytics                                                                                                                                                                                                               |
|                                     |                                                                                                                                                                                                                                                                                 |
|                                     | 2\. Sistem memuat halaman analytics                                                                                                                                                                                                                                             |
|                                     |                                                                                                                                                                                                                                                                                 |
|                                     | 3\. Sistem mengambil data statistik meliputi total pengguna, total artikel, artikel published, artikel draft, total views, total likes, total komentar, pertumbuhan pengguna per periode, artikel populer, dan kategori populer                                                 |
|                                     |                                                                                                                                                                                                                                                                                 |
|                                     | 4\. Setelah data berhasil dimuat, sistem menampilkan dashboard berisi kartu statistik utama, grafik pertumbuhan berupa line chart, grafik kategori populer berupa bar chart, tabel artikel populer, serta filter periode hari ini, minggu ini, bulan ini, tahun ini, dan custom |
+-------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Alternate Flow**                  | 1\. Jika administrator memilih filter periode custom, sistem meminta input tanggal mulai dan tanggal akhir                                                                                                                                                                      |
|                                     |                                                                                                                                                                                                                                                                                 |
|                                     | 2\. Jika administrator memilih kategori tertentu, sistem memfilter statistik berdasarkan kategori                                                                                                                                                                               |
+-------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Exception Flow**                  | 1\. Jika data tidak tersedia, sistem menampilkan pesan Data tidak tersedia                                                                                                                                                                                                      |
|                                     |                                                                                                                                                                                                                                                                                 |
|                                     | 2\. Jika gagal memuat data, sistem menampilkan pesan error                                                                                                                                                                                                                      |
+-------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Post-condition**                  | 1\. Dashboard analytics ditampilkan dengan data terbaru                                                                                                                                                                                                                         |
|                                     |                                                                                                                                                                                                                                                                                 |
|                                     | 2\. Administrator atau Moderator dapat melihat tren dan statistik platform                                                                                                                                                                                                      |
|                                     |                                                                                                                                                                                                                                                                                 |
|                                     | 3\. Data analytics dapat difilter berdasarkan periode                                                                                                                                                                                                                           |
+-------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Traceability**                    | 1\. F-12 Analytics                                                                                                                                                                                                                                                              |
|                                     |                                                                                                                                                                                                                                                                                 |
|                                     | 2\. NF-01 Performance                                                                                                                                                                                                                                                           |
+-------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Data Uji**                        | 1\. Analytics dengan data lengkap                                                                                                                                                                                                                                               |
|                                     |                                                                                                                                                                                                                                                                                 |
|                                     | 2\. Analytics tanpa data                                                                                                                                                                                                                                                        |
|                                     |                                                                                                                                                                                                                                                                                 |
|                                     | 3\. Filter periode hari ini                                                                                                                                                                                                                                                     |
|                                     |                                                                                                                                                                                                                                                                                 |
|                                     | 4\. Filter periode custom                                                                                                                                                                                                                                                       |
|                                     |                                                                                                                                                                                                                                                                                 |
|                                     | 5\. Analytics dengan banyak data                                                                                                                                                                                                                                                |
+-------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Estimasi Waktu dan Kompleksitas** | 1\. Estimasi Waktu 3--5 detik                                                                                                                                                                                                                                                   |
|                                     |                                                                                                                                                                                                                                                                                 |
|                                     | 2\. Kompleksitas Sedang                                                                                                                                                                                                                                                         |
+-------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

: []{#_Toc215958609 .anchor}Tabel 4.27 Use Case Lihat Analytics (Administrator/Moderator)

### 4.8.20 Use Case Lihat Activity Logs (Administrator)

+-------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Elemen**                          | **Deskripsi**                                                                                                                                                    |
+=====================================+==================================================================================================================================================================+
| **Use Case Scenario**               | Lihat Activity Logs (Administrator)                                                                                                                              |
+-------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Objective**                       | Administrator dapat memantau seluruh aktivitas yang terjadi di dalam sistem                                                                                      |
+-------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Actor**                           | Administrator                                                                                                                                                    |
+-------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Pre-condition**                   | 1\. Administrator sudah login dengan role admin                                                                                                                  |
|                                     |                                                                                                                                                                  |
|                                     | 2\. Administrator memiliki akses ke halaman /admin/logs                                                                                                          |
+-------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Main Flow**                       | 1\. Administrator membuka halaman /admin/logs                                                                                                                    |
|                                     |                                                                                                                                                                  |
|                                     | 2\. Sistem memuat halaman activity logs                                                                                                                          |
|                                     |                                                                                                                                                                  |
|                                     | 3\. Sistem mengambil seluruh data activity logs dengan pagination, filter All, User Management, Content Management, Settings, dan Reports, serta fitur pencarian |
|                                     |                                                                                                                                                                  |
|                                     | 4\. Sistem menampilkan tabel logs dengan kolom timestamp, actor, action, target, payload, serta filter dan search                                                |
|                                     |                                                                                                                                                                  |
|                                     | 5\. Administrator melakukan filter atau pencarian log                                                                                                            |
|                                     |                                                                                                                                                                  |
|                                     | 6\. Sistem memfilter tabel secara real-time                                                                                                                      |
|                                     |                                                                                                                                                                  |
|                                     | 7\. Administrator memilih salah satu log untuk melihat detail                                                                                                    |
|                                     |                                                                                                                                                                  |
|                                     | 8\. Sistem menampilkan detail lengkap log termasuk nilai sebelum dan sesudah perubahan                                                                           |
+-------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Alternate Flow**                  | 1\. Jika administrator memfilter berdasarkan action, sistem hanya menampilkan logs dengan action tertentu                                                        |
|                                     |                                                                                                                                                                  |
|                                     | 2\. Jika administrator memfilter berdasarkan actor, sistem hanya menampilkan logs dari actor tertentu                                                            |
+-------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Exception Flow**                  | 1\. Jika tidak terdapat activity logs, sistem menampilkan pesan Tidak ada activity logs                                                                          |
|                                     |                                                                                                                                                                  |
|                                     | 2\. Jika gagal memuat logs, sistem menampilkan pesan error                                                                                                       |
+-------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Post-condition**                  | 1\. Activity logs ditampilkan secara lengkap                                                                                                                     |
|                                     |                                                                                                                                                                  |
|                                     | 2\. Administrator dapat memantau seluruh aktivitas yang dilakukan di platform                                                                                    |
|                                     |                                                                                                                                                                  |
|                                     | 3\. Logs dapat difilter dan dicari                                                                                                                               |
+-------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Traceability**                    | 1\. F-13 Activity Logs                                                                                                                                           |
|                                     |                                                                                                                                                                  |
|                                     | 2\. NF-03 Security                                                                                                                                               |
+-------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Data Uji**                        | 1\. Logs dengan banyak data                                                                                                                                      |
|                                     |                                                                                                                                                                  |
|                                     | 2\. Logs tanpa data                                                                                                                                              |
|                                     |                                                                                                                                                                  |
|                                     | 3\. Filter berdasarkan action                                                                                                                                    |
|                                     |                                                                                                                                                                  |
|                                     | 4\. Filter berdasarkan actor                                                                                                                                     |
|                                     |                                                                                                                                                                  |
|                                     | 5\. Pencarian logs dengan keyword                                                                                                                                |
+-------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Estimasi Waktu dan Kompleksitas** | 1\. Estimasi Waktu 2--3 detik                                                                                                                                    |
|                                     |                                                                                                                                                                  |
|                                     | 2\. Kompleksitas Rendah                                                                                                                                          |
+-------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------+

: []{#_Toc215958610 .anchor}Tabel 4.28 Use Case Lihat Activity Logs (Administrator)

### 4.8.21 Use Case Tambah Portofolio

+-------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Elemen**                          | **Deskripsi**                                                                                                                                                                   |
+=====================================+=================================================================================================================================================================================+
| **Use Case Scenario**               | Tambah Portofolio                                                                                                                                                               |
+-------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Objective**                       | Penulis dapat menambahkan portofolio baru ke dalam sistem                                                                                                                       |
+-------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Actor**                           | Penulis                                                                                                                                                                         |
+-------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Pre-condition**                   | 1\. Penulis sudah login                                                                                                                                                         |
|                                     |                                                                                                                                                                                 |
|                                     | 2\. Penulis memiliki akses ke halaman portofolio                                                                                                                                |
+-------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Main Flow**                       | 1\. Penulis membuka halaman profil sendiri dan menekan tombol Tambah Portofolio atau membuka halaman /portfolio/add                                                             |
|                                     |                                                                                                                                                                                 |
|                                     | 2\. Sistem menampilkan form tambah portofolio                                                                                                                                   |
|                                     |                                                                                                                                                                                 |
|                                     | 3\. Penulis mengisi form portofolio                                                                                                                                             |
|                                     |                                                                                                                                                                                 |
|                                     | 4\. Sistem memvalidasi input judul, kategori, deskripsi, dan cover image                                                                                                        |
|                                     |                                                                                                                                                                                 |
|                                     | 5\. Penulis mengunggah cover image (opsional)                                                                                                                                   |
|                                     |                                                                                                                                                                                 |
|                                     | 6\. Sistem mengunggah gambar ke storage dan menampilkan preview                                                                                                                 |
|                                     |                                                                                                                                                                                 |
|                                     | 7\. Penulis mengisi link eksternal (opsional)                                                                                                                                   |
|                                     |                                                                                                                                                                                 |
|                                     | 8\. Sistem memvalidasi format URL                                                                                                                                               |
|                                     |                                                                                                                                                                                 |
|                                     | 9\. Penulis menekan tombol Simpan Portofolio                                                                                                                                    |
|                                     |                                                                                                                                                                                 |
|                                     | 10\. Sistem memvalidasi seluruh form                                                                                                                                            |
|                                     |                                                                                                                                                                                 |
|                                     | 11\. Setelah validasi berhasil, sistem menyimpan portofolio ke database, mencatat di activity logs, menampilkan notifikasi sukses, dan mengarahkan ke halaman detail portofolio |
+-------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Alternate Flow**                  | 1\. Jika penulis memilih kategori Award, sistem menampilkan field tambahan untuk informasi award                                                                                |
|                                     |                                                                                                                                                                                 |
|                                     | 2\. Jika penulis tidak mengunggah cover image, sistem menggunakan placeholder image                                                                                             |
+-------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Exception Flow**                  | 1\. Jika validasi gagal, sistem menampilkan pesan error pada setiap field                                                                                                       |
|                                     |                                                                                                                                                                                 |
|                                     | 2\. Jika unggah gambar gagal, sistem menampilkan pesan error                                                                                                                    |
|                                     |                                                                                                                                                                                 |
|                                     | 3\. Jika penyimpanan data gagal, sistem menampilkan pesan error                                                                                                                 |
+-------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Post-condition**                  | 1\. Portofolio berhasil tersimpan dan muncul di halaman profil penulis                                                                                                          |
|                                     |                                                                                                                                                                                 |
|                                     | 2\. Portofolio dapat diakses melalui URL unik 3. Cover image tersimpan di storage                                                                                               |
+-------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Traceability**                    | 1\. F-06 Portofolio                                                                                                                                                             |
|                                     |                                                                                                                                                                                 |
|                                     | 2\. NF-03 Security                                                                                                                                                              |
+-------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Data Uji**                        | 1\. Portofolio dengan semua field                                                                                                                                               |
|                                     |                                                                                                                                                                                 |
|                                     | 2\. Portofolio tanpa cover image                                                                                                                                                |
|                                     |                                                                                                                                                                                 |
|                                     | 3\. Portofolio dengan link eksternal                                                                                                                                            |
|                                     |                                                                                                                                                                                 |
|                                     | 4\. Portofolio dengan kategori award                                                                                                                                            |
|                                     |                                                                                                                                                                                 |
|                                     | 5\. Upload gambar valid                                                                                                                                                         |
|                                     |                                                                                                                                                                                 |
|                                     | 6\. Upload gambar gagal                                                                                                                                                         |
+-------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Estimasi Waktu dan Kompleksitas** | 1\. Estimasi waktu 5--10 menit                                                                                                                                                  |
|                                     |                                                                                                                                                                                 |
|                                     | 2\. Kompleksitas Sedang                                                                                                                                                         |
+-------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

: []{#_Toc215958611 .anchor}Tabel 4.29 Use Case Tambah Portofolio

### 4.8.22 Use Case Lihat Profil Member

+-------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Elemen**                          | **Deskripsi**                                                                                                                                                                                                                                           |
+=====================================+=========================================================================================================================================================================================================================================================+
| **Use Case Scenario**               | Lihat Profil Member                                                                                                                                                                                                                                     |
+-------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Objective**                       | Pengguna dapat melihat profil lengkap member di platform                                                                                                                                                                                                |
+-------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Actor**                           | Pengguna                                                                                                                                                                                                                                                |
+-------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Pre-condition**                   | 1\. Pengguna memiliki akses internet                                                                                                                                                                                                                    |
|                                     |                                                                                                                                                                                                                                                         |
|                                     | 2\. Member yang akan dilihat profilnya ada di platform                                                                                                                                                                                                  |
+-------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Main Flow**                       | 1\. Pengguna membuka profil member dari beranda, artikel, atau direktori member                                                                                                                                                                         |
|                                     |                                                                                                                                                                                                                                                         |
|                                     | 2\. Sistem mengarahkan ke halaman profil member                                                                                                                                                                                                         |
|                                     |                                                                                                                                                                                                                                                         |
|                                     | 3\. Sistem memuat data profil                                                                                                                                                                                                                           |
|                                     |                                                                                                                                                                                                                                                         |
|                                     | 4\. Sistem mengambil data profil member, artikel yang diterbitkan, portofolio, dan statistik (jumlah artikel, likes)                                                                                                                         |
|                                     |                                                                                                                                                                                                                                                         |
|                                     | 5\. Setelah data dimuat, sistem menampilkan header profil (avatar, nama, bio, role badge), statistik profil, daftar artikel dengan pagination, daftar portofolio, serta link ke portofolio lengkap |
+-------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Alternate Flow**                  | 1\. Jika pengguna membuka profil sendiri, sistem menampilkan tombol Edit Profil dan Kelola Artikel                                                                                                                                                      |
|                                     |                                                                                                                                                                                                                                                         |
|                                     | 2\. Jika member tidak memiliki artikel, sistem hanya menampilkan profil dan portofolio                                                                                                                                                                  |
+-------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Exception Flow**                  | 1\. Jika member tidak ditemukan, sistem menampilkan halaman 404                                                                                                                                                                                         |
|                                     |                                                                                                                                                                                                                                                         |
|                                     | 2\. Jika gagal memuat data, sistem menampilkan pesan error                                                                                                                                                                                              |
+-------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Post-condition**                  | 1\. Profil member ditampilkan dengan informasi lengkap                                                                                                                                                                                                  |
|                                     |                                                                                                                                                                                                                                                         |
|                                     | 2\. Pengguna dapat melihat artikel dan portofolio member                                                                                                                                                                                                |
|                                     |                                                                                                                                                                                                                                                         |
|+-------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Traceability**                    | 1\. F-07 Profil                                                                                                                                                                                                                                         |
|                                     |                                                                                                                                                                                                                                                         |
|                                     | 2\. NF-01 Performance                                                                                                                                                                                                                                   |
+-------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Data Uji**                        | 1\. Profil member dengan banyak artikel                                                                                                                                                                                                                 |
|                                     |                                                                                                                                                                                                                                                         |
|                                     | 2\. Profil member tanpa artikel                                                                                                                                                                                                                         |
|                                     |                                                                                                                                                                                                                                                         |
|                                     | 3\. Profil sendiri                                                                                                                                                                                                                                      |
|                                     |                                                                                                                                                                                                                                                         |
|                                     | 4\. Profil member lain                                                                                                                                                                                                                                  |
|                                     |                                                                                                                                                                                                                                                         |
|                                     | 5\. Member tidak ditemukan                                                                                                                                                                                                                              |
+-------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Estimasi Waktu dan Kompleksitas** | 1\. Estimasi waktu 2--3 detik (loading)                                                                                                                                                                                                                 |
|                                     |                                                                                                                                                                                                                                                         |
|                                     | 2\. Kompleksitas Rendah                                                                                                                                                                                                                                 |
+-------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

: []{#_Toc215958612 .anchor}Tabel 4.30 Use Case Lihat Profil Member

### 4.8.23 Use Case Edit Profil

+-------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Elemen**                          | **Deskripsi**                                                                                                                                                                                       |
+=====================================+=====================================================================================================================================================================================================+
| **Use Case Scenario**               | Edit Profil                                                                                                                                                                                         |
+-------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Objective**                       | Penulis dapat mengubah dan memperbarui data profil pribadi                                                                                                                                          |
+-------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Actor**                           | Penulis                                                                                                                                                                                             |
+-------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Pre-condition**                   | 1\. Penulis sudah login                                                                                                                                                                             |
|                                     |                                                                                                                                                                                                     |
|                                     | 2\. Penulis membuka profil sendiri                                                                                                                                                                  |
+-------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Main Flow**                       | 1\. Penulis membuka profil sendiri dan klik tombol **Edit Profil**                                                                                                                                  |
|                                     |                                                                                                                                                                                                     |
|                                     | 2\. Sistem menampilkan form edit profil dengan data saat ini                                                                                                                                        |
|                                     |                                                                                                                                                                                                     |
|                                     | 3\. Penulis mengubah data profil                                                                                                                                                                    |
|                                     |                                                                                                                                                                                                     |
|                                     | 4\. Sistem memvalidasi perubahan secara real-time (nama, bio, link sosial media)                                                                                                                    |
|                                     |                                                                                                                                                                                                     |
|                                     | 5\. Penulis mengunggah avatar baru (opsional)                                                                                                                                                       |
|                                     |                                                                                                                                                                                                     |
|                                     | 6\. Sistem mengunggah gambar ke storage, memvalidasi format dan ukuran, serta menampilkan preview                                                                                                   |
|                                     |                                                                                                                                                                                                     |
|                                     | 7\. Penulis klik **Simpan Perubahan**                                                                                                                                                               |
|                                     |                                                                                                                                                                                                     |
|                                     | 8\. Sistem memvalidasi form                                                                                                                                                                         |
|                                     |                                                                                                                                                                                                     |
|                                     | 9\. Setelah validasi berhasil, sistem memperbarui profil di database, memperbarui avatar di storage (jika ada), mencatat di activity logs, menampilkan notifikasi sukses, dan memperbarui UI profil |
+-------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Alternate Flow**                  | 1\. Jika penulis tidak mengubah avatar, sistem mempertahankan avatar lama                                                                                                                           |
|                                     |                                                                                                                                                                                                     |
|                                     | 2\. Jika penulis mengubah username/slug, sistem memvalidasi keunikan dan memperbarui URL profil                                                                                                     |
+-------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Exception Flow**                  | 1\. Jika validasi gagal, sistem menampilkan pesan error                                                                                                                                             |
|                                     |                                                                                                                                                                                                     |
|                                     | 2\. Jika upload avatar gagal, sistem menampilkan pesan error                                                                                                                                        |
|                                     |                                                                                                                                                                                                     |
|                                     | 3\. Jika username sudah digunakan, sistem menampilkan pesan error                                                                                                                                   |
+-------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Post-condition**                  | 1\. Profil diperbarui dengan data terbaru                                                                                                                                                           |
|                                     |                                                                                                                                                                                                     |
|                                     | 2\. Avatar baru tersimpan (jika diubah)                                                                                                                                                             |
|                                     |                                                                                                                                                                                                     |
|                                     | 3\. Perubahan terlihat di seluruh platform                                                                                                                                                          |
|                                     |                                                                                                                                                                                                     |
|                                     | 4\. URL profil diperbarui (jika username diubah)                                                                                                                                                    |
+-------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Traceability**                    | 1\. F-07 Profil                                                                                                                                                                                     |
|                                     |                                                                                                                                                                                                     |
|                                     | 2\. NF-03 Security                                                                                                                                                                                  |
+-------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Data Uji**                        | 1\. Edit profil dengan semua field                                                                                                                                                                  |
|                                     |                                                                                                                                                                                                     |
|                                     | 2\. Edit profil tanpa mengubah avatar                                                                                                                                                               |
|                                     |                                                                                                                                                                                                     |
|                                     | 3\. Edit username yang unik                                                                                                                                                                         |
|                                     |                                                                                                                                                                                                     |
|                                     | 4\. Edit username yang sudah digunakan                                                                                                                                                              |
|                                     |                                                                                                                                                                                                     |
|                                     | 5\. Upload avatar valid 6. Upload avatar gagal                                                                                                                                                      |
+-------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Estimasi Waktu dan Kompleksitas** | 1\. Estimasi waktu 2--5 menit                                                                                                                                                                       |
|                                     |                                                                                                                                                                                                     |
|                                     | 2\. Kompleksitas Rendah                                                                                                                                                                             |
+-------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

: []{#_Toc215958613 .anchor}Tabel 4.31 Use Case Edit Profil

### 4.8.24 Use Case Lihat Direktori Member

+-------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Elemen**                          | **Deskripsi**                                                                                                                                                                                 |
+=====================================+===============================================================================================================================================================================================+
| **Use Case Scenario**               | Lihat Direktori Member                                                                                                                                                                        |
+-------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Objective**                       | Pengguna dapat melihat daftar seluruh member yang terdaftar di platform                                                                                                                       |
+-------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Actor**                           | Pengguna                                                                                                                                                                                      |
+-------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Pre-condition**                   | 1\. Pengguna memiliki akses internet                                                                                                                                                          |
|                                     |                                                                                                                                                                                               |
|                                     | 2\. Tidak perlu autentikasi                                                                                                                                                                   |
+-------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Main Flow**                       | 1\. Pengguna membuka halaman **/member** atau klik menu **Member** di navigasi                                                                                                                |
|                                     |                                                                                                                                                                                               |
|                                     | 2\. Sistem memuat halaman direktori member                                                                                                                                                    |
|                                     |                                                                                                                                                                                               |
|                                     | 3\. Sistem memuat data member                                                                                                                                                                 |
|                                     |                                                                                                                                                                                               |
|                                     | 4\. Sistem mengambil semua member dengan pagination, filter (All, Active Writers, New Members), dan fitur search                                                                              |
|                                     |                                                                                                                                                                                               |
|                                     | 5\. Setelah data dimuat, sistem menampilkan grid member dengan avatar, nama, bio singkat, badge role, statistik (jumlah artikel), tombol **Lihat Profil**, filter, search bar, dan pagination |
|                                     |                                                                                                                                                                                               |
|                                     | 6\. Pengguna memfilter atau mencari member                                                                                                                                                    |
|                                     |                                                                                                                                                                                               |
|                                     | 7\. Sistem memfilter grid secara real-time                                                                                                                                                    |
+-------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Alternate Flow**                  | 1\. Jika pengguna memfilter **Active Writers**, sistem hanya menampilkan member dengan minimal 1 artikel published                                                                            |
|                                     |                                                                                                                                                                                               |
|                                     | 2\. Jika pengguna mencari dengan keyword, sistem melakukan pencarian berdasarkan nama dan bio                                                                                                 |
+-------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Exception Flow**                  | 1\. Jika tidak ada member, sistem menampilkan pesan **\"Belum ada member\"**                                                                                                                  |
|                                     |                                                                                                                                                                                               |
|                                     | 2\. Jika gagal memuat data, sistem menampilkan pesan error                                                                                                                                    |
+-------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Post-condition**                  | 1\. Direktori member berhasil ditampilkan                                                                                                                                                     |
|                                     |                                                                                                                                                                                               |
|                                     | 2\. Pengguna dapat melihat dan mengklik profil member                                                                                                                                         |
|                                     |                                                                                                                                                                                               |
|                                     | 3\. Filter dan search berfungsi dengan baik                                                                                                                                                   |
+-------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Traceability**                    | 1\. F-04 Discovery Konten                                                                                                                                                                     |
|                                     |                                                                                                                                                                                               |
|                                     | 2\. NF-01 Performance                                                                                                                                                                         |
+-------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Data Uji**                        | 1\. Direktori dengan banyak member                                                                                                                                                            |
|                                     |                                                                                                                                                                                               |
|                                     | 2\. Direktori dengan sedikit member                                                                                                                                                           |
|                                     |                                                                                                                                                                                               |
|                                     | 3\. Filter Active Writers                                                                                                                                                                     |
|                                     |                                                                                                                                                                                               |
|                                     | 4\. Search dengan keyword                                                                                                                                                                     |
|                                     |                                                                                                                                                                                               |
|                                     | 5\. Direktori kosong                                                                                                                                                                          |
+-------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Estimasi Waktu dan Kompleksitas** | 1\. Estimasi waktu 2--3 detik (loading)                                                                                                                                                       |
|                                     |                                                                                                                                                                                               |
|                                     | 2\. Kompleksitas Rendah                                                                                                                                                                       |
+-------------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

: []{#_Toc215958614 .anchor}Tabel 4.32 Use Case Lihat Direktori Member

### 4.8.25 Use Case Lihat Halaman Tentang

+-------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Elemen**                          | **Deskripsi**                                                                                                                                                     |
+=====================================+===================================================================================================================================================================+
| **Use Case Scenario**               | Lihat Halaman Tentang                                                                                                                                             |
+-------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Objective**                       | Pengguna dapat melihat informasi tentang komunitas secara lengkap                                                                                                 |
+-------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Actor**                           | Pengguna                                                                                                                                                          |
+-------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Pre-condition**                   | 1\. Pengguna memiliki akses internet                                                                                                                              |
|                                     |                                                                                                                                                                   |
|                                     | 2\. Tidak perlu autentikasi                                                                                                                                       |
+-------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Main Flow**                       | 1\. Pengguna membuka halaman **/tentang** atau klik menu **Tentang** di navigasi                                                                                  |
|                                     |                                                                                                                                                                   |
|                                     | 2\. Sistem memuat halaman tentang                                                                                                                                 |
|                                     |                                                                                                                                                                   |
|                                     | 3\. Sistem memuat konten halaman                                                                                                                                  |
|                                     |                                                                                                                                                                   |
|                                     | 4\. Sistem mengambil informasi tentang komunitas dari database atau konten statis                                                                                 |
|                                     |                                                                                                                                                                   |
|                                     | 5\. Setelah data dimuat, sistem menampilkan section: sejarah komunitas, visi dan misi, tujuan, cara bergabung, kontak resmi, serta link ke media sosial komunitas |
+-------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Alternate Flow**                  | 1\. Jika halaman tentang menggunakan CMS, sistem mengambil konten langsung dari database                                                                          |
+-------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Exception Flow**                  | 1\. Jika gagal memuat konten, sistem menampilkan pesan error                                                                                                      |
+-------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Post-condition**                  | 1\. Halaman tentang berhasil ditampilkan dengan informasi lengkap                                                                                                 |
|                                     |                                                                                                                                                                   |
|                                     | 2\. Pengguna dapat memahami identitas dan tujuan komunitas                                                                                                        |
+-------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Traceability**                    | 1\. F-04 Discovery Konten                                                                                                                                         |
+-------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Data Uji**                        | 1\. Halaman tentang dengan konten lengkap                                                                                                                         |
|                                     |                                                                                                                                                                   |
|                                     | 2\. Halaman tentang dengan konten minimal                                                                                                                         |
|                                     |                                                                                                                                                                   |
|                                     | 3\. Halaman tentang gagal dimuat                                                                                                                                  |
+-------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Estimasi Waktu dan Kompleksitas** | 1\. Estimasi waktu 1--2 detik (loading)                                                                                                                           |
|                                     |                                                                                                                                                                   |
|                                     | 2\. Kompleksitas Rendah                                                                                                                                           |
+-------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------+

: []{#_Toc215958615 .anchor}Tabel 4.33 Use Case Lihat Halaman Tentang

### 4.8.26 Use Case Logout

+---------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Elemen**                      | **Deskripsi**                                                                                                                                                                           |
+=================================+=========================================================================================================================================================================================+
| Use Case Scenario               | Logout                                                                                                                                                                                  |
+---------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Objective                       | Pengguna dapat keluar dari sistem dengan aman                                                                                                                                           |
+---------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Actor                           | Pengguna                                                                                                                                                                                |
+---------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Pre-condition                   | 1\. Pengguna sudah login                                                                                                                                                                |
|                                 |                                                                                                                                                                                         |
|                                 | 2\. Session aktif                                                                                                                                                                       |
+---------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Main Flow                       | 1\. Pengguna klik tombol **Logout** di menu profil atau navigasi                                                                                                                        |
|                                 |                                                                                                                                                                                         |
|                                 | 2\. Sistem menampilkan konfirmasi logout (opsional)                                                                                                                                     |
|                                 |                                                                                                                                                                                         |
|                                 | 3\. Pengguna mengonfirmasi logout                                                                                                                                                       |
|                                 |                                                                                                                                                                                         |
|                                 | 4\. Sistem menghapus session, menghapus token autentikasi, membersihkan data pengguna dari client, mengarahkan ke halaman beranda, dan menampilkan notifikasi **\"Anda telah logout\"** |
+---------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Alternate Flow                  | 1\. Jika sistem tidak menggunakan konfirmasi, logout langsung dilakukan setelah klik tombol                                                                                             |
+---------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Exception Flow                  | 1\. Jika logout gagal, sistem menampilkan pesan error                                                                                                                                   |
+---------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Post-condition                  | 1\. Session dihapus dan pengguna tidak lagi terautentikasi                                                                                                                              |
|                                 |                                                                                                                                                                                         |
|                                 | 2\. Pengguna diarahkan ke beranda                                                                                                                                                       |
|                                 |                                                                                                                                                                                         |
|                                 | 3\. Data pengguna dihapus dari client storage                                                                                                                                           |
+---------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Traceability                    | 1\. F-01 Autentikasi                                                                                                                                                                    |
|                                 |                                                                                                                                                                                         |
|                                 | 2\. NF-03 Security                                                                                                                                                                      |
+---------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Data Uji                        | 1\. Logout dengan konfirmasi                                                                                                                                                            |
|                                 |                                                                                                                                                                                         |
|                                 | 2\. Logout tanpa konfirmasi                                                                                                                                                             |
|                                 |                                                                                                                                                                                         |
|                                 | 3\. Logout dengan session expired                                                                                                                                                       |
+---------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Estimasi Waktu dan Kompleksitas | 1\. Estimasi waktu 1--2 detik                                                                                                                                                           |
|                                 |                                                                                                                                                                                         |
|                                 | 2\. Kompleksitas Rendah                                                                                                                                                                 |
+---------------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

: []{#_Toc215958616 .anchor}Tabel 4.34 Use Case Logout

Seluruh skenario use case di atas dilengkapi dengan dokumentasi lengkap yang mencakup \_traceability matrix\_ ke kebutuhan fungsional, deskripsi detail untuk setiap langkah, exception handling, dan post-condition yang jelas. Dokumentasi ini memastikan bahwa tim QA dapat memastikan tidak ada fitur yang terlewat dan seluruh skenario dapat diuji dengan baik. Proses dokumentasi use case scenario dilakukan melalui workshop bersama tim pengembang, QA, dan stakeholder untuk memastikan bahwa setiap skenario akurat, lengkap, dan dapat diuji.

\_Traceability matrix\_ menghubungkan setiap use case scenario dengan kebutuhan fungsional yang relevan, memastikan bahwa setiap kebutuhan fungsional memiliki setidaknya satu use case scenario yang menguji implementasinya. Sebagai contoh, UC-02 (Menulis dan Menerbitkan Artikel) mengacu langsung pada F-02 (Editor TinyMCE + Template) dan F-03 (Manajemen Artikel), memastikan bahwa kedua kebutuhan fungsional tersebut teruji dengan baik. UC-03 (Pelaporan Konten) mengikat ke F-10 (Laporan Konten) serta NF-03 (Security), memastikan bahwa proses pelaporan konten tidak hanya fungsional tetapi juga aman.

Setiap skenario juga mencantumkan \_pre-condition\_ yang menjelaskan kondisi yang harus dipenuhi sebelum skenario dapat dijalankan, \_main flow\_ yang menjelaskan langkah-langkah utama, \_alternative flow\_ yang menjelaskan skenario alternatif, \_exception flow\_ yang menjelaskan penanganan error, dan \_post-condition\_ yang menjelaskan kondisi sistem setelah skenario selesai. Sebagai contoh, post-condition untuk UC-02 adalah \"artikel berstatus published dan muncul di homepage kategori terkait, penulis menerima notifikasi konfirmasi publikasi, dan artikel dapat diakses melalui URL yang unik\". Post-condition untuk UC-03 adalah \"laporan dicatat di activity logs dengan status \'pending\', moderator menerima notifikasi tentang laporan baru, dan pelapor menerima konfirmasi bahwa laporan telah diterima\".

Dokumentasi use case scenario juga mencakup data uji yang dapat digunakan untuk menguji setiap skenario, termasuk data valid, data invalid, dan data boundary. Data uji ini memastikan bahwa pengujian dapat dilakukan secara konsisten dan hasilnya dapat direproduksi. Sebagai contoh, untuk UC-01 (Login Pengguna), data uji mencakup email valid dengan password benar, email valid dengan password salah, email tidak terdaftar, dan email dengan format tidak valid.

Setiap skenario juga dilengkapi dengan estimasi waktu penyelesaian dan tingkat kompleksitas untuk membantu tim dalam perencanaan pengujian. Estimasi ini didasarkan pada analisis detail setiap langkah dalam skenario dan pengalaman tim dalam menguji fitur serupa. Sebagai contoh, UC-01 diperkirakan dapat diselesaikan dalam waktu 2-3 menit dengan tingkat kompleksitas rendah, sementara UC-02 diperkirakan memerlukan waktu 10-15 menit dengan tingkat kompleksitas sedang.

Dokumentasi use case scenario juga mencakup diagram aktivitas (activity diagram) untuk skenario yang kompleks, yang membantu visualisasi alur proses dan memudahkan pemahaman tentang bagaimana sistem menangani berbagai skenario. Diagram aktivitas ini menggunakan notasi UML 2.0 dan menggambarkan decision points, parallel activities, dan exception handling dengan jelas.

Dengan dokumentasi sedetail ini, proses pengujian manual maupun otomatis dapat berjalan terarah dan efisien. Tim QA dapat menggunakan dokumentasi ini sebagai acuan untuk menulis test case, melakukan pengujian, dan melaporkan hasil pengujian. Dokumentasi ini juga memastikan bahwa seluruh stakeholder memiliki pemahaman yang sama tentang bagaimana sistem seharusnya berfungsi dalam berbagai skenario, sehingga mengurangi risiko misinterpretasi dan meningkatkan kualitas sistem secara keseluruhan.

## 4.9 Entity Relationship Diagram (ERD)

ERD menggambarkan struktur data inti yang menyokong seluruh fitur PaberLand. Diagram lengkap tersaji pada Gambar 4.13 dan terdiri atas 10 entitas utama.

![](docs/skripsi/media/image102.png){width="8.56153871391076in" height="4.795686789151356in"}

[]{#_Toc215958744 .anchor}Gambar 4.100 Entity Relationship Diagram Platform PaberLand

Relasi-relasi tersebut memastikan konsistensi data ketika dilakukan operasi moderasi atau penarikan statistik pada dashboard analytics.

ERD disusun menggunakan notasi Crow\'s Foot yang merupakan standar industri untuk menggambarkan relasi database. Diagram ini dirancang melalui proses iteratif yang melibatkan analisis kebutuhan, normalisasi database, dan optimasi performa. Proses perancangan dimulai dengan identifikasi entitas dan atribut dari use case dan kebutuhan fungsional, kemudian dilakukan normalisasi untuk menghilangkan redundansi data dan memastikan integritas referensial. Setelah itu, dilakukan optimasi dengan menambahkan indeks, denormalisasi selektif untuk performa, dan tabel pendukung untuk caching dan pencarian.

Selain sepuluh entitas utama, terdapat pula tabel pendukung yang disiapkan khusus untuk optimasi performa dan fungsionalitas tambahan. Tabel \`article_views_cache\` digunakan untuk menyimpan cache jumlah views artikel untuk mengurangi beban query pada tabel utama. Tabel ini diperbarui secara asinkron menggunakan trigger dan background job untuk memastikan data selalu up-to-date tanpa mempengaruhi performa query utama. Tabel \`search_index\` digunakan untuk menyimpan indeks pencarian full-text yang memungkinkan pencarian cepat pada judul, konten, dan excerpt artikel. Indeks ini dibangun menggunakan PostgreSQL GIN index dan diperbarui secara real-time ketika artikel baru dibuat atau diperbarui.

Tabel pendukung lainnya termasuk \`session_store\` untuk menyimpan data sesi pengguna, \`email_queue\` untuk mengantri email yang akan dikirim, dan \`analytics_events\` untuk menyimpan event analytics yang kemudian diproses secara batch. Tabel-tabel ini dirancang dengan mempertimbangkan pola akses data, volume data yang diharapkan, dan kebutuhan performa untuk memastikan bahwa sistem dapat menangani beban yang tinggi dengan baik.

ERD ini dirancang agar memudahkan penerapan Row Level Security (RLS) yang merupakan fitur keamanan penting dalam PostgreSQL. Setiap entitas yang menyimpan data pengguna memiliki kolom \`owner\` atau \`recipient\` yang mengidentifikasi pemilik atau penerima data, sehingga policy RLS dapat ditulis secara deklaratif. Sebagai contoh, policy untuk tabel \`articles\` memastikan bahwa pengguna hanya dapat membaca artikel yang published atau artikel mereka sendiri, sementara policy untuk tabel \`comments\` memastikan bahwa pengguna hanya dapat mengedit atau menghapus komentar mereka sendiri.

Penerapan RLS dilakukan melalui policy yang didefinisikan menggunakan SQL dan diterapkan pada level tabel. Policy ini dievaluasi setiap kali query dijalankan, memastikan bahwa pengguna hanya dapat mengakses data yang diizinkan untuk mereka akses. Sebagai contoh, policy untuk tabel \`profiles\` memastikan bahwa pengguna dapat membaca profil publik semua pengguna, tetapi hanya dapat mengedit profil mereka sendiri. Policy untuk tabel \`admin_activity_logs\` memastikan bahwa hanya admin yang dapat membaca log aktivitas, sementara pengguna biasa tidak dapat mengakses data ini sama sekali.

Penambahan entitas \`admin_activity_logs\` dilakukan setelah sesi audit keamanan yang dilakukan oleh tim keamanan eksternal. Audit ini mengidentifikasi bahwa histori tindakan moderator perlu dilacak secara permanen untuk memenuhi persyaratan compliance dan memudahkan investigasi jika terjadi masalah. Entitas ini dirancang untuk menyimpan informasi lengkap tentang setiap tindakan yang dilakukan oleh admin atau moderator, termasuk siapa yang melakukan tindakan, kapan tindakan dilakukan, apa yang dilakukan, dan data sebelum dan sesudah perubahan jika relevan.

Struktur ERD juga mempertimbangkan kebutuhan skalabilitas di masa depan. Setiap entitas dirancang dengan mempertimbangkan pola pertumbuhan data yang diharapkan, dan relasi antar entitas dirancang untuk meminimalkan join yang kompleks yang dapat memperlambat query. Sebagai contoh, relasi antara \`articles\` dan \`article_likes\` menggunakan tabel junction \`article_likes\` yang memungkinkan query yang efisien untuk menghitung jumlah like tanpa perlu join yang kompleks.

ERD juga mencakup constraint yang memastikan integritas data, termasuk foreign key constraint untuk memastikan referensial integrity, check constraint untuk memastikan nilai data dalam rentang yang valid, dan unique constraint untuk memastikan keunikan data tertentu. Sebagai contoh, constraint pada tabel \`articles\` memastikan bahwa slug artikel harus unik, sementara constraint pada tabel \`article_likes\` memastikan bahwa seorang pengguna hanya dapat memberikan like sekali pada setiap artikel.

Dengan ERD yang komprehensif ini, tim dapat dengan cepat menurunkan blueprint migrasi database yang detail, termasuk definisi tabel, indeks, constraint, trigger, dan function. ERD ini juga menjadi dasar untuk pembuatan diagram kelas dalam tahap perancangan detail, di mana setiap entitas dalam ERD akan direpresentasikan sebagai kelas dalam diagram kelas. Dokumentasi ERD ini memastikan bahwa seluruh tim memiliki pemahaman yang sama tentang struktur data sistem, sehingga mengurangi risiko kesalahan implementasi dan memudahkan proses maintenance di masa depan.

#  BAB 5 PERANCANGAN SISTEM

Perancangan sistem berisi rancangan-rancangan sistem yang mempermudah proses pengembangan agar lebih efektif. Bab ini berisi rancangan struktur kelas yaitu class diagram, desain alur sistem dari sequence diagram, dan rancangan basis data berupa Physical Database Design (PDD).

## 5.1 Class Diagram

Dalam perancangan class diagram pada platform PaberLand, menghasilkan beberapa class diagram yang menggambarkan struktur komponen sistem. Class diagram disusun berdasarkan arsitektur Next.js dengan App Router yang menggunakan komponen React, API Routes, dan integrasi dengan Supabase.

### 5.1.1 Class Diagram Komponen Frontend

![[]{#_Toc215958745 .anchor}Gambar 5.1 Rancangan Class Diagram Komponen Frontend](docs/skripsi/media/image103.png){width="9.310416666666667in" height="4.847916666666666in"}

Diagram ini menggambarkan struktur komponen React yang digunakan di frontend platform PaberLand. Class diagram frontend terdiri dari komponen-komponen utama meliputi:

1.  Layout Components: Header, Footer, Sidebar yang digunakan di seluruh halaman

2.  Article Components: ArticleCard, ArticleDetail, ArticleList untuk menampilkan artikel

3.  Editor Components: WriteArticleForm, TinyMCEEditor untuk penulisan artikel

4.  Comment Components: CommentList, CommentItem, CommentForm untuk sistem komentar

5.  Profile Components: ProfileCard, ProfileEdit untuk manajemen profil

6.  Admin Components: AdminSidebar, UserManagement, ContentModeration untuk panel admin

7.  Auth Components: LoginForm, RegisterForm untuk autentikasi pengguna

Setiap komponen memiliki props yang didefinisikan dengan TypeScript interface untuk memastikan type safety. Komponen-komponen ini saling berinteraksi melalui props passing dan context API untuk state management global seperti autentikasi.

### 5.1.2 Class Diagram API Routes dan Services

![[]{#_Toc215958746 .anchor}Gambar 5.2 Rancangan Class Diagram API Routes dan Services](docs/skripsi/media/image104.png){width="9.333333333333334in" height="2.4375in"}

Diagram ini menggambarkan struktur API Routes dan service layer yang menghubungkan frontend dengan backend Supabase. Class diagram backend terdiri dari:

1.  API Route Handlers: Artikel API, User API, Comment API, Like API, Report API, Admin API

2.  Service Classes: ArticleService, UserService, CommentService, NotificationService, AdminService

3.  Utility Classes: AuthHelper, ValidationHelper, ImageUploadHelper

4.  Database Models: TypeScript interfaces yang merepresentasikan struktur tabel database

Setiap API route handler menggunakan service class untuk melakukan operasi database melalui Supabase client. Service class mengabstraksi logika bisnis dan query database, sementara API route handler menangani HTTP request dan response.

### 5.1.3 Class Diagram Database Models

![[]{#_Toc215958747 .anchor}Gambar 5.3 Rancangan Class Diagram Database Models](docs/skripsi/media/image105.png){width="6.822784339457568in" height="5.007389545056868in"}

Diagram ini menggambarkan struktur model data yang merepresentasikan entitas dalam database PostgreSQL. Setiap model sesuai dengan tabel dalam ERD yang telah dibuat pada BAB 4. Model-model utama meliputi:

1.  Profile Model: Merepresentasikan tabel profiles dengan atribut id, full_name, bio, role, is_admin, dll.

2.  Article Model: Merepresentasikan tabel articles dengan atribut id, title, content, category, author_id, published, dll.

3.  Comment Model: Merepresentasikan tabel comments dengan atribut id, article_id, author_id, content, parent_id, dll.

4.  Like Model: Merepresentasikan tabel article_likes dengan atribut id, article_id, user_id

5.  Portfolio Model: Merepresentasikan tabel portfolio_works dengan atribut lengkap

7.  Notification Model: Merepresentasikan tabel notifications dengan atribut type, actor_id, target_id, dll.

8.  Report Model: Merepresentasikan tabel content_reports dengan atribut lengkap

9.  FeaturedContent Model: Merepresentasikan tabel featured_content

10. AdminActivityLog Model: Merepresentasikan tabel admin_activity_logs

11. Settings Model: Merepresentasikan tabel settings

Setiap model memiliki method untuk validasi, transformasi data, dan relasi dengan model lain sesuai dengan foreign key di database.

## 5.2 Sequence Diagram

Sequence diagram menjelaskan interaksi yang dilakukan antar objek satu sama lain dalam suatu urutan waktu tertentu. Dalam penelitian ini, pembuatan sequence diagram mengacu pada use case scenario yang telah dibuat pada BAB 4 dan class diagram yang telah dirancang. Sequence diagram menggambarkan alur komunikasi antara komponen frontend (React components), API routes, service layer, dan database (Supabase) untuk setiap use case utama.

### 5.2.1 Sequence Diagram Daftar Akun

Gambaran proses interaksi antar sistem saat pengunjung akan mendaftar akun baru dapat diamati pada Gambar 5.4. Sequence diagram ini menggambarkan alur registrasi dengan email verification.

![[]{#_Toc215958748 .anchor}Gambar 5.4 Sequence Diagram Daftar Akun](docs/skripsi/media/image106.png){width="3.611111111111111in" height="9.32638888888889in"}

Alur Proses:

1.  User membuka halaman \`/register\` dan melihat form registrasi

2.  User mengisi form dengan data: full_name, email, password, confirm_password, role

3.  RegisterForm component melakukan validasi client-side (email format, password match, password strength)

4.  User klik tombol \"Daftar\"

5.  RegisterForm memanggil AuthContext.signUp(userData)

6.  AuthContext memanggil Supabase Auth API signUp() dengan email, password, dan metadata (full_name, role)

7.  Supabase Auth membuat user baru di tabel auth.users dengan status email_confirmed=false

8.  Supabase Auth mengirim email verifikasi ke alamat email yang didaftarkan

9.  Trigger database \`handle_new_user()\` otomatis membuat record di tabel profiles dengan data dari metadata

10. Supabase Auth mengembalikan response dengan user data (tanpa session karena belum verified)

11. AuthContext menampilkan pesan sukses

12. RegisterForm menampilkan pesan \"Silakan cek email Anda untuk verifikasi akun\"

13. User membuka email dan mengklik link verifikasi

14. Link verifikasi mengarah ke halaman verifikasi dengan token

15. Sistem memanggil Supabase Auth API verifyEmail(token)

16. Supabase memverifikasi token dan mengaktifkan user (email_confirmed=true)

17. Sistem mengarahkan user ke halaman login dengan pesan \"Email berhasil diverifikasi, silakan login\"

### 5.2.2 Sequence Diagram Login

Gambaran proses interaksi antar sistem saat pengguna akan melakukan login dapat diamati pada Gambar 5.5. Sequence diagram login menggambarkan alur autentikasi menggunakan email/password atau Google OAuth melalui Supabase Auth.

![[]{#_Toc215958749 .anchor}Gambar 5.5 Sequence Diagram Login](docs/skripsi/media/image107.png){width="3.7326738845144356in" height="9.320875984251968in"}

Alur Proses:

1.  User membuka halaman login dan memasukkan email/password atau klik tombol \"Login dengan Google\"

2.  LoginForm component memanggil method signIn() dari AuthContext

3.  AuthContext memanggil Supabase Auth API (signInWithPassword atau signInWithOAuth)

4.  Supabase Auth memverifikasi kredensial dengan database auth.users

5.  Jika valid, Supabase mengembalikan session token dan user data

6.  AuthContext menyimpan session di localStorage dan mengupdate state

7.  LoginForm menerima callback success dan mengarahkan user ke halaman sesuai peran (dashboard untuk penulis, admin panel untuk admin)

8.  Jika kredensial tidak valid, Supabase mengembalikan error dan LoginForm menampilkan pesan error

### 5.2.3 Sequence Diagram Reset Password

Gambaran proses interaksi antar sistem saat pengguna akan mereset password yang lupa dapat diamati pada Gambar 5.6. Sequence diagram ini menggambarkan alur reset password dengan email verification.

![[]{#_Toc215958750 .anchor}Gambar 5.6 Sequence Diagram Reset Password](docs/skripsi/media/image108.png){width="2.6708333333333334in" height="9.329166666666667in"}

Alur Proses:

1.  User membuka halaman login dan klik link \"Lupa Password\"

2.  User diarahkan ke halaman \`/forgot-password\`

3.  User memasukkan email di ForgotPasswordForm

4.  User klik tombol \"Kirim Link Reset\"

5.  ForgotPasswordForm memanggil AuthContext.resetPassword(email)

6.  AuthContext memanggil Supabase Auth API resetPasswordForEmail(email)

7.  Supabase Auth memverifikasi email terdaftar di database

8.  Supabase Auth membuat reset token dan mengirim email berisi link reset password (valid 24 jam)

9.  Supabase Auth mengembalikan response sukses (meskipun email tidak terdaftar, untuk security)

10. ForgotPasswordForm menampilkan pesan \"Jika email terdaftar, link reset password telah dikirim\"

11. User membuka email dan mengklik link reset password

12. Link mengarah ke halaman \`/reset-password?token=xxx\` dengan token di query parameter

13. User memasukkan password baru dan konfirmasi password di ResetPasswordForm

14. User klik tombol \"Reset Password\"

15. ResetPasswordForm memanggil AuthContext.updatePassword(token, newPassword)

16. AuthContext memanggil Supabase Auth API updateUser() dengan token dan password baru

17. Supabase Auth memverifikasi token (masih valid dan tidak expired)

18. Supabase Auth memperbarui password di tabel auth.users

19. Supabase Auth mengembalikan response sukses

20. AuthContext menampilkan pesan sukses

21. ResetPasswordForm mengarahkan user ke halaman login dengan pesan \"Password berhasil direset, silakan login\"

### 5.2.4 Sequence Diagram Melihat Beranda

Gambaran proses interaksi antar sistem saat pengguna akan melihat halaman beranda dapat diamati pada Gambar 5.7. Sequence diagram ini menggambarkan alur loading homepage dengan featured content, latest articles, dan kategori.

![[]{#_Toc215958751 .anchor}Gambar 5.7 Sequence Diagram Melihat Beranda](docs/skripsi/media/image109.png){width="3.1180555555555554in" height="9.319444444444445in"}

Alur Proses:

1.  User membuka halaman beranda \`/\` (homepage)

2.  HomePage component dimuat dan menampilkan loading state

3.  HomePage secara paralel memanggil beberapa service:

- ArticleService.getFeaturedArticles() untuk konten pilihan

- ArticleService.getLatestArticles(limit=10) untuk artikel terbaru

- CategoryService.getCategories() untuk daftar kategori

4.  ArticleService.getFeaturedArticles() memanggil API route \`/api/articles/featured\`

5.  API route melakukan query ke tabel featured_content dengan active=true, diurutkan berdasarkan priority DESC

6.  API route melakukan JOIN dengan tabel articles untuk mendapatkan data lengkap artikel

7.  API route mengembalikan array featured articles (maksimal 10)

8.  ArticleService.getLatestArticles() memanggil API route \`/api/articles?published=true&limit=10&sort=created_at DESC\`

9.  API route melakukan query ke tabel articles dengan published=true, diurutkan berdasarkan created_at DESC

10. API route mengembalikan array latest articles

11. CategoryService.getCategories() memanggil API route \`/api/categories\`

12. API route melakukan query ke tabel categories dengan statistik (jumlah artikel per kategori)

13. API route mengembalikan array categories dengan statistik

14. HomePage menerima semua response dan memperbarui state

15. HomePage menampilkan:

- Hero section dengan featured content (jika ada)

- Section \"Artikel Terbaru\" dengan latest articles

- Section \"Kategori\" dengan daftar kategori dan statistik

16. Jika user sudah login, HomePage juga memuat rekomendasi artikel berdasarkan kategori yang disukai

### 5.2.5 Sequence Diagram Melihat Kategori

Gambaran proses interaksi antar sistem saat pengguna akan melihat halaman detail kategori dapat diamati pada Gambar 5.8. Sequence diagram ini menggambarkan alur kategori dengan statistik dan daftar artikel.

![[]{#_Toc215958752 .anchor}Gambar 5.8 Sequence Diagram Melihat Kategori](docs/skripsi/media/image110.png){width="2.8472222222222223in" height="9.32638888888889in"}

Alur Proses:

1.  User membuka halaman kategori melalui URL \`/kategori/\[slug\]\` (contoh: \`/kategori/cerpen\`)

2.  CategoryDetailPage component dimuat dan menampilkan loading state

3.  CategoryDetailPage memanggil CategoryService.getCategoryBySlug(slug)

4.  CategoryService memanggil API route \`/api/categories/\[slug\]\` dengan method GET

5.  API route melakukan query ke tabel categories berdasarkan slug

6.  API route menghitung statistik kategori:

- COUNT artikel dengan kategori tersebut dan published=true

- SUM views dari artikel kategori tersebut

- SUM likes_count dari artikel kategori tersebut

- SUM comments_count dari artikel kategori tersebut

7.  API route mengembalikan response dengan data kategori dan statistik

8.  CategoryDetailPage menampilkan header kategori dengan:

- Nama kategori dengan ikon

- Deskripsi kategori

- Statistik: Jumlah Konten, Total Views, Total Likes, Total Komentar

9.  CategoryDetailPage memanggil ArticleService.getArticlesByCategory(categoryId, sort=\'latest\', page=1)

10. CategoryService memanggil API route \`/api/articles?category=\[category\]&published=true&sort=\[sort\]&page=\[page\]\`

11. API route melakukan query ke tabel articles dengan:

- Filter: category = categorySlug, published = true

- Sort berdasarkan parameter (latest, oldest, popular, most_liked)

- Pagination (limit 20 per halaman)

12. API route melakukan JOIN dengan profiles untuk mendapatkan data penulis

13. API route mengembalikan response dengan array artikel dan pagination info

14. CategoryDetailPage menampilkan:

- Dropdown sorting: Terbaru, Terlama, Terpopuler, Paling Disukai

- Daftar artikel dengan card layout (judul, penulis, tanggal, views, likes, excerpt)

- Pagination controls

- Tombol \"Tulis \[Nama Kategori\]\" untuk mendorong partisipasi

15. User dapat mengubah sorting dan halaman akan refresh dengan data baru

16. User dapat mengklik artikel untuk melihat detail

### 5.2.6 Sequence Diagram Baca Artikel

Gambaran proses interaksi antar sistem saat pengguna akan membaca artikel secara lengkap dapat diamati pada Gambar 5.9. Sequence diagram ini menggambarkan alur membaca artikel dengan konten, penulis, komentar, dan artikel terkait.

![[]{#_Toc215958753 .anchor}Gambar 5.9 Sequence Diagram Baca Artikel](docs/skripsi/media/image111.png){width="3.0444444444444443in" height="9.329166666666667in"}

Alur Proses:

1.  User klik artikel dari beranda, kategori, atau hasil pencarian

2.  Sistem mengarahkan ke halaman detail artikel melalui URL \`/article/\[slug\]\`

3.  ArticleDetailPage component dimuat dan menampilkan loading state

4.  ArticleDetailPage memanggil \`getArticle(slug)\` untuk mengambil data artikel lengkap

5.  Sistem melakukan query ke tabel \`articles\` berdasarkan slug dengan filter \`published=true\`

6.  Sistem melakukan JOIN dengan tabel \`profiles\` untuk mendapatkan data penulis lengkap

7.  Sistem memverifikasi artikel ditemukan dan berstatus published

8.  Jika artikel valid, sistem secara paralel memanggil:

- Memuat Artikel Terkait: \`getRelatedArticles(articleId, category)\`

- Query ke tabel \`articles\` dengan \`category = article.category\`, \`id != articleId\`, \`published=true\`

- Diurutkan berdasarkan views DESC

- Limit 4 artikel

- Memuat Jumlah Komentar: \`getCommentCount(articleId)\`

- COUNT komentar dari tabel \`comments\` dengan \`article_id = articleId\`

9.  Sistem menambah nilai view count artikel menggunakan \`incrementViews(articleId)\`

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

### 5.2.7 Sequence Diagram Cari Konten

Gambaran proses interaksi antar sistem saat pengguna akan mencari artikel dan member berdasarkan keyword dapat diamati pada Gambar 5.10. Sequence diagram ini menggambarkan alur pencarian full-text dengan filter dan pagination.

![[]{#_Toc215958754 .anchor}Gambar 5.10 Sequence Diagram Melihat Detail Artikel](docs/skripsi/media/image112.png){width="2.202777777777778in" height="9.310416666666667in"}

Alur Proses:

1.  User memasukkan keyword di search bar atau membuka halaman \`/search\`

2.  Sistem menampilkan halaman pencarian dengan form search

3.  User memasukkan keyword dan klik tombol Cari atau tekan Enter

4.  SearchPage component memanggil \`performSearch(keyword, type=\'all\', category, page)\`

5.  SearchService memanggil API route \`/api/search\` dengan query parameters:

- \`q\`: keyword pencarian

- \`type\`: \'all\', \'articles\', atau \'authors\'

- \`category\`: kategori filter (opsional)

- \`page\`: halaman saat ini

- \`limit\`: jumlah hasil per halaman (default 10)

6.  API route melakukan validasi keyword minimal 2 karakter

7.  Jika type=\'all\' atau type=\'articles\':

- API route melakukan query ke tabel \`articles\` dengan:

- Filter: \`published=true\`

- Full-text search: \`title ILIKE %keyword%\` OR \`excerpt ILIKE %keyword%\` OR \`content ILIKE %keyword%\`

- Filter kategori jika dipilih

- Sort: \`created_at DESC\`

- Pagination: \`LIMIT 10 OFFSET (page-1)\*10\`

- API route melakukan JOIN dengan tabel \`profiles\` untuk mendapatkan data penulis

8.  Jika type=\'all\' atau type=\'authors\':

- API route melakukan query ke tabel \`profiles\` dengan:

- Full-text search: \`full_name ILIKE %keyword%\` OR \`bio ILIKE %keyword%\`

- Sort: \`full_name ASC\`

<!-- -->

- Limit: maksimal 100 hasil (frontend menampilkan 6 per halaman)

9.  API route menghitung total hasil untuk pagination

10. API route mengembalikan response dengan:

- Array artikel (jika ada)

- Array member (jika ada)

- Total count untuk artikel dan member

- Pagination info (currentPage, totalPages)

11. SearchService memperbarui state dengan hasil pencarian

12. SearchPage menampilkan hasil pencarian dengan:

- Filter tabs: All, Articles, Members

<!-- -->

- Hasil artikel dengan highlight keyword (jika ditemukan)

- Hasil member dengan highlight keyword (jika ditemukan)

- Pagination controls

- Summary: jumlah artikel dan member ditemukan

13. User dapat mengklik hasil untuk melihat detail artikel atau profil member

14. User dapat mengubah filter (All/Articles/Members) dan hasil akan di-refresh

15. User dapat mengubah halaman pagination untuk melihat hasil lebih banyak

### 5.2.8 Sequence Diagram Tulis Artikel Baru

Gambaran proses interaksi antar sistem saat penulis akan menulis dan menyimpan artikel baru dapat diamati pada Gambar 5.11. Sequence diagram ini menggambarkan alur penulisan artikel dengan editor TinyMCE, auto-save draft, dan upload cover image.

![[]{#_Toc215958755 .anchor}Gambar 5.11 Sequence Diagram Tulis Artikel Baru](docs/skripsi/media/image112.png){width="2.1979166666666665in" height="9.311111111111112in"}

Alur Proses:

1.  Penulis klik tombol \"Tulis Konten Baru\" atau membuka halaman \`/write\`

2.  Sistem memverifikasi user sudah login dengan role member atau lebih tinggi

3.  WriteArticleForm component dimuat dan memanggil \`loadEditor()\`

4.  Sistem memuat editor TinyMCE dengan konfigurasi lengkap

5.  Sistem memuat daftar kategori dari database

6.  Sistem menampilkan halaman editor dengan form kosong

7.  Penulis mengisi form artikel (judul, kategori, konten)

8.  Sistem memvalidasi input secara real-time pada judul, kategori, dan konten

9.  Penulis menulis konten di editor TinyMCE

10. Sistem melakukan auto-save draft setiap 30 detik atau setelah user berhenti mengetik selama 3 detik:

- WriteArticleForm memanggil \`autoSaveDraft(articleData)\`

- Sistem menyimpan draft sementara di localStorage sebagai backup

- Jika artikel baru (belum ada id), sistem melakukan INSERT ke tabel \`articles\` dengan \`published=false\`

- Jika artikel existing (sudah ada id), sistem melakukan UPDATE ke tabel \`articles\`

- Sistem menampilkan indikator \"Draft tersimpan\" (fade in/out, 2 detik)

11. Jika penulis mengunggah cover image (opsional):

- Penulis memilih file gambar

- Sistem memvalidasi format dan ukuran gambar

- Sistem mengunggah gambar ke Supabase Storage bucket \'article-covers\'

- Sistem menampilkan preview gambar setelah upload berhasil

12. Penulis klik tombol \"Simpan sebagai Draft\" atau \"Publikasikan\"

13. Sistem memvalidasi keseluruhan form artikel (judul, konten, kategori wajib diisi)

14. Jika memilih \"Simpan sebagai Draft\":

- Sistem menyimpan artikel dengan \`published=false\`

- Sistem menampilkan notifikasi sukses

- Penulis dapat melanjutkan menulis artikel kapan saja

15. Jika memilih \"Publikasikan\":

- Sistem menyimpan artikel dengan \`published=true\`

- Sistem menampilkan notifikasi sukses

- Sistem mengarahkan penulis ke halaman detail artikel yang baru dipublikasikan

- Proses auto-save berhenti

### 5.2.9 Sequence Diagram Publikasikan Artikel

Gambaran proses interaksi antar sistem saat penulis akan mempublikasikan artikel agar dapat diakses oleh pengguna lain dapat diamati pada Gambar 5.12. Sequence diagram ini menggambarkan alur publikasi artikel dengan validasi, generate slug, dan notifikasi.

![[]{#_Toc215958756 .anchor}Gambar 5.12 Sequence Diagram Publikasikan Artikel](docs/skripsi/media/image113.png){width="2.3375in" height="9.325694444444444in"}

Alur Proses:

1.  Penulis klik tombol \"Publikasikan\" di editor

2.  WriteArticleForm component memanggil \`validateArticle(articleData)\` untuk memvalidasi artikel:

- Validasi judul tidak kosong

- Validasi kategori valid

- Validasi konten minimal 100 kata

- Validasi slug unik

3.  Jika validasi berhasil, sistem memanggil \`publishArticle(articleData)\`

4.  Sistem menghasilkan slug dari judul artikel menggunakan \`generateSlug(title)\`:

- Mengkonversi judul ke lowercase

- Menghapus karakter khusus

- Mengganti spasi dengan tanda hubung

5.  Sistem melakukan pengecekan slug unik di database:

- Query ke tabel \`articles\` untuk memeriksa apakah slug sudah ada

- Jika slug sudah ada, sistem menambahkan angka di akhir slug (contoh: \`judul-artikel-2\`)

- Proses diulang hingga mendapatkan slug yang unik

6.  Sistem menyimpan artikel dengan status published:

- INSERT/UPDATE ke tabel \`articles\` dengan \`published=true\`

- Mencatat timestamp \`published_at\` dengan nilai \`NOW()\`

- Menyimpan slug unik yang telah di-generate

7.  Sistem mengirim notifikasi ke penulis menggunakan \`sendNotification(userId, \'article_published\')\`

8.  Sistem menampilkan notifikasi sukses publikasi

9.  Sistem mengarahkan penulis ke halaman detail artikel yang baru dipublikasikan melalui URL \`/article/\[slug\]\`

### 5.2.10 Sequence Diagram Edit Artikel

Gambaran proses interaksi antar sistem saat penulis akan mengubah dan memperbarui artikel yang telah dibuat dapat diamati pada Gambar 5.13. Sequence diagram ini menggambarkan alur edit artikel dengan loading data, validasi real-time, auto-save, dan update artikel.

![[]{#_Toc215958757 .anchor}Gambar 5.13 Sequence Diagram Edit Artikel](docs/skripsi/media/image114.png){width="2.4652777777777777in" height="9.325694444444444in"}

Alur Proses:

1.  Penulis membuka halaman \`/write?edit=article_id\` atau \`/my-articles\` dan klik tombol edit

2.  WritePage component memanggil \`loadArticleForEdit(articleId)\` untuk memuat artikel yang akan diedit

3.  Sistem memanggil \`getArticleForEdit(articleId, userId)\` untuk mengambil data artikel:

- Query ke tabel \`articles\` dengan kondisi \`id=? AND author_id=?\` untuk memastikan artikel milik penulis

- Verifikasi ownership artikel sebelum mengizinkan edit

  1.  Jika artikel ditemukan dan milik penulis, sistem memuat editor dengan data artikel:

<!-- -->

- Initialize form dengan data artikel (title, content, category, excerpt, cover_image)

- Initialize TinyMCE editor dengan konten artikel

- Tampilkan status artikel saat ini (draft atau published)

  1.  Sistem menampilkan form yang sudah terisi dengan data artikel dan editor TinyMCE dengan konten artikel

  2.  Penulis mengubah konten artikel (judul, konten, kategori, dll.)

  3.  Sistem memvalidasi perubahan secara real-time menggunakan \`validateInput(changes)\`:

<!-- -->

- Validasi format input

- Validasi panjang konten

- Update state dengan perubahan

  1.  Sistem melakukan auto-save perubahan:

<!-- -->

- Simpan draft sementara di localStorage sebagai backup

- Panggil \`autoSaveDraft(articleId, changes)\` untuk menyimpan ke database

- Update artikel di database dengan \`updated_at=NOW()\`

- Tampilkan indikator \"Draft tersimpan\" kepada penulis

  1.  Penulis klik tombol \"Simpan Perubahan\" atau \"Perbarui\"

  2.  Sistem memvalidasi seluruh form artikel menggunakan \`validateForm(articleData)\`:

<!-- -->

- Validasi judul tidak kosong

- Validasi kategori valid

- Validasi konten minimal 100 kata

  1.  Setelah validasi berhasil, sistem memperbarui artikel di database:

<!-- -->

- Panggil \`updateArticle(articleId, userId, updates)\` dengan data perubahan

- UPDATE ke tabel \`articles\` dengan kondisi \`id=? AND author_id=?\`

- Update field: title, content, excerpt, category, cover_image, updated_at

14. Sistem mencatat timestamp \`updated_at\` dengan nilai \`NOW()\`

15. Sistem menampilkan notifikasi sukses \"Artikel berhasil diperbarui\"

16. Sistem mengarahkan penulis ke halaman detail artikel yang telah diperbarui

### 5.2.11 Sequence Diagram Hapus Artikel

Gambaran proses interaksi antar sistem saat penulis akan menghapus artikel miliknya dari sistem dapat diamati pada Gambar 5.14. Sequence diagram ini menggambarkan alur penghapusan artikel dengan konfirmasi modal, validasi ownership, dan penghapusan data terkait.

![[]{#_Toc215958758 .anchor}Gambar 5.14 Sequence Diagram Hapus Artikel](docs/skripsi/media/image115.png){width="2.2909722222222224in" height="9.325694444444444in"}

Alur Proses:

1.  Penulis membuka halaman \`/my-articles\` atau halaman detail artikel miliknya

2.  Sistem menampilkan daftar artikel beserta tombol Hapus untuk setiap artikel

3.  Penulis menekan tombol Hapus pada artikel yang ingin dihapus

4.  Sistem menampilkan modal konfirmasi dengan peringatan \"Apakah Anda yakin ingin menghapus konten ini? Tindakan ini tidak dapat dibatalkan\"

5.  Penulis mengonfirmasi penghapusan dengan klik tombol \"Hapus\" di modal

6.  Sistem memanggil \`deleteArticle(articleId, userId)\` untuk memvalidasi bahwa artikel adalah milik penulis:

- Query ke tabel \`articles\` dengan kondisi \`id=? AND author_id=?\` untuk memastikan artikel milik penulis

- Verifikasi ownership sebelum melakukan penghapusan

7.  Setelah validasi berhasil, sistem menghapus artikel dari database:

- Query untuk mendapatkan path cover image (jika ada)

- DELETE dari tabel \`articles\` dengan kondisi \`id=? AND author_id=?\`

- Database secara otomatis menghapus data terkait melalui ON DELETE CASCADE:

<!-- -->

- Semua komentar terkait (comments.article_id)

- Semua like terkait (article_likes.article_id)

- Semua laporan terkait (content_reports.content_id)

- Featured content jika ada (featured_content.content_id)

- Notifikasi terkait (notifications.article_id)

8.  Sistem menghapus cover image dari storage jika tersedia:

- Panggil \`deleteImage(cover_image_path)\` untuk menghapus file dari storage bucket

- Hanya dilakukan jika artikel memiliki cover image

9.  Sistem mencatat aktivitas penghapusan (jika menggunakan activity logs)

10. Sistem menampilkan notifikasi berhasil \"Konten berhasil dihapus\"

11. Sistem mengarahkan penulis ke halaman \`/my-articles\` dengan daftar artikel yang telah diperbarui

### 5.2.12 Sequence Diagram Kelola Artikel Saya

Gambaran proses interaksi antar sistem saat penulis akan melihat, memfilter, mengedit, dan menghapus artikel miliknya dapat diamati pada Gambar 5.15. Sequence diagram ini menggambarkan alur pengelolaan artikel dengan loading, filtering, pagination, dan statistik.

![[]{#_Toc215958759 .anchor}Gambar 5.15 Sequence Diagram Kelola Artikel Saya](docs/skripsi/media/image116.png){width="3.1840277777777777in" height="9.327777777777778in"}

Alur Proses:

1.  Penulis membuka halaman \`/my-articles\`

2.  MyArticlesPage component memanggil \`loadUserArticles(userId)\` untuk memuat daftar artikel milik penulis

3.  Sistem melakukan dua operasi secara bersamaan (concurrent) menggunakan \`Promise.all()\`:

- Load Articles: Memanggil \`getUserArticles(userId, page, limit, search, category, status)\` untuk mengambil artikel dengan:

<!-- -->

- Filter berdasarkan status (all, draft, published)

- Filter berdasarkan kategori (jika dipilih)

- Filter berdasarkan search query (jika ada)

- Pagination (page, limit)

- Query ke tabel \`articles\` dengan kondisi \`author_id=?\` dan filter yang diterapkan

<!-- -->

- Load Stats: Memanggil \`getUserStats(userId)\` untuk mengambil statistik artikel:

<!-- -->

- Total artikel

- Jumlah artikel published

- Jumlah artikel draft

- Total views, likes, dan comments

  1.  Setelah data dimuat, sistem menampilkan daftar artikel dalam bentuk tabel atau list dengan informasi:

<!-- -->

- Judul artikel

- Kategori

- Status (draft/published)

- Tanggal update

- Metrik (views, likes, comments)

  1.  Sistem menampilkan filter artikel (All, Draft, Published) untuk memfilter artikel berdasarkan status

  2.  Sistem menampilkan statistik artikel (total artikel, jumlah published, jumlah draft) dalam bentuk kartu statistik

  3.  Sistem menampilkan tombol \"Tulis Baru\" yang mengarahkan ke halaman \`/write\`

  4.  Sistem menampilkan aksi per artikel berupa:

<!-- -->

- Lihat: Preview artikel

- Edit: Mengarahkan ke \`/write?edit=article_id\`

- Hapus: Menampilkan modal konfirmasi dan menghapus artikel

### 5.2.13 Sequence Diagram Like Artikel

Gambaran proses interaksi antar sistem saat pengguna akan memberikan atau membatalkan like pada artikel dapat diamati pada Gambar 5.16. Sequence diagram ini menggambarkan alur like/unlike artikel dengan pengecekan status, update database, dan sinkronisasi likes count.

![[]{#_Toc215958760 .anchor}Gambar 5.16 Sequence Diagram Memberi Like Artikel](docs/skripsi/media/image117.png){width="2.96875in" height="9.322916666666666in"}

Alur Proses:

1.  Pengguna membuka halaman detail artikel

2.  ArticleDetailPage component memanggil \`checkUserLike(articleId, userId)\` untuk memeriksa apakah pengguna sudah pernah menyukai artikel tersebut:

- Query ke tabel \`article_likes\` dengan kondisi \`article_id=? AND user_id=?\`

- Mengembalikan status like pengguna (true/false)

  1.  Sistem menampilkan tombol like beserta jumlah like saat ini berdasarkan status yang diperoleh

  2.  Pengguna menekan tombol \"Like\"

  3.  ArticleDetailPage component memanggil \`toggleLike(articleId, userId)\` untuk toggle status like

  4.  Sistem memeriksa apakah pengguna sudah pernah menyukai artikel tersebut:

<!-- -->

- Query ke tabel \`article_likes\` untuk memeriksa existing like

  1.  Jika belum pernah like:

- Sistem menambahkan data ke tabel \`article_likes\` dengan INSERT

- Database trigger \`update_article_likes_count\` secara otomatis memperbarui \`likes_count\` pada tabel \`articles\` dengan menambahkan 1

- Sistem memanggil \`syncLikesCount(articleId)\` untuk memastikan likes count sinkron

- Sistem mengembalikan success dengan \`isLiked: true\`

- Sistem menampilkan animasi like, memperbarui jumlah like di UI, dan menampilkan notifikasi sukses \"Artikel ditambahkan ke favorit!\"

  1.  Jika sudah pernah like (Unlike):

<!-- -->

- Sistem menghapus data dari tabel \`article_likes\` dengan DELETE

- Database trigger \`update_article_likes_count\` secara otomatis memperbarui \`likes_count\` pada tabel \`articles\` dengan mengurangi 1

- Sistem memanggil \`syncLikesCount(articleId)\` untuk memastikan likes count sinkron

- Sistem mengembalikan success dengan \`isLiked: false\`

- Sistem memperbarui UI dan menampilkan notifikasi sukses \"Artikel dihapus dari favorit!\"

### 5.2.14 Sequence Diagram Komentar Artikel

Gambaran proses interaksi antar sistem saat pengguna akan menambahkan, membalas, mengedit, dan menghapus komentar pada artikel dapat diamati pada Gambar 5.17. Sequence diagram ini menggambarkan alur komentar artikel dengan validasi, penyimpanan, dan update comments count.

![[]{#_Toc215958761 .anchor}Gambar 5.17 Sequence Diagram Komentar Artikel](docs/skripsi/media/image118.png){width="4.226388888888889in" height="9.32986111111111in"}

Alur Proses:

1.  Pengguna membuka halaman detail artikel

2.  ArticleDetailPage component memanggil \`getArticleComments(articleId)\` untuk memuat daftar komentar:

- Query ke tabel \`comments\` dengan kondisi \`article_id=?\`

- Mengembalikan komentar dalam struktur nested (parent-child) untuk reply

  1.  Sistem menampilkan form komentar dan daftar komentar yang sudah ada

  2.  Pengguna mengetik komentar pada form komentar dan menekan tombol \"Kirim\"

  3.  ArticleDetailPage component memanggil \`validateComment(content)\` untuk memvalidasi isi komentar:

<!-- -->

- Validasi content tidak kosong (trimmed)

- Validasi content tidak melebihi 1000 karakter

  1.  Setelah validasi berhasil, sistem memanggil \`addComment(articleId, userId, content)\` untuk menyimpan komentar:

<!-- -->

- INSERT ke tabel \`comments\` dengan \`article_id\`, \`author_id\`, \`content\`, dan \`parent_id\` (null untuk komentar utama)

  1.  Sistem memanggil \`updateArticleCommentCount(articleId)\` untuk memperbarui jumlah komentar:

- Query COUNT dari tabel \`comments\` untuk artikel tersebut

- UPDATE tabel \`articles\` dengan \`comments_count\` yang baru

  1.  Sistem menampilkan komentar baru di halaman artikel dan memperbarui jumlah komentar (comments count)

### 5.2.15 Sequence Diagram Laporkan Konten

Gambaran proses interaksi antar sistem saat pengguna akan melaporkan artikel yang melanggar aturan dapat diamati pada Gambar 5.18. Sequence diagram ini menggambarkan alur pelaporan konten dengan validasi, pengecekan duplikasi, dan penyimpanan laporan.

![[]{#_Toc215958762 .anchor}Gambar 5.18 Sequence Diagram Laporkan Konten](docs/skripsi/media/image119.png){width="2.783333333333333in" height="9.320833333333333in"}

Alur Proses Tambah Portofolio:

1.  Pengguna membuka halaman detail artikel dan melihat tombol \"Laporkan\"

2.  Pengguna menekan tombol \"Laporkan\"

3.  Sistem menampilkan modal form laporan dengan pilihan alasan:

- Spam

- Konten tidak pantas

- Pelecehan

- Pelanggaran hak cipta

- Lainnya

  1.  Pengguna memilih alasan laporan

  2.  Sistem memvalidasi alasan menggunakan \`validateReason(reason)\` untuk memastikan alasan dipilih

  3.  Pengguna mengisi detail laporan (opsional) untuk memberikan konteks tambahan

  4.  Sistem memvalidasi detail laporan (jika diisi)

  5.  Pengguna menekan tombol \"Kirim Laporan\"

  6.  Sistem memanggil \`submitReport(contentType, contentId, reason, description)\` untuk menyimpan laporan

  7.  Sistem memeriksa apakah pengguna sudah pernah melaporkan artikel yang sama:

<!-- -->

- Query ke tabel \`content_reports\` dengan kondisi \`reporter_id=? AND content_type=? AND content_id=?\`

- Jika sudah ada, sistem menampilkan pesan \"Anda sudah melaporkan artikel ini\"

  1.  Jika laporan baru, sistem memverifikasi user profile:

  2.  Query ke tabel \`profiles\` untuk memastikan user profile valid

  3.  Setelah verifikasi berhasil, sistem menyimpan laporan ke database:

<!-- -->

- INSERT ke tabel \`content_reports\` dengan \`reporter_id\`, \`content_type\`, \`content_id\`, \`reason\`, \`description\`, dan \`status=\'pending\'\`

  1.  Sistem menampilkan notifikasi sukses \"Laporan berhasil dikirim! Tim moderasi akan meninjau dalam 24 jam\"

  2.  Sistem menutup modal dan mereset form

### 5.2.16 Sequence Diagram Tinjau Laporan Konten (Moderator)

Gambaran proses interaksi antar sistem saat moderator akan meninjau, menerima, atau menolak laporan konten dari pengguna dapat diamati pada Gambar 5.19. Sequence diagram ini menggambarkan alur tinjau laporan dengan filter, detail laporan, dan keputusan moderator.

![[]{#_Toc215958763 .anchor}Gambar 5.19 Sequence Diagram Tinjau Laporan Konten (Moderator)](docs/skripsi/media/image120.png){width="2.5569444444444445in" height="9.320833333333333in"}

Alur Proses:

1.  Moderator membuka halaman \`/admin/reports\`

2.  AdminReportsPage component memanggil \`getReports(filter)\` untuk memuat daftar laporan:

- Query ke tabel \`content_reports\` dengan filter status (All, Pending, Resolved, Rejected)

- Sorting berdasarkan \`created_at DESC\` untuk menampilkan laporan terbaru

  1.  Sistem menampilkan daftar laporan dengan filter All, Pending, Resolved, dan Rejected

  2.  Moderator memilih salah satu laporan untuk ditinjau

  3.  Sistem memanggil \`getReportDetails(reportId)\` untuk memuat detail laporan lengkap:

<!-- -->

- Query ke tabel \`content_reports\` untuk mendapatkan detail laporan

- Jika \`content_type=\'article\'\`, query ke tabel \`articles\` untuk mendapatkan detail artikel yang dilaporkan

  1.  Sistem menampilkan detail laporan lengkap beserta tombol aksi \"Terima\" dan \"Tolak\"

  2.  Moderator meninjau artikel yang dilaporkan dengan melihat preview artikel

  3.  Jika moderator menekan tombol \"Terima Laporan\":

<!-- -->

- Sistem memanggil \`resolveReport(reportId, adminId, \'resolved\', notes)\` untuk menyelesaikan laporan

- UPDATE ke tabel \`content_reports\` dengan \`status=\'resolved\'\`, \`reviewed_by=adminId\`, \`reviewed_at=NOW()\`, dan \`admin_notes\` (jika ada)

- Sistem mencatat aktivitas ke \`admin_activity_logs\` dengan action \`\'resolve_report\'\`

- Sistem mengirim notifikasi ke pelapor (jika diimplementasikan)

- Sistem menampilkan notifikasi sukses \"Laporan berhasil diselesaikan!\"

  1.  Jika moderator menekan tombol \"Tolak Laporan\":

<!-- -->

- Sistem memanggil \`resolveReport(reportId, adminId, \'dismissed\', notes)\` untuk menolak laporan

- UPDATE ke tabel \`content_reports\` dengan \`status=\'dismissed\'\`, \`reviewed_by=adminId\`, \`reviewed_at=NOW()\`, dan \`admin_notes\` (alasan penolakan)

- Sistem mencatat aktivitas ke \`admin_activity_logs\` dengan action \`\'resolve_report\'\` dan status \`\'dismissed\'\`

- Sistem mengirim notifikasi ke pelapor (jika diimplementasikan)

- Sistem menampilkan notifikasi sukses \"Laporan berhasil ditolak!\"

### 5.2.17 Sequence Diagram Case Tambah Konten Featured (Moderator)

Gambaran proses interaksi antar sistem saat moderator akan menambahkan artikel ke dalam konten featured di halaman utama dapat diamati pada Gambar 5.20. Sequence diagram ini menggambarkan alur tambah konten featured dengan validasi kuota, priority, dan penyimpanan.

![[]{#_Toc215958764 .anchor}Gambar 5.20 Sequence Diagram Tambah Konten Featured (Moderator)](docs/skripsi/media/image121.png){width="2.4625in" height="9.320833333333333in"}

Alur Proses:

1.  Moderator membuka halaman \`/admin/featured\`

2.  AdminFeaturedPage component memanggil \`getArticlesForAdmin(published)\` untuk memuat daftar artikel yang sudah dipublikasikan:

- Query ke tabel \`articles\` dengan kondisi \`published=true\`

- LEFT JOIN dengan tabel \`featured_content\` untuk menandai artikel yang sudah featured

  1.  Sistem menampilkan daftar konten featured saat ini dan form untuk menambah featured

  2.  Moderator memilih artikel dari daftar atau melalui pencarian

  3.  Sistem menampilkan daftar artikel yang dapat di-featured dengan badge \"🌟 Pilihan\" untuk artikel yang sudah featured

  4.  Moderator memilih artikel dan menekan tombol \"Tambah ke Featured\" atau \"Jadikan Pilihan\"

  5.  AdminFeaturedPage component memanggil \`addFeatured(articleId, priority?)\` untuk menambahkan featured

  6.  Sistem memvalidasi kuota slot featured maksimal 6 artikel:

<!-- -->

- Query COUNT ke tabel \`featured_content\` dengan kondisi \`content_type=\'article\' AND active=true\`

- Jika count \>= 6, sistem menampilkan pesan \"Kuota featured sudah penuh\"

  1.  Jika kuota belum penuh, sistem memeriksa apakah artikel sudah di-featured:

<!-- -->

- Query ke tabel \`featured_content\` dengan kondisi \`content_type=\'article\' AND content_id=?\`

- Jika sudah featured, sistem menampilkan pesan \"Artikel sudah di-featured\"

  1.  Jika artikel belum featured dan kuota tersedia, sistem meminta pengaturan priority opsional (1-10)

  2.  Sistem menyimpan data ke \`featured_content\`:

<!-- -->

- INSERT ke tabel \`featured_content\` dengan \`content_type=\'article\'\`, \`content_id\`, \`featured_by=adminId\`, \`priority\` (default 1 jika tidak diatur), dan \`active=true\`

  1.  Sistem mencatat aktivitas ke \`admin_activity_logs\` dengan action \`\'feature_content\'\`

  2.  Sistem menampilkan notifikasi sukses \"Konten berhasil dijadikan pilihan!\"

  3.  Sistem memperbarui daftar featured dengan refresh data

  4.  Artikel otomatis muncul di section \"Konten Pilihan\" pada homepage dengan urutan berdasarkan priority (semakin tinggi priority, semakin atas posisinya)

### 5.2.18 Sequence Diagram Kelola Pengguna (Administrator)

Gambaran proses interaksi antar sistem saat administrator akan mengelola data pengguna, termasuk mengubah role, melakukan ban dan unban pengguna dapat diamati pada Gambar 5.21. Sequence diagram ini menggambarkan alur kelola pengguna dengan fitur filter, pencarian, dan manajemen role/status.

![[]{#_Toc215958765 .anchor}Gambar 5.21 Sequence Diagram Kelola Pengguna (Administrator)](docs/skripsi/media/image122.png){width="3.1034722222222224in" height="9.320833333333333in"}

Alur Proses Tambah Portofolio:

1.  Administrator membuka halaman \`/admin/users\`

2.  AdminUsersPage component memanggil \`getUsers(page, limit, search, filter)\` untuk memuat daftar pengguna:

- Query ke tabel \`profiles\` dengan pagination

- Filter berdasarkan role (all, admin, regular) jika dipilih

- Search berdasarkan \`full_name\` atau \`phone\` menggunakan \`ILIKE\` jika keyword ada

  1.  Sistem memuat statistik pengguna dengan \`getUserRoleCounts()\`:

<!-- -->

- COUNT admin users (\`is_admin=true\`)

- COUNT regular users (\`is_admin=false\`)

  1.  Sistem menampilkan tabel semua pengguna dengan fitur filter dan pencarian, beserta statistik total, active, banned, dan pending

  2.  Administrator mencari atau memfilter pengguna:

<!-- -->

- Jika administrator memasukkan keyword, sistem melakukan pencarian di \`full_name\` dan \`phone\` menggunakan \`ILIKE\`

- Jika administrator memilih filter (All, Admin, Regular), sistem memfilter tabel berdasarkan \`is_admin\`

  1.  Sistem memfilter tabel secara real-time dengan debounce 500ms

  2.  Administrator memilih salah satu pengguna untuk dikelola

  3.  Sistem menampilkan detail pengguna dan opsi aksi seperti Edit Role, Ban, Unban, dan Reset Password

  4.  Jika administrator mengubah role:

<!-- -->

- Sistem menampilkan modal konfirmasi dengan informasi role baru

- Administrator mengonfirmasi perubahan

- Sistem memanggil \`updateUserRole(userId, newRole)\` untuk memperbarui role di database:

- UPDATE tabel \`profiles\` dengan \`is_admin\` dan \`admin_role\` sesuai role baru

- Sistem mencatat aktivitas ke \`admin_activity_logs\` dengan action \`\'update_role\'\`

- Sistem mengirim notifikasi ke pengguna jika role ditingkatkan (opsional)

- Sistem menampilkan notifikasi sukses dan refresh daftar pengguna

  1.  Jika administrator melakukan ban atau unban:

<!-- -->

- Sistem memanggil \`banUser(userId)\` atau \`unbanUser(userId)\`

- Sistem memperbarui status pengguna di tabel \`profiles\` dengan \`suspended=true\` (ban) atau \`suspended=false\` (unban)

- Sistem mencatat aktivitas ke \`admin_activity_logs\` dengan action \`\'ban_user\'\` atau \`\'unban_user\'\`

- Sistem mengirim notifikasi ke pengguna (opsional)

- Sistem menampilkan notifikasi sukses dan refresh daftar pengguna

### 5.2.19 Sequence Diagram Lihat Analytics (Administrator/Moderator)

Gambaran proses interaksi antar sistem saat administrator atau moderator akan melihat statistik dan tren aktivitas pada platform dapat diamati pada Gambar 5.22. Sequence diagram ini menggambarkan alur lihat analytics dengan fitur filter periode dan kategori.

![[]{#_Toc215958766 .anchor}Gambar 5.22 Sequence Diagram Lihat Analytics (Administrator)](docs/skripsi/media/image123.png){width="2.1979166666666665in" height="9.311111111111112in"}

Alur Proses:

1.  Administrator atau Moderator membuka halaman \`/admin/analytics\`

2.  AdminAnalyticsPage component memanggil \`getAdminStats()\` untuk memuat data statistik

3.  AnalyticsService melakukan query aggregate ke berbagai tabel secara paralel menggunakan \`Promise.allSettled\`:

- Query ke tabel \`profiles\` untuk total pengguna dan new users today (dengan filter \`created_at \>= today\`)

- Query ke tabel \`articles\` untuk total artikel, new articles today, published count, dan draft count

- Query aggregate ke tabel \`articles\` untuk total views (SUM views) dan total likes (SUM likes_count)

- Query ke tabel \`comments\` untuk total komentar

- Query ke tabel \`content_reports\` untuk total laporan dan pending reports (dengan filter \`status=\'pending\'\`)

- Query ke tabel \`featured_content\` untuk jumlah konten featured (dengan filter \`active=true\`)

  1.  Setelah semua query selesai, AnalyticsService mengembalikan data statistik lengkap ke AdminAnalyticsPage

  2.  Sistem menampilkan dashboard analytics berisi:

<!-- -->

- Kartu statistik utama (KPI cards) dengan total pengguna, total artikel, total views, total likes, total komentar, total laporan, pending reports, dan featured content

- Grafik pertumbuhan berupa progress bar untuk user growth rate, article growth rate, dan engagement rate

- Platform health indicators untuk content moderation, user activity, dan content quality

- Detailed statistics dengan breakdown per kategori (user metrics, article metrics, engagement metrics, moderation metrics)

  1.  Administrator atau Moderator dapat melihat tren dan statistik platform secara real-time

### 5.2.20 Sequence Diagram Lihat Activity Logs (Administrator)

Gambaran proses interaksi antar sistem saat administrator akan memantau seluruh aktivitas yang terjadi di dalam sistem dapat diamati pada Gambar 5.23. Sequence diagram ini menggambarkan alur lihat activity logs dengan fitur pagination, filter, dan pencarian.

![[]{#_Toc215958767 .anchor}Gambar 5.23 Sequence Diagram Lihat Activity Logs (Administrator)](docs/skripsi/media/image124.png){width="1.8493055555555555in" height="9.320833333333333in"}

Alur Proses:

1.  Administrator membuka halaman \`/admin/logs\`

2.  AdminLogsPage component memanggil \`getAdminActivityLogs(page, limit)\` untuk memuat data activity logs dengan pagination (default 25 items per page)

3.  LogsService melakukan query ke tabel \`admin_activity_logs\`:

- Query COUNT untuk mendapatkan total count

- Query SELECT dengan ORDER BY \`created_at DESC\`, LIMIT, dan OFFSET untuk pagination

  1.  LogsService melakukan JOIN dengan tabel \`profiles\` untuk mendapatkan informasi admin (full_name, avatar_url) berdasarkan \`admin_id\`

  2.  LogsService mengembalikan logs dengan pagination info (totalCount, totalPages) ke AdminLogsPage

  3.  Sistem menampilkan tabel logs dengan kolom:

<!-- -->

- Timestamp (created_at dengan format relatif atau lengkap)

- Actor (admin profile dengan nama dan avatar)

- Action (tipe aksi dengan icon dan label, misalnya \"Menghapus Konten\", \"Promosi ke Admin\")

- Target (target_type dan target_id)

- Payload (details dalam format JSON)

  1.  Administrator melakukan filter atau pencarian log:

<!-- -->

- Filter berdasarkan kategori: All, User Management, Content Management, Settings, Reports

- Filter berdasarkan actor (admin tertentu)

- Pencarian dengan keyword (mencari di action, target_type, atau details)

  1.  Sistem memfilter tabel secara real-time dengan memanggil \`getAdminActivityLogs(page, filter, search)\` dengan parameter filter dan search

9.  Query ke database akan difilter berdasarkan kondisi yang dipilih (WHERE action=?, WHERE admin_id=?, atau WHERE action/target_type/details ILIKE ?)

10. Sistem memperbarui tabel dengan hasil filter

11. Administrator memilih salah satu log untuk melihat detail

12. Sistem menampilkan modal detail lengkap log termasuk:

- Timestamp lengkap (tanggal dan jam)

- Actor lengkap (admin profile dengan nama dan avatar)

- Action dan label lengkap

- Target type dan target ID

- Details (payload dalam format JSON viewer)

- Nilai sebelum dan sesudah perubahan (jika tersedia di details)

### 5.2.21 Sequence Diagram Tambah Portofolio

Gambaran proses interaksi antar sistem saat penulis akan menambahkan portofolio baru ke dalam sistem dapat diamati pada Gambar 5.24. Sequence diagram ini menggambarkan alur tambah portofolio dengan validasi form, upload cover image, dan penyimpanan data.

![[]{#_Toc215958768 .anchor}Gambar 5.24 Sequence Diagram Tambah Portofolio](docs/skripsi/media/image125.png){width="2.0in" height="9.32986111111111in"}

Alur Proses:

1.  Penulis membuka halaman profil sendiri dan menekan tombol \"Tambah Portofolio\" atau membuka halaman \`/portfolio/add\`

2.  AddPortfolioWorkPage component memverifikasi penulis sudah login

3.  Sistem menampilkan form tambah portofolio dengan field:

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

  1.  Penulis mengisi form portofolio dengan judul, kategori, dan deskripsi

  2.  Sistem memvalidasi input secara real-time:

<!-- -->

- Judul tidak kosong

- Kategori harus valid (dalam daftar kategori yang diizinkan)

- Deskripsi (jika diisi) tidak terlalu panjang

  1.  Jika penulis mengunggah cover image (opsional):

<!-- -->

- Sistem memvalidasi file cover image (format: JPG, PNG, GIF, WebP; size maksimal: 5MB)

- Sistem memanggil \`uploadImageToStorage(file, \"portfolio-covers\")\` untuk mengunggah gambar ke Supabase Storage bucket \`images/portfolio-covers\`

- Sistem menghasilkan nama file unik dengan format \`timestamp-random.ext\`

- Sistem mengunggah file ke storage dan mendapatkan file path

- Sistem menampilkan preview cover image di form

  1.  Jika penulis mengisi link eksternal (opsional):

<!-- -->

- Sistem memvalidasi format URL menggunakan regex atau URL constructor

- Jika URL tidak valid, sistem menampilkan pesan error

  1.  Penulis menekan tombol \"Simpan Portofolio\"

  2.  Sistem memvalidasi seluruh form:

<!-- -->

- Judul tidak kosong

- Kategori valid

- Cover image (jika ada) sudah terupload

- Link eksternal (jika ada) format valid

  1.  Setelah validasi berhasil, sistem memanggil \`createPortfolioWork(authorId, workData)\` untuk menyimpan portofolio:

<!-- -->

- INSERT ke tabel \`portfolio_works\` dengan data: \`author_id\`, \`title\`, \`category\`, \`description\`, \`genre\`, \`year_created\`, \`status\`, \`publisher\`, \`isbn\`, \`cover_image\`, \`external_link\`, \`awards\` (array), \`tags\` (array), \`created_at\`, \`updated_at\`

  1.  Sistem mencatat aktivitas di activity logs (opsional, jika ada sistem logging)

> 12\. Sistem menampilkan notifikasi sukses \"🎉 Karya berhasil ditambahkan ke portofolio!\"

13. Sistem mengarahkan penulis ke halaman detail portofolio (\`/member/\[slug\]/portfolio\`) dengan menggunakan slug dari nama penulis

### 5.2.22 Sequence Diagram Lihat Profil Member

Gambaran proses interaksi antar sistem saat pengguna akan melihat profil lengkap member di platform dapat diamati pada Gambar 5.25. Sequence diagram ini menggambarkan alur lihat profil member dengan data profil, artikel, portofolio, dan statistik.

![[]{#_Toc215958769 .anchor}Gambar 5.25 Sequence Diagram Lihat Profil Member](docs/skripsi/media/image126.png){width="2.736111111111111in" height="9.320833333333333in"}

Alur Proses:

1.  Pengguna membuka profil member dari beranda, artikel, atau direktori member dengan mengklik link ke \`/member/\[slug\]\` atau \`/profile/\[id\]\`

2.  AuthorProfilePage component memanggil \`getAuthorProfile(slug)\` untuk memuat data profil member:

- Mengkonversi slug ke user ID menggunakan \`getUserIdBySlug(slug)\` jika menggunakan slug

- Query ke tabel \`profiles\` dengan kondisi \`id=?\` untuk mendapatkan data profil (full_name, bio, avatar_url, role, created_at, dll)

  1.  Sistem mengambil data artikel yang diterbitkan:

<!-- -->

- Query ke tabel \`articles\` dengan kondisi \`author_id=? AND published=true\`

- ORDER BY \`created_at DESC\` untuk menampilkan artikel terbaru terlebih dahulu

- SELECT field: id, title, excerpt, cover_image, category, slug, views, likes_count, comments_count, created_at

  1.  Sistem mengambil data portofolio:

<!-- -->

- Query ke tabel \`portfolio_works\` dengan kondisi \`author_id=?\`

- ORDER BY \`created_at DESC\` untuk menampilkan portofolio terbaru terlebih dahulu

  1.  Sistem menghitung statistik profil:

<!-- -->

- Total articles: COUNT artikel yang published

- Total views: SUM views dari semua artikel

- Total likes: SUM likes_count dari semua artikel

- Total comments: SUM comments_count dari semua artikel

- Followers count: COUNT dari tabel \`follows\` dengan kondisi \`followed_id=?\`

  1.  Setelah data dimuat, sistem menampilkan:

<!-- -->

- Header profil dengan avatar (menggunakan \`getAvatarUrl()\`), nama lengkap, bio, dan role badge

- Statistik profil dalam bentuk cards: jumlah artikel, total views, total likes, total comments, followers

- Daftar artikel dengan pagination (default 4-6 artikel per halaman) dengan cover image, judul, excerpt, kategori, views, likes, comments, dan tanggal

- Daftar portofolio (jika ada) dengan preview cover image, judul, kategori, dan link ke detail portofolio

- Tombol \"Follow\" (jika pengguna sudah login dan bukan profil sendiri)

- Link ke portofolio lengkap (\`/member/\[slug\]/portfolio\`)

### 5.2.23 Sequence Diagram Edit Profil

Gambaran proses interaksi antar sistem saat penulis akan mengubah dan memperbarui data profil pribadi dapat diamati pada Gambar 5.26. Sequence diagram ini menggambarkan alur edit profil dengan validasi form, upload avatar, dan update database.

![[]{#_Toc215958770 .anchor}Gambar 5.26 Sequence Diagram Edit Profil](docs/skripsi/media/image127.png){width="1.9902777777777778in" height="9.32986111111111in"}

Alur Proses:

1.  Penulis membuka profil sendiri dan klik tombol \"Edit Profil\" atau membuka halaman \`/profile/edit\`

2.  EditProfilePage component memverifikasi penulis sudah login

3.  Sistem memanggil \`getCurrentProfile(userId)\` untuk memuat data profil saat ini:

- Query ke tabel \`profiles\` dengan kondisi \`id=?\` (user.id)

- SELECT semua field profil: full_name, bio, phone, avatar_url, role, member_id, prestasi, alamat

  1.  Sistem menampilkan form edit profil dengan data saat ini yang sudah terisi di setiap field

  2.  Penulis mengubah data profil:

<!-- -->

- Mengubah nama lengkap (full_name)

- Mengubah bio

- Mengubah nomor telepon (phone)

- Mengubah role (jika diizinkan)

- Mengubah informasi tambahan (member_id, prestasi, alamat)

  1.  Sistem memvalidasi perubahan secara real-time:

<!-- -->

- Nama lengkap: tidak kosong, minimal 2 karakter, maksimal 100 karakter

- Bio: maksimal 500 karakter (jika diisi)

- Nomor telepon: format valid (regex: \`\^\[\\d\\-\\+\\(\\)\\s\]+\$\`) jika diisi

- Link sosial media (jika ada): format URL valid

  1.  Jika penulis mengunggah avatar baru (opsional):

<!-- -->

- Sistem memvalidasi file avatar (format: image/\*, size maksimal: 5MB)

- Sistem memanggil \`uploadImageToStorage(file, \"avatars\")\` untuk mengunggah gambar ke Supabase Storage bucket \`images/avatars\`

- Sistem menghasilkan nama file unik dengan format \`timestamp-random.ext\`

- Sistem mengunggah file ke storage dan mendapatkan file path

- Sistem menampilkan preview avatar baru di form

  1.  Penulis klik \"Simpan Perubahan\"

  2.  Sistem memvalidasi form lengkap dengan memanggil \`validateProfileForm()\`:

<!-- -->

- Memeriksa semua field required

- Memeriksa format dan panjang setiap field

  1.  Setelah validasi berhasil, sistem memanggil \`updateProfile(userId, profileData)\` untuk memperbarui profil:

<!-- -->

- UPDATE ke tabel \`profiles\` dengan data: \`full_name\`, \`bio\`, \`phone\`, \`avatar_url\`, \`role\`, \`member_id\`, \`prestasi\`, \`alamat\`, \`updated_at=NOW()\` dengan kondisi \`id=?\`

- UPDATE auth metadata di Supabase Auth dengan \`updateUser({data: {full_name, role}})\` untuk sinkronisasi data

  1.  Sistem memperbarui avatar di storage (jika avatar baru diupload, avatar lama tetap tersimpan di storage untuk referensi)

  2.  Sistem mencatat aktivitas di activity logs (opsional, jika ada sistem logging)

  3.  Sistem memanggil \`refreshUser()\` untuk memperbarui user context di aplikasi

14. Sistem menampilkan notifikasi sukses \"✅ Profil berhasil diperbarui!\"

15. Sistem memperbarui UI profil dengan data terbaru dan mengarahkan ke halaman profil publik (\`/profile/\[id\]\`) setelah 1.5 detik

### 5.2.24 Sequence Diagram Lihat Direktori Member

Gambaran proses interaksi antar sistem saat pengguna akan melihat daftar seluruh member yang terdaftar di platform dapat diamati pada Gambar 5.27. Sequence diagram ini menggambarkan alur lihat direktori member dengan pagination, filter, dan pencarian.

![[]{#_Toc215958771 .anchor}Gambar 5.27 Sequence Diagram Lihat Direktori Member](docs/skripsi/media/image128.png){width="1.8020833333333333in" height="9.32986111111111in"}

Alur Proses:

1.  Pengguna membuka halaman \`/member\` atau klik menu \"Member\" di navigasi

2.  AuthorsPage component memuat halaman direktori member

3.  Sistem memanggil \`getMembers(page, filter, search)\` untuk memuat data member dengan pagination (default 6 member per halaman)

4.  MemberService melakukan query ke tabel \`profiles\`:

- SELECT field: id, full_name, avatar_url, role, created_at, bio

- Apply pagination dengan LIMIT dan OFFSET

- Apply sorting berdasarkan pilihan (newest, oldest, most_articles, most_popular, alphabetical)

  1.  Sistem mengambil statistik artikel untuk setiap member:

<!-- -->

- Query ke tabel \`articles\` dengan kondisi \`published=true\`

- GROUP BY \`author_id\` untuk menghitung jumlah artikel per author

- Calculate stats: article_count, total_views, total_likes, total_comments

  1.  Sistem menggabungkan data profil dengan statistik artikel untuk setiap member

  2.  Setelah data dimuat, sistem menampilkan:

<!-- -->

- Grid member dengan card untuk setiap member yang berisi:

- Avatar (menggunakan \`getAvatarUrl()\`)

- Nama lengkap

- Bio singkat (truncated jika terlalu panjang)

- Badge role (Penulis, Ilustrator, dll)

- Statistik: jumlah artikel published

- Tombol \"Lihat Profil\" yang mengarah ke \`/member/\[slug\]\`

- Filter options: All, Active Writers, New Members

- Search bar untuk pencarian member

- Pagination controls (Previous, Next, page numbers)

  1.  Pengguna memfilter atau mencari member:

<!-- -->

- Jika pengguna memilih filter, sistem memanggil \`getMembers(\..., filter)\` dengan parameter filter

- Jika pengguna memasukkan keyword di search bar, sistem memanggil \`getMembers(\..., search)\` dengan parameter search

  1.  Sistem memfilter grid secara real-time dengan debounce (500ms) untuk search:

<!-- -->

- Query ke database akan difilter berdasarkan kondisi yang dipilih

- Untuk search: WHERE \`full_name ILIKE ? OR bio ILIKE ?\`

- Untuk filter Active Writers: WHERE id IN (SELECT DISTINCT author_id FROM articles WHERE published=true)

  1.  Sistem memperbarui grid dengan hasil filter atau pencarian

### 5.2.25 Sequence Diagram Lihat Halaman Tentang

Gambaran proses interaksi antar sistem saat pengguna akan melihat informasi tentang komunitas secara lengkap dapat diamati pada Gambar 5.28. Sequence diagram ini menggambarkan alur lihat halaman tentang dengan konten statis atau dinamis dari database/CMS.

![[]{#_Toc215958772 .anchor}Gambar 5.28 Sequence Diagram Lihat Halaman Tentang](docs/skripsi/media/image129.png){width="2.877083333333333in" height="9.311111111111112in"}

Alur Proses:

1.  Pengguna membuka halaman \`/tentang\` atau klik menu \"Tentang\" di navigasi

2.  TentangPage component memuat halaman tentang

3.  Sistem memanggil \`getAboutPageContent()\` untuk memuat konten halaman:

- Jika menggunakan CMS atau database: Query ke tabel \`about_page_content\` atau \`cms_pages\` dengan kondisi \`active=true\` atau \`page_type=\'about\'\`

- Jika menggunakan konten statis: Load konten yang sudah di-hardcode di komponen (seperti di \`src/app/tentang/page.tsx\`)

  1.  Sistem mengambil informasi tentang komunitas:

<!-- -->

- Sejarah komunitas (berdiri sejak 2 Mei 2010, deskripsi komunitas)

- Visi dan Misi (visi: terciptanya bacaan yang sehat, kreatif, dan sesuai dengan anak-anak Indonesia; misi: menciptakan SDM di bidang tulis-menulis, menjalin kerjasama, melindungi dan memberdayakan member)

- Tujuan komunitas

- Cara bergabung (informasi cara menjadi member)

- Kontak resmi (email, alamat, nomor telepon jika ada)

- Link ke media sosial komunitas (Facebook, WhatsApp, Telegram, Instagram dengan jumlah member per platform)

- Prestasi & pencapaian (JakBook Award 2012, Fasilitasi Kemendikbudristek 2023, dll)

- Tim pengurus (daftar pengurus dengan nama, foto, dan role)

  1.  Setelah data dimuat, sistem menampilkan halaman tentang dengan section:

<!-- -->

- Hero section dengan judul \"Tentang PaberLand\" dan tagline

- Section Prestasi & Pencapaian dengan cards achievement

- Section Profil Singkat dengan Visi, Misi, Budaya, dan Layanan

- Section Tim Pengurus dengan grid foto dan nama pengurus

- Section Statistik Komunitas dengan jumlah member per platform (Facebook, WhatsApp, Telegram, Instagram) dan total komunitas

- Section Cara Bergabung (jika ada)

- Section Kontak Resmi dengan informasi kontak dan link media sosial

### 5.2.26 Sequence Diagram Logout

Gambaran proses interaksi antar sistem saat pengguna akan keluar dari sistem dengan aman dapat diamati pada Gambar 5.29. Sequence diagram ini menggambarkan alur logout dengan penghapusan session, token autentikasi, dan pembersihan data pengguna.

![[]{#_Toc215958773 .anchor}Gambar 5.29 Sequence Diagram Logout](docs/skripsi/media/image130.png){width="3.9055555555555554in" height="9.320833333333333in"}

Alur Proses:

1.  Pengguna klik tombol \"Logout\" di menu profil atau navigasi (di Header component)

2.  Header component memanggil \`handleLogout()\` yang akan memanggil \`signOut()\` dari AuthContext

3.  Jika sistem menggunakan konfirmasi logout (opsional), sistem menampilkan modal konfirmasi dengan pesan \"Apakah Anda yakin ingin logout?\" dan tombol \"Ya\" dan \"Batal\"

4.  Pengguna mengonfirmasi logout (jika ada konfirmasi) atau logout langsung dilakukan

5.  AuthContext memanggil \`supabase.auth.signOut()\` untuk menghapus session:

- Supabase Auth menghapus session dari server

- Supabase Auth menghapus token autentikasi (access token dan refresh token) dari cookies

- Supabase Auth mengembalikan event \`SIGNED_OUT\` ke AuthContext

  1.  AuthContext membersihkan data pengguna dari client:

<!-- -->

- Memanggil \`setUser(null)\` untuk menghapus user state dari context

- Membersihkan data pengguna dari localStorage/sessionStorage (jika ada data yang disimpan)

  1.  AuthContext memanggil \`router.push(\"/\")\` untuk mengarahkan pengguna ke halaman beranda

  2.  AuthContext memanggil \`router.refresh()\` untuk refresh server components dan memastikan semua data terbaru

  3.  Header component menampilkan notifikasi sukses \"Logout berhasil!\" menggunakan toast notification

  4.  Sistem mengarahkan pengguna ke halaman beranda (\`/\`) dan pengguna tidak lagi terautentikasi

## 5.3 Physical Database Design (PDD)

Perancangan database fisik sistem platform PaberLand mengacu pada desain ERD yang telah dibuat pada BAB 4. Perbedaan antara ERD dengan PDD adalah PDD memiliki keterangan tipe data lengkap dari masing-masing field, constraint, index, dan konfigurasi database. Hasil desain PDD mendapatkan 11 tabel utama yang ditampilkan pada Gambar 5.30.

![[]{#_Toc215958774 .anchor}Gambar 5.30 Rancangan Database Sistem Platform PaberLand](docs/skripsi/media/image131.png){width="8.229166666666666in" height="5.105757874015748in"}

### 5.3.1 Tabel profiles

Tabel \`profiles\` menyimpan data profil semua pengguna platform. Tabel ini memiliki relasi dengan tabel \`auth.users\` dari Supabase Auth.

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
   **No**     **Nama Kolom**           **Tipe Data**                                                     **Constraint**                                                          **Keterangan**
  -------- --------------------- -------------------------- -------------------------------------------------------------------------------------------------------- ---------------------------------------
     1              id                      UUID                                      PRIMARY KEY, FOREIGN KEY ke auth.users.id, NOT NULL                                   Identifier unik pengguna

     2           full_name                  TEXT                                                            NOT NULL                                                          Nama lengkap pengguna

     3             phone                    TEXT                                                              NULL                                                          Nomor telepon (opsional)

     4              bio                     TEXT                                                              NULL                                                              Biografi pengguna

     5          avatar_url                  TEXT                                                              NULL                                                    URL gambar avatar di Supabase Storage

     6             role                     TEXT             DEFAULT \'Penulis\', CHECK (role IN (\'Penulis\', \'Ilustrator\', \'Kreator Buku\', \'Pekerja Buku\'))      Peran pengguna dalam komunitas

     7           is_admin                 BOOLEAN                                                        DEFAULT false                                                         Flag administrator

     8          admin_role                  TEXT                                  NULL, CHECK (admin_role IN (\'super_admin\', \'moderator\'))                                 Peran admin khusus

     9          admin_since       TIMESTAMP WITH TIME ZONE                                                    NULL                                                     Tanggal pengangkatan sebagai admin

     10     last_admin_activity   TIMESTAMP WITH TIME ZONE                                                    NULL                                                     Timestamp aktivitas admin terakhir

     11         created_at        TIMESTAMP WITH TIME ZONE                                          NOT NULL, DEFAULT NOW()                                                Timestamp pembuatan profil

     12         updated_at        TIMESTAMP WITH TIME ZONE                                          NOT NULL, DEFAULT NOW()                                               Timestamp pembaruan terakhir
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  : []{#_Toc215958617 .anchor}Tabel 5.1 Tabel profiles Physical Database Design

Tabel \`profiles\` menggunakan PRIMARY KEY pada kolom \`id\` sebagai identifier unik, dengan index tambahan pada kolom \`role\` untuk mempercepat filter berdasarkan peran pengguna dan index pada \`is_admin\` untuk optimasi query admin. Sistem juga menggunakan trigger database yang secara otomatis memperbarui kolom \`updated_at\` setiap kali data profil diubah, memastikan timestamp selalu akurat tanpa

### 5.3.2 Tabel articles

Tabel \`articles\` menyimpan semua konten artikel yang dibuat oleh penulis.

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
   **No**   **Nama Kolom**         **Tipe Data**                                                                             **Constraint**                                                                                 **Keterangan**
  -------- ----------------- -------------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------- -----------------------------------
     1            id                    UUID                                                                PRIMARY KEY, DEFAULT gen_random_uuid(), NOT NULL                                                            Identifier unik artikel

     2           title                  TEXT                                                                                    NOT NULL                                                                                     Judul artikel

     3          content                 TEXT                                                                                    NOT NULL                                                                           Konten artikel dalam format HTML

     4          excerpt                 TEXT                                                                             NULL, MAX 500 karakter                                                                            Ringkasan artikel

     5        cover_image               TEXT                                                                                      NULL                                                                                     URL gambar cover

     6         category                 TEXT             NOT NULL, CHECK (category IN (\'Info/Berita\', \'Cerpen\', \'Dongeng\', \'Puisi\', \'Cerita Rakyat\', \'Novel\', \'Cerbung\', \'Cermin\', \'Lainnya\'))           Kategori artikel

     7         author_id                UUID                                                             FOREIGN KEY ke profiles.id, NOT NULL, ON DELETE CASCADE                                                            Penulis artikel

     8         published              BOOLEAN                                                                                 DEFAULT false                                                                                Status publikasi

     9       scheduled_at     TIMESTAMP WITH TIME ZONE                                                                            NULL                                                                                 Jadwal publikasi otomatis

     10          views                INTEGER                                                                                   DEFAULT 0                                                                            Jumlah views (denormalisasi)

     11       likes_count             INTEGER                                                                                   DEFAULT 0                                                                             Jumlah like (denormalisasi)

     12     comments_count            INTEGER                                                                                   DEFAULT 0                                                                           Jumlah komentar (denormalisasi)

     13          slug                   TEXT                                                                                UNIQUE, NOT NULL                                                                       URL-friendly identifier untuk SEO

     14       created_at      TIMESTAMP WITH TIME ZONE                                                                   NOT NULL, DEFAULT NOW()                                                                          Timestamp pembuatan

     15       updated_at      TIMESTAMP WITH TIME ZONE                                                                   NOT NULL, DEFAULT NOW()                                                                          Timestamp pembaruan
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  : []{#_Toc215958618 .anchor}Tabel 5.2 Tabel articles Physical Database Design

Tabel \`articles\` dilengkapi dengan PRIMARY KEY pada \`id\`, UNIQUE INDEX pada \`slug\` untuk memastikan URL artikel unik, serta index pada \`author_id\`, \`category\`, dan \`published\` untuk mempercepat query artikel per penulis, filter kategori, dan filter artikel yang dipublikasikan. Index pada \`created_at DESC\` digunakan untuk sorting artikel terbaru, sementara GIN INDEX pada \`content\` memungkinkan full-text search yang efisien. Sistem menggunakan trigger untuk auto-update \`updated_at\` saat artikel diubah, serta trigger yang secara otomatis memperbarui \`likes_count\` dan \`comments_count\` di tabel articles setiap kali ada perubahan pada tabel \`article_likes\` atau \`comments\`, memastikan data denormalisasi selalu sinkron.

### 5.3.3 Tabel comments

Tabel \`comments\` menyimpan komentar berulir pada artikel.

  -----------------------------------------------------------------------------------------------------------------------------------------------
   **No**   **Nama Kolom**        **Tipe Data**                             **Constraint**                                **Keterangan**
  -------- ---------------- -------------------------- --------------------------------------------------------- --------------------------------
     1            id                   UUID                PRIMARY KEY, DEFAULT gen_random_uuid(), NOT NULL          Identifier unik komentar

     2        article_id               UUID             FOREIGN KEY ke articles.id, NOT NULL, ON DELETE CASCADE      Artikel yang dikomentari

     3        author_id                UUID             FOREIGN KEY ke profiles.id, NOT NULL, ON DELETE CASCADE          Penulis komentar

     4         content                 TEXT                                    NOT NULL                                    Isi komentar

     5        parent_id                UUID               FOREIGN KEY ke comments.id, NULL, ON DELETE CASCADE     Komentar induk untuk threading

     6        created_at     TIMESTAMP WITH TIME ZONE                   NOT NULL, DEFAULT NOW()                        Timestamp pembuatan

     7        updated_at     TIMESTAMP WITH TIME ZONE                   NOT NULL, DEFAULT NOW()                        Timestamp pembaruan
  -----------------------------------------------------------------------------------------------------------------------------------------------

  : []{#_Toc215958619 .anchor}Tabel 5.3 Tabel comments Physical Database Design

Tabel \`comments\` menggunakan PRIMARY KEY pada \`id\` dan index pada \`article_id\`, \`author_id\`, serta \`parent_id\` untuk mempercepat query komentar per artikel, per penulis, dan untuk struktur komentar berulir (threaded comments). Sistem menggunakan trigger untuk auto-update \`updated_at\` saat komentar diubah, serta trigger yang secara otomatis memperbarui \`comments_count\` di tabel articles setiap kali ada komentar baru atau dihapus, menjaga konsistensi data denormalisasi.

### 5.3.4 Tabel article_likes

Tabel \`article_likes\` merupakan junction table untuk relasi many-to-many antara articles dan profiles.

  ----------------------------------------------------------------------------------------------------------------------------------------------
   **No**   **Nama Kolom**        **Tipe Data**                             **Constraint**                               **Keterangan**
  -------- ---------------- -------------------------- --------------------------------------------------------- -------------------------------
     1            id                   UUID                PRIMARY KEY, DEFAULT gen_random_uuid(), NOT NULL           Identifier unik like

     2        article_id               UUID             FOREIGN KEY ke articles.id, NOT NULL, ON DELETE CASCADE        Artikel yang dilike

     3         user_id                 UUID             FOREIGN KEY ke profiles.id, NOT NULL, ON DELETE CASCADE   Pengguna yang memberikan like

     4        created_at     TIMESTAMP WITH TIME ZONE                   NOT NULL, DEFAULT NOW()                     Timestamp pemberian like
  ----------------------------------------------------------------------------------------------------------------------------------------------

  : []{#_Toc215958620 .anchor}Tabel 5.4 Tabel likes Physical Database Design

Tabel \`article_likes\` menggunakan PRIMARY KEY pada \`id\` dan UNIQUE INDEX pada kombinasi \`(article_id, user_id)\` untuk mencegah seorang pengguna memberikan like ganda pada artikel yang sama. Index pada \`article_id\` dan \`user_id\` mempercepat query untuk melihat daftar like per artikel dan daftar artikel yang dilike oleh pengguna tertentu. Sistem menggunakan trigger yang secara otomatis memperbarui \`likes_count\` di tabel articles setiap kali ada like baru atau dihapus, memastikan counter selalu akurat.

### 5.3.5 Tabel portfolio_works

Tabel \`portfolio_works\` menyimpan karya portofolio penulis.

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
   **No**   **Nama Kolom**        **Tipe Data**                                                                 **Constraint**                                                                  **Keterangan**
  -------- ---------------- -------------------------- --------------------------------------------------------------------------------------------------------------------------------- -----------------------------
     1            id                   UUID                                                    PRIMARY KEY, DEFAULT gen_random_uuid(), NOT NULL                                              Identifier unik karya

     2        author_id                UUID                                                 FOREIGN KEY ke profiles.id, NOT NULL, ON DELETE CASCADE                                              Pemilik karya

     3          title                  TEXT                                                                        NOT NULL                                                                       Judul karya

     4       description               TEXT                                                                          NULL                                                                   Deskripsi lengkap karya

     5         category                TEXT             NOT NULL, CHECK (category IN (\'cerpen\', \'puisi\', \'artikel\', \'cerita-rakyat\', \'novel-berseri\', \'buku\', \'lainnya\'))         Kategori karya

     6          genre                  TEXT                                                                          NULL                                                                         Genre karya

     7       year_created            INTEGER                                                                         NULL                                                                       Tahun pembuatan

     8          status                 TEXT                       DEFAULT \'unpublished\', CHECK (status IN (\'published\', \'unpublished\', \'in_progress\', \'completed\'))                    Status karya

     9        publisher                TEXT                                                                          NULL                                                                        Nama penerbit

     10          isbn                  TEXT                                                                          NULL                                                                 ISBN jika karya berupa buku

     11      cover_image               TEXT                                                                          NULL                                                                      URL gambar cover

     12     external_link              TEXT                                                                          NULL                                                                   Tautan eksternal karya

     13         awards               TEXT\[\]                                                                        NULL                                                                      Array penghargaan

     14          tags                TEXT\[\]                                                                        NULL                                                                          Array tag

     15       created_at     TIMESTAMP WITH TIME ZONE                                                       NOT NULL, DEFAULT NOW()                                                           Timestamp pembuatan

     16       updated_at     TIMESTAMP WITH TIME ZONE                                                       NOT NULL, DEFAULT NOW()                                                           Timestamp pembaruan
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  : []{#_Toc215958622 .anchor}Tabel 5.5 Tabel portofolio_works Physical Database Design

Tabel \`portfolio_works\` menggunakan PRIMARY KEY pada \`id\` dan index pada \`author_id\`, \`category\`, \`status\`, serta \`created_at DESC\` untuk mempercepat query karya per penulis, filter berdasarkan kategori dan status, serta sorting karya terbaru. Sistem menggunakan trigger untuk auto-update \`updated_at\` setiap kali data portofolio diubah.

### 5.3.6 Tabel notifications

Tabel \`notifications\` menyimpan semua notifikasi sistem untuk pengguna.

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------
   **No**   **Nama Kolom**        **Tipe Data**                                       **Constraint**                                          **Keterangan**
  -------- ---------------- -------------------------- ---------------------------------------------------------------------------- -----------------------------------
     1            id                   UUID                          PRIMARY KEY, DEFAULT gen_random_uuid(), NOT NULL                   Identifier unik notifikasi

     2           type                  TEXT             NOT NULL, CHECK (type IN (\'like\', \'comment\', \'mention\'))            Tipe notifikasi

     3         actor_id                UUID                      FOREIGN KEY ke profiles.id, NOT NULL, ON DELETE CASCADE               Pengguna yang melakukan aksi

     4        target_id                UUID                      FOREIGN KEY ke profiles.id, NOT NULL, ON DELETE CASCADE             Pengguna yang menerima notifikasi

     5        article_id               UUID                        FOREIGN KEY ke articles.id, NULL, ON DELETE CASCADE                        Artikel terkait

     6        comment_id               UUID                        FOREIGN KEY ke comments.id, NULL, ON DELETE CASCADE                       Komentar terkait

     7           read                BOOLEAN                                          DEFAULT false                                   Status notifikasi sudah dibaca

     8        created_at     TIMESTAMP WITH TIME ZONE                            NOT NULL, DEFAULT NOW()                                    Timestamp pembuatan
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------

  : []{#_Toc215958623 .anchor}Tabel 5.6 Tabel Notifications Physical Database Design

Tabel \`notifications\` menggunakan PRIMARY KEY pada \`id\` dan index pada \`target_id\`, \`actor_id\`, \`created_at DESC\`, serta \`read\` untuk mempercepat query notifikasi per penerima, per aktor, sorting notifikasi terbaru, dan filter notifikasi yang belum dibaca. Sistem menggunakan trigger yang secara otomatis membuat notifikasi baru ketika ada aktivitas like atau comment baru, memastikan pengguna selalu mendapat notifikasi real-time.

### 5.3.7 Tabel content_reports

Tabel \`content_reports\` menyimpan laporan konten oleh pengguna.

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
   **No**   **Nama Kolom**        **Tipe Data**                                                   **Constraint**                                                    **Keterangan**
  -------- ---------------- -------------------------- ----------------------------------------------------------------------------------------------------- -----------------------------
     1            id                   UUID                                      PRIMARY KEY, DEFAULT gen_random_uuid(), NOT NULL                               Identifier unik laporan

     2       reporter_id               UUID                                   FOREIGN KEY ke profiles.id, NOT NULL, ON DELETE CASCADE                          Pengguna yang melaporkan

     3       content_type              TEXT                           NOT NULL, CHECK (content_type IN (\'article\', \'comment\', \'user\'))                  Tipe konten yang dilaporkan

     4        content_id               UUID                                                          NOT NULL                                                  ID konten yang dilaporkan

     5          reason                 TEXT             NOT NULL, CHECK (reason IN (\'spam\', \'inappropriate\', \'harassment\', \'copyright\', \'other\'))         Alasan laporan

     6       description               TEXT                                                            NULL                                                     Deskripsi detail alasan

     7          status                 TEXT               DEFAULT \'pending\', CHECK (status IN (\'pending\', \'reviewed\', \'resolved\', \'dismissed\'))           Status laporan

     8       reviewed_by               UUID                                    FOREIGN KEY ke profiles.id, NULL, ON DELETE SET NULL                               Admin yang meninjau

     9       reviewed_at     TIMESTAMP WITH TIME ZONE                                                  NULL                                                      Timestamp peninjauan

     10      admin_notes               TEXT                                                            NULL                                                          Catatan admin

     11       created_at     TIMESTAMP WITH TIME ZONE                                         NOT NULL, DEFAULT NOW()                                             Timestamp pembuatan
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  : []{#_Toc215958624 .anchor}Tabel 5.7 Tabel content_reports Physical Database Design

Tabel \`content_reports\` menggunakan PRIMARY KEY pada \`id\` dan index pada \`status\`, \`content_type\`, \`reporter_id\`, serta \`created_at DESC\` untuk mempercepat filter laporan berdasarkan status dan tipe konten, query laporan per pelapor, serta sorting laporan terbaru yang memudahkan admin dalam proses moderasi.

### 5.3.9 Tabel featured_content

Tabel \`featured_content\` menyimpan daftar konten yang ditandai sebagai featured.

  ----------------------------------------------------------------------------------------------------------------------------------------------------
   **No**   **Nama Kolom**        **Tipe Data**                              **Constraint**                                  **Keterangan**
  -------- ---------------- -------------------------- ----------------------------------------------------------- -----------------------------------
     1            id                   UUID                 PRIMARY KEY, DEFAULT gen_random_uuid(), NOT NULL            Identifier unik featured

     2       content_type              TEXT             NOT NULL, CHECK (content_type IN (\'article\', \'user\'))     Tipe konten yang di-featured

     3        content_id               UUID                                     NOT NULL                               ID konten yang di-featured

     4       featured_by               UUID              FOREIGN KEY ke profiles.id, NOT NULL, ON DELETE CASCADE      Admin yang menandai featured

     5       featured_at     TIMESTAMP WITH TIME ZONE                    NOT NULL, DEFAULT NOW()                    Timestamp saat konten di-featured

     6        expires_at     TIMESTAMP WITH TIME ZONE                             NULL                                 Timestamp berakhir featured

     7         priority              INTEGER                                    DEFAULT 1                           Prioritas urutan featured (1--10)

     8          active               BOOLEAN                                  DEFAULT true                                Status aktif featured
  ----------------------------------------------------------------------------------------------------------------------------------------------------

  : []{#_Toc215958625 .anchor}Tabel 5.9 Tabel featured_content Physical Database Design

Tabel \`featured_content\` menggunakan PRIMARY KEY pada \`id\` dan UNIQUE INDEX pada kombinasi \`(content_type, content_id)\` untuk memastikan satu konten hanya dapat di-featured sekali. Index pada \`active\` mempercepat query featured content yang aktif, sementara index pada \`priority DESC\` memungkinkan sorting berdasarkan prioritas untuk menentukan urutan tampilan di homepage.

### 5.3.10 Tabel admin_activity_logs

Tabel \`admin_activity_logs\` menyimpan catatan aktivitas admin untuk audit trail.

  -------------------------------------------------------------------------------------------------------------------------------------------------------------
   **No**   **Nama Kolom**        **Tipe Data**                             **Constraint**                                       **Keterangan**
  -------- ---------------- -------------------------- --------------------------------------------------------- ----------------------------------------------
     1            id                   UUID                PRIMARY KEY, DEFAULT gen_random_uuid(), NOT NULL                   Identifier unik log

     2         admin_id                UUID             FOREIGN KEY ke profiles.id, NOT NULL, ON DELETE CASCADE            Admin yang melakukan aksi

     3          action                 TEXT                                    NOT NULL                           Tipe aksi (contoh: delete_article, ban_user)

     4       target_type               TEXT                                    NOT NULL                               Tipe target (contoh: article, user)

     5        target_id                UUID                                    NOT NULL                                          ID target aksi

     6         details                JSONB                                      NULL                                  Detail tambahan dalam format JSON

     7        ip_address               INET                                      NULL                                           Alamat IP admin

     8        user_agent               TEXT                                      NULL                                          User agent browser

     9        created_at     TIMESTAMP WITH TIME ZONE                   NOT NULL, DEFAULT NOW()                               Timestamp aktivitas
  -------------------------------------------------------------------------------------------------------------------------------------------------------------

  : []{#_Toc215958626 .anchor}Tabel 5.10 Tabel admin_activity_logs Physical Database Design

Tabel \`admin_activity_logs\` menggunakan PRIMARY KEY pada \`id\` dan index pada \`admin_id\`, \`created_at DESC\`, \`target_type\`, serta \`action\` untuk mempercepat query log per admin, sorting log terbaru, dan filter berdasarkan tipe target dan aksi yang dilakukan, memudahkan proses audit trail dan investigasi aktivitas admin.

### 5.3.11 Tabel settings

Tabel \`settings\` menyimpan konfigurasi platform yang dapat diubah oleh admin.

  -------------------------------------------------------------------------------------------------------------------------------------------
   **No**   **Nama Kolom**        **Tipe Data**                          **Constraint**                             **Keterangan**
  -------- ---------------- -------------------------- -------------------------------------------------- -----------------------------------
     1            id                   UUID             PRIMARY KEY, DEFAULT gen_random_uuid(), NOT NULL        Identifier unik setting

     2           key                   TEXT                             UNIQUE, NOT NULL                   Kunci setting (contoh: site_name)

     3          value                 JSONB                                 NOT NULL                        Nilai setting dalam format JSON

     4       description               TEXT                                   NULL                                 Deskripsi setting

     5         category                TEXT                      NOT NULL, DEFAULT \'general\'                     Kategori setting

     6        created_at     TIMESTAMP WITH TIME ZONE                    DEFAULT NOW()                            Timestamp pembuatan

     7        updated_at     TIMESTAMP WITH TIME ZONE                    DEFAULT NOW()                            Timestamp pembaruan
  -------------------------------------------------------------------------------------------------------------------------------------------

  : []{#_Toc215958627 .anchor}Tabel 5.11 Tabel settings Physical Database Design

Tabel \`settings\` menggunakan PRIMARY KEY pada \`id\`, UNIQUE INDEX pada \`key\` untuk memastikan setiap setting memiliki kunci unik, serta index pada \`category\` untuk mempercepat query setting per kategori. Sistem menggunakan trigger untuk auto-update \`updated_at\` setiap kali konfigurasi diubah, memastikan timestamp selalu akurat.

### 5.3.12 Konfigurasi Database

Database platform PaberLand menggunakan PostgreSQL 16 yang dihosting melalui Supabase dengan konfigurasi keamanan dan performa yang optimal. Semua tabel memiliki Row Level Security (RLS) enabled untuk memastikan keamanan data, di mana policy RLS memastikan pengguna hanya dapat mengakses data yang diizinkan sesuai peran mereka. Sistem menggunakan Supabase connection pooler untuk optimasi koneksi dengan maksimal 100 koneksi simultan, memungkinkan aplikasi menangani banyak request secara efisien. Backup otomatis dilakukan setiap hari dengan retensi 30 hari dan disimpan di Supabase storage untuk memastikan data dapat dipulihkan jika terjadi masalah. Untuk optimasi performa, database menggunakan index strategis pada kolom yang sering digunakan dalam query, GIN index untuk full-text search pada kolom content artikel, serta materialized view untuk statistik yang sering diakses, memastikan query berjalan dengan cepat meskipun data terus bertambah.

# BAB 6 IMPLEMENTASI

Bab ini berisi kumpulan kode implementasi sistem platform PaberLand untuk setiap fitur-fiturnya. Implementasi dilakukan menggunakan teknologi Next.js 15, TypeScript, Supabase, dan TinyMCE Editor.

## 6.1 Login

Program login menggunakan komponen \`LoginForm\` yang memanfaatkan Supabase Auth untuk verifikasi email dan password. Program login dijelaskan mengenai verifikasi email dan password sebagaimana ditampilkan pada tabel Tabel 6.1.

+----+----------------------------------------------------------------------------+
| 1  | const **handleSubmit** = async (*e*: React.FormEvent) =\> {                |
|    |                                                                            |
| 2  |     *e*.preventDefault();                                                  |
|    |                                                                            |
| 3  |     *// Validation*                                                        |
|    |                                                                            |
| 4  |     if (!formData.email \|\| !formData.password) {                         |
|    |                                                                            |
| 5  |       toast.error(\"Email dan password harus diisi!\");                    |
|    |                                                                            |
| 6  |       return;                                                              |
|    |                                                                            |
| 7  |     }                                                                      |
|    |                                                                            |
| 8  |     setIsLoading(true);                                                    |
|    |                                                                            |
| 9  |     try {                                                                  |
|    |                                                                            |
| 10 |       const { data, error } = await supabase.auth.signInWithPassword({     |
|    |                                                                            |
| 11 |         email: formData.email,                                             |
|    |                                                                            |
| 12 |         password: formData.password,                                       |
|    |                                                                            |
| 13 |       });                                                                  |
|    |                                                                            |
| 14 |       if (error) {                                                         |
|    |                                                                            |
| 15 |         if (error.message.includes(\"Invalid login credentials\")) {       |
|    |                                                                            |
| 16 |           toast.error(\"Email atau password salah!\");                     |
|    |                                                                            |
| 17 |         } else if (error.message.includes(\"Email not confirmed\")) {      |
|    |                                                                            |
| 18 |           toast.error(\"Silakan verifikasi email Anda terlebih dahulu!\"); |
|    |                                                                            |
| 19 |         } else {                                                           |
|    |                                                                            |
| 20 |           toast.error(error.message);                                      |
|    |                                                                            |
| 21 |         }                                                                  |
|    |                                                                            |
| 22 |         return;                                                            |
|    |                                                                            |
| 23 |       }                                                                    |
|    |                                                                            |
| 24 |       if (data.user) {                                                     |
|    |                                                                            |
| 25 |         toast.success(\"Login berhasil! Selamat datang di PaberLand!\");   |
|    |                                                                            |
| 26 |         router.push(\"/\");                                                |
|    |                                                                            |
| 27 |       }                                                                    |
|    |                                                                            |
| 28 |     } catch (error) {                                                      |
|    |                                                                            |
| 29 |       toast.error(\"Terjadi kesalahan saat login\");                       |
|    |                                                                            |
| 30 |     } finally {                                                            |
|    |                                                                            |
| 31 |       setIsLoading(false);                                                 |
|    |                                                                            |
| 32 |     }                                                                      |
|    |                                                                            |
| 33 |   };                                                                       |
|    |                                                                            |
| 34 |                                                                            |
|    |                                                                            |
| 35 |                                                                            |
|    |                                                                            |
| 36 |                                                                            |
|    |                                                                            |
| 37 |                                                                            |
|    |                                                                            |
| 38 |                                                                            |
|    |                                                                            |
| 39 |                                                                            |
|    |                                                                            |
| 40 |                                                                            |
|    |                                                                            |
| 41 |                                                                            |
|    |                                                                            |
| 42 |                                                                            |
|    |                                                                            |
| 43 |                                                                            |
|    |                                                                            |
| 44 |                                                                            |
+====+============================================================================+

: []{#_Toc215958628 .anchor}Tabel 6.1 Kode program dari fungsi login

## 6.2 Register

Pada program register menggunakan fungsi \`handleSubmit()\` yang terdapat dalam komponen \`RegisterForm\`. Fungsi ini menggunakan Supabase Auth untuk pendaftaran pengguna baru dengan validasi lengkap. Bentuk dan isi dari fungsi register ditampilkan pada Tabel 6.2.

+----+---------------------------------------------------------------------+
| 1  | const handleSubmit = async (e: React.FormEvent) =\> {               |
|    |                                                                     |
| 2  | e.preventDefault();                                                 |
|    |                                                                     |
| 3  | // Validation                                                       |
|    |                                                                     |
| 4  | if (                                                                |
|    |                                                                     |
| 5  | !formData.fullName \|\|                                             |
|    |                                                                     |
| 6  | !formData.email \|\|                                                |
|    |                                                                     |
| 7  | !formData.password \|\|                                             |
|    |                                                                     |
| 8  | !formData.phone \|\|                                                |
|    |                                                                     |
| 9  | !formData.role                                                      |
|    |                                                                     |
| 10 | ) {                                                                 |
|    |                                                                     |
| 11 | toast.error(\"Semua field harus diisi!\");                          |
|    |                                                                     |
| 12 | return;                                                             |
|    |                                                                     |
| 13 | }                                                                   |
|    |                                                                     |
| 14 | if (formData.password !== formData.confirmPassword) {               |
|    |                                                                     |
| 15 | toast.error(\"Password dan konfirmasi password tidak sama!\");      |
|    |                                                                     |
| 16 | return;                                                             |
|    |                                                                     |
| 17 | }                                                                   |
|    |                                                                     |
| 18 | if (formData.password.length \< 6) {                                |
|    |                                                                     |
| 19 | toast.error(\"Password minimal 6 karakter!\");                      |
|    |                                                                     |
| 20 | return;                                                             |
|    |                                                                     |
| 21 | }                                                                   |
|    |                                                                     |
| 22 | setIsLoading(true);                                                 |
|    |                                                                     |
| 23 | try {                                                               |
|    |                                                                     |
| 24 | // Sign up user with custom email redirect                          |
|    |                                                                     |
| 25 | const { data, error } = await supabase.auth.signUp({                |
|    |                                                                     |
| 26 | email: formData.email,                                              |
|    |                                                                     |
| 27 | password: formData.password,                                        |
|    |                                                                     |
| 28 | options: {                                                          |
|    |                                                                     |
| 29 | emailRedirectTo: \`\${window.location.origin}/auth/callback\`,      |
|    |                                                                     |
| 30 | data: {                                                             |
|    |                                                                     |
| 31 | full_name: formData.fullName,                                       |
|    |                                                                     |
| 32 | phone: formData.phone,                                              |
|    |                                                                     |
| 33 | role: formData.role,                                                |
|    |                                                                     |
| 34 | },                                                                  |
|    |                                                                     |
| 35 | },                                                                  |
|    |                                                                     |
| 36 | });                                                                 |
|    |                                                                     |
| 37 | if (error) {                                                        |
|    |                                                                     |
| 38 | console.error(\"Signup error:\", error);                            |
|    |                                                                     |
| 39 | toast.error(error.message \|\| \"Database error saving new user\"); |
|    |                                                                     |
| 40 | return;                                                             |
|    |                                                                     |
| 41 | }                                                                   |
|    |                                                                     |
| 42 | if (data.user) {                                                    |
|    |                                                                     |
| 43 | toast.success(                                                      |
|    |                                                                     |
| 44 | \"Pendaftaran berhasil! Silakan cek email untuk verifikasi.\"       |
|    |                                                                     |
| 45 | );                                                                  |
|    |                                                                     |
| 46 | // Redirect langsung ke halaman login                               |
|    |                                                                     |
| 47 | router.push(\"/auth/login?message=check_email\");                   |
|    |                                                                     |
| 48 | }                                                                   |
|    |                                                                     |
| 49 | } catch (error) {                                                   |
|    |                                                                     |
| 50 | console.error(\"Registration error:\", error);                      |
|    |                                                                     |
| 51 | toast.error(\"Terjadi kesalahan saat mendaftar\");                  |
|    |                                                                     |
| 52 | } finally {                                                         |
|    |                                                                     |
| 53 | setIsLoading(false);                                                |
|    |                                                                     |
| 54 | }                                                                   |
|    |                                                                     |
| 55 | };                                                                  |
|    |                                                                     |
| 56 |                                                                     |
|    |                                                                     |
| 57 |                                                                     |
|    |                                                                     |
| 58 |                                                                     |
|    |                                                                     |
| 59 |                                                                     |
|    |                                                                     |
| 60 |                                                                     |
|    |                                                                     |
| 61 |                                                                     |
|    |                                                                     |
| 62 |                                                                     |
|    |                                                                     |
| 63 |                                                                     |
|    |                                                                     |
| 64 |                                                                     |
|    |                                                                     |
| 65 |                                                                     |
|    |                                                                     |
| 66 |                                                                     |
|    |                                                                     |
| 67 |                                                                     |
|    |                                                                     |
| 68 |                                                                     |
|    |                                                                     |
| 69 |                                                                     |
+====+=====================================================================+

: []{#_Toc215958629 .anchor}Tabel 6.2 Kode program dari fungsi register

## 6.3 Logout

Pada program logout menggunakan fungsi \`signOut()\` yang terdapat dalam \`AuthContext\`. Fungsi ini menghapus session pengguna dan mengarahkan ke halaman beranda. Bentuk dan isi dari fungsi logout ditampilkan pada Tabel 6.3.

+----+-----------------------------------------------------------------+
| 1  | const signOut = async () =\> {                                  |
|    |                                                                 |
| 2  | try {                                                           |
|    |                                                                 |
| 3  | const { error } = await supabase.auth.signOut();                |
|    |                                                                 |
| 4  | if (error) {                                                    |
|    |                                                                 |
| 5  | console.error(\"❌ Error signing out:\", error);                |
|    |                                                                 |
| 6  | } else {                                                        |
|    |                                                                 |
| 7  | setUser(null);                                                  |
|    |                                                                 |
| 8  | router.push(\"/\");                                             |
|    |                                                                 |
| 9  | router.refresh();                                               |
|    |                                                                 |
| 10 | }                                                               |
|    |                                                                 |
| 11 | } catch (error) {                                               |
|    |                                                                 |
| 12 | console.error(\"❌ Unexpected error in signOut:\", error);      |
|    |                                                                 |
| 13 | }                                                               |
|    |                                                                 |
| 14 | };                                                              |
|    |                                                                 |
| 15 |                                                                 |
|    |                                                                 |
| 16 |                                                                 |
+====+=================================================================+

: []{#_Toc215958630 .anchor}Tabel 6.3 Kode program dari fungsi logout

## 6.4 Reset Password

Pada program reset password menggunakan fungsi \`handleSubmit()\` yang terdapat dalam komponen \`ResetPasswordPage\`. Fungsi ini menggunakan Supabase Auth untuk mengubah password pengguna setelah verifikasi token. Bentuk dan isi dari fungsi reset password ditampilkan pada Tabel 6.4

+----+---------------------------------------------------------------------+
| 1  | const handleSubmit = async (e: React.FormEvent) =\> {               |
|    |                                                                     |
| 2  | e.preventDefault();                                                 |
|    |                                                                     |
| 3  | // Validation                                                       |
|    |                                                                     |
| 4  | if (                                                                |
|    |                                                                     |
| 5  | !formData.fullName \|\|                                             |
|    |                                                                     |
| 6  | !formData.email \|\|                                                |
|    |                                                                     |
| 7  | !formData.password \|\|                                             |
|    |                                                                     |
| 8  | !formData.phone \|\|                                                |
|    |                                                                     |
| 9  | !formData.role                                                      |
|    |                                                                     |
| 10 | ) {                                                                 |
|    |                                                                     |
| 11 | toast.error(\"Semua field harus diisi!\");                          |
|    |                                                                     |
| 12 | return;                                                             |
|    |                                                                     |
| 13 | }                                                                   |
|    |                                                                     |
| 14 | if (formData.password !== formData.confirmPassword) {               |
|    |                                                                     |
| 15 | toast.error(\"Password dan konfirmasi password tidak sama!\");      |
|    |                                                                     |
| 16 | return;                                                             |
|    |                                                                     |
| 17 | }                                                                   |
|    |                                                                     |
| 18 | if (formData.password.length \< 6) {                                |
|    |                                                                     |
| 19 | toast.error(\"Password minimal 6 karakter!\");                      |
|    |                                                                     |
| 20 | return;                                                             |
|    |                                                                     |
| 21 | }                                                                   |
|    |                                                                     |
| 22 | setIsLoading(true);                                                 |
|    |                                                                     |
| 23 | try {                                                               |
|    |                                                                     |
| 24 | // Sign up user with custom email redirect                          |
|    |                                                                     |
| 25 | const { data, error } = await supabase.auth.signUp({                |
|    |                                                                     |
| 26 | email: formData.email,                                              |
|    |                                                                     |
| 27 | password: formData.password,                                        |
|    |                                                                     |
| 28 | options: {                                                          |
|    |                                                                     |
| 29 | emailRedirectTo: \`\${window.location.origin}/auth/callback\`,      |
|    |                                                                     |
| 30 | data: {                                                             |
|    |                                                                     |
| 31 | full_name: formData.fullName,                                       |
|    |                                                                     |
| 32 | phone: formData.phone,                                              |
|    |                                                                     |
| 33 | role: formData.role,                                                |
|    |                                                                     |
| 34 | },                                                                  |
|    |                                                                     |
| 35 | },                                                                  |
|    |                                                                     |
| 36 | });                                                                 |
|    |                                                                     |
| 37 | if (error) {                                                        |
|    |                                                                     |
| 38 | console.error(\"Signup error:\", error);                            |
|    |                                                                     |
| 39 | toast.error(error.message \|\| \"Database error saving new user\"); |
|    |                                                                     |
| 40 | return;                                                             |
|    |                                                                     |
| 41 | }                                                                   |
|    |                                                                     |
| 42 | if (data.user) {                                                    |
|    |                                                                     |
| 43 | toast.success(                                                      |
|    |                                                                     |
| 44 | \"Pendaftaran berhasil! Silakan cek email untuk verifikasi.\"       |
|    |                                                                     |
| 45 | );                                                                  |
|    |                                                                     |
| 46 | // Redirect langsung ke halaman login                               |
|    |                                                                     |
| 47 | router.push(\"/auth/login?message=check_email\");                   |
|    |                                                                     |
| 48 | }                                                                   |
|    |                                                                     |
| 49 | } catch (error) {                                                   |
|    |                                                                     |
| 50 | console.error(\"Registration error:\", error);                      |
|    |                                                                     |
| 51 | toast.error(\"Terjadi kesalahan saat mendaftar\");                  |
|    |                                                                     |
| 52 | } finally {                                                         |
|    |                                                                     |
| 53 | setIsLoading(false);                                                |
|    |                                                                     |
| 54 | }                                                                   |
|    |                                                                     |
| 55 | };                                                                  |
|    |                                                                     |
| 56 |                                                                     |
|    |                                                                     |
| 57 |                                                                     |
|    |                                                                     |
| 58 |                                                                     |
|    |                                                                     |
| 59 |                                                                     |
|    |                                                                     |
| 60 |                                                                     |
|    |                                                                     |
| 61 |                                                                     |
|    |                                                                     |
| 62 |                                                                     |
|    |                                                                     |
| 63 |                                                                     |
|    |                                                                     |
| 64 |                                                                     |
|    |                                                                     |
| 65 |                                                                     |
|    |                                                                     |
| 66 |                                                                     |
|    |                                                                     |
| 67 |                                                                     |
|    |                                                                     |
| 68 |                                                                     |
|    |                                                                     |
| 69 |                                                                     |
|    |                                                                     |
| 70 |                                                                     |
|    |                                                                     |
| 71 |                                                                     |
|    |                                                                     |
| 72 |                                                                     |
|    |                                                                     |
| 73 |                                                                     |
|    |                                                                     |
| 74 |                                                                     |
|    |                                                                     |
| 75 |                                                                     |
|    |                                                                     |
| 76 |                                                                     |
|    |                                                                     |
| 77 |                                                                     |
|    |                                                                     |
| 78 |                                                                     |
+====+=====================================================================+

: []{#_Toc215958631 .anchor}Tabel 6.4 Kode program dari reset password

## 6. 5 Tambah Artikel

Pada program tambah artikel menggunakan fungsi \`handleSubmit()\` yang terdapat dalam komponen \`WriteArticleForm\`. Fungsi ini menyimpan artikel baru ke database dengan validasi judul, konten, dan kategori. Bentuk dan isi dari fungsi tambah artikel ditampilkan pada Tabel 6.5

+-----+---------------------------------------------------------------------------+
| 1   | const handleSubmit = async (                                              |
|     |                                                                           |
| 2   | e: React.FormEvent \| null,                                               |
|     |                                                                           |
| 3   | published: boolean                                                        |
|     |                                                                           |
| 4   | ) =\> {                                                                   |
|     |                                                                           |
| 5   | if (e) e.preventDefault();                                                |
|     |                                                                           |
| 6   | if (!formData.title \|\| !formData.content \|\| !formData.category) {     |
|     |                                                                           |
| 7   | toast.error(\"Judul, konten, dan kategori harus diisi!\");                |
|     |                                                                           |
| 8   | return;                                                                   |
|     |                                                                           |
| 9   | }                                                                         |
|     |                                                                           |
| 10  | if (!user) {                                                              |
|     |                                                                           |
| 11  | toast.error(\"Anda harus login terlebih dahulu!\");                       |
|     |                                                                           |
| 12  | return;                                                                   |
|     |                                                                           |
| 13  | }                                                                         |
|     |                                                                           |
| 14  | setIsLoading(true);                                                       |
|     |                                                                           |
| 15  | try {                                                                     |
|     |                                                                           |
| 16  | const now = new Date().toISOString();                                     |
|     |                                                                           |
| 17  | if (editArticle) {                                                        |
|     |                                                                           |
| 18  | // Update existing article                                                |
|     |                                                                           |
| 19  | const result = await articleManagement.updateArticle(                     |
|     |                                                                           |
| 20  | editArticle.id,                                                           |
|     |                                                                           |
| 21  | user.id,                                                                  |
|     |                                                                           |
| 22  | {                                                                         |
|     |                                                                           |
| 23  | title: formData.title,                                                    |
|     |                                                                           |
| 24  | content: formData.content,                                                |
|     |                                                                           |
| 25  | excerpt: formData.excerpt \|\| formData.content.slice(0, 200) + \"\...\", |
|     |                                                                           |
| 26  | category: formData.category,                                              |
|     |                                                                           |
| 27  | cover_image: formData.coverImage \|\| null,                               |
|     |                                                                           |
| 28  | published: published,                                                     |
|     |                                                                           |
| 29  | scheduled_at: formData.scheduledAt \|\| null,                             |
|     |                                                                           |
| 30  | slug: generateSlug(formData.title),                                       |
|     |                                                                           |
| 31  | updated_at: now,                                                          |
|     |                                                                           |
| 32  | }                                                                         |
|     |                                                                           |
| 33  | );                                                                        |
|     |                                                                           |
| 34  | if (result.success) {                                                     |
|     |                                                                           |
| 35  | if (published) {                                                          |
|     |                                                                           |
| 36  | toast.success(\"🎉 Konten berhasil diperbarui dan dipublikasikan!\");     |
|     |                                                                           |
| 37  | router.push(\`/article/\${result.data.slug}\`);                           |
|     |                                                                           |
| 38  | } else {                                                                  |
|     |                                                                           |
| 39  | toast.success(\"📝 Konten berhasil diperbarui sebagai draft!\");          |
|     |                                                                           |
| 40  | router.push(\"/my-articles\");                                            |
|     |                                                                           |
| 41  | }                                                                         |
|     |                                                                           |
| 42  | } else {                                                                  |
|     |                                                                           |
| 43  | toast.error(\"Gagal memperbarui konten: \" + result.error);               |
|     |                                                                           |
| 44  | }                                                                         |
|     |                                                                           |
| 45  | } else {                                                                  |
|     |                                                                           |
| 46  | // Create new article (existing code)                                     |
|     |                                                                           |
| 47  | let slug = generateSlug(formData.title);                                  |
|     |                                                                           |
| 48  | // Cek slug unik, jika sudah ada tambahkan angka di belakang              |
|     |                                                                           |
| 49  | let uniqueSlug = slug;                                                    |
|     |                                                                           |
| 50  | let counter = 1;                                                          |
|     |                                                                           |
| 51  | while (true) {                                                            |
|     |                                                                           |
| 52  | const { data: existing } = await supabase                                 |
|     |                                                                           |
| 53  | .from(\"articles\")                                                       |
|     |                                                                           |
| 54  | .select(\"id\")                                                           |
|     |                                                                           |
| 55  | .eq(\"slug\", uniqueSlug)                                                 |
|     |                                                                           |
| 56  | .single();                                                                |
|     |                                                                           |
| 57  | if (!existing) break;                                                     |
|     |                                                                           |
| 58  | uniqueSlug = \`\${slug}-\${counter++}\`;                                  |
|     |                                                                           |
| 59  | }                                                                         |
|     |                                                                           |
| 60  | slug = uniqueSlug;                                                        |
|     |                                                                           |
| 61  | const articleData = {                                                     |
|     |                                                                           |
| 62  | title: formData.title,                                                    |
|     |                                                                           |
| 63  | content: formData.content,                                                |
|     |                                                                           |
| 64  | excerpt: formData.excerpt \|\| formData.content.slice(0, 200) + \"\...\", |
|     |                                                                           |
| 65  | category: formData.category,                                              |
|     |                                                                           |
| 66  | cover_image: formData.coverImage \|\| null,                               |
|     |                                                                           |
| 67  | author_id: user.id,                                                       |
|     |                                                                           |
| 68  | published: published,                                                     |
|     |                                                                           |
| 69  | scheduled_at: formData.scheduledAt \|\| null,                             |
|     |                                                                           |
| 70  | slug: slug,                                                               |
|     |                                                                           |
| 71  | created_at: now,                                                          |
|     |                                                                           |
| 72  | updated_at: now,                                                          |
|     |                                                                           |
| 73  | };                                                                        |
|     |                                                                           |
| 74  | const { data, error } = await supabase                                    |
|     |                                                                           |
| 75  | .from(\"articles\")                                                       |
|     |                                                                           |
| 76  | .insert(\[articleData\])                                                  |
|     |                                                                           |
| 77  | .select()                                                                 |
|     |                                                                           |
| 78  | .single();                                                                |
|     |                                                                           |
| 79  | if (error) {                                                              |
|     |                                                                           |
| 80  | console.error(\"Error creating article:\", error);                        |
|     |                                                                           |
| 81  | toast.error(\"Gagal menyimpan konten: \" + error.message);                |
|     |                                                                           |
| 82  | return;                                                                   |
|     |                                                                           |
| 83  | }                                                                         |
|     |                                                                           |
| 84  | if (published) {                                                          |
|     |                                                                           |
| 85  | toast.success(\"🎉 Konten berhasil dipublikasikan!\");                    |
|     |                                                                           |
| 86  | router.push(\`/article/\${data.slug}\`);                                  |
|     |                                                                           |
| 87  | } else {                                                                  |
|     |                                                                           |
| 88  | toast.success(\"📝 Konten berhasil disimpan sebagai draft!\");            |
|     |                                                                           |
| 89  | router.push(\"/\");                                                       |
|     |                                                                           |
| 90  | }                                                                         |
|     |                                                                           |
| 91  | }                                                                         |
|     |                                                                           |
| 92  | } catch (error) {                                                         |
|     |                                                                           |
| 93  | console.error(\"Error:\", error);                                         |
|     |                                                                           |
| 94  | toast.error(\"Terjadi kesalahan saat menyimpan konten\");                 |
|     |                                                                           |
| 95  | } finally {                                                               |
|     |                                                                           |
| 96  | setIsLoading(false);                                                      |
|     |                                                                           |
| 97  | }                                                                         |
|     |                                                                           |
| 98  | };                                                                        |
|     |                                                                           |
| 99  |                                                                           |
|     |                                                                           |
| 100 |                                                                           |
|     |                                                                           |
| 101 |                                                                           |
|     |                                                                           |
| 102 |                                                                           |
|     |                                                                           |
| 103 |                                                                           |
|     |                                                                           |
| 104 |                                                                           |
|     |                                                                           |
| 105 |                                                                           |
|     |                                                                           |
| 106 |                                                                           |
|     |                                                                           |
| 107 |                                                                           |
|     |                                                                           |
| 108 |                                                                           |
|     |                                                                           |
| 109 |                                                                           |
|     |                                                                           |
| 110 |                                                                           |
|     |                                                                           |
| 111 |                                                                           |
|     |                                                                           |
| 112 |                                                                           |
|     |                                                                           |
| 113 |                                                                           |
|     |                                                                           |
| 114 |                                                                           |
|     |                                                                           |
| 115 |                                                                           |
|     |                                                                           |
| 116 |                                                                           |
|     |                                                                           |
| 117 |                                                                           |
|     |                                                                           |
| 118 |                                                                           |
|     |                                                                           |
| 119 |                                                                           |
|     |                                                                           |
| 120 |                                                                           |
|     |                                                                           |
| 121 |                                                                           |
|     |                                                                           |
| 122 |                                                                           |
|     |                                                                           |
| 123 |                                                                           |
|     |                                                                           |
| 124 |                                                                           |
|     |                                                                           |
| 125 |                                                                           |
|     |                                                                           |
| 126 |                                                                           |
|     |                                                                           |
| 127 |                                                                           |
|     |                                                                           |
| 128 |                                                                           |
|     |                                                                           |
| 129 |                                                                           |
|     |                                                                           |
| 130 |                                                                           |
|     |                                                                           |
| 131 |                                                                           |
|     |                                                                           |
| 132 |                                                                           |
|     |                                                                           |
| 133 |                                                                           |
|     |                                                                           |
| 134 |                                                                           |
|     |                                                                           |
| 135 |                                                                           |
|     |                                                                           |
| 136 |                                                                           |
|     |                                                                           |
| 137 |                                                                           |
|     |                                                                           |
| 138 |                                                                           |
|     |                                                                           |
| 139 |                                                                           |
|     |                                                                           |
| 140 |                                                                           |
|     |                                                                           |
| 141 |                                                                           |
+=====+===========================================================================+

: []{#_Toc215958632 .anchor}Tabel 6.5 Kode program dari fungsi tambah artikel

## 3.6 Update Artikel

Pada program update artikel menggunakan fungsi \`updateArticle()\` yang terdapat dalam \`articleManagement\`. Fungsi ini memperbarui artikel yang sudah ada dengan validasi kepemilikan. Bentuk dan isi dari fungsi update artikel ditampilkan pada Tabel 6.6

+----+---------------------------------------------------------------------------------------+
| 1  | async updateArticle(articleId: string, userId: string, updates: Partial\<Article\>) { |
|    |                                                                                       |
| 2  | const { data, error } = await supabase                                                |
|    |                                                                                       |
| 3  | .from(\'articles\')                                                                   |
|    |                                                                                       |
| 4  | .update({                                                                             |
|    |                                                                                       |
| 5  | \...updates,                                                                          |
|    |                                                                                       |
| 6  | updated_at: new Date().toISOString()                                                  |
|    |                                                                                       |
| 7  | })                                                                                    |
|    |                                                                                       |
| 8  | .eq(\'id\', articleId)                                                                |
|    |                                                                                       |
| 9  | .eq(\'author_id\', userId)                                                            |
|    |                                                                                       |
| 10 | .select()                                                                             |
|    |                                                                                       |
| 11 | .single();                                                                            |
|    |                                                                                       |
| 12 | if (error) {                                                                          |
|    |                                                                                       |
| 13 | console.error(\'Error updating article:\', error);                                    |
|    |                                                                                       |
| 14 | return { success: false, error: error.message };                                      |
|    |                                                                                       |
| 15 | }                                                                                     |
|    |                                                                                       |
| 16 | return { success: true, data, error: undefined };                                     |
|    |                                                                                       |
| 17 | },                                                                                    |
|    |                                                                                       |
| 18 |                                                                                       |
|    |                                                                                       |
| 19 |                                                                                       |
|    |                                                                                       |
| 20 |                                                                                       |
+====+=======================================================================================+

: []{#_Toc215958633 .anchor}Tabel 6.6 Kode program dari fungsi update artikel

## 6.7 Hapus Artikel

Pada program hapus artikel menggunakan fungsi \`deleteArticle()\` yang terdapat dalam \`articleManagement\`. Fungsi ini menghapus artikel dari database dengan validasi kepemilikan. Bentuk dan isi dari fungsi hapus artikel ditampilkan pada Tabel 6.7

+----+-----------------------------------------------------------------+
| 1  | async deleteArticle(articleId: string, userId: string) {        |
|    |                                                                 |
| 2  | const { error } = await supabase                                |
|    |                                                                 |
| 3  | .from(\'articles\')                                             |
|    |                                                                 |
| 4  | .delete()                                                       |
|    |                                                                 |
| 5  | .eq(\'id\', articleId)                                          |
|    |                                                                 |
| 6  | .eq(\'author_id\', userId);                                     |
|    |                                                                 |
| 7  | if (error) {                                                    |
|    |                                                                 |
| 8  | console.error(\'Error deleting article:\', error);              |
|    |                                                                 |
| 9  | throw error;                                                    |
|    |                                                                 |
| 10 | }                                                               |
|    |                                                                 |
| 11 | return { success: true };                                       |
|    |                                                                 |
| 12 | },                                                              |
|    |                                                                 |
| 13 |                                                                 |
|    |                                                                 |
| 14 |                                                                 |
|    |                                                                 |
| 15 |                                                                 |
+====+=================================================================+

: []{#_Toc215958634 .anchor}Tabel 6.7 Kode program dari fungsi hapus artikel

## 6.8 Tambah Komentar

Pada program tambah komentar menggunakan fungsi \`addComment()\` yang terdapat dalam \`commentHelpers\`. Fungsi ini menambahkan komentar baru pada artikel dengan update real-time pada jumlah komentar. Bentuk dan isi dari fungsi tambah komentar ditampilkan pada Tabel 6.8

+----+---------------------------------------------------------------------------------------------+
| 1  | async addComment(articleId: string, authorId: string, content: string, parentId?: string) { |
|    |                                                                                             |
| 2  | try {                                                                                       |
|    |                                                                                             |
| 3  | const { data, error } = await supabase                                                      |
|    |                                                                                             |
| 4  | .from(\'comments\')                                                                         |
|    |                                                                                             |
| 5  | .insert(\[{                                                                                 |
|    |                                                                                             |
| 6  | article_id: articleId,                                                                      |
|    |                                                                                             |
| 7  | author_id: authorId,                                                                        |
|    |                                                                                             |
| 8  | content: content.trim(),                                                                    |
|    |                                                                                             |
| 9  | parent_id: parentId \|\| null,                                                              |
|    |                                                                                             |
| 10 | }\])                                                                                        |
|    |                                                                                             |
| 11 | .select()                                                                                   |
|    |                                                                                             |
| 12 | .single();                                                                                  |
|    |                                                                                             |
| 13 | if (error) {                                                                                |
|    |                                                                                             |
| 14 | console.error(\'Error adding comment:\', error);                                            |
|    |                                                                                             |
| 15 | return { success: false, error: error.message };                                            |
|    |                                                                                             |
| 16 | }                                                                                           |
|    |                                                                                             |
| 17 | // Update article comment count in real-time                                                |
|    |                                                                                             |
| 18 | await this.updateArticleCommentCount(articleId);                                            |
|    |                                                                                             |
| 19 | return { success: true, data };                                                             |
|    |                                                                                             |
| 20 | } catch (error) {                                                                           |
|    |                                                                                             |
| 21 | console.error(\'Unexpected error adding comment:\', error);                                 |
|    |                                                                                             |
| 22 | return { success: false, error: \'Terjadi kesalahan saat menambahkan komentar\' };          |
|    |                                                                                             |
| 23 | }                                                                                           |
|    |                                                                                             |
| 24 | },                                                                                          |
|    |                                                                                             |
| 25 |                                                                                             |
|    |                                                                                             |
| 26 |                                                                                             |
|    |                                                                                             |
| 27 |                                                                                             |
|    |                                                                                             |
| 28 |                                                                                             |
|    |                                                                                             |
| 29 |                                                                                             |
|    |                                                                                             |
| 30 |                                                                                             |
|    |                                                                                             |
| 31 |                                                                                             |
+====+=============================================================================================+

: []{#_Toc215958635 .anchor}Tabel 6.8 Kode program dari fungsi tambah komentar

## 6.9 Update Komentar

Pada program update komentar menggunakan fungsi \`updateComment()\` yang terdapat dalam \`commentHelpers\`. Fungsi ini memperbarui komentar yang sudah ada dengan validasi kepemilikan. Bentuk dan isi dari fungsi update komentar ditampilkan pada Tabel 6.9

+----+-----------------------------------------------------------------------------+
| 1  | async updateComment(commentId: string, authorId: string, content: string) { |
|    |                                                                             |
| 2  | const { data, error } = await supabase                                      |
|    |                                                                             |
| 3  | .from(\'comments\')                                                         |
|    |                                                                             |
| 4  | .update({                                                                   |
|    |                                                                             |
| 5  | content: content.trim(),                                                    |
|    |                                                                             |
| 6  | updated_at: new Date().toISOString()                                        |
|    |                                                                             |
| 7  | })                                                                          |
|    |                                                                             |
| 8  | .eq(\'id\', commentId)                                                      |
|    |                                                                             |
| 9  | .eq(\'author_id\', authorId)                                                |
|    |                                                                             |
| 10 | .select(\`                                                                  |
|    |                                                                             |
| 11 | id,                                                                         |
|    |                                                                             |
| 12 | article_id,                                                                 |
|    |                                                                             |
| 13 | author_id,                                                                  |
|    |                                                                             |
| 14 | content,                                                                    |
|    |                                                                             |
| 15 | parent_id,                                                                  |
|    |                                                                             |
| 16 | created_at,                                                                 |
|    |                                                                             |
| 17 | updated_at,                                                                 |
|    |                                                                             |
| 18 | profiles:author_id (                                                        |
|    |                                                                             |
| 19 | id,                                                                         |
|    |                                                                             |
| 20 | full_name,                                                                  |
|    |                                                                             |
| 21 | avatar_url                                                                  |
|    |                                                                             |
| 22 | )                                                                           |
|    |                                                                             |
| 23 | \`)                                                                         |
|    |                                                                             |
| 24 | .single();                                                                  |
|    |                                                                             |
| 25 | if (error) {                                                                |
|    |                                                                             |
| 26 | console.error(\'Error updating comment:\', error);                          |
|    |                                                                             |
| 27 | return { success: false, error: error.message };                            |
|    |                                                                             |
| 28 | }                                                                           |
|    |                                                                             |
| 29 | return { success: true, data };                                             |
|    |                                                                             |
| 30 | },                                                                          |
|    |                                                                             |
| 31 |                                                                             |
|    |                                                                             |
| 32 |                                                                             |
|    |                                                                             |
| 33 |                                                                             |
|    |                                                                             |
| 34 |                                                                             |
|    |                                                                             |
| 35 |                                                                             |
|    |                                                                             |
| 36 |                                                                             |
|    |                                                                             |
| 37 |                                                                             |
|    |                                                                             |
| 38 |                                                                             |
+====+=============================================================================+

: []{#_Toc215958636 .anchor}Tabel 6.9 Kode program dari fungsi update komentar

## 6.10 Hapus Komentar

Pada program hapus komentar menggunakan fungsi \`deleteComment()\` yang terdapat dalam \`commentHelpers\`. Fungsi ini menghapus komentar dari database dengan validasi kepemilikan dan update real-time pada jumlah komentar. Bentuk dan isi dari fungsi hapus komentar ditampilkan pada Tabel 6.10

+----+----------------------------------------------------------------------------------+
| 1  | async deleteComment(commentId: string, authorId: string) {                       |
|    |                                                                                  |
| 2  | try {                                                                            |
|    |                                                                                  |
| 3  | // Get article ID before deleting                                                |
|    |                                                                                  |
| 4  | const { data: comment, error: fetchError } = await supabase                      |
|    |                                                                                  |
| 5  | .from(\'comments\')                                                              |
|    |                                                                                  |
| 6  | .select(\'article_id\')                                                          |
|    |                                                                                  |
| 7  | .eq(\'id\', commentId)                                                           |
|    |                                                                                  |
| 8  | .eq(\'author_id\', authorId)                                                     |
|    |                                                                                  |
| 9  | .single();                                                                       |
|    |                                                                                  |
| 10 | if (fetchError) {                                                                |
|    |                                                                                  |
| 11 | console.error(\'Error fetching comment for deletion:\', fetchError);             |
|    |                                                                                  |
| 12 | return { success: false, error: \'Komentar tidak ditemukan\' };                  |
|    |                                                                                  |
| 13 | }                                                                                |
|    |                                                                                  |
| 14 | const { error } = await supabase                                                 |
|    |                                                                                  |
| 15 | .from(\'comments\')                                                              |
|    |                                                                                  |
| 16 | .delete()                                                                        |
|    |                                                                                  |
| 17 | .eq(\'id\', commentId)                                                           |
|    |                                                                                  |
| 18 | .eq(\'author_id\', authorId);                                                    |
|    |                                                                                  |
| 19 | if (error) {                                                                     |
|    |                                                                                  |
| 20 | console.error(\'Error deleting comment:\', error);                               |
|    |                                                                                  |
| 21 | return { success: false, error: error.message };                                 |
|    |                                                                                  |
| 22 | }                                                                                |
|    |                                                                                  |
| 23 | // Update article comment count in real-time                                     |
|    |                                                                                  |
| 24 | if (comment?.article_id) {                                                       |
|    |                                                                                  |
| 25 | await this.updateArticleCommentCount(comment.article_id);                        |
|    |                                                                                  |
| 26 | }                                                                                |
|    |                                                                                  |
| 27 | return { success: true };                                                        |
|    |                                                                                  |
| 28 | } catch (error) {                                                                |
|    |                                                                                  |
| 29 | console.error(\'Unexpected error deleting comment:\', error);                    |
|    |                                                                                  |
| 30 | return { success: false, error: \'Terjadi kesalahan saat menghapus komentar\' }; |
|    |                                                                                  |
| 31 | }                                                                                |
|    |                                                                                  |
| 32 | },                                                                               |
|    |                                                                                  |
| 33 |                                                                                  |
|    |                                                                                  |
| 34 |                                                                                  |
|    |                                                                                  |
| 35 |                                                                                  |
|    |                                                                                  |
| 36 |                                                                                  |
|    |                                                                                  |
| 37 |                                                                                  |
|    |                                                                                  |
| 38 |                                                                                  |
|    |                                                                                  |
| 39 |                                                                                  |
|    |                                                                                  |
| 40 |                                                                                  |
|    |                                                                                  |
| 41 |                                                                                  |
|    |                                                                                  |
| 42 |                                                                                  |
|    |                                                                                  |
| 43 |                                                                                  |
|    |                                                                                  |
| 44 |                                                                                  |
|    |                                                                                  |
| 45 |                                                                                  |
|    |                                                                                  |
| 46 |                                                                                  |
+====+==================================================================================+

: []{#_Toc215958637 .anchor}Tabel 6.10 Kode program dari fungsi hapus komentar

## 6.11 Like Artikel

Pada program like artikel menggunakan fungsi \`toggleLike()\` yang terdapat dalam \`likeHelpers\`. Fungsi ini menambahkan atau menghapus like pada artikel dengan update real-time pada jumlah like. Bentuk dan isi dari fungsi like artikel ditampilkan pada Tabel 6.11

+----+--------------------------------------------------------------------------------------------------------------------------+
| 1  | async toggleLike(articleId: string, userId: string): Promise\<{ success: boolean; isLiked: boolean; error?: string }\> { |
|    |                                                                                                                          |
| 2  | try {                                                                                                                    |
|    |                                                                                                                          |
| 3  | // First check if user has already liked                                                                                 |
|    |                                                                                                                          |
| 4  | const { data: existingLike, error: checkError } = await supabase                                                         |
|    |                                                                                                                          |
| 5  | .from(\'article_likes\')                                                                                                 |
|    |                                                                                                                          |
| 6  | .select(\'id\')                                                                                                          |
|    |                                                                                                                          |
| 7  | .eq(\'article_id\', articleId)                                                                                           |
|    |                                                                                                                          |
| 8  | .eq(\'user_id\', userId)                                                                                                 |
|    |                                                                                                                          |
| 9  | .single();                                                                                                               |
|    |                                                                                                                          |
| 10 | if (checkError && checkError.code !== \'PGRST116\') {                                                                    |
|    |                                                                                                                          |
| 11 | console.error(\'Error checking existing like:\', checkError);                                                            |
|    |                                                                                                                          |
| 12 | return { success: false, isLiked: false, error: checkError.message };                                                    |
|    |                                                                                                                          |
| 13 | }                                                                                                                        |
|    |                                                                                                                          |
| 14 | if (existingLike) {                                                                                                      |
|    |                                                                                                                          |
| 15 | // Unlike - remove the like                                                                                              |
|    |                                                                                                                          |
| 16 | const { error: deleteError } = await supabase                                                                            |
|    |                                                                                                                          |
| 17 | .from(\'article_likes\')                                                                                                 |
|    |                                                                                                                          |
| 18 | .delete()                                                                                                                |
|    |                                                                                                                          |
| 19 | .eq(\'article_id\', articleId)                                                                                           |
|    |                                                                                                                          |
| 20 | .eq(\'user_id\', userId);                                                                                                |
|    |                                                                                                                          |
| 21 | if (deleteError) {                                                                                                       |
|    |                                                                                                                          |
| 22 | console.error(\'Error removing like:\', deleteError);                                                                    |
|    |                                                                                                                          |
| 23 | return { success: false, isLiked: true, error: deleteError.message };                                                    |
|    |                                                                                                                          |
| 24 | }                                                                                                                        |
|    |                                                                                                                          |
| 25 | // Sync likes count after unlike                                                                                         |
|    |                                                                                                                          |
| 26 | await this.syncLikesCount(articleId);                                                                                    |
|    |                                                                                                                          |
| 27 | return { success: true, isLiked: false };                                                                                |
|    |                                                                                                                          |
| 28 | } else {                                                                                                                 |
|    |                                                                                                                          |
| 29 | // Like - add the like                                                                                                   |
|    |                                                                                                                          |
| 30 | const { error: insertError } = await supabase                                                                            |
|    |                                                                                                                          |
| 31 | .from(\'article_likes\')                                                                                                 |
|    |                                                                                                                          |
| 32 | .insert(\[{                                                                                                              |
|    |                                                                                                                          |
| 33 | article_id: articleId,                                                                                                   |
|    |                                                                                                                          |
| 34 | user_id: userId                                                                                                          |
|    |                                                                                                                          |
| 35 | }\]);                                                                                                                    |
|    |                                                                                                                          |
| 36 | if (insertError) {                                                                                                       |
|    |                                                                                                                          |
| 37 | console.error(\'Error adding like:\', insertError);                                                                      |
|    |                                                                                                                          |
| 38 | return { success: false, isLiked: false, error: insertError.message };                                                   |
|    |                                                                                                                          |
| 39 | }                                                                                                                        |
|    |                                                                                                                          |
| 40 | // Sync likes count after like                                                                                           |
|    |                                                                                                                          |
| 41 | await this.syncLikesCount(articleId);                                                                                    |
|    |                                                                                                                          |
| 42 | return { success: true, isLiked: true };                                                                                 |
|    |                                                                                                                          |
| 43 | }                                                                                                                        |
|    |                                                                                                                          |
| 44 | } catch (error) {                                                                                                        |
|    |                                                                                                                          |
| 45 | console.error(\'Error toggling like:\', error);                                                                          |
|    |                                                                                                                          |
| 46 | return { success: false, isLiked: false, error: \'Terjadi kesalahan sistem\' };                                          |
|    |                                                                                                                          |
| 47 | }                                                                                                                        |
|    |                                                                                                                          |
| 48 | },                                                                                                                       |
|    |                                                                                                                          |
| 49 |                                                                                                                          |
|    |                                                                                                                          |
| 50 |                                                                                                                          |
|    |                                                                                                                          |
| 51 |                                                                                                                          |
|    |                                                                                                                          |
| 52 |                                                                                                                          |
|    |                                                                                                                          |
| 53 |                                                                                                                          |
|    |                                                                                                                          |
| 54 |                                                                                                                          |
|    |                                                                                                                          |
| 55 |                                                                                                                          |
|    |                                                                                                                          |
| 56 |                                                                                                                          |
|    |                                                                                                                          |
| 57 |                                                                                                                          |
|    |                                                                                                                          |
| 58 |                                                                                                                          |
|    |                                                                                                                          |
| 59 |                                                                                                                          |
|    |                                                                                                                          |
| 60 |                                                                                                                          |
|    |                                                                                                                          |
| 61 |                                                                                                                          |
|    |                                                                                                                          |
| 62 |                                                                                                                          |
|    |                                                                                                                          |
| 63 |                                                                                                                          |
|    |                                                                                                                          |
| 64 |                                                                                                                          |
|    |                                                                                                                          |
| 65 |                                                                                                                          |
|    |                                                                                                                          |
| 66 |                                                                                                                          |
|    |                                                                                                                          |
| 67 |                                                                                                                          |
+====+==========================================================================================================================+

: []{#_Toc215958638 .anchor}Tabel 6.11 Kode program dari fungsi like artikel

## 6.12 Kelola Pengguna (Admin)

Pada program kelola pengguna menggunakan fungsi \`promoteToAdmin()\` dan \`deleteUser()\` yang terdapat dalam \`adminHelpers\`. Fungsi-fungsi ini digunakan untuk mengelola pengguna oleh administrator. Bentuk dan isi dari fungsi kelola pengguna ditampilkan pada Tabel 6.12

+----+---------------------------------------------------------------------------------------------+
| 1  | async promoteToAdmin(userId: string, adminId: string) {                                     |
|    |                                                                                             |
| 2  | try {                                                                                       |
|    |                                                                                             |
| 3  | const { error } = await supabase.rpc(\'promote_to_admin\', {                                |
|    |                                                                                             |
| 4  | p_user_id: userId                                                                           |
|    |                                                                                             |
| 5  | });                                                                                         |
|    |                                                                                             |
| 6  | if (error) throw error;                                                                     |
|    |                                                                                             |
| 7  | // Log admin activity (non-blocking)                                                        |
|    |                                                                                             |
| 8  | this.logAdminActivity(adminId, \'promote_to_admin\', \'user\', userId)                      |
|    |                                                                                             |
| 9  | .catch(logError =\> {                                                                       |
|    |                                                                                             |
| 10 | console.warn(\'⚠️ Failed to log admin activity, but promotion was successful:\', logError); |
|    |                                                                                             |
| 11 | });                                                                                         |
|    |                                                                                             |
| 12 | return { success: true };                                                                   |
|    |                                                                                             |
| 13 | } catch (error) {                                                                           |
|    |                                                                                             |
| 14 | console.error(\'Error promoting user to admin:\', error);                                   |
|    |                                                                                             |
| 15 | return { success: false, error: \'Failed to promote user\' };                               |
|    |                                                                                             |
| 16 | }                                                                                           |
|    |                                                                                             |
| 17 | },                                                                                          |
|    |                                                                                             |
| 18 |                                                                                             |
|    |                                                                                             |
| 19 |                                                                                             |
|    |                                                                                             |
| 20 |                                                                                             |
|    |                                                                                             |
| 21 |                                                                                             |
|    |                                                                                             |
| 22 |                                                                                             |
|    |                                                                                             |
| 23 |                                                                                             |
|    |                                                                                             |
| 24 |                                                                                             |
|    |                                                                                             |
| 25 |                                                                                             |
|    |                                                                                             |
| 26 |                                                                                             |
+====+=============================================================================================+

: []{#_Toc215958639 .anchor}Tabel 6.12 Kode program dari fungsi kelola pengguna

## 6.13 Tinjau Laporan (Admin)

Pada program tinjau laporan menggunakan fungsi \`resolveReport()\` yang terdapat dalam \`adminHelpers\`. Fungsi ini digunakan untuk meninjau dan menyelesaikan laporan konten oleh administrator. Bentuk dan isi dari fungsi tinjau laporan ditampilkan pada Tabel 6.13

+----+-----------------------------------------------------------------------------------------------------------------+
| 1  | async resolveReport(reportId: string, adminId: string, status: \'resolved\' \| \'dismissed\', notes?: string) { |
|    |                                                                                                                 |
| 2  | try {                                                                                                           |
|    |                                                                                                                 |
| 3  | const { error } = await supabase                                                                                |
|    |                                                                                                                 |
| 4  | .from(\'content_reports\')                                                                                      |
|    |                                                                                                                 |
| 5  | .update({                                                                                                       |
|    |                                                                                                                 |
| 6  | status,                                                                                                         |
|    |                                                                                                                 |
| 7  | reviewed_by: adminId,                                                                                           |
|    |                                                                                                                 |
| 8  | reviewed_at: new Date().toISOString(),                                                                          |
|    |                                                                                                                 |
| 9  | admin_notes: notes                                                                                              |
|    |                                                                                                                 |
| 10 | })                                                                                                              |
|    |                                                                                                                 |
| 11 | .eq(\'id\', reportId);                                                                                          |
|    |                                                                                                                 |
| 12 | if (error) throw error;                                                                                         |
|    |                                                                                                                 |
| 13 | // Log admin activity (non-blocking)                                                                            |
|    |                                                                                                                 |
| 14 | this.logAdminActivity(adminId, \'resolve_report\', \'report\', reportId, { status, notes })                     |
|    |                                                                                                                 |
| 15 | .catch(logError =\> {                                                                                           |
|    |                                                                                                                 |
| 16 | console.warn(\'⚠️ Failed to log admin activity, but report resolution was successful:\', logError);             |
|    |                                                                                                                 |
| 17 | });                                                                                                             |
|    |                                                                                                                 |
| 18 | return { success: true };                                                                                       |
|    |                                                                                                                 |
| 19 | } catch (error) {                                                                                               |
|    |                                                                                                                 |
| 20 | console.error(\'Error resolving report:\', error);                                                              |
|    |                                                                                                                 |
| 21 | return { success: false, error: \'Failed to resolve report\' };                                                 |
|    |                                                                                                                 |
| 22 | }                                                                                                               |
|    |                                                                                                                 |
| 23 | },                                                                                                              |
|    |                                                                                                                 |
| 24 |                                                                                                                 |
|    |                                                                                                                 |
| 25 |                                                                                                                 |
|    |                                                                                                                 |
| 26 |                                                                                                                 |
|    |                                                                                                                 |
| 27 |                                                                                                                 |
|    |                                                                                                                 |
| 28 |                                                                                                                 |
|    |                                                                                                                 |
| 29 |                                                                                                                 |
|    |                                                                                                                 |
| 30 |                                                                                                                 |
|    |                                                                                                                 |
| 31 |                                                                                                                 |
+====+=================================================================================================================+

: []{#_Toc215958640 .anchor}Tabel 6.13 Kode program dari fungsi tinjau laporan

## 6.14 Tambah Konten Featured (Admin)

Pada program tambah konten featured menggunakan fungsi \`toggleFeaturedContent()\` yang terdapat dalam \`adminHelpers\`. Fungsi ini digunakan untuk menambahkan atau menghapus konten dari featured content oleh administrator. Bentuk dan isi dari fungsi tambah konten featured ditampilkan pada Tabel 6.14

+----+----------------------------------------------------------------------------------------------------------------------------+
| 1  | async toggleFeaturedContent(contentType: \'article\' \| \'user\', contentId: string, adminId: string, featured: boolean) { |
|    |                                                                                                                            |
| 2  | try {                                                                                                                      |
|    |                                                                                                                            |
| 3  | if (featured) {                                                                                                            |
|    |                                                                                                                            |
| 4  | const { error } = await supabase                                                                                           |
|    |                                                                                                                            |
| 5  | .from(\'featured_content\')                                                                                                |
|    |                                                                                                                            |
| 6  | .insert({                                                                                                                  |
|    |                                                                                                                            |
| 7  | content_type: contentType,                                                                                                 |
|    |                                                                                                                            |
| 8  | content_id: contentId,                                                                                                     |
|    |                                                                                                                            |
| 9  | featured_by: adminId                                                                                                       |
|    |                                                                                                                            |
| 10 | });                                                                                                                        |
|    |                                                                                                                            |
| 11 | if (error) throw error;                                                                                                    |
|    |                                                                                                                            |
| 12 | } else {                                                                                                                   |
|    |                                                                                                                            |
| 13 | const { error } = await supabase                                                                                           |
|    |                                                                                                                            |
| 14 | .from(\'featured_content\')                                                                                                |
|    |                                                                                                                            |
| 15 | .delete()                                                                                                                  |
|    |                                                                                                                            |
| 16 | .eq(\'content_type\', contentType)                                                                                         |
|    |                                                                                                                            |
| 17 | .eq(\'content_id\', contentId);                                                                                            |
|    |                                                                                                                            |
| 18 | if (error) throw error;                                                                                                    |
|    |                                                                                                                            |
| 19 | }                                                                                                                          |
|    |                                                                                                                            |
| 20 | // Log admin activity (non-blocking)                                                                                       |
|    |                                                                                                                            |
| 21 | this.logAdminActivity(                                                                                                     |
|    |                                                                                                                            |
| 22 | adminId,                                                                                                                   |
|    |                                                                                                                            |
| 23 | featured ? \'feature_content\' : \'unfeature_content\',                                                                    |
|    |                                                                                                                            |
| 24 | contentType,                                                                                                               |
|    |                                                                                                                            |
| 25 | contentId                                                                                                                  |
|    |                                                                                                                            |
| 26 | ).catch(logError =\> {                                                                                                     |
|    |                                                                                                                            |
| 27 | console.warn(\'⚠️ Failed to log admin activity, but konten pilihan toggle was successful:\', logError);                    |
|    |                                                                                                                            |
| 28 | });                                                                                                                        |
|    |                                                                                                                            |
| 29 | return { success: true };                                                                                                  |
|    |                                                                                                                            |
| 30 | } catch (error) {                                                                                                          |
|    |                                                                                                                            |
| 31 | console.error(\'Error toggling konten pilihan:\', error);                                                                  |
|    |                                                                                                                            |
| 32 | return { success: false, error: \'Failed to update konten pilihan status\' };                                              |
|    |                                                                                                                            |
| 33 | }                                                                                                                          |
|    |                                                                                                                            |
| 34 | },                                                                                                                         |
|    |                                                                                                                            |
| 35 |                                                                                                                            |
|    |                                                                                                                            |
| 36 |                                                                                                                            |
|    |                                                                                                                            |
| 37 |                                                                                                                            |
|    |                                                                                                                            |
| 38 |                                                                                                                            |
|    |                                                                                                                            |
| 39 |                                                                                                                            |
|    |                                                                                                                            |
| 40 |                                                                                                                            |
|    |                                                                                                                            |
| 41 |                                                                                                                            |
|    |                                                                                                                            |
| 42 |                                                                                                                            |
|    |                                                                                                                            |
| 43 |                                                                                                                            |
|    |                                                                                                                            |
| 44 |                                                                                                                            |
+====+============================================================================================================================+

: []{#_Toc215958641 .anchor}Tabel 6.14 Kode program dari fungsi tambah konten featured

## 6.15 Lihat Analytics (Admin)

Pada program lihat analytics menggunakan fungsi \`getAdminStats()\` yang terdapat dalam \`adminHelpers\`. Fungsi ini mengambil statistik platform untuk ditampilkan di dashboard administrator. Bentuk dan isi dari fungsi lihat analytics ditampilkan pada Tabel 6.15

+----+----------------------------------------------------------------------------------------------------------------------------+
| 1  | async toggleFeaturedContent(contentType: \'article\' \| \'user\', contentId: string, adminId: string, featured: boolean) { |
|    |                                                                                                                            |
| 2  | try {                                                                                                                      |
|    |                                                                                                                            |
| 3  | if (featured) {                                                                                                            |
|    |                                                                                                                            |
| 4  | const { error } = await supabase                                                                                           |
|    |                                                                                                                            |
| 5  | .from(\'featured_content\')                                                                                                |
|    |                                                                                                                            |
| 6  | .insert({                                                                                                                  |
|    |                                                                                                                            |
| 7  | content_type: contentType,                                                                                                 |
|    |                                                                                                                            |
| 8  | content_id: contentId,                                                                                                     |
|    |                                                                                                                            |
| 9  | featured_by: adminId                                                                                                       |
|    |                                                                                                                            |
| 10 | });                                                                                                                        |
|    |                                                                                                                            |
| 11 | if (error) throw error;                                                                                                    |
|    |                                                                                                                            |
| 12 | } else {                                                                                                                   |
|    |                                                                                                                            |
| 13 | const { error } = await supabase                                                                                           |
|    |                                                                                                                            |
| 14 | .from(\'featured_content\')                                                                                                |
|    |                                                                                                                            |
| 15 | .delete()                                                                                                                  |
|    |                                                                                                                            |
| 16 | .eq(\'content_type\', contentType)                                                                                         |
|    |                                                                                                                            |
| 17 | .eq(\'content_id\', contentId);                                                                                            |
|    |                                                                                                                            |
| 18 | if (error) throw error;                                                                                                    |
|    |                                                                                                                            |
| 19 | }                                                                                                                          |
|    |                                                                                                                            |
| 20 | // Log admin activity (non-blocking)                                                                                       |
|    |                                                                                                                            |
| 21 | this.logAdminActivity(                                                                                                     |
|    |                                                                                                                            |
| 22 | adminId,                                                                                                                   |
|    |                                                                                                                            |
| 23 | featured ? \'feature_content\' : \'unfeature_content\',                                                                    |
|    |                                                                                                                            |
| 24 | contentType,                                                                                                               |
|    |                                                                                                                            |
| 25 | contentId                                                                                                                  |
|    |                                                                                                                            |
| 26 | ).catch(logError =\> {                                                                                                     |
|    |                                                                                                                            |
| 27 | console.warn(\'⚠️ Failed to log admin activity, but konten pilihan toggle was successful:\', logError);                    |
|    |                                                                                                                            |
| 28 | });                                                                                                                        |
|    |                                                                                                                            |
| 29 | return { success: true };                                                                                                  |
|    |                                                                                                                            |
| 30 | } catch (error) {                                                                                                          |
|    |                                                                                                                            |
| 31 | console.error(\'Error toggling konten pilihan:\', error);                                                                  |
|    |                                                                                                                            |
| 32 | return { success: false, error: \'Failed to update konten pilihan status\' };                                              |
|    |                                                                                                                            |
| 33 | }                                                                                                                          |
|    |                                                                                                                            |
| 34 | },                                                                                                                         |
|    |                                                                                                                            |
| 35 |                                                                                                                            |
|    |                                                                                                                            |
| 36 |                                                                                                                            |
|    |                                                                                                                            |
| 37 |                                                                                                                            |
|    |                                                                                                                            |
| 38 |                                                                                                                            |
|    |                                                                                                                            |
| 39 |                                                                                                                            |
|    |                                                                                                                            |
| 40 |                                                                                                                            |
|    |                                                                                                                            |
| 41 |                                                                                                                            |
|    |                                                                                                                            |
| 42 |                                                                                                                            |
|    |                                                                                                                            |
| 43 |                                                                                                                            |
|    |                                                                                                                            |
| 44 |                                                                                                                            |
|    |                                                                                                                            |
| 45 |                                                                                                                            |
+====+============================================================================================================================+

: []{#_Toc215958642 .anchor}Tabel 6.15 Kode program dari fungsi lihat analytics

**\**

# BAB 7 PENGUJIAN

## 7.1 Rancangan Pengujian

### 7.1.1 Pengujian Black Box Testing

Pengujian *black box testing* yang dijalankan pada Platform PaberLand dengan menerapkan metode *Equivalence Partitioning*. Pengujian ini dimulai dengan membuat tabel yang bertujuan untuk memeriksa apakah masukan-masukan yang diberikan pada kolom input valid atau tidak valid. Pengujian ini dilakukan dengan merujuk pada pengujian yang telah dilaksanakan oleh Nando Krishna Carera (2022) dan Amanda Amalia (2021) dengan beberapa modifikasi. Pada rancangan pengujian, format tabel pengujian *black box testing* dibuat dan disajikan dalam Tabel 7.1.

  -----------------------------------------------------------------------------------------
   **No**   **Kode Fungsional**   **Kode Uji**   **Kasus Uji**   **Hasil yang Diharapkan**
  -------- --------------------- -------------- --------------- ---------------------------
     1              \-                 \-             \-                    \-

     2              \-                 \-             \-                    \-

     3              \-                 \-             \-                    \-

    ...             \-                 \-             \-                    \-
  -----------------------------------------------------------------------------------------

  : Tabel 7.1 Format tabel pengujian black box testing

Pada Tabel 7.1 terdapat lima kolom, dimana deskripsi fungsi dari masing-masing kolom akan dipaparkan sebagai berikut :

1.  Kolom \'No\' berfungsi untuk memberikan nomor urut pada setiap pengujian yang akan dilaksanakan.

2.  Kolom \"Kode Fungsional\" berisi kode fungsional dari kebutuhan fungsional yang telah dideskripsikan dalam Bab Rekayasa Kebutuhan (Bab 4). Karena pengujian ini hanya menguji masukan-masukan yang diberikan pada kolom input, maka tidak semua kode fungsional akan digunakan dalam pengujian ini.

3.  Kolom \"Kode Uji\" merupakan kolom yang berisi kode dari pengujian yang dilakukan pada setiap kode fungsionalnya

4.  Kolom \"Kasus Uji\" berisi masukan-masukan yang akan diuji pada sistem informasinya.

5.  Kolom \"Hasil yang Diharapkan\" merupakan harapan terhadap hasil yang didapatkan setelah melakukan pengujian

Hasil pengisian tabel sesuai dengan format Tabel 7.1, didapatkan 10 kode fungsional, 50 kode uji, 50 kasus uji dan 50 hasil yang diharapkan. Bentuk pengisian tabel dijabarkan pada Tabel 7.2.

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
   **No**   **Kode Fungsional**   **Kode Uji**                                **Kasus Uji**                                                                  **Hasil yang Diharapkan**
  -------- --------------------- -------------- ------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------
     1             F-01               001        Mengisi kolom *email* yang tidak sesuai format dan menekan tombol masuk           Sistem menolak login dan menampilkan pesan **\"Email atau password salah!\"**

     2             F-01               002                       Mengisi *password* kurang dari 6 karakter                         Sistem menolak login dan menampilkan pesan **\"Password minimal 6 karakter!\"**

     3             F-01               003                               Login dengan kolom kosong                                Sistem menolak login dan menampilkan pesan **\"Email dan password harus diisi!\"**

     4             F-01               004                         Login dengan *email* tidak terdaftar                             Sistem menolak login dan menampilkan pesan **\"Email atau password salah!\"**

     5             F-01               005                             Login dengan *password* salah                                Sistem menolak login dan menampilkan pesan **\"Email atau password salah!\"**

     6             F-01               006                       Login dengan *email* dan *password* valid                    Sistem menampilkan beranda dan pesan **\"Login berhasil! Selamat datang di PaberLand!\"**

     7             F-01               001                         Kolom nama lengkap kosong saat daftar                              Sistem menolak registrasi dan menampilkan **\"Semua field harus diisi!\"**

     8             F-01               002                           Format *email* salah saat daftar                                    Sistem menolak registrasi dan menampilkan pesan error dari Supabase

     9             F-01               003                     *Password* kurang dari 6 karakter saat daftar                        Sistem menolak registrasi dan menampilkan **\"Password minimal 6 karakter!\"**

     10            F-01               004                         *Password* dan konfirmasi tidak sama                     Sistem menolak registrasi dan menampilkan **\"Password dan konfirmasi password tidak sama!\"**

     11            F-01               005                          Registrasi dengan semua input valid                             Sistem mengirim email verifikasi dan menampilkan **\"Pendaftaran berhasil!\"**

     12            F-01               001                      Reset password dengan email tidak terdaftar                                           Sistem menolak dan menampilkan pesan error

     13            F-01               002                       Reset password dengan format email salah                                             Sistem menolak dan menampilkan pesan error

     14            F-01               003                           Reset password dengan email valid                                         Sistem mengirim email reset dan menampilkan pesan sukses

     15            F-03               001                          Upload artikel dengan kolom kosong                             Sistem menolak dan menampilkan **\"Judul, konten, dan kategori harus diisi!\"**

     16            F-03               002                       Upload artikel dengan konten \< 100 kata                                           Sistem menolak dan menampilkan pesan validasi

     17            F-03               003                           Upload artikel dengan input valid                                       Sistem mempublikasikan artikel dan menampilkan pesan sukses

     18            F-03               004                             Simpan artikel sebagai draft                                              Sistem menyimpan draft dan menampilkan pesan sukses

     19            F-03               001                         Mengubah artikel dengan kolom kosong                                             Sistem menolak dan menampilkan pesan validasi

     20            F-03               002                         Mengubah artikel bukan milik penulis                                                  Sistem menolak dengan error **403**

     21            F-03               003                   Mengubah artikel milik sendiri dengan data valid                                       Sistem memproses dan menampilkan pesan sukses

     22            F-03               001                         Menghapus artikel bukan milik penulis                                                 Sistem menolak dengan error **403**

     23            F-03               002                           Menghapus artikel tidak ditemukan                                                   Sistem menolak dengan error **404**

     24            F-03               003                            Menghapus artikel milik sendiri                                        Sistem menghapus artikel dan mengarahkan ke **/my-articles**

     25            F-05               001                               Menambah komentar kosong                                                   Sistem menolak dan menampilkan pesan validasi

     26            F-05               002                                Menambah komentar valid                                            Sistem menambahkan komentar dan memperbarui jumlah komentar

     27            F-05               003                                Menambah reply komentar                                                  Sistem menambahkan reply sebagai nested comment

     28            F-05               001                        Mengubah komentar bukan milik pengguna                                                 Sistem menolak dan menampilkan error

     29            F-05               002                               Mengubah komentar kosong                                                   Sistem menolak dan menampilkan pesan validasi

     30            F-05               003                            Mengubah komentar milik sendiri                                                    Sistem memproses perubahan komentar

     31            F-05               001                        Menghapus komentar bukan milik pengguna                                                Sistem menolak dan menampilkan error

     32            F-05               002                          Menghapus komentar tidak ditemukan                                                   Sistem menolak dan menampilkan error

     33            F-05               003                           Menghapus komentar milik sendiri                                         Sistem menghapus komentar dan memperbarui jumlah komentar

     34            F-05               001                         Like pada artikel yang sudah di-like                                                      Sistem melakukan **unlike**

     35            F-05               002                            Like pada artikel belum di-like                                                    Sistem menambahkan like dan animasi

     36            F-11               001                            Mengubah role tanpa akses admin                                                    Sistem menolak dengan error **403**

     37            F-11               002                           Mengubah role dengan akses admin                                               Sistem memproses dan mencatat ke activity logs

     38            F-11               003                           Menghapus user tanpa akses admin                                                    Sistem menolak dengan error **403**

     39            F-11               004                           Menghapus user dengan akses admin                                           Sistem menghapus user dan mencatat ke activity logs

     40            F-10               001                        Meninjau laporan tanpa akses moderator                                                 Sistem menolak dengan error **403**

     41            F-10               002                      Meninjau laporan dengan status **resolved**                                         Sistem memproses dan mencatat ke activity logs

     42            F-10               003                     Meninjau laporan dengan status **dismissed**                                         Sistem memproses dan mencatat ke activity logs

     43            F-09               001                          Menambah featured tanpa akses admin                                                  Sistem menolak dengan error **403**

     44            F-09               002                                Featured melebihi kuota                                         Sistem menolak dan menampilkan **\"Kuota featured sudah penuh\"**

     45            F-09               003                         Menambah featured dengan akses admin                                            Sistem menambahkan featured dan mencatat ke logs

     46            F-09               004                               Menghapus konten featured                                                  Sistem menghapus featured dan mencatat ke logs

     47            F-12               001                             Melihat analytics tanpa akses                                                     Sistem menolak dengan error **403**

     48            F-12               002                            Melihat analytics dengan akses                                                    Sistem menampilkan dashboard analytics

     49            F-12               003                         Filter analytics berdasarkan periode                                               Sistem menampilkan analytics sesuai filter

     50            F-12               004                            Analytics dengan periode custom                                                Sistem menampilkan analytics sesuai tanggal
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  : Tabel 7.2 Pengisian tabel black box testing sesuai dengan format tabel

### 7.1.2 Pengujian White Box Testing

Pengujian \*white box testing\* atau sering disebut dengan pengujian kotak putih dijalankan pada Platform PaberLand dengan menerapkan metode \*Basis Path Testing\* dan menggunakan tolak ukur \*cyclomatic complexity\*. Pada perancangan pengujian \*white box testing\*, perlu dibuat struktur algoritma kode program dalam bentuk \*pseudocode\*, \*flowgraph\*, penentuan jalur independen dan tabel berisi daftar kasus uji dari masing-masing jalur. Karena pengujian ini menggunakan metode \*Basis Path Testing\* dimana penentuan jalur (\*path\*) harus didasari tiap fungsi/function dari program, maka perlu menentukan fungsi mana yang akan diuji. Fungsi yang memiliki kondisi atau jalur independen lebih dari satu akan dipilih dan diuji (Pressman dan Maxim, 2020). Selama proses penentuan fungsi, ditemukan 5 fungsi yang akan diuji. Fungsi-fungsi yang telah diidentifikasi ditampilkan pada Tabel 7.3.

\*\*Tabel 7.3 Daftar fungsi untuk pengujian \*white box testing\*\*\*

\| No \| Nama Fungsi \|

\| :\-\-\-- \| \-\-\-\-- \|

\| 1 \| Login Pengguna \|

\| 2 \| Tambah Artikel \|

\| 3 \| Update Artikel \|

\| 4 \| Hapus Artikel \|

\| 5 \| Kelola Pengguna (Admin) \|

Masing-masing dari fungsi nantinya akan dibuatkan \*pseudocode\* didalam tabel. Tabel yang dibuat merujuk pada penelitian milik (Yulianti, 2019), dengan beberapa penyesuaian. Format tabel \*pseudocode\* dibuat dan disajikan dalam Tabel 7.4.

\*\*Tabel 7.4 Format tabel \*pseudocode\* untuk \*basis path testing\*\*\*

\| No \| \*Pseudocode\* 1: Function \\\[Nama Method\\\] \| \*Node\* \|

\| :\-\-\-- \| :\-\-\-- \| :\-\-\-- \|

\| 1 \| \\- \| \\- \|

\| 2 \| \\- \| \\- \|

\| 3 \| \\- \| \\- \|

\| ... \| ... \| ... \|

Pada Tabel 7.4 terdapat tiga kolom, dimana deskripsi fungsi dari masing-masing kolom akan dipaparkan sebagai berikut :

1\. Kolom \'No\' berfungsi untuk memberikan nomor urut pada setiap pengujian yang akan dilaksanakan.

2\. Kolom \'\*Pseudocode\* 1: Function \\\[Nama Method\\\]\' merupakan kolom yang berisi \*pseudocode\* setiap baris.

3\. Kolom \'\*Node\*\' berfungsi menentukan \*node\* dari tiap baris \*pseudocode\*.

Fungsi yang sudah ditentukan sebelumnya dibuat \*pseudocode\* dalam format Tabel 7.4. Setelah \*pseudocode\* selesai dibuat, dilakukan pembuatan \*flowgraph\* untuk setiap \*pseudocode\*. \*Flowgraph\* yang sudah jadi kemudian dihitung jumlah \*node\* dan edge-nya, dan selanjutnya dilakukan perhitungan menggunakan rumus \*cyclomatic complexity\*. Hasil perhitungan nantinya dijadikan acuan untuk membuat jalur independen. Tahap terakhir dari perancangan pengujian \*whitebox\*, yaitu membuat kasus uji dari masing-masing fungsi yang dipaparkan dalam bentuk tabel. Tabel tersebut nantinya akan digunakan dalam proses pelaksanaan pengujian \*white box\*. Untuk proses perancangan masing-masing fungsi dari \*pseudocode\* hingga tabel uji, akan dijelaskan pada subbab berikutnya.

\#### \*\*7.1.2.1 Fungsi Login Pengguna\*\*

Fungsi Login Pengguna adalah fungsi yang digunakan dalam sistem untuk melakukan autentikasi pengguna. Bentuk \*pseudocode\* dari fungsi login pengguna ditunjukkan pada Tabel 7.5.

\*\*Tabel 7.5 \*Pseudocode\* dari fungsi login pengguna\*\*

\| No \| \*Pseudocode\* 1: Function handleSubmit(request) \| \*Node\* \|

\| :\-\-\-- \| \-\-\-\-- \| :\-\-\-- \|

\| 1 \| BEGIN \| 1 \|

\| 2 \| PREVENT DEFAULT FORM SUBMIT \| 2 \|

\| 3 \| IF request.email IS EMPTY OR request.password IS EMPTY THEN \| 3 \|

\| 4 \| DISPLAY ERROR \"Email dan password harus diisi!\" \| 4 \|

\| 5 \| RETURN \| 5 \|

\| 6 \| END IF \| 6 \|

\| 7 \| SET isLoading = TRUE \| 7 \|

\| 8 \| TRY: \| 8 \|

\| 9 \| result = CALL supabase.auth.signInWithPassword(email, password) \| 9 \|

\| 10 \| IF result.error EXISTS THEN \| 10 \|

\| 11 \| IF result.error.message CONTAINS \"Invalid login credentials\" THEN \| 11 \|

\| 12 \| DISPLAY ERROR \"Email atau password salah!\" \| 12 \|

\| 13 \| ELSE IF result.error.message CONTAINS \"Email not confirmed\" THEN \| 13 \|

\| 14 \| DISPLAY ERROR \"Silakan verifikasi email Anda terlebih dahulu!\" \| 14 \|

\| 15 \| ELSE \| 15 \|

\| 16 \| DISPLAY ERROR result.error.message \| 16 \|

\| 17 \| END IF \| 17 \|

\| 18 \| RETURN \| 18 \|

\| 19 \| END IF \| 19 \|

\| 20 \| IF result.data.user EXISTS THEN \| 20 \|

\| 21 \| DISPLAY SUCCESS \"Login berhasil! Selamat datang di PaberLand!\" \| 21 \|

\| 22 \| REDIRECT TO \"/\" \| 22 \|

\| 23 \| END IF \| 23 \|

\| 24 \| CATCH Exception AS e: \| 24 \|

\| 25 \| DISPLAY ERROR \"Terjadi kesalahan saat login\" \| 25 \|

\| 26 \| FINALLY: \| 26 \|

\| 27 \| SET isLoading = FALSE \| 27 \|

\| 28 \| END \| 28 \|

Berdasarkan \*flowgraph\* dari pseudocode di atas, \*cyclomatic complexity\* dapat dihitung dengan cara berikut:

V(G) = E − N + 2

= 32 − 28 + 2

= 6

Berdasarkan perhitungan, diperoleh nilai \*cyclomatic complexity\* sebesar 6. Dengan demikian, dapat diperoleh jalur independen sebanyak 6 jalur yaitu :

\- Jalur 1 : 1-2-3-4-5-28

\- Jalur 2 : 1-2-3-6-7-8-24-25-26-27-28

\- Jalur 3 : 1-2-3-6-7-8-9-10-11-12-17-18-26-27-28

\- Jalur 4 : 1-2-3-6-7-8-9-10-13-14-17-18-26-27-28

\- Jalur 5 : 1-2-3-6-7-8-9-10-15-16-17-18-26-27-28

\- Jalur 6 : 1-2-3-6-7-8-9-10-19-20-21-22-23-26-27-28

Setiap jalur diidentifikasi dan dibuatkan kasus uji beserta hasil yang diharapkan, yang dapat dilihat pada Tabel 7.6.

\*\*Tabel 7.6 Daftar kasus yang akan diuji pada fungsi login pengguna\*\*

\| No \| Kasus Uji \| Hasil yang Diharapkan \|

\| :\-\-\-- \| \-\-\-\-- \| :\-\-\-- \|

\| 1 \| Email atau password kosong \| Muncul pesan \"Email dan password harus diisi!\" dan proses login dihentikan \|

\| 2 \| Terjadi exception saat proses login \| Muncul pesan \"Terjadi kesalahan saat login\" dan isLoading di-set menjadi FALSE \|

\| 3 \| Email atau password salah (Invalid login credentials) \| Muncul pesan \"Email atau password salah!\" dan isLoading di-set menjadi FALSE \|

\| 4 \| Email belum terverifikasi (Email not confirmed) \| Muncul pesan \"Silakan verifikasi email Anda terlebih dahulu!\" dan isLoading di-set menjadi FALSE \|

\| 5 \| Error lainnya dari Supabase \| Muncul pesan error dari result.error.message dan isLoading di-set menjadi FALSE \|

\| 6 \| Email dan password valid \| Muncul pesan \"Login berhasil! Selamat datang di PaberLand!\", redirect ke halaman beranda, dan isLoading di-set menjadi FALSE \|

\#### \*\*7.1.2.2 Fungsi Tambah Artikel\*\*

Fungsi Tambah Artikel adalah fungsi yang digunakan dalam sistem untuk menambahkan artikel baru. Bentuk \*pseudocode\* dari fungsi tambah artikel ditunjukkan pada Tabel 7.7.

\*\*Tabel 7.7 \*Pseudocode\* dari fungsi tambah artikel\*\*

\| No \| \*Pseudocode\* 2: Function handleSubmit(request, published) \| \*Node\* \|

\| :\-\-\-- \| :\-\-\-- \| :\-\-\-- \|

\| 1 \| BEGIN \| 1 \|

\| 2 \| IF event EXISTS THEN PREVENT DEFAULT \| 2 \|

\| 3 \| IF request.title IS EMPTY OR request.content IS EMPTY OR request.category IS EMPTY THEN \| 3 \|

\| 4 \| DISPLAY ERROR \"Judul, konten, dan kategori harus diisi!\" \| 4 \|

\| 5 \| RETURN \| 5 \|

\| 6 \| END IF \| 6 \|

\| 7 \| IF user IS NULL THEN \| 7 \|

\| 8 \| DISPLAY ERROR \"Anda harus login terlebih dahulu!\" \| 8 \|

\| 9 \| RETURN \| 9 \|

\| 10 \| END IF \| 10 \|

\| 11 \| SET isLoading = TRUE \| 11 \|

\| 12 \| TRY: \| 12 \|

\| 13 \| slug = GENERATE SLUG FROM request.title \| 13 \|

\| 14 \| uniqueSlug = slug \| 14 \|

\| 15 \| counter = 1 \| 15 \|

\| 16 \| WHILE TRUE: \| 16 \|

\| 17 \| existing = CHECK IF SLUG EXISTS IN DATABASE \| 17 \|

\| 18 \| IF existing IS NULL THEN \| 18 \|

\| 19 \| BREAK \| 19 \|

\| 20 \| END IF \| 20 \|

\| 21 \| uniqueSlug = slug + \"-\" + counter \| 21 \|

\| 22 \| counter = counter + 1 \| 22 \|

\| 23 \| END WHILE \| 23 \|

\| 24 \| articleData = CREATE ARTICLE OBJECT \| 24 \|

\| 25 \| result = INSERT articleData INTO DATABASE \| 25 \|

\| 26 \| IF result.error EXISTS THEN \| 26 \|

\| 27 \| DISPLAY ERROR \"Gagal menyimpan konten: \" + result.error.message \| 27 \|

\| 28 \| RETURN \| 28 \|

\| 29 \| END IF \| 29 \|

\| 30 \| IF published IS TRUE THEN \| 30 \|

\| 31 \| DISPLAY SUCCESS \"🎉 Konten berhasil dipublikasikan!\" \| 31 \|

\| 32 \| REDIRECT TO \"/article/\" + result.data.slug \| 32 \|

\| 33 \| ELSE \| 33 \|

\| 34 \| DISPLAY SUCCESS \"📝 Konten berhasil disimpan sebagai draft!\" \| 34 \|

\| 35 \| REDIRECT TO \"/\" \| 35 \|

\| 36 \| END IF \| 36 \|

\| 37 \| CATCH Exception AS e: \| 37 \|

\| 38 \| DISPLAY ERROR \"Terjadi kesalahan saat menyimpan konten\" \| 38 \|

\| 39 \| FINALLY: \| 39 \|

\| 40 \| SET isLoading = FALSE \| 40 \|

\| 41 \| END \| 41 \|

Berdasarkan \*flowgraph\* dari pseudocode di atas, \*cyclomatic complexity\* dapat dihitung dengan cara berikut:

V(G) = E − N + 2

= 45 − 41 + 2

= 6

Berdasarkan perhitungan, diperoleh nilai \*cyclomatic complexity\* sebesar 6. Dengan demikian, dapat diperoleh jalur independen sebanyak 6 jalur yaitu :

\- Jalur 1 : 1-2-3-4-5-41

\- Jalur 2 : 1-2-3-6-7-8-9-41

\- Jalur 3 : 1-2-3-6-7-10-11-12-37-38-39-40-41

\- Jalur 4 : 1-2-3-6-7-10-11-12-13-14-15-16-17-18-19-23-24-25-26-27-28-39-40-41

\- Jalur 5 : 1-2-3-6-7-10-11-12-13-14-15-16-17-18-20-21-22-23-24-25-26-29-30-31-32-36-39-40-41

\- Jalur 6 : 1-2-3-6-7-10-11-12-13-14-15-16-17-18-20-21-22-23-24-25-26-29-30-33-34-35-36-39-40-41

Setiap jalur diidentifikasi dan dibuatkan kasus uji beserta hasil yang diharapkan, yang dapat dilihat pada Tabel 7.8.

\*\*Tabel 7.8 Daftar kasus yang akan diuji pada fungsi tambah artikel\*\*

\| No \| Kasus Uji \| Hasil yang Diharapkan \|

\| :\-\-\-- \| \-\-\-\-- \| :\-\-\-- \|

\| 1 \| Judul, konten, atau kategori kosong \| Muncul pesan \"Judul, konten, dan kategori harus diisi!\" dan proses dihentikan \|

\| 2 \| User tidak login (user IS NULL) \| Muncul pesan \"Anda harus login terlebih dahulu!\" dan proses dihentikan \|

\| 3 \| Terjadi exception saat proses insert \| Muncul pesan \"Terjadi kesalahan saat menyimpan konten\" dan isLoading di-set menjadi FALSE \|

\| 4 \| Slug sudah ada di database (loop pertama) \| Sistem menghasilkan slug unik dengan menambahkan \"-1\" di akhir, artikel disimpan, dan isLoading di-set menjadi FALSE \|

\| 5 \| Artikel dipublikasikan (published = TRUE) \| Muncul pesan \"🎉 Konten berhasil dipublikasikan!\", redirect ke halaman detail artikel, dan isLoading di-set menjadi FALSE \|

\| 6 \| Artikel disimpan sebagai draft (published = FALSE) \| Muncul pesan \"📝 Konten berhasil disimpan sebagai draft!\", redirect ke halaman beranda, dan isLoading di-set menjadi FALSE \|

\#### \*\*7.1.2.3 Fungsi Update Artikel\*\*

Fungsi Update Artikel adalah fungsi yang digunakan dalam sistem untuk mengubah artikel yang sudah ada. Bentuk \*pseudocode\* dari fungsi update artikel ditunjukkan pada Tabel 7.9.

\*\*Tabel 7.9 \*Pseudocode\* dari fungsi update artikel\*\*

\| No \| \*Pseudocode\* 3: Function updateArticle(articleId, userId, updates) \| \*Node\* \|

\| :\-\-\-- \| :\-\-\-- \| :\-\-\-- \|

\| 1 \| BEGIN \| 1 \|

\| 2 \| result = UPDATE articles TABLE WHERE id = articleId AND author_id = userId \| 2 \|

\| 3 \| IF result.error EXISTS THEN \| 3 \|

\| 4 \| LOG ERROR result.error \| 4 \|

\| 5 \| RETURN { success: false, error: result.error.message } \| 5 \|

\| 6 \| END IF \| 6 \|

\| 7 \| RETURN { success: true, data: result.data, error: undefined } \| 7 \|

\| 8 \| END \| 8 \|

Berdasarkan \*flowgraph\* dari pseudocode di atas, \*cyclomatic complexity\* dapat dihitung dengan cara berikut:

V(G) = E − N + 2

= 8 − 8 + 2

= 2

Berdasarkan perhitungan, diperoleh nilai \*cyclomatic complexity\* sebesar 2. Dengan demikian, dapat diperoleh jalur independen sebanyak 2 jalur yaitu :

\- Jalur 1 : 1-2-3-4-5-8

\- Jalur 2 : 1-2-3-6-7-8

Setiap jalur diidentifikasi dan dibuatkan kasus uji beserta hasil yang diharapkan, yang dapat dilihat pada Tabel 7.10.

\*\*Tabel 7.10 Daftar kasus yang akan diuji pada fungsi update artikel\*\*

\| No \| Kasus Uji \| Hasil yang Diharapkan \|

\| :\-\-\-- \| \-\-\-\-- \| :\-\-\-- \|

\| 1 \| Terjadi error saat update (misalnya artikel tidak ditemukan atau bukan milik user) \| Sistem mengembalikan { success: false, error: error.message } \|

\| 2 \| Update berhasil tanpa error \| Sistem mengembalikan { success: true, data: result.data, error: undefined } \|

\#### \*\*7.1.2.4 Fungsi Hapus Artikel\*\*

Fungsi Hapus Artikel adalah fungsi yang digunakan dalam sistem untuk menghapus artikel. Bentuk \*pseudocode\* dari fungsi hapus artikel ditunjukkan pada Tabel 7.11.

\*\*Tabel 7.11 \*Pseudocode\* dari fungsi hapus artikel\*\*

\| No \| \*Pseudocode\* 4: Function deleteArticle(articleId, userId) \| \*Node\* \|

\| :\-\-\-- \| :\-\-\-- \| :\-\-\-- \|

\| 1 \| BEGIN \| 1 \|

\| 2 \| result = DELETE FROM articles WHERE id = articleId AND author_id = userId \| 2 \|

\| 3 \| IF result.error EXISTS THEN \| 3 \|

\| 4 \| LOG ERROR result.error \| 4 \|

\| 5 \| THROW result.error \| 5 \|

\| 6 \| END IF \| 6 \|

\| 7 \| RETURN { success: true } \| 7 \|

\| 8 \| END \| 8 \|

Berdasarkan \*flowgraph\* dari pseudocode di atas, \*cyclomatic complexity\* dapat dihitung dengan cara berikut:

V(G) = E − N + 2

= 8 − 8 + 2

= 2

Berdasarkan perhitungan, diperoleh nilai \*cyclomatic complexity\* sebesar 2. Dengan demikian, dapat diperoleh jalur independen sebanyak 2 jalur yaitu :

\- Jalur 1 : 1-2-3-4-5-8

\- Jalur 2 : 1-2-3-6-7-8

Setiap jalur diidentifikasi dan dibuatkan kasus uji beserta hasil yang diharapkan, yang dapat dilihat pada Tabel 7.12.

\*\*Tabel 7.12 Daftar kasus yang akan diuji pada fungsi hapus artikel\*\*

\| No \| Kasus Uji \| Hasil yang Diharapkan \|

\| :\-\-\-- \| \-\-\-\-- \| :\-\-\-- \|

\| 1 \| Terjadi error saat delete (misalnya artikel tidak ditemukan atau bukan milik user) \| Sistem melempar error (throw error) \|

\| 2 \| Delete berhasil tanpa error \| Sistem mengembalikan { success: true } \|

\#### \*\*7.1.2.5 Fungsi Kelola Pengguna (Admin)\*\*

Fungsi Kelola Pengguna (Admin) adalah fungsi yang digunakan dalam sistem untuk mengelola pengguna oleh administrator. Bentuk \*pseudocode\* dari fungsi kelola pengguna ditunjukkan pada Tabel 7.13.

\*\*Tabel 7.13 \*Pseudocode\* dari fungsi kelola pengguna (admin)\*\*

\| No \| \*Pseudocode\* 5: Function promoteToAdmin(userId, adminId) \| \*Node\* \|

\| :\-\-\-- \| :\-\-\-- \| :\-\-\-- \|

\| 1 \| BEGIN \| 1 \|

\| 2 \| TRY: \| 2 \|

\| 3 \| result = CALL supabase.rpc(\'promote_to_admin\', { p_user_id: userId }) \| 3 \|

\| 4 \| IF result.error EXISTS THEN \| 4 \|

\| 5 \| THROW result.error \| 5 \|

\| 6 \| END IF \| 6 \|

\| 7 \| CALL logAdminActivity(adminId, \'promote_to_admin\', \'user\', userId) \| 7 \|

\| 8 \| RETURN { success: true } \| 8 \|

\| 9 \| CATCH Exception AS e: \| 9 \|

\| 10 \| LOG ERROR e \| 10 \|

\| 11 \| RETURN { success: false, error: \'Failed to promote user\' } \| 11 \|

\| 12 \| END \| 12 \|

Berdasarkan \*flowgraph\* dari pseudocode di atas, \*cyclomatic complexity\* dapat dihitung dengan cara berikut:

V(G) = E − N + 2

= 12 − 12 + 2

= 2

Berdasarkan perhitungan, diperoleh nilai \*cyclomatic complexity\* sebesar 2. Dengan demikian, dapat diperoleh jalur independen sebanyak 2 jalur yaitu :

\- Jalur 1 : 1-2-3-4-5-9-10-11-12

\- Jalur 2 : 1-2-3-4-6-7-8-12

Setiap jalur diidentifikasi dan dibuatkan kasus uji beserta hasil yang diharapkan, yang dapat dilihat pada Tabel 7.14.

\*\*Tabel 7.14 Daftar kasus yang akan diuji pada fungsi kelola pengguna (admin)\*\*

\| No \| Kasus Uji \| Hasil yang Diharapkan \|

\| :\-\-\-- \| \-\-\-\-- \| :\-\-\-- \|

\| 1 \| Terjadi error saat promote (misalnya user tidak ditemukan atau RPC error) \| Sistem melempar error, menangkap exception, dan mengembalikan { success: false, error: \'Failed to promote user\' } \|

\| 2 \| Promote berhasil tanpa error \| Sistem memanggil logAdminActivity, dan mengembalikan { success: true } \|

\## \*\*7.2 Pelaksanaan Pengujian\*\* {#pelaksanaan-pengujian}

\### \*\*7.2.1 Pengujian Black Box Testing\*\*

Pada pelaksanaan pengujian \*black box testing\* sesuai dengan rancangan tabel yang dibuat sebelumnya, uji tersebut dilakukan oleh tim penguji. Hasil pengujian setiap kasus uji ditampilkan pada Tabel 7.15 dan akan dijadikan bahan evaluasi valid tidaknya dari hasil yang didapatkan.

\*\*Tabel 7.15 Hasil pengujian \*black box testing\*\*\*

\| No \| Kode Fungsional \| Kode Uji \| Kasus Uji \| Hasil yang Diharapkan \| Hasil Pengujian \|

\| :\-\-\-- \| :\-\-\-- \| :\-\-\-- \| :\-\-\-- \| :\-\-\-- \| :\-\-\-- \|

\| 1 \| F-01 \| 001 \| Mengisi kolom \*email\* yang tidak sesuai dengan format \*email\* dan menekan tombol masuk \| Sistem menolak permintaan login dan menampilkan pesan \"Email atau password salah!\" \| Sistem menolak permintaan login dan menampilkan pesan \"Email atau password salah!\" \|

\| 2 \| \| 002 \| Mengisi \*password\* yang berjumlah kurang dari 6 karakter dan menekan tombol masuk \| Sistem menolak permintaan login dan menampilkan pesan \"Password minimal 6 karakter!\" \| Sistem menolak permintaan login dan menampilkan pesan \"Password minimal 6 karakter!\" \|

\| 3 \| \| 003 \| Melakukan login dengan kondisi semua atau salah satu kolom masukan kosong \| Sistem menolak permintaan login dan menampilkan pesan \"Email dan password harus diisi!\" \| Sistem menolak permintaan login dan menampilkan pesan \"Email dan password harus diisi!\" \|

\| 4 \| \| 004 \| Melakukan login dimana \*email\* tidak sesuai dengan \*database\* \| Sistem menolak permintaan login dan menampilkan pesan \"Email atau password salah!\" \| Sistem menolak permintaan login dan menampilkan pesan \"Email atau password salah!\" \|

\| 5 \| \| 005 \| Melakukan login dimana \*password\* tidak sesuai dengan \*database\* \| Sistem menolak permintaan login dan menampilkan pesan \"Email atau password salah!\" \| Sistem menolak permintaan login dan menampilkan pesan \"Email atau password salah!\" \|

\| 6 \| \| 006 \| Melakukan login dimana \*email\* dan \*password\* sesuai dengan \*database\* \| Sistem menampilkan halaman beranda dan menampilkan pesan \"Login berhasil! Selamat datang di PaberLand!\" \| Sistem menampilkan halaman beranda dan menampilkan pesan \"Login berhasil! Selamat datang di PaberLand!\" \|

\| 7 \| F-01 \| 001 \| Mengisi kolom nama lengkap kosong dan menekan tombol daftar \| Sistem menolak permintaan registrasi dan menampilkan pesan \"Semua field harus diisi!\" \| Sistem menolak permintaan registrasi dan menampilkan pesan \"Semua field harus diisi!\" \|

\| 8 \| \| 002 \| Mengisi kolom \*email\* yang tidak sesuai dengan format \*email\* dan menekan tombol daftar \| Sistem menolak permintaan registrasi dan menampilkan pesan error dari Supabase \| Sistem menolak permintaan registrasi dan menampilkan pesan error dari Supabase \|

\| 9 \| \| 003 \| Mengisi \*password\* yang berjumlah kurang dari 6 karakter dan menekan tombol daftar \| Sistem menolak permintaan registrasi dan menampilkan pesan \"Password minimal 6 karakter!\" \| Sistem menolak permintaan registrasi dan menampilkan pesan \"Password minimal 6 karakter!\" \|

\| 10 \| \| 004 \| Mengisi \*password\* dan konfirmasi \*password\* yang tidak sama dan menekan tombol daftar \| Sistem menolak permintaan registrasi dan menampilkan pesan \"Password dan konfirmasi password tidak sama!\" \| Sistem menolak permintaan registrasi dan menampilkan pesan \"Password dan konfirmasi password tidak sama!\" \|

\| 11 \| \| 005 \| Melakukan registrasi dengan semua input valid \| Sistem memproses registrasi, mengirim email verifikasi, dan menampilkan pesan \"Pendaftaran berhasil! Silakan cek email untuk verifikasi.\" \| Sistem memproses registrasi, mengirim email verifikasi, dan menampilkan pesan \"Pendaftaran berhasil! Silakan cek email untuk verifikasi.\" \|

\| 12 \| F-01 \| 001 \| Mengisi kolom \*email\* yang tidak terdaftar di sistem dan menekan tombol kirim \| Sistem menolak permintaan reset password dan menampilkan pesan error \| Sistem menolak permintaan reset password dan menampilkan pesan error \|

\| 13 \| \| 002 \| Mengisi kolom \*email\* yang tidak sesuai dengan format \*email\* dan menekan tombol kirim \| Sistem menolak permintaan reset password dan menampilkan pesan error \| Sistem menolak permintaan reset password dan menampilkan pesan error \|

\| 14 \| \| 003 \| Melakukan reset password dengan \*email\* yang valid dan terdaftar \| Sistem mengirim email reset password dan menampilkan pesan \"Link reset password telah dikirim ke email Anda\" \| Sistem mengirim email reset password dan menampilkan pesan \"Link reset password telah dikirim ke email Anda\" \|

\| 15 \| F-03 \| 001 \| Mengunggah artikel dengan kondisi semua atau salah satu kolom masukan kosong \| Sistem menolak permintaan unggah artikel dan menampilkan pesan \"Judul, konten, dan kategori harus diisi!\" \| Sistem menolak permintaan unggah artikel dan menampilkan pesan \"Judul, konten, dan kategori harus diisi!\" \|

\| 16 \| \| 002 \| Mengunggah artikel dengan konten kurang dari 100 kata \| Sistem menolak permintaan publikasi dan menampilkan pesan error validasi \| Sistem menolak permintaan publikasi dan menampilkan pesan error validasi \|

\| 17 \| \| 003 \| Mengunggah artikel dengan semua input telah diisi dan konten minimal 100 kata \| Sistem memproses dan mengunggah artikel, menampilkan pesan \"🎉 Konten berhasil dipublikasikan!\" \| Sistem memproses dan mengunggah artikel, menampilkan pesan \"🎉 Konten berhasil dipublikasikan!\" \|

\| 18 \| \| 004 \| Menyimpan artikel sebagai draft dengan semua input telah diisi \| Sistem memproses dan menyimpan artikel sebagai draft, menampilkan pesan \"📝 Konten berhasil disimpan sebagai draft!\" \| Sistem memproses dan menyimpan artikel sebagai draft, menampilkan pesan \"📝 Konten berhasil disimpan sebagai draft!\" \|

\| 19 \| F-03 \| 001 \| Mengubah artikel dengan kondisi semua atau salah satu kolom masukan kosong \| Sistem menolak permintaan ubah artikel dan menampilkan pesan \"Judul, konten, dan kategori harus diisi!\" \| Sistem menolak permintaan ubah artikel dan menampilkan pesan \"Judul, konten, dan kategori harus diisi!\" \|

\| 20 \| \| 002 \| Mengubah artikel yang bukan milik penulis \| Sistem menolak permintaan ubah artikel dan menampilkan error 403 \| Sistem menolak permintaan ubah artikel dan menampilkan error 403 \|

\| 21 \| \| 003 \| Mengubah artikel dengan semua input telah diisi dan artikel adalah milik penulis \| Sistem memproses dan mengubah artikel, menampilkan pesan \"🎉 Konten berhasil diperbarui dan dipublikasikan!\" \| Sistem memproses dan mengubah artikel, menampilkan pesan \"🎉 Konten berhasil diperbarui dan dipublikasikan!\" \|

\| 22 \| F-03 \| 001 \| Menghapus artikel yang bukan milik penulis \| Sistem menolak permintaan hapus artikel dan menampilkan error 403 \| Sistem menolak permintaan hapus artikel dan menampilkan error 403 \|

\| 23 \| \| 002 \| Menghapus artikel yang tidak ditemukan \| Sistem menolak permintaan hapus artikel dan menampilkan error 404 \| Sistem menolak permintaan hapus artikel dan menampilkan error 404 \|

\| 24 \| \| 003 \| Menghapus artikel yang valid dan milik penulis \| Sistem memproses dan menghapus artikel, menampilkan pesan sukses \| Sistem memproses dan menghapus artikel, menampilkan pesan sukses \|

\| 25 \| F-05 \| 001 \| Menambahkan komentar dengan konten kosong \| Sistem menolak permintaan tambah komentar dan menampilkan pesan validasi \| Sistem menolak permintaan tambah komentar dan menampilkan pesan validasi \|

\| 26 \| \| 002 \| Menambahkan komentar dengan konten yang valid \| Sistem memproses dan menambahkan komentar, memperbarui jumlah komentar artikel \| Sistem memproses dan menambahkan komentar, memperbarui jumlah komentar artikel \|

\| 27 \| \| 003 \| Menambahkan reply komentar dengan konten yang valid \| Sistem memproses dan menambahkan reply komentar sebagai nested comment \| Sistem memproses dan menambahkan reply komentar sebagai nested comment \|

\| 28 \| F-05 \| 001 \| Mengubah komentar yang bukan milik pengguna \| Sistem menolak permintaan ubah komentar dan menampilkan error \| Sistem menolak permintaan ubah komentar dan menampilkan error \|

\| 29 \| \| 002 \| Mengubah komentar dengan konten kosong \| Sistem menolak permintaan ubah komentar dan menampilkan pesan validasi \| Sistem menolak permintaan ubah komentar dan menampilkan pesan validasi \|

\| 30 \| \| 003 \| Mengubah komentar yang valid dan milik pengguna \| Sistem memproses dan mengubah komentar, menampilkan komentar yang telah diperbarui \| Sistem memproses dan mengubah komentar, menampilkan komentar yang telah diperbarui \|

\| 31 \| F-05 \| 001 \| Menghapus komentar yang bukan milik pengguna \| Sistem menolak permintaan hapus komentar dan menampilkan error \| Sistem menolak permintaan hapus komentar dan menampilkan error \|

\| 32 \| \| 002 \| Menghapus komentar yang tidak ditemukan \| Sistem menolak permintaan hapus komentar dan menampilkan error \| Sistem menolak permintaan hapus komentar dan menampilkan error \|

\| 33 \| \| 003 \| Menghapus komentar yang valid dan milik pengguna \| Sistem memproses dan menghapus komentar, memperbarui jumlah komentar artikel \| Sistem memproses dan menghapus komentar, memperbarui jumlah komentar artikel \|

\| 34 \| F-05 \| 001 \| Memberikan like pada artikel yang sudah pernah di-like \| Sistem melakukan unlike dan mengurangi jumlah like artikel \| Sistem melakukan unlike dan mengurangi jumlah like artikel \|

\| 35 \| \| 002 \| Memberikan like pada artikel yang belum pernah di-like \| Sistem menambahkan like, memperbarui jumlah like artikel, dan menampilkan animasi like \| Sistem menambahkan like, memperbarui jumlah like artikel, dan menampilkan animasi like \|

\| 36 \| F-11 \| 001 \| Mengubah role pengguna tanpa akses admin \| Sistem menolak permintaan dan menampilkan error 403 \| Sistem menolak permintaan dan menampilkan error 403 \|

\| 37 \| \| 002 \| Mengubah role pengguna dengan akses admin dan data valid \| Sistem memproses perubahan role, mencatat ke activity logs, dan menampilkan pesan sukses \| Sistem memproses perubahan role, mencatat ke activity logs, dan menampilkan pesan sukses \|

\| 38 \| \| 003 \| Menghapus pengguna tanpa akses admin \| Sistem menolak permintaan dan menampilkan error 403 \| Sistem menolak permintaan dan menampilkan error 403 \|

\| 39 \| \| 004 \| Menghapus pengguna dengan akses admin dan data valid \| Sistem memproses penghapusan pengguna, mencatat ke activity logs, dan menampilkan pesan sukses \| Sistem memproses penghapusan pengguna, mencatat ke activity logs, dan menampilkan pesan sukses \|

\| 40 \| F-10 \| 001 \| Meninjau laporan konten tanpa akses moderator/admin \| Sistem menolak permintaan dan menampilkan error 403 \| Sistem menolak permintaan dan menampilkan error 403 \|

\| 41 \| \| 002 \| Meninjau laporan konten dengan akses moderator/admin dan status \"resolved\" \| Sistem memproses perubahan status laporan, mencatat ke activity logs, dan menampilkan pesan sukses \| Sistem memproses perubahan status laporan, mencatat ke activity logs, dan menampilkan pesan sukses \|

\| 42 \| \| 003 \| Meninjau laporan konten dengan akses moderator/admin dan status \"dismissed\" \| Sistem memproses perubahan status laporan, mencatat ke activity logs, dan menampilkan pesan sukses \| Sistem memproses perubahan status laporan, mencatat ke activity logs, dan menampilkan pesan sukses \|

\| 43 \| F-09 \| 001 \| Menambahkan konten featured tanpa akses moderator/admin \| Sistem menolak permintaan dan menampilkan error 403 \| Sistem menolak permintaan dan menampilkan error 403 \|

\| 44 \| \| 002 \| Menambahkan konten featured dengan kuota sudah penuh (lebih dari 6 artikel) \| Sistem menolak permintaan dan menampilkan pesan \"Kuota featured sudah penuh\" \| Sistem menolak permintaan dan menampilkan pesan \"Kuota featured sudah penuh\" \|

\| 45 \| \| 003 \| Menambahkan konten featured dengan akses moderator/admin dan kuota tersedia \| Sistem memproses penambahan featured content, mencatat ke activity logs, dan menampilkan pesan sukses \| Sistem memproses penambahan featured content, mencatat ke activity logs, dan menampilkan pesan sukses \|

\| 46 \| \| 004 \| Menghapus konten featured dengan akses moderator/admin \| Sistem memproses penghapusan featured content, mencatat ke activity logs, dan menampilkan pesan sukses \| Sistem memproses penghapusan featured content, mencatat ke activity logs, dan menampilkan pesan sukses \|

\| 47 \| F-12 \| 001 \| Melihat analytics tanpa akses administrator/moderator \| Sistem menolak permintaan dan menampilkan error 403 \| Sistem menolak permintaan dan menampilkan error 403 \|

\| 48 \| \| 002 \| Melihat analytics dengan akses administrator/moderator \| Sistem menampilkan dashboard analytics dengan data statistik lengkap \| Sistem menampilkan dashboard analytics dengan data statistik lengkap \|

\| 49 \| \| 003 \| Memfilter analytics berdasarkan periode \| Sistem menampilkan data analytics yang difilter sesuai periode yang dipilih \| Sistem menampilkan data analytics yang difilter sesuai periode yang dipilih \|

\| 50 \| \| 004 \| Melihat analytics dengan periode custom \| Sistem menampilkan data analytics berdasarkan tanggal mulai dan tanggal akhir yang dipilih \| Sistem menampilkan data analytics berdasarkan tanggal mulai dan tanggal akhir yang dipilih \|

\### \*\*7.2.2 Pengujian White Box Testing\*\*

Pada pelaksanaan pengujian \*white box testing\* sesuai dengan rancangan tabel yang dibuat sebelumnya, uji tersebut dilakukan oleh peneliti sebagai developer Platform PaberLand. Hasil pengujian setiap kasus uji ditampilkan pada Tabel 7.16 hingga Tabel 7.20 dan akan dijadikan bahan evaluasi valid tidaknya dari hasil yang didapatkan.

\#### \*\*7.2.2.1 Fungsi Login Pengguna\*\*

Kasus uji pada fungsi login pengguna berjumlah enam kasus uji. Hasil dari masing-masing kasus uji ditampilkan pada Tabel 7.16.

\*\*Tabel 7.16 Hasil uji pada fungsi login pengguna\*\*

\| No \| Kasus Uji \| Hasil yang Diharapkan \| Hasil Uji \|

\| :\-\-\-- \| :\-\-\-- \| :\-\-\-- \| :\-\-\-- \|

\| 1 \| Email atau password kosong \| Muncul pesan \"Email dan password harus diisi!\" dan proses login dihentikan \| Muncul pesan \"Email dan password harus diisi!\" dan proses login dihentikan \|

\| 2 \| Terjadi exception saat proses login \| Muncul pesan \"Terjadi kesalahan saat login\" dan isLoading di-set menjadi FALSE \| Muncul pesan \"Terjadi kesalahan saat login\" dan isLoading di-set menjadi FALSE \|

\| 3 \| Email atau password salah (Invalid login credentials) \| Muncul pesan \"Email atau password salah!\" dan isLoading di-set menjadi FALSE \| Muncul pesan \"Email atau password salah!\" dan isLoading di-set menjadi FALSE \|

\| 4 \| Email belum terverifikasi (Email not confirmed) \| Muncul pesan \"Silakan verifikasi email Anda terlebih dahulu!\" dan isLoading di-set menjadi FALSE \| Muncul pesan \"Silakan verifikasi email Anda terlebih dahulu!\" dan isLoading di-set menjadi FALSE \|

\| 5 \| Error lainnya dari Supabase \| Muncul pesan error dari result.error.message dan isLoading di-set menjadi FALSE \| Muncul pesan error dari result.error.message dan isLoading di-set menjadi FALSE \|

\| 6 \| Email dan password valid \| Muncul pesan \"Login berhasil! Selamat datang di PaberLand!\", redirect ke halaman beranda, dan isLoading di-set menjadi FALSE \| Muncul pesan \"Login berhasil! Selamat datang di PaberLand!\", redirect ke halaman beranda, dan isLoading di-set menjadi FALSE \|

\#### \*\*7.2.2.2 Fungsi Tambah Artikel\*\*

Kasus uji pada fungsi tambah artikel berjumlah enam kasus uji. Hasil dari masing-masing kasus uji ditampilkan pada Tabel 7.17.

\*\*Tabel 7.17 Hasil uji pada fungsi tambah artikel\*\*

\| No \| Kasus Uji \| Hasil yang Diharapkan \| Hasil Uji \|

\| :\-\-\-- \| :\-\-\-- \| :\-\-\-- \| :\-\-\-- \|

\| 1 \| Judul, konten, atau kategori kosong \| Muncul pesan \"Judul, konten, dan kategori harus diisi!\" dan proses dihentikan \| Muncul pesan \"Judul, konten, dan kategori harus diisi!\" dan proses dihentikan \|

\| 2 \| User tidak login (user IS NULL) \| Muncul pesan \"Anda harus login terlebih dahulu!\" dan proses dihentikan \| Muncul pesan \"Anda harus login terlebih dahulu!\" dan proses dihentikan \|

\| 3 \| Terjadi exception saat proses insert \| Muncul pesan \"Terjadi kesalahan saat menyimpan konten\" dan isLoading di-set menjadi FALSE \| Muncul pesan \"Terjadi kesalahan saat menyimpan konten\" dan isLoading di-set menjadi FALSE \|

\| 4 \| Slug sudah ada di database (loop pertama) \| Sistem menghasilkan slug unik dengan menambahkan \"-1\" di akhir, artikel disimpan, dan isLoading di-set menjadi FALSE \| Sistem menghasilkan slug unik dengan menambahkan \"-1\" di akhir, artikel disimpan, dan isLoading di-set menjadi FALSE \|

\| 5 \| Artikel dipublikasikan (published = TRUE) \| Muncul pesan \"🎉 Konten berhasil dipublikasikan!\", redirect ke halaman detail artikel, dan isLoading di-set menjadi FALSE \| Muncul pesan \"🎉 Konten berhasil dipublikasikan!\", redirect ke halaman detail artikel, dan isLoading di-set menjadi FALSE \|

\| 6 \| Artikel disimpan sebagai draft (published = FALSE) \| Muncul pesan \"📝 Konten berhasil disimpan sebagai draft!\", redirect ke halaman beranda, dan isLoading di-set menjadi FALSE \| Muncul pesan \"📝 Konten berhasil disimpan sebagai draft!\", redirect ke halaman beranda, dan isLoading di-set menjadi FALSE \|

\#### \*\*7.2.2.3 Fungsi Update Artikel\*\*

Kasus uji pada fungsi update artikel berjumlah dua kasus uji. Hasil dari masing-masing kasus uji ditampilkan pada Tabel 7.18.

\*\*Tabel 7.18 Hasil uji pada fungsi update artikel\*\*

\| No \| Kasus Uji \| Hasil yang Diharapkan \| Hasil Uji \|

\| :\-\-\-- \| :\-\-\-- \| :\-\-\-- \| :\-\-\-- \|

\| 1 \| Terjadi error saat update (misalnya artikel tidak ditemukan atau bukan milik user) \| Sistem mengembalikan { success: false, error: error.message } \| Sistem mengembalikan { success: false, error: error.message } \|

\| 2 \| Update berhasil tanpa error \| Sistem mengembalikan { success: true, data: result.data, error: undefined } \| Sistem mengembalikan { success: true, data: result.data, error: undefined } \|

\#### \*\*7.2.2.4 Fungsi Hapus Artikel\*\*

Kasus uji pada fungsi hapus artikel berjumlah dua kasus uji. Hasil dari masing-masing kasus uji ditampilkan pada Tabel 7.19.

\*\*Tabel 7.19 Hasil uji pada fungsi hapus artikel\*\*

\| No \| Kasus Uji \| Hasil yang Diharapkan \| Hasil Uji \|

\| :\-\-\-- \| :\-\-\-- \| :\-\-\-- \| :\-\-\-- \|

\| 1 \| Terjadi error saat delete (misalnya artikel tidak ditemukan atau bukan milik user) \| Sistem melempar error (throw error) \| Sistem melempar error (throw error) \|

\| 2 \| Delete berhasil tanpa error \| Sistem mengembalikan { success: true } \| Sistem mengembalikan { success: true } \|

\#### \*\*7.2.2.5 Fungsi Kelola Pengguna (Admin)\*\*

Kasus uji pada fungsi kelola pengguna (admin) berjumlah dua kasus uji. Hasil dari masing-masing kasus uji ditampilkan pada Tabel 7.20.

\*\*Tabel 7.20 Hasil uji pada fungsi kelola pengguna (admin)\*\*

\| No \| Kasus Uji \| Hasil yang Diharapkan \| Hasil Uji \|

\| :\-\-\-- \| :\-\-\-- \| :\-\-\-- \| :\-\-\-- \|

\| 1 \| Terjadi error saat promote (misalnya user tidak ditemukan atau RPC error) \| Sistem melempar error, menangkap exception, dan mengembalikan { success: false, error: \'Failed to promote user\' } \| Sistem melempar error, menangkap exception, dan mengembalikan { success: false, error: \'Failed to promote user\' } \|

\| 2 \| Promote berhasil tanpa error \| Sistem memanggil logAdminActivity, dan mengembalikan { success: true } \| Sistem memanggil logAdminActivity, dan mengembalikan { success: true } \|

\## \*\*7.3 Evaluasi Hasil Pengujian\*\* {#evaluasi-hasil-pengujian}

Pelaksanaan pengujian yang telah dilakukan pada Platform PaberLand dianalisis dan dibuat kesimpulan terhadap hasil pengujian tersebut.

\### \*\*7.3.1 Pengujian Black Box Testing\*\*

Hasil pengujian \*black box testing\* pada Platform PaberLand dianalisis apakah hasil yang didapat sesuai dengan hasil yang diharapkan. Hasil tersebut dikumpulkan dan diringkas seperti pada Tabel 7.21.

\*\*Tabel 7.21 Kesimpulan dari pengujian \*black box testing\*\*\*

\| No \| Kode Fungsional \| Kode Uji \| Kesimpulan \|

\| :\-\-\-- \| :\-\-\-- \| :\-\-\-- \| :\-\-\-- \|

\| 1 \| F-01 \| 001 \| Valid \|

\| 2 \| \| 002 \| Valid \|

\| 3 \| \| 003 \| Valid \|

\| 4 \| \| 004 \| Valid \|

\| 5 \| \| 005 \| Valid \|

\| 6 \| \| 006 \| Valid \|

\| 7 \| F-01 \| 001 \| Valid \|

\| 8 \| \| 002 \| Valid \|

\| 9 \| \| 003 \| Valid \|

\| 10 \| \| 004 \| Valid \|

\| 11 \| \| 005 \| Valid \|

\| 12 \| F-01 \| 001 \| Valid \|

\| 13 \| \| 002 \| Valid \|

\| 14 \| \| 003 \| Valid \|

\| 15 \| F-03 \| 001 \| Valid \|

\| 16 \| \| 002 \| Valid \|

\| 17 \| \| 003 \| Valid \|

\| 18 \| \| 004 \| Valid \|

\| 19 \| F-03 \| 001 \| Valid \|

\| 20 \| \| 002 \| Valid \|

\| 21 \| \| 003 \| Valid \|

\| 22 \| F-03 \| 001 \| Valid \|

\| 23 \| \| 002 \| Valid \|

\| 24 \| \| 003 \| Valid \|

\| 25 \| F-05 \| 001 \| Valid \|

\| 26 \| \| 002 \| Valid \|

\| 27 \| \| 003 \| Valid \|

\| 28 \| F-05 \| 001 \| Valid \|

\| 29 \| \| 002 \| Valid \|

\| 30 \| \| 003 \| Valid \|

\| 31 \| F-05 \| 001 \| Valid \|

\| 32 \| \| 002 \| Valid \|

\| 33 \| \| 003 \| Valid \|

\| 34 \| F-05 \| 001 \| Valid \|

\| 35 \| \| 002 \| Valid \|

\| 36 \| F-11 \| 001 \| Valid \|

\| 37 \| \| 002 \| Valid \|

\| 38 \| \| 003 \| Valid \|

\| 39 \| \| 004 \| Valid \|

\| 40 \| F-10 \| 001 \| Valid \|

\| 41 \| \| 002 \| Valid \|

\| 42 \| \| 003 \| Valid \|

\| 43 \| F-09 \| 001 \| Valid \|

\| 44 \| \| 002 \| Valid \|

\| 45 \| \| 003 \| Valid \|

\| 46 \| \| 004 \| Valid \|

\| 47 \| F-12 \| 001 \| Valid \|

\| 48 \| \| 002 \| Valid \|

\| 49 \| \| 003 \| Valid \|

\| 50 \| \| 004 \| Valid \|

Daftar dari kasus uji yang telah diujikan ditulis pada Tabel 7.21 secara ringkas, yaitu hanya berupa kode fungsional, kode uji dan kesimpulan dari hasil yang didapat. Dalam proses menyimpulkan hasil pengujian, apabila hasil uji yang didapat sesuai dengan hasil yang diharapkan maka uji tersebut bernilai valid. Sebaliknya, jika hasil yang didapat tidak sesuai dengan yang diharapkan maka uji tersebut bernilai tidak valid. Dari Tabel 7.21 didapatkan hasil uji dimana keseluruhan dari 50 kasus uji bernilai valid.

\### \*\*7.3.2 Pengujian White Box Testing\*\*

Hasil pengujian \*white box testing\* pada Platform PaberLand dianalisis apakah hasil yang didapat sesuai dengan hasil yang diharapkan. Hasil tersebut dikumpulkan dan diringkas seperti pada Tabel 7.22.

\*\*Tabel 7.22 Kesimpulan dari pengujian \*white box testing\*\*\*

\| No \| Nama Fungsi \| Nomor Urut Fungsi \| Kesimpulan \|

\| :\-\-\-- \| :\-\-\-- \| :\-\-\-- \| :\-\-\-- \|

\| 1 \| Login Pengguna \| 1 \| Valid \|

\| 2 \| \| 2 \| Valid \|

\| 3 \| \| 3 \| Valid \|

\| 4 \| \| 4 \| Valid \|

\| 5 \| \| 5 \| Valid \|

\| 6 \| \| 6 \| Valid \|

\| 7 \| Tambah Artikel \| 1 \| Valid \|

\| 8 \| \| 2 \| Valid \|

\| 9 \| \| 3 \| Valid \|

\| 10 \| \| 4 \| Valid \|

\| 11 \| \| 5 \| Valid \|

\| 12 \| \| 6 \| Valid \|

\| 13 \| Update Artikel \| 1 \| Valid \|

\| 14 \| \| 2 \| Valid \|

\| 15 \| Hapus Artikel \| 1 \| Valid \|

\| 16 \| \| 2 \| Valid \|

\| 17 \| Kelola Pengguna (Admin) \| 1 \| Valid \|

\| 18 \| \| 2 \| Valid \|

Daftar dari kasus uji yang telah diujikan ditulis pada Tabel 7.22 secara ringkas, yaitu hanya berupa nama fungsi, nomor urut fungsi dan kesimpulan dari hasil yang didapat. Dalam proses menyimpulkan hasil pengujian, apabila hasil uji yang didapat sesuai dengan hasil yang diharapkan maka uji tersebut bernilai valid. Sebaliknya, jika hasil yang didapat tidak sesuai dengan yang diharapkan maka uji tersebut bernilai tidak valid. Dari Tabel 7.22 didapatkan hasil uji dimana keseluruhan dari kasus uji \*white box testing\* bernilai valid.

**\**

# DAFTAR REFERENSI

Ali Muakhir. (2023). Forum Penulis Bacaan Anak PABERLAND, 13 Tahun Merawat Literasi Bacaan Anak. Kumparan. Tersedia di: https://kumparan.com/ali-muakhir/forum-penulis-bacaan-anak-paberland-13-tahun-merawat-literasi-bacaan-anak \[Diakses 15 Agustus 2025\]

Ammann, P., & Offutt, J. (2020). Introduction to Software Testing (2nd ed., digital reprint). Cambridge: Cambridge University Press. (Digunakan sebagai pengganti Myers, 2011).

Ariningsih, P., & Muhammad, A. H. (2024). Quality Evaluation of Ticketing Management System Using ISO/IEC 25010:2023 Standards and AHP Method. Intechno Journal: Information Technology Journal, 11(1), 1-8.

Bass, L., Clements, P., & Kazman, R. (2021). Software Architecture in Practice (4th ed.). Boston: Addison-Wesley Professional.

Coronel, C., & Morris, S. (2023). Database Systems: Design, Implementation, & Management (14th ed.). Boston: Cengage Learning. (Menggantikan Codd 1970 & Chen 1976 untuk teori ERD dan Relasional dalam konteks modern).

Dennis, A., Wixom, B. H., & Roth, R. M. (2021). Systems Analysis and Design (8th ed.). Hoboken: John Wiley & Sons. (Menggantikan Larman 2004 & Whitten untuk analisis sistem dan Use Case).

Hidayat, F., et al. (2023). Implementation of Next.js Framework in Modern Web Development: A Performance Analysis. Journal of Information Systems Engineering and Business Intelligence, 9(1), 45-55.

ISO/IEC. (2023). ISO/IEC 25010:2023 Systems and software engineering --- Systems and software Quality Requirements and Evaluation (SQuaRE) --- Product quality model. Geneva: International Organization for Standardization.

ISTQB. (2023). Standard Glossary of Terms Used in Software Testing Version 4.0. International Software Testing Qualifications Board. Tersedia di: https://glossary.istqb.org/ \[Diakses 20 Agustus 2025\]

Lewis, J. R., & Sauro, J. (2021). Strengths and Weaknesses of the System Usability Scale (SUS): A 20-Year Retrospective. International Journal of Human-Computer Interaction, 37(14), 1-13. (Menggantikan Bangor 2008 & Nielsen untuk teori SUS).

Mishra, A. (2021). Software Metrics: A Guide to Planning, Analysis, and Application. Cham: Springer International Publishing. (Menggantikan Fenton, 2014).

PostgreSQL Global Development Group. (2025). PostgreSQL 16 Documentation: Row Security Policies. Tersedia di: https://www.postgresql.org/docs/16/ddl-rowsecurity.html \[Diakses 25 Agustus 2025\]

Pressman, R. S., & Maxim, B. R. (2020). Software Engineering: A Practitioner\'s Approach (9th ed.). New York: McGraw-Hill Education.

React Team. (2025). React 19 Documentation: Concurrent Features and Server Components. Tersedia di: https://react.dev/blog/2024/04/25/react-19 \[Diakses 10 September 2025\]

Richards, M., & Ford, N. (2020). Fundamentals of Software Architecture: An Engineering Approach. Sebastopol: O\'Reilly Media. (Menggantikan Fowler 2002 untuk arsitektur modern).

Sauro, J., & Lewis, J. R. (2023). Quantifying the User Experience: Practical Statistics for User Research (3rd ed.). Cambridge: Morgan Kaufmann. (Referensi utama untuk statistik UX dan Usability modern).

Seidl, M., Scholz, M., Huemer, C., & Kappel, G. (2021). UML @ Classroom: An Introduction to Object-Oriented Modeling. Cham: Springer. (Menggantikan referensi UML lama seperti Booch/Rumbaugh).

Sommerville, I. (2021). Engineering Software Products: An Introduction to Modern Software Engineering. Boston: Pearson. (Menggantikan Sommerville edisi 2016).

Sugiyono. (2022). Metode Penelitian Kuantitatif, Kualitatif, dan R&D (Edisi ke-29). Bandung: Alfabeta.

Supabase Inc. (2025). Supabase Documentation: Database, Auth, and Real-time. Tersedia di: https://supabase.com/docs \[Diakses 5 September 2025\]

Supiyandi, S., Zen, M., Rizal, C., & Eka, M. (2023). Implementasi Model Prototyping Dalam Perancangan Sistem Informasi. Jurnal Resolusi: Rekayasa Teknik Informatika dan Informasi, 3(4), 305-312. (Menggantikan Boehm 1984 dan Davis 1992).

Syahputra, M. E., & Panggabean, J. (2023). Analyzing the Impact of Next.JS on Site Performance and SEO. International Journal of Computer Applications Technology and Research, 12(11), 1-6.

Tiny Technologies. (2025). TinyMCE Documentation: Rich Text Editor. Tersedia di: https://www.tiny.cloud/docs/ \[Diakses 12 September 2025\]

Valacich, J. S., & George, J. F. (2020). Modern Systems Analysis and Design (9th ed.). Boston: Pearson.

Vercel. (2025). Next.js 15 Documentation: App Router and Performance Optimization. Tersedia di: https://nextjs.org/docs \[Diakses 8 September 2025\]

Wiegers, K., & Beatty, J. (2021). Software Requirements (Developer Best Practices, Latest Printing). Redmond: Microsoft Press.

Yadav, R., et al. (2023). Perceived challenges affecting user engagement in online community: an analysis of interrelationships and interaction. Benchmarking: An International Journal, 30(2). (Menggantikan Preece 2000 & Kraut 2012).
