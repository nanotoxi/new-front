"use client";

import { SiteHeader } from "@/components/marketing/site-header";

import Link from "next/link";

import { usePathname } from "next/navigation";

import { motion } from "framer-motion";

import {
  Brain,
  ShieldCheck,
  Microscope,
  Sparkles,
} from "lucide-react";

export default function AboutPage() {

  const pathname =
    usePathname();

  const particles = Array.from(
    { length: 55 },
    (_, i) => ({
      id: i,
      size: (i % 4) + 2,
      top: (i * 11) % 100,
      left: (i * 17) % 100,
      duration: 14 + (i % 8),
      delay: i % 5,
    })
  );

  const features = [
    {
      icon: Brain,
      title: "AI Intelligence",
      description:
        "Advanced toxicity prediction models trained on nanomedicine datasets.",
    },

    {
      icon: Microscope,
      title: "Research Focused",
      description:
        "Built for biotech teams, nanotech labs, and scientific workflows.",
    },

    {
      icon: ShieldCheck,
      title: "Safer Analysis",
      description:
        "Real-time nanoparticle risk analysis with intelligent monitoring.",
    },
  ];

  return (

    <main className="relative min-h-screen overflow-hidden bg-[#020617] text-white">
      <SiteHeader />
      {/* PARTICLES */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {particles.map(
          (particle) => (

            <div
              key={particle.id}
              className="absolute rounded-full bg-cyan-400"

              style={{

                width:
                  `${particle.size}px`,

                height:
                  `${particle.size}px`,

                top:
                  `${particle.top}%`,

                left:
                  `${particle.left}%`,

                opacity: 0.75,

                boxShadow:
                  "0 0 18px #22d3ee",

                animation:
                  `floatParticle ${particle.duration}s ease-in-out infinite`,

                animationDelay:
                  `${particle.delay}s`,
              }}
            />
          )
        )}

      </div>

      {/* GRID */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:70px_70px]" />

      {/* GLOW */}
      <div className="absolute left-[-180px] top-[-120px] h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-[130px]" />

      <div className="absolute bottom-[-120px] right-[-120px] h-[320px] w-[320px] rounded-full bg-blue-500/10 blur-[120px]" />

      {/* NAVBAR */}
      

      {/* HERO */}
      <section className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 pb-20 pt-36 text-center">

        <motion.div
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
        >

          {/* BADGE */}
          <div className="mb-8 inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-7 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300 backdrop-blur-xl">

            AI-Powered Research Platform

          </div>

          {/* TITLE */}
          <h1
            className="text-6xl font-black uppercase leading-[0.9] md:text-[4rem]"
            style={{
              fontFamily:
                "Orbitron, sans-serif",
            }}
          >

            ABOUT

            <br />

            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

              NANOTOXI

            </span>

          </h1>

          {/* DESC */}
          <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-white/60 md:text-xl">

            NanoToxi combines artificial intelligence,
            nanotechnology, and predictive analytics
            to accelerate safer nanoparticle discovery.

          </p>

          {/* BUTTONS */}
          <div className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row">

            <button className="rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 px-8 py-4 text-lg font-bold text-black shadow-[0_0_40px_rgba(34,211,238,0.3)] transition hover:scale-105">

              Explore Platform

            </button>

            <button className="rounded-2xl border border-white/10 bg-white/[0.03] px-8 py-4 text-lg font-semibold text-white backdrop-blur-xl transition hover:border-cyan-400/30 hover:bg-cyan-500/10">

              Learn More →

            </button>

          </div>

        </motion.div>

      </section>

      {/* STATS */}
      <section className="relative z-10 mx-auto grid max-w-6xl gap-5 px-6 md:grid-cols-3">

        {[
          {
            value: "98.7%",
            label: "Prediction Accuracy",
          },

          {
            value: "50K+",
            label: "Samples Analysed",
          },

          {
            value: "24/7",
            label: "AI Monitoring",
          },
        ].map((stat) => (

          <div
            key={stat.label}
            className="rounded-[2rem] border border-cyan-500/10 bg-white/[0.03] p-7 text-center backdrop-blur-2xl"
          >

            <h3 className="text-4xl font-black text-cyan-400">

              {stat.value}

            </h3>

            <p className="mt-2 text-base text-white/60">

              {stat.label}

            </p>

          </div>
        ))}

      </section>

      {/* FEATURES */}
      <section className="relative z-10 mx-auto mt-20 max-w-6xl px-6 pb-28">

        <div className="mb-14 text-center">

          <div className="mb-5 inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">

            Core Technology

          </div>

          <h2
            className="text-4xl font-black uppercase md:text-5xl"
            style={{
              fontFamily:
                "Orbitron, sans-serif",
            }}
          >

            WHY

            <span className="ml-3 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

              NANOTOXI

            </span>

          </h2>

        </div>

        <div className="grid gap-6 md:grid-cols-3">

          {features.map(
            (
              item,
              index
            ) => {

              const Icon =
                item.icon;

              return (

                <motion.div
                  key={item.title}

                  initial={{
                    opacity: 0,
                    y: 30,
                  }}

                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}

                  transition={{
                    duration: 0.5,
                    delay:
                      index * 0.1,
                  }}

                  viewport={{
                    once: true,
                  }}

                  className="rounded-[2rem] border border-cyan-500/10 bg-white/[0.03] p-7 backdrop-blur-2xl transition hover:-translate-y-2 hover:border-cyan-400/30 hover:shadow-[0_0_60px_rgba(34,211,238,0.15)]"
                >

                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10">

                    <Icon className="h-8 w-8 text-cyan-400" />

                  </div>

                  <h3 className="text-2xl font-black">

                    {item.title}

                  </h3>

                  <p className="mt-4 text-base leading-relaxed text-white/60">

                    {item.description}

                  </p>

                </motion.div>
              );
            }
          )}

        </div>

      </section>

      {/* CTA */}
      <section className="relative z-10 mx-auto mb-24 max-w-4xl px-6">

        <div className="rounded-[2.5rem] border border-cyan-500/10 bg-white/[0.03] px-8 py-14 text-center backdrop-blur-2xl">

          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-cyan-500/10">

            <Sparkles className="h-10 w-10 text-cyan-400" />

          </div>

          <h2
            className="text-4xl font-black uppercase md:text-5xl"
            style={{
              fontFamily:
                "Orbitron, sans-serif",
            }}
          >

            READY TO

            <br />

            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

              START?

            </span>

          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/60">

            Join the future of nanotoxicity prediction
            with advanced AI-powered research tools.

          </p>

          <button className="mt-10 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 px-10 py-4 text-xl font-bold text-black shadow-[0_0_50px_rgba(34,211,238,0.3)] transition hover:scale-105">

            Request Access

          </button>

        </div>

      </section>

      {/* ANIMATION */}
      <style jsx global>{`

        @keyframes floatParticle {

          0% {
            transform:
              translateY(0px)
              translateX(0px);
          }

          25% {
            transform:
              translateY(-20px)
              translateX(8px);
          }

          50% {
            transform:
              translateY(10px)
              translateX(-12px);
          }

          75% {
            transform:
              translateY(-10px)
              translateX(15px);
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