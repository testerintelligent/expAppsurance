import React, { useEffect ,useState} from "react";
import axios from "axios";
import "../style/Cards.css"
const Cards=(user)=>{
   const[data,setData]=useState('');
    const handleDelete = async(id) => {
        await axios.delete(`http://localhost:5000/${id}`)
          .then(response => {
            console.log('User deleted:', response.data);
            console.log('User ',user.users)
            user.setUsers(user.users.filter(user => user._id !== id))
          })
          .catch(error => {
            console.error('Error deleting user:', error);
          });
      };
    return (
        <div className="user-card">
            <table>
                <tr>
                    <th><strong>Name</strong></th>
                    <th><strong>Email</strong></th>
                    <th><strong>Start Date</strong></th>
                    <th><strong>End Date</strong></th>
                    <th><strong>Address</strong></th>
                    <th><strong>Phone Number</strong></th>
                    <th><strong>DeleteButton</strong></th>
                </tr>
                <tr>
                  
                    <td>{user.firstName} {user.lastName}</td>
                    <td>{user.email} </td>
                    <td>{user.startDate} </td>
                    <td>{user.endDate} </td>
                    <td>{user.address} </td>
                    <td>{user.phoneNumber}</td>
                    <td><button className="cardButton" onClick={() => handleDelete(user.id)}>Delete</button></td>
                </tr>
            </table>
        </div>
      );
}
export default Cards;