import React, { useState, useEffect } from "react";
import CategoryTabs from "./CategoryTabs";
import LearningSessionList from "./LearningSessionList";
import { getLearningSessions } from "../services/learningSessionApi";
import "../styles/LearningSessionsSection.css";

function LearningSessionsSection() {
  const [sessions, setSessions] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    // getLearningSessions returns a Promise
    getLearningSessions().then((data) => setSessions(data));
  }, []);

  const categories = [
    "All",
    "Music",
    "Technology",
    "Arts",
    "Language",
    "Business",
    "Cooking",
    "Sport",
  ];

  const filtered =
    activeCategory === "All"
      ? sessions
      : sessions.filter((s) => s.title === activeCategory);

  return (
    <section className="learning-container py-5">
      <div className="text-center mb-4">
        <h2 className="section-title fw-bold">Join a Learning Session</h2>
      </div>

      {/* Category Tabs */}
      <CategoryTabs
        categories={categories}
        active={activeCategory}
        onSelect={setActiveCategory}
      />

      {/* Session Cards */}
      <LearningSessionList sessions={filtered} />
    </section>
  );
}

export default LearningSessionsSection;
