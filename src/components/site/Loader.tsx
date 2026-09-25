import { motion } from "framer-motion";

export function Loader({ onDone }: { onDone: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: 0.7 }}
    >
      <div className="relative flex flex-col items-center">
        <svg width="320" height="40" viewBox="0 0 320 40" className="mb-6 max-w-[80vw]">
          <motion.path
            d="M0 20 H90 Q110 20 110 8 T130 20 H190 Q210 20 210 32 T230 20 H320"
            fill="none"
            stroke="var(--glow)"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.3, ease: "easeInOut" }}
            onAnimationComplete={() => setTimeout(onDone, 700)}
            style={{ filter: "drop-shadow(0 0 6px var(--glow))" }}
          />
        </svg>
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
            className="font-display text-4xl font-extrabold tracking-tight text-gloss sm:text-6xl"
          >
            DARUL YUSR
          </motion.h1>
        </div>
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.1em" }}
          animate={{ opacity: 1, letterSpacing: "0.5em" }}
          transition={{ delay: 0.9, duration: 1 }}
          className="mt-3 font-mono text-[10px] text-glow sm:text-xs"
        >
          PLUMBING SERVICES
        </motion.p>
      </div>
    </motion.div>
  );
}
