#!/bin/bash

# Database Backup Script for PaberLand
# This script creates a daily backup of the Supabase database
# with automatic cleanup of backups older than 30 days

set -e  # Exit on error

# Configuration
BACKUP_DIR="${BACKUP_DIR:-./backups}"
RETENTION_DAYS=30
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="${BACKUP_DIR}/backup_${TIMESTAMP}.sql"
LOG_FILE="${BACKUP_DIR}/backup.log"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

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

# Check if required environment variables are set
if [ -z "$DATABASE_URL" ]; then
    log_error "DATABASE_URL environment variable is not set"
    log_error "Please set DATABASE_URL in your .env file or environment"
    exit 1
fi

# Check if pg_dump is available
if ! command -v pg_dump &> /dev/null; then
    log_error "pg_dump is not installed. Please install PostgreSQL client tools."
    log_error "On Ubuntu/Debian: sudo apt-get install postgresql-client"
    log_error "On macOS: brew install postgresql"
    exit 1
fi

log "Starting database backup..."

# Create backup using pg_dump
log "Creating backup file: $BACKUP_FILE"

if pg_dump "$DATABASE_URL" > "$BACKUP_FILE" 2>>"$LOG_FILE"; then
    # Get backup file size
    BACKUP_SIZE=$(du -h "$BACKUP_FILE" | cut -f1)
    
    # Compress backup to save space
    log "Compressing backup..."
    if gzip "$BACKUP_FILE"; then
        BACKUP_FILE="${BACKUP_FILE}.gz"
        BACKUP_SIZE=$(du -h "$BACKUP_FILE" | cut -f1)
        log_success "Backup created successfully: $BACKUP_FILE (Size: $BACKUP_SIZE)"
    else
        log_error "Failed to compress backup"
        exit 1
    fi
else
    log_error "Failed to create backup"
    exit 1
fi

# Cleanup old backups (older than RETENTION_DAYS)
log "Cleaning up backups older than $RETENTION_DAYS days..."

# Find and delete backups older than retention period
FIND_CMD="find \"$BACKUP_DIR\" -name \"backup_*.sql.gz\" -type f -mtime +$RETENTION_DAYS"

DELETED_COUNT=0
while IFS= read -r old_backup; do
    if [ -f "$old_backup" ]; then
        log "Deleting old backup: $(basename "$old_backup")"
        rm -f "$old_backup"
        ((DELETED_COUNT++))
    fi
done < <(eval "$FIND_CMD")

if [ $DELETED_COUNT -gt 0 ]; then
    log_success "Deleted $DELETED_COUNT old backup(s)"
else
    log "No old backups to delete"
fi

# List current backups
log "Current backups in $BACKUP_DIR:"
ls -lh "$BACKUP_DIR"/backup_*.sql.gz 2>/dev/null | awk '{print $9, "(" $5 ")"}' | while read -r line; do
    log "  - $line"
done || log_warning "No backups found"

# Create backup metadata file
METADATA_FILE="${BACKUP_DIR}/backup_${TIMESTAMP}.json"
cat > "$METADATA_FILE" <<EOF
{
  "backup_id": "backup-${TIMESTAMP}",
  "created_at": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "file_name": "$(basename "$BACKUP_FILE")",
  "file_size": "$BACKUP_SIZE",
  "file_size_bytes": $(stat -f%z "$BACKUP_FILE" 2>/dev/null || stat -c%s "$BACKUP_FILE" 2>/dev/null || echo 0),
  "status": "completed",
  "retention_days": $RETENTION_DAYS,
  "expires_at": "$(date -u -d "+$RETENTION_DAYS days" +"%Y-%m-%dT%H:%M:%SZ" 2>/dev/null || date -u -v+${RETENTION_DAYS}d +"%Y-%m-%dT%H:%M:%SZ" 2>/dev/null || echo "N/A")"
}
EOF

log_success "Backup metadata saved: $METADATA_FILE"

# Summary
log_success "Backup completed successfully!"
log "Backup file: $BACKUP_FILE"
log "Backup size: $BACKUP_SIZE"
log "Retention: $RETENTION_DAYS days"

exit 0

