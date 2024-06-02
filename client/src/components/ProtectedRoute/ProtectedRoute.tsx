// src/components/ProtectedRoute.tsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Dashboard from "../../pages/Dashboard";

interface ProtectedRouteProps {
  roles: string[];
}

const ProtectedRoute = ({ roles }: ProtectedRouteProps) => {
  const { user } = useAuth();
  console.log("here "+ user);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!roles.includes(user.role)) {
    return <Navigate to="/not-authorized" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
