import axios from "axios";

// Backend base URL (configurable via REACT_APP_API_BASE)
const ROOT_BASE =
  (process.env.REACT_APP_API_BASE || "https://skill-network-backend-ecgi.onrender.com").replace(/\/+$/, "");
const BASE_URL = `${ROOT_BASE}/api/skillshares`;

export const addSkillShare = (skillShare) =>
  axios.post(`${BASE_URL}/addSkillShare`, skillShare);

export const getAllSkillShares = () => axios.get(`${BASE_URL}/allSkillShares`);

export const getSkillShareById = (id) => axios.get(`${BASE_URL}/${id}`);

export const getSkillSharesByCategory = (category) =>
  axios.get(`${BASE_URL}/byCategory?category=${category}`);

export const getSkillSharesSortedByLevel = () =>
  axios.get(`${BASE_URL}/sortedBySkillLevel`);

  export const updateSkillShare = (id, skillShare) =>
  axios.put(`${BASE_URL}/${id}`, skillShare);

export const deleteSkillShare = (id) =>
  axios.delete(`${BASE_URL}/${id}`);
