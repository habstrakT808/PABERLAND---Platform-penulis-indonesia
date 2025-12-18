# Panduan Pengujian Performance Efficiency (NF-01)

## Target Pengujian
**Waktu respon halaman < 8 detik pada kondisi normal**

## Tools yang Digunakan

### 1. Google Lighthouse (Recommended)
Tools utama untuk pengujian performa web secara komprehensif.

#### Cara Menggunakan:
1. **Buka halaman yang akan diuji** di Google Chrome
2. **Buka Chrome DevTools:**
   - Tekan `F12` atau 
   - `Ctrl+Shift+I` (Windows/Linux) atau 
   - `Cmd+Option+I` (Mac)
3. **Pilih tab "Lighthouse"**
4. **Konfigurasi:**
   - Pilih kategori: **Performance**
   - Pilih device: **Mobile** atau **Desktop**
   - Centang "Clear storage" untuk pengujian bersih
5. **Klik "Analyze page load"**
6. **Tunggu hingga selesai** (biasanya 30-60 detik)
7. **Catat metrik penting:**
   - **Performance Score** (target: > 85 mobile, > 90 desktop)
   - **Total Load Time** (target: < 8 detik)
   - **LCP** (Largest Contentful Paint) - target: < 2.5 detik
   - **FID** (First Input Delay) - target: < 100ms
   - **CLS** (Cumulative Layout Shift) - target: < 0.1

#### Screenshot Hasil:
- Ambil screenshot hasil Lighthouse
- Simpan sebagai bukti pengujian
- Catat nilai Performance Score dan Total Load Time

---

### 2. Chrome DevTools Performance Tab
Untuk monitoring performa secara detail dan real-time.

#### Cara Menggunakan:
1. Buka Chrome DevTools (`F12`)
2. Pilih tab **"Performance"**
3. Klik tombol **Record** (ikon bulat merah di kiri atas)
4. **Reload halaman** (`Ctrl+R` atau `F5`)
5. Tunggu hingga halaman selesai dimuat
6. Klik tombol **Stop** untuk menghentikan recording
7. **Analisis timeline:**
   - Lihat **Network** timeline untuk waktu loading resources
   - Lihat **Main** timeline untuk waktu eksekusi JavaScript
   - Lihat **Total Load Time** di bagian bawah

#### Yang Dicatat:
- **Total Load Time**: Waktu dari awal hingga halaman selesai dimuat
- **DOMContentLoaded**: Waktu hingga DOM siap
- **Load**: Waktu hingga semua resources dimuat

---

### 3. Chrome DevTools Network Tab
Untuk mengukur waktu loading resources dan simulasi koneksi lambat.

#### Cara Menggunakan:
1. Buka Chrome DevTools (`F12`)
2. Pilih tab **"Network"**
3. **Pilih kondisi jaringan** (dropdown di toolbar):
   - **Online**: Koneksi normal (untuk baseline)
   - **Fast 3G**: Simulasi koneksi 3G cepat
   - **Slow 3G**: Simulasi koneksi 3G lambat (untuk test kondisi buruk)
4. **Clear cache** (ikon refresh dengan garis di toolbar)
5. **Reload halaman** (`Ctrl+R` atau `F5`)
6. **Catat metrik:**
   - **DOMContentLoaded**: Waktu hingga DOM siap
   - **Load**: Waktu hingga semua resources dimuat
   - **Finish**: Total waktu loading
   - **Total Size**: Total ukuran resources
   - **Total Requests**: Jumlah request

#### Screenshot:
- Ambil screenshot Network tab dengan timing terlihat
- Pastikan kolom "Time" dan "Waterfall" terlihat jelas

---

### 4. Web Vitals Extension (Opsional)
Extension Chrome untuk mengukur Core Web Vitals secara real-time.

#### Cara Menggunakan:
1. Install extension **"Web Vitals"** dari Chrome Web Store
2. Buka halaman yang akan diuji
3. Extension akan menampilkan metrik secara real-time di pojok layar
4. Catat nilai yang ditampilkan

---

### 5. Lighthouse CLI (Untuk Otomasi)
Untuk pengujian otomatis via command line.

#### Install:
```bash
npm install -g lighthouse
```

