// Routing tools
import { Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Watch from "./pages/Watch";

// Protects pages from unauthorized users
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Login page (public) */}
      <Route path="/login" element={<Login />} />

      {/* Home page (protected) */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      {/* Watch page (protected) */}
      {/* 🔴 FIX: :videoId instead of :id */}
      <Route
        path="/watch/:videoId"
        element={
          <ProtectedRoute>
            <Watch />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;