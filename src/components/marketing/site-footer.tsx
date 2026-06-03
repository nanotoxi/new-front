"use client";

import { usePathname } from "next/navigation";

import Link from "next/link";
import Image from "next/image";

import {
  Globe,
  Phone,
  Mail,
} from "lucide-react";

const footerLinks = {
  Product: [
    {
      label: "Features",
      href: "/features",
    },

    {
      label: "Pricing",
      href: "/pricing",
    },

    {
      label: "AI Dashboard",
      href: "#",
    },

    {
      label: "API Access",
      href: "#",
    },
  ],

  Company: [
    {
      label: "About",
      href: "/about",
    },

    {
      label: "Contact",
      href: "/contact",
    },

    {
      label: "Careers",
      href: "#",
    },

    {
      label: "Partners",
      href: "#",
    },
  ],

  Resources: [
    {
      label: "Documentation",
      href: "#",
    },

    {
      label: "Research Papers",
      href: "#",
    },

    {
      label: "Support",
      href: "#",
    },

    {
      label: "Blog",
      href: "#",
    },
  ],

  Legal: [
    {
      label: "Privacy Policy",
      href: "/privacy",
    },

    {
      label: "Terms of Service",
      href: "/terms",
    },

    {
      label: "Security",
      href: "/security",
    },

    {
      label: "Compliance",
      href: "/compliance",
    },
  ],
};

export function SiteFooter() {

  const pathname =
    usePathname();

  // Hide footer on dashboard
  if (
    pathname.startsWith(
      "/dashboard"
    )||
    pathname.startsWith("/admin")||
    pathname === "/sign-in" ||
    pathname === "/sign-up" ||
    pathname === "/audit"
  ) {

    return null;

  }

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black/40 px-6 py-20 backdrop-blur-2xl">

      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">

        <div className="absolute left-1/3 top-0 h-[300px] w-[300px] rounded-full bg-primary/10 blur-[100px]" />

        <div className="absolute bottom-0 right-0 h-[250px] w-[250px] rounded-full bg-cyan-500/10 blur-[100px]" />

      </div>

      <div className="mx-auto max-w-7xl">

        {/* Top Section */}
        <div className="grid gap-14 lg:grid-cols-6">

          {/* Brand */}
          <div className="lg:col-span-2">

            <Link
              href="/"
              className="flex items-center gap-4"
            >

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 shadow-[0_0_40px_rgba(34,211,238,0.25)]">

                <Image
                  src="/nanotoxi-logo.png"
                  alt="NanoToxi"
                  width={40}
                  height={40}
                  className="object-contain"
                />

              </div>

              <div>

                <h2 className="text-2xl font-black">

                  NanoToxi AI

                </h2>

                <p className="text-sm text-muted">

                  AI Platform

                </p>

              </div>

            </Link>

            <p className="mt-6 max-w-md leading-relaxed text-muted">

              NanoToxi AI accelerates nanotoxicity research using predictive AI,
              scientific intelligence, and enterprise-grade biotechnology
              workflows.

            </p>

            {/* Socials */}
            <div className="mt-8 flex items-center gap-4">

              {[Globe,
                Phone,
                Mail,
              ].map(
                (
                  Icon,
                  index
                ) => (

                  <div
                    key={index}
                    className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-primary/10"
                  >

                    <Icon className="h-5 w-5 text-muted transition-colors duration-300 hover:text-white" />

                  </div>
                )
              )}

            </div>

          </div>

          {/* Footer Columns */}
          {Object.entries(
            footerLinks
          ).map(
            (
              [
                section,
                links,
              ],
              index
            ) => (

              <div
                key={index}
              >

                <h3 className="mb-6 text-lg font-bold">

                  {section}

                </h3>

                <div className="space-y-4">

                  {links.map(
                    (link) => (

                      <Link
                        key={
                          link.label
                        }

                        href={
                          link.href
                        }

                        className="block text-muted transition-all duration-300 hover:translate-x-1 hover:text-white"
                      >

                        {link.label}

                      </Link>
                    )
                  )}

                </div>

              </div>
            )
          )}

        </div>

        {/* Bottom */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-muted md:flex-row">

          <p>

            © 2026 NanoToxi AI. All rights reserved.

          </p>

          <p>

            Built for the future of AI-powered nanotoxicity intelligence.

          </p>

        </div>

      </div>

    </footer>
  );
}