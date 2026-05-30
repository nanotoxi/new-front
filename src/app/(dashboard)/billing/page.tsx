"use client";

import {
  getBilling,
  createCheckout,
  cancelSubscription,
  resumeSubscription,
} from "@/lib/billing-api";

import {
  CreditCard,
  TrendingUp,
  Receipt,
  Sparkles,
  Crown,
  Activity,
  Wallet,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import {
  motion,
} from "framer-motion";

import { toast } from "sonner";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  Button,
} from "@/components/ui/button";

export default function BillingPage() {

  const [billing, setBilling] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {

    fetchBilling();

  }, []);

  async function fetchBilling() {

    try {

      setLoading(true);

      setError("");

      const data =
        await getBilling();

      console.log(
        "BILLING:",
        data
      );

      setBilling(data);

    } catch (err) {

      console.error(err);

      setError(
        "Failed to load billing information"
      );

    } finally {

      setLoading(false);
    }
  }

  async function handleCheckout() {

    try {

      const res =
        await createCheckout(
          "pro_individual"
        );

      window.location.href =
        res.checkout_url;

    } catch (err) {

      console.error(err);

      toast.error(
        "Checkout failed"
      );
    }
  }

  async function handleCancel() {

    try {

      await cancelSubscription();

      toast.success(
        "Subscription cancellation scheduled"
      );

      fetchBilling();

    } catch (err) {

      console.error(err);

      toast.error(
        "Failed to cancel subscription"
      );
    }
  }

  async function handleResume() {

    try {

      await resumeSubscription();

      toast.success(
        "Subscription resumed"
      );

      fetchBilling();

    } catch (err) {

      console.error(err);

      toast.error(
        "Failed to resume subscription"
      );
    }
  }

  if (loading) {

    return (

      <div className="flex min-h-[400px] items-center justify-center">

        <div className="text-lg text-cyan-300">

          Loading billing...

        </div>

      </div>
    );
  }

  if (error) {

    return (

      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">

        <p className="text-red-400">

          {error}

        </p>

        <Button
          onClick={
            fetchBilling
          }
          className="h-11 rounded-2xl bg-cyan-400 text-black hover:bg-cyan-300"
        >

          Retry

        </Button>

      </div>
    );
  }

  return (

    <div className="mx-auto max-w-7xl space-y-6 overflow-x-hidden">

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

          <CardContent className="relative flex flex-col justify-between gap-10 overflow-hidden p-4 md:p-6 xl:flex-row xl:items-center xl:p-10">

            {/* LEFT */}
            <div className="relative z-10">

              <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-cyan-500/10 bg-cyan-500/10 px-5 py-2 text-cyan-300">

                <Sparkles className="h-4 w-4" />

                Billing Overview

              </div>

              <h1 className="bg-gradient-to-r from-white via-white to-cyan-300 bg-clip-text text-3xl font-black text-transparent md:text-4xl">

                NanoToxi Billing

              </h1>

              <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/45 md:text-lg">

                Manage subscriptions, invoices,
                usage analytics, and AI platform access.

              </p>

            </div>

            {/* RIGHT ICON */}
            <div className="relative flex items-center justify-center">

              <div className="absolute h-[220px] w-[220px] rounded-full bg-cyan-500/10 blur-3xl" />

              <div className="relative flex h-[140px] w-[140px] items-center justify-center rounded-full border border-cyan-500/10 bg-cyan-500/10 md:h-[170px] md:w-[170px]">

                <Wallet className="h-16 w-16 text-cyan-400 md:h-20 md:w-20" />

              </div>

            </div>

          </CardContent>

        </Card>

      </motion.div>

      {/* TOP STATS */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

        {[
          {
            title: "Current Plan",
            value:
              billing?.plan ||
              "Free",
            icon: Crown,
          },

          {
            title: "Monthly Spend",
            value:
              billing?.amount ||
              "$0",
            icon: CreditCard,
          },

          {
            title: "Subscription",
            value:
              billing?.status ||
              "inactive",
            icon: Activity,
          },

          {
            title: "Invoices",
            value:
              billing?.invoices?.length ||
              0,
            icon: TrendingUp,
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

                <CardContent className="space-y-6 p-5 md:p-7">

                  <div className="flex items-center justify-between">

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10">

                      <Icon className="h-7 w-7 text-cyan-400" />

                    </div>

                    <div className="rounded-full bg-cyan-500/10 px-4 py-1 text-sm text-cyan-300">

                      Live

                    </div>

                  </div>

                  <div>

                    <p className="text-sm text-white/40 md:text-base">

                      {item.title}

                    </p>

                    <h3 className="mt-2 break-words text-2xl font-black text-white md:text-2xl">

                      {item.value}

                    </h3>

                  </div>

                </CardContent>

              </Card>

            </motion.div>
          );
        })}

      </div>

      {/* PLAN + USAGE */}
      <div className="grid gap-6 2xl:grid-cols-[1.1fr_1fr]">

        {/* CURRENT PLAN */}
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

          <Card className="h-full rounded-[32px] border border-cyan-500/10 bg-[#081325]/70 backdrop-blur-2xl">

            <CardContent className="space-y-8 p-4 md:p-6 xl:p-8">

              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                <div>

                  <h2 className="text-2xl font-black text-white">

                    Current Subscription

                  </h2>

                  <p className="mt-2 text-white/45">

                    Premium AI research plan

                  </p>

                </div>

                <div className="rounded-full bg-emerald-500/10 px-5 py-2 text-sm font-semibold text-emerald-400">

                  {billing?.status || "inactive"}

                </div>

              </div>

              <div className="rounded-[28px] border border-cyan-500/10 bg-[#020817]/80 p-4 md:p-6 xl:p-8">

                <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">

                  <div>

                    <h3 className="text-2xl font-black text-white md:text-2xl">

                      {billing?.plan || "Free"}

                    </h3>

                    <p className="mt-3 max-w-xl text-white/40">

                      Unlimited nanoparticle predictions,
                      AI analytics, dataset management,
                      and API access.

                    </p>

                  </div>

                  <div className="text-left xl:text-right">

                    <p className="text-white/45">

                      Monthly Cost

                    </p>

                    <h4 className="mt-2 text-3xl font-black text-cyan-400">

                      {billing?.amount || "$0"}

                    </h4>

                    <p className="mt-1 text-white/35">

                      per month

                    </p>

                  </div>

                </div>

              </div>

              <div className="flex flex-wrap gap-4">

                <Button
                  onClick={
                    handleCheckout
                  }
                  className="h-11 rounded-2xl bg-cyan-400 px-6 text-base font-semibold text-black hover:bg-cyan-300"
                >

                  Upgrade Plan

                </Button>

                <Button
                  onClick={
                    handleCancel
                  }
                  variant="outline"
                  className="h-11 rounded-2xl border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20"
                >

                  Cancel Plan

                </Button>

                {billing?.cancel_at_period_end && (

                  <Button
                    onClick={
                      handleResume
                    }
                    variant="outline"
                    className="h-11 rounded-2xl border-emerald-500/20 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                  >

                    Resume Plan

                  </Button>
                )}

              </div>

            </CardContent>

          </Card>

        </motion.div>

        {/* USAGE */}
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

          <Card className="h-full rounded-[32px] border border-cyan-500/10 bg-[#081325]/70 backdrop-blur-2xl">

            <CardContent className="space-y-8 p-4 md:p-6 xl:p-8">

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10">

                  <TrendingUp className="h-7 w-7 text-cyan-400" />

                </div>

                <div>

                  <h2 className="text-2xl font-black text-white">

                    Usage Analytics

                  </h2>

                  <p className="mt-1 text-white/45">

                    Real-time platform usage

                  </p>

                </div>

              </div>

              {[
                {
                  label: "Predictions Used",
                  value: "2,140 / 5,000",
                  width: "43%",
                },

                {
                  label: "API Requests",
                  value: "12,842 / 25,000",
                  width: "52%",
                },

                {
                  label: "Dataset Storage",
                  value: "78GB / 150GB",
                  width: "65%",
                },
              ].map((item) => (

                <div
                  key={item.label}
                  className="space-y-4"
                >

                  <div className="flex items-center justify-between gap-4">

                    <span className="text-white/60">

                      {item.label}

                    </span>

                    <span className="text-right font-bold text-white">

                      {item.value}

                    </span>

                  </div>

                  <div className="h-4 overflow-hidden rounded-full bg-white/5">

                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-cyan-300"
                      style={{
                        width: item.width,
                      }}
                    />

                  </div>

                </div>
              ))}

            </CardContent>

          </Card>

        </motion.div>

      </div>

      {/* INVOICES */}
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
          delay: 0.2,
        }}
      >

        <Card className="rounded-[32px] border border-cyan-500/10 bg-[#081325]/70 backdrop-blur-2xl">

          <CardContent className="space-y-8 p-4 md:p-6 xl:p-8">

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10">

                  <Receipt className="h-7 w-7 text-cyan-400" />

                </div>

                <div>

                  <h2 className="text-2xl font-black text-white md:text-3xl">

                    Recent Invoices

                  </h2>

                  <p className="mt-1 text-white/45">

                    Latest payment transactions

                  </p>

                </div>

              </div>

              <div className="rounded-full bg-cyan-500/10 px-5 py-2 text-cyan-300">

                Auto Synced

              </div>

            </div>

            <div className="overflow-x-auto rounded-[28px] border border-cyan-500/10">

              <table className="w-full min-w-[800px] border-collapse">

                <thead className="bg-white/[0.03]">

                  <tr className="border-b border-cyan-500/10 text-left">

                    <th className="p-5 text-white/50">

                      Invoice ID

                    </th>

                    <th className="p-5 text-white/50">

                      Date

                    </th>

                    <th className="p-5 text-white/50">

                      Amount

                    </th>

                    <th className="p-5 text-white/50">

                      Status

                    </th>

                    <th className="p-5 text-white/50">

                      PDF

                    </th>

                  </tr>

                </thead>

                <tbody>

                  {billing?.invoices?.map(
                    (
                      invoice: any
                    ) => (

                      <tr
                        key={
                          invoice.id
                        }
                        className="border-b border-cyan-500/5 transition-all duration-300 hover:bg-white/[0.02]"
                      >

                        <td className="p-5 font-medium text-white">

                          {invoice.id}

                        </td>

                        <td className="p-5 text-white/60">

                          {invoice.date
                            ? new Date(
                                invoice.date * 1000
                              ).toLocaleDateString(
                                "en-IN"
                              )
                            : "-"}

                        </td>

                        <td className="p-5 font-semibold text-cyan-300">

                          {invoice.amount}

                        </td>

                        <td className="p-5">

                          <span className="rounded-full bg-emerald-500/10 px-4 py-1 text-sm font-medium text-emerald-400">

                            {invoice.status}

                          </span>

                        </td>

                        <td className="p-5">

                          <a
                            href={
                              invoice.pdf_url
                            }
                            target="_blank"
                            className="text-cyan-300 underline"
                          >

                            Download

                          </a>

                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>

          </CardContent>

        </Card>

      </motion.div>

    </div>
  );
}