import { createContext, useContext, useMemo, useState } from "react";
import api from "../services/api.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    const stored = localStorage.getItem("papervault_admin");
    if (!stored) return null;

    try {
      return JSON.parse(stored);
    } catch {
      localStorage.removeItem("papervault_token");
      localStorage.removeItem("papervault_admin");
      return null;
    }
  });

  const login = async (credentials) => {
    const { data } = await api.post("/admin/login", credentials);
    localStorage.setItem("papervault_token", data.token);
    localStorage.setItem("papervault_admin", JSON.stringify(data.admin));
    setAdmin(data.admin);
  };

  const logout = () => {
    localStorage.removeItem("papervault_token");
    localStorage.removeItem("papervault_admin");
    setAdmin(null);
  };

  const value = useMemo(() => ({ admin, isAuthenticated: Boolean(admin), login, logout }), [admin]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
