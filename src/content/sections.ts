import type { Localized } from "@/i18n/config";

/* ==========================================================================
  HOME SECTION COPY
  --------------------------------------------------------------------------
  All home page content is defined in this file, with separate English and
  Italian versions. This keeps the page content independent from components.
  ========================================================================== */

export interface TerminalLine {
  text: string;
  tone: "cmd" | "ok" | "dim" | "warn";
}

/* -------------------------------------------------------------------------- */
/* HERO                                                                       */
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
    en: "DevOps and System Engineer with a degree in Computer Science and two Microsoft Azure certifications. Experienced in managing hybrid infrastructures across Linux and Windows environments, both cloud and on-premises, with a focus on automation, monitoring and disaster recovery.",
    it: "DevOps e System Engineer, laureato in Informatica, con due certificazioni Microsoft Azure. Esperienza nella gestione di infrastrutture ibride in ambienti Linux e Windows, sia cloud che on-premises, con particolare attenzione ad automazione, monitoring e disaster recovery.",
  } as Localized<string>,

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
    it: "Scopri i progetti",
  } as Localized<string>,

  ctaSecondary: {
    en: "Get in touch",
    it: "Contattami",
  } as Localized<string>,

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

  scrollHint: {
    en: "Scroll to explore",
    it: "Scorri per esplorare",
  } as Localized<string>,

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
/* SKILLS                                                                     */
/* -------------------------------------------------------------------------- */

export const skills = {
  eyebrow: {
    en: "Toolkit",
    it: "Competenze",
  } as Localized<string>,

  title: {
    en: "What I work with",
    it: "Tecnologie e strumenti",
  } as Localized<string>,

  note: {
    en: "Grouped by purpose rather than by how impressive they sound. The technologies listed here reflect hands-on experience.",
    it: "Organizzate in base al loro utilizzo. Le tecnologie elencate riflettono esperienza pratica.",
  } as Localized<string>,
};

/* -------------------------------------------------------------------------- */
/* PIPELINE DIAGRAM                                                           */
/* -------------------------------------------------------------------------- */

export const pipeline = {
  eyebrow: {
    en: "How I work",
    it: "Come lavoro",
  } as Localized<string>,

  headline: {
    en: "From commit to production",
    it: "Dal commit alla produzione",
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
