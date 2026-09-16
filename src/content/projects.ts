import type { Localized } from "@/i18n/config";

/* ==========================================================================
  SELECTED WORK
  --------------------------------------------------------------------------
  This section focuses on real projects and practical work. Each entry
  describes what was built, how it was approached and what was delivered.

  The content is intentionally factual: outcomes describe completed work
  rather than unsupported claims about business impact.

  Client names are described by sector rather than by brand. Cases marked
  `confidential: true` should only use the real organisation name where
  disclosure is permitted.

  `challenge` / `approach` / `outcome` are used in the case-study pages
  under `/work/[slug]`.
  ========================================================================== */

export interface Project {
  id: string;
  slug: string;
  title: Localized<string>;
  /** Sector descriptor, or the real client name if publishable. */
  client: Localized<string>;
  year: string;
  role: Localized<string>;
  /** One sentence, used on the index row. */
  summary: Localized<string>;
  challenge: Localized<string>;
  approach: Localized<string>;
  outcome: Localized<string[]>;
  stack: string[];
  /** Renders an "NDA" marker on the index row. */
  confidential: boolean;
}

export const projects: Project[] = [
  {
    id: "dr-oci",
    slug: "disaster-recovery-oracle-cloud",

    title: {
      en: "Disaster recovery on Oracle Cloud Infrastructure",
      it: "Disaster recovery su Oracle Cloud Infrastructure",
    },

    client: {
      en: "A national strategic cloud programme",
      it: "Programma cloud strategico nazionale",
    },

    year: "2025 — 2026",

    role: {
      en: "Infrastructure & DR Engineer",
      it: "Infrastructure & DR Engineer",
    },

    summary: {
      en: "Mapped a mission-critical Oracle estate onto protection groups and wrote the recovery procedure as an executable runbook.",
      it: "Mappatura di un'infrastruttura Oracle mission-critical su protection group e sviluppo della procedura di recovery come runbook eseguibile.",
    },

    challenge: {
      en: "A regulated workload had to withstand the loss of an entire availability domain. The existing documentation described the intended process rather than the actual procedure, making it difficult for anyone other than its author to execute.",
      it: "Un workload soggetto a requisiti normativi doveva essere in grado di gestire la perdita di un intero availability domain. La documentazione esistente descriveva il processo previsto, ma non forniva una procedura operativa sufficientemente dettagliata per essere eseguita da persone diverse dall'autore.",
    },

    approach: {
      en: "Modelled the failure domains first, then mapped compute, block storage, network and the Oracle RAC tier onto protection groups with defined RPO and RTO targets. The recovery procedure was written as a sequence of commands with expected output rather than as descriptive documentation.",
      it: "Prima sono stati modellati i failure domain, quindi sono stati mappati compute, block storage, rete e il tier Oracle RAC sui protection group, definendo RPO e RTO. La procedura di recovery è stata strutturata come una sequenza di comandi con relativo output atteso, anziché come semplice documentazione descrittiva.",
    },

    outcome: {
      en: [
        "Compute, storage, network and the Oracle RAC tier mapped onto protection groups with explicit RPO and RTO targets.",
        "Database backups moved to Oracle's native cloud backup service, removing the dependency on an on-premises backup path.",
        "Recovery procedure documented as an executable runbook that can be followed by someone who did not design the solution.",
        "As-built documentation iterated through multiple revisions against the state visible in the console.",
      ],

      it: [
        "Compute, storage, rete e tier Oracle RAC mappati sui protection group con RPO e RTO espliciti.",
        "Backup dei database spostati sul servizio cloud nativo di Oracle, eliminando la dipendenza da un percorso di backup on-premises.",
        "Procedura di recovery documentata come runbook eseguibile, utilizzabile anche da chi non ha progettato la soluzione.",
        "Documentazione as-built aggiornata attraverso più revisioni e verificata rispetto allo stato effettivamente presente in console.",
      ],
    },

    stack: [
      "Oracle Cloud Infrastructure",
      "Oracle RAC",
      "Veeam",
      "Bash",
      "Ansible",
    ],

    confidential: true,
  },

  {
    id: "ad-migration",
    slug: "identity-and-domain-migration",

    title: {
      en: "Identity and domain migration at tenant scale",
      it: "Migrazione di identità e dominio su larga scala",
    },

    client: {
      en: "A national public-sector tenant",
      it: "Tenant del settore pubblico nazionale",
    },

    year: "2026",

    role: {
      en: "Migration Engineer",
      it: "Migration Engineer",
    },

    summary: {
      en: "Moved identities, groups and mailboxes to a new Active Directory forest through a deterministic and resumable migration pipeline.",
      it: "Migrazione di identità, gruppi e caselle verso una nuova foresta Active Directory attraverso una pipeline deterministica e riprendibile.",
    },

    challenge: {
      en: "Directory migrations depend on many details being aligned. Object SIDs, group memberships, profile paths and Linux SSSD logins all had to remain consistent during the migration, while a partially migrated user could not be left without access to either environment.",
      it: "Le migrazioni di directory richiedono che numerosi elementi rimangano coerenti. SID degli oggetti, appartenenze ai gruppi, percorsi dei profili e login SSSD su Linux dovevano essere allineati durante la migrazione, evitando che un utente parzialmente migrato rimanesse senza accesso a uno dei due ambienti.",
    },

    approach: {
      en: "Built the migration as a re-runnable sequence: export the source directory, calculate a stable identity mapping, inject a consistency GUID to correlate objects across forests, and then join Linux hosts through SSSD. Each step was logged for traceability.",
      it: "La migrazione è stata strutturata come una sequenza rieseguibile: export della directory sorgente, calcolo di una mappatura stabile delle identità, iniezione di un consistency GUID per correlare gli oggetti tra le foreste e successivo join degli host Linux tramite SSSD. Ogni fase è stata tracciata nei log.",
    },

    outcome: {
      en: [
        "Object correlation handled through an injected consistency GUID rather than manually, reducing the risk of errors at scale.",
        "Identity mapping available for review and sign-off before any object was migrated.",
        "Linux hosts joined to the domain through SSSD, replacing manually edited configuration files.",
        "Mail and service migration flow documented in a diagram that could be followed by the wider team.",
      ],

      it: [
        "Correlazione degli oggetti gestita tramite un consistency GUID iniettato anziché manualmente, riducendo il rischio di errori su larga scala.",
        "Mappatura delle identità disponibile per la revisione e l'approvazione prima della migrazione degli oggetti.",
        "Host Linux integrati nel dominio tramite SSSD, sostituendo la gestione manuale dei file di configurazione.",
        "Flusso di migrazione di posta e servizi documentato attraverso un diagramma utilizzabile dal resto del team.",
      ],
    },

    stack: [
      "Active Directory",
      "PowerShell",
      "SSSD",
      "Linux",
      "Ansible",
    ],

    confidential: true,
  },

  {
    id: "monitoring",
    slug: "infrastructure-monitoring-rollout",

    title: {
      en: "Host-level monitoring, instrumented end to end",
      it: "Monitoring a livello host, dalla configurazione all'alerting",
    },

    client: {
      en: "Managed services, multi-tenant",
      it: "Servizi gestiti, multi-tenant",
    },

    year: "2025 — 2026",

    role: {
      en: "Monitoring & Automation Engineer",
      it: "Monitoring & Automation Engineer",
    },

    summary: {
      en: "Purpose-built checks for CPU, memory and disk, together with Veeam job verification, feeding a centralised Nagios environment.",
      it: "Check dedicati per CPU, memoria e disco, insieme alla verifica dei job Veeam, integrati in un ambiente Nagios centralizzato.",
    },

    challenge: {
      en: "Generic monitoring can show that a host is available, but it does not always expose resource pressure or backup failures early enough. The goal was to provide more detailed visibility at host level.",
      it: "Il monitoring generico può indicare che un host è disponibile, ma non sempre permette di individuare tempestivamente problemi di consumo delle risorse o il fallimento di un backup. L'obiettivo era ottenere una visibilità più dettagliata a livello host.",
    },

    approach: {
      en: "Developed host-level checks for CPU pressure, memory consumption and available disk space as NCPA modules, using centralised token-based configuration. Veeam job verification was then added so that failed backup jobs generate an alert automatically.",
      it: "Sono stati sviluppati check a livello host per CPU, consumo di memoria e spazio disco disponibile come moduli NCPA, utilizzando una configurazione centralizzata con autenticazione tramite token. È stata inoltre integrata la verifica dei job Veeam, in modo che il fallimento di un backup generi automaticamente un alert.",
    },

    outcome: {
      en: [
        "Custom CPU, memory and disk checks packaged as NCPA modules rather than individual scripts deployed on each host.",
        "Veeam job verification integrated into monitoring, turning failed backups into actionable alerts.",
        "Configuration managed centrally, making host onboarding a controlled change rather than a manual installation.",
        "Checks versioned as they evolved, with later revisions of the CPU and memory scripts replacing the initial implementations.",
      ],

      it: [
        "Check custom per CPU, memoria e disco, distribuiti come moduli NCPA anziché come singoli script sui diversi host.",
        "Verifica dei job Veeam integrata nel monitoring, trasformando i backup falliti in alert gestibili.",
        "Configurazione gestita centralmente, rendendo l'onboarding di un host una modifica controllata anziché un'installazione manuale.",
        "Check versionati durante l'evoluzione del progetto, con le revisioni successive degli script CPU e memoria che hanno sostituito le implementazioni iniziali.",
      ],
    },

    stack: [
      "Nagios",
      "NCPA",
      "Python",
      "PowerShell",
      "Veeam",
    ],

    confidential: false,
  },

  {
    id: "pwm",
    slug: "self-service-password-platform",

    title: {
      en: "Self-service password reset platform",
      it: "Piattaforma self-service per il reset della password",
    },

    client: {
      en: "Public-sector identity services",
      it: "Servizi di identity management per il settore pubblico",
    },

    year: "2026",

    role: {
      en: "Platform Engineer",
      it: "Platform Engineer",
    },

    summary: {
      en: "A self-service password reset portal deployed per tenant, with a rebuilt front end and reviewable configuration.",
      it: "Portale self-service per il reset della password, distribuito per tenant, con front-end ricostruito e configurazione revisionabile.",
    },

    challenge: {
      en: "Password resets consume service-desk capacity and introduce additional social-engineering risks. The existing portal was functional, but its dated interface did not provide a consistent user experience with the organisation's other services.",
      it: "I reset delle password richiedono interventi da parte del service desk e introducono ulteriori rischi legati al social engineering. Il portale esistente era funzionante, ma presentava un'interfaccia datata e non coerente con l'esperienza offerta dagli altri servizi dell'organizzazione.",
    },

    approach: {
      en: "Deployed the portal per tenant against each directory, rebuilt the front end with a modern responsive theme aligned with the organisation's existing services, and moved configuration changes behind a reviewable editor instead of applying them directly in production.",
      it: "Il portale è stato distribuito per tenant e collegato alla relativa directory. Il front-end è stato ricostruito con un tema moderno e responsive, coerente con gli altri servizi dell'organizzazione. Le modifiche di configurazione sono state inoltre gestite tramite un editor revisionabile, evitando interventi diretti in produzione.",
    },

    outcome: {
      en: [
        "One portal per tenant, each bound to its own directory, limiting the scope of tenant-specific policy changes.",
        "Front end rebuilt as a responsive theme aligned with the organisation's existing services.",
        "Configuration changes made reviewable instead of being edited directly in production.",
        "A user-facing security control that provides an alternative to opening a service-desk ticket for routine password resets.",
      ],

      it: [
        "Un portale per tenant, ciascuno collegato alla propria directory, limitando l'impatto delle modifiche di policy al relativo ambiente.",
        "Front-end ricostruito con un tema responsive coerente con i servizi già utilizzati dall'organizzazione.",
        "Modifiche di configurazione rese revisionabili anziché applicate direttamente in produzione.",
        "Un controllo di sicurezza user-facing che consente agli utenti di gestire autonomamente i reset ordinari della password senza aprire un ticket al service desk.",
      ],
    },

    stack: [
      "PWM",
      "LDAP",
      "CSS",
      "Docker",
      "Linux",
    ],

    confidential: false,
  },

  {
    id: "jboss-sso",
    slug: "jboss-entra-id-sso",

    title: {
      en: "Single sign-on for a legacy application server",
      it: "Single sign-on per un application server legacy",
    },

    client: {
      en: "Enterprise application modernisation",
      it: "Modernizzazione di applicazioni enterprise",
    },

    year: "2026",

    role: {
      en: "Integration Engineer",
      it: "Integration Engineer",
    },

    summary: {
      en: "Proved that a legacy Java application could authenticate against Entra ID through configuration alone.",
      it: "Verifica dell'autenticazione di un'applicazione Java legacy tramite Entra ID utilizzando esclusivamente la configurazione del server.",
    },

    challenge: {
      en: "An application server approaching end of life still relied on a local user store for authentication. Replacing it was a long-term project, while leaving the existing authentication model in place represented an ongoing security concern.",
      it: "Un application server prossimo al fine vita utilizzava ancora uno store utenti locale per l'autenticazione. La sua sostituzione richiedeva un progetto di lungo periodo, mentre mantenere l'attuale modello di autenticazione rappresentava un problema di sicurezza da gestire.",
    },

    approach: {
      en: "Connected the server's security subsystem to Entra ID through a standards-based identity provider, mapping existing roles and groups to directory claims. The integration was deliberately configuration-only, with no changes to the application's source code.",
      it: "Il sottosistema di sicurezza del server è stato collegato a Entra ID tramite un identity provider basato su standard, mappando i ruoli e i gruppi esistenti sulle claim della directory. L'integrazione è stata volutamente realizzata tramite sola configurazione, senza modifiche al codice sorgente dell'applicazione.",
    },

    outcome: {
      en: [
        "A working SSO path requiring no changes to the application's source code.",
        "Existing roles and groups mapped to directory claims without changing the expected user behaviour.",
        "The integration validated end to end before recommending further investment, providing a working basis for the next architectural decision.",
      ],

      it: [
        "Un flusso SSO funzionante che non richiede modifiche al codice sorgente dell'applicazione.",
        "Ruoli e gruppi esistenti mappati sulle claim della directory, mantenendo invariato il comportamento atteso dagli utenti.",
        "Integrazione validata end to end prima di valutare ulteriori investimenti, fornendo una base concreta per le successive decisioni architetturali.",
      ],
    },

    stack: [
      "JBoss EAP",
      "Microsoft Entra ID",
      "SSO",
      "XML",
      "Keycloak",
    ],

    confidential: true,
  },

  {
    id: "dns-splitbrain",
    slug: "split-brain-dns-manager",

    title: {
      en: "Split-brain DNS, made safer to operate",
      it: "Split-brain DNS, con gestione più sicura e controllata",
    },

    client: {
      en: "Internal tooling",
      it: "Strumenti interni",
    },

    year: "2026",

    role: {
      en: "Author",
      it: "Autore",
    },

    summary: {
      en: "A desktop tool that turns a complex and error-prone DNS configuration task into a guided workflow.",
      it: "Uno strumento desktop che trasforma un'attività di configurazione DNS complessa e soggetta a errori in un flusso guidato.",
    },

    challenge: {
      en: "Split-brain DNS is easy to misconfigure, with potentially disruptive results such as internal names resolving to public addresses or the reverse. The task was previously performed manually in production.",
      it: "Una configurazione split-brain DNS può essere facilmente impostata in modo errato, con conseguenze come la risoluzione di nomi interni verso indirizzi pubblici o viceversa. L'attività veniva precedentemente eseguita manualmente direttamente in produzione.",
    },

    approach: {
      en: "Developed a PowerShell tool with a desktop UI that discovers the current zone state, shows the proposed changes before applying them, performs the update in a controlled way, and supports multiple domains from a single console.",
      it: "È stato sviluppato uno strumento PowerShell con interfaccia desktop in grado di rilevare lo stato attuale delle zone, mostrare le modifiche previste prima dell'applicazione, eseguire l'aggiornamento in modo controllato e gestire più domini da un'unica console.",
    },

    outcome: {
      en: [
        "Destructive changes displayed as a diff before they are applied.",
        "Multi-domain operation available from a single console.",
        "Operational knowledge captured in a tool rather than relying on individual manual procedures.",
        "Tool iterated through multiple revisions as domain-specific and zone-default edge cases were identified.",
      ],

      it: [
        "Modifiche potenzialmente distruttive mostrate come diff prima della loro applicazione.",
        "Gestione multi-dominio disponibile da un'unica console.",
        "Conoscenza operativa trasferita all'interno dello strumento, riducendo la dipendenza da procedure manuali individuali.",
        "Strumento aggiornato attraverso più revisioni con l'emergere di casi limite specifici dei domini e delle zone.",
      ],
    },

    stack: [
      "PowerShell",
      "WPF",
      "DNS",
      "Active Directory",
    ],

    confidential: false,
  },
];
