import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  profileComplete: number;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  gender: string;
  dateOfBirth: string;
  religion: string;
  motherTongue: string;
  country: string;
  state: string;
  city: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

const MOCK_USER: User = {
  id: "1",
  firstName: "Priya",
  lastName: "Sharma",
  email: "priya@example.com",
  phone: "+91 98765 43210",
  gender: "Female",
  profileComplete: 72,
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("matrimony_user");
    if (stored) setUser(JSON.parse(stored));
    setLoading(false);
  }, []);

  const login = async (email: string, _password: string): Promise<boolean> => {
    // Mock login
    const u = { ...MOCK_USER, email };
    setUser(u);
    localStorage.setItem("matrimony_user", JSON.stringify(u));
    return true;
  };

  const register = async (_data: RegisterData): Promise<boolean> => {
    const u = { ...MOCK_USER, email: _data.email, firstName: _data.firstName, lastName: _data.lastName };
    setUser(u);
    localStorage.setItem("matrimony_user", JSON.stringify(u));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("matrimony_user");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
