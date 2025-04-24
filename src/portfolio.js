/* Change this file to get your personal Portfolio */

// To change portfolio colors globally go to the  _globalColor.scss file

import emoji from "react-easy-emoji";
import splashAnimation from "./assets/lottie/splashAnimation"; // Rename to your file name for custom animation

// Splash Screen

const splashScreen = {
  enabled: true, // set false to disable splash screen
  animation: splashAnimation,
  duration: 2000 // Set animation duration as per your animation
};

// Summary And Greeting Section

const illustration = {
  animated: true // Set to false to use static SVG
};

const greeting = {
  username: "Michibit",
  title: "Salve, sono Michele Menzione",
  subTitle: emoji(
    "DevOps Engineer e Sistemista 🚀 specializzato in automazione, infrastrutture e ambienti cloud scalabili."
  ),
  resumeLink:
    "https://drive.google.com/file/d/1ofFdKF_mqscH8WvXkSObnVvC9kK7Ldlu/view?usp=sharing", // Set to empty to hide the button
  displayGreeting: true // Set false to hide this section, defaults to true
};

// Social Media Links

const socialMediaLinks = {
  github: "https://github.com/Michibit",
  linkedin: "https://www.linkedin.com/in/michele-menzione-534580268/",
  gmail: "menzione.m@gmail.com",
  // Instagram, Twitter and Kaggle are also supported in the links!
  // To customize icons and social links, tweak src/components/SocialMedia
  display: true // Set true to display this section, defaults to false
};

// Skills Section

