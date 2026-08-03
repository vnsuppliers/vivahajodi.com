import axios from "axios";

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

api.interceptors.request.use(
  (config) => {
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }

    const userString = localStorage.getItem("matrimony_user_data");
    if (userString) {
      try {
        const { access_token } = JSON.parse(userString);
        if (access_token) {
          config.headers.Authorization = `Bearer ${access_token}`;
        }
      } catch (e) {
        console.error("Auth token parsing failed");
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const errorCode = error.response?.data?.errorCode;

    // Handle Session Expiration / Unauthorized
    if (status === 401) {
      const userString = localStorage.getItem("matrimony_user_data");
      if (userString) {
        localStorage.removeItem("matrimony_user_data");
        window.location.href = "/login";
      }
    }

    // Handle Admin Enforcement Actions (Blocked, Suspended, Deactivated, Under Review)
    if (status === 403) {
      if (errorCode === "BLOCKED") {
        window.location.href = "/blocked";
      } else if (errorCode === "SUSPENDED") {
        window.location.href = "/suspended";
      } else if (errorCode === "DEACTIVATED") {
        window.location.href = "/deactivated"; // Or wherever your deactivated route points
      } else if (errorCode === "UNDER_REVIEW") {
        window.location.href = "/under-review";
      }
    }

    return Promise.reject(error);
  },
);

export default api;
