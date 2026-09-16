import type { Localized } from "@/i18n/config";

/* ==========================================================================
   HOME SECTION COPY
   --------------------------------------------------------------------------
   Everything the home page says, in one file, in both languages. Editing the
   site's text never means opening a component.

   Register: third person, impersonal, CV-adjacent. No slogans, no "let's build
   something resilient" — a hiring manager should be able to lift any sentence
   here straight into a shortlist note.
   ========================================================================== */

export interface TerminalLine {
  text: string;
  tone: "cmd" | "ok" | "dim" | "warn";
}

/* -------------------------------------------------------------------------- */
/* HERO                                                                        */
/* -------------------------------------------------------------------------- */

export const hero = {
  eyebrow: {
    en: "Portfolio",
    it: "Portfolio",
  } as Localized<string>,
  role: {
    en: "DevOps & System Engineer",
    it: "DevOps & System Engineer",
  } as Localized<string>,
  intro: {
    en: "DevOps and System Engineer with a degree in Computer Science and two Microsoft Azure certifications. Specialised in hybrid infrastructure — Linux and Windows, cloud and on-prem — with a focus on automation, monitoring and disaster recovery.",
    it: "DevOps e System Engineer, laureato in Informatica, con due certificazioni Microsoft Azure. Specializzato in infrastrutture ibride — Linux e Windows, cloud e on-prem — con focus su automazione, monitoraggio e disaster recovery.",
  } as Localized<string>,
  /** The prominent availability banner. */
  availability: {
    en: "Open to new opportunities",
    it: "Disponibile per nuove opportunità",
  } as Localized<string>,
  availabilityNote: {
    en: "DevOps, Cloud or Platform Engineering roles",
    it: "Ruoli DevOps, Cloud o Platform Engineering",
  } as Localized<string>,
  ctaPrimary: {
    en: "See my work",
    it: "Guarda i progetti",
  } as Localized<string>,
  ctaSecondary: {
    en: "Get in touch",
    it: "Scrivimi",
  } as Localized<string>,
  /** Checkable credentials, not adjectives. Verifiable on Microsoft Learn. */
  credentials: [
    {
      en: "Azure Solutions Architect Expert",
      it: "Azure Solutions Architect Expert",
    },
    {
      en: "Azure Administrator Associate",
      it: "Azure Administrator Associate",
    },
  ] as Localized<string>[],
  /** Hint under the hero visual, prompting the first scroll. */
  scrollHint: {
    en: "Scroll to explore",
    it: "Scorri per esplorare",
  } as Localized<string>,
  /** A short, factual terminal transcript. Not a claim about any live system. */
  terminal: [
    { text: "systemctl status platform.service", tone: "cmd" },
    { text: "Active: active (running) since 214d ago", tone: "ok" },
    { text: "Load: 0.42 0.38 0.35   Memory: 41% of 64G", tone: "dim" },
    { text: "terraform plan -out=tfplan", tone: "cmd" },
    { text: "Plan: 3 to add, 0 to change, 0 to destroy.", tone: "ok" },
    { text: "no drift detected · state reconciled", tone: "dim" },
  ] as TerminalLine[],
};

/* -------------------------------------------------------------------------- */
/* SKILLS                                                                      */
/* -------------------------------------------------------------------------- */

export const skills = {
  eyebrow: { en: "Toolkit", it: "Competenze" } as Localized<string>,
  title: { en: "What I work with", it: "Con cosa lavoro" } as Localized<string>,
  note: {
    en: "Grouped by what it is for, not by how impressive it sounds. Everything here is in use, not aspirational.",
    it: "Raggruppate per a cosa servono, non per quanto suonano bene. Tutto quello che c'è qui è in uso, non aspirazionale.",
  } as Localized<string>,
};

/* -------------------------------------------------------------------------- */
/* PIPELINE DIAGRAM                                                            */
/* -------------------------------------------------------------------------- */

export const pipeline = {
  eyebrow: { en: "How I work", it: "Come lavoro" } as Localized<string>,
  headline: {
    en: "From commit to production",
    it: "Dalla commit alla produzione",
  } as Localized<string>,
  stages: [
    { id: "commit", label: "commit", sub: "git" },
    { id: "build", label: "build", sub: "docker" },
    { id: "test", label: "test", sub: "pytest" },
    { id: "scan", label: "scan", sub: "trivy" },
    { id: "deploy", label: "deploy", sub: "kubernetes" },
    { id: "observe", label: "observe", sub: "nagios" },
  ],
  lanes: [
    { id: "ci", label: "CI", token: "--color-signal" },
    { id: "cd", label: "CD", token: "--color-accent" },
    { id: "ops", label: "OPS", token: "--color-live" },
  ],
  stack: [
    "Docker",
    "Kubernetes",
    "Terraform",
    "Ansible",
    "Azure",
    "GitLab CI",
    "Bash",
    "Nagios",
  ],
};
