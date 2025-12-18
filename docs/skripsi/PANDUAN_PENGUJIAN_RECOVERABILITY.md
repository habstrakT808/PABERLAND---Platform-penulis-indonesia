# Panduan Pengujian Recoverability (NF-07)

## Target Pengujian
**Backup database dilakukan secara otomatis setiap hari dengan retensi 30 hari**

## Tools yang Digunakan

### 1. Supabase Dashboard
Dashboard web untuk mengakses konfigurasi dan status backup database.

### 2. Admin Panel Aplikasi
Panel admin di aplikasi PaberLand untuk melihat status backup.

### 3. Browser
Untuk mengakses Supabase Dashboard dan admin panel.

---

## Langkah-Langkah Pengujian

### 1. Verifikasi Konfigurasi Backup di Supabase Dashboard

#### A. Akses Supabase Dashboard

**Langkah:**
1. Buka browser dan akses **https://supabase.com/dashboard**
2. **Login** dengan akun Supabase Anda
3. **Pilih project** PaberLand dari daftar project
4. Setelah masuk ke project, klik menu **Database** di sidebar kiri
5. Pilih submenu **Backups**

**Catatan:**
- Pastikan Anda memiliki akses admin ke Supabase project
- Jika tidak memiliki akses, minta akses dari pemilik project

#### B. Screenshot Backup Settings

**Langkah:**
1. Di halaman **Backups**, cari bagian **Backup Settings** atau **Automatic Backups**
2. Pastikan informasi berikut terlihat:
   - ✅ **Automatic Backups**: Enabled/Aktif
   - ✅ **Backup Schedule**: Daily/Setiap hari
   - ✅ **Retention Period**: 30 days/30 hari
   - ✅ **Backup Time**: Waktu backup (biasanya 02:00 WIB)
3. **Ambil screenshot** yang menunjukkan semua informasi di atas

**Cara Screenshot:**
- Gunakan `Windows + Shift + S` untuk Snipping Tool
- Atau gunakan `Alt + Print Screen` untuk screenshot window aktif
- Pastikan semua informasi terlihat jelas

**Contoh yang Harus Terlihat:**
```
Backup Settings
├── Automatic Backups: ✅ Enabled
├── Schedule: Daily (Every day)
├── Retention: 30 days
└── Backup Time: 02:00 WIB
```

#### C. Screenshot Backup History

**Langkah:**
1. Di halaman **Backups**, scroll ke bagian **Backup History** atau **Recent Backups**
2. Pastikan daftar backup terlihat dengan informasi:
   - Tanggal backup
   - Waktu backup
   - Ukuran backup
   - Status backup (Completed, Failed, dll.)
3. **Ambil screenshot** yang menunjukkan:
   - Minimal 3-5 backup terbaru
   - Tanggal backup yang berbeda (untuk membuktikan backup harian)
   - Status backup yang "Completed"

**Cara Screenshot:**
- Scroll untuk melihat beberapa backup
- Ambil screenshot yang menunjukkan backup dengan tanggal berbeda
- Pastikan tanggal terlihat jelas

**Contoh yang Harus Terlihat:**
```
Backup History
├── 2025-01-20 02:00 WIB - 2.5 MB - ✅ Completed
├── 2025-01-19 02:00 WIB - 2.4 MB - ✅ Completed
├── 2025-01-18 02:00 WIB - 2.3 MB - ✅ Completed
└── ...
```

#### D. Verifikasi Retensi 30 Hari

**Langkah:**
1. Di halaman **Backups**, lihat backup tertua yang masih tersedia
2. **Hitung selisih hari** antara backup tertua dengan hari ini
3. **Pastikan** backup tertua tidak lebih dari 30 hari
4. **Verifikasi** bahwa backup yang lebih dari 30 hari sudah tidak ada (sudah dihapus otomatis)
5. **Ambil screenshot** yang menunjukkan:
   - Backup tertua yang masih tersedia
   - Tanggal backup tertua
   - Perhitungan retensi (jika perlu)

**Cara Verifikasi:**
- Lihat tanggal backup tertua
- Hitung: Hari ini - Tanggal backup tertua ≤ 30 hari
- Jika backup tertua lebih dari 30 hari, berarti retensi tidak bekerja dengan benar

**Contoh:**
- Hari ini: 20 Januari 2025
- Backup tertua: 21 Desember 2024
- Selisih: 30 hari ✅ (masih dalam retensi)

