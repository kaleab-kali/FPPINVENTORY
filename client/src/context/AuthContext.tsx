import React, { createContext, useContext, useState, ReactNode } from "react";

interface User {
  role: string;
  token: string;
  type: "employee" | "invstaff";
  employeeId: string;
  ObjId: string;
}

interface AuthContextType {
  user: User | null;
  login: (token: string, role: string, type: "employee" | "invstaff", employeeId:string,ObjId:string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (
    token: string,
    role: string,
    type: "employee" | "invstaff",
    employeeId: string,
    ObjId: string,
  ) => {
    setUser({ token, role, type, employeeId, ObjId });
    localStorage.setItem(
      "user",
      JSON.stringify({ token, role, type, employeeId, ObjId })
    );

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
