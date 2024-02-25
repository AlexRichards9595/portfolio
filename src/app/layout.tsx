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
      <body className={`${inter.className} flex flex-col h-full lg:h-screen lg:flex-row`}>
        <Header />
          <Sidebar/>
          <div className={'w-full lg:w-4/5 lg:overflow-y-auto py-6 lg:py-12'}>{children}</div>
      </body>
    </html>
  );
}
