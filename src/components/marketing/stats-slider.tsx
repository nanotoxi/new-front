"use client";

const stats = [
  "97.8% Prediction Accuracy",
  "14,791+ Training Samples",
  "<0.15s Prediction Speed",
  "64% Fewer False Positives",
  "3-Stage ML Pipeline",
  "4 Models Ensemble",
];

export default function StatsSlider() {
  return (
    <div className="relative mt-24 overflow-hidden border-y border-cyan-500/10 bg-[#040b18] py-5">
      <div className="animate-marquee flex min-w-max items-center gap-20">
        {[...stats, ...stats].map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-6 whitespace-nowrap"
          >
            <span className="text-3xl text-cyan-400">•</span>

            <span className="text-[28px] font-bold text-cyan-400">
              {item.split(" ")[0]}
            </span>

            <span className="text-lg text-white/60">
              {item.replace(item.split(" ")[0], "")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}