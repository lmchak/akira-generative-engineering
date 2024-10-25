import React from 'react';
import { Navigate } from 'react-router-dom';
import { useRBAC } from '@/hooks/useRBAC';
import { toast } from "sonner";

const RoleProtectedRoute = ({ children, requiredRole }) => {
  const { hasRole } = useRBAC();

  if (!hasRole(requiredRole)) {
    toast.error("You don't have permission to access this page");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RoleProtectedRoute;