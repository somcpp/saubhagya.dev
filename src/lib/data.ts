export const profile = {
  name: "Saubhagya Sharma",
  firstName: "Saubhagya",
  lastName: "Sharma",
  role: "Full-Stack Developer",
  tagline:
    "I build production-style products end to end, from multi-tenant SaaS to real-time platforms and developer tools people actually install.",
  email: "saubhagyacpp@gmail.com",
  location: "India",
  status: "Open to SWE internships",
  links: {
    github: "https://github.com/somcpp",
    linkedin: "https://www.linkedin.com/in/saubhagya-sharma-31361a328/",
    leetcode: "https://leetcode.com/u/saubhagyacpp/",
    npm: "https://www.npmjs.com/~saubhagyacpp",
  },
};

export const stats = [
  { value: 650, suffix: "+", label: "LeetCode problems solved" },
  { value: 1500, suffix: "+", label: "npm downloads in week one" },
  { value: 1690, suffix: "", label: "Peak contest rating" },
  { value: 8.27, suffix: "", label: "CGPA at KIET", decimals: 2 },
];

export type Project = {
  slug: string;
  index: string;
  title: string;
  kicker: string;
  description: string;
  points: string[];
  stack: string[];
  links: { label: string; href: string }[];
  color: string;
  ink: string;
};

export const projects: Project[] = [
  {
    slug: "schoolhub",
    index: "01",
    title: "SchoolHub",
    kicker: "Multi-tenant School Management SaaS",
    description:
      "Role-based portals for super admins, school admins, teachers, students and parents, covering attendance, homework, fees, exams, report cards, timetables and a library.",
    points: [
      "22-model PostgreSQL schema with shared-schema multi-tenancy",
      "Tenant middleware + schoolId indexing blocks cross-tenant (IDOR) access",
      "JWT access/refresh tokens in HTTP-only cookies, RBAC guards, Zod validation",
      "Razorpay UPI fee payments, receipts and Cloudflare R2 uploads",
    ],
    stack: ["React 19", "TypeScript", "TanStack Query", "Express", "PostgreSQL", "Prisma", "Zod", "Razorpay", "R2"],
    links: [
      { label: "Live demo", href: "https://schoolhub-31q.pages.dev/" },
      { label: "GitHub", href: "https://github.com/somcpp/School_Mangement_System" },
    ],
    color: "#FFD9A8",
    ink: "#7A3E00",
  },
  {
    slug: "discord",
    index: "02",
    title: "Multi-Server Comms",
    kicker: "Real-time Discord-style platform",
    description:
      "Multi-server chat with text, voice and video channels, DMs and role-based access, built on a hybrid real-time architecture.",
    points: [
      "Standalone Socket.io service + Next.js API routes for live messages, edits, deletes",
      "Voice & video channels powered by LiveKit",
      "Cursor pagination, infinite scroll and optimistic updates",
      "Polling fallback and media attachments via UploadThing",
    ],
    stack: ["Next.js 16", "TypeScript", "Socket.io", "LiveKit", "TanStack Query", "PostgreSQL", "Prisma", "Clerk"],
    links: [
      { label: "Live demo", href: "https://discord-zeta-six.vercel.app/" },
      { label: "GitHub", href: "https://github.com/somcpp/Discord_Inspired_Communication_Platform" },
    ],
    color: "#D4C8FF",
    ink: "#3B2A8C",
  },
  {
    slug: "repotrace",
    index: "03",
    title: "RepoTrace",
    kicker: "Interactive codebase intelligence CLI",
    description:
      "Run `npx repotrace` and see your codebase as an interactive dependency graph. 1,500+ downloads in its first week.",
    points: [
      "AST engine for TypeScript, JavaScript, Python and Dart/Flutter",
      "Resolves imports and symbols without executing code",
      "Kahn's topological sort, cycle detection & breaking",
      "Directory clustering and execution-flow tracing in React Flow",
    ],
    stack: ["TypeScript", "Node.js CLI", "AST Parsing", "React Flow", "Dagre"],
    links: [
      { label: "npm", href: "https://www.npmjs.com/package/repotrace" },
      { label: "GitHub", href: "https://github.com/somcpp/RepoTrace" },
    ],
    color: "#BFE8C9",
    ink: "#14532D",
  },
];

