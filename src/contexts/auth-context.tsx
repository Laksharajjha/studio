"use client";

import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { User } from '@/lib/types';

// For testing purposes as requested.
const MASTER_API_KEY = "master-key-123";
const MOCK_USER: User = { email: "dev@zelth.com", avatar: "/avatar.png" };


interface AuthContextType {
  user: User | null;
  apiKey: string | null;
  isLoggedIn: boolean;
  error: string | null;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // On mount, check if the user is "logged in" from a previous session.
  useEffect(() => {
    try {
        const storedKey = localStorage.getItem('zelth-api-key');
        if (storedKey) {
            setApiKey(storedKey);
            setUser(MOCK_USER);
            setIsLoggedIn(true);
        }
    } catch (e) {
        // localStorage is not available
        console.warn("localStorage not available. Session will not persist.");
    }
  }, []);

  const login = () => {
    // For this demo, login sets the master API key and mock user
    setApiKey(MASTER_API_KEY);
    setUser(MOCK_USER);
    setIsLoggedIn(true);
    setError(null);
    try {
        localStorage.setItem('zelth-api-key', MASTER_API_KEY);
    } catch (e) {
        console.warn("localStorage not available. Session will not persist.");
    }
    router.push('/dashboard');
  };

  const logout = () => {
    setUser(null);
    setApiKey(null);
    setIsLoggedIn(false);
    setError(null);
    try {
      localStorage.removeItem('zelth-api-key');
    } catch (e) {
      console.warn("localStorage not available.");
    }
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, apiKey, isLoggedIn, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
