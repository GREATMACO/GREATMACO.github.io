"use client";

import SharedLayout from "@/components/SharedLayout";
import { getAboutPillars, getAboutPrinciples, getTeam } from "@/lib/content";

function PillarItem({ title, subtitle, description, citation }: {
  title: string;
  subtitle: string;
  description: string;
  citation?: string;
}) {
  return (
    <div className="py-8 border-b border-[rgba(255,255,255,0.04)] last:border-b-0">
      <span className="block font-mono text-xs text-[#c8ff2e] opacity-60">{title}</span>
      <h3 className="mt-3 text-lg font-space font-semibold text-[#e8e7e9]">{subtitle}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[#9f9dab] max-w-xl">{description}</p>
      {citation && (
        <p className="mt-3 text-xs text-[#6b6980] italic">{citation}</p>
      )}
    </div>
  );
}

export default function About() {
  const pillars = getAboutPillars();
  const principles = getAboutPrinciples();
  const team = getTeam();

  return (
    <SharedLayout>

      {/* ─── Page header ─── */}
      <section className="pt-40 pb-24 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <span className="eyebrow block mb-8">Manifesto</span>
          <h1 className="section-heading section-heading-lg max-w-3xl mx-auto">
            Your attention was never
            <br />
            <span className="text-[#c8ff2e]">yours to lose.</span>
          </h1>
          <p className="mt-8 mx-auto max-w-xl text-[#9f9dab] text-lg leading-relaxed">
            404 Collective started from a single realization: the people who designed your phone knew exactly how to keep you scrolling. It's not your fault. But it is your responsibility.
          </p>
        </div>
      </section>

      {/* ─── The 404 signal ─── */}
      <section className="section-dark">
        <div className="section section-wider">
          <div className="grid lg:grid-cols-2 lg:gap-16 items-center">
            <div className="text-center lg:text-right lg:pl-12">
              <p className="pull-quote lg:text-right lg:border-r-2 lg:border-r-[#c8ff2e] lg:border-l-0" style={{ paddingLeft: 0, paddingRight: 24 }}>
                Every swipe and scroll is a decision made by someone who profits when you don't put it down. That is not a conspiracy, it is just business.
              </p>
            </div>
            <div className="space-y-6">
              <span className="eyebrow block">The architecture of the trap</span>
              <p className="text-[#9f9dab] leading-relaxed">
                You did not lose your attention. It was harvested. Every infinite scroll was engineered by teams whose only goal was to keep you staring.
              </p>
              <p className="text-[#9f9dab] leading-relaxed">
                <strong className="text-[#e8e7e9]">The 404 Collective</strong> is different. We don't track you, don't show ads, and optimize for your <em className="text-[#c8ff2e]">freedom</em>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Architecture pillars ─── */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-4xl">
          <span className="eyebrow block mb-8">Architecture</span>
          <h2 className="section-heading section-heading-md max-w-xl mb-4">
            Five pillars of recovery
          </h2>
          <p className="text-[#6b6980] max-w-md mb-12">
            Every layer of 404 is built on evidence, not intuition.
          </p>

          <div className="divide-y divide-[rgba(255,255,255,0.04)]">
            {pillars.map((pillar) => (
              <PillarItem
                key={pillar.title}
                title={pillar.title}
                subtitle={pillar.subtitle}
                description={pillar.description}
                citation={pillar.citation}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Principles ─── */}
      <section className="section-dark">
        <div className="section">
          <div className="grid lg:grid-cols-2 lg:gap-16 lg:items-center">
            <div>
              <span className="eyebrow block mb-6">What we stand on</span>
              <h2 className="section-heading section-heading-md max-w-md mb-8">
                Principles, not promises
              </h2>
            </div>
            <div className="space-y-8">
              {principles.map((p) => (
                <div key={p.title}>
                  <h3 className="text-base font-space font-semibold text-[#e8e7e9]">{p.subtitle}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#9f9dab]">{p.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Team ─── */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-4xl">
          <span className="eyebrow block mb-8">The team</span>
          <h2 className="section-heading section-heading-md max-w-xl mb-12">
            Five people who stared at the screen time report
          </h2>

          <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((person) => (
              <div
                key={person.name}
                className="py-8 border-b border-[rgba(255,255,255,0.04)] last:border-b-0"
              >
                <div className="w-10 h-10 rounded-full bg-[#111115] border border-[rgba(255,255,255,0.06)] mb-4" />
                <h3 className="text-base font-space font-semibold text-[#e8e7e9]">{person.name}</h3>
                <p className="text-xs text-[#c8ff2e] opacity-80 mt-1">{person.role}</p>
                <p className="mt-2 text-sm leading-relaxed text-[#6b6980]">{person.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-24 px-6 border-t border-[rgba(255,255,255,0.04)]">
        <div className="mx-auto max-w-xl text-center">
          <span className="eyebrow block mb-8">Take it back</span>
          <h2 className="section-heading section-heading-md max-w-md mx-auto mb-4 leading-tight">
            You didn't choose this,<br />but you can change it.
          </h2>
          <p className="text-[#9f9dab] mb-8">
            Be among the first to try it. No tracking, no ads, just a tool that works.
          </p>
          <a href="/waitlist" className="btn-primary">
            Join the waitlist
          </a>
        </div>
      </section>

    </SharedLayout>
  );
}
