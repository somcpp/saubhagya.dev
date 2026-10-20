"use client";

import { AnimatePresence, motion, useMotionValue, useSpring, type MotionValue } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/lib/useFinePointer";

/**
 * Mochi: a small fluffy companion that lives in the bottom-right corner.
 * Deliberately calm: no cursor chasing, rare speech, slow occasional moves.
 */

type Action = "idle" | "wave" | "hop" | "look" | "sleep" | "pet";

const PET_LINES = [
  "hehe, that tickles ✨",
  "you're doing great today 🧡",
  "have you tried RepoTrace? it's neat",
  "*happy fluff noises*",
  "thanks for stopping by 🌼",
  "my human builds cool stuff",
];

const INK = "#16130f";
const FUR = "#fff6ea";
const FUR_SHADE = "#f6e3c8";
const BLUSH = "#ffb3a7";

const SLEEP_AFTER = 30_000;

/** Scalloped ellipse outline so the body reads as fluffy. */
function fluffPath(cx: number, cy: number, rx: number, ry: number, bumps: number, depth: number) {
  const pt = (a: number, k: number) => [cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k];
  const step = (Math.PI * 2) / bumps;
  const [sx, sy] = pt(-Math.PI / 2, 1);
  let d = `M${sx.toFixed(1)} ${sy.toFixed(1)}`;
  for (let i = 0; i < bumps; i++) {
    const a0 = -Math.PI / 2 + i * step;
    const [qx, qy] = pt(a0 + step / 2, 1 + depth);
    const [ex, ey] = pt(a0 + step, 1);
    d += ` Q${qx.toFixed(1)} ${qy.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`;
  }
  return d + "Z";
}

const BODY = fluffPath(50, 54, 33, 30, 16, 0.13);
const BELLY = fluffPath(50, 64, 17, 13, 10, 0.12);
const CLOUD = fluffPath(50, 93, 42, 9, 13, 0.4);

