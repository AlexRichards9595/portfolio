import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import BottomDrawer from "@/components/BottomDrawer";
import Image from "next/image";
import React from "react";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Alex Richards",
  description: "Web Builder | Happy Camper",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <main className={'flex flex-col h-screen overflow-x-hidden'}>
          <Link href={'/'}>
            <Image src={'/logo.svg'} className={'w-16 h-16 my-2 mx-auto lg:hidden'} width={400} height={400} alt={'Logo'}/>
          </Link>
          <div className={'w-screen lg:flex lg:flex-row grow overflow-y-auto'}>
            <Sidebar/>
            <div className={'lg:w-screen lg:overflow-y-auto lg:grow'}>{children}</div>
          </div>
          <BottomDrawer/>
        </main>
      </body>
    </html>
  );
}
