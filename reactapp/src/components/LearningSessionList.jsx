import React from "react";
import LearningSessionCard from "./LearningSessionCard";
import "../styles/LearningSessionsSection.css";

function LearningSessionList({ sessions }) {
  if (!sessions.length) {
    return <p className="text-center mt-4 text-muted">No sessions available.</p>;
  }

  return (
    <div className="row g-4">
      {sessions.map((session) => (
        <div key={session.id} className="col-md-4">
          <LearningSessionCard session={session} />
        </div>
      ))}
    </div>
  );
}

export default LearningSessionList;
