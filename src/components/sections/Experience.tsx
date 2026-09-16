"use client";

import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import { certifications, education, experience } from "@/content/profile";
import type { Lang } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { useLanguage } from "@/i18n/provider";
import { cn, pad } from "@/lib/utils";

/* ==========================================================================
   EXPERIENCE
   --------------------------------------------------------------------------
   The CV, told as a timeline rather than a list of dates.

   This section exists because a cinematic three-scene story is a terrible place
   to look for a candidate's work history. The story earns attention; this
   section answers the question the recruiter actually came with.
   ========================================================================== */

/**
 * Format an ISO month as a readable period.
 *
 * Parsed as an explicit UTC instant rather than from a loose date string, so the
 * output cannot differ between the build machine's time zone and the visitor's
 * and trip a hydration mismatch.
 */
function formatPeriod(
  start: string,
  end: string | null,
  lang: Lang,
  present: string,
): string {
  const formatter = new Intl.DateTimeFormat(lang === "it" ? "it-IT" : "en-GB", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

  const from = formatter.format(new Date(`${start}-01T00:00:00Z`));
  const to = end ? formatter.format(new Date(`${end}-01T00:00:00Z`)) : present;

  return `${from} — ${to}`;
}

export function Experience() {
  const { lang } = useLanguage();
  const dict = getDictionary(lang);

  return (
    <section
      id="experience"
      className="relative scroll-mt-24 border-t border-line-soft py-24 sm:py-32"
    >
      <div className="shell">
        {/* ---- Header ---------------------------------------------------- */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal y={16} duration={0.7} className="mb-6">
              <span className="eyebrow">{dict.experience.eyebrow}</span>
            </Reveal>
            <RevealText
              as="h2"
              split="lines"
              className="font-display text-giant uppercase text-chalk"
            >
              {dict.experience.title}
            </RevealText>
          </div>

          <Reveal y={24} delay={0.1} className="lg:col-span-5 lg:pb-3 lg:text-right">
            <p className="max-w-[44ch] text-mute lg:ml-auto">
              {dict.experience.intro}
            </p>
          </Reveal>
        </div>

        {/* ---- Roles ----------------------------------------------------- */}
        <ol className="mt-16 border-t border-line-soft sm:mt-20">
          {experience.map((role, index) => (
            <Reveal
              as="li"
              self
              y={40}
              duration={1.05}
              key={role.id}
              className="group border-b border-line-soft py-8 transition-colors duration-500 hover:bg-slate/30 sm:py-10"
            >
              <div className="grid gap-x-6 gap-y-4 lg:grid-cols-12">
                <div className="flex items-baseline gap-4 lg:col-span-3">
                  <span className="font-mono text-label uppercase tracking-[0.14em] text-faint">
                    {pad(index + 1)}
                  </span>
                  <span className="font-mono text-[0.6875rem] uppercase leading-relaxed tracking-[0.1em] text-accent">
                    {formatPeriod(role.start, role.end, lang, dict.experience.present)}
                  </span>
                </div>

                <div className="lg:col-span-5">
                  <h3 className="font-display text-huge uppercase leading-[1.05] tracking-tight text-chalk">
                    {role.role[lang]}
                  </h3>
                  <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-label uppercase tracking-[0.12em] text-mute">
                    <span className="text-chalk">{role.company}</span>
                    <span className="text-line">·</span>
                    <span>{role.location}</span>
                    {role.end === null && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-live/40 px-2 py-0.5 text-live">
                        <span className="h-1 w-1 rounded-full bg-live" />
                        {dict.experience.now}
                      </span>
                    )}
                  </p>
                </div>

                <div className="flex flex-col gap-4 lg:col-span-4">
                  <p className="text-sm leading-relaxed text-mute">
                    {role.summary[lang]}
                  </p>
                  <ul className="flex flex-col gap-2">
                    {role.achievements[lang].map((achievement) => (
                      <li
                        key={achievement}
                        className="flex gap-2.5 text-sm leading-relaxed text-faint"
                      >
                        <span aria-hidden="true" className="mt-[0.45em] h-1 w-1 shrink-0 rounded-full bg-accent" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                  <ul className="mt-1 flex flex-wrap gap-1.5">
                    {role.stack.map((tech) => (
                      <li
                        key={tech}
                        className={cn(
                          "rounded-full border border-line px-2.5 py-1",
                          "font-mono text-[0.5625rem] uppercase tracking-[0.1em] text-mute",
                        )}
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>

        {/* ---- Education + credentials ----------------------------------- */}
        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          <Reveal y={30} className="lg:col-span-6">
            <h3 className="eyebrow mb-6">{dict.certifications.eyebrow}</h3>
            <ul className="flex flex-col gap-3">
              {certifications.map((cert) => (
                <li key={cert.id}>
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="glow-accent group flex items-center justify-between gap-4 rounded-xl border border-line bg-ink px-4 py-3.5 transition-colors duration-500 hover:border-accent"
                  >
                    <span className="flex flex-col gap-1">
                      <span className="font-display text-base uppercase tracking-tight text-chalk">
                        {cert.title}
                      </span>
                      <span className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-faint">
                        {cert.issuer}
                      </span>
                    </span>
                    <span className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-accent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      {dict.certifications.verify} ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal y={30} delay={0.08} className="lg:col-span-6">
            <h3 className="eyebrow mb-6">{dict.nav.about}</h3>
            <ul className="flex flex-col gap-4">
              {education.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-col gap-2 rounded-xl border border-line bg-ink px-4 py-3.5"
                >
                  <span className="font-display text-base uppercase tracking-tight text-chalk">
                    {item.qualification[lang]}
                  </span>
                  <span className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-faint">
                    {item.institution} · {item.location}
                  </span>
                  <span className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-accent">
                    {formatPeriod(item.start, item.end, lang, dict.experience.present)}
                    {item.grade ? ` · ${item.grade}` : ""}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
