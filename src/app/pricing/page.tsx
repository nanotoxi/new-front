"use client";

import { SiteHeader } from "@/components/marketing/site-header";

import React from "react";

import Link from "next/link";

import { usePathname } from "next/navigation";

import { motion } from "framer-motion";

import {
  Check,
  X,
  Sparkles,
} from "lucide-react";

const pricingPlans = [
  {
    name: "Starter",
    price: "$29",
    description:
      "Perfect for individual researchers and academic projects.",
    features: [
      "100 toxicity predictions",
      "Basic AI analytics",
      "Community support",
      "CSV export",
    ],
    popular: false,
  },

  {
    name: "Professional",
    price: "$99",
    description:
      "Advanced AI workflows for biotech teams and startups.",
    features: [
      "Unlimited predictions",
      "Advanced analytics",
      "Priority support",
      "API access",
      "Model benchmarking",
    ],
    popular: true,
  },

  {
    name: "Enterprise",
    price: "Custom",
    description:
      "Enterprise-scale nanotoxicity intelligence platform.",
    features: [
      "Custom AI models",
      "Dedicated infrastructure",
      "24/7 support",
      "Private deployment",
      "Advanced compliance",
    ],
    popular: false,
  },
];

const comparisonFeatures = [
  {
    feature: "Toxicity Predictions",
    starter: true,
    pro: true,
    enterprise: true,
  },

  {
    feature: "AI Analytics",
    starter: true,
    pro: true,
    enterprise: true,
  },

  {
    feature: "API Access",
    starter: false,
    pro: true,
    enterprise: true,
  },

  {
    feature: "Custom AI Models",
    starter: false,
    pro: false,
    enterprise: true,
  },

  {
    feature: "Private Deployment",
    starter: false,
    pro: false,
    enterprise: true,
  },

  {
    feature: "Priority Support",
    starter: false,
    pro: true,
    enterprise: true,
  },
];

