"use client";

import { useState, useEffect } from "react";
import SharedLayout from "@/components/SharedLayout";
import PricingSurvey from "@/components/PricingSurvey";

/* ─── Experiment Config ─── */

const EXPERIMENT_NAME = "pricing-sensitivity-v1";

interface HeadlineVariant {
  id: string;
  headline: string;
  highlight: string;
  subtitle: string;
}

interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  cta?: string;
}

// TODO: Marlon fills in these values before publishing
const HEADLINES_A: HeadlineVariant = {
  id: "A",
  headline: "Reclaim the hours you lose to the scroll loop.",
  highlight: "every week.",
  subtitle: "The first app that fights your phone's design against you, not your willpower.",
};

const HEADLINES_B: HeadlineVariant = {
  id: "B",
  headline: "An interruption system designed to catch you before you slip.",
  highlight: "every time.",
  subtitle: "AI-powered detection meets CBT learning paths. Architecture over willpower.",
};

const TIERS: PricingTier[] = [
  {
    name: "Individual",
    price: "€9",
    period: "/month",
    description: "For people who want to fix their relationship with screens.",
    features: ["Focus Lock sessions", "Awareness Coach", "Offline Missions", "Community access"],
  },
  {
    name: "Professional",
    price: "€19",
    period: "/month",
    description: "For people serious about change, working with their therapist.",
    features: ["Everything in Individual", "Therapist Dashboard", "Real Metrics report", "Priority missions"],
    highlighted: true,
    cta: "Most popular",
  },
  {
    name: "Team",
    price: "€39",
    period: "/month",
    description: "For teams who care about their people's focus.",
    features: ["Everything in Professional", "Admin dashboard", "Team sprints", "Custom missions"],
  },
];

/* ─── Data Capture (localStorage + consent) ─── */

const CONSENT_KEY = "404_experiment_consent";
const STORAGE_KEY_PREFIX = "404_experiment_";

function getConsent(): boolean {
  return localStorage.getItem(CONSENT_KEY) === "true";
}

function captureResult(data: Record<string, string | number>) {
  if (!getConsent()) return;

  const key = STORAGE_KEY_PREFIX + EXPERIMENT_NAME;
  const existing = JSON.parse(localStorage.getItem(key) || "[]");
  existing.push({ ...data, timestamp: Date.now(), viewportWidth: window.innerWidth });
  localStorage.setItem(key, JSON.stringify(existing));
}

/* ─── Components ─── */

