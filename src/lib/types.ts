/**
 * Shared TypeScript types for 404 Collective data.
 */

export interface WaitlistSubmission {
  email: string;
  timestamp: string;
}

export interface FeatureItem {
  id: string;
  icon: string;
  title: string;
  subtitle?: string;
  description: string;
  details?: string[];
  dark?: boolean;
}

export interface Pillar {
  title: string;
  subtitle: string;
  description: string;
  citation?: string;
  index: number;
}

export interface TeamMember {
  name: string;
  role: string;
  desc: string;
}

export interface Step {
  number: string;
  title: string;
  description: string;
  details: string[];
  subSteps?: { label: string; desc: string }[];
}

export interface HeroContent {
  tagline: string;
  headline: string;
  gradientHighlight: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
  secondaryText: string;
  secondaryHref: string;
  trustLine: string;
}

export interface SiteConfig {
  name: string;
  defaultTitle: string;
  templateSuffix: string;
  description: string;
  navItems: Array<{ label: string; href: string }>;
  footerLinks: Array<{ label: string; href: string }>;
  year: number;
  experimentHref?: string; // TODO: Uncomment in content/index.ts to enable
}

export interface StatItem {
  value: string;
  label: string;
}
