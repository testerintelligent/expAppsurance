import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [UserToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    axios
      .get("http://192.168.99.141:5000/register")
      .then((response) => {
        setUsers(response.data);
        setMessage(response.data.message);
        console.log("Response:", response.data);
      })
      .catch((error) => {
        setMessage(
          error.response ? error.response.data.message : "An error occurred"
        );
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    console.log("the data" + users);
  }, [users]);

  const openModal = (email) => {
    setUserToDelete(email);
    setShowModal(true);
  };

  const handleDelete = async () => {
    await axios
      .delete(`http://192.168.99.141:5000/${UserToDelete}`)
      .then((response) => {
        console.log("User deleted:", response.data);
        setUsers(users.filter((user) => user.email !== UserToDelete));
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
    setShowModal(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-gray-900 bg-opacity-90 shadow-lg rounded-xl p-10 max-w-4xl w-full text-white">
        <h2 className="text-3xl font-bold text-center mb-6">User Management</h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-700">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="p-3 border border-gray-700">Email</th>
                <th className="p-3 border border-gray-700">Password</th>
                <th className="p-3 border border-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={index}
                  className="border border-gray-700 hover:bg-gray-800 transition-all"
                >
                  <td className="p-3 border border-gray-700">{user.email}</td>
                  <td className="p-3 border border-gray-700">{user.password}</td>
                  <td className="p-3 border border-gray-700 text-center">
                    <button
                      className="bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-800 border border-white transition-all"
                      onClick={() => openModal(user.email)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal for confirmation */}
        {showModal && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-center">
              <p className="text-lg mb-4">Are you sure you want to delete this user?</p>
              <div className="flex justify-center gap-4">
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all"
                  onClick={handleDelete}
                >
                  Yes
                </button>
                <button
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-all"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
