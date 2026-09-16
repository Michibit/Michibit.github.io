"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";

import { ArrowIcon, MagneticButton } from "@/components/ui/MagneticButton";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { site, navLinks } from "@/content/profile";
import { useLocalTime } from "@/hooks/useLocalTime";
import { LANGS, LANG_LABEL, type Lang } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { useLanguage } from "@/i18n/provider";
import { ScrollTrigger, gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { useIntro } from "@/providers/IntroProvider";
import { useSmoothScroll } from "@/providers/SmoothScrollProvider";

/* ==========================================================================
   HEADER
   --------------------------------------------------------------------------
   Scroll behaviour, done the way it should be:

   • Hide on scroll down, reveal on scroll up. The reveal is a *reversible*
     GSAP tween held at progress 1, so flicking the scroll direction mid-way
     reverses smoothly instead of restarting the animation.
   • The "is the page scrolled?" flag is written straight to a data attribute on
     the <header> element rather than to React state. Toggling state on every
     scroll event would re-render this subtree dozens of times a second for a
     purely cosmetic change.
   ========================================================================== */

const REVEAL_THRESHOLD = 220;

export function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const { revealed, complete } = useIntro();
  const { lang, setLang } = useLanguage();
  const { stop, start } = useSmoothScroll();
  const dict = getDictionary(lang);
  const time = useLocalTime(site.timeZone);

  const [menuOpen, setMenuOpen] = useState(false);
  const menuMountedRef = useRef(false);

  /* ---- Entrance --------------------------------------------------------- */
  useGSAP(
    () => {
      const header = headerRef.current;
      if (!header) return;

      if (prefersReducedMotion()) {
        gsap.set(header, { autoAlpha: 1, y: 0 });
        return;
      }

      if (!revealed) {
        gsap.set(header, { autoAlpha: 0, y: -24 });
        return;
      }

      gsap.to(header, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.35,
      });
    },
    { dependencies: [revealed] },
  );

  /* ---- Hide on scroll down / show on scroll up --------------------------- */
  useGSAP(
    () => {
      const header = headerRef.current;
      if (!header) return;

      // Reversible reveal. `paused` + `progress(1)` means "already shown".
      const hide = gsap
        .timeline({ paused: true })
        .to(header, { yPercent: -105, duration: 0.4, ease: "power2.inOut" });
      hide.progress(1);

      const trigger = ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const y = self.scroll();
          const scrollingUp = self.direction === -1;

          // Cosmetic state → straight to the DOM, no React re-render.
          header.dataset.scrolled = y > 40 ? "true" : "false";

          if (y < REVEAL_THRESHOLD || scrollingUp) hide.reverse();
          else hide.play();

          // Never hide the bar while the mobile menu is open.
          if (header.dataset.menu === "open") hide.reverse();
        },
      });

      return () => trigger.kill();
    },
    { dependencies: [] },
  );

  /* ---- Mobile menu ------------------------------------------------------ */
  useGSAP(
    () => {
      const panel = menuRef.current;
      if (!panel) return;

      const items = panel.querySelectorAll("[data-menu-item]");

      // On first mount the panel is already hidden — do not run an exit
      // animation against something nobody has seen.
      if (!menuMountedRef.current) {
        menuMountedRef.current = true;
        if (!menuOpen) {
          gsap.set(panel, { autoAlpha: 0, display: "none" });
          return;
        }
      }

      if (menuOpen) {
        gsap.set(panel, { display: "flex" });
        const tl = gsap.timeline();
        tl.fromTo(
          panel,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.28, ease: "power2.out" },
        ).fromTo(
          items,
          { yPercent: 130, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.7,
            ease: "expo.out",
            stagger: 0.055,
          },
          "-=0.1",
        );
        return () => tl.kill();
      }

      const tl = gsap.timeline({
        onComplete: () => gsap.set(panel, { display: "none" }),
      });
      tl.to(items, {
        yPercent: -110,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        stagger: 0.03,
      }).to(panel, { autoAlpha: 0, duration: 0.22 }, "-=0.1");

      return () => tl.kill();
    },
    { dependencies: [menuOpen] },
  );

  /* ---- Lock the page while the menu is open + close on Escape ------------ */
  useEffect(() => {
    if (menuOpen) stop();
    else if (complete) start();
  }, [menuOpen, complete, stop, start]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    if (headerRef.current) {
      headerRef.current.dataset.menu = menuOpen ? "open" : "closed";
    }
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <header
        ref={headerRef}
        data-scrolled="false"
        data-menu="closed"
        className={cn(
          "fixed inset-x-0 top-0 z-150",
          "border-b border-transparent transition-colors duration-500",
          // Glass effect only once the page has actually scrolled.
          "data-[scrolled=true]:border-line-soft data-[scrolled=true]:bg-void/70",
          "data-[scrolled=true]:backdrop-blur-xl data-[scrolled=true]:backdrop-saturate-150",
        )}
      >
        <div className="shell flex h-16 items-center justify-between gap-4 sm:h-20">
          {/* Identity */}
          <a
            href="#top"
            className="group flex items-center gap-3"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-line font-mono text-[0.625rem] tracking-normal text-chalk transition-colors duration-500 group-hover:border-accent group-hover:text-accent">
              {site.initials}
            </span>
            <span className="hidden font-mono text-label uppercase tracking-[0.14em] text-chalk sm:inline">
              {site.name}
            </span>
          </a>

          {/* Primary navigation */}
          <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className="group relative font-mono text-label uppercase tracking-[0.14em] text-mute transition-colors duration-300 hover:text-chalk"
              >
                {dict.nav[link.id]}
                {/* Underline grows from the left on hover. */}
                <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          {/* Utilities */}
          <div className="flex items-center gap-3 sm:gap-5">
            <span
              className="hidden font-mono text-label uppercase tracking-[0.14em] text-faint xl:inline"
              // Fixed width prevents the layout nudging as minutes tick over.
              style={{ minWidth: "7.5ch" }}
            >
              {time ?? "--:--"} <span className="text-mute">CET</span>
            </span>

            <LanguageSwitch current={lang} onChange={setLang} label={dict.nav.language} />

            <ThemeToggle label={dict.nav.theme} />

            <MagneticButton
              href={`mailto:${site.email}`}
              variant="outline"
              size="md"
              strength={0.22}
              className="hidden sm:inline-flex"
              icon={<ArrowIcon />}
            >
              {dict.nav.contact}
            </MagneticButton>

            {/* Mobile trigger */}
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? dict.nav.close : dict.nav.menu}
              className="flex h-9 items-center gap-2 font-mono text-label uppercase tracking-[0.14em] text-chalk md:hidden"
            >
              <span className="relative flex h-3 w-4 flex-col justify-between">
                <span
                  className={cn(
                    "h-px w-full bg-current transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    menuOpen && "translate-y-[5.5px] rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "h-px w-full bg-current transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    menuOpen && "-translate-y-[5.5px] -rotate-45",
                  )}
                />
              </span>
              {menuOpen ? dict.nav.close : dict.nav.menu}
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen mobile menu */}
      <div
        ref={menuRef}
        id="mobile-menu"
        style={{ display: "none" }}
        className="fixed inset-0 z-140 flex-col justify-between bg-void px-6 pb-10 pt-28 md:hidden"
      >
        <nav aria-label="Mobile" className="flex flex-col gap-2">
          {navLinks.map((link) => (
            <div key={link.id} className="overflow-hidden">
              <a
                data-menu-item=""
                href={link.href}
                onClick={closeMenu}
                className="block font-display text-giant uppercase leading-[0.95] tracking-tight text-chalk"
              >
                {dict.nav[link.id]}
              </a>
            </div>
          ))}
        </nav>

        <div data-menu-item="" className="flex flex-col gap-5">
          <div className="h-px w-full bg-line-soft" />
          <a
            href={`mailto:${site.email}`}
            onClick={closeMenu}
            className="font-mono text-label uppercase tracking-[0.14em] text-accent"
          >
            {site.email}
          </a>
          <div className="flex items-center justify-between">
            <span className="font-mono text-label uppercase tracking-[0.14em] text-mute">
              {site.location}
            </span>
            <div className="flex items-center gap-4">
              <LanguageSwitch current={lang} onChange={setLang} label={dict.nav.language} />
              <ThemeToggle label={dict.nav.theme} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* -------------------------------------------------------------------------- */

function LanguageSwitch({
  current,
  onChange,
  label,
}: {
  current: Lang;
  onChange: (lang: Lang) => void;
  label: string;
}) {
  return (
    <div
      className="flex items-center gap-1 font-mono text-label uppercase tracking-[0.14em]"
      role="group"
      aria-label={label}
    >
      {LANGS.map((code, index) => (
        <span key={code} className="flex items-center gap-1">
          {index > 0 && <span className="text-line">/</span>}
          <button
            type="button"
            onClick={() => onChange(code)}
            aria-current={current === code}
            className={cn(
              "transition-colors duration-300",
              current === code ? "text-accent" : "text-mute hover:text-chalk",
            )}
          >
            {LANG_LABEL[code]}
          </button>
        </span>
      ))}
    </div>
  );
}
