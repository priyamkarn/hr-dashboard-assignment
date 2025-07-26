"use client";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const mockUsers = [
  {
    id: 1,
    email: "admin@company.com",
    password: "admin123",
    name: "Admin User",
    role: "admin"
  },
  {
    id: 2,
    email: "hr@company.com",
    password: "hr123",
    name: "HR Manager",
    role: "hr"
  },
  {
    id: 3,
    email: "manager@company.com",
    password: "manager123",
    name: "Department Manager",
    role: "manager"
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(
      u => u.email === email && u.password === password
    );

    if (foundUser) {
      const userSession = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        role: foundUser.role
      };
      
      setUser(userSession);
      localStorage.setItem("user", JSON.stringify(userSession));
      setLoading(false);
      return { success: true };
    } else {
      setLoading(false);
      return { success: false, error: "Invalid email or password" };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};