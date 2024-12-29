import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const setAuthorizationToken = (token: string) => {
  if (token) {
    // Set token in cookies with a 1-hour expiration
    Cookies.set("token", token, { expires: 1 / 24 }); // 1/24 is 1 hour
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    // Remove token from cookies and headers
    Cookies.remove("token");
    delete api.defaults.headers.common["Authorization"];
  }
};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || "An error occurred";
    toast.error(message);
    if (error.response?.status === 401) {
      Cookies.remove("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const unprotectedPostRequest = async <T>(
  endpoint: string,
  data: any
): Promise<T> => {
  const response = await api.post<T>(endpoint, data);
  return response.data;
};

export const postRequest = async <T>(
  endpoint: string,
  data: any
): Promise<T> => {
  const response = await api.post<T>(endpoint, data);
  return response.data;
};

export default api;
