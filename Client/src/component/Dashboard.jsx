import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import "../style/Dashboard.css";

const Dashboard = () => {
  const [insuranceData, setInsuranceData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [policyToDelete, setPolicyToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const sessionKey = sessionStorage.getItem('sessionKey');
    if (!sessionKey) {
      navigate('/insurance');
    }
  }, [navigate]);

  useEffect(() => { 
    axios.get('http://10.192.190.148:5000/Dashboard') 
      .then(response => {
        console.log('Response:', response.data);
        setInsuranceData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error); 
      });
  }, []);

  const openModal = (id) => {
    setPolicyToDelete(id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://10.192.190.148:5000/Dashboard/${policyToDelete}`);
      setInsuranceData(insuranceData.filter(insurance => insurance._id !== policyToDelete));
    } catch (error) {
      console.error('Error deleting policy:', error);
      alert('Failed to delete the policy. Please try again.');
    } finally {
      setShowModal(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date";
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  function generateRandomNumber() {
    return Math.floor(100000 + Math.random() * 900000);
  }

  return (
    <div className='dashboard-container'>
      <div className='dashboard-content'>
        {insuranceData.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
            <TableHead>
  <TableRow>
    <TableCell sx={{ color: 'white' }}>Policy Create Date</TableCell>
    <TableCell sx={{ color: 'white' }}>Policy Number</TableCell>
    <TableCell sx={{ color: 'white' }}>Full Name</TableCell>
    <TableCell sx={{ color: 'white' }}>Email ID</TableCell>
    <TableCell sx={{ color: 'white' }}>Address</TableCell>
    <TableCell sx={{ color: 'white' }}>Date of Birth</TableCell>
    <TableCell sx={{ color: 'white' }}>Gender</TableCell>
    <TableCell sx={{ color: 'white' }}>Policy Type</TableCell>
    <TableCell sx={{ color: 'white' }}>Sum Insured</TableCell>
    <TableCell sx={{ color: 'white' }}>Premium</TableCell>
    <TableCell sx={{ color: 'white' }}>Delete Record</TableCell>
  </TableRow>
</TableHead>

              <TableBody>
                {insuranceData.map((insurance, index) => (
                  <TableRow key={index}>
                    <TableCell>{formatDate(insurance.CurrentDate)}</TableCell>
                    <TableCell>{insurance.policyNumber || generateRandomNumber()}</TableCell>
                    <TableCell>{insurance.Name}</TableCell>
                    <TableCell>{insurance.email}</TableCell>
                    <TableCell>{insurance.Address}</TableCell>
                    <TableCell>{formatDate(insurance.DateOfBirth)}</TableCell>
                    <TableCell>{insurance.Gender}</TableCell>
                    <TableCell>{insurance.PolicyType.join(', ')}</TableCell>
                    <TableCell>{insurance.SumInsured}</TableCell>
                    <TableCell>{insurance.Premium}</TableCell>
                    <TableCell>
                      <Button 
                        variant="contained" 
                        color="error" 
                        onClick={() => openModal(insurance._id)}
                      >
                        Delete Policy
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <p>No insurance data available</p>
        )}

        <Dialog
          open={showModal}
          onClose={() => setShowModal(false)}
        >
          <DialogTitle>Delete Policy</DialogTitle>
          <DialogContent>
            <p>Are you sure you want to delete this insurance policy?</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDelete} color="primary">Yes</Button>
            <Button onClick={() => setShowModal(false)} color="secondary">Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default Dashboard;
