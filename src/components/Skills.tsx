"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { skillGroups } from "@/lib/data";
import BrandIcon from "./BrandIcon";
import { RevealText } from "./Reveal";

const DOTS = ["#ff5a1f", "#7c5cff", "#2e9e6a", "#e0a100", "#3b82f6"];

export default function Skills() {
  const [active, setActive] = useState(0);

  return (
    <section id="skills" className="bg-ink py-28 text-paper md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-paper/60">
          <span className="text-accent">04</span>
          <span className="h-px w-10 bg-paper/30" />
          <span>Toolbox</span>
        </div>
        <RevealText
          className="max-w-3xl font-serif text-[clamp(2.4rem,6vw,5rem)] leading-[1] tracking-[-0.01em]"
          text="The tools I reach for."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[280px_1fr]">
          <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible">
            {skillGroups.map((g, i) => (
              <button
                key={g.name}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                className="group relative flex shrink-0 items-center gap-3 rounded-full px-5 py-3 text-left"
              >
                {active === i && (
                  <motion.span layoutId="skill-pill" className="absolute inset-0 rounded-full bg-paper" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                )}
                <span className="relative h-2 w-2 rounded-full" style={{ backgroundColor: DOTS[i] }} />
                <span className={`relative text-lg transition-colors ${active === i ? "text-ink" : "text-paper/70 group-hover:text-paper"}`}>
                  {g.name}
                </span>
                <span className={`relative ml-auto font-mono text-xs ${active === i ? "text-ink/50" : "text-paper/30"}`}>
                  {String(g.items.length).padStart(2, "0")}
                </span>
              </button>
            ))}
          </div>

          <div className="relative min-h-[260px]">
            <motion.div key={active} className="flex flex-wrap content-start gap-3">
              {skillGroups[active].items.map((s, i) => (
                <motion.span
                  key={s}
                  initial={{ opacity: 0, y: 30, rotate: (i % 3) * 4 - 4, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
                  whileHover={{ scale: 1.08, rotate: i % 2 ? 3 : -3, backgroundColor: DOTS[active], color: "#16130f" }}
                  transition={{ type: "spring", stiffness: 300, damping: 18, delay: i * 0.04 }}
                  className="flex items-center gap-3 rounded-2xl border border-paper/25 py-2.5 pl-2.5 pr-5 font-serif text-2xl md:text-4xl"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#fffaf2] md:h-11 md:w-11">
                    <BrandIcon name={s} size={22} />
                  </span>
                  {s}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>

        <div className="mt-16 border-t border-paper/15 pt-6 font-mono text-xs uppercase tracking-widest text-paper/50">
          Also fluent in: data structures &amp; algorithms · OOP · DBMS · operating systems
        </div>
      </div>
    </section>
  );
}
