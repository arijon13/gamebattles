"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { registerUser, loginUser, getUserBalance } from "../src/api";

interface AuthContextProps {
  isLoggedIn: boolean;
  balance: number;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (username: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [balance, setBalance] = useState(0);

  // Load token and balance from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setIsLoggedIn(true);
      fetchBalance();
    }
  }, []);

  // Fetch user balance from back-end
  const fetchBalance = async () => {
    try {
      const balance = await getUserBalance();
      setBalance(balance);
      localStorage.setItem("balance", balance.toString());
    } catch (error) {
      console.error("Failed to fetch balance:", error);
    }
  };

  // Login function with back-end integration
  const login = async (email: string, password: string) => {
    try {
      const data = await loginUser(email, password);
      setIsLoggedIn(true);
      localStorage.setItem("token", data.token);
      setBalance(data.user.balance); // Use balance from API response
    } catch (error: any) {
      console.error("Login error:", error.message || error);
      throw new Error(error.message || "Failed to log in.");
    }
  };

  // Logout function
  const logout = () => {
    setIsLoggedIn(false);
    setBalance(0);
    localStorage.removeItem("token");
    localStorage.removeItem("balance");
  };

  // Register function with back-end integration
  const register = async (username: string, email: string, password: string) => {
    try {
      const data = await registerUser(username, email, password);
      console.log("User registered:", data.user);
      await login(email, password); // Automatically login after registration
    } catch (error: any) {
      console.error("Registration error:", error.message || error);
      throw new Error(error.message || "Failed to register.");
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, balance, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
