import { create } from "zustand";

type Prediction = {
  verdict: string;
  score: number;
  nanoparticle: string;
};

type HistoryStore = {
  history: Prediction[];

  addHistory: (
    item: Prediction
  ) => void;
};

export const useHistoryStore =
  create<HistoryStore>(
    (set) => ({
      history: [],

      addHistory: (
        item
      ) =>

        set((state) => ({
          history: [
            item,
            ...state.history,
          ],
        })),
    })
  );