export default function PricingPage() {

  const pathname =
    usePathname();

  const particles = Array.from(
    { length: 70 },
    (_, i) => ({
      id: i,
      size: (i % 5) + 2,
      top: (i * 13) % 100,
      left: (i * 17) % 100,
      duration: 18 + (i % 10),
      delay: (i % 6),
    })
  );

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
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                top: `${particle.top}%`,
                left: `${particle.left}%`,
                opacity: 0.8,
                boxShadow:
                  "0 0 25px #22d3ee",
                animation: `floatParticle ${particle.duration}s ease-in-out infinite`,
                animationDelay: `${particle.delay}s`,
              }}
            />

          )
        )}

      </div>

      {/* GRID */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />

      {/* GLOWS */}
      <div className="absolute left-[-250px] top-[-100px] h-[600px] w-[600px] rounded-full bg-cyan-500/10 blur-[160px]" />

      <div className="absolute bottom-[-200px] right-[-200px] h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[160px]" />

      {/* HERO */}
      <section className="relative z-10 mx-auto flex min-h-[90vh] max-w-6xl flex-col items-center justify-center px-6 md:px-10 lg:px-8 pb-20 pt-20 md:pt-24 lg:pt-28 text-center">

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

          className="mb-6 flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-[10px] font-semibold tracking-[0.25em] text-cyan-300 backdrop-blur-xl sm:px-8 sm:py-3 sm:text-sm"
        >

          <Sparkles className="h-4 w-4" />

          FLEXIBLE AI PRICING

        </motion.div>

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

          className="
            max-w-6xl
            text-5xl
            font-black
            uppercase
            leading-[0.9]
            tracking-tight
            sm:text-6xl
            md:text-6xl
            lg:text-8xl
            xl:text-[110px]
          "
          style={{
            fontFamily:
              "Orbitron, sans-serif",
          }}
        >

          NANOTOXI
          <br />

          <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent">

            PRICING

          </span>

        </motion.h1>

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

          className="mt-8 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg md:text-xl lg:max-w-3xl lg:text-2xl lg:leading-10"
        >

          Scale nanotoxicity prediction workflows
          with enterprise-grade AI,
          advanced analytics,
          and flexible infrastructure
          designed for modern biotech teams.

        </motion.p>

      </section>

      {/* PRICING CARDS */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24">

        <div className="grid gap-8 lg:grid-cols-3">

          {pricingPlans.map(
            (
              plan,
              index
            ) => (

              <motion.div
                key={plan.name}

                initial={{
                  opacity: 0,
                  y: 40,
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

                className={`group relative overflow-hidden rounded-[2rem] border p-8 lg:p-10 backdrop-blur-2xl transition-all duration-500 hover:-translate-y-3 ${
                  plan.popular
                    ? "border-cyan-400/40 bg-cyan-500/10 shadow-[0_0_80px_rgba(34,211,238,0.20)]"
                    : "border-white/10 bg-[#04112a]/80 hover:border-cyan-400/20"
                }`}
              >

                {plan.popular && (

                  <div className="absolute right-4 top-4 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-1 text-[10px] font-bold text-black sm:text-xs">

                    MOST POPULAR

                  </div>
                )}

                <div className="relative z-10 flex h-full flex-col">

                  <h2
                    className="text-3xl font-black uppercase lg:text-4xl"
                    style={{
                      fontFamily:
                        "Orbitron, sans-serif",
                    }}
                  >

                    {plan.name}

                  </h2>

                  <div className="mt-6 flex items-end gap-2">

                    <span className="text-5xl font-black lg:text-6xl">

                      {plan.price}

                    </span>

                    {plan.price !==
                      "Custom" && (

                      <span className="mb-1 text-slate-400">

                        /month

                      </span>
                    )}

                  </div>

                  <p className="mt-5 leading-relaxed text-slate-400">

                    {plan.description}

                  </p>

                  <div className="mt-8 flex-1 space-y-4">

                    {plan.features.map(
                      (feature) => (

                        <div
                          key={feature}
                          className="flex items-center gap-3"
                        >

                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500/20">

                            <Check className="h-4 w-4 text-cyan-400" />

                          </div>

                          <span className="text-sm">

                            {feature}

                          </span>

                        </div>
                      )
                    )}

                  </div>

                  <div className="mt-10">

                    <Link href="/sign-up">

                      <button
                        className={`min-h-[48px] w-full rounded-2xl px-6 py-3 font-semibold transition-all duration-300 ${
                          plan.popular
                            ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-black shadow-[0_0_35px_rgba(34,211,238,0.3)] hover:scale-[1.02]"
                            : "border border-white/10 bg-white/5 text-white hover:border-cyan-400 hover:bg-cyan-500/10"
                        }`}
                      >

                        Get Started

                      </button>

                    </Link>

                  </div>

                </div>

              </motion.div>
            )
          )}

        </div>

      </section>

      {/* COMPARISON */}
      <section className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-32">

        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#04112a]/80 backdrop-blur-2xl">

          <div className="border-b border-white/10 p-6 lg:p-8">

            <h2
              className="text-3xl font-black uppercase lg:text-4xl"
              style={{
                fontFamily:
                  "Orbitron, sans-serif",
              }}
            >

              Feature Comparison

            </h2>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full min-w-[700px]">

              <tbody>

                {comparisonFeatures.map(
                  (item) => (

                    <tr
                      key={item.feature}
                      className="border-b border-white/5"
                    >

                      <td className="px-4 py-5 font-medium lg:px-8">

                        {item.feature}

                      </td>

                      {[item.starter,
                        item.pro,
                        item.enterprise,
                      ].map(
                        (
                          value,
                          idx
                        ) => (

                          <td
                            key={idx}
                            className="px-4 py-5 lg:px-8"
                          >

                            <div className="flex justify-center">

                              {value ? (

                                <Check className="h-5 w-5 text-cyan-400" />

                              ) : (

                                <X className="h-5 w-5 text-red-400" />

                              )}

                            </div>

                          </td>
                        )
                      )}

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>

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
              translateX(12px);
          }

          50% {
            transform:
              translateY(15px)
              translateX(-18px);
          }

          75% {
            transform:
              translateY(-12px)
              translateX(20px);
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