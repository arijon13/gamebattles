import axios from "axios";

// Create an Axios instance with the base backend URL
const API = axios.create({
  baseURL: "http://localhost:5000/api", // Replace with your backend URL in production
  headers: {
    "Content-Type": "application/json",
  },
});

// Axios Interceptor to Include Token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Register a new user
export const registerUser = async (username: string, email: string, password: string) => {
  try {
    const response = await API.post("/auth/register", { username, email, password });
    return response.data;
  } catch (error: any) {
    handleError(error);
  }
};

// Log in a user
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await API.post("/auth/login", { email, password });
    return response.data;
  } catch (error: any) {
    handleError(error);
  }
};

// Fetch user balance (Protected route)
export const getUserBalance = async () => {
  try {
    const response = await API.get("/auth/balance");
    return response.data;
  } catch (error: any) {
    handleError(error);
  }
};

// Handle Errors
const handleError = (error: any) => {
  const errorMessage = error.response?.data?.error || "An unexpected error occurred";
  console.error("API Error:", errorMessage);
  throw new Error(errorMessage);
};
