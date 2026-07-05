"use client";

import SharedLayout from "@/components/SharedLayout";
import { getFeatures } from "@/lib/content";
import { IconFocus, IconCoach, IconQuest, IconCollective, IconMetrics, IconTherapist } from "@/components/Icons";

const iconMap: Record<string, (props: { className?: string; color?: string }) => React.ReactElement> = {
  IconFocus,
  IconCoach,
  IconQuest,
  IconCollective,
  IconMetrics,
  IconTherapist,
};

function FeatureCard({ feature }: { feature: { id: string; icon: string; title: string; subtitle?: string; description: string; details?: string[] } }) {
  const IconComponent = iconMap[feature.icon];

  return (
    <div id={feature.id} className="feature-card">
      <div className="flex items-center gap-4">
        <div className="text-[#c8ff2e] opacity-80"><IconComponent className="w-8 h-8" /></div>
        <div>
          <h3 className="text-lg font-space font-bold text-[#e8e7e9]">{feature.title}</h3>
          {feature.subtitle && <span className="text-sm text-[#6b6980]">{feature.subtitle}</span>}
        </div>
      </div>
      <p className="text-sm leading-relaxed text-[#9f9dab]">{feature.description}</p>
      {feature.details && (
        <div className="space-y-2 pt-2">
          {feature.details.map((detail) => (
            <div key={detail} className="flex items-start gap-2 text-sm text-[#9f9dab]">
              <span className="text-[#c8ff2e] opacity-60 mt-0.5">›</span>
              <span>{detail}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Features() {
  const features = getFeatures();

  return (
    <SharedLayout>

      {/* ─── Page header ─── */}
      <section className="pt-40 pb-20 px-6">
        <div className="mx-auto max-w-4xl">
          <span className="eyebrow block mb-8">What it does</span>
          <h1 className="section-heading section-heading-lg max-w-2xl">
            Six tools,<br />
            <span className="text-[#c8ff2e]">one job each.</span>
          </h1>
          <p className="mt-6 text-[#9f9dab] text-lg max-w-xl leading-relaxed">
            We didn't add features for the sake of it. Each one solves a specific problem with staying focused.
          </p>
        </div>
      </section>

      {/* ─── Feature cards ─── */}
      <section className="py-12 px-6">
        <div className="mx-auto max-w-5xl grid gap-6 sm:grid-cols-2">
          {features.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </section>

      {/* ─── Philosophy divider ─── */}
      <section className="section-dark">
        <div className="section section-wider">
          <div className="max-w-3xl mx-auto text-center">
            <span className="eyebrow block mb-8">Design philosophy</span>
            <h2 className="section-heading section-heading-md max-w-xl mx-auto mb-8 leading-tight">
              We don't add features to capture attention.<br />Every feature exists to help you live offline.
            </h2>
            <p className="text-[#9f9dab] leading-relaxed">
              We don't add features for show. Each one closes a loophole in how apps try to keep you scrolling.
            </p>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-24 px-6 border-t border-[rgba(255,255,255,0.04)]">
        <div className="mx-auto max-w-xl text-center">
          <span className="eyebrow block mb-8">Stop negotiating</span>
          <h2 className="section-heading section-heading-md max-w-md mx-auto mb-4">
            Stop negotiating with yourself.
          </h2>
          <p className="text-[#9f9dab] mb-8">
            Join the waitlist and get access before launch.
          </p>
          <a href="/waitlist" className="btn-primary">
            Join the waitlist
          </a>
        </div>
      </section>

    </SharedLayout>
  );
}
