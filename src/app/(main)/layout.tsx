import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import React from "react";

export default function MainLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col h-full lg:h-screen lg:flex-row">
      <Header />
      <Sidebar />
      <main className="relative w-full lg:w-4/5 lg:h-screen lg:overflow-y-auto no-scrollbar">
        {/* drenched techy backdrop */}
        <div className="pointer-events-none absolute inset-0 grid-texture opacity-60" />
        <div className="pointer-events-none absolute inset-0 aura" />
        <div className="relative">{children}</div>
      </main>
    </div>
  );
}
