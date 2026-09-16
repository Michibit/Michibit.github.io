/**
 * Single source of truth for motion.
 *
 * Centralising durations and easings keeps the whole site feeling like one
 * object instead of a pile of one-off tweens — and it makes global retuning a
 * one-line change.
 */

export const DURATION = {
  /** Micro-interactions: hover, focus, state changes. */
  micro: 0.25,
  /** Standard UI transition. */
  base: 0.6,
  /** Section-level reveals. */
  reveal: 1.1,
  /** Full-screen transitions, page loader. */
  cinematic: 1.4,
} as const;

export const EASE = {
  /** Signature ease — confident arrival, no bounce. */
  out: "power3.out",
  /** For things leaving the screen. */
  in: "power3.in",
  inOut: "power3.inOut",
  /** Long, luxurious scroll-linked movement. */
  glide: "power2.out",
  /** Magnetic snap-back. */
  magnetic: "elastic.out(1, 0.4)",
  /** Clip-path / mask reveals. */
  reveal: "expo.out",
} as const;

export const STAGGER = {
  tight: 0.04,
  base: 0.08,
  loose: 0.12,
} as const;

/** Standard ScrollTrigger start point: fire when the element is 85% down the viewport. */
export const SCROLL_START = "top 85%";

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Honour the OS "reduce motion" setting. Every animation on the site is gated
 * behind this — accessibility is not optional, and recruiters check for it.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(QUERY).matches;
}

/** True when the device has a precise pointer (mouse / trackpad). */
export function hasFinePointer(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: fine)").matches;
}
