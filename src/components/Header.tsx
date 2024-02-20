'use client'
import {Drawer} from "@/components/MaterialTailwind";
import React, {useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {MenuToggle} from "@/components/MenuToggle";
import {useCycle} from "framer-motion";
import {usePathname} from "next/navigation";

const Header = () => {
  const [open, toggleOpen] = useCycle(false, true);
  const pathname = usePathname()

  return (
      <div className={'h-12 bg-primary sticky top-0 w-screen z-20 lg:hidden'}>
        <MenuToggle toggle={() => toggleOpen()} open={open}/>
        <Drawer className={'bg-secondary pt-16'} overlay={false} size={600} open={open} placeholder={undefined} placement={"bottom"} onClose={() =>  toggleOpen()}>
          <div className={'flex flex-col items-center pb-8'}>
            <Image src={'/logo.svg'} className={'w-16 h-16 mb-4'} width={400} height={400} alt={'Logo'}/>
            <p className={'text-3xl text-center'}>Alex Richards</p>
            <p className={'text-lg text-center text-lightest'}>Web Builder | Happy Camper</p>
          </div>
          <div className={'flex flex-col grow justify-center items-center w-full'}>
            <Link href={'/'} onClick={() =>  toggleOpen()} className={`hover:bg-primary w-full p-4 text-center ${pathname === '/' && 'underline underline-offset-4'}`}><p className={'text-xl'}>Home</p></Link>
            <Link href={'/work'} onClick={() =>  toggleOpen()} className={`hover:bg-primary w-full p-4 text-center ${pathname === '/work' && 'underline underline-offset-4'}`}><p className={'text-xl'}>Work</p></Link>
            <Link href={'/reviews'} onClick={() =>  toggleOpen()} className={`hover:bg-primary w-full p-4 text-center ${pathname === '/reviews' && 'underline underline-offset-4'}`}><p className={'text-xl'}>Reviews</p></Link>
            <Link href={'/projects'} onClick={() =>  toggleOpen()} className={`hover:bg-primary w-full p-4 text-center ${pathname === '/projects' && 'underline underline-offset-4'}`}><p className={'text-xl'}>Projects</p></Link>
          </div>
        </Drawer>
      </div>
  )
}

export default Header