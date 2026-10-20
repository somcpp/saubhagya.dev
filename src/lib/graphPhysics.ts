export type SimNode = {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  w: number;
  h: number;
};

export type SimState = {
  nodes: SimNode[];
  byId: Record<string, SimNode>;
  edges: [string, string][];
  pointer: { x: number; y: number; active: boolean };
  drag: { id: string; dx: number; dy: number } | null;
  w: number;
  h: number;
  coreId: string;
};

/** Nodes dropped on narrow cards so the graph stays legible. */
export const COMPACT_HIDDEN = new Set(["cpp", "tailwind", "redis", "docker"]);

export const PHYSICS = {
  charge: 5000,
  maxRepel: 3,
  rest: 100,
  spring: 0.02,
  gravity: 0.0025,
  coreGravity: 0.04,
  damping: 0.75,
  pad: 12,
  cursorRadius: 110,
  cursorForce: 1.4,
};

/** Advance the simulation by one frame. */
export function step(s: SimState) {
  const { nodes, byId, pointer, drag } = s;
  const P = PHYSICS;
  const scale = Math.min(1, Math.min(s.w, s.h) / 520);
  const rest = P.rest * Math.max(0.7, scale);
  const cx = s.w / 2;
  const cy = s.h / 2;
  const start = nodes.map((n) => [n.x, n.y]);

  // Pairwise repulsion (n is tiny, O(n²) is fine).
  for (let i = 0; i < nodes.length; i++) {
    const a = nodes[i];
    for (let j = i + 1; j < nodes.length; j++) {
      const b = nodes[j];
      let dx = b.x - a.x;
      let dy = b.y - a.y;
      let d2 = dx * dx + dy * dy;
      if (d2 < 0.01) {
        dx = Math.random() - 0.5;
        dy = Math.random() - 0.5;
        d2 = 0.5;
      }
      const d = Math.sqrt(d2);
      const f = Math.min((P.charge * scale) / d2, P.maxRepel);
      const fx = (dx / d) * f;
      const fy = (dy / d) * f;
      a.vx -= fx;
      a.vy -= fy;
      b.vx += fx;
      b.vy += fy;
    }
  }

  // Springs along edges.
  for (const [ia, ib] of s.edges) {
    const a = byId[ia];
    const b = byId[ib];
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const d = Math.sqrt(dx * dx + dy * dy) || 1;
    const k = ((d - rest) / d) * P.spring;
    a.vx += dx * k;
    a.vy += dy * k;
    b.vx -= dx * k;
    b.vy -= dy * k;
  }

  for (const n of nodes) {
    const g = n.id === s.coreId ? P.coreGravity : P.gravity;
    n.vx += (cx - n.x) * g;
    n.vy += (cy - n.y) * g;

    // Cursor pushes nodes away a little.
    if (pointer.active && drag?.id !== n.id) {
      const dx = n.x - pointer.x;
      const dy = n.y - pointer.y;
      const d2 = dx * dx + dy * dy;
      if (d2 < P.cursorRadius ** 2 && d2 > 1) {
        const d = Math.sqrt(d2);
        const f = (1 - d / P.cursorRadius) * P.cursorForce;
        n.vx += (dx / d) * f;
        n.vy += (dy / d) * f;
      }
    }

    if (drag?.id === n.id) {
      n.x = pointer.x - drag.dx;
      n.y = pointer.y - drag.dy;
      n.vx = n.vy = 0;
    } else {
      n.vx *= P.damping;
      n.vy *= P.damping;
      n.x += n.vx;
      n.y += n.vy;
    }
  }

  // Resolve pill overlaps along the axis of least penetration.
  for (let i = 0; i < nodes.length; i++) {
    const a = nodes[i];
    for (let j = i + 1; j < nodes.length; j++) {
      const b = nodes[j];
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const ox = (a.w + b.w) / 2 + P.pad - Math.abs(dx);
      const oy = (a.h + b.h) / 2 + P.pad - Math.abs(dy);
      if (ox <= 0 || oy <= 0) continue;
      const aw = drag?.id === a.id ? 0 : drag?.id === b.id ? 1 : 0.5;
      const bw = 1 - aw;
      if (ox < oy) {
        const sx = (dx < 0 ? -1 : 1) * ox * 0.5;
        a.x -= sx * aw;
        b.x += sx * bw;
      } else {
        const sy = (dy < 0 ? -1 : 1) * oy * 0.5;
        a.y -= sy * aw;
        b.y += sy * bw;
      }
    }
  }

  // Keep inside the card.
  for (const n of nodes) {
    const px = n.w / 2 + 8;
    const py = n.h / 2 + 8;
    const bx = Math.min(Math.max(n.x, px), s.w - px);
    const by = Math.min(Math.max(n.y, py), s.h - py);
    if (bx !== n.x) {
      n.x = bx;
    }
    if (by !== n.y) {
      n.y = by;
    }
  }

  // Position-based dynamics: velocity is whatever actually happened this
  // frame, so collision and wall corrections don't build up energy.
  nodes.forEach((n, i) => {
    if (drag?.id === n.id) return;
    n.vx = n.x - start[i][0];
    n.vy = n.y - start[i][1];
  });
}
