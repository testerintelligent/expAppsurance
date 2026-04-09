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

const PaymentSchedule = () => {
    const [policyData, setPolicyData] = useState({});
    const [paymentSchedule, setPaymentSchedule] = useState("Yearly");
    const [totalTax, setTotalTax] = useState(0);
    const [totalCost, setTotalCost] = useState(0);
    const API_BASE_URL = "http://10.192.190.158:5000";

    const { policyNumber } = useParams(); // ✅ get from URL

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
        <Box sx={{ maxWidth: 1250, mx: "auto", p: 4 }}>

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
                        <Typography>{policyData?.policyNumber}</Typography>
                    </div>

                    <div className="flex items-center">
                        <Typography fontWeight="bold" className="w-44">
                            Product Type
                        </Typography>
                        <Typography className="mx-2">:</Typography>
                        <Typography>{policyData?.productType}</Typography>
                    </div>

                    <div className="flex items-center">
                        <Typography fontWeight="bold" className="w-44">
                            Billing Method
                        </Typography>
                        <Typography className="mx-2">:</Typography>
                        <Typography>{policyData?.billingMethod}</Typography>
                    </div>

                    <div className="flex items-center">
                        <Typography fontWeight="bold" className="w-44">
                            Payment Schedule
                        </Typography>
                        <Typography className="mx-2">:</Typography>
                        <Typography>{policyData?.paymentSchedule}</Typography>
                    </div>
                </div>

                {/* Right Section */}
                <div className="space-y-3 pl-6">
                    <div className="flex items-center">
                        <Typography fontWeight="bold" className="w-44">
                            Total Premium
                        </Typography>
                        <Typography className="mx-2">:</Typography>
                        <Typography>₹ {(policyData?.totalPremium).toFixed(2)}</Typography>
                    </div>

                    <div className="flex items-center">
                        <Typography fontWeight="bold" className="w-44">
                            Status
                        </Typography>
                        <Typography className="mx-2">:</Typography>
                        <Typography>{policyData?.status}</Typography>
                    </div>

                    <div className="flex items-center">
                        <Typography fontWeight="bold" className="w-44">
                            Payment Reference
                        </Typography>
                        <Typography className="mx-2">:</Typography>
                        <Typography>{policyData?.paymentRef}</Typography>
                    </div>

                    <div className="flex items-center">
                        <Typography fontWeight="bold" className="w-44">
                            Policy ID
                        </Typography>
                        <Typography className="mx-2">:</Typography>
                        <Typography>{policyData?.policyId}</Typography>
                    </div>
                </div>
            </Paper>
            {/* PAYMENT SCHEDULE TABLE */}
            <Paper sx={{ mt: 3, border: "1px solid #e9d5ff" }}>
                <Box
                    sx={{
                        p: 4,
                        background: "#ffffff",
                        border: "1px solid #e0e0e0",
                    }}
                >
                    <Typography
                        variant="h6"
                        fontWeight={700}
                        sx={{ mb: 2, borderLeft: "4px solid #2e7d32", pl: 1.5 }}
                    >
                        Payment Schedule
                    </Typography>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ background: "#f5f5f5" }}>
                                <TableCell>Period</TableCell>
                                <TableCell>Premium (₹)</TableCell>
                                <TableCell>Taxes (₹)</TableCell>
                                <TableCell>Total (₹)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {getScheduleRows().map((row) => (
                                <TableRow key={row.period}>
                                    <TableCell>{row.period}</TableCell>
                                    <TableCell>{row.premium}</TableCell>
                                    <TableCell>{row.taxes}</TableCell>
                                    <TableCell>{row.total}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <Box
                        sx={{
                            mt: 3,
                            p: 2,
                            textAlign: "center",
                            background: "#e8f5e9",
                            borderRadius: 2,
                        }}
                    >
                        <Typography variant="h6">
                            Total Amount Payable:{" "}
                            <strong style={{ color: "#2e7d32" }}>
                                ₹{totalCost.toLocaleString("en-IN")}
                            </strong>
                        </Typography>
                    </Box>
                </Box>
            </Paper>

        </Box>
    );
};

export default PaymentSchedule;
