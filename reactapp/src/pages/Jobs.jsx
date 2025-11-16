import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Jobs() {
  const navigate = useNavigate();

  const styles = {
    global: `
    :root {
      --primary-color: #ff4820; /* Vibrant Orange/Red accent */
      --secondary-color: #ff8a71;
      --background-light: #121212; /* Dark/Black inspired by Revolut */
      --background-dark: #1e1e1e; /* Slightly lighter dark gray for sections */
      --card-bg: #2d2d2d; /* Dark card background */
      --text-light: #ffffff; /* Main text color */
      --text-dark: #ffffff;
      --text-muted: #b0b0b0; /* Light gray for muted text */
      --gradient-background: linear-gradient(
        90deg,
        rgba(255, 108, 80, 1) 0%,
        rgba(255, 72, 32, 1) 100%
      );
    }
    .jobs-page {
      font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        Helvetica, Arial, sans-serif;
      color: var(--text-light); /* Changed to light text for dark background */
      background-color: var(--background-light); /* Changed to dark background */
      overflow-x: hidden;
      min-height: 100vh;
    }
  `,

  // --- Hero Section (Sleek Dark Video Background) ---
  hero: `
    .jobs-hero-section {
      position: relative;
      height: 90vh; 
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      color: var(--text-light);
      overflow: hidden;
    }
    .hero-video {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transform: translate(-50%, -50%);
      z-index: 1;
    }
    .hero-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      /* Darker overlay to ensure text contrast */
      background: linear-gradient(0deg, var(--background-light) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0.6) 100%);
      z-index: 2;
    }
    .hero-content {
      position: relative;
      z-index: 3;
      max-width: 1000px;
      padding: 0 2rem;
    }
    .hero-content h1 {
      font-size: 5.5rem; /* Larger, bolder text */
      font-weight: 800;
      line-height: 1.05;
      margin-bottom: 1.5rem;
      letter-spacing: -1px;
    }
    .hero-content p {
      font-size: 1.5rem;
      margin-bottom: 3rem;
      opacity: 0.8;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }
    .hero-cta-button {
      background: var(--gradient-background);
      color: var(--text-light);
      border: none;
      padding: 1.2rem 3.5rem;
      font-size: 1.2rem;
      font-weight: 700;
      border-radius: 50px;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 8px 30px rgba(255, 72, 32, 0.7);
    }
    .hero-cta-button:hover {
      transform: scale(1.05);
      box-shadow: 0 10px 40px rgba(255, 72, 32, 0.9);
    }
  `,

  // --- Featured Roles Section (Dark Card Grid) ---
  featuredRoles: `
    .featured-roles-section {
      padding: 8rem 2rem;
      text-align: center;
      background-color: var(--background-dark); /* Dark section background */
    }
    .featured-roles-section h2 {
      font-size: 3.5rem;
      font-weight: 800;
      color: var(--text-light);
      margin-bottom: 3.5rem;
    }
    .roles-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 2rem;
      max-width: 1300px;
      margin: 0 auto;
    }
    .role-card {
      background-color: var(--card-bg); /* Dark card background */
      padding: 2.5rem;
      border-radius: 16px;
      text-align: left;
      transition: all 0.3s ease;
      box-shadow: 0 4px 25px rgba(0, 0, 0, 0.6); /* Prominent shadow */
      border-left: 5px solid var(--primary-color); /* Side accent color */
      cursor: pointer;
    }
    .role-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.8);
    }
    .role-card h3 {
      font-size: 1.6rem;
      font-weight: 700;
      margin-bottom: 0.75rem;
      color: var(--primary-color); /* Title in accent color */
    }
    .role-card p {
      color: var(--text-muted);
      margin-bottom: 1.5rem;
      font-size: 1rem;
      line-height: 1.5;
    }
    .role-card-link {
        color: var(--text-light);
        font-weight: 600;
        text-decoration: none;
        display: inline-block;
        transition: color 0.3s;
        border-bottom: 2px solid var(--secondary-color);
        padding-bottom: 2px;
    }
    .role-card-link:hover {
        color: var(--primary-color);
        border-bottom-color: var(--primary-color);
    }
  `,

  // --- Core Benefits Section (Clean Dark Grid) ---
  benefits: `
    .core-benefits-section {
      padding: 6rem 4rem;
      text-align: center;
      background-color: var(--background-light);
    }
    .core-benefits-section h2 {
        font-size: 3.5rem;
        font-weight: 800;
        color: var(--text-light);
        margin-bottom: 4rem;
    }
    .benefits-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 3rem;
        max-width: 1200px;
        margin: 0 auto;
    }
    .benefit-item {
        padding: 1.5rem;
        border-radius: 12px;
        text-align: center;
        background-color: var(--card-bg); /* Dark card for benefits */
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
    }
    .benefit-icon {
        color: var(--secondary-color);
        font-size: 3.5rem;
        margin-bottom: 1rem;
    }
    .benefit-item h3 {
        font-size: 1.4rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
        color: var(--text-light);
    }
    .benefit-item p {
        color: var(--text-muted);
        font-size: 0.95rem;
    }
  `,

  // --- CTA Section ---
  cta: `
    .jobs-cta-section {
      text-align: center;
      padding: 8rem 2rem;
      background-color: var(--background-dark); /* Using dark background for section */
      color: var(--text-light);
    }
    .jobs-cta-section h2 {
      font-size: 3.5rem;
      font-weight: 800;
      margin-bottom: 1rem;
    }
    .jobs-cta-section p {
      font-size: 1.4rem;
      color: var(--text-muted);
      opacity: 0.9;
      margin-bottom: 2.5rem;
      max-width: 700px;
      margin-left: auto;
      margin-right: auto;
    }
    .final-cta-button {
      background: var(--gradient-background);
      color: var(--text-light);
      border: none;
      padding: 1.2rem 3.5rem;
      font-size: 1.2rem;
      font-weight: 700;
      border-radius: 50px;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 8px 30px rgba(255, 72, 32, 0.7);
    }
    .final-cta-button:hover {
      transform: scale(1.05);
      box-shadow: 0 10px 40px rgba(255, 72, 32, 0.9);
    }
  `,

  // --- Responsive Design ---
  responsive: `
    @media (max-width: 992px) {
      .hero-content h1 {
        font-size: 3.5rem;
      }
      .jobs-hero-section {
        height: 70vh;
      }
      .core-benefits-section, .featured-roles-section, .jobs-cta-section {
        padding: 4rem 1rem;
      }
      .jobs-cta-section h2, .featured-roles-section h2, .core-benefits-section h2 {
        font-size: 2.8rem;
      }
    }
    @media (max-width: 768px) {
      .hero-content h1 {
        font-size: 2.8rem;
      }
      .hero-content p {
        font-size: 1.1rem;
      }
    }
  `,
};

  const combinedStyles = Object.values(styles).join("\n");

  // Animation Variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, staggerChildren: 0.2 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Roles + Benefits
  const featuredRoles = [
    { title: "Lead Backend Engineer", location: "Remote", description: "Architect and scale our core systems.", link: "https://in.indeed.com/?from=gnav-jobsearch--indeedmobile" },
    { title: "Senior Product Designer", location: "Remote", description: "Design user experiences that inspire.", link: "https://in.indeed.com/?from=gnav-jobsearch--indeedmobile" },
    { title: "Technical Writer", location: "Remote", description: "Write great documentation & tutorials.", link: "https://in.indeed.com/?from=gnav-jobsearch--indeedmobile" },
    { title: "Data Scientist", location: "Remote", description: "Analyze and optimize user experience.", link: "https://in.indeed.com/?from=gnav-jobsearch--indeedmobile" },
    { title: "Sales & Partnerships Lead", location: "Remote", description: "Drive global partnerships.", link: "https://in.indeed.com/?from=gnav-jobsearch--indeedmobile" },
    { title: "Machine Learning", location: "Remote", description: "Machine Learning Engineer.", link: "https://in.indeed.com/?from=gnav-jobsearch--indeedmobile" },
  ];

  const coreBenefits = [
    {title: "Remote-First Culture", description: "Work from anywhere, anytime." },
    {title: "Stock Options", description: "Earn equity and bonuses." },
    {title: "Fast Growth", description: "Career acceleration opportunities." },
    {title: "Wellness", description: "Health benefits and time off." },
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: combinedStyles }} />

      <div className="jobs-page">
        {/* HERO SECTION */}
        <section className="jobs-hero-section">
          <video
            className="hero-video"
            src="https://assets.revolut.com/published-assets-v3/272aa653-d358-408e-9b21-4b696e68a83e/8bb8f9df-8385-4538-856d-f44495ee0309.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="hero-overlay" />
          <motion.div className="hero-content" initial="hidden" animate="visible" variants={sectionVariants}>
            <motion.h1 variants={itemVariants}>Pioneering the Future of Learning.</motion.h1>
            <motion.p variants={itemVariants}>
              Join a team building revolutionary tools for global skill exchange.
            </motion.p>
            <motion.button
              className="hero-cta-button"
              variants={itemVariants}
              onClick={() => navigate("/login")}
            >
              Join
            </motion.button>
          </motion.div>
        </section>

        {/* FEATURED ROLES */}
        <motion.section
          className="featured-roles-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <motion.h2 variants={itemVariants}>Featured Opportunities</motion.h2>
          <motion.div className="roles-grid" variants={sectionVariants}>
            {featuredRoles.map((role, i) => (
              <motion.div
                key={i}
                className="role-card"
                variants={itemVariants}
                onClick={() => window.open(role.link, "_blank")}
              >
                <h3>{role.title}</h3>
                <p>Location: {role.location}</p>
                <p>{role.description}</p>
                <p style={{ color: "#ff8a71", fontWeight: "600", marginTop: "1rem" }}>
                  Learn More & Apply →
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* BENEFITS */}
        <motion.section
          className="core-benefits-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <motion.h2 variants={itemVariants}>The Rewards of Impact</motion.h2>
          <motion.div className="benefits-grid" variants={sectionVariants}>
            {coreBenefits.map((b, i) => (
              <motion.div key={i} className="benefit-item" variants={itemVariants}>
                <div className="benefit-icon">{b.icon}</div>
                <h3>{b.title}</h3>
                <p>{b.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* CTA */}
        <motion.section
          className="jobs-cta-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          <motion.h2 variants={itemVariants}>Shape the Next Chapter.</motion.h2>
          <motion.p variants={itemVariants}>
            Ready to innovate in a flexible, global environment? Start your journey now.
          </motion.p>
          <motion.button
            className="final-cta-button"
            variants={itemVariants}
            onClick={() => navigate("/signup")}
          >
            Create Your Profile
          </motion.button>
        </motion.section>
      </div>
    </>
  );
}
