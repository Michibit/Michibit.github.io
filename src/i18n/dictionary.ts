import type { Lang, Localized } from "./config";

/**
 * Every UI string the shared chrome renders, in both languages.
 *
 * Kept as one typed object rather than JSON files so a missing translation is a
 * compile error instead of a blank space in production.
 *
 * Section copy for the home page lives in `src/content/sections.ts`; this file
 * holds only the strings the shell needs (navigation, loader, footer, contact).
 */
export interface Dictionary {
  meta: {
    title: string;
    description: string;
  };
  loader: {
    status: string[];
  };
  nav: {
    work: string;
    skills: string;
    about: string;
    experience: string;
    contact: string;
    menu: string;
    close: string;
    language: string;
    theme: string;
  };
  work: {
    eyebrow: string;
    title: string;
    description: string;
    viewProject: string;
    allProjects: string;
    year: string;
    role: string;
    stack: string;
    empty: string;
  };
  about: {
    eyebrow: string;
    title: string;
    intro: string;
    pillars: { title: string; body: string }[];
  };
  experience: {
    eyebrow: string;
    title: string;
    intro: string;
    present: string;
    now: string;
  };
  certifications: {
    eyebrow: string;
    title: string;
    verify: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    lead: string;
    emailCta: string;
    copy: string;
    copied: string;
    cvCta: string;
    elsewhere: string;
  };
  footer: {
    rights: string;
    builtWith: string;
    backToTop: string;
  };
}

const en: Dictionary = {
  meta: {
    title: "Michele Menzione — DevOps & System Engineer",
    description:
      "DevOps and System Engineer specialised in Azure cloud, Kubernetes orchestration and Infrastructure as Code. Microsoft Certified Azure Solutions Architect Expert.",
  },
  loader: {
    status: [
      "Starting services",
      "Loading configuration",
      "Reconciling state",
      "Checking health",
      "Ready",
    ],
  },
  nav: {
    work: "Work",
    skills: "Skills",
    about: "About",
    experience: "Experience",
    contact: "Contact",
    menu: "Menu",
    close: "Close",
    language: "Change language",
    theme: "Switch between dark and light mode",
  },
  work: {
    eyebrow: "Selected work",
    title: "Projects and migrations",
    description:
      "Platforms, migrations and automations I designed and now operate for public-sector bodies and enterprise partners. Some clients cannot be named — those are marked NDA.",
    viewProject: "View project",
    allProjects: "All projects",
    year: "Year",
    role: "Role",
    stack: "Stack",
    empty: "More case studies are being written up.",
  },
  about: {
    eyebrow: "About",
    title: "Four rules I work by",
    intro:
      "Not values on a wall — the four things that decide how I spend a working day.",
    pillars: [
      {
        title: "Automate what repeats",
        body: "If a task has to be done twice it becomes a script or an Ansible role, under version control. Hand-typed commands are where outages begin.",
      },
      {
        title: "Measure before optimising",
        body: "Metrics, logs and alerts come first. You cannot fix what you cannot see, and capacity should never be a guess.",
      },
      {
        title: "Design for the worst day",
        body: "A backup that has never been restored is not a backup. Runbooks, recovery plans and DR rehearsals come before anything clever.",
      },
      {
        title: "Keep production boring",
        body: "The best compliment an infrastructure team can get is that nothing happened this week.",
      },
    ],
  },
  experience: {
    eyebrow: "Career",
    title: "Where I have worked",
    intro:
      "Three roles since 2024 — from cloud-native research to running production infrastructure for public-sector bodies and enterprise partners.",
    present: "Present",
    now: "Now",
  },
  certifications: {
    eyebrow: "Credentials",
    title: "Certifications",
    verify: "Verify credential",
  },
  contact: {
    eyebrow: "Contact",
    title: "Get in touch",
    lead: "I am currently open to DevOps, Cloud and Platform Engineering roles. Email is the fastest way to reach me — I answer every message.",
    emailCta: "Send an email",
    copy: "Copy address",
    copied: "Copied",
    cvCta: "Download CV",
    elsewhere: "Elsewhere",
  },
  footer: {
    rights: "All rights reserved.",
    builtWith: "Designed and built from scratch with Next.js, GSAP and Lenis.",
    backToTop: "Back to top",
  },
};

