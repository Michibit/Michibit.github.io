"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";

import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { useIntro } from "@/providers/IntroProvider";
import { site } from "@/content/profile";
import { getDictionary } from "@/i18n/dictionary";
import { useLanguage } from "@/i18n/provider";

/* ==========================================================================
   PRELOADER
   --------------------------------------------------------------------------
   Not a spinner with a logo on it — a staged curtain.

   Sequence:
     1. Counter runs 000 → 100 while we genuinely wait on `document.fonts.ready`.
        Splitting text before the display font has loaded produces wrong line
        breaks, so waiting is functional, not decorative.
     2. `beginReveal()` fires as the curtain starts lifting, NOT after it has
        gone. The hero animates *underneath* the rising curtain, so the whole
        thing reads as one continuous motion.
     3. The curtain is four columns lifting with a stagger — a hard edge moving
        through the frame reads far more premium than a uniform fade.
   ========================================================================== */

/** Minimum time the counter takes. Below ~1.2s the reveal feels like a glitch. */
const MIN_DURATION = 1.5;

/**
 * Hard ceiling on how long we will wait for `document.fonts.ready`.
 *
 * This is the most important constant in the file. `fonts.ready` is resolved by
 * the browser's font pipeline, and a stalled or blocked font request can leave
 * it pending indefinitely. Without this race, that means the curtain never
 * lifts and the whole portfolio is a black screen. A site that renders in a
 * fallback font beats a site that never renders at all.
 */
const FONT_TIMEOUT = 3000;

/** Number of curtain columns. More = finer comb; 4 keeps it readable. */
const COLUMNS = 4;

/** Resolve after `ms` at the latest, so a hung promise cannot block the reveal. */
function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T | void> {
  return Promise.race([
    promise,
    new Promise<void>((resolve) => {
      window.setTimeout(resolve, ms);
    }),
  ]);
}

