import { motion } from "framer-motion";
import { BIZ, NAV } from "./data";
import { CallButton, LineButton } from "./Buttons";

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-ink py-32 sm:py-44">
      {/* connection visual */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="absolute left-1/2 top-1/2 h-[40vmax] w-[40vmax] -translate-x-1/2 -translate-y-1/2 rounded-full border border-glow/30" style={{ animation: `ring-pulse 6s ease-out ${i * 1.5}s infinite` }} />
        ))}
        <div className="h-[36vmax] w-[36vmax] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--brand)_55%,transparent),transparent_65%)] blur-2xl" />
      </div>
      <div className="relative mx-auto max-w-5xl px-5 text-center sm:px-8">
        <p className="mb-8 font-mono text-[11px] tracking-[0.4em] text-glow">[ 07 — CONTACT ]</p>
        <motion.h2
          initial={{ opacity: 0, scale: 1.15, filter: "blur(16px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
          className="font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-gloss sm:text-7xl lg:text-8xl"
        >
          LET'S SOLVE YOUR NEXT PLUMBING NEED.
        </motion.h2>
        <div className="mt-14 flex flex-col items-center gap-2">
          <a href={BIZ.tel} className="font-display text-3xl font-bold transition-colors hover:text-glow sm:text-5xl">{BIZ.phone}</a>
          <a href={BIZ.mailto} className="break-all font-mono text-sm text-muted-foreground transition-colors hover:text-foreground">{BIZ.email}</a>
        </div>
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <CallButton />
          <LineButton href={BIZ.mailto}>SEND EMAIL ↗</LineButton>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-[oklch(0.04_0_0)] pb-10 pt-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="font-display text-3xl font-extrabold">DARUL YUSR</div>
            <div className="font-mono text-[10px] tracking-[0.35em] text-glow">PLUMBING SERVICES</div>
            <p className="mt-5 max-w-xs text-muted-foreground">{BIZ.tagline}</p>
          </div>
          <div className="space-y-3 text-sm">
            <div className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground">CONTACT</div>
            <a href={BIZ.tel} className="block hover:text-glow">{BIZ.phone}</a>
            <a href={BIZ.mailto} className="block break-all hover:text-glow">{BIZ.email}</a>
            <a href={BIZ.map} target="_blank" rel="noreferrer" className="block text-muted-foreground hover:text-glow">{BIZ.address.join(", ")}</a>
          </div>
          <div className="space-y-3 text-sm">
            <div className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground">NAVIGATE</div>
            {NAV.map((n) => <a key={n.id} href={`#${n.id}`} className="block hover:text-glow">{n.label}</a>)}
          </div>
        </div>
        <div className="mt-16 select-none font-display text-[19vw] font-extrabold leading-none tracking-tighter text-outline opacity-40 lg:text-[15rem]">DARUL YUSR</div>
        <div className="mt-6 flex items-center justify-between border-t border-border pt-6 font-mono text-[10px] tracking-widest text-muted-foreground">
          <span>© {new Date().getFullYear()} DARUL YUSR PLUMBING SERVICES</span>
          <motion.a
            href="#home"
            aria-label="Back to top"
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.9 }}
            className="group relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-glow/40 text-glow"
          >
            <span className="transition-transform duration-300 group-hover:-translate-y-10">↑</span>
            <span className="absolute translate-y-10 transition-transform duration-300 group-hover:translate-y-0">↑</span>
          </motion.a>
        </div>
      </div>
    </footer>
  );
}
