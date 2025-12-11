# Setup Auto Monitoring & Recovery System - 11 Desember 2025

## Ringkasan
Setup sistem monitoring dan auto-recovery otomatis untuk mencegah masalah proses Next.js yang stuck dan timeout. Sistem ini akan secara otomatis mendeteksi dan memperbaiki masalah tanpa intervensi manual.

## Masalah yang Ingin Dicegah

### 1. Proses Next.js Stuck
- **Gejala**: Proses Next.js menggunakan CPU tinggi (>80%) atau berjalan terlalu lama (>2 jam CPU time)
- **Dampak**: 
  - Website menjadi lambat atau timeout
  - Port 3000 terblokir
  - PM2 tidak bisa restart aplikasi
  - Response time sangat lambat (70+ detik)

### 2. Port 3000 Terblokir
- **Gejala**: Port 3000 digunakan oleh proses yang bukan dari PM2
- **Dampak**: PM2 tidak bisa start aplikasi baru, error `EADDRINUSE`

### 3. Aplikasi Tidak Responsif
- **Gejala**: Website tidak bisa diakses atau response time sangat lambat
- **Dampak**: User experience buruk, website down

## Solusi yang Diterapkan

### 1. Script Monitoring (`monitor-nextjs.sh`)
**Lokasi**: `/root/scripts/monitor-nextjs.sh`

**Fungsi**:
- Mendeteksi proses Next.js yang stuck berdasarkan:
  - CPU time > 2 jam (120 menit)
  - CPU usage > 80%
  - Port 3000 diblokir oleh proses non-PM2
- Logging semua aktivitas ke `/var/log/nextjs-monitor.log`
- Trigger auto-recovery jika ditemukan masalah

**Threshold**:
- `MAX_CPU_TIME=120` menit (2 jam)
- `HIGH_CPU_THRESHOLD=80%` CPU usage

### 2. Script Auto-Recovery (`auto-recover-nextjs.sh`)
**Lokasi**: `/root/scripts/auto-recover-nextjs.sh`

**Fungsi**:
- Kill proses Next.js yang stuck
- Free port 3000 jika terblokir
- Stop dan restart PM2 application
- Health check setelah recovery
- Logging ke `/var/log/nextjs-recovery.log`

**Proses Recovery**:
1. Kill semua proses stuck (CPU time > 120 menit)
2. Kill proses yang memblokir port 3000 (non-PM2)
3. Stop dan delete PM2 process lama
4. Free port 3000
5. Start aplikasi baru dengan PM2
6. Health check (HTTP 200)
7. Save PM2 configuration

### 3. Script Health Check (`health-check.sh`)
**Lokasi**: `/root/scripts/health-check.sh`

