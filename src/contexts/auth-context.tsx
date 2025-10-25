"use client";

import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { User } from '@/lib/types';
import { mockUser } from '@/lib/data';

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // Simulate checking for a logged-in user on mount
  useEffect(() => {
    const checkAuth = () => {
      // In a real app, you'd check a token in localStorage or a cookie
      // For this demo, we'll keep it simple and start logged out.
    };
    checkAuth();
  }, []);

  const login = () => {
    // Simulate a successful login
    setUser(mockUser);
    setIsLoggedIn(true);
    router.push('/dashboard');
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
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
