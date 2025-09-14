import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

// Create the context
const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [page, setPage] = useState(token ? "profile" : "login");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const authHeader = (authToken = token) => ({
    headers: { Authorization: `Bearer ${authToken}` },
  });

  // Login Function
  const login = async (email, password) => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${API_BASE}/token/`, {
        email,
        password,
      });
      setToken(data.access);
      localStorage.setItem("token", data.access);
      setPage("/");
      await fetchProfile(data.access);
    } catch (err) {
      setError(err.response?.data?.detail || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // Registration Function
  const register = async (
    email,
    phone,
    address,
    password,
    confirm_password
  ) => {
    setLoading(true);
    try {
      await axios.post(`${API_BASE}/register/`, {
        email,
        phone,
        address,
        password,
        confirm_password,
      });
      setPage("login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  // Profile page Function
  const fetchProfile = async (authToken = token) => {
    if (!authToken) return;
    try {
      const { data } = await axios.get(
        `${API_BASE}/profile/`,
        authHeader(authToken)
      );
      setProfile(data);
    } catch {
      setError("Failed to load profile");
    }
  };

  const updateProfile = async (updateData) => {
    if (!token) return;
    try {
      const { data } = await axios.put(`${API_BASE}/profile/`, updateData, {
        ...authHeader(),
        "Content-Type": "application/json",
      });
      setProfile(data);
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.message || "Profile update failed");
      return { success: false };
    }
  };

  // Logout Function
  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    setPage("/");
    setProfile(null);
  };

  useEffect(() => {
    if (token) fetchProfile(token);
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        token,
        profile,
        login,
        logout,
        register,
        updateProfile,
        fetchProfile,
        page,
        goTo: setPage,
        loading,
        error,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Create the hook - FIXED THIS PART
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Add this missing constant
const API_BASE = "http://localhost:8000";
