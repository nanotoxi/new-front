"use client";

import { useAuth } from "@/lib/auth";

export default function AuthTestPage() {
  const {
    user,
    isLoggedIn,
    loading,
  } = useAuth();

  async function handleLogin() {
    await fetch("/api/auth/login", {
      method: "POST",
    });

    window.location.reload();
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    window.location.reload();
  }

  if (loading) {
    return <p className="p-10">Loading...</p>;
  }

  return (
    <div className="p-10 space-y-4">
      <h1 className="text-4xl font-bold">
        Auth Test
      </h1>

      <p>
        Logged In: {isLoggedIn ? "Yes" : "No"}
      </p>

      <p>
        User: {user?.email || "None"}
      </p>

      <div className="flex gap-4">
        <button
          onClick={handleLogin}
          className="bg-primary px-4 py-2 rounded-xl text-white"
        >
          Login
        </button>

        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded-xl text-white"
        >
          Logout
        </button>
      </div>
    </div>
  );
}