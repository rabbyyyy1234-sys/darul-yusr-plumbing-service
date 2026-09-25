import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SERVICES } from "./data";

const R = 38; // % radius

export function Services() {
  const [active, setActive] = useState<number | null>(null);
  const cur = active ?? 0;

  return (
    <section id="services" className="relative overflow-hidden bg-ink py-28 sm:py-36">
      <div className="blueprint absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-5 font-mono text-[11px] tracking-[0.4em] text-glow">[ 02 — SERVICES ]</p>
            <h2 className="font-display text-5xl font-bold tracking-tight sm:text-7xl">The Plumbing<br />System Map</h2>
          </div>
          <p className="max-w-xs font-mono text-xs leading-6 text-muted-foreground">Select any node in the network to explore the service.</p>
        </div>

        {/* Desktop network */}
        <div className="relative mx-auto hidden aspect-square max-w-[760px] md:block">
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
            <circle cx="50" cy="50" r={R} fill="none" stroke="var(--glow)" strokeOpacity=".1" strokeWidth=".2" strokeDasharray="1 1.5" />
            <circle cx="50" cy="50" r="24" fill="none" stroke="var(--glow)" strokeOpacity=".08" strokeWidth=".2" />
            {SERVICES.map((_, i) => {
              const a = (i / SERVICES.length) * Math.PI * 2 - Math.PI / 2;
              const x = 50 + Math.cos(a) * R;
              const y = 50 + Math.sin(a) * R;
              const on = active === i;
              return (
                <g key={i}>
                  <line x1="50" y1="50" x2={x} y2={y} stroke="var(--brand)" strokeOpacity={on ? 1 : active === null ? 0.4 : 0.12} strokeWidth={on ? 0.5 : 0.25} style={{ transition: "all .4s" }} />
                  <line x1="50" y1="50" x2={x} y2={y} stroke="var(--glow)" strokeWidth={on ? 0.6 : 0.3} className="flow-line" style={{ animationDuration: on ? "2s" : "9s", opacity: active === null || on ? 1 : 0.2 }} />
                </g>
              );
            })}
          </svg>

          {/* center node */}
          <div className="absolute left-1/2 top-1/2 flex h-[34%] w-[34%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-glow/40 bg-[radial-gradient(circle_at_35%_30%,var(--brand),var(--deep)_55%,var(--ink))] text-center shadow-[0_0_80px_-10px_var(--brand),inset_0_2px_0_color-mix(in_oklab,var(--foreground)_25%,transparent)]">
            <span className="absolute inset-0 rounded-full border border-glow/40" style={{ animation: "ring-pulse 3s ease-out infinite" }} />
            <AnimatePresence mode="wait">
              <motion.div key={active ?? "c"} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="px-6">
                {active === null ? (
                  <>
                    <div className="font-display text-2xl font-extrabold lg:text-3xl">DARUL YUSR</div>
                    <div className="mt-1 font-mono text-[9px] tracking-[0.3em] text-glow">8 SERVICE NODES</div>
                  </>
                ) : (
                  <>
                    <div className="font-mono text-[9px] tracking-[0.3em] text-glow">NODE {String(active + 1).padStart(2, "0")}</div>
                    <div className="mt-2 font-display text-lg font-bold leading-tight lg:text-xl">{SERVICES[active].t}</div>
                    <div className="mt-2 text-xs leading-relaxed text-foreground/75">{SERVICES[active].d}</div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {SERVICES.map((s, i) => {
            const a = (i / SERVICES.length) * Math.PI * 2 - Math.PI / 2;
            const on = active === i;
            return (
              <motion.button
                key={s.t}
                data-cursor="explore"
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i, type: "spring", stiffness: 140 }}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${50 + Math.cos(a) * R}%`, top: `${50 + Math.sin(a) * R}%`, opacity: active === null || on ? 1 : 0.35 }}
              >
                <span className="flex flex-col items-center gap-3">
                  <motion.span animate={{ scale: on ? 1.5 : 1 }} className={`relative flex h-5 w-5 items-center justify-center rounded-full border ${on ? "border-glow bg-brand shadow-[0_0_24px_var(--glow)]" : "border-glow/60 bg-ink"}`}>
                    <span className="h-1.5 w-1.5 rounded-full bg-glow" />
                  </motion.span>
                  <span className={`w-36 text-center text-[13px] leading-tight transition-all ${on ? "font-semibold text-foreground" : "text-muted-foreground"}`}>{s.t}</span>
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Mobile vertical system */}
        <div className="relative md:hidden">
          <div className="absolute bottom-6 left-[11px] top-6 w-px bg-gradient-to-b from-glow via-brand to-transparent" />
          <div className="mb-8 ml-10 rounded-2xl border border-glow/30 bg-[radial-gradient(circle_at_20%_20%,var(--brand),var(--deep)_60%)] p-5">
            <div className="font-display text-2xl font-extrabold">DARUL YUSR</div>
            <div className="font-mono text-[10px] tracking-[0.3em] text-glow">TAP A NODE</div>
          </div>
          {SERVICES.map((s, i) => {
            const on = cur === i && active !== null;
            return (
              <motion.button
                key={s.t}
                onClick={() => setActive(on ? null : i)}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative flex w-full items-start gap-5 py-4 text-left"
              >
                <span className={`relative z-10 mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${on ? "border-glow bg-brand shadow-[0_0_18px_var(--glow)]" : "border-glow/50 bg-ink"}`}>
                  <span className="h-1.5 w-1.5 rounded-full bg-glow" />
                </span>
                <span>
                  <span className="font-mono text-[10px] text-glow">{String(i + 1).padStart(2, "0")}</span>
                  <span className={`block font-display text-xl font-semibold ${on ? "text-foreground" : "text-foreground/80"}`}>{s.t}</span>
                  <AnimatePresence>
                    {on && (
                      <motion.span initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="block overflow-hidden text-sm text-muted-foreground">
                        <span className="block pt-2">{s.d}</span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
