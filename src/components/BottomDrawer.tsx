'use client'
import {Drawer} from "@/components/MaterialTailwind";
import React, {useState} from "react";
import Link from "next/link";
import Image from "next/image";

const BottomDrawer = () => {
  const [open, setOpen] = useState(false)
  return (
      <div className={'h-12 w-screen lg:hidden border-t-2'}>
        <div className={'flex items-center justify-center h-full w-full'} onClick={() => setOpen(true)}>
          <Image className={'w-8 h-8'} src={'/icon-menu-open.png'} alt={'Arrow'} height={50} width={50}/>
        </div>
      <Drawer className={'bg-secondary pt-16'} size={600} open={open} placeholder={undefined} placement={"bottom"} onClose={() => setOpen(false)}>
        <div className={'flex flex-col items-center pb-8'}>
          <Image src={'/logo.svg'} className={'w-16 h-16 mb-4'} width={400} height={400} alt={'Logo'}/>
          <p className={'text-3xl text-center'}>Alex Richards</p>
          <p className={'text-lg text-center text-lightest'}>Web Builder | Happy Camper</p>
        </div>
        <div className={'flex flex-col grow justify-center items-center w-full'}>
          <Link href={'/'} onClick={() => setOpen(false)} className={'hover:bg-primary w-full p-4 text-center'}><p className={'text-xl'}>Home</p></Link>
          <Link href={'/work'} onClick={() => setOpen(false)} className={'hover:bg-primary w-full p-4 text-center'}><p className={'text-xl'}>Work</p></Link>
          <Link href={'/reviews'} onClick={() => setOpen(false)} className={'hover:bg-primary w-full p-4 text-center'}><p className={'text-xl'}>Reviews</p></Link>
          <Link href={'/projects'} onClick={() => setOpen(false)} className={'hover:bg-primary w-full p-4 text-center'}><p className={'text-xl'}>Projects</p></Link>
        </div>
      </Drawer>
      </div>
  )
}

export default BottomDrawer