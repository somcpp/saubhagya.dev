"use client";

import { useEffect, useState } from "react";
import { useFinePointer } from "@/lib/useFinePointer";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * Two-part cursor: a precise dot plus a lagging ring that grows over
 * interactive elements. Elements can set data-cursor="Label" to show text.
 */
export default function Cursor() {
  const enabled = useFinePointer();
  const [hover, setHover] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [down, setDown] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 350, damping: 30, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 350, damping: 30, mass: 0.6 });

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-cursor");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = (e.target as HTMLElement).closest<HTMLElement>(
        "a, button, [data-cursor], input, textarea",
      );
      setHover(!!t);
      setLabel(t?.dataset.cursor ?? null);
    };
    const dn = () => setDown(true);
    const up = () => setDown(false);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerdown", dn);
    window.addEventListener("pointerup", up);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", dn);
      window.removeEventListener("pointerup", up);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const size = label ? 84 : hover ? 52 : 30;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center rounded-full border border-ink text-[11px] font-medium uppercase tracking-wider text-paper"
        style={{ x: rx, y: ry, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: size,
          height: size,
          backgroundColor: label ? "var(--ink)" : hover ? "rgba(255,90,31,0.15)" : "rgba(0,0,0,0)",
          borderColor: hover && !label ? "var(--accent)" : "var(--ink)",
          scale: down ? 0.8 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      >
        {label}
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[101] h-1.5 w-1.5 rounded-full bg-accent"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: label ? 0 : 1 }}
      />
    </>
  );
}
