import axios from "axios";

const API_BASE =
  process.env.REACT_APP_API_BASE ||
  "https://skill-network-backend-ecgi.onrender.com";

const PAY_BASE = `${API_BASE.replace(/\/$/, "")}/api/payments`;

const api = axios.create({
  baseURL: PAY_BASE,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  try {
    const raw = localStorage.getItem("user");
    if (raw) {
      const u = JSON.parse(raw);
      if (u?.token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${u.token}`;
      }
    }
  } catch {}
  return config;
});

export const generateQR = (payload) => api.post("/generateQR", payload);
export const getStatus = (id) => api.get(`/status/${id}`);
export const confirmPayment = (id) => api.post(`/confirm/${id}`);
export const uploadScreenshot = (id, file) => {
  const form = new FormData();
  form.append("file", file);
  return api.post(`/uploadScreenshot/${id}`, form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
export const listPending = () => api.get(`/pendingVerification`);
export const verifyPayment = (id) => api.post(`/verifyPayment/${id}`);
export const screenshotUrl = (id) => `${PAY_BASE}/screenshot/${id}`;
export const isMember = (userId) => api.get(`/isMember/${userId}`);
