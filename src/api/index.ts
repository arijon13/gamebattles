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
    console.log('Sending registration request:', { email, username }); // Log the request
    const response = await API.post("/auth/register", { username, email, password });
    console.log('Registration response:', response.data); // Log the response
    return response.data;
  } catch (error: any) {
    console.error('Full error object:', error); // Log the full error
    console.error('Error response:', error.response); // Log the response if it exists
    console.error('Error message:', error.message); // Log the error message
    
    const errorMessage = error.response?.data?.error 
      || error.message 
      || "An unexpected error occurred";
    
    throw new Error(errorMessage);
  }
};

// Log in a user
export const loginUser = async (email: string, password: string) => {
  try {
    console.log('Attempting login with:', { email }); // Log the request (don't log password)
    const response = await API.post("/auth/login", { email, password });
    console.log('Login response:', response.data); // Log the success response
    return response.data;
  } catch (error: any) {
    // Detailed error logging
    console.error('Login Error Details:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        baseURL: error.config?.baseURL,
      }
    });
    
    if (error.response) {
      // The server responded with a status code outside the 2xx range
      throw new Error(error.response.data.error || 'Server error');
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('No response from server');
    } else {
      // Something happened in setting up the request
      throw new Error('Error setting up request');
    }
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
  if (axios.isAxiosError(error)) {
    console.error('Axios Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
  } else {
    console.error('Non-Axios Error:', error);
  }
  
  const errorMessage = error.response?.data?.error || "An unexpected error occurred";
  throw new Error(errorMessage);
};
