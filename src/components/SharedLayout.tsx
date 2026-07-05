"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SharedLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="noise-overlay" aria-hidden="true" />
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
