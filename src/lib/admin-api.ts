import axios from "axios";

const adminApi = axios.create({
  baseURL:
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin`,
});

adminApi.interceptors.request.use(
  (config) => {

    if (
      typeof window !== "undefined"
    ) {

      const token =
        localStorage.getItem(
          "nanotoxi_token"
        );

      console.log(
        "ADMIN TOKEN:",
        token
      );

      if (token) {

        config.headers.Authorization =
          `Bearer ${token}`;
      }
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

/* =========================
   ADMIN STATS
========================= */

export const getAdminStats =
  async () => {

    const res =
      await adminApi.get(
        "/stats"
      );

    return res.data;
  };

/* =========================
   ADMIN OVERVIEW
========================= */

export const getAdminOverview =
  async (
    days = 30
  ) => {

    const res =
      await adminApi.get(
        `/overview?days=${days}`
      );

    return res.data;
  };

/* =========================
   USERS
========================= */

export const getAdminUsers =
  async (
    page = 1,
    limit = 20
  ) => {

    const res =
      await adminApi.get(
        `/users?page=${page}&limit=${limit}`
      );

    return res.data;
  };

/* =========================
   PREDICTIONS
========================= */

export const getAdminPredictions =
  async () => {

    const res =
      await adminApi.get(
        "/predictions"
      );

    return res.data;
  };

/* =========================
   AUDIT TRAILS
========================= */

export const getAuditTrails =
  async () => {

    const res =
      await adminApi.get(
        "/audit-trails"
      );

    return res.data;
  };

/* =========================
   SYSTEM HEALTH
========================= */

export const getSystemHealth =
  async () => {

    const res =
      await adminApi.get(
        "/system-health"
      );

    return res.data;
  };

/* =========================
   MODELS
========================= */

export const getModels =
  async () => {

    const res =
      await adminApi.get(
        "/models"
      );

    return res.data;
  };

/* =========================
   DATA SOURCES
========================= */

export const getDataSources =
  async () => {

    const res =
      await adminApi.get(
        "/data-sources"
      );

    return res.data;
  };

/* =========================
   SETTINGS
========================= */

export const getAdminSettings =
  async () => {

    const res =
      await adminApi.get(
        "/settings"
      );

    return res.data;
  };

/* =========================
   UPDATE SETTINGS
========================= */

export const updateAdminSettings =
  async (
    payload: {
      trial_days?: number;
      max_upload_size_mb?: number;
      max_bulk_rows?: number;
      llm_model?: string;
    }
  ) => {

    const res =
      await adminApi.put(
        "/settings",
        payload
      );

    return res.data;
  };