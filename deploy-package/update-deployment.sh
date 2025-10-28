#!/bin/bash

# Update Deployment Script for Optimized Next.js Build
# Purpose: Replace the running app's .next folder with an optimized build from a ZIP
# Notes:
# - If APP_DIR is not provided, the script tries to infer it from PM2.
# - Supports multiple PM2 service names (e.g., paberland and paberlan).

set -euo pipefail

echo "🚀 Starting deployment update..."

# -------- Configuration (can be overridden via flags/env) --------
ZIP_PATH=${ZIP_PATH:-"/root/optimized-build.zip"}
SERVICE_NAMES=("paberland" "paberlan")
APP_DIR=${APP_DIR:-""}  # If empty, attempt to detect from PM2
RUN_NPM_INSTALL=${RUN_NPM_INSTALL:-"false"}

usage() {
  cat << 'EOF'
Usage: ./update-deployment.sh [options]

Options:
  --zip <path>        Path to optimized build zip (default: /root/optimized-build.zip)
  --app-dir <dir>     Application directory where .next must live
  --services <names>  Space-separated PM2 service names (default: paberland paberlan)
  --install-deps      Run npm install --production in app dir

Env overrides:
  ZIP_PATH=/path/to.zip APP_DIR=/path RUN_NPM_INSTALL=true ./update-deployment.sh

EOF
}

# -------- Parse flags --------
while [[ $# -gt 0 ]]; do
  case "$1" in
    --zip)
      ZIP_PATH="$2"; shift 2;;
    --app-dir)
      APP_DIR="$2"; shift 2;;
    --services)
      IFS=' ' read -r -a SERVICE_NAMES <<< "$2"; shift 2;;
    --install-deps)
      RUN_NPM_INSTALL="true"; shift 1;;
    -h|--help)
      usage; exit 0;;
    *)
      echo "Unknown option: $1"; usage; exit 1;;
  esac
done

if [[ ! -f "$ZIP_PATH" ]]; then
  echo "❌ ZIP not found: $ZIP_PATH"; exit 1
fi

# -------- Try to detect APP_DIR from PM2 if not provided --------
detect_from_pm2() {
  local svc="$1"
  local dir=""
  if command -v pm2 >/dev/null 2>&1; then
    # Try to parse 'cwd' from pm2 describe output
    dir=$(pm2 describe "$svc" | awk '/cwd/ {print $NF}' | head -n1 || true)
    if [[ -n "$dir" && -d "$dir" ]]; then
      echo "$dir"; return 0
    fi
  fi
  return 1
}

if [[ -z "$APP_DIR" ]]; then
  for s in "${SERVICE_NAMES[@]}"; do
    if APP_DIR=$(detect_from_pm2 "$s"); then
      echo "🔎 Detected APP_DIR from PM2 ($s): $APP_DIR"; break
    fi
  done
fi

if [[ -z "$APP_DIR" ]]; then
  echo "❌ APP_DIR not set and could not be detected from PM2."
  echo "   Please run with: --app-dir /path/to/app (the directory containing package.json and .next)"
  exit 1
fi

if [[ ! -d "$APP_DIR" ]]; then
  echo "❌ APP_DIR does not exist: $APP_DIR"; exit 1
fi

echo "📁 Using APP_DIR: $APP_DIR"
cd "$APP_DIR"

# -------- Stop PM2 services (if running) --------
for s in "${SERVICE_NAMES[@]}"; do
  if pm2 list | grep -q "\b$s\b"; then
    echo "⏹️  Stopping PM2 service: $s"
    pm2 stop "$s" || true
  fi
done

# -------- Backup current .next --------
timestamp=$(date +%Y%m%d-%H%M%S)
if [[ -d ".next" ]]; then
  echo "💾 Backing up current .next to .next-backup-$timestamp"
  mv .next ".next-backup-$timestamp"
else
  echo "ℹ️  No existing .next found; proceeding"
fi

# -------- Unpack ZIP to temp and locate .next --------
TMP_DIR=$(mktemp -d /tmp/optimized-next-XXXXXX)
echo "📦 Unzipping $ZIP_PATH to $TMP_DIR"
unzip -q "$ZIP_PATH" -d "$TMP_DIR"

# Try common layouts: direct .next, nested deploy-package/.next, repository root/.next
NEXT_SRC=""
for candidate in \
  "$TMP_DIR/.next" \
  "$TMP_DIR/deploy-package/.next" \
  "$(find "$TMP_DIR" -type d -name .next | head -n1)"; do
  if [[ -n "$candidate" && -d "$candidate" ]]; then
    NEXT_SRC="$candidate"; break
  fi
done

if [[ -z "$NEXT_SRC" ]]; then
  echo "❌ Could not locate .next in the extracted ZIP."
  echo "   Ensure the ZIP contains a built .next directory (with BUILD_ID)."
  exit 1
fi

echo "📁 Found optimized .next at: $NEXT_SRC"
echo "📥 Installing optimized .next into $APP_DIR/.next"

if command -v rsync >/dev/null 2>&1; then
  rsync -a --delete "$NEXT_SRC/" "$APP_DIR/.next/"
else
  mkdir -p "$APP_DIR/.next"
  cp -r "$NEXT_SRC/"* "$APP_DIR/.next/"
fi

# -------- Verify BUILD_ID --------
if [[ ! -f "$APP_DIR/.next/BUILD_ID" ]]; then
  echo "❌ BUILD_ID missing in $APP_DIR/.next. Deployment is invalid."; exit 1
fi

# -------- Optional: install production deps --------
if [[ "$RUN_NPM_INSTALL" == "true" ]]; then
  echo "📦 Installing production dependencies..."
  npm install --production --silent || true
fi

# -------- Environment --------
echo "🔧 Ensuring production environment..."
export NODE_ENV=production
export NEXT_TELEMETRY_DISABLED=1

if [[ -f .env ]]; then
  grep -q '^NODE_ENV=production$' .env || echo 'NODE_ENV=production' >> .env
  grep -q '^NEXT_TELEMETRY_DISABLED=1$' .env || echo 'NEXT_TELEMETRY_DISABLED=1' >> .env
fi

# -------- Clear PM2 logs --------
echo "🧹 Flushing PM2 logs..."
pm2 flush || true

# -------- Restart PM2 services --------
for s in "${SERVICE_NAMES[@]}"; do
  if pm2 list | grep -q "\b$s\b"; then
    echo "🚀 Restarting PM2 service: $s"
    pm2 restart "$s" --update-env || true
  else
    echo "ℹ️  PM2 service not found: $s (skipped)"
  fi
done

echo "⏳ Waiting for application to start..."
sleep 5

echo "📊 PM2 status:" && pm2 status || true

echo "🧪 Testing application on localhost:3000..."
if curl -fsS http://localhost:3000 >/dev/null; then
  echo "✅ Application is responding!"
else
  echo "❌ Application not responding; showing recent logs:"
  for s in "${SERVICE_NAMES[@]}"; do
    pm2 logs "$s" --lines 30 || true
  done
fi

echo "🎉 Deployment update completed!"
echo "📋 Tip: Run with --app-dir <dir> if PM2 detection fails."