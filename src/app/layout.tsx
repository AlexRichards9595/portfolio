import type { Metadata, Viewport } from "next";
import { Inter, Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import React from "react";
import PageWipe from "@/components/motion/PageWipe";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://alexrichards.dev"),
  title: "Alex Richards — Web & Mobile Builder",
  description:
    "Alex Richards is a software engineer with 8 years of experience building beautiful, valuable web and mobile applications. Portfolio, work history, and projects.",
};

export const viewport: Viewport = {
  themeColor: "#2E1C1C",
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} ${mono.variable}`}>
      <body className="font-sans bg-primary text-cream">
        {children}
        <PageWipe />
      </body>
    </html>
  );
}
