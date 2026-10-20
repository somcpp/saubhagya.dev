import {
  siClerk,
  siCloudflare,
  siCplusplus,
  siDocker,
  siExpress,
  siGit,
  siGithub,
  siJavascript,
  siJsonwebtokens,
  siLeetcode,
  siMongodb,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siNpm,
  siOpenjdk,
  siPostgresql,
  siPostman,
  siPrisma,
  siReact,
  siReactquery,
  siRedis,
  siRedux,
  siRender,
  siShadcnui,
  siSocketdotio,
  siSupabase,
  siTailwindcss,
  siTypescript,
  siVercel,
  siWebrtc,
  siZod,
  type SimpleIcon,
} from "simple-icons";

type Glyph = { path: string; hex: string };

// Simple generic glyphs for things without a brand mark (or whose brand
// owners asked simple-icons to remove them, e.g. LinkedIn and AWS).
const custom: Record<string, Glyph> = {
  linkedin: {
    hex: "0A66C2",
    path: "M4 2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm2.5 7.5V18h2.7V9.5H6.5Zm1.35-4.2a1.55 1.55 0 1 0 0 3.1 1.55 1.55 0 0 0 0-3.1ZM11 9.5V18h2.7v-4.3c0-1.2.4-2.2 1.7-2.2s1.5 1.1 1.5 2.3V18h2.7v-4.8c0-2.4-.9-3.9-3.2-3.9-1.3 0-2.2.6-2.7 1.4V9.5H11Z",
  },
  cloud: {
    hex: "FF9900",
    path: "M7 19a5 5 0 0 1-.6-9.96A6.5 6.5 0 0 1 18.9 9.2 4.9 4.9 0 0 1 18 19H7Z",
  },
  api: {
    hex: "FF5A1F",
    path: "M8.6 6.6 3.2 12l5.4 5.4 1.4-1.4-4-4 4-4-1.4-1.4Zm6.8 0L14 8l4 4-4 4 1.4 1.4 5.4-5.4-5.4-5.4Z",
  },
  shield: {
    hex: "2E9E6A",
    path: "M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3Zm-1.2 14.2-3.5-3.5 1.4-1.4 2.1 2.1 4.6-4.6 1.4 1.4-6 6Z",
  },
  socket: {
    hex: "7C5CFF",
    path: "M4 7h11l-3-3 1.4-1.4L19 8l-5.6 5.4L12 12l3-3H4V7Zm16 10H9l3 3-1.4 1.4L5 16l5.6-5.4L12 12l-3 3h11v2Z",
  },
  hook: {
    hex: "E8402B",
    path: "M13 2 4 14h7l-1 8 9-12h-7l1-8Z",
  },
  database: {
    hex: "4169E1",
    path: "M12 2c4.4 0 8 1.3 8 3v14c0 1.7-3.6 3-8 3s-8-1.3-8-3V5c0-1.7 3.6-3 8-3Zm6 5.3C16.5 8 14.4 8.5 12 8.5S7.5 8 6 7.3V10c0 .6 2.4 1.5 6 1.5s6-.9 6-1.5V7.3Zm0 6C16.5 14 14.4 14.5 12 14.5S7.5 14 6 13.3V16c0 .6 2.4 1.5 6 1.5s6-.9 6-1.5v-2.7Z",
  },
  neon: {
    hex: "00E599",
    path: "M4 6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v8.5c0 2.5-3.2 3.6-4.8 1.6L11 10.8V18a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V6Z",
  },
};

const brands: Record<string, SimpleIcon> = {
  typescript: siTypescript,
  javascript: siJavascript,
  "c++": siCplusplus,
  java: siOpenjdk,
  react: siReact,
  "next.js": siNextdotjs,
  "redux toolkit": siRedux,
  "rtk query": siRedux,
  "tanstack query": siReactquery,
  "tailwind css": siTailwindcss,
  tailwind: siTailwindcss,
  "shadcn/ui": siShadcnui,
  "node.js": siNodedotjs,
  express: siExpress,
  jwt: siJsonwebtokens,
  "socket.io": siSocketdotio,
  webrtc: siWebrtc,
  zod: siZod,
  postgresql: siPostgresql,
  mongodb: siMongodb,
  mysql: siMysql,
  redis: siRedis,
  prisma: siPrisma,
  docker: siDocker,
  cloudflare: siCloudflare,
  vercel: siVercel,
  render: siRender,
  supabase: siSupabase,
  git: siGit,
  github: siGithub,
  postman: siPostman,
  npm: siNpm,
  leetcode: siLeetcode,
  clerk: siClerk,
};

const aliases: Record<string, string> = {
  aws: "cloud",
  sql: "database",
  "rest apis": "api",
  rbac: "shield",
  websockets: "socket",
  webhooks: "hook",
};

export function getGlyph(name: string): Glyph | null {
  const key = name.toLowerCase();
  const b = brands[key];
  if (b) return { path: b.path, hex: b.hex };
  return custom[key] ?? custom[aliases[key]] ?? null;
}

/** Relative luminance of a hex colour, used to swap near-black logos on dark backgrounds. */
function isDark(hex: string) {
  const n = parseInt(hex, 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 70;
}

export default function BrandIcon({
  name,
  size = 20,
  mono = false,
  onDark = false,
  className,
}: {
  name: string;
  size?: number;
  /** Render in currentColor instead of the brand colour. */
  mono?: boolean;
  /** Background is dark; near-black brand colours fall back to currentColor. */
  onDark?: boolean;
  className?: string;
}) {
  const g = getGlyph(name);
  if (!g) return null;
  const fill = mono || (onDark && isDark(g.hex)) ? "currentColor" : `#${g.hex}`;
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden className={className} fill={fill}>
      <path d={g.path} />
    </svg>
  );
}
