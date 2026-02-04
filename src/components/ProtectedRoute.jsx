import { Navigate } from "react-router-dom";

// Component to block access if user not logged in
export default function ProtectedRoute({ children }) {
  const user = localStorage.getItem("user");

  // Redirect to login if no user found
  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}