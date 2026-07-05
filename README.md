# 404 Collective

Static marketing site for the 404 Collective digital wellness app. Pre-launch landing page with pricing experiment, waitlist capture, and blog.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Editing Content

All site text lives in `src/lib/content/index.ts`. Edit that file — changes reflect across every page.

- **Blog posts** — add entries to the `blogPosts` record. Pages generate automatically via `generateStaticParams()`.
- **Features, stats, team, hero** — edit the corresponding arrays/constants in the same file.
- **Navigation/footer** — edit the `site` config object.
- **Experiment page** — pricing tiers and headlines are in `src/app/experiment/page.tsx`.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, stats, features, how-it-works, CTA |
| `/about` | Manifesto, architecture pillars, team |
| `/features` | Feature cards grid |
| `/how-it-works` | 3-step guide + before/after comparison |
| `/waitlist` | Email capture with GDPR consent gate |
| `/blog` | Blog listing (data-driven) |
| `/blog/[slug]` | Individual posts (5 pre-configured) |
| `/experiment` | Pricing sensitivity test + value proposition A/B |

## Build & Deploy

```bash
npm run build   # Static export to out/
npm start       # Preview locally
```

Build pipeline: `next build` → `postbuild.js` (cleans artifact dirs) → upload `out/`.

See [DEPLOYMENT.md](./DEPLOYMENT.md) for step-by-step hosting instructions.

## Tech Stack

Next.js 16 (static export) · TypeScript · Tailwind CSS 4 · Space Grotesk / Inter / JetBrains Mono fonts

## Project Structure

```
src/
├── app/                  # Pages (App Router)
│   ├── layout.tsx        # Root layout, fonts, favicon
│   ├── globals.css       # Design system tokens & component classes
│   ├── page.tsx          # Home
│   ├── experiment/       # Pricing experiment
│   ├── waitlist/         # Email capture
│   ├── blog/             # Blog listing + dynamic posts
│   └── about/, features/, how-it-works/
├── components/
│   ├── SharedLayout.tsx  # Navbar + Footer wrapper
│   ├── Navbar.tsx        # Desktop nav + mobile drawer
│   ├── Footer.tsx        # Site footer
│   ├── Icons.tsx         # Custom SVG icons
│   └── PageSection.tsx   # Reusable section blocks (CSS-only)
├── lib/
│   ├── content/index.ts  # ALL content lives here
│   ├── types.ts          # TypeScript interfaces
│   └── index.ts          # Barrel export
```

See [CLAUDE.md](./CLAUDE.md) for full architecture details.

## Experiment Data

Experiment data is stored in browser localStorage (`404_experiment_*`). No server-side collection by default.

See [EXPERIMENTS.md](./EXPERIMENTS.md) for setup, parameter customization, and GDPR compliance notes.

## Skills

This project includes Claude Code skills under `.claude/skills/`:

- **premium-redesign** — Audit and redesign marketing sites to premium standard
- **hypothesis-test-landing** — Rapid prototype pricing/value proposition tests
- **deployment-helper** — One-command deploy across Cloudflare Pages, rsync, Netlify

## Open Decisions (TODO: Marlon)

1. **Hosting provider** for macronixmarketing.com (recommendation: Cloudflare Pages free tier)
2. **Email service** for waitlist (recommendation: Buttondown €5/mo or Resend free tier)
3. **Final pricing tiers** — current values (€9/€19/€39) are placeholders in experiment page
4. **Headline copy** — experiment uses placeholder text, needs final copy
5. **Team avatars** — `/about` shows empty circle placeholders, add real photos or initials avatars
