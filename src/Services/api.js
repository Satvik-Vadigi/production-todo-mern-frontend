import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_BASEURL,
});

API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem("todoapp") || "null");
  if (user?.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }
  return req;
});

export default API;
