import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" />;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));

    // Check expiry
    if (Date.now() > payload.exp) {
      localStorage.removeItem("token");
      return <Navigate to="/login" />;
    }

    return children;
  } catch {
    return <Navigate to="/login" />;
  }
}