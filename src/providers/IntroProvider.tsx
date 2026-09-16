"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/* ==========================================================================
   INTRO PROVIDER
   --------------------------------------------------------------------------
   Owns the page-load choreography gate.

   phase: "loading"   → the curtain is covering everything, page is inert
          "revealing" → the curtain is lifting; the hero starts animating now,
                        which is what makes the reveal feel like one motion
                        instead of two waits in a row
          "done"      → curtain gone, scroll unlocked, triggers recalculated

   Deliberately effect-free: this is a plain state machine, so it exposes
   nothing that can cascade a render. It sits *outside* the scroll provider
   because the scroll provider reads `phase` to decide whether to lock Lenis.
   ========================================================================== */

export type IntroPhase = "loading" | "revealing" | "done";

interface IntroContextValue {
  phase: IntroPhase;
  /** True from the instant the curtain starts lifting — the hero's cue. */
  revealed: boolean;
  /** True when everything has settled. */
  complete: boolean;
  /** Called by the Preloader once assets are ready and the exit should begin. */
  beginReveal: () => void;
  /** Called by the Preloader when its exit animation has finished. */
  finish: () => void;
}

const IntroContext = createContext<IntroContextValue | null>(null);

export function IntroProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<IntroPhase>("loading");

  const beginReveal = useCallback(() => {
    setPhase((current) => (current === "loading" ? "revealing" : current));
  }, []);

  const finish = useCallback(() => setPhase("done"), []);

  const value = useMemo<IntroContextValue>(
    () => ({
      phase,
      revealed: phase !== "loading",
      complete: phase === "done",
      beginReveal,
      finish,
    }),
    [phase, beginReveal, finish],
  );

  return <IntroContext.Provider value={value}>{children}</IntroContext.Provider>;
}

export function useIntro(): IntroContextValue {
  const ctx = useContext(IntroContext);
  if (!ctx) {
    throw new Error("useIntro must be used inside <IntroProvider>.");
  }
  return ctx;
}
