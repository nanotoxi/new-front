"use client";

import { useEffect, useState } from "react";

import regimeData from "@/data/regime-comparison.json";
import shapData from "@/data/shap-data.json";
import confusionData from "@/data/confusion-matrix.json";

import {
  BrainCircuit,
  ShieldCheck,
  Zap,
  Cpu,
  Activity,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

import {
  useTheme,
} from "@/context/theme-context";

import {
  getModels,
} from "@/lib/admin-api";

interface Model {
  id?: string;

  name?: string;

  model_name?: string;

  version?: string;

  status?: string;

  accuracy?: number;

  latency?: number;

  inference_rate?: number;

  description?: string;

  algorithm?: string;

  loaded?: boolean;

  threshold?: number;

  n_features?: number;

  top_features?: string[];

  required_inputs?: string[];

  metrics?: {
    accuracy?: number;
    precision?: number;
    recall?: number;
    f1_score?: number;
    roc_auc?: number;
  };

  training?: {
    train_samples?: number;
    test_samples?: number;
    training_dataset?: string;
  };
}

export default function ModelPage() {

  const {
    theme,
  } = useTheme();

  const dark =
    theme === "dark";

  const [models, setModels] =
    useState<Model[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchModels();

  }, []);

  const fetchModels =
    async () => {

      try {

        const data =
          await getModels();

        console.log(
          "MODELS:",
          data
        );

        const modelList =
          data?.models ||
          data?.data ||
          data ||
          [];

        setModels(modelList);

      } catch (error) {

        console.error(
          "MODELS ERROR:",
          error
        );

      } finally {

        setLoading(false);
      }
    };

  const totalModels =
    models.length;

  const avgAccuracy =
    totalModels > 0
      ? (
          models.reduce(
            (acc, model) =>
              acc +
              Number(
                model.metrics?.accuracy
                  ? model.metrics.accuracy * 100
                  : model.accuracy || 0
              ),
            0
          ) / totalModels
        ).toFixed(1)
      : "0";

  const avgLatency =
    totalModels > 0
      ? (
          models.reduce(
            (acc, model) =>
              acc +
              Number(
                model.latency || 0
              ),
            0
          ) / totalModels
        ).toFixed(0)
      : "0";

  const totalInference =
    models.reduce(
      (acc, model) =>
        acc +
        Number(
          model.inference_rate || 0
        ),
      0
    );

  const chartData =
    models.length > 0
      ? models.map(
          (
            model,
            index
          ) => ({
            name:
              model.name ||
              model.model_name ||
              `Model ${index + 1}`,

            accuracy:
              Number(
                (
                  model.metrics?.accuracy ||
                  0
                ) * 100
              ),

            precision:
              Number(
                (
                  model.metrics?.precision ||
                  0
                ) * 100
              ),

            recall:
              Number(
                (
                  model.metrics?.recall ||
                  0
                ) * 100
              ),

            f1:
              Number(
                (
                  model.metrics?.f1_score ||
                  0
                ) * 100
              ),
          })
        )
      : [];

  return (

    <div className="space-y-8 overflow-x-hidden">

      {/* HERO */}

      <div
        className={`rounded-3xl border p-6 md:p-8 shadow-sm ${
          dark
            ? "border-white/10 bg-[#0F172A]"
            : "border-slate-200 bg-white"
        }`}
      >

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">

          <div>

            <div className="mb-4 inline-flex rounded-full bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-700">

              AI Models Operational

            </div>

            <h1
              className={`text-4xl md:text-5xl font-black tracking-tight ${
                dark
                  ? "text-white"
                  : "text-slate-900"
              }`}
            >

              Model Intelligence

            </h1>

            <p
              className={`mt-4 max-w-3xl text-lg ${
                dark
                  ? "text-slate-400"
                  : "text-slate-500"
              }`}
            >

              Evaluate AI model performance,
              feature attribution,
              classification accuracy,
              and inference reliability
              across toxicity prediction systems.

            </p>

          </div>

          <div
            className={`hidden rounded-3xl p-6 lg:flex ${
              dark
                ? "bg-violet-500/10"
                : "bg-violet-50"
            }`}
          >

            <BrainCircuit className="h-20 w-20 text-violet-500" />

          </div>

        </div>

      </div>

      {/* METRIC CARDS */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

        {/* ACCURACY */}

        <div
          className={`rounded-3xl border p-6 shadow-sm ${
            dark
              ? "border-white/10 bg-[#0F172A]"
              : "border-slate-200 bg-white"
          }`}
        >

          <div className="flex items-center justify-between">

            <div
              className={`rounded-2xl p-4 ${
                dark
                  ? "bg-cyan-500/10"
                  : "bg-cyan-50"
              }`}
            >

              <ShieldCheck className="h-6 w-6 text-cyan-500" />

            </div>

            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">

              Stable

            </span>

          </div>

          <p
            className={`mt-6 text-sm ${
              dark
                ? "text-slate-400"
                : "text-slate-500"
            }`}
          >

            Model Accuracy

          </p>

          <h2
            className={`mt-2 text-4xl font-black ${
              dark
                ? "text-white"
                : "text-slate-900"
            }`}
          >

            {avgAccuracy}%

          </h2>

        </div>

        {/* MODELS */}

        <div
          className={`rounded-3xl border p-6 shadow-sm ${
            dark
              ? "border-white/10 bg-[#0F172A]"
              : "border-slate-200 bg-white"
          }`}
        >

          <div className="flex items-center justify-between">

            <div
              className={`rounded-2xl p-4 ${
                dark
                  ? "bg-violet-500/10"
                  : "bg-violet-50"
              }`}
            >

              <Cpu className="h-6 w-6 text-violet-500" />

            </div>

            <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">

              Active

            </span>

          </div>

          <p
            className={`mt-6 text-sm ${
              dark
                ? "text-slate-400"
                : "text-slate-500"
            }`}
          >

            AI Models

          </p>

          <h2
            className={`mt-2 text-4xl font-black ${
              dark
                ? "text-white"
                : "text-slate-900"
            }`}
          >

            {totalModels}

          </h2>

        </div>

        {/* LATENCY */}

        <div
          className={`rounded-3xl border p-6 shadow-sm ${
            dark
              ? "border-white/10 bg-[#0F172A]"
              : "border-slate-200 bg-white"
          }`}
        >

          <div className="flex items-center justify-between">

            <div
              className={`rounded-2xl p-4 ${
                dark
                  ? "bg-yellow-500/10"
                  : "bg-yellow-50"
              }`}
            >

              <Zap className="h-6 w-6 text-yellow-500" />

            </div>

            <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">

              Fast

            </span>

          </div>

          <p
            className={`mt-6 text-sm ${
              dark
                ? "text-slate-400"
                : "text-slate-500"
            }`}
          >

            Avg Latency

          </p>

          <h2
            className={`mt-2 text-4xl font-black ${
              dark
                ? "text-white"
                : "text-slate-900"
            }`}
          >

            {avgLatency}ms

          </h2>

        </div>

        {/* INFERENCE */}

        <div
          className={`rounded-3xl border p-6 shadow-sm ${
            dark
              ? "border-white/10 bg-[#0F172A]"
              : "border-slate-200 bg-white"
          }`}
        >

          <div className="flex items-center justify-between">

            <div
              className={`rounded-2xl p-4 ${
                dark
                  ? "bg-emerald-500/10"
                  : "bg-emerald-50"
              }`}
            >

              <Activity className="h-6 w-6 text-emerald-500" />

            </div>

            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">

              Online

            </span>

          </div>

          <p
            className={`mt-6 text-sm ${
              dark
                ? "text-slate-400"
                : "text-slate-500"
            }`}
          >

            Inference Rate

          </p>

          <h2
            className={`mt-2 text-4xl font-black ${
              dark
                ? "text-white"
                : "text-slate-900"
            }`}
          >

            {totalInference}

          </h2>

        </div>

      </div>

      {/* MODEL PERFORMANCE TREND */}

      <div
        className={`rounded-3xl border p-6 md:p-8 shadow-sm ${
          dark
            ? "border-white/10 bg-[#0F172A]"
            : "border-slate-200 bg-white"
        }`}
      >

        <div className="mb-8 flex items-center justify-between">

          <div>

            <h2 className="text-3xl font-black">

              Model Performance Trend

            </h2>

            <p
              className={`mt-2 text-lg ${
                dark
                  ? "text-slate-400"
                  : "text-slate-500"
              }`}
            >

              Weekly AI performance analytics

            </p>

          </div>

          <span className="rounded-full bg-cyan-40 px-3 py-3 text-lg font-semibold text-cyan-700">

            Live Monitoring

          </span>

        </div>

        <div
  className={`h-[450px] rounded-[2rem] p-6 ${
    dark
      ? "bg-[#020817]"
      : "bg-[#F8FAFC]"
  }`}
>

  <ResponsiveContainer
    width="100%"
    height="100%"
  >

    <AreaChart
      data={chartData}
    >

      {/* GRADIENT */}

      <defs>

  <linearGradient
    id="modelGradient"
    x1="0"
    y1="0"
    x2="0"
    y2="1"
  >

    <stop
      offset="0%"
      stopColor="#22D3EE"
      stopOpacity={0.9}
    />

    <stop
      offset="45%"
      stopColor="#1FB6D9"
      stopOpacity={0.45}
    />

    <stop
      offset="100%"
      stopColor={
        dark
          ? "#020817"
          : "#F8FAFC"
      }
      stopOpacity={0.05}
    />

  </linearGradient>

</defs>

      <CartesianGrid
  strokeDasharray="3 3"
  stroke={
    dark
      ? "#1E293B"
      : "#CBD5E1"
  }
/>

      <XAxis
        dataKey="name"
        stroke={
          dark
            ? "#64748B"
            : "#94A3B8"
        }
      />

      <YAxis
        stroke={
          dark
            ? "#64748B"
            : "#94A3B8"
        }
        domain={[0, 100]}
      />

      <Tooltip
        contentStyle={{
          backgroundColor: "#0F172A",
          border: "1px solid #1E293B",
          borderRadius: "14px",
          color: "#fff",
        }}
      />

      <Area
        type="monotone"
        dataKey="accuracy"
        stroke="#22D3EE"
        strokeWidth={3}
        fill="url(#modelGradient)"
        fillOpacity={1}
        activeDot={{
          r: 6,
          stroke: "#FFFFFF",
          strokeWidth: 2,
          fill: "#22D3EE",
        }}
      />

    </AreaChart>

  </ResponsiveContainer>

</div>
      </div>

      {/* REGIME + MODEL CARDS */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        {/* TABLE */}

        <div
          className={`xl:col-span-2 rounded-3xl border p-6 md:p-8 shadow-sm ${
            dark
              ? "border-white/10 bg-[#0F172A]"
              : "border-slate-200 bg-white"
          }`}
        >

          <div className="mb-8 flex items-center justify-between">

            <div>

              <h2 className="text-3xl font-black">

                Regime Comparison

              </h2>

              <p
                className={`mt-2 text-lg ${
                  dark
                    ? "text-slate-400"
                    : "text-slate-500"
                }`}
              >

                Classification performance across regimes

              </p>

            </div>

            <span className="rounded-full bg-violet-50 px-5 py-3 text-lg font-semibold text-violet-700">

              AI Evaluation

            </span>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

  <tr
    className={`border-b ${
      dark
        ? "border-white/10"
        : "border-slate-100"
    }`}
  >

    <th className="py-4 pr-16 text-left text-lg whitespace-nowrap">

      Regime

    </th>

    <th className="py-4 px-8 text-center text-lg whitespace-nowrap">

      Accuracy

    </th>

    <th className="py-4 px-8 text-center text-lg whitespace-nowrap">

      Precision

    </th>

    <th className="py-4 px-8 text-center text-lg whitespace-nowrap">

      Recall

    </th>

    <th className="py-4 px-8 text-center text-lg whitespace-nowrap">

      F1

    </th>

  </tr>

</thead>

              <tbody>

                {chartData.map(
                  (
                    regime,
                    index
                  ) => (

                    <tr
  key={index}
  className={`border-b ${
    dark
      ? "border-white/5"
      : "border-slate-100"
  }`}
>

  <td className="py-8 pr-16 text-lg font-bold whitespace-nowrap">

    {regime.name}

  </td>

  <td className="py-8 px-8 text-center text-lg whitespace-nowrap">

    {regime.accuracy.toFixed(1)}%

  </td>

  <td className="py-8 px-8 text-center text-lg whitespace-nowrap">

    {regime.precision.toFixed(1)}%

  </td>

  <td className="py-8 px-8 text-center text-lg whitespace-nowrap">

    {regime.recall.toFixed(1)}%

  </td>

  <td className="py-8 px-8 text-center whitespace-nowrap">

    <span className="rounded-full bg-cyan-100 px-4 py-2 text-sm font-bold text-cyan-700">

      {regime.f1.toFixed(1)}%

    </span>

  </td>

</tr>
                  )
                )}

              </tbody>

            </table>

          </div>

        </div>

        {/* MODEL CARDS */}

        <div className="space-y-6">

          {models.map(
            (
              model,
              index
            ) => (

              <div
                key={index}
                className={`rounded-3xl border p-6 shadow-sm ${
                  dark
                    ? "border-white/10 bg-[#0F172A]"
                    : "border-slate-200 bg-white"
                }`}
              >

                <div className="flex items-center justify-between">

                  <h3 className="text-2xl font-black">

                    {model.name}

                  </h3>

                  <span
                    className={`rounded-full px-4 py-2 text-sm font-bold ${
                      model.loaded
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >

                    {model.loaded
                      ? "Stable"
                      : "Offline"}

                  </span>

                </div>

                <div className="mt-8 space-y-6">

                  <div>

                    <div className="mb-2 flex items-center justify-between">

                      <span className="text-lg">

                        Accuracy

                      </span>

                      <span className="text-2xl font-black">

                        {(
                          (
                            model.metrics
                              ?.accuracy || 0
                          ) * 100
                        ).toFixed(1)}
                        %

                      </span>

                    </div>

                    <div className="h-3 rounded-full bg-white/10">

                      <div
                        className="h-3 rounded-full bg-cyan-400"
                        style={{
                          width: `${(
                            (
                              model.metrics
                                ?.accuracy || 0
                            ) * 100
                          )}%`,
                        }}
                      />

                    </div>

                  </div>

                  <div>

                    <div className="mb-2 flex items-center justify-between">

                      <span className="text-lg">

                        Precision

                      </span>

                      <span className="text-2xl font-black">

                        {(
                          (
                            model.metrics
                              ?.precision || 0
                          ) * 100
                        ).toFixed(1)}
                        %

                      </span>

                    </div>

                    <div className="h-3 rounded-full bg-white/10">

                      <div
                        className="h-3 rounded-full bg-violet-400"
                        style={{
                          width: `${(
                            (
                              model.metrics
                                ?.precision || 0
                            ) * 100
                          )}%`,
                        }}
                      />

                    </div>

                  </div>

                </div>

              </div>
            )
          )}

        </div>

      </div>

    </div>
  );
}