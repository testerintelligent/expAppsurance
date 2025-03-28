import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';

const Dashboard = ({ claims }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500'>
    <div style={{ padding: '20px'}}>
     
      {claims.length > 0 ? (
        <TableContainer component={Paper} elevation={3} style={{ borderRadius: '20px',padding:'10px'}}>
           <h2>Claims Page
           </h2>
          <Table aria-label="claims-table">
            <TableHead style={{ backgroundColor: '#2c3e50' }}>
              <TableRow>
                <TableCell sx={{ color: 'white',backgroundColor:'black', fontWeight: 'bold', textAlign: 'center' }}>Claim ID</TableCell>
                <TableCell sx={{ color: 'white',backgroundColor:'black', fontWeight: 'bold', textAlign: 'center' }}>Customer ID</TableCell>
                <TableCell sx={{ color: 'white',backgroundColor:'black', fontWeight: 'bold', textAlign: 'center' }}>Policy ID</TableCell>
                <TableCell sx={{ color: 'white',backgroundColor:'black', fontWeight: 'bold', textAlign: 'center' }}>Claim Type</TableCell>
                <TableCell sx={{ color: 'white',backgroundColor:'black', fontWeight: 'bold', textAlign: 'center' }}>Claim Amount</TableCell>
                <TableCell sx={{ color: 'white',backgroundColor:'black', fontWeight: 'bold', textAlign: 'center' }}>Claim Date</TableCell>
                <TableCell sx={{ color: 'white',backgroundColor:'black', fontWeight: 'bold', textAlign: 'center' }}>Resolution Date</TableCell>
                <TableCell sx={{ color: 'white',backgroundColor:'black', fontWeight: 'bold', textAlign: 'center' }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {claims.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((claim) => (
                <TableRow key={claim.claimId}>
                  <TableCell style={{ textAlign: 'center' }}>{claim.claimId}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{claim.customerId}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{claim.policyId}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{claim.claimType}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{claim.claimAmount}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>
                    {new Date(claim.claimDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell style={{ textAlign: 'center' }}>
                    {claim.resolutionDate ? new Date(claim.resolutionDate).toLocaleDateString() : 'N/A'}
                  </TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{claim.claimStatus}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={claims.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            style={{ borderTop: '1px solid #ddd' }}
          />
        </TableContainer>
      ) : (
        <p style={{ textAlign: 'center', color: '#7f8c8d', fontSize: '18px' }}>No claims data available</p>
      )}
    </div>
    </div>
  );
};

export default Dashboard;
