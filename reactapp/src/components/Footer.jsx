import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHome, FaPlus, FaList, FaSignInAlt, FaUserPlus, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import "../styles/Footer.css";

function Footer() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check login status when the component mounts
  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    alert("✅ Logged out successfully");
    navigate("/login");
  };

  return (
    <motion.div
      className="footer-man-bar"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <NavLink to="/" className="footer-nav-btn" end>
        <FaHome />
        <span>Home</span>
      </NavLink>
      <NavLink to="/add-skill" className="footer-nav-btn">
        <FaPlus />
        <span>Add Skill</span>
      </NavLink>
      <NavLink to="/skills" className="footer-nav-btn">
        <FaList />
        <span>Skill List</span>
      </NavLink>
      {isLoggedIn ? (
        <>
          <NavLink to="/profile" className="footer-nav-btn">
            <FaUserCircle />
            <span>Profile</span>
          </NavLink>
          <button onClick={handleLogout} className="footer-auth-btn footer-logout-btn">
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </>
      ) : (
        <>
          <NavLink to="/login" className="footer-auth-btn footer-login-btn">
            <FaSignInAlt />
            <span>Login</span>
          </NavLink>
          <NavLink to="/signup" className="footer-auth-btn footer-signup-btn">
            <FaUserPlus />
            <span>Sign Up</span>
          </NavLink>
        </>
      )}
    </motion.div>
  );
}

export default Footer;
