import React, { useEffect, useState } from "react";
import "../styles/Settings.css";
import { motion } from "framer-motion";

export default function Settings() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ username: "", email: "" });
  const [passwordForm, setPasswordForm] = useState({ current: "", new: "", confirm: "" });
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const loggedUser = localStorage.getItem("user");
    if (loggedUser) {
      const parsedUser = JSON.parse(loggedUser);
      setUser(parsedUser);
      setForm({ username: parsedUser.username, email: parsedUser.email });
    }
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handlePasswordChange = (e) =>
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });

  const handleSave = () => {
    const updatedUser = { ...user, ...form };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setSuccessMsg("✅ Profile updated successfully!");
    setErrorMsg("");
  };

  const handlePasswordSave = () => {
    if (passwordForm.new !== passwordForm.confirm) {
      setErrorMsg("❌ New password and confirm password do not match.");
      setSuccessMsg("");
      return;
    }
    // For demo, we just save the new password in localStorage
    const updatedUser = { ...user, passwordHash: passwordForm.new };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setSuccessMsg("✅ Password updated successfully!");
    setErrorMsg("");
    setPasswordForm({ current: "", new: "", confirm: "" });
  };

  if (!user) {
    return (
      <div className="settings-page container py-5 text-center text-white">
        <p>Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="settings-page container py-5">
      <motion.h1
        className="fw-bold mb-4 text-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Account Settings
      </motion.h1>

      {/* Success / Error Messages */}
      {successMsg && <div className="alert success-alert">{successMsg}</div>}
      {errorMsg && <div className="alert error-alert">{errorMsg}</div>}

      <div className="settings-grid">
        {/* Profile Info */}
        <motion.div
          className="settings-card"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="mb-3">Profile Information</h3>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={form.username}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <button className="btn btn-primary" onClick={handleSave}>
            Save Changes
          </button>
        </motion.div>

        {/* Change Password */}
        <motion.div
          className="settings-card"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="mb-3">Change Password</h3>
          <div className="mb-3">
            <label className="form-label">Current Password</label>
            <input
              type="password"
              className="form-control"
              name="current"
              value={passwordForm.current}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">New Password</label>
            <input
              type="password"
              className="form-control"
              name="new"
              value={passwordForm.new}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Confirm New Password</label>
            <input
              type="password"
              className="form-control"
              name="confirm"
              value={passwordForm.confirm}
              onChange={handlePasswordChange}
            />
          </div>
          <button className="btn btn-primary" onClick={handlePasswordSave}>
            Update Password
          </button>
        </motion.div>
      </div>

      {/* Optional Extra Settings */}
      <motion.div
        className="settings-card mt-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h3 className="mb-3">Extra Settings</h3>
        <p className="text-muted">
          You can add more account preferences here, like notification settings, privacy settings, or connected apps.
        </p>
        <button className="btn btn-secondary">Manage Preferences</button>
      </motion.div>
    </div>
  );
}
