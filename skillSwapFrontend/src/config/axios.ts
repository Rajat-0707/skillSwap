import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
    "Pragma": "no-cache",
    "Expires": "0"
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Prevent caching for GET requests
  if (config.method === 'get' && config.headers) {
    const h = config.headers as Record<string, string>;
    h['Cache-Control'] = 'no-cache, no-store, must-revalidate';
    h['Pragma'] = 'no-cache';
    h['Expires'] = '0';
  }

  return config;
});

export default api;
