// Login / Register page
export default function Login() {

  // Simulate successful login
  const handleLogin = () => {
    const fakeUser = {
      userId: "user01",
      username: "JohnDoe",
      email: "john@example.com",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    };

    // Store user in localStorage (acts like JWT session)
    localStorage.setItem("user", JSON.stringify(fakeUser));

    // Redirect to Home page
    window.location.href = "/";
  };

  return (
    <div className="login-page">
      <h2>Login / Register</h2>

      {/* Google Form embed for login/register */}
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLScExampleFormURL/viewform?embedded=true"
        width="100%"
        height="600"
        title="Google Form"
      ></iframe>

      <button onClick={handleLogin}>Simulate Login</button>
    </div>
  );
}