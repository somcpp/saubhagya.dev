"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

/** Word-by-word slide-up reveal for headings. */
export function RevealText({
  text,
  className,
  delay = 0,
  as: Tag = "h2",
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p";
}) {
  const words = text.split(" ");
  return (
    <Tag className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.9, ease, delay: delay + i * 0.06 }}
          >
            {w}
            {i < words.length - 1 && " "}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** Fade + rise for any block. */
export function FadeIn({
  children,
  className,
  delay = 0,
  y = 30,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.8, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Highlighter-pen sweep behind inline text when it scrolls into view. */
export function Mark({ children, delay = 0.2 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.span
      className="rounded-[3px] px-0.5 [box-decoration-break:clone] [-webkit-box-decoration-break:clone]"
      style={{
        backgroundImage: "linear-gradient(100deg, rgba(255,176,32,0.45), rgba(255,90,31,0.38) 50%, rgba(232,64,43,0.34))",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "0 88%",
      }}
      initial={{ backgroundSize: "0% 42%" }}
      whileInView={{ backgroundSize: "100% 42%" }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </motion.span>
  );
}

export function SectionLabel({ index, children }: { index: string; children: ReactNode }) {
  return (
    <FadeIn y={10} className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">
      <span className="text-accent">{index}</span>
      <span className="h-px w-10 bg-ink/30" />
      <span>{children}</span>
    </FadeIn>
  );
}
