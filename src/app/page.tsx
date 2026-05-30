"use client";
import { orbitron } from "./layout";

import HowItWorks from "@/components/marketing/how-it-works";

import StatsSlider from "@/components/marketing/stats-slider";

import { ParticlesBackground } from "@/components/marketing/particles-background";

import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from "recharts";

import {
  modelMetrics,
  performanceComparison,
} from "@/lib/model-metrics";

import Link from "next/link";

import { motion } from "framer-motion";

import { SiteHeader } from "@/components/marketing/site-header";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030712] text-white bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:70px_70px]">

      <SiteHeader />

      <div className="absolute left-1/2 top-40 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[140px]" />

      {/* ================= CINEMATIC BACKGROUND ================= */}
      <div className="absolute inset-0 -z-10 overflow-hidden">

        {/* GRID OVERLAY */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:80px_80px]" />

        {/* RADIAL SPOTLIGHT */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.18),transparent_55%)]" />

        {/* NEURAL GLOW LINES */}
        <div className="absolute left-[15%] top-[25%] h-px w-[300px] rotate-12 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        <div className="absolute right-[15%] top-[40%] h-px w-[250px] -rotate-12 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

        <div className="absolute left-[35%] bottom-[20%] h-px w-[280px] rotate-6 bg-gradient-to-r from-transparent via-fuchsia-400/30 to-transparent" />

        {/* VIGNETTE */}
        <div className="absolute inset-0 bg-black/20" />

      </div>

      {/* PARTICLES */}
      <ParticlesBackground />

      {/* ================= HERO SECTION ================= */}
      <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center justify-center px-6 pt-24 text-center">

        <div className="absolute left-1/2 top-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[140px]" />

        <div className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-6 pt-24 text-center">

          {/* Badge */}
          <div className="mx-auto mb-8 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-6 py-2 text-xs font-semibold tracking-[0.2em] text-cyan-400">

            AI-POWERED SAFETY ASSESSMENT

          </div>

          {/* Headline */}
          <div className="max-w-[700px] space-y-8">

            <h1
              className={`
                ${orbitron.className}
                text-[44px]
                sm:text-[72px]
                md:text-[110px]
                leading-[0.9]
                tracking-[-0.05em]
                font-extrabold
                text-center
                text-white
              `}
            >
              Predict
              <br />
              Nanoparticle
              <br />

              <span
                className="
                  bg-gradient-to-r
                  from-cyan-400
                  via-sky-400
                  to-blue-500
                  bg-clip-text
                  text-transparent
                "
              >
                Toxicity
              </span>{" "}
              with AI

            </h1>

            <p className="mt-8 max-w-3xl text-center text-[20px] leading-[1.8] text-white/55">

              Accelerate nanomedicine research with AI-driven toxicity
              prediction, real-time analytics, and intelligent risk
              assessment for safer and faster scientific breakthroughs.

            </p>

          </div>

          {/* CTA Buttons */}
          <div className="mt-14 flex flex-wrap items-center justify-center gap-4 sm:gap-6">

            <Link href="/sign-up">

              <button className="rounded-2xl bg-primary px-8 py-4 text-lg font-semibold text-white shadow-2xl transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(124,58,237,0.5)] hover:opacity-90">

                Request Access

              </button>

            </Link>

            <Link href="/features">

              <button className="rounded-2xl bg-primary px-8 py-4 text-lg font-semibold text-white shadow-2xl transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(124,58,237,0.5)] hover:opacity-90">

                Explore Features

              </button>

            </Link>

          </div>

        </div>

        <StatsSlider />

        <HowItWorks />

      </section>

      {/* ================= MODEL PERFORMANCE SECTION ================= */}
      <section className="relative overflow-hidden px-6 py-40">

        {/* BACKGROUND */}
        <div className="absolute inset-0 -z-10 overflow-hidden">

          {/* GRID */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:70px_70px]" />

          {/* GLOW */}
          <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[140px]" />

        </div>

        <div className="mx-auto max-w-7xl">

          {/* HEADER */}
          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}

            whileInView={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              duration: 0.7,
            }}

            viewport={{
              once: true,
            }}

            className="mx-auto mb-24 max-w-4xl text-center"
          >

            <div className="mb-5 inline-flex items-center rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300 backdrop-blur-xl">

              AI Benchmarking System

            </div>

            <h2
              className={`${orbitron.className} text-6xl font-black leading-[0.95] tracking-[-0.04em] md:text-8xl`}
            >

              MODEL

              <br />

              <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent">

                PERFORMANCE

              </span>

            </h2>

            <p className="mx-auto mt-10 max-w-3xl text-xl leading-relaxed text-white/60">

              NanoToxi AI achieves state-of-the-art toxicity
              prediction performance using advanced neural
              validation, LOSO benchmarking, and real-time
              scientific inference systems.

            </p>

 </motion.div>

      {/* MAIN GRID */}
      <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">

        {/* LEFT SIDE */}
        <motion.div
          initial={{
            opacity: 0,
            x: -40,
          }}

          whileInView={{
            opacity: 1,
            x: 0,
          }}

          transition={{
            duration: 0.7,
          }}

          viewport={{
            once: true,
          }}

          className="rounded-[2.5rem] border border-cyan-500/10 bg-white/[0.03] p-10 backdrop-blur-2xl shadow-[0_0_100px_rgba(34,211,238,0.08)]"
        >

          {/* TOP STATS */}
          <div className="grid gap-6 md:grid-cols-2">

            {[
              {
                label: "Accuracy",
                value:
                  modelMetrics.accuracy,
              },

              {
                label: "Precision",
                value:
                  modelMetrics.precision,
              },

              {
                label: "Recall",
                value:
                  modelMetrics.recall,
              },

              {
                label: "F1 Score",
                value:
                  modelMetrics.f1Score,
              },
            ].map((metric) => (

              <div
                key={metric.label}
                className="group rounded-[2rem] border border-cyan-500/10 bg-[#081225]/60 p-8 transition-all duration-500 hover:-translate-y-2 hover:border-cyan-400/30 hover:shadow-[0_0_70px_rgba(34,211,238,0.15)]"
              >

                <p className="text-sm uppercase tracking-[0.25em] text-white/50">

                  {metric.label}

                </p>

                <div className="mt-6 flex items-end justify-between">

                  <h3 className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-6xl font-black text-transparent">

                    {metric.value}

                  </h3>

                  <div className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-sm font-semibold text-cyan-300">

                    +2.4%

                  </div>

                </div>

                {/* BAR */}
                <div className="mt-8 h-3 overflow-hidden rounded-full bg-white/5">

                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                    style={{
                      width:
                        `${parseInt(metric.value)}%`,
                    }}
                  />

                </div>

              </div>
            ))}

          </div>

          {/* RADAR CHART */}
          <div className="relative mt-12 rounded-[2rem] border border-cyan-500/10 bg-[#081225]/50 p-8">

            <div className="mb-8 text-center">

              <h3
                className={`${orbitron.className} text-3xl font-black uppercase`}
              >

                VALIDATION MATRIX

              </h3>

            </div>

            <div className="relative h-[420px] w-full">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <RadarChart
                  data={
                    performanceComparison
                  }
                >

                  <PolarGrid
                    stroke="#1E293B"
                  />

                  <PolarAngleAxis
                    dataKey="metric"

                    tick={{
                      fill: "#94A3B8",
                      fontSize: 14,
                    }}
                  />

                  <Radar
                    name="In Distribution"
                    dataKey="inDistribution"
                    stroke="#22D3EE"
                    fill="#22D3EE"
                    fillOpacity={0.35}
                  />

                  <Radar
                    name="LOSO"
                    dataKey="loso"
                    stroke="#3B82F6"
                    fill="#3B82F6"
                    fillOpacity={0.25}
                  />

                </RadarChart>

              </ResponsiveContainer>

            </div>

          </div>

        </motion.div>

              {/* RIGHT SIDE */}
      <motion.div
        initial={{
          opacity: 0,
          x: 40,
        }}

        whileInView={{
          opacity: 1,
          x: 0,
        }}

        transition={{
          duration: 0.7,
        }}

        viewport={{
          once: true,
        }}

        className="flex flex-col gap-8"
      >

        {/* AI SCORE */}
        <div className="relative overflow-hidden rounded-[2.5rem] border border-cyan-500/10 bg-white/[0.03] p-10 text-center backdrop-blur-2xl">

          {/* GLOW */}
          <div className="absolute left-1/2 top-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[100px]" />

          <p className="relative z-10 text-sm uppercase tracking-[0.3em] text-white/50">

            AI CONFIDENCE SCORE

          </p>

          <div className="relative z-10 mt-10 flex items-center justify-center">

            <div className="relative flex h-[240px] w-[240px] items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-500/5 shadow-[0_0_100px_rgba(34,211,238,0.15)]">

              {/* OUTER RING */}
              <div className="absolute inset-0 rounded-full border-[4px] border-cyan-400/20 border-t-cyan-300 animate-spin" />

              {/* INNER */}
              <div className="absolute inset-[10px] rounded-full bg-[#020617]" />

              {/* VALUE */}
              <div className="relative z-10">

                <h3 className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-7xl font-black text-transparent drop-shadow-[0_0_20px_rgba(34,211,238,0.45)]">

                  98%

                </h3>

              </div>

            </div>

          </div>

          <p className="relative z-10 mt-10 text-lg leading-relaxed text-white/60">

            NanoToxi AI consistently maintains extremely
            high confidence during real-time nanoparticle
            toxicity inference and validation.

          </p>

        </div>

        {/* BOTTOM STATS */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-1">

          {[
            {
              label: "Predictions",
              value: "120K+",
            },

            {
              label: "Research Samples",
              value: "50K+",
            },

            {
              label: "Cell Lines",
              value: "11",
            },
          ].map((item) => (

            <div
              key={item.label}
              className="rounded-[2rem] border border-cyan-500/10 bg-white/[0.03] p-8 backdrop-blur-2xl transition-all duration-500 hover:border-cyan-400/30 hover:shadow-[0_0_60px_rgba(34,211,238,0.12)]"
            >

              <p className="text-sm uppercase tracking-[0.25em] text-white/50">

                {item.label}

              </p>

              <h3 className="mt-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-5xl font-black text-transparent">

                {item.value}

              </h3>

            </div>
          ))}

        </div>

      </motion.div>

      </div>

    </div>

</section>

    </main>
  );
}