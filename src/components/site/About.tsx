import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const w1x = useTransform(p, [0, 1], ["-20%", "15%"]);
  const w2s = useTransform(p, [0.2, 0.6], [0.7, 1]);
  const w2o = useTransform(p, [0.2, 0.5], [0, 1]);
  const w3x = useTransform(p, [0, 1], ["25%", "-15%"]);
  const w3r = useTransform(p, [0, 1], [-4, 4]);
  const draw = useTransform(p, [0.1, 0.6], [0, 1]);

  return (
    <section id="about" ref={ref} className="relative overflow-hidden bg-charcoal py-28 sm:py-40">
      <div className="mx-auto grid max-w-7xl gap-16 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="mb-8 font-mono text-[11px] tracking-[0.4em] text-glow">[ 01 — ABOUT ]</p>
          <h2 className="font-display text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
            {["PROFESSIONAL", "PLUMBING.", "TECHNICAL SOLUTIONS."].map((t, i) => (
              <motion.span
                key={t}
                className={`block ${i === 2 ? "text-glow" : ""}`}
                initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
                whileInView={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ delay: i * 0.18, duration: 1, ease: [0.7, 0, 0.3, 1] }}
              >
                {t}
              </motion.span>
            ))}
          </h2>
          <p className="mt-10 max-w-lg border-l border-glow/40 pl-6 text-lg leading-relaxed text-muted-foreground">
            Darul Yusr Plumbing Services provides professional plumbing and technical solutions from
            Mon Repos Pasture, East Coast of Demerara.
          </p>
        </div>

        <div className="relative lg:col-span-5">
          <svg viewBox="0 0 400 480" className="w-full max-w-md">
            <motion.path
              d="M40 40 H200 V160 H340 V300 H120 V440 H360"
              fill="none"
              stroke="var(--glow)"
              strokeWidth="1.5"
              style={{ pathLength: draw, filter: "drop-shadow(0 0 6px var(--glow))" }}
            />
            <path d="M40 40 H200 V160 H340 V300 H120 V440 H360" fill="none" stroke="var(--foreground)" strokeOpacity=".08" strokeWidth="14" strokeLinejoin="round" />
            {[[200, 40], [200, 160], [340, 160], [340, 300], [120, 300], [120, 440]].map(([x, y], i) => (
              <g key={i}>
                <rect x={x - 8} y={y - 8} width="16" height="16" fill="var(--charcoal)" stroke="var(--glow)" strokeOpacity=".7" />
                <text x={x + 14} y={y - 12} fill="var(--muted-foreground)" fontSize="9" fontFamily="JetBrains Mono">J-{String(i + 1).padStart(2, "0")}</text>
              </g>
            ))}
            <circle cx="260" cy="370" r="46" fill="none" stroke="var(--brand)" strokeDasharray="3 6" className="slow-spin" style={{ transformOrigin: "260px 370px" }} />
          </svg>
        </div>
      </div>

      <div className="mt-24 space-y-2 overflow-hidden font-display font-extrabold leading-none tracking-tighter">
        <motion.div style={{ x: w1x }} className="whitespace-nowrap text-[18vw] text-outline lg:text-[12rem]">PRECISION</motion.div>
        <motion.div style={{ scale: w2s, opacity: w2o }} className="text-center text-[16vw] text-gloss lg:text-[11rem]">RELIABILITY</motion.div>
        <motion.div style={{ x: w3x, rotate: w3r }} className="whitespace-nowrap text-right text-[18vw] text-brand lg:text-[12rem]">SOLUTIONS</motion.div>
      </div>
    </section>
  );
}
