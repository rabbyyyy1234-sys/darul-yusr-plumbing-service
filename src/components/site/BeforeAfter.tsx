import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function Placeholder({ kind }: { kind: "before" | "after" }) {
  const b = kind === "before";
  return (
    <div data-cursor="view" className={`absolute inset-0 flex items-center justify-center ${b ? "bg-[linear-gradient(135deg,var(--charcoal),var(--ink))]" : "bg-[linear-gradient(135deg,var(--deep),var(--brand))]"}`}>
      <div className={`blueprint absolute inset-0 ${b ? "opacity-20" : "opacity-40"}`} />
      <div className="relative text-center">
        <div className="font-mono text-[10px] tracking-[0.3em] text-foreground/60">IMAGE PLACEHOLDER</div>
        <div className="mt-2 font-display text-lg text-foreground/80">Replace with your {kind} photo</div>
      </div>
    </div>
  );
}

export function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const box = useRef<HTMLDivElement>(null);
  const sec = useRef<HTMLElement>(null);
  const drag = useRef(false);
  const { scrollYProgress: p } = useScroll({ target: sec, offset: ["start end", "end start"] });
  const tilt = useTransform(p, [0, 0.5, 1], [8, 0, -4]);
  const back = useTransform(p, [0, 1], [60, -60]);

  const update = (clientX: number) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <section id="before-after" ref={sec} className="relative overflow-hidden bg-ink py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="mb-5 font-mono text-[11px] tracking-[0.4em] text-glow">[ 04 — BEFORE & AFTER ]</p>
        <h2 className="mb-14 font-display text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl">
          {["FROM BEFORE", "TO BETTER."].map((t, i) => (
            <span key={t} className="block overflow-hidden">
              <motion.span
                className={`block ${i ? "text-glow" : ""}`}
                initial={{ y: "100%", skewY: 6 }}
                whileInView={{ y: 0, skewY: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
              >
                {t}
              </motion.span>
            </span>
          ))}
        </h2>

        <div className="relative [perspective:1600px]">
          <motion.div style={{ y: back }} className="absolute -inset-4 rounded-[2rem] border border-glow/15 bg-deep/30 sm:-inset-8" />
          <motion.div
            style={{ rotateX: tilt }}
            initial={{ clipPath: "inset(10% 10% 10% 10% round 24px)", opacity: 0 }}
            whileInView={{ clipPath: "inset(0% 0% 0% 0% round 24px)", opacity: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.1, ease: [0.7, 0, 0.3, 1] }}
            className="relative rounded-3xl p-2 shadow-[0_40px_120px_-30px_var(--brand)] [background:linear-gradient(160deg,color-mix(in_oklab,var(--glow)_40%,transparent),transparent_40%,color-mix(in_oklab,var(--brand)_30%,transparent))]"
          >
            <div
              ref={box}
              data-cursor="drag"
              className="relative aspect-[4/5] touch-none select-none overflow-hidden rounded-2xl sm:aspect-[16/9]"
              onPointerDown={(e) => { drag.current = true; (e.target as HTMLElement).setPointerCapture?.(e.pointerId); update(e.clientX); }}
              onPointerMove={(e) => drag.current && update(e.clientX)}
              onPointerUp={() => (drag.current = false)}
            >
              <Placeholder kind="after" />
              <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
                <Placeholder kind="before" />
              </div>
              <motion.span animate={{ opacity: pos > 12 ? 1 : 0, x: pos > 12 ? 0 : -10 }} className="absolute left-5 top-5 rounded-full border border-border bg-ink/70 px-3 py-1.5 font-mono text-[10px] tracking-[0.3em] backdrop-blur">BEFORE</motion.span>
              <motion.span animate={{ opacity: pos < 88 ? 1 : 0, x: pos < 88 ? 0 : 10 }} className="absolute right-5 top-5 rounded-full bg-brand px-3 py-1.5 font-mono text-[10px] tracking-[0.3em] text-primary-foreground">AFTER</motion.span>
              <div className="absolute inset-y-0 w-px bg-glow shadow-[0_0_14px_var(--glow)]" style={{ left: `${pos}%` }}>
                <div
                  role="slider"
                  aria-label="Comparison divider"
                  aria-valuenow={Math.round(pos)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === "ArrowLeft") setPos((v) => Math.max(0, v - 5)); if (e.key === "ArrowRight") setPos((v) => Math.min(100, v + 5)); }}
                  className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-glow bg-ink/80 font-mono text-sm text-glow shadow-[0_0_30px_var(--glow)] backdrop-blur"
                >
                  ‹ ›
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
