"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";

import { pipeline } from "@/content/sections";
import { useLanguage } from "@/i18n/provider";
import { ScrollTrigger, gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

/* ==========================================================================
   PIPELINE DIAGRAM
   --------------------------------------------------------------------------
   A static "from commit to production" diagram: six stages, three lanes, one
   draw-in when the section enters the viewport. No pinning, no scroll hijack —
   it is an illustration, and it behaves like one.

   The geometry problem, and why it is measured rather than guessed: the node
   row is laid out by the browser (flex, `vw` gaps, font-dependent card widths),
   so hard-coded SVG coordinates would drift the moment a label wrapped or a
   breakpoint changed. Instead the lanes are measured from the real layout with
   `offsetLeft`/`offsetWidth` and the `viewBox` is set to the measured pixel
   size, so 1 SVG unit is always 1 CSS pixel and strokes never distort. The
   measurement re-runs on `refreshInit`, so resize and font loading are handled.
   ========================================================================== */

/** Vertical offset of each lane from the row centre. */
const LANE_SPREAD = 22;

export function PipelineDiagram() {
  const root = useRef<HTMLDivElement>(null);
  const row = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const { lang } = useLanguage();

  useGSAP(
    () => {
      const rowEl = row.current;
      const svgEl = svg.current;
      if (!rowEl || !svgEl) return;

      const lanes = Array.from(svgEl.querySelectorAll<SVGPathElement>("[data-lane]"));

      const measure = () => {
        const width = rowEl.offsetWidth;
        const height = rowEl.offsetHeight;
        if (!width || !height) return;

        svgEl.setAttribute("viewBox", `0 0 ${width} ${height}`);

        const nodes = Array.from(rowEl.querySelectorAll<HTMLElement>("[data-node]"));
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        // Below the lg breakpoint the row wraps, so a straight lane would cut
        // across rows. Hide the lanes instead of drawing something wrong.
        if (!first || !last || nodes.length < 2 || first.offsetTop !== last.offsetTop) {
          svgEl.style.display = "none";
          return;
        }
        svgEl.style.display = "";

        const firstX = first.offsetLeft + first.offsetWidth / 2;
        const lastX = last.offsetLeft + last.offsetWidth / 2;
        const centreY = height / 2;

        lanes.forEach((path, index) => {
          const y = centreY + (index - 1) * LANE_SPREAD;
          path.setAttribute("d", `M ${firstX} ${y} L ${lastX} ${y}`);
          const length = path.getTotalLength();
          path.dataset.length = String(length);
          path.style.strokeDasharray = String(length);
          path.style.strokeDashoffset = String(length);
        });
      };

      measure();
      ScrollTrigger.addEventListener("refreshInit", measure);

      const cleanupMeasure = () =>
        ScrollTrigger.removeEventListener("refreshInit", measure);

      if (prefersReducedMotion()) {
        gsap.set(lanes, { strokeDashoffset: 0 });
        gsap.set(root.current?.querySelectorAll("[data-node-sub]") ?? [], {
          autoAlpha: 1,
          y: 0,
        });
        return cleanupMeasure;
      }

      const tl = gsap.timeline({
        scrollTrigger: { trigger: rowEl, start: "top 85%", once: true },
      });

      tl.to(
        lanes,
        {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: "power2.inOut",
          stagger: 0.14,
        },
        0,
      ).to(
        root.current?.querySelectorAll("[data-node-sub]") ?? [],
        { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.07, ease: "power2.out" },
        0.25,
      );

      return () => {
        cleanupMeasure();
        tl.kill();
      };
    },
    { scope: root },
  );

  return (
    <div ref={root} className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-ink">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line-soft px-4 py-3">
        <span className="eyebrow">{pipeline.eyebrow[lang]}</span>
        <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-faint">
          {pipeline.headline[lang]}
        </span>
      </div>

      <div className="overflow-hidden px-6 py-10 sm:px-10">
        <div
          ref={row}
          className="relative flex flex-wrap items-center justify-center gap-x-4 gap-y-6 lg:flex-nowrap lg:justify-between lg:gap-x-2"
        >
          {/* Lanes live in the row's coordinate space so they can span it. */}
          <svg
            ref={svg}
            className="pointer-events-none absolute inset-0 z-0 h-full w-full"
            aria-hidden="true"
          >
            {pipeline.lanes.map((lane) => (
              <path
                key={lane.id}
                data-lane={lane.id}
                fill="none"
                stroke={`var(${lane.token})`}
                strokeWidth="1.25"
                strokeLinecap="square"
                opacity="0.5"
              />
            ))}
          </svg>

          {pipeline.stages.map((stage, index) => (
            <div
              key={stage.id}
              data-node=""
              className="relative z-10 flex w-[7.5rem] shrink-0 flex-col gap-1.5 rounded-xl border border-line bg-void px-3 py-3 sm:w-[8.5rem]"
            >
              <span className="font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-faint">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-lg uppercase leading-none tracking-tight text-chalk">
                {stage.label}
              </span>
              <span
                data-node-sub=""
                className="font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-accent"
              >
                {stage.sub}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-x-2 gap-y-2 border-t border-line-soft px-6 py-4 sm:px-10">
        {pipeline.stack.map((item) => (
          <span
            key={item}
            className={cn(
              "rounded-full border border-line px-2.5 py-1",
              "font-mono text-[0.5625rem] uppercase tracking-[0.1em] text-mute",
            )}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
