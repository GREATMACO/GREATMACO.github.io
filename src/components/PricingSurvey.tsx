"use client";

import { useState, useEffect, useRef } from "react";

/* ─── Configuration ─── */

const SURVEY_ENDPOINT = process.env.NEXT_PUBLIC_BUTTONDOWN_ENDPOINT || "";
const SURVEY_APIKEY = process.env.NEXT_PUBLIC_BUTTONDOWN_APIKEY || "";
const STORAGE_KEY = "404_experiment_pricing-survey-v3";
const CONSENT_KEY = "404_survey_consent";

interface SurveyResponse {
  screenerHours: string;
  vwTooExpensive: number;
  vwTooCheap: number;
  vwGettingExpensive: number;
  vwBargain: number;
  painWorth: string;
  priceOrder: string[];
  timestamp: number;
}

/* ─── Helpers ─── */

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function hasConsent(): boolean {
  return localStorage.getItem(CONSENT_KEY) === "true";
}

function saveResponse(data: SurveyResponse): void {
  if (!hasConsent()) return;
  const existing: SurveyResponse[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  existing.push(data);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
}

/* ─── Pricing heuristic ─── */

function calcOptimalPrice(
  tooExpensive: number,
  tooCheap: number,
  gettingExpensive: number,
  bargain: number,
): number {
  const core = Math.round((Math.max(tooCheap, bargain) + Math.min(tooExpensive, gettingExpensive)) / 2);
  return Math.max(bargain, Math.min(core, gettingExpensive));
}

/* ─── Components ─── */

function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = ((current) / total) * 100;
  return (
    <div className="w-full max-w-xs mx-auto mb-8">
      <div className="h-1 bg-[rgba(200,255,46,0.08)] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#c8ff2e] rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function QuestionCard({ children }: { children: React.ReactNode }) {
  return (
    <section className="py-24 px-6 border-t border-[rgba(255,255,255,0.04)]">
      <div className="mx-auto max-w-lg text-center">{children}</div>
    </section>
  );
}

/* ─── VW Question data ─── */

const VW_QUESTION_TEMPLATES = [
  { id: "tooExpensive", label: '"Too Expensive"', question: 'At what price would this app be so expensive that you would NEVER consider subscribing?', subtext: 'This is your number, not ours. We do not have a preference.', placeholder: "25" },
  { id: "tooCheap", label: '"Too Cheap"', question: 'At what price would this app be so cheap that you\'d question its quality?', subtext: 'There is a price where it feels too good to be true. Where is it for you?', placeholder: "3" },
  { id: "gettingExpensive", label: '"Getting Expensive"', question: 'At what price does this app start to get expensive, but you\'d still consider it?', subtext: 'Still worth it at this point. Something feels off. Where is that line?', placeholder: "12" },
  { id: "bargain", label: '"Bargain"', question: 'At what price would you consider this a fantastic deal and buy immediately?', subtext: 'You\'d pay this without thinking. What is that number for you?', placeholder: "5" },
];

const SCREENER_OPTIONS = [
  { label: "1–2h", value: "1-2 hours" },
  { label: "3–4h", value: "3-4 hours" },
  { label: "5–6h", value: "5-6 hours" },
  { label: "7h+", value: "7+ hours" },
];

const PAIN_OPTIONS = [
  { label: "Nothing, I would do it free", value: "free" },
  { label: "< €5/month", value: "<€5/mo" },
  { label: "€5 – €10/month", value: "€5-10/mo" },
  { label: "€10 – €20/month", value: "€10-20/mo" },
  { label: "€20+/month", value: "€20+/mo" },
  { label: "Price is not a factor, just solve the problem", value: "irrelevant" },
];

export default function PricingSurvey() {
  const [step, setStep] = useState<"landing" | "screener" | "vw1" | "vw2" | "vw3" | "vw4" | "pain" | "thankyou">("landing");
  const [vwOrder, setVwOrder] = useState<typeof VW_QUESTION_TEMPLATES>([]);
  const [result, setResult] = useState<SurveyResponse | null>(null);

  // Shuffle VW questions once on mount — stored only for display order & analysis metadata
  useEffect(() => { if (!vwOrder.length) setVwOrder(shuffleArray(VW_QUESTION_TEMPLATES)); }, []);

  /* ── Submit handler: reads native form element values directly ── */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);

    // Extract screener selection
    const screener = String(f.get("screener") || "");

    // Only validate on final page ("See results") — intermediate steps always move forward
    if (step === "pain") {
      if (!screener) { alert("Please select how much time you spend scrolling."); return; }
      if (!String(f.get("tooExpensive")).trim()) { alert("Please enter a price for 'Too Expensive'."); return; }
      if (!String(f.get("tooCheap")).trim()) { alert("Please enter a price for 'Too Cheap'."); return; }
      if (!String(f.get("gettingExpensive")).trim()) { alert("Please enter a price for 'Getting Expensive'."); return; }
      if (!String(f.get("bargain")).trim()) { alert("Please enter a price for 'Bargain'."); return; }
      if (!String(f.get("painWorth")).trim()) { alert("Please select your willingness to pay."); return; }
    } else {
      // Move to next question without validating other fields
      goToNext(step);
      return;
    }

    // Extract numeric VW inputs — always parse as Number (safe with text input)
    const vwFields: SurveyResponse = {
      screenerHours: screener,
      vwTooExpensive: parseInt(String(f.get("tooExpensive")), 10),
      vwTooCheap: parseInt(String(f.get("tooCheap")), 10),
      vwGettingExpensive: parseInt(String(f.get("gettingExpensive")), 10),
      vwBargain: parseInt(String(f.get("bargain")), 10),
      painWorth: String(f.get("painWorth") || ""),
      priceOrder: vwOrder.map((q) => q.id),
      timestamp: Date.now(),
    };

    // Save to localStorage (array-based for future bulk analysis)
    saveResponse(vwFields);

    // Post to Buttondown subscriber metadata (all data lands in one email entry)
    if (SURVEY_ENDPOINT && SURVEY_APIKEY) {
      const surveyEmail = `survey_404collective_${Date.now()}@temp.buttondown.email`;
      fetch(`${SURVEY_ENDPOINT}/subscribers`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Token ${SURVEY_APIKEY}` },
        body: JSON.stringify({
          email_address: surveyEmail,
          metadata: { ...vwFields, fairPrice: calcOptimalPrice(vwFields.vwTooExpensive, vwFields.vwTooCheap, vwFields.vwGettingExpensive, vwFields.vwBargain) },
        }),
      }).catch(() => {});
    }

    setResult(vwFields);
    setStep("thankyou");

    // Post collected survey data to webhook for admin review
    if (process.env.NEXT_PUBLIC_SURVEY_WEBHOOK_URL) {
      fetch(process.env.NEXT_PUBLIC_SURVEY_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(vwFields),
      }).catch(() => {});
    }
  };

  /* ── Navigation helpers (only control which page is visible, not data) ── */
  const goToNext = (from: string) => {
    switch (from) {
      case "screener": setStep("vw1"); break;
      case "vw1": setStep("vw2"); break;
      case "vw2": setStep("vw3"); break;
      case "vw3": setStep("vw4"); break;
      case "vw4": setStep("pain"); break;
      case "pain": break; // handled by form submit
    }
  };

  /* ═══════════ RENDER ═══════════ */

  if (step === "landing") {
    return (
      <section className="py-32 px-6 border-b border-[rgba(255,255,255,0.04)]">
        <div className="mx-auto max-w-xl text-center">
          <span className="eyebrow block mb-6">Pricing Research</span>
          <h2 className="section-heading section-heading-md max-w-lg mx-auto mb-6 leading-tight">Help us set fair pricing.</h2>
          <p className="text-[#9f9dab] text-lg leading-relaxed mb-10">
            We are testing real prices for 404 Collective. This takes about two minutes.<br />
            Your answers directly shape our launch pricing.
          </p>
          {/* Consent banner */}
          <div className="text-center">
            <p className="text-sm text-[#6b6980] max-w-md mx-auto mb-6 leading-relaxed">
              Your responses help us set fair pricing. By starting this survey you agree to our{" "}
              <a href="/privacy" className="text-[#c8ff2e] underline hover:text-[#d4ff4a] transition-colors">Privacy Policy</a>.
            </p>
            <button onClick={() => setStep("screener")} className="btn-primary text-base px-10 py-4">
              Start survey <span className="arrow ml-2">→</span>
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (step === "thankyou" && result) {
    return (
      <section className="py-32 px-6 border-t border-[rgba(255,255,255,0.04)]">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="section-heading section-heading-md max-w-lg mx-auto mb-6 leading-tight">Thank you. Your input matters.</h2>
          <p className="text-[#9f9dab] mb-10">Your response has been saved. We will use your answers to set fair pricing for the launch.</p>
          <a href="/waitlist" className="btn-primary text-base px-10 py-4 inline-block">Join the waitlist <span className="arrow ml-2">→</span></a>

          {/* Data summary — debug reference */}
          <details className="mt-16 max-w-md mx-auto text-left">
            <summary className="text-sm text-[#6b6980] cursor-pointer hover:text-[#9f9dab] transition-colors">View your data (for debugging)</summary>
            <pre className="mt-4 p-4 bg-[#111115]/80 rounded text-xs text-[#6b6980] overflow-x-auto whitespace-pre-wrap break-all">
              {JSON.stringify({ screener: result.screenerHours, tooExpensive: result.vwTooExpensive, tooCheap: result.vwTooCheap, gettingExpensive: result.vwGettingExpensive, bargain: result.vwBargain, painWorth: result.painWorth }, null, 2)}
            </pre>
          </details>
        </div>
      </section>
    );
  }

  /* ═══════════ SURVEY FORM (all pages live in one DOM) ═══════════ */

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-3xl">

      {/* ── Screener (Q1) ── */}
      <div id="page-screener" className={step !== "screener" ? "hidden" : ""}>
        <QuestionCard>
          <ProgressBar current={1} total={6} />
          <span className="eyebrow block mb-6">Frage 1 von 6</span>
          <h2 className="section-heading section-heading-md max-w-lg mx-auto mb-4 leading-tight">How many hours per day do you scroll mindlessly on your phone?</h2>
          <p className="text-[#9f9dab] mb-10 text-sm">Be honest. We will not judge.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {SCREENER_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => { const radio = document.querySelector<HTMLInputElement>(`input[name="screener"][value="${opt.value}"]`); if (radio) radio.click(); goToNext("screener"); }}
                data-screener-select={opt.value}
                className={`feature-card py-6 px-8 text-center hover:border-[#c8ff2e]/40 transition-colors duration-200`}
              >
                <input type="radio" name="screener" value={opt.value} className="hidden peer" />
                <span className="text-lg font-space font-semibold text-[#e8e7e9]">{opt.label}</span>
              </button>
            ))}
          </div>
          <div className="mt-12">
            <button type="submit" className="btn-primary text-base px-8 py-3">Next <span className="arrow ml-2">→</span></button>
          </div>
        </QuestionCard>
      </div>

      {/* ── VW Questions (Q2–Q5) — one per page ── */}
      {vwOrder.length > 0 && [
        { step: "vw1", idx: 0 }, { step: "vw2", idx: 1 }, { step: "vw3", idx: 2 }, { step: "vw4", idx: 3 }
      ].map(({ step: s, idx }) => (
        <div key={s} id={`page-${s}`} className={step !== s ? "hidden" : ""}>
          <QuestionCard>
            <ProgressBar current={idx + 2} total={6} />
            <span className="eyebrow block mb-6">Frage {idx + 2} von 6 — {vwOrder[idx]?.label}</span>
            <h2 className="section-heading section-heading-md max-w-lg mx-auto mb-4 leading-tight">{vwOrder[idx]?.question}</h2>
            <p className="text-[#9f9dab] text-sm mb-10">{vwOrder[idx]?.subtext}</p>
            {/* Numeric input — type="text" with inputMode="numeric" for universal browser support */}
            <div className="relative inline-block mb-2">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[#6b6980] font-space font-bold text-3xl pointer-events-none select-none">€</span>
              <input type="text" inputMode="numeric" name={vwOrder[idx]?.id} placeholder={vwOrder[idx]?.placeholder || ""} className="w-48 h-16 pl-12 pr-4 text-center text-3xl font-space font-bold text-[#e8e7e9] bg-transparent border-b-2 border-[rgba(200,255,46,0.3)] focus:border-[#c8ff2e] outline-none transition-colors duration-200 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
            </div>
            <div className="mt-12">
              <button type="submit" className="btn-primary text-base px-8 py-3">Next <span className="arrow ml-2">→</span></button>
            </div>
          </QuestionCard>
        </div>
      ))}

      {/* ── Pain-to-WTP (Q6) ── */}
      <div id="page-pain" className={step !== "pain" ? "hidden" : ""}>
        <section className="py-24 px-6 border-t border-[rgba(255,255,255,0.04)]">
          <ProgressBar current={6} total={6} />
          <span className="eyebrow block mb-6">Frage 6 von 6</span>
          <h2 className="section-heading section-heading-md max-w-lg mx-auto mb-4 leading-tight">If this app saved you 2 hours of scrolling per day and actually helped break the habit, what would that be worth to you?</h2>
          <p className="text-[#9f9dab] mb-2 text-sm">Pick the range that matches your willingness.</p>
          <p className="text-[#6b6980] mb-8 text-xs">— click one of the options below —</p>
          <div className="flex flex-col gap-3 justify-center max-w-sm mx-auto">
            {PAIN_OPTIONS.map((opt) => (
              <button key={opt.value} type="button" onClick={() => { const radio = document.querySelector<HTMLInputElement>(`input[name="painWorth"][value="${opt.value}"]`); if (radio) radio.click(); goToNext("pain"); }} data-pain-select={opt.value} className="feature-card py-5 px-6 text-center hover:border-[#c8ff2e]/40 transition-colors duration-200">
                <input type="radio" name="painWorth" value={opt.value} className="hidden peer" />
                <span className="text-base font-space font-semibold text-[#e8e7e9]">{opt.label}</span>
              </button>
            ))}
          </div>
          <div className="mt-12">
            <button type="submit" className="btn-primary text-base px-8 py-3">See results <span className="arrow ml-2">→</span></button>
          </div>
        </section>
      </div>

    </form>
  );
}
