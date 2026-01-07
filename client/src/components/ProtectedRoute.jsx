import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // If user is NOT logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If logged in, allow access
  return children;
};

export default ProtectedRoute;
