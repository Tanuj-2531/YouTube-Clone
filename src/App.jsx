/* ================= ROUTER ================= */
import { Routes, Route, Navigate } from "react-router-dom";

/* ================= PAGES ================= */
import Home from "./pages/Home";
import Login from "./pages/Login";
import Watch from "./pages/Watch";

/* ================= CHANNEL PAGES ================= */
import CreateChannel from "./pages/CreateChannel";
import MyChannel from "./pages/MyChannel";

/* ================= AUTH GUARD ================= */
import ProtectedRoute from "./components/ProtectedRoute";

/* ================= MAIN APP ================= */
function App() {
  return (
    <Routes>

      {/* ================= PUBLIC ROUTES ================= */}

      {/* Login Page */}
      <Route path="/login" element={<Login />} />

      {/* ================= PROTECTED ROUTES ============== */}

      {/* Home Page */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      {/* Watch Video Page */}
      <Route
        path="/watch/:videoId"
        element={
          <ProtectedRoute>
            <Watch />
          </ProtectedRoute>
        }
      />

      {/* Create Channel Page */}
      <Route
        path="/create-channel"
        element={
          <ProtectedRoute>
            <CreateChannel />
          </ProtectedRoute>
        }
      />

      {/* My Channel Page */}
      <Route
        path="/my-channel"
        element={
          <ProtectedRoute>
            <MyChannel />
          </ProtectedRoute>
        }
      />

      {/* ================= FALLBACK ROUTE ================ */}

      {/* If route not found → go Home */}
      <Route path="*" element={<Navigate to="/" />} />

    </Routes>
  );
}

export default App;