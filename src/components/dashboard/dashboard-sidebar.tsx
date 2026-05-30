"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  History,
  GitCompare,
  Files,
  User,
  CreditCard,
//  BookOpen,
  Menu,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { useSidebar } from "@/lib/store";

const sidebarItems = [
  {
    label: "Predict",
    href: "/predict",
    icon: LayoutDashboard,
  },

  {
    label: "History",
    href: "/history",
    icon: History,
  },

  {
    label: "Compare",
    href: "/compare",
    icon: GitCompare,
  },

  {
    label: "Batch",
    href: "/batch",
    icon: Files,
  },

  {
    label: "Account",
    href: "/account",
    icon: User,
  },

  {
    label: "Billing",
    href: "/billing",
    icon: CreditCard,
  },

 // {
  //  label: "Docs",
  //  href: "/docs",
  //  icon: BookOpen,
  // },
];

export function DashboardSidebar() {

  const pathname =
    usePathname();

  const {
    sidebarCollapsed,
    toggleSidebar,
  } = useSidebar();

  return (

    <aside
      className={`fixed left-0 top-0 z-50 hidden lg:flex h-screen flex-col border-r border-cyan-500/10 bg-[#071120]/80 backdrop-blur-2xl transition-all duration-300 ${
        sidebarCollapsed
          ? "w-[100px]"
          : "w-[270px]"
      }`}
    >

      {/* TOP GLOW */}
      <div className="absolute left-0 top-0 h-[300px] w-full bg-cyan-500/5 blur-3xl" />

      {/* HEADER */}
      <div className="relative flex h-24 items-center justify-between border-b border-cyan-500/10 px-6">

        {!sidebarCollapsed && (

          <Link
  href="/dashboard"
  className="transition-opacity hover:opacity-80"
>

  <div>

    <h1 className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-2xl font-black text-transparent">

      NanoToxi

    </h1>

    <p className="mt-1 text-sm tracking-[0.35em] text-cyan-400/80">

      AI PLATFORM

    </p>

  </div>

</Link>
        )}

        <Button
          variant="ghost"
          size="icon"
          onClick={
            toggleSidebar
          }
          className="rounded-2xl border border-cyan-500/10 bg-cyan-500/5 text-cyan-300 transition-all duration-300 hover:bg-cyan-500/10 hover:text-cyan-200"
        >

          <Menu
            className={`h-5 w-5 transition-transform duration-300 ${
              sidebarCollapsed
                ? "rotate-180"
                : ""
            }`}
          />

        </Button>

      </div>

      {/* NAVIGATION */}
      <nav className="flex flex-1 flex-col justify-between p-4">
        <div className="space-y-6">


        {sidebarItems.map(
          (item) => {

            const Icon =
              item.icon;

            const active =
              pathname ===
              item.href;

            return (

              <Link
                key={item.href}
                href={
                  item.href
                }

                className={`group relative flex items-center gap-4 overflow-hidden rounded-2xl border px-4 py-2.5 transition-all duration-300 ${
                  active

                    ? `
                      border-cyan-400/20
                      bg-cyan-500/10
                      text-white
                      shadow-[0_0_30px_rgba(34,211,238,0.12)]
                    `

                    : `
                      border-transparent
                      text-white/70
                      hover:border-cyan-500/10
                      hover:bg-cyan-500/5
                      hover:text-white
                    `
                }`}
              >

                {/* ACTIVE GLOW */}
                {active && (
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-blue-500/5" />
                )}

                {/* ICON */}
                <div
                  className={`relative flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-300 ${
                    active

                      ? `
                        bg-cyan-400/15
                        text-cyan-300
                        shadow-[0_0_20px_rgba(34,211,238,0.2)]
                      `

                      : `
                        bg-white/[0.03]
                        text-white/60
                        group-hover:bg-cyan-500/10
                        group-hover:text-cyan-300
                      `
                  }`}
                >

                  <Icon className="h-5 w-5 shrink-0" />

                </div>

                {/* LABEL */}
                {!sidebarCollapsed && (

                  <span className="relative text-[15px] font-medium tracking-wide">

                    {item.label}

                  </span>

                )}

              </Link>
            );
          }
        )}

        </div>

      </nav>

      {/* BOTTOM PANEL */}
      {!sidebarCollapsed && (

        <div className="relative border-t border-cyan-500/10 p-5">

          <div className="rounded-3xl border border-cyan-500/10 bg-cyan-500/[0.03] p-5 backdrop-blur-xl">

            <p className="text-sm font-medium text-cyan-300">

              AI Status

            </p>

            <div className="mt-3 flex items-center gap-3">

              <div className="h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_15px_#22d3ee]" />

              <span className="text-sm text-white/70">

                Systems Operational

              </span>

            </div>

          </div>

        </div>

      )}

    </aside>
  );
}