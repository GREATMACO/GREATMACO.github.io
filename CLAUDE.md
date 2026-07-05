# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project
**404 Collective** — Static marketing site for a digital wellness app. All content is data-driven from a single file.

## Tech Stack
- **Framework**: Next.js 16 (App Router) — static export only
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4 with CSS variables
- **Fonts**: Space Grotesk (headings, `--font-space`), Inter (body, `--font-inter`), JetBrains Mono (labels/eyebrows, `--font-jetbrains`) via `next/font/google`
- **No framer-motion** — use simple CSS transitions only

## Dev Commands
```bash
npm run dev       # Start dev server (localhost:3000)
npm run build     # Static export to out/ + runs postbuild.js (deletes artifact folders)
npm start         # Preview built site locally
npm run lint      # ESLint check
```

## Build Pipeline
**`postbuild.js`** runs after `next build` — removes Next.js artifact folders (e.g. `about/`, `features/`) that cause directory listings on shared hosting. Preserves: `_next/` (JS/CSS assets), `blog/` (dynamic route pages) and `blog/*/` (individual post pages). The build must succeed before upload.

**IMPORTANT**: `out/` may get locked by OneDrive sync. If EBUSY errors occur, kill node processes first.

## Architecture

### Content Layer (edit this to change site text)
All content lives in **`src/lib/content/index.ts`**. This is the single source of truth.

- `blogPosts` record — blog posts (list page auto-generates; new slugs get pages automatically via `generateStaticParams()`)
- `featuresData` — feature cards
- `stepsData` — "How it works" steps
- `heroContent` — home page hero
- `statsData` — homepage stats
- `aboutPillars` / `aboutPrinciples` — about page sections
- `teamData` — team members
- `site` — nav items, footer links, metadata

**All pages import from `src/lib/content/index.ts` (or `src/lib/` barrel export).**
To change text anywhere on the site, only edit `src/lib/content/index.ts`.

### Type Definitions
`src/lib/types.ts` — Shared TypeScript interfaces (`BlogPostData`, `FeatureItem`, `Step`, `HeroContent`, `Pillar`, `TeamMember`, etc.)

### Routing (static export)
Pages are in `src/app/`:
- `page.tsx` — home
- `about/page.tsx`, `features/page.tsx`, `how-it-works/page.tsx`, `waitlist/page.tsx`
- `blog/page.tsx` — list
- `blog/[slug]/page.tsx` — server component (calls `generateStaticParams()`) + `BlogPostClient.tsx` (client component)

### Components
- `SharedLayout.tsx` — wraps every page with Navbar + Footer + noise overlay
- `Navbar.tsx` — desktop nav + mobile drawer (plain transitions, no framer-motion)
- `Footer.tsx` — links (uses `site.footerLinks`)
- `Icons.tsx` — custom SVG icon components (thin-line with `#c8ff2e` accent)

### Layout
`src/app/layout.tsx` — sets fonts (Space Grotesk, Inter, JetBrains Mono), metadata (title from `site.defaultTitle`/`site.templateSuffix`), background `#0a0a0c`

## Design System
**Direction: premium, editorial, restrained.** Single accent color `#c8ff2e` (electric yellow-green).

- **Surface palette**: `#0a0a0c` (deepest), `#0e0e12` (raised), `#111115` (cards), `#1a1a20` (elevated)
- **Text palette**: `#e8e7e9` (primary), `#9f9dab` (secondary), `#6b6980` (tertiary)
- **Typography scale**: `clamp()` for all headings; monospace labels at 11px with 0.25em tracking
- **Component classes in `globals.css`**: `.eyebrow`, `.section-heading`, `.btn-primary`, `.btn-secondary`, `.btn-ghost-arrow`, `.feature-card`, `.pull-quote`, `.stat-value`, `.section-dark`
- **Visual rules**: NO gradient orbs, NO dot patterns, NO generic icon-in-circle patterns, NO rounded-full buttons with shadows, NO identical section rhythm across pages
- **Noise overlay**: `.noise-overlay` in globals.css (subtle grain texture)
- **Section rhythm**: asymmetric layouts where they serve content; generous spacing (96px mobile, 128px desktop)

## Critical Deployment Constraints
**This is a statically exported site deployed to shared hosting (Namecheap), NOT Vercel.**

- `next.config.ts` has `output: "export"` and `images.unoptimized: true`
- **No API routes** — they don't work with static export. The waitlist page uses an external endpoint placeholder (`WAITLIST_ENDPOINT`)
- **Use `&mdash;` HTML entity** for em-dashes (UTF-8 bytes show as `a€"` in WhatsApp share previews)
- **Build output goes to `out/`** — rsync/upload the entire `out/` folder to `public_html` on hosting
- `out/` can get locked by OneDrive sync. If EBUSY errors occur, kill node processes first
- **`postbuild.js` removes artifact folders** — re-run build if folders appear again

## Blog Posts
Add to `blogPosts` in `src/lib/content/index.ts`. No new route files needed — `generateStaticParams()` auto-discovers them.

## Component Conventions
- Pages are `"use client"` components composing `SharedLayout` + data-driven sections
- Server components only used where needed (blog post page server side for `generateStaticParams()`)
- Custom icons in `Icons.tsx` — thin-line SVGs with `#c8ff2e` accent only
