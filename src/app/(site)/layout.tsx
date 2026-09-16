import type { ReactNode } from "react";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Grain } from "@/components/ui/Grain";

/**
 * Layout for the public site.
 *
 * Keeping the chrome in a route group rather than the root layout means internal
 * artifacts — the style tile, future lab pages — render bare, without a nav and
 * footer they have no use for. URLs are unaffected by the parenthesised folder.
 */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Keyboard users skip straight past the fixed header. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-400 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-label focus:uppercase focus:tracking-[0.14em] focus:text-void"
      >
        Skip to content
      </a>

      <Grain />
      <Header />

      <main id="main">{children}</main>

      <Footer />
    </>
  );
}
