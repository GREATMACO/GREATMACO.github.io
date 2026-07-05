"use client";

import SharedLayout from "@/components/SharedLayout";
import PricingSurvey from "@/components/PricingSurvey";

export default function Survey() {
  return (
    <SharedLayout>

      {/* ─── Hero / Intro ─── */}
      <section className="pt-40 pb-24 px-6 text-center">
        <div className="mx-auto max-w-3xl">
          <span className="eyebrow block mb-8">Pricing Research</span>
          <h1 className="section-heading section-heading-lg max-w-3xl mx-auto leading-tight">
            Help us set fair pricing.
            <br />
            <span className="text-[#c8ff2e]">we want the right number.</span>
          </h1>
          <p className="mt-8 mx-auto max-w-xl text-[#9f9dab] text-lg leading-relaxed">
            We built this app because we needed it ourselves. Now we need your help to price it right. Not through guesswork, through a real survey. Takes about two minutes, and the results directly shape our launch pricing.
          </p>
        </div>
      </section>

      {/* ─── Survey Form ─── */}
      <PricingSurvey />

    </SharedLayout>
  );
}
