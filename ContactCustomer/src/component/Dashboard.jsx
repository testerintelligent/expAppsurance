import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, TablePagination
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = () => {
    axios.get('http://10.192.190.148:5000/getContact')
      .then(response => {
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
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      axios.delete(`http://10.192.190.148:5000/deleteContact/${id}`)
        .then(() => {
          alert("Contact deleted successfully.");
          fetchContacts();
        })
        .catch(error => {
          console.error('Error deleting contact:', error);
          alert("Failed to delete contact.");
        });
    }
  };

  const handleUpdate = (contact) => {
    navigate(`/update/${contact._id}`, { state: { contact } });
  };

  const handleView = (contact) => {
    navigate(`/view/${contact._id}`, { state: { contact } });
  };

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
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Customer ID</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>First Name</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Last Name</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Phone</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>DateOfBirth</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Gender</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Organization</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ProducerCode</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Created At</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Delete</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Update</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>View</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentData.map((contact) => (
                <TableRow key={contact._id}>
                  <TableCell>{contact.customerId}</TableCell>
                  <TableCell>{contact.firstName}</TableCell>
                  <TableCell>{contact.lastName}</TableCell>
                  <TableCell>{contact.phone}</TableCell>
                  <TableCell>{formatDate(contact.dateOfBirth)}</TableCell>
                  <TableCell>{contact.gender}</TableCell>
                  <TableCell>{contact.organization}</TableCell>
                  <TableCell>{contact.producerCode}</TableCell>
                  <TableCell>{formatDate(contact.createdAt)}</TableCell>
                  <TableCell>
                    <button className='bg-red-500 hover:bg-red-700 text-white p-2 rounded' onClick={() => handleDelete(contact._id)}>Delete</button>
                  </TableCell>
                  <TableCell>
                    <button className='bg-yellow-500 hover:bg-yellow-700 text-white p-2 rounded' onClick={() => handleUpdate(contact)}>Update</button>
                  </TableCell>
                  <TableCell>
                    <button className='bg-blue-500 hover:bg-blue-700 text-white p-2 rounded' onClick={() => handleView(contact)}>View</button>
                  </TableCell>
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
