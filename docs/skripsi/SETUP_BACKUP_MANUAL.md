# Setup Backup Manual dengan Retensi 30 Hari

## Overview

Implementasi backup manual untuk Platform PaberLand menggunakan `pg_dump` untuk membuat backup database PostgreSQL (Supabase) dengan retensi 30 hari. Backup dilakukan secara otomatis setiap hari dan backup lama akan dihapus otomatis.

## Prerequisites

### 1. Install PostgreSQL Client Tools

**Ubuntu/Debian:**
```bash
sudo apt-get update
sudo apt-get install postgresql-client
```

**macOS:**
```bash
brew install postgresql
```

**Windows:**
- Download dan install PostgreSQL dari https://www.postgresql.org/download/windows/
- Atau gunakan WSL (Windows Subsystem for Linux)

### 2. Install Node.js Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Tambahkan ke file `.env` atau `.env.local`:

```env
# Database URL untuk backup
DATABASE_URL=postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/postgres

# Optional: Custom backup directory (default: ./backups)
BACKUP_DIR=./backups
```

**Cara mendapatkan DATABASE_URL dari Supabase:**
1. Login ke Supabase Dashboard
2. Pilih project PaberLand
3. Go to **Settings** → **Database**
4. Scroll ke **Connection string**
5. Copy **URI** connection string
6. Replace `[YOUR-PASSWORD]` dengan database password

**Format DATABASE_URL:**
```
postgresql://postgres.xxxxx:[PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres
```

## Setup Otomatis

### 1. Setup Cron Job (Linux/macOS)

**Edit crontab:**
```bash
crontab -e
```

**Tambahkan baris berikut untuk backup harian pukul 02:00 WIB (19:00 UTC):**
```cron
# Backup database PaberLand setiap hari pukul 02:00 WIB (19:00 UTC)
0 19 * * * cd /path/to/literasi-nusantara && /usr/bin/node scripts/backup-database.js >> logs/backup-cron.log 2>&1
```

**Atau menggunakan bash script:**
```cron
# Backup database PaberLand setiap hari pukul 02:00 WIB
0 19 * * * cd /path/to/literasi-nusantara && bash scripts/backup-database.sh >> logs/backup-cron.log 2>&1
```

**Catatan:**
- Ganti `/path/to/literasi-nusantara` dengan path absolut ke folder project
- Pastikan script memiliki permission execute: `chmod +x scripts/backup-database.sh`
- Untuk WIB (UTC+7), gunakan 19:00 UTC untuk 02:00 WIB

### 2. Setup Scheduled Task (Windows)

**Menggunakan Task Scheduler:**

1. Buka **Task Scheduler** (taskschd.msc)
2. Klik **Create Basic Task**
3. Nama: "PaberLand Database Backup"
4. Trigger: **Daily** pada pukul 02:00
5. Action: **Start a program**
6. Program: `node.exe`
7. Arguments: `C:\path\to\literasi-nusantara\scripts\backup-database.js`
8. Start in: `C:\path\to\literasi-nusantara`
9. Finish

**Atau menggunakan PowerShell:**
```powershell
$action = New-ScheduledTaskAction -Execute "node.exe" -Argument "C:\path\to\literasi-nusantara\scripts\backup-database.js" -WorkingDirectory "C:\path\to\literasi-nusantara"
$trigger = New-ScheduledTaskTrigger -Daily -At 2am
Register-ScheduledTask -TaskName "PaberLand Backup" -Action $action -Trigger $trigger
```

### 3. Setup GitHub Actions (Alternatif)

Buat file `.github/workflows/backup-database.yml`:

```yaml
name: Database Backup

on:
  schedule:
    # Run daily at 02:00 WIB (19:00 UTC)
    - cron: '0 19 * * *'
  workflow_dispatch: # Allow manual trigger

jobs:
  backup:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
      
      - name: Install PostgreSQL Client
        run: |
          sudo apt-get update
          sudo apt-get install -y postgresql-client
      
      - name: Run Backup
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
          BACKUP_DIR: ./backups
        run: |
          npm run backup
      
      - name: Upload Backup to Artifacts
        uses: actions/upload-artifact@v3
        with:
          name: database-backup
          path: backups/*.sql.gz
          retention-days: 30
```

**Setup Secrets di GitHub:**
1. Go to repository **Settings** → **Secrets and variables** → **Actions**
2. Add new secret: `DATABASE_URL` dengan value connection string

## Manual Execution

### Backup Sekarang

**Menggunakan npm script:**
```bash
npm run backup
```

**Menggunakan Node.js:**
```bash
node scripts/backup-database.js
```

**Menggunakan bash script:**
```bash
bash scripts/backup-database.sh
```

### Cleanup Backup Lama

**Menggunakan npm script:**
```bash
npm run backup:cleanup
```

