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
    <div className='mt-0'>
    
      {/* <div className='dashboardGreeting'>
        <h1>Welcome to the Dashboard</h1>
        <button type='submit' className="btnNewInsurance" onClick={handleNewInsurance}>Create New Insurance</button>
      </div> */}
     
      {insuranceData.length > 0 ? (
        <div className='bg-[#6946C6]  ml-44 w-max h-max'>
        <div className='insuranceTable'>
        <table  className='mt-0 border-2 border-white w-max '>
          <thead className=''>
            <tr className='border-2 border-white p-1'>
              <th className=' bg-black text-white border-2 border-white p-0'>Policy Create Date</th>
              <th className=' bg-black text-white border-2 border-white '>Policy ID</th>
              <th className='bg-black text-white border-2 border-white'>Name</th>
              <th className='bg-black text-white border-2 border-white'>Email</th>
              <th className='bg-black text-white border-2 border-white'>Policy type</th>
              <th className='bg-black text-white border-2 border-white'>Sum Insured</th>
              <th className='bg-black text-white border-2 border-white'>Premium</th>
              <th className='bg-black text-white border-2 border-white'>Delete Record</th>
            </tr>
          </thead>
          <tbody className='' >
            {insuranceData.map((insurance, index) => (
              <tr className='hover:bg-black border-2  ' key={index} >
                <td className='text-white border-white border-2 p-0'>{formatDate(insurance.CurrentDate)}</td>
                <td className='text-white border-white border-2 p-0'>{insurance._id}</td>
                <td className='text-white border-white border-2 p-0'>{insurance.Name}</td>
                <td className='text-white border-white border-2 p-0'>{insurance.email}</td>
                <td className='text-white border-white border-2 p-0'>{insurance.PolicyType.join(' ')}</td>
                <td className='text-white border-white border-2 p-0'>{insurance.SumInsured}</td>
                <td className='text-white border-white border-2 p-0'>{insurance.Premium}</td>
                
                <td className='deleteButton'>
                  <button className='text-center hover:text-red-600 text-black font-semibold    border-black rounded-md uppercase ' onClick={() => openModal(insurance._id)}>Delete Policy</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        </div>
      ) : (
        <p>No insurance data available</p>
      )}

      {/* Custom Modal */}
      {showModal && (
        <div className="modal">
          <div className="modalContent">
            <p>Are you sure you want to delete this insurance policy?</p>
            <button className='PopupAccept border-2 text-black bg-white  border-black rounded-md hover:bg-violet-600 hover:text-white' onClick={handleDelete}>Yes</button>
            <button className='PopupCancel border-2 text-black bg-white  border-black rounded-md hover:bg-violet-600 hover:text-white' onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}
      
    </div>
    
  );
};

export default Dashboard;
