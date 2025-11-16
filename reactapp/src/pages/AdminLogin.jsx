import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { loginUser } from "../services/userApi";
import { useAuth } from "../context/AuthContext";

function AdminLogin() {
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login, logout } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const identifier = form.identifier.trim().toLowerCase();
    const password = form.password;
    if (!identifier || !password) {
      alert("Please enter email/username and password.");
      return;
    }
    setSubmitting(true);
    try {
      const resp = await loginUser(identifier, password);
      const apiData = resp?.data || {};
      const normalizedUser = apiData.user ? { ...apiData.user, token: apiData.token } : apiData;
      const role = normalizedUser?.role || normalizedUser?.authorities?.[0]?.authority || normalizedUser?.roles?.[0];
      const isAdmin = String(role).toUpperCase() === "ADMIN" || String(role).toUpperCase() === "ROLE_ADMIN";
      if (!isAdmin) {
        // ensure non-admins don't remain logged in via admin page
        try { logout(); } catch {}
        alert("Access denied. Admin credentials required.");
        return;
      }
      // Save admin user and redirect to /admin or previous intent
      login(normalizedUser);
      localStorage.setItem("user", JSON.stringify(normalizedUser));
      const from = location.state?.from?.pathname || "/admin";
      navigate(from, { replace: true });
    } catch (error) {
      const msg = error?.response?.data?.message || error?.response?.data || "Login failed";
      alert(msg);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="container py-5" style={{ maxWidth: 480 }}>
      <h2 className="mb-4">Admin Login</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label htmlFor="identifier" className="form-label">Email or Username</label>
          <input
            id="identifier"
            name="identifier"
            className="form-control"
            type="text"
            value={form.identifier}
            onChange={handleChange}
            autoFocus
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            id="password"
            name="password"
            className="form-control"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="d-flex align-items-center gap-3">
          <button className="btn btn-dark" type="submit" disabled={submitting}>
            {submitting ? "Signing in..." : "Sign in as Admin"}
          </button>
          <Link to="/login" className="text-decoration-none">User login</Link>
        </div>
      </form>
    </div>
  );
}

export default AdminLogin;
