"use client";
import Link from "next/link";
import React, { FC } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

type SidebarMenuItemProps = {
  route: string;
  label: string;
};

const SidebarMenuItem: FC<SidebarMenuItemProps> = ({ route, label }) => {
  const pathname = usePathname();
  const active = route === "/" ? pathname === "/" : pathname.startsWith(route);

  return (
    <Link
      href={route}
      className={`group relative flex items-center rounded-xl px-5 py-3 transition-colors duration-300 ${
        active ? "bg-white/10" : "hover:bg-white/5"
      }`}
    >
      {active && (
        <motion.span
          layoutId="side-active"
          className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full bg-grape"
          transition={{ type: "spring", stiffness: 500, damping: 40 }}
        />
      )}
      <span
        className={`text-lg tracking-wide transition-colors duration-300 ${
          active ? "text-cream font-medium" : "text-lightest/80 group-hover:text-cream"
        }`}
      >
        {label}
      </span>
    </Link>
  );
};

export default SidebarMenuItem;
