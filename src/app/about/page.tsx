"use client";

import { SiteHeader } from "@/components/marketing/site-header";

import Link from "next/link";

import { usePathname } from "next/navigation";

import { motion } from "framer-motion";

import Image from "next/image";

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

      {/* TEAM */}
      <section className="relative z-10 mx-auto mt-4 max-w-6xl px-6 pb-24">

        <div className="mb-14 text-center">

          <div className="mb-5 inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Leadership
          </div>

          <h2
            className="text-4xl font-black uppercase md:text-5xl"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            THE{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              TEAM
            </span>
          </h2>

        </div>

        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {[
            {
              name: "Ronith Lahoti",
              role: "CEO & Founder",
              href: "https://www.linkedin.com/in/ronithlahoti/",
              photo: "/ronith.jpeg",
              accent: "from-cyan-400 to-blue-500",
              border: "border-cyan-500/20",
              ring: "ring-cyan-400/30",
              glow: "hover:shadow-[0_0_60px_rgba(34,211,238,0.15)]",
            },
            {
              name: "Yash Wasnik",
              role: "Founding Engineer",
              href: "https://www.linkedin.com/in/yashwasnik/",
              photo: "/yash.png",
              accent: "from-violet-400 to-cyan-500",
              border: "border-violet-500/20",
              ring: "ring-violet-400/30",
              glow: "hover:shadow-[0_0_60px_rgba(139,92,246,0.15)]",
            },
            {
              name: "Dr. Swapnil Gaikwad",
              role: "Key Opinion Leader",
              href: "https://www.linkedin.com/in/dr-swapnil-c-gaikwad-87623a72",
              photo: "/swapnil.png",
              accent: "from-emerald-400 to-cyan-500",
              border: "border-emerald-500/20",
              ring: "ring-emerald-400/30",
              glow: "hover:shadow-[0_0_60px_rgba(16,185,129,0.15)]",
            },
          ].map((member, index) => (

            <motion.a
              key={member.name}
              href={member.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`group flex flex-col items-center rounded-[2rem] border ${member.border} bg-white/[0.03] p-10 text-center backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 ${member.glow}`}
            >

              {/* AVATAR */}
              <div className={`mb-6 h-24 w-24 overflow-hidden rounded-full ring-2 ${member.ring} shadow-lg`}>
                <Image
                  src={member.photo}
                  alt={member.name}
                  width={96}
                  height={96}
                  className="h-full w-full object-cover object-top"
                />
              </div>

              <h3
                className="text-2xl font-black"
                style={{ fontFamily: "Orbitron, sans-serif" }}
              >
                {member.name}
              </h3>

              <p className={`mt-2 text-sm font-semibold uppercase tracking-[0.2em] bg-gradient-to-r ${member.accent} bg-clip-text text-transparent`}>
                {member.role}
              </p>

              {/* LINKEDIN BADGE */}
              <div className={`mt-6 inline-flex items-center gap-2 rounded-full border ${member.border} px-4 py-1.5 text-xs font-semibold text-white/50 transition-all duration-300 group-hover:text-white/80`}>
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </div>

            </motion.a>
          ))}

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