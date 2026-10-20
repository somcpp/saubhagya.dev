"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

function useTicker(len: number, ms: number) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % len), ms);
    return () => clearInterval(t);
  }, [len, ms]);
  return i;
}

function Window({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-ink bg-[#fffaf2] shadow-[6px_6px_0_#16130f]">
      <div className="flex items-center gap-1.5 border-b border-ink/15 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-[11px] text-ink-soft">{title}</span>
      </div>
      <div className="relative flex-1 p-4">{children}</div>
    </div>
  );
}

const ROLES = ["Admin", "Teacher", "Student", "Parent"];
const BARS: number[][] = [
  [80, 62, 90, 74, 95, 68, 88],
  [55, 70, 66, 92, 78, 84, 60],
  [92, 88, 96, 90, 85, 94, 97],
  [70, 76, 72, 80, 86, 82, 90],
];

export function SchoolHubVisual() {
  const r = useTicker(ROLES.length, 2200);
  return (
    <Window title="schoolhub.app/dashboard">
      <div className="flex gap-1.5">
        {ROLES.map((role, i) => (
          <div key={role} className="relative rounded-full px-3 py-1 text-xs">
            {i === r && (
              <motion.span layoutId="sh-role" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
            )}
            <span className={`relative transition-colors ${i === r ? "text-paper" : "text-ink-soft"}`}>{role}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {["Attendance", "Fees paid", "Homework"].map((k, i) => (
          <div key={k} className="rounded-xl border border-ink/15 p-2.5">
            <div className="text-[10px] uppercase tracking-wider text-ink-soft">{k}</div>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${k}-${r}`}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                className="font-serif text-2xl"
              >
                {[94, 87, 12][i] - r * (i + 1)}
                {i < 2 ? "%" : ""}
              </motion.div>
            </AnimatePresence>
          </div>
        ))}
      </div>
      <div className="mt-4 flex h-28 items-end gap-2 rounded-xl border border-ink/15 p-3">
        {BARS[r].map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t-md"
            style={{ backgroundColor: i === 4 ? "#ff5a1f" : "#16130f" }}
            animate={{ height: `${h}%` }}
            transition={{ type: "spring", stiffness: 140, damping: 14, delay: i * 0.03 }}
          />
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between rounded-xl bg-ink px-3 py-2 text-xs text-paper">
        <span>Fee received · UPI</span>
        <span className="font-mono">₹4,500 ✓</span>
      </div>
    </Window>
  );
}

const MESSAGES = [
  { who: "aria", color: "#7c5cff", text: "anyone up for a voice call?" },
  { who: "dev", color: "#2e9e6a", text: "joining #general-voice 🎧" },
  { who: "you", color: "#ff5a1f", text: "shipping the socket fix first" },
  { who: "aria", color: "#7c5cff", text: "optimistic updates ftw ⚡" },
];

export function CommsVisual() {
  const n = useTicker(MESSAGES.length + 2, 1300);
  const shown = MESSAGES.slice(0, Math.min(n, MESSAGES.length));
  return (
    <Window title="# general">
      <div className="flex h-full gap-3">
        <div className="flex flex-col gap-2">
          {["#ff5a1f", "#7c5cff", "#2e9e6a", "#e0a100"].map((c, i) => (
            <motion.div
              key={c}
              className="h-9 w-9 border border-ink"
              style={{ backgroundColor: c }}
              animate={{ borderRadius: i === 0 ? "30%" : "50%" }}
              whileHover={{ borderRadius: "30%" }}
            />
          ))}
        </div>
        <div className="flex flex-1 flex-col justify-end gap-2 overflow-hidden rounded-xl border border-ink/15 p-3">
          <AnimatePresence initial={false}>
            {shown.map((m, i) => (
              <motion.div
                key={i}
                layout
                initial={{ opacity: 0, y: 16, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="flex items-start gap-2"
              >
                <span className="mt-0.5 h-6 w-6 shrink-0 rounded-full" style={{ backgroundColor: m.color }} />
                <div>
                  <div className="text-[11px] font-semibold">{m.who}</div>
                  <div className="text-sm text-ink/80">{m.text}</div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div className="flex h-5 items-center gap-1 pl-8">
            {n < MESSAGES.length &&
              [0, 1, 2].map((d) => (
                <motion.span
                  key={d}
                  className="h-1.5 w-1.5 rounded-full bg-ink/50"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8, delay: d * 0.15 }}
                />
              ))}
          </div>
          <div className="rounded-lg bg-ink/5 px-3 py-2 text-xs text-ink-soft">Message #general</div>
        </div>
      </div>
    </Window>
  );
}

const GRAPH = {
  nodes: [
    { id: "index.ts", x: 50, y: 14 },
    { id: "app.ts", x: 24, y: 40 },
    { id: "cli.ts", x: 76, y: 40 },
    { id: "parser", x: 14, y: 70 },
    { id: "graph", x: 44, y: 70 },
    { id: "dagre", x: 80, y: 70 },
    { id: "utils", x: 30, y: 92 },
  ],
  edges: [
    [0, 1],
    [0, 2],
    [1, 3],
    [1, 4],
    [2, 4],
    [2, 5],
    [3, 6],
    [4, 6],
  ],
};

export function RepoTraceVisual() {
  const step = useTicker(4, 2600);
  return (
    <Window title="~/my-app — zsh">
      <div className="font-mono text-xs">
        <div>
          <span className="text-accent">❯</span> npx repotrace
        </div>
        <motion.div key={`l-${step}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-ink-soft">
          ✓ parsed 128 files · 0 cycles · 4 clusters
        </motion.div>
      </div>
      <div className="relative mt-3 h-[calc(100%-3rem)] min-h-48 rounded-xl border border-ink/15 bg-paper/60">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          {GRAPH.edges.map(([a, b], i) => (
            <motion.line
              key={`${step}-${i}`}
              x1={GRAPH.nodes[a].x}
              y1={GRAPH.nodes[a].y}
              x2={GRAPH.nodes[b].x}
              y2={GRAPH.nodes[b].y}
              stroke="#16130f"
              strokeWidth={0.5}
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.12 }}
            />
          ))}
        </svg>
        {GRAPH.nodes.map((n, i) => (
          <motion.div
            key={`${step}-${n.id}`}
            className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-md border border-ink px-2 py-0.5 font-mono text-[10px] ${
              i === 0 ? "bg-ink text-paper" : i === 4 ? "bg-[#BFE8C9]" : "bg-[#fffaf2]"
            }`}
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 14, delay: 0.4 + i * 0.1 }}
          >
            {n.id}
          </motion.div>
        ))}
      </div>
    </Window>
  );
}
