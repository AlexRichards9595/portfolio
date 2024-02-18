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
      <body className={`${inter.className} flex h-screen bg-amber-500 overflow-y-hidden`}>
        <main className={'flex w-screen bg-accent grow flex-row h-full overflow-y-auto lg:overflow-y-hidden'}>
        <Header />
          <Sidebar/>
          <div className={'lg:w-4/5 bg-gray-500 lg:overflow-y-auto overflow-x-hidden py-6'}>{children}</div>
        </main>
      </body>
    </html>
  );
}