function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(CONSENT_KEY)) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-[rgba(200,255,46,0.1)] bg-[#0e0e12]/98 backdrop-blur-xl px-6 py-4">
      <div className="mx-auto max-w-3xl flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-sm text-[#9f9dab]">
          We store your experiment selections locally to improve our product. No personal data leaves this device unless you join the waitlist.{" "}
          <a href="/privacy" className="text-[#c8ff2e] underline hover:text-[#d4ff4a]">Privacy</a>
        </p>
        <div className="flex gap-3 shrink-0">
          <button onClick={() => setVisible(false)} className="btn-secondary text-sm">
            Dismiss
          </button>
          <button onClick={accept} className="btn-primary text-sm">
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

function HeadlineTest() {
  const [variant, setVariant] = useState<"A" | "B" | null>(null);
  const [ctaClicked, setCtaClicked] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PREFIX + "headline_variant");
    if (saved) setVariant(JSON.parse(saved));
    else {
      // Random split
      setVariant(Math.random() < 0.5 ? "A" : "B");
      localStorage.setItem(STORAGE_KEY_PREFIX + "headline_variant", JSON.stringify("A"));
    }
  }, []);

  const data = variant === "B" ? HEADLINES_B : HEADLINES_A;

  return (
    <section className="relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden px-6 text-center py-24">
      <div className="absolute inset-0 hero-grid pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Eyebrow */}
        <span className="eyebrow block mb-8">Test drive</span>

        {/* Headline (variant) */}
        <h1 className="max-w-2xl mx-auto font-space font-bold leading-[0.95] tracking-tight text-[#e8e7e9]" style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}>
          {data.headline.split(data.highlight).map((part, i) => (
            <span key={i}>
              {part}
              {i === 0 && <span className="text-[#c8ff2e]">{data.highlight}</span>}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p className="mt-6 mx-auto max-w-lg text-[#9f9dab] text-lg leading-relaxed">
          {data.subtitle}
        </p>

        {/* CTA */}
        {!ctaClicked ? (
          <button
            onClick={() => {
              setCtaClicked(true);
              captureResult({ section: "headline_test", variant: data.id, action: "cta_click" });
            }}
            className="btn-primary mt-10"
          >
            See how it works
          </button>
        ) : (
          <div className="mt-6 py-4 px-8 border border-[#c8ff2e]/20 bg-[#c8ff2e]/5">
            <p className="text-sm text-[#9f9dab]">Great, scroll down to compare pricing plans below.</p>
          </div>
        )}
      </div>
    </section>
  );
}

function PricingTierCard({ tier, onSelect }: { tier: PricingTier; onSelect: (tier: string) => void }) {
  return (
    <div
      className={`feature-card relative flex flex-col ${tier.highlighted ? "border-[#c8ff2e]/30 bg-[#0e0e12]" : ""}`}
    >
      {tier.cta && (
        <span className="absolute -top-3 right-6 bg-[#c8ff2e] text-[#000] text-xs font-space font-semibold px-3 py-1">
          {tier.cta}
        </span>
      )}

      <div className="flex items-baseline gap-1">
        <span className="text-4xl font-space font-bold text-[#e8e7e9]">{tier.price}</span>
        <span className="text-sm text-[#6b6980]">{tier.period}</span>
      </div>

      <p className="mt-2 text-[#9f9dab] leading-relaxed">{tier.description}</p>

      <div className="space-y-3 mt-6 flex-grow">
        {tier.features.map((feature) => (
          <div key={feature} className="flex items-start gap-2 text-sm text-[#9f9dab]">
            <span className="text-[#c8ff2e] opacity-60 shrink-0 mt-0.5">›</span>
            <span>{feature}</span>
          </div>
        ))}
      </div>

      <button
        onClick={() => onSelect(tier.name)}
        className={`btn-primary mt-8 ${tier.highlighted ? "" : "bg-transparent text-[#c8ff2e] border border-[#c8ff2e]/30 hover:bg-[#c8ff2e]/10"}`}
      >
        Choose {tier.name}
      </button>
    </div>
  );
}

function PricingMatrix() {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (tier: string) => {
    setSelected(tier);
    captureResult({ section: "pricing_matrix", tier, action: "selection" });
  };

  return (
    <section className="py-24 px-6 border-t border-[rgba(255,255,255,0.04)]">
      <div className="mx-auto max-w-6xl">
        <span className="eyebrow block mb-6 text-center">Compare plans</span>
        <h2 className="section-heading section-heading-md max-w-xl mx-auto text-center mb-4">
          Pick your level of recovery
        </h2>
        <p className="text-[#9f9dab] max-w-lg mx-auto text-center mb-16">
          Real pricing, what would you actually pay? No fake tiers. Pick the one that makes sense for your situation.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TIERS.map((tier) => (
            <PricingTierCard key={tier.name} tier={tier} onSelect={handleSelect} />
          ))}
        </div>

        {/* Selection confirmation */}
        {selected && (
          <div className="mt-12 text-center py-6 px-8 border border-[#c8ff2e]/20 bg-[#c8ff2e]/5 max-w-xl mx-auto">
            <p className="text-sm text-[#9f9dab]">
              You selected <span className="font-space font-semibold text-[#c8ff2e]">{selected}</span>.{" "}
              This is just a test. Real pricing may differ.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function FeaturePriorityTest() {
  // Round-robin pairs for forced choice test
  const [pairIndex, setPairIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const pairs: [string, string][] = [
    ["Focus Lock", "Awareness Coach"],
    ["Offline Missions", "The Collective"],
    ["Real Metrics", "Therapist Dashboard"],
    ["Focus Lock", "Offline Missions"],
    ["Awareness Coach", "Real Metrics"],
    ["The Collective", "Therapist Dashboard"],
  ];

  const current = pairs[pairIndex % pairs.length];

  const selectFeature = (feature: string) => {
    captureResult({ section: "feature_priority", round: pairIndex, winner: feature });

    if (pairIndex < pairs.length - 1) setPairIndex(pairIndex + 1);
    else setShowResults(true);
  };

  return (
    <section className="section-dark">
      <div className="section max-w-3xl mx-auto text-center">
        <span className="eyebrow block mb-6">Which matters more?</span>
        <h2 className="section-heading section-heading-md max-w-xl mx-auto mb-4">
          {showResults ? "Your results" : "Pick the one you'd miss less"}
        </h2>
        <p className="text-[#9f9dab] max-w-lg mx-auto mb-16">
          {showResults
            ? "Thank you, your selection helps us prioritize development."
            : `Round ${pairIndex + 1} of ${pairs.length}`}
        </p>

        {!showResults && (
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            {current.map((feature) => (
              <button
                key={feature}
                onClick={() => selectFeature(feature)}
                className="feature-card py-8 px-6 text-center hover:border-[#c8ff2e]/40"
              >
                <span className="text-lg font-space font-semibold text-[#e8e7e9]">{feature}</span>
              </button>
            ))}
          </div>
        )}

        {showResults && (
          <div className="mt-12 py-6 px-8 border border-[rgba(255,255,255,0.04)] bg-[#111115]/50 max-w-xl mx-auto">
            <p className="text-sm text-[#9f9dab] mb-3">Thank you, your selection helps us prioritize development.</p>
            <button onClick={() => setPairIndex(0)} className="btn-ghost-arrow">
              Try again
              <span className="arrow">-&gt;</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="py-24 px-6 border-t border-[rgba(255,255,255,0.04)]">
      <div className="mx-auto max-w-xl text-center">
        <span className="eyebrow block mb-8">Ready for real?</span>
        <h2 className="section-heading section-heading-md max-w-md mx-auto mb-4">
          This was just a test. The product is coming.
        </h2>
        <p className="text-[#9f9dab] mb-8">
          Join the waitlist and be first when we launch. Your experiment data stays anonymous.
        </p>
        <a href="/waitlist" className="btn-primary">
          Join the waitlist
        </a>
      </div>
    </section>
  );
}

export default function Experiment() {
  return (
    <SharedLayout>
      <PricingSurvey />
      <HeadlineTest />
      <PricingMatrix />
      <FeaturePriorityTest />
      <FinalCTA />
      <ConsentBanner />
    </SharedLayout>
  );
}
