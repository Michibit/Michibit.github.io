"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";

import { ArrowIcon, MagneticButton } from "@/components/ui/MagneticButton";
import { site } from "@/content/profile";
import { hero } from "@/content/sections";
import { useLocalTime } from "@/hooks/useLocalTime";
import { useLanguage } from "@/i18n/provider";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { useIntro } from "@/providers/IntroProvider";

/* ==========================================================================
   HERO
   --------------------------------------------------------------------------
   The first thing anyone sees, and it has to answer one question immediately:
   whose portfolio is this? So the headline is the name, not a slogan, and the
   supporting line says what the person actually does.

   No pinning here on purpose. The hero plays once, on a normal timeline, cued
   by the preloader — the visitor scrolls when they want to, not when the page
   decides for them.

   The typing effect is a monospace trick worth knowing: instead of splitting
   every terminal line into ~40 character spans and staggering them (hundreds of
   DOM nodes and tweens), each line is wiped in with a `clip-path` inset. Because
   a monospace face sits on a uniform character grid, a linear wipe is visually
   indistinguishable from typing — for the cost of six tweens on a
   compositor-accelerated property.
   ========================================================================== */

const NODE_ROWS = 5;
const NODE_COLS = 7;

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const { revealed } = useIntro();
  const { lang } = useLanguage();
  const time = useLocalTime(site.timeZone);

  const eyebrow = hero.eyebrow[lang];
  const role = hero.role[lang];
  const intro = hero.intro[lang];

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      const pick = <T extends Element>(selector: string) =>
        Array.from(el.querySelectorAll<T>(selector));

      const nameLines = pick<HTMLElement>("[data-hero-name]");
      const rack = pick<HTMLElement>("[data-hero-rack]");
      const nodes = pick<HTMLElement>("[data-hero-node]");
      const termLines = pick<HTMLElement>("[data-hero-line]");
      const sub = pick<HTMLElement>("[data-hero-sub]");
      const introText = pick<HTMLElement>("[data-hero-intro]");
      const chips = pick<HTMLElement>("[data-hero-chip]");
      const ctas = pick<HTMLElement>("[data-hero-cta]");

      // Reduced motion: the hero is simply present and readable from frame one.
      if (prefersReducedMotion()) {
        gsap.set([...nameLines, ...rack, ...nodes, ...sub, ...introText, ...chips, ...ctas], {
          autoAlpha: 1,
          clearProps: "transform,clipPath",
        });
        gsap.set(termLines, { clipPath: "none" });
        return;
      }

      // Establish the hidden state explicitly. `set` + `to` rather than a paused
      // `from`, so re-running this effect when the intro hands over cannot
      // record the hidden values as its target.
      gsap.set(nameLines, { yPercent: 115, opacity: 0 });
      gsap.set(rack, { autoAlpha: 0, scale: 0.94, filter: "blur(10px)" });
      gsap.set(nodes, { autoAlpha: 0, scale: 0.4 });
      gsap.set(termLines, { clipPath: "inset(0 100% 0 0)" });
      gsap.set([...sub, ...introText, ...chips, ...ctas], { autoAlpha: 0, y: 16 });

      // Wait for the preloader curtain to start lifting.
      if (!revealed) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(rack, { autoAlpha: 1, scale: 1, filter: "blur(0px)", duration: 0.9 }, 0)
        .to(nodes, {
          autoAlpha: 1,
          scale: 1,
          duration: 0.5,
          stagger: { each: 0.014, from: "start" },
        }, 0.15)
        .to(termLines, {
          clipPath: "inset(0 -1% 0 0)",
          duration: 0.45,
          stagger: 0.13,
        }, 0.2)
        .to(nameLines, { yPercent: 0, opacity: 1, duration: 1, stagger: 0.12 }, 0.35)
        .to(sub, { autoAlpha: 1, y: 0, duration: 0.6 }, "-=0.6")
        .to(introText, { autoAlpha: 1, y: 0, duration: 0.7 }, "-=0.45")
        .to(chips, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.08 }, "-=0.5")
        .to(ctas, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.1 }, "-=0.45");

      return () => tl.kill();
    },
    { scope: root, dependencies: [revealed] },
  );

  return (
    <section
      ref={root}
      id="top"
      aria-label={eyebrow}
      className="relative flex min-h-svh items-center overflow-hidden pb-20 pt-32 sm:pt-36"
    >
      {/* ---- Ambient backdrop ------------------------------------------- */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            opacity: "var(--decor-opacity)",
            backgroundImage:
              "linear-gradient(to right, var(--color-line-soft) 1px, transparent 1px), linear-gradient(to bottom, var(--color-line-soft) 1px, transparent 1px)",
            backgroundSize: "clamp(2.5rem, 5vw, 5rem) clamp(2.5rem, 5vw, 5rem)",
            maskImage:
              "radial-gradient(ellipse 80% 60% at 32% 46%, black 8%, transparent 74%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 60% at 32% 46%, black 8%, transparent 74%)",
          }}
        />
        <div
          className="absolute left-[4%] top-[8%] h-[32rem] w-[32rem] rounded-full blur-[140px]"
          style={{
            opacity: "calc(var(--decor-opacity) * 0.12)",
            background:
              "radial-gradient(circle, var(--color-accent) 0%, transparent 68%)",
          }}
        />
      </div>

      <div className="shell grid w-full items-center gap-12 lg:grid-cols-12 lg:gap-10">
        {/* ---- Left: the name and the pitch ------------------------------ */}
        <div className="lg:col-span-7">
          <p data-hero-sub="" className="eyebrow mb-6">
            {eyebrow}
          </p>

          {/* The name IS the headline. Each line gets its own overflow mask so
              it rises out of nothing rather than fading in. */}
          <h1 className="font-display text-giant uppercase leading-[0.9] tracking-[-0.035em] text-chalk">
            {site.nameLines.map((line, index) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <span data-hero-name="" className="block">
                  {line}
                  {/* Each line is a block, so this space is invisible — but it
                      keeps the heading readable as "Michele Menzione" rather
                      than "MicheleMenzione" for screen readers. */}
                  {index < site.nameLines.length - 1 ? " " : ""}
                </span>
              </span>
            ))}
          </h1>

          {/* Role, place and local time on one technical line. */}
          <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-label uppercase tracking-[0.14em]">
            <span className="text-accent">{role}</span>
            <span aria-hidden="true" className="text-line">
              ·
            </span>
            <span className="text-mute">{site.location}</span>
            <span aria-hidden="true" className="text-line">
              ·
            </span>
            <span className="text-faint">{time ?? "--:--"} CET</span>
          </p>

          <p data-hero-intro="" className="mt-6 max-w-[56ch] text-lead text-mute">
            {intro}
          </p>

          {/* Availability, given the weight it deserves. A visitor who is
              hiring should see this before they have to look for it. */}
          <div
            data-hero-chip=""
            className="glow-accent mt-9 inline-flex flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl border border-accent/50 bg-ink/70 px-5 py-4 backdrop-blur-sm"
          >
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
            </span>
            <span className="flex flex-col gap-0.5">
              <span className="font-display text-base uppercase leading-none tracking-tight text-chalk">
                {hero.availability[lang]}
              </span>
              <span className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-mute">
                {hero.availabilityNote[lang]}
              </span>
            </span>
          </div>

          {/* Certifications: checkable on Microsoft Learn, so they earn their
              place in the first screen. */}
          <ul className="mt-5 flex flex-wrap gap-2">
            {hero.credentials.map((credential) => (
              <li key={credential.en}>
                <span
                  data-hero-chip=""
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-ink/60 px-3 py-1.5 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-mute backdrop-blur-sm"
                >
                  <span className="h-1 w-1 rounded-full bg-accent" />
                  {credential[lang]}
                </span>
              </li>
            ))}
          </ul>

          <div data-hero-cta="" className="mt-9 flex flex-wrap items-center gap-3">
            <MagneticButton href="#work" variant="solid" size="lg" icon={<ArrowIcon />}>
              {hero.ctaPrimary[lang]}
            </MagneticButton>
            <MagneticButton href="#contact" variant="outline" size="lg">
              {hero.ctaSecondary[lang]}
            </MagneticButton>
          </div>
        </div>

        {/* ---- Right: terminal + node mesh ------------------------------- */}
        <div className="hidden lg:col-span-5 lg:block">
          <div data-hero-rack="" className="relative">
            <div className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-ink/85 backdrop-blur-md">
              <div className="flex items-center gap-2 border-b border-line-soft px-4 py-2.5">
                <span className="h-2 w-2 rounded-full bg-live" />
                <span className="h-2 w-2 rounded-full bg-line" />
                <span className="h-2 w-2 rounded-full bg-line" />
                <span className="ml-2 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-faint">
                  mmenzione@platform — bash
                </span>
                <span
                  aria-hidden="true"
                  className="ml-auto h-3 w-1.5 animate-pulse bg-accent"
                />
              </div>

              <div className="flex flex-col gap-1.5 px-4 py-4 font-mono text-[0.6875rem] leading-relaxed">
                {hero.terminal.map((line) => (
                  <p
                    key={line.text}
                    data-hero-line=""
                    className={cn(
                      "whitespace-nowrap",
                      line.tone === "cmd" && "text-chalk",
                      line.tone === "ok" && "text-live",
                      line.tone === "warn" && "text-signal",
                      line.tone === "dim" && "text-faint",
                    )}
                  >
                    {line.tone === "cmd" && <span className="mr-2 text-accent">➜</span>}
                    {line.text}
                  </p>
                ))}
              </div>
            </div>

            {/* Node mesh — a quiet nod to the topology, not a gimmick. */}
            <div
              className="mt-4 grid gap-1.5"
              style={{ gridTemplateColumns: `repeat(${NODE_COLS}, minmax(0, 1fr))` }}
              aria-hidden="true"
            >
              {Array.from({ length: NODE_ROWS * NODE_COLS }).map((_, index) => (
                <span
                  key={index}
                  data-hero-node=""
                  className={cn(
                    "aspect-square rounded-[3px] border",
                    index % 11 === 0
                      ? "border-accent/50 bg-accent/20"
                      : index % 5 === 0
                        ? "border-signal/35 bg-signal/10"
                        : "border-line bg-slate/60",
                  )}
                />
              ))}
            </div>

            <p className="mt-3 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-faint">
              {hero.scrollHint[lang]}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
