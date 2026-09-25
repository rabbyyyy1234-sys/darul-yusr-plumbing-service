import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<string>("");
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 350, damping: 30 });
  const ry = useSpring(y, { stiffness: 350, damping: 30 });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine) and (min-width: 1024px)");
    setEnabled(mq.matches);
    if (!mq.matches) return;
    document.body.classList.add("has-cursor");
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = (e.target as HTMLElement).closest("[data-cursor], a, button") as HTMLElement | null;
      setMode(el ? el.dataset.cursor || "arrow" : "");
    };
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      document.body.classList.remove("has-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;
  const label = mode && mode !== "arrow" ? mode.toUpperCase() : "";
  const active = !!mode;

  return (
    <>
      <motion.div className="pointer-events-none fixed left-0 top-0 z-[200] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-glow shadow-[0_0_10px_var(--glow)]" style={{ x, y }} />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[199] flex items-center justify-center rounded-full border border-glow/50"
        style={{ x: rx, y: ry, translateX: "-50%", translateY: "-50%" }}
        animate={{ width: label ? 64 : active ? 44 : 28, height: label ? 64 : active ? 44 : 28, rotate: active ? 45 : 0, backgroundColor: label ? "color-mix(in oklab, var(--brand) 25%, transparent)" : "transparent" }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <motion.span animate={{ rotate: active ? -45 : 0 }} className="font-mono text-[9px] tracking-widest text-foreground">
          {label || (mode === "arrow" ? "↗" : "")}
        </motion.span>
      </motion.div>
    </>
  );
}
