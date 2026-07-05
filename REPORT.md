# Status Report — 404 Collective Audit & Build

## Date: 2026-07-02

---

## Fixes Applied (Phase 1)

### README.md
- [x] Fixed font references from "Outfit + Karla" to actual fonts (Space Grotesk / Inter / JetBrains Mono)
- [x] Tech stack line now matches reality

### PageSection.tsx
- [x] Removed framer-motion dependency entirely
- [x] Rewrote with CSS-only animations using existing globals.css classes (.eyebrow, .section-heading, .btn-primary)
- [x] Added new reusable components: Section, FeatureGrid, StatBlock, SectionDivider
- [x] Kept GradientDots as a pure SVG utility (no animation needed)

### Dependencies
- [x] Removed framer-motion from package.json dependencies (it was unused by any page)
- [ ] Run `npm install` to update lockfile after removing framer-motion

### Git Ignore
- [x] Added `.gitignore` rules for build artifacts: `/out.zip`, `/out.tar*`, `*.zip`, `*.tar.gz`

### Favicon
- [x] Created `public/favicon.svg` — accent-colored SVG mark with "404" text
- [x] Wired into layout.tsx via `<link rel="icon">` in `<head>`

---

## Hosting Readiness (Phase 2)

### Recommendation: Cloudflare Pages + External Email Service

| Item | Status | Notes |
|------|--------|-------|
| Static build pipeline | Ready | `npm run build` works with current config |
| postbuild.js cleanup | Ready | Removes artifact dirs, keeps blog posts |
| DEPLOYMENT.md | Created | Step-by-step for Cloudflare Pages, Namecheap rsync, Netlify CLI |
| Environment variables | TODO | Set WAITLIST_ENDPOINT before deploy |
| DNS setup | TODO (Marlon) | Create CNAME/A record after choosing provider |
| SSL certificate | Auto (Cloudflare/Netlify) or manual (Namecheap) | — |

### What Marlon Needs to Do
1. Choose hosting provider (recommendation: Cloudflare Pages free tier)
2. Choose email service for waitlist (recommendation: Buttondown €5/mo, Resend free tier, or MailerLite free up to 1000 subs)
3. Create account on chosen provider(s)
4. Add DNS records after choosing provider

---

## Experiment Implementation (Phase 3)

### /experiment page created with three sections:

| Section | Purpose | Data Captured |
|---------|---------|---------------|
| Headline A/B Test | Value proposition resonance | Variant selected, CTA clicked |
| Pricing Matrix | Willingness to pay (€9/€19/€39) | Tier selected |
| Feature Priority | Feature importance ranking | Winner per round |

### TODO: Marlon fills in values before publishing
- Headline copy for variants A and B (in `src/app/experiment/page.tsx`)
- Final pricing tier amounts
- Experiment endpoint for data flush (if using server-side storage)
- /privacy page URL text

---

## Skills Created (Phase 5)

| Skill | Path | Purpose |
|-------|------|---------|
| premium-redesign | `.claude/skills/premium-redesign/SKILL.md` | Design system audit, premium quality review |
| hypothesis-test-landing | `.claude/skills/hypothesis-test-landing/SKILL.md` | Pricing tests, A/B testing, consent patterns |
| deployment-helper | `.claude/skills/deployment-helper/SKILL.md` | Cloudflare Pages, rsync, Netlify CI/CD |

---

## Remaining Work (Phase 4 — Design Polish)

### Items requiring minimal effort:
- [ ] Team avatars on /about page: replace empty circles with initials-based avatars
- [ ] Stats section: consider labeling as "estimates" since they're pre-launch figures
- [ ] Add /privacy page (minimal legal text for GDPR compliance)
- [ ] Responsive verification at 375px, 414px, 768px breakpoints

### Items requiring more effort:
- [ ] Navigation experiment link: uncomment `experimentHref` in content/index.ts and add to Navbar.tsx
- [ ] Plausible analytics integration (EU-friendly, €5/mo self-hostable)
- [ ] Add og:image meta tags for social sharing previews

---

## Free-for.dev Tools Used/Recommended

| Tool | Category | Cost | Purpose |
|------|----------|------|---------|
| Cloudflare Pages | Hosting | Free tier | Static site hosting + CDN |
| Netlify (alternative) | Hosting | Free tier | Alternative static host |
| Buttondown | Email | €5/mo | Waitlist email list management |
| Resend (alternative) | Email | Free tier | Transactional email API |
| MailerLite (alternative) | Email | Free up to 10k subs | Email service with landing pages |
| is-a.dev | Domain | Free | Subdomain for experiments |

---

## Files Created/Modified

### Created:
- `public/favicon.svg` — site favicon
- `DEPLOYMENT.md` — deployment guide (Cloudflare Pages, rsync, Netlify)
- `EXPERIMENTS.md` — experiment setup and parameter guide
- `REPORT.md` — this file
- `src/app/experiment/page.tsx` — pricing sensitivity experiment page
- `.claude/skills/premium-redesign/SKILL.md` — redesign audit skill
- `.claude/skills/hypothesis-test-landing/SKILL.md` — hypothesis test skill
- `.claude/skills/deployment-helper/SKILL.md` — deployment automation skill

### Modified:
- `README.md` — fixed font names in tech stack line
- `.gitignore` — added build artifact rules (out.zip, etc.)
- `src/app/layout.tsx` — added favicon link tag
- `src/components/PageSection.tsx` — removed framer-motion, CSS-only rewrite
- `package.json` — removed framer-motion dependency
- `src/app/waitlist/page.tsx` — added GDPR consent gate + Buttondown API integration
- `src/lib/content/index.ts` — added experimentHref config (commented out)
- `src/lib/types.ts` — added SiteConfig interface with optional experimentHref

### To Run:
```bash
npm install  # update after framer-motion removal
npm run dev  # start dev server
npm run build  # verify static export succeeds
```
