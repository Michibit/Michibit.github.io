import type { Localized } from "@/i18n/config";

/* ==========================================================================
  SITE CONFIG — single source of truth for identity and links.
  Anything that appears in more than one place is defined here.
  ========================================================================== */

export const site = {
  name: "Michele Menzione",

  /** Split for the stacked hero headline. */
  nameLines: ["Michele", "Menzione"],

  initials: "MM",

  email: "mmenzione4@gmail.com",

  phone: "+39 331 464 6721",

  location: "Napoli, Italy",

  /** IANA time zone used by the live local-time clock in the header. */
  timeZone: "Europe/Rome",

  github: "https://github.com/michibit",

  githubPages: "https://michibit.github.io/",

  linkedin:
    "https://www.linkedin.com/in/michele-menzione-534580268/",

  /** PDF path under /public. */
  cvUrl: "/cv/michele-menzione-cv.pdf",
} as const;

export const navLinks = [
  { id: "skills", href: "#skills" },
  { id: "work", href: "#work" },
  { id: "experience", href: "#experience" },
  { id: "about", href: "#about" },
  { id: "contact", href: "#contact" },
] as const;

export type NavId = (typeof navLinks)[number]["id"];

/* ==========================================================================
  EXPERIENCE
  Source: Europass CV, 24/06/2026.
  ========================================================================== */

export interface ExperienceItem {
  id: string;
  role: Localized<string>;
  company: string;

  /** ISO month. `end: null` renders as "Present" / "Attuale". */
  start: string;
  end: string | null;

  location: string;

  /** One-line scope, shown collapsed in the timeline. */
  summary: Localized<string>;

  achievements: Localized<string[]>;

  stack: string[];
}

export const experience: ExperienceItem[] = [
  {
    id: "digitalplatforms",

    role: {
      en: "System & DevOps Engineer",
      it: "System & DevOps Engineer",
    },

    company: "DigitalPlatforms S.p.A.",

    start: "2026-01",
    end: null,

    location: "Italia",

    summary: {
      en: "Managing the corporate virtualisation infrastructure and delivering IT services for public-sector organisations and strategic partners.",
      it: "Gestione dell'infrastruttura di virtualizzazione aziendale e delle attività IT a supporto di enti pubblici e partner strategici.",
    },

    achievements: {
      en: [
        "Administer and monitor the corporate virtualisation infrastructure, supporting day-to-day service continuity.",
        "Manage the technical delivery and enablement of IT services for public-sector organisations and strategic partners.",
        "Coordinate and integrate inter-company services to improve operational workflows and data security.",
      ],

      it: [
        "Amministrazione e monitoring dell'infrastruttura di virtualizzazione aziendale, supportando la continuità operativa dei servizi.",
        "Gestione tecnica e delivery dei servizi IT per enti pubblici e partner strategici.",
        "Coordinamento e integrazione dei servizi interaziendali per migliorare i flussi operativi e la sicurezza dei dati.",
      ],
    },

    stack: [
      "VMware",
      "Windows Server",
      "Linux",
      "Monitoring",
      "Azure",
    ],
  },

  {
    id: "systemmanagement-devops",

    role: {
      en: "DevOps & System Engineer",
      it: "DevOps & System Engineer",
    },

    company: "System Management S.p.A.",

    start: "2024-06",
    end: "2025-12",

    location: "Napoli (NA), Italia",

    summary: {
      en: "Managing and hardening a hybrid Linux/Windows infrastructure while replacing manual operations with Ansible and Bash automation.",
      it: "Gestione e hardening di un'infrastruttura ibrida Linux/Windows, con automazione delle attività operative tramite Ansible e Bash.",
    },

    achievements: {
      en: [
        "Administered and hardened hybrid Linux and Windows infrastructure, maintaining the reliability and performance of virtualised systems.",
        "Designed automation workflows with Ansible and Bash scripting to standardise configuration and reduce repetitive manual operations.",
        "Handled proactive incident management and 2nd- and 3rd-level troubleshooting across systems and networking.",
      ],

      it: [
        "Amministrazione e hardening dell'infrastruttura IT ibrida Linux e Windows, con attenzione all'affidabilità e alle performance dei sistemi virtualizzati.",
        "Progettazione di workflow di automazione con Ansible e Bash scripting per standardizzare le configurazioni e ridurre le attività manuali ripetitive.",
        "Gestione proattiva degli incidenti e troubleshooting di 2° e 3° livello su sistemi e networking.",
      ],
    },

    stack: [
      "Ansible",
      "Bash",
      "Linux",
      "Windows Server",
      "KVM",
      "Networking",
    ],
  },

  {
    id: "systemmanagement-rnd",

    role: {
      en: "R&D Engineer",
      it: "R&D Engineer",
    },

    company: "System Management S.p.A.",

    start: "2024-01",
    end: "2024-06",

    location: "Napoli (NA), Italia",

    summary: {
      en: "R&D Engineer on GENIO, a programme focused on cloud-native architectures and distributed applications.",
      it: "R&D Engineer sul progetto GENIO, focalizzato su architetture cloud-native e applicazioni distribuite.",
    },

    achievements: {
      en: [
        "Contributed to the GENIO research project, focused on the adoption and integration of cloud-native architectures.",
        "Implemented and orchestrated distributed microservices on Kubernetes, working on container lifecycle management and application scalability.",
      ],

      it: [
        "Partecipazione al progetto di ricerca GENIO, focalizzato sull'adozione e sull'integrazione di architetture cloud-native.",
        "Implementazione e orchestrazione di microservizi distribuiti tramite Kubernetes, con attività sul ciclo di vita dei container e sulla scalabilità applicativa.",
      ],
    },

    stack: [
      "Kubernetes",
      "Docker",
      "Microservices",
      "Linux",
      "CI/CD",
    ],
  },
];

