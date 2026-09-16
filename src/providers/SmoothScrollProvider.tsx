"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";

import { ScrollTrigger, gsap } from "@/lib/gsap";
import { createLenis, type LenisInstance } from "@/lib/lenis";
import { prefersReducedMotion } from "@/lib/motion";
import { useIntro } from "@/providers/IntroProvider";

/* ==========================================================================
   SMOOTH SCROLL PROVIDER
   --------------------------------------------------------------------------
   The one integration that makes or breaks a GSAP + Lenis build.

   Three things have to be true, and skipping any one of them produces the
   classic "scroll feels fine but every animation is one frame behind" bug:

   1. Lenis must NOT run its own requestAnimationFrame loop. We create it with
      `autoRaf: false` and drive `lenis.raf()` from `gsap.ticker`, so the whole
      site shares a single rAF loop. Animations are then sampled against the
      same frame as the scroll position they react to.
   2. Every Lenis scroll event must call `ScrollTrigger.update()`, otherwise
      ScrollTrigger's cached scroll position drifts from the real one.
   3. `gsap.ticker.lagSmoothing(0)` — GSAP's default lag smoothing advances time
      in jumps after a slow frame, which with Lenis shows up as a visible hitch.

   This provider sits *inside* `IntroProvider` and reads the intro phase to
   decide whether the page is scrollable, so lock state has a single owner and
   no component needs to mirror provider readiness into React state.
   ========================================================================== */

export type ScrollTarget = string | number | HTMLElement | null;

export interface ScrollToOptions {
  offset?: number;
  duration?: number;
  /** Skip the glide and jump immediately. */
  immediate?: boolean;
  onComplete?: () => void;
}

interface SmoothScrollContextValue {
  scrollTo: (target: ScrollTarget, options?: ScrollToOptions) => void;
  stop: () => void;
  start: () => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue | null>(null);

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const { phase } = useIntro();
  const lenisRef = useRef<LenisInstance | null>(null);

  /* ---- Create Lenis and wire it to GSAP + ScrollTrigger ------------------ */
  useEffect(() => {
    // Users who ask for reduced motion get the browser's native scroll, and
    // every scroll-linked animation stays on its static end state.
    if (prefersReducedMotion()) return;

    const lenis = createLenis();
    lenisRef.current = lenis;

    const handleScroll = () => ScrollTrigger.update();
    lenis.on("scroll", handleScroll);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Web fonts land after first paint and move everything. Recalculate all
    // trigger positions once they are in, or every start/end is off by a heading.
    let cancelled = false;
    const refresh = () => {
      if (!cancelled) ScrollTrigger.refresh();
    };

    if (typeof document !== "undefined" && "fonts" in document) {
      if (document.fonts.status === "loaded") refresh();
      else void document.fonts.ready.then(refresh).catch(() => undefined);
    }

    return () => {
      cancelled = true;
      gsap.ticker.remove(tick);
      lenis.off("scroll", handleScroll);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  /* ---- Lock the page while the curtain is up ---------------------------- */
  useEffect(() => {
    // Declared after the creation effect above, so on mount `lenisRef.current`
    // is already populated and the lock actually applies.
    const lenis = lenisRef.current;

    if (phase === "done") {
      lenis?.start();
      document.documentElement.style.overflow = "";
      // The curtain changed the document's height; every trigger is now stale.
      ScrollTrigger.refresh();
      return;
    }

    lenis?.stop();
    // Fallback for the no-Lenis path (reduced motion).
    if (!lenis) document.documentElement.style.overflow = "hidden";
  }, [phase]);

  const scrollTo = useCallback<SmoothScrollContextValue["scrollTo"]>(
    (target, options = {}) => {
      const { offset = 0, duration = 1.2, immediate = false, onComplete } = options;
      const lenis = lenisRef.current;

      if (lenis && target !== null) {
        lenis.scrollTo(target, {
          offset,
          duration: immediate ? 0 : duration,
          onComplete,
        });
        return;
      }

      // Fallback path: home in on the element and let the browser jump.
      const element =
        typeof target === "string"
          ? document.querySelector<HTMLElement>(target)
          : target instanceof HTMLElement
            ? target
            : null;

      if (element) {
        const top = element.getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo({ top, behavior: immediate ? "auto" : "smooth" });
      } else if (typeof target === "number") {
        window.scrollTo({ top: target, behavior: immediate ? "auto" : "smooth" });
      }
      onComplete?.();
    },
    [],
  );

  const stop = useCallback(() => {
    lenisRef.current?.stop();
    if (!lenisRef.current) document.documentElement.style.overflow = "hidden";
  }, []);

  const start = useCallback(() => {
    lenisRef.current?.start();
    document.documentElement.style.overflow = "";
  }, []);

  /**
   * Delegate every in-page anchor click to Lenis.
   *
   * A single document-level listener means `<a href="#work">` gets the same
   * glide as the wheel everywhere on the site — including inside components
   * that know nothing about scroll — with no per-link wiring and no prop
   * drilling. Modified clicks (new tab, middle-click) are left to the browser.
   */
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest('a[href^="#"]');
      if (!(anchor instanceof HTMLAnchorElement)) return;

      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;

      const element = document.getElementById(hash.slice(1));
      if (!element) return;

      event.preventDefault();
      scrollTo(`#${hash.slice(1)}`, { offset: -72 });
      // Keep the URL shareable without letting the browser jump the page.
      window.history.pushState(null, "", hash);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [scrollTo]);

  // All three members are stable callbacks, so this value never changes and the
  // context never re-renders its consumers.
  const value = useMemo<SmoothScrollContextValue>(
    () => ({ scrollTo, stop, start }),
    [scrollTo, stop, start],
  );

  return (
    <SmoothScrollContext.Provider value={value}>
      {children}
    </SmoothScrollContext.Provider>
  );
}

export function useSmoothScroll(): SmoothScrollContextValue {
  const ctx = useContext(SmoothScrollContext);
  if (!ctx) {
    throw new Error("useSmoothScroll must be used inside <SmoothScrollProvider>.");
  }
  return ctx;
}
