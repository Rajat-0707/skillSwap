import axios from "axios";

const api = axios.create({
baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
withCredentials: true,
headers: {
"Content-Type": "application/json"
}
});

api.interceptors.request.use((config) => {
const token = localStorage.getItem("token");

if (token) {
config.headers = config.headers ?? {};
config.headers.Authorization = `Bearer ${token}`;
}

if (config.method === "get" && config.headers) {
const h = config.headers as Record<string, string>;
h["Cache-Control"] = "no-cache, no-store, must-revalidate";
h["Pragma"] = "no-cache";
h["Expires"] = "0";
}

return config;
});

export default api;
