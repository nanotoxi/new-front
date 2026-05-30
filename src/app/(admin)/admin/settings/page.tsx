"use client";

import { useEffect, useState } from "react";

import {
  ShieldCheck,
  Bell,
  Activity,
  Globe,
  Lock,
  Loader2,
} from "lucide-react";

import {
  useTheme,
} from "@/context/theme-context";

import {
  getAdminSettings,
} from "@/lib/admin-api";

export default function AdminSettingsPage() {

  const {
    theme,
  } = useTheme();

  const dark =
    theme === "dark";

  const [loading, setLoading] =
    useState(true);

  const [signupsEnabled, setSignupsEnabled] =
    useState(true);

  const [jwtExpiry, setJwtExpiry] =
    useState(60);

  const [rateLimit, setRateLimit] =
    useState(100);

  const [webhookUrl, setWebhookUrl] =
    useState("");

  useEffect(() => {

    fetchSettings();

  }, []);

  const fetchSettings =
    async () => {

      try {

        const data =
          await getAdminSettings();

        console.log(
          "SETTINGS:",
          data
        );

        const settings =
          data?.settings || data;

        setSignupsEnabled(
          settings?.signups_enabled ??
          true
        );

        setJwtExpiry(
          settings?.jwt_expiry ??
          60
        );

        setRateLimit(
          settings?.rate_limit ??
          100
        );

        setWebhookUrl(
          settings?.webhook_url ??
          ""
        );

      } catch (error) {

        console.error(
          "SETTINGS ERROR:",
          error
        );

      } finally {

        setLoading(false);

      }
    };

  if (loading) {

    return (

      <div className="flex h-[70vh] items-center justify-center">

        <Loader2 className="h-10 w-10 animate-spin text-cyan-500" />

      </div>
    );
  }

  return (

    <div className="space-y-8">

      {/* HERO */}
      <div
        className={`rounded-3xl border p-8 shadow-sm transition-all duration-300 ${
          dark
            ? "border-white/10 bg-[#0F172A]"
            : "border-slate-200 bg-white"
        }`}
      >

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <div className="mb-4 inline-flex rounded-full bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-700">

              System Configuration

            </div>

            <h1
              className={`text-5xl font-black tracking-tight ${
                dark
                  ? "text-white"
                  : "text-slate-900"
              }`}
            >

              Admin Settings

            </h1>

            <p
              className={`mt-4 max-w-3xl text-lg ${
                dark
                  ? "text-slate-400"
                  : "text-slate-500"
              }`}
            >

              Configure authentication,
              security limits,
              platform access,
              and monitoring integrations.

            </p>

          </div>

          <div
            className={`hidden rounded-3xl p-5 lg:flex ${
              dark
                ? "bg-cyan-500/10"
                : "bg-cyan-50"
            }`}
          >

            <ShieldCheck className="h-16 w-16 text-cyan-500" />

          </div>

        </div>

      </div>

      {/* STATS */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <StatsCard
          dark={dark}
          title="Security"
          value="Protected"
          icon={
            <Lock className="h-6 w-6 text-emerald-500" />
          }
          iconBg={
            dark
              ? "bg-emerald-500/10"
              : "bg-emerald-50"
          }
        />

        <StatsCard
          dark={dark}
          title="API Status"
          value="Operational"
          icon={
            <Activity className="h-6 w-6 text-cyan-500" />
          }
          iconBg={
            dark
              ? "bg-cyan-500/10"
              : "bg-cyan-50"
          }
        />

        <StatsCard
          dark={dark}
          title="Webhook Events"
          value="124"
          icon={
            <Bell className="h-6 w-6 text-violet-500" />
          }
          iconBg={
            dark
              ? "bg-violet-500/10"
              : "bg-violet-50"
          }
        />

        <StatsCard
          dark={dark}
          title="Global Access"
          value={
            signupsEnabled
              ? "Enabled"
              : "Disabled"
          }
          icon={
            <Globe className="h-6 w-6 text-yellow-500" />
          }
          iconBg={
            dark
              ? "bg-yellow-500/10"
              : "bg-yellow-50"
          }
        />

      </div>

      {/* SETTINGS */}
      <div
        className={`rounded-3xl border p-8 shadow-sm transition-all duration-300 ${
          dark
            ? "border-white/10 bg-[#0F172A]"
            : "border-slate-200 bg-white"
        }`}
      >

        <div className="mb-8">

          <h2
            className={`text-3xl font-black ${
              dark
                ? "text-white"
                : "text-slate-900"
            }`}
          >

            Platform Controls

          </h2>

          <p
            className={`mt-2 ${
              dark
                ? "text-slate-400"
                : "text-slate-500"
            }`}
          >

            Manage platform access and backend security configurations.

          </p>

        </div>

        <div className="space-y-8">

          {/* ENABLE SIGNUPS */}
          <div
            className={`flex flex-col gap-5 rounded-2xl border p-6 lg:flex-row lg:items-center lg:justify-between ${
              dark
                ? "border-white/10 bg-[#020817]"
                : "border-slate-200 bg-white"
            }`}
          >

            <div>

              <h3
                className={`text-xl font-bold ${
                  dark
                    ? "text-white"
                    : "text-slate-900"
                }`}
              >

                Enable Signups

              </h3>

              <p
                className={`mt-2 max-w-2xl ${
                  dark
                    ? "text-slate-400"
                    : "text-slate-500"
                }`}
              >

                Allow new users to register
                and create accounts on the platform.

              </p>

            </div>

            <button
              onClick={() =>
                setSignupsEnabled(!signupsEnabled)
              }
              className={`relative h-8 w-16 rounded-full transition-all duration-300 ${
                signupsEnabled
                  ? "bg-emerald-500"
                  : "bg-slate-300"
              }`}
            >

              <div
                className={`absolute top-1 h-6 w-6 rounded-full bg-white transition-all duration-300 ${
                  signupsEnabled
                    ? "left-9"
                    : "left-1"
                }`}
              />

            </button>

          </div>

          {/* JWT */}
          <div
            className={`rounded-2xl border p-6 ${
              dark
                ? "border-white/10 bg-[#020817]"
                : "border-slate-200 bg-white"
            }`}
          >

            <div className="mb-4">

              <h3
                className={`text-xl font-bold ${
                  dark
                    ? "text-white"
                    : "text-slate-900"
                }`}
              >

                Default JWT Expiry

              </h3>

            </div>

            <input
              type="number"
              value={jwtExpiry}
              onChange={(e) =>
                setJwtExpiry(
                  Number(e.target.value)
                )
              }
              className={`w-full rounded-2xl border px-5 py-4 text-lg font-semibold outline-none transition focus:border-cyan-400 ${
                dark
                  ? "border-white/10 bg-[#0F172A] text-white"
                  : "border-slate-200 bg-slate-50 text-slate-900"
              }`}
            />

          </div>

          {/* RATE LIMIT */}
          <div
            className={`rounded-2xl border p-6 ${
              dark
                ? "border-white/10 bg-[#020817]"
                : "border-slate-200 bg-white"
            }`}
          >

            <div className="mb-4">

              <h3
                className={`text-xl font-bold ${
                  dark
                    ? "text-white"
                    : "text-slate-900"
                }`}
              >

                Rate Limit Per User

              </h3>

            </div>

            <input
              type="number"
              value={rateLimit}
              onChange={(e) =>
                setRateLimit(
                  Number(e.target.value)
                )
              }
              className={`w-full rounded-2xl border px-5 py-4 text-lg font-semibold outline-none transition focus:border-cyan-400 ${
                dark
                  ? "border-white/10 bg-[#0F172A] text-white"
                  : "border-slate-200 bg-slate-50 text-slate-900"
              }`}
            />

          </div>

          {/* WEBHOOK */}
          <div
            className={`rounded-2xl border p-6 ${
              dark
                ? "border-white/10 bg-[#020817]"
                : "border-slate-200 bg-white"
            }`}
          >

            <div className="mb-4">

              <h3
                className={`text-xl font-bold ${
                  dark
                    ? "text-white"
                    : "text-slate-900"
                }`}
              >

                Webhook URLs

              </h3>

            </div>

            <textarea
              value={webhookUrl}
              onChange={(e) =>
                setWebhookUrl(
                  e.target.value
                )
              }
              placeholder="https://example.com/webhook"
              className={`min-h-[140px] w-full rounded-2xl border p-5 outline-none transition focus:border-cyan-400 ${
                dark
                  ? "border-white/10 bg-[#0F172A] text-white placeholder:text-slate-500"
                  : "border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400"
              }`}
            />

          </div>

        </div>

      </div>

    </div>
  );
}

function StatsCard({
  title,
  value,
  icon,
  iconBg,
  dark,
}: any) {

  return (

    <div
      className={`rounded-3xl border p-6 shadow-sm transition-all duration-300 ${
        dark
          ? "border-white/10 bg-[#0F172A]"
          : "border-slate-200 bg-white"
      }`}
    >

      <div className={`inline-flex rounded-2xl ${iconBg} p-4`}>

        {icon}

      </div>

      <p
        className={`mt-6 text-sm ${
          dark
            ? "text-slate-400"
            : "text-slate-500"
        }`}
      >

        {title}

      </p>

      <h2
        className={`mt-2 text-3xl font-black ${
          dark
            ? "text-white"
            : "text-slate-900"
        }`}
      >

        {value}

      </h2>

    </div>
  );
}