export function Preloader() {
  const { phase, beginReveal, finish } = useIntro();
  const { lang } = useLanguage();
  const dict = getDictionary(lang);
  const statuses = dict.loader.status;

  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const columnRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [statusIndex, setStatusIndex] = useState(0);

  const reduced = typeof window !== "undefined" && prefersReducedMotion();

  /* ---- Status line cycling (5 renders total, deliberately cheap) ---------- */
  useEffect(() => {
    if (phase !== "loading" || reduced) return;
    const id = window.setInterval(() => {
      setStatusIndex((i) => Math.min(i + 1, statuses.length - 1));
    }, 300);
    return () => window.clearInterval(id);
  }, [phase, reduced, statuses.length]);

  /* ---- Counter + curtain ------------------------------------------------- */
  useGSAP(
    () => {
      const overlay = overlayRef.current;
      const content = contentRef.current;
      const counter = counterRef.current;
      const bar = barRef.current;
      if (!overlay || !content || !counter || !bar) return;

      const columns = columnRefs.current.filter(
        (el): el is HTMLDivElement => el !== null,
      );

      // Reduced motion: no counter theatre, just get out of the way.
      if (prefersReducedMotion()) {
        gsap.set(overlay, { autoAlpha: 0, display: "none" });
        beginReveal();
        finish();
        return;
      }

      // NOTE: deliberately no "already started" ref here. React StrictMode runs
      // this effect twice in development; a guard would let the first (killed)
      // run mark the work as done and leave the curtain up forever. Cleanup +
      // a `cancelled` flag is the correct way to make it idempotent.
      let cancelled = false;
      let timeline: gsap.core.Timeline | null = null;

      const progress = { value: 0 };

      const ticker = gsap.to(progress, {
        value: 100,
        duration: MIN_DURATION,
        // Not linear: a counter that advances evenly looks mechanical.
        ease: "power2.inOut",
        onUpdate: () => {
          counter.textContent = String(Math.round(progress.value)).padStart(3, "0");
        },
      });

      gsap.to(bar, {
        scaleX: 1,
        duration: MIN_DURATION,
        ease: "power2.inOut",
        transformOrigin: "left center",
      });

      const fontsReady: Promise<unknown> =
        typeof document !== "undefined" && "fonts" in document
          ? withTimeout(document.fonts.ready, FONT_TIMEOUT)
          : Promise.resolve();

      const counterDone = new Promise<void>((resolve) => {
        ticker.eventCallback("onComplete", resolve);
      });

      void Promise.all([counterDone, fontsReady]).then(() => {
        if (cancelled) return;

        counter.textContent = "100";
        gsap.set(bar, { scaleX: 1 });

        // Hero gets its cue while the curtain is still on screen.
        beginReveal();

        timeline = gsap.timeline({
          onComplete: () => {
            // Free the compositor layer once it can no longer be seen.
            gsap.set(overlay, { display: "none" });
            finish();
          },
        });

        timeline
          .to(content, {
            autoAlpha: 0,
            y: -24,
            duration: 0.45,
            ease: "power2.in",
          })
          .to(
            columns,
            {
              yPercent: -100,
              duration: 1.15,
              ease: "expo.inOut",
              stagger: 0.075,
            },
            "-=0.15",
          )
          // Safety net: if anything above is interrupted the curtain ends up
          // gone rather than permanently covering the site.
          .set([overlay, content], { autoAlpha: 0 });
      });

      return () => {
        cancelled = true;
        timeline?.kill();
        ticker.kill();
        gsap.killTweensOf(bar);
      };
    },
    { scope: overlayRef, dependencies: [] },
  );

  // The curtain is inert once it has done its job.
  if (phase === "done") return null;

  return (
    <div
      ref={overlayRef}
      className="js-preloader fixed inset-0 z-200 overflow-hidden"
      // Deliberately hidden from assistive tech. The overlay is decorative and
      // lives for ~1.5s; exposing a counter that changes 60x/sec would flood the
      // screen reader with noise and bury the actual page content.
      aria-hidden="true"
    >
      {/* Curtain columns — the hard edge that lifts away. */}
      <div className="absolute inset-0 flex" aria-hidden="true">
        {Array.from({ length: COLUMNS }).map((_, index) => (
          <div
            key={index}
            ref={(el) => {
              columnRefs.current[index] = el;
            }}
            className="h-full flex-1 bg-void"
            // A hairline between columns so the comb is legible while it moves.
            style={
              index > 0
                ? { boxShadow: "inset 1px 0 0 0 var(--color-line-soft)" }
                : undefined
            }
          />
        ))}
      </div>

      {/* Foreground content */}
      <div
        ref={contentRef}
        className="relative flex h-full w-full flex-col justify-between shell py-6 sm:py-10"
      >
        {/* Top row */}
        <div className="flex items-start justify-between">
          <div className="font-mono text-label uppercase tracking-[0.14em] text-chalk">
            {site.name}
          </div>
          <div className="hidden text-right font-mono text-label uppercase tracking-[0.14em] text-mute sm:block">
            {site.location}
          </div>
        </div>

        {/* Bottom row — status, counter, progress rule */}
        <div className="flex flex-col gap-5">
          <div className="flex items-end justify-between gap-6">
            <p className="max-w-[16ch] font-mono text-label uppercase leading-relaxed tracking-[0.14em] text-mute sm:max-w-none">
              {statuses[statusIndex]}
            </p>

            <div className="flex items-baseline gap-1 font-display text-huge leading-none tabular-nums text-chalk">
              <span ref={counterRef}>000</span>
              <span className="text-mute">%</span>
            </div>
          </div>

          {/* Progress rule: scaleX from 0, so it animates on the compositor. */}
          <div className="h-px w-full overflow-hidden bg-line-soft">
            <div
              ref={barRef}
              className="h-full w-full origin-left scale-x-0 bg-accent"
            />
          </div>
        </div>
      </div>
    </div>
  );
}


