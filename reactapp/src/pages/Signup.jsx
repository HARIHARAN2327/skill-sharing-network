import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Signup.css";
import { registerUser } from "../services/userApi";

function Signup() {
  const [form, setForm] = useState({
    country: "",
    email: "",
    password: "",
    name: "",
    phoneNumber: "",
    agreeTerms: false,
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.agreeTerms) {
      alert("You must agree to the Terms and Conditions and Privacy Policy.");
      return;
    }
    try {
      const username = (form.name || form.email?.split("@")[0] || "").trim().toLowerCase();

      const payload = {
        username,
        email: (form.email || "").trim().toLowerCase(),
        password: form.password,
      };

      const resp = await registerUser(payload);
      console.log("Signup response:", resp.data);
      alert("✅ Registration successful! Redirecting to login...");
      navigate("/login");
    } catch (error) {
      console.error(error);
      const msg = error?.response?.data?.message || error?.response?.data || "Signup failed. Please try again.";
      alert(`⚠️ ${msg}`);
    }
  };

  const videoUrl = "https://jetonbucket.fra1.cdn.digitaloceanspaces.com/jeton/2024-08-08T10-52-53.656Z-jeton-homepage-mobile2.mp4#t=0.01";

  return (
    <div className="signup-container">
      <div className="signup-form-section">
        <header className="signup-header">
          <div className="logo">Hawks</div>
        </header>

        <main className="form-main">
          <h1>Sign up</h1>
          <form onSubmit={handleSubmit} noValidate>
            <div className="input-group">
              <i className="fa-solid fa-flag input-icon"></i>
              <select name="country" value={form.country} onChange={handleChange} required>
                <option value="" disabled>Country</option>
                <option value="USA">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="IN">India</option>
                <option value="CA">Canada</option>
              </select>
            </div>

            <div className="input-group">
              <i className="fa-regular fa-envelope input-icon"></i>
              <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
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

            <div className="input-group">
              <i className="fa-regular fa-user input-icon"></i>
              <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
            </div>

            <div className="terms-group">
              <input type="checkbox" id="agreeTerms" name="agreeTerms" checked={form.agreeTerms} onChange={handleChange} />
              <label htmlFor="agreeTerms">
                I confirm that I have read and agree with{" "}
                <a href="/terms">Terms and Conditions</a> and{" "}
                <a href="/privacy">Privacy Policy</a>
              </label>
            </div>

            <button type="submit" className="btn-signup">
              Sign up
            </button>

            <p className="login-prompt">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </main>
      </div>

      <div className="signup-video-section">
        <video className="signup-video-bg" src={videoUrl} autoPlay loop muted playsInline></video>
        <div className="promo-content">
          <h2>Skill Sharing Network</h2>
          <p>Share • Learn • Connect • Grow together</p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
