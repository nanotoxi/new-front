"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  Activity,
  ShieldCheck,
  Database,
  Cpu,
  AlertTriangle,
  CheckCircle2,
  Server,
  BrainCircuit,
} from "lucide-react";

import {
  useTheme,
} from "@/context/theme-context";

import {
  getSystemHealth,
} from "@/lib/admin-api";

type HealthData = {
  status?: string;

  database?: {
    connected?: boolean;
  };

  redis?: {
    connected?: boolean;
  };

  models?: Record<
    string,
    any
  >;

  disk?: {
    total_gb?: number;
    used_gb?: number;
    free_gb?: number;
  };

  timestamp?: string;

  recent_errors?: string[];

  version?: string;
};

export default function HealthPage() {

  const {
    theme,
  } = useTheme();

  const dark =
    theme === "dark";

  const [health, setHealth] =
    useState<HealthData>({});

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchHealth();

    const interval =
      setInterval(
        fetchHealth,
        15000
      );

    return () =>
      clearInterval(
        interval
      );

  }, []);

  const fetchHealth =
    async () => {

      try {

        setLoading(true);

        const res =
          await getSystemHealth();

        console.log(
          "SYSTEM HEALTH:",
          res
        );

        setHealth(
          res || {}
        );

      } catch (err) {

        console.error(
          "HEALTH ERROR:",
          err
        );

      } finally {

        setLoading(false);

      }
    };

  const apiStatus =
    health.status === "ok"
      ? "healthy"
      : "down";

  const modelStatus =
    health.models?.rf_v2_final
      ? "healthy"
      : "down";

  const databaseStatus =
    health.database?.connected
      ? "healthy"
      : "down";

  const redisStatus =
    health.redis?.connected
      ? "healthy"
      : "offline";

  const statusCards = [
    {
      title:
        "API Status",

      value:
        apiStatus.toUpperCase(),

      icon: Server,

      color:
        apiStatus ===
        "healthy"
          ? "from-green-400 to-emerald-500"
          : "from-red-400 to-red-500",
    },

    {
      title:
        "AI Models",

      value:
        Object.keys(
          health.models || {}
        ).length.toString(),

      icon: BrainCircuit,

      color:
        "from-cyan-400 to-blue-500",
    },

    {
      title:
        "Database",

      value:
        databaseStatus.toUpperCase(),

      icon: Database,

      color:
        databaseStatus ===
        "healthy"
          ? "from-purple-400 to-indigo-500"
          : "from-red-400 to-red-500",
    },

    {
      title:
        "Redis Cache",

      value:
        redisStatus.toUpperCase(),

      icon: ShieldCheck,

      color:
        redisStatus ===
        "healthy"
          ? "from-yellow-400 to-orange-500"
          : "from-red-400 to-red-500",
    },
  ];

  const metricCards = [
    {
      title:
        "Disk Used",

      value:
        health.disk?.used_gb || 0,

      unit: "GB",

      icon: Database,
    },

    {
      title:
        "Disk Free",

      value:
        health.disk?.free_gb || 0,

      unit: "GB",

      icon:
        ShieldCheck,
    },

    {
      title:
        "Total Disk",

      value:
        health.disk?.total_gb || 0,

      unit: "GB",

      icon: Cpu,
    },

    {
      title:
        "Environment",

      value:
        "PROD",

      unit: "",

      icon: Server,
    },
  ];

  return (

    <div className={`min-h-screen overflow-x-hidden p-4 md:p-6 xl:p-8 transition-all duration-300 ${
      dark
        ? "bg-[#020817]"
        : "bg-[#f4f7fb]"
    }`}>

      {/* HEADER */}

      <div
        className={`
          relative
          overflow-hidden
          rounded-[36px]
          border
          p-4
          md:p-6
          xl:p-10
          shadow-sm
          ${
            dark
              ? "border-white/10 bg-[#0F172A]"
              : "border-slate-200 bg-white"
          }
        `}
      >

        <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

          <div className="min-w-0">

            <div
              className="
                mb-5
                inline-flex
                max-w-full
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

              <Activity className="h-4 w-4 shrink-0" />

              System Monitoring Active

            </div>

            <h1
              className={`text-3xl md:text-4xl font-black tracking-tight break-words ${
                dark
                  ? "text-white"
                  : "text-[#0f172a]"
              }`}
            >

              System Health

            </h1>

            <p
              className={`mt-5 max-w-3xl text-base md:text-lg leading-relaxed ${
                dark
                  ? "text-slate-400"
                  : "text-slate-500"
              }`}
            >

              Monitor AI infrastructure,
              APIs, models, database systems,
              and real-time platform health.

            </p>

          </div>

          <div className="hidden shrink-0 lg:block">

            <div
              className={`
                flex
                h-32
                w-32
                xl:h-40
                xl:w-40
                items-center
                justify-center
                rounded-full
                border-8
                ${
                  apiStatus ===
                  "healthy"
                    ? "border-green-400/30"
                    : "border-red-400/30"
                }
                ${
                  dark
                    ? "bg-[#020817]"
                    : "bg-white"
                }
              `}
            >

              <div
                className={`
                  flex
                  h-20
                  w-20
                  xl:h-24
                  xl:w-24
                  items-center
                  justify-center
                  rounded-full
                  ${
                    apiStatus ===
                    "healthy"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }
                  text-white
                `}
              >

                {apiStatus ===
                "healthy" ? (
                  <CheckCircle2 className="h-10 w-10 xl:h-12 xl:w-12" />
                ) : (
                  <AlertTriangle className="h-10 w-10 xl:h-12 xl:w-12" />
                )}

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* STATUS CARDS */}

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">

        {statusCards.map(
          (
            card,
            index
          ) => {

            const Icon =
              card.icon;

            return (

              <div
                key={index}
                className={`
                  rounded-[30px]
                  border
                  p-4
                  md:p-6
                  xl:p-7
                  shadow-sm
                  overflow-hidden
                  ${
                    dark
                      ? "border-white/10 bg-[#0F172A]"
                      : "border-slate-200 bg-white"
                  }
                `}
              >

                <div className="flex flex-wrap items-start justify-between gap-4">

                  <div
                    className={`
                      flex
                      h-16
                      w-16
                      shrink-0
                      items-center
                      justify-center
                      rounded-2xl
                      bg-gradient-to-br
                      ${card.color}
                      text-white
                    `}
                  >

                    <Icon className="h-8 w-8" />

                  </div>

                  <div
                    className={`
                      rounded-full
                      px-4
                      py-1
                      text-sm
                      font-semibold
                      whitespace-nowrap
                      ${
                        dark
                          ? "bg-white/10 text-slate-300"
                          : "bg-slate-100 text-slate-600"
                      }
                    `}
                  >

                    Live

                  </div>

                </div>

                <p className={`mt-8 text-base md:text-lg break-words ${
                  dark
                    ? "text-slate-400"
                    : "text-slate-500"
                }`}>

                  {card.title}

                </p>

                <h2
                  className={`mt-3 text-2xl md:text-3xl font-black break-words ${
                    dark
                      ? "text-white"
                      : "text-[#0f172a]"
                  }`}
                >

                  {card.value}

                </h2>

              </div>
            );
          }
        )}

      </div>

      {/* METRICS */}

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">

        {metricCards.map(
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
                  rounded-[30px]
                  border
                  p-4
                  md:p-6
                  xl:p-7
                  shadow-sm
                  overflow-hidden
                  ${
                    dark
                      ? "border-white/10 bg-[#0F172A]"
                      : "border-slate-200 bg-white"
                  }
                `}
              >

                <div className="flex items-center justify-between gap-4">

                  <h3 className={`text-lg md:text-xl font-bold break-words ${
                    dark
                      ? "text-white"
                      : "text-[#0f172a]"
                  }`}>

                    {item.title}

                  </h3>

                  <Icon className="h-6 w-6 shrink-0 text-cyan-500" />

                </div>

                <div className="mt-8 flex flex-wrap items-end gap-3">

                  <h2
                    className={`
                      text-2xl
                      md:text-3xl
                      font-black
                      leading-none
                      tracking-tight
                      break-words
                      ${
                        dark
                          ? "text-white"
                          : "text-[#0f172a]"
                      }
                    `}
                  >

                    {typeof item.value === "number"
                      ? item.value.toFixed(1)
                      : item.value}

                  </h2>

                  <span
                    className="
                      mb-1
                      text-sm
                      font-medium
                      text-slate-400
                      break-words
                    "
                  >

                    {item.unit}

                  </span>

                </div>

              </div>
            );
          }
        )}

      </div>

      {/* ERROR LOGS */}

      <div
        className={`
          mt-8
          rounded-[36px]
          border
          p-4
          md:p-6
          xl:p-8
          shadow-sm
          overflow-hidden
          ${
            dark
              ? "border-white/10 bg-[#0F172A]"
              : "border-slate-200 bg-white"
          }
        `}
      >

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div className="min-w-0">

            <h2
              className={`text-xl xl:text-2xl font-extrabold leading-none break-words ${
                dark
                  ? "text-white"
                  : "text-[#0f172a]"
              }`}
            >

              Recent Error Logs

            </h2>

            <p className={`mt-2 break-words ${
              dark
                ? "text-slate-400"
                : "text-slate-500"
            }`}>

              Live backend monitoring
              and anomaly tracking.

            </p>

          </div>

          <div
            className="
              w-fit
              rounded-full
              bg-red-500/10
              px-5
              py-2
              text-sm
              font-semibold
              text-red-500
              whitespace-nowrap
            "
          >

            {health.recent_errors?.length || 0} Issues

          </div>

        </div>

        <div className="mt-8 space-y-4">

          {health.recent_errors &&
          health.recent_errors.length > 0 ? (

            health.recent_errors.map(
              (
                error,
                index
              ) => (

                <div
                  key={index}
                  className={`
                    flex
                    flex-col
                    gap-4
                    rounded-2xl
                    border
                    p-5
                    sm:flex-row
                    sm:items-center
                    ${
                      dark
                        ? "border-red-500/20 bg-red-500/[0.05]"
                        : "border-red-500/10 bg-red-500/[0.03]"
                    }
                  `}
                >

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-500">

                    <AlertTriangle className="h-6 w-6" />

                  </div>

                  <div className="min-w-0">

                    <h4 className={`font-semibold break-words ${
                      dark
                        ? "text-white"
                        : "text-[#0f172a]"
                    }`}>

                      Critical System Alert

                    </h4>

                    <p className={`mt-1 break-words ${
                      dark
                        ? "text-slate-400"
                        : "text-slate-500"
                    }`}>

                      {error}

                    </p>

                  </div>

                </div>
              )
            )

          ) : (

            <div
              className={`
                flex
                flex-col
                gap-5
                rounded-2xl
                border
                p-6
                sm:flex-row
                sm:items-center
                ${
                  dark
                    ? "border-green-500/20 bg-green-500/[0.05]"
                    : "border-green-500/10 bg-green-500/[0.03]"
                }
              `}
            >

              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-500/10 text-green-500">

                <CheckCircle2 className="h-7 w-7" />

              </div>

              <div className="min-w-0">

                <h4 className={`text-lg font-bold break-words ${
                  dark
                    ? "text-white"
                    : "text-[#0f172a]"
                }`}>

                  No Errors Detected

                </h4>

                <p className={`mt-1 break-words ${
                  dark
                    ? "text-slate-400"
                    : "text-slate-500"
                }`}>

                  All NanoToxi AI systems are operating normally.

                </p>

              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}