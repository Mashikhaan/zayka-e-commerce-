import { useContext } from "react";
import { AuthContext } from "../features/auth/auth.context";
import { Navigate } from "react-router-dom";

export default function ProtectedAdminRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  // Show loading while checking auth
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // If not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If logged in but not admin, redirect to home
  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // If admin, show the component
  return children;
}