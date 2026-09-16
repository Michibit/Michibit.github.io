"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

/**
 * Register every GSAP plugin exactly once, at module scope.
 *
 * Re-registering on every component mount is a classic source of duplicated
 * ScrollTrigger instances and janky scroll. Import `gsap` from *here* in
 * components, never from the package directly, so the side effect always runs.
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  // Mobile browsers fire a resize when the URL bar hides/shows. Without this,
  // ScrollTrigger recalculates every start/end and the page visibly jumps.
  ScrollTrigger.config({ ignoreMobileResize: true });

  // `autoRefreshEvents` defaults include "load"; fonts arriving later shift the
  // layout, so we refresh manually once fonts are ready (see the provider).
  gsap.defaults({ ease: "power3.out", duration: 0.9 });
}

export { gsap, ScrollTrigger, SplitText };
