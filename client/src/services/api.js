import axios from "axios";

const API = axios.create({
  baseURL: "https://mern-job-portal-api-dhiw.onrender.com/api",
});

export default API;
