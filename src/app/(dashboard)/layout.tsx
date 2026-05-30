"use client";

import type {
  ReactNode,
} from "react";

import {
  DashboardSidebar,
} from "@/components/dashboard/dashboard-sidebar";

import {
  DashboardHeader,
} from "@/components/dashboard/dashboard-header";

import {
  useSidebar,
} from "@/lib/store";

type Props = {
  children: ReactNode;
};

export default function DashboardLayout({
  children,
}: Props) {

  const {
    sidebarCollapsed,
  } = useSidebar();

  return (

    <div className="relative flex min-h-screen overflow-hidden bg-[#020617] text-white">

      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* LEFT GLOW */}
        <div className="absolute left-[-250px] top-[-150px] h-[700px] w-[700px] rounded-full bg-cyan-500/10 blur-[160px]" />

        {/* RIGHT GLOW */}
        <div className="absolute bottom-[-250px] right-[-250px] h-[700px] w-[700px] rounded-full bg-blue-500/10 blur-[160px]" />

        {/* CENTER LIGHT */}
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/[0.03] blur-[140px]" />

        {/* PARTICLES */}
        {Array.from({
  length: 18,
}).map((_, i) => {

  const size =
    2 + (i % 4);

  const top =
    (i * 13) % 100;

  const left =
    (i * 7) % 100;

  const duration =
    8 + i;

  const delay =
    i * 0.4;

  return (
    <div
      key={i}
      className="absolute rounded-full bg-cyan-400"

      style={{
        width: `${size}px`,
        height: `${size}px`,
        top: `${top}%`,
        left: `${left}%`,
        opacity: 0.7,

        boxShadow:
          "0 0 15px #22d3ee",

        animation: `floatParticle ${duration}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    />
  );
})}
      </div>

      {/* SIDEBAR */}
      <DashboardSidebar />

      {/* MAIN */}
      <div
        className={`relative z-10 flex flex-1 flex-col border-l border-cyan-500/10 transition-all duration-300 ${
          sidebarCollapsed
            ? "lg:ml-[100px]"
            : "lg:ml-[270px]"
        }`}
      >

        {/* HEADER */}
        <DashboardHeader title="Dashboard" />

        {/* CONTENT */}
        <main className="flex-1 p-4 md:p-6 xl:p-8">

          {children}

        </main>

      </div>

      {/* PARTICLE ANIMATION */}
      <style jsx global>{`

        @keyframes floatParticle {

          0% {
            transform:
              translateY(0px)
              translateX(0px);
          }

          25% {
            transform:
              translateY(-25px)
              translateX(10px);
          }

          50% {
            transform:
              translateY(10px)
              translateX(-15px);
          }

          75% {
            transform:
              translateY(-15px)
              translateX(20px);
          }

          100% {
            transform:
              translateY(0px)
              translateX(0px);
          }
        }

      `}</style>

    </div>
  );
}