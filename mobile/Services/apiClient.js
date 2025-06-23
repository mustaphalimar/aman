import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const apiClient = axios.create({
  // baseURL: 'http://192.168.217.207:8080/api',
  baseURL: "https://aman-production-e7eb.up.railway.app/api/",
});

apiClient.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("authToken");
  console.log("token:" + token);
  console.log(
    "API Request:",
    config.method?.toUpperCase(),
    config.url,
    "at",
    new Date().toISOString(),
  );
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    console.log(
      "API Response:",
      response.config.method?.toUpperCase(),
      response.config.url,
      "Status:",
      response.status,
      "at",
      new Date().toISOString(),
    );
    return response;
  },
  (error) => {
    console.error(
      "API Error:",
      error.config?.method?.toUpperCase(),
      error.config?.url,
      "Error:",
      error.message,
      "at",
      new Date().toISOString(),
    );
    return Promise.reject(error);
  },
);

export default apiClient;
