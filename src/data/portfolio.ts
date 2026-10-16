// Zentrale Inhaltsdatei des Portfolios.
// Alle Texte, Projekte, Skills, Stationen und Links stehen nur hier.
// Grundregel: nur belegbare Angaben. Unbekanntes bleibt als PLATZHALTER leer
// und wird im UI ausgeblendet, solange es nicht befüllt ist.

export const person = {
  firstName: 'Mario',
  lastName: 'Kujoth',
  fullName: 'Mario Kujoth',
  eyebrow: ['Developer', 'KI-Agenten', 'Problem Solver'],
  subtitle: ['Software Engineering', 'Webentwicklung', 'KI'],
  heroIntro:
    'Ich entwickle Web-Anwendungen und KI-Agenten, die echte Alltagsprobleme lösen – vom eigenen Agenten auf meinem Linux-Server bis zur Zeiterfassung für einen Tankstellenbetrieb. Gerade mache ich meine Weiterbildung zur IT-Fachkraft für Software Engineering & AI und suche ein Praktikum in Oberhavel oder Berlin.',
  location: 'Oranienburg',
  region: 'Berlin-Brandenburg',
  languages: 'Deutsch & Englisch',
  availability: {
    label: 'Praktikum gesucht',
    period: '29.01.–30.03.2027',
    start: '29.01.2027',
    preference: 'Landkreis Oberhavel oder Berlin, gern öffentlicher Dienst oder Schul-IT',
  },
  // Foto: referenz/portrait.jpg → src/assets/portrait-{circle,card}.webp (nur Zuschnitt & Skalierung)
  portraitAlt: 'Porträt von Mario Kujoth',
} as const

export const links = {
  // zu bestätigen: E-Mail-Adresse vor Veröffentlichung noch einmal prüfen
  email: 'IT-mkdir@proton.me',
  github: 'https://github.com/bmkbauservice-hue',
  // PLATZHALTER: LinkedIn-URL eintragen. Bleibt im UI ausgeblendet, solange leer.
  linkedin: '',
} as const

export const site = {
  title: 'Mario Kujoth – Software Engineering, Webentwicklung & KI',
  description:
    'Portfolio von Mario Kujoth: Web-Anwendungen, KI-Agenten und digitale Produkte. Praktikum gesucht vom 29.01. bis 30.03.2027 in Oberhavel oder Berlin.',
  // GitHub Pages; bei Domainwechsel auch canonical/og:url/og:image in index.html anpassen
  url: 'https://bmkbauservice-hue.github.io/portfolio/',
  copyright: '© 2026 Mario Kujoth',
} as const

export const intro = {
  greeting: 'Hi, ich bin Mario.',
  claim: 'Ich verwandle Ideen in digitale Lösungen.',
} as const

export const navigation = [
  { id: 'start', label: 'Start' },
  { id: 'projekte', label: 'Projekte' },
  { id: 'skills', label: 'Skills' },
  { id: 'ueber-mich', label: 'Über mich' },
  { id: 'kontakt', label: 'Kontakt' },
] as const

export type SectionId = (typeof navigation)[number]['id']

export const heroStats = [
  { label: 'Ausgewählte Projekte', value: '6' },
  { label: 'Umschulung', value: '12 Monate' },
  { label: 'Praktikum ab', value: '01/2027' },
] as const

export const heroTagline = ['Build', 'Create', 'Improve', 'Repeat'] as const
export const heroSideLabels = ['Ideas', 'Code', 'Design', 'Impact'] as const

// ---------------------------------------------------------------------------
// Projekte – genau diese sechs, in dieser Reihenfolge. Nur angegebene Features.
// ---------------------------------------------------------------------------

export type ProjectStatusKind = 'live' | 'development' | 'alpha' | 'progress' | 'done'
export type PreviewKind = 'terminal' | 'dashboard' | 'callflow' | 'yacht' | 'gallery' | 'travel'

