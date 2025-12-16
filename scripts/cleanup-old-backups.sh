#!/bin/bash

# Cleanup Old Backups Script for PaberLand
# This script removes backups older than the retention period (30 days)

set -e  # Exit on error

# Configuration
BACKUP_DIR="${BACKUP_DIR:-./backups}"
RETENTION_DAYS=30
LOG_FILE="${BACKUP_DIR}/cleanup.log"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Log function
log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

log_success() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}" | tee -a "$LOG_FILE"
}

log_error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}" | tee -a "$LOG_FILE"
}

log_warning() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING: $1${NC}" | tee -a "$LOG_FILE"
}

# Check if backup directory exists
if [ ! -d "$BACKUP_DIR" ]; then
    log_error "Backup directory does not exist: $BACKUP_DIR"
    exit 1
fi

log "Starting cleanup of backups older than $RETENTION_DAYS days..."

# Find and delete backups older than retention period
DELETED_COUNT=0
DELETED_SIZE=0

# Find old backup files
while IFS= read -r old_backup; do
    if [ -f "$old_backup" ]; then
        BACKUP_SIZE=$(stat -f%z "$old_backup" 2>/dev/null || stat -c%s "$old_backup" 2>/dev/null || echo 0)
        BACKUP_SIZE_MB=$(echo "scale=2; $BACKUP_SIZE / 1024 / 1024" | bc 2>/dev/null || echo "0")
        
        log "Deleting old backup: $(basename "$old_backup") (Size: ${BACKUP_SIZE_MB} MB)"
        rm -f "$old_backup"
        ((DELETED_COUNT++))
        DELETED_SIZE=$((DELETED_SIZE + BACKUP_SIZE))
        
        # Also delete corresponding metadata file if exists
        METADATA_FILE="${old_backup%.sql.gz}.json"
        if [ -f "$METADATA_FILE" ]; then
            rm -f "$METADATA_FILE"
            log "Deleted metadata file: $(basename "$METADATA_FILE")"
        fi
    fi
done < <(find "$BACKUP_DIR" -name "backup_*.sql.gz" -type f -mtime +$RETENTION_DAYS 2>/dev/null)

if [ $DELETED_COUNT -gt 0 ]; then
    DELETED_SIZE_MB=$(echo "scale=2; $DELETED_SIZE / 1024 / 1024" | bc 2>/dev/null || echo "0")
    log_success "Cleanup completed: Deleted $DELETED_COUNT backup(s), freed ${DELETED_SIZE_MB} MB"
else
    log "No old backups to delete (all backups are within retention period)"
fi

# List remaining backups
REMAINING_COUNT=$(find "$BACKUP_DIR" -name "backup_*.sql.gz" -type f | wc -l | tr -d ' ')
log "Remaining backups: $REMAINING_COUNT"

if [ $REMAINING_COUNT -gt 0 ]; then
    log "Current backups:"
    find "$BACKUP_DIR" -name "backup_*.sql.gz" -type f -exec ls -lh {} \; | awk '{print "  - " $9, "(" $5 ", modified: " $6 " " $7 " " $8 ")"}'
fi

log_success "Cleanup completed successfully!"

exit 0

