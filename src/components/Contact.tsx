"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { profile } from "@/lib/data";
import Magnetic from "./Magnetic";
import { RevealText } from "./Reveal";

const socials = [
  { label: "GitHub", href: profile.links.github },
  { label: "LinkedIn", href: profile.links.linkedin },
  { label: "LeetCode", href: profile.links.leetcode },
  { label: "npm", href: profile.links.npm },
];

function LocalTime() {
  const [t, setT] = useState("");
  useEffect(() => {
    const f = () =>
      setT(
        new Intl.DateTimeFormat("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Kolkata",
        }).format(new Date()),
      );
    f();
    const id = setInterval(f, 15_000);
    return () => clearInterval(id);
  }, []);
  return <span suppressHydrationWarning>{t} IST</span>;
}

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <footer id="contact" className="relative overflow-hidden bg-accent text-ink">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-28 md:px-10 md:pt-36">
        <div className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-ink/70">
          <span>06</span>
          <span className="h-px w-10 bg-ink/40" />
          <span>Contact</span>
        </div>

        <RevealText
          as="h2"
          className="font-serif text-[clamp(3.2rem,11vw,10rem)] leading-[0.9] tracking-[-0.02em]"
          text="Let's build something."
        />

        <p className="mt-8 max-w-lg text-lg text-ink/80">
          I&apos;m looking for a software engineering internship. If you have a role, a project, or just want to talk
          sockets and schemas, my inbox is open.
        </p>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <Magnetic strength={0.25}>
            <a
              href={`mailto:${profile.email}`}
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-ink px-7 py-4 text-lg text-paper"
            >
              <span className="absolute inset-0 translate-y-full rounded-full bg-paper transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-0" />
              <span className="relative transition-colors duration-500 group-hover:text-ink">{profile.email}</span>
            </a>
          </Magnetic>
          <button
            onClick={copy}
            className="relative h-[60px] min-w-[120px] overflow-hidden rounded-full border border-ink px-6 text-sm font-medium"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={copied ? "y" : "n"}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="block"
              >
                {copied ? "Copied ✓" : "Copy email"}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>

        <div className="mt-24 grid gap-10 border-t border-ink/25 pt-8 md:grid-cols-3">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-ink/60">Elsewhere</div>
            <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer" className="group relative text-lg">
                    {s.label}
                    <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-ink transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-ink/60">Local time</div>
            <div className="mt-3 text-lg">
              <LocalTime />
            </div>
          </div>
          <div className="md:text-right">
            <div className="font-mono text-xs uppercase tracking-widest text-ink/60">Phone</div>
            <a href="tel:+916371454460" className="mt-3 block text-lg">
              +91 63714 54460
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-widest text-ink/60">
          <span>© 2026 Saubhagya Sharma</span>
          <span>Built with Next.js, Motion &amp; too much chai</span>
          <a href="#top" className="hover:text-ink">
            Back to top ↑
          </a>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none select-none whitespace-nowrap text-center font-serif text-[22vw] italic leading-[0.75] text-ink/[0.08]"
      >
        saubhagya
      </div>
    </footer>
  );
}
