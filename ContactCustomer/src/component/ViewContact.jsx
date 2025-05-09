import React, { useEffect, useState } from 'react';
import {  useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ViewContact = () => {
  const { id } = useParams();
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate=useNavigate();

  useEffect(() => {
    axios.get(`http://10.192.190.148:5000/view/${id}`)
      .then((res) => {
        setContact(res.data.contact);
        setLoading(false);
      })
      .catch((err) => {
        setError('Error fetching contact details');
        setLoading(false);
      });
  }, [id]);


  const handleBack=()=>{
    navigate("/Dashboard");
  }

  if (loading) return <p>Loading...</p>;
  if (error || !contact) return <p>{error || 'Contact not found'}</p>;

  return (
    
   <div className="flex justify-center items-start py-10 bg-white-900 min-h-screen overflow-y-auto">
         <div className="bg-gray-800 bg-opacity-90 shadow-2xl rounded-xl p-8 w-full max-w-3xl h-max text-white">
           <h2 className="text-3xl font-bold mb-6 text-center">Contact Details</h2>
   
           {/* Personal Information */}
           <div className="mb-10">
             <h3 className="text-lg font-semibold mb-2 text-left">Personal Information</h3>
             <div className="h-1 w-20 bg-blue-500 mb-4"></div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div>
                 <label className="block text-left mb-1">First Name: </label>
                <div className='w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'>
                <h3>{contact.firstName}</h3>
                </div>
               
               </div>
               <div>
                 <label className="block text-left mb-1">Last Name: </label>
                 <div className='w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'>
                <h3>{contact.lastName}</h3>
                </div>
                 </div>
               <div>
                 <label className="block text-left mb-1">Email: </label>
                 <div className='w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'>
                <h3>{contact.email}</h3>
                </div>
                 </div>
               <div>
                 <label className="block text-left mb-1">Phone: </label>
                 <div className='w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'>
                <h3>{contact.phone}</h3>
                </div>
                 </div>
               <div>
                 <label className="block text-left mb-1">Date of Birth: </label>
                 <div className='w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'>
                 <h3>{new Date(contact.dateOfBirth).toLocaleDateString()}</h3>
                </div>
                 </div>
               <div>
                 <label className="block text-left mb-1">Gender: </label>
                 <div className='w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'>
                <h3>{contact.gender}</h3>
                </div>
                 </div>
               </div>

 {/* Addressl Information */}

               <div className="mb-10 mt-8">
             <h3 className="text-lg font-semibold mb-2 text-left">Address Details</h3>
             <div className="h-1 w-20 bg-blue-500 mb-4"></div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div>
                 <label className="block text-left mb-1">Address Type: </label>
                 <div className='w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'>
                <h3>{contact.address}</h3>
                </div>
                 </div>
               <div>
                 <label className="block text-left mb-1">Street: </label>
                 <div className='w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'>
                <h3>{contact.street}</h3>
                </div>
                 </div>
               <div>
                 <label className="block text-left mb-1">City: </label>
                 <div className='w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'>
                <h3>{contact.city}</h3>
                </div>
                   </div>
               <div>
                 <label className="block text-left mb-1">State: </label>
                 <div className='w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'>
                <h3>{contact.state}</h3>
                </div>
                  </div>
               <div>
                 <label className="block text-left mb-1">Zip Code: </label>
                 <div className='w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'>
                <h3>{contact.zipCode}</h3>
                </div>
                </div>
             </div>
           </div>


 {/* o&p Information */}

               <div className="mb-10">
             <h3 className="text-lg font-semibold mb-2 text-left">Organization & Producer Code</h3>
             <div className="h-1 w-20 bg-blue-500 mb-4"></div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div>
                 <label className="block text-left mb-1">Organization: </label>
                 <div className='w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'>
                <h3>{contact.organization}</h3>
                </div>
               </div>
               <div>
                 <label className="block text-left mb-1">Producer Code: </label>
                 <div className="relative">
                 <div className='w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'>
                <h3>{contact.producerCode}</h3>
                </div>
                     </div>
               </div>
             </div>
           </div>
               
             </div>


             <div className="flex justify-between mt-8">
             <button
              onClick={handleBack}
               className="bg-blue-500 py-2 px-4 rounded-md text-white hover:bg-blue-700"
             >
               Back
             </button>
             {/* <button
           //    onClick={handleCancel}
               className="bg-gray-500 py-2 px-4 rounded-md text-white hover:bg-red-600"
             >
               Cancel
             </button> */}
           </div>
           </div>
   
        
   
           {/* Modal for Suggestions */}
           {/* {showModal && (
             <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
               <div className="bg-white text-black p-6 rounded-md max-w-md w-full">
                 <h4 className="text-xl mb-4">Select {currentField === 'organization' ? 'Organization' : 'Producer Code'}</h4>
                 <div className="max-h-48 overflow-y-auto">
                   {(currentField === 'organization' ? filteredOrgSuggestions : filteredProdSuggestions).map((option) => (
                     <div
                       key={option}
                       onClick={() => selectSuggestion(currentField, option)}
                       className="cursor-pointer px-4 py-2 hover:bg-blue-500"
                     >
                       {option}
                     </div>
                   ))}
                 </div>
                 <button
                //   onClick={() => setShowModal(false)}
                   className="mt-4 w-full bg-red-500 text-white p-2 rounded"
                 >
                   Close
                 </button>
               </div>
             </div>
           )} */}
   
        </div> 
   
  );
};

export default ViewContact;
