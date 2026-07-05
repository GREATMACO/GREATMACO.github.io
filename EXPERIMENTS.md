# Experiment Guide

## Overview

The 404 Collective uses a dedicated experiment page (`/experiment`) to validate product assumptions before committing development resources. All data is stored in browser localStorage — no server-side tracking unless you wire up the flush endpoint.

## Experiment Page Structure

```
/experiment
├── Headline A/B Test       # Measures value proposition resonance
├── Pricing Matrix           # Measures willingness to pay (€9 / €19 / €39)
└── Feature Priority Test    # Measures feature desirability via forced choice
```

### Section 1: Headline A/B Test
- Shows Variant A or B randomly (50/50 split, persisted via cookie)
- Tracks: which variant user clicks CTA on
- Measures: value proposition resonance through action (not opinion)

**TODO: Marlon sets headline copy in `src/app/experiment/page.tsx`:**
- `HEADLINES_A` — outcome-focused variant
- `HEADLINES_B` — mechanism-focused variant

### Section 2: Pricing Matrix
- Three tiers with real prices (€9 / €19 / €39)
- Tracks: which tier each visitor selects
- Measures: price sensitivity and feature-value alignment

**TODO: Marlon sets pricing in `TIERS` array:**
- `price`, `period`, `features`, `name` for each tier

### Section 3: Feature Priority (Forced Choice)
- Pairs of features, user picks one
- Tracks: which feature wins most often
- Measures: relative importance of features to users

## Data Collection

All data stored in localStorage under `404_experiment_pricing-sensitivity-v1`:
```json
[
  { "section": "headline_test", "variant": "A", "action": "cta_click", ... },
  { "section": "pricing_matrix", "tier": "Professional", "action": "selection", ... }
]
```

To flush to a server endpoint, update the `flushExperimentData()` function in experiment/page.tsx:
```typescript
async function flushExperiments() {
  const key = "404_experiment_pricing-sensitivity-v1";
  const data = localStorage.getItem(key);
  if (!data || !WAITLIST_ENDPOINT) return;

  await fetch(WAITLIST_ENDPOINT + "/experiments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ experiments: JSON.parse(data) }),
  });
  localStorage.removeItem(key); // cleanup sent data
}
```

## GDPR Compliance

- Consent banner auto-shown on first visit (persists in localStorage)
- Data stored only if user accepts consent
- Minimal data collected (no personal identifiers beyond selection data)
- No third-party cookies or fingerprinting
- Users can delete their data by clearing localStorage

**TODO: Create /privacy page with full privacy policy text**

## How to Change Parameters

### Change pricing tiers
Edit `TIERS` array in `src/app/experiment/page.tsx`:
```typescript
const TIERS = [
  { name: "Basic", price: "€X", period: "/month", ... },
  // etc.
];
```

### Change headline variants
Edit `HEADLINES_A` and `HEADLINES_B` objects in the same file.

### Change experiment name
Edit `EXPERIMENT_NAME` — this changes the localStorage key (use for versioning experiments).

## Running Multiple Experiments

To test a different hypothesis, copy the experiment page and modify:
1. The headline variants (test new messaging)
2. The pricing tiers (test new price points)
3. The feature pairs (test new comparisons)

Keep `EXPERIMENT_NAME` unique per version to avoid data collisions.

## Success Metrics

| Metric | What it tells you | How to interpret |
|--------|-------------------|------------------|
| CTA clickthrough rate | Headline resonance | >40% is strong, <20% needs revision |
| Most-selected pricing tier | Price anchoring | If all tiers selected equally, prices are indistinct |
| Tier-to-tier spread | Price sensitivity | Large gap between Free→€9 means €9 feels like a barrier |
| Feature win rate | Feature priority | Top winner = feature to build first |

## Exporting Data

Since data lives in localStorage, you need user opt-in to collect it. Options:

1. **Email export:** When user joins waitlist, include their experiment selections in the submission payload.
2. **Manual extraction:** Open browser DevTools → Application → Local Storage → copy `404_experiment_*` keys.
3. **Server-side flush:** Wire up the POST endpoint described above (requires backend).
