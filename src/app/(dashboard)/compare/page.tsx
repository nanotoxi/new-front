"use client";

import { useState } from "react";

import { toast } from "sonner";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";

import { motion } from "framer-motion";

import { api } from "@/lib/api";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  BrainCircuit,
  GitCompare,
} from "lucide-react";

type NPForm = {
  label: string;
  nanoparticle: string;
  npType: string;
  size: string;
  dosage: string;
  exposure: string;
  surfaceCharge: string;
  cellType: string;
  ph: string;
  morphology: string;
};

type ResultItem = {
  label: string;
  npType: string;
  toxicity: number;
  verdict: string;
  risk: string;
};

const emptyForm = (label: string): NPForm => ({
  label,
  nanoparticle: "",
  npType: "",
  size: "",
  dosage: "",
  exposure: "",
  surfaceCharge: "",
  cellType: "HeLa",
  ph: "7.4",
  morphology: "Spherical",
});

export default function ComparePage() {

  const [loading, setLoading] =
    useState(false);

  const [results, setResults] =
    useState<ResultItem[]>([]);

  const [npA, setNpA] =
    useState<NPForm>(emptyForm("NP A"));

  const [npB, setNpB] =
    useState<NPForm>(emptyForm("NP B"));

  function buildPayload(form: NPForm) {
    return {
      nanoparticle_name: form.nanoparticle || form.npType || "Unknown",
      np_type: form.npType,
      primary_size_nm: Number(form.size),
      hydrodynamic_size_nm: Number(form.size),
      zeta_potential_mv: Number(form.surfaceCharge),
      morphology: form.morphology,
      cell_type: form.cellType,
      dose_max_ugml: Number(form.dosage),
      dose_min_ugml: Math.max(Number(form.dosage) / 10, 1),
      exposure_time_h: Number(form.exposure),
      ph: Number(form.ph),
      temperature_c: 37,
      is_coated: false,
      is_therapeutic: false,
      include_shap: false,
      include_rag: false,
    };
  }

  async function runComparison() {

    if (!npA.npType || !npA.size || !npA.dosage || !npA.exposure ||
        !npB.npType || !npB.size || !npB.dosage || !npB.exposure) {
      toast.error("Fill in NP Type, Size, Dosage and Exposure for both NPs");
      return;
    }

    try {

      setLoading(true);
      setResults([]);

      toast.loading("Running RF v16 comparison...", { id: "compare-loading" });

      const [resA, resB] = await Promise.all([
        api.predict(buildPayload(npA)),
        api.predict(buildPayload(npB)),
      ]);

      setResults([
        {
          label: npA.label,
          npType: npA.npType,
          toxicity: Math.round(resA.confidence * 100),
          verdict: resA.toxicity_label,
          risk: resA.risk_level || (resA.confidence > 0.8 ? "High" : resA.confidence > 0.5 ? "Moderate" : "Low"),
        },
        {
          label: npB.label,
          npType: npB.npType,
          toxicity: Math.round(resB.confidence * 100),
          verdict: resB.toxicity_label,
          risk: resB.risk_level || (resB.confidence > 0.8 ? "High" : resB.confidence > 0.5 ? "Moderate" : "Low"),
        },
      ]);

      toast.success("Comparison complete", { id: "compare-loading" });

    } catch (error: any) {

      console.error("Compare error:", error?.response?.data || error);
      toast.error(error?.response?.data?.detail || "Comparison failed", { id: "compare-loading" });

    } finally {

      setLoading(false);
    }
  }

  const agreement =
    results.length === 2 &&
    results[0].verdict === results[1].verdict;

  const chartData = results.map((r) => ({
    name: `${r.label} (${r.npType})`,
    toxicity: r.toxicity,
  }));

  return (

    <div className="mx-auto max-w-7xl space-y-8 overflow-x-hidden text-white">

      {/* HEADER */}
      <div className="space-y-4">

        <div className="inline-flex items-center gap-3 rounded-full border border-cyan-500/10 bg-cyan-500/10 px-5 py-2 text-cyan-300 backdrop-blur-xl">

          <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee]" />

          RF v16 — Side-by-Side Analysis

        </div>

        <h1 className="bg-gradient-to-r from-white via-white to-cyan-300 bg-clip-text text-4xl font-black text-transparent md:text-5xl">

          Compare Nanoparticles

        </h1>

        <p className="max-w-3xl text-base text-white/45 md:text-xl">

          Run two nanoparticle formulations through RF v16 simultaneously
          and compare their toxicity predictions side-by-side.

        </p>

      </div>

      {/* DUAL FORM */}
      <div className="grid gap-6 xl:grid-cols-2">

        {([
          { form: npA, setForm: setNpA, accent: "cyan" },
          { form: npB, setForm: setNpB, accent: "violet" },
        ] as const).map(({ form, setForm, accent }) => (

          <Card
            key={form.label}
            className={`border ${
              accent === "cyan"
                ? "border-cyan-500/20"
                : "border-violet-500/20"
            } bg-[#081325]/70 backdrop-blur-2xl`}
          >

            <CardContent className="space-y-4 p-6">

              <div className="flex items-center gap-3">

                <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${
                  accent === "cyan" ? "bg-cyan-500/10" : "bg-violet-500/10"
                }`}>

                  <BrainCircuit className={`h-5 w-5 ${
                    accent === "cyan" ? "text-cyan-400" : "text-violet-400"
                  }`} />

                </div>

                <h3 className="text-xl font-black text-white">

                  {form.label}

                </h3>

              </div>

              <div className="grid gap-3 sm:grid-cols-2">

                <Input
                  placeholder="Nanoparticle Name"
                  value={form.nanoparticle}
                  onChange={(e) => setForm({ ...form, nanoparticle: e.target.value })}
                  className="h-11 border-cyan-500/10 bg-[#020817]/80 text-white placeholder:text-white/30"
                />

                <Input
                  placeholder="NP Type (e.g. ZnO, Au)"
                  value={form.npType}
                  onChange={(e) => setForm({ ...form, npType: e.target.value })}
                  className="h-11 border-cyan-500/10 bg-[#020817]/80 text-white placeholder:text-white/30"
                />

                <Input
                  placeholder="Size (nm)"
                  type="number"
                  value={form.size}
                  onChange={(e) => setForm({ ...form, size: e.target.value })}
                  className="h-11 border-cyan-500/10 bg-[#020817]/80 text-white placeholder:text-white/30"
                />

                <Input
                  placeholder="Dosage (µg/mL)"
                  type="number"
                  value={form.dosage}
                  onChange={(e) => setForm({ ...form, dosage: e.target.value })}
                  className="h-11 border-cyan-500/10 bg-[#020817]/80 text-white placeholder:text-white/30"
                />

                <Input
                  placeholder="Exposure Time (h)"
                  type="number"
                  value={form.exposure}
                  onChange={(e) => setForm({ ...form, exposure: e.target.value })}
                  className="h-11 border-cyan-500/10 bg-[#020817]/80 text-white placeholder:text-white/30"
                />

                <Input
                  placeholder="Surface Charge (mV)"
                  type="number"
                  value={form.surfaceCharge}
                  onChange={(e) => setForm({ ...form, surfaceCharge: e.target.value })}
                  className="h-11 border-cyan-500/10 bg-[#020817]/80 text-white placeholder:text-white/30"
                />

                <Select
                  value={form.cellType}
                  onValueChange={(v) => setForm({ ...form, cellType: v })}
                >

                  <SelectTrigger className="h-11 border-cyan-500/10 bg-[#020817]/80 text-white">
                    <SelectValue placeholder="Cell Line" />
                  </SelectTrigger>

                  <SelectContent>
                    {["HeLa","A549","HepG2","MCF-7","BEAS-2B","HT-29","L929","Caco-2","MDA-MB-231","RAW264.7","Other"].map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>

                </Select>

                <Input
                  placeholder="pH"
                  type="number"
                  value={form.ph}
                  onChange={(e) => setForm({ ...form, ph: e.target.value })}
                  className="h-11 border-cyan-500/10 bg-[#020817]/80 text-white placeholder:text-white/30"
                />

              </div>

            </CardContent>

          </Card>
        ))}

      </div>

      {/* COMPARE BUTTON */}
      <Button
        onClick={runComparison}
        disabled={loading}
        className="h-14 w-full rounded-2xl bg-cyan-400 text-lg font-bold text-black shadow-[0_0_40px_rgba(34,211,238,0.25)] transition-all duration-300 hover:bg-cyan-300"
      >

        <GitCompare className="mr-3 h-5 w-5" />

        {loading ? "Running RF v16 Comparison..." : "Compare Both NPs via RF v16"}

      </Button>

      {/* EMPTY */}
      {!loading && results.length === 0 && (

        <EmptyState
          title="No comparison results yet"
          description="Fill in both NP forms and click Compare to run RF v16 side-by-side analysis."
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
      {!loading && results.length === 2 && (

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >

          {/* VERDICT CARDS */}
          <div className="grid gap-6 xl:grid-cols-2">

            {results.map((item, index) => (

              <Card
                key={index}
                className={`border ${
                  item.verdict === "Toxic"
                    ? "border-red-500/20 bg-red-500/5"
                    : "border-green-500/20 bg-green-500/5"
                } backdrop-blur-xl`}
              >

                <CardContent className="space-y-6 p-6">

                  <div className="flex items-center justify-between">

                    <div>

                      <p className="text-sm text-white/45">RF v16 — {item.label}</p>

                      <h2 className="mt-1 text-2xl font-black text-white">

                        {item.npType}

                      </h2>

                    </div>

                    <div className={`inline-flex items-center rounded-full px-5 py-2 text-base font-black ${
                      item.verdict === "Toxic"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-green-500/20 text-green-400"
                    }`}>

                      {item.verdict}

                    </div>

                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">

                    <div className="rounded-2xl border border-cyan-500/10 bg-[#020817]/70 p-5">

                      <p className="text-sm text-white/45">Confidence</p>

                      <h3 className="mt-3 text-4xl font-black text-cyan-300">

                        {item.toxicity}%

                      </h3>

                    </div>

                    <div className="rounded-2xl border border-cyan-500/10 bg-[#020817]/70 p-5">

                      <p className="text-sm text-white/45">Risk Level</p>

                      <h3 className={`mt-3 text-3xl font-black ${
                        item.risk === "High" ? "text-red-400"
                          : item.risk === "Moderate" ? "text-yellow-400"
                          : "text-green-400"
                      }`}>

                        {item.risk}

                      </h3>

                    </div>

                  </div>

                  {/* Confidence bar */}
                  <div className="h-3 overflow-hidden rounded-full bg-white/10">

                    <div
                      className={`h-full rounded-full ${
                        item.verdict === "Toxic"
                          ? "bg-gradient-to-r from-red-500 to-orange-400"
                          : "bg-gradient-to-r from-green-500 to-cyan-400"
                      }`}
                      style={{ width: `${item.toxicity}%` }}
                    />

                  </div>

                </CardContent>

              </Card>

            ))}

          </div>

          {/* SUMMARY STATS */}
          <div className="grid gap-6 md:grid-cols-3">

            <Card className="border border-cyan-500/10 bg-[#081325]/70 backdrop-blur-xl">

              <CardContent className="flex items-center justify-between p-6">

                <div>

                  <p className="text-white/45">Model</p>

                  <h2 className="mt-3 text-3xl font-black text-cyan-400">RF v16</h2>

                  <p className="mt-1 text-sm text-white/30">ROC-AUC 0.9321</p>

                </div>

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10">

                  <BrainCircuit className="h-8 w-8 text-cyan-400" />

                </div>

              </CardContent>

            </Card>

            <Card className="border border-cyan-500/10 bg-[#081325]/70 backdrop-blur-xl">

              <CardContent className="flex items-center justify-between p-6">

                <div>

                  <p className="text-white/45">Agreement</p>

                  <h2 className={`mt-3 text-3xl font-black ${agreement ? "text-green-400" : "text-yellow-400"}`}>

                    {agreement ? "Matched" : "Differs"}

                  </h2>

                  <p className="mt-1 text-sm text-white/30">

                    {agreement
                      ? `Both predict ${results[0].verdict}`
                      : `${results[0].verdict} vs ${results[1].verdict}`}

                  </p>

                </div>

                <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${
                  agreement ? "bg-green-500/10" : "bg-yellow-500/10"
                }`}>

                  <Activity className={`h-8 w-8 ${agreement ? "text-green-400" : "text-yellow-400"}`} />

                </div>

              </CardContent>

            </Card>

            <Card className="border border-cyan-500/10 bg-[#081325]/70 backdrop-blur-xl">

              <CardContent className="flex items-center justify-between p-6">

                <div>

                  <p className="text-white/45">Confidence Gap</p>

                  <h2 className="mt-3 text-3xl font-black text-white">

                    {Math.abs(results[0].toxicity - results[1].toxicity)}%

                  </h2>

                  <p className="mt-1 text-sm text-white/30">between NP A and NP B</p>

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

              <div className="mb-8">

                <h2 className="text-3xl font-black text-white">Confidence Comparison</h2>

                <p className="mt-2 text-white/45">RF v16 toxicity confidence score for each nanoparticle</p>

              </div>

              <div className="h-[300px] w-full">

                <ResponsiveContainer width="100%" height="100%">

                  <BarChart
                    data={chartData}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >

                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />

                    <XAxis dataKey="name" stroke="#64748b" tickLine={false} axisLine={false} />

                    <YAxis stroke="#64748b" tickLine={false} axisLine={false} domain={[0, 100]} />

                    <Tooltip
                      contentStyle={{
                        background: "#081325",
                        border: "1px solid rgba(34,211,238,0.08)",
                        borderRadius: "16px",
                        color: "#fff",
                      }}
                      formatter={(value: number) => [`${value}%`, "Confidence"]}
                    />

                    <Bar dataKey="toxicity" radius={[8, 8, 0, 0]}>

                      {chartData.map((entry, index) => (
                        <Cell
                          key={index}
                          fill={results[index]?.verdict === "Toxic" ? "#f87171" : "#22d3ee"}
                        />
                      ))}

                    </Bar>

                  </BarChart>

                </ResponsiveContainer>

              </div>

            </CardContent>

          </Card>

          {/* INTERPRETATION */}
          <Card className="border border-cyan-500/10 bg-[#081325]/70 backdrop-blur-xl">

            <CardContent className="p-6 md:p-8">

              <h2 className="text-3xl font-black text-white">RF v16 Interpretation</h2>

              <p className="mt-6 leading-8 text-white/45">

                Both nanoparticles were assessed using the same RF v16 model (ROC-AUC 0.9321,
                trained on 17,934 literature-curated records, threshold=0.44).
                {agreement
                  ? ` Both formulations returned a <strong>${results[0].verdict}</strong> prediction — consistent outcome across different physicochemical profiles.`
                  : ` The two formulations returned different predictions (${results[0].label}: ${results[0].verdict}, ${results[1].label}: ${results[1].verdict}) — indicating distinct toxicity profiles under the evaluated conditions.`
                } Results are supportive guidance and should be complemented with experimental validation.

              </p>

            </CardContent>

          </Card>

        </motion.div>

      )}

    </div>
  );
}
