"use client";

import { SiteHeader } from "@/components/marketing/site-header";

import Link from "next/link";

import { useState } from "react";

import { usePathname } from "next/navigation";

import { motion } from "framer-motion";

import {
  Mail,
  Building2,
  User,
  MessageSquare,
} from "lucide-react";

import { useForm } from "react-hook-form";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

const contactSchema = z.object({
  name: z
    .string()
    .min(
      2,
      "Name is required"
    ),

  email: z
    .string()
    .email(
      "Invalid email"
    ),

  company: z
    .string()
    .optional(),

  message: z
    .string()
    .min(
      10,
      "Message must be at least 10 characters"
    ),
});

type ContactFormData =
  z.infer<
    typeof contactSchema
  >;

export default function ContactPage() {

  const pathname =
    usePathname();

  const [success, setSuccess] =
    useState("");

  const [error, setError] =
    useState("");

  const particles = Array.from(
    { length: 50 },
    (_, i) => ({
      id: i,
      size: (i % 4) + 3,
      top: (i * 9) % 100,
      left: (i * 13) % 100,
      duration: 12 + (i % 8),
      delay: i % 5,
    })
  );

  const {
    register,
    handleSubmit,
    reset,

    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<ContactFormData>({
    resolver:
      zodResolver(
        contactSchema
      ),
  });

  async function onSubmit(
    data: ContactFormData
  ) {

    setSuccess("");
    setError("");

    try {

      const response =
        await fetch(
          "/api/contact",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              data
            ),
          }
        );

      const result =
        await response.json();

      if (!response.ok) {

        throw new Error(
          result.error
        );
      }

      setSuccess(
        "Your message has been sent successfully."
      );

      reset();

    } catch (err) {

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong"
      );
    }
  }

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

                opacity: 0.8,

                boxShadow:
                  "0 0 22px #22d3ee",

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
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />

      {/* GLOW */}
      <div className="absolute left-[-250px] top-[-100px] h-[600px] w-[600px] rounded-full bg-cyan-500/10 blur-[160px]" />

      <div className="absolute bottom-[-200px] right-[-200px] h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[160px]" />

      

      {/* HERO */}
      <section className="relative z-10 mx-auto grid max-w-7xl gap-16 px-6 pb-24 pt-36 lg:grid-cols-2">

        {/* LEFT */}
        <motion.div
          initial={{
            opacity: 0,
            x: -40,
          }}

          animate={{
            opacity: 1,
            x: 0,
          }}

          transition={{
            duration: 0.7,
          }}
          className="flex flex-col justify-center"
        >

          <div className="mb-7 inline-flex w-fit rounded-full border border-cyan-500/20 bg-cyan-500/10 px-7 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300 backdrop-blur-xl">

            Contact NanoToxi

          </div>

          <h1
            className="text-6xl font-black uppercase leading-[0.9] md:text-[6.5rem]"
            style={{
              fontFamily:
                "Orbitron, sans-serif",
            }}
          >

            LET’S

            <br />

            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

              CONNECT

            </span>

          </h1>

          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-white/60">

            Connect with our AI research team to explore
            partnerships, enterprise access, nanotoxicity
            intelligence, and advanced biotech workflows.

          </p>

          {/* INFO */}
          <div className="mt-12 space-y-7">

            <div className="flex items-center gap-5">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10">

                <Mail className="h-7 w-7 text-cyan-400" />

              </div>

              <div>

                <p className="text-xl font-bold">

                  Email

                </p>

                <p className="text-lg text-white/60">

                  contact@nanotoxi.ai

                </p>

              </div>

            </div>

            <div className="flex items-center gap-5">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10">

                <Building2 className="h-7 w-7 text-blue-400" />

              </div>

              <div>

                <p className="text-xl font-bold">

                  Company

                </p>

                <p className="text-lg text-white/60">

                  NanoToxi AI Labs

                </p>

              </div>

            </div>

          </div>

        </motion.div>

        {/* FORM */}
        <motion.div
          initial={{
            opacity: 0,
            x: 40,
          }}

          animate={{
            opacity: 1,
            x: 0,
          }}

          transition={{
            duration: 0.7,
          }}

          className="rounded-[2.5rem] border border-cyan-500/10 bg-white/[0.03] p-10 backdrop-blur-2xl"
        >

          <form
            onSubmit={handleSubmit(
              onSubmit
            )}
            className="space-y-6"
          >

            {/* NAME */}
            <div>

              <label className="mb-3 block text-sm font-semibold uppercase tracking-[0.2em] text-white/70">

                Name

              </label>

              <div className="relative">

                <User className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />

                <input
                  type="text"

                  {...register(
                    "name"
                  )}

                  className="w-full rounded-2xl border border-white/10 bg-[#081225] px-14 py-4 text-white outline-none transition-all focus:border-cyan-400"

                  placeholder="Your Name"
                />

              </div>

              {errors.name && (

                <p className="mt-2 text-sm text-red-400">

                  {
                    errors.name
                      .message
                  }

                </p>
              )}

            </div>

            {/* EMAIL */}
            <div>

              <label className="mb-3 block text-sm font-semibold uppercase tracking-[0.2em] text-white/70">

                Email

              </label>

              <div className="relative">

                <Mail className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />

                <input
                  type="email"

                  {...register(
                    "email"
                  )}

                  className="w-full rounded-2xl border border-white/10 bg-[#081225] px-14 py-4 text-white outline-none transition-all focus:border-cyan-400"

                  placeholder="you@example.com"
                />

              </div>

              {errors.email && (

                <p className="mt-2 text-sm text-red-400">

                  {
                    errors.email
                      .message
                  }

                </p>
              )}

            </div>

            {/* COMPANY */}
            <div>

              <label className="mb-3 block text-sm font-semibold uppercase tracking-[0.2em] text-white/70">

                Company

              </label>

              <div className="relative">

                <Building2 className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />

                <input
                  type="text"

                  {...register(
                    "company"
                  )}

                  className="w-full rounded-2xl border border-white/10 bg-[#081225] px-14 py-4 text-white outline-none transition-all focus:border-cyan-400"

                  placeholder="Company Name"
                />

              </div>

            </div>

            {/* MESSAGE */}
            <div>

              <label className="mb-3 block text-sm font-semibold uppercase tracking-[0.2em] text-white/70">

                Message

              </label>

              <div className="relative">

                <MessageSquare className="absolute left-5 top-5 h-5 w-5 text-white/40" />

                <textarea
                  rows={6}

                  {...register(
                    "message"
                  )}

                  className="w-full rounded-2xl border border-white/10 bg-[#081225] px-14 py-4 text-white outline-none transition-all focus:border-cyan-400"

                  placeholder="Tell us about your project..."
                />

              </div>

              {errors.message && (

                <p className="mt-2 text-sm text-red-400">

                  {
                    errors.message
                      .message
                  }

                </p>
              )}

            </div>

            {/* SUCCESS */}
            {success && (

              <div className="rounded-2xl border border-green-500/20 bg-green-500/10 px-5 py-4 text-green-400">

                {success}

              </div>
            )}

            {/* ERROR */}
            {error && (

              <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-red-400">

                {error}

              </div>
            )}

            {/* BUTTON */}
            <button
              type="submit"

              disabled={
                isSubmitting
              }

              className="w-full rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-4 text-lg font-bold text-black shadow-[0_0_45px_rgba(34,211,238,0.25)] transition-all duration-300 hover:scale-[1.02] disabled:opacity-50"
            >

              {isSubmitting
                ? "Sending..."
                : "Send Message"}

            </button>

          </form>

        </motion.div>

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
              translateY(-20px)
              translateX(10px);
          }

          50% {
            transform:
              translateY(12px)
              translateX(-14px);
          }

          75% {
            transform:
              translateY(-10px)
              translateX(18px);
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