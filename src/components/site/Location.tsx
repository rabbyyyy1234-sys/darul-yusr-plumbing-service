import { motion } from "framer-motion";
import { BIZ } from "./data";
import { LineButton } from "./Buttons";

export function Location() {
  return (
    <section className="relative overflow-hidden bg-charcoal py-28 sm:py-36">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
        <div>
          <p className="mb-5 font-mono text-[11px] tracking-[0.4em] text-glow">[ 06 — LOCATION ]</p>
          <h2 className="font-display text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl">GEORGETOWN,<br />GUYANA</h2>
          <a href={BIZ.map} target="_blank" rel="noreferrer" className="group mt-10 block space-y-1 text-xl text-muted-foreground transition-colors hover:text-foreground">
            {BIZ.address.map((l, i) => (
              <motion.span key={l} className="block" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * i }}>
                {l}
              </motion.span>
            ))}
          </a>
          <div className="mt-10"><LineButton href={BIZ.map} external>OPEN MAP ↗</LineButton></div>
        </div>

        <a href={BIZ.map} target="_blank" rel="noreferrer" data-cursor="view" className="relative block aspect-square overflow-hidden rounded-3xl border border-border bg-ink">
          <div className="blueprint absolute inset-0 opacity-50" />
          <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full">
            <path d="M0 110 C80 90 140 130 220 100 S340 60 400 80" fill="none" stroke="var(--brand)" strokeOpacity=".5" strokeWidth="1.5" />
            <path d="M0 110 C80 90 140 130 220 100 S340 60 400 80 V0 H0Z" fill="color-mix(in oklab, var(--deep) 60%, transparent)" />
            <text x="24" y="40" fill="var(--glow)" fontSize="9" fontFamily="JetBrains Mono" letterSpacing="3">ATLANTIC OCEAN</text>
            {[160, 200, 240, 280, 320].map((y, i) => (
              <path key={y} d={`M0 ${y} Q ${100 + i * 20} ${y - 30} 200 ${y} T 400 ${y - 10}`} fill="none" stroke="var(--foreground)" strokeOpacity=".06" />
            ))}
            <motion.path d="M20 360 C100 300 120 220 210 170 S330 140 380 120" fill="none" stroke="var(--glow)" strokeWidth="2" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2, ease: "easeInOut" }} style={{ filter: "drop-shadow(0 0 6px var(--glow))" }} />
            <circle cx="210" cy="170" r="30" fill="none" stroke="var(--glow)" strokeOpacity=".5">
              <animate attributeName="r" values="8;40" dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values=".8;0" dur="2.4s" repeatCount="indefinite" />
            </circle>
            <circle cx="210" cy="170" r="6" fill="var(--glow)" />
            <text x="224" y="196" fill="var(--foreground)" fontSize="11" fontFamily="Syne" fontWeight="700">MON REPOS</text>
            <text x="224" y="210" fill="var(--muted-foreground)" fontSize="8" fontFamily="JetBrains Mono">EAST COAST DEMERARA</text>
          </svg>
        </a>
      </div>
    </section>
  );
}
