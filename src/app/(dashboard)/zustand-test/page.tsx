"use client";

import {
  useSidebar,
  useHistory,
} from "@/lib/store";

import { Button } from "@/components/ui/button";

export default function ZustandTestPage() {
  const {
    sidebarCollapsed,
    toggleSidebar,
  } = useSidebar();

  const {
    predictionHistory,
    addPrediction,
    clearHistory,
  } = useHistory();

  return (
    <div className="p-10 space-y-6">
      <h1 className="text-4xl font-bold">
        Zustand Store Test
      </h1>

      <div className="space-y-3">
        <p>
          Sidebar State:{" "}
          {sidebarCollapsed
            ? "Collapsed"
            : "Expanded"}
        </p>

        <Button
          onClick={toggleSidebar}
        >
          Toggle Sidebar
        </Button>
      </div>

      <div className="space-y-3">
        <Button
          onClick={() =>
            addPrediction({
              id: crypto.randomUUID(),

              result:
                "Prediction Example",

              createdAt:
                new Date().toISOString(),
            })
          }
        >
          Add Prediction
        </Button>

        <Button
          variant="destructive"
          onClick={clearHistory}
        >
          Clear History
        </Button>

        <div className="space-y-2">
          {predictionHistory.map(
            (item) => (
              <div
                key={item.id}
                className="surface border border-theme rounded-xl p-4"
              >
                <p>
                  {item.result}
                </p>

                <p className="text-sm text-muted">
                  {
                    item.createdAt
                  }
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
