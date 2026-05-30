"use client";

import {
  useEffect,
  useState,
} from "react";

import { api } from "@/lib/api";

interface User {
  id: number;
  email: string;
  name?: string;
  role?: string;
  has_access?: boolean;
}

export function useAuth() {

  const [user, setUser] =
    useState<User | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function checkAuth() {

      try {

        const data =
          await api.me();

        setUser(data);

      } catch {

        setUser(null);
      }

      finally {

        setLoading(false);
      }
    }

    checkAuth();

  }, []);

  const isLoggedIn =
    !!user;

  const hasAccess =
    user?.has_access ??
    false;

  return {

    user,

    loading,

    isLoggedIn,

    hasAccess,
  };
}