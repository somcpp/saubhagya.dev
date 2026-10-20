"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import { graphEdges, graphNodes } from "@/lib/data";
import { COMPACT_HIDDEN, step, type SimNode, type SimState } from "@/lib/graphPhysics";

type Group = (typeof graphNodes)[number]["group"];

const DOT: Record<Group, string> = {
  core: "#ff5a1f",
  lang: "#ff5a1f",
  front: "#7c5cff",
  back: "#2e9e6a",
  data: "#e0a100",
  cloud: "#3b82f6",
  project: "#16130f",
};

const PROJECT_FILL: Record<string, string> = {
  schoolhub: "#FFD9A8",
  comms: "#D4C8FF",
  repotrace: "#BFE8C9",
};

const CORE_R = 34;

function nodeSize(label: string, group: Group) {
  if (group === "core") return { w: CORE_R * 2, h: CORE_R * 2 };
  return { w: label.length * 7.4 + (group === "project" ? 30 : 36), h: 30 };
}

export default function SkillGraph() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<string, SVGGElement | null>>({});
  const edgeRefs = useRef<Record<string, SVGLineElement | null>>({});
  const sim = useRef<SimState | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [grabbed, setGrabbed] = useState(false);

  const compact = size.w > 0 && size.w < 480;
  const nodes = useMemo(() => graphNodes.filter((n) => !compact || !COMPACT_HIDDEN.has(n.id)), [compact]);
  const edges = useMemo(
    () => graphEdges.filter(([a, b]) => !compact || (!COMPACT_HIDDEN.has(a) && !COMPACT_HIDDEN.has(b))),
    [compact],
  );

  const neighbors = useMemo(() => {
    const m: Record<string, Set<string>> = {};
    for (const n of nodes) m[n.id] = new Set([n.id]);
    for (const [a, b] of edges) {
      m[a].add(b);
      m[b].add(a);
    }
    return m;
  }, [nodes, edges]);

  // Write simulation positions straight to the DOM (no React re-render per frame).
  const paint = (s: SimState) => {
    for (const n of s.nodes) {
      nodeRefs.current[n.id]?.setAttribute("transform", `translate(${n.x.toFixed(1)} ${n.y.toFixed(1)})`);
    }
    for (const [ia, ib] of s.edges) {
      const l = edgeRefs.current[`${ia}-${ib}`];
      if (!l) continue;
      const a = s.byId[ia];
      const b = s.byId[ib];
      l.setAttribute("x1", a.x.toFixed(1));
      l.setAttribute("y1", a.y.toFixed(1));
      l.setAttribute("x2", b.x.toFixed(1));
      l.setAttribute("y2", b.y.toFixed(1));
    }
  };

  // Measure container.
  useEffect(() => {
    const el = wrapRef.current!;
    const ro = new ResizeObserver(([e]) => setSize({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // (Re)build the simulation when the node set changes; keep it on resize.
  useEffect(() => {
    if (!size.w) return;
    const s = sim.current;
    if (s && s.nodes.length === nodes.length) {
      s.w = size.w;
      s.h = size.h;
      return;
    }
    const simNodes: SimNode[] = nodes.map((n, i) => {
      const a = (i / nodes.length) * Math.PI * 2;
      const r = n.group === "core" ? 0 : 8 + Math.random() * 10;
      return {
        id: n.id,
        x: size.w / 2 + Math.cos(a) * r,
        y: size.h / 2 + Math.sin(a) * r,
        vx: 0,
        vy: 0,
        ...nodeSize(n.label, n.group),
      };
    });
    sim.current = {
      nodes: simNodes,
      byId: Object.fromEntries(simNodes.map((n) => [n.id, n])),
      edges,
      pointer: { x: -9999, y: -9999, active: false },
      drag: null,
      w: size.w,
      h: size.h,
      coreId: "me",
    };
    // Settle the layout up front so nodes pop in already in place.
    for (let i = 0; i < 400; i++) step(sim.current);
    paint(sim.current);
  }, [size, nodes, edges]);

  // Animation loop; paused while the card is off-screen.
  useEffect(() => {
    let raf = 0;
    let visible = false;

    const tick = () => {
      const s = sim.current;
      if (s) {
        step(s);
        paint(s);
      }
      if (visible) raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(([e]) => {
      const was = visible;
      visible = e.isIntersecting;
      if (visible && !was) raf = requestAnimationFrame(tick);
    });
    io.observe(wrapRef.current!);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  const local = (e: React.PointerEvent) => {
    const r = wrapRef.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const dimmed = (id: string) => hovered !== null && !neighbors[hovered]?.has(id);

  return (
    <div
      ref={wrapRef}
      className="relative h-full w-full touch-none select-none"
      onPointerMove={(e) => {
        if (sim.current) sim.current.pointer = { ...local(e), active: true };
      }}
      onPointerLeave={() => {
        if (sim.current) sim.current.pointer.active = false;
      }}
      onPointerUp={() => {
        if (sim.current) sim.current.drag = null;
        setGrabbed(false);
      }}
    >
      {size.w > 0 && (
        <svg width={size.w} height={size.h} className="absolute inset-0 overflow-visible">
          <g>
            {edges.map(([a, b], i) => {
              const active = hovered !== null && (hovered === a || hovered === b);
              return (
                <motion.line
                  key={`${a}-${b}`}
                  ref={(el) => {
                    edgeRefs.current[`${a}-${b}`] = el;
                  }}
                  stroke={active ? "#ff5a1f" : "#16130f"}
                  strokeWidth={active ? 1.8 : 1}
                  strokeDasharray={a === "me" || b === "me" ? undefined : "3 4"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hovered === null ? 0.35 : active ? 0.9 : 0.08 }}
                  transition={{ duration: 0.3, delay: hovered === null && !grabbed ? 0.6 + i * 0.03 : 0 }}
                />
              );
            })}
          </g>
          {nodes.map((n, i) => {
            const { w, h } = nodeSize(n.label, n.group);
            const isCore = n.group === "core";
            const isProject = n.group === "project";
            return (
              <g
                key={n.id}
                ref={(el) => {
                  nodeRefs.current[n.id] = el;
                }}
                data-cursor={isCore ? "Hi!" : "Drag"}
                onPointerEnter={() => setHovered(n.id)}
                onPointerLeave={() => setHovered(null)}
                onPointerDown={(e) => {
                  const s = sim.current;
                  if (!s) return;
                  wrapRef.current?.setPointerCapture(e.pointerId);
                  const p = local(e);
                  const node = s.byId[n.id];
                  s.pointer = { ...p, active: true };
                  s.drag = { id: n.id, dx: p.x - node.x, dy: p.y - node.y };
                  setGrabbed(true);
                  setHovered(n.id);
                }}
                style={{ cursor: "grab" }}
              >
                <motion.g
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: dimmed(n.id) ? 0.25 : 1 }}
                  whileHover={{ scale: 1.08 }}
                  transition={{
                    scale: { type: "spring", stiffness: 260, damping: 14, delay: 0.3 + i * 0.04 },
                    opacity: { duration: 0.25 },
                  }}
                >
                  {isCore ? (
                    <>
                      <circle r={CORE_R + 9} fill="none" stroke="#ff5a1f" strokeWidth={1.2} strokeDasharray="4 5" className="animate-spin-slow" />
                      <circle r={CORE_R} fill="#16130f" />
                      <text textAnchor="middle" dominantBaseline="central" fill="#f4efe6" className="font-serif italic" fontSize={28}>
                        ss
                      </text>
                    </>
                  ) : (
                    <>
                      <rect x={-w / 2 + 2} y={-h / 2 + 3} width={w} height={h} rx={h / 2} fill="#16130f" />
                      <rect
                        x={-w / 2}
                        y={-h / 2}
                        width={w}
                        height={h}
                        rx={h / 2}
                        fill={isProject ? PROJECT_FILL[n.id] : "#fffaf2"}
                        stroke="#16130f"
                        strokeWidth={1.2}
                      />
                      {!isProject && <circle cx={-w / 2 + 14} cy={0} r={4} fill={DOT[n.group]} />}
                      <text
                        x={isProject ? 0 : 7}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill="#16130f"
                        fontSize={12.5}
                        fontWeight={isProject ? 600 : 500}
                        className="font-sans"
                      >
                        {n.label}
                      </text>
                    </>
                  )}
                </motion.g>
              </g>
            );
          })}
        </svg>
      )}

      <motion.div
        className="pointer-events-none absolute right-5 top-4 font-mono text-[11px] uppercase tracking-widest text-ink-soft"
        initial={{ opacity: 0 }}
        animate={{ opacity: grabbed ? 0 : 1 }}
        transition={{ delay: grabbed ? 0 : 1.6 }}
      >
        drag the nodes ↙
      </motion.div>
    </div>
  );
}
