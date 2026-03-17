"use client";

import { memo } from "react";

/**
 * Animated light beams that travel along the hero's grid lines
 * at the top-right and bottom-left edges.
 */

const GRID = 100; // px — matches bg-grid tile size

interface Beam {
  /** Grid line index (1 = 100px, 2 = 200px, …) */
  line: number;
  dir: "h" | "v";
  /** Visible beam length in px */
  len: number;
  /** Full animation cycle in seconds (travel ≈ 28 %, pause ≈ 72 %) */
  dur: number;
  /** Start delay in seconds */
  delay: number;
  /** Optional accent colour override */
  accent?: string;
}

/* ── beam definitions ────────────────────────────────────── */

const TR_BEAMS: Beam[] = [
  // horizontal — travel left → right
  { line: 1, dir: "h", len: 100, dur: 10, delay: 0 },
  { line: 2, dir: "h", len: 80, dur: 13, delay: 4 },
  { line: 3, dir: "h", len: 120, dur: 9, delay: 8 },
  // vertical — travel top → bottom
  { line: 1, dir: "v", len: 90, dur: 11, delay: 2, accent: "blue" },
  { line: 2, dir: "v", len: 110, dur: 10, delay: 6 },
];

const BL_BEAMS: Beam[] = [
  // horizontal — travel right → left
  { line: 1, dir: "h", len: 100, dur: 11, delay: 1.5 },
  { line: 2, dir: "h", len: 80, dur: 9, delay: 5 },
  // vertical — travel bottom → top
  { line: 1, dir: "v", len: 90, dur: 10, delay: 3, accent: "blue" },
  { line: 2, dir: "v", len: 110, dur: 12, delay: 7.5 },
  { line: 3, dir: "v", len: 80, dur: 9, delay: 10 },
];

/* ── gradients ───────────────────────────────────────────── */

const purple = {
  tail: "rgba(139,92,246,0)",
  mid: "rgba(139,92,246,0.55)",
  core: "rgba(203,172,249,0.9)",
  tip: "rgba(255,255,255,0.85)",
};

const blue = {
  tail: "rgba(59,130,246,0)",
  mid: "rgba(59,130,246,0.5)",
  core: "rgba(147,197,253,0.85)",
  tip: "rgba(255,255,255,0.8)",
};

function gradient(deg: number, accent?: string) {
  const c = accent === "blue" ? blue : purple;
  // Comet shape: soft tail → bright head → sharp tip
  return `linear-gradient(${deg}deg, transparent, ${c.tail} 10%, ${c.mid} 45%, ${c.core} 75%, ${c.tip} 92%, transparent)`;
}

function glowShadow(accent?: string) {
  const c = accent === "blue" ? "59,130,246" : "139,92,246";
  return `drop-shadow(0 0 6px rgba(${c},0.55)) drop-shadow(0 0 2px rgba(${c},0.3))`;
}

/* ── individual beam element ─────────────────────────────── */

function BeamEl({
  beam,
  region,
}: {
  beam: Beam;
  region: "tr" | "bl";
}) {
  const isH = beam.dir === "h";
  const pos = beam.line * GRID;

  // track spans the full length of the corner container
  const track: React.CSSProperties = { position: "absolute" };

  if (region === "tr") {
    if (isH) {
      track.top = pos;
      track.left = 0;
      track.right = 0;
      track.height = 1;
    } else {
      track.right = pos;
      track.top = 0;
      track.bottom = 0;
      track.width = 1;
    }
  } else {
    if (isH) {
      track.bottom = pos;
      track.left = 0;
      track.right = 0;
      track.height = 1;
    } else {
      track.left = pos;
      track.top = 0;
      track.bottom = 0;
      track.width = 1;
    }
  }

  // travel direction for the gradient
  const fwd = region === "tr";
  const gradDeg = isH ? (fwd ? 90 : 270) : (fwd ? 180 : 0);

  // animation name matches keyframes in globals.css
  const animName = `gridBeam${isH ? "H" : "V"}${fwd ? "" : "Rev"}`;

  const seg: React.CSSProperties = {
    position: "absolute",
    background: gradient(gradDeg, beam.accent),
    borderRadius: 999,
    filter: glowShadow(beam.accent),
    animation: `${animName} ${beam.dur}s ${beam.delay}s linear infinite`,
    opacity: 0,
    willChange: "transform, opacity",
    animationFillMode: "backwards",
    ...(isH
      ? { width: beam.len, height: "100%", top: 0, left: 0 }
      : { height: beam.len, width: "100%", left: 0, top: 0 }),
  };

  return (
    <div style={track}>
      <div style={seg} />
    </div>
  );
}

/* ── main wrapper ────────────────────────────────────────── */

const GridBeams = memo(() => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* top-right corner */}
    <div
      className="absolute top-0 right-0 w-[55%] h-[55%]"
      style={{
        maskImage:
          "radial-gradient(ellipse at 100% 0%, black 0%, transparent 70%)",
        WebkitMaskImage:
          "radial-gradient(ellipse at 100% 0%, black 0%, transparent 70%)",
      }}
    >
      {TR_BEAMS.map((b, i) => (
        <BeamEl key={`tr${i}`} beam={b} region="tr" />
      ))}
    </div>

    {/* bottom-left corner */}
    <div
      className="absolute bottom-0 left-0 w-[55%] h-[55%]"
      style={{
        maskImage:
          "radial-gradient(ellipse at 0% 100%, black 0%, transparent 70%)",
        WebkitMaskImage:
          "radial-gradient(ellipse at 0% 100%, black 0%, transparent 70%)",
      }}
    >
      {BL_BEAMS.map((b, i) => (
        <BeamEl key={`bl${i}`} beam={b} region="bl" />
      ))}
    </div>
  </div>
));

GridBeams.displayName = "GridBeams";
export default GridBeams;
