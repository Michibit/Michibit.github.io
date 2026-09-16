"use client";

import Lenis from "lenis";

export type LenisInstance = Lenis;

export interface LenisOptions {
  /** Scroll distance per wheel tick. */
  wheelMultiplier?: number;
  /** Scroll distance per touch drag unit. */
  touchMultiplier?: number;
  /** Higher = longer, smoother glide. */
  duration?: number;
  /** Interpolation factor (0-1). Lower = smoother, more "floaty". */
  lerp?: number;
  /**
   * Mirror touch scrolling through Lenis so it matches the wheel.
   *
   * Off by default: hijacking touch input on mobile is the single most common
   * way a "smooth scrolling" site ends up feeling worse than a plain one, and
   * it fights the OS's own momentum physics.
   */
  syncTouch?: boolean;
}

/**
 * Build a Lenis instance tuned for a portfolio: a long, weighted glide that
 * still feels responsive.
 *
 * `lerp` and `duration` are mutually exclusive in Lenis — supplying `lerp` makes
 * the scroll frame-rate independent, which is what we want with GSAP's ticker
 * driving `raf()`.
 */
export function createLenis(options: LenisOptions = {}): LenisInstance {
  const {
    wheelMultiplier = 1,
    touchMultiplier = 1.6,
    lerp = 0.085,
    syncTouch = false,
  } = options;

  return new Lenis({
    lerp,
    wheelMultiplier,
    touchMultiplier,
    syncTouch,
    // Let Lenis handle everything, including anchor jumps. We drive the frame
    // loop from gsap.ticker instead, so this must stay false.
    autoRaf: false,
    smoothWheel: true,
    // Avoid the "rubber band" feel on overscroll at the document edges.
    overscroll: true,
    // In-page anchors get the same glide as the wheel.
    anchors: { offset: -72, duration: 1.2 },
  });
}
