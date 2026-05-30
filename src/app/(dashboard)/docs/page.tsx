"use client";

import {
  useMemo,
  useState,
} from "react";

import ReactMarkdown from "react-markdown";

import remarkGfm from "remark-gfm";

import jsPDF from "jspdf";

import markdownContent from "@/data/docs";

import {
  motion,
} from "framer-motion";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  Input,
} from "@/components/ui/input";

import {
  Button,
} from "@/components/ui/button";

import {
  Download,
  Search,
  BookOpen,
  FileText,
  Sparkles,
  Database,
} from "lucide-react";

const headings = [
  "Introduction",
  "Features",
  "API Example",
  "Usage",
  "Notes",
  "Contact",
];

export default function DocsPage() {

  const [search, setSearch] =
    useState("");

  const filteredMarkdown =
    useMemo(() => {

      if (!search)
        return markdownContent;

      return markdownContent
        .split("\n")
        .filter((line) =>
          line
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
        )
        .join("\n");

    }, [search]);

  function downloadPDF() {

    const pdf =
      new jsPDF();

    const splitText =
      pdf.splitTextToSize(
        markdownContent,
        180
      );

    pdf.text(
      splitText,
      10,
      10
    );

    pdf.save(
      "nanotoxi-docs.pdf"
    );
  }

  return (

    <div className="mx-auto max-w-7xl space-y-8">

      {/* HERO */}
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
      >

        <Card className="overflow-hidden rounded-[36px] border border-cyan-500/10 bg-[#081325]/70 backdrop-blur-2xl">

          <CardContent className="relative flex flex-col justify-between gap-10 overflow-hidden p-10 lg:flex-row lg:items-center">

            {/* LEFT */}
            <div className="relative z-10">

              <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-cyan-500/10 bg-cyan-500/10 px-5 py-2 text-cyan-300">

                <Sparkles className="h-4 w-4" />

                NanoToxi Documentation

              </div>

              <h1 className="bg-gradient-to-r from-white via-white to-cyan-300 bg-clip-text text-6xl font-black text-transparent">

                Developer Docs

              </h1>

              <p className="mt-5 max-w-3xl text-xl leading-relaxed text-white/45">

                Complete documentation,
                AI workflow references,
                API examples, and integration guides
                for the NanoToxi platform.

              </p>

            </div>

            {/* RIGHT */}
            <div className="relative flex items-center justify-center">

              <div className="absolute h-[220px] w-[220px] rounded-full bg-cyan-500/10 blur-3xl" />

              <div className="relative flex h-[170px] w-[170px] items-center justify-center rounded-full border border-cyan-500/10 bg-cyan-500/10">

                <BookOpen className="h-20 w-20 text-cyan-400" />

              </div>

            </div>

          </CardContent>

        </Card>

      </motion.div>

      {/* STATS */}
      <div className="grid gap-6 lg:grid-cols-3">

        {[
          {
            title: "Documentation Pages",
            value: "24",
            icon: FileText,
          },

          {
            title: "API Endpoints",
            value: "42",
            icon: Database,
          },

          {
            title: "SDK Examples",
            value: "18",
            icon: BookOpen,
          },
        ].map((item, i) => {

          const Icon =
            item.icon;

          return (

            <motion.div
              key={item.title}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: i * 0.1,
              }}
            >

              <Card className="rounded-[30px] border border-cyan-500/10 bg-[#081325]/70 backdrop-blur-2xl">

                <CardContent className="space-y-5 p-7">

                  <div className="flex items-center justify-between">

                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10">

                      <Icon className="h-8 w-8 text-cyan-400" />

                    </div>

                    <div className="rounded-full bg-cyan-500/10 px-4 py-1 text-sm text-cyan-300">

                      Live

                    </div>

                  </div>

                  <div>

                    <p className="text-white/40">

                      {item.title}

                    </p>

                    <h3 className="mt-2 text-5xl font-black text-white">

                      {item.value}

                    </h3>

                  </div>

                </CardContent>

              </Card>

            </motion.div>
          );
        })}

      </div>

      {/* MAIN CONTENT */}
      <div className="grid gap-8 xl:grid-cols-[280px_1fr]">

        {/* SIDEBAR */}
        <motion.aside
          initial={{
            opacity: 0,
            x: -20,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          className="sticky top-24 hidden h-fit xl:block"
        >

          <Card className="rounded-[32px] border border-cyan-500/10 bg-[#081325]/70 backdrop-blur-2xl">

            <CardContent className="space-y-6 p-7">

              <div>

                <h2 className="text-2xl font-black text-white">

                  Contents

                </h2>

                <p className="mt-2 text-sm text-white/40">

                  Navigate documentation sections

                </p>

              </div>

              <div className="space-y-3">

                {headings.map(
                  (heading) => (

                    <a
                      key={heading}
                      href={`#${heading
                        .toLowerCase()
                        .replaceAll(
                          " ",
                          "-"
                        )}`}
                      className="flex items-center gap-3 rounded-2xl border border-transparent bg-white/[0.02] px-4 py-3 text-white/65 transition-all duration-300 hover:border-cyan-500/10 hover:bg-cyan-500/10 hover:text-cyan-300"
                    >

                      <div className="h-2 w-2 rounded-full bg-cyan-400" />

                      {heading}

                    </a>
                  )
                )}

              </div>

            </CardContent>

          </Card>

        </motion.aside>

        {/* MAIN */}
        <div className="space-y-6">

          {/* TOP BAR */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
          >

            {/* SEARCH */}
            <div className="relative w-full max-w-xl">

              <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-white/30" />

              <Input
                placeholder="Search documentation..."
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                className="h-14 rounded-2xl border border-cyan-500/10 bg-[#081325]/70 pl-14 text-base text-white placeholder:text-white/25 focus:border-cyan-400/30"
              />

            </div>

            {/* BUTTON */}
            <Button
              onClick={
                downloadPDF
              }
              className="h-14 rounded-2xl bg-cyan-400 px-6 text-base font-semibold text-black shadow-[0_0_30px_rgba(34,211,238,0.25)] hover:bg-cyan-300"
            >

              <Download className="mr-2 h-5 w-5" />

              Download PDF

            </Button>

          </motion.div>

          {/* DOCS */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.1,
            }}
          >

            <Card className="rounded-[36px] border border-cyan-500/10 bg-[#081325]/70 backdrop-blur-2xl">

              <CardContent
                className="
                  prose
                  prose-invert
                  max-w-none
                  p-10
                  leading-8

                  prose-headings:text-white
                  prose-headings:font-black
                  prose-headings:tracking-tight

                  prose-h1:text-5xl
                  prose-h2:text-3xl
                  prose-h3:text-2xl

                  prose-p:text-white/70
                  prose-p:leading-8

                  prose-strong:text-cyan-300

                  prose-code:text-cyan-300
                  prose-code:bg-cyan-500/10
                  prose-code:px-2
                  prose-code:py-1
                  prose-code:rounded-md

                  prose-pre:bg-[#020817]
                  prose-pre:border
                  prose-pre:border-cyan-500/10
                  prose-pre:rounded-2xl

                  prose-a:text-cyan-300

                  prose-li:text-white/70

                  prose-table:border-collapse
                  prose-th:border
                  prose-th:border-cyan-500/10
                  prose-th:bg-white/[0.03]

                  prose-td:border
                  prose-td:border-cyan-500/10

                  prose-blockquote:border-cyan-400
                "
              >

                <ReactMarkdown
                  remarkPlugins={[
                    remarkGfm,
                  ]}
                >

                  {
                    filteredMarkdown
                  }

                </ReactMarkdown>

              </CardContent>

            </Card>

          </motion.div>

        </div>

      </div>

    </div>
  );
}