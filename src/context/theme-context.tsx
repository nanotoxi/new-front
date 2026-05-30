"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type Theme =
  | "light"
  | "dark";

type ThemeContextType = {
  theme: Theme;

  toggleTheme: () => void;
};

const ThemeContext =
  createContext<ThemeContextType>({
    theme: "dark",

    toggleTheme: () => {},
  });

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [theme, setTheme] =
    useState<Theme>("dark");

  useEffect(() => {

    const saved =
      localStorage.getItem(
        "admin-theme"
      ) as Theme;

    if (saved) {
      setTheme(saved);
    }

  }, []);

  useEffect(() => {

    document.documentElement.classList.remove(
      "light",
      "dark"
    );

    document.documentElement.classList.add(
      theme
    );

    localStorage.setItem(
      "admin-theme",
      theme
    );

  }, [theme]);

  const toggleTheme =
    () => {

      setTheme(
        theme === "dark"
          ? "light"
          : "dark"
      );

    };

  return (

    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >

      {children}

    </ThemeContext.Provider>
  );
}

export function useTheme() {

  return useContext(
    ThemeContext
  );
}