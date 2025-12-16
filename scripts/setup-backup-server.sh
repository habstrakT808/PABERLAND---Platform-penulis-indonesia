#!/bin/bash

# Setup Backup Script untuk Server
# Script ini akan setup backup database dengan retensi 30 hari di server

set -e

echo "🚀 Setting up database backup system..."

# Configuration
APP_DIR="/root/apps/paberland"
BACKUP_DIR="${APP_DIR}/backups"
CRON_LOG_DIR="${BACKUP_DIR}"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

echo_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

echo_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo_error "Please run as root"
    exit 1
fi

# Navigate to app directory
if [ ! -d "$APP_DIR" ]; then
    echo_error "App directory not found: $APP_DIR"
    exit 1
fi

cd "$APP_DIR"
echo "📁 Working directory: $APP_DIR"

# 1. Create backups directory
echo "📦 Creating backups directory..."
mkdir -p "$BACKUP_DIR"
chmod 700 "$BACKUP_DIR"
echo_success "Backups directory created: $BACKUP_DIR"

# 2. Check PostgreSQL client
echo "🔍 Checking PostgreSQL client..."
if ! command -v pg_dump &> /dev/null; then
    echo_warning "pg_dump not found. Installing PostgreSQL client..."
    apt-get update
    apt-get install -y postgresql-client
    echo_success "PostgreSQL client installed"
else
    echo_success "PostgreSQL client found: $(which pg_dump)"
fi

# 3. Check Node.js
echo "🔍 Checking Node.js..."
if ! command -v node &> /dev/null; then
    echo_error "Node.js not found. Please install Node.js first."
    exit 1
else
    echo_success "Node.js found: $(node --version)"
fi

# 4. Check DATABASE_URL
echo "🔍 Checking DATABASE_URL environment variable..."
if [ -z "$DATABASE_URL" ]; then
    echo_warning "DATABASE_URL not set in environment"
    
    # Check .env file
    if [ -f ".env" ]; then
        if grep -q "DATABASE_URL" .env; then
            echo_success "DATABASE_URL found in .env file"
            # Source .env to export variables
            set -a
            source .env
            set +a
        else
            echo_error "DATABASE_URL not found in .env file"
            echo "Please add DATABASE_URL to .env file:"
            echo "  DATABASE_URL=postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/postgres"
            exit 1
        fi
    else
        echo_error ".env file not found"
        echo "Please create .env file with DATABASE_URL"
        exit 1
    fi
else
    echo_success "DATABASE_URL is set"
fi

# 5. Test backup script
echo "🧪 Testing backup script..."
if [ -f "scripts/backup-database.js" ]; then
    # Set BACKUP_DIR for the script
    export BACKUP_DIR="$BACKUP_DIR"
    
    # Test run (dry run - just check if script works)
    echo "Running test backup..."
    if node scripts/backup-database.js > /tmp/backup-test.log 2>&1; then
        echo_success "Backup script test passed"
        rm -f /tmp/backup-test.log
    else
        echo_error "Backup script test failed. Check /tmp/backup-test.log"
        cat /tmp/backup-test.log
        exit 1
    fi
else
    echo_error "Backup script not found: scripts/backup-database.js"
    exit 1
fi

# 6. Setup cron job
echo "⏰ Setting up cron job..."

# Check if cron job already exists
CRON_CMD="cd $APP_DIR && /usr/bin/node scripts/backup-database.js >> $CRON_LOG_DIR/backup-cron.log 2>&1"
CRON_SCHEDULE="0 19 * * *"  # 02:00 WIB (19:00 UTC)

if crontab -l 2>/dev/null | grep -q "backup-database.js"; then
    echo_warning "Cron job already exists. Skipping..."
else
    # Add cron job
    (crontab -l 2>/dev/null; echo "$CRON_SCHEDULE $CRON_CMD") | crontab -
    echo_success "Cron job added: Daily backup at 02:00 WIB (19:00 UTC)"
fi

# 7. Verify cron job
echo "🔍 Verifying cron job..."
crontab -l | grep "backup-database.js" || echo_warning "Cron job not found in crontab"

# 8. Setup log rotation (optional)
echo "📝 Setting up log rotation..."
if [ ! -f "/etc/logrotate.d/paberland-backup" ]; then
    cat > /etc/logrotate.d/paberland-backup <<EOF
$BACKUP_DIR/*.log {
    daily
    rotate 30
    compress
    delaycompress
    missingok
    notifempty
    create 0644 root root
}
EOF
    echo_success "Log rotation configured"
else
    echo_warning "Log rotation already configured"
fi

# 9. Set permissions
echo "🔒 Setting permissions..."
chmod +x scripts/backup-database.sh
chmod +x scripts/cleanup-old-backups.sh
chmod 700 "$BACKUP_DIR"
echo_success "Permissions set"

# 10. Summary
echo ""
echo "=========================================="
echo_success "Backup system setup completed!"
echo "=========================================="
echo ""
echo "📋 Summary:"
echo "  - Backup directory: $BACKUP_DIR"
echo "  - Cron schedule: Daily at 02:00 WIB (19:00 UTC)"
echo "  - Retention: 30 days"
echo "  - Log file: $CRON_LOG_DIR/backup-cron.log"
echo ""
echo "🧪 Test backup manually:"
echo "  cd $APP_DIR"
echo "  npm run backup"
echo ""
echo "📊 Check backup status:"
echo "  ls -lh $BACKUP_DIR/backup_*.sql.gz"
echo "  tail -f $CRON_LOG_DIR/backup-cron.log"
echo ""
echo "✅ Setup complete!"

