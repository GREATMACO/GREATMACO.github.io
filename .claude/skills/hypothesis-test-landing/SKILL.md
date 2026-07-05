# hypothesis-test-landing

## Name
Hypothesis Test Landing Page

## Description
Rapid prototype hypothesis-testing landing pages for validating product assumptions. Covers pricing sensitivity tests, value proposition A/B tests, feature priority matrices, and staged funnel flows with privacy-compliant data capture.

## Tags
experiment, hypothesis-test, pricing, a-b-test, conversion, analytics, gdpr

## When to Use
- Validating willingness to pay before building a product
- Testing which messaging resonates most with visitors
- Running feature prioritization experiments
- Building landing pages that collect real purchase intent signals (not just opinions)

## Testing Mechanics

### 1. Pricing Matrix (Willingness to Pay)
Show 3 tiered options with escalating features:
```
Starter — Free — Core features, community access
Pro — €X/mo — All features, therapist dashboard
Team — €Y/mo — Everything + priority support
```
Capture which tier is selected (intent signal), store in localStorage.

### 2. Value Proposition A/B Test
Two headline variants presented randomly:
- Variant A: Outcome-focused ("Reclaim 12 hours a week")  
- Variant B: Mechanism-focused ("AI-powered interruption system")
Measure CTA clickthrough rate to waitlist page. Persist variant via cookie for 30 days.

### 3. Feature Priority (Forced Choice)
Pairwise comparisons: "Which matters more? A or B?" across all features.
Build a scoring matrix — features that win most often rank highest in perceived value.

### 4. Fake Checkout Funnel
Step 1: Choose plan → Step 2: Enter card details → Step 3: "Coming soon" screen
Measures purchase intent even without real payment processing.

## Data Capture (Privacy-First)
```typescript
// Store experiment data in localStorage with GDPR consent flag
function captureExperimentData(data: { variant?: string; tier?: string; featureRanking?: number[] }) {
  const consent = localStorage.getItem('experiment_consent');
  if (!consent) return; // respect user choice
  
  const key = '404_experiment_' + window.location.pathname;
  const existing = JSON.parse(localStorage.getItem(key) || '[]');
  existing.push({ ...data, timestamp: Date.now(), userAgent: navigator.userAgent.substring(0, 200) });
  localStorage.setItem(key, JSON.stringify(existing));
}

// Flush to server endpoint when available (buttondown, resend, custom API)
async function flushExperiments() {
  const key = '404_experiment_' + window.location.pathname;
  const data = localStorage.getItem(key);
  if (!data || !WAITLIST_ENDPOINT) return;
  
  try {
    await fetch(WAITLIST_ENDPOINT + '/experiments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data, consent }),
    });
    localStorage.removeItem(key); // cleanup sent data
  } catch {}
}
```

## GDPR Consent Pattern
Always include this text near any data capture:
> "We collect minimal data to improve our product. No personal info is shared with third parties. [Privacy Policy]"

Use a cookie banner for explicit consent on EU visitors. Minimal pattern:
```html
<!-- Show once, persists via cookie -->
<div class="consent-banner fixed bottom-0 left-0 right-0 p-4 text-center text-sm">
  We use minimal analytics to understand what works. No personal data collected.
  <a href="/privacy" class="text-accent underline ml-2">Privacy</a>
  <button onclick="acceptConsent()">Got it</button>
</div>
```

## Component Library
All components use existing design system tokens (globals.css):
- `.feature-card` — tier card container with hover state
- `.btn-primary` / `.btn-secondary` — action buttons
- `.section-dark` — section divider between experiment phases
- `.eyebrow` — section labels

## Example Tasks
- "Build a pricing sensitivity test" → generate 3-tier pricing cards + selection capture
- "Test two headline variants" → A/B split logic + cookie persistence + CTA tracking
- "Run a feature priority experiment" → forced choice matrix + scoring algorithm
