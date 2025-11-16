import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LearningSessionsSection.css";

function LearningSessionCard({ session }) {
  const navigate = useNavigate();

  return (
    <div className="card shadow-sm p-3 text-center">
      <h5 className="fw-bold">{session.title}</h5>
      <p>{session.description}</p>
      <button
        className="btn btn-primary"
        onClick={() => navigate(`/sessions/${session.id}`)}
      >
        Join Session
      </button>
    </div>
  );
}

export default LearningSessionCard;
