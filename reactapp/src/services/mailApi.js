// services/mailApi.js
import axios from "axios";

const API_BASE = "https://8080-afbbcbdcdbeddeaeaafeabcfedbbfadbaeaab.premiumproject.examly.io/api/password";

export const forgotPassword = (email) => {
  return axios.post(`${API_BASE}/forgot?email=${encodeURIComponent(email)}`);
};

export const resetPassword = (token, newPassword) => {
  return axios.post(`${API_BASE}/reset`, {
    token,
    newPassword
  });
};
