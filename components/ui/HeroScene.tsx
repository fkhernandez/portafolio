"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

/* ── Laptop Assembly (bottom-right) ──────────────── */

interface PartConfig {
  assembled: readonly [number, number, number];
  exploded: readonly [number, number, number];
  size: readonly [number, number, number];
  aRot: readonly [number, number, number];
  eRot: readonly [number, number, number];
}

function LaptopAssembly() {
  const group = useRef<THREE.Group>(null);
  const partsRef = useRef<(THREE.Group | null)[]>([]);
  const timeRef = useRef(0);

  const parts: PartConfig[] = useMemo(
    () => [
      { assembled: [0, 0.55, -0.5], exploded: [0.3, 2.2, -1.8], size: [1.8, 1.1, 0.04], aRot: [-0.25, 0, 0], eRot: [-0.6, 0.2, 0.15] },
      { assembled: [0, 0, 0], exploded: [-0.2, -1.2, 1.2], size: [1.8, 0.06, 1.1], aRot: [0, 0, 0], eRot: [0.15, -0.15, 0.05] },
      { assembled: [0, 0.04, 0.25], exploded: [-1.6, -0.3, 0.6], size: [0.5, 0.015, 0.35], aRot: [0, 0, 0], eRot: [0, 0, 0.4] },
      { assembled: [-0.4, 0.04, -0.15], exploded: [1.2, 0.8, -0.3], size: [0.9, 0.02, 0.1], aRot: [0, 0, 0], eRot: [0.3, 0.2, 0.1] },
      { assembled: [0.2, 0.04, -0.28], exploded: [1.5, 1.2, 0.2], size: [0.7, 0.02, 0.1], aRot: [0, 0, 0], eRot: [0.1, -0.3, 0.2] },
      { assembled: [-0.1, 0.04, 0.02], exploded: [-1.3, 1.5, -0.5], size: [1.1, 0.02, 0.1], aRot: [0, 0, 0], eRot: [-0.2, 0.4, -0.3] },
      { assembled: [0.3, 0.04, -0.02], exploded: [0.8, -1.5, 0.8], size: [0.6, 0.02, 0.1], aRot: [0, 0, 0], eRot: [0.4, 0.1, -0.2] },
    ],
    []
  );

  useFrame((_, delta) => {
    // Cap delta to 100ms to prevent jumps when frames drop on load
    timeRef.current += Math.min(delta, 0.1);
    const t = timeRef.current;
    const cycle = t % 8;
    let p: number;
    if (cycle < 2.5) p = 1 - cycle / 2.5;
    else if (cycle < 4) p = 0;
    else if (cycle < 6.5) p = (cycle - 4) / 2.5;
    else p = 1;
    const e = p * p * (3 - 2 * p);

    if (group.current) group.current.rotation.y = t * 0.12;

    partsRef.current.forEach((part, i) => {
      if (!part) return;
      const c = parts[i];
      part.position.set(
        c.assembled[0] + (c.exploded[0] - c.assembled[0]) * e,
        c.assembled[1] + (c.exploded[1] - c.assembled[1]) * e,
        c.assembled[2] + (c.exploded[2] - c.assembled[2]) * e
      );
      part.rotation.set(
        c.aRot[0] + (c.eRot[0] - c.aRot[0]) * e,
        c.aRot[1] + (c.eRot[1] - c.aRot[1]) * e,
        c.aRot[2] + (c.eRot[2] - c.aRot[2]) * e
      );
    });
  });

  return (
    <group position={[3.2, -2.2, 0]} scale={0.8}>
      <group ref={group}>
        {parts.map((c, i) => (
          <group key={i} ref={(el) => { partsRef.current[i] = el; }}>
            <mesh>
              <boxGeometry args={[c.size[0], c.size[1], c.size[2]]} />
              <meshBasicMaterial color="#CBACF9" wireframe transparent opacity={0.5} />
            </mesh>
            {i === 0 && (
              <mesh position={[0, 0, 0.025]}>
                <planeGeometry args={[1.7, 1.0]} />
                <meshBasicMaterial color="#0a0a2e" transparent opacity={0.7} />
              </mesh>
            )}
          </group>
        ))}
      </group>
    </group>
  );
}

/* ── Code Monitor (top-left) ─────────────────────── */

const CODE_COLORS = ["#CBACF9", "#60A5FA", "#34D399", "#F9A8D4", "#FCD34D", "#E2E8F0"];

function CodeLine({
  index,
  total,
  width,
  color,
  xOffset,
}: {
  index: number;
  total: number;
  width: number;
  color: string;
  xOffset: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const spacing = 0.1;
  const range = total * spacing;

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const raw = index * spacing - clock.getElapsedTime() * 0.35;
    const y = ((raw % range) + range) % range - range / 2;
    ref.current.position.y = y;
    ref.current.visible = Math.abs(y) < 0.52;
  });

  return (
    <mesh ref={ref} position={[xOffset, 0, 0.055]}>
      <planeGeometry args={[width, 0.035]} />
      <meshBasicMaterial color={color} transparent opacity={0.7} />
    </mesh>
  );
}

function Monitor() {
  const group = useRef<THREE.Group>(null);
  const timeRef = useRef(0);

  const lines = useMemo(() => {
    const count = 16;
    return Array.from({ length: count }, (_, i) => {
      const widthSeed = ((i * 7 + 3) % 11) / 11;
      const indentSeed = ((i * 3 + 5) % 7) / 7;
      const w = 0.2 + widthSeed * 0.7;
      const indent = indentSeed * 0.3;
      return {
        index: i,
        total: count,
        width: w,
        color: CODE_COLORS[i % CODE_COLORS.length],
        xOffset: -0.65 + indent + w / 2,
      };
    });
  }, []);

  useFrame((_, delta) => {
    if (!group.current) return;
    timeRef.current += Math.min(delta, 0.1);
    const t = timeRef.current;
    group.current.rotation.y = Math.sin(t * 0.25) * 0.06;
    group.current.position.y = Math.sin(t * 0.4) * 0.04;
  });

  return (
    <group position={[-3.5, 2.2, 0]} scale={0.8}>
      <group ref={group}>
        {/* Frame */}
        <mesh>
          <boxGeometry args={[2, 1.3, 0.07]} />
          <meshBasicMaterial color="#CBACF9" wireframe transparent opacity={0.4} />
        </mesh>
        {/* Screen */}
        <mesh position={[0, 0, 0.04]}>
          <planeGeometry args={[1.85, 1.15]} />
          <meshBasicMaterial color="#050520" transparent opacity={0.85} />
        </mesh>
        {/* Code lines */}
        {lines.map((l) => (
          <CodeLine key={l.index} {...l} />
        ))}
        {/* Stand neck */}
        <mesh position={[0, -0.85, 0]}>
          <boxGeometry args={[0.12, 0.35, 0.07]} />
          <meshBasicMaterial color="#CBACF9" wireframe transparent opacity={0.4} />
        </mesh>
        {/* Stand base */}
        <mesh position={[0, -1.05, 0.1]}>
          <boxGeometry args={[0.7, 0.05, 0.35]} />
          <meshBasicMaterial color="#CBACF9" wireframe transparent opacity={0.4} />
        </mesh>
      </group>
    </group>
  );
}

/* ── Scene ───────────────────────────────────────── */

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 50 }}
      gl={{ alpha: true, antialias: false }}
      dpr={[1, 1.5]}
    >
      <LaptopAssembly />
      <Monitor />
    </Canvas>
  );
}
