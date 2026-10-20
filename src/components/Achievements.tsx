"use client";

import { motion } from "motion/react";
import { useRef, useState } from "react";
import { useFinePointer } from "@/lib/useFinePointer";
import { achievements } from "@/lib/data";
import { RevealText, SectionLabel } from "./Reveal";

const COLORS = ["#FFD9A8", "#D4C8FF", "#BFE8C9", "#fffaf2", "#FFC2D1"];
const TILTS = [-6, 4, -3, 7, -5];

export default function Achievements() {
  const board = useRef<HTMLDivElement>(null);
  const canDrag = useFinePointer();
  const [z, setZ] = useState<number[]>(achievements.map((_, i) => i));

  const toFront = (i: number) =>
    setZ((prev) => {
      const max = Math.max(...prev);
      return prev.map((v, j) => (j === i ? max + 1 : v));
    });

  return (
    <section id="achievements" className="mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-36">
      <SectionLabel index="05">Wins</SectionLabel>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <RevealText
          className="max-w-3xl font-serif text-[clamp(2.4rem,6vw,5rem)] leading-[1] tracking-[-0.01em]"
          text="A few proud moments."
        />
        {canDrag && <p className="font-mono text-xs uppercase tracking-widest text-ink-soft">psst — the stickers are draggable</p>}
      </div>

      <div
        ref={board}
        className="dot-grid relative mt-12 flex flex-wrap justify-center gap-5 rounded-[32px] border border-ink/15 bg-paper-2/50 p-6 md:p-10"
      >
        {achievements.map((a, i) => (
          <motion.div
            key={a.title}
            drag={canDrag}
            dragConstraints={board}
            dragElastic={0.15}
            dragTransition={{ bounceStiffness: 300, bounceDamping: 18 }}
            onPointerDown={() => toFront(i)}
            whileDrag={{ scale: 1.08, rotate: 0, boxShadow: "12px 14px 0 #16130f" }}
            whileHover={{ rotate: 0, y: -4 }}
            initial={{ opacity: 0, y: 60, rotate: TILTS[i] * 2 }}
            whileInView={{ opacity: 1, y: 0, rotate: TILTS[i] }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ type: "spring", stiffness: 160, damping: 14, delay: i * 0.08 }}
            data-cursor={canDrag ? "Drag" : undefined}
            style={{ backgroundColor: COLORS[i], zIndex: z[i] }}
            className="relative w-full rounded-3xl border border-ink p-6 shadow-[5px_6px_0_#16130f] sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]"
          >
            <span className="absolute -top-3 left-1/2 h-6 w-16 -translate-x-1/2 rotate-[-3deg] bg-ink/10 backdrop-blur-sm" />
            <div className="text-4xl">{a.emoji}</div>
            <div className="mt-4 font-serif text-3xl leading-tight">{a.title}</div>
            <p className="mt-2 text-sm leading-relaxed text-ink/70">{a.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
