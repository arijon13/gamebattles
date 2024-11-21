"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

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

  // Simulate stored token and balance
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedBalance = localStorage.getItem("balance");

    if (storedToken && storedBalance) {
      setIsLoggedIn(true);
      setBalance(parseFloat(storedBalance));
    }
  }, []);

  // Simulate the login function for testing
  const login = async (email: string, password: string) => {
    try {
      // Simulating successful login with hardcoded values
      if (email === "test@example.com" && password === "password123") {
        setIsLoggedIn(true);
        setBalance(1000); // Hardcoded balance for testing

        // Simulating storing token and balance in localStorage
        localStorage.setItem("token", "test-token");
        localStorage.setItem("balance", "1000");
      } else {
        throw new Error("Invalid email or password.");
      }
    } catch (error: any) {
      console.error("Login error:", error.message || error);
      throw new Error(error.message || "Failed to log in.");
    }
  };

  // Simulate the logout function for testing
  const logout = () => {
    setIsLoggedIn(false);
    setBalance(0);
    localStorage.removeItem("token");
    localStorage.removeItem("balance");
  };

  // Simulate the register function for testing
  const register = async (username: string, email: string, password: string) => {
    try {
      // Simulating successful registration
      if (email === "test@example.com") {
        console.log("[Test Register] User registered:", username, email);

        // Simulate automatic login after registration
        await login(email, password);
      } else {
        throw new Error("Registration failed.");
      }
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
