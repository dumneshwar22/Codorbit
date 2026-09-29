import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const guestAllowedRoutes = [
  "/dashboard",
  "/dsa-tracker",
  "/analytics",
  "/contests",
  "/profile",
  "/dsa-overview",
  "/sheet-management",
  "/resume-analysis",
  "/saved-questions",
];

const ProtectedRoute = ({ children }) => {
  const { user, isGuest, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  const isGuestRoute = isGuest && guestAllowedRoutes.includes(location.pathname);

  if (user || isGuestRoute) {
    return children;
  }

  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;