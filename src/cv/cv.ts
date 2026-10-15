// Every entry below comes from the LinkedIn profile export or from public sources (GitHub
// profile, repositories and pull requests). Keep it that way: don't add anything that can't be
// checked. Personal phone numbers and e-mail addresses stay out: this page is public.

export type Link = Readonly<{
  label: string;
  href: string;
}>;

export type Organization = Readonly<{
  label: string;
  href?: string;
}>;

export type Experience = Readonly<{
  role: string;
  organization: Organization;
  location: string;
  start: string;
  end?: string;
  highlights: readonly string[];
}>;

export type Project = Readonly<{
  name: string;
  href: string;
  description: string;
}>;

export const NAME = 'Tasso Evangelista Pinto';

export const HEADLINE = 'Staff Frontend Engineer';

export const LOCATION = 'Porto Alegre, Brazil';

export const SUMMARY =
  'Software developer since 2011, with a background in management systems and websites built ' +
  'with PHP and relational databases. Since 2018 at Rocket.Chat, the open source ' +
  'communications platform, now as a staff frontend engineer on the architecture team, working ' +
  'across its web client, desktop app and design system, with more than 1,400 merged pull ' +
  'requests in the RocketChat organization on GitHub.';

export const CONTACTS: readonly Link[] = [
  { label: 'tasso@tassoevan.me', href: 'mailto:tasso@tassoevan.me' },
  { label: 'tassoevan.me', href: 'https://tassoevan.me/' },
  { label: 'GitHub', href: 'https://github.com/tassoevan' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/tassoevan' },
];

export const EXPERIENCE: readonly Experience[] = [
  {
    role: 'Staff Frontend Engineer',
    organization: { label: 'Rocket.Chat', href: 'https://rocket.chat/' },
    location: 'Porto Alegre, Brazil',
    start: '2018-06',
    highlights: [
      'Member of the architecture team.',
      'Over 800 merged pull requests in the main Rocket.Chat repository (TypeScript, React), ' +
        'including feature work such as the seats cap for licensed workspaces and the ongoing ' +
        'migration of modules to TypeScript.',
      'Top contributor to Fuselage, the Rocket.Chat design system and React component library, ' +
        'since 2019; currently moving its packages into the main monorepo.',
      'Top contributor to Rocket.Chat Desktop, the Electron client for Windows, macOS and Linux, ' +
        'since 2018.',
      'Contributions to the Livechat widget and to the React Native mobile app.',
    ],
  },
  {
    role: 'Information Systems Programmer',
    organization: { label: 'Canopus Informática' },
    location: 'Porto Alegre, Brazil',
    start: '2015-10',
    end: '2018-06',
    highlights: [],
  },
  {
    role: 'Software Development Consultant',
    organization: { label: 'Alligo' },
    location: 'Porto Alegre, Brazil',
    start: '2014-04',
    end: '2016-04',
    highlights: [
      'Worked on the development of the Atlas Digital da Economia Solidária (SIES project), a ' +
        'digital atlas of the solidarity economy in Brazil.',
    ],
  },
  {
    role: 'Information Systems Programmer (mid-level)',
    organization: { label: 'Grupo API' },
    location: 'Porto Alegre, Brazil',
    start: '2013-12',
    end: '2014-08',
    highlights: [
      'Developed and maintained management systems and websites for client institutions.',
      'Research and development, and promotion of good practices for building enterprise ' +
        'applications on web technologies.',
    ],
  },
  {
    role: 'Information Systems Programmer (junior)',
    organization: { label: 'Grupo API' },
    location: 'Porto Alegre, Brazil',
    start: '2011-08',
    end: '2013-12',
    highlights: [
      'Developed and maintained management systems and websites for client institutions.',
    ],
  },
  {
    role: 'Undergraduate Research Fellow',
    organization: { label: 'LAAO' },
    location: 'Porto Alegre, Brazil',
    start: '2009-12',
    end: '2011-07',
    highlights: [
      'Assisted research on biofuels and on the identification of naphthenic acids in oil ' +
        'refinery wastewater, working directly with comprehensive two-dimensional gas ' +
        'chromatography (GC×GC).',
    ],
  },
];

export const SKILLS: readonly Readonly<{ area: string; items: readonly string[] }>[] = [
  { area: 'Frontend', items: ['TypeScript', 'JavaScript', 'React', 'HTML', 'CSS'] },
  { area: 'Platforms', items: ['Node.js', 'Electron', 'Meteor', 'Cordova'] },
  { area: 'Back end', items: ['PHP', 'MySQL', 'PostgreSQL'] },
  { area: 'Practices', items: ['Design systems', 'Monorepos', 'Open source maintenance'] },
  { area: 'Also', items: ['Java', 'C', 'Zig', 'Rust'] },
];

export const EDUCATION: readonly Readonly<{
  degree: string;
  institution: Link;
  start: string;
  end?: string;
  status: string;
}>[] = [
  {
    // Licenciatura: Brazilian teaching degree. Eight semesters, started in the second semester
    // of 2025, so it's expected to end after the first semester of 2029.
    degree: 'Teaching Degree in Rural Education (Educação do Campo), Natural Sciences',
    institution: {
      label: 'Universidade Federal do Rio Grande do Sul (UFRGS)',
      href: 'https://www.ufrgs.br/',
    },
    start: '2025',
    status: 'in progress, expected completion in 2029',
  },
  {
    degree: 'Bachelor of Chemical Engineering',
    institution: {
      label: 'Universidade Federal do Rio Grande do Sul (UFRGS)',
      href: 'https://www.ufrgs.br/',
    },
    start: '2008',
    end: '2019',
    status: 'not completed',
  },
];

export const CERTIFICATIONS: readonly string[] = [
  'iMasters Certified Professional: JavaScript, Good Practices (Boas Práticas)',
];

export const TALKS: readonly Readonly<{
  title: string;
  lang: string;
  href: string;
  event: string;
  date: string;
  coauthors: readonly string[];
}>[] = [
  {
    title: 'Considerações técnicas para atlas temáticos digitais e interfaces para dados abertos',
    lang: 'pt-BR',
    href: 'https://www.slideshare.net/slideshow/consideraes-tcnicas-para-atlas-temticos-digitais-e-interfaces-para-dados-abertos-39624493/39624493',
    event: 'Conferência Web.br 2014',
    date: '2014-09-25',
    coauthors: ['Emerson Rocha Luiz', 'Juliana Fernandes'],
  },
];

export const LANGUAGES: readonly Readonly<{ language: string; level: string }>[] = [
  { language: 'Portuguese', level: 'native' },
  { language: 'English', level: 'intermediate' },
];

export const PROJECTS: readonly Project[] = [
  {
    name: 'pdo-oci-extension',
    href: 'https://github.com/tassoevan/pdo-oci-extension',
    description: 'Guide to compiling the PDO OCI extension for PHP 5.',
  },
  {
    name: 'prototype',
    href: 'https://github.com/tassoevan/prototype',
    description: 'Prototype-based programming for PHP.',
  },
  {
    name: 'Cordova plugins',
    href: 'https://github.com/tassoevan?tab=repositories&q=cordova-plugin-evan',
    description:
      'Android plugins for Cordova apps: background execution, phone call events and the home action.',
  },
  {
    name: 'gamepad',
    href: 'https://github.com/tassoevan/gamepad',
    description: 'RP2040-based USB adapter for SNES controllers, written in C.',
  },
];

export const CONTRIBUTIONS: readonly Link[] = [
  {
    label: 'React documentation in Brazilian Portuguese',
    href: 'https://github.com/reactjs/pt-br.react.dev',
  },
  { label: 'Idiorm', href: 'https://github.com/j4mie/idiorm' },
  { label: 'Slim-Views', href: 'https://github.com/slimphp/Slim-Views' },
  { label: 'GitList', href: 'https://github.com/klaussilveira/gitlist' },
  { label: 'event-target-polyfill', href: 'https://github.com/benlesh/event-target-polyfill' },
  { label: 'Kaluma', href: 'https://github.com/kaluma-project/kaluma-project.github.io' },
];
