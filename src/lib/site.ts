import { profile } from "./data";

/**
 * Canonical site URL. Set NEXT_PUBLIC_SITE_URL once you have a custom domain;
 * on Vercel it falls back to the production deployment URL automatically.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const siteTitle = `${profile.name} · Full-Stack Developer`;

export const siteDescription =
  "Saubhagya Sharma is a full-stack developer and CS student at KIET building multi-tenant SaaS, real-time platforms and developer tools with React, Next.js, Node.js, TypeScript and PostgreSQL.";

export const resumePath = "/Saubhagya_Sharma.pdf";
