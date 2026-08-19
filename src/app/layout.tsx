import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import React from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://alexrichards.dev"),
  title: "Alex Richards — Web & Mobile Builder",
  description:
    "Alex Richards is a software engineer who builds beautiful, valuable web and mobile applications. Portfolio, work history, and projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="font-sans bg-cream text-ink flex flex-col h-full lg:h-screen lg:flex-row">
        <Header />
        <Sidebar />
        <main className="w-full lg:w-4/5 lg:h-screen lg:overflow-y-auto no-scrollbar">
          {children}
        </main>
      </body>
    </html>
  );
}
