"use client";

import SharedLayout from "@/components/SharedLayout";
import { useState } from "react";

/* ─── Configuration — set in Cloudflare Pages Settings (or .env.local) ─── */

// Public embed endpoint: a plain HTML form POST, no API key in the browser.
const BUTTONDOWN_USERNAME = process.env.NEXT_PUBLIC_BUTTONDOWN_USERNAME || "";
const EMBED_ACTION = BUTTONDOWN_USERNAME
  ? `https://buttondown.com/api/emails/embed-subscribe/${encodeURIComponent(BUTTONDOWN_USERNAME)}`
  : "";

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [loading] = useState(false);
  const [resetCount, setResetCount] = useState(0);
  const [consentGiven, setConsentGiven] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!email || !consentGiven || !EMBED_ACTION) {
      e.preventDefault();
      if (!EMBED_ACTION) setStatus("error");
      return;
    }
    // Let the native submit open Buttondown's confirmation tab, then swap the UI.
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 0);
  };

  const handleReset = () => {
    setResetCount((c) => c + 1);
    setStatus("idle");
    setEmail("");
  };

  return (
    <SharedLayout>
      <section className="pt-40 pb-32 px-6 flex min-h-screen flex-col items-center justify-center">
        <div className="mx-auto max-w-lg text-center" key={resetCount}>
          <span className="eyebrow block mb-8">Join the Collective</span>

          <h1 className="section-heading section-heading-lg max-w-xl mx-auto">
            Get lost to find
            <span className="text-[#c8ff2e]">yourself.</span>
          </h1>

          <p className="mt-8 mx-auto max-w-md text-[#9f9dab] text-lg leading-relaxed">
            The scroll loop ends when you decide to break it. Be first when we launch.
          </p>

          {status === "success" ? (
            <div className="mt-12 py-10 px-8 border border-[#c8ff2e]/20 bg-[#c8ff2e]/5">
              <p className="text-lg font-space font-semibold text-[#c8ff2e]">Almost in the Collective.</p>
              <p className="mt-2 text-sm text-[#9f9dab]">
                Confirm your signup in the tab that just opened, then check your inbox.
              </p>
              <button onClick={handleReset} className="mt-6 text-xs text-[#9f9dab] underline hover:text-[#c8ff2e] transition-colors">
                Back to form
              </button>
            </div>
          ) : status === "error" ? (
            <div className="mt-12 py-6 px-6 border border-red-500/30 bg-red-950/10">
              <p className="text-sm text-red-400">Signups are paused right now. Please try again later.</p>
              <button onClick={handleReset} className="mt-4 text-xs text-[#9f9dab] underline hover:text-[#c8ff2e] transition-colors">
                Try again
              </button>
            </div>
          ) : (
            <form
              action={EMBED_ACTION || undefined}
              method="post"
              target="_blank"
              onSubmit={handleSubmit}
              className="mt-12 flex flex-col gap-3 sm:flex-row"
            >
              <input type="hidden" name="embed" value="1" />
              {!consentGiven ? (
                <div className="text-center mx-auto w-full">
                  <p className="text-sm text-[#6b6980] mb-4">
                    We collect your email to notify you about launch. No tracking, no sharing.{" "}
                    <a href="/privacy" className="text-[#c8ff2e] underline hover:text-[#d4ff4a] transition-colors">
                      Privacy Policy
                    </a>
                  </p>
                  <button
                    type="button"
                    onClick={() => setConsentGiven(true)}
                    className="bg-[#c8ff2e] px-10 py-4 font-space font-semibold text-[#000] hover:bg-[#d4ff4a] transition-colors shrink-0"
                  >
                    I agree, let me in
                  </button>
                </div>
              ) : (
                <>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    disabled={loading}
                    className="flex-1 px-6 py-4 bg-transparent border border-[rgba(255,255,255,0.06)] text-[#e8e7e9] placeholder-[#6b6980] outline-none transition-colors focus:border-[#c8ff2e] disabled:opacity-50"
                  />
                  <button type="submit" disabled={loading || !email} className="bg-[#c8ff2e] px-8 py-4 font-space font-semibold text-[#000] hover:bg-[#d4ff4a] transition-colors disabled:opacity-50 shrink-0">
                    {loading ? "Joining..." : "Join"}
                  </button>
                </>
              )}
            </form>
          )}

          <div className="mt-10 flex items-center justify-center gap-6 text-xs text-[#6b6980]">
            <span>No ads</span>
            <span className="text-[rgba(255,255,255,0.06)]">·</span>
            <span>No tracking</span>
            <span className="text-[rgba(255,255,255,0.06)]">·</span>
            <span>Offline-first</span>
          </div>
        </div>
      </section>
    </SharedLayout>
  );
}
