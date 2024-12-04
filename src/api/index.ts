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
    console.log('Sending registration request:', { email, username });
    const response = await API.post("/auth/register", { username, email, password });
    console.log('Registration response:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Full error object:', error);
    console.error('Error response:', error.response);
    console.error('Error message:', error.message);
    
    const errorMessage = error.response?.data?.error 
      || error.message 
      || "An unexpected error occurred";
    
    throw new Error(errorMessage);
  }
};

// Log in a user
export const loginUser = async (email: string, password: string) => {
  try {
    console.log('Attempting login with:', { email });
    const response = await API.post("/auth/login", { email, password });
    console.log('Login response:', response.data);
    return response.data;
  } catch (error: any) {
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
      throw new Error(error.response.data.error || 'Server error');
    } else if (error.request) {
      throw new Error('No response from server');
    } else {
      throw new Error('Error setting up request');
    }
  }
};

// Fetch user balance
export const getUserBalance = async () => {
  try {
    console.log('Fetching balance from server...');
    const response = await API.get("/auth/balance");
    console.log('Balance response:', response.data);
    return {
      btcBalance: response.data.balance || 0,
      ethBalance: 0,
      usdtBalance: 0
    };
  } catch (error: any) {
    console.error('Error fetching balance:', error);
    handleError(error);
    return { btcBalance: 0, ethBalance: 0, usdtBalance: 0 };
  }
};

// Make a deposit
export const makeDeposit = async (amount: number, currency: string) => {
  try {
    const response = await API.post("/deposit", { amount, currency });
    return response.data;
  } catch (error: any) {
    handleError(error);
  }
};

// Withdraw funds
export const makeWithdrawal = async (amount: number, currency: string, address: string) => {
  try {
    const response = await API.post("/withdraw", { amount, currency, address });
    return response.data;
  } catch (error: any) {
    handleError(error);
  }
};

// Get transaction history
export const getTransactionHistory = async () => {
  try {
    const response = await API.get("/transactions");
    return response.data;
  } catch (error: any) {
    handleError(error);
  }
};

// Update user profile
export const updateUserProfile = async (userData: any) => {
  try {
    const response = await API.put("/auth/profile", userData);
    return response.data;
  } catch (error: any) {
    handleError(error);
  }
};

// Logout user
export const logout = () => {
  localStorage.removeItem("token");
  // You might want to also clear other stored data
  localStorage.clear();
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