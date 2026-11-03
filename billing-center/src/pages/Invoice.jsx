import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";

const Invoice = () => {
  const [invoiceData, setInvoiceData] = useState({});
  const [policyData, setPolicyData] = useState({});
  const [paymentSchedule, setPaymentSchedule] = useState("Yearly");
  const [totalTax, setTotalTax] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [rows, setRows] = useState([]);

  const API_BASE_URL = "http://10.192.190.158:5000";

  const { policyNumber } = useParams(); // get from URL

  useEffect(() => {
    const getPolicyByNumber = async () => {
      try {
        const res = await axios.get(
          `${API_BASE_URL}/api/policies/getPolicyByNumber/${policyNumber}`
        );
        const policy = res.data.policy;
        console.log(res.data);
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

  useEffect(() => {
    setRows(getScheduleRows());
  }, [policyData, paymentSchedule]);

  const getScheduleRows = () => {
    let periods = 1;
    let monthGap = 12; // default yearly

    if (paymentSchedule === "Monthly") {
      periods = 12;
      monthGap = 1;
    } else if (paymentSchedule === "Quarterly") {
      periods = 4;
      monthGap = 3;
    } else if (paymentSchedule === "Half Yearly") {
      periods = 2;
      monthGap = 6;
    } else if (paymentSchedule === "Yearly") {
      periods = 1;
      monthGap = 12;
    }

    const taxesPer = (totalTax / periods).toFixed(2);
    const totalPer = (totalCost / periods).toFixed(2);
    const premiumPer = (totalPer - taxesPer).toFixed(2);

    const effectiveDate = new Date(policyData.effectiveDate);
    const currentDate = new Date();

    const formatDate = (date) => {
      const dd = String(date.getDate()).padStart(2, "0");
      const mm = String(date.getMonth() + 1).padStart(2, "0");
      const yyyy = date.getFullYear();
      return `${dd}/${mm}/${yyyy}`;
    };

    const generateInvoiceNumber = () => {
      return `INV-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    };

    return Array.from({ length: periods }, (_, i) => {
      // Bill Date based on schedule gap
      const billDate = new Date(effectiveDate);
      billDate.setMonth(billDate.getMonth() + (monthGap * (i + 1)));

      // Due Date (+3 days)
      const dueDate = new Date(billDate);
      dueDate.setDate(dueDate.getDate() + 3);

      // Status Logic
      let status = "Planned";
      if (currentDate > dueDate) status = "Overdue";
      else if (currentDate >= billDate) status = "Billed";

      return {
        id: i,
        period: i + 1,
        premium: premiumPer,
        taxes: taxesPer,
        total: totalPer,
        billDate: formatDate(billDate),
        dueDate: formatDate(dueDate),
        invoiceNumber: generateInvoiceNumber(),
        status,
      };
    });
  };

  const handlePay = (index) => {
    const updatedRows = [...rows];
    updatedRows[index].status = "Paid";
    setRows(updatedRows);
  };

  // Table Column Config
  const columns = useMemo(
    () => [
      { key: "billDate", label: "Bill Date" },
      { key: "dueDate", label: "Due Date" },
      { key: "invoiceNumber", label: "Invoice Number" },
      { key: "invoiceStream", label: "Invoice Stream" },
      { key: "status", label: "Status" },
      { key: "amount", label: "Amount" },
    ],
    []
  );

  return (
    <div style={{ padding: "16px 18px", background: "#eef2f5", minHeight: "100%" }}>
      <div style={{ fontSize: 16, fontWeight: 700, color: "#2d3e52", marginBottom: 12 }}>Invoice / Payment Schedule</div>
      <div style={{ border: "1px solid #d7dbe2", background: "#fff", overflow: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr>
              <th style={{ padding: "8px 10px", background: "#f6f7f8", borderBottom: "2px solid #d7dbe2", borderRight: "1px solid #e3e8ee", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#31475f", width: 80 }}>Pay</th>
              {columns.map((col) => (
                <th key={col.key} style={{ padding: "8px 10px", background: "#f6f7f8", borderBottom: "2px solid #d7dbe2", borderRight: "1px solid #e3e8ee", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#31475f" }}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={row.period} style={{ background: idx % 2 === 0 ? "#f8fafb" : "#fff" }}>
                <td style={{ padding: "7px 10px", borderBottom: "1px solid #e3e8ee", borderRight: "1px solid #e3e8ee", textAlign: "center" }}>
                  <button onClick={() => handlePay(row.id)} disabled={row.status === "Paid"}
                    style={{ background: row.status === "Paid" ? "#e0e0e0" : "#1f5fa6", color: row.status === "Paid" ? "#666" : "#fff", border: "none", padding: "3px 10px", fontSize: 11, cursor: row.status === "Paid" ? "default" : "pointer", fontWeight: 600 }}>
                    {row.status === "Paid" ? "Paid" : "Pay"}
                  </button>
                </td>
                <td style={{ padding: "7px 10px", borderBottom: "1px solid #e3e8ee", borderRight: "1px solid #e3e8ee" }}>{row.billDate}</td>
                <td style={{ padding: "7px 10px", borderBottom: "1px solid #e3e8ee", borderRight: "1px solid #e3e8ee" }}>{row.dueDate}</td>
                <td style={{ padding: "7px 10px", borderBottom: "1px solid #e3e8ee", borderRight: "1px solid #e3e8ee" }}>{row.invoiceNumber}</td>
                <td style={{ padding: "7px 10px", borderBottom: "1px solid #e3e8ee", borderRight: "1px solid #e3e8ee" }}>{policyData?.paymentSchedule}</td>
                <td style={{ padding: "7px 10px", borderBottom: "1px solid #e3e8ee", borderRight: "1px solid #e3e8ee" }}>
                  <span style={{
                    background: row.status === "Paid" ? "#e8f5e9" : row.status === "Overdue" ? "#fce4e4" : "#e3f2fd",
                    color: row.status === "Paid" ? "#2b7a3e" : row.status === "Overdue" ? "#c62828" : "#1f5fa6",
                    padding: "2px 8px", fontSize: 11, fontWeight: 600
                  }}>{row.status}</span>
                </td>
                <td style={{ padding: "7px 10px", borderBottom: "1px solid #e3e8ee", fontWeight: 600, color: "#2b7a3e" }}>{row.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Invoice;
