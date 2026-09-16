"use client";

import { ArrowIcon, MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import { certifications, site } from "@/content/profile";
import { getDictionary } from "@/i18n/dictionary";
import { useLanguage } from "@/i18n/provider";
import { cn } from "@/lib/utils";

/* ==========================================================================
   FOOTER
   --------------------------------------------------------------------------
   Doubles as the contact section, so the page has a single, unmissable
   conversion point at the end of the scroll rather than a dead stop.
   ========================================================================== */

export function Footer() {
  const { lang } = useLanguage();
  const dict = getDictionary(lang);

  return (
    <footer
      id="contact"
      className="relative border-t border-line-soft pb-10 pt-24 sm:pt-32"
    >
      <div className="shell flex flex-col gap-20">
        {/* ---- Contact ----------------------------------------------------- */}
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal y={16} duration={0.7} className="mb-8">
              <span className="eyebrow">{dict.contact.eyebrow}</span>
            </Reveal>

            <RevealText
              as="h2"
              split="lines"
              className="text-giant font-display uppercase text-chalk"
            >
              {dict.contact.title}
            </RevealText>
          </div>

          <Reveal
            y={28}
            delay={0.1}
            className="flex flex-col justify-end gap-6 lg:col-span-5"
          >
            <p className="max-w-[42ch] text-mute">{dict.contact.lead}</p>

            <div className="flex flex-wrap items-center gap-3">
              <MagneticButton
                href={`mailto:${site.email}`}
                variant="solid"
                size="lg"
                icon={<ArrowIcon />}
              >
                {dict.contact.emailCta}
              </MagneticButton>

              <MagneticButton href={site.cvUrl} variant="outline" size="lg">
                {dict.contact.cvCta}
              </MagneticButton>
            </div>
          </Reveal>
        </div>

        {/* ---- Credentials + elsewhere ------------------------------------- */}
        <div className="grid gap-10 border-t border-line-soft pt-10 lg:grid-cols-12">
          <Reveal y={24} className="lg:col-span-6">
            <span className="eyebrow">{dict.certifications.eyebrow}</span>
            <ul className="mt-5 flex flex-wrap gap-2.5">
              {certifications.map((cert) => (
                <li key={cert.id}>
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={cn(
                      "group inline-flex items-center gap-2 rounded-full border px-3.5 py-2",
                      "font-mono text-[0.6875rem] uppercase tracking-[0.1em]",
                      "transition-colors duration-500",
                      cert.featured
                        ? "border-accent/40 text-accent hover:border-accent hover:bg-accent hover:text-void"
                        : "border-line text-mute hover:border-chalk hover:text-chalk",
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className="h-1 w-1 shrink-0 rounded-full bg-current"
                    />
                    {cert.title}
                    <span className="text-mute group-hover:text-current">
                      · {cert.issuer}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal y={24} delay={0.08} className="lg:col-span-6 lg:text-right">
            <span className="eyebrow">{dict.contact.elsewhere}</span>
            <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3 lg:justify-end">
              {[
                { label: "LinkedIn", href: site.linkedin },
                { label: "GitHub", href: site.github },
                { label: "Email", href: `mailto:${site.email}` },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    {...(/^https?:/.test(link.href)
                      ? { target: "_blank", rel: "noreferrer noopener" }
                      : {})}
                    className="group relative inline-block font-display text-huge uppercase leading-none text-chalk transition-colors duration-500 hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* ---- Colophon ---------------------------------------------------- */}
        <div className="flex flex-col gap-4 border-t border-line-soft pt-8 text-faint sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-label uppercase tracking-[0.14em]">
            © {new Date().getFullYear()} {site.name}. {dict.footer.rights}
          </p>
          <p className="font-mono text-label uppercase tracking-[0.14em]">
            {dict.footer.builtWith}
          </p>
          <a
            href="#top"
            className="group inline-flex items-center gap-2 font-mono text-label uppercase tracking-[0.14em] text-mute transition-colors duration-300 hover:text-accent"
          >
            {dict.footer.backToTop}
            <svg
              viewBox="0 0 12 12"
              className="h-3 w-3 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M6 11V1M2 5l4-4 4 4"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="square"
              />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
