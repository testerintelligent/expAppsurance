import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Alert } from '@mui/material';

const PolicyDashboard = ({ policies }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const updatePolicy = (event)=>{
    alert(event.target.value)
  };
  return (
    <div className='flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500'>
    <div style={{ padding: '20px' }}>
      {policies.length > 0 ? (
        <TableContainer component={Paper} elevation={3} style={{ borderRadius: '20px',padding:'10px' }}>
          <h2>Policy Dashboard</h2>
          <Table aria-label="policy-dashboard-table">
            <TableHead style={{ backgroundColor: 'black' }}>
              <TableRow>
                <TableCell sx={{ color: 'white',backgroundColor:'black', fontWeight: 'bold', textAlign: 'center' }}>Policy ID</TableCell>
                <TableCell sx={{ color: 'white',backgroundColor:'black', fontWeight: 'bold', textAlign: 'center' }}>Customer ID</TableCell>
                <TableCell sx={{ color: 'white',backgroundColor:'black', fontWeight: 'bold', textAlign: 'center' }}>Policy Type</TableCell>
                <TableCell sx={{ color: 'white',backgroundColor:'black', fontWeight: 'bold', textAlign: 'center' }}>Coverage Details</TableCell>
                <TableCell sx={{ color: 'white',backgroundColor:'black', fontWeight: 'bold', textAlign: 'center' }}>Premium</TableCell>
                <TableCell sx={{ color: 'white',backgroundColor:'black', fontWeight: 'bold', textAlign: 'center' }}>Start Date</TableCell>
                <TableCell sx={{ color: 'white',backgroundColor:'black', fontWeight: 'bold', textAlign: 'center' }}>End Date</TableCell>
                <TableCell sx={{ color: 'white',backgroundColor:'black', fontWeight: 'bold', textAlign: 'center' }}>Status</TableCell>
                <TableCell sx={{ color: 'white',backgroundColor:'black', fontWeight: 'bold', textAlign: 'center' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {policies.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((policy) => (
                <TableRow key={policy.policyId}>
                  <TableCell style={{ textAlign: 'center' }}>{policy.policyId}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{policy.customerId}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{policy.policyType}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{policy.coverageDetails}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{policy.premium}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>
                    {new Date(policy.startDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell style={{ textAlign: 'center' }}>
                    {new Date(policy.endDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{policy.status}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}><button onClick={updatePolicy} value={policy.policyId}>Update Policy</button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={policies.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            style={{ borderTop: '1px solid #ddd' }}
          />
        </TableContainer>
      ) : (
        <p style={{ textAlign: 'center', color: '#7f8c8d', fontSize: '18px' }}>No policies available</p>
      )}
    </div>
    </div>
  );
};

export default PolicyDashboard;
