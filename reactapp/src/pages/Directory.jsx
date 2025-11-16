import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { getAllSkillShares } from "../services/api"; // your API wrapper
import "../styles/Directory.css";

function Directory() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState("skillName"); // skillName | category | skillLevel
  const [page, setPage] = useState(1);
  const pageSize = 3;
  const [activeCategory, setActiveCategory] = useState("");
  const [activeLevel, setActiveLevel] = useState("");

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await getAllSkillShares();
        console.log("Fetched skills:", res.data);
        if (Array.isArray(res.data)) {
          setMembers(res.data);
        } else if (Array.isArray(res.data.skills)) {
          setMembers(res.data.skills);
        } else {
          setMembers([]);
        }
      } catch (err) {
        console.error("Error fetching skills", err);
        setMembers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  // Derive facet values
  const categories = useMemo(() => {
    const set = new Set(members.map(m => m.category).filter(Boolean));
    return Array.from(set);
  }, [members]);
  const levels = useMemo(() => {
    const set = new Set(members.map(m => m.skillLevel).filter(Boolean));
    return Array.from(set);
  }, [members]);

  // Filter + sort + paginate
  const filteredMembers = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return members.filter((m) => {
      const matchQ = !q || [m.skillName, m.name, m.category, m.skillLevel, m.userEmail]
        .filter(Boolean).some(v => String(v).toLowerCase().includes(q));
      const matchCat = !activeCategory || m.category === activeCategory;
      const matchLvl = !activeLevel || m.skillLevel === activeLevel;
      return matchQ && matchCat && matchLvl;
    });
  }, [members, searchQuery, activeCategory, activeLevel]);

  const sortedMembers = useMemo(() => {
    const arr = [...filteredMembers];
    arr.sort((a,b) => {
      const A = (a?.[sortKey] ?? a?.skillName ?? "").toString().toLowerCase();
      const B = (b?.[sortKey] ?? b?.skillName ?? "").toString().toLowerCase();
      if (A < B) return -1; if (A > B) return 1; return 0;
    });
    return arr;
  }, [filteredMembers, sortKey]);

  const totalPages = Math.max(1, Math.ceil(sortedMembers.length / pageSize));
  const current = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sortedMembers.slice(start, start + pageSize);
  }, [sortedMembers, page]);
  const clamp = (n) => Math.min(Math.max(n, 1), totalPages);

  if (loading) return <p className="directory-loading">Loading directory…</p>;
  if (!members.length) return <p className="directory-loading">No skills available.</p>;

  return (
    <div className="directory-wrapper">
      <motion.div
        className="directory-header"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>Community Directory 🌐</h1>
        <p>Discover experts, creators, and learners. Filter by category and level.</p>
        <div className="dir-stats">
          <span>Total: {filteredMembers.length}</span>
          <span>Categories: {categories.length}</span>
        </div>

        {/* Controls: search + sort + pills */}
        <div className="dir-controls">
          <input
            type="text"
            placeholder="Search skills, category, level, email…"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
            className="directory-search"
          />
          <div className="dir-sort-pill">
            <label htmlFor="dir-sort">Sort by</label>
            <select id="dir-sort" value={sortKey} onChange={(e) => { setSortKey(e.target.value); setPage(1); }}>
              <option value="skillName">Name</option>
              <option value="category">Category</option>
              <option value="skillLevel">Level</option>
            </select>
          </div>
        </div>

        {/* Filter chips */}
        <div className="dir-filters">
          <div className="chip-row">
            <button className={`chip ${!activeCategory ? 'active' : ''}`} onClick={() => { setActiveCategory(""); setPage(1); }}>All Categories</button>
            {categories.map((c) => (
              <button key={c} className={`chip ${activeCategory===c?'active':''}`} onClick={() => { setActiveCategory(c); setPage(1); }}>{c}</button>
            ))}
          </div>
          <div className="chip-row">
            <button className={`chip ${!activeLevel ? 'active' : ''}`} onClick={() => { setActiveLevel(""); setPage(1); }}>All Levels</button>
            {levels.map((l) => (
              <button key={l} className={`chip ${activeLevel===l?'active':''}`} onClick={() => { setActiveLevel(l); setPage(1); }}>{l}</button>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        className="directory-grid"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
        }}
      >
        {current.length ? (
          current.map((member, index) => (
            <motion.div
              key={index}
              className="directory-card"
              whileHover={{ scale: 1.05, y: -5 }}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            >
              <div className="avatar-wrapper">
                <img
                  src={member.avatar || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                  alt={member.skillName || member.name || "User"}
                />
              </div>
              <h3>{member.skillName || member.name}</h3>
              <div className="badges">
                <span className="badge cat">{member.category || "Other"}</span>
                <span className={`badge lvl ${String(member.skillLevel||'').toLowerCase()}`}>{member.skillLevel || "Beginner"}</span>
              </div>
              <p className="location">{member.userEmail || "Not provided"}</p>
              {member.availability && <p className="availability">{member.availability}</p>}
              <div className="card-actions">
                {member.userEmail && <a className="btn-contact" href={`mailto:${member.userEmail}`}>Contact</a>}
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center mt-5">No skills match your search.</p>
        )}
      </motion.div>

      {/* Pager */}
      <div className="dir-pager">
        <button disabled={page<=1} onClick={() => setPage(p=>clamp(p-1))}>Prev</button>
        <span>{page} / {totalPages}</span>
        <button disabled={page>=totalPages} onClick={() => setPage(p=>clamp(p+1))}>Next</button>
      </div>
    </div>
  );
}

export default Directory;
