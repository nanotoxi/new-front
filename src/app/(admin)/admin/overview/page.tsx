"use client";

import {
  Activity,
  AlertTriangle,
  BrainCircuit,
  ShieldCheck,
  Users,
} from "lucide-react";

import {
  useTheme,
} from "@/context/theme-context";

import {
  useEffect,
  useState,
} from "react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import {
  getAdminStats,
  getSystemHealth,
  getAdminOverview,
} from "@/lib/admin-api";

export default function OverviewPage() {

  const { theme } =
    useTheme();

  const dark =
    theme === "dark";

  const [loading, setLoading] =
    useState(true);

  const [stats, setStats] =
    useState<any>(null);

  const [health, setHealth] =
    useState<any>(null);

  const [overviewData, setOverviewData] =
    useState<any>(null);

  const fetchOverview =
    async () => {

      try {

        setLoading(true);

        const [
          statsRes,
          healthRes,
          overviewRes,
        ] = await Promise.all([
          getAdminStats(),
          getSystemHealth(),
          getAdminOverview(),
        ]);

        console.log(
          "ADMIN STATS:",
          statsRes
        );

        console.log(
          "SYSTEM HEALTH:",
          healthRes
        );

        console.log(
          "OVERVIEW DATA:",
          overviewRes
        );

        setStats(
          statsRes
        );

        setHealth(
          healthRes
        );

        setOverviewData(
          overviewRes
        );

      } catch (err) {

        console.error(
          "OVERVIEW ERROR:",
          err
        );

      } finally {

        setLoading(false);
      }
    };

  useEffect(() => {

    fetchOverview();

  }, []);

  if (loading) {

    return (

      <div className="flex min-h-[60vh] items-center justify-center">

        <div className="h-12 w-12 animate-spin rounded-full border-4 border-cyan-400 border-t-transparent" />

      </div>
    );
  }

  const chartData =
    overviewData?.daily_predictions || [];

  const statCards = [
    {
      icon: Activity,
      title: "Total Predictions",

      value:
        stats?.predictions?.total || 0,

      bg: "bg-cyan-500/10",

      iconColor:
        "text-cyan-500",

      badge: `+${
        stats?.predictions?.today || 0
      } today`,

      badgeBg:
        "bg-green-100 text-green-700",
    },

    {
      icon: Users,
      title: "Active Users",

      value:
        stats?.users?.total || 0,

      bg: "bg-violet-500/10",

      iconColor:
        "text-violet-500",

      badge: `${
        stats?.users?.active_subscribers || 0
      } Pro`,

      badgeBg:
        "bg-violet-100 text-violet-700",
    },

    {
      icon: AlertTriangle,
      title: "Bulk Jobs",

      value:
        stats?.bulk_jobs?.total || 0,

      bg: "bg-red-500/10",

      iconColor:
        "text-red-500",

      badge: "Live",

      badgeBg:
        "bg-red-100 text-red-700",
    },

    {
      icon: ShieldCheck,
      title: "Verified Users",

      value:
        stats?.users?.verified || 0,

      bg: "bg-emerald-500/10",

      iconColor:
        "text-emerald-500",

      badge: "Stable",

      badgeBg:
        "bg-emerald-100 text-emerald-700",
    },
  ];

  return (

    <div className="space-y-8 overflow-x-hidden">

      {/* HERO */}

      <div
        className={`
          rounded-3xl
          border
          p-4
          md:p-6
          xl:p-8
          shadow-sm
          transition-all
          duration-300
          overflow-hidden
          ${
            dark
              ? "border-white/10 bg-[#0F172A]"
              : "border-slate-200 bg-white"
          }
        `}
      >

        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

          <div className="min-w-0">

            <div className="mb-4 inline-flex max-w-full rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-400">

              AI Infrastructure Operational

            </div>

            <h1
              className={`
                text-3xl
                md:text-5xl
                font-black
                tracking-tight
                break-words
                ${
                  dark
                    ? "text-white"
                    : "text-slate-900"
                }
              `}
            >

              NanoToxi Overview

            </h1>

            <p
              className={`
                mt-4
                max-w-3xl
                text-base
                md:text-lg
                leading-relaxed
                ${
                  dark
                    ? "text-slate-400"
                    : "text-slate-500"
                }
              `}
            >

              Monitor prediction pipelines,
              toxicity analytics, datasets,
              AI models, and infrastructure
              performance across the platform.

            </p>

          </div>

          <div
            className={`
              hidden
              shrink-0
              rounded-3xl
              p-6
              lg:flex
              ${
                dark
                  ? "bg-cyan-500/10"
                  : "bg-cyan-50"
              }
            `}
          >

            <BrainCircuit className="h-16 w-16 xl:h-20 xl:w-20 text-cyan-500" />

          </div>

        </div>

      </div>

      {/* STATS */}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">

        {statCards.map(
          (
            item,
            i
          ) => {

            const Icon =
              item.icon;

            return (

              <div
                key={i}
                className={`
                  rounded-3xl
                  border
                  p-4
                  md:p-6
                  shadow-sm
                  transition-all
                  duration-300
                  overflow-hidden
                  ${
                    dark
                      ? "border-white/10 bg-[#0F172A]"
                      : "border-slate-200 bg-white"
                  }
                `}
              >

                <div className="flex flex-wrap items-center justify-between gap-4">

                  <div
                    className={`rounded-2xl p-4 ${item.bg}`}
                  >

                    <Icon
                      className={`h-6 w-6 ${item.iconColor}`}
                    />

                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap ${item.badgeBg}`}
                  >

                    {item.badge}

                  </span>

                </div>

                <p
                  className={`
                    mt-6
                    text-sm
                    font-medium
                    ${
                      dark
                        ? "text-slate-400"
                        : "text-slate-500"
                    }
                  `}
                >

                  {item.title}

                </p>

                <h2
                  className={`
                    mt-2
                    text-3xl
                    md:text-4xl
                    font-black
                    break-words
                    ${
                      dark
                        ? "text-white"
                        : "text-slate-900"
                    }
                  `}
                >

                  {item.value}

                </h2>

              </div>
            );
          }
        )}

      </div>

      {/* GRAPH + HEALTH */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        {/* GRAPH */}

        <div
          className={`
            rounded-3xl
            border
            p-4
            md:p-6
            shadow-sm
            overflow-hidden
            xl:col-span-2
            ${
              dark
                ? "border-white/10 bg-[#0F172A]"
                : "border-slate-200 bg-white"
            }
          `}
        >

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <div className="min-w-0">

              <h2
                className={`text-2xl font-black break-words ${
                  dark
                    ? "text-white"
                    : "text-slate-900"
                }`}
              >

                Prediction Activity

              </h2>

              <p
                className={`mt-1 ${
                  dark
                    ? "text-slate-400"
                    : "text-slate-500"
                }`}
              >

                Weekly AI prediction analytics

              </p>

            </div>

            <div className="w-fit rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-400">

              Live Analytics

            </div>

          </div>

          <div className="mt-8 h-[250px] md:h-[320px] w-full min-w-0 overflow-hidden">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <AreaChart
                data={chartData}
              >

                <defs>

                  <linearGradient
                    id="colorPredictions"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >

                    <stop
                      offset="5%"
                      stopColor="#22d3ee"
                      stopOpacity={0.4}
                    />

                    <stop
                      offset="95%"
                      stopColor="#22d3ee"
                      stopOpacity={0}
                    />

                  </linearGradient>

                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.06)"
                />

                <XAxis
                  dataKey="date"
                  stroke="#64748b"
                />

                <YAxis
                  stroke="#64748b"
                />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="total"
                  stroke="#22d3ee"
                  fillOpacity={1}
                  fill="url(#colorPredictions)"
                />

              </AreaChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* SYSTEM HEALTH */}

        <div className="space-y-6">

          <div
            className={`
              rounded-3xl
              border
              p-4
              md:p-6
              shadow-sm
              overflow-hidden
              ${
                dark
                  ? "border-white/10 bg-[#0F172A]"
                  : "border-slate-200 bg-white"
              }
            `}
          >

            <h2
              className={`text-2xl font-black ${
                dark
                  ? "text-white"
                  : "text-slate-900"
              }`}
            >

              System Health

            </h2>

            <div className="mt-6 space-y-5">

              {[
                {
                  label: "Database",
                  status:
                    health?.database
                      ?.status,
                },

                {
                  label: "Redis",
                  status:
                    health?.redis
                      ?.status,
                },

                {
                  label: "Environment",
                  status:
                    health?.environment,
                },

                {
                  label: "Disk Usage",
                  status:
                    `${health?.disk?.percent_used || 0}%`,
                },
              ].map((item) => (

                <div
                  key={item.label}
                  className="flex items-center justify-between gap-4"
                >

                  <span
                    className={`break-words ${
                      dark
                        ? "text-slate-400"
                        : "text-slate-600"
                    }`}
                  >

                    {item.label}

                  </span>

                  <div className="flex shrink-0 items-center gap-2">

                    <div className="h-2 w-2 rounded-full bg-green-500" />

                    <span className="text-sm font-semibold text-green-500 whitespace-nowrap">

                      {item.status || "ok"}

                    </span>

                  </div>

                </div>
              ))}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}