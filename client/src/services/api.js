import axios from "axios";

const API = axios.create({
  baseURL: "https://mern-job-portal-api-dihw.onrender.com/api",
});

export default API;
