# Setup Manual Backup dengan Retensi 30 Hari - 16 Desember 2025

## Ringkasan
Implementasi sistem backup manual untuk database PaberLand dengan retensi 30 hari menggunakan `pg_dump`. Backup dilakukan secara otomatis setiap hari dan backup lama (>30 hari) akan dihapus otomatis. Solusi ini memenuhi requirement NF-07 (Recoverability) tanpa perlu upgrade plan Supabase.

## Masalah yang Ditemukan

### 1. Keterbatasan Supabase Free Plan
- **Gejala**: Supabase Free Plan tidak menyediakan project backups
- **Penyebab**: Backup otomatis hanya tersedia untuk Pro Plan ke atas dengan retensi maksimal 7 hari
- **Dampak**: 
  - Tidak ada backup otomatis untuk database
  - Requirement NF-07 membutuhkan retensi 30 hari (tidak terpenuhi dengan Pro Plan)
  - Risiko kehilangan data jika terjadi masalah

### 2. Requirement NF-07 Tidak Terpenuhi
- **Requirement**: Backup database dilakukan secara otomatis setiap hari dengan retensi 30 hari
- **Status Saat Ini**: Tidak ada backup otomatis
- **Dampak**: Requirement NF-07 tidak valid

## Solusi yang Diterapkan

### 1. Script Backup Database (`scripts/backup-database.sh` & `scripts/backup-database.js`)

**Fungsi**:
- Membuat backup database menggunakan `pg_dump`
- Kompres backup dengan gzip untuk menghemat space
- Membuat metadata JSON untuk setiap backup
- Cleanup backup lama (>30 hari) secara otomatis
- Logging lengkap ke `backups/backup.log`

**Features**:
- ✅ Backup harian otomatis
- ✅ Retensi 30 hari (backup lama dihapus otomatis)
- ✅ Kompresi gzip untuk menghemat space
- ✅ Metadata JSON untuk tracking
- ✅ Error handling dan logging

### 2. Script Cleanup (`scripts/cleanup-old-backups.sh`)

**Fungsi**:
- Menghapus backup yang lebih dari 30 hari
- Menghapus metadata file yang terkait
- Logging cleanup activity
- Report space yang dibebaskan

### 3. Update Admin Helpers (`src/lib/adminHelpers.ts`)

**Perubahan**:
- Update `createBackup()` untuk menggunakan backup script yang sebenarnya
- Update `getBackupStatus()` untuk membaca backup files dari disk
- Tambah `listBackups()` untuk list semua backup yang tersedia

**Fungsi Baru**:
- `createBackup()`: Menjalankan backup script dan return metadata
- `getBackupStatus()`: Membaca status backup terakhir dari filesystem
- `listBackups()`: List semua backup dengan metadata

### 4. Update Package.json

**Script Baru**:
- `npm run backup`: Menjalankan backup database
- `npm run backup:cleanup`: Cleanup backup lama

### 5. Setup Cron Job

**Cron Job untuk Backup Harian**:
```cron
# Backup database setiap hari pukul 02:00 WIB (19:00 UTC)
0 19 * * * cd /root/apps/paberland && /usr/bin/node scripts/backup-database.js >> backups/backup-cron.log 2>&1
```

**Cron Job untuk Cleanup (Opsional)**:
```cron
# Cleanup backup lama setiap hari pukul 03:00 WIB (20:00 UTC)
0 20 * * * cd /root/apps/paberland && /usr/bin/node -e "require('./scripts/backup-database.js').cleanupOldBackups()" >> backups/cleanup-cron.log 2>&1
```

## File yang Dibuat

1. `scripts/backup-database.sh` - Bash script untuk backup
2. `scripts/backup-database.js` - Node.js script untuk backup
3. `scripts/cleanup-old-backups.sh` - Script untuk cleanup backup lama
4. `backups/.gitkeep` - Folder backups (excluded dari git)
5. `backups/README.md` - Dokumentasi folder backups
6. `docs/skripsi/SETUP_BACKUP_MANUAL.md` - Panduan setup lengkap

## File yang Diubah

1. `src/lib/adminHelpers.ts`
   - Update `createBackup()` untuk menggunakan backup script
   - Update `getBackupStatus()` untuk membaca dari filesystem
   - Tambah `listBackups()` function

2. `package.json`
   - Tambah script `backup` dan `backup:cleanup`

3. `.gitignore`
   - Exclude backup files dari git (`.sql`, `.sql.gz`, `.json`, `.log`)

## Deployment Steps

### 1. Commit & Push Perubahan

```bash
# Commit perubahan
git add scripts/backup-database.sh scripts/backup-database.js scripts/cleanup-old-backups.sh
git add src/lib/adminHelpers.ts package.json .gitignore
git add backups/.gitkeep backups/README.md
git add docs/skripsi/SETUP_BACKUP_MANUAL.md
git commit -m "feat: implement manual database backup with 30 days retention

- Add backup scripts (bash and Node.js)
- Add cleanup script for old backups
- Update adminHelpers to use real backup implementation
- Add npm scripts for backup and cleanup
- Setup backup directory with .gitkeep
- Add comprehensive setup documentation

Fixes NF-07 requirement: Backup database dengan retensi 30 hari"

git push origin main
```

