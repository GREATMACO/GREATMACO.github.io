"use client";

import { useState, useEffect } from "react";

/* ─── Configuration ─── */

/* Share one Buttondown newsletter for waitlist + survey */
const SURVEY_ENDPOINT = process.env.NEXT_PUBLIC_BUTTONDOWN_ENDPOINT || "";
const SURVEY_APIKEY = process.env.NEXT_PUBLIC_BUTTONDOWN_APIKEY || "";
/* Fallback: local storage only if no endpoint configured */
const LOCAL_SURVEY_KEY = "404_survey_responses_local";
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

function NumberInput({
  value,
  onChange,
  placeholder,
  min = 0,
  max = 99,
}: {
  value: number;
  onChange: (v: number) => void;
  placeholder: string;
  min?: number;
  max?: number;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    if (raw === "") return; // keep current value when cleared
    const num = Math.max(min, Math.min(max, parseInt(raw, 10) || 0));
    onChange(num);
  };

  return (
    <div className="relative inline-block">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6b6980] font-space font-semibold pointer-events-none">
        €
      </span>
      <input
        type="text"
        inputMode="numeric"
        value={String(value)}
        onChange={handleChange}
        placeholder={placeholder}
        data-price-input="true"
        className="w-40 h-16 pl-8 pr-4 text-center text-3xl font-space font-bold text-[#e8e7e9] bg-transparent border-b-2 border-[rgba(200,255,46,0.2)] focus:border-[#c8ff2e] outline-none transition-colors duration-200 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
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

/* ─── Main Survey ─── */

const VW_QUESTION_TEMPLATES = [
  {
    id: "tooExpensive",
    label: '"Too Expensive"',
    question: 'At what price would this app be so expensive that you would NEVER consider subscribing?',
    subtext: 'This is your number, not ours. We do not have a preference.',
    displayPlaceholder: "25",
  },
  {
    id: "tooCheap",
    label: '"Too Cheap"',
    question: 'At what price would this app be so cheap that you\'d question its quality?',
    subtext: 'There is a price where it feels too good to be true. Where is it for you?',
    displayPlaceholder: "3",
  },
  {
    id: "gettingExpensive",
    label: '"Getting Expensive"',
    question: 'At what price does this app start to get expensive, but you\'d still consider it?',
    subtext: 'Still worth it at this point. Something feels off. Where is that line?',
    displayPlaceholder: "12",
  },
  {
    id: "bargain",
    label: '"Bargain"',
    question: 'At what price would you consider this a fantastic deal and buy immediately?',
    subtext: 'You\'d pay this without thinking. What is that number for you?',
    displayPlaceholder: "5",
  },
];

export default function PricingSurvey() {
  const [step, setStep] = useState<"landing" | "screener" | "vw1" | "vw2" | "vw3" | "vw4" | "pain" | "thankyou">("landing");
  const [answers, setAnswers] = useState<SurveyResponse>({
    screenerHours: "",
    vwTooExpensive: 25,
    vwTooCheap: 3,
    vwGettingExpensive: 12,
    vwBargain: 5,
    painWorth: "",
    priceOrder: [],
    timestamp: 0,
  });
  const [vwOrder, setVwOrder] = useState<typeof VW_QUESTION_TEMPLATES>([]);
  const [vwDone, setVwDone] = useState(false);

  // Shuffle VW questions once on mount
  useEffect(() => {
    if (!vwOrder.length) setVwOrder(shuffleArray(VW_QUESTION_TEMPLATES));
  }, []);

  const startSurvey = () => {
    setAnswers({
      screenerHours: "", vwTooExpensive: 25, vwTooCheap: 3,
      vwGettingExpensive: 12, vwBargain: 5, painWorth: "", priceOrder: [], timestamp: Date.now(),
    });
    setVwDone(false);
    setVwOrder(shuffleArray(VW_QUESTION_TEMPLATES));
    setStep("screener");
  };

  const goToNextQuestion = (currentStep: string) => {
    switch (currentStep) {
      case "screener":
        if (!answers.screenerHours) return;
        setAnswers(prev => ({ ...prev, screenerHours: prev.screenerHours })); // force state update
        setStep("vw1"); break;
      case "vw1": setStep("vw2"); break;
      case "vw2": setStep("vw3"); break;
      case "vw3": setStep("vw4"); break;
      case "vw4":
        setVwDone(true);
        setStep("pain");
        break;
      case "pain":
        if (!answers.painWorth) return;
        finishSurvey();
        break;
    }
  };

  const finishSurvey = () => {
    setStep("thankyou");

    // Read DOM values directly — React state may be stale from async batching
    const domInputs = document.querySelectorAll<HTMLInputElement>('[data-price-input="true"]');
    let finalAnswers: SurveyResponse = { ...answers, priceOrder: vwOrder.map((q) => q.id), timestamp: Date.now() };
    if (domInputs.length >= 4) {
      // Overwrite with what the user actually typed
      const keys = ["vwTooExpensive", "vwTooCheap", "vwGettingExpensive", "vwBargain"];
      for (let i = 0; i < 4 && domInputs[i]; i++) {
        const val = parseInt(domInputs[i].value, 10);
        if (!isNaN(val)) {
          (finalAnswers as any)[keys[i]] = val;
        }
      }
    }
    saveResponse(finalAnswers);

    if (SURVEY_ENDPOINT && SURVEY_APIKEY) {
      const surveyEmail = `survey_404collective_${Date.now()}@temp.buttondown.email`;
      fetch(`${SURVEY_ENDPOINT}/subscribers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${SURVEY_APIKEY}`
        },
        body: JSON.stringify({
          email_address: surveyEmail,
          metadata: { ...finalAnswers, fairPrice: calcOptimalPrice(finalAnswers.vwTooExpensive, finalAnswers.vwTooCheap, finalAnswers.vwGettingExpensive, finalAnswers.vwBargain) }
        }),
      }).catch(() => {});
    }
  };

  /* ─── Consent Banner Component ─── */
  const ConsentBanner = () => (
    <div className="text-center">
      <p className="text-sm text-[#6b6980] max-w-md mx-auto mb-6 leading-relaxed">
        Your responses help us set fair pricing. By starting this survey you agree to our{" "}
        <a href="/privacy" className="text-[#c8ff2e] underline hover:text-[#d4ff4a] transition-colors">
          Privacy Policy
        </a>.
      </p>
      <button onClick={startSurvey} className="btn-primary text-base px-10 py-4">
        Start survey <span className="arrow ml-2">→</span>
      </button>
    </div>
  );

  /* ─── Landing ─── */
  if (step === "landing") {
    return (
      <section className="py-32 px-6 border-b border-[rgba(255,255,255,0.04)]">
        <div className="mx-auto max-w-xl text-center">
          <span className="eyebrow block mb-6">Pricing Research</span>
          <h2 className="section-heading section-heading-md max-w-lg mx-auto mb-6 leading-tight">
            Help us set fair pricing.
          </h2>
          <p className="text-[#9f9dab] text-lg leading-relaxed mb-10">
            We are testing real prices for 404 Collective. This takes about two minutes.
            <br />
            Your answers directly shape our launch pricing.
          </p>
          {ConsentBanner()}
        </div>
      </section>
    );
  }

  /* ─── Thank You ─── */
  if (step === "thankyou") {
    const optimal = calcOptimalPrice(
      answers.vwTooExpensive, answers.vwTooCheap,
      answers.vwGettingExpensive, answers.vwBargain,
    );

    return (
      <section className="py-32 px-6 border-t border-[rgba(255,255,255,0.04)]">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="section-heading section-heading-md max-w-lg mx-auto mb-6 leading-tight">
            Thank you. Your input matters.
          </h2>
          <p className="text-[#9f9dab] mb-10">Based on your answers, a fair price would be around:</p>
          <div className="inline-block py-8 px-12 border border-[#c8ff2e]/30 bg-[#c8ff2e]/5 mb-10">
            <span className="text-6xl font-space font-bold text-[#c8ff2e]">€{optimal}</span>
            <span className="text-lg text-[#6b6980] ml-2">/month</span>
          </div>
          <p className="text-[#9f9dab] mb-10 max-w-md mx-auto leading-relaxed">
            This estimate comes from your price thresholds. Real pricing may differ based on features and development costs, but your range matters a lot.
          </p>
          <a href="/waitlist" className="btn-primary text-base px-10 py-4 inline-block">
            Join the waitlist <span className="arrow ml-2">→</span>
          </a>
          {/* Data summary — debug reference */}
          <details className="mt-16 max-w-md mx-auto text-left">
            <summary className="text-sm text-[#6b6980] cursor-pointer hover:text-[#9f9dab] transition-colors">
              View your data (for debugging)
            </summary>
            <pre className="mt-4 p-4 bg-[#111115]/80 rounded text-xs text-[#6b6980] overflow-x-auto whitespace-pre-wrap break-all">
              {JSON.stringify({
                screener: answers.screenerHours,
                tooExpensive: answers.vwTooExpensive,
                tooCheap: answers.vwTooCheap,
                gettingExpensive: answers.vwGettingExpensive,
                bargain: answers.vwBargain,
                painWorth: answers.painWorth,
                fairPrice: optimal,
              }, null, 2)}
            </pre>
          </details>
        </div>
      </section>
    );
  }

  /* ─── Screener (Q1) ─── */
  if (step === "screener") {
    return (
      <QuestionCard>
        <ProgressBar current={1} total={6} />
        <span className="eyebrow block mb-6">Frage 1 von 6</span>
        <h2 className="section-heading section-heading-md max-w-lg mx-auto mb-4 leading-tight">
          How many hours per day do you scroll mindlessly on your phone?
        </h2>
        <p className="text-[#9f9dab] mb-10 text-sm">Be honest. We will not judge.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {[
            { label: "1–2h", value: "1-2 hours" },
            { label: "3–4h", value: "3-4 hours" },
            { label: "5–6h", value: "5-6 hours" },
            { label: "7h+", value: "7+ hours" },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => setAnswers((prev) => ({ ...prev, screenerHours: opt.value }))}
              className={`feature-card py-6 px-8 text-center hover:border-[#c8ff2e]/40 transition-colors duration-200 ${
                answers.screenerHours === opt.value ? "border-[#c8ff2e]/30 bg-[#c8ff2e]/5" : ""
              }`}
            >
              <span className="text-lg font-space font-semibold text-[#e8e7e9]">{opt.label}</span>
            </button>
          ))}
        </div>
        <div className="mt-12">
          <button onClick={() => goToNextQuestion("screener")} disabled={!answers.screenerHours} className="btn-primary text-base px-8 py-3 disabled:opacity-50">
            Next <span className="arrow ml-2">→</span>
          </button>
        </div>
      </QuestionCard>
    );
  }

  /* ─── VW Questions (Q2–Q5) ─── */
  const vwIndex = step === "vw1" ? 0 : step === "vw2" ? 1 : step === "vw3" ? 2 : 3;
  if (!vwOrder.length) return null;
  if (!vwDone) {
    const currentVwQuestion = vwOrder[vwIndex];
    if (currentVwQuestion) {
      const vwAnswerKey = currentVwQuestion.id as keyof SurveyResponse;
      return (
        <QuestionCard>
          <ProgressBar current={vwIndex + 2} total={6} />
          <span className="eyebrow block mb-6">
            Frage {vwIndex + 2} von 6 — {currentVwQuestion.label}
          </span>
          <h2 className="section-heading section-heading-md max-w-lg mx-auto mb-4 leading-tight">
            {currentVwQuestion.question}
          </h2>
          <p className="text-[#9f9dab] text-sm mb-10">{currentVwQuestion.subtext}</p>
          <NumberInput
            value={answers[vwAnswerKey] as number}
            onChange={(v) => setAnswers((prev) => ({ ...prev, [vwAnswerKey]: v }))}
            placeholder={currentVwQuestion.displayPlaceholder}
          />
          <div className="mt-12">
            <button onClick={() => goToNextQuestion(step)} className="btn-primary text-base px-8 py-3">
              Next <span className="arrow ml-2">→</span>
            </button>
          </div>
        </QuestionCard>
      );
    }
  }

  /* ─── Pain-to-WTP (Q6) ─── */
  if (step === "pain") {
    return (
      <section className="py-24 px-6 border-t border-[rgba(255,255,255,0.04)]" style={{ position: 'relative', zIndex: 1 }}>
        <div className="mx-auto max-w-lg text-center">
          <ProgressBar current={6} total={6} />
          <span className="eyebrow block mb-6">Frage 6 von 6</span>
          <h2 className="section-heading section-heading-md max-w-lg mx-auto mb-4 leading-tight">
            If this app saved you 2 hours of scrolling per day and actually helped break the habit, what would that be worth to you?
          </h2>
          <p className="text-[#9f9dab] mb-2 text-sm">Pick the range that matches your willingness.</p>
          <p className="text-[#6b6980] mb-8 text-xs">— click one of the options below —</p>
          <div className="flex flex-col gap-3 justify-center max-w-sm mx-auto">
            {[
              { label: "Nothing, I would do it free", value: "free" },
              { label: "< €5/month", value: "<€5/mo" },
              { label: "€5 – €10/month", value: "€5-10/mo" },
              { label: "€10 – €20/month", value: "€10-20/mo" },
              { label: "€20+/month", value: "€20+/mo" },
              { label: "Price is not a factor, just solve the problem", value: "irrelevant" },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => setAnswers((prev) => ({ ...prev, painWorth: opt.value }))}
                className={`feature-card py-5 px-6 text-center hover:border-[#c8ff2e]/40 transition-colors duration-200 ${
                  answers.painWorth === opt.value ? "border-[#c8ff2e]/30 bg-[#c8ff2e]/5" : ""
                }`}
              >
                <span className="text-base font-space font-semibold text-[#e8e7e9]">{opt.label}</span>
              </button>
            ))}
          </div>
          <div className="mt-12">
            <button onClick={() => goToNextQuestion("pain")} className="btn-primary text-base px-8 py-3" disabled={!answers.painWorth}>
              See results <span className="arrow ml-2">→</span>
            </button>
          </div>
        </div>
      </section>
    );
  }

  return null;
}
