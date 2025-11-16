import React, { useEffect, useState } from "react";
import "../styles/MembershipPage.css";
import { createMembership } from "../services/membershipApi";
import { useNavigate } from "react-router-dom";

const membershipPlans = [
  {
    name: "Lite Support",
    price: 1,
    type: "lite",
    features: [
      "Support the community",
      "Access to member news",
      "Thank-you badge",
    ],
  },
  {
    name: "Club Supporter",
    price: 2,
    type: "supporter",
    features: [
      "Everything in Lite",
      "Priority event updates",
      "Community shout-out",
    ],
  },
];

function PaymentModal({ open, onClose, plan }) {
  const navigate = useNavigate();

  // QR is handled on /payment page, so no deep links or QR here

  async function handleConfirmPayment() {
    if (!plan) return;
    try {
      // Hardcoded userId for now, replace with auth user later
      const payload = { userId: 123, membershipType: plan.type };
      await createMembership(payload);
      onClose({ success: true, message: "Membership activated!" });
    } catch (e) {
      onClose({ success: false, message: e?.response?.data?.message || e?.message || "Failed to create membership" });
    }
  }

  useEffect(() => {
    // no-op: keep for symmetry; nothing to cleanup now
  }, []);

  if (!open || !plan) return null;

  return (
    <div className="payment-modal-overlay" role="dialog" aria-modal="true">
      <div className="payment-modal glass-card">
        <button className="modal-close" onClick={() => onClose(null)} aria-label="Close modal">×</button>
        <h3 className="modal-title">Complete Payment</h3>
        <p className="modal-subtitle">{plan.name} • ₹{plan.price}</p>

        <div className="qr-section">
          <button className="btn-secondary" onClick={() => navigate("/payment", { state: { plan: { amount: plan.price, reference: plan.type } } })}>
            Generate QR
          </button>
        </div>

        <div className="upi-actions" />

        <ol className="instructions">
          <li>Scan with any UPI app.</li>
          <li>Confirm the payment of ₹{plan.price}.</li>
          <li>Click the button below.</li>
        </ol>

        <button className="btn-primary confirm-btn" onClick={handleConfirmPayment}>
          I've Completed the Payment
        </button>
      </div>
    </div>
  );
}

export default function MembershipPage() {
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  function openModal(plan) {
    setSelected(plan);
    setShowModal(true);
  }

  function closeModal(result) {
    setShowModal(false);
    setSelected(null);
    if (result && typeof result.message === "string") {
      setToast({ success: !!result.success, message: result.message });
      setTimeout(() => setToast(null), 3500);
    }
    if (result?.success) {
      navigate("/");
    }
  }

  return (
    <div className="membership-container">
      <div className="header-block">
        <h1 className="title">Join the Club</h1>
        <p className="subtitle">Become a member of our windsurfing community</p>
      </div>

      {toast && (
        <div className={`toast ${toast.success ? "toast-success" : "toast-error"}`}>
          {toast.message}
        </div>
      )}

      <div className="membership-grid">
        {membershipPlans.map((plan) => (
          <div key={plan.type} className="membership-card glass-card">
            <div className="card-head">
              <h3 className="plan-name">{plan.name}</h3>
              <div className="price">₹{plan.price} <span className="unit">/ one-time</span></div>
            </div>

            <ul className="features">
              {plan.features.map((f, idx) => (
                <li key={idx}>{f}</li>
              ))}
            </ul>

            <button className="btn-primary" onClick={() => openModal(plan)}>
              Get Membership
            </button>
          </div>
        ))}
      </div>

      <PaymentModal open={showModal} onClose={closeModal} plan={selected} />
    </div>
  );
}
