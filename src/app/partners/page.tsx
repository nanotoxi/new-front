"use client";

import { SiteHeader } from "@/components/marketing/site-header";
import { motion } from "framer-motion";
import { FlaskConical, BookOpen, Microscope } from "lucide-react";

const researchers = [
  {
    name: "Dr. Pravin Walke",
    title: "FMASC",
    role: "Research Collaborator",
    contribution:
      "Contributed domain expertise in nanoparticle physicochemistry and toxicological profiling, supporting literature curation and dataset quality validation.",
    href: "https://www.linkedin.com/in/dr-pravin-walke-fmasc-341b0410/",
    initials: "PW",
    accent: "from-cyan-400 to-blue-500",
    border: "border-cyan-500/20",
    ring: "ring-cyan-400/25",
    iconBg: "bg-cyan-500/10",
    iconColor: "text-cyan-400",
    icon: FlaskConical,
    glow: "hover:shadow-[0_0_60px_rgba(34,211,238,0.12)]",
  },
  {
    name: "Himadri Medhi",
    title: "Ph.D",
    role: "Research Collaborator",
    contribution:
      "Provided expertise in nanotoxicology research, contributing to the curation and validation of biological endpoints and cell-line exposure data across the training corpus.",
    href: "https://www.linkedin.com/in/himadri-medhi-ph-d-24a3b430/",
    initials: "HM",
    accent: "from-violet-400 to-blue-500",
    border: "border-violet-500/20",
    ring: "ring-violet-400/25",
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-400",
    icon: Microscope,
    glow: "hover:shadow-[0_0_60px_rgba(139,92,246,0.12)]",
  },
  {
    name: "Rutuja Gumathannavar",
    title: "",
    role: "Research Collaborator",
    contribution:
      "Assisted in the systematic extraction and annotation of nanoparticle toxicity records from peer-reviewed literature, directly contributing to the 17,000+ record training dataset.",
    href: "https://www.linkedin.com/in/rutuja-gumathannavar-655399183/",
    initials: "RG",
    accent: "from-sky-400 to-cyan-500",
    border: "border-sky-500/20",
    ring: "ring-sky-400/25",
    iconBg: "bg-sky-500/10",
    iconColor: "text-sky-400",
    icon: BookOpen,
    glow: "hover:shadow-[0_0_60px_rgba(56,189,248,0.12)]",
  },
];

export default function PartnersPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020617] text-white">
      <SiteHeader />

      <div className="absolute left-[-200px] top-[-100px] h-[500px] w-[500px] rounded-full bg-cyan-500/8 blur-[160px]" />
      <div className="absolute bottom-[-150px] right-[-150px] h-[400px] w-[400px] rounded-full bg-violet-500/8 blur-[140px]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:70px_70px]" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 pb-32 pt-36">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-6 text-center"
        >
          <div className="mb-6 inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-6 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Research Network
          </div>
          <h1
            className="text-5xl font-black uppercase leading-[0.9] md:text-[4rem]"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            Research
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Partners
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/55">
            NanoToxi AI was built on a foundation of curated scientific knowledge.
            These researchers contributed directly to the literature review and dataset
            that powers our RF v16 model.
          </p>
        </motion.div>

        {/* DATASET STAT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-16 flex justify-center"
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-7 py-3">
            <span className="text-2xl font-black text-cyan-300">17,934</span>
            <span className="text-sm text-white/45 uppercase tracking-[0.2em]">literature-curated records · RF v16 training corpus</span>
          </div>
        </motion.div>

        {/* RESEARCHER CARDS */}
        <div className="grid gap-8 md:grid-cols-3">
          {researchers.map((r, index) => {
            const Icon = r.icon;
            return (
              <motion.a
                key={r.name}
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`group flex flex-col rounded-[2rem] border ${r.border} bg-white/[0.02] p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 ${r.glow}`}
              >

                {/* TOP ROW */}
                <div className="mb-6 flex items-center gap-4">
                  <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full ring-2 ${r.ring} bg-white/[0.04]`}>
                    <span className={`text-xl font-black bg-gradient-to-br ${r.accent} bg-clip-text text-transparent`}>
                      {r.initials}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-black leading-tight">
                      {r.name}
                      {r.title && (
                        <span className="ml-1.5 text-sm font-semibold text-white/40">{r.title}</span>
                      )}
                    </h3>
                    <p className={`mt-0.5 text-xs font-semibold uppercase tracking-[0.18em] bg-gradient-to-r ${r.accent} bg-clip-text text-transparent`}>
                      {r.role}
                    </p>
                  </div>
                </div>

                {/* ICON */}
                <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-2xl ${r.iconBg}`}>
                  <Icon className={`h-5 w-5 ${r.iconColor}`} />
                </div>

                {/* CONTRIBUTION */}
                <p className="flex-1 text-sm leading-relaxed text-white/50">
                  {r.contribution}
                </p>

                {/* LINKEDIN */}
                <div className={`mt-6 inline-flex items-center gap-2 rounded-full border ${r.border} px-4 py-1.5 text-xs font-semibold text-white/40 transition-all duration-300 group-hover:text-white/70`}>
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  View Profile
                </div>

              </motion.a>
            );
          })}
        </div>

        {/* ACKNOWLEDGEMENT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 rounded-[2rem] border border-white/8 bg-white/[0.02] p-10 text-center"
        >
          <h2
            className="text-2xl font-black uppercase"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            Acknowledgement
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-white/50">
            The RF v16 model owes its performance to the quality of the underlying dataset.
            The rigorous literature curation carried out by our research collaborators —
            spanning hundreds of peer-reviewed publications — is what makes NanoToxi AI's
            predictions reliable. We are grateful for their scientific expertise and commitment
            to advancing safer nanoparticle research.
          </p>
        </motion.div>

      </div>
    </main>
  );
}
