import React, { useEffect ,useState} from "react";
import { useNavigate } from 'react-router-dom';
import Cards from "./Cards";
import axios from "axios";
import "../style/HomePage.css"
import Navbar from './NavBar';
const HomePage=()=>{
  const navigate=useNavigate();
    const [message, setMessage] = useState('');
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [UserToDelete, setUserToDelete] = useState(null);
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

      const openModal = (email) => {
        setUserToDelete(email); // Set the  User to delete
        setShowModal(true); // Show the modal
      };
      const handleDelete = async(user) => {
        await axios.delete(`http://192.168.99.141:5000/${UserToDelete}`)
          .then(response => {
            console.log('User deleted:', response.data);
            console.log('User ',users)
            //setUsers(users.filter(user => user._id !== user.id))
          })
          .catch(error => {
            console.error('Error deleting user:', error);
          });
          navigate("/");
      };
    
    return(
        <div className="mt-0">
         
            <h3 className="p-10 text-white text-xl">Welcome to Home Page</h3>
            <div className='bg-[#6946C6]  ml-44 w-max h-max'>
            <div className='insuranceTable ml-44'>
            <table className='mt-0 border-2 border-white w-max '>
            <thead className=''>
              <tr className="tableHead">
                    <th className="tabletitle"><strong>Email</strong></th>
                    <th className="tabletitle"><strong>Password</strong></th>
                    <th className="tabletitle"><strong>DeleteButton</strong></th>
                </tr>
                </thead>
                <tbody className='' >
                {users.map((user, index) => (
              <tr className='hover:bg-black border-2  ' key={index}>
                <td className='text-white border-white border-2 p-10'>{user.email} </td>
                <td className='text-white border-white border-2 p-10'>{user.password} </td>   
                <td className='deleteButton'>
                  <button className='cardButton hover:bg-white hover:text-black' onClick={() => openModal(user.email)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
          </table>
          </div>
          </div>
          {showModal && (
        <div className="modal">
          <div className="modalContent">
            <p>Are you sure you want to delete this User ?</p>
            <button className='PopupAccept border-2 text-black bg-white  border-black rounded-md hover:bg-violet-600 hover:text-white p-2' onClick={handleDelete}>Yes</button>
            <button className='PopupCancel border-2 text-black bg-white  border-black rounded-md hover:bg-violet-600 hover:text-white p-2' onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}
      
        </div>
    );
}
export default HomePage;