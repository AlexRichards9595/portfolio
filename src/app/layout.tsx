import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
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
      <body className={`${inter.className} flex bg-amber-500 h-screen overflow-hidden`}>
        <div className={'lg:hidden h-screen overflow-y-auto'}>
          <Header />
          <div className={'w-full bg-gray-500'}>{children}</div>
        </div>
        <div className={'hidden lg:flex'}>
          <Sidebar/>
          <div className={'lg:w-4/5 bg-gray-500 overflow-y-hidden'}>{children}</div>
        </div>
      </body>
    </html>
  );
}
