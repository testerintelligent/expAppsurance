import React, { useEffect, useState } from "react";
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
// import "../style/Dashboard.css";

const PolicyDashboard = ({ policies }) => {
  const [insuranceData, setInsuranceData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [contactData, setContactData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [policyToDelete, setPolicyToDelete] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc"); // 'asc' or 'desc'
  const [sortedColumn, setSortedColumn] = useState("CurrentDate"); // The column to sort by initially
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const sessionKey = sessionStorage.getItem('sessionKey');
  //   if (!sessionKey) {
  //     navigate('/insurance');
  //   }
  // }, [navigate]);

  useEffect(() => {
    axios.get("http://10.192.190.148:5000/getPolicy").then((response) => {
      console.log("Response:", response.data);
      setInsuranceData(response.data);
      setFilteredData(response.data);
      console.log("response.data", response.data);
    });
    axios
      .get("http://10.192.190.148:5000/getContact")
      .then((response) => {
        const data = response.data;
        if (Array.isArray(data)) {
          setContactData(data);
        } else if (data && Array.isArray(data.contacts)) {
          setContactData(response.data.contacts);
        } else {
          console.error("Unexpected response structure:", data);
          setContactData([]);
        }
        console.log("contactData", response.data.contacts);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const CustomerIdCell = ({ insurance, contactData }) => {
    const [customerId, setCustomerId] = useState("Loading...");

    useEffect(() => {
      if (contactData && insurance) {
        const contact = contactData.find(
          (item) => item._id === insurance.customerId
        );
        if (contact && contact.customerId) {
          setCustomerId(contact.customerId);
        } else {
          setCustomerId("N/A");
        }
      }
    }, [insurance, contactData]);

    return (
      <TableCell style={{ padding: "12px", textAlign: "center" }}>
        {customerId}
      </TableCell>
    );
  };

  const openModal = (id) => {
    setPolicyToDelete(id);
    setShowModal(true);
  };
  const updatePolicy = (insurance, method) => {
    navigate("/insurance", {
      state: { formData: insurance, apiMethod: method },
    });
  };

  const handleDelete = async () => {
    try {
      //await axios.delete(`http://10.192.190.148:5000/deletePolicy/${policyToDelete}`);
      setInsuranceData(
        insuranceData.filter((insurance) => insurance._id !== policyToDelete)
      );
      setFilteredData(
        filteredData.filter((insurance) => insurance._id !== policyToDelete)
      );
    } catch (error) {
      console.error("Error deleting policy:", error);
      alert("Failed to delete the policy. Please try again.");
    } finally {
      setShowModal(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  function generateRandomNumber() {
    return Math.floor(100000 + Math.random() * 900000);
  }

  // Sorting function
  const sortData = (column) => {
    const order = sortOrder === "asc" ? 1 : -1;
    const sorted = [...filteredData].sort((a, b) => {
      if (typeof a[column] === "string") {
        return (
          a[column].toLowerCase().localeCompare(b[column].toLowerCase()) * order
        );
      } else if (typeof a[column] === "number") {
        return (a[column] - b[column]) * order;
      } else if (a[column] instanceof Date) {
        return (new Date(a[column]) - new Date(b[column])) * order;
      }
      return 0;
    });
    setFilteredData(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc"); 
    setSortedColumn(column); 
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="dashboard-content" style={{ padding: "20px" }}>
      {filteredData.length > 0 ? (
        <TableContainer
          component={Paper}
          elevation={3}
          style={{ borderRadius: "8px" }}
        >
          <Table aria-label="insurance-table">
            <TableHead style={{ backgroundColor: "black" }}>
              <TableRow style={{ borderColor: "black" }}>
                <TableCell
                  sx={{
                    color: "white",
                    backgroundColor: "black",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                  onClick={() => sortData("Name")}
                  style={{ padding: "12px", textAlign: "center" }}
                >
                  CUSTOMER ID{" "}
                  {sortedColumn === "Name" && (sortOrder === "asc" ? "↑" : "↓")}
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    backgroundColor: "black",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                  onClick={() => sortData("CurrentDate")}
                  style={{ padding: "12px", textAlign: "center" }}
                >
                  START DATE{" "}
                  {sortedColumn === "CurrentDate" &&
                    (sortOrder === "asc" ? "↑" : "↓")}
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    backgroundColor: "black",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                  onClick={() => sortData("CurrentDate")}
                  style={{ padding: "12px", textAlign: "center" }}
                >
                  END DATE{" "}
                  {sortedColumn === "CurrentDate" &&
                    (sortOrder === "asc" ? "↑" : "↓")}
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    backgroundColor: "black",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                  onClick={() => sortData("policyNumber")}
                  style={{ padding: "12px", textAlign: "center" }}
                >
                  POLICY NUMBER{" "}
                  {sortedColumn === "policyNumber" &&
                    (sortOrder === "asc" ? "↑" : "↓")}
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    backgroundColor: "black",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                  onClick={() => sortData("PolicyType")}
                  style={{ padding: "12px", textAlign: "center" }}
                >
                  POLICY TYPE{" "}
                  {sortedColumn === "PolicyType" &&
                    (sortOrder === "asc" ? "↑" : "↓")}
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    backgroundColor: "black",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                  onClick={() => sortData("PolicyType")}
                  style={{ padding: "12px", textAlign: "center" }}
                >
                  COVERAGE{" "}
                  {sortedColumn === "Coverage" &&
                    (sortOrder === "asc" ? "↑" : "↓")}
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    backgroundColor: "black",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                  onClick={() => sortData("SumInsured")}
                  style={{ padding: "12px", textAlign: "center" }}
                >
                  SUM INSURED{" "}
                  {sortedColumn === "SumInsured" &&
                    (sortOrder === "asc" ? "↑" : "↓")}
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    backgroundColor: "black",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                  onClick={() => sortData("Premium")}
                  style={{ padding: "12px", textAlign: "center" }}
                >
                  PREMIUM{" "}
                  {sortedColumn === "Premium" &&
                    (sortOrder === "asc" ? "↑" : "↓")}
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    backgroundColor: "black",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                  onClick={() => sortData("Premium")}
                  style={{ padding: "12px", textAlign: "center" }}
                >
                  STATUS{" "}
                  {sortedColumn === "Premium" &&
                    (sortOrder === "asc" ? "↑" : "↓")}
                </TableCell>
                {/* <TableCell 
                sx={{ color: 'white',backgroundColor:'black', fontWeight: 'bold' }} 
                style={{ padding: '12px', textAlign: 'center' }}
              >
                DELETE
              </TableCell> */}
                <TableCell
                  sx={{
                    color: "white",
                    backgroundColor: "black",
                    fontWeight: "bold",
                  }}
                  style={{ padding: "12px", textAlign: "center" }}
                >
                  UPDATE
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    backgroundColor: "black",
                    fontWeight: "bold",
                  }}
                  style={{ padding: "12px", textAlign: "center" }}
                >
                  VIEW
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData && contactData ? (
                filteredData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((insurance, index) => (
                    <TableRow
                      key={index}
                      style={{
                        backgroundColor:
                          index % 2 === 0 ? "#ecf0f1" : "#ffffff",
                      }}
                    >
                      <CustomerIdCell
                        insurance={insurance}
                        contactData={contactData}
                      />
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
                        {insurance.coverageDetails}
                      </TableCell>
                      <TableCell
                        style={{ padding: "12px", textAlign: "center" }}
                      >
                        {insurance.sumInsured}
                      </TableCell>
                      <TableCell
                        style={{ padding: "12px", textAlign: "center" }}
                      >
                        {insurance.premium}
                      </TableCell>
                      <TableCell
                        style={{ padding: "12px", textAlign: "center" }}
                      >
                        {insurance.status}
                      </TableCell>
                      {/* <TableCell style={{ padding: '12px', textAlign: 'center' }}>
                  <Button 
                    variant="contained" 
                    color="error"
                    onClick={() => openModal(insurance.customerId)} 
                    style={{ textTransform: 'none', borderRadius: '5px' }}
                  >
                    Delete
                  </Button>
                </TableCell> */}
                      <TableCell style={{ textAlign: "center" }}>
                        <button
                          variant="contained"
                          onClick={() => updatePolicy(insurance, "update")}
                          style={{ textTransform: "none" }}
                        >
                          <FaEdit />
                        </button>
                      </TableCell>
                      <TableCell
                        style={{ padding: "12px", textAlign: "center" }}
                      >
                        <button
                          variant="contained"
                          color="success"
                          onClick={() => updatePolicy(insurance, "view")}
                          style={{ textTransform: "none", borderRadius: "5px" }}
                        >
                          <FaEye />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <div>Loading...</div>
              )}
            </TableBody>
          </Table>
          <div className="float-end">
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              style={{ borderTop: "1px solid #ddd" }}
            />
          </div>
        </TableContainer>
      ) : (
        <p style={{ textAlign: "center", color: "#7f8c8d", fontSize: "18px" }}>
          No insurance data available
        </p>
      )}

      <Dialog
        open={showModal}
        onClose={() => setShowModal(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle style={{ backgroundColor: "#2c3e50", color: "white" }}>
          Delete Policy
        </DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this insurance policy?</p>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDelete}
            color="primary"
            variant="contained"
            style={{ backgroundColor: "#e74c3c" }}
          >
            Yes
          </Button>
          <Button
            onClick={() => setShowModal(false)}
            color="secondary"
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
