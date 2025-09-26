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
    effectiveDate: new Date().toISOString().slice(0, 10),
  });

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
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
              Select Producer
            </Typography>
            <TextField
              label="Organization"
              name="organization"
              value={form.organization}
              fullWidth
              sx={{ mb: 2 }}
              InputProps={{ readOnly: true }}
            />
            <TextField
              label="Producer Code"
              name="producerCode"
              value={form.producerCode}
              fullWidth
              sx={{ mb: 2 }}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={8}>
            <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
              Product Offers
            </Typography>
            <TextField
              type="date"
              label="Default Effective Date"
              name="effectiveDate"
              value={form.effectiveDate}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
              InputLabelProps={{ shrink: true }}
            />
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
                    onClick={() => navigate(`/submission-details/${product.name}`)}
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
