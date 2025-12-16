#!/bin/bash
# Simple backup script for PaberLand
# Runs pg_dump and compresses output
# Retention: 30 days

BACKUP_DIR=/root/apps/paberland/backups
TIMESTAMP=$(date +%Y-%m-%d_%H-%M-%S)
BACKUP_FILE=$BACKUP_DIR/backup_$TIMESTAMP.sql.gz
RETENTION_DAYS=30

# Create backup directory if not exists
mkdir -p $BACKUP_DIR

# Create backup
export PGPASSWORD='Fansspongebobno2'
pg_dump --no-password --no-owner --no-acl \
  -h aws-0-ap-southeast-1.pooler.supabase.com \
  -p 6543 \
  -U 'postgres.ujbygopdxsarjkkgkvmv' \
  -d postgres | gzip > $BACKUP_FILE

# Check if backup was successful
if [ -s "$BACKUP_FILE" ]; then
  SIZE=$(du -h $BACKUP_FILE | cut -f1)
  echo "[$(date)] SUCCESS: Backup created: $BACKUP_FILE ($SIZE)" >> $BACKUP_DIR/backup.log
else
  echo "[$(date)] ERROR: Backup failed" >> $BACKUP_DIR/backup.log
  exit 1
fi

# Cleanup old backups (older than RETENTION_DAYS)
find $BACKUP_DIR -name 'backup_*.sql.gz' -mtime +$RETENTION_DAYS -delete
echo "[$(date)] Cleanup completed (removed backups older than $RETENTION_DAYS days)" >> $BACKUP_DIR/backup.log