/* ==========================================================================
  EDUCATION
  ========================================================================== */

export interface EducationItem {
  id: string;
  qualification: Localized<string>;
  institution: string;
  start: string;
  end: string;
  location: string;
  grade?: string;
}

export const education: EducationItem[] = [
  {
    id: "unisa",

    qualification: {
      en: "BSc in Computer Science",
      it: "Laurea in Informatica",
    },

    institution: "Università degli Studi di Salerno",

    start: "2020-09",
    end: "2024-03",

    location: "Fisciano (SA), Italia",

    grade: "101/110",
  },
];

/* ==========================================================================
  CERTIFICATIONS
  ========================================================================== */

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  url: string;

  /** Rendered as an accent chip when true. */
  featured?: boolean;
}

export const certifications: Certification[] = [
  {
    id: "azure-solutions-architect-expert",
    title: "Azure Solutions Architect Expert",
    issuer: "Microsoft Certified",
    url: "https://learn.microsoft.com/it-it/users/michibit/credentials/56a1ef8e4aa1cc2a",
    featured: true,
  },

  {
    id: "azure-administrator-associate",
    title: "Azure Administrator Associate",
    issuer: "Microsoft Certified",
    url: "https://learn.microsoft.com/it-it/users/michibit/credentials/d155d2d9ee7d95ee",
    featured: true,
  },
];

/* ==========================================================================
  TECH STACK — grouped by purpose for the Skills section.
  ========================================================================== */

export interface StackGroup {
  id: string;
  label: Localized<string>;
  items: string[];
}

export const stackGroups: StackGroup[] = [
  {
    id: "cloud",

    label: {
      en: "Cloud & Orchestration",
      it: "Cloud e Orchestrazione",
    },

    items: [
      "Microsoft Azure",
      "Kubernetes",
      "Docker",
      "OCI",
    ],
  },

  {
    id: "iac",

    label: {
      en: "Automation & IaC",
      it: "Automazione e IaC",
    },

    items: [
      "Ansible",
      "Bash",
      "PowerShell",
      "Git",
      "CI/CD",
    ],
  },

  {
    id: "systems",

    label: {
      en: "Systems",
      it: "Sistemi",
    },

    items: [
      "Linux",
      "Windows Server",
      "Active Directory",
      "Networking",
    ],
  },

  {
    id: "virt",

    label: {
      en: "Virtualisation",
      it: "Virtualizzazione",
    },

    items: [
      "VMware",
      "Hyper-V",
      "KVM",
      "Oracle RAC",
    ],
  },

  {
    id: "code",

    label: {
      en: "Development & IoT",
      it: "Sviluppo e IoT",
    },

    items: [
      "Python",
      "Java",
      "TypeScript",
      "MQTT",
      "Node-RED",
    ],
  },

  {
    id: "ops",

    label: {
      en: "Observability & Resilience",
      it: "Observability e Resilienza",
    },

    items: [
      "Nagios",
      "NCPA",
      "Veeam",
      "Backup & Restore",
      "Disaster Recovery",
    ],
  },
];
