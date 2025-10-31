import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const authAxios = axios.create({
  baseURL: "http://localhost:8090/auth",
});

// Add token to every request if it exists
authAxios.interceptors.request.use(
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
authAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;

    const publicRoutes = ["/login", "/password/forgot"]; // endpoints that don't require a token

    if (
      response &&
      (response.status === 401 || response.status === 403) &&
      !publicRoutes.includes(config.url || "")
    ) {
      const { logout } = useAuth();
      await AsyncStorage.removeItem("authToken");
      console.log("Token expired. Redirect to login.");
      logout;
    }

    return Promise.reject(error);
  }
);

export default authAxios;