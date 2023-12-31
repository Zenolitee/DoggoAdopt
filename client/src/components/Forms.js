import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/Forms.css';
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
  const [formSubmissions, setFormSubmissions] = useState([]);
  const navigate = useNavigate();

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

    // Fetch form submissions for the specific pet
    fetch(`/api/forms`, { credentials: 'include' })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch form submissions');
        }
      })
      .then((data) => {
        console.log('Form submissions:', data);
        setFormSubmissions(data);
      })
      .catch((error) => {
        console.error('Error fetching form submissions:', error);
      });
  }, [PetName]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdoptFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/forms/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          petID: petDetails.PetID,
          fullName: adoptFormData.fullName,
          contactNumber: adoptFormData.contactNumber,
          reasonForAdopting: adoptFormData.reasonForAdopting,
          validID: adoptFormData.validID,
        }),
      });
  
      const data = await response.json();
  
      if (data.submit) {
        console.log('Adoption form submitted successfully');
        navigate('/');
        // Optionally, you can fetch updated form submissions here
      } else {
        console.error('Failed to submit adoption form');
      }
    } catch (error) {
      console.error('Error submitting adoption form:', error);
    }
  };

  return (
    <div className="container flex max-w-none">
      <Navbar />
      <div className="background-image flex items-center justify-center ml-12">
        <div className="rectangle-shape bg-gray-300 rounded-lg w-[40rem] h-[40rem] bg-opacity-20 mt-[5rem] ml-[5rem] flex flex-col">
          <h1>Adopting {PetName}</h1>

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

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300 ml-[1rem]"
            >
             Submit Adoption Form
            </button>
          </form>

          {/* Display form submissions in a table */}
          <div>
            <h2>Form Submissions</h2>
            <table>
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Contact Number</th>
                  <th>Reason for Adopting</th>
                  <th>Valid ID</th>
                  {/* Add more columns as needed */}
                </tr>
              </thead>
              <tbody>
                {formSubmissions.map((submission, index) => (
                  <tr key={index}>
                    <td>{submission.fullName}</td>
                    <td>{submission.contactNumber}</td>
                    <td>{submission.reasonForAdopting}</td>
                    <td>{submission.validID}</td>
                    {/* Add more cells for additional form fields */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forms;
