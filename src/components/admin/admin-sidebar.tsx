"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Users,
  Activity,
  ShieldCheck,
  Database,
  Settings,
  BrainCircuit,
  ServerCog,
} from "lucide-react";

const sidebarItems = [
  {
    label: "Overview",
    href: "/admin/overview",
    icon: LayoutDashboard,
  },

  {
    label: "Predictions",
    href: "/admin/predictions",
    icon: Activity,
  },

  {
    label: "Health",
    href: "/admin/health",
    icon: ShieldCheck,
  },

  {
    label: "Audit Trails",
    href: "/audit",
    icon: Database,
  },

  {
    label: "Models",
    href: "/admin/model",
    icon: BrainCircuit,
  },

  {
    label: "Users",
    href: "/admin/users",
    icon: Users,
  },

  {
    label: "Data Sources",
    href: "/admin/data-sources",
    icon: ServerCog,
  },

  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export function AdminSidebar() {

  const pathname =
    usePathname();

  return (

    <aside
      className="
        flex
        h-screen
        w-[280px]
        flex-col
        border-r
        border-slate-200/10
        bg-[#111827]
        text-white
      "
    >

      {/* LOGO */}

      <div className="flex h-24 items-center border-b border-white/10 px-7">

        <div>

          <h1 className="text-3xl font-black tracking-tight text-cyan-400">

            NanoToxi

          </h1>

          <p className="mt-1 text-sm tracking-[0.3em] text-slate-400">

            AI CONTROL CENTER

          </p>

        </div>

      </div>

      {/* MENU */}

      <div className="px-5 pt-6">

        <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">

          Management

        </p>

      </div>

      {/* NAVIGATION */}

      <nav className="flex-1 space-y-1 overflow-y-auto px-4 pb-4">

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

                className={`group flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-200 ${
                  active
                    ? "bg-cyan-500/10 text-cyan-300"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >

                {/* ACTIVE INDICATOR */}

                <div
                  className={`h-6 w-1 rounded-full transition-all ${
                    active
                      ? "bg-cyan-400"
                      : "bg-transparent"
                  }`}
                />

                {/* ICON */}

                <Icon
                  className={`h-5 w-5 shrink-0 transition-all ${
                    active
                      ? "text-cyan-300"
                      : "text-slate-400 group-hover:text-white"
                  }`}
                />

                {/* LABEL */}

                <span className="font-medium">

                  {item.label}

                </span>

              </Link>
            );
          }
        )}

      </nav>

      {/* FOOTER */}

      <div className="border-t border-white/10 p-5">

        <div className="rounded-2xl bg-white/5 p-4">

          <p className="text-sm font-semibold text-cyan-300">

            System Status

          </p>

          <div className="mt-3 flex items-center gap-2">

            <div className="h-2 w-2 rounded-full bg-green-400" />

            <span className="text-sm text-slate-300">

              All systems operational

            </span>

          </div>

        </div>

      </div>

    </aside>
  );
}