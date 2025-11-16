import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RequireAdmin({ children }) {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();
  const role = user?.role || user?.authorities?.[0]?.authority || user?.roles?.[0];
  const isAdmin = String(role).toUpperCase() === "ADMIN" || String(role).toUpperCase() === "ROLE_ADMIN";

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default RequireAdmin;
