import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const { user } = useSelector((store) => store.auth);

  // If user doesn't exist → redirect to /login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise render the requested route
  return <Outlet />;
};
