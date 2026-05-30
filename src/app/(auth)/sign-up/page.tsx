"use client";

import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

const signUpSchema = z.object({
  name: z
    .string()
    .min(2, "Name is required"),

  email: z
    .string()
    .email("Enter a valid email"),

  company: z
    .string()
    .min(
      2,
      "Company name is required"
    ),
});

type SignUpFormData = z.infer<
  typeof signUpSchema
>;

export default function SignUpPage() {

  const [submitted, setSubmitted] =
    useState(false);

  // MOVING PARTICLES
  const [particles, setParticles] =
    useState<
      {
        size: number;
        left: number;
        top: number;
        duration: number;
        delay: number;
      }[]
    >([]);

  useEffect(() => {

    const generatedParticles =
      Array.from(
        { length: 50 },
        () => ({
          size:
            Math.random() * 4 + 2,

          left:
            Math.random() * 100,

          top:
            Math.random() * 100,

          duration:
            8 +
            Math.random() * 6,

          delay:
            Math.random() * 5,
        })
      );

    setParticles(
      generatedParticles
    );

  }, []);

  const {
    register,
    handleSubmit,
    reset,

    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(
      signUpSchema
    ),
  });

  async function onSubmit(
  data: SignUpFormData
) {

  try {

    console.log(
      "SIGNUP DATA:",
      data
    );

   const payload = {
  name: data.name,

  email: data.email,

  company: data.company,

  password: data.password,
};

    console.log(
      "SIGNUP PAYLOAD:",
      payload
    );

    const response =
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/signup`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            payload
          ),
        }
      );

    const result =
      await response.json();

    console.log(
      "FULL BACKEND RESPONSE:",
      result
    );

    console.log(
      "RESULT TYPE:",
      typeof result,
      result
    );

    if (!response.ok) {

      throw new Error(
        typeof result?.detail === "string"
          ? result.detail

          : typeof result?.message === "string"
          ? result.message

          : typeof result?.error === "string"
          ? result.error

          : JSON.stringify(result)
      );
    }

    toast.success(
      "Request submitted successfully!"
    );

    setSubmitted(true);

    reset();

  } catch (error: any) {

    console.error(
      "SIGNUP ERROR:",
      error
    );

    toast.error(
      error?.message ||
      "Failed to request access"
    );
  }
}
  return (

    <main className="relative flex h-screen w-screen items-center justify-center overflow-hidden bg-[#020617]">

      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden">

        {/* LEFT GLOW */}
        <div className="absolute left-[-250px] top-[-150px] h-[650px] w-[650px] rounded-full bg-cyan-500/10 blur-[160px]" />

        {/* RIGHT GLOW */}
        <div className="absolute bottom-[-200px] right-[-250px] h-[650px] w-[650px] rounded-full bg-blue-500/10 blur-[160px]" />

        {/* CENTER SOFT LIGHT */}
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/[0.03] blur-[140px]" />

        {/* MOVING PARTICLES */}
        {particles.map(
          (
            particle,
            i
          ) => (

            <div
              key={i}
              className="absolute rounded-full bg-cyan-400 animate-float"
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                opacity: 0.8,
                boxShadow:
                  "0 0 16px #22d3ee",
                animationDuration: `${particle.duration}s`,
                animationDelay: `${particle.delay}s`,
              }}
            />

          )
        )}

        <style jsx>{`
          @keyframes float {

            0% {
              transform: translate(
                0px,
                0px
              );
            }

            25% {
              transform: translate(
                40px,
                -60px
              );
            }

            50% {
              transform: translate(
                -30px,
                50px
              );
            }

            75% {
              transform: translate(
                60px,
                20px
              );
            }

            100% {
              transform: translate(
                0px,
                0px
              );
            }
          }

          .animate-float {
            animation-name: float;
            animation-timing-function: ease-in-out;
            animation-iteration-count: infinite;
          }
        `}</style>

      </div>

      {/* CENTER CONTENT */}
      <div className="relative z-10 flex w-full max-w-[445px] flex-col items-center px-4 sm:px-0">

        {/* CARD */}
        <div className="w-full rounded-[28px] border border-cyan-500/10 bg-[#061120]/90 px-6 sm:px-10 py-7 shadow-[0_0_60px_rgba(0,255,255,0.05)] backdrop-blur-2xl">

          {/* HEADER */}
          <div className="mb-7 text-center">

            <h1
              className="mb-3 text-[30px] font-bold uppercase tracking-[0.14em] text-white"
              style={{
                fontFamily:
                  "Orbitron, sans-serif",
              }}
            >
              Request Access
            </h1>

            <p className="text-base text-white/40">
              Join the NanoToxi AI waitlist
            </p>

          </div>

          {submitted ? (

            <div className="space-y-5 text-center">

              <div className="text-5xl">
                🎉
              </div>

              <h2 className="text-2xl font-bold text-white">
                We&apos;ll be in touch
              </h2>

              <p className="text-white/45">
                Thanks for your
                interest in NanoToxi AI.
              </p>

            </div>

          ) : (

            <form
              onSubmit={handleSubmit(
                onSubmit
              )}
              className="space-y-4"
            >

              {/* NAME */}
              <div>

                <Label className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-white/45">

                  Full Name

                </Label>

                <Input
                  placeholder="Enter your name"
                  {...register("name")}
                  className="h-11 rounded-2xl border border-cyan-500/10 bg-[#081325] px-5 text-white placeholder:text-white/25 focus:border-cyan-400/40"
                />

                {errors.name && (

                  <p className="mt-1 text-sm text-red-400">

                    {
                      errors.name
                        .message
                    }

                  </p>

                )}

              </div>

              {/* EMAIL */}
              <div>

                <Label className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-white/45">

                  Email

                </Label>

                <Input
                  type="email"
                  placeholder="Enter your email"
                  {...register(
                    "email"
                  )}
                  className="h-11 rounded-2xl border border-cyan-500/10 bg-[#081325] px-5 text-white placeholder:text-white/25 focus:border-cyan-400/40"
                />

                {errors.email && (

                  <p className="mt-1 text-sm text-red-400">

                    {
                      errors.email
                        .message
                    }

                  </p>

                )}

              </div>

              {/* COMPANY */}
              <div>

                <Label className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-white/45">

                  Company

                </Label>

                <Input
                  placeholder="Enter company name"
                  {...register(
                    "company"
                  )}
                  className="h-11 rounded-2xl border border-cyan-500/10 bg-[#081325] px-5 text-white placeholder:text-white/25 focus:border-cyan-400/40"
                />

                {errors.company && (

                  <p className="mt-1 text-sm text-red-400">

                    {
                      errors.company
                        .message
                    }

                  </p>

                )}

              </div>

              {/* BUTTON */}
              <Button
                type="submit"
                disabled={
                  isSubmitting
                }
                className="mt-2 h-11 w-full rounded-2xl bg-cyan-400 text-base font-semibold text-black shadow-[0_0_40px_rgba(34,211,238,0.35)] transition-all duration-300 hover:bg-cyan-300"
              >

                {isSubmitting
                  ? "Submitting..."
                  : "Request Access"}

              </Button>

            </form>

          )}

        </div>

        {/* SIGN IN */}
        <p className="mt-4 text-center text-sm text-white/35">

          Already have an account?

          <a
            href="/sign-in"
            className="ml-2 font-semibold text-cyan-400 hover:text-cyan-300"
          >
            Sign in
          </a>

        </p>

      </div>

    </main>
  );
}