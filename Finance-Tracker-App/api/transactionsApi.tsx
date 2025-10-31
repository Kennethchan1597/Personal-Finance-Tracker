import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { globalLogout } from "../context/AuthContext";

export const transactionAxios = axios.create({
  baseURL: "http://localhost/transactions",
  timeout: 10000,
});

// Add token to every request if it exists
transactionAxios.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle token expiration, skip public routes
transactionAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;

    const publicRoutes = ["/login", "/password/forgot"]; // endpoints that don't require a token

    if (
      response &&
      (response.status === 401 || response.status === 403) &&
      !publicRoutes.includes(config.url || "")
    ) {
      // Token is invalid or expired
      await AsyncStorage.removeItem("token");
      console.log("Token expired. Redirect to login.");
      globalLogout?.();
    }
    return Promise.reject(error);
  }
);
