# Perbaikan CPU Usage Spike dengan Implementasi Caching - 17 Desember 2025

## Ringkasan
Perbaikan masalah performa website yang lambat kembali setelah 1 bulan. Server mengalami CPU usage 100% karena proses Next.js yang stuck dan query database berulang. Masalah ini sama dengan yang terjadi sebelumnya, menunjukkan bahwa caching yang diimplementasikan belum cukup optimal.

## Masalah yang Ditemukan

### 1. Proses Next.js Stuck (100% CPU Usage) - Kembali Terjadi
- **Gejala**: Website sangat lambat saat dibuka dan navigasi antar halaman
- **Penyebab**: Proses Next.js (PID 121014) menggunakan 100% CPU selama 10+ hari
- **Dampak**: 
  - Load average: 0.93-1.02 (tinggi)
  - CPU usage: 100% (proses stuck)
  - Server tidak responsif
  - User experience sangat buruk

### 2. Query Database Berulang
- **Lokasi**: `src/app/article/[slug]/page.tsx`
- **Masalah**:
  - Meskipun sudah dioptimasi sebelumnya, masih ada query berulang
  - `generateMetadata()` dan `ArticlePage()` memanggil `getArticle()` secara terpisah
  - Tidak ada caching yang efektif antara kedua fungsi tersebut
  - Banyak log "Fetching article" yang berulang untuk artikel yang sama
- **Dampak**: 
  - Beban database tinggi
  - Response time lambat
  - CPU usage tinggi karena terlalu banyak query concurrent

### 3. Caching Tidak Optimal
- **Masalah**: Next.js default caching tidak cukup untuk mencegah query berulang antara `generateMetadata()` dan `ArticlePage()`
- **Dampak**: Setiap request masih melakukan 2 query untuk artikel yang sama

## Solusi yang Diterapkan

### 1. Restart Aplikasi & Kill Stuck Process
```bash
# Kill proses yang stuck
kill -9 121014

# Restart via PM2
pm2 restart paberland
```

### 2. Implementasi Caching dengan `unstable_cache`
**File**: `src/app/article/[slug]/page.tsx`

**Perubahan**:
- ✅ Menambahkan `unstable_cache` untuk `getArticle()` dengan revalidation 60 detik
- ✅ Menggunakan cached function di `generateMetadata()` dan `ArticlePage()`
- ✅ Mencegah duplicate query antara metadata dan page content

**Sebelum**:
```typescript
export async function generateMetadata({ params }: ArticlePageProps) {
  const resolvedParams = await params;
  const article = await articleHelpers.getArticle(resolvedParams.slug); // ❌ Query 1
  // ...
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const resolvedParams = await params;
  const article = await articleHelpers.getArticle(resolvedParams.slug); // ❌ Query 2 (duplicate)
  // ...
}
```

**Sesudah**:
```typescript
// ✅ Cached function dengan revalidation 60 detik
const getCachedArticle = unstable_cache(
  async (slug: string) => {
    return await articleHelpers.getArticle(slug);
  },
  ["article"],
  {
    revalidate: 60, // Cache selama 60 detik
    tags: ["article"],
  }
);

export async function generateMetadata({ params }: ArticlePageProps) {
  const resolvedParams = await params;
  const article = await getCachedArticle(resolvedParams.slug); // ✅ Menggunakan cache
  // ...
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const resolvedParams = await params;
  const article = await getCachedArticle(resolvedParams.slug); // ✅ Menggunakan cache yang sama
  // ...
}
```

### 3. Deployment
```bash
# 1. Commit & push perubahan
git add src/app/article/[slug]/page.tsx
git commit -m "fix: add caching with revalidation to prevent CPU usage spike and duplicate queries"
git push origin main

# 2. Pull di server
cd /root/apps/paberland
git pull origin main

# 3. Build aplikasi
pnpm build

# 4. Restart aplikasi
pm2 restart paberland
```

## Hasil

### Sebelum Perbaikan
- **CPU Usage**: 100% (proses stuck)
- **Load Average**: 0.93-1.02
- **Query per Request**: 2 queries untuk artikel (generateMetadata + ArticlePage)
- **Caching**: Default Next.js caching (tidak cukup)
- **Response Time**: Sangat lambat

### Sesudah Perbaikan
- **CPU Usage**: 0% (normal setelah restart)
- **Load Average**: 0.75 (turun)
- **Query per Request**: 1 query untuk artikel (dengan cache 60 detik)
- **Caching**: `unstable_cache` dengan revalidation 60 detik
- **Response Time**: Cepat dan responsif

### Metrics Server
```
CPU Usage:     0% (sebelumnya 100%)
Load Average:  0.75 (sebelumnya 0.93-1.02)
Memory:        62.6MB (normal)
Status:        Online dan stabil
```

## File yang Diubah

1. `src/app/article/[slug]/page.tsx`
   - Menambahkan import `unstable_cache` dari `next/cache`
   - Membuat `getCachedArticle` function dengan caching 60 detik
   - Menggunakan cached function di `generateMetadata()` dan `ArticlePage()`

## Catatan Penting

1. **Caching Strategy**: 
   - Revalidation time 60 detik memberikan balance antara performa dan freshness
   - Views tetap akan di-update oleh client-side `ViewTracker` component
   - Content akan tetap fresh karena cache di-refresh setiap 60 detik

2. **Monitoring**: 
   - Perlu monitor CPU usage dan load average secara berkala
   - Jika masalah terjadi lagi, pertimbangkan untuk:
     - Mengurangi revalidation time jika content perlu lebih fresh
     - Menambahkan monitoring untuk detect stuck processes
     - Implementasi auto-restart untuk PM2 jika CPU usage terlalu tinggi

3. **Best Practice**: 
   - Gunakan `unstable_cache` untuk data yang tidak berubah terlalu sering
   - Set revalidation time sesuai kebutuhan (60 detik untuk artikel sudah cukup)
   - Monitor query patterns untuk detect duplicate queries

4. **PM2 Monitoring**: 
   - Pertimbangkan untuk setup PM2 monitoring dengan alert jika CPU usage > 80%
   - Setup auto-restart jika process stuck lebih dari 1 jam
   ```bash
   pm2 set pm2:autodump true
   pm2 install pm2-logrotate
   ```

## Perbandingan dengan Perbaikan Sebelumnya

| Aspek | Perbaikan 17 Jan 2025 | Perbaikan 17 Des 2025 |
|-------|----------------------|----------------------|
| Masalah | CPU 100%, duplicate queries | CPU 100%, caching tidak optimal |
| Solusi | Hapus noStore(), hapus duplicate query | Implementasi unstable_cache |
| Hasil | CPU 0%, load 0.51 | CPU 0%, load 0.75 |
| Caching | Default Next.js | unstable_cache dengan revalidation |

## Referensi

- Server: `148.230.101.85`
- Repository: `https://github.com/habstrakT808/PABERLAND---Platform-penulis-indonesia.git`
- PM2 Service: `paberland`
- Application Path: `/root/apps/paberland`
- Related Documentation: [2025-01-17-optimize-article-page-performance.md](./2025-01-17-optimize-article-page-performance.md)

## Tim yang Terlibat

- **Tanggal**: 17 Desember 2025
- **Issue**: Website lambat lagi, CPU usage 100% (masalah berulang setelah 1 bulan)
- **Status**: ✅ Resolved
- **Follow-up**: Perlu monitoring lebih ketat untuk mencegah masalah berulang

