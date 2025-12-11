#!/bin/bash

# Script untuk health check website
# Memastikan website dapat diakses dan merespons dengan baik

LOG_FILE="/var/log/health-check.log"
SITE_URL="https://paberland.com"
LOCAL_URL="http://localhost:3000"
MAX_RESPONSE_TIME=5  # detik

# Function untuk logging
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# Function untuk check local server
check_local() {
    log "🔍 Checking local server ($LOCAL_URL)..."
    
    RESPONSE=$(curl -s -o /dev/null -w '%{http_code}|%{time_total}' --max-time $MAX_RESPONSE_TIME $LOCAL_URL 2>/dev/null)
    HTTP_CODE=$(echo $RESPONSE | cut -d'|' -f1)
    TIME_TOTAL=$(echo $RESPONSE | cut -d'|' -f2)
    
    if [ "$HTTP_CODE" == "200" ]; then
        log "✅ Local server OK (HTTP $HTTP_CODE, Time: ${TIME_TOTAL}s)"
        return 0
    else
        log "❌ Local server FAILED (HTTP $HTTP_CODE, Time: ${TIME_TOTAL}s)"
        return 1
    fi
}

# Function untuk check public site
check_public() {
    log "🔍 Checking public site ($SITE_URL)..."
    
    RESPONSE=$(curl -s -o /dev/null -w '%{http_code}|%{time_total}' --max-time $MAX_RESPONSE_TIME $SITE_URL 2>/dev/null)
    HTTP_CODE=$(echo $RESPONSE | cut -d'|' -f1)
    TIME_TOTAL=$(echo $RESPONSE | cut -d'|' -f2)
    
    if [ "$HTTP_CODE" == "200" ]; then
        log "✅ Public site OK (HTTP $HTTP_CODE, Time: ${TIME_TOTAL}s)"
        return 0
    else
        log "❌ Public site FAILED (HTTP $HTTP_CODE, Time: ${TIME_TOTAL}s)"
        return 1
    fi
}

# Function untuk check PM2 status
check_pm2() {
    log "🔍 Checking PM2 status..."
    
    PM2_STATUS=$(pm2 jlist 2>/dev/null | grep -o '"status":"[^"]*"' | head -1 | cut -d'"' -f4)
    RESTART_COUNT=$(pm2 jlist 2>/dev/null | grep -o '"restart_time":[0-9]*' | head -1 | cut -d':' -f2)
    
    if [ "$PM2_STATUS" == "online" ]; then
        log "✅ PM2 is online (Restarts: $RESTART_COUNT)"
        
        # Warning jika restart count terlalu tinggi
        if [ "$RESTART_COUNT" -gt 10 ]; then
            log "⚠️  WARNING: High restart count ($RESTART_COUNT). Application may be unstable."
        fi
        
        return 0
    else
        log "❌ PM2 is not online (Status: $PM2_STATUS)"
        return 1
    fi
}

# Main execution
main() {
    log "🏥 Starting health check..."
    
    LOCAL_OK=0
    PUBLIC_OK=0
    PM2_OK=0
    
    check_local && LOCAL_OK=1
    check_public && PUBLIC_OK=1
    check_pm2 && PM2_OK=1
    
    if [ $LOCAL_OK -eq 1 ] && [ $PUBLIC_OK -eq 1 ] && [ $PM2_OK -eq 1 ]; then
        log "✅ All health checks passed"
        exit 0
    else
        log "❌ Health check failed. Some services are not responding correctly."
        exit 1
    fi
}

main

