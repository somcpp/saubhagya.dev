"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";

const links = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Journey" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const { scrollY, scrollYProgress } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 400 && !open);
    setScrolled(y > 30);
  });

  // Track which section is in view.
  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(`#${e.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <>
      <motion.div
        className="fixed left-0 right-0 top-0 z-50 h-[3px] origin-left bg-accent"
        style={{ scaleX: scrollYProgress }}
      />
      <motion.header
        className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: hidden ? -100 : 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav
          className={`flex w-full max-w-5xl items-center justify-between rounded-full border px-3 py-2 transition-all duration-500 ${
            scrolled ? "border-line bg-paper/80 shadow-[0_8px_30px_-12px_rgba(22,19,15,0.25)] backdrop-blur-md" : "border-transparent"
          }`}
        >
          <a href="#top" className="group flex items-center gap-2 pl-2" data-cursor="Top">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-ink font-serif text-xl italic text-paper transition-transform duration-500 group-hover:rotate-[360deg]">
              s
            </span>
            <span className="hidden text-sm font-medium sm:block">saubhagya.dev</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.href} className="relative">
                <a href={l.href} className="relative z-10 block rounded-full px-4 py-2 text-sm transition-colors hover:text-accent">
                  {l.label}
                </a>
                {active === l.href && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-ink/[0.07]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="hidden rounded-full bg-ink px-4 py-2 text-sm text-paper transition-colors hover:bg-accent sm:block"
            >
              Say hello
            </a>
            <button
              aria-label="Menu"
              onClick={() => setOpen((o) => !o)}
              className="grid h-10 w-10 place-items-center rounded-full border border-line md:hidden"
            >
              <span className="relative block h-3 w-4">
                <motion.span className="absolute left-0 top-0 h-[1.5px] w-4 bg-ink" animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }} />
                <motion.span className="absolute bottom-0 left-0 h-[1.5px] w-4 bg-ink" animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} />
              </span>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-center bg-paper px-8 md:hidden"
            initial={{ clipPath: "circle(0% at 90% 5%)" }}
            animate={{ clipPath: "circle(150% at 90% 5%)" }}
            exit={{ clipPath: "circle(0% at 90% 5%)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-serif text-6xl leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.07 }}
              >
                {l.label}
                <span className="text-accent">.</span>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
