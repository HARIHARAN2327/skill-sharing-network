import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getAllSkillShares, deleteSkillShare, getSkillSharesByCategory, getSkillSharesSortedByLevel, updateSkillShare } from "../services/api";
import "../styles/SkillList.css"; // Import the corresponding CSS

// SVG Icons for UI Actions
const EditIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
const DeleteIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>;
const SaveIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>;
const CancelIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;


function SkillShareList({ refreshEvent }) {
  const [skillShares, setSkillShares] = useState([]);
  const [category, setCategory] = useState("");
  const [editingSkill, setEditingSkill] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [user] = useState(() => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  });
  const isAdmin = !!(user && ((typeof user.role === 'string' && user.role.toLowerCase() === 'admin') || user.isAdmin === true));

  const fetchSkills = useCallback(async () => {
    try {
      const response = await getAllSkillShares();
      setSkillShares(response.data);
    } catch (error) {
      console.error("Error fetching skills", error);
    }
  }, []);

  useEffect(() => {
    fetchSkills();
    
    // Listen for the custom event from the add form to refresh the list
    const handleSkillAdded = () => fetchSkills();
    window.addEventListener(refreshEvent, handleSkillAdded);
    
    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener(refreshEvent, handleSkillAdded);
    };

  }, [refreshEvent, fetchSkills]);

  const handleDelete = async (id) => {
    if (!isAdmin) { alert("Only admins can delete."); return; }
    if (window.confirm("Are you sure you want to delete this skill?")) {
      try {
        await deleteSkillShare(id);
        setSkillShares(prevSkills => prevSkills.filter(s => s.id !== id));
      } catch (error) {
        console.error("Error deleting skill", error);
      }
    }
  };

  const handleFilter = async () => {
    if (category.trim()) {
      const res = await getSkillSharesByCategory(category);
      setSkillShares(res.data);
    } else {
      fetchSkills();
    }
  };

  const handleSort = async () => {
    const res = await getSkillSharesSortedByLevel();
    setSkillShares(res.data);
  };

  const handleEditClick = (skill) => {
    if (!isAdmin) { alert("Only admins can edit."); return; }
    setEditingSkill(skill.id);
    setEditForm(skill);
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (id) => {
    if (!isAdmin) { alert("Only admins can update."); return; }
    try {
      await updateSkillShare(id, editForm);
      setEditingSkill(null);
      fetchSkills(); // Refetch to show updated data
    } catch (error) {
      console.error("Error updating skill", error);
    }
  };
  
  const handleCancelEdit = () => setEditingSkill(null);

  return (
    <div className="skill-list-page">
      <div className="video-background">
        <video autoPlay loop muted playsInline>
          <source src="https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-working-at-a-computer-4627-large.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay"></div>
      </div>

      <div className="filter-controls">
        <input
          type="text"
          placeholder="Filter by category (e.g., Technology)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleFilter()}
        />
        <button onClick={handleFilter}>Filter</button>
        <button onClick={handleSort}>Sort by Level</button>
        <button onClick={fetchSkills} className="reset-btn">Reset</button>
      </div>

      <div className="skill-card-grid">
        <AnimatePresence>
          {skillShares.length > 0 ? (
            skillShares.map((skill) => (
              <motion.div
                key={skill.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="skill-card"
              >
                {isAdmin && editingSkill === skill.id ? (
                  /* --- EDITING VIEW --- */
                  <div className="skill-card-editing">
                    <input name="skillName" value={editForm.skillName} onChange={handleEditChange} className="edit-input-title" />
                    <div className="edit-grid">
                      <input name="category" value={editForm.category} onChange={handleEditChange} placeholder="Category" />
                      <input name="skillLevel" value={editForm.skillLevel} onChange={handleEditChange} placeholder="Skill Level" />
                      <input name="availability" value={editForm.availability} onChange={handleEditChange} placeholder="Availability" />
                    </div>
                    <textarea name="description" value={editForm.description} onChange={handleEditChange} placeholder="Description" rows="3" />
                    <div className="card-actions">
                      <button onClick={() => handleUpdate(skill.id)} className="action-btn save"><SaveIcon /> Save</button>
                      <button onClick={handleCancelEdit} className="action-btn cancel"><CancelIcon /> Cancel</button>
                    </div>
                  </div>
                ) : (
                  /* --- DEFAULT VIEW --- */
                  <>
                    <div className="card-header">
                      <h3>{skill.skillName}</h3>
                      <span className={`tag ${skill.skillLevel?.toLowerCase()}`}>{skill.skillLevel}</span>
                    </div>
                    <p className="card-category">{skill.category}</p>
                    <p className="card-description">{skill.description}</p>
                    <div className="card-footer">
                      <span className="availability">{skill.availability}</span>
                      <span className="user-email">{skill.userEmail}</span>
                    </div>
                    {isAdmin && (
                      <div className="card-actions">
                        <button onClick={() => handleEditClick(skill)} className="action-btn edit"><EditIcon /> Edit</button>
                        <button onClick={() => handleDelete(skill.id)} className="action-btn delete"><DeleteIcon /> Delete</button>
                      </div>
                    )}
                  </>
                )}
              </motion.div>
            ))
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="no-skills-message">
              <h3>No skills found.</h3>
              <p>Why not be the first to share one?</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default SkillShareList;