import { jwtKeyPath } from '@/constants/security';
import axios from 'axios';
import { getItem } from "expo-secure-store";


export const api = axios.create({
    baseURL: 'http://192.168.100.29:3000',
})

api.interceptors.request.use((request) => {
  const token = getItem(jwtKeyPath);

  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }

  return request;
});

// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response) {
//       const { status, config } = error.response;

//       if (status === 401 && !config.url?.startsWith("/auth")) {
//         router.replace('/(auth)/login');
//       }
//     }

//     return Promise.reject(error);
//   }
// );