function Mochi({
  action,
  happy,
  px,
  py,
}: {
  action: Action;
  happy: boolean;
  px: MotionValue<number>;
  py: MotionValue<number>;
}) {
  const asleep = action === "sleep";
  const waving = action === "wave";
  const smiling = happy || action === "pet";

  return (
    <svg viewBox="0 0 100 106" className="h-full w-full overflow-visible">
      {/* feet, half sunk into the cloud */}
      <ellipse cx={39} cy={86} rx={8} ry={5} fill={FUR_SHADE} stroke={INK} strokeWidth={2} />
      <ellipse cx={61} cy={86} rx={8} ry={5} fill={FUR_SHADE} stroke={INK} strokeWidth={2} />

      {/* breathing body */}
      <motion.g
        style={{ originX: "50%", originY: "100%", transformBox: "fill-box" }}
        animate={{ scaleY: [1, asleep ? 1.045 : 1.03, 1], scaleX: [1, asleep ? 0.98 : 0.988, 1] }}
        transition={{ duration: asleep ? 4.8 : 3.2, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* ears */}
        <path d="M27 36 L24 14 Q34 18 41 28 Z" fill={FUR} stroke={INK} strokeWidth={2} strokeLinejoin="round" />
        <path d="M29 31 L27.5 19 Q33 22 36.5 27.5 Z" fill={BLUSH} />
        <path d="M73 36 L76 14 Q66 18 59 28 Z" fill={FUR} stroke={INK} strokeWidth={2} strokeLinejoin="round" />
        <path d="M71 31 L72.5 19 Q67 22 63.5 27.5 Z" fill={BLUSH} />

        {/* left arm (static) */}
        <ellipse cx={14} cy={66} rx={6} ry={8.5} fill={FUR} stroke={INK} strokeWidth={2} transform="rotate(25 14 66)" />

        <path d={BODY} fill={FUR} stroke={INK} strokeWidth={2.2} strokeLinejoin="round" />
        <path d={BELLY} fill={FUR_SHADE} opacity={0.7} />

        {/* sprout on top: a tiny brand-orange leaf */}
        <motion.g
          style={{ originX: "0%", originY: "100%", transformBox: "fill-box" }}
          animate={{ rotate: asleep ? 18 : [-8, 8, -8] }}
          transition={asleep ? { duration: 1 } : { duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M50 25 Q50 18 52 13" fill="none" stroke={INK} strokeWidth={2} strokeLinecap="round" />
          <path d="M52 14 Q60 6 66 10 Q60 18 52 14 Z" fill="#ff5a1f" stroke={INK} strokeWidth={1.8} strokeLinejoin="round" />
        </motion.g>

        {/* eyes */}
        {asleep ? (
          <>
            <path d="M34 52 q5 4 10 0" fill="none" stroke={INK} strokeWidth={2.2} strokeLinecap="round" />
            <path d="M56 52 q5 4 10 0" fill="none" stroke={INK} strokeWidth={2.2} strokeLinecap="round" />
          </>
        ) : smiling ? (
          <>
            <path d="M34 53 q5 -6 10 0" fill="none" stroke={INK} strokeWidth={2.4} strokeLinecap="round" />
            <path d="M56 53 q5 -6 10 0" fill="none" stroke={INK} strokeWidth={2.4} strokeLinecap="round" />
          </>
        ) : (
          <motion.g
            style={{ originX: "50%", originY: "50%", transformBox: "fill-box" }}
            animate={{ scaleY: [1, 1, 0.08, 1] }}
            transition={{ duration: 4.2, repeat: Infinity, times: [0, 0.93, 0.96, 1] }}
          >
            <ellipse cx={39} cy={51} rx={5.2} ry={6} fill={INK} />
            <ellipse cx={61} cy={51} rx={5.2} ry={6} fill={INK} />
            <motion.g style={{ x: px, y: py }}>
              <circle cx={40.5} cy={49} r={2} fill="#fff" />
              <circle cx={62.5} cy={49} r={2} fill="#fff" />
              <circle cx={37.5} cy={53.5} r={0.9} fill="#fff" opacity={0.8} />
              <circle cx={59.5} cy={53.5} r={0.9} fill="#fff" opacity={0.8} />
            </motion.g>
          </motion.g>
        )}

        <motion.ellipse cx={30} cy={60} rx={5.5} ry={3.2} fill={BLUSH} animate={{ opacity: smiling ? 0.95 : 0.6 }} />
        <motion.ellipse cx={70} cy={60} rx={5.5} ry={3.2} fill={BLUSH} animate={{ opacity: smiling ? 0.95 : 0.6 }} />

        {/* mouth: little cat "w", opens into a smile when happy */}
        {smiling ? (
          <path d="M45 58 Q50 66 55 58 Z" fill="#ff7a90" stroke={INK} strokeWidth={1.8} strokeLinejoin="round" />
        ) : (
          <path d="M45 58.5 q2.5 3 5 0 q2.5 3 5 0" fill="none" stroke={INK} strokeWidth={1.8} strokeLinecap="round" />
        )}

        {/* right arm: waves */}
        {/* Pivots at the shoulder (80,58 in viewBox units) so it lifts beside the head. */}
        <motion.g
          style={{ transformBox: "view-box", originX: 0.8, originY: 58 / 96 }}
          animate={waving ? { rotate: [0, -150, -110, -150, -110, -150, 0] } : { rotate: 0 }}
          transition={waving ? { duration: 1.9, ease: "easeInOut" } : { duration: 0.4 }}
        >
          <ellipse cx={86} cy={66} rx={6} ry={8.5} fill={FUR} stroke={INK} strokeWidth={2} transform="rotate(-25 86 66)" />
        </motion.g>
      </motion.g>

      {/* the little cloud Mochi sits on */}
      <path d={CLOUD} fill="#ffffff" stroke={INK} strokeWidth={2.2} strokeLinejoin="round" />
      <path d="M22 93 q4 -3 8 0" fill="none" stroke="#ffd9a8" strokeWidth={2} strokeLinecap="round" />
      <path d="M70 95 q4 -3 8 0" fill="none" stroke="#ffd9a8" strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
}

export default function Mascot() {
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const small = useMediaQuery("(max-width: 640px)");
  const [show, setShow] = useState(false);
  const [action, setAction] = useState<Action>("idle");
  const [happy, setHappy] = useState(false);
  const [line, setLine] = useState<string | null>(null);
  const [hearts, setHearts] = useState<number[]>([]);

  const pxRaw = useMotionValue(0);
  const pyRaw = useMotionValue(0);
  const px = useSpring(pxRaw, { stiffness: 120, damping: 18 });
  const py = useSpring(pyRaw, { stiffness: 120, damping: 18 });

  const actionRef = useRef<Action>("idle");
  const lastInput = useRef(0);
  const petIdx = useRef(0);
  const lineTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const selfRef = useRef<HTMLDivElement>(null);

  const setAct = useCallback((a: Action) => {
    actionRef.current = a;
    setAction(a);
  }, []);

  const say = useCallback((text: string, ms = 3000) => {
    setLine(text);
    clearTimeout(lineTimer.current);
    lineTimer.current = setTimeout(() => setLine(null), ms);
  }, []);

  /** Wave (optionally with a line), then settle back to idle. */
  const waveHello = useCallback(
    (text?: string) => {
      setAct("wave");
      if (text) say(text, 3200);
      setTimeout(() => actionRef.current === "wave" && setAct("idle"), 2000);
    },
    [say, setAct],
  );

  // Arrive, then wave hello once.
  useEffect(() => {
    lastInput.current = performance.now();
    const t1 = setTimeout(() => setShow(true), 1600);
    const t2 = setTimeout(() => waveHello("hi there! 👋"), 2600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(lineTimer.current);
    };
  }, [waveHello]);

  // Eyes follow the cursor (only the eyes; Mochi stays put). Any activity wakes it.
  useEffect(() => {
    const wake = () => {
      lastInput.current = performance.now();
      if (actionRef.current === "sleep") waveHello("oh! hi again 👋");
    };
    const onMove = (e: PointerEvent) => {
      wake();
      const r = selfRef.current?.getBoundingClientRect();
      if (!r) return;
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const d = Math.hypot(dx, dy) || 1;
      const k = Math.min(1, d / 300);
      pxRaw.set((dx / d) * 2.2 * k);
      pyRaw.set((dy / d) * 2.2 * k);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("scroll", wake, { passive: true });
    window.addEventListener("keydown", wake);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", wake);
      window.removeEventListener("keydown", wake);
    };
  }, [pxRaw, pyRaw, waveHello]);

  // Say one thing when the visitor reaches the contact section.
  useEffect(() => {
    const el = document.getElementById("contact");
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        waveHello("say hi to my human! 💌");
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [waveHello]);

  // Occasional small idle behaviours, plus dozing off.
  useEffect(() => {
    if (!show) return;
    let timer: ReturnType<typeof setTimeout>;
    let cancelled = false;

    const schedule = () => {
      timer = setTimeout(run, 10_000 + Math.random() * 8_000);
    };

    const run = async () => {
      if (cancelled) return;
      if (performance.now() - lastInput.current > SLEEP_AFTER) {
        setAct("sleep");
        return schedule();
      }
      if (actionRef.current !== "idle") return schedule();

      const choices: Action[] = reduced ? ["wave", "look"] : ["wave", "hop", "look", "look"];
      const next = choices[Math.floor(Math.random() * choices.length)];
      setAct(next);

      if (next === "look") {
        for (const v of [-2.2, 2.2, 0]) {
          await new Promise((r) => setTimeout(r, 800));
          pxRaw.set(v);
        }
      } else {
        await new Promise((r) => setTimeout(r, 2000));
      }
      if (cancelled) return;
      if (actionRef.current === next) setAct("idle");
      schedule();
    };

    schedule();
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [show, reduced, pxRaw, setAct]);

  const onPet = () => {
    lastInput.current = performance.now();
    setAct("pet");
    setHappy(true);
    say(PET_LINES[petIdx.current++ % PET_LINES.length], 2600);
    const id = Date.now();
    setHearts((h) => [...h, id]);
    setTimeout(() => setHearts((h) => h.filter((v) => v !== id)), 1400);
    setTimeout(() => {
      setHappy(false);
      if (actionRef.current === "pet") setAct("idle");
    }, 1300);
  };

  const size = small ? 72 : 104;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          ref={selfRef}
          className="pointer-events-none fixed bottom-20 right-3 z-40 select-none md:bottom-[16vh] md:right-[2.5vw]"
          style={{ width: size, height: size * 1.06 }}
          initial={{ opacity: 0, scale: 0.6, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 140, damping: 14 }}
        >
          {/* soft shadow that breathes with the float */}
          <motion.div
            aria-hidden
            className="absolute -bottom-5 left-1/2 h-2.5 w-3/5 -translate-x-1/2 rounded-full bg-ink/10 blur-[2px]"
            animate={{ scaleX: [1, 0.82, 1], opacity: [0.9, 0.6, 0.9] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute inset-0"
            animate={{ y: [0, -9, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <AnimatePresence>
              {line && (
                <motion.div
                  key={line}
                  className="absolute bottom-[calc(100%+6px)] right-0 w-max max-w-[210px] rounded-2xl rounded-br-sm border border-ink bg-[#fffaf2] px-3 py-2 text-xs leading-snug text-ink shadow-[3px_3px_0_#16130f]"
                  initial={{ opacity: 0, y: 8, scale: 0.85 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 320, damping: 24 }}
                >
                  {line}
                </motion.div>
              )}
            </AnimatePresence>

            {action === "sleep" && (
              <div className="absolute -top-1 left-1 font-serif italic text-ink/70">
                {[0, 1].map((i) => (
                  <motion.span
                    key={i}
                    className="absolute"
                    style={{ fontSize: 12 + i * 5 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0], x: [0, -6 - i * 4], y: [0, -20 - i * 6] }}
                    transition={{ duration: 3.2, repeat: Infinity, delay: i * 1.6, ease: "easeOut" }}
                  >
                    z
                  </motion.span>
                ))}
              </div>
            )}

            {hearts.map((id) => (
              <div key={id} className="absolute inset-x-0 top-0">
                {[-18, 0, 18].map((dx, i) => (
                  <motion.span
                    key={i}
                    className="absolute left-1/2 text-sm text-accent"
                    initial={{ opacity: 0, x: 0, y: 10, scale: 0.4 }}
                    animate={{ opacity: [0, 1, 0], x: dx, y: -28 - i * 6, scale: 1 }}
                    transition={{ duration: 1.2, delay: i * 0.08, ease: "easeOut" }}
                  >
                    ♥
                  </motion.span>
                ))}
              </div>
            ))}

            <motion.button
              type="button"
              aria-label="Mochi, a friendly mascot. Click to say hi."
              data-cursor="Boop"
              onClick={onPet}
              onPointerEnter={() => setHappy(true)}
              onPointerLeave={() => actionRef.current !== "pet" && setHappy(false)}
              className="pointer-events-auto block h-full w-full"
              style={{ originY: 1 }}
              animate={
                action === "pet"
                  ? { y: [0, -18, 0], scaleX: [1, 1.12, 0.92, 1], scaleY: [1, 0.86, 1.08, 1] }
                  : action === "hop"
                    ? { y: [0, -12, 0, -6, 0] }
                    : { y: 0, scaleX: 1, scaleY: 1 }
              }
              transition={
                action === "pet" || action === "hop"
                  ? { duration: action === "hop" ? 1.1 : 0.7, ease: "easeOut" }
                  : { duration: 0.3 }
              }
            >
              <Mochi action={action} happy={happy} px={px} py={py} />
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
