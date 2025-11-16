import axios from "axios";

// Base URL construction (local Spring Boot backend)
const DEFAULT_API_BASE = "http://localhost:8080";
const ROOT_BASE = (DEFAULT_API_BASE || "").replace(/^"|"$/g, "").replace(/\/+$/, "");
const API_ROOT = ROOT_BASE.replace(/\/+$/, "").endsWith("/api") ? ROOT_BASE : `${ROOT_BASE}/api`;
const BASE_URL = `${API_ROOT}/users`;
const SKILLS_BASE = `${API_ROOT}/skills`;
const SKILLSHARES_BASE = `${API_ROOT}/skillshares`;

// Axios instance for user APIs (signup, fetch users)
const userApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
  headers: { "Content-Type": "application/json" },
  timeout: 12000,
});

const skillsApi = axios.create({
  baseURL: SKILLS_BASE,
  withCredentials: false,
  headers: { "Content-Type": "application/json" },
  timeout: 12000,
});

const skillSharesApi = axios.create({
  baseURL: SKILLSHARES_BASE,
  withCredentials: false,
  headers: { "Content-Type": "application/json" },
  timeout: 12000,
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

attachAuthInterceptor(userApi);
attachAuthInterceptor(skillsApi);
attachAuthInterceptor(skillSharesApi);

// Login API base URL (exactly one '/api')
const AUTH_BASE = `${API_ROOT}/auth`;

const authApi = axios.create({
  baseURL: AUTH_BASE,
  withCredentials: false,
  headers: { "Content-Type": "application/json" },
  timeout: 12000,
});

// Minimal diagnostics to confirm target hosts in browser console
try {
  // eslint-disable-next-line no-console
  console.log("[userApi] ROOT_BASE:", ROOT_BASE, "API_ROOT:", API_ROOT, "USERS:", BASE_URL, "AUTH:", AUTH_BASE);
} catch {}

export function getApiBases() {
  return { ROOT_BASE, API_ROOT, USERS_BASE: BASE_URL, AUTH_BASE };
}

// ➕ Register / Signup
export const registerUser = (user) => {
  const payload = {
    username: user?.username,
    email: user?.email,
    password: user?.password,
  };
  return authApi.post("/signup", payload);
};

// 🔍 Login
export const loginUser = (identifier, password) => {
  return authApi.post("/login", { identifier, password });
};

// Admin helpers (optional usage from tools or admin setup screens)
export const hasAdmin = () => authApi.get("/hasAdmin");
export const bootstrapAdmin = (username, email, password) =>
  authApi.post("/bootstrapAdmin", { username, email, password });

// 📋 Get all users
export const getAllUsers = () => userApi.get("/allUsers");

// ❌ Delete user by ID
export const deleteUserById = (id) => userApi.delete(`/${id}`);

// 📚 Get all skills
export const getAllSkills = () => skillsApi.get("/allSkills");

// 🧩 Get all skill shares (user-contributed skills)
export const getAllSkillShares = () => skillSharesApi.get("/allSkillShares");

