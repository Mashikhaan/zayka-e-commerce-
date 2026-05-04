import axios from "axios";

const api = axios.create({
  baseURL: "https://zayka-e-commerce.onrender.com/api",
  withCredentials: true, // 👈 MOST IMPORTANT
});

export default api;