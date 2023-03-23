import axios from "axios";
import { QueryClient } from "react-query";
import { store } from "../store";
import { useShowAlert } from "../store/alert/alert.thunk";

const showAlert = useShowAlert(store.dispatch)

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
})

api.interceptors.request.use(
  (config) => {
    config.withCredentials = true
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  response => response,
  error => {
    showAlert({ message: error?.response?.data ? error?.response?.data?.message : error?.message })
  }
)

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});