export interface ProjectModule {
  name: string
  text: string
  state: 'aktiv' | 'im Aufbau'
}

export interface Project {
  id: string
  title: string
  category: string
  context?: string
  summary: string
  description: string
  modules?: ProjectModule[]
  featureGroups: { title: string; items: string[] }[]
  role?: string
  stack: string[]
  status: { kind: ProjectStatusKind; label: string }
  /** Öffentlicher GitHub-Link. Fehlt er, ist das Repository privat. */
  repoUrl?: string
  preview: PreviewKind
  featured?: boolean
}

export const projects: Project[] = [
  {
    id: 'muju-agent',
    title: 'Muju Agent',
    category: 'KI-Agent',
    context: 'Eigenes Projekt',
    summary:
      'Persönlicher KI-Agent auf eigenem Linux-VPS, gesteuert per Telegram. Ein n8n-Workflow verbindet Python-Worker und LLMs.',
    description:
      'Persönlicher KI-Agent auf meinem eigenen Linux-VPS, gesteuert per Telegram. Ein n8n-Workflow mit Python-Worker und LLMs verteilt die Aufgaben an einzelne Module.',
    modules: [
      {
        name: 'Bewerbungs-Agent',
        text: 'Analysiert Stellen, schreibt Anschreiben, fragt nach dem Design, legt mir die PDF vor dem Versand zur Freigabe vor und trägt den Termin in den Kalender ein.',
        state: 'aktiv',
      },
      {
        name: 'Kicktipp-Agent',
        text: 'Recherchiert Ausfälle und Form, tippt selbstständig und lernt aus den Ergebnissen.',
        state: 'aktiv',
      },
      {
        name: 'E-Mail-Agent',
        text: 'Verschickt E-Mails aus dem Agenten heraus.',
        state: 'im Aufbau',
      },
    ],
    featureGroups: [],
    stack: ['Python', 'n8n', 'Telegram Bot API', 'LLMs', 'Linux-VPS'],
    status: { kind: 'live', label: 'läuft' },
    preview: 'terminal',
    featured: true,
  },
  {
    id: 'zeiterfassung',
    title: 'Zeiterfassung für Tankstellen',
    category: 'Web-App',
    context: 'Kundenprojekt',
    summary:
      'Zeiterfassung für einen Betrieb mit 3 Tankstellen und bis zu 30 Mitarbeitenden – mit Adminbereich und Stempel-Terminal.',
    description:
      'Zeiterfassungssystem für einen Betrieb mit 3 Tankstellen und bis zu 30 Mitarbeitenden.',
    featureGroups: [
      {
        title: 'Funktionen',
        items: [
          'Mitarbeiter-Zeiterfassung',
          'NFC-Integration',
          'Zwei-Faktor-Konzept',
          'Adminbereich',
          'Stempel-Terminal',
        ],
      },
    ],
    role: 'Zielkonzept, Architektur, Roadmap und Reviews. Die Umsetzung läuft KI-gestützt über Branches, Issues und Pull Requests.',
    stack: ['TypeScript', 'Node.js', 'Fastify', 'PostgreSQL', 'Docker'],
    status: { kind: 'development', label: 'in Entwicklung' },
    preview: 'dashboard',
  },
  {
    id: 'callflow-ai',
    title: 'CallFlow AI',
    category: 'KI-Plattform',
    context: 'Eigenes Projekt',
    summary: 'KI-Plattform für Telefonie und Unternehmenskommunikation – Konzept und Architektur.',
    description: 'KI-Plattform für Telefonie und Unternehmenskommunikation.',
    featureGroups: [
      {
        title: 'Konzept & Architektur',
        items: [
          'Sprach- und Absichtserkennung',
          'Wissensdatenbank (RAG)',
          'Workflow-Automatisierung',
          'Dashboard',
          'Mehrere Firmen auf einer Plattform',
        ],
      },
    ],
    role: 'Idee, Entwurf und Planung.',
    stack: ['Python', 'FastAPI', 'React', 'PostgreSQL', 'Qdrant', 'n8n', 'Docker'],
    status: { kind: 'development', label: 'v0.1 · in Entwicklung' },
    repoUrl: 'https://github.com/bmkbauservice-hue/CallFlow-AI',
    preview: 'callflow',
  },
  {
    id: 'oceanmind-ai',
    title: 'OceanMind AI',
    category: 'KI-Assistenz',
    context: 'Eigenes Projekt',
    summary:
      'KI-Assistenzplattform für Segelyachten: unterstützt Skipper bei Navigation, Sicherheit, Wartung und Kommunikation.',
    description:
      'KI-Assistenzplattform für Segelyachten. Sie unterstützt Skipper bei Navigation, Sicherheit, Wartung und Kommunikation.',
    featureGroups: [
      {
        title: 'Umgesetzt (v0.1 Alpha)',
        items: [
          'Dashboard',
          'Digital Twin',
          'Kameraüberwachung',
          'Routenplanung',
          'Wartung',
          'Dokumentenverwaltung',
          'UKW-Funk',
        ],
      },
      {
        title: 'Geplant',
        items: ['KI-Kapitän', 'Sprachsteuerung', 'Offline-Karten', 'Signal-K-Anbindung'],
      },
    ],
    role: 'Idee, Entwurf und Planung.',
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Lucide'],
    status: { kind: 'alpha', label: 'v0.1 Alpha' },
    repoUrl: 'https://github.com/bmkbauservice-hue/OCEAN-AI',
    preview: 'yacht',
  },
  {
    id: 'bmsb-website',
    title: 'BMSB Bau- und Industrieservice GmbH',
    category: 'Unternehmenswebsite',
    summary: 'Firmenwebsite für Industrieservice, Bau, Instandhaltung und Qualität.',
    description: 'Unternehmenswebsite für Industrieservice, Bau, Instandhaltung und Qualität.',
    featureGroups: [
      {
        title: 'Funktionen',
        items: [
          'Responsives Layout',
          'Hell-/Dunkel-Modus',
          'Filterbare Projektgalerie mit 50 Bildern und Lightbox',
          'Animierte Leistungsbereiche mit Rücksicht auf reduzierte Bewegung',
        ],
      },
    ],
    stack: ['React 19', 'Vite 7', 'Tailwind CSS 4', 'Lucide'],
    status: { kind: 'progress', label: 'in Arbeit · vor Veröffentlichung' },
    repoUrl: 'https://github.com/bmkbauservice-hue/BMSB_GmbH_Version_2',
    preview: 'gallery',
  },
  {
    id: 'reisebuero-router',
    title: 'Reisebüro-Router',
    category: 'Web-App',
    context: 'Weiterbildungsprojekt (WBS Coding School)',
    summary:
      'Reisebüro-Website mit Routing und globaler Zustandsverwaltung, Buchungen und Premiumstatus.',
    description: 'Reisebüro-Website mit Routing und globaler Zustandsverwaltung.',
    featureGroups: [
      {
        title: 'Funktionen',
        items: [
          'Dynamische Detailseiten',
          'Eigene 404-Seite',
          'Buchungen mit Schutz vor Doppelbuchung',
          'Premiumstatus ab 3 Buchungen',
          'Theme-Auswahl in localStorage',
        ],
      },
    ],
    stack: ['React', 'React Router', 'Context API', 'useReducer', 'Tailwind CSS', 'DaisyUI', 'Vite'],
    status: { kind: 'done', label: 'abgeschlossen' },
    repoUrl: 'https://github.com/bmkbauservice-hue/travel-agency-router',
    preview: 'travel',
  },
]