---

### 2. Verifikasi Backup Status melalui Admin Panel

#### A. Akses Admin Panel

**Langkah:**
1. Buka aplikasi PaberLand di browser
2. **Login** sebagai administrator
3. Klik menu **Admin** di navigation bar
4. Pilih **Settings** dari menu admin
5. Scroll ke bagian **Backup & Recovery**

**Catatan:**
- Pastikan Anda memiliki akses admin
- Jika tidak memiliki akses, minta akses dari administrator

#### B. Screenshot Backup Status di Admin Panel

**Langkah:**
1. Di halaman **Admin Settings**, scroll ke bagian **Backup & Recovery**
2. Pastikan informasi berikut terlihat:
   - ✅ **Deskripsi**: "Database backup otomatis setiap hari pada pukul 02:00 WIB"
   - ✅ **Backup Terakhir**: Tanggal backup terakhir
   - ✅ **Ukuran**: Ukuran backup
   - ✅ **Status**: Status backup (Completed, dll.)
   - ✅ **Tombol**: "Buat Backup Sekarang" dan "Download Backup"
3. **Ambil screenshot** yang menunjukkan semua informasi di atas

**Cara Screenshot:**
- Pastikan seluruh bagian Backup & Recovery terlihat
- Gunakan `Windows + Shift + S` untuk Snipping Tool
- Pastikan teks terbaca dengan jelas

**Contoh yang Harus Terlihat:**
```
Backup & Recovery
├── Deskripsi: Database backup otomatis setiap hari pada pukul 02:00 WIB
├── Backup Terakhir: 20 Januari 2025
├── Ukuran: 2.5 MB
├── Status: ✅ Completed
└── Tombol: [Buat Backup Sekarang] [Download Backup]
```

#### C. Test Manual Backup (Opsional)

**Langkah:**
1. Di halaman **Admin Settings**, klik tombol **"Buat Backup Sekarang"**
2. Tunggu hingga proses backup selesai (akan muncul loading indicator)
3. Setelah selesai, refresh halaman atau tunggu status update
4. **Ambil screenshot** yang menunjukkan:
   - Proses backup sedang berjalan (jika memungkinkan)
   - Status backup setelah selesai
   - Tanggal backup terbaru

**Catatan:**
- Test ini opsional, hanya untuk membuktikan bahwa backup manual juga berfungsi
- Pastikan tidak membuat terlalu banyak backup manual

---

### 3. Verifikasi Backup Dapat Di-Download

#### A. Download Backup dari Supabase Dashboard

**Langkah:**
1. Di Supabase Dashboard, halaman **Backups**
2. Pilih salah satu backup dari daftar
3. Klik tombol **Download** atau **Export**
4. **Ambil screenshot** yang menunjukkan:
   - Tombol download tersedia
   - Proses download (jika memungkinkan)
   - File backup berhasil di-download

**Catatan:**
- File backup biasanya dalam format `.sql` atau `.dump`
- Ukuran file bisa cukup besar, pastikan koneksi internet stabil

#### B. Download Backup dari Admin Panel (Jika Tersedia)

**Langkah:**
1. Di Admin Panel, halaman **Settings** → **Backup & Recovery**
2. Klik tombol **"Download Backup"**
3. Tunggu hingga file download
4. **Ambil screenshot** yang menunjukkan:
   - Tombol download
   - Proses download
   - File berhasil di-download

**Catatan:**
- Fitur ini mungkin tidak tersedia di semua versi
- Jika tidak tersedia, cukup screenshot dari Supabase Dashboard

---

## Checklist Screenshot yang Diperlukan

### Screenshot Wajib (5 screenshot):

1. ✅ **Supabase Dashboard - Backup Settings**
   - Menunjukkan Automatic Backups: Enabled
   - Menunjukkan Schedule: Daily
   - Menunjukkan Retention: 30 days
   - File: `nf07-supabase-backup-settings.png`

2. ✅ **Supabase Dashboard - Backup History**
   - Menunjukkan minimal 3-5 backup terbaru
   - Menunjukkan tanggal backup yang berbeda (backup harian)
   - Menunjukkan status "Completed"
   - File: `nf07-supabase-backup-history.png`

3. ✅ **Supabase Dashboard - Retensi 30 Hari**
   - Menunjukkan backup tertua yang masih tersedia
   - Menunjukkan tanggal backup tertua (tidak lebih dari 30 hari)
   - File: `nf07-supabase-retention.png`

