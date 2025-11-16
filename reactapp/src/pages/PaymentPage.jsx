import React, { useEffect, useMemo, useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useLocation, useNavigate } from "react-router-dom";
import { generateQR, getStatus, uploadScreenshot } from "../services/paymentApi";
import "../styles/PaymentPage.css";

export default function PaymentPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const plan = state?.plan || { amount: 1, reference: "generic" };
  const [txId, setTxId] = useState("");
  const [payload, setPayload] = useState("");
  const [status, setStatus] = useState("INIT");
  const [countdown, setCountdown] = useState(3);
  const [file, setFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const pollRef = useRef(null);
  const cancelled = useRef(false);

  useEffect(() => {
    async function init() {
      try {
        const body = { userId: 123, amount: plan.amount, reference: plan.reference };
        const res = await generateQR(body);
        setTxId(res.data.transactionId);
        setPayload(res.data.data);
        setStatus(res.data.status);
      } catch (e) {
        cancelled.current = false;
        if (!cancelled.current) {
          // Fallback priority 1: local UPI QR using env
          const upiId = process.env.REACT_APP_UPI_ID || "kmharimng@okicici";
          const upiName = process.env.REACT_APP_UPI_NAME || "hawks";
          if (upiId) {
            const params = new URLSearchParams({ pa: upiId, pn: upiName, am: String(plan.amount || 1), cu: "INR" }).toString();
            const upi = `upi://pay?${params}`;
            if (!cancelled.current) {
              setTxId("");
              setPayload(upi);
              setStatus("FALLBACK");
            }
          } else {
            // Fallback priority 2: local plain payload with random transaction
            const localId = Math.random().toString(36).slice(2);
            const payload = JSON.stringify({ tx: localId, am: plan.amount || 1, ref: plan.reference || "generic" });
            if (!cancelled.current) {
              setTxId("");
              setPayload(payload);
              setStatus("FALLBACK");
            }
          }
        }
      }
    }
    init();
  }, [plan.amount, plan.reference]);

  useEffect(() => {
    if (!txId) return; // no polling in fallback mode
    pollRef.current = setInterval(async () => {
      try {
        const r = await getStatus(txId);
        if (r?.data?.status === "VERIFIED") {
          clearInterval(pollRef.current);
          setStatus("PAID");
        }
      } catch {}
    }, 3000);
    return () => pollRef.current && clearInterval(pollRef.current);
  }, [txId]);

  useEffect(() => {
    if (status !== "PAID") return;
    const t = setInterval(() => setCountdown((c) => (c > 0 ? c - 1 : 0)), 1000);
    const to = setTimeout(() => navigate("/home"), 3000);
    return () => {
      clearInterval(t);
      clearTimeout(to);
    };
  }, [status, navigate]);

  const qrValue = useMemo(() => payload || "", [payload]);

  return (
    <div className="pay-container">
      <div className="pay-card">
        <h2>Scan to Pay</h2>
        {status === "ERROR" ? (
          <p className="muted">Failed to generate QR. Please go back and try again.</p>
        ) : !payload ? (
          <p className="muted">Generating QR…</p>
        ) : (
          <>
            <p className="muted small">
              {status === "FALLBACK"
                ? "Backend unreachable. Using local UPI QR based on your .env. Auto-confirm not available."
                : "Scan with your phone to pay. Then upload a screenshot for admin verification."}
            </p>
            <div className="qr-center">
              <QRCodeCanvas value={qrValue} size={260} includeMargin={true} level="M" />
            </div>
            <div className="actions" style={{marginTop:12}}>
              <input type="file" accept="image/*" onChange={(e)=>setFile(e.target.files?.[0]||null)} />
              <button className="btn-primary" disabled={!file || !txId || submitted}
                onClick={async ()=>{
                  if (!file || !txId) return;
                  try {
                    await uploadScreenshot(txId, file);
                    setSubmitted(true);
                    setStatus("SUBMITTED");
                    setCountdown(2);
                    const t = setInterval(()=> setCountdown(c=> (c>0? c-1:0)), 1000);
                    const to = setTimeout(()=> navigate("/home"), 2000);
                    return ()=>{ clearInterval(t); clearTimeout(to); };
                  } catch {}
                }}
              >Upload Screenshot</button>
            </div>
            <div className="actions">
              <button className="btn-secondary" onClick={() => navigate(-1)}>Back</button>
            </div>
            {submitted && (
              <div className="success">
                <div className="tick">🟡</div>
                <div>Payment submitted, pending verification. Redirecting in {countdown}s…</div>
              </div>
            )}
            {status === "PAID" && (
              <div className="success">
                <div className="tick">✅</div>
                <div>Payment Successful. Redirecting in {countdown}s…</div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
