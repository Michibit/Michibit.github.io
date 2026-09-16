"use client";

import { PipelineDiagram } from "@/components/sections/PipelineDiagram";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import { getDictionary } from "@/i18n/dictionary";
import { useLanguage } from "@/i18n/provider";
import { pad } from "@/lib/utils";

/* ==========================================================================
   ABOUT — "how I work"
   --------------------------------------------------------------------------
   Four opinions, each one a stance rather than a skill. Lists of technologies
   are everywhere; a paragraph explaining why backups that have never been
   restored are not backups is what separates an engineer from a CV keyword.
   ========================================================================== */

export function About() {
  const { lang } = useLanguage();
  const dict = getDictionary(lang);

  return (
    <section
      id="about"
      className="relative scroll-mt-24 border-t border-line-soft py-24 sm:py-32"
    >
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal y={16} duration={0.7} className="mb-6">
              <span className="eyebrow">{dict.about.eyebrow}</span>
            </Reveal>
            <RevealText
              as="h2"
              split="lines"
              className="max-w-[22ch] font-display text-giant uppercase text-chalk"
            >
              {dict.about.title}
            </RevealText>
          </div>

          <Reveal y={24} delay={0.1} className="lg:col-span-5 lg:pb-3 lg:text-right">
            <p className="max-w-[44ch] text-mute lg:ml-auto">
              {dict.about.intro}
            </p>
          </Reveal>
        </div>

        {/* The pipeline belongs here: it is an illustration of the first rule
            below, not a scroll trick. */}
        <Reveal y={30} className="mt-14 sm:mt-16">
          <PipelineDiagram />
        </Reveal>

        <Reveal
          as="ol"
          stagger={0.1}
          y={44}
          className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:mt-14 lg:grid-cols-2"
        >
          {dict.about.pillars.map((pillar, index) => (
            <li
              key={pillar.title}
              className="group flex flex-col gap-4 bg-ink p-6 transition-colors duration-500 hover:bg-slate/40 sm:p-8"
            >
              <span className="font-mono text-label uppercase tracking-[0.14em] text-accent">
                {pad(index + 1)}
              </span>
              <h3 className="font-display text-2xl uppercase leading-tight tracking-tight text-chalk sm:text-3xl">
                {pillar.title}
              </h3>
              <p className="max-w-[46ch] text-sm leading-relaxed text-mute">
                {pillar.body}
              </p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
