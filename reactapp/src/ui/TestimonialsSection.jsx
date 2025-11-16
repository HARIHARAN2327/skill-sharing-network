import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiMinus } from "react-icons/fi";
import "../ui/TestimonialsSection.css";

// Data for the accordion items
const features = [
  {
    id: 1,
    title: "Find Your Mentor",
    content: "Connect with experienced professionals and get personalized guidance. Our platform makes it easy to find experts in any field, from coding to creative arts.",
  },
  {
    id: 2,
    title: "Share Your Passion",
    content: "Become a mentor yourself. Host workshops, create tutorials, and earn recognition for your expertise. Turn your knowledge into an opportunity to inspire others.",
  },
  {
    id: 3,
    title: "Build Your Network",
    content: "Join a global community of learners and creators. Collaborate on projects, participate in discussions, and grow your professional circle in a supportive environment.",
  },
];

const AccordionItem = ({ feature, expanded, onClick }) => {
  const isOpen = feature.id === expanded;
  return (
    <div className="accordion-item">
      <motion.header
        className="accordion-header"
        onClick={() => onClick(isOpen ? false : feature.id)}
      >
        <span className="accordion-title">{feature.title}</span>
        <div className="accordion-icon">
          {isOpen ? <FiMinus /> : <FiPlus />}
        </div>
      </motion.header>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            className="accordion-content"
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <p>{feature.content}</p>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

const FeaturesSection = () => {
  const [expanded, setExpanded] = useState(1); // Default first item to be open

  return (
    <section className="features-section">
      <div className="features-grid">
        {/* Left Column: Accordion */}
        <motion.div 
            className="features-accordion"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {features.map((feature) => (
            <AccordionItem
              key={feature.id}
              feature={feature}
              expanded={expanded}
              onClick={setExpanded}
            />
          ))}
        </motion.div>

        {/* Right Column: Visual */}
        <motion.div 
            className="features-visual"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
        >
          <div className="video-wrapper">
            <video
              className="feature-video"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="https://jetonbucket.fra1.cdn.digitaloceanspaces.com/jeton/2024-10-16T16-25-50.395Z-jeton-card-mobile.mp4#t=0.01" type="video/mp4" />
            </video>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
