"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export function SpNavClient() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`sp-nav${scrolled ? " scrolled" : ""}`}>
      <div className="sp-nav-inner">
        <Link href="/" className="sp-nav-brand">
          <Image
            src="/icon.png"
            alt="SmartProcess"
            width={32}
            height={32}
            style={{ borderRadius: 8, display: "block" }}
            priority
          />
          <span style={{ fontWeight: 700, fontSize: 16, letterSpacing: "-0.02em" }}>
            SmartProcess
          </span>
        </Link>
        <nav className="sp-nav-links">
          <a href="#tjanster">Tjänster</a>
          <a href="#exempel">Exempel</a>
          <a href="#anvandningsomraden">Lösningar</a>
          <a href="/om-oss">Om oss</a>
          <a href="#kontakt" className="btn btn-primary btn-sm">
            Boka samtal
          </a>
        </nav>
      </div>
    </header>
  );
}
