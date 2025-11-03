import { jwtKeyPath } from "@/constants/security";
import axios from "axios";
import { getItem } from "expo-secure-store";

export const api = axios.create({
  baseURL: "http://192.168.100.29:3000",
  timeout: 8000, // 8 seconds
});

api.interceptors.request.use((request) => {
  const token = getItem(jwtKeyPath);

  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }

  return request;
});

// api.interceptors.response.use(
//   (response) => response,
//   async (error: AxiosError) => {
//     if (error.response && error.response.config.url !== "/auth/login" && error.response.status === 401) {
//       await deleteItemAsync(jwtKeyPath)
//       router.replace("/login");
//     }

//     return Promise.reject(error);
//   }
// );
