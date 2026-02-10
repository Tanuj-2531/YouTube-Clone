// Routing tools
import { Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Watch from "./pages/Watch";

// ✅ NEW Channel Pages
import CreateChannel from "./pages/CreateChannel";
import MyChannel from "./pages/MyChannel";

// Protects pages from unauthorized users
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* ================= PUBLIC ROUTES ================= */}

      {/* Login page */}
      <Route path="/login" element={<Login />} />



      {/* ================= PROTECTED ROUTES ================= */}

      {/* Home page */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      {/* Watch page */}
      <Route
        path="/watch/:videoId"
        element={
          <ProtectedRoute>
            <Watch />
          </ProtectedRoute>
        }
      />

      {/* ✅ Create Channel Page */}
      <Route
        path="/create-channel"
        element={
          <ProtectedRoute>
            <CreateChannel />
          </ProtectedRoute>
        }
      />

      {/* ✅ My Channel Page */}
      <Route
        path="/my-channel"
        element={
          <ProtectedRoute>
            <MyChannel />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;