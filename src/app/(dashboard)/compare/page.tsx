"use client";

import { useState } from "react";

import { toast } from "sonner";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { motion } from "framer-motion";

import { comparePrediction } from "@/lib/compare-api";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  Skeleton,
} from "@/components/ui/skeleton";

import {
  EmptyState,
} from "@/components/ui/empty-state";

import {
  Activity,
  ShieldCheck,
  AlertTriangle,
  BrainCircuit,
} from "lucide-react";

export default function ComparePage() {

  const [loading, setLoading] =
    useState(false);

  const [results, setResults] =
    useState<any[]>([]);

  const [formData, setFormData] =
    useState({

      nanoparticle: "",

      npType: "",

      size: "",

      shape: "",

      dosage: "",

      exposure: "",

      surfaceCharge: "",

      coating: "",

      viability: "",

      ph: "",
    });

  async function runComparison() {

    try {

      setLoading(true);

      setResults([]);

      toast.loading(
        "Running AI comparison...",
        {
          id: "compare-loading",
        }
      );

      const payload = {

        nanoparticle_name:
          formData.nanoparticle,

        np_type:
          formData.npType,

        primary_size_nm:
          Number(formData.size),

        hydrodynamic_size_nm:
          Number(formData.size),

        zeta_potential_mv:
          Number(
            formData.surfaceCharge
          ),

        morphology:
          formData.shape,

        cell_type:
          "A549",

        dose_max_ugml:
          Number(formData.dosage),

        dose_min_ugml:
          Math.max(
            Number(formData.dosage) / 10,
            1
          ),

        exposure_time_h:
          Number(formData.exposure),

        ph:
          Number(formData.ph),

        temperature_c: 37,

        is_coated:
          !!formData.coating,

        is_therapeutic:
          false,

        include_shap:
          true,

        include_rag:
          false,
      };

      const response =
        await comparePrediction(
          payload
        );

      console.log(
        "COMPARE RESPONSE",
        response
      );

      const formatted = [

        {
          cell:
            "RF V2 FINAL",

          toxicity:
            Math.round(
              response.rf_v2_final
                ?.confidence * 100
            ),

          verdict:
            response.rf_v2_final
              ?.prediction,
        },

        {
          cell:
            "CLIENTB",

          toxicity:
            Math.round(
              response.clientb
                ?.confidence * 100
            ),

          verdict:
            response.clientb
              ?.prediction,
        },
      ];

      setResults(formatted);

      toast.success(
        "Comparison completed successfully",
        {
          id: "compare-loading",
        }
      );

    } catch (error) {

      console.log(error);

      toast.error(
        "Comparison failed",
        {
          id: "compare-loading",
        }
      );

    } finally {

      setLoading(false);
    }
  }

  const highest =
    results[0];

  const average =
    results.length
      ? Math.round(
          results.reduce(
            (acc, item) =>
              acc +
              item.toxicity,
            0
          ) / results.length
        )
      : 0;

  return (

    <div className="mx-auto max-w-7xl space-y-8 overflow-x-hidden text-white">

      {/* HEADER */}
      <div className="space-y-4">

        <div className="inline-flex items-center gap-3 rounded-full border border-cyan-500/10 bg-cyan-500/10 px-5 py-2 text-cyan-300 backdrop-blur-xl">

          <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee]" />

          Multi Model Analysis

        </div>

        <h1 className="bg-gradient-to-r from-white via-white to-cyan-300 bg-clip-text text-4xl font-black text-transparent md:text-5xl">

          Compare Toxicity

        </h1>

        <p className="max-w-3xl text-base text-white/45 md:text-xl">

          Compare nanoparticle toxicity predictions
          across multiple AI models simultaneously.

        </p>

      </div>

      {/* FORM */}
      <Card className="border border-cyan-500/10 bg-[#081325]/70 backdrop-blur-2xl">

        <CardContent className="grid gap-5 p-4 md:grid-cols-2 md:p-6 xl:p-8">

          <Input
            placeholder="Nanoparticle"
            value={formData.nanoparticle}
            onChange={(e) =>
              setFormData({
                ...formData,
                nanoparticle:
                  e.target.value,
              })
            }
            className="h-14 border-cyan-500/10 bg-[#020817]/80 text-white placeholder:text-white/30"
          />

          <Input
            placeholder="NP Type"
            value={formData.npType}
            onChange={(e) =>
              setFormData({
                ...formData,
                npType:
                  e.target.value,
              })
            }
            className="h-14 border-cyan-500/10 bg-[#020817]/80 text-white placeholder:text-white/30"
          />

          <Input
            placeholder="Size (nm)"
            type="number"
            value={formData.size}
            onChange={(e) =>
              setFormData({
                ...formData,
                size:
                  e.target.value,
              })
            }
            className="h-14 border-cyan-500/10 bg-[#020817]/80 text-white placeholder:text-white/30"
          />

          <Input
            placeholder="Shape"
            value={formData.shape}
            onChange={(e) =>
              setFormData({
                ...formData,
                shape:
                  e.target.value,
              })
            }
            className="h-14 border-cyan-500/10 bg-[#020817]/80 text-white placeholder:text-white/30"
          />

          <Input
            placeholder="Dosage"
            type="number"
            value={formData.dosage}
            onChange={(e) =>
              setFormData({
                ...formData,
                dosage:
                  e.target.value,
              })
            }
            className="h-14 border-cyan-500/10 bg-[#020817]/80 text-white placeholder:text-white/30"
          />

          <Input
            placeholder="Exposure Time"
            type="number"
            value={formData.exposure}
            onChange={(e) =>
              setFormData({
                ...formData,
                exposure:
                  e.target.value,
              })
            }
            className="h-14 border-cyan-500/10 bg-[#020817]/80 text-white placeholder:text-white/30"
          />

          <Input
            placeholder="Surface Charge"
            type="number"
            value={formData.surfaceCharge}
            onChange={(e) =>
              setFormData({
                ...formData,
                surfaceCharge:
                  e.target.value,
              })
            }
            className="h-14 border-cyan-500/10 bg-[#020817]/80 text-white placeholder:text-white/30"
          />

          <Input
            placeholder="Coating"
            value={formData.coating}
            onChange={(e) =>
              setFormData({
                ...formData,
                coating:
                  e.target.value,
              })
            }
            className="h-14 border-cyan-500/10 bg-[#020817]/80 text-white placeholder:text-white/30"
          />

          <Input
            placeholder="Cell Viability"
            type="number"
            value={formData.viability}
            onChange={(e) =>
              setFormData({
                ...formData,
                viability:
                  e.target.value,
              })
            }
            className="h-14 border-cyan-500/10 bg-[#020817]/80 text-white placeholder:text-white/30"
          />

          <Input
            placeholder="pH"
            type="number"
            value={formData.ph}
            onChange={(e) =>
              setFormData({
                ...formData,
                ph:
                  e.target.value,
              })
            }
            className="h-14 border-cyan-500/10 bg-[#020817]/80 text-white placeholder:text-white/30"
          />

          <div className="md:col-span-2">

            <Button
              onClick={
                runComparison
              }
              className="h-14 w-full rounded-2xl bg-cyan-400 text-lg font-bold text-black shadow-[0_0_40px_rgba(34,211,238,0.25)] transition-all duration-300 hover:bg-cyan-300"
              disabled={loading}
            >

              {loading
                ? "Running AI Comparison..."
                : "Compare"}

            </Button>

          </div>

        </CardContent>

      </Card>

      {/* EMPTY */}
      {!loading &&
        results.length === 0 && (

        <EmptyState
          title="No comparison results yet"
          description="Run a model comparison to visualize AI toxicity predictions."
        />

      )}

      {/* LOADING */}
      {loading && (

        <div className="space-y-6">

          <Skeleton className="h-24 w-full rounded-3xl bg-cyan-500/10" />

          <Skeleton className="h-[400px] w-full rounded-3xl bg-cyan-500/10" />

        </div>
      )}

      {/* RESULTS */}
      {!loading &&
        results.length > 0 && (

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="space-y-8"
        >

          {/* MODEL CARDS */}
          <div className="grid gap-6 xl:grid-cols-2">

            {results.map(
              (
                item,
                index
              ) => (

                <Card
                  key={index}
                  className="border border-cyan-500/10 bg-[#081325]/70 backdrop-blur-xl"
                >

                  <CardContent className="space-y-6 p-6">

                    <div className="flex items-center justify-between">

                      <div>

                        <p className="text-white/45">

                          AI Model

                        </p>

                        <h2 className="mt-2 text-3xl font-black text-white">

                          {item.cell}

                        </h2>

                      </div>

                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10">

                        <BrainCircuit className="h-8 w-8 text-cyan-400" />

                      </div>

                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">

                      <div className="rounded-2xl border border-cyan-500/10 bg-[#020817]/70 p-5">

                        <p className="text-sm text-white/45">

                          Toxicity

                        </p>

                        <h3 className="mt-3 text-4xl font-black text-cyan-300">

                          {item.toxicity}%

                        </h3>

                      </div>

                      <div className="rounded-2xl border border-cyan-500/10 bg-[#020817]/70 p-5">

                        <p className="text-sm text-white/45">

                          Prediction

                        </p>

                        <h3
                          className={`mt-3 text-3xl font-black ${
                            item.verdict ===
                            "Toxic"
                              ? "text-red-400"
                              : "text-green-400"
                          }`}
                        >

                          {item.verdict}

                        </h3>

                      </div>

                    </div>

                  </CardContent>

                </Card>
              )
            )}

          </div>

          {/* STATS */}
          <div className="grid gap-6 md:grid-cols-3">

            <Card className="border border-cyan-500/10 bg-[#081325]/70 backdrop-blur-xl">

              <CardContent className="flex items-center justify-between p-6">

                <div>

                  <p className="text-white/45">

                    Highest Confidence

                  </p>

                  <h2 className="mt-3 text-5xl font-black text-red-400">

                    {
                      highest?.toxicity
                    }
                    %

                  </h2>

                  <p className="mt-2 text-white/45">

                    {
                      highest?.verdict
                    }

                  </p>

                </div>

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10">

                  <AlertTriangle className="h-8 w-8 text-red-400" />

                </div>

              </CardContent>

            </Card>

            <Card className="border border-cyan-500/10 bg-[#081325]/70 backdrop-blur-xl">

              <CardContent className="flex items-center justify-between p-6">

                <div>

                  <p className="text-white/45">

                    Average Confidence

                  </p>

                  <h2 className="mt-3 text-5xl font-black text-yellow-400">

                    {average}%

                  </h2>

                </div>

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-500/10">

                  <Activity className="h-8 w-8 text-yellow-400" />

                </div>

              </CardContent>

            </Card>

            <Card className="border border-cyan-500/10 bg-[#081325]/70 backdrop-blur-xl">

              <CardContent className="flex items-center justify-between p-6">

                <div>

                  <p className="text-white/45">

                    Models Compared

                  </p>

                  <h2 className="mt-3 text-5xl font-black text-cyan-400">

                    2

                  </h2>

                </div>

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10">

                  <ShieldCheck className="h-8 w-8 text-cyan-400" />

                </div>

              </CardContent>

            </Card>

          </div>

          {/* CHART */}
          <Card className="overflow-hidden border border-cyan-500/10 bg-[#081325]/70 backdrop-blur-2xl">

            <CardContent className="p-4 md:p-6 xl:p-8">

              <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                <div>

                  <h2 className="text-3xl font-black text-white">

                    Model Comparison

                  </h2>

                  <p className="mt-2 text-white/45">

                    Confidence comparison across AI models

                  </p>

                </div>

                <div className="rounded-full border border-cyan-500/10 bg-cyan-500/10 px-5 py-2 text-cyan-300">

                  Live Analytics

                </div>

              </div>

              <div className="h-[420px] w-full">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <AreaChart
                    data={results}
                    margin={{
                      top: 10,
                      right: 10,
                      left: -20,
                      bottom: 0,
                    }}
                  >

                    <defs>

                      <linearGradient
                        id="toxicityGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >

                        <stop
                          offset="0%"
                          stopColor="#22d3ee"
                          stopOpacity={0.5}
                        />

                        <stop
                          offset="100%"
                          stopColor="#22d3ee"
                          stopOpacity={0}
                        />

                      </linearGradient>

                    </defs>

                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(255,255,255,0.04)"
                    />

                    <XAxis
                      dataKey="cell"
                      stroke="#64748b"
                      tickLine={false}
                      axisLine={false}
                    />

                    <YAxis
                      stroke="#64748b"
                      tickLine={false}
                      axisLine={false}
                    />

                    <Tooltip
                      contentStyle={{
                        background: "#081325",
                        border:
                          "1px solid rgba(34,211,238,0.08)",
                        borderRadius: "16px",
                        color: "#fff",
                      }}
                    />

                    <Area
                      type="monotone"
                      dataKey="toxicity"
                      stroke="#22d3ee"
                      strokeWidth={3}
                      fill="url(#toxicityGradient)"
                    />

                  </AreaChart>

                </ResponsiveContainer>

              </div>

            </CardContent>

          </Card>

          {/* AI SUMMARY */}
          <Card className="border border-cyan-500/10 bg-[#081325]/70 backdrop-blur-xl">

            <CardContent className="p-6 md:p-8">

              <h2 className="text-3xl font-black text-white">

                AI Interpretation

              </h2>

              <p className="mt-6 leading-8 text-white/45">

                The model comparison demonstrates
                prediction similarity and confidence
                consistency between multiple AI
                inference systems. This enables
                researchers to validate toxicity
                analysis reliability before
                biological experimentation.

              </p>

            </CardContent>

          </Card>

        </motion.div>
      )}

    </div>
  );
}