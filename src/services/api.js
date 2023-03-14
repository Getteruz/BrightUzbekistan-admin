import axios from "axios";
import { QueryClient } from "react-query";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    // withCredentials: true
})

api.interceptors.response.use(
  response => response,
  error => Promise.reject(error.response)
)

export const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });
  