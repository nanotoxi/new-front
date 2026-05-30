import axios from "axios";

const compareApi = axios.create({
  baseURL:
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1`,
});

compareApi.interceptors.request.use(
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

export const comparePrediction =
  async (payload: any) => {

    console.log(
      "COMPARE PAYLOAD:",
      payload
    );

    try {

      const res =
        await compareApi.post(
          "/predict/compare",
          payload
        );

      console.log(
        "COMPARE RESPONSE:",
        res.data
      );

      return res.data;

    } catch (error: any) {

      console.log(
        "COMPARE ERROR:",
        error?.response?.data
      );

      console.log(
        "COMPARE STATUS:",
        error?.response?.status
      );

      throw error;
    }
  };