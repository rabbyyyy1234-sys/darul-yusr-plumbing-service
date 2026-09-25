import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV } from "./data";
import { CallButton } from "./Buttons";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      let cur = "home";
      for (const n of NAV) {
        const el = document.getElementById(n.id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) cur = n.id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="fixed inset-x-0 top-4 z-50 flex justify-center px-3"
      >
        <nav
          className={`flex w-full items-center justify-between gap-4 rounded-full border transition-all duration-500 ${
            scrolled
              ? "max-w-5xl border-glow/30 bg-ink/85 py-1.5 pl-5 pr-1.5 shadow-[0_0_40px_-12px_var(--brand)] backdrop-blur-2xl"
              : "max-w-6xl border-border bg-charcoal/40 py-2.5 pl-6 pr-2.5 backdrop-blur-md"
          }`}
        >
          <a href="#home" className="flex flex-col leading-none">
            <span className="whitespace-nowrap font-display text-sm font-extrabold tracking-tight sm:text-base">DARUL YUSR</span>
            <span className="mt-0.5 whitespace-nowrap font-mono text-[7px] sm:text-[8px] tracking-[0.35em] text-glow">PLUMBING SERVICES</span>
          </a>
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV.map((n) => (
              <li key={n.id} className="relative">
                <a
                  href={`#${n.id}`}
                  className={`group relative block px-3.5 py-2 text-[13px] transition-colors ${active === n.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {active === n.id && (
                    <motion.span layoutId="nav-active" className="absolute inset-0 rounded-full bg-deep shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--glow)_35%,transparent),0_0_18px_-6px_var(--glow)]" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                  )}
                  <span className="relative inline-block transition-transform group-hover:-translate-y-px">{n.label}</span>
                  <span className="absolute bottom-1 left-1/2 h-px w-0 -translate-x-1/2 bg-glow transition-all duration-300 group-hover:w-1/2" />
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <CallButton compact className="hidden sm:inline-flex" />
            <button aria-label="Menu" onClick={() => setOpen(true)} className="flex h-10 w-10 items-center justify-center rounded-full bg-deep lg:hidden">
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at 92% 5%)" }}
            animate={{ clipPath: "circle(150% at 92% 5%)" }}
            exit={{ clipPath: "circle(0% at 92% 5%)" }}
            transition={{ duration: 0.6, ease: [0.7, 0, 0.3, 1] }}
            className="blueprint fixed inset-0 z-[60] flex flex-col bg-ink p-6 lg:hidden"
          >
            <button aria-label="Close" onClick={() => setOpen(false)} className="ml-auto flex h-11 w-11 items-center justify-center rounded-full bg-deep">
              <X className="h-5 w-5" />
            </button>
            <ul className="mt-10 space-y-2">
              {NAV.map((n, i) => (
                <motion.li key={n.id} initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 + i * 0.05 }}>
                  <a href={`#${n.id}`} onClick={() => setOpen(false)} className="flex items-baseline gap-4 font-display text-4xl font-bold">
                    <span className="font-mono text-xs text-glow">0{i + 1}</span>
                    {n.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="mt-auto"><CallButton /></div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
