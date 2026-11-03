import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PaymentSchedule = () => {
    const [policyData, setPolicyData] = useState({});
    const [paymentSchedule, setPaymentSchedule] = useState("Yearly");
    const [totalTax, setTotalTax] = useState(0);
    const [totalCost, setTotalCost] = useState(0);
    const API_BASE_URL = "http://10.192.190.158:5000";

    const { policyNumber } = useParams(); // get from URL

    useEffect(() => {
        const getPolicyByNumber = async () => {
            try {
                const res = await axios.get(
                    `${API_BASE_URL}/api/policies/getPolicyByNumber/${policyNumber}`
                );
                const policy = res.data.policy;
                setPolicyData(policy || null);
                setPaymentSchedule(policy.paymentSchedule)
                setTotalTax(policy.taxes)
                setTotalCost(policy.totalCost)
            } catch (error) {
                console.error("Error:", error);
            }
        };

        if (policyNumber) {
            getPolicyByNumber();
        }
    }, [policyNumber]);

    const getScheduleRows = () => {
        let periods = 1;
        if (paymentSchedule === "Monthly") periods = 12;
        else if (paymentSchedule === "Quarterly") periods = 4;
        else if (paymentSchedule === "Half Yearly") periods = 2;
        const taxesPer = (totalTax / periods).toFixed(2);
        const totalPer = (totalCost / periods).toFixed(2);
        const premiumPer = (totalPer - taxesPer).toFixed(2);
        return Array.from({ length: periods }, (_, i) => ({
            period: i + 1,
            premium: premiumPer,
            taxes: taxesPer,
            total: totalPer,
        }));
    };

    return (
        <div style={{ padding: "16px 18px", background: "#eef2f5", minHeight: "100%" }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#2d3e52", marginBottom: 12 }}>Payment Schedule</div>

            {/* Policy Info */}
            <div style={{ border: "1px solid #d7dbe2", background: "#fff", marginBottom: 14 }}>
                <div style={{ background: "#f3f6f9", padding: "7px 12px", borderBottom: "1px solid #d7dbe2", fontSize: 11, fontWeight: 700, color: "#2e3e4c", textTransform: "uppercase", letterSpacing: 0.5 }}>Policy Information</div>
                <div style={{ padding: "12px 16px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 32px", fontSize: 12 }}>
                    {[
                        ["Policy Number", policyData?.policyNumber],
                        ["Product Type", policyData?.productType],
                        ["Billing Method", policyData?.billingMethod],
                        ["Payment Schedule", policyData?.paymentSchedule],
                        ["Total Premium", `₹ ${policyData?.totalPremium?.toFixed(2) || "—"}`],
                        ["Status", policyData?.status],
                        ["Payment Reference", policyData?.paymentRef],
                    ].map(([label, val]) => (
                        <div key={label} style={{ display: "flex", gap: 8, padding: "3px 0", borderBottom: "1px solid #f0f0f0" }}>
                            <span style={{ color: "#6b7c93", minWidth: 160 }}>{label}</span>
                            <span style={{ fontWeight: 600, color: "#1f2d3d" }}>{val || "—"}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Schedule Table */}
            <div style={{ border: "1px solid #d7dbe2", background: "#fff" }}>
                <div style={{ background: "#f3f6f9", padding: "7px 12px", borderBottom: "1px solid #d7dbe2", fontSize: 11, fontWeight: 700, color: "#2e3e4c", textTransform: "uppercase", letterSpacing: 0.5 }}>Payment Schedule</div>
                <div style={{ overflow: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                        <thead>
                            <tr>
                                {["Period", "Premium (₹)", "Taxes (₹)", "Total (₹)"].map(h => (
                                    <th key={h} style={{ padding: "8px 12px", background: "#f6f7f8", borderBottom: "2px solid #d7dbe2", borderRight: "1px solid #e3e8ee", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#31475f" }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {getScheduleRows().map((row, idx) => (
                                <tr key={row.period} style={{ background: idx % 2 === 0 ? "#f8fafb" : "#fff" }}>
                                    <td style={{ padding: "7px 12px", borderBottom: "1px solid #e3e8ee", borderRight: "1px solid #e3e8ee" }}>{row.period}</td>
                                    <td style={{ padding: "7px 12px", borderBottom: "1px solid #e3e8ee", borderRight: "1px solid #e3e8ee" }}>{row.premium}</td>
                                    <td style={{ padding: "7px 12px", borderBottom: "1px solid #e3e8ee", borderRight: "1px solid #e3e8ee" }}>{row.taxes}</td>
                                    <td style={{ padding: "7px 12px", borderBottom: "1px solid #e3e8ee", fontWeight: 600, color: "#2b7a3e" }}>{row.total}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div style={{ padding: "10px 16px", borderTop: "1px solid #d7dbe2", textAlign: "right", fontSize: 13, fontWeight: 700, color: "#1f2d3d" }}>
                    Total Amount Payable: <span style={{ color: "#2b7a3e" }}>₹{totalCost.toLocaleString("en-IN")}</span>
                </div>
            </div>
        </div>
    );
};

export default PaymentSchedule;
