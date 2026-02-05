// Routing tools
import { Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Watch from "./pages/Watch"; // 👈 NEW: Video player page

// Protects pages from unauthorized users
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Login page (public) */}
      <Route path="/login" element={<Login />} />

      {/* Home page (only visible after login) */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      {/* Watch page (video player) - also protected */}
      <Route
        path="/watch/:id"
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