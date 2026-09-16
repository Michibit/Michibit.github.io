"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";

import { gsap } from "@/lib/gsap";
import { DURATION, EASE, SCROLL_START, STAGGER, prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

/* ==========================================================================
   REVEAL
   --------------------------------------------------------------------------
   The workhorse stagger container for lists, grids and stacks of blocks.

   It animates its *direct DOM children*, so you keep writing plain semantic
   markup — <ul><li>…</li></ul> — and add one wrapper. No per-item props, no
   index bookkeeping, no wrapper elements polluting the layout.

   Performance notes:
   • Only `opacity` and `transform` are animated, both compositor-only.
   • `once: true` means the ScrollTrigger kills itself after firing, instead of
     staying resident and re-evaluating on every scroll event.
   ========================================================================== */

export interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Vertical travel in pixels. */
  y?: number;
  stagger?: number;
  delay?: number;
  duration?: number;
  /** Animate the container itself rather than its children. */
  self?: boolean;
  start?: string;
}

export function Reveal({
  children,
  as: Tag = "div",
  className,
  y = 44,
  stagger = STAGGER.base,
  delay = 0,
  duration = DURATION.reveal,
  self = false,
  start = SCROLL_START,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const element = ref.current;
      if (!element) return;

      if (prefersReducedMotion()) {
        gsap.set(element, { autoAlpha: 1 });
        gsap.set(element.children, { autoAlpha: 1, clearProps: "transform" });
        return;
      }

      const targets: gsap.TweenTarget = self
        ? element
        : Array.from(element.children);
      if (!self && (targets as Element[]).length === 0) return;

      return gsap.fromTo(
        targets,
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration,
          delay,
          ease: EASE.out,
          stagger,
          // Only one reveal should ever own these elements. Without this, a
          // re-run leaves the previous tween alive and fighting for the same
          // properties.
          overwrite: "auto",
          // `once: true` lets the trigger kill itself after firing, instead of
          // staying resident and re-evaluating on every scroll event.
          scrollTrigger: { trigger: element, start, once: true },
        },
      );
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={cn(className)}>
      {children}
    </Tag>
  );
}
