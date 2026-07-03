"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { John316Badge } from "@/components/John316Badge";
import { navigationItems } from "@/data/portfolio";

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      if (!headerRef.current?.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-[rgba(5,6,5,0.78)] backdrop-blur-2xl"
    >
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-5 sm:px-8">
        <div className="brand-cluster">
          <Link
            href="/#home"
            className="font-display text-3xl font-medium tracking-normal text-[var(--color-ivory)]"
            aria-label="Frank Hernandez home"
          >
            FH<span className="text-[var(--color-sage)]">.</span>
          </Link>
          <div className="hidden lg:block">
            <John316Badge />
          </div>
        </div>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary navigation">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="nav-link text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-muted)] transition hover:text-[var(--color-ivory)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="site-header-actions">
          <button
            type="button"
            className={`burger-button lg:hidden ${isMenuOpen ? "is-open" : ""}`}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            <span />
            <span />
            <span />
          </button>

          <Link href="/inquiry" className="pill-button site-header-cta">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-sage)]" aria-hidden="true" />
            Let&apos;s talk
          </Link>
        </div>
      </div>

      <div id="mobile-menu" className={`mobile-menu lg:hidden ${isMenuOpen ? "is-open" : ""}`}>
        <div className="mobile-menu-inner">
          <div className="mobile-menu-verse">
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[var(--color-muted)]">
              John
            </span>
            <John316Badge />
          </div>

          <nav className="mobile-nav" aria-label="Mobile navigation">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="mobile-nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
