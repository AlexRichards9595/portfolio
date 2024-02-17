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
      <body className={`${inter.className} flex overflow-y-hidden`}>
        <Header />
        <main className={'flex w-screen grow flex-row h-screen overflow-y-auto lg:overflow-y-hidden'}>
          <Sidebar/>
          <div className={'lg:w-4/5 lg:overflow-y-auto overflow-x-hidden py-6'}>{children}</div>
        </main>
      </body>
    </html>
  );
}
