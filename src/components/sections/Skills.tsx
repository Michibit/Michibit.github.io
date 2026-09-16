"use client";

import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import { stackGroups } from "@/content/profile";
import { skills } from "@/content/sections";
import { useLanguage } from "@/i18n/provider";

/* ==========================================================================
   SKILLS
   --------------------------------------------------------------------------
   The toolkit, grouped by purpose.

   Deliberately not a wall of logos: a logo grid says "I have seen these", while
   a grouping says "I know which of these belongs in which job". The groups also
   give a recruiter scanning for one keyword (Ansible, VMware, Nagios) a place to
   find it in two seconds.
   ========================================================================== */

export function Skills() {
  const { lang } = useLanguage();

  return (
    <section
      id="skills"
      className="relative scroll-mt-24 border-t border-line-soft py-24 sm:py-32"
    >
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal y={16} duration={0.7} className="mb-6">
              <span className="eyebrow">{skills.eyebrow[lang]}</span>
            </Reveal>
            <RevealText
              as="h2"
              split="lines"
              className="font-display text-giant uppercase text-chalk"
            >
              {skills.title[lang]}
            </RevealText>
          </div>

          <Reveal y={24} delay={0.1} className="lg:col-span-5 lg:pb-3 lg:text-right">
            <p className="max-w-[44ch] text-mute lg:ml-auto">{skills.note[lang]}</p>
          </Reveal>
        </div>

        <Reveal
          as="dl"
          stagger={0.08}
          y={34}
          className="mt-14 grid gap-y-10 sm:mt-16 lg:grid-cols-2 lg:gap-x-16"
        >
          {stackGroups.map((group) => (
            <div
              key={group.id}
              className="flex flex-col gap-3 border-t border-line-soft pt-5"
            >
              <dt className="font-mono text-label uppercase tracking-[0.14em] text-accent">
                {group.label[lang]}
              </dt>
              <dd className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-line px-3 py-1.5 text-sm text-chalk transition-colors duration-300 hover:border-accent"
                  >
                    {item}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
