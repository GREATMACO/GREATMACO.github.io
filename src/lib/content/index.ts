/**
 * Content configuration for 404 Collective.
 * All text, data, and content lives here. Edit once, reflected everywhere.
 */

import type { FeatureItem, Step, TeamMember, Pillar } from "../types";

// ─── Features ───

const featuresData: FeatureItem[] = [
  {
    id: "focus",
    icon: "IconFocus",
    title: "Focus Lock",
    subtitle: "Irreversible by design",
    description: "Focus sessions lock until the timer ends. No snooze, no escape.",
    details: ["Irreversible timer", "Therapist can view progress", "No loopholes"],
    dark: true,
  },
  {
    id: "ai",
    icon: "IconCoach",
    title: "Awareness Coach",
    subtitle: "Catches you before you scroll",
    description: "Notices when you reach for a distracting app and sends a grounding nudge.",
    details: ["Impulse detection", "CBT exercises", "Adaptive to your patterns"],
    dark: false,
  },
  {
    id: "quests",
    icon: "IconQuest",
    title: "Offline Missions",
    subtitle: "Relearn what it feels like to be present",
    description: "Daily missions that get you off your phone. Earn points for every completed quest.",
    details: ["Daily quests", "Creativity, fitness, social categories", "Share proof with the Collective"],
    dark: true,
  },
  {
    id: "collective",
    icon: "IconCollective",
    title: "The Collective",
    subtitle: "No one recovers alone",
    description: "Group challenges where everyone stays off their phones together.",
    details: ["Offline sprints", "Challenge competitions", "Accountability matching"],
    dark: false,
  },
  {
    id: "metrics",
    icon: "IconMetrics",
    title: "Real Metrics",
    subtitle: "Track what actually matters",
    description: "We track offline time. Books finished, conversations had, walks taken.",
    details: ["Presence reports", "Behavioral insights", "Exportable for your therapist"],
    dark: true,
  },
  {
    id: "therapist",
    icon: "IconTherapist",
    title: "Therapist Dashboard",
    subtitle: "Built for professionals",
    description: "Your therapist can track your progress automatically.",
    details: ["Progress visibility", "Session assignments", "Automated reports"],
    dark: false,
  },
];

export function getFeatures(): FeatureItem[] {
  return featuresData;
}

// ─── Steps (How It Works) ───

const stepsData: Step[] = [
  {
    number: "01",
    title: "Declare your intention",
    description: "State what you are fighting for in thirty seconds.",
    details: ["Choose commitment levels", "Connect your therapist", "Set your first session"],
    subSteps: [
      { label: "Environment setup", desc: "We block what drains you" },
      { label: "Therapist portal", desc: "Invite your therapist in" },
      { label: "First session", desc: "Start small." },
    ],
  },
  {
    number: "02",
    title: "Lock it in",
    description: "Enable Focus Mode. Notifications pause. Timer runs.",
    details: ["Irreversible timer", "Therapist tracking begins", "Coach stands by"],
    subSteps: [
      { label: "The lock", desc: "No loopholes" },
      { label: "The session", desc: "Your first hour of real presence" },
      { label: "The coach", desc: "AI support when the urge hits" },
    ],
  },
  {
    number: "03",
    title: "Log what you reclaim",
    description: "Offline time tracked automatically. Earn points for consistency.",
    details: ["404 Points per offline minute", "Tier unlocks", "Mission completions"],
    subSteps: [
      { label: "404 Points", desc: "Every offline minute earns value" },
      { label: "Missions", desc: "Analog challenges with real rewards" },
      { label: "The Collective feed", desc: "Evidence that another way is possible" },
    ],
  },
];

export function getSteps(): Step[] {
  return stepsData;
}

// ─── Hero ───

const heroContent: import("@/lib/types").HeroContent = {
  tagline: "A tool that actually works.",
  headline: "Apps built to keep you scrolling.",
  gradientHighlight: "It just takes a tool to stop it.",
  subtitle: "We built 404 because we needed a simple tool that actually works. Not another wellness app with inspirational quotes.",
  ctaText: "Join the waitlist",
  ctaHref: "/waitlist",
  secondaryText: "Read the manifesto",
  secondaryHref: "/about",
  trustLine: "Zero ads. Zero tracking. Offline-first by design.",
};

export function getHeroContent(): import("@/lib/types").HeroContent {
  return heroContent;
}

// ─── Stats ───

const statsData = [] as const;

export function getStats() {
  return statsData;
}

// ─── About pillars ───

const aboutPillars: Pillar[] = [
  {
    title: "Basis",
    subtitle: "Pattern detection",
    description: "We track your triggers so the app can help at the right moment.",
    index: 0,
  },
  {
    title: "Aktiv",
    subtitle: "AI interruption system",
    description: "The system detects the scroll impulse in real time and offers an alternative before the habit loop completes.",
    index: 1,
  },
  {
    title: "Struktur",
    subtitle: "CBT learning path",
    description: "A 12-module program combining stimulus control with cognitive restructuring.",
    index: 2,
  },
  {
    title: "Sozial",
    subtitle: "Peer accountability",
    description: "Social commitment is the strongest predictor of behavioral recovery.",
    index: 3,
  },
  {
    title: "Klinisch",
    subtitle: "Professional support",
    description: "Optional tier powered by licensed therapists.",
    citation: "Optional tier, powered by licensed therapists",
    index: 4,
  },
];

export function getAboutPillars() {
  return aboutPillars;
}

// ─── About principles ───

const aboutPrinciples: Pillar[] = [
  {
    title: "Privacy-first by default",
    subtitle: "Your data is yours",
    description: "We collect nothing. Everything stays on your device.",
    index: 0,
  },
  {
    title: "Minimal over maximal",
    subtitle: "Fewer features, more effect",
    description: "Every feature exists to help you live offline.",
    index: 1,
  },
  {
    title: "People over algorithms",
    subtitle: "Real connection is the metric",
    description: "We connect you with real people, not keep you engaged.",
    index: 2,
  },
];

export function getAboutPrinciples() {
  return aboutPrinciples;
}

// ─── Team ───

const teamData: TeamMember[] = [
  { name: "Oliver", role: "Co-Founder", desc: "Stared at a screen time report and saw 12 hours on a school night." },
  { name: "Lasse", role: "Co-Founder", desc: "He builds the evidence-based architecture. Clinical research meets real-world behavior." },
  { name: "Marlon", role: "Co-Founder", desc: "Interface design that feels like a deep breath." },
  { name: "Elena", role: "Co-Founder", desc: "Therapist collaboration layer." },
  { name: "Merle", role: "Co-Founder", desc: "Community infrastructure." },
];

export function getTeam() {
  return teamData;
}

// ─── Site config ───

export const site = {
  name: "The 404 Collective",
  defaultTitle: "The 404 Collective",
  templateSuffix: " | 404 Collective",
  description:
    "A simple tool to break the scroll loop. Not with willpower. With architecture.",
  navItems: [
    { label: "About", href: "/about" },
    { label: "Features", href: "/features" },
    { label: "How It Works", href: "/how-it-works" },
  ],
  experimentHref: "/experiment", // TODO: Uncomment to show experiment link in navbar
  footerLinks: [
    { label: "About", href: "/about" },
    { label: "Features", href: "/features" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Join", href: "/waitlist" },
  ],
  year: 2026,
} as const;
