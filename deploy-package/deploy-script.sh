#!/bin/bash

# Deployment Script for Literasi Nusantara
# Server: 148.230.101.85

echo "🚀 Starting deployment process..."

# 1. Update system packages
echo "📦 Updating system packages..."
apt update && apt upgrade -y

# 2. Install Node.js 20 (if not installed)
echo "📦 Installing Node.js 20..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
apt-get install -y nodejs

# 3. Install PM2 globally
echo "📦 Installing PM2..."
npm install -g pm2

# 4. Install Nginx (if not installed)
echo "📦 Installing Nginx..."
apt install -y nginx

# 5. Create application directory
echo "📁 Creating application directory..."
mkdir -p /var/www/literasi-nusantara
cd /var/www/literasi-nusantara

# 6. Set proper permissions
echo "🔐 Setting permissions..."
chown -R www-data:www-data /var/www/literasi-nusantara
chmod -R 755 /var/www/literasi-nusantara

# 7. Install dependencies
echo "📦 Installing dependencies..."
npm install --production

# 8. Set environment variables
echo "🔧 Setting environment variables..."
export NODE_ENV=production
export NEXT_TELEMETRY_DISABLED=1

# 9. Start application with PM2
echo "🚀 Starting application with PM2..."
pm2 start npm --name "literasi-nusantara" -- start
pm2 startup
pm2 save

# 10. Configure Nginx
echo "🌐 Configuring Nginx..."
cat > /etc/nginx/sites-available/literasi-nusantara << 'EOF'
server {
    listen 80;
    server_name 148.230.101.85;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    # Cache static assets
    location /_next/static/ {
        alias /var/www/literasi-nusantara/.next/static/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location /public/ {
        alias /var/www/literasi-nusantara/public/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Proxy to Next.js
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeout settings
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}
EOF

# Enable site
ln -sf /etc/nginx/sites-available/literasi-nusantara /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test and reload Nginx
nginx -t && systemctl reload nginx

echo "✅ Deployment completed!"
echo "🌐 Your website should be available at: http://148.230.101.85"
echo "📊 Check PM2 status: pm2 status"
echo "📊 Check PM2 logs: pm2 logs literasi-nusantara"