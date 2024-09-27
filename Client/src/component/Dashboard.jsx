import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../style/Dashboard.css";

import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [insuranceData, setInsuranceData] = useState([]);
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility
  const [policyToDelete, setPolicyToDelete] = useState(null); // State to keep track of the policy ID to delete
  const navigate = useNavigate();

  useEffect(() => {
    const sessionKey = sessionStorage.getItem('sessionKey');
    if (!sessionKey) {
      navigate('/insurance');
    }
  }, [navigate]);

  useEffect(() => { 
    axios.get('http://192.168.99.141:5000/Dashboard') 
      .then(response => {
        console.log('Response:', response.data);
        setInsuranceData(response.data); // Save fetched data to state
      })
      .catch(error => {
        console.error('Error fetching data:', error); 
      });
  }, []);

  const openModal = (id) => {
    setPolicyToDelete(id); // Set the policy ID to delete
    setShowModal(true); // Show the modal
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://192.168.99.141:5000/Dashboard/${policyToDelete}`);
      console.log('Insurance deleted:', response.data);
      setInsuranceData(insuranceData.filter(insurance => insurance._id !== policyToDelete));
    } catch (error) {
      console.error('Error deleting policy:', error);
      alert('Failed to delete the policy. Please try again.');
    } finally {
      setShowModal(false); // Close the modal
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"; // Handle null or undefined dates
  
    const date = new Date(dateString);
  
    if (isNaN(date.getTime())) return "Invalid Date"; // Handle invalid date strings
  
    const day = String(date.getDate()).padStart(2, '0');    // Get day and pad with 0 if needed
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (months are 0-indexed)
    const year = date.getFullYear(); // Get the full year
  
    return `${day}/${month}/${year}`; 
  };
  
  

  return (
    <div>
    
      {/* <div className='dashboardGreeting'>
        <h1>Welcome to the Dashboard</h1>
        <button type='submit' className="btnNewInsurance" onClick={handleNewInsurance}>Create New Insurance</button>
      </div> */}
     
      {insuranceData.length > 0 ? (
        <div className='insuranceTable'>
        <table>
          <thead>
            <tr>
              <th>Policy Create Date</th>
              <th>Name</th>
              <th>Policy type</th>
              <th>Sum Insured</th>
              <th>Premium</th>
              <th>Delete Record</th>
            </tr>
          </thead>
          <tbody>
            {insuranceData.map((insurance, index) => (
              <tr key={index}>
                <td>{formatDate(insurance.CurrentDate)}</td>
                <td>{insurance.Name}</td>
                <td>{insurance.PolicyType.join(' ')}</td>
                <td>{insurance.SumInsured}</td>
                <td>{insurance.Premium}</td>
                
                <td className='deleteButton'>
                  <button className='DashboardDeleteButton' onClick={() => openModal(insurance._id)}>Delete Policy</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      ) : (
        <p>No insurance data available</p>
      )}

      {/* Custom Modal */}
      {showModal && (
        <div className="modal">
          <div className="modalContent">
            <p>Are you sure you want to delete this insurance policy?</p>
            <button className='PopupAccept' onClick={handleDelete}>Yes</button>
            <button className='PopupCancel' onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
