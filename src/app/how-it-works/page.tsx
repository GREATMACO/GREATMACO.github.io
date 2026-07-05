"use client";

import SharedLayout from "@/components/SharedLayout";
import { getSteps } from "@/lib/content";

function StepCard({ step, index }: { step: { number: string; title: string; description: string; details: string[]; subSteps?: { label: string; desc: string }[] }; index: number }) {
  return (
    <div className={`flex gap-6 lg:gap-8 ${index > 0 ? "border-t border-[rgba(255,255,255,0.04)] pt-10" : ""}`}>
      <span className="font-mono text-sm text-[#c8ff2e] shrink-0 opacity-60">{step.number}</span>
      <div className="pb-12">
        <h3 className="text-lg font-space font-semibold text-[#e8e7e9]">{step.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-[#9f9dab] max-w-xl">{step.description}</p>
        {step.subSteps && (
          <div className="mt-5 space-y-2">
            {step.subSteps.map((sub) => (
              <div key={sub.label} className="flex items-start gap-2 text-sm text-[#9f9dab]">
                <span className="text-[#c8ff2e] opacity-60 mt-0.5">›</span>
                <span className="text-[#e8e7e9]/80 font-medium">{sub.label}</span>
                <span className="text-[#6b6980]">- {sub.desc}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function HowItWorks() {
  const steps = getSteps();

  return (
    <SharedLayout>

      {/* ─── Page header ─── */}
      <section className="pt-40 pb-16 px-6">
        <div className="mx-auto max-w-4xl">
          <span className="eyebrow block mb-8">How it works</span>
          <h1 className="section-heading section-heading-lg max-w-2xl">
            Three steps to getting
            <br />
            <span className="text-[#c8ff2e]">your attention back</span>
          </h1>
        </div>
      </section>

      {/* ─── Steps ─── */}
      <section className="py-12 px-6">
        <div className="mx-auto max-w-4xl">
          {steps.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </div>
      </section>

      {/* ─── Before / After ─── */}
      <section className="section-dark">
        <div className="section section-wider">
          <div className="mx-auto max-w-3xl">
            <span className="eyebrow block mb-8">The shift</span>
            <h2 className="section-heading section-heading-md max-w-xl mb-12">
              Before 404 and after
            </h2>

            <div className="grid grid-cols-[1fr,1fr] gap-x-8 gap-y-0">
              <div className="pb-3 border-b border-[rgba(255,255,255,0.06)] text-sm font-space font-semibold text-[#6b6980]">Before</div>
              <div className="pb-3 border-b border-[rgba(255,255,255,0.06)] text-sm font-space font-semibold text-[#c8ff2e]">After</div>

              {[
                "7+ hours screen time daily",
                "Doomscrolling before bed",
                "FOMO keeping you up",
                "Anxious and disconnected",
                "Lost in infinite feeds",
              ].map((before) => (
                <div key={before} className="py-4 border-b border-[rgba(255,255,255,0.04)] text-sm text-[#6b6980]">
                  {before}
                </div>
              ))}

              {[
                "3 hours or less",
                "Reading a physical book",
                "Deep, restful sleep",
                "Present and at peace",
                "Building real relationships",
              ].map((after) => (
                <div key={after} className="py-4 border-b border-[rgba(255,255,255,0.04)] text-sm text-[#e8e7e9]/80">
                  {after}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-24 px-6 border-t border-[rgba(255,255,255,0.04)]">
        <div className="mx-auto max-w-xl text-center">
          <span className="eyebrow block mb-8">Your move</span>
          <h2 className="section-heading section-heading-md max-w-md mx-auto mb-4">
            Join the waitlist if you want early access.
          </h2>
          <p className="text-[#9f9dab] mb-8">
            We're launching soon. First to get in are the ones who signed up first.
          </p>
          <a href="/waitlist" className="btn-primary">
            Join the waitlist
          </a>
        </div>
      </section>

    </SharedLayout>
  );
}
