import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../style/Dashboard.css";
import { useNavigate } from 'react-router-dom';

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
    axios.get('http://192.168.99.141:5000/Dashboard') 
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
      await axios.delete(`http://192.168.99.141:5000/Dashboard/${policyToDelete}`);
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
          <div className='insuranceTable'>
            <table>
              <thead>
                <tr>
                  <th>Policy Create Date</th>
                  <th>Policy Number</th>
                  <th>Full Name</th>
                  <th>Email ID</th>
                  <th>Address</th>
                  <th>Date of Birth</th>
                  <th>Gender</th>
                  <th>Policy Type</th>
                  <th>Sum Insured</th>
                  <th>Premium</th>
                  <th>Delete Record</th>
                </tr>
              </thead>
              <tbody>
                {insuranceData.map((insurance, index) => (
                  <tr key={index}>
                    <td>{formatDate(insurance.CurrentDate)}</td>
                    <td>{insurance.policyNumber || generateRandomNumber()}</td>
                    <td>{insurance.Name}</td>
                    <td>{insurance.email}</td>
                    <td>{insurance.Address}</td>
                    <td>{formatDate(insurance.DateOfBirth)}</td>
                    <td>{insurance.Gender}</td>
                    <td>{insurance.PolicyType.join(', ')}</td>
                    <td>{insurance.SumInsured}</td>
                    <td>{insurance.Premium}</td>
                    <td className='deleteButton'>
                      <button onClick={() => openModal(insurance._id)}>Delete Policy</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No insurance data available</p>
        )}

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
    </div>
  );
};

export default Dashboard;
