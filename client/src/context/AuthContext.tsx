import React, { createContext, useContext, useState, ReactNode } from "react";

interface User {
  role: string;
  token: string;
  type: "employee" | "invstaff";
}

interface AuthContextType {
  user: User | null;
  login: (token: string, role: string, type: "employee" | "invstaff") => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (
    token: string,
    role: string,
    type: "employee" | "invstaff"
  ) => {
    setUser({ token, role, type });
    localStorage.setItem("user", JSON.stringify({ token, role,type }));

  };

  const logout = () => {
    setUser(null);
        localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
