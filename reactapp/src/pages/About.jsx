import React from "react";
import { motion } from "framer-motion";
import "../styles/About.css";

// Animation variants for sections
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function About() {
  return (
    <div className="about-us-page">
      {/* Hero Section with Video Background */}
      <section className="about-hero-section">
        <video
          className="hero-video"
          src="https://jetonbucket.fra1.cdn.digitaloceanspaces.com/jeton/2024-08-08T11-24-23.845Z-jeton-company-mobile.mp4#t=0.01"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="hero-overlay" />
        <motion.div
          className="hero-content"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <motion.h1 variants={itemVariants}>
            Your knowledge.
            <br />
            Your way.
          </motion.h1>
          <motion.p variants={itemVariants}>
            Make learning accessible, easy, friendly, and fun.
          </motion.p>
          <motion.button className="hero-cta-button" variants={itemVariants}>
            Let's connect
          </motion.button>
        </motion.div>
      </section>

      {/* Mission Section */}
      <motion.section
        className="about-mission-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={sectionVariants}
      >
        <motion.div className="mission-tag" variants={itemVariants}>
          Mission
        </motion.div>
        <motion.h2 variants={itemVariants}>Learning, but better.</motion.h2>
        <motion.p variants={itemVariants}>
          Our goal is to make learning better. Whether you're opening a new
          course, sharing your skills, or receiving knowledge, we make it better
          for you.
        </motion.p>
      </motion.section>

      {/* Feature Section */}
      <motion.section
        className="about-feature-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="feature-content">
          <motion.h2 variants={itemVariants}>Share Skills Globally</motion.h2>
          <motion.p variants={itemVariants}>
            Traveling becomes hassle-free with our platform. Say goodbye to the
            inconvenience of searching for learning centers during your trips.
            Learn or teach from anywhere.
          </motion.p>
          <motion.p className="feature-subtext" variants={itemVariants}>
            Share your knowledge with a global audience at competitive rates,
            ensuring you always get the best value for your expertise.
          </motion.p>
        </div>
        <motion.div className="feature-image-container" variants={itemVariants}>
          {/* Using a relevant image for a learning platform */}
          <img
            src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Collaborative Learning"
          />
        </motion.div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="about-cta-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.8 }}
        variants={sectionVariants}
      >
        <motion.h2 variants={itemVariants}>Want to Join Our Mission?</motion.h2>
        <motion.p variants={itemVariants}>
          Collaborate, teach, or partner with us to make education accessible
          to all.
        </motion.p>
        <motion.button
          className="final-cta-button"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get in Touch
        </motion.button>
      </motion.section>
    </div>
  );
}