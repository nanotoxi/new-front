"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import Papa from "papaparse";

import {
  Download,
  Activity,
  AlertTriangle,
  ShieldCheck,
  Search,
} from "lucide-react";

import {
  useTheme,
} from "@/context/theme-context";

import {
  getAdminPredictions,
} from "@/lib/admin-api";

const PAGE_SIZE = 10;

export default function PredictionsPage() {

  const { theme } = useTheme();

  const dark =
    theme === "dark";

  const router =
    useRouter();

  const searchParams =
    useSearchParams();

  const [loading, setLoading] =
    useState(true);

  const [predictions, setPredictions] =
    useState<any[]>([]);

  const search =
    searchParams.get(
      "search"
    ) || "";

  const verdict =
    searchParams.get(
      "verdict"
    ) || "all";

  useEffect(() => {

    fetchPredictions();

  }, []);

  async function fetchPredictions() {

    try {

      setLoading(true);

      const data =
        await getAdminPredictions();

      console.log(
        "PREDICTIONS:",
        data
      );

      console.log(
        "FIRST PREDICTION:",
        data?.predictions?.[0]
      );

      setPredictions(
        Array.isArray(
          data?.predictions
        )
          ? data.predictions
          : Array.isArray(data)
          ? data
          : []
      );

    } catch (error) {

      console.error(
        "PREDICTIONS ERROR:",
        error
      );

    } finally {

      setLoading(false);
    }
  }

  function updateQuery(
    key: string,
    value: string
  ) {

    const params =
      new URLSearchParams(
        searchParams.toString()
      );

    params.set(
      key,
      value
    );

    if (
      key !== "page"
    ) {

      params.set(
        "page",
        "1"
      );
    }

    router.push(
      `?${params.toString()}`
    );
  }

  const filteredData =
    useMemo(() => {

      return predictions.filter(
        (log: any) => {

          const matchesSearch =
            (
              log.nanoparticle_name ||
              ""
            )
              .toLowerCase()
              .includes(
                search.toLowerCase()
              );

          const matchesVerdict =
            verdict ===
              "all" ||
            (
              log.toxicity_label ||
              ""
            ) === verdict;

          return (
            matchesSearch &&
            matchesVerdict
          );
        }
      );

    }, [
      predictions,
      search,
      verdict,
    ]);

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        filteredData.length /
          PAGE_SIZE
      )
    );

  const currentPage =
    Math.min(
      Number(
        searchParams.get(
          "page"
        ) || 1
      ),
      totalPages
    );

  const paginatedData =
    filteredData.slice(
      (currentPage - 1) *
        PAGE_SIZE,

      currentPage *
        PAGE_SIZE
    );

  function exportCSV() {

    const csv =
      Papa.unparse(
        filteredData
      );

    const blob =
      new Blob(
        [csv],
        {
          type:
            "text/csv",
        }
      );

    const url =
      URL.createObjectURL(
        blob
      );

    const a =
      document.createElement(
        "a"
      );

    a.href = url;

    a.download =
      "prediction-logs.csv";

    a.click();
  }

  const toxicCount =
    predictions.filter(
      (p: any) =>
        p.toxicity_label ===
        "Toxic"
    ).length;

  const avgConfidence =
    predictions.length > 0
      ? Math.round(
          (
            predictions.reduce(
              (
                acc: number,
                curr: any
              ) =>
                acc +
                Number(
                  curr.confidence ||
                    0
                ),
              0
            ) /
            predictions.length
          ) * 100
        )
      : 0;

  return (

    <div className="space-y-8 overflow-x-hidden">

      {/* HERO */}

      <div className={`rounded-3xl border p-4 md:p-6 xl:p-8 shadow-sm overflow-hidden ${
        dark
          ? "border-white/10 bg-[#0F172A]"
          : "border-slate-200 bg-white"
      }`}>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

          <div className="min-w-0">

            <div className="mb-4 inline-flex max-w-full rounded-full bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-700">

              AI Monitoring Active

            </div>

            <h1 className={`text-3xl md:text-5xl font-black tracking-tight break-words ${
              dark
                ? "text-white"
                : "text-slate-900"
            }`}>

              Prediction Intelligence

            </h1>

            <p className={`mt-4 max-w-3xl text-base md:text-lg leading-relaxed ${
              dark
                ? "text-slate-400"
                : "text-slate-500"
            }`}>

              Monitor nanoparticle prediction activity,
              toxicity verdicts, AI confidence scores,
              and inference performance across the platform.

            </p>

          </div>

          <button
            onClick={
              exportCSV
            }
            className="flex w-full sm:w-fit shrink-0 items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-5 py-3 font-semibold text-white hover:bg-cyan-600"
          >

            <Download className="h-5 w-5 shrink-0" />

            Export CSV

          </button>

        </div>

      </div>

      {/* METRICS */}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">

        {[
          {
            icon: Activity,
            title: "Total Predictions",
            value:
              predictions.length,
            bg: "bg-cyan-50",
            iconColor: "text-cyan-500",
            badge: "Live",
            badgeBg:
              "bg-green-100 text-green-700",
          },

          {
            icon: AlertTriangle,
            title: "Toxic Verdicts",
            value:
              toxicCount,
            bg: "bg-red-50",
            iconColor: "text-red-500",
            badge: "AI",
            badgeBg:
              "bg-red-100 text-red-700",
          },

          {
            icon: ShieldCheck,
            title: "Avg Confidence",
            value:
              `${avgConfidence}%`,
            bg: "bg-emerald-50",
            iconColor: "text-emerald-500",
            badge: "Stable",
            badgeBg:
              "bg-emerald-100 text-emerald-700",
          },
        ].map(
          (
            item,
            i
          ) => {

            const Icon =
              item.icon;

            return (

              <div
                key={i}
                className={`rounded-3xl border p-4 md:p-6 shadow-sm overflow-hidden ${
                  dark
                    ? "border-white/10 bg-[#0F172A]"
                    : "border-slate-200 bg-white"
                }`}
              >

                <div className="flex flex-wrap items-center justify-between gap-4">

                  <div className={`rounded-2xl p-4 ${item.bg}`}>

                    <Icon className={`h-6 w-6 ${item.iconColor}`} />

                  </div>

                  <span className={`rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap ${item.badgeBg}`}>

                    {item.badge}

                  </span>

                </div>

                <p className={`mt-6 text-sm ${
                  dark
                    ? "text-slate-400"
                    : "text-slate-500"
                }`}>

                  {item.title}

                </p>

                <h2 className={`mt-2 text-3xl md:text-4xl font-black break-words ${
                  dark
                    ? "text-white"
                    : "text-slate-900"
                }`}>

                  {item.value}

                </h2>

              </div>
            );
          }
        )}

      </div>

      {/* FILTERS */}

      <div className={`rounded-3xl border p-4 md:p-6 shadow-sm overflow-hidden ${
        dark
          ? "border-white/10 bg-[#0F172A]"
          : "border-slate-200 bg-white"
      }`}>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

          <div className={`flex items-center gap-3 rounded-2xl border px-4 ${
            dark
              ? "border-white/10 bg-white/5"
              : "border-slate-200 bg-slate-50"
          }`}>

            <Search className="h-5 w-5 shrink-0 text-slate-400" />

            <input
              placeholder="Search nanoparticle..."
              value={search}
              onChange={(e) =>
                updateQuery(
                  "search",
                  e.target.value
                )
              }
              className={`h-14 w-full min-w-0 bg-transparent outline-none ${
                dark
                  ? "text-white placeholder:text-slate-500"
                  : "text-slate-900 placeholder:text-slate-400"
              }`}
            />

          </div>

          <select
            value={verdict}
            onChange={(e) =>
              updateQuery(
                "verdict",
                e.target.value
              )
            }
            className={`h-14 w-full rounded-2xl border px-4 ${
              dark
                ? "border-white/10 bg-white/5 text-white"
                : "border-slate-200 bg-slate-50 text-slate-900"
            }`}
          >

            <option value="all">
              All Verdicts
            </option>

            <option value="Safe">
              Safe
            </option>

            <option value="Toxic">
              Toxic
            </option>

          </select>

        </div>

      </div>

      {/* TABLE */}

      <div className={`rounded-3xl border p-4 md:p-6 shadow-sm overflow-hidden ${
        dark
          ? "border-white/10 bg-[#0F172A]"
          : "border-slate-200 bg-white"
      }`}>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[900px]">

            <thead>

              <tr className={`border-b ${
                dark
                  ? "border-white/10"
                  : "border-slate-200"
              }`}>

                {[
                  "Timestamp",
                  "Nanoparticle",
                  "Cell Type",
                  "Verdict",
                  "Confidence",
                  "Dose",
                  "Exposure",
                  "Risk Level",
                ].map((header) => (

                  <th
                    key={header}
                    className={`px-4 py-4 text-left text-sm font-bold whitespace-nowrap ${
                      dark
                        ? "text-slate-400"
                        : "text-slate-500"
                    }`}
                  >

                    {header}

                  </th>
                ))}

              </tr>

            </thead>

            <tbody>

              {paginatedData.map(
                (
                  log: any,
                  i
                ) => (

                  <tr
                    key={
                      log.prediction_id || i
                    }
                    className={`border-b ${
                      dark
                        ? "border-white/5 hover:bg-white/5"
                        : "border-slate-100 hover:bg-slate-50"
                    }`}
                  >

                    <td className="px-4 py-5 whitespace-nowrap">
                      {log.created_at}
                    </td>

                    <td className="px-4 py-5 font-semibold whitespace-nowrap">
                      {log.nanoparticle_name}
                    </td>

                    <td className="px-4 py-5 whitespace-nowrap">
                      {log.cell_type}
                    </td>

                    <td className="px-4 py-5 whitespace-nowrap">

                      <span className={`rounded-full px-3 py-1 text-xs font-bold ${
                        log.toxicity_label === "Toxic"
                          ? "bg-red-100 text-red-700"
                          : "bg-emerald-100 text-emerald-700"
                      }`}>

                        {log.toxicity_label}

                      </span>

                    </td>

                    <td className="px-4 py-5 whitespace-nowrap">
                      {(log.confidence * 100).toFixed(1)}%
                    </td>

                    <td className="px-4 py-5 whitespace-nowrap">
                      {log.dose_max_ugml} ug/ml
                    </td>

                    <td className="px-4 py-5 whitespace-nowrap">
                      {log.exposure_time_h} h
                    </td>

                    <td className="px-4 py-5 whitespace-nowrap">
                      {log.risk_level}
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