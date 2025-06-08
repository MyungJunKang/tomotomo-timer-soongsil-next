import axios, { AxiosError, AxiosRequestConfig } from "axios";

const fetchInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.example.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터
fetchInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터
fetchInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // 토큰 제거
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");

      // 페이지 이동
      if (typeof window !== "undefined") {
        window.location.replace("/"); // "/"로 강제 이동
      }
    }

    return Promise.reject(error);
  }
);

export default fetchInstance;
