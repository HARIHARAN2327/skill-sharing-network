// services/mailApi.js
import axios from "axios";

const ROOT_BASE =
  (process.env.REACT_APP_API_BASE || "https://skill-network-backend-ecgi.onrender.com").replace(/\/+$/, "");
const API_BASE = `${ROOT_BASE}/api/password`;

export const forgotPassword = (email) => {
  return axios.post(`${API_BASE}/forgot?email=${encodeURIComponent(email)}`);
};

export const resetPassword = (token, newPassword) => {
  return axios.post(`${API_BASE}/reset`, {
    token,
    newPassword
  });
};
