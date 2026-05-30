"use client";

import {
  Copy,
  Trash2,
  RefreshCw,
  Shield,
  User2,
  KeyRound,
  Sparkles,
  Plus,
} from "lucide-react";

import {
  motion,
} from "framer-motion";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  Button,
} from "@/components/ui/button";

import {
  Input,
} from "@/components/ui/input";

import {
  Label,
} from "@/components/ui/label";

import {
  useEffect,
  useState,
} from "react";

import {
  toast,
} from "sonner";

import {
  getAccountOverview,
  getApiKeys,
  createApiKey,
  deleteApiKey,
} from "@/lib/account-api";

export default function AccountPage() {

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    overview,
    setOverview,
  ] = useState<any>(null);

  const [
    apiKeys,
    setApiKeys,
  ] = useState<any[]>([]);

  const [
    generating,
    setGenerating,
  ] = useState(false);

  const [
    newKey,
    setNewKey,
  ] = useState("");

  async function fetchAccount() {

    try {

      setLoading(true);

      const [
        overviewRes,
        keysRes,
      ] = await Promise.all([
        getAccountOverview(),
        getApiKeys(),
      ]);

      setOverview(
        overviewRes
      );

      console.log(
        "ACCOUNT OVERVIEW:",
        overviewRes
      );

      setApiKeys(
        keysRes.api_keys || []
      );

    } catch (error) {

      console.error(
        error
      );

      toast.error(
        "Failed to load account data"
      );

    } finally {

      setLoading(false);
    }
  }

  useEffect(() => {

    fetchAccount();

  }, []);

  async function handleCreateKey() {

    try {

      setGenerating(true);

      const res =
        await createApiKey(
          `NanoToxi Key ${Date.now()}`
        );

      setNewKey(
        res.key
      );

      toast.success(
        "API key created"
      );

      fetchAccount();

    } catch (error) {

      toast.error(
        "Failed to create API key"
      );

    } finally {

      setGenerating(false);
    }
  }

  async function handleDeleteKey(
    id: string
  ) {

    try {

      await deleteApiKey(
        id
      );

      toast.success(
        "API key deleted"
      );

      fetchAccount();

    } catch {

      toast.error(
        "Failed to delete API key"
      );
    }
  }

  function copyText(
    text: string
  ) {

    navigator.clipboard.writeText(
      text
    );

    toast.success(
      "Copied"
    );
  }

  if (loading) {

    return (

      <div className="flex min-h-[60vh] items-center justify-center">

        <div className="h-12 w-12 animate-spin rounded-full border-4 border-cyan-400 border-t-transparent" />

      </div>
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

          <CardContent className="relative flex flex-col justify-between gap-10 overflow-hidden p-6 md:p-10 lg:flex-row lg:items-center">

            <div className="relative z-10">

              <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-cyan-500/10 bg-cyan-500/10 px-5 py-2 text-cyan-300">

                <Sparkles className="h-4 w-4" />

                AI Account Center

              </div>

              <h1 className="bg-gradient-to-r from-white via-white to-cyan-300 bg-clip-text text-3xl font-black text-transparent md:text-5xl">

                Account Settings

              </h1>

              <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/45 md:text-xl">

                Manage your NanoToxi AI profile,
                credentials, API access, and
                platform security settings.

              </p>

            </div>

            <div className="relative flex items-center justify-center">

              <div className="absolute h-[220px] w-[220px] rounded-full bg-cyan-500/10 blur-3xl" />

              <div className="relative flex h-[140px] w-[140px] items-center justify-center rounded-full border border-cyan-500/10 bg-cyan-500/10 md:h-[170px] md:w-[170px]">

                <Shield className="h-16 w-16 text-cyan-400 md:h-20 md:w-20" />

              </div>

            </div>

          </CardContent>

        </Card>

      </motion.div>

      {/* PROFILE + USAGE */}
      <div className="grid gap-8 xl:grid-cols-2">

        {/* PROFILE */}
        <Card className="rounded-[32px] border border-cyan-500/10 bg-[#081325]/70 backdrop-blur-2xl">

          <CardContent className="space-y-8 p-6 md:p-8">

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10">

                <User2 className="h-7 w-7 text-cyan-400" />

              </div>

              <div>

                <h2 className="text-2xl font-black text-white">

                  Profile Information

                </h2>

                <p className="mt-1 text-white/45">

                  User account details

                </p>

              </div>

            </div>

            <div className="grid gap-6 md:grid-cols-2">

              <div className="space-y-3">

                <Label className="text-white/45">

                  Full Name

                </Label>

                <Input
                  value={
                    overview?.profile?.name || ""
                  }
                  readOnly
                  className="h-12 rounded-2xl border-cyan-500/10 bg-[#020817] text-white"
                />

              </div>

              <div className="space-y-3">

                <Label className="text-white/45">

                  Email

                </Label>

                <Input
                  value={
                    overview?.profile?.email || ""
                  }
                  readOnly
                  className="h-12 rounded-2xl border-cyan-500/10 bg-[#020817] text-white"
                />

              </div>

              <div className="space-y-3">

                <Label className="text-white/45">

                  Role

                </Label>

                <Input
                  value={
                    overview?.profile?.role || ""
                  }
                  readOnly
                  className="h-12 rounded-2xl border-cyan-500/10 bg-[#020817] text-white"
                />

              </div>

              <div className="space-y-3">

                <Label className="text-white/45">

                  Subscription

                </Label>

                <Input
                  value={
                    overview?.subscription?.status || ""
                  }
                  readOnly
                  className="h-12 rounded-2xl border-cyan-500/10 bg-[#020817] text-white"
                />

              </div>

            </div>

          </CardContent>

        </Card>

        {/* USAGE */}
        <Card className="rounded-[32px] border border-cyan-500/10 bg-[#081325]/70 backdrop-blur-2xl">

          <CardContent className="space-y-8 p-6 md:p-8">

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10">

                <RefreshCw className="h-7 w-7 text-cyan-400" />

              </div>

              <div>

                <h2 className="text-2xl font-black text-white">

                  Usage Statistics

                </h2>

                <p className="mt-1 text-white/45">

                  Real-time platform usage

                </p>

              </div>

            </div>

            <div className="grid gap-6 sm:grid-cols-2">

              {[
                {
                  label: "Total Predictions",
                  value:
                    overview?.usage?.total_predictions || 0,
                },

                {
                  label: "This Month",
                  value:
                    overview?.usage?.predictions_this_month || 0,
                },

                {
                  label: "Bulk Jobs",
                  value:
                    overview?.usage?.bulk_jobs || 0,
                },

                {
                  label: "API Keys",
                  value:
                    overview?.usage?.api_keys || 0,
                },
              ].map((item) => (

                <div
                  key={item.label}
                  className="rounded-2xl border border-cyan-500/10 bg-[#020817] p-6"
                >

                  <p className="text-sm text-white/45">

                    {item.label}

                  </p>

                  <h3 className="mt-3 text-4xl font-black text-cyan-400">

                    {item.value}

                  </h3>

                </div>
              ))}

            </div>

          </CardContent>

        </Card>

      </div>

      {/* API KEYS */}
      <Card className="rounded-[32px] border border-cyan-500/10 bg-[#081325]/70 backdrop-blur-2xl">

        <CardContent className="space-y-8 p-6 md:p-8">

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <div>

              <h2 className="text-3xl font-black text-white">

                API Key Management

              </h2>

              <p className="mt-2 text-white/45">

                Manage secure API access

              </p>

            </div>

            <Button
              onClick={
                handleCreateKey
              }
              disabled={
                generating
              }
              className="h-12 rounded-2xl bg-cyan-400 px-6 text-black hover:bg-cyan-300"
            >

              <Plus className="mr-2 h-4 w-4" />

              {
                generating
                  ? "Generating..."
                  : "Generate Key"
              }

            </Button>

          </div>

          {newKey && (

            <div className="rounded-2xl border border-cyan-500/10 bg-[#020817] p-6">

              <p className="mb-3 text-sm text-yellow-400">

                Save this key now. You won't be able to see it again.

              </p>

              <div className="flex flex-col gap-4 lg:flex-row">

                <Input
                  value={newKey}
                  readOnly
                  className="h-12 rounded-2xl border-cyan-500/10 bg-[#081325] text-white"
                />

                <Button
                  onClick={() =>
                    copyText(newKey)
                  }
                  className="h-12 rounded-2xl border border-cyan-500/10 bg-[#020817] text-cyan-300 hover:bg-cyan-500/10"
                >

                  <Copy className="mr-2 h-4 w-4" />

                  Copy

                </Button>

              </div>

            </div>
          )}

          <div className="space-y-4">

            {apiKeys.length === 0 ? (

              <div className="rounded-2xl border border-dashed border-cyan-500/10 p-10 text-center text-white/45">

                No API keys created yet

              </div>

            ) : (

              Array.isArray(apiKeys) &&
              apiKeys.map((key: any) => (

                <div
                  key={key.id}
                  className="flex flex-col gap-4 rounded-2xl border border-cyan-500/10 bg-[#020817] p-6 lg:flex-row lg:items-center lg:justify-between"
                >

                  <div>

                    <h3 className="text-lg font-bold text-white">

                      {key.name}

                    </h3>

                    <p className="mt-1 text-sm text-white/45">

                      Created:
                      {" "}
                      {new Date(
                        key.created_at
                      ).toLocaleString()}

                    </p>

                  </div>

                  <Button
                    onClick={() =>
                      handleDeleteKey(
                        key.id
                      )
                    }
                    variant="destructive"
                    className="h-11 rounded-2xl bg-red-500/20 text-red-400 hover:bg-red-500/30"
                  >

                    <Trash2 className="mr-2 h-4 w-4" />

                    Delete

                  </Button>

                </div>
              ))
            )}

          </div>

        </CardContent>

      </Card>

    </div>
  );
}