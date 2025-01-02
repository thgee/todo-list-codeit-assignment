import axios from "axios";

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 5000, // 요청 타임아웃 설정 (5초)
  headers: { "Content-Type": "application/json" },
});

export default axiosInstance;
