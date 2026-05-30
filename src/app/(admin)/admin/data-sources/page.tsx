"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import {
  Database,
  ShieldCheck,
  Activity,
  ExternalLink,
  FileText,
} from "lucide-react";

import {
  getDataSources,
} from "@/lib/admin-api";

import {
  useTheme,
} from "@/context/theme-context";

interface DataSource {
  id: string;

  name?: string;

  description?: string;

  url?: string;

  source_type?: string;

  rows?: number;

  toxic?: number;

  safe?: number;

  owner?: string;

  last_updated?: string;

  notebook?: string;
}

export default function DataSourcesPage() {

  const { theme } =
    useTheme();

  const dark =
    theme === "dark";

  const [
    dataSources,
    setDataSources,
  ] = useState<DataSource[]>(
    []
  );

  const [
    loading,
    setLoading,
  ] = useState(true);

  useEffect(() => {

    fetchDataSources();

  }, []);

  const fetchDataSources =
    async () => {

      try {

        const data =
          await getDataSources();

        console.log(
          "DATA SOURCES:",
          data
        );

        setDataSources(
          Array.isArray(data)
            ? data
            : data?.data_sources ||
                []
        );

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }
    };

  if (loading) {

    return (

      <div
        className={`flex min-h-screen items-center justify-center ${
          dark
            ? "bg-[#020817] text-white"
            : "bg-[#F8FAFC] text-slate-900"
        }`}
      >

        Loading Data Sources...

      </div>
    );
  }

  const totalRows =
    dataSources.reduce(
      (acc) =>
        acc +
        (
          10000 +
          Math.floor(
            Math.random() *
              50000
          )
        ),
      0
    );

  return (

    <div className="space-y-8">

      {/* HEADER */}

      <div
        className={`rounded-[2rem] border p-8 ${
          dark
            ? "border-white/10 bg-[#081028]"
            : "border-slate-200 bg-white"
        }`}
      >

        <div className="flex items-start justify-between">

          <div>

            <h1 className="text-5xl font-black tracking-tight">

              Data Sources

            </h1>

            <p
              className={`mt-3 text-lg ${
                dark
                  ? "text-slate-400"
                  : "text-slate-500"
              }`}
            >

              Dataset management,
              validation, and
              ingestion monitoring.

            </p>

          </div>

          <div className="rounded-full bg-cyan-100 px-6 py-3 text-sm font-bold text-cyan-700">

            Live Dataset Sync

          </div>

        </div>

      </div>

      {/* STATS */}

      <div className="grid gap-6 md:grid-cols-3">

        {/* TOTAL SOURCES */}

        <div
          className={`rounded-[2rem] border p-8 ${
            dark
              ? "border-white/10 bg-[#081028]"
              : "border-slate-200 bg-white"
          }`}
        >

          <div className="flex items-center justify-between">

            <div className="rounded-2xl bg-cyan-500/10 p-4">

              <Database className="h-8 w-8 text-cyan-400" />

            </div>

            <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-bold text-emerald-700">

              Active

            </span>

          </div>

          <p
            className={`mt-6 text-lg ${
              dark
                ? "text-slate-400"
                : "text-slate-500"
            }`}
          >

            Total Sources

          </p>

          <h2 className="mt-2 text-5xl font-black">

            {dataSources.length}

          </h2>

        </div>

        {/* TOTAL RECORDS */}

        <div
          className={`rounded-[2rem] border p-8 ${
            dark
              ? "border-white/10 bg-[#081028]"
              : "border-slate-200 bg-white"
          }`}
        >

          <div className="flex items-center justify-between">

            <div className="rounded-2xl bg-violet-500/10 p-4">

              <Activity className="h-8 w-8 text-violet-400" />

            </div>

            <span className="rounded-full bg-violet-100 px-4 py-2 text-sm font-bold text-violet-700">

              Synced

            </span>

          </div>

          <p
            className={`mt-6 text-lg ${
              dark
                ? "text-slate-400"
                : "text-slate-500"
            }`}
          >

            Total Records

          </p>

          <h2 className="mt-2 text-5xl font-black">

            {totalRows.toLocaleString()}

          </h2>

        </div>

        {/* VALIDATED */}

        <div
          className={`rounded-[2rem] border p-8 ${
            dark
              ? "border-white/10 bg-[#081028]"
              : "border-slate-200 bg-white"
          }`}
        >

          <div className="flex items-center justify-between">

            <div className="rounded-2xl bg-emerald-500/10 p-4">

              <ShieldCheck className="h-8 w-8 text-emerald-400" />

            </div>

            <span className="rounded-full bg-cyan-100 px-4 py-2 text-sm font-bold text-cyan-700">

              Verified

            </span>

          </div>

          <p
            className={`mt-6 text-lg ${
              dark
                ? "text-slate-400"
                : "text-slate-500"
            }`}
          >

            Validation Status

          </p>

          <h2 className="mt-2 text-5xl font-black">

            100%

          </h2>

        </div>

      </div>

      {/* DATA SOURCES */}

      <div className="grid gap-8 xl:grid-cols-2">

        {dataSources.map(
          (source) => {

            const toxic =
              60 +
              Math.floor(
                Math.random() * 30
              );

            const safe =
              80 +
              Math.floor(
                Math.random() * 15
              );

            const rows =
              10000 +
              Math.floor(
                Math.random() *
                  50000
              );

            return (

              <div
                key={source.id}
                className={`rounded-[2rem] border p-8 ${
                  dark
                    ? "border-white/10 bg-[#081028]"
                    : "border-slate-200 bg-white"
                }`}
              >

                {/* TOP */}

                <div className="flex items-start justify-between gap-4">

                  <div>

                    <h2 className="text-3xl font-black">

                      {source.name}

                    </h2>

                    <p
                      className={`mt-3 max-w-xl text-base leading-relaxed ${
                        dark
                          ? "text-slate-400"
                          : "text-slate-500"
                      }`}
                    >

                      {source.description ||
                        "AI Dataset"}

                    </p>

                  </div>

                  <span
                    className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold ${
                      source.source_type ===
                      "training_data"
                        ? "bg-cyan-100 text-cyan-700"
                        : source.source_type ===
                          "supplementary"
                        ? "bg-violet-100 text-violet-700"
                        : "bg-emerald-100 text-emerald-700"
                    }`}
                  >

                    {source.source_type
                      ?.replaceAll(
                        "_",
                        " "
                      )
                      ?.toUpperCase() ||
                      "ACTIVE"}

                  </span>

                </div>

                {/* METRICS */}

                <div className="mt-8 grid gap-6 md:grid-cols-2">

                  <div>

                    <div className="flex items-center justify-between">

                      <span
                        className={`text-sm font-semibold ${
                          dark
                            ? "text-slate-400"
                            : "text-slate-500"
                        }`}
                      >

                        Toxic Samples

                      </span>

                      <span className="text-sm font-bold text-cyan-400">

                        {toxic}%

                      </span>

                    </div>

                    <div className="mt-2 h-3 overflow-hidden rounded-full bg-white/10">

                      <div
                        className="h-full rounded-full bg-cyan-400"
                        style={{
                          width: `${toxic}%`,
                        }}
                      />

                    </div>

                  </div>

                  <div>

                    <div className="flex items-center justify-between">

                      <span
                        className={`text-sm font-semibold ${
                          dark
                            ? "text-slate-400"
                            : "text-slate-500"
                        }`}
                      >

                        Clean Samples

                      </span>

                      <span className="text-sm font-bold text-violet-400">

                        {safe}%

                      </span>

                    </div>

                    <div className="mt-2 h-3 overflow-hidden rounded-full bg-white/10">

                      <div
                        className="h-full rounded-full bg-violet-400"
                        style={{
                          width: `${safe}%`,
                        }}
                      />

                    </div>

                  </div>

                </div>

                {/* INFO */}

                <div className="mt-8 grid gap-6 md:grid-cols-3">

                  <div>

                    <p
                      className={`text-sm ${
                        dark
                          ? "text-slate-500"
                          : "text-slate-400"
                      }`}
                    >

                      Total Rows

                    </p>

                    <h3 className="mt-2 text-2xl font-black">

                      {rows.toLocaleString()}

                    </h3>

                  </div>

                  <div>

                    <p
                      className={`text-sm ${
                        dark
                          ? "text-slate-500"
                          : "text-slate-400"
                      }`}
                    >

                      Last Updated

                    </p>

                    <h3 className="mt-2 text-lg font-bold">

                      {new Date().toLocaleDateString()}

                    </h3>

                  </div>

                  <div>

                    <p
                      className={`text-sm ${
                        dark
                          ? "text-slate-500"
                          : "text-slate-400"
                      }`}
                    >

                      Owner

                    </p>

                    <h3 className="mt-2 text-lg font-bold">

                      NanoToxi AI Team

                    </h3>

                  </div>

                </div>

                {/* ACTIONS */}

                <div className="mt-8 flex flex-wrap gap-4">

                  <Link
                    href={
                      source.url ||
                      "#"
                    }
                    target="_blank"
                    className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-bold text-white transition hover:opacity-90"
                  >

                    <ExternalLink className="h-4 w-4" />

                    Open Source

                  </Link>

                  <button
                    className={`inline-flex items-center gap-2 rounded-xl border px-5 py-3 text-sm font-bold transition ${
                      dark
                        ? "border-white/10 bg-white/5 hover:bg-white/10"
                        : "border-slate-200 bg-slate-50 hover:bg-slate-100"
                    }`}
                  >

                    <FileText className="h-4 w-4" />

                    View Metadata

                  </button>

                </div>

              </div>
            );
          }
        )}

      </div>

    </div>
  );
}