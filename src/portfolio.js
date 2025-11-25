/* Change this file to get your personal Portfolio */

import emoji from "react-easy-emoji";
import splashAnimation from "./assets/lottie/splashAnimation"; 

const splashScreen = {
  enabled: true, 
  animation: splashAnimation,
  duration: 5500 // Aumenta questo valore (era 2000) per vedere tutta la sequenza di login!
};

const illustration = {
  animated: true 
};

const greeting = {
  username: "Michibit",
  title: "Michele Menzione",
  subTitle: emoji(
    "DevOps Engineer & System Administrator. Architetto infrastrutture resilienti, automatizzo il deployment e gestisco sistemi mission-critical."
  ),
  resumeLink: "https://drive.google.com/file/d/1ofFdKF_mqscH8WvXkSObnVvC9kK7Ldlu/view?usp=sharing",
  displayGreeting: true 
};

const socialMediaLinks = {
  github: "https://github.com/Michibit",
  linkedin: "https://www.linkedin.com/in/michele-menzione-534580268/",
  gmail: "menzione.m@gmail.com",
  display: true 
};

const skillsSection = {
  title: "Stack Tecnologico",
  subTitle: "Strumenti e tecnologie per l'automazione e la gestione infrastrutturale.",
  skills: [
    "CI/CD Pipelines Automation",
    "Infrastructure as Code (IaC)",
    "Cloud Native & Hybrid Cloud",
    "Security Hardening & Compliance",
    "Container Orchestration",
    "System Monitoring & Logging"
  ],

  softwareSkills: [
    { skillName: "Windows Server", fontAwesomeClassname: "fab fa-windows" },
    { skillName: "Linux", fontAwesomeClassname: "fab fa-linux" },
    { skillName: "Ansible", fontAwesomeClassname: "fas fa-cogs" },
    { skillName: "Python", fontAwesomeClassname: "fab fa-python" },
    { skillName: "Bash", fontAwesomeClassname: "fas fa-terminal" },
    { skillName: "Azure", fontAwesomeClassname: "fab fa-microsoft" },
    { skillName: "Kubernetes", fontAwesomeClassname: "fas fa-dharmachakra" },
    { skillName: "Docker", fontAwesomeClassname: "fab fa-docker" },
    { skillName: "Git", fontAwesomeClassname: "fab fa-git-alt" }
  ],
  display: true 
};

const educationInfo = {
  display: true, 
  schools: [
    {
      schoolName: "Università degli Studi di Salerno",
      logo: require("./assets/images/Unisalogo.png"),
      subHeader: "Laurea in Informatica",
      duration: "2021 - 2024",
      descBullets: [
        "Sistemi Distribuiti & Cloud",
        "Architetture Software",
        "Network Security"
      ]
    }
  ]
};

const techStack = {
  viewSkillBars: true, 
  experience: [
    { Stack: "SysAdmin", progressPercentage: "92%" },
    { Stack: "Azure", progressPercentage: "85%" },
    { Stack: "Automation", progressPercentage: "88%" },
    { Stack: "K8s/Docker", progressPercentage: "78%" },
    { Stack: "DevOps", progressPercentage: "80%" }
  ],
  displayCodersrank: false 
};

const workExperiences = {
  display: true, 
  experience: [
    {
      role: "DevOps & System Engineer",
      company: "System Management S.p.A.",
      companylogo: require("./assets/images/sysmanagement_logo.jpg"),
      date: "Giu 2023 - Presente",
      desc: "Gestione infrastrutture enterprise e automazione processi.",
      descBullets: [
        "Gestione Active Directory e ambienti Ibridi",
        "Troubleshooting server Linux/Windows",
        "Pipeline CI/CD e Automazione",
        "Monitoraggio proattivo"
      ]
    },
    {
      role: "R&D Engineer (Internship)",
      company: "System Management S.p.A.",
      companylogo: require("./assets/images/sysmanagement_logo.jpg"),
      date: "Gen 2023 - Giu 2023",
      desc: "Ricerca e sviluppo tecnologie cloud.",
      descBullets: [
        "Scripting Python per analisi log",
        "PoC Docker e Kubernetes",
        "Supporto migrazione Cloud"
      ]
    }
  ]
};

