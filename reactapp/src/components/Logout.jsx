// src/components/LogoutButton.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user"); // clear user data
    alert("✅ You have been logged out successfully!");
    navigate("/login"); // redirect to login page
  };

  return (
    <button
      className="btn btn-danger btn-logout"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}
