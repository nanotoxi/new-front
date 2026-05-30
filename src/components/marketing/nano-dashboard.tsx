"use client";

import { motion } from "framer-motion";

import {
  useEffect,
  useState,
} from "react";

const stableParticles =
  Array.from(
    { length: 50 },
    (_, i) => ({
      left:
        (i * 19) % 95,

      duration:
        4 + (i % 3),

      delay:
        (i % 5) * 0.4,
    })
  );

const nodes = [
  {
    label: "Size",
    value: "12nm",
    x: 80,
    y: 220,
    size: 28,
    color: "#06B6D4",
    delay: 0,
  },

  {
    label: "ζ-pot",
    value: "-18mV",
    x: 180,
    y: 200,
    size: 48,
    color: "#2563EB",
    delay: 0.2,
  },

  {
    label: "Surface",
    value: "48m²/g",
    x: 320,
    y: 190,
    size: 72,
    color: "#22D3EE",
    glow: true,
    delay: 0.4,
  },

  {
    label: "Dose",
    value: "50µg",
    x: 450,
    y: 205,
    size: 30,
    color: "#06B6D4",
    delay: 0.6,
  },

  {
    label: "Shape",
    value: "Sphere",
    x: 560,
    y: 200,
    size: 52,
    color: "#4338CA",
    delay: 0.8,
  },

  {
    label: "Coat",
    value: "PEG",
    x: 690,
    y: 220,
    size: 76,
    color: "#22D3EE",
    glow: true,
    delay: 1,
  },

  {
    label: "pH",
    value: "7.4",
    x: 820,
    y: 230,
    size: 30,
    color: "#06B6D4",
    delay: 1.2,
  },
];

interface Props {
  step?: string;
}

