"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";

import { gsap } from "@/lib/gsap";
import { DURATION, EASE, STAGGER } from "@/lib/motion";
import { cn } from "@/lib/utils";

/* ==========================================================================
   EASE + TIMING BOARD
   --------------------------------------------------------------------------
   A design token is only real if you can see it. Each row replays its own ease
   on the same travel, so the difference between `power3.out` and `expo.out` is
   a judgement you make with your eyes rather than from a name.

   Every value here is imported from `src/lib/motion.ts` — the same constants the
   real scenes use, so this board cannot drift from the build.
   ========================================================================== */

const EASES = [
  { name: "out", value: EASE.out, note: "default · UI transitions" },
  { name: "reveal", value: EASE.reveal, note: "masked text, curtains" },
  { name: "glide", value: EASE.glide, note: "scroll-linked travel" },
  { name: "inOut", value: EASE.inOut, note: "scene hand-offs" },
  { name: "magnetic", value: EASE.magnetic, note: "magnetic snap-back" },
] as const;

const DURATIONS = Object.entries(DURATION) as [keyof typeof DURATION, number][];

export function EaseDemo({ className }: { className?: string }) {
  const scope = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);

  useGSAP(() => {
    // A single reusable tween per row, held at the end so the bars rest
    // off-stage until a row is played.
    const bars = gsap.utils.toArray<HTMLElement>("[data-ease-bar]");
    for (const bar of bars) {
      gsap.set(bar, { xPercent: 0, x: 0, opacity: 1 });
    }
  }, { scope });

  const play = (ease: string) => {
    setActive(ease);
    const bar = scope.current?.querySelector<HTMLElement>(
      `[data-ease-bar="${ease}"]`,
    );
    if (!bar) return;

    gsap.fromTo(
      bar,
      { x: 0 },
      {
        x: () => {
          // Measure at call time so the travel adapts to the container width.
          const track = bar.parentElement;
          return track ? track.clientWidth - bar.offsetWidth : 0;
        },
        duration: 1.15,
        ease,
        onComplete: () => setActive((current) => (current === ease ? null : current)),
      },
    );
  };

  const playAll = () => {
    EASES.forEach((ease, index) => {
      window.setTimeout(() => play(ease.value), index * 120);
    });
  };

  return (
    <div ref={scope} className={cn("flex flex-col gap-5", className)}>
      <div className="flex items-center justify-between">
        <span className="eyebrow">easing curve</span>
        <button
          type="button"
          onClick={playAll}
          className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-accent transition-opacity duration-300 hover:opacity-70"
        >
          play all ▸
        </button>
      </div>

      <ul className="flex flex-col divide-y divide-line-soft border-y border-line-soft">
        {EASES.map((ease) => (
          <li key={ease.name} className="flex flex-col gap-3 py-4">
            <div className="flex items-baseline justify-between gap-4">
              <button
                type="button"
                onClick={() => play(ease.value)}
                className="group flex items-baseline gap-3 text-left"
              >
                <span className="font-mono text-xs text-chalk transition-colors duration-300 group-hover:text-accent">
                  {ease.value}
                </span>
                <span className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-faint">
                  {ease.note}
                </span>
              </button>
              <span
                className={cn(
                  "font-mono text-[0.625rem] uppercase tracking-[0.14em] transition-colors duration-300",
                  active === ease.value ? "text-accent" : "text-faint",
                )}
              >
                {active === ease.value ? "running" : "replay"}
              </span>
            </div>

            {/* Track */}
            <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-slate">
              <span
                data-ease-bar={ease.value}
                className="absolute inset-y-0 left-0 w-1/4 rounded-full bg-accent"
              />
            </div>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-x-8 gap-y-3">
        {DURATIONS.map(([name, value]) => (
          <div key={name} className="flex items-baseline gap-2">
            <span className="font-mono text-xs text-chalk">{value}s</span>
            <span className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-faint">
              {name}
            </span>
          </div>
        ))}
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-xs text-chalk">
            {STAGGER.tight}–{STAGGER.loose}
          </span>
          <span className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-faint">
            stagger
          </span>
        </div>
      </div>
    </div>
  );
}
