import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const api = axios.create({
  baseURL:
    process.env.REACT_APP_API_URL || "http://localhost:5000/api",
});

export default function ReviewClaim() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const payload = {
      policyNumber: state.policy.policyNumber,
      policyId: state.policy._id,
      insured: {
        name: `${state.policy.contact.firstName} ${state.policy.contact.lastName}`,
        phone: state.policy.contact.phone,
        address: state.policy.contact.address,
      },

      lossDate: state.lossDate,
      dateOfNotice: state.dateOfNotice,
      claimType: state.claimType,

      howReported: state.howReported,
      reportedBy: state.reportedName,
      relationToInsured: state.relation,
      lossCause: state.lossCause,
      weather: state.weather,
      faultRating: state.faultRating,
      incidentOnly: state.incidentOnly,

      lossDescription: state.lossDescription,
      lossLocation: state.lossLocation,
      policeReported: state.policeReported,

      vehicles: state.selectedVehicles.map((id) => {
        if(state.policy.vehicle.find((v) => v._id === id)) {
          return id
        }
      }),

      drivers: state.selectedDrivers.map((id) => {
        if(state.policy.driver.find((d) => d._id === id)) {
          return id
        }
      }),
    };

    const res = await api.post("/claims/create", payload);

    navigate("/Claim/success", {
      state: {
        claim: res.data.claim,
        ...state,
        createdClaim: res.data.claim
      },
    });
  };

  return (
    <div style={{ padding: "16px 18px", background: "#eef2f5", minHeight: "100%", color: "#2d3e52" }}>
      <div style={{ fontSize: 16, fontWeight: 700, color: "#2d3e52", marginBottom: 12 }}>Review Claim</div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
        {/* Left column */}
        <div>
          {/* Basics */}
          <div style={{ border: "1px solid #d7dbe2", background: "#fff", marginBottom: 14 }}>
            <div style={{ background: "#f3f6f9", padding: "7px 12px", borderBottom: "1px solid #d7dbe2", fontSize: 11, fontWeight: 700, color: "#2e3e4c", textTransform: "uppercase", letterSpacing: 0.5 }}>Claim Details</div>
            <div style={{ padding: "10px 16px", fontSize: 12 }}>
              {[
                ["Policy Number", state.policy.policyNumber],
                ["Loss Date", new Date(state.lossDate).toLocaleDateString("en-GB")],
                ["Claim Type", state.claimType],
                ["How Reported", state.howReported],
                ["Reported By", state.reportedName],
                ["Relation", state.relation],
              ].map(([label, val]) => (
                <div key={label} style={{ display: "grid", gridTemplateColumns: "160px 1fr", padding: "4px 0", borderBottom: "1px solid #f0f0f0" }}>
                  <span style={{ color: "#6b7c93" }}>{label}</span>
                  <span style={{ fontWeight: 600, color: "#1f2d3d" }}>{val || "—"}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Loss Details */}
          {(state.lossDescription || state.lossLocation || state.lossCause) && (
            <div style={{ border: "1px solid #d7dbe2", background: "#fff", marginBottom: 14 }}>
              <div style={{ background: "#f3f6f9", padding: "7px 12px", borderBottom: "1px solid #d7dbe2", fontSize: 11, fontWeight: 700, color: "#2e3e4c", textTransform: "uppercase", letterSpacing: 0.5 }}>Loss Details</div>
              <div style={{ padding: "10px 16px", fontSize: 12 }}>
                {[
                  ["Loss Description", state.lossDescription],
                  ["Loss Location", state.lossLocation],
                  ["Loss Cause", state.lossCause],
                  ["Fault Rating", state.faultRating],
                  ["Weather", state.weather],
                  ["Police Reported", state.policeReported ? "Yes" : "No"],
                ].map(([label, val]) => (
                  <div key={label} style={{ display: "grid", gridTemplateColumns: "160px 1fr", padding: "4px 0", borderBottom: "1px solid #f0f0f0" }}>
                    <span style={{ color: "#6b7c93" }}>{label}</span>
                    <span style={{ fontWeight: 600, color: "#1f2d3d" }}>{val || "—"}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ border: "1px solid #d7dbe2", background: "#fff" }}>
            <div style={{ background: "#f3f6f9", padding: "7px 12px", borderBottom: "1px solid #d7dbe2", fontSize: 11, fontWeight: 700, color: "#2e3e4c", textTransform: "uppercase", letterSpacing: 0.5 }}>Insured</div>
            <div style={{ padding: "10px 16px", fontSize: 12 }}>
              <div style={{ fontWeight: 600, color: "#1f2d3d" }}>{state.policy.contact?.firstName} {state.policy.contact?.lastName}</div>
              <div style={{ color: "#6b7c93", marginTop: 4 }}>{state.policy.contact?.address}</div>
              <div style={{ color: "#6b7c93" }}>{state.policy.contact?.phone}</div>
            </div>
          </div>

          <div style={{ border: "1px solid #d7dbe2", background: "#fff" }}>
            <div style={{ background: "#f3f6f9", padding: "7px 12px", borderBottom: "1px solid #d7dbe2", fontSize: 11, fontWeight: 700, color: "#2e3e4c", textTransform: "uppercase", letterSpacing: 0.5 }}>Actions</div>
            <div style={{ padding: "10px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
              <button onClick={handleSubmit} style={{ background: "#1f5fa6", color: "#fff", border: "none", padding: "7px 0", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                Submit Claim
              </button>
              <button onClick={() => navigate(-1)} style={{ background: "#fff", color: "#1f5fa6", border: "1px solid #1f5fa6", padding: "7px 0", fontSize: 12, cursor: "pointer" }}>
                ← Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
