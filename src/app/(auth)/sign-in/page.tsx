"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";
import { api } from "@/lib/api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";



const signInSchema = z.object({
  email: z
    .string()
    .min(3, "Email is required"),

  password: z
    .string()
    .min(
      6,
      "Password must be at least 6 characters"
    ),

  rememberMe: z.boolean().optional(),
});

type SignInFormData = z.infer<
  typeof signInSchema
>;

export default function SignInPage() {

  const router = useRouter();

  const [serverError, setServerError] =
    useState("");

  // FIXED PARTICLES STATE
  const [particles, setParticles] = useState<
    {
      size: number;
      left: number;
      top: number;
      duration: number;
      delay: number;
    }[]
  >([]);

  useEffect(() => {

    const generatedParticles = Array.from(
      { length: 50 },
      () => ({
        size: Math.random() * 4 + 2,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 8 + Math.random() * 6,
        delay: Math.random() * 5,
      })
    );

    setParticles(generatedParticles);

  }, []);

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<SignInFormData>({
    resolver: zodResolver(
      signInSchema
    ),

    defaultValues: {
      rememberMe: false,
    },
  });

  async function onSubmit(
  data: SignInFormData
) {

  setServerError("");

  try {

    /* LOGIN */
    const loginResponse =
      await api.login({
        email: data.email,
        password: data.password,
      });

    console.log(
      "LOGIN RESPONSE:",
      loginResponse
    );

    /* ACCESS TOKEN */
    const accessToken =
  loginResponse?.access_token;

    const refreshToken =
  loginResponse?.refresh_token;

    /* STORE TOKENS */
    if (accessToken) {

      localStorage.setItem(
        "nanotoxi_token",
        accessToken
      );
    }

    if (refreshToken) {

      localStorage.setItem(
        "nanotoxi_refresh",
        refreshToken
      );
    }

    /* FETCH USER */
    const me =
      await api.me();

    console.log(
      "ME RESPONSE:",
      me
    );

    /* ACCESS CHECK */
    if (!me?.has_access) {

      toast.error(
        "Access not enabled"
      );

      router.push(
        "/pricing"
      );

      return;
    }

    toast.success(
      "Signed in successfully"
    );

    /* ADMIN */
    if (me?.role === "admin") {
      window.location.href = "/admin/overview";
      return;
    }

    /* NORMAL USER */
    window.location.href = "/dashboard";

  } catch (error: any) {

    console.error(
      "LOGIN ERROR:",
      error
    );

    const message =
      error?.response?.data
        ?.detail ||
      "Invalid email or password";

    toast.error(
      message
    );

    setServerError(
      message
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
        {particles.map((particle, i) => (

          <div
            key={i}
            className="absolute rounded-full bg-cyan-400 animate-float"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              opacity: 0.8,
              boxShadow: "0 0 16px #22d3ee",
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
            }}
          />

        ))}

        <style jsx>{`
          @keyframes float {

            0% {
              transform: translate(0px, 0px);
            }

            25% {
              transform: translate(40px, -60px);
            }

            50% {
              transform: translate(-30px, 50px);
            }

            75% {
              transform: translate(60px, 20px);
            }

            100% {
              transform: translate(0px, 0px);
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
        <div className="w-full rounded-[28px] border border-cyan-500/10 bg-[#061120]/90 px-6 sm:px-10 py-6 shadow-[0_0_60px_rgba(0,255,255,0.05)] backdrop-blur-2xl">

          {/* HEADER */}
          <div className="mb-7 text-center">

            <h1
              className="mb-3 text-[30px] font-bold uppercase tracking-[0.14em] text-white"
              style={{
                fontFamily: "Orbitron, sans-serif",
              }}
            >
              Welcome Back
            </h1>

            <p className="text-base text-white/40">
              Sign in to access the platform.
            </p>

          </div>

          {/* GOOGLE */}
          <button
            type="button"
            className="mb-6 flex h-11 w-full items-center justify-center gap-3 rounded-2xl border border-cyan-500/10 bg-[#081325] text-base font-semibold text-white transition-all duration-300 hover:border-cyan-400/30 hover:bg-cyan-500/10"
          >

            <span className="text-lg">G</span>

            Continue with Google

          </button>

          {/* DIVIDER */}
          <div className="mb-6 flex items-center gap-4">

            <div className="h-px flex-1 bg-white/10" />

            <span className="text-sm text-white/35">
              or continue with email
            </span>

            <div className="h-px flex-1 bg-white/10" />

          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-3"
          >

            {/* EMAIL */}
            <div>

              <Label className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-white/45">
                Email
              </Label>

              <Input
                placeholder="user@example.com"
                {...register("email")}
                className="h-11 rounded-2xl border border-cyan-500/10 bg-[#081325] px-5 text-white placeholder:text-white/25 focus:border-cyan-400/40"
              />

            </div>

            {/* PASSWORD */}
            <div>

              <div className="mb-2 flex items-center justify-between">

                <Label className="text-xs font-semibold uppercase tracking-[0.25em] text-white/45">
                  Password
                </Label>

                <button
                  type="button"
                  className="text-sm text-cyan-400 hover:text-cyan-300"
                >
                  Forgot?
                </button>

              </div>

              <Input
                type="password"
                placeholder="••••••••"
                {...register("password")}
                className="h-11 rounded-2xl border border-cyan-500/10 bg-[#081325] px-5 text-white placeholder:text-white/25 focus:border-cyan-400/40"
              />

            </div>

            {/* REMEMBER */}
            <div className="flex items-center gap-3">

              <input
                type="checkbox"
                {...register("rememberMe")}
                className="h-4 w-4 accent-cyan-400"
              />

              <Label className="text-sm text-white/55">
                Remember me
              </Label>

            </div>
            {serverError && (

              <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">

                {serverError}

              </div>

            )}
            {/* BUTTON */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-11 w-full rounded-2xl bg-cyan-400 text-base font-semibold text-black shadow-[0_0_40px_rgba(34,211,238,0.35)] transition-all duration-300 hover:bg-cyan-300"
            >

              {isSubmitting
                ? "Signing In..."
                : "Login →"}

            </Button>

          </form>

        </div>

        {/* SIGN UP */}
        <p className="mt-3 text-center text-sm text-white/35">

          Don&apos;t have an account?

          <a
            href="/sign-up"
            className="ml-2 font-semibold text-cyan-400 hover:text-cyan-300"
          >
            Sign up
          </a>

        </p>

      </div>

    </main>
  );
}