// ---------------------------------------------------------------------------
// Skills – bewusst ohne Prozentwerte.
// ---------------------------------------------------------------------------

export type TechIconId =
  | 'react'
  | 'typescript'
  | 'javascript'
  | 'python'
  | 'node'
  | 'dotnet'
  | 'postgresql'
  | 'docker'
  | 'n8n'
  | 'linux'
  | 'git'

export const techStack: { id: TechIconId; label: string }[] = [
  { id: 'react', label: 'React' },
  { id: 'typescript', label: 'TypeScript' },
  { id: 'javascript', label: 'JavaScript' },
  { id: 'python', label: 'Python' },
  { id: 'node', label: 'Node.js' },
  { id: 'dotnet', label: 'C#/.NET' },
  { id: 'postgresql', label: 'PostgreSQL' },
  { id: 'docker', label: 'Docker' },
  { id: 'n8n', label: 'n8n' },
  { id: 'linux', label: 'Linux' },
  { id: 'git', label: 'Git' },
]

export const skillCategories = [
  { name: 'Frontend', items: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Tailwind CSS'] },
  { name: 'Backend', items: ['Python', 'FastAPI', 'Node.js', 'Fastify', 'C#', '.NET'] },
  { name: 'Datenbanken', items: ['PostgreSQL', 'SQLite'] },
  { name: 'Tools', items: ['Git', 'GitHub', 'Docker', 'VS Code', 'Linux'] },
  {
    name: 'KI & Automatisierung',
    items: [
      'KI-Agenten',
      'n8n',
      'LLM-Integration',
      'Prompt Engineering',
      'Ollama',
      'APIs',
      'NFC-Anwendungen',
    ],
  },
] as const

// ---------------------------------------------------------------------------
// Über mich & Zeitstrahl
// ---------------------------------------------------------------------------

export const about = {
  heading: 'Mehr als nur Code',
  paragraphs: [
    'Ich bin Mario Kujoth und komme als Quereinsteiger in die IT. Bis Ende 2024 war ich selbstständig. Daraus bringe ich mit: Verantwortung übernehmen, mit Kunden reden, Aufgaben zu Ende bringen.',
    'Von März 2026 bis März 2027 mache ich die Vollzeit-Weiterbildung „IT-Fachkraft für Software Engineering & AI“ bei der WBS Coding School.',
    'Daneben arbeite ich an eigenen und praxisnahen Projekten und experimentiere gern: mit KI-Agenten, im Web, im Heimnetz und mit Grafik.',
  ],
  facts: [
    { icon: 'location', text: 'Oranienburg' },
    { icon: 'calendar', text: 'Praktikum ab 29.01.2027' },
    { icon: 'languages', text: 'Deutsch & Englisch' },
  ],
  badge: 'Always Building',
} as const

export interface TimelineEntry {
  period: string
  title: string
  text: string
  next?: boolean
}

export const timeline: TimelineEntry[] = [
  {
    period: 'bis 12/2024',
    title: 'Selbstständig',
    text: 'Verantwortung übernehmen, mit Kunden reden, Aufgaben zu Ende bringen.',
  },
  {
    period: '03/2026 – 03/2027',
    title: 'Weiterbildung IT-Fachkraft für Software Engineering & AI',
    text: 'WBS Coding School, Vollzeit.',
  },
  {
    period: 'seit 2026',
    title: 'Eigene Projekte',
    text: 'Muju Agent, Zeiterfassung, CallFlow AI, OceanMind AI.',
  },
  {
    period: '29.01. – 30.03.2027',
    title: 'Praktikum',
    text: 'Gesucht: Landkreis Oberhavel oder Berlin, gern öffentlicher Dienst oder Schul-IT.',
    next: true,
  },
]

// ---------------------------------------------------------------------------
// Kontakt
// ---------------------------------------------------------------------------

export const contact = {
  eyebrow: 'Kontakt',
  heading: 'Lassen Sie uns gemeinsam etwas Großartiges entwickeln.',
  text: 'Sie haben einen Praktikumsplatz, ein Projekt oder eine Frage zu meiner Arbeit? Schreiben Sie mir eine E-Mail – ich freue mich auf Ihre Nachricht.',
  formNotice: 'Demo – Versand noch nicht aktiv, bitte E-Mail nutzen',
} as const
