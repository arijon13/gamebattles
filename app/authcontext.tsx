"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextProps {
  isLoggedIn: boolean;
  balance: number;
  login: (balance: number) => void;
  logout: () => void;
  register: (username: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const storedLogin = localStorage.getItem("isLoggedIn");
    const storedBalance = localStorage.getItem("balance");

    if (storedLogin === "true" && storedBalance) {
      setIsLoggedIn(true);
      setBalance(parseFloat(storedBalance));
    }
  }, []);

  const login = (newBalance: number) => {
    setIsLoggedIn(true);
    setBalance(newBalance);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("balance", newBalance.toString());
  };

  const logout = () => {
    setIsLoggedIn(false);
    setBalance(0);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("balance");
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      // Simulert forsinkelse for å etterligne et API-kall
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Sjekk om alle feltene er fylt ut
      if (!username || !email || !password) {
        throw new Error("All fields are required.");
      }

      // Simulert registrering - mock svar
      const mockBalance = 100; // Tildeler mock-saldo etter registrering
      login(mockBalance); // Logg inn med startsaldo

    } catch (error: any) { // Angi at 'error' er av typen 'any'
      console.error("Registration error:", error);
      throw new Error(`Registration failed: ${error.message || 'Unknown error'}`);
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