### 2. Setup di Server

```bash
# SSH ke server
ssh root@148.230.101.85

# Navigate ke app directory
cd /root/apps/paberland

# Pull perubahan terbaru
git pull origin main

# Install dependencies (jika ada package baru)
npm install

# Buat folder backups jika belum ada
mkdir -p backups

# Install PostgreSQL client (jika belum terinstall)
apt-get update
apt-get install -y postgresql-client

# Setup environment variable DATABASE_URL
# Edit .env atau .env.local
nano .env

# Tambahkan atau update:
# DATABASE_URL=postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/postgres
# BACKUP_DIR=./backups

# Test backup manual
npm run backup

# Verifikasi backup berhasil
ls -lh backups/

# Setup cron job untuk backup harian
crontab -e

# Tambahkan baris berikut:
# Backup database setiap hari pukul 02:00 WIB (19:00 UTC)
0 19 * * * cd /root/apps/paberland && /usr/bin/node scripts/backup-database.js >> backups/backup-cron.log 2>&1

# Verifikasi cron job
crontab -l

# Restart aplikasi
pm2 restart paberland

# Verifikasi aplikasi berjalan
pm2 status
pm2 logs paberland --lines 20
```

### 3. Verifikasi Backup

```bash
# Cek backup files
ls -lh backups/backup_*.sql.gz

# Cek log backup
tail -f backups/backup.log

# Cek status via admin panel
# Login sebagai admin → Admin → Settings → Backup & Recovery
```

## Hasil

### Sebelum Implementasi
- ❌ Tidak ada backup otomatis
- ❌ Requirement NF-07 tidak terpenuhi
- ❌ Risiko kehilangan data tinggi

### Sesudah Implementasi
- ✅ Backup otomatis setiap hari pukul 02:00 WIB
- ✅ Retensi 30 hari (backup lama dihapus otomatis)
- ✅ Backup dapat diakses via admin panel
- ✅ Metadata backup tersimpan untuk tracking
- ✅ Requirement NF-07 terpenuhi
- ✅ Tidak perlu upgrade plan Supabase

### Metrics Backup

**Backup Size**: ~2-5 MB per backup (tergantung ukuran database)
**Storage Required**: ~60-150 MB untuk 30 hari backup
**Backup Time**: ~5-10 detik per backup
**Cleanup**: Otomatis setiap backup (hapus backup >30 hari)

## Catatan Penting

1. **DATABASE_URL**: 
   - Pastikan environment variable `DATABASE_URL` sudah di-set di server
   - Dapat diambil dari Supabase Dashboard → Settings → Database → Connection string
   - Format: `postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/postgres`

2. **PostgreSQL Client**:
   - Pastikan `pg_dump` terinstall di server
   - Install dengan: `apt-get install postgresql-client` (Ubuntu/Debian)

3. **Cron Job**:
   - Backup dijadwalkan setiap hari pukul 02:00 WIB (19:00 UTC)
   - Log cron job tersimpan di `backups/backup-cron.log`
   - Verifikasi cron job dengan: `crontab -l`

4. **Storage**:
   - Monitor disk space untuk folder backups
   - Backup dikompres dengan gzip untuk menghemat space
   - Cleanup otomatis menjaga storage tetap dalam batas wajar

5. **Security**:
   - Backup files mengandung data sensitif
   - Pastikan permission folder backups aman: `chmod 700 backups`
   - Jangan commit backup files ke git (sudah di .gitignore)

6. **Monitoring**:
   - Cek log backup secara berkala: `tail -f backups/backup.log`
   - Cek status backup via admin panel
   - Setup alert jika backup gagal (opsional)

## Troubleshooting

### Backup Gagal: pg_dump not found
```bash
# Install PostgreSQL client
apt-get update
apt-get install -y postgresql-client
```

### Backup Gagal: DATABASE_URL not set
```bash
# Set environment variable
export DATABASE_URL="postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/postgres"

# Atau tambahkan ke .env file
echo "DATABASE_URL=postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/postgres" >> .env
```

### Cron Job Tidak Berjalan
```bash
# Cek cron service
systemctl status cron

# Cek cron logs
grep CRON /var/log/syslog

# Test script manual
cd /root/apps/paberland
npm run backup
```

### Backup Files Tidak Terlihat di Admin Panel
```bash
# Cek permission folder
ls -la backups/

# Pastikan folder readable
chmod 755 backups/

# Cek log untuk error
tail -50 backups/backup.log
```

## Referensi

- Server: `148.230.101.85`
- Repository: `https://github.com/habstrakT808/PABERLAND---Platform-penulis-indonesia.git`
- PM2 Service: `paberland`
- Application Path: `/root/apps/paberland`
- Backup Directory: `/root/apps/paberland/backups`
- Documentation: `docs/skripsi/SETUP_BACKUP_MANUAL.md`

## Tim yang Terlibat

- **Tanggal**: 16 Desember 2025
- **Issue**: Implementasi backup manual dengan retensi 30 hari untuk memenuhi NF-07
- **Status**: ✅ Resolved

