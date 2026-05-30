"use client";

import { useEffect, useMemo, useState } from "react";

import {
  ShieldCheck,
  Clock3,
  Activity,
  Search,
  CheckCircle2,
  AlertTriangle,
  Database,
  Settings,
  BrainCircuit,
} from "lucide-react";

import { useTheme } from "@/context/theme-context";

import {
  getAuditTrails,
} from "@/lib/admin-api";

export default function AuditPage() {

  const { theme } =
    useTheme();

  const dark =
    theme === "dark";

  const [logs, setLogs] =
    useState<any[]>([]);

  const [summary, setSummary] =
    useState<any>({});

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  useEffect(() => {

    fetchAuditLogs();

  }, []);

  const fetchAuditLogs =
    async () => {

      try {

        setLoading(true);

        const res =
          await getAuditTrails();

        console.log(
          "AUDIT TRAILS:",
          res
        );

        let auditData: any[] = [];

        if (
          Array.isArray(res)
        ) {

          auditData = res;

        } else if (
          Array.isArray(
            res?.logs
          )
        ) {

          auditData =
            res.logs;

        } else if (
          Array.isArray(
            res?.audit_logs
          )
        ) {

          auditData =
            res.audit_logs;

        } else if (
          Array.isArray(
            res?.data
          )
        ) {

          auditData =
            res.data;

        } else if (
          Array.isArray(
            res?.items
          )
        ) {

          auditData =
            res.items;
        }

        setLogs(auditData);

        setSummary(
          res?.summary || {}
        );

      } catch (error) {

        console.error(
          "AUDIT TRAILS ERROR:",
          error
        );

        setLogs([]);

      } finally {

        setLoading(false);
      }
    };

  const filteredLogs =
    useMemo(() => {

      return logs.filter(
        (log: any) => {

          const text =
            `
              ${log?.actor || ""}
              ${log?.action || ""}
              ${log?.target || ""}
              ${log?.event || ""}
              ${log?.status || ""}
            `.toLowerCase();

          return text.includes(
            search.toLowerCase()
          );
        }
      );

    }, [logs, search]);

  const successCount =
    summary?.success_count || 0;

  const failedCount =
    summary?.failed_count || 0;

  const totalEvents =
    summary?.total_events ||
    filteredLogs.length;

  const getIcon =
    (action: string) => {

      const lower =
        action?.toLowerCase() || "";

      if (
        lower.includes("model")
      ) {
        return BrainCircuit;
      }

      if (
        lower.includes("dataset")
      ) {
        return Database;
      }

      if (
        lower.includes("security")
      ) {
        return ShieldCheck;
      }

      if (
        lower.includes("setting")
      ) {
        return Settings;
      }

      return Activity;
    };

  return (

    <div
      className={`min-h-screen p-4 sm:p-6 lg:p-8 transition-all duration-300 ${
        dark
          ? "bg-[#020817]"
          : "bg-[#f4f7fb]"
      }`}
    >

      {/* HERO */}

      <div
        className={`
          relative
          overflow-hidden
          rounded-[36px]
          border
          p-6
          sm:p-8
          lg:p-10
          shadow-sm
          transition-all
          duration-300
          ${
            dark
              ? "border-white/10 bg-[#0F172A]"
              : "border-slate-200 bg-white"
          }
        `}
      >

        <div className="absolute right-[-120px] top-[-120px] h-[320px] w-[320px] rounded-full bg-cyan-500/10 blur-[120px]" />

        <div className="absolute bottom-[-120px] left-[-120px] h-[260px] w-[260px] rounded-full bg-blue-500/10 blur-[120px]" />

        <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <div
              className="
                mb-5
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-cyan-500/10
                px-5
                py-2
                text-sm
                font-semibold
                text-cyan-400
              "
            >

              <ShieldCheck className="h-4 w-4" />

              Security Monitoring Active

            </div>

            <h1
              className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight ${
                dark
                  ? "text-white"
                  : "text-[#0f172a]"
              }`}
            >

              Audit Trail

            </h1>

            <p
              className={`mt-5 max-w-3xl text-base sm:text-lg leading-relaxed ${
                dark
                  ? "text-slate-400"
                  : "text-slate-500"
              }`}
            >

              Track every administrative action,
              model update, security event,
              and platform configuration change.

            </p>

          </div>

          <div className="relative hidden lg:block">

            <div
              className={`
                flex
                h-40
                w-40
                items-center
                justify-center
                rounded-full
                border-8
                border-cyan-400/20
                ${
                  dark
                    ? "bg-[#020817]"
                    : "bg-white"
                }
              `}
            >

              <div
                className="
                  flex
                  h-24
                  w-24
                  items-center
                  justify-center
                  rounded-full
                  bg-gradient-to-br
                  from-cyan-400
                  to-blue-500
                  text-white
                "
              >

                <ShieldCheck className="h-12 w-12" />

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* STATS */}

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

        {[
          {
            title:
              "Total Events",
            value:
              totalEvents,
            icon:
              Activity,
            color:
              "from-cyan-400 to-blue-500",
            glow:
              "bg-cyan-500/10",
            status:
              "Live",
          },

          {
            title:
              "Failed Events",
            value:
              failedCount,
            icon:
              AlertTriangle,
            color:
              "from-red-400 to-red-500",
            glow:
              "bg-red-500/10",
            status:
              "Critical",
          },

          {
            title:
              "Successful Events",
            value:
              successCount,
            icon:
              CheckCircle2,
            color:
              "from-green-400 to-green-500",
            glow:
              "bg-green-500/10",
            status:
              "Stable",
          },

          {
            title:
              "Daily Logs",
            value:
              filteredLogs.length,
            icon:
              Clock3,
            color:
              "from-yellow-400 to-orange-500",
            glow:
              "bg-yellow-500/10",
            status:
              "Synced",
          },
        ].map(
          (
            item,
            index
          ) => {

            const Icon =
              item.icon;

            return (

              <div
                key={index}
                className={`
                  relative
                  overflow-hidden
                  rounded-[30px]
                  border
                  p-7
                  shadow-sm
                  transition-all
                  duration-300
                  ${
                    dark
                      ? "border-white/10 bg-[#0F172A]"
                      : "border-slate-200 bg-white"
                  }
                `}
              >

                <div className={`absolute right-[-40px] top-[-40px] h-40 w-40 rounded-full ${item.glow} blur-3xl`} />

                <div className="relative z-10">

                  <div className="flex items-center justify-between">

                    <div
                      className={`
                        flex
                        h-16
                        w-16
                        items-center
                        justify-center
                        rounded-2xl
                        bg-gradient-to-br
                        ${item.color}
                        text-white
                      `}
                    >

                      <Icon className="h-8 w-8" />

                    </div>

                    <div className={`rounded-full px-4 py-1 text-sm font-semibold ${
                      dark
                        ? "bg-white/10 text-slate-300"
                        : "bg-slate-100 text-slate-600"
                    }`}>

                      {item.status}

                    </div>

                  </div>

                  <p className={`mt-8 text-lg ${
                    dark
                      ? "text-slate-400"
                      : "text-slate-500"
                  }`}>

                    {item.title}

                  </p>

                  <h2 className={`mt-3 text-4xl font-black ${
                    dark
                      ? "text-white"
                      : "text-[#0f172a]"
                  }`}>

                    {item.value}

                  </h2>

                </div>

              </div>
            );
          }
        )}

      </div>

      {/* TABLE */}

      <div
        className={`
          relative
          mt-8
          overflow-hidden
          rounded-[36px]
          border
          shadow-sm
          transition-all
          duration-300
          ${
            dark
              ? "border-white/10 bg-[#0F172A]"
              : "border-slate-200 bg-white"
          }
        `}
      >

        {/* HEADER */}

        <div className={`flex flex-col gap-6 border-b p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between ${
          dark
            ? "border-white/10"
            : "border-slate-200"
        }`}>

          <div>

            <h2 className={`text-2xl font-black ${
              dark
                ? "text-white"
                : "text-[#0f172a]"
            }`}>

              Activity Logs

            </h2>

            <p className={`mt-2 ${
              dark
                ? "text-slate-400"
                : "text-slate-500"
            }`}>

              Real-time audit monitoring.

            </p>

          </div>

          <div
            className={`
              flex
              items-center
              gap-3
              rounded-2xl
              border
              px-5
              py-3
              ${
                dark
                  ? "border-white/10 bg-white/5"
                  : "border-slate-200 bg-slate-50"
              }
            `}
          >

            <Search className="h-5 w-5 text-slate-400" />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              placeholder="Search logs..."
              className={`w-full bg-transparent text-sm outline-none ${
                dark
                  ? "text-white placeholder:text-slate-500"
                  : "text-slate-900 placeholder:text-slate-400"
              }`}
            />

          </div>

        </div>

        {/* TABLE */}

        <div className="overflow-x-auto">

          <table className="w-full min-w-[800px] lg:min-w-[1000px]">

            <thead className={`${
              dark
                ? "bg-white/5"
                : "bg-slate-50"
            }`}>

              <tr className={`border-b text-left ${
                dark
                  ? "border-white/10"
                  : "border-slate-200"
              }`}>

                {[
                  "Event",
                  "Actor",
                  "Target",
                  "Status",
                ].map((header) => (

                  <th
                    key={header}
                    className={`px-8 py-5 text-sm font-semibold uppercase tracking-[0.2em] ${
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

              {loading ? (

                <tr>

                  <td
                    colSpan={4}
                    className="px-8 py-10 text-center text-slate-400"
                  >

                    Loading audit logs...

                  </td>

                </tr>

              ) : filteredLogs.length === 0 ? (

                <tr>

                  <td
                    colSpan={4}
                    className="px-8 py-10 text-center text-slate-400"
                  >

                    No audit logs found

                  </td>

                </tr>

              ) : (

                filteredLogs.map(
                  (
                    log: any,
                    index
                  ) => {

                    const action =
                      log?.action ||
                      log?.event ||
                      "Unknown Event";

                    const Icon =
                      getIcon(action);

                    const status =
                      (
                        log?.result ||
                        log?.status ||
                        "Unknown"
                      ).toString();

                    const success =
                      status
                        .toLowerCase()
                        .includes("success") ||
                      status
                        .toLowerCase()
                        .includes("ok") ||
                      status
                        .toLowerCase()
                        .includes("completed");

                    return (

                      <tr
                        key={
                          log?.id ||
                          index
                        }
                        className={`
                          border-b
                          transition-all
                          ${
                            dark
                              ? "border-white/5 hover:bg-white/5"
                              : "border-slate-100 hover:bg-slate-50"
                          }
                        `}
                      >

                        {/* EVENT */}

                        <td className="px-8 py-6">

                          <div className="flex items-center gap-4">

                            <div
                              className={`
                                flex
                                h-12
                                w-12
                                items-center
                                justify-center
                                rounded-2xl
                                ${
                                  success
                                    ? "bg-cyan-500/10 text-cyan-500"
                                    : "bg-red-500/10 text-red-500"
                                }
                              `}
                            >

                              <Icon className="h-6 w-6" />

                            </div>

                            <div>

                              <p className={`font-semibold ${
                                dark
                                  ? "text-white"
                                  : "text-[#0f172a]"
                              }`}>

                                {action}

                              </p>

                              <p className={`mt-1 text-sm ${
                                dark
                                  ? "text-slate-400"
                                  : "text-slate-500"
                              }`}>

                                {
                                  log?.timestamp
                                    ? new Date(
                                        log.timestamp
                                      ).toLocaleString()

                                    : log?.created_at
                                    ? new Date(
                                        log.created_at
                                      ).toLocaleString()

                                    : "N/A"
                                }

                              </p>

                            </div>

                          </div>

                        </td>

                        {/* ACTOR */}

                        <td className={`px-8 py-6 font-semibold ${
                          dark
                            ? "text-white"
                            : "text-[#0f172a]"
                        }`}>

                          {
                            log?.actor ||
                            log?.user ||
                            "System"
                          }

                        </td>

                        {/* TARGET */}

                        <td className={`px-8 py-6 ${
                          dark
                            ? "text-slate-300"
                            : "text-slate-600"
                        }`}>

                          {
                            log?.target ||
                            log?.resource ||
                            "N/A"
                          }

                        </td>

                        {/* STATUS */}

                        <td className="px-8 py-6">

                          <div
                            className={`
                              inline-flex
                              items-center
                              gap-2
                              rounded-full
                              px-4
                              py-2
                              text-sm
                              font-semibold
                              ${
                                success
                                  ? "bg-green-500/10 text-green-500"
                                  : "bg-red-500/10 text-red-500"
                              }
                            `}
                          >

                            {success ? (
                              <CheckCircle2 className="h-4 w-4" />
                            ) : (
                              <AlertTriangle className="h-4 w-4" />
                            )}

                            {status}

                          </div>

                        </td>

                      </tr>
                    );
                  }
                )
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}