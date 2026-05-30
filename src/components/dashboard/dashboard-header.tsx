"use client";

import { useEffect, useState } from "react";

import {
  Bell,
  Moon,
  Sun,
  Menu,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { DashboardSidebar } from "./dashboard-sidebar";

import { useAppStore } from "@/lib/store";

type Props = {
  title: string;
};

export function DashboardHeader({
  title,
}: Props) {

  const [mounted, setMounted] =
    useState(false);

  useEffect(() => {

    setMounted(true);

  }, []);

  const theme =
    useAppStore(
      (state) =>
        state.theme
    );

  const setTheme =
    useAppStore(
      (state) =>
        state.setTheme
    );

  function toggleTheme() {

    const newTheme =
      theme === "dark"
        ? "light"
        : "dark";

    setTheme(newTheme);

    document.documentElement.classList.toggle(
      "dark",
      newTheme === "dark"
    );
  }

  if (!mounted) {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 flex h-24 items-center justify-between border-b border-white/10 bg-background/70 px-6 backdrop-blur-2xl">

      {/* Left */}
      <div className="flex items-center gap-3">

        {/* Mobile Sidebar */}
        <div className="lg:hidden">

          <Sheet>

            <SheetTrigger asChild>

              <Button
                variant="ghost"
                size="icon"
              >

                <Menu className="h-5 w-5" />

              </Button>

            </SheetTrigger>

            <SheetContent
              side="left"
              className="w-[280px] border-white/10 bg-black p-0"
            >

              {/* Accessibility */}
              <SheetHeader className="sr-only">

                <SheetTitle>

                  Dashboard Navigation

                </SheetTitle>

              </SheetHeader>

              <DashboardSidebar />

            </SheetContent>

          </Sheet>

        </div>

        <div>

          <h1 className="text-4xl font-black">

            {title}

          </h1>

        </div>

      </div>

      {/* Right */}
      <div className="flex items-center gap-3">

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
        >

          {theme === "dark" ? (

            <Sun className="h-5 w-5" />

          ) : (

            <Moon className="h-5 w-5" />

          )}

        </Button>

        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
        >

          <Bell className="h-5 w-5" />

        </Button>

        {/* Avatar */}
        <DropdownMenu>

          <DropdownMenuTrigger
            asChild
          >

            <Button
              variant="ghost"
              className="rounded-full p-0"
            >

              <Avatar>

                <AvatarFallback>

                  K

                </AvatarFallback>

              </Avatar>

            </Button>

          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">

            <DropdownMenuItem>

              Profile

            </DropdownMenuItem>

            <DropdownMenuItem>

              Settings

            </DropdownMenuItem>

            <DropdownMenuItem>

              Logout

            </DropdownMenuItem>

          </DropdownMenuContent>

        </DropdownMenu>

      </div>

    </header>
  );
}