import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  // Toggle between Login and Register
  const [isLogin, setIsLogin] = useState(true);

  // Form input data
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Error or success messages
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Generate a random avatar from randomuser.me
  const getRandomAvatar = () => {
    const id = Math.floor(Math.random() * 70) + 1;
    return `https://randomuser.me/api/portraits/men/${id}.jpg`;
  };

  // Generate a fake JWT token (frontend simulation)
  const generateFakeJWT = (email) => {
    const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
    const payload = btoa(JSON.stringify({ email, exp: Date.now() + 3600000 }));
    const signature = btoa("fake-signature");
    return `${header}.${payload}.${signature}`;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Get registered users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (isLogin) {
      // ===== LOGIN LOGIC =====
      const existingUser = users.find(
        (user) =>
          user.email === formData.email &&
          user.password === formData.password
      );

      if (!existingUser) {
        setError("User not found. Please register first.");
        return;
      }

      // Create fake JWT token
      const token = generateFakeJWT(existingUser.email);

      // Save logged-in session
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(existingUser));

      navigate("/");
    } else {
      // ===== REGISTER LOGIC =====
      const userExists = users.find((user) => user.email === formData.email);

      if (userExists) {
        setError("User already registered. Please login.");
        return;
      }

      // Create new user with random avatar
      const newUser = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        avatar: getRandomAvatar(), // 👈 Avatar added here
      };

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      setError("Registration successful! Please login.");
      setIsLogin(true);
    }
  };

  return (
    <div className="login-page">
      <div className="auth-card">
        <h2>{isLogin ? "Login" : "Register"}</h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
              onChange={handleChange}
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
          />

          <button type="submit">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        {error && <p className="auth-error">{error}</p>}

        <p onClick={() => setIsLogin(!isLogin)} className="toggle-auth">
          {isLogin
            ? "Don't have an account? Register"
            : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
}