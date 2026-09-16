import type { Localized } from "@/i18n/config";

/* ==========================================================================
   SELECTED WORK

   Two rules govern this file, because a portfolio is only worth as much as it
   survives an interview question:

   1. Every entry maps to real work, and the detail describes what was actually
      built — the scripts, the tooling, the documents.
   2. `outcome` states what was DONE, not what it achieved. "Wrote the recovery
      procedure as an executable runbook" is checkable; "cut downtime by 40%" is
      not, unless there is a measurement behind it.

   Client names are described by sector, not brand. Cases marked
   `confidential: true` are ones where naming the organisation is not
   appropriate; swap in a real name only where you are cleared to do so.

   `challenge` / `approach` / `outcome` are not rendered on the index — they are
   the case-study copy for the `/work/[slug]` route on the roadmap.
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
      it: "Un programma cloud strategico nazionale",
    },
    year: "2025 — 2026",
    role: {
      en: "Infrastructure & DR engineer",
      it: "Ingegnere infrastruttura e DR",
    },
    summary: {
      en: "Mapped a mission-critical Oracle estate onto protection groups and wrote the recovery procedure as an executable runbook.",
      it: "Ho mappato un'infrastruttura Oracle mission-critical su protection group e ho scritto la procedura di recovery come runbook eseguibile.",
    },
    challenge: {
      en: "A regulated workload had to survive the loss of an entire availability domain. The existing documentation described intent rather than procedure, so it could not be executed by anyone but its author.",
      it: "Un carico di lavoro regolamentato doveva sopravvivere alla perdita di un intero availability domain. La documentazione esistente descriveva l'intento, non la procedura: non era eseguibile da nessuno tranne il suo autore.",
    },
    approach: {
      en: "Modelled the failure domains first, then mapped compute, block storage, network and the Oracle RAC tier onto protection groups with a defined RPO and RTO. Wrote the recovery steps as commands with expected output, not as prose.",
      it: "Prima ho modellato i domini di guasto, poi ho mappato compute, block storage, rete e il tier Oracle RAC su protection group con RPO e RTO definiti. Ho scritto i passi di recovery come comandi con l'output atteso, non come prosa.",
    },
    outcome: {
      en: [
        "Compute, storage, network and the Oracle RAC tier mapped onto protection groups with an explicit RPO and RTO.",
        "Database backups moved onto Oracle's own cloud backup service, removing the dependency on an on-premises backup path.",
        "The recovery procedure written as an executable runbook, so it can be followed by someone who did not design it.",
        "As-built documentation iterated across several revisions against the state visible in the console.",
      ],
      it: [
        "Compute, storage, rete e tier Oracle RAC mappati su protection group con RPO e RTO espliciti.",
        "Backup dei database spostati sul servizio cloud nativo di Oracle, eliminando la dipendenza da un percorso di backup on-premises.",
        "Procedura di recovery scritta come runbook eseguibile, seguibile da chi non l'ha progettata.",
        "Documentazione as-built iterata su più revisioni confrontandola con lo stato reale in console.",
      ],
    },
    stack: ["Oracle Cloud Infrastructure", "Oracle RAC", "Veeam", "Bash", "Ansible"],
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
      it: "Un tenant del settore pubblico nazionale",
    },
    year: "2026",
    role: {
      en: "Migration engineer",
      it: "Ingegnere di migrazione",
    },
    summary: {
      en: "Moved identities, groups and mailboxes onto a new Active Directory forest with a deterministic, resumable pipeline.",
      it: "Ho spostato identità, gruppi e caselle su una nuova foresta Active Directory con una pipeline deterministica e riprendibile.",
    },
    challenge: {
      en: "Directory migrations fail on the details. Object SIDs, group memberships, profile paths and Linux SSSD logins all have to line up on the same morning, and a half-migrated user cannot reach either side.",
      it: "Le migrazioni di directory falliscono sui dettagli. SID degli oggetti, appartenenze ai gruppi, percorsi dei profili e login SSSD su Linux devono allinearsi nello stesso momento, e un utente a metà migrazione non accede a nessuno dei due lati.",
    },
    approach: {
      en: "Built the migration as a re-runnable sequence: export the source directory, compute a stable identity mapping, inject a consistency GUID so objects can be matched across forests, then join the Linux hosts over SSSD. Every step logged.",
      it: "Ho costruito la migrazione come sequenza rieseguibile: export della directory sorgente, calcolo di una mappatura identità stabile, iniezione di un consistency GUID per correlare gli oggetti tra le foreste, quindi join degli host Linux via SSSD. Ogni passo tracciato.",
    },
    outcome: {
      en: [
        "Object correlation handled by an injected consistency GUID instead of by hand — the step most likely to be wrong at scale.",
        "An identity mapping that can be reviewed and signed off before a single object is touched.",
        "Linux hosts joined over SSSD, replacing hand-edited configuration files.",
        "Mail and service migration flow drawn as a diagram the wider team could follow.",
      ],
      it: [
        "Correlazione degli oggetti gestita da un consistency GUID iniettato invece che a mano — il passaggio più facile da sbagliare su larga scala.",
        "Mappatura delle identità revisionabile e approvabile prima di toccare un singolo oggetto.",
        "Host Linux uniti al dominio via SSSD, sostituendo file di configurazione modificati a mano.",
        "Flusso di migrazione di posta e servizi disegnato come diagramma seguibile dal resto del team.",
      ],
    },
    stack: ["Active Directory", "PowerShell", "SSSD", "Linux", "Ansible"],
    confidential: true,
  },
  {
    id: "monitoring",
    slug: "infrastructure-monitoring-rollout",
    title: {
      en: "Host-level monitoring, instrumented end to end",
      it: "Monitoraggio a livello host, strumentato end to end",
    },
    client: {
      en: "Managed services, multi-tenant",
      it: "Servizi gestiti, multi-tenant",
    },
    year: "2025 — 2026",
    role: {
      en: "Monitoring & automation engineer",
      it: "Ingegnere monitoraggio e automazione",
    },
    summary: {
      en: "Purpose-built checks for CPU, memory and disk, plus Veeam job verification, feeding a central Nagios estate.",
      it: "Check dedicati per CPU, memoria e disco, più verifica dei job Veeam, verso un'infrastruttura Nagios centralizzata.",
    },
    challenge: {
      en: "Generic monitoring tells you a host is up. It rarely tells you that a Windows server has been quietly starving for memory for three weeks, or that last night's backup job failed.",
      it: "Il monitoraggio generico ti dice che un host è attivo. Raramente ti dice che un server Windows soffre di mancanza di memoria da tre settimane, o che il job di backup della notte è fallito.",
    },
    approach: {
      en: "Wrote host-level checks for CPU pressure, memory consumption and disk headroom as NCPA modules with centralised, token-based configuration, then added Veeam job verification so a failed backup raises an alert on its own.",
      it: "Ho scritto check a livello host per pressione CPU, consumo di memoria e spazio disco come moduli NCPA con configurazione centralizzata e autenticazione a token, poi ho aggiunto la verifica dei job Veeam così un backup fallito genera alert da solo.",
    },
    outcome: {
      en: [
        "Custom checks for CPU, memory and disk, packaged as NCPA modules rather than ad-hoc scripts on each host.",
        "Veeam job verification, so a silent backup failure becomes an alert instead of a surprise during a restore.",
        "Configuration pushed centrally: onboarding a host is a change request, not a manual install.",
        "Checks versioned as they evolved — the second-pass CPU and memory scripts superseded the first.",
      ],
      it: [
        "Check custom per CPU, memoria e disco, pacchettizzati come moduli NCPA invece che come script sparsi sui singoli host.",
        "Verifica dei job Veeam, così un fallimento silenzioso del backup diventa un alert invece che una sorpresa durante un restore.",
        "Configurazione distribuita centralmente: onboardare un host è una change request, non un'installazione manuale.",
        "Check versionati mentre evolvevano — la seconda revisione degli script CPU e memoria ha sostituito la prima.",
      ],
    },
    stack: ["Nagios", "NCPA", "Python", "PowerShell", "Veeam"],
    confidential: false,
  },
  {
    id: "pwm",
    slug: "self-service-password-platform",
    title: {
      en: "Self-service password reset platform",
      it: "Piattaforma self-service di reset password",
    },
    client: {
      en: "Public-sector identity services",
      it: "Servizi di identità per il settore pubblico",
    },
    year: "2026",
    role: {
      en: "Platform engineer",
      it: "Platform engineer",
    },
    summary: {
      en: "A self-service password portal deployed per tenant, with a rebuilt front end and reviewable configuration.",
      it: "Un portale self-service di reset password distribuito per tenant, con front-end ricostruito e configurazione revisionabile.",
    },
    challenge: {
      en: "Password resets consume service-desk capacity and widen the social-engineering surface. The off-the-shelf portal worked, but shipped an interface dated enough that users did not trust it.",
      it: "I reset di password consumano capacità del service desk e allargano la superficie di social engineering. Il portale standard funzionava, ma aveva un'interfaccia abbastanza datata da non meritare fiducia.",
    },
    approach: {
      en: "Deployed the portal per tenant against each directory, rebuilt the front end with a modern responsive theme so it matched the organisation's own services, and moved configuration changes behind a reviewable editor instead of live edits on production.",
      it: "Ho distribuito il portale per tenant su ciascuna directory, ricostruito il front-end con un tema moderno e responsive coerente con i servizi dell'organizzazione, e spostato le modifiche di configurazione dietro un editor revisionabile invece che su produzione.",
    },
    outcome: {
      en: [
        "One portal per tenant, each bound to its own directory, so one policy change cannot reach another tenant.",
        "Front end rebuilt as a responsive theme matching the organisation's existing services.",
        "Configuration changes made reviewable rather than edited live on production.",
        "A user-facing security control people choose to use instead of raising a ticket.",
      ],
      it: [
        "Un portale per tenant, ciascuno legato alla propria directory, così un cambio di policy non raggiunge gli altri.",
        "Front-end ricostruito come tema responsive coerente con i servizi già usati dall'organizzazione.",
        "Modifiche di configurazione revisionabili invece che applicate live in produzione.",
        "Un controllo di sicurezza user-facing che gli utenti scelgono di usare invece di aprire un ticket.",
      ],
    },
    stack: ["PWM", "LDAP", "CSS", "Docker", "Linux"],
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
      it: "Modernizzazione applicativa enterprise",
    },
    year: "2026",
    role: {
      en: "Integration engineer",
      it: "Ingegnere di integrazione",
    },
    summary: {
      en: "Proved a legacy Java application could authenticate against Entra ID through configuration alone.",
      it: "Ho dimostrato che un'applicazione Java legacy poteva autenticarsi su Entra ID con la sola configurazione.",
    },
    challenge: {
      en: "An application server nearing end of life still authenticated against a local user store. Replacing it was a multi-year project; leaving it alone was a standing security finding.",
      it: "Un application server a fine vita si autenticava ancora su uno store utenti locale. Sostituirlo era un progetto pluriennale; lasciarlo com'era, una vulnerabilità permanente.",
    },
    approach: {
      en: "Wired the server's security subsystem to Entra ID through a standards-based identity provider, mapping the existing roles and groups onto directory claims. Deliberately configuration-only: no changes to the application's own code.",
      it: "Ho collegato il sottosistema di sicurezza del server a Entra ID tramite un identity provider basato su standard, mappando ruoli e gruppi esistenti sulle claim della directory. Volutamente solo configurazione: nessuna modifica al codice dell'applicazione.",
    },
    outcome: {
      en: [
        "A working SSO path that requires no changes to the application's own code.",
        "Existing roles and groups mapped onto directory claims, so behaviour did not change for users.",
        "Validated end to end before recommending investment, rather than proposing an architecture on paper.",
      ],
      it: [
        "Un percorso SSO funzionante che non richiede modifiche al codice dell'applicazione.",
        "Ruoli e gruppi esistenti mappati sulle claim della directory, senza cambiamenti percepiti dagli utenti.",
        "Flusso validato end to end prima di raccomandare l'investimento, invece di proporre un'architettura sulla carta.",
      ],
    },
    stack: ["JBoss EAP", "Microsoft Entra ID", "SSO", "XML", "Keycloak"],
    confidential: true,
  },
  {
    id: "dns-splitbrain",
    slug: "split-brain-dns-manager",
    title: {
      en: "Split-brain DNS, made safe to operate",
      it: "DNS split-brain, reso sicuro da gestire",
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
      en: "A desktop tool that turns a risky, error-prone DNS configuration task into a guided one.",
      it: "Uno strumento desktop che trasforma un'attività DNS rischiosa e soggetta a errori in un flusso guidato.",
    },
    challenge: {
      en: "Split-brain DNS is easy to get wrong and expensive when you do — internal names resolving to public addresses, or the reverse. The task was being done by hand, from memory, in production.",
      it: "Il DNS split-brain è facile da sbagliare e costoso quando accade — nomi interni che risolvono su indirizzi pubblici, o il contrario. L'attività veniva svolta a mano, a memoria, in produzione.",
    },
    approach: {
      en: "Wrote a PowerShell tool with a desktop UI that discovers the current zone state, shows exactly what will change, applies it deliberately, and can be run against more than one domain from a single console.",
      it: "Ho scritto uno strumento PowerShell con interfaccia desktop che rileva lo stato attuale delle zone, mostra esattamente cosa cambierà, applica le modifiche in modo controllato ed è eseguibile su più domini da un'unica console.",
    },
    outcome: {
      en: [
        "Destructive changes shown as a diff before they are applied.",
        "Multi-domain operation from a single console.",
        "Knowledge captured in a tool rather than in one person's memory.",
        "Iterated across revisions as domain-specific and zone-default edge cases surfaced.",
      ],
      it: [
        "Modifiche distruttive mostrate come diff prima di essere applicate.",
        "Gestione multi-dominio da un'unica console.",
        "Conoscenza catturata in uno strumento invece che nella memoria di una persona.",
        "Iterato su più revisioni man mano che emergevano casi limite su domini e zone default.",
      ],
    },
    stack: ["PowerShell", "WPF", "DNS", "Active Directory"],
    confidential: false,
  },
];
