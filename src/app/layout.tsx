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
      <body className={`${inter.className}`}>
        <main className={'flex flex-col h-screen overflow-x-hidden'}>
          <Header/>
          <div className={'w-screen lg:flex lg:flex-row grow overflow-y-auto'}>
            <Sidebar/>
            <div className={'lg:w-screen lg:overflow-y-auto lg:grow'}>{children}</div>
          </div>
        </main>
      </body>
    </html>
  );
}
