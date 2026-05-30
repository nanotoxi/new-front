import { create } from "zustand";

import { persist } from "zustand/middleware";

type Prediction = {
  id: string;

  result: string;

  createdAt: string;
};

type User = {
  email: string;

  role: string;
};

type Theme =
  | "light"
  | "dark";

type AppState = {
  // Sidebar
  sidebarCollapsed: boolean;

  toggleSidebar: () => void;

  // Theme
  theme: Theme;

  setTheme: (
    theme: Theme
  ) => void;

  // Prediction History
  predictionHistory: Prediction[];

  addPrediction: (
    prediction: Prediction
  ) => void;

  clearHistory: () => void;

  // User
  user: User | null;

  setUser: (
    user: User | null
  ) => void;
};

const getSystemTheme = (): Theme => {
  if (
    typeof window !==
    "undefined"
  ) {
    return window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches
      ? "dark"
      : "light";
  }

  return "light";
};

export const useAppStore =
  create<AppState>()(
    persist(
      (set) => ({
        // Sidebar
        sidebarCollapsed: false,

        toggleSidebar: () =>
          set((state) => ({
            sidebarCollapsed:
              !state.sidebarCollapsed,
          })),

        // Theme
        theme: getSystemTheme(),

        setTheme: (theme) =>
          set({ theme }),

        // Prediction History
        predictionHistory: [],

        addPrediction: (
          prediction
        ) =>
          set((state) => ({
            predictionHistory: [
              prediction,
              ...state.predictionHistory,
            ],
          })),

        clearHistory: () =>
          set({
            predictionHistory: [],
          }),

        // User
        user: null,

        setUser: (user) =>
          set({ user }),
      }),

      {
        name: "titan-storage",
      }
    )
  );

// Sidebar Hook
export const useSidebar = () => {
  const sidebarCollapsed =
    useAppStore(
      (state) =>
        state.sidebarCollapsed
    );

  const toggleSidebar =
    useAppStore(
      (state) =>
        state.toggleSidebar
    );

  return {
    sidebarCollapsed,
    toggleSidebar,
  };
};

// Theme Hook
export const useThemeStore =
  () => {
    const theme = useAppStore(
      (state) => state.theme
    );

    const setTheme =
      useAppStore(
        (state) =>
          state.setTheme
      );

    return {
      theme,
      setTheme,
    };
  };

// History Hook
export const useHistory = () => {
  const predictionHistory =
    useAppStore(
      (state) =>
        state.predictionHistory
    );

  const addPrediction =
    useAppStore(
      (state) =>
        state.addPrediction
    );

  const clearHistory =
    useAppStore(
      (state) =>
        state.clearHistory
    );

    return {
      predictionHistory,
      addPrediction,
      clearHistory,
    };
};

// User Hook
export const useUser = () => {
  const user = useAppStore(
    (state) => state.user
  );

  const setUser = useAppStore(
    (state) => state.setUser
  );

  return {
    user,
    setUser,
  };
};