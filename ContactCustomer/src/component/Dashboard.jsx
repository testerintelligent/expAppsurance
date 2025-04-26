import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, TablePagination
} from '@mui/material';

const Dashboard = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    axios.get('http://10.192.190.148:5000/getContact')
      .then(response => {
        console.log("API response:", response.data);
        const data = response.data;

        if (Array.isArray(data)) {
          setFilteredData(data);
        } else if (data && Array.isArray(data.contacts)) {
          setFilteredData(data.contacts);
        } else {
          console.error("Unexpected response structure:", data);
          setFilteredData([]);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setFilteredData([]);
      });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const currentData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleDateString();
  };

  return (
    <div style={{ padding: '20px' }}>
      {filteredData.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell  sx={{ color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>Customer ID</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>First Name</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>Last Name</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>Email</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>Phone</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>Address</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>Date of Birth</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>Created At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentData.map((contact) => (
                <TableRow key={contact._id}>
                  <TableCell>{contact.customerId}</TableCell>
                  <TableCell>{contact.firstName}</TableCell>
                  <TableCell>{contact.lastName}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>{contact.phone}</TableCell>
                  <TableCell>
                    {`${contact.address?.street || ''}, ${contact.address?.city || ''}, ${contact.address?.state || ''} ${contact.address?.zipCode || ''}`}
                  </TableCell>
                  <TableCell>{formatDate(contact.dateOfBirth)}</TableCell>
                  <TableCell>{formatDate(contact.createdAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      ) : (
        <p style={{ textAlign: 'center' }}>No contact data available.</p>
      )}
    </div>
  );
};

export default Dashboard;
