"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { loginUser } from "../src/api"; // Import login API function

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

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedBalance = localStorage.getItem("balance");

    if (storedToken && storedBalance) {
      setIsLoggedIn(true);
      setBalance(parseFloat(storedBalance));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await loginUser(email, password);
      const { token, user } = response;

      setIsLoggedIn(true);
      setBalance(user.balance);

      localStorage.setItem("token", token); // Save token for authentication
      localStorage.setItem("balance", user.balance.toString());
    } catch (error: any) {
      console.error("Login error:", error.message || error);
      throw new Error(error.message || "Failed to log in.");
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setBalance(0);
    localStorage.removeItem("token");
    localStorage.removeItem("balance");
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Registration failed.");
      }

      // Automatically log the user in after registration
      await login(email, password);
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
