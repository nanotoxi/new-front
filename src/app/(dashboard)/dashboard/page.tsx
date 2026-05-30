"use client";

import {
  useEffect,
  useState,
} from "react";

import { api } from "@/lib/api";

import {
  Activity,
  AlertTriangle,
  Database,
  FlaskConical,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function DashboardPage() {

  const [stats, setStats] =
    useState<any>(null);

  const [
    recentPredictions,
    setRecentPredictions,
  ] = useState<any[]>([]);

  const [
    trendData,
    setTrendData,
  ] = useState<any[]>([]);

  const [
    toxicityData,
    setToxicityData,
  ] = useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function loadDashboard() {

      try {

        setLoading(true);

        const [
          statsResponse,
          recentResponse,
          trendResponse,
          toxicityResponse,
        ] = await Promise.all([

          api.dashboardStats(),

          api.recentPredictions(),

          api.predictionsOverTime(
            30
          ),

          api.toxicityDistribution(),
        ]);

        console.log(
          "Dashboard Stats:",
          statsResponse
        );

        console.log(
          "Recent Predictions:",
          recentResponse
        );

        console.log(
          "Trend Response:",
          trendResponse
        );

        console.log(
          "Toxicity Distribution:",
          toxicityResponse
        );

        setStats(
          statsResponse
        );

        setRecentPredictions(

          recentResponse.predictions ||
          recentResponse ||
          []

        );

        setTrendData(
          trendResponse.series || []
        );

        setToxicityData([
          {
            name: "Toxic",

            value:
              toxicityResponse.toxic_pct,
          },

          {
            name:
              "Non-Toxic",

            value:
              toxicityResponse.nontoxic_pct,
          },
        ]);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);
      }
    }

    loadDashboard();

  }, []);

  if (loading || !stats) {

    return (

      <div className="flex h-[60vh] items-center justify-center">

        <div className="text-xl text-cyan-300">

          Loading dashboard...

        </div>

      </div>
    );
  }

  return (

    <div className="space-y-7">

      {/* HERO */}
      <section className="relative overflow-hidden rounded-[32px] border border-cyan-500/10 bg-[#071120]/80 p-10 backdrop-blur-xl">

        <div className="absolute right-[-120px] top-[-120px] h-[260px] w-[260px] rounded-full bg-cyan-500/10 blur-[120px]" />

        <div className="relative z-10 flex items-center justify-between">

          <div>

            <div className="mb-4 flex items-center gap-3">

              <div className="rounded-2xl bg-cyan-500/10 p-3">

                <Sparkles className="h-7 w-7 text-cyan-400" />

              </div>

              <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1 text-sm text-cyan-300">

                AI System Online

              </span>

            </div>

            <h1 className="mb-3 text-4xl font-black text-white">

              NanoToxi AI Dashboard

            </h1>

            <p className="max-w-2xl text-lg text-white/55">

              AI-powered nanoparticle toxicity prediction and
              scientific intelligence platform for advanced
              nanomedicine workflows.

            </p>

          </div>

          <div className="hidden xl:flex">

            <div className="flex h-[180px] w-[180px] items-center justify-center rounded-full border border-cyan-500/20 bg-cyan-500/5">

              <div className="flex h-[120px] w-[120px] items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/10">

                <FlaskConical className="h-16 w-16 text-cyan-400" />

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* STATS */}
      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">

        {[
          {
            title:
              "Total Predictions",

            value:
              stats.total_predictions,

            icon:
              Activity,
          },

          {
            title:
              "Safe Samples",

            value:
              stats.nontoxic_count,

            icon:
              ShieldCheck,
          },

          {
            title:
              "Toxic Samples",

            value:
              stats.toxic_count,

            icon:
              AlertTriangle,
          },

          {
            title:
              "Avg Confidence",

            value: `${Math.round(
              stats.avg_confidence * 100
            )}%`,

            icon:
              TrendingUp,
          },
        ].map((item, index) => {

          const Icon = item.icon;

          return (

            <div
              key={index}
              className="rounded-[26px] border border-cyan-500/10 bg-[#071120]/70 p-6 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/30 hover:bg-cyan-500/[0.03]"
            >

              <div className="mb-5 flex items-center justify-between">

                <div className="rounded-2xl bg-cyan-500/10 p-3">

                  <Icon className="h-6 w-6 text-cyan-400" />

                </div>

              </div>

              <p className="mb-2 text-sm text-white/45">

                {item.title}

              </p>

              <h2 className="text-4xl font-black text-white">

                {item.value}

              </h2>

            </div>
          );
        })}

      </section>

      {/* CHARTS */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        {/* LEFT CHART */}
        <div className="xl:col-span-2 rounded-[30px] border border-cyan-500/10 bg-[#071120]/70 p-7 backdrop-blur-xl">

          <div className="mb-8 flex items-center justify-between">

            <div>

              <h2 className="text-2xl font-bold text-white">

                Toxicity Trends

              </h2>

              <p className="text-white/45">

                Real backend analytics

              </p>

            </div>

            <span className="rounded-full bg-cyan-500/10 px-4 py-1 text-sm text-cyan-300">

              Live Analytics

            </span>

          </div>

          <div className="h-[320px] w-full">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <AreaChart
                data={trendData}
              >

                <defs>

                  <linearGradient
                    id="colorToxic"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >

                    <stop
                      offset="5%"
                      stopColor="#ef4444"
                      stopOpacity={0.8}
                    />

                    <stop
                      offset="95%"
                      stopColor="#ef4444"
                      stopOpacity={0}
                    />

                  </linearGradient>

                  <linearGradient
                    id="colorSafe"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >

                    <stop
                      offset="5%"
                      stopColor="#22d3ee"
                      stopOpacity={0.8}
                    />

                    <stop
                      offset="95%"
                      stopColor="#22d3ee"
                      stopOpacity={0}
                    />

                  </linearGradient>

                </defs>

                <XAxis
                  dataKey="date"
                  stroke="#94a3b8"
                />

                <YAxis
                  stroke="#94a3b8"
                />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="toxic"
                  stroke="#ef4444"
                  fillOpacity={1}
                  fill="url(#colorToxic)"
                />

                <Area
                  type="monotone"
                  dataKey="nontoxic"
                  stroke="#22d3ee"
                  fillOpacity={1}
                  fill="url(#colorSafe)"
                />

              </AreaChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* RIGHT CHART */}
        {/* RIGHT ANALYTICS */}
