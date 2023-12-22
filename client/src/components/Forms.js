import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "../css/Forms.css";
import Navbar from './Navbar.js';

const Forms = () => {
  const { PetName } = useParams();
  const [petDetails, setPetDetails] = useState(null);
  const [adoptFormData, setAdoptFormData] = useState({
    fullName: '',
    contactNumber: '',
    reasonForAdopting: '',
    validID: '',
  });

  useEffect(() => {
    // Fetch pet details based on the PetName parameter
    fetch(`/api/pet/${encodeURIComponent(PetName)}`, { credentials: 'include' })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch pet details');
        }
      })
      .then((data) => {
        console.log('Pet details:', data); // Add this line for debugging
        setPetDetails(data);
      })
      .catch((error) => {
        console.error('Error fetching pet details:', error);
        // Handle error as needed
      });
  }, [PetName]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdoptFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to submit the adoption form data
    console.log('Adoption form submitted:', adoptFormData);
    // You can send this data to the server or perform further actions
  };

  return (
    <div className="container flex max-w-none">
      <Navbar />
      <div className="background-image flex items-center justify-center ml-12">
        <div className="rectangle-shape bg-gray-300 rounded-lg w-[40rem] h-[40rem] bg-opacity-20 mt-[5rem] ml-[5rem] flex flex-col p-8">
          <h1 className="text-3xl text-green-400 font-bold mb-6 text-center">Adopting {PetName}</h1>

          {petDetails ? (
            <div className="mb-6 text-center text-green-400">
              <p>Birthday: {petDetails.DateOfBirth}</p>
              <p>Owner: {petDetails.OwnerName}</p>
              <p>Description: {petDetails.Description}</p>
              {/* Add more details as needed */}
            </div>
          ) : (
            <p>Loading pet details...</p>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="text-green-400 font-bold block mb-1">Full Name:</label>
              <input
                type="text"
                name="fullName"
                value={adoptFormData.fullName}
                onChange={handleInputChange}
                className="text-black-500 p-2 w-[36rem] border rounded-md"
              />
            </div>

            <div className="mb-4">
              <label className="text-green-400 font-bold block mb-1">Contact Number:</label>
              <input
                type="text"
                name="contactNumber"
                value={adoptFormData.contactNumber}
                onChange={handleInputChange}
                className="text-black-500 p-2 w-[36rem] border rounded-md"
              />
            </div>

            <div className="mb-4">
              <label className="text-green-400 font-bold block mb-1">Reason for Adopting:</label>
              <textarea
                name="reasonForAdopting"
                value={adoptFormData.reasonForAdopting}
                onChange={handleInputChange}
                className="text-black-500 p-2 w-[36rem] border rounded-md"
              />
            </div>

            <div className="mb-4">
              <label className="text-green-400 font-bold block mb-1">Valid ID:</label>
              <input
                type="text"
                name="validID"
                value={adoptFormData.validID}
                onChange={handleInputChange}
                className="text-black-500 p-2 w-[36rem] border rounded-md"
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
              >
                Submit Adoption Form
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Forms;
