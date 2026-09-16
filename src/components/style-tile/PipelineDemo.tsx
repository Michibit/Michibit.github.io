"use client";

import { useCallback, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";

import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/* ==========================================================================
   PIPELINE DEMO
   --------------------------------------------------------------------------
   Proof that the data-flow animation described in the brief actually works,
   before it gets wired into a pinned scene.

   Two techniques are combined:

   1. `strokeDashoffset` on the connector paths — the classic "line draws
      itself" effect. The dash pattern is a gap the length of the path, so
      animating the offset from full length down to zero paints the stroke in.
      No plugin is required, and the value can be driven directly by a
      ScrollTrigger's `progress`, which is what the real scene will do.

   2. A packet travelling along each path. Position is sampled per frame with
      `path.getPointAtLength()`, so the packet follows the exact curve instead
      of approximating it with keyframes.

   All geometry lives in a `viewBox` coordinate space, so the diagram scales
   fluidly without touching the numbers. `getTotalLength()` is a layout read, so
   it is measured once up front and cached on the element, never inside a frame.
   ========================================================================== */

/** Node centres on the 720×240 stage grid. */
const NODES = [
  { id: "commit", label: "git", sub: "push", x: 92 },
  { id: "build", label: "build", sub: "docker", x: 296 },
  { id: "scan", label: "scan", sub: "trivy", x: 500 },
  { id: "deploy", label: "deploy", sub: "k8s", x: 660 },
] as const;

const LANES = [
  { y: 52, color: "var(--color-signal)", label: "CI" },
  { y: 120, color: "var(--color-accent)", label: "CD" },
  { y: 188, color: "var(--color-live)", label: "OPS" },
] as const;

export function PipelineDemo({ className }: { className?: string }) {
  const scope = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const [running, setRunning] = useState(false);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const paths = Array.from(root.querySelectorAll<SVGPathElement>("[data-lane-path]"));
      const packets = Array.from(root.querySelectorAll<SVGCircleElement>("[data-packet]"));
      if (!paths.length) return;

      // Measure and prime once. This is a layout read, not a per-frame cost.
      for (const path of paths) {
        const length = path.getTotalLength();
        path.dataset.length = String(length);
        path.style.strokeDasharray = String(length);
        path.style.strokeDashoffset = String(length);
      }

      const tl = gsap.timeline({
        paused: true,
        onStart: () => setRunning(true),
        onComplete: () => setRunning(false),
      });

      tl.to(paths, {
        strokeDashoffset: 0,
        duration: 1.6,
        ease: "power2.inOut",
        stagger: 0.16,
      });

      paths.forEach((path, index) => {
        const packet = packets[index];
        if (!packet) return;
        const length = Number(path.dataset.length ?? 0);
        const proxy = { t: 0 };

        tl.to(
          proxy,
          {
            t: 1,
            duration: 1.6,
            ease: "power2.inOut",
            onUpdate: () => {
              const point = path.getPointAtLength(proxy.t * length);
              packet.setAttribute("cx", String(point.x));
              packet.setAttribute("cy", String(point.y));
              // Launch and arrive softly; brightest mid-flight.
              packet.style.opacity = String(
                Math.min(1, Math.sin(proxy.t * Math.PI) * 2.6),
              );
            },
          },
          // Sit the packet on the same beat as its lane's draw.
          0.16 * index,
        );
      });

      tl.progress(0).pause();
      timeline.current = tl;

      return () => {
        timeline.current = null;
        tl.kill();
      };
    },
    { scope },
  );

  const replay = useCallback(() => {
    // `restart()` replays from the recorded start values, so the dash offsets
    // return to full length on their own — no manual reset needed.
    timeline.current?.restart();
  }, []);

  return (
    <div ref={scope} className={cn("w-full", className)}>
      <div className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-ink">
        <div className="flex items-center justify-between border-b border-line-soft px-4 py-2.5">
          <span className="eyebrow">pipeline · data flow</span>
          <button
            type="button"
            onClick={replay}
            disabled={running}
            className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-accent transition-opacity duration-300 hover:opacity-70 disabled:opacity-40"
          >
            {running ? "flowing…" : "run ▸"}
          </button>
        </div>

        <svg
          viewBox="0 0 720 240"
          className="block h-auto w-full"
          role="img"
          aria-label="CI/CD pipeline: commit, build, scan and deploy connected across three lanes"
        >
          {/* Lane rails */}
          {LANES.map((lane) => (
            <g key={lane.label}>
              <line
                x1="24"
                y1={lane.y}
                x2="696"
                y2={lane.y}
                stroke="var(--color-line-soft)"
                strokeWidth="1"
              />
              <text
                x="24"
                y={lane.y - 12}
                fill="var(--color-faint)"
                fontFamily="var(--font-mono)"
                fontSize="8"
                letterSpacing="1.6"
              >
                {lane.label}
              </text>
            </g>
          ))}

          {/* Connectors — each lane links the same four node columns */}
          {LANES.map((lane, laneIndex) => {
            const d = NODES.map(
              (node, i) => `${i === 0 ? "M" : "L"}${node.x} ${lane.y}`,
            ).join(" ");

            return (
              <g key={`path-${lane.label}`}>
                <path
                  data-lane-path=""
                  d={d}
                  fill="none"
                  stroke={lane.color}
                  strokeWidth="1.25"
                  strokeLinecap="square"
                  opacity={0.85 - laneIndex * 0.12}
                />
                <circle
                  data-packet=""
                  r="3.5"
                  cx={NODES[0].x}
                  cy={lane.y}
                  fill={lane.color}
                  opacity="0"
                />
              </g>
            );
          })}

          {/* Nodes */}
          {NODES.map((node) => (
            <g key={node.id}>
              <rect
                x={node.x - 46}
                y="20"
                width="92"
                height="200"
                rx="10"
                fill="var(--color-void)"
                stroke="var(--color-line)"
                strokeWidth="1"
              />
              <text
                x={node.x}
                y="112"
                textAnchor="middle"
                fill="var(--color-chalk)"
                fontFamily="var(--font-mono)"
                fontSize="12"
                letterSpacing="0.4"
              >
                {node.label}
              </text>
              <text
                x={node.x}
                y="130"
                textAnchor="middle"
                fill="var(--color-mute)"
                fontFamily="var(--font-mono)"
                fontSize="8"
                letterSpacing="1.2"
              >
                {node.sub}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <p className="mt-3 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-faint">
        stroke-dashoffset + getPointAtLength · no plugin required
      </p>
    </div>
  );
}
