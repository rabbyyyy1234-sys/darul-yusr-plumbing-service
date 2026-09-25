import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Phone } from "lucide-react";

function useMagnet(strength = 0.25) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });
  const ref = useRef<HTMLAnchorElement>(null);
  const onMove = (e: MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - r.left - r.width / 2) * strength);
    y.set((e.clientY - r.top - r.height / 2) * strength);
  };
  const onLeave = () => { x.set(0); y.set(0); };
  return { ref, sx, sy, onMove, onLeave };
}

type P = { href: string; children: ReactNode; className?: string; external?: boolean };

export function PrimaryButton({ href, children, className = "" }: P) {
  const m = useMagnet();
  return (
    <motion.a
      ref={m.ref}
      href={href}
      onMouseMove={m.onMove}
      onMouseLeave={m.onLeave}
      style={{ x: m.sx, y: m.sy }}
      whileTap={{ scale: 0.95, y: 2 }}
      data-cursor="arrow"
      className={`btn-primary group inline-flex items-center gap-3 rounded-full px-7 py-4 font-mono text-xs font-medium tracking-[0.2em] text-primary-foreground ${className}`}
    >
      {children}
      <span className="inline-block transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">↗</span>
    </motion.a>
  );
}

export function LineButton({ href, children, className = "", external }: P) {
  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      whileTap={{ scale: 0.96 }}
      data-cursor="arrow"
      className={`btn-ghost-line group inline-flex items-center gap-3 rounded-full px-7 py-4 font-mono text-xs tracking-[0.2em] text-foreground ${className}`}
    >
      <span className="transition-transform duration-300 group-hover:translate-x-1">{children}</span>
    </motion.a>
  );
}

export function CallButton({ className = "", compact = false }: { className?: string; compact?: boolean }) {
  return (
    <motion.a
      href="tel:+5926122732"
      whileTap={{ scale: 0.94 }}
      data-cursor="arrow"
      className={`group relative inline-flex items-center gap-2.5 rounded-full bg-brand font-mono font-medium tracking-[0.18em] text-primary-foreground shadow-[0_0_30px_-6px_var(--brand)] transition-shadow hover:shadow-[0_0_44px_-4px_var(--glow)] ${compact ? "px-4 py-2.5 text-[10px]" : "px-6 py-4 text-xs"} ${className}`}
    >
      <span className="relative flex h-5 w-5 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-glow/60" style={{ animation: "ring-pulse 1.8s ease-out infinite" }} />
        <Phone className="relative h-3.5 w-3.5" />
      </span>
      CALL NOW
      <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
    </motion.a>
  );
}
