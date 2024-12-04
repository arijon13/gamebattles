"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser, getUserBalance } from '../src/api/index';

// Define the User type
interface User {
  id: string;
  username: string;
  email: string;
  balance: number;
  depositAddresses: Array<{
    address: string;
    label: string;
    created: Date;
  }>;
  stakedBalance: number;
  stakingPositions: Array<{
    amount: number;
    startDate: Date;
    endDate: Date;
    reward: number;
    status: 'active' | 'completed' | 'withdrawn';
  }>;
}

// Define the AuthContext type
interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  generateNewAddress: (label: string) => Promise<void>;
  isLoggedIn: boolean;
  btcBalance: number;
  ethBalance: number;
  usdtBalance: number;
  updateBalance: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [btcBalance, setBtcBalance] = useState(0);
  const [ethBalance, setEthBalance] = useState(0);
  const [usdtBalance, setUsdtBalance] = useState(0);

  // Sjekk localStorage når appen starter
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      console.log('Found stored token');
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const updateBalance = async () => {
    try {
      console.log('Fetching balance...');
      const data = await getUserBalance();
      console.log('Received balance data:', data);
      setBtcBalance(data.btcBalance);
      setEthBalance(data.ethBalance);
      setUsdtBalance(data.usdtBalance);
    } catch (error) {
      console.error('Failed to update balance:', error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      updateBalance();
      
      const interval = setInterval(updateBalance, 5000);
      return () => clearInterval(interval);
    }
  }, [isLoggedIn]);

  const login = async (email: string, password: string) => {
    try {
      const response = await loginUser(email, password);
      setUser(response.user);
      setToken(response.token);
      setIsLoggedIn(true);
      
      // Lagre i localStorage
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      await updateBalance();
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (email: string, password: string, username: string) => {
    try {
      const response = await registerUser(username, email, password);
      setUser(response.user);
      setToken(response.token);
      setIsLoggedIn(true);
      
      // Lagre i localStorage
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      await updateBalance();
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsLoggedIn(false);
    setBtcBalance(0);
    setEthBalance(0);
    setUsdtBalance(0);

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // window.location.href = '/login';
  };

  const generateNewAddress = async (label: string) => {
    if (!token) throw new Error('Not authenticated');

    try {
      const response = await fetch('http://localhost:5000/api/wallet/addresses/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ label })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server response:', errorText);
        throw new Error(`Failed to generate address: ${errorText}`);
      }

      const data = await response.json();
      setUser(prev => ({
        ...prev!,
        depositAddresses: [...(prev?.depositAddresses || []), {
          address: data.address,
          label: data.label,
          created: new Date()
        }]
      }));
    } catch (error) {
      console.error('Error generating address:', error);
      throw error;
    }
  };

  const value = {
    user,
    token,
    login,
    logout,
    register,
    generateNewAddress,
    isLoggedIn,
    btcBalance,
    ethBalance,
    usdtBalance,
    updateBalance,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const BalanceDisplay = () => {
  const { btcBalance, ethBalance, usdtBalance } = useAuth();

  return (
    <div className="balance-container">
      <div>BTC: {btcBalance.toFixed(8)}</div>
      <div>ETH: {ethBalance.toFixed(8)}</div>
      <div>USDT: {usdtBalance.toFixed(2)}</div>
    </div>
  );
};