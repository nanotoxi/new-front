import axios from "axios";

const billingApi = axios.create({
  baseURL:
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1`,
});

billingApi.interceptors.request.use(
  (config) => {

    if (
      typeof window !== "undefined"
    ) {

      const token =
        localStorage.getItem(
          "nanotoxi_token"
        );

      if (token) {

        config.headers.Authorization =
          `Bearer ${token}`;
      }
    }

    return config;
  }
);

export const getBilling =
  async () => {

    const res =
      await billingApi.get(
        "/billing"
      );

    return res.data;
  };

export const createCheckout =
  async (planId: string) => {

    const res =
      await billingApi.post(
        "/stripe/checkout",
        {
          plan_id: planId,
        }
      );

    return res.data;
  };

export const cancelSubscription =
  async () => {

    const res =
      await billingApi.post(
        "/billing/cancel"
      );

    return res.data;
  };

export const resumeSubscription =
  async () => {

    const res =
      await billingApi.post(
        "/billing/resume"
      );

    return res.data;
  };