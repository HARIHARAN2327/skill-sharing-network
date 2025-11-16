import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import "../styles/SkillShareForm.css";

function SkillShareForm({ onAdd, editId, setError }) {
  const [form, setForm] = useState({
    skillName: "",
    category: "Technology",
    skillLevel: "Beginner",
    userEmail: "",
    description: "",
    availability: "Available",
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  // Fetch skill by ID for editing
  const getSkillShareById = async (id) => {
    return await axios.get(
      `https://8080-afbbcbdcdbeddeaeaafeabcfedbbfadbaeaab.premiumproject.examly.io/api/skillshares/${id}`
    );
  };

  const loadSkill = useCallback(async (id) => {
    try {
      const res = await getSkillShareById(id);
      setForm(res.data);
    } catch (err) {
      console.error("Error loading skill", err);
    }
  }, []);

  useEffect(() => {
    if (editId) loadSkill(editId);
  }, [editId, loadSkill]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!form.skillName) {
      setError && setError("Skill name is required");
      return false;
    }
    if (!form.userEmail) {
      setError && setError("User email is required");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.userEmail)) {
      setError && setError("Please provide a valid email");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsError(false);

    if (!validateForm()) return;

    try {
      const res = await axios.post(
        "https://8080-afbbcbdcdbeddeaeaafeabcfedbbfadbaeaab.premiumproject.examly.io/api/skillshares/addSkillShare",
        form
      );

      // Pass the actual saved skill to parent
      onAdd && onAdd(res.data);

      // Reset form
      setForm({
        skillName: "",
        category: "Technology",
        skillLevel: "Beginner",
        userEmail: "",
        description: "",
        availability: "Available",
      });

      setMessage("Skill share added successfully!");
      setIsError(false);
    } catch (error) {
      console.error("Error saving skill", error);
      setMessage("Unable to save your skill. Please try again.");
      setIsError(true);
      setError && setError("Unable to save your skill. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="skill-form" data-testid="skill-form">
      <input
        type="text"
        name="skillName"
        placeholder="Skill name"
        value={form.skillName}
        onChange={handleChange}
        data-testid="skillName"
      />
      <input
        type="email"
        name="userEmail"
        placeholder="Your email"
        value={form.userEmail}
        onChange={handleChange}
        data-testid="userEmail"
      />
      <select name="category" value={form.category} onChange={handleChange} data-testid="category">
        <option>Technology</option>
        <option>Arts & Crafts</option>
        <option>Business</option>
        <option>Language</option>
        <option>Music</option>
        <option>Sports</option>
        <option>Cooking</option>
        <option>Other</option>
      </select>
      <select name="skillLevel" value={form.skillLevel} onChange={handleChange} data-testid="skillLevel">
        <option>Beginner</option>
        <option>Intermediate</option>
        <option>Advanced</option>
        <option>Expert</option>
      </select>
      <select name="availability" value={form.availability} onChange={handleChange} data-testid="availability">
        <option>Available</option>
        <option>Busy</option>
        <option>Weekend Only</option>
        <option>Evenings</option>
      </select>
      <textarea
        name="description"
        placeholder="Describe your skill and what you can teach..."
        value={form.description}
        onChange={handleChange}
        data-testid="description"
      />
      <button type="submit" data-testid="submit-btn">
        {editId ? "Update Skill Share" : "Add Skill Share"}
      </button>
      {message && <p className={isError ? "error" : "success"}>{message}</p>}
    </form>
  );
}

export default SkillShareForm;
