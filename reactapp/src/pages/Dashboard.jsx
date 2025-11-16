import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { getAllSkillShares } from "../services/api"; // API wrapper
import { Box, Container, Grid, Card, CardContent, Typography, Divider } from "@mui/material";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState("skillName");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    const loggedUser = localStorage.getItem("user");
    if (loggedUser) setUser(JSON.parse(loggedUser));
  }, []);

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const res = await getAllSkillShares();
      if (Array.isArray(res.data)) {
        setSkills(res.data);
      } else if (Array.isArray(res.data.skills)) {
        setSkills(res.data.skills);
      } else {
        setSkills([]);
      }
    } catch (err) {
      setSkills([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const categories = [
    "Technology",
    "Arts & Crafts",
    "Business",
    "Language",
    "Music",
    "Sports",
    "Cooking",
    "Other",
  ];

  const categoryCounts = categories.reduce((acc, category) => {
    acc[category] = skills.filter(skill => skill.category === category).length;
    return acc;
  }, {});

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return skills;
    return skills.filter((s) =>
      [s?.skillName, s?.category, s?.skillLevel, s?.availability, s?.userEmail]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q))
    );
  }, [skills, query]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    const key = sortKey;
    arr.sort((a, b) => {
      const A = (a?.[key] ?? a?.skillName ?? a?.category ?? a?.id ?? "").toString().toLowerCase();
      const B = (b?.[key] ?? b?.skillName ?? b?.category ?? b?.id ?? "").toString().toLowerCase();
      if (A < B) return sortOrder === "asc" ? -1 : 1;
      if (A > B) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    return arr;
  }, [filtered, sortKey, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const current = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, page]);
  const clamp = (n) => Math.min(Math.max(n, 1), totalPages);

  return (
    <Box className="dashboard-page">
      <Container maxWidth="lg" className="dashboard-container">
        {user && (
          <motion.div
            className="dashboard-welcome"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography className="dashboard-heading" variant="h4">
              Welcome, {user.username}!
            </Typography>
          </motion.div>
        )}

        {loading ? (
          <Typography className="dashboard-loading">Loading skills...</Typography>
        ) : (
          <>
            <Typography className="dashboard-subheading" variant="h5">
              Skills by Category
            </Typography>
            <Grid container spacing={3} className="dashboard-grid">
              {categories.map((category) => (
                <Grid item xs={12} md={3} key={category}>
                  <Card component={motion.div} whileHover={{ scale: 1.05 }} className="dashboard-card">
                    <CardContent>
                      <Typography className="dashboard-card-category">{category}</Typography>
                      <Typography className="dashboard-card-count">{categoryCounts[category]}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Divider className="dashboard-divider" />

            <div className="skills-header">
              <Typography className="dashboard-subheading" variant="h5">
                Skill Shares
              </Typography>
              <div className="skills-toolbar">
                <div className="search-box">
                  <input
                    type="search"
                    placeholder="Search skills, category, level, email…"
                    value={query}
                    onChange={(e) => { setQuery(e.target.value); setPage(1); }}
                  />
                </div>
                <div className="sort-controls">
                  <label htmlFor="sortKey">Sort by</label>
                  <select
                    id="sortKey"
                    value={sortKey}
                    onChange={(e) => { setSortKey(e.target.value); setPage(1); }}
                  >
                    <option value="skillName">Name</option>
                    <option value="category">Category</option>
                    <option value="skillLevel">Level</option>
                    <option value="id">ID</option>
                  </select>
                  <button
                    className="btn-order"
                    onClick={() => setSortOrder((s) => (s === "asc" ? "desc" : "asc"))}
                    aria-label="Toggle sort order"
                  >
                    {sortOrder === "asc" ? "↑" : "↓"}
                  </button>
                </div>
              </div>
            </div>

            <div className="skills-table-wrap">
              <table className="skills-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Level</th>
                    <th>Availability</th>
                    <th>User Email</th>
                  </tr>
                </thead>
                <tbody>
                  {current.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="empty">No skills found.</td>
                    </tr>
                  ) : (
                    current.map((s) => (
                      <tr key={s.id}>
                        <td>{s.id}</td>
                        <td>{s.skillName || "-"}</td>
                        <td><span className="chip">{s.category || "-"}</span></td>
                        <td>{s.skillLevel || "-"}</td>
                        <td>{s.availability || "-"}</td>
                        <td className="muted">{s.userEmail || s.user_email || "-"}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              <div className="pager bottom">
                <button disabled={page<=1} onClick={() => setPage((p) => clamp(p - 1))}>Prev</button>
                <span className="page-status">Page {page} of {totalPages}</span>
                <button disabled={page>=totalPages} onClick={() => setPage((p) => clamp(p + 1))}>Next</button>
              </div>
            </div>

            <Typography className="dashboard-footer-text" variant="subtitle1" textAlign="center">
              Total Users: {user ? 1 : 0}
            </Typography>
            <Typography className="dashboard-footer-text" variant="caption" display="block" textAlign="center">
              {new Date().getFullYear()} Hawks Platform — All rights reserved
            </Typography>
          </>
        )}
      </Container>
    </Box>
  );
}
