"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";

import { SplitText, gsap } from "@/lib/gsap";
import { DURATION, EASE, SCROLL_START, STAGGER, prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

/* ==========================================================================
   REVEAL TEXT
   --------------------------------------------------------------------------
   A masked, staggered typographic reveal built on GSAP's SplitText.

   Why `type: "lines,chars"` with `mask: "lines"` for per-character reveals:
   masking *characters* gives every glyph its own overflow-hidden box, which
   clips descenders and italics. Masking *lines* and animating the characters
   nested inside them gives the same staggered effect with correct typographic
   clipping. It is the difference nobody can name but everybody can see.

   `autoSplit: true` re-splits on resize and when fonts finish loading, then
   re-runs the returned animation — so the reveal survives a window resize
   instead of leaving stale, badly-broken lines behind.
   ========================================================================== */

export type RevealSplit = "lines" | "words" | "chars";

export interface RevealTextProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Granularity of the stagger. */
  split?: RevealSplit;
  delay?: number;
  stagger?: number;
  duration?: number;
  /** ScrollTrigger start override. */
  start?: string;
}

const SPLIT_TYPE: Record<RevealSplit, string> = {
  lines: "lines",
  words: "lines,words",
  chars: "lines,chars",
};

export function RevealText({
  children,
  as: Tag = "p",
  className,
  split = "lines",
  delay = 0,
  stagger,
  duration = DURATION.reveal,
  start = SCROLL_START,
}: RevealTextProps) {
  const ref = useRef<HTMLElement>(null);

  const resolvedStagger =
    stagger ?? (split === "chars" ? 0.028 : split === "words" ? STAGGER.tight : 0);

  useGSAP(
    () => {
      const element = ref.current;
      if (!element) return;

      // Reduced motion: leave the text exactly as authored. No split, no mask,
      // no transform — which also means no layout shift for these users.
      if (prefersReducedMotion()) {
        gsap.set(element, { autoAlpha: 1 });
        return;
      }

      let splitText: SplitText | null = null;

      splitText = SplitText.create(element, {
        type: SPLIT_TYPE[split],
        mask: "lines",
        autoSplit: true,
        // Let SplitText manage the accessible text: it keeps the original
        // string readable to screen readers while the DOM is fragmented.
        aria: "auto",
        onSplit: (self) => {
          const targets =
            split === "chars"
              ? self.chars
              : split === "words"
                ? self.words
                : self.lines;

          if (!targets.length) return;

          // `fromTo` rather than a bare `from()`: both the start and end states
          // are explicit, so `autoSplit` re-running this on resize or font load
          // reproduces the same animation instead of recording whatever state
          // the elements happen to be in as its target.
          return gsap.fromTo(
            targets,
            {
              yPercent: 115,
              // A whisper of rotation stops large type from looking like it is
              // sliding on rails.
              rotate: split === "lines" ? 0 : 2,
            },
            {
              yPercent: 0,
              rotate: 0,
              duration,
              delay,
              ease: EASE.reveal,
              stagger: resolvedStagger,
              overwrite: "auto",
              scrollTrigger: {
                trigger: element,
                start,
                once: true,
              },
            },
          );
        },
      });

      return () => {
        // `kill()` removes the internal resize/font listeners; `revert()`
        // restores the original markup so React's tree stays intact.
        splitText?.kill();
        splitText?.revert();
        splitText = null;
      };
    },
    { scope: ref },
  );

  return (
    <Tag
      ref={ref}
      className={cn(
        // Prevent a flash of the un-split text before GSAP takes over.
        "will-change-transform",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
