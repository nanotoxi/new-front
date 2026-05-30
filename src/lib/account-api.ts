import axios from "axios";

const accountApi = axios.create({
  baseURL:
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1`,
});

accountApi.interceptors.request.use(
  (config) => {

    if (
      typeof window !== "undefined"
    ) {

      const token =
        localStorage.getItem(
          "nanotoxi_token"
        );

      console.log(
        "ACCOUNT TOKEN:",
        token
      );

      if (token) {

        config.headers.Authorization =
          `Bearer ${token}`;
      }
    }

    return config;
  }
);

export const getAccountOverview =
  async () => {

    const res =
      await accountApi.get(
        "/account/overview"
      );

    return res.data;
  };

export const getApiKeys =
  async () => {

    const res =
      await accountApi.get(
        "/account/api-keys"
      );

    return res.data;
  };

export const createApiKey =
  async (name: string) => {

    const res =
      await accountApi.post(
        "/account/api-keys",
        { name }
      );

    return res.data;
  };

export const deleteApiKey =
  async (id: string) => {

    const res =
      await accountApi.delete(
        `/account/api-keys/${id}`
      );

    return res.data;
  };