import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, RegisterForm, AuthResponse } from "@/interfaces/auth.interface";
import { authService } from "@/services/auth.service";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: RegisterForm) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Persist Session on Refresh
  useEffect(() => {
    const stored = localStorage.getItem("matrimony_user_data");

    if (stored) {
      try {
        const parsed: AuthResponse = JSON.parse(stored);

        const decoded = jwtDecode<{ exp: number }>(
          parsed.access_token
        );

        const currentTime = Date.now() / 1000;

        // Token expired
        if (decoded.exp < currentTime) {
          localStorage.removeItem("matrimony_user_data");
          setUser(null);
        } else {
          setUser(parsed.user);
        }
      } catch (e) {
        localStorage.removeItem("matrimony_user_data");
        setUser(null);
      }
    }

    setLoading(false);
  }, []);

  // Login Function
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const data: AuthResponse = await authService.login({ email, password });
      localStorage.setItem("matrimony_user_data", JSON.stringify(data));
      setUser(data.user);
      toast.success(data.message || "Welcome back!");
      return true;
    } catch (error: unknown) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Login failed");
      return false;
    }
  };

  // Register Function
  const register = async (data: RegisterForm): Promise<boolean> => {
    try {
      const response = await authService.register(data);
      toast.success(response.message || "Account created successfully!");
      localStorage.setItem("matrimony_user_data", JSON.stringify(response));
      setUser(response.user);
      return true;
    } catch (error) {
      const err = error as AxiosError<{ message: string | string[] }>;
      const msg = err.response?.data?.message;

      // handles both string and string[] from NestJS
      const displayMsg = Array.isArray(msg) ? msg[0] : msg;

      toast.error(displayMsg || "Registration failed");
      return false;
    }
  };

  // Logout Function with forced window redirection to login
  const logout = () => {
    setUser(null);
    localStorage.removeItem("matrimony_user_data");
    toast.info("Logged out successfully");
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};