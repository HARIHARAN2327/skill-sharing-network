import React from "react";
import RequireMember from "../components/RequireMember";
import "../styles/PaymentPage.css";

const demoBooks = [
  { id: 1, title: "Windsurfing Fundamentals", author: "CSN", href: "https://example.com/book1.pdf" },
  { id: 2, title: "Advanced Techniques", author: "CSN", href: "https://example.com/book2.pdf" },
];

export default function EBooks() {
  return (
    <RequireMember>
      <div className="pay-container">
        <div className="pay-card">
          <h2>E-Books Library</h2>
          <p className="muted">Exclusive resources for verified members.</p>
          <div style={{display:"grid", gap:12, marginTop:12}}>
            {demoBooks.map(b => (
              <a key={b.id} className="btn-secondary" href={b.href} target="_blank" rel="noreferrer">
                {b.title} — {b.author}
              </a>
            ))}
          </div>
        </div>
      </div>
    </RequireMember>
  );
}
