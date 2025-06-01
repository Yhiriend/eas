import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { login as loginService } from "@/services/authService";

// Define user roles
export type UserRole = 'professor' | 'admin';

// Define user type with role
export type User = {
  id: string;
  username: string;
  role: UserRole;
  name: string;
};

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (username: string, password: string) => {
    try {
      const result = await loginService(username, password);
      console.log("Usuario autenticado:", result.user); // Log para depuración
      setUser(result.user);
    } catch (err) {
      console.error("Error en login:", err); // Log para depuración
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
} 