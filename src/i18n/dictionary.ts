import type { Lang, Localized } from "./config";

/**
 * Every UI string rendered by the shared shell, in both languages.
 *
 * Kept as one typed object rather than JSON files so a missing translation is
 * a compile error instead of a blank space in production.
 *
 * Section copy for the home page lives in `src/content/sections.ts`; this file
 * contains only the strings required by the shell (navigation, loader, footer,
 * contact, etc.).
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
      "Platforms, migrations and automations I have designed and currently manage for public-sector organisations and enterprise partners. Some clients cannot be named and are therefore marked as NDA.",
    viewProject: "View project",
    allProjects: "All projects",
    year: "Year",
    role: "Role",
    stack: "Stack",
    empty: "More case studies are being prepared.",
  },

  about: {
    eyebrow: "About",
    title: "Four principles I work by",
    intro:
      "Not values written on a wall, but four principles that shape how I approach day-to-day work.",

    pillars: [
      {
        title: "Automate what repeats",
        body: "If a task has to be done more than once, it should become a script or an Ansible role and live under version control. Manual commands are a common source of errors and service issues.",
      },
      {
        title: "Measure before optimising",
        body: "Metrics, logs and alerts come first. You cannot troubleshoot what you cannot see, and infrastructure capacity should be based on data rather than assumptions.",
      },
      {
        title: "Design for the worst day",
        body: "A backup that has never been restored is only a copy of the data. Runbooks, recovery plans and DR exercises come before more complex solutions.",
      },
      {
        title: "Keep production boring",
        body: "The best outcome for an infrastructure team is a production environment that works reliably without attracting attention.",
      },
    ],
  },

  experience: {
    eyebrow: "Career",
    title: "Where I have worked",
    intro:
      "Three roles since 2024, from cloud-native research to managing production infrastructure for public-sector organisations and enterprise partners.",
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
    lead:
      "I am currently open to DevOps, Cloud and Platform Engineering roles. Email is the fastest way to reach me, and I reply to every message.",
    emailCta: "Send an email",
    copy: "Copy address",
    copied: "Copied",
    cvCta: "Download CV",
    elsewhere: "Find me online",
  },

  footer: {
    rights: "All rights reserved.",
    builtWith:
      "Designed and built from scratch with Next.js, GSAP and Lenis.",
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
      "Caricamento della configurazione",
      "Verifica dello stato",
      "Controllo dell'health",
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
    theme: "Passa dalla modalità scura a quella chiara",
  },

  work: {
    eyebrow: "Progetti selezionati",
    title: "Progetti e migrazioni",
    description:
      "Piattaforme, migrazioni e automazioni che ho progettato e che attualmente gestisco per enti pubblici e partner enterprise. Alcuni clienti non possono essere indicati e sono quindi contrassegnati come NDA.",
    viewProject: "Vedi progetto",
    allProjects: "Tutti i progetti",
    year: "Anno",
    role: "Ruolo",
    stack: "Stack",
    empty: "Altri case study sono in fase di preparazione.",
  },

  about: {
    eyebrow: "Approccio",
    title: "Quattro principi con cui lavoro",
    intro:
      "Non valori scritti su una parete, ma quattro principi che guidano il mio modo di lavorare ogni giorno.",

    pillars: [
      {
        title: "Automatizzo ciò che si ripete",
        body: "Se un'attività deve essere eseguita più di una volta, dovrebbe diventare uno script o un ruolo Ansible ed essere gestita tramite version control. I comandi eseguiti manualmente sono una delle principali fonti di errori e disservizi.",
      },
      {
        title: "Misuro prima di ottimizzare",
        body: "Prima vengono metriche, log e alert. Non si può fare troubleshooting di ciò che non è visibile e il dimensionamento dell'infrastruttura deve basarsi sui dati, non su supposizioni.",
      },
      {
        title: "Progetto per il giorno peggiore",
        body: "Un backup che non è mai stato ripristinato è soltanto una copia dei dati. Runbook, piani di recovery ed esercitazioni di DR vengono prima delle soluzioni più complesse.",
      },
      {
        title: "Tengo la produzione semplice",
        body: "Il miglior risultato per un team infrastrutturale è avere un ambiente di produzione stabile e affidabile, che non richieda attenzione continua.",
      },
    ],
  },

  experience: {
    eyebrow: "Percorso",
    title: "Esperienze professionali",
    intro:
      "Tre ruoli dal 2024, dalla ricerca su architetture cloud-native alla gestione di infrastrutture di produzione per enti pubblici e partner enterprise.",
    present: "Attuale",
    now: "Ora",
  },

  certifications: {
    eyebrow: "Certificazioni",
    title: "Certificazioni",
    verify: "Verifica certificazione",
  },

  contact: {
    eyebrow: "Contatti",
    title: "Contattami",
    lead:
      "Sono attualmente disponibile per ruoli DevOps, Cloud e Platform Engineering. La email è il modo più rapido per contattarmi e rispondo a ogni messaggio.",
    emailCta: "Invia una email",
    copy: "Copia indirizzo",
    copied: "Copiato",
    cvCta: "Scarica il CV",
    elsewhere: "Dove trovarmi",
  },

  footer: {
    rights: "Tutti i diritti riservati.",
    builtWith:
      "Progettato e sviluppato da zero con Next.js, GSAP e Lenis.",
    backToTop: "Torna su",
  },
};

export const dictionaries: Localized<Dictionary> = { en, it };

export function getDictionary(lang: Lang): Dictionary {
  return dictionaries[lang];
}
