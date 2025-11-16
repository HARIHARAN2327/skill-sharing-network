import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { loginUser } from "../services/userApi";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const identifier = form.identifier.trim().toLowerCase(); // lowercase for consistency
    const password = form.password; // do not trim to preserve exact password

    if (!identifier || !password) {
      alert("⚠️ Please enter email/username and password.");
      return;
    }

    try {
      // Call login API
      const resp = await loginUser(identifier, password); // { identifier, password }
      console.log("Login response:", resp.data);

      // Backend returns { token, user }
      const apiData = resp.data || {};
      const normalizedUser = apiData.user ? { ...apiData.user, token: apiData.token } : apiData;

      // Save user in context and localStorage
      login(normalizedUser);
      localStorage.setItem("user", JSON.stringify(normalizedUser));

      alert("✅ Login successful! Redirecting...");
      navigate("/");
    } catch (error) {
      console.error("Login error:", error?.response?.data || error.message);
      const msg =
        error?.response?.data ||
        (error?.response?.status === 401 ? "Invalid credentials." : "Login failed. Try again later.");
      alert(`⚠️ ${msg}`);
    }
  };

  const videoUrl =
    "https://jetonbucket.fra1.cdn.digitaloceanspaces.com/jeton/2024-08-08T10-52-53.656Z-jeton-homepage-mobile2.mp4#t=0.01";

  return (
    <div className="login-container">
      <div className="login-form-section">
        <header className="login-header">
          <div className="logo">Hawks</div>
        </header>

        <main className="form-main">
          <h1>Login</h1>
          <form onSubmit={handleSubmit} noValidate>
            <div className="input-group">
              <i className="fa-regular fa-envelope input-icon"></i>
              <input
                type="text"
                name="identifier"
                placeholder="Email or Username"
                value={form.identifier}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <i className="fa-solid fa-lock input-icon"></i>
              <input
                type={isPasswordVisible ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
              />
              <i
                className={`fa-regular ${isPasswordVisible ? "fa-eye-slash" : "fa-eye"} visibility-toggle`}
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              ></i>
            </div>

            <div className="forgot-password">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>

            <button type="submit" className="btn-login">
              Log in
            </button>

            <p className="signup-prompt">
              Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
          </form>
        </main>
      </div>

      <div className="login-video-section">
        <video className="login-video-bg" src={videoUrl} autoPlay loop muted playsInline></video>
        <div className="promo-content">
          <h2>Skill Sharing Network</h2>
          <p>Share • Learn • Connect • Grow together</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
