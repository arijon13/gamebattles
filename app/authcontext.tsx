"use client";

import { createContext, useContext, useState } from 'react';
import { loginUser, registerUser } from '../src/api';

// Define the User type
interface User {
  id: string;
  email: string;
  username: string;
}

// Define the AuthContext type
interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, username: string) => Promise<void>;
  logout: () => void;
  balance: number;
  setBalance: (amount: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [balance, setBalance] = useState(0);

  const login = async (email: string, password: string) => {
    try {
      console.log('AuthContext: Starting login attempt');
      const response = await loginUser(email, password);
      console.log('AuthContext: Login response received:', response);
      setUser(response.user);
      setIsLoggedIn(true);
    } catch (error: any) {
      console.error('AuthContext Login Error:', {
        message: error.message,
        stack: error.stack
      });
      throw error;
    }
  };

  const register = async (email: string, password: string, username: string) => {
    try {
      const response = await registerUser(username, email, password);
      setUser(response.user);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, register, logout, balance, setBalance }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
