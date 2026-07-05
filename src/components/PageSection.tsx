"use client";

// Reusable section-building blocks for 404 Collective.
// All animations use CSS transitions (no framer-motion).
// Import classes like .reveal / .reveal-delay-1 from globals.css for scroll-in effect,
// or animate manually on mount with IntersectionObserver if needed.

/* ─── Gradient Dots SVG Pattern ─── */

interface GradientDotsProps {
  color?: string;
  opacity?: number;
  className?: string;
}

export function GradientDots({ color = "rgba(200, 255, 46, 0.06)", opacity = 1, className = "" }: GradientDotsProps) {
  return (
    <svg
      className={`pointer-events-none absolute inset-0 ${className}`}
      aria-hidden="true"
    >
      <defs>
        <pattern id="dots-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.5" fill={color} opacity={opacity * 0.3} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dots-pattern)" />
    </svg>
  );
}

/* ─── Section Heading (CSS-only) ─── */

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`mx-auto mb-16 max-w-xl ${align === "center" ? "text-center" : "text-left"}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="section-heading section-heading-md mt-4">{title}</h2>
      {subtitle && (
        <p className="mt-4 text-[#9f9dab] leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}

/* ─── Section Container ─── */

export function Section({
  children,
  dark = false,
  narrow = false,
  className = "",
}: {
  children: React.ReactNode;
  dark?: boolean;
  narrow?: boolean;
  className?: string;
}) {
  return (
    <section
      className={`${dark ? "section-dark" : ""} ${narrow ? "py-24 px-6" : "py-32 px-6"} ${className}`}
    >
      <div className={`mx-auto ${narrow ? "max-w-5xl" : "max-w-7xl"}`}>
        {children}
      </div>
    </section>
  );
}

/* ─── Feature Grid ─── */

export function FeatureGrid({
  children,
  cols = 3,
}: {
  children: React.ReactNode;
  cols?: 2 | 3;
}) {
  return (
    <div className={`grid gap-6 ${cols === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
      {children}
    </div>
  );
}

/* ─── Stat Block ─── */

export function StatBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-b border-[rgba(255,255,255,0.04)] pb-8 sm:pb-10">
      <div className="stat-value">{value}</div>
      <div className="mt-2 text-sm text-[#6b6980] tracking-wider">{label}</div>
    </div>
  );
}

/* ─── Divider with Label ─── */

export function SectionDivider({ label }: { label: string }) {
  return (
    <div className="section-dark">
      <div className="section text-center">
        <span className="eyebrow">{label}</span>
      </div>
    </div>
  );
}
