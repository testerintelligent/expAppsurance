import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Button,
  Typography,
  Chip,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const api = axios.create({
  baseURL:
    process.env.REACT_APP_API_URL || "http://localhost:5000/api",
});

export default function ClaimsList() {
  const [claims, setClaims] = useState([]);
  const [page, setPage] = useState(0); // MUI starts from 0
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [orderBy, setOrderBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await api.get("/claims/list", {
        params: {
          page: page + 1,
          limit: rowsPerPage,
          sortBy: orderBy,
          order,
        },
      });

      setClaims(res.data.claims || []);
      setTotal(res.data.total || 0);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage, orderBy, order]);

  // Sorting handler
  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const columns = [
    { id: "claimNumber", label: "Claim ID" },
    { id: "policyNumber", label: "Policy ID" },
    { id: "insured", label: "Insured" },
    { id: "lossDate", label: "Date of Loss" },
    { id: "status", label: "Status" },
  ];

  return (
    <Box p={4} sx={{ backgroundColor: "#f5f7fa", minHeight: "100vh" }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" fontWeight={600} color="black">
          Claims
        </Typography>

        <Box>
          <Button variant="outlined" sx={{ mr: 2 }} onClick={fetchData}>
            Refresh
          </Button>
          <Button
            variant="contained"
            onClick={() => navigate("/claims/create")}
          >
            Create Claim
          </Button>
        </Box>
      </Box>

      {/* Table */}
      <Paper elevation={3} sx={{ borderRadius: 3 }}>
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    sx={{ fontWeight: 700, backgroundColor: "#f4f6f8" }}                >
                    
                      <TableSortLabel
                        active={orderBy === column.id}
                        direction={orderBy === column.id ? order : "asc"}
                        onClick={() => handleSort(column.id)}
                      >
                        {column.label}
                      </TableSortLabel>                  
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {claims.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                    <Typography color="text.secondary">
                      No claims found.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                claims.map((c, index) => (
                  <TableRow
                    key={c._id}
                    hover                   
                  >
                    <TableCell
                     sx={{                      
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      navigate(`/Claim/summary/${c.claimNumber}`)
                    }>
                      <Typography color="primary">
                        {c.claimNumber}
                      </Typography>
                    </TableCell>
                    <TableCell>{c.policyNumber}</TableCell>
                    <TableCell>{c.insured?.name}</TableCell>
                    <TableCell>
                      {new Date(c.lossDate).toLocaleDateString("en-GB")}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={c.status}
                        size="small"
                        sx={{
                          fontWeight: 600,
                          borderRadius: "8px",
                        }}
                        color={
                          c.status === "Open"
                            ? "success"
                            : c.status === "Closed"
                            ? "error"
                            : c.status === "Draft"
                            ? "warning"
                            : "default"
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          component="div"
          count={total}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          rowsPerPageOptions={[5, 10, 25, 50]}
        />
      </Paper>
    </Box>
  );
}