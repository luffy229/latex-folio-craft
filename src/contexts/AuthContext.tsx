
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const signIn = async (email: string, password: string) => {
    // Dummy sign-in logic
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    
    const dummyUser: User = {
      id: '1',
      name: 'John Doe',
      email: email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
    };
    
    setUser(dummyUser);
    localStorage.setItem('user', JSON.stringify(dummyUser));
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Check for existing user on mount
  React.useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const value = {
    user,
    signIn,
    signOut,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
