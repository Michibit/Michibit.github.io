"use client";

import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import { projects, type Project } from "@/content/projects";
import { getDictionary } from "@/i18n/dictionary";
import { useLanguage } from "@/i18n/provider";
import type { Lang } from "@/i18n/config";
import { cn, pad } from "@/lib/utils";

/* ==========================================================================
   WORK INDEX
   --------------------------------------------------------------------------
   A compact editorial index of the featured case studies.

   Every row reveals on entry with `once: true`, so triggers deregister
   themselves as the visitor scrolls past instead of accumulating. Hovering a row
   wipes an accent rule in from the left and lifts the title — enough to signal
   that the row is a thing you engage with, without a scroll trick.

   The rows are intentionally not links yet: the case-study route does not exist,
   and a dead link is worse than a plain one.
   ========================================================================== */

export function WorkIndex() {
  const { lang } = useLanguage();
  const dict = getDictionary(lang);

  return (
    <section
      id="work"
      className="relative scroll-mt-24 border-t border-line-soft py-24 sm:py-32"
    >
      <div className="shell">
        {/* ---- Section header --------------------------------------------- */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal y={16} duration={0.7} className="mb-6">
              <span className="eyebrow">{dict.work.eyebrow}</span>
            </Reveal>

            <RevealText
              as="h2"
              split="lines"
              className="text-giant font-display uppercase text-chalk"
            >
              {dict.work.title}
            </RevealText>
          </div>

          <Reveal
            y={24}
            delay={0.1}
            className="lg:col-span-5 lg:pb-3 lg:text-right"
          >
            <p className="max-w-[46ch] text-mute lg:ml-auto">
              {dict.work.description}
            </p>
          </Reveal>
        </div>

        {/* ---- Index ------------------------------------------------------ */}
        <ol className="mt-16 border-t border-line-soft sm:mt-20">
          {projects.map((project, index) => (
            <WorkRow
              key={project.id}
              project={project}
              index={index}
              lang={lang}
              stackLabel={dict.work.stack}
            />
          ))}
        </ol>

        <Reveal
          y={20}
          className="mt-10 flex items-center gap-4 font-mono text-label uppercase tracking-[0.14em] text-faint"
        >
          <span className="h-px flex-1 bg-line-soft" />
          {dict.work.empty}
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

function WorkRow({
  project,
  index,
  lang,
  stackLabel,
}: {
  project: Project;
  index: number;
  lang: Lang;
  stackLabel: string;
}) {
  return (
    <Reveal
      as="li"
      self
      y={40}
      duration={1.1}
      className={cn(
        "group relative border-b border-line-soft",
        "transition-colors duration-500 hover:bg-slate/40",
      )}
    >
      {/* Accent rule that wipes in from the left on hover. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
      />

      <div className="grid grid-cols-1 gap-x-6 gap-y-4 px-1 py-8 sm:py-10 lg:grid-cols-12 lg:items-baseline">
        {/* Index */}
        <span className="font-mono text-label uppercase tracking-[0.14em] text-faint transition-colors duration-500 group-hover:text-accent lg:col-span-1">
          {pad(index + 1)}
        </span>

        {/* Title + meta */}
        <div className="lg:col-span-6">
          <h3 className="text-huge font-display uppercase leading-[1.02] tracking-tight text-chalk transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2">
            {project.title[lang]}
          </h3>

          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-label uppercase tracking-[0.14em] text-mute">
            <span>{project.client[lang]}</span>
            <span className="text-line">·</span>
            <span>{project.role[lang]}</span>
            {project.confidential && (
              <span className="rounded-full border border-line px-2 py-0.5 text-faint">
                NDA
              </span>
            )}
          </div>
        </div>

        {/* Summary */}
        <p className="max-w-[46ch] text-sm leading-relaxed text-mute lg:col-span-3">
          {project.summary[lang]}
        </p>

        {/* Year + stack */}
        <div className="flex flex-col gap-2 lg:col-span-2 lg:items-end lg:text-right">
          <span className="font-mono text-label uppercase tracking-[0.14em] text-chalk">
            {project.year}
          </span>
          <span
            className="font-mono text-[0.625rem] uppercase leading-relaxed tracking-[0.1em] text-faint"
            title={stackLabel}
          >
            {project.stack.slice(0, 3).join(" · ")}
          </span>
        </div>
      </div>
    </Reveal>
  );
}
