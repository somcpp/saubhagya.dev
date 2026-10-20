// Headless check of the hero graph layout: npx tsx scripts/tune-graph.ts
import { graphEdges, graphNodes } from "../src/lib/data";
import { COMPACT_HIDDEN, step, type SimNode } from "../src/lib/graphPhysics";

function size(label: string, group: string) {
  if (group === "core") return { w: 68, h: 68 };
  return { w: label.length * 7.4 + (group === "project" ? 30 : 36), h: 30 };
}

for (const [w, h] of [
  [620, 520],
  [340, 420],
]) {
  const compact = w < 480;
  const list = graphNodes.filter((n) => !compact || !COMPACT_HIDDEN.has(n.id));
  const nodes: SimNode[] = list.map((n, i) => {
    const a = (i / list.length) * Math.PI * 2;
    const r = n.group === "core" ? 0 : 8 + Math.random() * 10;
    return { id: n.id, x: w / 2 + Math.cos(a) * r, y: h / 2 + Math.sin(a) * r, vx: 0, vy: 0, ...size(n.label, n.group) };
  });
  const s = {
    nodes,
    byId: Object.fromEntries(nodes.map((n) => [n.id, n])),
    edges: graphEdges.filter(([a, b]) => !compact || (!COMPACT_HIDDEN.has(a) && !COMPACT_HIDDEN.has(b))),
    pointer: { x: 0, y: 0, active: false },
    drag: null,
    w,
    h,
    coreId: "me",
  };
  for (let t = 0; t < 600; t++) step(s);

  let overlaps = 0;
  for (let i = 0; i < nodes.length; i++)
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i], b = nodes[j];
      if (Math.abs(a.x - b.x) < (a.w + b.w) / 2 && Math.abs(a.y - b.y) < (a.h + b.h) / 2) overlaps++;
    }
  const walls = nodes.filter((n) => n.x - n.w / 2 < 12 || n.x + n.w / 2 > w - 12 || n.y - n.h / 2 < 12 || n.y + n.h / 2 > h - 12).length;
  const xs = nodes.map((n) => n.x), ys = nodes.map((n) => n.y);
  const speed = Math.max(...nodes.map((n) => Math.hypot(n.vx, n.vy)));
  const core = s.byId.me;
  console.log(
    `${w}x${h}: overlaps=${overlaps} onWalls=${walls} spanX=${(Math.max(...xs) - Math.min(...xs)).toFixed(0)} spanY=${(Math.max(...ys) - Math.min(...ys)).toFixed(0)} core=(${core.x.toFixed(0)},${core.y.toFixed(0)}) maxSpeed=${speed.toFixed(3)}`,
  );
}
