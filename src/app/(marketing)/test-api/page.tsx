"use client";

import { useEffect, useState } from "react";

import { api } from "@/lib/api";

export default function TestApiPage() {
  const [status, setStatus] = useState("");

  useEffect(() => {
    async function checkHealth() {
      const data = await api.health();

      setStatus(data.status);
    }

    checkHealth();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold">
        API Test
      </h1>

      <p className="mt-4">
        Health Status: {status}
      </p>
    </div>
  );
}