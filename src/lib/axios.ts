import { jwtKeyPath } from "@/constants/security";
import axios, { AxiosError } from "axios";
import { router } from "expo-router";
import { getItem } from "expo-secure-store";

export const api = axios.create({
  baseURL: "https://one23ferry-backend.onrender.com",
  timeout: 8000, // 8 seconds
});

api.interceptors.request.use((request) => {
  const token = getItem(jwtKeyPath);

  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }

  return request;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const ignoreRoutes = ["/auth/login", "/usuario/me"]

    if (!ignoreRoutes.includes(error.config?.url || "")) {
      if (error.response?.status === 401) {
        router.replace("/(auth)/login")
      }
    }

    return Promise.reject(error);
  }
);
