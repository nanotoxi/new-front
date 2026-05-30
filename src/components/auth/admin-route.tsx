"use client";

import {
  useEffect,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  useAuth,
} from "@/context/auth-context";

export default function AdminRoute({
  children,
}: {
  children: React.ReactNode;
}) {

  const router =
    useRouter();

  const {
    loading,
    user,
    isLoggedIn,
  } = useAuth();

  useEffect(() => {

    if (
      !loading &&
      !isLoggedIn
    ) {

      router.push(
        "/sign-in"
      );

      return;
    }

    if (
      !loading &&
      user?.role !== "admin"
    ) {

      router.push(
        "/dashboard"
      );
    }

  }, [
    loading,
    isLoggedIn,
    user,
    router,
  ]);

  /* LOADING */
  if (loading) {

    return (

      <div className="flex min-h-screen items-center justify-center bg-[#020817]">

        <div className="h-12 w-12 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent" />

      </div>
    );
  }

  /* BLOCK */
  if (
    !isLoggedIn ||
    user?.role !== "admin"
  ) {

    return null;
  }

  return <>{children}</>;
}