4. ✅ **Admin Panel - Backup Status**
   - Menunjukkan bagian Backup & Recovery
   - Menunjukkan informasi backup terakhir
   - Menunjukkan status backup
   - File: `nf07-admin-backup-status.png`

5. ✅ **Admin Panel - Backup Description**
   - Menunjukkan deskripsi "Database backup otomatis setiap hari pada pukul 02:00 WIB"
   - Menunjukkan tombol backup
   - File: `nf07-admin-backup-description.png`

### Screenshot Opsional (2 screenshot tambahan):

6. ⭐ **Manual Backup Test**
   - Menunjukkan proses backup manual
   - Menunjukkan status setelah backup selesai
   - File: `nf07-manual-backup-test.png`

7. ⭐ **Download Backup**
   - Menunjukkan tombol download backup
   - Menunjukkan file backup berhasil di-download
   - File: `nf07-download-backup.png`

---

## Tips Screenshot yang Baik

### 1. Kualitas Screenshot:
- ✅ Gunakan resolusi yang jelas
- ✅ Pastikan teks terbaca dengan baik
- ✅ Hindari screenshot yang terlalu kecil
- ✅ Crop screenshot untuk fokus pada bagian penting

### 2. Highlighting:
- ✅ Gunakan tool seperti Snipping Tool atau Snip & Sketch
- ✅ Bisa tambahkan panah atau kotak untuk highlight bagian penting
- ✅ Bisa tambahkan teks label jika perlu

### 3. Organisasi:
- ✅ Simpan screenshot dengan nama yang jelas:
  - `nf07-supabase-backup-settings.png`
  - `nf07-supabase-backup-history.png`
  - `nf07-supabase-retention.png`
  - `nf07-admin-backup-status.png`
  - `nf07-admin-backup-description.png`

---

## Contoh Dokumentasi Hasil

### Tabel Dokumentasi:

| No | Aspek yang Diuji | Lokasi | Hasil | Screenshot |
|:---|:-----------------|:-------|:------|:-----------|
| 1 | Konfigurasi Backup Otomatis | Supabase Dashboard | ✅ Automatic Backups: Enabled, Schedule: Daily | `nf07-supabase-backup-settings.png` |
| 2 | Backup History | Supabase Dashboard | ✅ Backup dibuat setiap hari, status Completed | `nf07-supabase-backup-history.png` |
| 3 | Retensi 30 Hari | Supabase Dashboard | ✅ Backup tertua masih dalam 30 hari, backup lama sudah dihapus | `nf07-supabase-retention.png` |
| 4 | Status Backup di Admin Panel | Admin Settings | ✅ Menampilkan backup terakhir dengan informasi lengkap | `nf07-admin-backup-status.png` |
| 5 | Deskripsi Backup | Admin Settings | ✅ Menampilkan "Database backup otomatis setiap hari pada pukul 02:00 WIB" | `nf07-admin-backup-description.png` |

### Kesimpulan:

✅ **Backup Otomatis Diaktifkan**: Supabase Dashboard menunjukkan automatic backups enabled

✅ **Backup Harian**: Backup history menunjukkan backup dibuat setiap hari pada pukul 02:00 WIB

✅ **Retensi 30 Hari**: Backup tertua yang tersedia tidak lebih dari 30 hari, backup lama sudah dihapus otomatis

✅ **Status Backup Terlihat**: Admin panel menampilkan status backup terakhir dengan informasi lengkap

✅ **Backup Dapat Di-Download**: Backup dapat di-download melalui Supabase Dashboard

**Status**: ✅ **Valid** - Sistem memenuhi requirement NF-07 (Recoverability)

---

## Troubleshooting

### Jika Tidak Memiliki Akses Supabase Dashboard:

1. **Minta Akses:**
   - Hubungi pemilik project Supabase
   - Minta akses sebagai collaborator atau admin
   - Atau minta screenshot dari pemilik project

2. **Alternatif:**
   - Gunakan screenshot dari admin panel aplikasi
   - Dokumentasikan bahwa backup dikonfigurasi melalui Supabase managed service
   - Sebutkan bahwa backup otomatis adalah fitur default Supabase

### Jika Backup History Tidak Terlihat:

1. **Cek Project:**
   - Pastikan project aktif
   - Pastikan tidak ada masalah dengan Supabase service

