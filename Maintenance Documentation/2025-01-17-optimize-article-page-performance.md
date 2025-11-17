# Optimasi Performa Halaman Artikel & Perbaikan CPU Usage - 17 Januari 2025

## Ringkasan
Perbaikan masalah performa website yang lambat saat membuka halaman dan navigasi antar halaman. Server mengalami CPU usage 100% karena proses Next.js yang stuck dan query database yang tidak efisien.

## Masalah yang Ditemukan

### 1. Proses Next.js Stuck (100% CPU Usage)
- **Gejala**: Website sangat lambat saat dibuka dan navigasi antar halaman
- **Penyebab**: Proses Next.js (PID 6668) menggunakan 100% CPU selama 2+ minggu
- **Dampak**: 
  - Load average: 1.47 (tinggi)
  - Server tidak responsif
  - User experience sangat buruk

### 2. Query Database Tidak Efisien
- **Lokasi**: `src/app/article/[slug]/page.tsx`
- **Masalah**:
  - `noStore()` menonaktifkan caching, setiap request selalu query database
  - Artikel di-fetch **3 kali** per request:
    1. Di `generateMetadata()` untuk SEO
    2. Di `ArticlePage()` untuk konten utama
    3. Di `ArticlePage()` lagi sebagai "fresh article" (tidak perlu)
  - Query views redundant yang tidak perlu (views sudah ada di `getArticle()`)
- **Dampak**: 
  - Beban database sangat tinggi
  - Response time lambat
  - Banyak log "Fetching article" yang berulang

### 3. Timeout Errors
- Banyak `TimeoutError` di log aplikasi
- Kemungkinan karena terlalu banyak query concurrent

## Solusi yang Diterapkan

### 1. Restart Aplikasi & Kill Stuck Process
```bash
# Kill proses yang stuck
kill -9 6668

# Restart via PM2
pm2 restart paberland
```

### 2. Optimasi Query Database
**File**: `src/app/article/[slug]/page.tsx`

**Perubahan**:
- ✅ Menghapus `noStore()` - mengaktifkan default caching Next.js
- ✅ Menghapus duplicate `getArticle()` call (line 111)
- ✅ Menghapus redundant views query (line 117-131)
- ✅ Menggunakan single query untuk artikel
- ✅ Menghapus import yang tidak digunakan (`noStore`, `supabase`, `generateNameSlug`)

**Sebelum**:
```typescript
export default async function ArticlePage({ params }: ArticlePageProps) {
  noStore(); // ❌ Menonaktifkan cache
  
  const article = await articleHelpers.getArticle(resolvedParams.slug);
  
  // ❌ Duplicate query
  const freshArticle = await articleHelpers.getArticle(resolvedParams.slug);
  
  // ❌ Redundant query
  const { data: viewsData } = await supabase
    .from("articles")
    .select("views")
    .eq("id", article.id)
    .single();
}
```

**Sesudah**:
```typescript
export default async function ArticlePage({ params }: ArticlePageProps) {
  // ✅ Next.js default caching aktif
  // ✅ Single query
  const article = await articleHelpers.getArticle(resolvedParams.slug);
  
  // Views sudah termasuk dalam getArticle(), tidak perlu query terpisah
}
```

### 3. Deployment
```bash
# 1. Commit & push perubahan
git add src/app/article/[slug]/page.tsx
git commit -m "fix: optimize article page - remove duplicate queries and enable caching"
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
- **Load Average**: 1.47
- **Query per Request**: 3+ queries untuk artikel
- **Caching**: Tidak ada (noStore())
- **Response Time**: Sangat lambat

### Sesudah Perbaikan
- **CPU Usage**: 0% (normal)
- **Load Average**: 0.51 (turun 65%)
- **Query per Request**: 1 query untuk artikel (turun 67%)
- **Caching**: Aktif (Next.js default caching)
- **Response Time**: Cepat dan responsif

### Metrics Server
```
CPU Usage:     0% (sebelumnya 100%)
Load Average:  0.51 (sebelumnya 1.47)
Memory:        60.9MB (normal)
Status:        Online dan stabil
```

## File yang Diubah

1. `src/app/article/[slug]/page.tsx`
   - Menghapus `noStore()` import dan usage
   - Menghapus duplicate `getArticle()` call
   - Menghapus redundant views query
   - Menghapus unused imports
   - Optimasi kode untuk single query

## Catatan Penting

1. **Caching**: Next.js akan cache halaman artikel secara default. Views tetap akan di-update oleh client-side `ViewTracker` component.

2. **Monitoring**: Perlu monitor CPU usage dan load average secara berkala untuk memastikan tidak ada proses yang stuck lagi.

3. **Best Practice**: 
   - Hindari `noStore()` kecuali benar-benar diperlukan
   - Jangan duplicate query yang sama dalam satu request
   - Gunakan caching untuk meningkatkan performa

4. **PM2**: Pastikan PM2 berjalan dengan baik dan monitor logs secara berkala:
   ```bash
   pm2 logs paberland --lines 50
   pm2 status
   ```

## Referensi

- Server: `148.230.101.85`
- Repository: `https://github.com/habstrakT808/PABERLAND---Platform-penulis-indonesia.git`
- PM2 Service: `paberland`
- Application Path: `/root/apps/paberland`

## Tim yang Terlibat

- **Tanggal**: 17 November 2025
- **Issue**: Website lambat, CPU usage 100%
- **Status**: ✅ Resolved

