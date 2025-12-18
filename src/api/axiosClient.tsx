import axios from "axios";
import { BACKEND_URL } from "./routes";

const axiosClient = axios.create({
  baseURL: BACKEND_URL,
  timeout: 100000, // 100 sec
  // ❌ Ne PAS mettre Content-Type global ici
  // headers: { "Content-Type": "application/json" },
});

// Intercepteur pour ajouter token
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercepteur de gestion globale des erreurs
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Erreur API :", error.response?.data || error.message);

    if (error.response?.status === 401) {
      localStorage.removeItem("jwtToken");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
