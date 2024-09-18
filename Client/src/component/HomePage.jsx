import React, { useEffect ,useState} from "react";
import Cards from "./Cards";
import axios from "axios";
import "../style/HomePage.css"
import Navbar from './NavBar';
const HomePage=()=>{
    const [message, setMessage] = useState('');
    const [users, setUsers] = useState([]);
    useEffect(() => { 
        
        axios.get('http://192.168.99.141:5000/register') 
          .then(response => {
            setUsers(response.data);
            setMessage(response.data.message); 
            console.log('Response:', response.data); 
          })
          .catch(error => {
            setMessage(error.response ? error.response.data.message : 'An error occurred'); // Error handling
            console.error('Error fetching data:', error); 
          });
      }, []);
      useEffect(()=>{
        console.log("the data"+users)
      },[users])
      // const handleDelete = (id) => {
      //   axios.delete(`http://192.168.99.141:5000/${id}`)
      //     .then(response => {
      //       console.log('User deleted:', response.data);
      //       setUsers(users.filter(user => user._id !== id));
      //     })
      //     .catch(error => {
      //       console.error('Error deleting user:', error);
      //     });
      // };
    
    return(
        <div className="Homepage-container">
         
            <h3>Welcome to Home Page</h3>
            {/* <table>
              <tr className="tableHead">
                    <th className="tabletitle"><strong>Name</strong></th>
                    <th className="tabletitle"><strong>Email</strong></th>
                    <th className="tabletitle"><strong>Start Date</strong></th>
                    <th className="tabletitle"><strong>End Date</strong></th>
                    <th className="tabletitle"><strong>Address</strong></th>
                    <th className="tabletitle"><strong>Phone Number</strong></th>
                    <th className="tabletitle"><strong>DeleteButton</strong></th>
                </tr>
          </table> */}
            <div className="card-container">
           
      {users.map((user, index) => (
        <div>
          
        <Cards
          key={index}
          firstName={user.firstName}
          lastName={user.lastName}
          email={user.email}
          startDate={user.startDate}
          endDate={user.endDate}
          address={user.address}
          phoneNumber={user.phoneNumber}
          users={users}
          setUsers={setUsers}
          id={user._id}
        />
        {/* <button onClick={() => handleDelete(user._id)}>Delete</button> */}
        </div>
      ))}
    </div>
       {/* {message && <p>{message}</p>}
            <ul>
            {users.map((user) => ( 
          <li key={user._id}>
            {user.firstName} {user.lastName} {user.email} {user.startDate} {user.endDate} {user.address} {user.phoneNumber}
            
          </li>
        ))}
        </ul>
        </div> */}
        </div>
    );
}
export default HomePage;