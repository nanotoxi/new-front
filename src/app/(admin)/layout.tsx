"use client";

import AdminRoute from "@/components/auth/admin-route";

import type {
  ReactNode,
} from "react";

import {
  ThemeProvider,
  useTheme,
} from "@/context/theme-context";

import { useState } from "react";

import { Menu } from "lucide-react";

import { AdminSidebar } from "@/components/admin/admin-sidebar";

import { AdminHeader } from "@/components/admin/admin-header";

type Props = {
  children: ReactNode;
};

function DashboardLayout({
  children,
}: Props) {

  const { theme } =
    useTheme();

  const [
    sidebarOpen,
    setSidebarOpen,
  ] = useState(false);

  return (

    <div
      className={`
        flex
        min-h-screen
        overflow-x-hidden
        transition-all
        duration-300
        ${
          theme === "dark"
            ? "bg-[#020817] text-white"
            : "bg-[#F5F7FB] text-slate-900"
        }
      `}
    >

      {/* MOBILE OVERLAY */}

      {sidebarOpen && (
        <div
          className="
            fixed
            inset-0
            z-40
            bg-black/60
            xl:hidden
          "
          onClick={() =>
            setSidebarOpen(false)
          }
        />
      )}

      {/* SIDEBAR */}

      <div
        className={`
          fixed
          left-0
          top-0
          z-50
          h-screen
          transform
          transition-transform
          duration-300
          xl:translate-x-0
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >

        <AdminSidebar />

      </div>

      {/* MAIN */}

      <div
        className="
          flex
          min-h-screen
          flex-1
          flex-col
          w-full
          xl:ml-[280px]
        "
      >

        {/* MOBILE / TABLET TOP BAR */}

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-white/10
            px-4
            py-4
            xl:hidden
          "
        >

          <button
            onClick={() =>
              setSidebarOpen(true)
            }

            className="
              rounded-xl
              border
              border-white/10
              bg-white/5
              p-2
            "
          >

            <Menu className="h-5 w-5" />

          </button>

          <h1 className="text-lg font-bold text-cyan-400">

            NanoToxi

          </h1>

        </div>

        {/* HEADER */}

        <AdminHeader />

        {/* CONTENT */}

        <main
          className="
            flex-1
            overflow-x-hidden
            p-4
            sm:p-6
            lg:p-8
          "
        >

          {children}

        </main>

      </div>

    </div>
  );
}

export default function AdminLayout({
  children,
}: Props) {

  return (

    <AdminRoute>

      <ThemeProvider>

        <DashboardLayout>

          {children}

        </DashboardLayout>

      </ThemeProvider>

    </AdminRoute>
  );
}