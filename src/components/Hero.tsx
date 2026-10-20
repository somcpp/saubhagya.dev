"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { profile, socials } from "@/lib/data";
import { resumePath } from "@/lib/site";
import BrandIcon from "./BrandIcon";
import Magnetic from "./Magnetic";
import SkillGraph from "./SkillGraph";

const ease = [0.22, 1, 0.36, 1] as const;

function BouncyWord({ word, delay, className }: { word: string; delay: number; className?: string }) {
  return (
    <span className={`inline-block whitespace-nowrap ${className ?? ""}`} aria-label={word}>
      {word.split("").map((ch, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom" aria-hidden>
          <motion.span
            className="inline-block"
            initial={{ y: "105%", rotate: 8 }}
            animate={{ y: 0, rotate: 0 }}
            whileHover={{ y: -14, rotate: i % 2 ? 6 : -6, color: "#ff5a1f", transition: { type: "spring", stiffness: 500, damping: 10 } }}
            transition={{ duration: 0.9, ease, delay: delay + i * 0.035 }}
          >
            {ch}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative overflow-hidden pt-28 md:pt-32">
      <motion.div style={{ y, opacity: fade }} className="mx-auto grid max-w-7xl gap-10 px-5 md:px-10 lg:grid-cols-[1.05fr_1fr] lg:items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-line bg-paper-2/60 px-3 py-1.5 text-xs font-medium"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            {profile.status}
          </motion.div>

          <h1 className="font-serif text-[clamp(3.6rem,10vw,8.5rem)] leading-[0.88] tracking-[-0.02em]">
            <BouncyWord word={profile.firstName} delay={0.1} />
            <br />
            <BouncyWord word={profile.lastName} delay={0.4} className="italic" />
            <motion.span
              className="ml-2 inline-block align-top text-accent"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 12, delay: 0.9 }}
            >
              *
            </motion.span>
          </h1>

          <motion.p
            className="mt-8 max-w-md text-lg leading-relaxed text-ink-soft"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.8 }}
          >
            <span className="font-medium text-ink">{profile.role}</span> &amp; CS undergrad at KIET. {profile.tagline}
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 1 }}
          >
            <Magnetic>
              <a
                href="#work"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-ink px-6 py-3.5 text-paper"
              >
                <span className="bg-ember absolute inset-0 translate-y-full rounded-full transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-0" />
                <span className="relative">See my work</span>
                <span className="relative transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={resumePath}
                target="_blank"
                rel="noreferrer"
                data-cursor="PDF"
                className="group inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3.5 transition-colors hover:border-ink"
              >
                Résumé
                <span className="transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
              </a>
            </Magnetic>
            <div className="flex items-center gap-2">
              {socials.map((s, i) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 bg-[#fffaf2] text-ink transition-colors hover:border-ink"
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -4, rotate: i % 2 ? 8 : -8 }}
                  transition={{ type: "spring", stiffness: 400, damping: 14, delay: 1.1 + i * 0.06 }}
                >
                  <BrandIcon name={s.icon} size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, rotate: -1.5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease, delay: 0.2 }}
          className="relative"
        >
          <div className="dot-grid relative h-[420px] overflow-hidden rounded-[28px] border border-ink/15 bg-paper-2/50 sm:h-[520px]">
            <div className="absolute left-5 top-4 z-10 hidden font-mono sm:block text-[11px] uppercase tracking-widest text-ink-soft">
              fig. 1 — how things connect
            </div>
            <SkillGraph />
          </div>
          <motion.div
            className="absolute -bottom-5 -left-4 rotate-[-4deg] rounded-xl border border-ink bg-[#fffaf2] px-4 py-2 font-mono text-xs shadow-[3px_3px_0_#16130f]"
            initial={{ opacity: 0, y: 20, rotate: -12 }}
            animate={{ opacity: 1, y: 0, rotate: -4 }}
            transition={{ type: "spring", stiffness: 200, damping: 12, delay: 1.4 }}
          >
            <span className="text-accent">$</span> npx repotrace
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className="mx-auto mt-16 flex max-w-7xl items-center justify-between px-5 pb-6 font-mono text-[11px] uppercase tracking-widest text-ink-soft md:px-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        <span>Based in {profile.location}</span>
        <span className="flex items-center gap-2">
          Scroll
          <motion.span animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
            ↓
          </motion.span>
        </span>
      </motion.div>
    </section>
  );
}
