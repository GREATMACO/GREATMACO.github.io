# 404 Collective — Developer Guide

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Fonts**: Outfit (headings), Karla (body) via `next/font/google`

## Project Structure

```
src/
├── app/                    # Next.js App Router pages & layouts
│   ├── layout.tsx          # Root layout (fonts, metadata)
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global styles, Tailwind config
│   ├── about/
│   ├── features/
│   ├── blog/
│   │   └── [slug]/         # Dynamic blog post pages
│   ├── how-it-works/
│   ├── waitlist/
│   └── api/
│       └── waitlist/
│           └── route.ts    # POST /api/waitlist — handles signups
│
├── components/             # Reusable UI components
│   ├── SharedLayout.tsx    # Wraps every page: Navbar + content + Footer
│   ├── Navbar.tsx          # Top nav (desktop + mobile drawer)
│   ├── Footer.tsx          # Page footer
│   ├── Icons.tsx           # Custom SVG icon set
│   └── PageSection.tsx     # Helpers: GradientDots, SectionHeading
│
└── lib/                    # Data layer & content (edit here to update site text)
    ├── index.ts            # Barrel export (re-export everything)
    ├── types.ts            # Shared TypeScript types
    └── content/
        └── index.ts        # All site content in one place
```

## How to Edit Content

All text, data, and content lives in **`src/lib/content/index.ts`**.
Edit that file and the changes reflect across every page automatically.

**To update blog posts:** Add or modify entries in the `blogPosts` record in `src/lib/content/index.ts`.
- The blog list page auto-generates from the record.
- The dynamic `[slug]` page reads from the same record.
- New slugs automatically get new pages — no route files to create.

**To update features, steps, team, or hero text:** Use the exported functions:
- `getFeatures()` — feature cards
- `getSteps()` — how it works steps
- `getHeroContent()` — home page hero
- `getStats()` — homepage stats
- `getAboutPillars()` / `getAboutPrinciples()` — about page sections
- `getTeam()` — team members
- `site` — nav items, footer links, metadata

## Adding a New Blog Post

1. Open `src/lib/content/index.ts`
2. Add an entry to the `blogPosts` record:

```ts
"your-slug": {
  slug: "your-slug",
  category: "Category",
  title: "Post Title",
  excerpt: "One-line summary",
  date: "May 19, 2026",
  readTime: "5 min read",
  content: ["Paragraph 1...", "Paragraph 2...", ...],
},
```

That's it — the blog listing and the dynamic page both pick it up automatically.

## Adding an API Route

API routes go in `src/app/api/[route-name]/route.ts`.

Example:
```
src/app/api/
└── waitlist/
    └── route.ts    # POST /api/waitlist
```

## Running the Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Building for Production

```bash
npm run build
npm start
```

## Component Conventions

- Pages are `"use client"` components that compose shared layouts + data-driven sections
- `SharedLayout` wraps every page with Navbar + Footer
- All animations use `framer-motion` with `whileInView` for scroll-triggered reveals
- Custom icons live in `Icons.tsx` — add new ones following the existing pattern (thin-line SVGs with amber/emerald accents)
- Layout text should use Tailwind classes, not inline styles