#### Pengujian Desktop:
```bash
lighthouse https://paberland.com --view --preset=desktop --output html --output-path ./lighthouse-desktop.html
```

#### Pengujian Mobile:
```bash
lighthouse https://paberland.com --view --preset=mobile --output html --output-path ./lighthouse-mobile.html
```

#### Hasil:
- File HTML akan dibuat dengan laporan lengkap
- Buka file HTML di browser untuk melihat hasil

---

## Halaman yang Harus Diuji

Lakukan pengujian pada halaman-halaman berikut:

1. ✅ **Halaman Utama (Homepage)**
   - URL: `https://paberland.com/`
   - Target: < 8 detik

2. ✅ **Halaman Artikel Detail**
   - URL: `https://paberland.com/article/[slug]`
   - Pilih beberapa artikel berbeda
   - Target: < 8 detik

3. ✅ **Halaman Kategori**
   - URL: `https://paberland.com/kategori/[kategori]`
   - Pilih beberapa kategori berbeda
   - Target: < 8 detik

4. ✅ **Halaman Pencarian**
   - URL: `https://paberland.com/search?q=[query]`
   - Test dengan berbagai query
   - Target: < 8 detik

5. ✅ **Halaman Profil Pengguna**
   - URL: `https://paberland.com/profile/[username]`
   - Target: < 8 detik

6. ✅ **Halaman Admin Dashboard** (jika ada akses)
   - URL: `https://paberland.com/admin`
   - Target: < 8 detik

---

## Prosedur Pengujian

### Persiapan:
1. ✅ **Clear browser cache dan cookies**
   - Chrome: `Ctrl+Shift+Delete` → Pilih "Cached images and files" → Clear
   - Atau gunakan **Incognito Mode** (`Ctrl+Shift+N`)

2. ✅ **Tutup extension yang tidak diperlukan**
   - Extension dapat mempengaruhi hasil pengujian

3. ✅ **Pastikan koneksi internet stabil**
   - Gunakan koneksi yang konsisten untuk semua pengujian

4. ✅ **Tutup aplikasi lain yang menggunakan bandwidth**
   - Streaming, download, dll.

### Langkah Pengujian:

#### A. Pengujian dengan Koneksi Normal:
1. Buka Chrome DevTools (`F12`)
2. Pilih tab **Network**
3. Pastikan throttling: **Online** (tidak ada throttling)
4. Buka tab **Lighthouse**
5. Pilih **Desktop** atau **Mobile**
6. Klik **"Analyze page load"**
7. Tunggu hingga selesai
8. **Catat hasil:**
   - Performance Score
   - Total Load Time
   - LCP, FID, CLS
9. **Screenshot hasil**

#### B. Pengujian dengan Koneksi Lambat (Opsional):
1. Buka Chrome DevTools (`F12`)
2. Pilih tab **Network**
3. Pilih throttling: **Slow 3G**
4. Buka tab **Lighthouse**
5. Pilih **Mobile** (kondisi mobile biasanya lebih lambat)
6. Klik **"Analyze page load"**
7. Tunggu hingga selesai
8. **Catat hasil** (untuk melihat performa di kondisi buruk)

#### C. Pengujian Berulang:
- Lakukan pengujian **minimal 3 kali** untuk setiap halaman
- Catat semua hasil
- Hitung **rata-rata** waktu respon
- Bandingkan dengan target < 8 detik

---

## Dokumentasi Hasil

### Data yang Harus Dicatat:

#### Untuk Setiap Halaman:
1. **URL halaman yang diuji**
2. **Device** (Desktop/Mobile)
3. **Kondisi koneksi** (Normal/Slow 3G)
4. **Performance Score** (Lighthouse)
5. **Total Load Time** (dalam detik)
6. **LCP** (Largest Contentful Paint)
7. **FID** (First Input Delay)
8. **CLS** (Cumulative Layout Shift)
9. **Tanggal dan waktu pengujian**

#### Format Tabel Dokumentasi:

