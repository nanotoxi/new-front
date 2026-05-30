"use client";

import "./globals.css";

import {
  AuthProvider,
} from "@/context/auth-context";

import SmoothScroll from "@/components/smooth-scroll";

import { usePathname } from "next/navigation";

import { SiteFooter } from "@/components/marketing/site-footer";

import { ThemeProvider } from "@/components/theme-provider";

import { Toaster } from "sonner";

import { Orbitron } from "next/font/google";  

export const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const pathname =
    usePathname();

  const isDashboard =
  pathname === "/predict" ||
  pathname === "/compare" ||
  pathname.startsWith("/history") ||
  pathname.startsWith("/batch") ||
  pathname.startsWith("/account") ||
  pathname.startsWith("/billing") ||
  pathname.startsWith("/docs");

  return (
    <html
      lang="en"
      suppressHydrationWarning
    >

      <body>
        <AuthProvider>
        <SmoothScroll />
        <ThemeProvider>

          {children}

          {!isDashboard && (
            <SiteFooter />
          )}

          <Toaster richColors />

        </ThemeProvider>
        </AuthProvider>

      </body>

    </html>
  );
}