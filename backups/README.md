# Database Backups

Folder ini menyimpan backup database PaberLand dengan retensi 30 hari.

## Informasi

- **Backup Schedule**: Setiap hari pukul 02:00 WIB
- **Retention**: 30 hari
- **Format**: SQL dump yang dikompres dengan gzip (.sql.gz)
- **Metadata**: File JSON untuk setiap backup

## File yang Disimpan

- `backup_YYYYMMDD_HHMMSS.sql.gz` - Backup file (compressed)
- `backup_YYYYMMDD_HHMMSS.json` - Metadata backup
- `backup.log` - Log backup
- `cleanup.log` - Log cleanup

## Catatan

- Backup files tidak di-commit ke git (ada di .gitignore)
- Backup lama (>30 hari) akan dihapus otomatis
- Pastikan folder ini memiliki permission yang tepat untuk keamanan

## Restore Database

Untuk restore database dari backup:

```bash
# Extract backup
gunzip backups/backup_YYYYMMDD_HHMMSS.sql.gz

# Restore to database
psql -h [HOST] -U postgres -d postgres < backups/backup_YYYYMMDD_HHMMSS.sql
```

**PENTING**: Restore akan mengganti semua data di database. Pastikan backup database sebelum restore.

