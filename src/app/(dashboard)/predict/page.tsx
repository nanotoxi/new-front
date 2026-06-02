
"use client";

import { api } from "@/lib/api";

import { zodResolver } from "@hookform/resolvers/zod";

import { useState } from "react";

import { motion } from "framer-motion";

import { useForm } from "react-hook-form";

import { z } from "zod";

import Image from "next/image";

import {
  Activity,
  ShieldCheck,
  FlaskConical,
  BrainCircuit,
} from "lucide-react";

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

import { useHistoryStore } from "@/lib/history-store";

const predictSchema = z.object({
  nanoparticle: z.string().min(1),
  npType: z.string().min(1),
  size: z.coerce.number().min(1),
  shape: z.string().min(1),
  dosage: z.coerce.number().min(1),
  exposure: z.coerce.number().min(1),
  cellLine: z.string().min(1),
  surfaceCharge: z.coerce.number(),
  coating: z.string().optional(),
  viability: z.coerce.number().min(0).max(100),
  ph: z.coerce.number().min(1).max(14),
});

type PredictFormInput = z.input<typeof predictSchema>;
type PredictForm = z.infer<typeof predictSchema>;

export default function PredictPage() {

  const [result, setResult] =
  useState<null | {

    verdict: string;

    score: number;

    risk?: string;

    explanation?: string;

  }>(null);

  const [offline] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [errorMessage,
    setErrorMessage] =
      useState("");

  const addHistory =
    useHistoryStore(
      (state) =>
        state.addHistory
    );

  const {
    register,
    handleSubmit,
    setValue,
  } = useForm<PredictFormInput, unknown, PredictForm>({
    resolver: zodResolver(
      predictSchema
    ),
  });

  const onSubmit = async (
  data: PredictForm
): Promise<void> => {

  try {

    setLoading(true);

    setErrorMessage("");

    const payload = {

      nanoparticle_name:
        data.nanoparticle,

      np_type:
        data.npType,

      primary_size_nm:
        Number(data.size),

      hydrodynamic_size_nm:
        Number(data.size),

      zeta_potential_mv:
        Number(data.surfaceCharge),

      morphology:
        data.shape,

      cell_type:
        data.cellLine,

      dose_max_ugml:
        Number(data.dosage),

      dose_min_ugml:
        Math.max(
          Number(data.dosage) / 10,
          1
        ),

      exposure_time_h:
        Number(data.exposure),

      ph:
        Number(data.ph),

      temperature_c: 37,

      is_coated:
        !!data.coating,

      is_therapeutic:
        false,

      include_shap:
        true,

      include_rag:
        false,
    };

    console.log(
      "Prediction Payload:",
      payload
    );

    const response =
      await api.predict(
        payload
      );

    console.log(
      "Prediction Response:",
      response
    );

    const prediction = {

      verdict:
        response.toxicity_label,

      score:
        Math.round(
          response.confidence * 100
        ),

      risk:
        response.risk_level ||

        (
          response.confidence > 0.8
            ? "High"
            : response.confidence > 0.5
              ? "Moderate"
              : "Low"
        ),

      explanation:

        typeof response.shap_explanation ===
        "object"

          ? JSON.stringify(
              response.shap_explanation,
              null,
              2
            )

          : response.shap_explanation ||

            "AI analysis completed successfully.",
    };

    setResult(prediction);

    addHistory({

      verdict:
        prediction.verdict,

      score:
        prediction.score,

      nanoparticle:
        data.nanoparticle,
    });

  } catch (error: any) {

    console.error(
      "Prediction Error:",
      error.response?.data || error
    );

    setErrorMessage(

      error.response?.data?.detail ||

      "Prediction failed. Please try again."
    );

  } finally {

    setLoading(false);
  }
};
  function loadPresetSafe() {

    setValue(
      "nanoparticle",
      "Gold"
    );

    setValue(
      "npType",
      "Inorganic"
    );

    setValue("size", 20);

    setValue(
      "shape",
      "Spherical"
    );

    setValue(
      "dosage",
      10
    );

    setValue(
      "exposure",
      12
    );

    setValue(
      "cellLine",
      "HepG2"
    );

    setValue(
      "surfaceCharge",
      -5
    );

    setValue(
      "viability",
      92
    );

    setValue("ph", 7);
  }

  function loadPresetToxic() {

    setValue(
      "nanoparticle",
      "Silver"
    );

    setValue(
      "npType",
      "Inorganic"
    );

    setValue("size", 90);

    setValue(
      "shape",
      "Nanorod"
    );

    setValue(
      "dosage",
      120
    );

    setValue(
      "exposure",
      48
    );

    setValue(
      "cellLine",
      "A549"
    );

    setValue(
      "surfaceCharge",
      30
    );

    setValue(
      "viability",
      20
    );

    setValue("ph", 4);
  }

  return (
    <div className="relative space-y-5">

      {/* HEADER */}
      <div className="relative z-10">

        <h1
            className="text-4xl font-black text-transparent"
            style={{
                background:
                "linear-gradient(to right, #ffffff 35%, #67e8f9 75%, #22d3ee 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
            }}
        >
            Predict Toxicity
        </h1>

        <p className="mt-2 text-lg text-white/50">

          AI-powered nanoparticle toxicity prediction.

        </p>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">

        {[
          {
            title: "Prediction Accuracy",
            value: "98.2%",
            icon: ShieldCheck,
          },

          {
            title: "Datasets",
            value: "12.4K",
            icon: FlaskConical,
          },

          {
            title: "AI Models",
            value: "24",
            icon: BrainCircuit,
          },

          {
            title: "Predictions",
            value: "89K",
            icon: Activity,
          },
        ].map((item, i) => {

          const Icon = item.icon;

          return (
            <Card
              key={i}
              className="rounded-[26px] border border-cyan-500/10 bg-[#071120]/70 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/20"
            >

              <CardContent className="flex items-center justify-between p-5">

                <div>

                  <p className="text-sm text-white/45">

                    {item.title}

                  </p>

                  <h2 className="mt-2 text-3xl font-black text-white">

                    {item.value}

                  </h2>

                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10">

                  <Icon className="h-7 w-7 text-cyan-400" />

                </div>

              </CardContent>

            </Card>
          );
        })}

      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.45fr_0.55fr]">

        {/* LEFT */}
        <Card className="rounded-[30px] border border-cyan-500/10 bg-[#071120]/70 backdrop-blur-xl">

          <CardContent className="space-y-4 p-4">

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-3">

              <Button
                onClick={loadPresetSafe}
                className="rounded-2xl bg-cyan-400 text-black shadow-[0_0_25px_rgba(34,211,238,0.2)] hover:bg-cyan-300"
              >

                Safe Preset

              </Button>

              <Button
                variant="outline"
                onClick={loadPresetToxic}
                className="rounded-2xl border border-cyan-500/10 bg-[#081325]/70 text-white hover:border-cyan-400/20 hover:bg-cyan-500/5"
              >

                Toxic Preset

              </Button>

            </div>

            {/* FORM */}
            <form

              

              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 gap-4 md:grid-cols-2"
            >

              {/* ERROR CARD */}
              {errorMessage && (

                <div
                  className="
                    md:col-span-2
                    mb-1
                    rounded-2xl
                    border
                    border-red-500/20
                    bg-red-500/10
                    p-4
                    backdrop-blur-xl
                  "
                >

                  <div className="flex items-start justify-between gap-4">

                    <div>

                      <h3 className="text-sm font-semibold text-red-400">

                        Prediction Failed

                      </h3>

                      <p className="mt-1 text-sm text-red-200">

                        {errorMessage}

                      </p>

                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setErrorMessage("")
                      }
                      className="
                        rounded-lg
                        border
                        border-red-500/20
                        px-3
                        py-1
                        text-xs
                        text-red-300
                        transition
                        hover:bg-red-500/10
                      "
                    >

                      Dismiss

                    </button>

                  </div>

                </div>
              )}

              <Select
                onValueChange={(value) =>
                  setValue(
                    "nanoparticle",
                    value
                  )
                }
              >
                <Select
                    onValueChange={(value) =>
                      setValue(
                        "npType",
                        value
                      )
                    }
                  >

                    <SelectTrigger className="h-11 rounded-2xl border border-cyan-500/10 bg-[#081325]/80 text-white">

                      <SelectValue placeholder="Nanoparticle Type" />

                    </SelectTrigger>

                    <SelectContent>

                      <SelectItem value="Inorganic">
                        Inorganic
                      </SelectItem>

                      <SelectItem value="Organic">
                        Organic
                      </SelectItem>

                      <SelectItem value="Hybrid">
                        Hybrid
                      </SelectItem>

                    </SelectContent>

                  </Select>

                <SelectTrigger className="h-11 rounded-2xl border border-cyan-500/10 bg-[#081325]/80 text-white">

                  <SelectValue placeholder="Select Nanoparticle" />

                </SelectTrigger>

                <SelectContent>

                  <SelectItem value="Gold">
                    Gold
                  </SelectItem>

                  <SelectItem value="Silver">
                    Silver
                  </SelectItem>

                  <SelectItem value="Titanium">
                    Titanium
                  </SelectItem>

                </SelectContent>

              </Select>

              <Input
                type="number"
                placeholder="Size (nm)"
                {...register("size")}
                className="h-11 rounded-2xl border border-cyan-500/10 bg-[#081325]/80 text-white placeholder:text-white/30"
              />

              <Select
                onValueChange={(value) =>
                  setValue(
                    "shape",
                    value
                  )
                }
              >

                <SelectTrigger className="h-11 rounded-2xl border border-cyan-500/10 bg-[#081325]/80 text-white">

                  <SelectValue placeholder="Select Shape" />

                </SelectTrigger>

                <SelectContent>

                  <SelectItem value="Spherical">
                    Spherical
                  </SelectItem>

                  <SelectItem value="Nanorod">
                    Nanorod
                  </SelectItem>

                  <SelectItem value="Cubic">
                    Cubic
                  </SelectItem>

                  <SelectItem value="Core-Shell">
                    Core-Shell
                  </SelectItem>

                  <SelectItem value="Dendrimer">
                    Dendrimer
                  </SelectItem>

                  <SelectItem value="Fibrous">
                    Fibrous
                  </SelectItem>

                  <SelectItem value="Hexagonal">
                    Hexagonal
                  </SelectItem>

                  <SelectItem value="Nanotube">
                    Nanotube
                  </SelectItem>

                  <SelectItem value="Nanowire">
                    Nanowire
                  </SelectItem>

                  <SelectItem value="2D Sheet">
                    2D Sheet
                  </SelectItem>

                  <SelectItem value="Porous">
                    Porous
                  </SelectItem>

                  <SelectItem value="Other">
                    Other
                  </SelectItem>

                </SelectContent>

              </Select>

              <Input
                type="number"
                placeholder="Dosage"
                {...register("dosage")}
                className="h-11 rounded-2xl border border-cyan-500/10 bg-[#081325]/80 text-white placeholder:text-white/30"
              />

              <Input
                type="number"
                placeholder="Exposure Time"
                {...register("exposure")}
                className="h-11 rounded-2xl border border-cyan-500/10 bg-[#081325]/80 text-white placeholder:text-white/30"
              />

              <Select
                onValueChange={(value) =>
                  setValue(
                    "cellLine",
                    value
                  )
                }
              >

                <SelectTrigger className="h-11 rounded-2xl border border-cyan-500/10 bg-[#081325]/80 text-white">

                  <SelectValue placeholder="Select Cell Line" />

                </SelectTrigger>

                <SelectContent>

                  <SelectItem value="A549">
                    A549
                  </SelectItem>

                  <SelectItem value="BEAS-2B">
                    BEAS-2B
                  </SelectItem>

                  <SelectItem value="Caco-2">
                    Caco-2
                  </SelectItem>

                  <SelectItem value="HT-29">
                    HT-29
                  </SelectItem>

                  <SelectItem value="HeLa">
                    HeLa
                  </SelectItem>

                  <SelectItem value="HepG2">
                    HepG2
                  </SelectItem>

                  <SelectItem value="L929">
                    L929
                  </SelectItem>

                  <SelectItem value="MCF-7">
                    MCF-7
                  </SelectItem>

                  <SelectItem value="MDA-MB-231">
                    MDA-MB-231
                  </SelectItem>

                  <SelectItem value="RAW264.7">
                    RAW264.7
                  </SelectItem>

                  <SelectItem value="Other">
                    Other
                  </SelectItem>

                </SelectContent>

              </Select>

              <Input
                type="number"
                placeholder="Surface Charge"
                {...register("surfaceCharge")}
                className="h-11 rounded-2xl border border-cyan-500/10 bg-[#081325]/80 text-white placeholder:text-white/30"
              />

              <Input
                placeholder="Coating (Optional)"
                {...register("coating")}
                className="h-11 rounded-2xl border border-cyan-500/10 bg-[#081325]/80 text-white placeholder:text-white/30"
              />

              <Input
                type="number"
                placeholder="Cell Viability"
                {...register("viability")}
                className="h-11 rounded-2xl border border-cyan-500/10 bg-[#081325]/80 text-white placeholder:text-white/30"
              />

              <Input
                type="number"
                placeholder="pH"
                {...register("ph")}
                className="h-11 rounded-2xl border border-cyan-500/10 bg-[#081325]/80 text-white placeholder:text-white/30"
              />

              <div className="md:col-span-2">

                <Button
                  type="submit"
                  disabled={
                    offline || loading
                  }
                  className="h-11 w-full rounded-2xl bg-cyan-400 text-lg font-bold text-black shadow-[0_0_30px_rgba(34,211,238,0.25)] transition-all duration-300 hover:scale-[1.02] hover:bg-cyan-300 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                >

                  {loading
                    ? "Analyzing..."
                    : errorMessage
                      ? "Retry Prediction"
                      : "Run Prediction"}

                </Button>

              </div>

            </form>

          </CardContent>

        </Card>

        {/* RIGHT PANEL */}
        <div className="space-y-5">

          <Card className="rounded-[30px] border border-cyan-500/10 bg-[#071120]/70 backdrop-blur-xl">

            <CardContent className="p-6">

              <p className="text-sm text-white/45">

                AI Confidence

              </p>

              <h2 className="mt-3 text-6xl font-black text-cyan-400">

                98%

              </h2>

              <div className="mt-6 h-3 overflow-hidden rounded-full bg-white/10">

                <div className="h-full w-[98%] rounded-full bg-cyan-400" />

              </div>

            </CardContent>

          </Card>

          <Card className="rounded-[30px] border border-cyan-500/10 bg-[#071120]/70 backdrop-blur-xl">

            <CardContent className="space-y-5 p-6">

              <h3 className="text-2xl font-bold text-white">

                Live Analysis

              </h3>

              <div className="space-y-4">

                <div className="flex items-center justify-between">

                  <span className="text-white/50">
                    Toxicity Risk
                  </span>

                  <span className="text-red-400">
                    Moderate
                  </span>

                </div>

                <div className="flex items-center justify-between">

                  <span className="text-white/50">
                    Stability
                  </span>

                  <span className="text-cyan-400">
                    High
                  </span>

                </div>

                <div className="flex items-center justify-between">

                  <span className="text-white/50">
                    Bio Compatibility
                  </span>

                  <span className="text-green-400">
                    Safe
                  </span>

                </div>

              </div>

            </CardContent>

          </Card>

        </div>

      </div>

      {/* RESULT */}
      {result && (

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}
          >

            <Card className="overflow-hidden rounded-[32px] border border-cyan-500/10 bg-[#071120]/80 backdrop-blur-2xl">

              <CardContent className="space-y-8 p-8">

                {/* HEADER */}
                <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                  <div className="flex items-center gap-4">

                    <Image
                      src="/nanotoxi-logo.png"
                      alt="NanoToxi"
                      width={48}
                      height={48}
                      className="opacity-90"
                    />

                    <div>

                      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-cyan-400">

                        AI Inference Complete

                      </p>

                      <h2 className="text-4xl font-black text-white">

                        Prediction Result

                      </h2>

                    </div>

                  </div>

                  <div
                    className={`inline-flex items-center rounded-full px-6 py-3 text-lg font-black shadow-lg ${
                      result.verdict ===
                      "Toxic"
                        ? "bg-red-500/20 text-red-400 shadow-red-500/10"
                        : "bg-green-500/20 text-green-400 shadow-green-500/10"
                    }`}
                  >

                    {result.verdict}

                  </div>

                </div>

                {/* METRICS */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-1 sm:grid-cols-3">

                  {/* CONFIDENCE */}
                  <div className="rounded-3xl border border-cyan-500/10 bg-[#081325]/80 p-5">

                    <p className="text-sm uppercase tracking-[0.25em] text-white/40">

                      Confidence

                    </p>

                    <h3 className="mt-3 text-5xl font-black text-cyan-400">

                      {result.score}%

                    </h3>

                  </div>

                  {/* RISK */}
                  <div className="rounded-3xl border border-cyan-500/10 bg-[#081325]/80 p-5">

                    <p className="text-sm uppercase tracking-[0.25em] text-white/40">

                      Risk Level

                    </p>

                    <h3
                      className={`mt-3 text-4xl font-black ${
                        result.risk === "High"
                          ? "text-red-400"
                          : result.risk === "Moderate"
                            ? "text-yellow-400"
                            : "text-green-400"
                      }`}
                    >

                      {result.risk}

                    </h3>

                  </div>

                  {/* MODEL */}
                  <div className="rounded-3xl border border-cyan-500/10 bg-[#081325]/80 p-5">

                    <p className="text-sm uppercase tracking-[0.25em] text-white/40">

                      Model Version

                    </p>

                    <h3 className="mt-3 text-4xl font-black text-white">

                      RF v16

                    </h3>

                  </div>

                </div>

                {/* AI EXPLANATION */}
                <div className="rounded-3xl border border-cyan-500/10 bg-[#081325]/80 p-6">

                  <div className="flex items-center justify-between">

                    <div>

                      <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">

                        SHAP AI Explanation

                      </p>

                      <h3 className="mt-2 text-2xl font-black text-white">

                        Feature Analysis

                      </h3>

                    </div>

                    <div className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-300">

                      Explainable AI

                    </div>

                  </div>

                  <p className="mt-5 leading-relaxed text-white/70">

                    {result.explanation}

                  </p>

                </div>

                {/* RECOMMENDATION */}
                <div
                  className={`rounded-3xl border p-6 ${
                    result.verdict === "Toxic"
                      ? "border-red-500/20 bg-red-500/10"
                      : "border-green-500/20 bg-green-500/10"
                  }`}
                >

                  <h3
                    className={`text-xl font-black ${
                      result.verdict === "Toxic"
                        ? "text-red-400"
                        : "text-green-400"
                    }`}
                  >

                    {result.verdict === "Toxic"
                      ? "Safety Recommendation"
                      : "Biocompatibility Assessment"}

                  </h3>

                  <p className="mt-3 leading-relaxed text-white/70">

                    {result.verdict === "Toxic"

                      ? "The nanoparticle demonstrates elevated toxicity indicators. Further wet-lab validation and dosage optimization are strongly recommended before biomedical deployment."

                      : "The nanoparticle demonstrates acceptable toxicity thresholds under current experimental conditions and shows promising biocompatibility characteristics."
                    }

                  </p>

                </div>

              </CardContent>

            </Card>

          </motion.div>
        )}

      {/* DISCLAIMER */}
      <div className="flex items-start gap-3 rounded-2xl border border-cyan-500/10 bg-[#071120]/50 px-5 py-4 backdrop-blur-sm">

        <Image
          src="/nanotoxi-logo.png"
          alt="NanoToxi"
          width={20}
          height={20}
          className="mt-0.5 shrink-0 opacity-60"
        />

        <p className="text-xs leading-relaxed text-white/40">

          <span className="font-semibold text-white/55">Disclaimer —</span>{" "}
          Predictions are generated using a model trained on approximately 17,000+ literature-curated nanoparticle records and should be interpreted as supportive guidance rather than experimental validation.

        </p>

      </div>

    </div>
  );
}

