'use client'
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MenuToggle } from "@/components/MenuToggle";
import { AnimatePresence, motion, useCycle } from "framer-motion";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/reviews", label: "Reviews" },
  { href: "/projects", label: "Projects" },
];

const Header = () => {
  const [open, toggleOpen] = useCycle(false, true);
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <div className="h-14 bg-deep sticky top-0 w-screen z-30 lg:hidden flex items-center border-b border-white/5">
      <MenuToggle toggle={() => toggleOpen()} open={open} />
      <Link href="/" className="font-display text-xl text-cream absolute left-1/2 -translate-x-1/2">
        Alex Richards
      </Link>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              aria-label="Close menu"
              className="fixed inset-0 top-14 z-30 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => toggleOpen()}
            />
            <motion.div
              className="fixed inset-x-0 bottom-0 z-40 rounded-t-3xl border-t border-white/10 bg-deep aura px-6 pb-10 pt-4"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 40 }}
            >
              <div className="mx-auto mb-6 h-1.5 w-10 rounded-full bg-white/20" />
              <div className="mb-6 flex flex-col items-center">
                <div className="mb-3 rounded-2xl bg-white/5 ring-1 ring-white/10 p-3">
                  <Image src={"/logo.svg"} className="w-10 h-10" width={400} height={400} alt={"Logo"} />
                </div>
                <p className="font-display text-2xl text-cream">Alex Richards</p>
                <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-lightest">
                  Web &amp; Mobile Builder
                </p>
              </div>
              <nav className="flex flex-col gap-1">
                {links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => toggleOpen()}
                    className={`w-full rounded-xl p-4 text-center text-xl transition-colors ${
                      isActive(l.href) ? "bg-white/10 text-cream" : "text-lightest/80 hover:bg-white/5"
                    }`}
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;