<div className="rounded-[30px] border border-cyan-500/10 bg-[#071120]/70 p-7 backdrop-blur-xl">

  <div className="mb-7">

    <h2 className="text-2xl font-bold text-white">

      Toxicity Distribution

    </h2>

    <p className="text-white/45">

      Live prediction ratio

    </p>

  </div>

  <div className="space-y-8">

    {/* TOXIC */}
    <div>

      <div className="mb-3 flex items-center justify-between">

        <span className="text-white">

          Toxic Samples

        </span>

        <span className="font-bold text-red-400">

          {toxicityData[0]?.value || 0}%

        </span>

      </div>

      <div className="h-4 overflow-hidden rounded-full bg-white/5">

        <div
          className="h-full rounded-full bg-gradient-to-r from-red-500 to-red-400 transition-all duration-700"
          style={{
            width: `${toxicityData[0]?.value || 0}%`,
          }}
        />

      </div>

    </div>

    {/* SAFE */}
    <div>

      <div className="mb-3 flex items-center justify-between">

        <span className="text-white">

          Non-Toxic Samples

        </span>

        <span className="font-bold text-cyan-300">

          {toxicityData[1]?.value || 0}%

        </span>

      </div>

      <div className="h-4 overflow-hidden rounded-full bg-white/5">

        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-cyan-300 transition-all duration-700"
          style={{
            width: `${toxicityData[1]?.value || 0}%`,
          }}
        />

      </div>

    </div>

    {/* SUMMARY CARDS */}
    <div className="grid grid-cols-2 gap-4 pt-4">

      <div className="rounded-2xl border border-red-500/10 bg-red-500/[0.05] p-5">

        <p className="mb-2 text-sm text-red-300/70">

          Toxic Count

        </p>

        <h3 className="text-3xl font-black text-red-400">

          {stats.toxic_count}

        </h3>

      </div>

      <div className="rounded-2xl border border-cyan-500/10 bg-cyan-500/[0.05] p-5">

        <p className="mb-2 text-sm text-cyan-300/70">

          Safe Count

        </p>

        <h3 className="text-3xl font-black text-cyan-300">

          {stats.nontoxic_count}

        </h3>

      </div>

    </div>

  </div>

</div>

      </section>

      {/* RECENT */}
      <section className="rounded-[30px] border border-cyan-500/10 bg-[#071120]/70 p-7 backdrop-blur-xl">

        <div className="mb-7">

          <h2 className="text-2xl font-bold text-white">

            Recent Predictions

          </h2>

          <p className="text-white/45">

            Latest AI analysis

          </p>

        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">

          {recentPredictions.map(
            (item, i) => (

              <div
                key={i}
                className="flex items-center justify-between rounded-2xl border border-cyan-500/10 bg-[#081325] px-4 py-4"
              >

                <div>

                  <p className="font-semibold text-white">

                    {
                      item.nanoparticle_name
                    }

                  </p>

                  <p className="text-sm text-white/40">

                    {
                      item.risk_level
                    }

                  </p>

                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs ${
                    item.toxicity_label ===
                    "Toxic"
                      ? "bg-red-500/10 text-red-400"
                      : "bg-cyan-500/10 text-cyan-300"
                  }`}
                >

                  {
                    item.toxicity_label
                  }

                </span>

              </div>
            )
          )}

        </div>

      </section>

      {/* BOTTOM */}
      <section className="grid grid-cols-1 gap-5 md:grid-cols-3">

        <div className="rounded-[26px] border border-cyan-500/10 bg-[#071120]/70 p-6">

          <Database className="mb-4 h-8 w-8 text-cyan-400" />

          <h3 className="mb-2 text-xl font-bold text-white">

            Dataset Size

          </h3>

          <p className="text-3xl font-black text-cyan-300">

            2.4M+

          </p>

        </div>

        <div className="rounded-[26px] border border-cyan-500/10 bg-[#071120]/70 p-6">

          <ShieldCheck className="mb-4 h-8 w-8 text-cyan-400" />

          <h3 className="mb-2 text-xl font-bold text-white">

            AI Confidence

          </h3>

          <p className="text-3xl font-black text-cyan-300">

            98.1%

          </p>

        </div>

        <div className="rounded-[26px] border border-cyan-500/10 bg-[#071120]/70 p-6">

          <Activity className="mb-4 h-8 w-8 text-cyan-400" />

          <h3 className="mb-2 text-xl font-bold text-white">

            System Status

          </h3>

          <p className="text-3xl font-black text-green-400">

            Stable

          </p>

        </div>

      </section>

    </div>
  );
}