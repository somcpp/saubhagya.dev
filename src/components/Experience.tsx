"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { experience } from "@/lib/data";
import { FadeIn, RevealText, SectionLabel } from "./Reveal";

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const line = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="experience" className="mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-36">
      <SectionLabel index="03">Journey</SectionLabel>
      <RevealText
        className="max-w-3xl font-serif text-[clamp(2.4rem,6vw,5rem)] leading-[1] tracking-[-0.01em]"
        text="Where I've been learning."
      />

      <div ref={ref} className="relative mt-16 pl-10 md:pl-0">
        {/* track + animated fill */}
        <div className="absolute bottom-0 left-3 top-0 w-px bg-ink/15 md:left-1/2" />
        <motion.div style={{ scaleY: line }} className="absolute bottom-0 left-3 top-0 w-[2px] origin-top bg-accent md:left-1/2 md:-translate-x-[0.5px]" />

        <div className="space-y-16">
          {experience.map((e, i) => (
            <div key={e.role} className="relative md:grid md:grid-cols-2 md:gap-16">
              <motion.span
                className="absolute -left-[34px] top-2 grid h-5 w-5 place-items-center rounded-full border-2 border-ink bg-paper md:left-1/2 md:-translate-x-1/2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-30% 0px" }}
                transition={{ type: "spring", stiffness: 400, damping: 12 }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              </motion.span>

              <FadeIn className={`md:text-right ${i % 2 ? "md:order-2 md:text-left" : ""}`}>
                <div className="font-mono text-xs uppercase tracking-widest text-accent">{e.period}</div>
                <div className="mt-2 font-serif text-3xl italic md:text-4xl">{e.org}</div>
                <div className="mt-1 text-sm text-ink-soft">{e.meta}</div>
              </FadeIn>

              <FadeIn delay={0.1} className={`mt-4 md:mt-0 ${i % 2 ? "md:order-1" : ""}`}>
                <motion.div
                  whileHover={{ rotate: i % 2 ? 1 : -1, y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  className="rounded-3xl border border-ink bg-[#fffaf2] p-6 shadow-[5px_5px_0_#16130f]"
                >
                  <h3 className="text-lg font-semibold">{e.role}</h3>
                  <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-ink/75">
                    {e.points.map((p) => (
                      <li key={p} className="flex gap-3">
                        <span className="mt-[9px] h-1 w-3 shrink-0 bg-accent" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </FadeIn>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
