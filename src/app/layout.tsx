import type { Metadata } from "next";
import { Inter, Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import React from "react";

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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} ${mono.variable}`}>
      <body className="font-sans bg-primary text-cream">{children}</body>
    </html>
  );
}
