import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const STAGES = [
  { k: "PROBLEM", d: "Something isn't working the way it should." },
  { k: "SOLUTION", d: "The issue is understood and properly addressed." },
  { k: "RESULT", d: "Your plumbing is back to working for you." },
];

export function Solutions() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(p, [0, 1], ["0%", "-66.666%"]);
  const hue = useTransform(p, [0, 0.5, 1], ["var(--deep)", "var(--brand)", "var(--glow)"]);

  return (
    <section id="solutions" ref={ref} className="relative h-[300vh] bg-charcoal">
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        <motion.div style={{ backgroundColor: hue }} className="pointer-events-none absolute -right-40 top-1/3 h-[60vh] w-[60vh] rounded-full opacity-25 blur-[120px]" />
        <div className="relative z-10 px-5 pt-28 sm:px-8">
          <p className="mb-3 font-mono text-[11px] tracking-[0.4em] text-glow">[ 03 — SOLUTIONS ]</p>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">SOLUTIONS THAT MOVE WITH YOU</h2>
        </div>
        <div className="relative mx-5 mt-6 h-px bg-border sm:mx-8">
          <motion.div style={{ scaleX: p }} className="h-px origin-left bg-glow shadow-[0_0_10px_var(--glow)]" />
        </div>
        <motion.div style={{ x }} className="flex h-full w-[300%]">
          {STAGES.map((s, i) => (
            <div key={s.k} className="relative flex w-1/3 items-center px-5 sm:px-8">
              <div className="flex w-full items-center gap-6 sm:gap-12">
                <div>
                  <div className="font-mono text-xs text-glow">0{i + 1} / 03</div>
                  <div className={`font-display text-[20vw] font-extrabold leading-none tracking-tighter sm:text-[15vw] ${i === 1 ? "text-gloss" : i === 0 ? "text-outline" : "text-brand"}`}>{s.k}</div>
                  <p className="mt-4 max-w-md text-lg text-muted-foreground">{s.d}</p>
                </div>
                {i < 2 && (
                  <svg viewBox="0 0 200 40" className="hidden w-[16vw] shrink-0 md:block">
                    <path d="M0 20 H180" stroke="var(--brand)" strokeWidth="2" />
                    <path d="M0 20 H180" stroke="var(--glow)" strokeWidth="2" className="flow-line" style={{ animationDuration: "2s" }} />
                    <path d="M170 8 L190 20 L170 32" fill="none" stroke="var(--glow)" strokeWidth="2" />
                  </svg>
                )}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
