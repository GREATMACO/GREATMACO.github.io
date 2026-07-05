# DEPLOY NOW — 404 Collective → Alwaysdata

## Your site is ready (14 pages, build verified)
```
out/
├── index.html          ← Home page
├── about.html          ← About page  
├── features.html       ← Features page
├── how-it-works.html   ← How it works page
├── waitlist.html       ← Waitlist (test version)
├── experiment.html     ← Pricing sensitivity test
├── blog/index.html     ← Blog listing
├── favicon.svg         ← Site icon
├── _next/              ← JS/CSS assets
└── blog/[slug]/        ← Individual posts
```

## OPTION A: WebDAV via FileZilla (RECOMMENDED — most reliable)

1. Open **FileZilla** on your PC
2. In the top toolbar, fill in these EXACT fields:

| Field | Value |
|-------|-------|
| Protocol | **WebDAV over HTTPS** |
| Host | `admin.alwaysdata.com` |
| Port | `443` |
| Username | `404collective` |
| Password | `<your-account-password>` |

3. Click **"Quickconnect"**
4. In the right panel (remote), navigate to: `/home/404collective/out/`
5. In the left panel (local), navigate to: `C:\Users\marlo\OneDrive\Desktop\Everything\Projects\404_collective\out\`
6. Select ALL files in the left panel → **drag to right panel**
7. Wait for upload to complete

8. After upload, go to your admin panel and visit: https://404collective.alwaysdata.net — your site will be live!

## OPTION B: Upload via Alwaysdata Admin Panel (if FileZilla fails)

1. Go to https://admin.alwaysdata.com
2. Look for a **"Files"**, **"File Manager"**, or **"Browse files"** link in the sidebar menu
3. If you see it, click through to `/home/404collective/out/`
4. There should be an **upload button** — use it to upload your `out/` folder

## OPTION C: PowerShell commands (copy-paste)

Run these in PowerShell as one block:
```powershell
# 1. Navigate to project
cd "C:\Users\marlo\OneDrive\Desktop\Everything\Projects\404_collective"

# 2. Make sure build exists
npm run build

# 3. Open the out/ folder in Explorer (so you can copy files)
explorer out
```

## OPTION D: GitHub + Alwaysdata Git Deploy (future deploys)

```powershell
cd "C:\Users\marlo\OneDrive\Desktop\Everything\Projects\404_collective"
git init
git add -A
git commit -m "Deploy 404 Collective to Alwaysdata"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/404collective.git
git push -u origin main
```

Then in admin panel: Sites → [404collective] → look for **"Deploy from Git"** or **"Pull from repository"** button.

## After deployment: verify your site works

1. Visit: https://404collective.alwaysdata.net
2. Check these pages load:
   - / (home page with hero + stats)
   - /about
   - /features
   - /how-it-works
   - /waitlist
   - /experiment
   - /blog
3. If you see a file listing or "directory browsing" error, the root directory isn't set correctly in admin panel

## Admin Panel Check (if site shows 404 after upload)

Go to https://admin.alwaysdata.com/site/1056230/configuration/ and verify:
- Type = **Static files** ✓
- Root directory = `/home/404collective/out/` ✓
- Address = `404collective.alwaysdata.net` ✓

## Troubleshooting

| Problem | Fix |
|---------|-----|
| WebDAV connection refused | Try SFTP on port 2222 instead (Protocol=SFTP, Port=2222) |
| FTP blocked | Use the admin panel's web file manager (look for "Files" link) |
| Site shows 404 after upload | Wait 5 minutes (cache), or click "Restart" button in admin panel |
| CSS not loading | Verify `_next/` folder uploaded to server's `out/` directory |
