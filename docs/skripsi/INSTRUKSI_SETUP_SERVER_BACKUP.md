# Instruksi Setup Backup di Server

## Ringkasan
Instruksi lengkap untuk setup backup database dengan retensi 30 hari di server `148.230.101.85`.

## Prerequisites

- ✅ Akses SSH ke server: `root@148.230.101.85`
- ✅ Git repository sudah di-push ke GitHub
- ✅ Aplikasi sudah berjalan di server dengan PM2

## Langkah-Langkah Setup

### 1. SSH ke Server

```bash
ssh root@148.230.101.85
```

### 2. Navigate ke App Directory

```bash
cd /root/apps/paberland
```

### 3. Pull Perubahan Terbaru

```bash
git pull origin main
```

**Expected Output:**
```
Updating 26b9288..b04658b
Fast-forward
 scripts/backup-database.js          | 200+ lines
 scripts/backup-database.sh          | 100+ lines
 scripts/cleanup-old-backups.sh      | 80+ lines
 scripts/setup-backup-server.sh      | 189 lines
 src/lib/adminHelpers.ts            | modified
 package.json                        | modified
 ...
```

### 4. Install Dependencies (Jika Perlu)

```bash
npm install
```

### 5. Install PostgreSQL Client (Jika Belum Terinstall)

```bash
apt-get update
apt-get install -y postgresql-client
```

**Verifikasi:**
```bash
which pg_dump
# Should output: /usr/bin/pg_dump
```

### 6. Setup Environment Variable DATABASE_URL

**A. Dapatkan DATABASE_URL dari Supabase:**
1. Login ke Supabase Dashboard: https://supabase.com/dashboard
2. Pilih project PaberLand
3. Go to **Settings** → **Database**
4. Scroll ke **Connection string**
5. Copy **URI** connection string

**B. Tambahkan ke .env file:**
```bash
# Edit .env file
nano .env

# Tambahkan atau update baris berikut:
DATABASE_URL=postgresql://postgres.xxxxx:[PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres
BACKUP_DIR=./backups

# Save dan exit (Ctrl+X, Y, Enter)
```

**C. Export untuk current session:**
```bash
export DATABASE_URL="postgresql://postgres.xxxxx:[PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres"
export BACKUP_DIR="./backups"
```

### 7. Buat Folder Backups

```bash
mkdir -p backups
chmod 700 backups
```

### 8. Test Backup Script Manual

```bash
# Test backup script
npm run backup
```

**Expected Output:**
```
[2025-12-16T...] Starting database backup...
[2025-12-16T...] Creating backup file: ./backups/backup_2025-12-16_...
[2025-12-16T...] Backup created: X.XX MB
[2025-12-16T...] Compressing backup...
[2025-12-16T...] Backup compressed: X.XX MB
[2025-12-16T...] Backup completed successfully!
```

**Verifikasi Backup:**
```bash
ls -lh backups/
# Should show: backup_YYYYMMDD_HHMMSS.sql.gz and backup_YYYYMMDD_HHMMSS.json
```

### 9. Setup Cron Job untuk Backup Otomatis

**A. Edit Crontab:**
```bash
crontab -e
```

**B. Tambahkan Baris Berikut:**
```cron
# Backup database PaberLand setiap hari pukul 02:00 WIB (19:00 UTC)
0 19 * * * cd /root/apps/paberland && /usr/bin/node scripts/backup-database.js >> backups/backup-cron.log 2>&1
```

**C. Save dan Exit:**
- Tekan `Ctrl+X`
- Tekan `Y` untuk save
- Tekan `Enter` untuk confirm

**D. Verifikasi Cron Job:**
```bash
crontab -l
# Should show the cron job you just added
```

### 10. Setup Log Rotation (Opsional)

```bash
# Create logrotate config
cat > /etc/logrotate.d/paberland-backup <<'EOF'
/root/apps/paberland/backups/*.log {
    daily
    rotate 30
    compress
    delaycompress
    missingok
    notifempty
    create 0644 root root
}
EOF
```

### 11. Set Permissions Script

```bash
chmod +x scripts/backup-database.sh
chmod +x scripts/cleanup-old-backups.sh
chmod +x scripts/setup-backup-server.sh
```

### 12. Restart Aplikasi (Jika Perlu)

```bash
pm2 restart paberland
pm2 status
```

### 13. Verifikasi Setup

**A. Cek Backup Files:**
```bash
ls -lh backups/
```

**B. Cek Log:**
```bash
tail -f backups/backup.log
```

**C. Test Cron Job (Manual Trigger):**
```bash
# Run backup manually to test
npm run backup

# Check if backup created
ls -lh backups/backup_*.sql.gz
```

**D. Cek Admin Panel:**
1. Login sebagai admin di aplikasi
2. Navigate ke **Admin** → **Settings**
3. Scroll ke bagian **Backup & Recovery**
4. Verifikasi status backup terlihat

## Alternatif: Menggunakan Setup Script

Jika ingin menggunakan script otomatis:

```bash
# Make script executable
chmod +x scripts/setup-backup-server.sh

# Run setup script
./scripts/setup-backup-server.sh
```

