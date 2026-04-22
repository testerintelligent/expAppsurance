import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Stack,
  Typography,
  Box,
} from "@mui/material";
import { FaEye } from "react-icons/fa";
import MainCard from "../layout/MainCard";

const BillingDashboard = () => {
  const [randomNumber] = useState(() =>
    Math.floor(100000 + Math.random() * 900000),
  );
  const [insuranceData, setInsuranceData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortedColumn, setSortedColumn] = useState("CurrentDate");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const navigate = useNavigate();

  // Fetch policies data from the API
  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await axios.get(
          "http://10.192.190.158:5000/api/Policies/getPoliciesForDashboard",
        );
        setInsuranceData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error("Error fetching policies:", error);
      }
    };
    fetchPolicies();
  }, []);

  const summary = useMemo(() => {
    if (!insuranceData || insuranceData.length === 0) {
      return null;
    }

    const totals = { totalPolicies: insuranceData.length };

    const byStatus = insuranceData.reduce((acc, p) => {
      const s = (p.status || "").toString();
      acc[s] = (acc[s] || 0) + 1;
      return acc;
    }, {});

    totals["In Force"] = byStatus["In Force"] || byStatus["InForce"] || 0;
    totals.underReview =
      byStatus["Under Review"] ||
      byStatus["UnderReview"] ||
      byStatus["underReview"] ||
      0;
    totals.cancelled = byStatus["Cancelled"] || byStatus["cancelled"] || 0;

    return totals;
  }, [insuranceData]);

  // Utility Functions
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? "Invalid Date"
      : `${String(date.getDate()).padStart(2, "0")}/${String(
          date.getMonth() + 1,
        ).padStart(2, "0")}/${date.getFullYear()}`;
  };

  const generateRandomNumber = () => randomNumber;

  const sortData = (column) => {
    const order = sortOrder === "asc" ? 1 : -1;
    const sorted = [...filteredData].sort((a, b) => {
      const valA = a[column];
      const valB = b[column];
      if (typeof valA === "string" && typeof valB === "string") {
        return valA.localeCompare(valB) * order;
      } else if (typeof valA === "number" && typeof valB === "number") {
        return (valA - valB) * order;
      } else {
        return (new Date(valA) - new Date(valB)) * order;
      }
    });
    setFilteredData(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setSortedColumn(column);
  };

  // Table Column Config
  const columns = useMemo(
    () => [
      { key: "accountNumber", label: "Account Number" },
      { key: "accountHolderName", label: "Account Holder Name" },
      { key: "policyNumber", label: "Policy Number" },
      { key: "policyType", label: "Policy Type" },
      { key: "startDate", label: "Start Date" },
      { key: "endDate", label: "End Date" },
      { key: "status", label: "Status" },
    ],
    [],
  );

  return (
    <div style={{ padding: "14px" }}>
      {/* ✅ Summary Cards */}

      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 230px)"
        justifyContent="start"
        gap={2.5}
        mb={3}
      >
        <MainCard
          border={false}
          content={false}
          bgcolor="#5e35b1"
          background="#4527a0"
        >
          <Box sx={{ p: 1.5 }}>
            <Stack direction="row" sx={{ alignItems: "center" }}>
              <Typography
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: 500,
                  mr: 1,
                  mt: 1.75,
                  mb: 0.75,
                }}
              >
                {summary?.totalPolicies || 0}
              </Typography>
            </Stack>
            <Typography
              sx={{
                mb: 1.25,
                fontSize: "1rem",
                fontWeight: 500,
                color: "#b39ddb",
                float: "left",
              }}
            >
              Total Policies
            </Typography>
          </Box>
        </MainCard>
        <MainCard
          border={false}
          content={false}
          bgcolor="#1e88e5"
          background="#1565c0"
        >
          <Box sx={{ p: 1.5 }}>
            <Stack direction="row" sx={{ alignItems: "center" }}>
              <Typography
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: 500,
                  mr: 1,
                  mt: 1.75,
                  mb: 0.75,
                }}
              >
                {summary?.["In Force"] || 0}
              </Typography>
            </Stack>
            <Typography
              sx={{
                mb: 1.25,
                fontSize: "1rem",
                fontWeight: 500,
                color: "#90caf9",
                float: "left",
              }}
            >
              In Force
            </Typography>
          </Box>
        </MainCard>
        <MainCard
          border={false}
          content={false}
          bgcolor="#f39c12"
          background="#e67e22"
        >
          <Box sx={{ p: 1.5 }}>
            <Stack direction="row" sx={{ alignItems: "center" }}>
              <Typography
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: 500,
                  mr: 1,
                  mt: 1.75,
                  mb: 0.75,
                }}
              >
                {summary?.underReview || 0}
              </Typography>
            </Stack>
            <Typography
              sx={{
                mb: 1.25,
                fontSize: "1rem",
                fontWeight: 500,
                color: "#e67e22",
                float: "left",
              }}
            >
              Under Review
            </Typography>
          </Box>
        </MainCard>
        <MainCard
          border={false}
          content={false}
          bgcolor="#ff7043"
          background="#d84315"
        >
          <Box sx={{ p: 1.5 }}>
            <Stack direction="row" sx={{ alignItems: "center" }}>
              <Typography
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: 500,
                  mr: 1,
                  mt: 1.75,
                  mb: 0.75,
                }}
              >
                {summary?.cancelled || 0}
              </Typography>
            </Stack>
            <Typography
              sx={{
                mb: 1.25,
                fontSize: "1rem",
                fontWeight: 500,
                color: "#d84315",
                float: "left",
                opacity: 0.7,
              }}
            >
              Cancelled
            </Typography>
          </Box>
        </MainCard>
      </Box>
      {/* ✅ Data Table */}

      {filteredData.length > 0 ? (
        <TableContainer
          component={Paper}
          elevation={3}
          style={{ borderRadius: "8px" }}
        >
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: "black" }}>
                <TableCell
                  style={{
                    color: "white",
                    backgroundColor: "#4527a0",
                    fontWeight: "bold",
                    padding: "12px",
                    textAlign: "center",
                  }}
                >
                  View
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
                    {sortedColumn === col.key &&
                      (sortOrder === "asc" ? "↑" : "↓")}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((insurance, index) => {
                  return (
                    <TableRow
                      key={insurance._id || index}
                      style={{
                        backgroundColor:
                          index % 2 === 0 ? "#ecf0f1" : "#ffffff",
                      }}
                    >
                      <TableCell
                        style={{ padding: "12px", textAlign: "center" }}
                      >
                        {insurance.policyNumber ? (
                          <VisibilityIcon
                            color="primary"
                            onClick={() =>
                              navigate(
                                `/policy-summary/${insurance.policyNumber}`,
                                { state: { policy: insurance } },
                              )
                            }
                            style={{ cursor: "pointer" }} // optional: makes it clickable
                          />
                        ) : (
                          <VisibilityIcon
                            color="primary"
                            disabled
                            title="Policy number not available"
                            style={{ opacity: 0.6, cursor: "not-allowed" }} // optional: makes it clickable
                          />
                        )}
                      </TableCell>
                      <TableCell
                        style={{ padding: "12px", textAlign: "center" }}
                      >
                        {insurance.accountNumber || "N/A"}
                      </TableCell>
                      <TableCell
                        style={{ padding: "12px", textAlign: "center" }}
                      >
                        {insurance?.accountHolderName || "N/A"}
                      </TableCell>
                      <TableCell
                        style={{ padding: "12px", textAlign: "center" }}
                      >
                        {insurance.policyNumber || generateRandomNumber()}
                      </TableCell>
                      <TableCell
                        style={{ padding: "12px", textAlign: "center" }}
                      >
                        {insurance.policyType}
                      </TableCell>
                      <TableCell
                        style={{ padding: "12px", textAlign: "center" }}
                      >
                        {formatDate(insurance.startDate)}
                      </TableCell>
                      <TableCell
                        style={{ padding: "12px", textAlign: "center" }}
                      >
                        {formatDate(insurance.endDate)}
                      </TableCell>
                      <TableCell
                        style={{ padding: "12px", textAlign: "center" }}
                      >
                        {insurance.status}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(_, newPage) => setPage(newPage)}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
            style={{ borderTop: "1px solid #ddd" }}
          />
        </TableContainer>
      ) : (
        <p style={{ textAlign: "center", color: "#7f8c8d", fontSize: "18px" }}>
          No policy data available
        </p>
      )}
    </div>
  );
};

export default BillingDashboard;
