import axios from "axios";

// Local backend base URL
const BASE_URL = "http://localhost:8080/api/skillshares";

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
