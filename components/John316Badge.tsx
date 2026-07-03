"use client";

import { useEffect, useRef, useState } from "react";

export function John316Badge() {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div
      ref={rootRef}
      className={`verse-card-root ${isOpen ? "is-open" : ""}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onFocus={() => setIsOpen(true)}
      onBlur={(event) => {
        const nextTarget = event.relatedTarget;

        if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget)) {
          setIsOpen(false);
        }
      }}
    >
      <button
        type="button"
        className="verse-trigger"
        aria-expanded={isOpen}
        aria-controls="john-316-card"
        onClick={() => setIsOpen((current) => !current)}
      >
        3:16
      </button>

      <div id="john-316-card" className={`verse-card ${isOpen ? "is-open" : ""}`} role="note">
        <p className="detail-label">John 3:16</p>
        <p className="mt-3 text-sm leading-7 text-[var(--color-ivory)]">
          For God so loved the world, that he gave his only Son, that whoever believes in him
          should not perish but have eternal life.
        </p>
        <p className="mt-3 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
          ESV
        </p>
      </div>
    </div>
  );
}
