#!/bin/bash

# Script untuk monitoring proses Next.js yang stuck
# Mendeteksi proses yang menggunakan CPU tinggi (>80%) atau berjalan terlalu lama (>2 jam CPU time)

LOG_FILE="/var/log/nextjs-monitor.log"
MAX_CPU_TIME=120  # 2 jam dalam menit
HIGH_CPU_THRESHOLD=80  # CPU usage threshold dalam persen
STUCK_PROCESSES=()

# Function untuk logging
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# Cek proses next-server yang berjalan
check_stuck_processes() {
    log "Checking for stuck Next.js processes..."
    
    STUCK_COUNT=0
    
    # Cari proses next-server yang bukan dari PM2
    while IFS= read -r line; do
        if [ -z "$line" ]; then
            continue
        fi
        
        PID=$(echo "$line" | awk '{print $2}')
        CPU=$(echo "$line" | awk '{print $3}')
        CPU_TIME_STR=$(echo "$line" | awk '{print $10}')
        COMMAND=$(echo "$line" | awk '{for(i=11;i<=NF;i++) printf "%s ", $i; print ""}')
        
        # Skip jika PID kosong
        if [ -z "$PID" ] || ! [[ "$PID" =~ ^[0-9]+$ ]]; then
            continue
        fi
        
        # Convert CPU time dari format menit:detik atau menit ke menit (float)
        CPU_TIME_MIN=0
        if echo "$CPU_TIME_STR" | grep -q ":"; then
            # Format menit:detik
            MIN=$(echo "$CPU_TIME_STR" | cut -d: -f1)
            SEC=$(echo "$CPU_TIME_STR" | cut -d: -f2)
            CPU_TIME_MIN=$(echo "scale=2; $MIN + $SEC/60" | bc 2>/dev/null || echo "0")
        else
            # Format menit saja
            CPU_TIME_MIN=$(echo "$CPU_TIME_STR" | bc 2>/dev/null || echo "0")
        fi
        
        # Cek jika CPU time > MAX_CPU_TIME (dalam menit)
        if [ ! -z "$CPU_TIME_MIN" ] && (( $(echo "$CPU_TIME_MIN > $MAX_CPU_TIME" | bc -l 2>/dev/null || echo "0") )); then
            log "⚠️  WARNING: Process $PID has been running for ${CPU_TIME_MIN} minutes (threshold: ${MAX_CPU_TIME} min)"
            STUCK_COUNT=$((STUCK_COUNT + 1))
        fi
        
        # Cek jika CPU usage > HIGH_CPU_THRESHOLD
        CPU_FLOAT=$(echo "$CPU" | sed 's/%//' | bc 2>/dev/null || echo "0")
        if [ ! -z "$CPU_FLOAT" ] && (( $(echo "$CPU_FLOAT > $HIGH_CPU_THRESHOLD" | bc -l 2>/dev/null || echo "0") )); then
            log "⚠️  WARNING: Process $PID is using ${CPU}% CPU (threshold: ${HIGH_CPU_THRESHOLD}%)"
            STUCK_COUNT=$((STUCK_COUNT + 1))
        fi
    done < <(ps aux | grep -E "next-server|next start" | grep -v grep | grep -v "pm2")
    
    # Cek proses yang memblokir port 3000 tapi bukan dari PM2
    PORT_PID=$(lsof -ti:3000 2>/dev/null)
    if [ ! -z "$PORT_PID" ]; then
        PM2_PID=$(pm2 jlist | grep -o '"pid":[0-9]*' | grep -o '[0-9]*' | head -1)
        if [ ! -z "$PM2_PID" ]; then
            # Cek apakah PID yang memegang port 3000 adalah child process dari PM2
            IS_PM2_CHILD=false
            CURRENT_PID=$PORT_PID
            for i in {1..10}; do
                PARENT_PID=$(ps -o ppid= -p $CURRENT_PID 2>/dev/null | tr -d ' ')
                if [ "$PARENT_PID" == "$PM2_PID" ] || [ "$CURRENT_PID" == "$PM2_PID" ]; then
                    IS_PM2_CHILD=true
                    break
                fi
                CURRENT_PID=$PARENT_PID
            done
            
            if [ "$IS_PM2_CHILD" = false ]; then
                log "⚠️  WARNING: Port 3000 is held by process $PORT_PID which is NOT managed by PM2"
                STUCK_PROCESSES+=($PORT_PID)
            fi
        else
            log "⚠️  WARNING: Port 3000 is held by process $PORT_PID but PM2 is not running"
            STUCK_PROCESSES+=($PORT_PID)
        fi
    fi
    
    
    # Cek port blocking
    PORT_PID=$(lsof -ti:3000 2>/dev/null)
    if [ ! -z "$PORT_PID" ]; then
        PM2_PID=$(pm2 jlist 2>/dev/null | grep -o '"pid":[0-9]*' | grep -o '[0-9]*' | head -1)
        if [ ! -z "$PM2_PID" ]; then
            IS_PM2_CHILD=false
            CURRENT_PID=$PORT_PID
            for i in {1..10}; do
                PARENT_PID=$(ps -o ppid= -p $CURRENT_PID 2>/dev/null | tr -d ' ')
                if [ "$PARENT_PID" == "$PM2_PID" ] || [ "$CURRENT_PID" == "$PM2_PID" ]; then
                    IS_PM2_CHILD=true
                    break
                fi
                CURRENT_PID=$PARENT_PID
            done
            
            if [ "$IS_PM2_CHILD" = false ]; then
                STUCK_COUNT=$((STUCK_COUNT + 1))
            fi
        else
            STUCK_COUNT=$((STUCK_COUNT + 1))
        fi
    fi
    
    echo $STUCK_COUNT
}

# Main execution
main() {
    STUCK_COUNT=$(check_stuck_processes)
    
    if [ "$STUCK_COUNT" -gt 0 ]; then
        log "❌ Found $STUCK_COUNT stuck process(es). Triggering auto-recovery..."
        # Trigger auto-recovery script
        /root/scripts/auto-recover-nextjs.sh
        exit 1
    else
        log "✅ No stuck processes detected. System is healthy."
        exit 0
    fi
}

main

