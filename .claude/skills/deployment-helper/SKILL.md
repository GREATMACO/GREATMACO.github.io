# deployment-helper

## Name
Deployment Helper

## Description
Build, deploy, and verify static Next.js sites across hosting providers. Covers Cloudflare Pages, Netlify CLI, Namecheap shared hosting (rsync), and GitHub Actions CI/CD workflows. Provider-agnostic — works with any static export setup.

## Tags
deploy, ci-cd, cloudflare, netlify, rsync, github-actions, nextjs, static-site

## When to Use
- Deploying a new site or updating an existing one
- Setting up CI/CD pipelines for automatic deploys
- Migrating between hosting providers
- Debugging deployment issues (DNS, build failures, SSL)

## Prerequisites
1. Build succeeds: `npm run build` completes without errors
2. Output directory exists: `out/` contains HTML/CSS/JS + `_next/` assets
3. Post-build cleanup runs: `postbuild.js` removes artifact directories
4. Environment variables set (waitlist endpoint, analytics IDs, etc.)

## Deploy Methods

### Method 1: Cloudflare Pages (Recommended)
**Setup:**
1. Create GitHub repo → push code
2. Go to dash.cloudflare.com/pages → "Create a project" → Connect GitHub
3. Build settings:
   - Framework preset: Next.js (or Custom for static export)
   - Build command: `npm run build`
   - Build output directory: `out`
4. Add environment variables in Pages settings (WAITLIST_ENDPOINT, etc.)
5. Add custom domain → follow DNS instructions

**Manual deploy (no CI):**
```bash
npm run build
# Deploy via wrangler
npx wrangler pages deploy out --project-name your-project
```

### Method 2: Netlify CLI
**Setup:**
```bash
npm install netlify-cli -g
netlify login
netlify init
# Deploy command (CI/CD):
netlify deploy --prod --dir=out
```

**Manual rsync to any shared host:**
```bash
npm run build && node postbuild.js
rsync -avz --delete out/ user@host:/public_html/
```

### Method 3: GitHub Actions CI/CD
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Cloudflare Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build && node postbuild.js
      - uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CF_API_TOKEN }}
          accountId: ${{ secrets.CF_ACCOUNT_ID }}
        env:
          CF_API_TOKEN: ${{ secrets.CF_API_TOKEN }}
          CF_ACCOUNT_ID: ${{ secrets.CF_ACCOUNT_ID }}
```

## DNS Setup (custom domain)
1. Add CNAME record pointing to your hosting provider's endpoint
2. Wait for SSL certificate provisioning (usually 5-30 min)
3. Verify with: `dig +short macronixmarketing.com` and curl test

## Verification Checklist
- [ ] All pages load without 404s
- [ ] CSS/JS assets load correctly (no broken references)
- [ ] Blog posts render individually
- [ ] Form submissions reach the backend (test with real email)
- [ ] HTTPS is active (check for lock icon)
- [ ] Custom domain responds at both www and bare domain
- [ ] DNS TTL is <= 300 during initial setup for faster propagation

## Troubleshooting
| Symptom | Fix |
|---------|-----|
| White screen after deploy | Check _next/ assets are uploaded; verify build output |
| Blog posts return 404 | postbuild.js may have deleted blog dir — check script |
| CSS not loading | Verify Tailwind classes match actual usage (no purge issues) |
| Form doesn't submit | Check endpoint URL in env vars; CORS settings on target server |

## Provider Migration Notes
- **Static → VPS:** Copy out/ contents, set up Nginx/Apache with root pointing to the folder
- **VPS → Static:** Export static build, deploy to Cloudflare Pages / Netlify
- **Cloudflare → Netlify:** Same process — just different CLI and dashboard
- **No database lock-in:** Content lives in src/lib/content/index.ts — move to CMS (Sanity, Decap) if needed

## Example Tasks
- "Deploy this site to Cloudflare Pages" → run setup steps above
- "Set up CI/CD for automatic deploys" → create GitHub Actions workflow
- "Migrate hosting from X to Y" → follow migration notes above
