import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar el token JWT automáticamente desde la cookie
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = Cookies.get("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;
