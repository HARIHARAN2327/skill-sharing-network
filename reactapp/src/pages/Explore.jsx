import React, { useMemo, useState } from "react";
import "../styles/Explore.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Explore() {
  const tracks = useMemo(() => [
    { id: "t1", title: "AI & Machine Learning", blurb: "Build models, deploy AI apps, and explore LLMs.", link: "/sessions?category=AI%20%26%20ML" },
    { id: "t2", title: "Product Design", blurb: "UX flows, design systems, and prototyping best practices.", link: "/sessions?category=Product%20Design" },
    { id: "t3", title: "Web Development", blurb: "Frontend, backend, and full-stack projects and reviews.", link: "/sessions?category=Technology%20%26%20Coding" },
    { id: "t4", title: "Business & Marketing", blurb: "Growth, GTM, and branding workshops from pros.", link: "/sessions?category=Business%20%26%20Marketing" },
    { id: "t5", title: "Health & Wellness", blurb: "Mindfulness, nutrition, and sustainable habits.", link: "/sessions?category=Health%20%26%20Wellness" },
    { id: "t6", title: "Photography & Media", blurb: "Capture and edit visuals that stand out.", link: "/sessions?category=Photography" },
  ], []);

  const benefits = useMemo(() => [
    { id: "b1", title: "Learn Together", text: "Live sessions and peer reviews foster real growth." },
    { id: "b2", title: "Showcase Skills", text: "Build a portfolio and get endorsements." },
    { id: "b3", title: "Global Network", text: "Meet creators and mentors across the world." },
    { id: "b4", title: "Flexible Pace", text: "Pick tracks and sessions that fit your schedule." },
  ], []);

  const categories = useMemo(() => [
    { id: 1, title: "Technology & Coding", icon: "💻", color: "#4f46e5" },
    { id: 2, title: "Arts & Creativity", icon: "🎨", color: "#e11d48" },
    { id: 3, title: "Business & Marketing", icon: "💼", color: "#059669" },
    { id: 4, title: "Health & Wellness", icon: "🧘‍♀️", color: "#f59e0b" },
    { id: 5, title: "Leadership", icon: "🧭", color: "#7c3aed" },
    { id: 6, title: "Product Design", icon: "📐", color: "#0ea5e9" },
    { id: 7, title: "Photography", icon: "📷", color: "#dc2626" },
    { id: 8, title: "Music", icon: "🎵", color: "#16a34a" },
    { id: 9, title: "Finance", icon: "📈", color: "#2563eb" },
  ], []);

  const [sortKey, setSortKey] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const pageSize = 4;

  const sorted = useMemo(() => {
    const arr = [...categories];
    arr.sort((a, b) => {
      let A = sortKey === "title" ? a.title.toLowerCase() : a.id;
      let B = sortKey === "title" ? b.title.toLowerCase() : b.id;
      if (A < B) return sortOrder === "asc" ? -1 : 1;
      if (A > B) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    return arr;
  }, [categories, sortKey, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const current = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, page]);
  const clamp = (n) => Math.min(Math.max(n, 1), totalPages);

  return (
    <div className="pexels-wrapper">
      <section className="pexels-all-in-one">

        {/* HERO */}
        <div className="pexels-hero video-hero">
          <video
            className="pexels-hero-video"
            src="https://videos.pexels.com/video-files/34127889/14471404_2560_1440_30fps.mp4"
            autoPlay loop muted playsInline
          />
          <div className="pexels-hero-overlay" />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="pexels-hero-content"
          >
            <h1 className="pexels-title">Discover, Learn & <span>Grow</span> Together 🌍</h1>
            <p className="pexels-subtitle">Join skill-driven communities and unlock opportunities in tech, art, business, and wellbeing.</p>
            <Link to="/signup" className="pexels-btn">Join the Network</Link>
          </motion.div>
        </div>

        {/* FEATURED TRACKS */}
        <motion.div
          className="pexels-featured"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="pexels-heading">Featured Learning Tracks</h2>
          <div className="pexels-track-grid">
            {tracks.map(track => (
              <motion.div key={track.id} className="pexels-track-card" whileHover={{ scale: 1.05 }}>
                <h3>{track.title}</h3>
                <p>{track.blurb}</p>
                <Link to={track.link} className="pexels-btn small">Explore</Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CATEGORIES + SORT + PAGINATION */}
        <motion.div
          className="pexels-categories"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="pexels-heading">Explore Categories</h2>

          <div className="pexels-control-bar">
            <div className="pexels-sort-group">
              <label>Sort by</label>
              <select value={sortKey} onChange={(e) => { setSortKey(e.target.value); setPage(1); }}>
                <option value="title">Title</option>
                <option value="id">Recent</option>
              </select>
              <button className="pexels-sort-order" onClick={() => setSortOrder(s => s === "asc" ? "desc" : "asc")}>
                {sortOrder === "asc" ? "↑" : "↓"}
              </button>
            </div>
            <div className="pexels-pager">
              <button disabled={page <= 1} onClick={() => setPage(p => clamp(p - 1))}>Prev</button>
              <span>{page} / {totalPages}</span>
              <button disabled={page >= totalPages} onClick={() => setPage(p => clamp(p + 1))}>Next</button>
            </div>
          </div>

          <div className="pexels-category-scroll">
            {current.map(cat => (
              <motion.div key={cat.id} whileHover={{ scale: 1.08 }}>
                <Link
                  to={`/sessions?category=${encodeURIComponent(cat.title)}`}
                  className="pexels-category-chip"
                  style={{ borderColor: cat.color, color: cat.color }}
                >
                  <span className="pexels-category-icon">{cat.icon}</span>
                  <span>{cat.title}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* BENEFITS */}
        <motion.div
          className="pexels-benefits"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="pexels-heading">Why Join Us?</h2>
          <div className="pexels-benefits-grid">
            {benefits.map(b => (
              <motion.div key={b.id} className="pexels-benefit-card" whileHover={{ scale: 1.05 }}>
                <h3>{b.title}</h3>
                <p>{b.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* COMMUNITY + CTA */}
        <motion.div
          className="pexels-community-cta"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="pexels-community-text">
            <h2>Join a Global Learning Community 🌎</h2>
            <p>Connect with creators, innovators, and learners from across the world. Attend live sessions, share insights, and build meaningful connections.</p>
            <Link to="/sessions" className="pexels-btn">Start Learning</Link>
          </div>
          <img src="https://picsum.photos/400/300?random=102" alt="Community" />
          <div className="pexels-cta">
            <h2>Ready to Begin Your Journey?</h2>
            <p>Join thousands of learners discovering their passions and growing every day.</p>
            <Link to="/signup" className="pexels-btn">Get Started</Link>
          </div>
        </motion.div>

      </section>
    </div>
  );
}

export default Explore;