function DashboardOverlay() {

  return (
    <>

      {/* GRID */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #22d3ee 1px, transparent 1px),
            linear-gradient(to bottom, #22d3ee 1px, transparent 1px)
          `,
          backgroundSize:
            "40px 40px",
        }}
      />

      {/* SCANLINE */}
      <motion.div
        animate={{
          y: [
            "-100%",
            "120%",
          ],
        }}

        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear",
        }}

        className="
          absolute
          inset-x-0
          h-40
          bg-gradient-to-b
          from-transparent
          via-cyan-400/10
          to-transparent
        "
      />

      {/* TOP GLOW */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-cyan-400/5 to-transparent" />

      {/* LIVE STATUS */}
      <div className="absolute right-8 top-8 z-20 flex items-center gap-3">

        <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />

        <span className="text-[11px] tracking-[0.25em] text-green-300">

          LIVE ANALYSIS

        </span>

      </div>

    </>
  );
}

export default function NanoDashboard({
  step = "01",
}: Props) {

  const [mounted, setMounted] =
    useState(false);

  useEffect(() => {

    setMounted(true);

  }, []);

  if (!mounted)
    return null;

  /* ================= STEP 2 ================= */

  if (step === "02") {

    const particles =
      Array.from(
        { length: 30 },
        (_, i) => ({
          x:
            (i * 73) % 760,

          y:
            (i * 47) % 460,

          size:
            2 + (i % 5),

          delay:
            i * 0.08,
        })
      );

    const clusters = [
      {
        x: 250,
        y: 220,
      },

      {
        x: 360,
        y: 190,
      },

      {
        x: 470,
        y: 240,
      },

      {
        x: 560,
        y: 210,
      },
    ];

    return (
      <div className="relative h-[460px] w-[760px] overflow-hidden rounded-[40px] bg-gradient-to-br from-[#071226] via-[#030712] to-[#07192f]">

        <DashboardOverlay />

        <div className="absolute left-10 top-10">

          <p className="text-xs tracking-[0.3em] text-cyan-300/60">

            AGGREGATION SIMULATION

          </p>

        </div>

        <div className="absolute left-[360px] top-[200px] h-28 w-28 rounded-full bg-cyan-400/10 blur-[50px]" />

        <svg
          className="absolute inset-0"
          width="760"
          height="460"
        >

          {particles.map(
            (
              particle,
              i
            ) => {

              const cluster =
                clusters[
                  i %
                    clusters.length
                ];

              return (
                <motion.circle
                  key={`particle-${i}`}
                  cx={particle.x}
                  cy={particle.y}
                  r={particle.size}
                  fill="#22D3EE"
                  opacity="0.7"

                  animate={{
                    cx: [
                      particle.x,
                      cluster.x,
                    ],

                    cy: [
                      particle.y,
                      cluster.y,
                    ],

                    opacity: [
                      0.15,
                      1,
                      0.15,
                    ],
                  }}

                  transition={{
                    duration:
                      5 +
                      (i % 4),

                    repeat:
                      Infinity,

                    repeatType:
                      "reverse",

                    ease: "easeInOut",

                    delay:
                      particle.delay,
                  }}

                  style={{
                    filter:
                      "drop-shadow(0 0 12px #22D3EE)",
                  }}
                />
              );
            }
          )}

        </svg>

      </div>
    );
  }

  /* ================= STEP 3 ================= */

  if (step === "03") {

    return (
      <div className="relative h-[460px] w-[760px] overflow-hidden rounded-[40px] bg-gradient-to-br from-[#071226] via-[#030712] to-[#07192f]">

        <DashboardOverlay />

        <div className="absolute inset-0 bg-gradient-to-br from-red-500/[0.03] via-transparent to-cyan-500/[0.03]" />

        <motion.div
          className="absolute left-0 h-[3px] w-full bg-cyan-400/80"

          animate={{
            top: [
              190,
              240,
              190,
            ],
          }}

          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {stableParticles.map(
          (_, i) => {

            const toxic =
              i % 8 === 0;

            return (
              <motion.div
                key={`fall-${i}`}

                className={`absolute rounded-full ${
                  toxic
                    ? "bg-red-500"
                    : "bg-cyan-400"
                }`}

                style={{
                  width: toxic
                    ? 14
                    : 8,

                  height: toxic
                    ? 14
                    : 8,

                  left: `${stableParticles[i].left}%`,
                }}

                animate={{
                  y: [
                    -100,
                    520,
                  ],

                  opacity: [
                    0,
                    1,
                    1,
                    0,
                  ],
                }}

                transition={{
                  duration:
                    stableParticles[
                      i
                    ].duration,

                  repeat:
                    Infinity,

                  ease: "linear",

                  delay:
                    stableParticles[
                      i
                    ].delay,
                }}
              />
            );
          }
        )}

        <motion.div
          animate={{
            opacity: [
              0.4,
              1,
              0.4,
            ],
          }}

          transition={{
            duration: 1.2,
            repeat: Infinity,
          }}

          className="
            absolute
            right-8
            bottom-8
            rounded-2xl
            border
            border-red-500/20
            bg-red-500/10
            px-5
            py-3
            text-sm
            text-red-300
          "
        >

          TOXICITY DETECTED

        </motion.div>

      </div>
    );
  }

  /* ================= STEP 4 ================= */

  /* ================= STEP 4 ================= */

if (step === "04") {

  const arcDots = Array.from(
    { length: 34 },
    (_, i) => {

      const angle =
        Math.PI * (i / 33);

      const radius = 360;

      return {
        x:
          380 +
          Math.cos(angle) *
            radius,

        y:
          420 -
          Math.sin(angle) *
            radius,
      };
    }
  );

  const dangerZones = [
    {
      x: 120,
      y: 330,
      size: 65,
    },

    {
      x: 210,
      y: 290,
      size: 55,
    },

    {
      x: 330,
      y: 120,
      size: 40,
    },

    {
      x: 420,
      y: 150,
      size: 48,
    },
  ];

  return (

    <div className="relative h-[460px] w-[760px] overflow-hidden rounded-[40px] bg-gradient-to-br from-[#050816] via-[#020617] to-[#07192f]">

      <DashboardOverlay />

      {/* CENTER GLOW */}
      <div className="absolute left-1/2 bottom-[-80px] h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px]" />

      {/* RADIAL ARC */}
      <svg
        className="absolute inset-0"
        width="760"
        height="460"
      >

        {/* ARC DOTS */}
        {arcDots.map(
          (dot, i) => {

            const innerX =
              dot.x -
              (dot.x - 380) *
                0.08;

            const innerY =
              dot.y -
              (dot.y - 420) *
                0.08;

            return (

              <g key={i}>

                {/* CONNECTOR */}
                <line
                  x1={innerX}
                  y1={innerY}
                  x2={dot.x}
                  y2={dot.y}
                  stroke="rgba(34,211,238,0.55)"
                  strokeWidth="2"
                />

                {/* GLOW DOT */}
                <motion.circle
                  cx={dot.x}
                  cy={dot.y}
                  r="5"
                  fill="#06B6D4"

                  animate={{
                    opacity: [0.4, 1, 0.4],

                    scale: [1, 1.3, 1],

                    cy: [
                      dot.y,
                      dot.y - 10,
                      dot.y,
                      dot.y + 6,
                      dot.y,
                    ],
                  }}

                  transition={{
                    duration:
                      2 + (i % 5),

                    repeat: Infinity,

                    ease: "easeInOut",
                  }}

                  style={{
                    filter:
                      "drop-shadow(0 0 12px #22d3ee)",
                  }}
                />

              </g>
            );
          }
        )}

      </svg>

      {/* DANGER ZONES */}
      {dangerZones.map(
        (zone, i) => (

          <motion.div
            key={i}

            initial={{
              x: 0,
              y: 0,
            }}

            animate={{

              scale: [1, 1.12, 1],

              opacity: [0.4, 1, 0.4],

              x: [0, 12, -10, 0],

              y: [0, -14, 8, 0],
            }}

            transition={{
              duration: 5 + i,

              repeat: Infinity,

              ease: "easeInOut",
            }}

            className="absolute rounded-full bg-red-500/20 backdrop-blur-xl"

            style={{
              left: zone.x,
              top: zone.y,
              width: zone.size,
              height: zone.size,
            }}
          >

            {/* INNER RED CORE */}
            <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500 shadow-[0_0_25px_rgba(239,68,68,0.9)]" />

          </motion.div>
        )
      )}

      {/* FLOATING CYAN PARTICLES */}
      {[...Array(12)].map(
        (_, i) => (

          <motion.div
            key={i}

            animate={{
              y: [0, -20, 0],

              x: [0, 10, -8, 0],

              opacity: [0.2, 0.8, 0.2],
            }}

            transition={{
              duration: 4 + i,

              repeat: Infinity,

              ease: "easeInOut",
            }}

            className="absolute h-1 w-1 rounded-full bg-cyan-400"

            style={{
              left: `${8 + i * 7}%`,
              top: `${20 + (i % 5) * 12}%`,

              boxShadow:
                "0 0 12px #22d3ee",
            }}
          />
        )
      )}

      {/* FLOATING RED TOXIC PARTICLES */}
      {[...Array(8)].map(
        (_, i) => (

          <motion.div
            key={`toxic-${i}`}

            animate={{
              y: [0, -20, 0],

              x: [0, 12, -10, 0],

              opacity: [0.2, 0.8, 0.2],

              scale: [1, 1.4, 1],
            }}

            transition={{
              duration: 4 + i,

              repeat: Infinity,

              ease: "easeInOut",
            }}

            className="absolute rounded-full bg-red-500"

            style={{
              width: `${4 + (i % 3) * 2}px`,
              height: `${4 + (i % 3) * 2}px`,

              left: `${10 + i * 10}%`,
              top: `${30 + (i % 4) * 10}%`,

              filter:
                "drop-shadow(0 0 12px rgba(239,68,68,0.9))",
            }}
          />
        )
      )}

      {/* LABEL */}
     

    </div>
  );
}

 /* ================= STEP 5 ================= */

if (step === "05") {

  const radarDots = [
    { top: "26%", left: "33%", danger: false },
    { top: "34%", left: "57%", danger: false },
    { top: "45%", left: "78%", danger: true },
    { top: "58%", left: "62%", danger: false },
    { top: "73%", left: "69%", danger: false },
    { top: "82%", left: "53%", danger: false },
    { top: "66%", left: "36%", danger: false },
    { top: "48%", left: "24%", danger: true },
    { top: "60%", left: "18%", danger: true },
    { top: "72%", left: "28%", danger: true },
  ];

  return (

    <div className="relative h-[460px] w-[760px] overflow-hidden rounded-[40px] bg-gradient-to-br from-[#050816] via-[#020617] to-[#07192f]">

      <DashboardOverlay />

      {/* BACKGROUND GRID */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #22d3ee 1px, transparent 1px),
            linear-gradient(to bottom, #22d3ee 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* RADAR CONTAINER */}
      <div className="absolute inset-0 flex items-center justify-center">

        <div className="relative h-[470px] w-[470px]">

          {/* OUTER GLOW */}
          <div className="absolute inset-0 rounded-full bg-cyan-500/[0.03] blur-[120px]" />

          {/* RADAR RINGS */}
          {[1, 2, 3, 4].map((ring) => (

            <div
              key={ring}
              className="absolute rounded-full border border-cyan-500/10"

              style={{
                width: `${ring * 110}px`,
                height: `${ring * 110}px`,
                left: "50%",
                top: "50%",
                transform:
                  "translate(-50%, -50%)",
              }}
            />
          ))}

          {/* CROSS AXIS */}
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-cyan-500/10" />

          <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-cyan-500/10" />

          {/* SWEEP CONE */}
          <motion.div
            animate={{
              rotate: [0, 360],
            }}

            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}

            className="
              absolute
              left-1/2
              top-1/2
              h-[220px]
              w-[220px]
              origin-top-left
            "
          >

            <div
              className="
                absolute
                left-0
                top-0
                h-full
                w-full
                rounded-br-full
                bg-gradient-to-br
                from-cyan-400/30
                via-cyan-400/10
                to-transparent
                blur-[2px]
              "
              style={{
                clipPath:
                  "polygon(0 0, 100% 0, 0 100%)",
              }}
            />

          </motion.div>

          {/* MAIN RADAR LINE */}
          <motion.div
            animate={{
              rotate: [0, 360],
            }}

            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}

            className="
              absolute
              left-1/2
              top-1/2
              h-[2px]
              w-[220px]
              origin-left
              bg-cyan-400
              shadow-[0_0_20px_#22d3ee]
            "
          />

          {/* CENTER DOT */}
          <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400 shadow-[0_0_25px_#22d3ee]" />

          {/* RADAR POINTS */}
          {radarDots.map((dot, index) => (

            <motion.div
              key={index}

              animate={{
                opacity: [0.4, 1, 0.4],
                scale: [1, 1.3, 1],
              }}

              transition={{
                duration: 2 + index * 0.2,
                repeat: Infinity,
              }}

              className={`absolute rounded-full ${
                dot.danger
                  ? "bg-red-500 shadow-[0_0_30px_rgba(239,68,68,0.9)]"
                  : "bg-cyan-400 shadow-[0_0_30px_#22d3ee]"
              }`}

              style={{
                top: dot.top,
                left: dot.left,
                width: dot.danger ? "14px" : "12px",
                height: dot.danger ? "14px" : "12px",
              }}
            />
          ))}

        </div>

      </div>

      {/* BOTTOM LABEL */}
      

    </div>
  );
} 

  /* ================= STEP 6 ================= */
if (step === "06") {

  const columns = Array.from(
    { length: 18 },
    (_, i) => i
  );

  const reportWords = [
    "TOXIC",
    "SAFE",
    "ROS",
    "HIGH",
    "LOW",
    "CdSe",
    "TiO₂",
    "ZnO",
    "Ag",
    "0.952",
    "0.88",
    "pH",
    "LD₅₀",
    "AU",
    "NP",
    "NON-TOXIC",
  ];

  return (

    <div className="relative h-[460px] w-[760px] overflow-hidden rounded-[40px] bg-gradient-to-br from-[#050816] via-[#020617] to-[#07192f]">

      <DashboardOverlay />

      {/* BACKGROUND GRID */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #22d3ee 1px, transparent 1px),
            linear-gradient(to bottom, #22d3ee 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* CENTER GLOW */}
      <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/5 blur-[120px]" />

      {/* DATA STREAM COLUMNS */}
      {columns.map((column, colIndex) => (

        <motion.div
          key={colIndex}

          animate={{
            y: [-120, 0],
          }}

          transition={{
            duration: 10 + colIndex,
            repeat: Infinity,
            ease: "linear",
          }}

          className="absolute top-0 flex flex-col gap-1"

          style={{
            left: `${colIndex * 5.5}%`,
          }}
        >

          {Array.from({ length: 42 }).map(
            (_, rowIndex) => {

              const word =
                reportWords[
                  Math.floor(
                    Math.random() *
                      reportWords.length
                  )
                ];

              const bright =
                Math.random() > 0.82;

              return (

                <motion.div
                  key={rowIndex}

                  animate={{
                    opacity: bright
                      ? [0.3, 1, 0.3]
                      : [0.08, 0.25, 0.08],
                  }}

                  transition={{
                    duration:
                      2 +
                      (rowIndex % 5),

                    repeat: Infinity,
                  }}

                  className={`
                    whitespace-nowrap
                    text-[11px]
                    font-semibold
                    tracking-[0.08em]
                    ${
                      bright
                        ? "text-cyan-400"
                        : "text-cyan-900/40"
                    }
                  `}
                >

                  {word}

                </motion.div>
              );
            }
          )}

        </motion.div>
      ))}

      {/* FLOATING PARTICLES */}
      {[...Array(20)].map(
        (_, i) => (

          <motion.div
            key={i}

            animate={{
              y: [0, -20, 0],

              opacity: [0.2, 0.8, 0.2],
            }}

            transition={{
              duration: 4 + i,

              repeat: Infinity,

              ease: "easeInOut",
            }}

            className="absolute h-[2px] w-[2px] rounded-full bg-cyan-400"

            style={{
              left: `${5 + i * 5}%`,
              top: `${10 + (i % 6) * 12}%`,

              boxShadow:
                "0 0 12px #22d3ee",
            }}
          />
        )
      )}

      {/* LABEL */}
      

    </div>
  );
}


  /* ================= STEP 7 ================= */

  /* ================= STEP 7 ================= */

if (step === "07") {

  return (

    <div className="relative h-[460px] w-[760px] overflow-hidden rounded-[40px] bg-gradient-to-br from-[#050816] via-[#020617] to-[#07192f]">

      <DashboardOverlay />

      {/* BACKGROUND GRID */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #22d3ee 1px, transparent 1px),
            linear-gradient(to bottom, #22d3ee 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* CENTER GLOW */}
      <div className="absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/5 blur-[120px]" />

      {/* LIVE ANALYSIS */}
      <div className="absolute right-10 top-8 flex items-center gap-3">

        <motion.div
          animate={{
            opacity: [0.4, 1, 0.4],
          }}

          transition={{
            duration: 2,
            repeat: Infinity,
          }}

          className="h-3 w-3 rounded-full bg-green-400"
        />

        

      </div>

      {/* MAIN FLOW */}
      <div className="absolute inset-0 flex items-center justify-center">

        <div className="relative flex items-center justify-center gap-6">

          {/* ================= LEFT CARD ================= */}
          <motion.div
            animate={{
              y: [0, -4, 0],
            }}

            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}

            className="
              relative
              flex
              h-[100px]
              w-[130px]
              flex-col
              items-center
              justify-center
              rounded-[20px]
              border
              border-cyan-400/20
              bg-cyan-500/5
              backdrop-blur-xl
            "
          >

            <p className="text-xs text-cyan-200/60">

              AI Result

            </p>

            <h3 className="mt-3 text-[26px] font-bold text-cyan-400">

              95.2%

            </h3>

          </motion.div>

          {/* ================= FLOW LINE 1 ================= */}
          <div className="relative flex items-center">

            <div className="h-px w-[80px] bg-gradient-to-r from-cyan-400/70 to-cyan-400/10" />

            <motion.div
              animate={{
                x: [-25, 25, -25],
                opacity: [0.3, 1, 0.3],
              }}

              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "linear",
              }}

              className="absolute left-1/2 h-5 w-5 -translate-x-1/2 rounded-full bg-cyan-400 shadow-[0_0_30px_#22d3ee]"
            />

            <div className="absolute right-[-4px] text-2xl text-cyan-400/70">

              →

            </div>

          </div>

          {/* ================= CENTER REVIEW ================= */}
          <div className="relative flex flex-col items-center">

            {/* HUMAN ICON */}
            <motion.div
              animate={{
                y: [0, -4, 0],
              }}

              transition={{
                duration: 3,
                repeat: Infinity,
              }}

              className="mb-5"
            >

              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                className="text-cyan-400"
              >

                <circle
                  cx="12"
                  cy="8"
                  r="3.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />

                <path
                  d="M5 19C6.5 15.5 17.5 15.5 19 19"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />

              </svg>

            </motion.div>

            {/* REVIEW BOX */}
            <motion.div
              animate={{
                y: [0, -4, 0],
              }}

              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}

              className="
                flex
                h-[120px]
                w-[170px]
                flex-col
                items-center
                justify-center
                rounded-[24px]
                border
                border-blue-500/20
                bg-blue-500/5
                backdrop-blur-xl
              "
            >

              <p className="text-sm text-cyan-200/60">

                Expert Review

              </p>

              <h3 className="mt-4 text-[18px] font-medium text-cyan-400">

                Nanotox. Sci.

              </h3>

            </motion.div>

          </div>

          {/* ================= FLOW LINE 2 ================= */}
          <div className="relative flex items-center">

            <div className="h-px w-[80px] bg-gradient-to-r from-cyan-400/70 to-cyan-400/10" />

            <motion.div
              animate={{
                x: [-25, 25, -25],
                opacity: [0.3, 1, 0.3],
              }}

              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "linear",
              }}

              className="absolute left-1/2 h-5 w-5 -translate-x-1/2 rounded-full bg-cyan-400 shadow-[0_0_30px_#22d3ee]"
            />

            <div className="absolute right-[-4px] text-2xl text-cyan-400/70">

              →

            </div>

          </div>

          {/* ================= FINAL CARD ================= */}
          <motion.div
            animate={{
              y: [0, -4, 0],
            }}

            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}

            className="
              relative
              flex
              h-[100px]
              w-[130px]
              flex-col
              items-center
              justify-center
              rounded-[20px]
              border
              border-cyan-400/20
              bg-cyan-500/5
              backdrop-blur-xl
            "
          >

            <p className="text-xs text-cyan-200/60">

              Validated

            </p>

            <h3 className="mt-3 text-[22px] font-bold text-cyan-400">

              Certified ✓

            </h3>

          </motion.div>

        </div>

      </div>

      {/* FLOATING PARTICLES */}
      {[...Array(10)].map((_, i) => (

        <motion.div
          key={i}

          animate={{
            y: [0, -20, 0],

            opacity: [0.2, 0.8, 0.2],
          }}

          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: "easeInOut",
          }}

          className="absolute h-[2px] w-[2px] rounded-full bg-cyan-400"

          style={{
            left: `${8 + i * 8}%`,
            top: `${20 + (i % 5) * 12}%`,

            boxShadow:
              "0 0 12px #22d3ee",
          }}
        />
      ))}

      {/* LABEL */}
     

    </div>
  );
}
  /* ================= STEP 1 ================= */

  return (
    <div className="relative h-[460px] w-[760px] overflow-hidden rounded-[40px] bg-gradient-to-br from-[#071226] via-[#030712] to-[#07192f]">

      <DashboardOverlay />

      <svg
        className="absolute inset-0"
        width="900"
        height="520"
        viewBox="0 0 900 520"
      >

        <motion.path
          d="
            M 80 220
            Q 140 190 180 200
            T 320 190
            T 450 205
            T 560 200
            T 690 220
            T 820 230
          "

          fill="transparent"

          stroke="rgba(34,211,238,0.18)"

          strokeWidth="2"

          initial={{
            pathLength: 0,
          }}

          animate={{
            pathLength: 1,
          }}

          transition={{
            duration: 3,
            ease: "easeInOut",
          }}
        />

        {nodes.map(
          (
            node,
            index
          ) => (

            <g
              key={`node-${index}`}
            >

              <motion.circle
                cx={node.x}
                cy={node.y}
                r={node.size / 2}

                fill="rgba(34,211,238,0.06)"

                stroke={
                  node.color
                }

                strokeWidth="2"

                animate={{
                  y: [
                    0,
                    -12,
                    0,
                    12,
                    0,
                  ],
                }}

                transition={{
                  duration: 5,
                  repeat:
                    Infinity,

                  delay:
                    node.delay,

                  ease: "easeInOut",
                }}
              />

            </g>
          )
        )}

      </svg>

      {/* METRIC PANELS */}

      <div className="absolute bottom-8 left-8 right-8 grid grid-cols-4 gap-4">

        {[
          "Surface Area",
          "Hydrodynamics",
          "ROS",
          "Stability",
        ].map(
          (
            item,
            i
          ) => (

            <motion.div
              key={item}

              animate={{
                y: [
                  0,
                  -4,
                  0,
                ],
              }}

              transition={{
                duration:
                  4 + i,
                repeat:
                  Infinity,
              }}

              className="
                rounded-2xl
                border
                border-cyan-400/10
                bg-cyan-500/[0.03]
                p-4
                backdrop-blur-xl
              "
            >

              <p className="text-[10px] tracking-[0.25em] text-white/40">

                {item}

              </p>

              <p className="mt-2 text-xl font-bold text-cyan-300">

                {(
                  90 +
                  i * 2
                ).toFixed(1)}
                %

              </p>

            </motion.div>
          )
        )}

      </div>

    </div>
  );
}