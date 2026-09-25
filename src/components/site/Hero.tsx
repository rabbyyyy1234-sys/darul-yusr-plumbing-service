import { useEffect, useMemo } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { CallButton, LineButton } from "./Buttons";

const LINES = ["PLUMBING", "BUILT AROUND", "YOUR NEEDS."];

export function Hero({ ready }: { ready: boolean }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 20 });
  const sy = useSpring(my, { stiffness: 50, damping: 20 });
  const far = { x: useTransform(sx, (v) => v * 12), y: useTransform(sy, (v) => v * 12) };
  const near = { x: useTransform(sx, (v) => v * -28), y: useTransform(sy, (v) => v * -28) };
  const { scrollY } = useScroll();
  const fade = useTransform(scrollY, [0, 600], [1, 0]);
  const drift = useTransform(scrollY, [0, 600], [0, 150]);

  useEffect(() => {
    const f = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", f);
    return () => window.removeEventListener("mousemove", f);
  }, [mx, my]);

  const particles = useMemo(
    () => Array.from({ length: 28 }, (_, i) => ({ l: (i * 37) % 100, t: (i * 53) % 100, d: 6 + (i % 5) * 2, s: 1 + (i % 3) })),
    [],
  );

  return (
    <section id="home" className="grain relative min-h-[100svh] overflow-hidden bg-ink">
      {/* ambient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,color-mix(in_oklab,var(--brand)_35%,transparent),transparent_55%),radial-gradient(ellipse_at_10%_90%,var(--deep),transparent_50%)]" />
      <div className="blueprint absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      {/* rings world */}
      <motion.div style={far} className="pointer-events-none absolute right-[-30vw] top-1/2 aspect-square w-[110vw] -translate-y-1/2 sm:right-[-15vw] lg:right-[-8vw] lg:w-[62vw]">
        <svg viewBox="0 0 600 600" className="slow-spin h-full w-full">
          {[280, 230, 180, 130].map((r, i) => (
            <circle key={r} cx="300" cy="300" r={r} fill="none" stroke="var(--glow)" strokeOpacity={0.08 + i * 0.05} strokeWidth="1" strokeDasharray={i % 2 ? "2 8" : "0"} />
          ))}
          {Array.from({ length: 24 }).map((_, i) => (
            <line key={i} x1="300" y1="14" x2="300" y2={i % 6 === 0 ? 34 : 24} stroke="var(--glow)" strokeOpacity="0.4" transform={`rotate(${i * 15} 300 300)`} />
          ))}
        </svg>
      </motion.div>

      {/* pipe network */}
      <motion.svg style={near} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" className="pointer-events-none absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="pipe" x1="0" x2="1">
            <stop offset="0" stopColor="var(--deep)" />
            <stop offset=".6" stopColor="var(--brand)" />
            <stop offset="1" stopColor="var(--glow)" />
          </linearGradient>
          <filter id="glowF"><feGaussianBlur stdDeviation="4" /></filter>
        </defs>
        {[
          "M-20 640 H420 Q480 640 480 580 V420 Q480 360 540 360 H880 Q940 360 940 300 V120 Q940 60 1000 60 H1460",
          "M-20 760 H700 Q760 760 760 700 V560 Q760 500 820 500 H1460",
          "M200 920 V720 Q200 660 260 660 H600",
          "M1100 920 V640 Q1100 580 1160 580 H1460",
        ].map((d, i) => (
          <g key={i}>
            <path d={d} fill="none" stroke="url(#pipe)" strokeOpacity=".25" strokeWidth={i === 0 ? 10 : 6} strokeLinecap="round" />
            <path d={d} fill="none" stroke="var(--glow)" strokeWidth="2" className="flow-line-fast" style={{ animationDelay: `${i * -1.3}s`, animationDuration: `${4 + i}s` }} filter="url(#glowF)" />
            <path d={d} fill="none" stroke="var(--foreground)" strokeOpacity=".6" strokeWidth="1" className="flow-line-fast" style={{ animationDelay: `${i * -1.3}s`, animationDuration: `${4 + i}s` }} />
          </g>
        ))}
        {[[480, 420], [940, 300], [760, 560], [1100, 640]].map(([cx, cy], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="9" fill="var(--ink)" stroke="var(--glow)" strokeWidth="1.5" />
            <circle cx={cx} cy={cy} r="3" fill="var(--glow)" />
          </g>
        ))}
      </motion.svg>

      {/* particles */}
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-glow"
          style={{ left: `${p.l}%`, top: `${p.t}%`, width: p.s, height: p.s }}
          animate={{ y: [0, -30, 0], opacity: [0.1, 0.8, 0.1] }}
          transition={{ duration: p.d, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}

      {/* water wave */}
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="absolute bottom-0 left-0 h-24 w-[200%] animate-marquee opacity-50">
        <path d="M0 60 Q180 20 360 60 T720 60 T1080 60 T1440 60 T1800 60 T2160 60 T2520 60 T2880 60 V120 H0Z" fill="color-mix(in oklab, var(--deep) 60%, transparent)" />
      </svg>

      <motion.div style={{ opacity: fade, y: drift }} className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-5 pb-24 pt-32 sm:px-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={ready ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-8 inline-flex w-fit items-center gap-3 rounded-full border border-glow/25 bg-deep/40 px-4 py-2 backdrop-blur"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-glow shadow-[0_0_8px_var(--glow)]" />
          <span className="font-mono text-[10px] tracking-[0.3em] text-glow">DARUL YUSR PLUMBING SERVICES</span>
        </motion.div>

        <h1 className="relative font-display text-[9.6vw] font-extrabold leading-[0.92] tracking-tight sm:text-[8vw] lg:text-[6.6rem]">
          <motion.span
            aria-hidden
            className="absolute -inset-x-10 top-1/2 -z-10 h-1/2 -translate-y-1/2 bg-[linear-gradient(90deg,transparent,color-mix(in_oklab,var(--brand)_50%,transparent),transparent)] blur-3xl"
            animate={{ x: ["-30%", "30%", "-30%"] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          {LINES.map((l, i) => (
            <span key={l} className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className={`block ${i === 1 ? "text-outline" : "text-gloss"}`}
                initial={{ y: "105%", rotate: 3 }}
                animate={ready ? { y: 0, rotate: 0 } : {}}
                transition={{ delay: 0.15 + i * 0.14, duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
              >
                {l}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, filter: "blur(8px)" }}
          animate={ready ? { opacity: 1, filter: "blur(0px)" } : {}}
          transition={{ delay: 0.7, duration: 0.9 }}
          className="mt-8 max-w-md text-lg text-muted-foreground"
        >
          Professional plumbing and technical solutions.
        </motion.p>

        <div className="mt-10 flex flex-wrap gap-3">
          {[<CallButton key="c" />, <LineButton key="s" href="#services">DISCOVER OUR SERVICES ↓</LineButton>].map((b, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 24 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.9 + i * 0.12, type: "spring", stiffness: 120 }}>
              {b}
            </motion.div>
          ))}
        </div>

        <div className="absolute bottom-10 right-5 hidden font-mono text-[10px] leading-5 tracking-widest text-muted-foreground sm:block sm:right-8">
          <div>SYS / 01 — FLOW ACTIVE</div>
          <div className="text-glow">GEORGETOWN · GY</div>
        </div>
      </motion.div>
    </section>
  );
}
