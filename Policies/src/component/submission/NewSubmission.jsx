import React, { useState } from "react";
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

const products = [
  { name: "Businessowners", description: "Business Owners", status: "Available" },
  { name: "Commercial Auto", description: "Commercial Auto", status: "Available" },
  { name: "Commercial Package", description: "Commercial Package", status: "Available" },
  { name: "Commercial Property", description: "Commercial Property", status: "Available" },
  { name: "General Liability", description: "General Liability", status: "Available" },
  { name: "Inland Marine", description: "Inland Marine", status: "Available" },
  { name: "Workers' Compensation", description: "Workers' Compensation", status: "Available" },
  { name: "Personal Auto", description: "Personal Auto", status: "Available" },
];

export default function NewSubmission() {
  const navigate = useNavigate();
  const { state } = useLocation();
  // Try to get contact/account info from location.state
  const contact = state?.contact || state?.account?.customerId || {};
  const account = state?.account || {};

  // Default values from contact/account info
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

  // Auto-calculate expiration date when effectiveDate or termType changes
  React.useEffect(() => {
    if (form.effectiveDate) {
      const effDate = new Date(form.effectiveDate);
      let months = form.termType === "12 months" ? 12 : 6;
      effDate.setMonth(effDate.getMonth() + months);
      // Format as yyyy-MM-dd for input type="date"
      const expDate = effDate.toISOString().slice(0, 10);
      setForm((prev) => ({ ...prev, expirationDate: expDate }));
    }
  }, [form.effectiveDate, form.termType]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
                    onClick={() => {
                      if (product.name === "Personal Auto") {
                        // Pass account and policy info if available
                        const accountNumber = state?.account?.accountId || "";
                        const policy = state?.account?.policies?.[0] || {};
                        const policyNumber = policy.policyId || "";
                        const expiryDate = policy.expiryDate ? new Date(policy.expiryDate).toLocaleDateString() : "";
                        navigate("/driver", {
                          state: {
                            contact,
                            accountNumber,
                            policyNumber,
                            expiryDate
                          }
                        });
                      } else {
                        navigate(`/submission-details/${product.name}`, { state: { ...form, product: product.name } });
                      }
                    }}
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
