"use client";

import { motion, useScroll, useTransform } from "motion/react";
import BrandIcon from "./BrandIcon";

const items = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "PostgreSQL",
  "Prisma",
  "Socket.io",
  "WebRTC",
  "Redis",
  "Docker",
  "AWS",
  "Cloudflare",
];

export default function Marquee() {
  const { scrollYProgress } = useScroll();
  const skew = useTransform(scrollYProgress, [0, 1], [-2, 2]);

  return (
    <motion.div style={{ rotate: skew }} className="relative z-10 -mx-4 my-10 border-y border-ink bg-ink py-5 text-paper">
      <div className="flex w-max animate-marquee">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center" aria-hidden={k === 1}>
            {items.map((t, i) => (
              <span key={t} className="flex items-center font-serif text-4xl italic md:text-5xl">
                <span className="flex items-center gap-4 px-8">
                  <BrandIcon name={t} size={30} mono className="opacity-80" />
                  {t}
                </span>
                <span className={`text-2xl not-italic ${["text-accent", "text-red", "text-sun"][i % 3]}`}>✺</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
