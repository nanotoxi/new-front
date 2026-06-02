"use client";

import { SiteHeader } from "@/components/marketing/site-header";

import { usePathname } from "next/navigation";

import Link from "next/link";

import { motion } from "framer-motion";

import {
  Brain,
  Activity,
  Dna,
  ShieldCheck,
  BarChart3,
  Cpu,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Toxicity Prediction",
    description:
      "Advanced machine learning models trained on nanotoxicology datasets for ultra-fast toxicity prediction.",

    color:
      "from-cyan-400 to-blue-500",
  },

  {
    icon: Activity,
    title: "Real-Time Monitoring",
    description:
      "Analyze toxicity signals, biological interactions, and live AI processing workflows instantly.",

    color:
      "from-blue-400 to-indigo-500",
  },

  {
    icon: Dna,
    title: "Molecular Intelligence",
    description:
      "Deep biological and molecular analysis powered by intelligent AI research pipelines.",

    color:
      "from-violet-400 to-fuchsia-500",
  },

  {
    icon: ShieldCheck,
    title: "Risk Assessment",
    description:
      "Early-stage nanoparticle safety assessment with predictive confidence scoring systems.",

    color:
      "from-emerald-400 to-cyan-500",
  },

  {
    icon: BarChart3,
    title: "Research Analytics",
    description:
      "Interactive AI dashboards designed for nanomedicine researchers and biotech laboratories.",

    color:
      "from-cyan-300 to-sky-500",
  },

  {
    icon: Cpu,
    title: "Scalable AI Infrastructure",
    description:
      "Enterprise-grade cloud architecture built for large-scale scientific AI workflows.",

    color:
      "from-blue-400 to-cyan-400",
  },
];

export default function FeaturesPage() {
   const pathname = usePathname();
  return (

    <main className="relative min-h-screen overflow-hidden bg-[#020617] text-white">

    <SiteHeader />

      {/* GRID BACKGROUND */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />

      {/* GLOW */}
      <div className="absolute left-[-250px] top-[-100px] h-[600px] w-[600px] rounded-full bg-cyan-500/10 blur-[160px]" />

      <div className="absolute bottom-[-200px] right-[-200px] h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[160px]" />

      {/* MOVING PARTICLES */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {Array.from({
          length: 70,
        }).map((_, i) => {

          const size =
            4 + Math.random() * 8;

          const top =
            Math.random() * 100;

          const left =
            Math.random() * 100;

          const duration =
            12 + Math.random() * 12;

          const delay =
            Math.random() * 6;

          return (
            <div
              key={i}
              className="absolute rounded-full bg-cyan-400"

              style={{
                width: `${size}px`,
                height: `${size}px`,
                top: `${top}%`,
                left: `${left}%`,
                opacity: 0.8,

                boxShadow:
                  "0 0 25px #22d3ee",

                animation: `floatParticle ${duration}s ease-in-out infinite`,
                animationDelay: `${delay}s`,
              }}
            />
          );
        })}

      </div>

      {/* NAVBAR */}
      

      {/* HERO */}
      <section className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-6 pb-24 pt-36 text-center">

        {/* BADGE */}
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
            duration: 0.6,
          }}

          className="mb-8 flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-8 py-3 text-sm font-semibold tracking-[0.25em] text-cyan-300 backdrop-blur-xl"
        >

          <Sparkles className="h-4 w-4" />

          AI-POWERED FEATURES

        </motion.div>

        {/* TITLE */}
        <motion.h1
          initial={{
            opacity: 0,
            y: 40,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            duration: 0.8,
          }}

          className="max-w-6xl text-6xl font-black uppercase leading-[0.9] tracking-tight md:text-[70px]"
          style={{
            fontFamily:
              "Orbitron, sans-serif",
          }}
        >

          NANOTOXI
          <br />

          <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent">

            FEATURES

          </span>

        </motion.h1>

        {/* SUBTEXT */}
        <motion.p
          initial={{
            opacity: 0,
            y: 30,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            delay: 0.2,
            duration: 0.8,
          }}

          className="mt-10 max-w-4xl text-2xl leading-10 text-slate-400"
        >

          Accelerate nanomedicine research with
          AI-driven toxicity prediction,
          molecular intelligence,
          real-time monitoring,
          and advanced scientific analytics.

        </motion.p>

        {/* BUTTONS */}
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
            delay: 0.3,
            duration: 0.7,
          }}

          className="mt-12 flex flex-wrap items-center justify-center gap-5"
        >

          <button className="rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 px-8 py-4 text-lg font-bold text-black shadow-[0_0_40px_rgba(34,211,238,0.35)] transition-all duration-300 hover:scale-105">

            Explore Platform

          </button>

          <button className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-lg font-semibold text-white backdrop-blur-xl transition hover:bg-white/10">

            View Research

            <ArrowRight className="h-5 w-5" />

          </button>

        </motion.div>

      </section>

      {/* FEATURES */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-28">

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {features.map(
            (
              feature,
              index
            ) => {

              const Icon =
                feature.icon;

              return (

                <motion.div
                  key={
                    feature.title
                  }

                  initial={{
                    opacity: 0,
                    y: 50,
                  }}

                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}

                  viewport={{
                    once: true,
                  }}

                  transition={{
                    duration: 0.6,
                    delay:
                      index * 0.08,
                  }}

                  className="group relative overflow-hidden rounded-[32px] border border-cyan-500/10 bg-[#04112a]/80 p-8 backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 hover:border-cyan-400/30 hover:shadow-[0_0_40px_rgba(34,211,238,0.12)]"
                >

                  {/* GLOW */}
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">

                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.06] via-transparent to-transparent" />

                  </div>

                  <div className="relative z-10">

                    {/* ICON */}
                    <div
                      className={`mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br ${feature.color}`}
                    >

                      <Icon className="h-10 w-10 text-white" />

                    </div>

                    {/* TITLE */}
                    <h3
                      className="text-4xl font-black uppercase leading-tight"
                      style={{
                        fontFamily:
                          "Orbitron, sans-serif",
                      }}
                    >

                      {
                        feature.title
                      }

                    </h3>

                    {/* DESCRIPTION */}
                    <p className="mt-6 text-lg leading-8 text-slate-400">

                      {
                        feature.description
                      }

                    </p>

                  </div>

                </motion.div>
              );
            }
          )}

        </div>

      </section>

      {/* PARTICLE ANIMATION */}
      <style jsx global>{`

        @keyframes floatParticle {

          0% {
            transform:
              translateY(0px)
              translateX(0px);
          }

          25% {
            transform:
              translateY(-30px)
              translateX(15px);
          }

          50% {
            transform:
              translateY(10px)
              translateX(-20px);
          }

          75% {
            transform:
              translateY(-15px)
              translateX(25px);
          }

          100% {
            transform:
              translateY(0px)
              translateX(0px);
          }
        }

      `}</style>

    </main>
  );
}