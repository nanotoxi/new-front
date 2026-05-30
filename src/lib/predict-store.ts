import { create } from "zustand";

export type PredictionResult = {
  id: string;
  verdict: "Safe" | "Toxic";
  confidence: number;
  timestamp: string;
  input: Record<string, unknown>;
};

type PredictStore = {
  history: PredictionResult[];

  addResult: (
    result: PredictionResult
  ) => void;
};

export const usePredictStore =
  create<PredictStore>((set) => ({
    history: [],

    addResult: (result) =>
      set((state) => ({
        history: [
          result,
          ...state.history,
        ],
      })),
  }));