export const experience = [
  {
    role: "Backend Development Intern",
    org: "DecodeLabs",
    meta: "Remote",
    period: "Jun 2026 – Jul 2026",
    points: [
      "Contributed to the backend of a School LMS with Node.js, Express, PostgreSQL and Prisma.",
      "Developed REST APIs and implemented JWT authentication with HTTP-only cookies.",
      "Worked with the frontend team on API integration and fixed defects raised in QA.",
    ],
  },
  {
    role: "B.Tech, Computer Science & Engineering",
    org: "KIET Deemed to be University",
    meta: "CGPA 8.27",
    period: "2024 – 2028",
    points: ["Third year. Focus on data structures & algorithms, OOP, DBMS and operating systems."],
  },
];

export const skillGroups = [
  { name: "Languages", items: ["TypeScript", "JavaScript", "C++", "SQL", "Java"] },
  {
    name: "Frontend",
    items: ["React", "Next.js", "Redux Toolkit", "RTK Query", "TanStack Query", "Tailwind CSS", "shadcn/ui"],
  },
  {
    name: "Backend",
    items: ["Node.js", "Express", "REST APIs", "JWT", "RBAC", "Socket.io", "WebSockets", "WebRTC", "Webhooks", "Zod"],
  },
  { name: "Data", items: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Prisma"] },
  {
    name: "Cloud & Tools",
    items: ["AWS", "Docker", "Cloudflare", "Vercel", "Render", "Neon", "Supabase", "Git", "Postman"],
  },
];

export const achievements = [
  { emoji: "📦", title: "1,500+ npm downloads", body: "RepoTrace hit 1.5k downloads in its first week of launch." },
  { emoji: "🧠", title: "650+ problems solved", body: "LeetCode, with a peak contest rating of 1690." },
  { emoji: "🌱", title: "Open source", body: "Contributor to Better Auth and Clerk." },
  { emoji: "🏆", title: "Hackathon winner", body: "Won iOS Developer Night; selected in SIH college internals." },
  { emoji: "☁️", title: "AWS Certified", body: "AWS Certified Cloud Practitioner." },
];

// Nodes for the hero graph. Groups drive color.
export const graphNodes = [
  { id: "me", label: "Saubhagya", group: "core" },
  { id: "ts", label: "TypeScript", group: "lang" },
  { id: "cpp", label: "C++", group: "lang" },
  { id: "react", label: "React", group: "front" },
  { id: "next", label: "Next.js", group: "front" },
  { id: "tailwind", label: "Tailwind", group: "front" },
  { id: "node", label: "Node.js", group: "back" },
  { id: "socket", label: "Socket.io", group: "back" },
  { id: "pg", label: "PostgreSQL", group: "data" },
  { id: "prisma", label: "Prisma", group: "data" },
  { id: "redis", label: "Redis", group: "data" },
  { id: "aws", label: "AWS", group: "cloud" },
  { id: "docker", label: "Docker", group: "cloud" },
  { id: "schoolhub", label: "SchoolHub", group: "project" },
  { id: "comms", label: "Comms", group: "project" },
  { id: "repotrace", label: "RepoTrace", group: "project" },
] as const;

export const graphEdges: [string, string][] = [
  ["me", "ts"],
  ["me", "cpp"],
  ["me", "schoolhub"],
  ["me", "comms"],
  ["me", "repotrace"],
  ["ts", "react"],
  ["ts", "node"],
  ["react", "next"],
  ["react", "tailwind"],
  ["node", "socket"],
  ["node", "prisma"],
  ["prisma", "pg"],
  ["node", "redis"],
  ["aws", "docker"],
  ["me", "aws"],
  ["schoolhub", "react"],
  ["schoolhub", "pg"],
  ["comms", "next"],
  ["comms", "socket"],
  ["repotrace", "ts"],
];