Script ini akan:
- ✅ Membuat folder backups
- ✅ Install PostgreSQL client (jika belum)
- ✅ Test backup script
- ✅ Setup cron job
- ✅ Setup log rotation
- ✅ Set permissions

## Verifikasi Final

### 1. Cek Cron Job Berjalan

```bash
# List cron jobs
crontab -l

# Cek cron service
systemctl status cron

# Cek cron logs
grep CRON /var/log/syslog | tail -20
```

### 2. Cek Backup Files

```bash
# List backup files
ls -lh backups/backup_*.sql.gz

# Cek metadata
cat backups/backup_*.json | head -20
```

### 3. Cek Log Files

```bash
# Backup log
tail -f backups/backup.log

# Cron log
tail -f backups/backup-cron.log
```

### 4. Test Backup Manual

```bash
cd /root/apps/paberland
npm run backup

# Wait for completion, then check
ls -lh backups/backup_*.sql.gz | tail -1
```

### 5. Verifikasi Admin Panel

1. Buka aplikasi di browser
2. Login sebagai admin
3. Go to **Admin** → **Settings** → **Backup & Recovery**
4. Verifikasi:
   - ✅ Status backup terakhir terlihat
   - ✅ Tanggal backup terlihat
   - ✅ Ukuran backup terlihat
   - ✅ Status "Completed"

## Monitoring

### Daily Monitoring

```bash
# Cek backup harian
ls -lh backups/backup_*.sql.gz | tail -1

# Cek log backup
tail -20 backups/backup.log

# Cek cron log
tail -20 backups/backup-cron.log
```

### Weekly Monitoring

```bash
# Cek jumlah backup (harus ada ~7 backup untuk 1 minggu)
ls backups/backup_*.sql.gz | wc -l

# Cek ukuran total backup
du -sh backups/

# Cek backup tertua (tidak boleh lebih dari 30 hari)
ls -lt backups/backup_*.sql.gz | tail -1
```

## Troubleshooting

### Backup Gagal: pg_dump not found

```bash
# Install PostgreSQL client
apt-get update
apt-get install -y postgresql-client

# Verify
which pg_dump
```

### Backup Gagal: DATABASE_URL not set

```bash
# Check .env file
cat .env | grep DATABASE_URL

# Export manually
export DATABASE_URL="postgresql://..."

# Test backup
npm run backup
```

### Cron Job Tidak Berjalan

```bash
# Check cron service
systemctl status cron
systemctl start cron

# Check cron logs
grep CRON /var/log/syslog | tail -20

# Test cron job manually
cd /root/apps/paberland
/usr/bin/node scripts/backup-database.js
```

### Backup Files Tidak Terlihat di Admin Panel

```bash
# Check permissions
ls -la backups/

# Check if files exist
ls -lh backups/backup_*.sql.gz

# Check adminHelpers can read files
cd /root/apps/paberland
node -e "const fs = require('fs'); console.log(fs.readdirSync('backups'))"
```

### Backup Terlalu Besar

```bash
# Check backup size
ls -lh backups/backup_*.sql.gz

# If too large, check database size
# Consider excluding certain tables if needed
```

## Maintenance

### Manual Cleanup (Jika Perlu)

```bash
# Run cleanup manually
npm run backup:cleanup

# Or using script
bash scripts/cleanup-old-backups.sh
```

### Rotate Logs

```bash
# Logs akan di-rotate otomatis oleh logrotate
# Manual rotation jika perlu:
mv backups/backup.log backups/backup.log.old
touch backups/backup.log
```

### Monitor Disk Space

```bash
# Check disk usage
df -h

# Check backup folder size
du -sh backups/
```

## Checklist Setup

- [ ] ✅ SSH ke server berhasil
- [ ] ✅ Git pull berhasil
- [ ] ✅ PostgreSQL client terinstall
- [ ] ✅ DATABASE_URL sudah di-set
- [ ] ✅ Folder backups dibuat
- [ ] ✅ Test backup manual berhasil
- [ ] ✅ Cron job sudah di-setup
- [ ] ✅ Permissions sudah benar
- [ ] ✅ Aplikasi di-restart
- [ ] ✅ Backup files terlihat
- [ ] ✅ Admin panel menampilkan status backup
- [ ] ✅ Log files terlihat

## Next Steps

Setelah setup selesai:

1. **Monitor Backup Harian**: Cek setiap hari bahwa backup berhasil
2. **Test Restore**: Test restore backup untuk memastikan backup valid
3. **Monitor Disk Space**: Pastikan ada cukup space untuk 30 hari backup
4. **Setup Alerts** (Opsional): Setup email/Slack notification jika backup gagal

## Support

Jika ada masalah:
1. Cek log files: `backups/backup.log` dan `backups/backup-cron.log`
2. Test backup manual: `npm run backup`
3. Cek cron job: `crontab -l` dan `grep CRON /var/log/syslog`
4. Lihat dokumentasi: `docs/skripsi/SETUP_BACKUP_MANUAL.md`

---

**Catatan**: Setup ini memenuhi requirement NF-07 dengan backup otomatis setiap hari dan retensi 30 hari.

