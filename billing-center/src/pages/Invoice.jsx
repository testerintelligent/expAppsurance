import {
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Invoice = () => {
  const [invoiceData, setInvoiceData] = useState({});
  const API_BASE_URL = "http://localhost:5000/api/billing";

  const { policyNumber } = useParams(); // ✅ get from URL

  useEffect(() => {
    const getInvoice = async () => {
      try {
        const res = await axios.get(
          `${API_BASE_URL}/getInvoiceByPolicyNumber/${policyNumber}`
        );
        setInvoiceData(res.data);
        console.log("invoice", res.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (policyNumber) {
      getInvoice();
    }
  }, [policyNumber]);

  return (
    <Box sx={{ maxWidth: 1250, mx: "auto", p: 4 }}>
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 4,
          background: "#e1bee7",
          borderRadius: 2,
          border: "1px solid #d0e4ff",
          fontSize: "14px",
          textAlign: "center",
        }}
      >
        <Typography variant="h6">ABC General Insurance Ltd.</Typography>
        <Typography>
          No 12 Mount Road, Chennai. GSTIN:33ABCDE1234F1Z5
        </Typography>
        <Typography>Phone: 044-12345678</Typography>
      </Paper>

      <Paper
        className="grid grid-cols-2 gap-8"
        sx={{
          p: 3,
          background: "#f5f0ff", // light purple background
          borderRadius: 2,
          border: "1px solid #d6ccff", // light purple border
        }}
      >
        {/* Left Section */}
        <div className="space-y-3 border-r pr-6 border-purple-200">
          <div className="flex items-center">
            <Typography fontWeight="bold" className="w-44">
              Policy Number
            </Typography>
            <Typography className="mx-2">:</Typography>
            <Typography>{invoiceData?.invoice?.policyNumber}</Typography>
          </div>

          <div className="flex items-center">
            <Typography fontWeight="bold" className="w-44">
              Product Type
            </Typography>
            <Typography className="mx-2">:</Typography>
            <Typography>{invoiceData?.invoice?.productType}</Typography>
          </div>

          <div className="flex items-center">
            <Typography fontWeight="bold" className="w-44">
              Billing Method
            </Typography>
            <Typography className="mx-2">:</Typography>
            <Typography>{invoiceData?.invoice?.billingMethod}</Typography>
          </div>

          <div className="flex items-center">
            <Typography fontWeight="bold" className="w-44">
              Payment Schedule
            </Typography>
            <Typography className="mx-2">:</Typography>
            <Typography>{invoiceData?.invoice?.paymentSchedule}</Typography>
          </div>
        </div>

        {/* Right Section */}
        <div className="space-y-3 pl-6">
          <div className="flex items-center">
            <Typography fontWeight="bold" className="w-44">
              Total Premium
            </Typography>
            <Typography className="mx-2">:</Typography>
            <Typography>₹ {invoiceData?.invoice?.totalPremium}</Typography>
          </div>

          <div className="flex items-center">
            <Typography fontWeight="bold" className="w-44">
              Status
            </Typography>
            <Typography className="mx-2">:</Typography>
            <Typography>{invoiceData?.invoice?.status}</Typography>
          </div>

          <div className="flex items-center">
            <Typography fontWeight="bold" className="w-44">
              Payment Reference
            </Typography>
            <Typography className="mx-2">:</Typography>
            <Typography>{invoiceData?.invoice?.paymentRef}</Typography>
          </div>

          <div className="flex items-center">
            <Typography fontWeight="bold" className="w-44">
              Policy ID
            </Typography>
            <Typography className="mx-2">:</Typography>
            <Typography>{invoiceData?.invoice?.policyId}</Typography>
          </div>
        </div>
      </Paper>
      <Paper sx={{ mt: 3, border: "1px solid #e9d5ff" }}>
        <TableContainer sx={{ maxHeight: 200 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow sx={{ background: "#f3e8ff" }}>
                <TableCell>
                  <b>Policy Number</b>
                </TableCell>
                <TableCell>
                  <b>Product Type</b>
                </TableCell>
                <TableCell>
                  <b>Effective Date</b>
                </TableCell>
                <TableCell>
                  <b>Expiry Date</b>
                </TableCell>
                <TableCell>
                  <b>Status</b>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                <TableCell>{invoiceData?.invoice?.policyNumber}</TableCell>
                <TableCell>{invoiceData?.invoice?.productType}</TableCell>
                <TableCell>
                  {new Date(
                    invoiceData?.invoice?.effectiveDate
                  ).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(
                    invoiceData?.invoice?.expiryDate
                  ).toLocaleDateString()}
                </TableCell>
                <TableCell>{invoiceData?.invoice?.status}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Paper sx={{ mt: 4, border: "1px solid #e9d5ff" }}>
        <Typography
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            background: "#f3e8ff",
            p: 1,
          }}
        >
          SCHEDULE OF PREMIUM
        </Typography>
        <TableContainer sx={{ maxHeight: 200 }}>
          <Table stickyHeader>
            <TableBody>
              <TableRow>
                <TableCell>Base Premium</TableCell>
                <TableCell align="right">
                  ₹ {invoiceData?.invoice?.totalPremium}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>GST</TableCell>
                <TableCell align="right">
                  ₹ {invoiceData?.invoice?.taxes}
                </TableCell>
              </TableRow>

              <TableRow sx={{ background: "#f9f5ff" }}>
                <TableCell>
                  <b>Total Cost</b>
                </TableCell>
                <TableCell align="right">
                  <b>₹ {invoiceData?.invoice?.totalCost}</b>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Paper sx={{ mt: 4, border: "1px solid #e9d5ff" }}>
        <TableContainer sx={{ maxHeight: 200 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow sx={{ background: "#f3e8ff" }}>
                <TableCell>
                  <b>Coverage</b>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {invoiceData?.invoice?.coverages?.map((c, i) => (
                <TableRow key={i}>
                  <TableCell>{c}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default Invoice;
