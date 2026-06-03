"use client";

import { SiteHeader } from "@/components/marketing/site-header";
import { motion } from "framer-motion";
import { Shield, Eye, Lock, Database, UserCheck, Bell } from "lucide-react";

const sections = [
  {
    icon: Eye,
    title: "Information We Collect",
    content: [
      "Account information you provide when registering, including name, email address, and organisation name.",
      "Nanoparticle input data submitted through the prediction and comparison interfaces. This data is used solely to generate predictions and is not shared with third parties.",
      "Usage data including pages visited, features used, session duration, and interaction patterns — collected to improve platform performance and user experience.",
      "Technical information such as IP address, browser type, operating system, and device identifiers for security and fraud prevention purposes.",
      "Communications you send us via the contact form, support requests, or email.",
    ],
  },
  {
    icon: Database,
    title: "How We Use Your Information",
    content: [
      "To deliver, maintain, and improve the NanoToxi AI platform and its prediction services.",
      "To authenticate your identity and manage your account access and subscription.",
      "To train and validate our machine learning models — only using aggregated, anonymised input data where you have explicitly consented.",
      "To communicate service updates, security notices, and relevant product announcements.",
      "To comply with applicable laws, regulations, and legal obligations, including nanotechnology research compliance frameworks.",
      "To detect and prevent fraud, abuse, and security threats to the platform.",
    ],
  },
  {
    icon: Lock,
    title: "Data Storage and Security",
    content: [
      "All data is stored on encrypted infrastructure. Data at rest is encrypted using AES-256 and data in transit is protected by TLS 1.3.",
      "Prediction inputs and outputs are stored in isolated database instances with access controls limited to authorised personnel only.",
      "We conduct regular security audits and penetration testing to identify and remediate vulnerabilities.",
      "Backups are encrypted and stored in geographically redundant locations to ensure availability.",
      "We retain your personal data for as long as your account is active or as required to fulfil legal and contractual obligations.",
    ],
  },
  {
    icon: UserCheck,
    title: "Your Rights",
    content: [
      "You have the right to access, correct, or delete your personal data at any time by contacting us at privacy@nanotoxi.ai.",
      "You may request a portable copy of your data in a machine-readable format.",
      "You may opt out of non-essential communications and analytics tracking through your account settings.",
      "You may request that we restrict processing of your personal data in certain circumstances.",
      "If you believe your data has been handled incorrectly, you have the right to lodge a complaint with the relevant supervisory authority in your jurisdiction.",
    ],
  },
  {
    icon: Shield,
    title: "Third-Party Services",
    content: [
      "NanoToxi AI uses select third-party infrastructure providers (cloud hosting, analytics, authentication) who are contractually bound to process your data only as instructed.",
      "We do not sell, rent, or trade your personal information to any third party for marketing purposes.",
      "We may share aggregated, anonymised research insights with academic or industry partners — these insights cannot be used to identify you.",
      "Our backend API is hosted on Railway. Our frontend is deployed via Vercel. Both providers maintain SOC 2 compliance.",
    ],
  },
  {
    icon: Bell,
    title: "Changes to This Policy",
    content: [
      "We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or legal requirements.",
      "Material changes will be communicated via email or a prominent notice on the platform at least 14 days before taking effect.",
      "Continued use of the platform after changes take effect constitutes acceptance of the updated policy.",
      "The date of the most recent update is shown at the bottom of this page.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020617] text-white">
      <SiteHeader />

      {/* GLOW */}
      <div className="absolute left-[-200px] top-[-100px] h-[500px] w-[500px] rounded-full bg-cyan-500/8 blur-[160px]" />
      <div className="absolute bottom-[-150px] right-[-150px] h-[400px] w-[400px] rounded-full bg-blue-500/8 blur-[140px]" />

      {/* GRID */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:70px_70px]" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 pb-32 pt-36">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <div className="mb-6 inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-6 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Legal
          </div>
          <h1
            className="text-5xl font-black uppercase leading-[0.9] md:text-[4rem]"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            Privacy
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Policy
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/55">
            This policy explains how NanoToxi AI collects, uses, and protects your
            personal data. We are committed to transparency and your right to
            privacy.
          </p>
          <p className="mt-4 text-sm text-white/30">Last updated: June 2026</p>
        </motion.div>

        {/* INTRO BOX */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12 rounded-[2rem] border border-cyan-500/15 bg-cyan-500/5 p-8"
        >
          <p className="leading-relaxed text-white/70">
            NanoToxi AI ("we", "our", "us") operates the nanotoxicity prediction platform
            available at nanotoxi.ai. This Privacy Policy applies to all users of the
            platform, including researchers, enterprise teams, and API consumers. By using
            our services, you agree to the collection and use of information as described
            in this policy.
          </p>
        </motion.div>

        {/* SECTIONS */}
        <div className="space-y-8">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="rounded-[2rem] border border-white/8 bg-white/[0.02] p-8 backdrop-blur-sm"
              >
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-500/10">
                    <Icon className="h-6 w-6 text-cyan-400" />
                  </div>
                  <h2
                    className="text-xl font-black uppercase tracking-wide"
                    style={{ fontFamily: "Orbitron, sans-serif" }}
                  >
                    {section.title}
                  </h2>
                </div>
                <ul className="space-y-3">
                  {section.content.map((item, i) => (
                    <li key={i} className="flex gap-3 text-white/60 leading-relaxed">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400/60" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* CONTACT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 rounded-[2rem] border border-cyan-500/20 bg-cyan-500/5 p-8 text-center"
        >
          <h3 className="text-xl font-bold">Questions about this policy?</h3>
          <p className="mt-3 text-white/55">
            Contact our data protection team at{" "}
            <a href="mailto:privacy@nanotoxi.ai" className="text-cyan-400 hover:underline">
              privacy@nanotoxi.ai
            </a>
          </p>
        </motion.div>

      </div>
    </main>
  );
}
