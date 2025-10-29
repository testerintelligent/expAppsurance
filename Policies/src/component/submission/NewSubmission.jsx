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
  { name: "Commercial Auto", description: "Commercial Auto", status: "Available" },
  { name: "Commercial Package", description: "Commercial Package", status: "Available" },
  { name: "Commercial Property", description: "Commercial Property", status: "Available" },
  { name: "General Liability", description: "General Liability", status: "Available" },
  { name: "Businessowners", description: "Business Owners", status: "Available" },
  { name: "Inland Marine", description: "Inland Marine", status: "Available" },
  { name: "Workers' Compensation", description: "Workers' Compensation", status: "Available" },
];

export default function NewSubmission() {
  const navigate = useNavigate();
  const { state } = useLocation();

  // Get contact and account info from location.state
  const contact = state?.contact || state?.account?.customerId || {};
  const account = state?.account || {};

  // Default values
  const defaultOrganization = contact.organization || account.organization || "";
  const defaultProducerCode = contact.producerCode || account.producerCode || "";

  const [form, setForm] = useState({
    organization: defaultOrganization,
    producerCode: defaultProducerCode,
    termType: "6 months",
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
      setForm(prev => ({ ...prev, expirationDate: effDate.toISOString().slice(0, 10) }));
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

      // 3️⃣ Navigate to next screen
      if (product.name === "Personal Auto") {
        const accountNumber = account.accountId || "";
        const currentEffectiveDate = form.effectiveDate || "";
        const currentExpirationDate = form.expirationDate || "";

        navigate("/driver", {
          state: {
            contact: contact || {},  
            contactName: contact.name || account.name || 'N/A',
            accountId: account?._id || "",
            accountNumber: accountNumber || "",
            effectiveDate: currentEffectiveDate,
            expiryDate: currentExpirationDate,
            submissionId: newSubmission?.submissionId || "",
            productName: product.name,
          },
        });
        } else {
          navigate(`/submission-details/${product.name}`, {
            state: { ...form, product: product.name, submissionId: newSubmission.submissionId },
          });
        }
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || "Failed to create submission");
      }
    };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 4 }}>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
        New Submissions
      </Typography>

      <Paper sx={{ p: 4, borderRadius: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {/* Organization */}
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  label="Organization"
                  name="organization"
                  value={form.organization}
                  onChange={handleChange}
                  fullWidth
                  sx={{ mb: 2 }}
                />
              </Grid>
              {/* Producer Code */}
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  label="Producer Code"
                  name="producerCode"
                  value={form.producerCode}
                  onChange={handleChange}
                  fullWidth
                  sx={{ mb: 2 }}
                />
              </Grid>
              {/* Term Type */}
              <Grid item xs={12} sm={6} md={2}>
                <TextField
                  select
                  label="Term Type"
                  name="termType"
                  value={form.termType}
                  onChange={handleChange}
                  fullWidth
                  SelectProps={{ native: true }}
                  sx={{ mb: 2 }}
                  required
                >
                  <option value="6 months">6 months</option>
                  <option value="12 months">12 months</option>
                </TextField>
              </Grid>
              {/* Effective Date */}
              <Grid item xs={12} sm={6} md={2}>
                <TextField
                  label="Effective Date"
                  name="effectiveDate"
                  type="date"
                  value={form.effectiveDate}
                  onChange={handleChange}
                  fullWidth
                  sx={{ mb: 2 }}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              {/* Expiration Date */}
              <Grid item xs={12} sm={6} md={2}>
                <TextField
                  label="Expiration Date"
                  name="expirationDate"
                  type="date"
                  value={form.expirationDate}
                  onChange={handleChange}
                  fullWidth
                  sx={{ mb: 2 }}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              {/* Written Date */}
              <Grid item xs={12} sm={6} md={2}>
                <TextField
                  label="Written Date"
                  name="writtenDate"
                  type="date"
                  value={form.writtenDate}
                  onChange={handleChange}
                  fullWidth
                  sx={{ mb: 2 }}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell>Product Description</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product, idx) => (
                <TableRow key={idx}>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="info"
                      size="small"
                      onClick={() => handleProductSelect(product)}
                    >
                      Select
                    </Button>
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{product.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Paper>
    </Box>
  );
}