const it: Dictionary = {
  meta: {
    title: "Michele Menzione — DevOps & System Engineer",
    description:
      "DevOps e System Engineer specializzato in cloud Azure, orchestrazione Kubernetes e Infrastructure as Code. Microsoft Certified Azure Solutions Architect Expert.",
  },
  loader: {
    status: [
      "Avvio dei servizi",
      "Caricamento configurazione",
      "Riconciliazione dello stato",
      "Verifica di stato",
      "Pronto",
    ],
  },
  nav: {
    work: "Progetti",
    skills: "Competenze",
    about: "Approccio",
    experience: "Esperienza",
    contact: "Contatti",
    menu: "Menu",
    close: "Chiudi",
    language: "Cambia lingua",
    theme: "Passa da modalità scura a chiara",
  },
  work: {
    eyebrow: "Progetti selezionati",
    title: "Progetti e migrazioni",
    description:
      "Piattaforme, migrazioni e automazioni che ho progettato e che gestisco per enti pubblici e partner enterprise. Alcuni clienti non sono citabili: quelli sono marcati NDA.",
    viewProject: "Vedi progetto",
    allProjects: "Tutti i progetti",
    year: "Anno",
    role: "Ruolo",
    stack: "Stack",
    empty: "Altri case study sono in fase di scrittura.",
  },
  about: {
    eyebrow: "Chi sono",
    title: "Quattro regole che seguo",
    intro:
      "Non valori appesi a una parete — le quattro cose che decidono come passo una giornata di lavoro.",
    pillars: [
      {
        title: "Automatizzo ciò che si ripete",
        body: "Se un'attività va fatta due volte diventa uno script o un ruolo Ansible, sotto controllo di versione. È nei comandi digitati a mano che cominciano i disservizi.",
      },
      {
        title: "Misuro prima di ottimizzare",
        body: "Prima metriche, log e alert. Non si sistema ciò che non si vede, e il dimensionamento non si indovina.",
      },
      {
        title: "Progetto per il giorno peggiore",
        body: "Un backup mai ripristinato non è un backup. Runbook, piani di recovery ed esercitazioni di DR vengono prima di qualsiasi soluzione elegante.",
      },
      {
        title: "Tengo la produzione noiosa",
        body: "Il miglior complimento per un team infrastrutturale è che questa settimana non è successo nulla.",
      },
    ],
  },
  experience: {
    eyebrow: "Percorso",
    title: "Dove ho lavorato",
    intro:
      "Tre ruoli dal 2024 — dalla ricerca cloud-native alla gestione di infrastrutture di produzione per enti pubblici e partner enterprise.",
    present: "Attuale",
    now: "Ora",
  },
  certifications: {
    eyebrow: "Credenziali",
    title: "Certificazioni",
    verify: "Verifica la certificazione",
  },
  contact: {
    eyebrow: "Contatti",
    title: "Contattami",
    lead: "Al momento sono aperto a ruoli DevOps, Cloud e Platform Engineering. La email è il modo più rapido per raggiungermi — rispondo a ogni messaggio.",
    emailCta: "Mandami una email",
    copy: "Copia indirizzo",
    copied: "Copiato",
    cvCta: "Scarica il CV",
    elsewhere: "Altrove",
  },
  footer: {
    rights: "Tutti i diritti riservati.",
    builtWith: "Progettato e sviluppato da zero con Next.js, GSAP e Lenis.",
    backToTop: "Torna su",
  },
};

export const dictionaries: Localized<Dictionary> = { en, it };

export function getDictionary(lang: Lang): Dictionary {
  return dictionaries[lang];
}
