import React from "react";
import { motion } from "framer-motion";
import { FaGooglePlay, FaApple } from "react-icons/fa";
import "../styles/HeroSection.css";

const HeroSection = () => {
  const videoUrl = "https://jetonbucket.fra1.cdn.digitaloceanspaces.com/jeton/2024-08-07T15-59-55.780Z-jeton-3dapp-mobile.mp4#t=0.01";

  return (
    <section className="hero-section">
      {/* Video Background */}
      <video className="hero-video-bg" src={videoUrl} autoPlay loop muted playsInline />

      {/* Optional overlay */}
      <div className="hero-overlay"></div>

      {/* Main content */}
      <div className="hero-content">
        {/* LEFT: Text Content */}
        <motion.div
          className="hero-text-area"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="hero-title">Share your Skills, in one PLatform.</h1>
          <p className="hero-subtitle">Join today.</p>
          <motion.a
            href="/signup"
            className="get-started-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.a>
          <div className="app-buttons">
            <button className="app-store-btn">
              <FaApple />
              <div>
                <span>Download on the</span>
                <strong>App Store</strong>
              </div>
            </button>
            <button className="google-play-btn">
              <FaGooglePlay />
              <div>
                <span>GET IT ON</span>
                <strong>Google Play</strong>
              </div>
            </button>
          </div>
        </motion.div>

        {/* RIGHT: Phone Mockup */}
        <motion.div
          className="hero-phone-area"
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        >
          <div className="phone-mockup">
            <div className="phone-screen">
              <div className="phone-header">
                <span>20:22</span>
                <div className="dynamic-island"></div>
              </div>
              <div className="phone-content">
                <h2>Build Together</h2>
                <p>Anyone can be Mentor,Anyone can be Leaner</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