const openSource = {
  showGithubProfile: "true", 
  display: false 
};

const bigProjects = {
  title: "Progetti",
  subtitle: "Challenge tecniche affrontate.",
  projects: [
    {
      image: require("./assets/images/saayaHealthLogo.webp"),
      projectName: "K8s Multi-Cloud",
      projectDesc: "Cluster Kubernetes distribuito per HA e DR.",
      footerLink: [
        { name: "GitHub", url: "https://github.com/Michibit" }
      ]
    },
    {
      image: require("./assets/images/nextuLogo.webp"),
      projectName: "CI/CD Pipeline",
      projectDesc: "Pipeline GitLab CI completa con security scan.",
      footerLink: [
        { name: "GitHub", url: "https://github.com/Michibit" }
      ]
    }
  ],
  display: false 
};

const achievementSection = {
  title: emoji("Certificazioni 🏆"),
  subtitle: "Competenze validate.",
  achievementsCards: [
    {
      title: "Microsoft Certified: Azure Administrator Associate",
      subtitle: "Azure Administrator Associate",
      image: require("./assets/images/azure-administrator-associate.png"),
      imageAlt: "Azure Admin",
      footerLink: [
        { name: "Verifica", url: "https://learn.microsoft.com/api/credentials/share/it-it/MicheleMenzione-8223/D155D2D9EE7D95EE?sharingId=88BCFBE49FFCADE0" }
      ]
    },
    {
      title: "Microsoft Certified: Azure Solutions Architect Expert", 
      subtitle: "Azure Solutions Architect Expert",
      image: require("./assets/images/microsoft-certified-expert-badge.png"), 
      imageAlt: "Azure Solutions Architect Expert",
      footerLink: [
        { name: "Verifica", url: "https://learn.microsoft.com/api/credentials/share/it-it/MicheleMenzione-8223/56A1EF8E4AA1CC2A?sharingId=88BCFBE49FFCADE0" }
      ]
    }
  ],
  display: true 
};

const blogSection = {
  title: "Blog",
  subtitle: "Note tecniche.",
  displayMediumBlogs: "false",
  blogs: [
    {
      url: "#",
      title: "Terraform: IaC",
      description: "Guida all'Infrastructure as Code."
    }
  ],
  display: false 
};

const talkSection = {
  title: "Talks",
  subtitle: "",
  talks: [],
  display: false 
};

const podcastSection = {
  title: emoji("Podcast 🎙️"),
  subtitle: "",
  podcast: [],
  display: false 
};

const resumeSection = {
  title: "CV",
  subtitle: "",
  resumeLink: "https://drive.google.com/file/d/1ofFdKF_mqscH8WvXkSObnVvC9kK7Ldlu/view?usp=sharing",
  display: false 
};

const contactInfo = {
  title: emoji("Contattami 📬"),
  subtitle: "Parliamo di progetti e cloud.",
  number: "",
  email_address: "mmenzione4@gmail.com"
};

const twitterDetails = {
  userName: "twitter",
  display: false 
};

const isHireable = true; 

export const lightTheme = {
  body: "#FFFFFF",
  text: "#343434",
  expTxtColor: "#000a12",
  highlight: "#55198b",
  dark: "#000000",
  secondaryText: "#7F8DAA",
  imageHighlight: "#55198b",
  compImgHighlight: "#E6E6E6",
  jacketColor: "#55198b",
  headerColor: "#55198b77",
  splashBg: "#55198b",
};

export const darkTheme = {
  body: "transparent",       
  text: "#FFFFFF",           
  expTxtColor: "#d1d5db",    
  highlight: "#00f3ff",      
  dark: "#000000",           
  secondaryText: "#a0a0a0",  
  imageHighlight: "#bd00ff", 
  compImgHighlight: "#00f3ff",
  jacketColor: "#00f3ff",    
  headerColor: "rgba(0,0,0,0.5)",
  splashBg: "#050505",
};

export const chosenTheme = darkTheme;

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