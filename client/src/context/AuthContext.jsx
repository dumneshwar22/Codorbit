import { createContext, useEffect, useState } from "react";
import api from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isGuest, setIsGuest] = useState(() => {
    return localStorage.getItem("guestMode") === "true";
  });
  const [loading, setLoading] = useState(true);

  const syncGuestMode = (nextValue) => {
    setIsGuest(nextValue);

    if (nextValue) {
      localStorage.setItem("guestMode", "true");
    } else {
      localStorage.removeItem("guestMode");
    }
  };

  const login = async (token) => {
    syncGuestMode(false);
    localStorage.setItem("token", token);
    await loadUser();
  };

  const continueAsGuest = () => {
    syncGuestMode(true);
    setUser(null);
    setLoading(false);
  };

  const exitGuestMode = () => {
    syncGuestMode(false);
    setUser(null);
    localStorage.removeItem("token");
    setLoading(false);
  };

  const logout = () => {
    if (isGuest) {
      exitGuestMode();
      return;
    }

    localStorage.removeItem("token");
    setUser(null);
    setLoading(false);
  };

  const loadUser = async () => {
    try {
      const guestMode = localStorage.getItem("guestMode") === "true";
      const token = localStorage.getItem("token");

      setIsGuest(guestMode);

      if (guestMode) {
        setUser(null);
        setLoading(false);
        return;
      }

      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      const res = await api.get("/auth/me");
      setUser(res.data.user);
    } catch (error) {
      localStorage.removeItem("token");
      setUser(null);
      setIsGuest(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user && !isGuest,
        isGuest,
        loading,
        loadUser,
        login,
        logout,
        continueAsGuest,
        exitGuestMode,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};