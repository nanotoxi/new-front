"use client";

import Link from "next/link";

import {
  useEffect,
  useState,
} from "react";

import {
  Menu,
  X,
} from "lucide-react";

import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

import { orbitron } from "@/app/layout";

const navLinks = [
  {
    label: "Features",
    href: "/features",
  },

  {
    label: "Pricing",
    href: "/pricing",
  },

  {
    label: "About",
    href: "/about",
  },

  {
    label: "Contact",
    href: "/contact",
  },
];

export function SiteHeader() {

  const pathname =
    usePathname();

  const [isScrolled, setIsScrolled] =
    useState(false);

  const [
    mobileMenuOpen,
    setMobileMenuOpen,
  ] = useState(false);

  useEffect(() => {

    function handleScroll() {

      setIsScrolled(
        window.scrollY > 10
      );
    }

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );

  }, []);

  return (

    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "border-b border-white/5 bg-[#020617]/70 backdrop-blur-2xl"
          : "bg-transparent"
      }`}
    >

      <div className="mx-auto flex h-20 sm:h-24 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* LOGO */}
        <Link
          href="/"
          className="group flex items-center gap-3 sm:gap-4"
        >

          <div className="flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-2xl sm:text-3xl font-black text-cyan-400 shadow-[0_0_35px_rgba(34,211,238,0.25)] transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_45px_rgba(34,211,238,0.45)]">

            N

          </div>

          <div>

            <p
              className={`${orbitron.className} text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white`}
            >

              NanoToxi

            </p>

            <p className="text-[10px] sm:text-xs uppercase tracking-[0.35em] sm:tracking-[0.45em] text-slate-400">

              AI PLATFORM

            </p>

          </div>

        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-14">

          {navLinks.map(
            (link) => {

              const isActive =
                pathname ===
                link.href;

              return (

                <Link
                  key={link.href}
                  href={link.href}

                  className={`relative text-base xl:text-lg font-medium transition-all duration-300 hover:-translate-y-[1px] hover:text-white ${
                    isActive
                      ? "text-cyan-400"
                      : "text-slate-400"
                  }`}
                >

                  {link.label}

                  {isActive && (

                    <span className="absolute -bottom-3 left-0 h-[2px] w-full rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee]" />

                  )}

                </Link>
              );
            }
          )}

        </nav>

        {/* DESKTOP CTA */}
        <div className="hidden lg:flex items-center gap-3 xl:gap-5">

          <Link href="/sign-in">

            <Button
              variant="ghost"

              className="min-h-[44px] rounded-full border border-white/5 bg-white/[0.02] px-4 lg:px-6 py-2 lg:py-3 text-sm text-white backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/20 hover:bg-cyan-500/5 hover:text-cyan-300"
            >

              Sign In

            </Button>

          </Link>

          <Link href="/sign-up">

            <Button
              className="
                min-h-[44px]
                rounded-full
                border-0
                bg-gradient-to-r
                from-cyan-400
                to-blue-500
                px-5
                lg:px-7
                py-2
                lg:py-3
                text-sm
                font-semibold
                text-black
                shadow-[0_0_35px_rgba(34,211,238,0.35)]
                transition-all
                duration-300
                hover:scale-105
                hover:shadow-[0_0_45px_rgba(34,211,238,0.55)]
              "
            >

              Request Access

            </Button>

          </Link>

        </div>

        {/* MOBILE/TABLET MENU BUTTON */}
        <button
          onClick={() =>
            setMobileMenuOpen(
              !mobileMenuOpen
            )
          }

          className="text-white lg:hidden"
        >

          {mobileMenuOpen ? (

            <X className="h-7 w-7" />

          ) : (

            <Menu className="h-7 w-7" />

          )}

        </button>

      </div>

      {/* MOBILE/TABLET MENU */}
      {mobileMenuOpen && (

        <div className="border-t border-white/5 bg-[#020617]/95 backdrop-blur-2xl lg:hidden">

          <div className="flex flex-col gap-7 px-6 py-8">

            {navLinks.map(
              (link) => {

                const isActive =
                  pathname ===
                  link.href;

                return (

                  <Link
                    key={link.href}
                    href={link.href}

                    onClick={() =>
                      setMobileMenuOpen(
                        false
                      )
                    }

                    className={`text-lg font-medium transition-all ${
                      isActive
                        ? "text-cyan-400"
                        : "text-slate-300"
                    }`}
                  >

                    {link.label}

                  </Link>
                );
              }
            )}

            {/* MOBILE/TABLET BUTTONS */}
            <div className="flex flex-col gap-4 pt-5">

              <Link href="/sign-in">

                <Button
                  variant="ghost"

                  className="min-h-[48px] w-full rounded-full border border-white/10 py-3 text-white"
                >

                  Sign In

                </Button>

              </Link>

              <Link href="/sign-up">

                <Button className="min-h-[48px] w-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 py-3 text-black hover:opacity-90">

                  Request Access

                </Button>

              </Link>

            </div>

          </div>

        </div>
      )}

    </header>
  );
}