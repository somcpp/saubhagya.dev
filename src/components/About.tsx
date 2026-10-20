"use client";

import { animate, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { stats } from "@/lib/data";
import { FadeIn, Mark, RevealText, SectionLabel } from "./Reveal";

function Counter({ value, decimals = 0, suffix }: { value: number; decimals?: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [v, setV] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const c = animate(0, value, { duration: 2, ease: [0.22, 1, 0.36, 1], onUpdate: setV });
    return () => c.stop();
  }, [inView, value]);

  return (
    <span ref={ref}>
      {v.toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  );
}

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-36">
      <SectionLabel index="01">About</SectionLabel>

      <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <RevealText
            className="font-serif text-[clamp(2.2rem,5vw,4.2rem)] leading-[1.02] tracking-[-0.01em]"
            text="I like the whole stack: the schema, the socket, and the pixel."
          />
          <FadeIn delay={0.2} className="mt-8 max-w-xl space-y-5 text-lg leading-relaxed text-ink-soft">
            <p>
              I&apos;m a third-year CS student who learns by shipping. My projects tend to start as &ldquo;how hard
              could it be?&rdquo; and end up as deployed products with auth, payments, real-time sync and <Mark>actual users</Mark>.
            </p>
            <p>
              Lately that&apos;s meant a <Mark delay={0.3}><span className="text-ink">multi-tenant school SaaS</span></Mark>, a{" "}
              <Mark delay={0.5}><span className="text-ink">Discord-style real-time platform</span></Mark>, and a{" "}
              <Mark delay={0.7}><span className="text-ink">CLI that draws your codebase as a graph</span></Mark>. When I&apos;m not building,
              I&apos;m usually grinding contests on LeetCode or contributing to open source.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-2 gap-3 self-end">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30, rotate: i % 2 ? 3 : -3 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              whileHover={{ y: -6, rotate: i % 2 ? 1.5 : -1.5 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 180, damping: 16, delay: i * 0.08 }}
              className={`rounded-3xl border border-ink p-5 shadow-[4px_4px_0_#16130f] ${
                ["bg-[#FFD9A8]", "bg-[#BFE8C9]", "bg-[#D4C8FF]", "bg-[#fffaf2]"][i]
              }`}
            >
              <div className="font-serif text-5xl leading-none md:text-6xl">
                <Counter value={s.value} decimals={s.decimals} suffix={s.suffix} />
              </div>
              <div className="mt-3 text-sm leading-snug text-ink/70">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
