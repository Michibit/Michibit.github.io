import type { Localized } from "@/i18n/config";

/* ==========================================================================
   SITE CONFIG — single source of truth for identity and links.
   Anything that appears in more than one place lives here.
   ========================================================================== */

export const site = {
  name: "Michele Menzione",
  /** Split for the stacked hero headline. */
  nameLines: ["Michele", "Menzione"],
  initials: "MM",
  email: "mmenzione4@gmail.com",
  phone: "+39 331 464 6721",
  location: "Napoli, Italy",
  /** IANA zone, used by the live local-time clock in the header. */
  timeZone: "Europe/Rome",
  github: "https://github.com/michibit",
  githubPages: "https://michibit.github.io/",
  linkedin: "https://www.linkedin.com/in/michele-menzione-534580268/",
  /** Drop your PDF in /public and point this at it. */
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
      en: "Operating the corporate virtualisation estate and delivering IT enablement for public-sector bodies and strategic partners.",
      it: "Gestione dell'infrastruttura di virtualizzazione aziendale e abilitazione delle forniture IT per enti pubblici e partner strategici.",
    },
    achievements: {
      en: [
        "Administer and monitor the corporate virtualisation infrastructure, safeguarding day-to-day continuity of service.",
        "Own the technical delivery and enablement of IT supply for public bodies and strategic partners.",
        "Coordinate and integrate inter-company services to streamline workflows and data security.",
      ],
      it: [
        "Amministrazione e monitoraggio dell'infrastruttura di virtualizzazione aziendale, garantendo la continuità operativa dei sistemi.",
        "Gestione tecnica e abilitazione delle forniture IT per enti pubblici e partner strategici.",
        "Coordinamento e integrazione dei servizi interaziendali per ottimizzare i flussi di lavoro e la sicurezza del dato.",
      ],
    },
    stack: ["VMware", "Windows Server", "Linux", "Monitoring", "Azure"],
  },
  {
    id: "systemmanagement-devops",
    role: {
      en: "DevOps & System Engineer",
      it: "DevOps & System Engineer",
    },
    company: "System Management S.p.A.",
    start: "2024-06",
    // NOTE: the Europass CV lists this role as still current alongside the
    // DigitalPlatforms entry. Set to "2026-01" to close the role, or leave null
    // if the engagement genuinely runs in parallel.
    end: "2025-12",
    location: "Napoli (NA), Italia",
    summary: {
      en: "Hardening a hybrid Linux/Windows estate and replacing manual operations with Ansible and Bash automation.",
      it: "Messa in sicurezza di un'infrastruttura ibrida Linux/Windows e sostituzione delle operazioni manuali con automazione Ansible e Bash.",
    },
    achievements: {
      en: [
        "Administered and hardened the hybrid IT infrastructure (Linux and Windows), ensuring high reliability and performance of virtualised systems.",
        "Designed automation pipelines with Ansible and Bash scripting, materially reducing manual operations and standardising configuration.",
        "Ran proactive incident management — 2nd and 3rd level troubleshooting across networking and systems.",
      ],
      it: [
        "Amministrazione e messa in sicurezza dell'infrastruttura IT ibrida (Linux e Windows), assicurando affidabilità e performance dei sistemi virtualizzati.",
        "Progettazione di pipeline di automazione con Ansible e Bash Scripting, riducendo le operazioni manuali e standardizzando le configurazioni.",
        "Gestione proattiva degli incidenti (troubleshooting di 2° e 3° livello) su tematiche di rete e sistemistiche.",
      ],
    },
    stack: ["Ansible", "Bash", "Linux", "Windows Server", "KVM", "Networking"],
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
      en: "Research engineer on GENIO, a cloud-native architecture programme.",
      it: "Ingegnere di ricerca sul progetto GENIO, dedicato alle architetture cloud-native.",
    },
    achievements: {
      en: [
        "Contributed to the GENIO research project, focused on adopting and integrating cloud-native architectures.",
        "Implemented and orchestrated distributed microservices on Kubernetes, optimising container lifecycle and application scalability.",
      ],
      it: [
        "Partecipazione attiva al progetto di ricerca GENIO, focalizzato sull'adozione e l'integrazione di architetture cloud-native.",
        "Implementazione e orchestrazione di microservizi distribuiti tramite Kubernetes, ottimizzando il ciclo di vita e la scalabilità applicativa dei container.",
      ],
    },
    stack: ["Kubernetes", "Docker", "Microservices", "Linux", "CI/CD"],
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
    label: { en: "Cloud & Orchestration", it: "Cloud e Orchestrazione" },
    items: ["Microsoft Azure", "Kubernetes", "Docker", "OCI"],
  },
  {
    id: "iac",
    label: { en: "Automation & IaC", it: "Automazione e IaC" },
    items: ["Ansible", "Bash", "PowerShell", "Git", "CI/CD"],
  },
  {
    id: "systems",
    label: { en: "Systems", it: "Sistemi" },
    items: ["Linux", "Windows Server", "Active Directory", "Networking"],
  },
  {
    id: "virt",
    label: { en: "Virtualisation", it: "Virtualizzazione" },
    items: ["VMware", "Hyper-V", "KVM", "Oracle RAC"],
  },
  {
    id: "code",
    label: { en: "Development & IoT", it: "Sviluppo e IoT" },
    items: ["Python", "Java", "TypeScript", "MQTT", "Node-RED"],
  },
  {
    id: "ops",
    label: { en: "Observability & Resilience", it: "Osservabilità e Resilienza" },
    items: ["Nagios", "NCPA", "Veeam", "Backup & Restore", "Disaster Recovery"],
  },
];
