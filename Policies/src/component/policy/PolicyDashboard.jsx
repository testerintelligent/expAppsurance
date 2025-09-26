import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TablePagination,
} from "@mui/material";
import { FaEdit, FaEye } from "react-icons/fa";

const PolicyDashboard = () => {
  const [insuranceData, setInsuranceData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [contactData, setContactData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [policyToDelete, setPolicyToDelete] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortedColumn, setSortedColumn] = useState("CurrentDate");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [summary, setSummary] = useState(null);

  const navigate = useNavigate();

  // ✅ Fetch data once
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [policyRes, summaryRes, contactRes] = await Promise.all([
          axios.get("http://10.192.190.158:5000/getPolicy"),
          axios.get("http://10.192.190.158:5000/getPolicySummary"),
          axios.get("http://10.192.190.158:5000/getContact"),
        ]);

        setInsuranceData(policyRes.data);
        setFilteredData(policyRes.data);
        setSummary(summaryRes.data);

        const contacts = Array.isArray(contactRes.data)
          ? contactRes.data
          : contactRes.data?.contacts || [];
        setContactData(contacts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Utility Functions
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? "Invalid Date"
      : `${String(date.getDate()).padStart(2, "0")}/${String(
          date.getMonth() + 1
        ).padStart(2, "0")}/${date.getFullYear()}`;
  };

  const generateRandomNumber = () =>
    Math.floor(100000 + Math.random() * 900000);

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

  const updatePolicy = (insurance, method) =>
    navigate("/insurance", { state: { formData: insurance, apiMethod: method } });

  const handleDelete = () => {
    setInsuranceData((prev) =>
      prev.filter((insurance) => insurance._id !== policyToDelete)
    );
    setFilteredData((prev) =>
      prev.filter((insurance) => insurance._id !== policyToDelete)
    );
    setShowModal(false);
  };

  //Table Column Config
  const columns = useMemo(
    () => [
      { key: "customerId", label: "CUSTOMER ID" },
      { key: "startDate", label: "START DATE" },
      { key: "endDate", label: "END DATE" },
      { key: "policyNumber", label: "POLICY NUMBER" },
      { key: "policyType", label: "POLICY TYPE" },
      { key: "coverageDetails", label: "COVERAGE" },
      { key: "sumInsured", label: "SUM INSURED" },
      { key: "premium", label: "PREMIUM" },
      { key: "status", label: "STATUS" },
    ],
    []
  );

  return (
    <div style={{ padding: "20px" }}>
      {/* ✅ Summary Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "24px",
          marginBottom: "32px",
        }}
      >
        {[
          {
            label: "Total Policies",
            value: summary?.totalPolicies || 0,
            bg: "linear-gradient(135deg, #34495e 60%, #2c3e50 100%)",
            icon: "📄",
          },
          {
            label: "In Force",
            value: summary?.["In Force"] || 0,
            bg: "linear-gradient(135deg, #27ae60 60%, #219150 100%)",
            icon: "✅",
          },
          {
            label: "Under Review",
            value: summary?.underReview || 0,
            bg: "linear-gradient(135deg, #f39c12 60%, #e67e22 100%)",
            icon: "🕵️‍♂️",
          },
          {
            label: "Cancelled",
            value: summary?.cancelled || 0,
            bg: "linear-gradient(135deg, #e74c3c 60%, #c0392b 100%)",
            icon: "❌",
          },
        ].map(({ label, value, bg, icon }, idx) => (
          <Paper
            key={idx}
            elevation={4}
            style={{
              padding: "28px 20px",
              borderRadius: "18px",
              background: bg,
              color: "white",
              textAlign: "center",
              boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
            }}
          >
            <span style={{ fontSize: "2.2rem" }}>{icon}</span>
            <div style={{ fontWeight: "bold", fontSize: "1.1rem" }}>{label}</div>
            <div style={{ fontSize: "2.1rem", fontWeight: "bold" }}>{value}</div>
          </Paper>
        ))}
      </div>

      {/* ✅ Data Table */}
      {filteredData.length > 0 && contactData.length > 0 ? (
        <TableContainer component={Paper} elevation={3} style={{ borderRadius: "8px" }}>
  <Table>
    <TableHead>
      <TableRow style={{ backgroundColor: "black" }}>
        {columns.map((col) => (
          <TableCell
            key={col.key}
            style={{
              color: "white",
              backgroundColor: "black",
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
        <TableCell
          style={{
            color: "white",
            backgroundColor: "black",
            fontWeight: "bold",
            padding: "12px",
            textAlign: "center",
          }}
        >
          UPDATE
        </TableCell>
        <TableCell
          style={{
            color: "white",
            backgroundColor: "black",
            fontWeight: "bold",
            padding: "12px",
            textAlign: "center",
          }}
        >
          VIEW
        </TableCell>
      </TableRow>
    </TableHead>

    <TableBody>
      {filteredData
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((insurance, index) => {
          const customer = contactData.find(
            (c) => c._id === insurance.customerId
          );
          return (
            <TableRow
              key={insurance._id || index}
              style={{
                backgroundColor: index % 2 === 0 ? "#ecf0f1" : "#ffffff",
              }}
            >
              <TableCell style={{ padding: "12px", textAlign: "center" }}>
                {customer?.customerId || "N/A"}
              </TableCell>
              <TableCell style={{ padding: "12px", textAlign: "center" }}>
                {formatDate(insurance.startDate)}
              </TableCell>
              <TableCell style={{ padding: "12px", textAlign: "center" }}>
                {formatDate(insurance.endDate)}
              </TableCell>
              <TableCell style={{ padding: "12px", textAlign: "center" }}>
                {insurance.policyNumber || generateRandomNumber()}
              </TableCell>
              <TableCell style={{ padding: "12px", textAlign: "center" }}>
                {insurance.policyType}
              </TableCell>
              <TableCell style={{ padding: "12px", textAlign: "center" }}>
                {insurance.coverageDetails}
              </TableCell>
              <TableCell style={{ padding: "12px", textAlign: "center" }}>
                {insurance.sumInsured}
              </TableCell>
              <TableCell style={{ padding: "12px", textAlign: "center" }}>
                {insurance.premium}
              </TableCell>
              <TableCell style={{ padding: "12px", textAlign: "center" }}>
                {insurance.status}
              </TableCell>
              <TableCell style={{ textAlign: "center" }}>
                <button
                  onClick={() => updatePolicy(insurance, "update")}
                  style={{ textTransform: "none" }}
                >
                  <FaEdit size="25px" />
                </button>
              </TableCell>
              <TableCell style={{ padding: "12px", textAlign: "center" }}>
                <button
                  onClick={() => updatePolicy(insurance, "view")}
                  style={{ textTransform: "none", borderRadius: "5px" }}
                >
                  <FaEye size="25px" />
                </button>
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
          No insurance data available
        </p>
      )}

      {/* ✅ Delete Confirmation Modal */}
      <Dialog open={showModal} onClose={() => setShowModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle style={{ backgroundColor: "#2c3e50", color: "white" }}>
          Delete Policy
        </DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this insurance policy?</p>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDelete}
            variant="contained"
            style={{ backgroundColor: "#e74c3c" }}
          >
            Yes
          </Button>
          <Button
            onClick={() => setShowModal(false)}
            variant="outlined"
            style={{ borderColor: "#95a5a6", color: "#95a5a6" }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PolicyDashboard;
