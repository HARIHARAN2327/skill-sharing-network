import React, { useState, useRef, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/Header.css";
import { useAuth } from "../context/AuthContext";

// --- SVG Icons ---
const SvgIcon = ({ children, viewBox = "0 0 512 512" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox} width="1em" height="1em" fill="currentColor">
    {children}
  </svg>
);

const SvgHome = () => (<SvgIcon><path d="M416 224L256 64 96 224V448h320zM224 416v-96h64v96z"/></SvgIcon>);
const SvgCompass = () => (<SvgIcon><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm145 358l-15-207L149 146l15 207z"/></SvgIcon>);
const SvgUsers = () => (<SvgIcon><path d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm400 32h-40c-13.4-38.3-43-69.5-80-87.9V128h-32v40h-80V128h-32v40h-80V128h-32v40.1C188 174.5 167.3 194 144 224H8c-4.4 0-8 3.6-8 8v32c0 4.4 3.6 8 8 8h191.9c15 0 27.6 11.2 29.5 26.3 3.3 26 26.6 45.7 54.1 45.7s50.8-19.8 54.1-45.7c1.9-15.1 14.5-26.3 29.5-26.3H504c4.4 0 8-3.6 8-8v-32c0-4.4-3.6-8-8-8z"/></SvgIcon>);
const SvgBriefcase = () => (<SvgIcon><path d="M304 96h112v32H304zM512 96v256H0V96h192V64c0-17.7 14.3-32 32-32h64c17.7 0 32 14.3 32 32v32h192zm-32 160H32v-96h448v96z"/></SvgIcon>);
const SvgShoppingCart = () => (<SvgIcon><path d="M528 176H238.6L169.1 77.5c-3.1-4.7-8.3-7.5-13.6-7.5H48c-8.8 0-16 7.2-16 16v16c0 8.8 7.2 16 16 16h80l48 184-36.8 47.9c-2.8 3.6-4.5 7.8-4.5 12.1v20c0 13.3 10.7 24 24 24h296c8.8 0 16-7.2 16-16v-16c0-8.8-7.2-16-16-16H208.4c-3.2 0-6.2-1.7-7.8-4.6l-20.3-32.9H448c8.8 0 16-7.2 16-16V192c0-8.8-7.2-16-16-16z"/></SvgIcon>);
const SvgInfoCircle = () => (<SvgIcon><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 432c-15.4 0-28-12.6-28-28s12.6-28 28-28 28 12.6 28 28-12.6 28-28 28zm28-184h-56v-96h56v96z"/></SvgIcon>);
const SvgGraduationCap = () => (<SvgIcon><path d="M490.3 40.7L256 208 61.7 40.7c-4.5-3.3-10.7-4.4-16.7-3.3S32 45.4 32 52.3V448c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V52.3c0-6.9-3.9-13.3-10.3-16.5-6-1.1-12.2 0-16.7 3.3zM256 424L112 336V128l144 96 144-96v208z"/></SvgIcon>);
const SvgSignInAlt = () => (<SvgIcon><path d="M416 448h-80V384h-32v64H96V64h208v64h-32V96H128v320h224V384h32v64zm96-192l-96 96v-64h-160v-64h160v-64l96 96z"/></SvgIcon>);
const SvgUserCircle = () => (<SvgIcon><path d="M256 256c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm0 64c-62.1 0-112 50.9-112 112v16h224v-16c0-61.1-49.9-112-112-112z"/></SvgIcon>);
const SvgCog = () => (<SvgIcon><path d="M388.9 256c0 17.7-14.3 32-32 32s-32-14.3-32-32 14.3-32 32-32 32 14.3 32 32zm102.3 84.8c-12.8-51.4-56-88.8-107.5-88.8-19.4 0-38.1 5.8-54 16.5-1.9 1.3-4.1 2.5-6.5 3.5-3.6 1.6-7.5 2.6-11.6 3.4-3.5.7-7.2 1.3-11.1 1.6-3.8.3-7.8.6-12 .6-4.2 0-8.2-.3-12-.6-3.9-.3-7.6-.9-11.1-1.6-4.1-.8-8-1.8-11.6-3.4-2.4-1-4.6-2.2-6.5-3.5-15.9-10.7-34.6-16.5-54-16.5-51.5 0-94.7 37.4-107.5 88.8-1.9 7.6-3.1 15.6-3.1 24.1 0 54.1 43.9 98 98 98 8.5 0 16.5-1.2 24.1-3.1 51.4-12.8 88.8-56 88.8-107.5 0-8.5-1.2-16.5-3.1-24.1zm-215.1-49.8c3.2-10.7 10.5-20.2 20.6-27.4 17.2-12.1 40-12.1 57.2 0 10.1 7.2 17.4 16.7 20.6 27.4 3.3 11.2 5.1 23.3 5.1 36.1 0 44.5-36.5 81-81 81s-81-36.5-81-81c0-12.8 1.8-24.9 5.1-36.1z"/></SvgIcon>);
const SvgSignOutAlt = () => (<SvgIcon><path d="M416 448h-80V384h-32v64H96V64h208v64h-32V96H128v320h224V384h32v64zm96-192l-96 96v-64h-160v-64h160v-64l96 96z"/></SvgIcon>);
const SvgTachometerAlt = () => (<SvgIcon><path d="M504 256C504 119 393 8 256 8S8 119 8 256s111 248 248 248 248-111 248-248zm-192-32H168c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h144c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8zm-64 128H200v-88l56-56 56 56v88H256zm128-128c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h24c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8h-24zm-224 0c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8h-24c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h24z"/></SvgIcon>);
const SvgMenuSharp = () => (<SvgIcon viewBox="0 0 512 512"><path d="M32 96v32h448V96zm0 160v32h448v-32zm0 160v32h448v-32z"/></SvgIcon>);

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const { isAuthenticated, logout, user } = useAuth();
  const role = user?.role || user?.authorities?.[0]?.authority || user?.roles?.[0];
  const isAdmin = String(role || "").toUpperCase() === "ADMIN" || String(role || "").toUpperCase() === "ROLE_ADMIN";

  const mainNavItems = [
    { to: "/", label: "Home", icon: SvgHome },
    { to: "/explore", label: "Explore", icon: SvgCompass },
    { to: "/directory", label: "Directory", icon: SvgUsers },
    { to: "/jobs", label: "Jobs", icon: SvgBriefcase },
    { to: "/market", label: "Market", icon: SvgShoppingCart },
    { to: "/about", label: "About", icon: SvgInfoCircle },
  ];

  const dropdownItems = [
    { to: "/dashboard", label: "Dashboard", icon: SvgTachometerAlt },
    { to: "/profile", label: "Profile", icon: SvgUserCircle },
    { to: "/settings", label: "Settings", icon: SvgCog },
  ];

  useEffect(() => {
    const handleDocClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handleDocClick);
    return () => document.removeEventListener("mousedown", handleDocClick);
  }, []);

  return (
    <motion.header
      className="custom-header"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="header-container">
        {/* Brand */}
        <Link to="/" className="brand">
          <h1 className="brand-title">Community Skill Sharing Network</h1>
          <p className="brand-tagline">Share • Learn • Connect • Grow together</p>
        </Link>

        {/* Center Nav */}
        <nav className="header-nav d-none d-md-flex">
          {mainNavItems.map((item) => isAuthenticated || item.to === "/" ? (
            <NavLink key={item.to} className="nav-link" to={item.to}>
              <item.icon /> <span>{item.label}</span>
            </NavLink>
          ) : null)}
        </nav>

        {/* Right Actions */}
        <div className="header-right-actions" ref={menuRef}>
          {!isAuthenticated && (
            <Link to="/login" className="header-btn btn-login">
              <SvgSignInAlt /> <span>Login</span>
            </Link>
          )}

          {isAuthenticated && (
            <Link to="/sessions" className="header-btn btn-sessions">
              <SvgGraduationCap /> <span>Join a Session</span>
            </Link>
          )}

          {isAuthenticated && isAdmin && (
            <Link to="/admin" className="header-btn btn-sessions">
              <SvgTachometerAlt /> <span>Admin</span>
            </Link>
          )}

          <button
            className="header-btn menu-btn"
            aria-haspopup="true"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((s) => !s)}
          >
            <SvgMenuSharp />
          </button>

          {menuOpen && (
            <motion.ul
              className="dropdown-menu-custom"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {isAuthenticated ? (
                <>
                  {dropdownItems.map((item) => (
                    <li key={item.to}>
                      <Link className="dropdown-item-custom" to={item.to} onClick={() => setMenuOpen(false)}>
                        <item.icon /> {item.label}
                      </Link>
                    </li>
                  ))}
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item-custom text-danger" onClick={logout}>
                      <SvgSignOutAlt /> Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li><Link className="dropdown-item-custom" to="/login"><SvgSignInAlt /> Login</Link></li>
                  <li><Link className="dropdown-item-custom" to="/signup"><SvgUserCircle /> Sign Up</Link></li>
                </>
              )}
            </motion.ul>
          )}
        </div>
      </div>
    </motion.header>
  );
}

export default Header;
