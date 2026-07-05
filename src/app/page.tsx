"use client";

import SharedLayout from "@/components/SharedLayout";
import { getHeroContent, getStats, getFeatures, getSteps } from "@/lib/content";
import { IconFocus, IconCoach, IconQuest, IconCollective, IconMetrics, IconTherapist } from "@/components/Icons";

const iconMap: Record<string, (props: { className?: string; color?: string }) => React.ReactElement> = {
  IconFocus,
  IconCoach,
  IconQuest,
  IconCollective,
  IconMetrics,
  IconTherapist,
};

function StatBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-b border-[rgba(255,255,255,0.04)] pb-8 sm:pb-10">
      <div className="font-space font-bold tracking-tight text-[#e8e7e9] sm:text-5xl lg:text-6xl" style={{ fontSize: "clamp(3rem, 5vw, 4.5rem)", letterSpacing: "-0.04em", lineHeight: 1 }}>{value}</div>
      <div className="mt-2 text-sm text-[#6b6980] tracking-wider">{label}</div>
    </div>
  );
}

function FeatureListItem({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="group flex gap-6 lg:gap-8 py-8 border-b border-[rgba(255,255,255,0.04)] last:border-b-0">
      <div className="shrink-0 text-[#c8ff2e] opacity-70">{icon}</div>
      <div>
        <h3 className="text-lg font-space font-semibold text-[#e8e7e9]">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-[#9f9dab]">{description}</p>
      </div>
    </div>
  );
}

function StepItem({ step, index }: { step: { number: string; title: string; description: string }; index: number }) {
  return (
    <div className={`flex gap-6 ${index > 0 ? "border-t border-[rgba(255,255,255,0.04)] pt-10" : ""}`}>
      <span className="font-mono text-sm text-[#c8ff2e] shrink-0 opacity-60">{step.number}</span>
      <div>
        <h3 className="text-lg font-space font-semibold text-[#e8e7e9]">{step.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-[#9f9dab] max-w-lg">{step.description}</p>
      </div>
    </div>
  );
}

export default function Home() {
  const hero = getHeroContent();
  const stats = getStats();
  const features = getFeatures();
  const steps = getSteps();

  return (
    <SharedLayout>

      {/* ─── Hero ─── */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
        <div className="absolute inset-0 hero-grid pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0c]/0 via-[#0a0a0c]/50 to-[#0a0a0c]" />

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Eyebrow */}
          <span className="eyebrow block mb-10">A tool that actually works.</span>

          {/* Headline */}
          <h1 className="max-w-3xl mx-auto font-space font-bold leading-[0.95] tracking-tight text-[#e8e7e9]" style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)" }}>
            Log off.
            <br />
            <span className="text-[#c8ff2e]">Live on.</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-8 mx-auto max-w-md text-[#9f9dab] text-lg leading-relaxed">
            A simple tool to break the scroll loop.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <a href={hero.ctaHref} className="btn-primary">
              {hero.ctaText}
            </a>
            <a href="/survey" className="btn-secondary">
              Take our pricing survey →
            </a>
          </div>

          {/* Trust line */}
          <p className="mt-8 text-xs text-[#6b6980] tracking-wider uppercase">
            {hero.trustLine}
          </p>
        </div>
      </section>

      {/* ─── Stats — removed: fake pre-launch numbers would be misleading ─── */}
      {/* <section className="py-20 px-6 border-t border-[rgba(255,255,255,0.04)]">
        <div className="mx-auto max-w-4xl">
          <span className="eyebrow block mb-8">By the numbers</span>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
            {stats.map((stat) => (
              <StatBlock key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </div>
        </div>
      </section> */}

      {/* ─── Features ─── */}
      <section className="py-24 px-6 border-t border-[rgba(255,255,255,0.04)]">
        <div className="mx-auto max-w-5xl">
          <div className="grid lg:grid-cols-2 lg:gap-16">
            {/* Left: sticky heading */}
            <div className="lg:sticky lg:top-32">
              <span className="eyebrow block mb-6">What it does</span>
              <h2 className="section-heading section-heading-md max-w-md">
                What we built,<br className="hidden lg:block" /> so you don't have to
              </h2>
              <p className="mt-6 text-[#9f9dab] max-w-sm leading-relaxed">
                Six tools, each solving one specific problem with focus. Nothing more, nothing less.
              </p>
            </div>

            {/* Right: feature list */}
            <div className="mt-12 lg:mt-0">
              {features.map((f) => {
                const IconComponent = iconMap[f.icon];
                return (
                  <FeatureListItem
                    key={f.id}
                    icon={<IconComponent className="w-10 h-10" />}
                    title={f.title}
                    description={f.description}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── How it works ─── */}
      <section className="py-24 px-6 border-t border-[rgba(255,255,255,0.04)]">
        <div className="mx-auto max-w-4xl">
          <span className="eyebrow block mb-8">How it works</span>
          <h2 className="section-heading section-heading-md max-w-2xl mb-12">
            Three steps to getting your attention back
          </h2>

          <div className="space-y-0">
            {steps.map((item, i) => (
              <StepItem key={item.number} step={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Pull quote ─── */}
      <section className="section-dark">
        <div className="section section-wider">
          <div className="grid lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <span className="eyebrow block mb-6">How it works</span>
              <h2 className="section-heading section-heading-md max-w-md">
                Willpower doesn't work. Good defaults do.
              </h2>
            </div>
            <div className="lg:text-right lg:pl-12">
              <p className="pull-quote lg:text-right lg:border-l-0" style={{ paddingLeft: 0 }}>
                Every app competing for your attention has a team of engineers. You just have you. That is not fair, so we built tools that level the playing field.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Survey CTA ─── */}
      <section className="py-24 px-6 border-t border-[rgba(255,255,255,0.04)]">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow block mb-8">Pricing research</span>
          <h2 className="section-heading section-heading-md max-w-xl mx-auto mb-4" style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }}>
            Help us pick a fair price
          </h2>
          <p className="text-[#9f9dab] max-w-md mx-auto leading-relaxed">
            We haven't launched yet, so there is no price set. Two minutes to tell us what you would pay, and why.
          </p>
          <a href="/survey" className="btn-secondary mt-8 inline-block">
            Take the survey →
          </a>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-32 px-6 border-t border-[rgba(255,255,255,0.04)]">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow block mb-8">Be first</span>
          <h2 className="section-heading section-heading-lg max-w-xl mx-auto mb-6" style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
            Don't wait for permission<br className="sm:hidden" /> to focus.
          </h2>
          <p className="text-[#9f9dab] max-w-md mx-auto leading-relaxed">
            We're launching soon and there's no tracking or ads. Just a tool that works from day one.
          </p>
          <a href="/waitlist" className="btn-primary mt-10">
            Join the waitlist
          </a>
        </div>
      </section>

    </SharedLayout>
  );
}