const skillsSection = {
  title: "Competenze",
  subTitle:
    "DevOps e Sistemista appassionato di infrastrutture scalabili, automazione e performance 🔧",
  skills: [
    emoji("🔁 Automazione dei processi CI/CD e provisioning"),
    emoji("🛠️ Monitoraggio, logging e ottimizzazione di ambienti complessi"),
    emoji(
      "🔐 Configurazione e gestione di ambienti sicuri, con controllo degli accessi e best practice di sicurezza"
    ),
    emoji(
      "🧠 Esperienza su Linux, containerizzazione, orchestrazione e scripting avanzato"
    )
  ],

  /* Make Sure to include correct Font Awesome Classname to view your icon
https://fontawesome.com/icons?d=gallery */

  softwareSkills: [
    {
      skillName: "Windows",
      fontAwesomeClassname: "fab fa-windows"
    },
    {
      skillName: "Linux",
      fontAwesomeClassname: "fab fa-linux"
    },
    {
      skillName: "Ansible",
      fontAwesomeClassname: "fas fa-cogs"
    },
    {
      skillName: "Python",
      fontAwesomeClassname: "fab fa-python"
    },
    {
      skillName: "Bash",
      fontAwesomeClassname: "fas fa-terminal"
    },
    {
      skillName: "Azure",
      fontAwesomeClassname: "fab fa-microsoft"
    },
    {
      skillName: "Kubernetes",
      fontAwesomeClassname: "fas fa-dharmachakra"
    },
    {
      skillName: "Docker",
      fontAwesomeClassname: "fab fa-docker"
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Education Section

const educationInfo = {
  display: true, // Set false to hide this section, defaults to true
  schools: [
    {
      schoolName: "Università degli studi di Salerno (Unisa)",
      logo: require("./assets/images/Unisalogo.png"),
      subHeader: "Laurea Triennale in Informatica",
      duration: "Settembre 2021 - Marzo 2024",
      descBullets: [
        "Sviluppo Software e Algoritmi",
        "Sistemi Distribuiti e Cloud Computing",
        "Sicurezza Informatica"
      ]
    }
  ]
};

// Your top 3 proficient stacks/tech experience

const techStack = {
  viewSkillBars: true, //Set it to true to show Proficiency Section
  experience: [
    {
      Stack: "Sistemi Linux/Windows", //Insert stack or technology you have experience in
      progressPercentage: "90%" //Insert relative proficiency in percentage
    },
    {
      Stack: "Cloud (Azure)",
      progressPercentage: "80%"
    },
    {
      Stack: "Scripting (Python, Bash)",
      progressPercentage: "85%"
    },
    {
      Stack: "Container e Orchestrazione",
      progressPercentage: "75%"
    },
    {
      Stack: "Automazione",
      progressPercentage: "70%"
    }
  ],
  displayCodersrank: false // Set true to display codersrank badges section need to changes your username in src/containers/skillProgress/skillProgress.js:17:62, defaults to false
};

// Work experience section

const workExperiences = {
  display: true, //Set it to true to show workExperiences Section
  experience: [
    {
      role: "Dev Ops & System Engineer",
      company: "System Management S.p.A.",
      companylogo: require("./assets/images/sysmanagement_logo.jpg"), // Sostituisci con il logo dell'azienda quando disponibile
      date: "Giugno 2023 - Presente",
      desc: "Ruolo a tempo pieno con focus su gestione sistemi, DevOps e automazione in ambiente ibrido.",
      descBullets: [
        "Gestione Active Directory e amministrazione di sistemi",
        "Risoluzione problemi e troubleshooting in ambienti complessi",
        "Implementazione e manutenzione di infrastrutture IT",
        "Automazione dei processi e CI/CD"
      ]
    },
    {
      role: "R&D Engineer",
      company: "System Management S.p.A.",
      companylogo: require("./assets/images/sysmanagement_logo.jpg"), // Sostituisci con il logo dell'azienda quando disponibile
      date: "Gennaio 2023 - Giugno 2023",
      desc: "Ruolo part-time nel dipartimento di Ricerca e Sviluppo.",
      descBullets: [
        "Sviluppo di soluzioni con Python per automazione e analisi dati",
        "Amministrazione di sistemi Linux",
        "Partecipazione a progetti di ricerca e innovazione",
        "Testing e implementazione di nuove tecnologie"
      ]
    }
  ]
};

/* Your Open Source Section to View Your Github Pinned Projects
To know how to get github key look at readme.md */

const openSource = {
  showGithubProfile: "true", // Set true or false to show Contact profile using Github, defaults to true
  display: false // Set false to hide this section, defaults to true
};

// Some big projects you have worked on

const bigProjects = {
  title: "Progetti",
  subtitle: "Alcuni dei miei progetti e contributi significativi",
  projects: [
    {
      image: require("./assets/images/saayaHealthLogo.webp"),
      projectName: "Infrastruttura Kubernetes Multi-Cloud",
      projectDesc: "Implementazione di un cluster Kubernetes distribuito su più provider cloud per alta disponibilità e disaster recovery.",
      footerLink: [
        {
          name: "Visita Repository",
          url: "https://github.com/Michibit"
        }
      ]
    },
    {
      image: require("./assets/images/nextuLogo.webp"),
      projectName: "Pipeline CI/CD Automatizzata",
      projectDesc: "Sistema completo di integrazione e deployment continuo con GitLab CI, TestContainers e deployment automatico.",
      footerLink: [
        {
          name: "Visita Repository",
          url: "https://github.com/Michibit"
        }
      ]
    }
  ],
  display: false // Set false to hide this section, defaults to true
};

// Achievement Section
// Include certificates, talks etc

const achievementSection = {
  title: emoji("Certificazioni e Riconoscimenti 🏆 "),
  subtitle: "Riconoscimenti, Certificazioni che ho conseguito!",

  achievementsCards: [
    {
      title: "Microsoft Certified: Azure Administrator Associate",
      subtitle:
        "Riconoscimento ufficiale Microsoft per la gestione di ambienti Azure, incluse reti, identità, storage e monitoraggio.",
      image: require("./assets/images/azure-administrator-associate.png"),
      imageAlt: "Azure Admin Logo",
      footerLink: [
        {
          name: "Certificazione",
          url: "https://learn.microsoft.com/api/credentials/share/it-it/MicheleMenzione-8223/D155D2D9EE7D95EE?sharingId=88BCFBE49FFCADE0"
        }
      ]
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Blogs Section

const blogSection = {
  title: "Blog",
  subtitle:
    "Condivido le mie conoscenze e esperienze attraverso articoli tecnici.",
  displayMediumBlogs: "false", // Set true to display fetched medium blogs instead of hardcoded ones
  blogs: [
    {
      url: "#",
      title: "Automazione DevOps con Ansible e Terraform",
      description:
        "Come ho implementato l'automazione completa dell'infrastruttura usando strumenti open source."
    },
    {
      url: "#",
      title: "Kubernetes: dall'installazione alla produzione",
      description:
        "Guida pratica all'implementazione di un cluster Kubernetes pronto per la produzione."
    }
  ],
  display: false // Set false to hide this section, defaults to true
};

// Talks Sections

const talkSection = {
  title: "Conferenze",
  subtitle: emoji(
    "Condivisione di conoscenze e partecipazione a eventi nel settore DevOps e Cloud"
  ),

  talks: [
    {
      title: "Best Practices per CI/CD in ambienti cloud",
      subtitle: "Workshop presso Tech Conference 2023",
      slides_url: "#",
      event_url: "#"
    }
  ],
  display: false // Set false to hide this section, defaults to true
};

// Podcast Section

const podcastSection = {
  title: emoji("Podcast 🎙️"),
  subtitle: "Discussioni tecniche e interviste nel mondo DevOps",

  // Please Provide with Your Podcast embeded Link
  podcast: [
    "https://anchor.fm/example/embed/episodes/DevOps-Best-Practices-e9givv/a-a15itvo"
  ],
  display: false // Set false to hide this section, defaults to true
};

// Resume Section
const resumeSection = {
  title: "Curriculum Vitae",
  subtitle: "Scarica il mio CV completo per maggiori dettagli",
  resumeLink: "https://drive.google.com/file/d/1ofFdKF_mqscH8WvXkSObnVvC9kK7Ldlu/view?usp=sharing",
  display: false // Set false to hide this section, defaults to true
};

const contactInfo = {
  title: emoji("Contattami ☎️"),
  subtitle:
    "Hai un progetto da proporre o desideri metterti in contatto? Sentiti libero di scrivermi!",
  number: "", // Lasciato vuoto intenzionalmente
  email_address: "menzione.m@gmail.com"
};

// Twitter Section

const twitterDetails = {
  userName: "twitter", //Replace "twitter" with your twitter username without @
  display: false // Set true to display this section, defaults to false
};

const isHireable = true; // Set false if you are not looking for a job. Also isHireable will be display as Open for opportunities: Yes/No in the GitHub footer

export {
  illustration,
  greeting,
  socialMediaLinks,
  splashScreen,
  skillsSection,
  educationInfo,
  techStack,
  workExperiences,
  openSource,
  bigProjects,
  achievementSection,
  blogSection,
  talkSection,
  podcastSection,
  contactInfo,
  twitterDetails,
  isHireable,
  resumeSection
};