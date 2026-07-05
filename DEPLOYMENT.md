# Deployment Guide

## Build Process

```bash
npm install       # Install dependencies
npm run build     # Static export to out/
```

The build pipeline:
1. `next build` generates static HTML/CSS/JS to `out/`
2. `node postbuild.js` removes artifact directories (preserves `_next/` and `blog/`)
3. `.htaccess` is written for shared hosting

## Output Structure

```
out/
├── _next/          # JS/CSS assets (KEEP)
├── blog/           # Blog listing page (KEEP)
│   └── [slug]/     # Individual post pages (KEEP)
├── .htaccess       # For shared hosting
├── index.html      # Home page
├── about/          # Removed by postbuild.js
├── features/       # Removed by postbuild.js
├── how-it-works/   # Removed by postbuild.js
├── waitlist/       # Removed by postbuild.js
└── favicon.svg     # Your logo
```

## Deploy Method 1: Cloudflare Pages (Recommended)

### Automatic Deploy (CI/CD)
1. Create a GitHub repo and push your code
2. Go to dash.cloudflare.com/pages → "Create a project" → Connect to GitHub
3. Build settings:
   - Framework preset: **Next.js** (or Custom)
   - Build command: `npm run build`
   - Build output directory: `out`
4. Add environment variables in Pages settings (WAITLIST_ENDPOINT, etc.)
5. Go to your project → Custom Domain → add macronixmarketing.com
6. Follow DNS instructions (CNAME or A record)

### Manual Deploy
```bash
npm run build
npx wrangler pages deploy out --project-name your-project-name
```

### Cost: Free tier includes 100,000 daily requests/month, unlimited bandwidth on paid plans

## Deploy Method 2: Namecheap Shared Hosting

### Via FTP/SFTP
```bash
npm run build && node postbuild.js
# Upload with FileZilla or similar:
# Transfer out/ contents to public_html on server
```

### Via rsync (Linux/Mac/WSL)
```bash
npm run build && node postbuild.js
rsync -avz --delete out/ user@yourdomain.com:/public_html/
```

### Cost: ~€3-5/month (already paying for hosting)

## Deploy Method 3: Netlify CLI

### Setup
```bash
npm install netlify-cli -g
netlify login
netlify init
# Interactive setup → choose "Custom build" → set build command to `npm run build`
```

### Manual deploy
```bash
npm run build
netlify deploy --prod --dir=out
```

### Cost: Free tier includes 100GB bandwidth/month

## Environment Variables

Set these before deploying (not in git):

| Variable | Purpose | Example |
|----------|---------|---------|
| `WAITLIST_ENDPOINT` | Email service API URL | `https://api.buttondown.email/v1` |
| `PLAUSIBLE_SCRIPT_SRC` | Analytics script URL (optional) | `https://plausible.io/js/script.js` |

## DNS Setup for macronixmarketing.com

### Cloudflare Pages DNS
- Type: CNAME
- Name: `@` (bare domain) or `www`
- Target: `<your-project>.pages.dev`

### Netlify DNS
- Type: CNAME
- Name: `www`
- Target: `<your-site>.netlify.app`

## Verification Checklist

After deploying, check:
- [ ] All pages load (/, /about, /features, /how-it-works, /waitlist, /blog)
- [ ] Blog post pages work (/blog/the-404-signal etc.)
- [ ] CSS/JS assets load correctly (no 404s in browser DevTools)
- [ ] Waitlist form submits to the backend endpoint
- [ ] HTTPS active (lock icon in address bar)
- [ ] Favicon displays correctly
- [ ] Custom domain works at both bare domain and www

## Troubleshooting

| Problem | Fix |
|---------|-----|
| White screen after deploy | Verify `_next/` assets uploaded; check build output exists |
| Blog posts 404 | `postbuild.js` may have deleted blog dir — verify script runs correctly |
| CSS not loading | Check Tailwind purge; ensure class names match actual usage |
| Form doesn't submit | Verify WAITLIST_ENDPOINT env var is set; check CORS on target server |
| DNS not resolving | Wait 30-60 min for propagation; check DNS records are correct |