**Fungsi**:
- Check local server (localhost:3000)
- Check public site (https://paberland.com)
- Check PM2 status
- Warning jika restart count > 10
- Logging ke `/var/log/health-check.log`

**Checks**:
- HTTP response code (harus 200)
- Response time (max 5 detik)
- PM2 status (harus "online")
- Restart count monitoring

### 4. Cron Jobs
**Setup**: Otomatis via crontab

**Monitoring Script**:
```bash
*/5 * * * * /root/scripts/monitor-nextjs.sh >> /var/log/cron-monitor.log 2>&1
```
- **Frequency**: Setiap 5 menit
- **Log**: `/var/log/cron-monitor.log`

**Health Check Script**:
```bash
*/15 * * * * /root/scripts/health-check.sh >> /var/log/cron-health.log 2>&1
```
- **Frequency**: Setiap 15 menit
- **Log**: `/var/log/cron-health.log`

### 5. PM2 Configuration
**Settings yang Diterapkan**:
```bash
pm2 set pm2:autodump true      # Auto dump saat crash
pm2 set pm2:watch false         # Disable file watching
pm2 set pm2:max_memory_restart 1G  # Restart jika memory > 1GB
```

## File yang Dibuat

1. `/root/scripts/monitor-nextjs.sh` - Monitoring script
2. `/root/scripts/auto-recover-nextjs.sh` - Auto-recovery script
3. `/root/scripts/health-check.sh` - Health check script
4. `/var/log/nextjs-monitor.log` - Monitoring logs
5. `/var/log/nextjs-recovery.log` - Recovery logs
6. `/var/log/health-check.log` - Health check logs
7. `/var/log/cron-monitor.log` - Cron monitoring logs
8. `/var/log/cron-health.log` - Cron health check logs

## Cara Kerja

### Flow Monitoring & Recovery

```
┌─────────────────┐
│  Cron Job       │
│  (Every 5 min)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ monitor-nextjs  │
│    .sh          │
└────────┬────────┘
         │
         ├─► Check CPU time > 2 hours?
         ├─► Check CPU usage > 80%?
         └─► Check port 3000 blocked?
         │
         ▼
    Found Issue?
         │
         ├─► YES ──► Trigger auto-recover-nextjs.sh
         │              │
         │              ├─► Kill stuck processes
         │              ├─► Free port 3000
         │              ├─► Restart PM2
         │              └─► Health check
         │
         └─► NO ──► Log: System healthy
```

### Flow Health Check

```
┌─────────────────┐
│  Cron Job       │
│  (Every 15 min) │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ health-check.sh │
└────────┬────────┘
         │
         ├─► Check localhost:3000
         ├─► Check https://paberland.com
         └─► Check PM2 status
         │
         ▼
    All OK?
         │
         ├─► YES ──► Log: All checks passed
         │
         └─► NO ──► Log: Health check failed
```

## Testing

### Test Monitoring Script
```bash
/root/scripts/monitor-nextjs.sh
```

**Expected Output**:
```
[2025-12-11 05:43:55] Checking for stuck Next.js processes...
[2025-12-11 05:43:56] ✅ No stuck processes detected. System is healthy.
```

### Test Health Check Script
```bash
/root/scripts/health-check.sh
```

**Expected Output**:
```
[2025-12-11 05:43:58] 🏥 Starting health check...
[2025-12-11 05:43:58] 🔍 Checking local server (http://localhost:3000)...
[2025-12-11 05:43:58] ✅ Local server OK (HTTP 200, Time: 0.205265s)
[2025-12-11 05:43:58] 🔍 Checking public site (https://paberland.com)...
[2025-12-11 05:43:59] ✅ Public site OK (HTTP 200, Time: 0.698593s)
[2025-12-11 05:43:59] 🔍 Checking PM2 status...
[2025-12-11 05:44:02] ✅ PM2 is online (Restarts: 0)
[2025-12-11 05:44:02] ✅ All health checks passed
```

### Test Auto-Recovery (Manual)
```bash
# Simulasi stuck process
kill -STOP <PID>

# Run recovery
/root/scripts/auto-recover-nextjs.sh
```

## Monitoring & Maintenance

### View Logs

**Monitoring Logs**:
```bash
tail -f /var/log/nextjs-monitor.log
tail -f /var/log/cron-monitor.log
```

**Recovery Logs**:
```bash
tail -f /var/log/nextjs-recovery.log
```

**Health Check Logs**:
```bash
tail -f /var/log/health-check.log
tail -f /var/log/cron-health.log
```

### Check Cron Jobs
```bash
crontab -l
```

### Manual Trigger
```bash
# Manual monitoring check
/root/scripts/monitor-nextjs.sh

# Manual health check
/root/scripts/health-check.sh

# Manual recovery (if needed)
/root/scripts/auto-recover-nextjs.sh
```

## Hasil

### Sebelum Setup
- ❌ Proses stuck tidak terdeteksi otomatis
- ❌ Perlu intervensi manual untuk recovery
- ❌ Website bisa down selama berjam-jam
- ❌ Tidak ada monitoring proaktif

### Sesudah Setup
- ✅ Proses stuck terdeteksi otomatis setiap 5 menit
- ✅ Auto-recovery tanpa intervensi manual
- ✅ Health check setiap 15 menit
- ✅ Logging lengkap untuk troubleshooting
- ✅ PM2 auto-restart jika memory > 1GB
- ✅ Website lebih stabil dan reliable

## Catatan Penting

1. **Monitoring Frequency**: 
   - Monitoring: Setiap 5 menit (cukup cepat untuk deteksi dini)
   - Health Check: Setiap 15 menit (tidak terlalu sering)

2. **Threshold**:
   - CPU Time: 2 jam (120 menit) - proses yang berjalan > 2 jam dianggap stuck
   - CPU Usage: 80% - jika konsisten > 80% dianggap stuck

3. **Log Rotation**: 
   - Logs akan terus bertambah, pertimbangkan setup log rotation di masa depan

4. **Alerting**: 
   - Saat ini hanya logging, bisa ditambahkan email/Slack notification di masa depan

5. **PM2 Max Memory**: 
   - Set ke 1GB untuk mencegah memory leak

## Troubleshooting

### Jika Monitoring Tidak Berjalan
```bash
# Check cron service
systemctl status cron

# Check cron logs
grep CRON /var/log/syslog

# Test script manually
/root/scripts/monitor-nextjs.sh
```

### Jika Auto-Recovery Gagal
```bash
# Check logs
tail -50 /var/log/nextjs-recovery.log

# Check PM2 status
pm2 status

# Manual recovery
/root/scripts/auto-recover-nextjs.sh
```

### Jika Health Check Gagal
```bash
# Check logs
tail -50 /var/log/health-check.log

# Check website manually
curl -I https://paberland.com

# Check PM2
pm2 status
pm2 logs
```

## File yang Diubah

Tidak ada file aplikasi yang diubah. Hanya menambahkan script monitoring dan recovery di server.

## Referensi

- PM2 Documentation: https://pm2.keymetrics.io/
- Cron Documentation: https://man7.org/linux/man-pages/man5/crontab.5.html
- Previous fixes:
  - `2025-01-17-optimize-article-page-performance.md`
  - `2025-12-17-fix-cpu-usage-spike-with-caching.md`

