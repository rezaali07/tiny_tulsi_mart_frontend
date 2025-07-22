import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://localhost:4000/api/v2", // Your backend URL
  withCredentials: true,
});

let csrfToken = "";

// Function to update CSRF token from App.js
export const setCsrfToken = (token) => {
  csrfToken = token;
};

// Add interceptor to add CSRF token header on every request
axiosInstance.interceptors.request.use(
  (config) => {
    if (csrfToken) {
      config.headers["X-CSRF-Token"] = csrfToken;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
