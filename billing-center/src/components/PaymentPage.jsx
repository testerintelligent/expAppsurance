import React from "react";

export default function PaymentPage() {
  const [tab, setTab] = React.useState(0);

  return (
    <div style={{ padding: "16px 18px", background: "#eef2f5", minHeight: "100%" }}>
      <div style={{ fontSize: 16, fontWeight: 700, color: "#2d3e52", marginBottom: 16 }}>Payment Portal</div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 16 }}>
        {/* LEFT: Policy Summary */}
        <div style={{ border: "1px solid #d7dbe2", background: "#fff" }}>
          <div style={{ background: "#f3f6f9", padding: "7px 12px", borderBottom: "1px solid #d7dbe2", fontSize: 11, fontWeight: 700, color: "#2e3e4c", textTransform: "uppercase", letterSpacing: 0.5 }}>Policy Summary</div>
          <div style={{ padding: "12px 16px", fontSize: 12 }}>
            {[
              ["Policy Number", "GW-PL-10234"],
              ["Insured Name", "Shilpa Kannan"],
              ["Premium Amount", "₹400.00"],
              ["Service Fee", "₹50.00"],
            ].map(([label, val]) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #f0f0f0" }}>
                <span style={{ color: "#6b7c93" }}>{label}</span>
                <span style={{ fontWeight: 600, color: "#1f2d3d" }}>{val}</span>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0 0", fontSize: 14, fontWeight: 700 }}>
              <span>Total</span>
              <span style={{ color: "#2b7a3e" }}>₹450.00</span>
            </div>
          </div>
          <div style={{ padding: "10px 16px", borderTop: "1px solid #d7dbe2", fontSize: 11, color: "#6b7c93", lineHeight: 1.7 }}>
            • Payments processed securely via Expleosurance BillingCenter<br />
            • Accepted: Credit Card, Debit Card, Bank Transfer<br />
            • Data encrypted, PCI-DSS compliant
          </div>
        </div>

        {/* RIGHT: Payment Form */}
        <div style={{ border: "1px solid #d7dbe2", background: "#fff" }}>
          <div style={{ background: "#f3f6f9", padding: "7px 12px", borderBottom: "1px solid #d7dbe2", fontSize: 11, fontWeight: 700, color: "#2e3e4c", textTransform: "uppercase", letterSpacing: 0.5 }}>Payment Details</div>

          {/* Tab bar */}
          <div style={{ display: "flex", borderBottom: "1px solid #d7dbe2" }}>
            {["Credit / Debit Card", "Bank Transfer"].map((label, idx) => (
              <button key={idx} onClick={() => setTab(idx)}
                style={{ padding: "7px 18px", fontSize: 12, fontWeight: tab === idx ? 700 : 500, color: tab === idx ? "#1f5fa6" : "#4e5d6d", background: "none", border: "none", borderBottom: tab === idx ? "2px solid #1f5fa6" : "2px solid transparent", cursor: "pointer" }}>
                {label}
              </button>
            ))}
          </div>

          <div style={{ padding: "14px 16px" }}>
            {tab === 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { label: "Cardholder Name", placeholder: "" },
                  { label: "Card Number", placeholder: "XXXX XXXX XXXX XXXX" },
                ].map(({ label, placeholder }) => (
                  <div key={label} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    <label style={{ fontSize: 11, color: "#6b7c93" }}>{label}</label>
                    <input placeholder={placeholder} style={{ border: "1px solid #d7dbe2", padding: "5px 8px", fontSize: 12 }} />
                  </div>
                ))}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    <label style={{ fontSize: 11, color: "#6b7c93" }}>Expiry</label>
                    <input placeholder="MM/YY" style={{ border: "1px solid #d7dbe2", padding: "5px 8px", fontSize: 12 }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    <label style={{ fontSize: 11, color: "#6b7c93" }}>CVC</label>
                    <input type="password" style={{ border: "1px solid #d7dbe2", padding: "5px 8px", fontSize: 12 }} />
                  </div>
                </div>
                <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#4e5d6d" }}>
                  <input type="checkbox" /> Remember this card
                </label>
                <button style={{ background: "#1f5fa6", color: "#fff", border: "none", padding: "8px 0", fontSize: 13, fontWeight: 600, cursor: "pointer", marginTop: 4 }}>
                  Pay Now
                </button>
              </div>
            )}
            {tab === 1 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { label: "Account Holder Name", placeholder: "" },
                  { label: "Bank Account Number", placeholder: "XXXX XXXX XXXX" },
                  { label: "IFSC / Routing Code", placeholder: "" },
                ].map(({ label, placeholder }) => (
                  <div key={label} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    <label style={{ fontSize: 11, color: "#6b7c93" }}>{label}</label>
                    <input placeholder={placeholder} style={{ border: "1px solid #d7dbe2", padding: "5px 8px", fontSize: 12 }} />
                  </div>
                ))}
                <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#4e5d6d" }}>
                  <input type="checkbox" /> Remember this bank account
                </label>
                <button style={{ background: "#1f5fa6", color: "#fff", border: "none", padding: "8px 0", fontSize: 13, fontWeight: 600, cursor: "pointer", marginTop: 4 }}>
                  Proceed to Pay
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