**Menggunakan Node.js:**
```bash
node -e "require('./scripts/backup-database.js').cleanupOldBackups()"
```

**Menggunakan bash script:**
```bash
bash scripts/cleanup-old-backups.sh
```

## Struktur Backup

Setelah backup berjalan, struktur folder akan seperti ini:

```
backups/
├── backup_2025-01-20_020000.sql.gz    # Backup file (compressed)
├── backup_2025-01-20_020000.json     # Metadata file
├── backup_2025-01-19_020000.sql.gz
├── backup_2025-01-19_020000.json
├── backup.log                         # Log file
└── cleanup.log                        # Cleanup log
```

### Format Metadata JSON

```json
{
  "backup_id": "backup-2025-01-20_020000",
  "created_at": "2025-01-20T02:00:00Z",
  "file_name": "backup_2025-01-20_020000.sql.gz",
  "file_size": "2.5 MB",
  "file_size_bytes": 2621440,
  "status": "completed",
  "retention_days": 30,
  "expires_at": "2025-02-19T02:00:00Z"
}
```

## Verifikasi Backup

### 1. Cek Backup Files

```bash
ls -lh backups/backup_*.sql.gz
```

### 2. Cek Log

```bash
tail -f backups/backup.log
```

### 3. Test Restore (Opsional)

```bash
# Extract backup
gunzip backups/backup_2025-01-20_020000.sql.gz

# Restore to test database
psql -h [HOST] -U postgres -d test_db < backups/backup_2025-01-20_020000.sql
```

## Monitoring

### Cek Status Backup via Admin Panel

1. Login sebagai admin
2. Navigate ke **Admin** → **Settings**
3. Scroll ke bagian **Backup & Recovery**
4. Lihat status backup terakhir

### Cek via API

```bash
curl -X GET http://localhost:3000/api/admin/backup \
  -H "Cookie: [your-auth-cookie]"
```

## Troubleshooting

### Error: pg_dump not found

**Solusi:**
```bash
# Install PostgreSQL client
# Ubuntu/Debian:
sudo apt-get install postgresql-client

# macOS:
brew install postgresql

# Windows:
# Install PostgreSQL dari https://www.postgresql.org/download/windows/
```

### Error: DATABASE_URL not set

**Solusi:**
- Pastikan environment variable `DATABASE_URL` sudah di-set
- Cek file `.env` atau `.env.local`
- Atau export manual: `export DATABASE_URL="postgresql://..."`

### Error: Permission denied

**Solusi:**
```bash
# Berikan permission execute pada script
chmod +x scripts/backup-database.sh
chmod +x scripts/cleanup-old-backups.sh
```

### Error: Cannot create backup directory

**Solusi:**
```bash
# Buat folder backups secara manual
mkdir -p backups
chmod 755 backups
```

### Backup terlalu besar

**Solusi:**
- Backup sudah dikompresi dengan gzip
- Jika masih terlalu besar, pertimbangkan untuk:
  - Exclude tables tertentu (jika tidak penting)
  - Backup hanya schema tanpa data (untuk development)
  - Gunakan cloud storage untuk backup

## Best Practices

1. **Monitor Backup Size**: Pastikan ada cukup space untuk 30 hari backup
2. **Test Restore**: Test restore backup secara berkala untuk memastikan backup valid
3. **Offsite Backup**: Pertimbangkan untuk copy backup ke cloud storage (AWS S3, Google Cloud Storage)
4. **Notification**: Setup email/notification jika backup gagal
5. **Log Rotation**: Rotate log files secara berkala

## Cloud Storage Integration (Opsional)

Untuk backup ke cloud storage, tambahkan script upload setelah backup:

```bash
# Upload to AWS S3
aws s3 cp backups/backup_*.sql.gz s3://your-bucket/backups/

# Upload to Google Cloud Storage
gsutil cp backups/backup_*.sql.gz gs://your-bucket/backups/
```

## Security

1. **Protect DATABASE_URL**: Jangan commit `.env` file ke git
2. **Secure Backup Files**: Backup files mengandung data sensitif, pastikan permission file aman
3. **Encrypt Backups**: Pertimbangkan untuk encrypt backup files sebelum upload ke cloud

## Maintenance

### Cleanup Log Files

```bash
# Rotate log files setiap bulan
find backups/ -name "*.log" -mtime +30 -delete
```

### Monitor Disk Space

```bash
# Cek ukuran folder backups
du -sh backups/
```

## Support

Jika ada masalah dengan backup:
1. Cek log file: `backups/backup.log`
2. Cek error messages di console
3. Verifikasi DATABASE_URL dan permissions
4. Test backup manual terlebih dahulu

---

**Catatan:** Backup manual ini memenuhi requirement NF-07 dengan retensi 30 hari. Backup dilakukan setiap hari dan backup lama (>30 hari) akan dihapus otomatis.

