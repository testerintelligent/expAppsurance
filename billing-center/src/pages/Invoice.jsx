import { Button, Typography } from "@mui/material";
import axios from "axios";

const Invoice = () => {
  return (
    <Box sx={{ maxWidth: 1250, mx: "auto", py: 4 }}>
      <Typography>Hello Invoice</Typography>
      {/* <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          background: "#eaf4ff",
          borderRadius: 2,
          border: "1px solid #d0e4ff",
          fontSize: "14px",
        }}
      >
        <Typography>
          <b>Submission:</b> {submissionId}
        </Typography>
        <Typography>
          <b>Account:</b> {accountNumber}
        </Typography>
        <Typography>
          <b>Policyholder:</b> {policyHolder}
        </Typography>
        <Typography>
          <b>Effective Date:</b> {effectiveDate}
        </Typography>
      </Paper> */}
    </Box>
  );
};

export default Invoice;

// const API_BASE_URL = "http://localhost:5000/api/billing";
// const handleClick = async () => {
//   try {
//     const res = await axios.post(`${API_BASE_URL}/createInvoice`, {
//       totalCost: 1200,
//       policyNumber: 10,
//       productType: "Auto",
//       effectiveDate: "2026-01-28T00:00:00.000Z",
//       expiryDate: "2027-01-28T00:00:00.000Z",
//       totalPremium: 2850,
//       status: "Pending",
//     });

//     console.log("invoice", res.data);
//   } catch (error) {
//     console.error("Error:", error.response?.data || error.message);
//   }
// };
