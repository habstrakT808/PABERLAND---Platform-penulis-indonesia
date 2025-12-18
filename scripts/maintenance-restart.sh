#!/bin/bash

# Script untuk maintenance restart server
# Membersihkan semua proses yang stuck dan restart aplikasi

LOG_FILE="/var/log/maintenance-restart.log"
APP_NAME="paberland"

# Function untuk logging
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
    echo "$1"
}

# Main execution
main() {
    log "=== STARTING MAINTENANCE RESTART ==="
    log ""
    
    # Step 1: Stop PM2
    log "=== STOPPING PM2 ==="
    pm2 stop $APP_NAME
    sleep 2
    log ""
    
    # Step 2: Kill all next-server processes
    log "=== KILLING ALL NEXT-SERVER PROCESSES ==="
    pkill -9 -f 'next-server' || log "No next-server processes found"
    sleep 2
    log ""
    
    # Step 3: Kill all node processes on port 3000
    log "=== KILLING ALL NODE PROCESSES ON PORT 3000 ==="
    if command -v fuser &> /dev/null; then
        fuser -k 3000/tcp 2>/dev/null || log "No process on port 3000"
    elif command -v lsof &> /dev/null; then
        PORT_PID=$(lsof -ti:3000 2>/dev/null)
        if [ ! -z "$PORT_PID" ]; then
            kill -9 $PORT_PID 2>/dev/null
            log "Killed process $PORT_PID on port 3000"
        else
            log "No process on port 3000"
        fi
    else
        log "Warning: fuser and lsof not available, skipping port cleanup"
    fi
    sleep 2
    log ""
    
    # Step 4: Verify port 3000 is free
    log "=== VERIFYING PORT 3000 IS FREE ==="
    if command -v netstat &> /dev/null; then
        PORT_STATUS=$(netstat -tlnp 2>/dev/null | grep :3000 || echo "")
        if [ -z "$PORT_STATUS" ]; then
            log "Port 3000 is now free"
        else
            log "Warning: Port 3000 still in use:"
            log "$PORT_STATUS"
        fi
    elif command -v ss &> /dev/null; then
        PORT_STATUS=$(ss -tlnp 2>/dev/null | grep :3000 || echo "")
        if [ -z "$PORT_STATUS" ]; then
            log "Port 3000 is now free"
        else
            log "Warning: Port 3000 still in use:"
            log "$PORT_STATUS"
        fi
    else
        log "Warning: netstat and ss not available, cannot verify port status"
    fi
    log ""
    
    # Step 5: Start PM2
    log "=== STARTING PM2 ==="
    pm2 start $APP_NAME
    sleep 5
    log ""
    
    # Step 6: Final status
    log "=== FINAL STATUS ==="
    pm2 status
    log ""
    
    # Step 7: Port 3000 status
    log "=== PORT 3000 STATUS ==="
    if command -v netstat &> /dev/null; then
        netstat -tlnp 2>/dev/null | grep :3000 || log "Port 3000 is not in use"
    elif command -v ss &> /dev/null; then
        ss -tlnp 2>/dev/null | grep :3000 || log "Port 3000 is not in use"
    else
        log "Cannot check port status (netstat/ss not available)"
    fi
    log ""
    
    log "=== MAINTENANCE RESTART COMPLETED ==="
}

main

