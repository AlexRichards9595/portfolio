import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import BottomDrawer from "@/components/BottomDrawer";
import Image from "next/image";
import React from "react";

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
      <body className={`${inter.className} flex flex-col h-screen`}>
      <Image src={'/logo.svg'} className={'w-16 h-16 my-4 mx-auto lg:hidden'} width={400} height={400} alt={'Logo'}/>
      <div className={'flex flex-row grow overflow-y-hidden'}>
        <Sidebar/>
        <div className={'max-h-screen w-screen overflow-y-auto grow'}>{children}</div>
      </div>
      <BottomDrawer/>
      </body>
    </html>
  );
}
