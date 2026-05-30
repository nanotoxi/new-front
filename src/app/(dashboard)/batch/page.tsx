"use client";

import {
  EmptyState,
} from "@/components/ui/empty-state";

import { toast } from "sonner";

import {
  useEffect,
  useState,
} from "react";

import Papa from "papaparse";

import {
  motion,
} from "framer-motion";

import {
  Download,
  Upload,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

type CsvRow = {
  nanoparticle: string;
  size: string;
  shape: string;
  dosage: string;
};

export default function BatchPage() {

  const [rows, setRows] =
    useState<CsvRow[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [jobId, setJobId] =
    useState<string | null>(null);

  const [jobStatus, setJobStatus] =
    useState<
      "idle" |
      "pending" |
      "processing" |
      "done" |
      "failed"
    >("idle");

  const [progress, setProgress] =
    useState(0);

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [downloadUrl, setDownloadUrl] =
    useState<string | null>(null);

  const [jobs, setJobs] =
    useState<any[]>([]);

  useEffect(() => {

    loadJobs();

    const interval =
      setInterval(() => {

        loadJobs();

      }, 5000);

    return () =>
      clearInterval(interval);

  }, []);

  function handleFileUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {

    const file =
      event.target.files?.[0];

    setSelectedFile(
      file || null
    );

    if (!file) {

      toast.error(
        "No CSV file selected"
      );

      return;
    }

    Papa.parse<CsvRow>(
      file,
      {
        header: true,

        complete: (
          parsed
        ) => {

          setRows(
            parsed.data
          );

          toast.success(
            "CSV parsed successfully"
          );
        },

        error: () => {

          toast.error(
            "Failed to parse CSV"
          );
        },
      }
    );
  }

  async function runBatchPredictions() {

    if (!selectedFile) {

      toast.error(
        "Upload a CSV/XLSX file first"
      );

      return;
    }

    setLoading(true);

    setJobStatus(
      "pending"
    );

    try {

      const formData =
        new FormData();

      formData.append(
        "file",
        selectedFile
      );

      const token =
        localStorage.getItem(
          "nanotoxi_token"
        );

      console.log(
        "BATCH TOKEN:",
        token
      );

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/predict/bulk/`,
        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${token}`,
          },

          body: formData,
        }
      );

      if (!response.ok) {

        const errorData =
          await response.json();

        console.log(
          "UPLOAD ERROR:",
          errorData
        );

        throw new Error(
          JSON.stringify(
            errorData
          )
        );
      }

      const data =
        await response.json();

      console.log(
        "UPLOAD RESPONSE:",
        data
      );

      const id =
        data.job_id;

      setJobId(id);

      toast.success(
        "Batch job started"
      );

      pollJobStatus(id);

    } catch (error) {

      console.error(error);

      setJobStatus(
        "failed"
      );

      setLoading(false);

      toast.error(
        "Batch upload failed"
      );
    }
  }

  async function pollJobStatus(
    id: string
  ) {

    const token =
      localStorage.getItem(
        "nanotoxi_token"
      );

    const interval =
      setInterval(
        async () => {

          try {

            const response =
              await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/v1/predict/bulk/${id}`,
                {
                  headers: {
                    Authorization:
                      `Bearer ${token}`,
                  },
                }
              );

            const data =
              await response.json();

            console.log(
              "JOB STATUS:",
              data
            );

            setJobStatus(
              data.status
            );

            if (
              data.total_rows &&
              data.processed_rows
            ) {

              const percent =
                Math.round(
                  (
                    data.processed_rows /
                    data.total_rows
                  ) * 100
                );

              setProgress(
                percent
              );
            }

            if (
              data.status ===
              "done"
            ) {

              clearInterval(
                interval
              );

              setLoading(false);

              setProgress(
                100
              );

              setDownloadUrl(
                `${process.env.NEXT_PUBLIC_API_URL}/api/v1/predict/bulk/${id}/download`
              );

              loadJobs();

              toast.success(
                "Batch processing completed"
              );
            }

            if (
              data.status ===
              "failed"
            ) {

              clearInterval(
                interval
              );

              setLoading(false);

              toast.error(
                "Batch job failed"
              );
            }

          } catch (error) {

            console.error(
              error
            );

            clearInterval(
              interval
            );

            setLoading(false);

            toast.error(
              "Polling failed"
            );
          }

        },
        2500
      );
  }

  async function loadJobs() {

    try {

      const token =
        localStorage.getItem(
          "nanotoxi_token"
        );

      const response =
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/predict/bulk/`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      const data =
        await response.json();

      console.log(
        "BATCH JOBS:",
        data
      );

      setJobs(
        data.jobs ||
        data ||
        []
      );

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to load batch jobs"
      );
    }
  }

  async function downloadResults(
    jobId: string
  ) {

    try {

      const token =
        localStorage.getItem(
          "nanotoxi_token"
        );

      const response =
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/predict/bulk/${jobId}/download`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      if (!response.ok) {

        throw new Error(
          "Download failed"
        );
      }

      const blob =
        await response.blob();

      const url =
        window.URL.createObjectURL(
          blob
        );

      const a =
        document.createElement("a");

      a.href = url;

      a.download =
        `batch_results_${jobId}.xlsx`;

      document.body.appendChild(a);

      a.click();

      a.remove();

      window.URL.revokeObjectURL(
        url
      );

      toast.success(
        "Download started"
      );

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to download results"
      );
    }
  }

  function downloadTemplate() {

    try {

      const csv =
        "nanoparticle_name,primary_size_nm,hydrodynamic_size_nm,dose_max_ugml,dose_min_ugml,exposure_time_h,zeta_potential_mv,morphology,cell_type,np_type,is_coated,is_therapeutic,quality_score,ph,temperature_c\nGold,20,25,10,1,24,-5,Spherical,HepG2,Inorganic,false,false,90,7,37";

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
        "nanotoxi_batch_template.csv";

      a.click();

      toast.success(
        "Template downloaded"
      );

    } catch {

      toast.error(
        "Failed to download template"
      );
    }
  }

  return (

    <div className="mx-auto max-w-7xl space-y-8">

      {/* HEADER */}
      <div>

        <h1 className="bg-gradient-to-r from-white via-white to-cyan-300 bg-clip-text text-4xl font-black text-transparent">

          Batch Prediction

        </h1>

        <p className="mt-4 text-lg text-white/45">

          Upload CSV/XLSX files and run AI toxicity
          predictions across multiple nanoparticles.

        </p>

      </div>

      {/* UPLOAD CARD */}
      <Card className="overflow-hidden rounded-[32px] border border-cyan-500/10 bg-[#081325]/70 backdrop-blur-2xl">

        <CardContent className="space-y-8 p-8">

          <div className="flex flex-wrap gap-4">

            <Button
              onClick={
                downloadTemplate
              }
              className="rounded-2xl border border-cyan-500/10 bg-[#081325] text-white transition-all duration-300 hover:bg-cyan-500/10"
            >

              <Download className="mr-2 h-4 w-4" />

              Download Template

            </Button>

          </div>

          <label className="flex cursor-pointer flex-col items-center justify-center rounded-[28px] border border-dashed border-cyan-500/10 bg-[#081325]/50 p-16 transition-all duration-300 hover:border-cyan-400/20 hover:bg-cyan-500/5">

            <Upload className="h-12 w-12 text-cyan-400" />

            <p className="mt-5 text-xl font-semibold text-white">

              Upload CSV/XLSX File

            </p>

            <p className="mt-2 text-sm text-white/45">

              Drag & drop or click to browse

            </p>

            <input
              type="file"
              accept=".csv,.xlsx"
              className="hidden"
              onChange={
                handleFileUpload
              }
            />

          </label>

        </CardContent>

      </Card>

      {/* JOB HISTORY */}
      {jobs.length > 0 && (

        <Card className="rounded-[32px] border border-cyan-500/10 bg-[#081325]/70 backdrop-blur-2xl">

          <CardContent className="space-y-6 overflow-auto p-8">

            <div>

              <h2 className="text-3xl font-black text-white">

                Batch Job History

              </h2>

              <p className="mt-2 text-white/45">

                Recent bulk prediction jobs

              </p>

            </div>

            <table className="w-full border-collapse">

              <thead>

                <tr className="border-b border-cyan-500/10 text-white/55">

                  <th className="p-4 text-left">

                    Job ID

                  </th>

                  <th className="p-4 text-left">

                    Status

                  </th>

                  <th className="p-4 text-left">

                    Progress

                  </th>

                  <th className="p-4 text-left">

                    Created

                  </th>

                  <th className="p-4 text-left">

                    Action

                  </th>

                </tr>

              </thead>

              <tbody>

                {jobs.map(
                  (
                    job,
                    index
                  ) => {

                    const percent =
                      job.total_rows
                        ? Math.round(
                            (
                              job.processed_rows /
                              job.total_rows
                            ) * 100
                          )
                        : 0;

                    return (

                      <tr
                        key={index}
                        className="border-b border-cyan-500/5 text-white/80"
                      >

                        <td className="p-4">

                          {job.job_id}

                        </td>

                        <td className="p-4">

                          <span
                            className={`rounded-full px-3 py-1 text-xs ${
                              job.status ===
                              "done"
                                ? "bg-green-500/20 text-green-400"
                                : job.status ===
                                  "failed"
                                ? "bg-red-500/20 text-red-400"
                                : "bg-cyan-500/20 text-cyan-300"
                            }`}
                          >

                            {job.status}

                          </span>

                        </td>

                        <td className="p-4 text-white/60">

                          {job.created_at
                            ? new Date(
                                job.created_at + "Z"
                              ).toLocaleString(
                                "en-IN",
                                {
                                  timeZone:
                                    "Asia/Kolkata",
                                }
                              )
                            : "-"}

                        </td>

                        <td className="p-4 min-w-[180px]">

                          <div className="space-y-2">

                            <div className="flex items-center justify-between text-xs text-white/45">

                              <span>

                                {percent}%

                              </span>

                              <span>

                                {job.processed_rows || 0}
                                /
                                {job.total_rows || 0}

                              </span>

                            </div>

                            <div className="h-2 overflow-hidden rounded-full bg-white/5">

                              <div
                                className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-cyan-300 transition-all duration-700"
                                style={{
                                  width: `${percent}%`,
                                }}
                              />

                            </div>

                          </div>

                        </td>

                        <td className="p-4">

                          {job.status ===
                            "done" && (

                            <Button
                              size="sm"
                              onClick={() =>
                                downloadResults(
                                  job.job_id
                                )
                              }
                              className="rounded-xl bg-cyan-400 text-black hover:bg-cyan-300"
                            >

                              Download

                            </Button>

                          )}

                        </td>

                      </tr>
                    );
                  }
                )}

              </tbody>

            </table>

          </CardContent>

        </Card>

      )}

      {/* PROGRESS */}
      {jobStatus !== "idle" && (

        <Card className="rounded-[32px] border border-cyan-500/10 bg-[#081325]/70 backdrop-blur-2xl">

          <CardContent className="space-y-6 p-8">

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-3xl font-black text-white">

                  Batch Processing

                </h2>

                <p className="mt-2 text-white/45">

                  Live backend processing status

                </p>

              </div>

              <div
                className={`rounded-full px-5 py-2 text-sm font-semibold ${
                  jobStatus === "done"
                    ? "bg-green-500/20 text-green-400"
                    : jobStatus === "failed"
                    ? "bg-red-500/20 text-red-400"
                    : "bg-cyan-500/20 text-cyan-300"
                }`}
              >

                {jobStatus.toUpperCase()}

              </div>

            </div>

            <div className="h-4 overflow-hidden rounded-full bg-white/5">

              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-cyan-300 transition-all duration-700"
                style={{
                  width: `${progress}%`,
                }}
              />

            </div>

            <div className="flex items-center justify-between text-sm text-white/45">

              <span>

                Progress

              </span>

              <span>

                {progress}%

              </span>

            </div>

            {downloadUrl &&
              jobId && (

              <Button
                onClick={() =>
                  downloadResults(
                    jobId
                  )
                }
                className="rounded-2xl bg-cyan-400 text-black hover:bg-cyan-300"
              >

                <Download className="mr-2 h-4 w-4" />

                Download Excel Results

              </Button>

            )}

          </CardContent>

        </Card>

      )}

      {/* EMPTY STATE */}
      {rows.length === 0 && (

        <EmptyState
          title="Upload a CSV/XLSX File"
          description="Upload nanoparticle datasets to begin batch prediction."
        />

      )}

      {/* CSV PREVIEW */}
      {rows.length > 0 && (

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

          <Card className="overflow-hidden rounded-[32px] border border-cyan-500/10 bg-[#081325]/70 backdrop-blur-2xl">

            <CardContent className="space-y-6 overflow-auto p-8">

              <div className="flex items-center justify-between">

                <div>

                  <h2 className="text-3xl font-black text-white">

                    CSV Preview

                  </h2>

                  <p className="mt-2 text-white/45">

                    Verify uploaded nanoparticle data

                  </p>

                </div>

                <Button
                  onClick={
                    runBatchPredictions
                  }
                  disabled={
                    loading
                  }
                  className="rounded-2xl bg-cyan-400 px-6 text-black shadow-[0_0_30px_rgba(34,211,238,0.25)] transition-all duration-300 hover:bg-cyan-300"
                >

                  {loading
                    ? "Processing..."
                    : "Run Predictions"}

                </Button>

              </div>

              <table className="w-full border-collapse">

                <thead>

                  <tr className="border-b border-cyan-500/10 text-white/55">

                    <th className="p-4 text-left">

                      Nanoparticle

                    </th>

                    <th className="p-4 text-left">

                      Size

                    </th>

                    <th className="p-4 text-left">

                      Shape

                    </th>

                    <th className="p-4 text-left">

                      Dosage

                    </th>

                  </tr>

                </thead>

                <tbody>

                  {rows.map(
                    (
                      row,
                      index
                    ) => (

                      <tr
                        key={index}
                        className="border-b border-cyan-500/5 text-white/80"
                      >

                        <td className="p-4">

                          {
                            row.nanoparticle
                          }

                        </td>

                        <td className="p-4">

                          {row.size}

                        </td>

                        <td className="p-4">

                          {row.shape}

                        </td>

                        <td className="p-4">

                          {
                            row.dosage
                          }

                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </CardContent>

          </Card>

        </motion.div>
      )}

    </div>
  );
}