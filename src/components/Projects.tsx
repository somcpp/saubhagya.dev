"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { projects, type Project } from "@/lib/data";
import { useMediaQuery } from "@/lib/useFinePointer";
import { CommsVisual, RepoTraceVisual, SchoolHubVisual } from "./ProjectVisuals";
import { RevealText, SectionLabel } from "./Reveal";

const VISUALS: Record<string, () => React.ReactElement> = {
  schoolhub: SchoolHubVisual,
  discord: CommsVisual,
  repotrace: RepoTraceVisual,
};

function Card({
  project,
  i,
  progress,
  total,
  stacked,
}: {
  project: Project;
  i: number;
  progress: MotionValue<number>;
  total: number;
  stacked: boolean;
}) {
  // Cards further back shrink as later cards stack over them.
  const targetScale = 1 - (total - 1 - i) * 0.05;
  const scale = useTransform(progress, [i / total, 1], [1, targetScale]);
  const Visual = VISUALS[project.slug];

  return (
    <div className="py-3 lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center lg:justify-center lg:py-0">
      <motion.article
        style={stacked ? { scale, top: i * 28, backgroundColor: project.color } : { backgroundColor: project.color }}
        className="relative grid w-full origin-top gap-8 overflow-hidden rounded-[32px] border border-ink p-6 shadow-[0_-20px_60px_-30px_rgba(22,19,15,0.4)] md:p-8 lg:grid-cols-[1fr_1.1fr] lg:gap-10"
      >
        <div className="flex flex-col">
          <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest" style={{ color: project.ink }}>
            <span>{project.kicker}</span>
            <span>
              {project.index}/{String(total).padStart(2, "0")}
            </span>
          </div>
          <h3 className="mt-3 font-serif text-5xl leading-none tracking-tight md:text-6xl">{project.title}</h3>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-ink/80">{project.description}</p>

          <ul className="mt-5 space-y-2 text-sm">
            {project.points.map((p) => (
              <li key={p} className="flex gap-3">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rotate-45 bg-ink" />
                <span className="text-ink/85">{p}</span>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <span key={s} className="rounded-full border border-ink/25 bg-white/40 px-2.5 py-1 text-xs">
                {s}
              </span>
            ))}
          </div>

          <div className="mt-auto flex flex-wrap gap-3 pt-6">
            {project.links.map((l, j) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                data-cursor="Open"
                className={`group inline-flex items-center gap-2 rounded-full border border-ink px-5 py-2.5 text-sm transition-all hover:-translate-y-0.5 hover:shadow-[3px_3px_0_#16130f] ${
                  j === 0 ? "bg-ink text-paper" : "bg-transparent"
                }`}
              >
                {l.label}
                <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
              </a>
            ))}
          </div>
        </div>

        <div className="hidden h-[400px] md:block">
          <Visual />
        </div>
      </motion.article>
    </div>
  );
}

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // Sticky stacking only on large screens; cards are too tall for phones.
  const stacked = useMediaQuery("(min-width: 1024px)");

  return (
    <section id="work" className="mx-auto max-w-7xl px-5 pt-20 md:px-10">
      <SectionLabel index="02">Selected work</SectionLabel>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <RevealText
          className="max-w-3xl font-serif text-[clamp(2.4rem,6vw,5rem)] leading-[1] tracking-[-0.01em]"
          text="Things I've built and shipped."
        />
        <p className="max-w-xs text-ink-soft">Three products, each one deployed and live.</p>
      </div>

      <div ref={ref} className="relative mt-6">
        {projects.map((p, i) => (
          <Card key={p.slug} project={p} i={i} progress={scrollYProgress} total={projects.length} stacked={stacked} />
        ))}
      </div>
    </section>
  );
}
