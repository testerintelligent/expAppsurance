import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

import { createSubmission } from "./submissionAPI"; // Adjust the path

const products = [
  { name: "Personal Auto", description: "Personal Auto", status: "Available" },
  {
    name: "Commercial Auto",
    description: "Commercial Auto",
    status: "Available",
  }
];

export default function NewSubmission() {
  const navigate = useNavigate();
  const { state } = useLocation();

  // Get contact and account info from location.state
  const contact = state?.contact || state?.account?.customerId || {};
  const account = state?.account || {};

  // Default values
  const defaultOrganization =
    contact.organization || account.organization || "";
  const defaultProducerCode =
    contact.producerCode || account.producerCode || "";

  const [form, setForm] = useState({
    organization: defaultOrganization,
    producerCode: defaultProducerCode,
    termType: "12 months",
    effectiveDate: new Date().toISOString().slice(0, 10),
    expirationDate: "",
    writtenDate: new Date().toISOString().slice(0, 10),
  });

  // Auto-calculate expiration date
  useEffect(() => {
    if (form.effectiveDate) {
      const effDate = new Date(form.effectiveDate);
      const months = form.termType === "12 months" ? 12 : 6;
      effDate.setMonth(effDate.getMonth() + months);
      setForm((prev) => ({
        ...prev,
        expirationDate: effDate.toISOString().slice(0, 10),
      }));
    }
  }, [form.effectiveDate, form.termType]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleProductSelect = async (product) => {
    try {
      // 1️⃣ Prepare submission data
      const submissionData = {
        accountId: account._id,
        product: product.name,
        termType: form.termType,
        effectiveDate: form.effectiveDate,
        expirationDate: form.expirationDate,
        writtenDate: form.writtenDate,
      };

      // 2️⃣ Create submission
      const newSubmission = await createSubmission(submissionData);
      console.log("neeSub", newSubmission);

      // 3️⃣ Navigate to next screen
      if (product.name === "Personal Auto") {
        const accountNumber = account.accountId || "";
        const currentEffectiveDate = form.effectiveDate || "";
        const currentExpirationDate = form.expirationDate || "";

        navigate("/driver", {
          state: {
            contact: contact || {},
            contactName: contact.name || account.name || "N/A",
            accountId: account?._id || "",
            accountNumber: accountNumber || "",
            effectiveDate: currentEffectiveDate,
            expiryDate: currentExpirationDate,
            submissionId: newSubmission?.submissionId || "",
            productName: product.name,
            isExistingAccount: true,
            account: account,
          },
        });
      } else {
        navigate(`/submission-details/${product.name}`, {
          state: {
            ...form,
            product: product.name,
            submissionId: newSubmission.submissionId,
          },
        });
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to create submission");
    }
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: 0 }}>
      <div style={{ fontSize: 16, fontWeight: 700, color: "#2d3e52", marginBottom: 12 }}>New Submission</div>

      {/* Submission details section */}
      <div style={{ border: "1px solid #d7dbe2", background: "#fff", marginBottom: 14 }}>
        <div style={{ background: "#f3f6f9", padding: "7px 12px", borderBottom: "1px solid #d7dbe2", fontSize: 11, fontWeight: 700, color: "#2e3e4c", textTransform: "uppercase", letterSpacing: 0.5 }}>
          Submission Details
        </div>
        <div style={{ padding: "12px 14px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={2}>
              <TextField size="small" label="Organization" name="organization" value={form.organization} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <TextField size="small" label="Producer Code" name="producerCode" value={form.producerCode} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <TextField size="small" select label="Term Type" name="termType" value={form.termType} onChange={handleChange} fullWidth SelectProps={{ native: true }} required>
                <option value="6 months">6 months</option>
                <option value="12 months">12 months</option>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <TextField size="small" label="Effective Date" name="effectiveDate" type="date" value={form.effectiveDate} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} required />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <TextField size="small" label="Expiration Date" name="expirationDate" type="date" value={form.expirationDate} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} required />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <TextField size="small" label="Written Date" name="writtenDate" type="date" value={form.writtenDate} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} required />
            </Grid>
          </Grid>
        </div>
      </div>

      {/* Product selection section */}
      <div style={{ border: "1px solid #d7dbe2", background: "#fff" }}>
        <div style={{ background: "#f3f6f9", padding: "7px 12px", borderBottom: "1px solid #d7dbe2", fontSize: 11, fontWeight: 700, color: "#2e3e4c", textTransform: "uppercase", letterSpacing: 0.5 }}>
          Select Product
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr>
              {["", "Product Name", "Description", "Status"].map((col) => (
                <th key={col} style={{ padding: "8px 12px", background: "#f6f7f8", borderBottom: "2px solid #d7dbe2", borderRight: "1px solid #e3e8ee", textAlign: "left", fontWeight: 700, color: "#31475f", fontSize: 11 }}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((product, idx) => (
              <tr key={idx} style={{ background: idx % 2 === 0 ? "#f8fafb" : "#fff" }}>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #e3e8ee", borderRight: "1px solid #e3e8ee" }}>
                  <Button variant="contained" size="small" onClick={() => handleProductSelect(product)}>
                    Select
                  </Button>
                </td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #e3e8ee", borderRight: "1px solid #e3e8ee", fontWeight: 600 }}>{product.name}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #e3e8ee", borderRight: "1px solid #e3e8ee" }}>{product.description}</td>
                <td style={{ padding: "8px 12px", borderBottom: "1px solid #e3e8ee", borderRight: "1px solid #e3e8ee" }}>
                  <span style={{ display: "inline-block", padding: "2px 8px", borderRadius: 2, fontSize: 11, fontWeight: 600, background: "#e8f5e9", color: "#2b7a3e" }}>
                    {product.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Box>
  );
}
