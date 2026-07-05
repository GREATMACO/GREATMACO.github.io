#!/bin/bash
# deploy.sh — Deploy 404 Collective to Alwaysdata
# Run from project root: bash deploy.sh <method>
# Methods: webdav, git, rsync

set -e
PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "=== 404 Collective Deploy Script ==="

# Ensure site is built
echo "Building site..."
npm run build --prefix "$PROJECT_DIR"

echo ""
echo "Site built to out/ — choose your deploy method below:"
echo ""

case "${1:-}" in
  webdav)
    # WebDAV deployment (port 443, HTTPS)
    echo "--- WebDAV Deployment ---"
    echo "Run these commands from your terminal:"
    echo ""
    echo "# Install cadaver if not installed:   sudo apt install cadaver  (Linux) or use FileZilla"
    echo ""
    echo "# Using curl with WebDAV PUT:"
    echo 'curl -T out/index.html "https://404collective.alwaysdata.net/webdav/out/\\?username=404collective&password=YOUR_PASSWORD"'
    echo ""
    echo "# Or use FileZilla GUI:"
    echo "  Protocol: WebDAV over HTTPS"
    echo "  Host: admin.alwaysdata.com"
    echo "  Port: 443"
    echo "  Username: 404collective"
    echo "  Password: <your-account-password>"
    ;;

  git)
    # Git deployment
    echo "--- Git Deployment ---"
    echo "Run these commands from your terminal:"
    echo ""
    echo "# Initialize git repo if not done:"
    echo 'cd "C:\Users\marlo\OneDrive\Desktop\Everything\Projects\404_collective"'
    echo "git init"
    echo "git add -A"
    echo "git commit -m \"Initial deploy\""
    echo ""
    echo "# Add remote (replace with your actual repo):"
    echo 'git remote add origin https://github.com/YOUR_USERNAME/404collective.git'
    echo "git branch -M main"
    echo "git push -u origin main"
    ;;

  rsync)
    # SSH/rsync deployment (port 2222 for Alwaysdata SFTP)
    echo "--- SSH Deployment ---"
    echo "Run this command from your terminal:"
    echo ""
    echo 'rsync -avz --delete --rsh="ssh -p 2222" out/ 404collective@sftp.alwaysdata.net:/home/404collective/out/'
    ;;

  *)
    echo "=== Available Deploy Methods ==="
    echo ""
    echo "1) WebDAV (port 443, HTTPS — RECOMMENDED)"
    echo "   FileZilla: Protocol=WebDAV over HTTPS, Host=admin.alwaysdata.com, Port=443"
    echo "   Username: 404collective"
    echo ""
    echo "2) SFTP (port 2222)"
    echo '   rsync -avz --delete --rsh="ssh -p 2222" out/ user@sftp.alwaysdata.net:/home/404collective/out/'
    echo ""
    echo "3) Git push (if Alwaysdata supports it for your plan)"
    echo ""
    echo "Usage: bash deploy.sh <method>"
    echo "  Methods: webdav, git, rsync"
    ;;
esac