2. **Cek Plan:**
   - Pastikan project menggunakan plan yang mendukung backup
   - Free plan mungkin memiliki limitasi backup

3. **Kontak Support:**
   - Hubungi Supabase support jika ada masalah
   - Atau dokumentasikan konfigurasi backup berdasarkan dokumentasi Supabase

### Jika Admin Panel Tidak Menampilkan Status:

1. **Cek Koneksi:**
   - Pastikan aplikasi terhubung ke Supabase dengan benar
   - Cek environment variables

2. **Cek API:**
   - Pastikan endpoint `/api/admin/backup` berfungsi
   - Cek console untuk error

3. **Alternatif:**
   - Gunakan screenshot dari Supabase Dashboard saja
   - Dokumentasikan bahwa status backup dapat dilihat di Supabase Dashboard

---

## Informasi Tambahan

### Tentang Supabase Backup:

- **Automatic Backups**: Supabase secara otomatis membuat backup database setiap hari
- **Backup Time**: Backup biasanya dilakukan pada waktu tertentu (misalnya 02:00 WIB)
- **Retention**: Backup disimpan sesuai dengan retensi yang dikonfigurasi (default 30 hari untuk beberapa plan)
- **Storage**: Backup disimpan di Supabase storage
- **Recovery**: Backup dapat digunakan untuk restore database jika terjadi masalah

### Plan Supabase:

- **Free Plan**: ❌ Tidak termasuk project backups (atau sangat terbatas)
- **Pro Plan**: ✅ Scheduled backups dengan retensi **maksimal 7 hari**
- **Team Plan**: ✅ Scheduled backups dengan retensi lebih lama (perlu verifikasi)
- **Enterprise Plan**: ✅ Scheduled backups dengan retensi hingga 30 hari atau lebih

**⚠️ PENTING - Keterbatasan Plan:**

Berdasarkan screenshot Supabase Dashboard:
- **Free Plan**: Tidak menyediakan project backups
- **Pro Plan**: Hanya menyediakan backup dengan retensi **maksimal 7 hari** (tidak cukup untuk requirement 30 hari)
- **Team/Enterprise Plan**: Kemungkinan menyediakan retensi lebih lama

**Solusi untuk Memenuhi Requirement NF-07 (Retensi 30 Hari):**

**Opsi 1: Upgrade ke Plan yang Mendukung (Recommended)**
- Upgrade ke **Team Plan** atau **Enterprise Plan** yang mendukung retensi 30 hari
- Atau gunakan **Point-in-Time Recovery (PITR)** add-on jika tersedia
- Biaya: Sesuai dengan pricing plan Supabase

**Opsi 2: Implementasi Backup Manual dengan Retensi 30 Hari**
- Buat sistem backup manual menggunakan:
  - Supabase CLI untuk export database
  - Script otomatis (cron job) untuk backup harian
  - Storage eksternal (AWS S3, Google Cloud Storage) untuk menyimpan backup dengan retensi 30 hari
- Implementasi di server atau menggunakan GitHub Actions / CI/CD
- Biaya: Hanya biaya storage (lebih murah)

**Opsi 3: Dokumentasikan Keterbatasan (Jika Budget Terbatas)**
- Dokumentasikan bahwa sistem menggunakan backup otomatis Supabase
- Sebutkan retensi yang tersedia sesuai plan (7 hari untuk Pro Plan)
- Jelaskan bahwa untuk retensi 30 hari, diperlukan upgrade plan atau implementasi manual
- Catat sebagai **limitation** dalam dokumentasi

**Rekomendasi:**
Untuk memenuhi requirement NF-07 dengan retensi 30 hari, disarankan untuk:
1. **Upgrade ke Team/Enterprise Plan** (jika budget memungkinkan), atau
2. **Implementasi backup manual** dengan script otomatis dan storage eksternal (lebih cost-effective)

---

## Referensi

- [Supabase Backup Documentation](https://supabase.com/docs/guides/platform/backups)
- [Supabase Database Management](https://supabase.com/docs/guides/database)
- [Supabase Dashboard Guide](https://supabase.com/docs/guides/dashboard)

---

**Catatan:** Dokumentasi ini digunakan untuk pengujian NF-07 (Recoverability) pada Platform PaberLand. Pastikan semua screenshot diambil dengan jelas dan menunjukkan bukti bahwa backup dilakukan secara otomatis setiap hari dengan retensi 30 hari.

