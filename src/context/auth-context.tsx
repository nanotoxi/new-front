"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { api } from "@/lib/api";

type User = {
  id: string;
  email: string;
  name?: string;
  role?: string;
  has_access?: boolean;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  isLoggedIn: boolean;
  logout: () => Promise<void>;
};

const AuthContext =
  createContext<AuthContextType>({
    user: null,
    loading: true,
    isLoggedIn: false,
    logout: async () => {},
  });

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [user, setUser] =
    useState<User | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function loadUser() {

      try {

        const token =
          localStorage.getItem(
            "nanotoxi_token"
          );

        if (!token) {

          setLoading(false);

          return;
        }

        const me =
          await api.me();

        setUser(me);

      } catch {

        localStorage.removeItem(
          "nanotoxi_token"
        );

        localStorage.removeItem(
          "nanotoxi_refresh"
        );

        setUser(null);

      } finally {

        setLoading(false);
      }
    }

    loadUser();

  }, []);

  async function logout() {

    try {

      await api.logout();

    } catch {}

    localStorage.removeItem(
      "nanotoxi_token"
    );

    localStorage.removeItem(
      "nanotoxi_refresh"
    );

    setUser(null);

    window.location.href =
      "/sign-in";
  }

  return (

    <AuthContext.Provider
      value={{
        user,
        loading,
        isLoggedIn: !!user,
        logout,
      }}
    >

      {children}

    </AuthContext.Provider>
  );
}

export function useAuth() {

  return useContext(
    AuthContext
  );
}