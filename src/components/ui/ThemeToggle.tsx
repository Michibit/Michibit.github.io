"use client";

import { useEffect, useSyncExternalStore } from "react";

import { cn } from "@/lib/utils";
import { themeStore } from "@/lib/theme-store";

/* ==========================================================================
   THEME TOGGLE
   --------------------------------------------------------------------------
   A real switch, not a button that happens to change colours: `role="switch"`
   with `aria-checked` means a screen reader announces "Light mode, switch,
   on/off" instead of leaving the visitor to guess what an icon does.

   The initial DOM state is written by the bootstrap script in the root layout
   before first paint; this component only reads the store and re-syncs once on
   mount, so there is no flash and no hydration mismatch.
   ========================================================================== */

export function ThemeToggle({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  const theme = useSyncExternalStore(
    themeStore.subscribe,
    themeStore.getSnapshot,
    themeStore.getServerSnapshot,
  );

  // Reconcile the DOM with the stored preference once, after hydration.
  useEffect(() => {
    themeStore.sync();
  }, []);

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={!isDark}
      aria-label={label}
      onClick={() => themeStore.toggle()}
      className={cn(
        "group relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border border-line bg-slate",
        "transition-colors duration-500 hover:border-accent",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        className,
      )}
    >
      {/* Thumb carries the icon, so the active state is legible without colour. */}
      <span
        className={cn(
          "absolute flex h-[1.125rem] w-[1.125rem] items-center justify-center rounded-full bg-accent text-void",
          "transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isDark ? "translate-x-[0.2rem]" : "translate-x-[1.5rem]",
        )}
      >
        <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" aria-hidden="true">
          {isDark ? (
            // Moon
            <path
              d="M9.6 7.4A4.2 4.2 0 0 1 4.6 2.4a4.3 4.3 0 1 0 5 5Z"
              fill="currentColor"
            />
          ) : (
            // Sun
            <>
              <circle cx="6" cy="6" r="2.4" fill="currentColor" />
              <path
                d="M6 .8v1.4M6 9.8v1.4M.8 6h1.4M9.8 6h1.4M2.3 2.3l1 1M8.7 8.7l1 1M9.7 2.3l-1 1M3.3 8.7l-1 1"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
              />
            </>
          )}
        </svg>
      </span>
    </button>
  );
}
