import axios from "axios";
import { API_ENDPOINT } from "../constants/api";

// Tạo một instance của Axios
const apiClient = axios.create({
  baseURL: API_ENDPOINT, // Gốc URL
  headers: {
    "Content-Type": "application/json", // Header mặc định
  },
});

// Interceptor để tự động thêm Authorization header vào mọi request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("userToken"); // Lấy token từ localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Thêm Bearer Token
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
