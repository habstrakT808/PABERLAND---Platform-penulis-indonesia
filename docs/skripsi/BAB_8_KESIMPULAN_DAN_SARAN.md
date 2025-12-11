# BAB 8 KESIMPULAN DAN SARAN

## 8.1 Kesimpulan

Berdasarkan hasil penelitian yang telah dilakukan pada pengembangan Platform Komunitas Penulis Literasi Anak PaberLand, dapat disimpulkan bahwa penelitian ini telah berhasil menjawab semua rumusan masalah yang telah ditetapkan. Kesimpulan penelitian disajikan sebagai berikut:

1. **Hasil Analisis Kebutuhan Sistem Platform Komunitas Penulis Literasi Anak PaberLand**

   Proses analisis kebutuhan dengan metode prototyping, wawancara dengan stakeholder komunitas PaberLand, dan studi literatur menghasilkan identifikasi 10 kebutuhan fungsional (F-01 sampai F-10) dan 7 kebutuhan non-fungsional (NF-01 sampai NF-07). Sistem memiliki tiga jenis pengguna yaitu Pengunjung, Member (Penulis), dan Administrator/Moderator. Berhasil dibuat 26 use case scenario dan ERD dengan 11 entitas utama yang mencakup seluruh aktivitas pengguna dalam sistem.

2. **Hasil dan Analisis Perancangan Sistem Platform Komunitas Penulis Literasi Anak PaberLand**

   Perancangan sistem menghasilkan dokumentasi lengkap meliputi 3 class diagram (Frontend, API Routes & Services, Database Models), 26 sequence diagram yang menggambarkan alur interaksi antar komponen, dan Physical Database Design dengan 11 tabel yang terstruktur dengan baik. Arsitektur sistem menggunakan teknologi modern yaitu Next.js 15 dengan React Server Components, PostgreSQL dengan Supabase (Row Level Security), dan Supabase Auth untuk autentikasi.

3. **Hasil dan Analisis Implementasi Sistem Platform Komunitas Penulis Literasi Anak PaberLand**

   Implementasi sistem berhasil mewujudkan semua 10 kebutuhan fungsional yang telah dirancang dengan kualitas kode yang baik menggunakan TypeScript. Fitur-fitur utama yang berhasil diimplementasikan meliputi sistem autentikasi (registrasi, login, reset password), editor WYSIWYG dengan auto-save, manajemen artikel (CRUD), sistem komentar nested, sistem like, discovery konten, manajemen profil dan portofolio, admin panel, sistem notifikasi real-time, dan sistem laporan konten. Sistem menggunakan Row Level Security (RLS) untuk keamanan data dan optimasi performa dengan caching.

4. **Hasil dan Analisis Pengujian Sistem Platform Komunitas Penulis Literasi Anak PaberLand**

   Pengujian sistem menggunakan metode Black Box Testing dengan Equivalence Partitioning menghasilkan 100% valid pada 50 kasus uji yang mencakup semua kebutuhan fungsional F-01 sampai F-10. Pengujian White Box Testing dengan Basis Path Testing menggunakan cyclomatic complexity menghasilkan 40 kasus uji valid dari 43 kasus uji pada 10 fungsi kritis, dengan 3 kasus uji tidak valid yaitu komentar artikel 2, laporkan konten 1, dan laporkan konten 5. Semua 7 kebutuhan non-fungsional (NF-01 sampai NF-07) telah terpenuhi dengan baik, termasuk performance efficiency (waktu respon < 8 detik), security dengan RLS, usability, maintainability, portability, compatibility, dan recoverability.

## 8.2 Saran

Saran yang dapat diberikan kepada peneliti selanjutnya terhadap pengembangan Platform Komunitas Penulis Literasi Anak PaberLand adalah sebagai berikut:

1. Pengujian pada sistem perlu menambahkan pengujian User Acceptance Test (UAT) dengan melibatkan anggota komunitas PaberLand sebagai penguji untuk mengetahui penilaian sistem dari sisi pengguna target.

2. Penambahan fitur cek plagiasi antar artikel guna mengurangi risiko plagiasi dari artikel-artikel yang sudah dipublikasikan di platform.

3. Proses login atau pergantian password dapat ditambahkan dengan fitur verifikasi two-factor authentication (2FA) untuk meningkatkan keamanan akun pengguna, terutama untuk akun admin dan moderator.

4. Halaman pencarian perlu ditambahkan fitur pencarian lanjutan dengan filter berdasarkan tanggal, penulis, kategori, dan sorting berdasarkan relevansi atau popularitas untuk memudahkan pengguna menemukan konten yang diinginkan.

5. Penambahan fitur bookmark/favorit untuk menyimpan artikel favorit ke dalam daftar pribadi pengguna dan fitur sharing ke media sosial untuk meningkatkan visibilitas konten literasi anak.

6. Perbaikan pada fungsi komentar artikel dan laporkan konten yang masih memiliki kasus uji tidak valid pada pengujian white box testing, khususnya pada kasus komentar artikel 2, laporkan konten 1, dan laporkan konten 5, untuk memastikan semua jalur logika internal berfungsi dengan benar.
