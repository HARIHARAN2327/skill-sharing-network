import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  FaCode, FaPaintBrush, FaMusic, FaCamera, FaUtensils, FaChartLine, 
  FaReact, FaPython, FaUsers, FaLightbulb, FaShareAlt, FaHandshake 
} from "react-icons/fa";
import "../ui/SkillsBanner.css";

// --- SKILL DATA ---
// Main skills for the falling animation at the bottom
const fallingSkills = [
  { icon: <FaCode />, color: "#4d94ff" }, { icon: <FaPaintBrush />, color: "#ff6666" },
  { icon: <FaMusic />, color: "#cc99ff" }, { icon: <FaCamera />, color: "#ffb366" },
  { icon: <FaUtensils />, color: "#66cc66" }, { icon: <FaChartLine />, color: "#ffcc66" },
  { icon: <FaReact />, color: "#61DAFB" }, { icon: <FaPython />, color: "#306998" },
];
const displayedSkills = [...fallingSkills, ...fallingSkills, ...fallingSkills, ...fallingSkills.slice(0, 2)];

// Data for the three central pillars and their orbiting skills
const pillars = [
  { 
    name: "Learn", 
    icon: <FaLightbulb />, 
    color: "#ffcc66",
    orbiting: [ { icon: <FaReact /> }, { icon: <FaPython /> } ] 
  },
  { 
    name: "Share", 
    icon: <FaShareAlt />, 
    color: "#ff6666",
    orbiting: [ { icon: <FaPaintBrush /> }, { icon: <FaMusic /> } ] 
  },
  { 
    name: "Connect", 
    icon: <FaHandshake />, 
    color: "#4d94ff",
    orbiting: [ { icon: <FaUsers /> }, { icon: <FaChartLine /> } ] 
  },
];

// --- MAIN COMPONENT ---
const SkillsBanner = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section className="skills-section" ref={sectionRef}>
      {/* --- HEADER --- */}
      <div className="skills-head">
        <motion.h1
          className="skills-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -20 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          A Universe of Skills Awaits
        </motion.h1>
        <motion.p
          className="skills-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Discover new passions, connect with experts, and grow together in our global community.
        </motion.p>
      </div>

      {/* --- SKILL ECOSYSTEM (NEW) --- */}
      <motion.div
        className="skill-ecosystem"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
      >
        {pillars.map((pillar, pIndex) => (
          <motion.div 
            key={pillar.name} 
            className="pillar-container"
            variants={{ hidden: { opacity: 0, scale: 0.5 }, visible: { opacity: 1, scale: 1 } }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <motion.div className="central-node" style={{ background: pillar.color, color: '#1a1a40' }} whileHover={{ scale: 1.1, rotate: 5 }}>
              {pillar.icon}
              <span>{pillar.name}</span>
            </motion.div>
            <div className="orbit-container">
              {pillar.orbiting.map((skill, sIndex) => (
                <motion.div
                  key={sIndex}
                  className="orbiting-skill"
                  style={{ borderColor: pillar.color }}
                  animate={{ rotate: 360 }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 8 + sIndex * 2, // Different speeds
                    ease: "linear" 
                  }}
                >
                  <div className="orbiting-skill-icon" style={{color: pillar.color}}>
                    {skill.icon}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* --- FALLING SKILLS FLOOR --- */}
      <div className="skills-floor">
        {displayedSkills.map((skill, index) => (
          <motion.div
            key={index}
            className="skill-icon-wrapper"
            style={{ backgroundColor: skill.color }}
            initial={{ y: "-100vh", opacity: 0 }}
            animate={{ y: isInView ? 0 : "-100vh", opacity: isInView ? 1 : 0 }}
            transition={{ type: "spring", stiffness: 40, damping: 10, delay: 1 + index * 0.05 }}
          >
            {skill.icon}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SkillsBanner;

