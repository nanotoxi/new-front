"use client";

import { motion } from "framer-motion";

type Props = {
  verdict: "Safe" | "Toxic";
  confidence: number;
};

export function ResultCard({
  verdict,
  confidence,
}: Props) {

  const isSafe =
    verdict === "Safe";

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.4,
      }}
      className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-8"
    >

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-muted-foreground">

            Prediction Verdict

          </p>

          <h2
            className={`mt-2 text-4xl font-black ${
              isSafe
                ? "text-green-400"
                : "text-red-400"
            }`}
          >

            {verdict}

          </h2>

        </div>

        <div className="text-right">

          <p className="text-sm text-muted-foreground">

            Confidence

          </p>

          <p className="mt-2 text-3xl font-bold">

            {confidence}%

          </p>

        </div>

      </div>

    </motion.div>
  );
}