"use client";

import type { ReactNode } from "react";

import { LanguageProvider } from "@/i18n/provider";
import { IntroProvider } from "@/providers/IntroProvider";
import { SmoothScrollProvider } from "@/providers/SmoothScrollProvider";

/**
 * Provider order matters — each layer depends on the one above it.
 *
 * 1. IntroProvider — owns the `loading → revealing → done` state machine for the
 *    page loader. Outermost because the scroll provider reads its phase to
 *    decide whether the page is scrollable, and because the hero's entrance is
 *    gated on it.
 * 2. SmoothScrollProvider — creates Lenis, registers ScrollTrigger, drives the
 *    shared rAF loop, and locks/unlocks scrolling from the intro phase.
 * 3. LanguageProvider — UI copy and `<html lang>`. Independent of the two
 *    above; kept innermost so a language change re-renders content only.
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <IntroProvider>
      <SmoothScrollProvider>
        <LanguageProvider>{children}</LanguageProvider>
      </SmoothScrollProvider>
    </IntroProvider>
  );
}
