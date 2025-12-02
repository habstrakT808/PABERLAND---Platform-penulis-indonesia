# Maintenance Documentation Index

Daftar lengkap semua dokumentasi maintenance dan perbaikan server.

## 📋 Daftar Dokumentasi

### 2025

#### Januari
- **[17 Januari 2025](./2025-01-17-optimize-article-page-performance.md)** - Optimasi Performa Halaman Artikel & Perbaikan CPU Usage
  - **Masalah**: CPU usage 100%, website lambat
  - **Solusi**: Optimasi query database, enable caching, restart aplikasi
  - **Status**: ✅ Resolved

#### Desember
- **[17 Desember 2025](./2025-12-17-fix-cpu-usage-spike-with-caching.md)** - Perbaikan CPU Usage Spike dengan Implementasi Caching
  - **Masalah**: CPU usage 100% kembali terjadi setelah 1 bulan, query berulang
  - **Solusi**: Implementasi `unstable_cache` dengan revalidation 60 detik
  - **Status**: ✅ Resolved

## 📊 Statistik

- **Total Maintenance**: 2
- **Resolved**: 2
- **In Progress**: 0
- **Failed**: 0

## 🔍 Cara Menggunakan

1. **Mencari dokumentasi**: Gunakan format `YYYY-MM-DD-description.md`
2. **Membuat dokumentasi baru**: Copy dari [template.md](./template.md)
3. **Update index**: Tambahkan entry baru di file ini

## 📝 Template

Gunakan [template.md](./template.md) untuk membuat dokumentasi maintenance baru.

