import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Loader } from "@/components/site/Loader";
import { Navbar } from "@/components/site/Navbar";
import { Cursor } from "@/components/site/Cursor";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Services } from "@/components/site/Services";
import { Solutions } from "@/components/site/Solutions";
import { BeforeAfter } from "@/components/site/BeforeAfter";
import { Process } from "@/components/site/Process";
import { Location } from "@/components/site/Location";
import { Contact, Footer } from "@/components/site/Contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Darul Yusr Plumbing Services — Georgetown, Guyana" },
      { name: "description", content: "Professional plumbing and technical solutions from Mon Repos Pasture, East Coast of Demerara. Call +592 612 2732." },
      { property: "og:title", content: "Darul Yusr Plumbing Services" },
      { property: "og:description", content: "Professional plumbing and technical solutions in Georgetown, Guyana." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [loading, setLoading] = useState(true);
  return (
    <>
      <AnimatePresence>{loading && <Loader onDone={() => setLoading(false)} />}</AnimatePresence>
      <Cursor />
      <Navbar />
      <main>
        <Hero ready={!loading} />
        <About />
        <Services />
        <Solutions />
        <BeforeAfter />
        <Process />
        <Location />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
