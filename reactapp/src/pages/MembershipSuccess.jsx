import React from "react";
import { Link } from "react-router-dom";
import "../styles/MembershipPage.css";

export default function MembershipSuccess() {
  return (
    <div className="membership-container">
      <div className="glass-card success-card">
        <h1 className="title">Payment Successful</h1>
        <p className="subtitle">You're now a community member. Welcome aboard!</p>
        <div className="success-actions">
          <Link to="/" className="btn-primary">Go to Home</Link>
          <Link to="/membership" className="btn-secondary">Back to Membership</Link>
        </div>
      </div>
    </div>
  );
}
