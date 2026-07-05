# premium-redesign

## Name
Premium Site Redesign

## Description
Audit and redesign marketing sites to a premium, editorial standard. Covers design system review, typography audit, spacing rhythm check, component completeness, performance checklist, and pixel-perfect implementation.

## Tags
redesign, premium, audit, design-system, typography, performance

## When to Use
- Reviewing an existing site's visual quality
- Building a marketing/landing page from scratch that needs to feel expensive
- Auditing spacing, typography scale, color usage, component completeness
- Refining any page toward a $20k+ premium aesthetic

## Workflow

### 1. Design System Audit
- Extract all CSS variables from globals.css - verify palette coherence (surface to text hierarchy)
- Check font stack: heading/body/label fonts should be purposeful, not default
- Verify accent color usage: single accent used sparingly, never gradient-fied or tinted generically
- Confirm spacing rhythm: sections use consistent padding (96px mobile / 128px desktop typical)

### 2. Component Completeness Check
Every marketing page needs these components (CSS classes exist):
- .eyebrow - monospace section label, uppercase, accent color
- .section-heading-lg/md/sm - clamp() typography scale
- .btn-primary / .btn-secondary / .btn-ghost-arrow - three button tiers
- .feature-card - hover states, border transitions
- .pull-quote - accent left-border, large font
- .stat-value - monospace number display
- .tag - pill label with subtle border
- .section-dark - raised section divider
- .input - form field with focus ring
- .noise-overlay - SVG grain texture at 2.5% opacity

### 3. Visual Quality Rules (never violate)
- NO gradient orbs / dot patterns / radial backgrounds
- NO identical spacing rhythm on consecutive sections
- NO rounded-full buttons with shadows
- NO icon-in-circle decorative patterns
- NO more than one accent color
- NO default system fonts unless explicitly intentional

### 4. Performance Checklist
- All fonts via next/font/google (no layout shift)
- Images: unoptimized for static hosting, or use modern formats
- No unused CSS - Tailwind purge should match actual class usage
- SVG icons preferred over icon libraries (no bundle bloat)
- Noise overlay uses inline SVG data URI (zero network request)

### 5. Responsive Verification Points
Test at: 375px (iPhone SE), 414px (iPhone Max), 768px (iPad mini), 1024px (iPad Pro), 1280px+ (desktop)
- Typography clamp() values resolve correctly
- Grid layouts collapse gracefully (no overflow)
- Touch targets >= 44px on mobile
- Section padding reduces to --section-narrow on mobile

## Example Tasks
- "Audit this site's premium quality" - run all audit steps, output diff report
- "Redesign the pricing page" - use component library above, maintain design system tokens
- "Fix the spacing rhythm" - identify sections with identical padding, make each section visually distinct
