import { Button } from "@mui/material";
import axios from "axios";

const Invoice = () => {
  const API_BASE_URL = "http://localhost:5000/api/billing";
  const handleClick = async () => {
    try {
      const res = await axios.post(`${API_BASE_URL}/createInvoice`, {
        totalCost: 1200,
        policyNumber: 10,
        productType: "Auto",
        effectiveDate: "2026-01-28T00:00:00.000Z",
        expiryDate: "2027-01-28T00:00:00.000Z",
        totalPremium: 2850,
        status: "Pending",
      });

      console.log("invoice", res.data);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  };
  return (
    <div>
      <Button onClick={handleClick}>CREATE INVOICE </Button>
    </div>
  );
};

export default Invoice;
