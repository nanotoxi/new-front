import axios from "axios";

import type {
  LoginCredentials,
  LoginResponse,
  PredictionInput,
  PredictionResponse,
  HealthResponse,
} from "./types";

const apiClient = axios.create({

  baseURL:
    process.env.NEXT_PUBLIC_API_URL,

  headers: {
    "Content-Type":
      "application/json",
  },

  
});

/* =========================
   ATTACH JWT TOKEN
========================= */
apiClient.interceptors.request.use(
  (config) => {

    const token =
      localStorage.getItem(
        "nanotoxi_token"
      );

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  }
);

/* =========================
   HANDLE TOKEN REFRESH
========================= */
apiClient.interceptors.response.use(

  (response) => response,

  async (error) => {

    const originalRequest =
      error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {

      originalRequest._retry = true;

      try {

        const refreshToken =
          localStorage.getItem(
            "nanotoxi_refresh"
          );

        if (!refreshToken) {

          localStorage.clear();

          window.location.href =
            "/sign-in";

          return Promise.reject(error);
        }

        const response =
          await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/refresh`,
            {
              refresh_token:
                refreshToken,
            }
          );

        const {
          access_token,
          refresh_token,
        } = response.data;

        localStorage.setItem(
          "nanotoxi_token",
          access_token
        );

        localStorage.setItem(
          "nanotoxi_refresh",
          refresh_token
        );

        originalRequest.headers.Authorization =
          `Bearer ${access_token}`;

        return apiClient(
          originalRequest
        );

      } catch {

        localStorage.clear();

        window.location.href =
          "/sign-in";
      }
    }

    return Promise.reject(error);
  }
);

export const api = {

  /* =========================
     HEALTH CHECK
  ========================= */
  async health():
    Promise<HealthResponse> {

    const response =
      await apiClient.get(
        "/api/health"
      );

    return response.data;
  },

  /* =========================
     LOGIN
  ========================= */
  async login(
    creds: LoginCredentials
  ): Promise<LoginResponse> {

    const response =
      await apiClient.post(
        "/api/v1/auth/login",
        creds
      );

    /* SAVE TOKENS */
    localStorage.setItem(
      "nanotoxi_token",
      response.data.access_token
    );

    localStorage.setItem(
      "nanotoxi_refresh",
      response.data.refresh_token
    );

    return response.data;
  },

  /* =========================
     CURRENT USER
  ========================= */
  async me() {

    const response =
      await apiClient.get(
        "/api/v1/auth/me"
      );

    return response.data;
  },

  /* =========================
     LOGOUT
  ========================= */
  async logout() {

    await apiClient.post(
      "/api/v1/auth/logout"
    );

    localStorage.removeItem(
      "nanotoxi_token"
    );

    localStorage.removeItem(
      "nanotoxi_refresh"
    );
  },

  /* =========================
     PREDICT
  ========================= */
  async predict(
    input: PredictionInput
  ): Promise<PredictionResponse> {

    const response =
      await apiClient.post(
        "/api/v1/predict/",
        input
      );

    return response.data;
  },

  /* =========================
   PREDICTION HISTORY
========================= */
async history() {

  const response =
    await apiClient.get(
      "/api/v1/predict/history"
    );

  return response.data;
},

/* =========================
   DASHBOARD STATS
========================= */
async dashboardStats() {

  const response =
    await apiClient.get(
      "/api/v1/dashboard/stats"
    );

  return response.data;
},

/* =========================
   PREDICTIONS OVER TIME
========================= */
async predictionsOverTime(
  days = 30
) {

  const response =
    await apiClient.get(
      `/api/v1/dashboard/predictions-over-time?days=${days}`
    );

  return response.data;
},

/* =========================
   TOXICITY DISTRIBUTION
========================= */
async toxicityDistribution() {

  const response =
    await apiClient.get(
      "/api/v1/dashboard/toxicity-distribution"
    );

  return response.data;
},

/* =========================
   RECENT PREDICTIONS
========================= */
async recentPredictions() {

  const response =
    await apiClient.get(
      "/api/v1/dashboard/recent-predictions"
    );

  return response.data;
},

};
