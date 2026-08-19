'use client'
import {Drawer} from "@/components/MaterialTailwind";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {MenuToggle} from "@/components/MenuToggle";
import {useCycle} from "framer-motion";
import {usePathname} from "next/navigation";

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
    <div className="h-14 bg-plum-deep plum-glow sticky top-0 w-screen z-20 lg:hidden flex items-center">
      <MenuToggle toggle={() => toggleOpen()} open={open} />
      <Link href="/" className="font-display text-xl text-cream absolute left-1/2 -translate-x-1/2">
        Alex Richards
      </Link>
      <Drawer
        className="bg-plum-deep plum-glow pt-16"
        overlay={false}
        size={520}
        open={open}
        placeholder={undefined}
        placement={"bottom"}
        onClose={() => toggleOpen()}
      >
        <div className="flex flex-col items-center pb-8">
          <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-3 mb-4">
            <Image src={"/logo.svg"} className="w-12 h-12" width={400} height={400} alt={"Logo"} />
          </div>
          <p className="font-display text-3xl text-center text-cream">Alex Richards</p>
          <p className="mt-1 text-sm tracking-wide uppercase text-lightest/80">Web Builder · Happy Camper</p>
        </div>
        <div className="flex flex-col items-center w-full gap-1 px-6">
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
        </div>
      </Drawer>
    </div>
  );
};

export default Header;
