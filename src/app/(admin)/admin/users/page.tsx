"use client";

import {
  useMemo,
  useState,
  useEffect,
} from "react";

import {
  Eye,
  Shield,
  UserPlus,
  Ban,
  Users,
  Activity,
  ShieldCheck,
  Search,
} from "lucide-react";

import {
  useTheme,
} from "@/context/theme-context";

import {
  getAdminUsers,
} from "@/lib/admin-api";

export default function UsersPage() {

  const {
    theme,
  } = useTheme();

  const dark =
    theme === "dark";

  const [loading, setLoading] =
    useState(true);

  const [users, setUsers] =
    useState<any[]>([]);

  const [search, setSearch] =
    useState("");

  const [roleFilter, setRoleFilter] =
    useState("all");

  const [statusFilter, setStatusFilter] =
    useState("all");

  const fetchUsers =
    async () => {

      try {

        setLoading(true);

        const res =
          await getAdminUsers();

        console.log(
          "ADMIN USERS:",
          res
        );

        setUsers(
          res?.users || []
        );

      } catch (err) {

        console.error(
          "USERS ERROR:",
          err
        );

      } finally {

        setLoading(false);
      }
    };

  useEffect(() => {

    fetchUsers();

  }, []);

  const filteredUsers =
    useMemo(() => {

      return users.filter(
        (user) => {

          const matchesSearch =
            user.email
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              );

          const matchesRole =
            roleFilter ===
              "all" ||
            user.role ===
              roleFilter;

          const matchesStatus =
            statusFilter ===
              "all" ||
            user.subscription_status ===
              statusFilter;

          return (
            matchesSearch &&
            matchesRole &&
            matchesStatus
          );
        }
      );

    }, [
      users,
      search,
      roleFilter,
      statusFilter,
    ]);

  function suspendUser(
    email: string
  ) {

    alert(
      `${email} suspended`
    );
  }

  function changeRole(
    email: string
  ) {

    alert(
      `Role changed for ${email}`
    );
  }

  function viewDetails(
    email: string
  ) {

    alert(
      `Viewing ${email}`
    );
  }

  if (loading) {

    return (

      <div className="flex min-h-[60vh] items-center justify-center">

        <div className="h-12 w-12 animate-spin rounded-full border-4 border-cyan-400 border-t-transparent" />

      </div>
    );
  }

  const totalUsers =
    users.length;

  const activeUsers =
    users.filter(
      (u) =>
        u.subscription_status ===
        "active"
    ).length;

  const adminUsers =
    users.filter(
      (u) =>
        u.role === "admin"
    ).length;

  const suspendedUsers =
    users.filter(
      (u) =>
        u.subscription_status ===
        "cancelled"
    ).length;

  return (

    <div className="space-y-8">

      {/* HERO */}
      <div
        className={`rounded-3xl border p-6 shadow-sm transition-all duration-300 md:p-8 ${
          dark
            ? "border-white/10 bg-[#0F172A]"
            : "border-slate-200 bg-white"
        }`}
      >

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <div className="mb-4 inline-flex rounded-full bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-700">

              User Monitoring Active

            </div>

            <h1
              className={`text-4xl font-black tracking-tight md:text-5xl ${
                dark
                  ? "text-white"
                  : "text-slate-900"
              }`}
            >

              User Management

            </h1>

            <p
              className={`mt-4 max-w-3xl text-base md:text-lg ${
                dark
                  ? "text-slate-400"
                  : "text-slate-500"
              }`}
            >

              Manage user accounts,
              permissions, activity,
              and access across the
              NanoToxi AI platform.

            </p>

          </div>

          <button className="flex items-center gap-2 rounded-2xl bg-cyan-500 px-6 py-3 font-semibold text-white transition hover:bg-cyan-600">

            <UserPlus className="h-5 w-5" />

            Add User

          </button>

        </div>

      </div>

      {/* METRICS */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">

        {/* CARD */}
        <div
          className={`rounded-3xl border p-6 shadow-sm transition-all duration-300 ${
            dark
              ? "border-white/10 bg-[#0F172A]"
              : "border-slate-200 bg-white"
          }`}
        >

          <div className="flex items-center justify-between">

            <div
              className={`rounded-2xl p-4 ${
                dark
                  ? "bg-cyan-500/10"
                  : "bg-cyan-50"
              }`}
            >

              <Users className="h-6 w-6 text-cyan-500" />

            </div>

          </div>

          <p
            className={`mt-6 text-sm ${
              dark
                ? "text-slate-400"
                : "text-slate-500"
            }`}
          >

            Total Users

          </p>

          <h2
            className={`mt-2 text-4xl font-black ${
              dark
                ? "text-white"
                : "text-slate-900"
            }`}
          >

            {totalUsers}

          </h2>

        </div>

        {/* CARD */}
        <div
          className={`rounded-3xl border p-6 shadow-sm transition-all duration-300 ${
            dark
              ? "border-white/10 bg-[#0F172A]"
              : "border-slate-200 bg-white"
          }`}
        >

          <div className="flex items-center justify-between">

            <div
              className={`rounded-2xl p-4 ${
                dark
                  ? "bg-emerald-500/10"
                  : "bg-emerald-50"
              }`}
            >

              <ShieldCheck className="h-6 w-6 text-emerald-500" />

            </div>

          </div>

          <p
            className={`mt-6 text-sm ${
              dark
                ? "text-slate-400"
                : "text-slate-500"
            }`}
          >

            Active Accounts

          </p>

          <h2
            className={`mt-2 text-4xl font-black ${
              dark
                ? "text-white"
                : "text-slate-900"
            }`}
          >

            {activeUsers}

          </h2>

        </div>

        {/* CARD */}
        <div
          className={`rounded-3xl border p-6 shadow-sm transition-all duration-300 ${
            dark
              ? "border-white/10 bg-[#0F172A]"
              : "border-slate-200 bg-white"
          }`}
        >

          <div className="flex items-center justify-between">

            <div
              className={`rounded-2xl p-4 ${
                dark
                  ? "bg-violet-500/10"
                  : "bg-violet-50"
              }`}
            >

              <Activity className="h-6 w-6 text-violet-500" />

            </div>

          </div>

          <p
            className={`mt-6 text-sm ${
              dark
                ? "text-slate-400"
                : "text-slate-500"
            }`}
          >

            Admin Users

          </p>

          <h2
            className={`mt-2 text-4xl font-black ${
              dark
                ? "text-white"
                : "text-slate-900"
            }`}
          >

            {adminUsers}

          </h2>

        </div>

        {/* CARD */}
        <div
          className={`rounded-3xl border p-6 shadow-sm transition-all duration-300 ${
            dark
              ? "border-white/10 bg-[#0F172A]"
              : "border-slate-200 bg-white"
          }`}
        >

          <div className="flex items-center justify-between">

            <div
              className={`rounded-2xl p-4 ${
                dark
                  ? "bg-red-500/10"
                  : "bg-red-50"
              }`}
            >

              <Ban className="h-6 w-6 text-red-500" />

            </div>

          </div>

          <p
            className={`mt-6 text-sm ${
              dark
                ? "text-slate-400"
                : "text-slate-500"
            }`}
          >

            Suspended Users

          </p>

          <h2
            className={`mt-2 text-4xl font-black ${
              dark
                ? "text-white"
                : "text-slate-900"
            }`}
          >

            {suspendedUsers}

          </h2>

        </div>

      </div>

      {/* FILTERS */}
      <div
        className={`rounded-3xl border p-6 shadow-sm transition-all duration-300 ${
          dark
            ? "border-white/10 bg-[#0F172A]"
            : "border-slate-200 bg-white"
        }`}
      >

        <div className="grid gap-4 md:grid-cols-3">

          {/* SEARCH */}
          <div
            className={`flex items-center gap-3 rounded-2xl border px-4 ${
              dark
                ? "border-white/10 bg-[#020817]"
                : "border-slate-200 bg-slate-50"
            }`}
          >

            <Search className="h-5 w-5 text-slate-400" />

            <input
              placeholder="Search email..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className={`h-14 w-full bg-transparent outline-none ${
                dark
                  ? "text-white placeholder:text-slate-500"
                  : "text-slate-900 placeholder:text-slate-400"
              }`}
            />

          </div>

          {/* ROLE FILTER */}
          <select
            value={roleFilter}
            onChange={(e) =>
              setRoleFilter(
                e.target.value
              )
            }
            className={`h-14 rounded-2xl border px-4 outline-none ${
              dark
                ? "border-white/10 bg-[#020817] text-white"
                : "border-slate-200 bg-slate-50 text-slate-900"
            }`}
          >

            <option value="all">

              All Roles

            </option>

            <option value="admin">

              Admin

            </option>

            <option value="user">

              User

            </option>

          </select>

          {/* STATUS FILTER */}
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value
              )
            }
            className={`h-14 rounded-2xl border px-4 outline-none ${
              dark
                ? "border-white/10 bg-[#020817] text-white"
                : "border-slate-200 bg-slate-50 text-slate-900"
            }`}
          >

            <option value="all">

              All Status

            </option>

            <option value="active">

              Active

            </option>

            <option value="trial">

              Trial

            </option>

            <option value="cancelled">

              Cancelled

            </option>

          </select>

        </div>

      </div>

      {/* TABLE */}
      <div
        className={`rounded-3xl border p-6 shadow-sm transition-all duration-300 ${
          dark
            ? "border-white/10 bg-[#0F172A]"
            : "border-slate-200 bg-white"
        }`}
      >

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead>

              <tr
                className={`border-b ${
                  dark
                    ? "border-white/10"
                    : "border-slate-200"
                }`}
              >

                <th className="px-4 py-4 text-left text-sm font-bold text-slate-500">

                  Email

                </th>

                <th className="px-4 py-4 text-left text-sm font-bold text-slate-500">

                  Role

                </th>

                <th className="px-4 py-4 text-left text-sm font-bold text-slate-500">

                  Subscription

                </th>

                <th className="px-4 py-4 text-left text-sm font-bold text-slate-500">

                  Joined

                </th>

                <th className="px-4 py-4 text-left text-sm font-bold text-slate-500">

                  Actions

                </th>

              </tr>

            </thead>

            <tbody>

              {filteredUsers.map(
                (user) => (

                  <tr
                    key={user.id}
                    className={`border-b transition ${
                      dark
                        ? "border-white/5 hover:bg-white/5"
                        : "border-slate-100 hover:bg-slate-50"
                    }`}
                  >

                    <td
                      className={`px-4 py-5 font-semibold ${
                        dark
                          ? "text-white"
                          : "text-slate-900"
                      }`}
                    >

                      {user.email}

                    </td>

                    <td className="px-4 py-5">

                      <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-violet-700">

                        {user.role}

                      </span>

                    </td>

                    <td className="px-4 py-5">

                      <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-bold text-cyan-700">

                        {
                          user.subscription_status
                        }

                      </span>

                    </td>

                    <td
                      className={`px-4 py-5 ${
                        dark
                          ? "text-slate-300"
                          : "text-slate-600"
                      }`}
                    >

                      {new Date(
                        user.created_at
                      ).toLocaleDateString()}

                    </td>

                    <td className="px-4 py-5">

                      <div className="flex flex-wrap gap-2">

                        <button
                          onClick={() =>
                            viewDetails(
                              user.email
                            )
                          }
                          className={`rounded-xl border p-2 transition ${
                            dark
                              ? "border-white/10 hover:bg-white/10"
                              : "border-slate-200 hover:bg-slate-100"
                          }`}
                        >

                          <Eye
                            className={`h-4 w-4 ${
                              dark
                                ? "text-white"
                                : "text-slate-700"
                            }`}
                          />

                        </button>

                        <button
                          onClick={() =>
                            changeRole(
                              user.email
                            )
                          }
                          className={`rounded-xl border p-2 transition ${
                            dark
                              ? "border-white/10 hover:bg-cyan-500/10"
                              : "border-slate-200 hover:bg-cyan-50"
                          }`}
                        >

                          <Shield className="h-4 w-4 text-cyan-600" />

                        </button>

                        <button
                          onClick={() =>
                            suspendUser(
                              user.email
                            )
                          }
                          className={`rounded-xl border p-2 transition ${
                            dark
                              ? "border-white/10 hover:bg-red-500/10"
                              : "border-slate-200 hover:bg-red-50"
                          }`}
                        >

                          <Ban className="h-4 w-4 text-red-500" />

                        </button>

                      </div>

                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}