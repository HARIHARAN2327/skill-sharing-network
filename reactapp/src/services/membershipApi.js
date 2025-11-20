// src/services/membershipApi.js
import axios from "axios";

// Follow existing pattern used in userApi.js
const API_BASE =
  process.env.REACT_APP_API_BASE ||
  "https://skill-network-backend-ecgi.onrender.com";

const MEMBERSHIP_BASE = `${API_BASE}/api/memberships`;

const membershipApi = axios.create({
  baseURL: MEMBERSHIP_BASE,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

function attachAuthInterceptor(instance) {
  instance.interceptors.request.use((config) => {
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
}

attachAuthInterceptor(membershipApi);

export const createMembership = (payload) => membershipApi.post("/create", payload);
