"use client";

import { useEffect, useState } from "react";

import {
  getAdminStats,
  getAdminUsers,
  getAdminPredictions,
  getAuditTrails,
  getSystemHealth,
  getModels,
  getAdminSettings,
} from "@/lib/admin-api";

import {
  Activity,
  AlertTriangle,
  BrainCircuit,
  Database,
  ShieldCheck,
  Users,
} from "lucide-react";

export default function AdminPage() {

  const [loading, setLoading] =
    useState(true);

  const [stats, setStats] =
    useState<any>(null);

  const [predictions, setPredictions] =
    useState<any[]>([]);

  const [systemHealth, setSystemHealth] =
    useState<any>(null);

  const [users, setUsers] =
    useState<any[]>([]);

  const fetchAdminData =
    async () => {

      try {

        setLoading(true);

        const [
          statsRes,
          usersRes,
          predictionsRes,
          auditsRes,
          healthRes,
          modelsRes,
          settingsRes,
        ] = await Promise.all([
          getAdminStats(),
          getAdminUsers(),
          getAdminPredictions(),
          getAuditTrails(),
          getSystemHealth(),
          getModels(),
          getAdminSettings(),
        ]);

        console.log(
          "ADMIN STATS:",
          statsRes
        );

        console.log(
          "ADMIN USERS:",
          usersRes
        );

        console.log(
          "ADMIN PREDICTIONS:",
          predictionsRes
        );

        console.log(
          "ADMIN AUDITS:",
          auditsRes
        );

        console.log(
          "SYSTEM HEALTH:",
          healthRes
        );

        console.log(
          "MODELS:",
          modelsRes
        );

        console.log(
          "SETTINGS:",
          settingsRes
        );

        setStats(statsRes);

        setUsers(
          usersRes?.users || []
        );

        setPredictions(
          predictionsRes?.predictions ||
          []
        );

        setSystemHealth(
          healthRes
        );

      } catch (err) {

        console.error(
          "ADMIN ERROR:",
          err
        );

      } finally {

        setLoading(false);
      }
    };

  useEffect(() => {

    fetchAdminData();

  }, []);

  if (loading) {

    return (

      <div className="flex min-h-screen items-center justify-center text-cyan-400">

        Loading Admin Dashboard...

      </div>
    );
  }

  const statCards = [
    {
      title: "Total Predictions",
      value:
        stats?.total_predictions || 0,
      icon: Activity,
      color: "cyan",
    },

    {
      title: "Toxic Samples",
      value:
        stats?.toxic_count || 0,
      icon: AlertTriangle,
      color: "red",
    },

    {
      title: "Total Users",
      value:
        stats?.total_users || 0,
      icon: Users,
      color: "blue",
    },

    {
      title: "Pro Users",
      value:
        stats?.pro_users || 0,
      icon: ShieldCheck,
      color: "green",
    },
  ];

  return (

    <div className="space-y-8">

      {/* HERO */}
      <div className="rounded-3xl border border-cyan-500/10 bg-[#031225] p-6 md:p-8">

        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <p className="mb-4 inline-flex rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-400">

              AI System Active

            </p>

            <h1 className="text-4xl font-black text-white md:text-5xl">

              NanoToxi Admin

            </h1>

            <p className="mt-4 max-w-3xl text-base text-slate-400 md:text-lg">

              Monitor nanoparticle toxicity predictions,
              AI models, datasets, and platform activity.

            </p>

          </div>

          <div className="hidden rounded-3xl bg-cyan-500/10 p-6 lg:flex">

            <BrainCircuit className="h-20 w-20 text-cyan-400" />

          </div>

        </div>

      </div>

      {/* STATS */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">

        {statCards.map(
          (item, i) => {

            const Icon =
              item.icon;

            return (

              <div
                key={i}
                className="rounded-3xl border border-cyan-500/10 bg-[#031225] p-6"
              >

                <div className="flex items-center justify-between">

                  <div className="rounded-2xl bg-cyan-500/10 p-4">

                    <Icon className="h-6 w-6 text-cyan-400" />

                  </div>

                  <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400">

                    Live

                  </span>

                </div>

                <p className="mt-6 text-sm text-slate-400">

                  {item.title}

                </p>

                <h2 className="mt-2 text-4xl font-black text-white">

                  {item.value}

                </h2>

              </div>
            );
          }
        )}

      </div>

      {/* ANALYTICS */}
      <div className="grid gap-6 grid-cols-1 xl:grid-cols-3">

        {/* CHART PANEL */}
        <div className="rounded-3xl border border-cyan-500/10 bg-[#031225] p-6 xl:col-span-2">

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <div>

              <h2 className="text-2xl font-black text-white">

                Prediction Analytics

              </h2>

              <p className="mt-1 text-slate-400">

                Weekly toxicity prediction activity

              </p>

            </div>

            <div className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-400">

              Live Analytics

            </div>

          </div>

          {/* GRAPH */}
          <div className="mt-10 h-[260px] rounded-3xl bg-[#020817]" />

        </div>

        {/* SYSTEM STATUS */}
        <div className="space-y-6">

          <div className="rounded-3xl border border-cyan-500/10 bg-[#031225] p-6">

            <h2 className="text-2xl font-black text-white">

              System Health

            </h2>

            <div className="mt-6 space-y-5">

              {[
                {
                  label: "Database",
                  status:
                    systemHealth?.database
                      ?.status,
                },

                {
                  label: "Redis",
                  status:
                    systemHealth?.redis
                      ?.status,
                },

                {
                  label: "Environment",
                  status:
                    systemHealth?.environment,
                },
              ].map((item) => (

                <div
                  key={item.label}
                  className="flex items-center justify-between"
                >

                  <span className="text-slate-400">

                    {item.label}

                  </span>

                  <div className="flex items-center gap-2">

                    <div className="h-2 w-2 rounded-full bg-green-500" />

                    <span className="text-sm font-semibold text-green-400">

                      {item.status || "ok"}

                    </span>

                  </div>

                </div>
              ))}

            </div>

          </div>

          {/* USERS */}
          <div className="rounded-3xl border border-cyan-500/10 bg-[#031225] p-6">

            <div className="flex items-center gap-4">

              <div className="rounded-2xl bg-cyan-500/10 p-4">

                <Users className="h-6 w-6 text-cyan-400" />

              </div>

              <div>

                <p className="text-sm text-slate-400">

                  Active Users (7d)

                </p>

                <h2 className="text-4xl font-black text-white">

                  {stats?.active_users_7d || 0}

                </h2>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* PREDICTIONS TABLE */}
      <div className="rounded-3xl border border-cyan-500/10 bg-[#031225] p-6">

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>

            <h2 className="text-2xl font-black text-white">

              Recent Predictions

            </h2>

            <p className="mt-1 text-slate-400">

              Latest nanoparticle prediction activity

            </p>

          </div>

          <div className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-400">

            Live Feed

          </div>

        </div>

        {/* TABLE */}
        <div className="mt-8 overflow-x-auto">

          <table className="min-w-full">

            <thead>

              <tr className="border-b border-cyan-500/10">

                <th className="px-4 py-4 text-left text-sm font-bold text-slate-400">

                  Prediction ID

                </th>

                <th className="px-4 py-4 text-left text-sm font-bold text-slate-400">

                  Model

                </th>

                <th className="px-4 py-4 text-left text-sm font-bold text-slate-400">

                  Toxicity

                </th>

                <th className="px-4 py-4 text-left text-sm font-bold text-slate-400">

                  Risk

                </th>

              </tr>

            </thead>

            <tbody>

              {predictions
                .slice(0, 5)
                .map(
                  (
                    item: any,
                    i
                  ) => (

                    <tr
                      key={i}
                      className="border-b border-cyan-500/5"
                    >

                      <td className="px-4 py-5 text-sm text-white">

                        {item.prediction_id?.slice(
                          0,
                          8
                        )}

                      </td>

                      <td className="px-4 py-5 text-sm text-slate-300">

                        {
                          item.model_version
                        }

                      </td>

                      <td className="px-4 py-5 text-sm text-slate-300">

                        {
                          item.toxicity_label
                        }

                      </td>

                      <td className="px-4 py-5">

                        <span className={`rounded-full px-3 py-1 text-xs font-bold ${
                          item.risk_level ===
                          "High"
                            ? "bg-red-500/20 text-red-400"
                            : item.risk_level ===
                              "Moderate"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-green-500/20 text-green-400"
                        }`}>

                          {
                            item.risk_level
                          }

                        </span>

                      </td>

                    </tr>
                  )
                )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}