| No | URL Halaman | Device | Koneksi | Performance Score | Total Load Time | LCP | FID | CLS | Rata-rata Load Time | Status |
|:---|:------------|:-------|:--------|:-------------------|:----------------|:----|:----|:----|:-------------------|:-------|
| 1 | / | Desktop | Normal | 92 | 2.1s | 1.8s | 45ms | 0.05 | 2.1s | ✅ Valid |
| 2 | /article/... | Mobile | Normal | 88 | 2.5s | 2.2s | 60ms | 0.08 | 2.5s | ✅ Valid |
| 3 | /kategori/... | Desktop | Normal | 90 | 2.3s | 2.0s | 50ms | 0.06 | 2.3s | ✅ Valid |

### Screenshot yang Diperlukan:
1. ✅ Screenshot hasil Lighthouse (Performance Score terlihat)
2. ✅ Screenshot Network tab dengan timing
3. ✅ Screenshot Performance timeline (jika menggunakan Performance tab)

---

## Kriteria Validasi

Pengujian dinyatakan **✅ Valid** jika:
- ✅ Waktu respon halaman **rata-rata < 8 detik** pada kondisi normal
- ✅ Performance Score Lighthouse **minimal 85** (mobile) dan **90** (desktop)
- ✅ LCP (Largest Contentful Paint) **< 2.5 detik**
- ✅ FID (First Input Delay) **< 100ms**
- ✅ CLS (Cumulative Layout Shift) **< 0.1**

---

## Tips dan Best Practices

### 1. Konsistensi Pengujian:
- Gunakan browser yang sama untuk semua pengujian
- Gunakan device/viewport yang sama
- Gunakan kondisi koneksi yang sama

### 2. Pengujian Real-World:
- Test pada waktu yang berbeda (pagi, siang, malam)
- Test dengan data yang berbeda (artikel baru, artikel lama)
- Test dengan jumlah konten yang berbeda

### 3. Analisis Hasil:
- Bandingkan hasil dengan target
- Identifikasi bottleneck (resource yang lambat)
- Dokumentasikan temuan untuk perbaikan

### 4. Optimasi (jika diperlukan):
- Gunakan caching (Next.js caching, browser caching)
- Optimasi gambar (format WebP, lazy loading)
- Minimize JavaScript dan CSS
- Code splitting
- CDN untuk static assets

---

## Contoh Hasil Pengujian

### Halaman Utama (Homepage):
- **Performance Score**: 92
- **Total Load Time**: 2.1 detik
- **LCP**: 1.8 detik
- **FID**: 45ms
- **CLS**: 0.05
- **Status**: ✅ **Valid** (jauh di bawah target 8 detik)

### Halaman Artikel:
- **Performance Score**: 88
- **Total Load Time**: 2.5 detik
- **LCP**: 2.2 detik
- **FID**: 60ms
- **CLS**: 0.08
- **Status**: ✅ **Valid** (jauh di bawah target 8 detik)

### Kesimpulan:
Semua halaman yang diuji memiliki waktu respon rata-rata **2-3 detik**, yang **jauh lebih baik** dari target < 8 detik. Sistem memenuhi requirement NF-01 dengan baik.

---

## Troubleshooting

### Jika Hasil Pengujian Lambat (> 8 detik):

1. **Cek Network Tab:**
   - Identifikasi resource yang lambat
   - Cek ukuran file (apakah terlalu besar?)
   - Cek jumlah request (apakah terlalu banyak?)

2. **Cek Performance Tab:**
   - Identifikasi JavaScript yang lambat
   - Cek rendering yang lambat
   - Cek memory usage

3. **Optimasi yang Bisa Dilakukan:**
   - Enable caching
   - Optimasi gambar
   - Minimize JavaScript
   - Code splitting
   - Lazy loading

4. **Cek Server:**
   - Apakah server overload?
   - Apakah database query lambat?
   - Apakah ada bottleneck di backend?

---

## Referensi

- [Google Lighthouse Documentation](https://developers.google.com/web/tools/lighthouse)
- [Web Vitals](https://web.dev/vitals/)
- [Chrome DevTools Performance](https://developer.chrome.com/docs/devtools/performance/)
- [Next.js Performance Optimization](https://nextjs.org/docs/app/building-your-application/optimizing)

---

**Catatan:** Dokumentasi ini digunakan untuk pengujian NF-01 (Performance Efficiency) pada Platform PaberLand. Pastikan semua hasil pengujian didokumentasikan dengan baik sebagai bukti bahwa sistem memenuhi requirement.

