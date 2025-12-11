#!/bin/bash

# Script untuk auto-recovery dari proses Next.js yang stuck
# Kill proses stuck, free port, dan restart PM2

LOG_FILE="/var/log/nextjs-recovery.log"
APP_NAME="paberland"
APP_DIR="/root/apps/paberland"

# Function untuk logging
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# Function untuk kill proses stuck
kill_stuck_processes() {
    log "🔍 Searching for stuck Next.js processes..."
    
    KILLED_COUNT=0
    
    # Kill proses next-server yang bukan dari PM2
    ps aux | grep -E "next-server|next start" | grep -v grep | grep -v "pm2" | while read line; do
        PID=$(echo $line | awk '{print $2}')
        CPU_TIME=$(echo $line | awk '{print $10}')
        COMMAND=$(echo $line | awk '{for(i=11;i<=NF;i++) printf "%s ", $i; print ""}')
        
        # Kill jika CPU time > 120 menit (2 jam)
        if (( $(echo "$CPU_TIME > 120" | bc -l) )); then
            log "🔪 Killing stuck process $PID (CPU time: ${CPU_TIME} min)"
            kill -9 $PID 2>/dev/null
            KILLED_COUNT=$((KILLED_COUNT + 1))
        fi
    done
    
    # Kill proses yang memblokir port 3000 tapi bukan dari PM2
    PORT_PID=$(lsof -ti:3000 2>/dev/null)
    if [ ! -z "$PORT_PID" ]; then
        PM2_PID=$(pm2 jlist 2>/dev/null | grep -o '"pid":[0-9]*' | grep -o '[0-9]*' | head -1)
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
                log "🔪 Killing process $PORT_PID that is blocking port 3000"
                kill -9 $PORT_PID 2>/dev/null
                KILLED_COUNT=$((KILLED_COUNT + 1))
            fi
        else
            log "🔪 Killing process $PORT_PID that is blocking port 3000 (PM2 not running)"
            kill -9 $PORT_PID 2>/dev/null
            KILLED_COUNT=$((KILLED_COUNT + 1))
        fi
    fi
    
    log "✅ Killed $KILLED_COUNT stuck process(es)"
    return $KILLED_COUNT
}

# Function untuk restart PM2
restart_pm2() {
    log "🔄 Restarting PM2 application..."
    
    # Stop dan delete PM2 process jika ada
    pm2 stop $APP_NAME 2>/dev/null
    pm2 delete $APP_NAME 2>/dev/null
    
    # Tunggu sebentar untuk memastikan port bebas
    sleep 2
    
    # Free port 3000 jika masih digunakan
    PORT_PID=$(lsof -ti:3000 2>/dev/null)
    if [ ! -z "$PORT_PID" ]; then
        log "🔪 Force killing process $PORT_PID on port 3000"
        kill -9 $PORT_PID 2>/dev/null
        sleep 1
    fi
    
    # Start aplikasi
    cd $APP_DIR
    pm2 start npm --name $APP_NAME -- start
    
    # Tunggu aplikasi start
    sleep 5
    
    # Cek status
    PM2_STATUS=$(pm2 jlist | grep -o '"status":"[^"]*"' | head -1 | cut -d'"' -f4)
    if [ "$PM2_STATUS" == "online" ]; then
        log "✅ PM2 application restarted successfully"
        pm2 save
        return 0
    else
        log "❌ Failed to restart PM2 application. Status: $PM2_STATUS"
        return 1
    fi
}

# Function untuk health check
health_check() {
    log "🏥 Performing health check..."
    
    # Cek apakah aplikasi merespons
    HTTP_CODE=$(curl -s -o /dev/null -w '%{http_code}' --max-time 10 http://localhost:3000 2>/dev/null)
    
    if [ "$HTTP_CODE" == "200" ]; then
        log "✅ Health check passed (HTTP $HTTP_CODE)"
        return 0
    else
        log "❌ Health check failed (HTTP $HTTP_CODE)"
        return 1
    fi
}

# Main execution
main() {
    log "🚨 Starting auto-recovery process..."
    
    # Kill stuck processes
    kill_stuck_processes
    KILLED=$?
    
    if [ $KILLED -gt 0 ]; then
        # Restart PM2
        restart_pm2
        RESTART_SUCCESS=$?
        
        if [ $RESTART_SUCCESS -eq 0 ]; then
            # Health check
            sleep 3
            health_check
            HEALTH_OK=$?
            
            if [ $HEALTH_OK -eq 0 ]; then
                log "✅ Auto-recovery completed successfully"
                exit 0
            else
                log "❌ Auto-recovery completed but health check failed"
                exit 1
            fi
        else
            log "❌ Auto-recovery failed during PM2 restart"
            exit 1
        fi
    else
        log "ℹ️  No stuck processes found. No action needed."
        exit 0
    fi
}

main

