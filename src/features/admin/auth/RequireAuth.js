import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = ({ allowedRole }) => {
  const location = useLocation();
  const { role } = useAuth();

  if (!role) {
    <div>Loading...</div>;
  }
  const content = Array.isArray(allowedRole) ? (
    allowedRole.includes(role) ? (
      <Outlet />
    ) : (
      <Navigate to="/login" state={{ from: location }} replace />
    )
  ) : role === allowedRole ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
  return content;
};

export default RequireAuth;
