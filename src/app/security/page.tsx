"use client";

import { SiteHeader } from "@/components/marketing/site-header";
import { motion } from "framer-motion";
import { Lock, Server, ShieldCheck, KeyRound, AlertOctagon, RefreshCw } from "lucide-react";

const sections = [
  {
    icon: Lock,
    title: "Encryption",
    content: [
      "All data transmitted between your browser and NanoToxi AI servers is encrypted using TLS 1.3 — the current industry standard for transport security.",
      "Data at rest is encrypted using AES-256, applied to all databases, file stores, and backup archives.",
      "Sensitive fields including authentication credentials and API keys are hashed using bcrypt with a minimum cost factor of 12 before storage.",
      "Prediction payloads submitted via the API are encrypted in transit and are not logged in plaintext anywhere in our infrastructure.",
    ],
  },
  {
    icon: Server,
    title: "Infrastructure Security",
    content: [
      "The NanoToxi AI backend is deployed on Railway with network-level isolation. No backend service is exposed to the public internet except the designated API gateway.",
      "The frontend is deployed on Vercel's edge network with automatic DDoS mitigation and Web Application Firewall (WAF) rules.",
      "Database instances operate in private network segments with no direct inbound internet access. All queries are routed through the application layer.",
      "All infrastructure components are configured with the principle of least privilege — services are granted only the permissions they need to function.",
      "We use automated vulnerability scanning on all production containers and dependency graphs, with alerts for known CVEs.",
    ],
  },
  {
    icon: KeyRound,
    title: "Authentication and Access Control",
    content: [
      "User authentication is handled via JWT-based sessions with short expiration windows and automatic refresh token rotation.",
      "Passwords are never stored in plaintext. We enforce minimum password complexity requirements and rate-limit login attempts to prevent brute-force attacks.",
      "API keys are scoped to specific permissions and can be revoked instantly from the dashboard. Key values are shown only once at creation time.",
      "Admin access to production systems requires multi-factor authentication and is restricted to a named list of authorised personnel.",
      "All privileged actions in production environments are logged with user identity, timestamp, and action details for audit purposes.",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Application Security",
    content: [
      "NanoToxi AI is built with protection against OWASP Top 10 vulnerabilities, including SQL injection, cross-site scripting (XSS), cross-site request forgery (CSRF), and insecure deserialization.",
      "All user-supplied inputs, including nanoparticle parameters submitted for prediction, are validated and sanitised before processing.",
      "Content Security Policy (CSP) headers are enforced on all frontend responses to mitigate XSS attack vectors.",
      "We conduct periodic manual code reviews and automated static analysis on all code entering the production branch.",
      "Dependencies are monitored for known vulnerabilities using automated tooling, with critical patches applied within 24 hours of disclosure.",
    ],
  },
  {
    icon: AlertOctagon,
    title: "Incident Response",
    content: [
      "We maintain a documented incident response plan covering detection, containment, eradication, recovery, and post-incident review.",
      "In the event of a confirmed data breach affecting personal data, affected users will be notified within 72 hours in accordance with applicable data protection regulations.",
      "Security incidents are triaged by severity. Critical incidents (active breach, data exfiltration) trigger immediate escalation and a dedicated response team.",
      "Post-incident reports are produced for all high-severity events and are retained for a minimum of two years for audit purposes.",
      "To report a security vulnerability, please contact contact@nanotoxi.com. We operate a responsible disclosure policy and will acknowledge reports within 48 hours.",
    ],
  },
  {
    icon: RefreshCw,
    title: "Backups and Business Continuity",
    content: [
      "Production databases are backed up continuously with point-in-time recovery available for the previous 7 days.",
      "Backups are stored in encrypted, geographically separate storage from the primary infrastructure.",
      "We test restoration procedures quarterly to verify that backups are valid and recoverable within our target RTO.",
      "Our target Recovery Time Objective (RTO) for a full infrastructure failure is 4 hours. Our target Recovery Point Objective (RPO) is 1 hour.",
    ],
  },
];

export default function SecurityPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020617] text-white">
      <SiteHeader />

      <div className="absolute left-[-200px] top-[-100px] h-[500px] w-[500px] rounded-full bg-emerald-500/8 blur-[160px]" />
      <div className="absolute bottom-[-150px] right-[-150px] h-[400px] w-[400px] rounded-full bg-cyan-500/8 blur-[140px]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:70px_70px]" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 pb-32 pt-36">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <div className="mb-6 inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/10 px-6 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
            Trust &amp; Safety
          </div>
          <h1
            className="text-5xl font-black uppercase leading-[0.9] md:text-[3rem]"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            Security
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">
              Overview
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/55">
            Security is foundational to NanoToxi AI. Researchers trust us with sensitive
            data and we take that responsibility seriously at every layer of our stack.
          </p>
          <p className="mt-4 text-sm text-white/30">Last updated: June 2026</p>
        </motion.div>

        {/* SECURITY SCORE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12 grid gap-5 sm:grid-cols-3"
        >
          {[
            { label: "Encryption", value: "AES-256 + TLS 1.3" },
            { label: "Auth", value: "JWT + MFA" },
            { label: "Disclosure", value: "48h Response SLA" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-[2rem] border border-emerald-500/15 bg-emerald-500/5 p-6 text-center"
            >
              <p className="text-xs uppercase tracking-[0.25em] text-white/40">{item.label}</p>
              <p className="mt-2 text-lg font-black text-emerald-300">{item.value}</p>
            </div>
          ))}
        </motion.div>

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
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10">
                    <Icon className="h-6 w-6 text-emerald-400" />
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
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400/60" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 rounded-[2rem] border border-emerald-500/20 bg-emerald-500/5 p-8 text-center"
        >
          <h3 className="text-xl font-bold">Found a vulnerability?</h3>
          <p className="mt-3 text-white/55">
            Report it responsibly at{" "}
            <a href="mailto:contact@nanotoxi.com" className="text-emerald-400 hover:underline">
              contact@nanotoxi.com
            </a>
            . We acknowledge all reports within 48 hours.
          </p>
        </motion.div>

      </div>
    </main>
  );
}
