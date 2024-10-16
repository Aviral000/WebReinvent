import React, { createContext, useContext, useState } from 'react';
import { signinService, signupService } from '../services/authService';

interface AuthContextProps {
  user: { email: string } | null;
  signin: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string) => Promise<boolean>;
  signout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ email: string } | null>(null);

  const signin = async (email: string, password: string) => {
    const data = await signinService(email, password);
    if (data) {
      setUser({ email });
      return true;
    }
    return false;
  };

  const signup = async (email: string, password: string) => {
    const data = await signupService(email, password);
    if (data) {
      setUser({ email });
      return true;
    }
    return false;
  };

  const signout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signin, signup, signout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};