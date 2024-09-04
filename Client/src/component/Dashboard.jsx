import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../style/Dashboard.css"
import Navbar from './NavBar';

const Dashboard = () => {
  const [insuranceData, setInsuranceData] = useState([]);
    const[insurancePolicy,setInsurancePolicy]=useState('');
  useEffect(() => { 
    axios.get('http://192.168.99.141:5000/Dashboard') 
      .then(response => {
        setInsurancePolicy(response.data);
        console.log('Response:', response.data);
        setInsuranceData(response.data); // Save fetched data to state
      })
      .catch(error => {
        console.error('Error fetching data:', error); 
      });
  }, []);
  useEffect(()=>{
    console.log("the data"+insurancePolicy)
  },[insurancePolicy])
  
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://192.168.99.141:5000/Dashboard/${id}`);
      console.log('Insurance deleted:', response.data);
      // Update state after deletion
      setInsuranceData(insuranceData.filter(insurance => insurance._id !== id));
    } catch (error) {
      console.error('Error deleting policy:', error);
    }
  };

  return (
    <div>
      <Navbar/>
      <h1>Welcome to the Dashboard</h1>
      {insuranceData.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Date of Birth</th>
              <th>Policy Type</th>
              <th>Sum Insured</th>
              <th>Premium</th>
              <th>Delete Record</th>
            </tr>
          </thead>
          <tbody>
            {insuranceData.map((insurance, index) => (
              <tr key={index}>
                <td>{insurance.Name}</td>
                <td>{insurance.email}</td>
                <td>{insurance.Address}</td>
                <td>{new Date(insurance.DateOfBirth).toLocaleDateString()}</td>
                <td>{insurance.PolicyType}</td>
                <td>{insurance.SumInsured}</td>
                <td>{insurance.Premium}</td>
                {/* <td>{setInsurancePolicy}</td> */}
                <td className='deleteButton'><button className='DashboardDeleteButton' onClick={() => handleDelete(insurance._id)}>Delete Policy</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No insurance data available</p>
      )}
    </div>
  );
};

export default Dashboard;
