import axios from "axios";
import { QueryClient } from "react-query";

axios.defaults.withCredentials = true

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

api.interceptors.request.use(
  (config) => {
    let cookie = document.cookie.split(';')
    cookie = cookie.map(c => c.split('='))
    cookie = cookie?.reduce((acc, c) => {acc[c[0]] = c[1]; return acc}, {})

    config.headers.access_token_admin = cookie.access_token_admin
    config.withCredentials = true
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

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
