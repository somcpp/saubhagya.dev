import { profile } from "./data";

/**
 * Canonical site URL used for metadata, the sitemap and OG images.
 * Production always points at the real domain (even on Vercel preview
 * deployments) so search engines and link previews never see *.vercel.app.
 * NEXT_PUBLIC_SITE_URL overrides it if the domain ever changes.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.NODE_ENV === "production" ? "https://saubhagya.dev" : "http://localhost:3000");

export const siteTitle = `${profile.name} · Full-Stack Developer`;

export const siteDescription =
  "Saubhagya Sharma is a full-stack developer and CS student at KIET building multi-tenant SaaS, real-time platforms and developer tools with React, Next.js, Node.js, TypeScript and PostgreSQL.";

export const resumePath = "/Saubhagya_Sharma.pdf";
