import axios from "axios";

const fetchInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.example.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 예시
fetchInstance.interceptors.request.use(
  (config) => {
    // 필요시 토큰 등 추가
    // const token = localStorage.getItem('token');
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터 예시
fetchInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default fetchInstance;
