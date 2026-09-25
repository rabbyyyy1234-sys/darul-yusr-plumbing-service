import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

const STEPS = ["Tell Us What You Need", "Discuss the Problem", "Plan the Solution", "Move Forward"];

function Step({ i, p, t }: { i: number; p: MotionValue<number>; t: string }) {
  const start = 0.15 + i * 0.15;
  const o = useTransform(p, [start - 0.05, start], [0.25, 1]);
  const s = useTransform(p, [start - 0.05, start], [0.6, 1]);
  const glow = useTransform(p, [start - 0.05, start], ["0 0 0px transparent", "0 0 28px var(--glow)"]);
  return (
    <motion.div style={{ opacity: o }} className="relative flex gap-5 md:block md:pt-16">
      <motion.span style={{ scale: s, boxShadow: glow }} className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-glow bg-ink md:absolute md:left-0 md:top-[-12px]">
        <span className="h-2 w-2 rounded-full bg-glow" />
      </motion.span>
      <div>
        <div className="font-display text-5xl font-extrabold text-outline md:text-6xl">0{i + 1}</div>
        <div className="mt-2 font-display text-xl font-semibold md:text-2xl">{t}</div>
      </div>
    </motion.div>
  );
}

export function Process() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const draw = useTransform(p, [0.05, 0.75], [0, 1]);

  return (
    <section ref={ref} className="grain relative overflow-hidden bg-[linear-gradient(180deg,var(--ink),var(--deep)_120%)] py-28 sm:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="mb-5 font-mono text-[11px] tracking-[0.4em] text-glow">[ 05 — HOW IT WORKS ]</p>
        <h2 className="max-w-3xl font-display text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl">
          YOUR PLUMBING NEED.<br /><span className="text-glow">OUR NEXT STEP.</span>
        </h2>

        <div className="relative mt-20">
          {/* horizontal path (desktop) */}
          <svg viewBox="0 0 1000 20" preserveAspectRatio="none" className="absolute left-0 top-0 hidden h-5 w-full -translate-y-1/2 md:block">
            <path d="M0 10 H1000" stroke="var(--foreground)" strokeOpacity=".1" strokeWidth="2" />
            <motion.path d="M0 10 H1000" stroke="var(--glow)" strokeWidth="2" style={{ pathLength: draw, filter: "drop-shadow(0 0 6px var(--glow))" }} />
          </svg>
          {/* vertical path (mobile) */}
          <div className="absolute bottom-0 left-[11px] top-0 w-px bg-foreground/10 md:hidden">
            <motion.div style={{ scaleY: draw }} className="h-full w-px origin-top bg-glow shadow-[0_0_8px_var(--glow)]" />
          </div>
          <div className="grid gap-12 md:grid-cols-4 md:gap-8">
            {STEPS.map((t, i) => <Step key={t} i={i} p={p} t={t} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
