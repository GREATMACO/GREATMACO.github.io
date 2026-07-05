"use client";

import { useState, useEffect } from "react";
import { site } from "@/lib/content";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0a0a0c]/90 backdrop-blur-xl border-b border-[rgba(255,255,255,0.04)]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a href="/" className="flex items-center gap-1.5 text-lg font-space font-bold tracking-tight text-[#e8e7e9]">
              <span className="text-[#c8ff2e]">404</span>
              <span className="text-[rgba(255,255,255,0.12)]">/</span>
              <span className="text-[#e8e7e9]">Collective</span>
            </a>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-10">
              {site.navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-[#9f9dab] transition-colors hover:text-[#e8e7e9]"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <a
                href="/waitlist"
                className="inline-flex items-center gap-2 text-sm font-space font-semibold text-[#000] bg-[#c8ff2e] px-5 py-2.5 rounded-[4px] hover:bg-[#d4ff4a] transition-colors"
              >
                Join
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex flex-col gap-1.5 md:hidden p-2 -mr-2"
              aria-label="Toggle menu"
            >
              <span className={`block h-0.5 w-6 bg-[#e8e7e9] transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`block h-0.5 w-6 bg-[#e8e7e9] transition-opacity duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-6 bg-[#e8e7e9] transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 top-16 z-40 md:hidden bg-[#0a0a0c]/98 backdrop-blur-xl">
          <div className="flex flex-col items-center justify-center h-full gap-8">
            {site.navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-2xl font-space font-medium text-[#9f9dab] hover:text-[#e8e7e9] transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a
              href="/waitlist"
              onClick={() => setMobileOpen(false)}
              className="mt-4 bg-[#c8ff2e] px-8 py-3 text-lg font-space font-semibold text-[#000] hover:bg-[#d4ff4a] transition-colors"
            >
              Join the waitlist
            </a>
          </div>
        </div>
      )}
    </>
  );
}
