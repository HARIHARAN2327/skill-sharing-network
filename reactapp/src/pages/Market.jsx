import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // 1. Import useNavigate
import "../styles/Market.css";

// Animation Variants
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const cardHover = {
  hover: { y: -10, boxShadow: "0px 20px 30px rgba(0, 0, 0, 0.1)" },
};

export default function Market() {
  const navigate = useNavigate(); // 2. Initialize the hook

  const features = [
    {
      title: "Competitive Rates",
      description:
        "Get the best value with our real-time, competitive exchange rates.",
    },
    {
      title: "Secure Transactions",
      description:
        "Your funds are protected with industry-leading security protocols.",
    },
    {
      title: "Global Access",
      description:
        "Exchange over 50+ currencies from anywhere in the world, anytime.",
    },
    {
      title: "Skill Sharing",
      description:
        "Share your skills,Build Together",
    },
  ];

  return (
    <div className="market-page">
      {/* Hero Section */}
      <motion.section
        className="market-hero-section"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <div className="hero-content-market">
          <motion.h1 variants={itemVariants}>
            The Global Market,
            <br />
            Simplified.
          </motion.h1>
          <motion.p variants={itemVariants}>
            Fast, secure, and seamless multi-currency exchange at your
            fingertips.
          </motion.p>
          <motion.button
            className="cta-button primary"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/dashboard")} // 3. Add onClick handler
          >
            Start Exchanging
          </motion.button>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="market-features-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="section-header">
          <motion.h2 variants={itemVariants}>Why Exchange With Us?</motion.h2>
          <motion.p variants={itemVariants}>
            We build our platform around the features that matter most to you.
          </motion.p>
        </div>
        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              variants={{ ...itemVariants, ...cardHover }}
              whileHover="hover"
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section
        className="how-it-works-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={sectionVariants}
      >
        <div className="section-header">
          <motion.h2 variants={itemVariants}>
            Get Started in 3 Easy Steps
          </motion.h2>
        </div>
        <div className="steps-container">
          <motion.div className="step-item" variants={itemVariants}>
            <div className="step-number">1</div>
            <h4>Create Account</h4>
            <p>Sign up in minutes with a secure and simple process.</p>
          </motion.div>
          <motion.div
            className="step-connector"
            variants={itemVariants}
          ></motion.div>
          <motion.div className="step-item" variants={itemVariants}>
            <div className="step-number">2</div>
            <h4>Deposit Funds</h4>
            <p>
              Add money to your wallet using one of our many payment methods.
            </p>
          </motion.div>
          <motion.div
            className="step-connector"
            variants={itemVariants}
          ></motion.div>
          <motion.div className="step-item" variants={itemVariants}>
            <div className="step-number">3</div>
            <h4>Exchange</h4>
            <p>Instantly convert your money to the currency you need.</p>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="market-cta-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.8 }}
        variants={sectionVariants}
      >
        <motion.h2 variants={itemVariants}>
          Ready to Join the Future of Finance?
        </motion.h2>
        <motion.p variants={itemVariants}>
          Open an account today and experience a better way to manage your
          money.
        </motion.p>
        <motion.button
          className="cta-button secondary"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/signup")} // 3. Add onClick handler
        >
          Create Free Account
        </motion.button>
      </motion.section>
    </div>
  );
}