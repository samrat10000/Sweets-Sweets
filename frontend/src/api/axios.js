import axios from "axios";

// const BASE_URI = "https://sweet-shop-backend-z5rp.onrender.com/api";
const BASE_URI = import.meta.env.VITE_BASE_URI;

const api = axios.create({
  baseURL: BASE_URI,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Attach token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
