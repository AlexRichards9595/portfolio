'use client'
import Link from "next/link";
import React, {FC} from "react";
import {usePathname} from "next/navigation";
import {AnimatePresence, motion} from "framer-motion";

type SidebarMenuItemProps = {
  route: string
  label: string
}

const SidebarMenuItem: FC<SidebarMenuItemProps> = ({route, label}) => {
  const pathname = usePathname()
  return (
    <Link href={route} className={'hover:bg-primary w-full p-4 text-center'}>
      <p className={`text-xl`}>
        {label}
      </p>
      {pathname === route &&
          <AnimatePresence mode={'popLayout'}>
            <motion.div
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                transition={{ type: "spring" }}
                className={`h-[2px] bg-lightest w-1/2 mx-auto`}
            >
            </motion.div>
          </AnimatePresence>
          }
    </Link>
  )
}

export default SidebarMenuItem