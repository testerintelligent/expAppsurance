import {
  Typography,
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";

const Invoice = () => {
  const [invoiceData, setInvoiceData] = useState({});
  const [policyData, setPolicyData] = useState({});
  const [paymentSchedule, setPaymentSchedule] = useState("Yearly");
  const [totalTax, setTotalTax] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  // const API_BASE_URL = "http://10.192.190.158:5000/api/billing";
  const API_BASE_URL = "http://10.192.190.158:5000";

  const { policyNumber } = useParams(); // ✅ get from URL

  // useEffect(() => {
  //   const getInvoice = async () => {
  //     try {
  //       const res = await axios.get(
  //         `${API_BASE_URL}/getInvoiceByPolicyNumber/${policyNumber}`
  //       );
  //       setInvoiceData(res.data);
  //       console.log("invoice", res.data);
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };

  //   if (policyNumber) {
  //     getInvoice();
  //   }
  // }, [policyNumber]);


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
      // ✅ Bill Date based on schedule gap
      const billDate = new Date(effectiveDate);
      billDate.setMonth(billDate.getMonth() + (monthGap * (i + 1)));

      // Due Date (+3 days)
      const dueDate = new Date(billDate);
      dueDate.setDate(dueDate.getDate() + 3);

      // ✅ Status Logic
      let status = "Planned";
      if (currentDate > dueDate) status = "Overdue";
      else if (currentDate >= billDate) status = "Billed";

      return {
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
    // <Box sx={{ maxWidth: 1250, mx: "auto", p: 4 }}>
    //   <Paper
    //     elevation={0}
    //     sx={{
    //       p: 2,
    //       mb: 4,
    //       background: "#e1bee7",
    //       borderRadius: 2,
    //       border: "1px solid #d0e4ff",
    //       fontSize: "14px",
    //       textAlign: "center",
    //     }}
    //   >
    //     <Typography variant="h6">ABC General Insurance Ltd.</Typography>
    //     <Typography>
    //       No 12 Mount Road, Chennai. GSTIN:33ABCDE1234F1Z5
    //     </Typography>
    //     <Typography>Phone: 044-12345678</Typography>
    //   </Paper>

    //   <Paper
    //     className="grid grid-cols-2 gap-8"
    //     sx={{
    //       p: 3,
    //       background: "#f5f0ff", // light purple background
    //       borderRadius: 2,
    //       border: "1px solid #d6ccff", // light purple border
    //     }}
    //   >
    //     {/* Left Section */}
    //     <div className="space-y-3 border-r pr-6 border-purple-200">
    //       <div className="flex items-center">
    //         <Typography fontWeight="bold" className="w-44">
    //           Policy Number
    //         </Typography>
    //         <Typography className="mx-2">:</Typography>
    //         <Typography>{invoiceData?.invoice?.policyNumber}</Typography>
    //       </div>

    //       <div className="flex items-center">
    //         <Typography fontWeight="bold" className="w-44">
    //           Product Type
    //         </Typography>
    //         <Typography className="mx-2">:</Typography>
    //         <Typography>{invoiceData?.invoice?.productType}</Typography>
    //       </div>

    //       <div className="flex items-center">
    //         <Typography fontWeight="bold" className="w-44">
    //           Billing Method
    //         </Typography>
    //         <Typography className="mx-2">:</Typography>
    //         <Typography>{invoiceData?.invoice?.billingMethod}</Typography>
    //       </div>

    //       <div className="flex items-center">
    //         <Typography fontWeight="bold" className="w-44">
    //           Payment Schedule
    //         </Typography>
    //         <Typography className="mx-2">:</Typography>
    //         <Typography>{invoiceData?.invoice?.paymentSchedule}</Typography>
    //       </div>
    //     </div>

    //     {/* Right Section */}
    //     <div className="space-y-3 pl-6">
    //       <div className="flex items-center">
    //         <Typography fontWeight="bold" className="w-44">
    //           Total Premium
    //         </Typography>
    //         <Typography className="mx-2">:</Typography>
    //         <Typography>₹ {invoiceData?.invoice?.totalPremium}</Typography>
    //       </div>

    //       <div className="flex items-center">
    //         <Typography fontWeight="bold" className="w-44">
    //           Status
    //         </Typography>
    //         <Typography className="mx-2">:</Typography>
    //         <Typography>{invoiceData?.invoice?.status}</Typography>
    //       </div>

    //       <div className="flex items-center">
    //         <Typography fontWeight="bold" className="w-44">
    //           Payment Reference
    //         </Typography>
    //         <Typography className="mx-2">:</Typography>
    //         <Typography>{invoiceData?.invoice?.paymentRef}</Typography>
    //       </div>

    //       <div className="flex items-center">
    //         <Typography fontWeight="bold" className="w-44">
    //           Policy ID
    //         </Typography>
    //         <Typography className="mx-2">:</Typography>
    //         <Typography>{invoiceData?.invoice?.policyId}</Typography>
    //       </div>
    //     </div>
    //   </Paper>
    //   <Paper sx={{ mt: 3, border: "1px solid #e9d5ff" }}>
    //     <TableContainer sx={{ maxHeight: 200 }}>
    //       <Table stickyHeader>
    //         <TableHead>
    //           <TableRow sx={{ background: "#f3e8ff" }}>
    //             <TableCell>
    //               <b>Policy Number</b>
    //             </TableCell>
    //             <TableCell>
    //               <b>Product Type</b>
    //             </TableCell>
    //             <TableCell>
    //               <b>Effective Date</b>
    //             </TableCell>
    //             <TableCell>
    //               <b>Expiry Date</b>
    //             </TableCell>
    //             <TableCell>
    //               <b>Status</b>
    //             </TableCell>
    //           </TableRow>
    //         </TableHead>

    //         <TableBody>
    //           <TableRow>
    //             <TableCell>{invoiceData?.invoice?.policyNumber}</TableCell>
    //             <TableCell>{invoiceData?.invoice?.productType}</TableCell>
    //             <TableCell>
    //               {new Date(
    //                 invoiceData?.invoice?.effectiveDate
    //               ).toLocaleDateString()}
    //             </TableCell>
    //             <TableCell>
    //               {new Date(
    //                 invoiceData?.invoice?.expiryDate
    //               ).toLocaleDateString()}
    //             </TableCell>
    //             <TableCell>{invoiceData?.invoice?.status}</TableCell>
    //           </TableRow>
    //         </TableBody>
    //       </Table>
    //     </TableContainer>
    //   </Paper>
    //   <Paper sx={{ mt: 4, border: "1px solid #e9d5ff" }}>
    //     <Typography
    //       sx={{
    //         textAlign: "center",
    //         fontWeight: "bold",
    //         background: "#f3e8ff",
    //         p: 1,
    //       }}
    //     >
    //       SCHEDULE OF PREMIUM
    //     </Typography>
    //     <TableContainer sx={{ maxHeight: 200 }}>
    //       <Table stickyHeader>
    //         <TableBody>
    //           <TableRow>
    //             <TableCell>Base Premium</TableCell>
    //             <TableCell align="right">
    //               ₹ {invoiceData?.invoice?.totalPremium}
    //             </TableCell>
    //           </TableRow>

    //           <TableRow>
    //             <TableCell>GST</TableCell>
    //             <TableCell align="right">
    //               ₹ {invoiceData?.invoice?.taxes}
    //             </TableCell>
    //           </TableRow>

    //           <TableRow sx={{ background: "#f9f5ff" }}>
    //             <TableCell>
    //               <b>Total Cost</b>
    //             </TableCell>
    //             <TableCell align="right">
    //               <b>₹ {invoiceData?.invoice?.totalCost}</b>
    //             </TableCell>
    //           </TableRow>
    //         </TableBody>
    //       </Table>
    //     </TableContainer>
    //   </Paper>
    //   <Paper sx={{ mt: 4, border: "1px solid #e9d5ff" }}>
    //     <TableContainer sx={{ maxHeight: 200 }}>
    //       <Table stickyHeader>
    //         <TableHead>
    //           <TableRow sx={{ background: "#f3e8ff" }}>
    //             <TableCell>
    //               <b>Coverage</b>
    //             </TableCell>
    //           </TableRow>
    //         </TableHead>

    //         <TableBody>
    //           {invoiceData?.invoice?.coverages?.map((c, i) => (
    //             <TableRow key={i}>
    //               <TableCell>{c}</TableCell>
    //             </TableRow>
    //           ))}
    //         </TableBody>
    //       </Table>
    //     </TableContainer>
    //   </Paper>
    // </Box>
    <div style={{ padding: "20px" }}>
      <TableContainer component={Paper} elevation={3} style={{ borderRadius: "8px" }}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "black" }}>
              <TableCell
                sx={{
                  color: "white",
                  backgroundColor: "#4527a0",
                  fontWeight: 700,
                  padding: "12px",
                  textAlign: "center",
                }}
              >
                Pay
              </TableCell>
              {columns.map((col) => (
                <TableCell
                  key={col.key}
                  style={{
                    color: "white",
                    backgroundColor: "#4527a0",
                    fontWeight: "bold",
                    cursor: "pointer",
                    padding: "12px",
                    textAlign: "center",
                  }}
                  onClick={() => sortData(col.key)}
                >
                  {col.label}{" "}
                </TableCell>
              ))}


            </TableRow>
          </TableHead>

          <TableBody>

            {getScheduleRows().map((row) => (
              <TableRow key={row.period}>
                <TableCell sx={{ textAlign: "center", padding: "12px" }}>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleSearch(policy.policyNumber)}
                    sx={{
                      backgroundColor: "#1565c0",
                      fontWeight: 600,
                      "&:hover": {
                        backgroundColor: "#1e88e5",
                      },
                    }}
                  >
                    Pay
                  </Button>
                </TableCell>
                <TableCell style={{ padding: "12px", textAlign: "center" }}>{row.billDate}</TableCell>
                <TableCell style={{ padding: "12px", textAlign: "center" }}>{row.dueDate}</TableCell>
                <TableCell style={{ padding: "12px", textAlign: "center" }}>{row.invoiceNumber}</TableCell>
                <TableCell style={{ padding: "12px", textAlign: "center" }}>{policyData?.paymentSchedule}</TableCell>
                <TableCell style={{ padding: "12px", textAlign: "center" }}>{row.status}</TableCell>
                <TableCell style={{ padding: "12px", textAlign: "center" }}>{row.total}</TableCell>
              </TableRow>
            ))}


          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Invoice;
