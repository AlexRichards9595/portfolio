"use client";
import Link from "next/link";
import React, { FC } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

type SidebarMenuItemProps = {
  route: string;
  label: string;
  index: number;
};

const SidebarMenuItem: FC<SidebarMenuItemProps> = ({ route, label, index }) => {
  const pathname = usePathname();
  const active = route === "/" ? pathname === "/" : pathname.startsWith(route);

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.06 * index, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={route}
        className={`group relative flex items-center gap-3 rounded-xl px-4 py-3 transition-colors duration-300 ${
          active ? "bg-white/[0.07]" : "hover:bg-white/[0.04]"
        }`}
      >
        {active && (
          <motion.span
            layoutId="side-active"
            className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full bg-accent"
            transition={{ type: "spring", stiffness: 500, damping: 40 }}
          />
        )}
        <span className={`font-mono text-xs ${active ? "text-accent" : "text-lightest/60"}`}>
          0{index}
        </span>
        <span
          className={`text-lg tracking-wide transition-colors duration-300 ${
            active ? "text-cream font-medium" : "text-lightest/80 group-hover:text-cream"
          }`}
        >
          {label}
        </span>
      </Link>
    </motion.div>
  );
};

export default SidebarMenuItem;
