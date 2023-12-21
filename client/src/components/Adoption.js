// src/Adoption.js
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar.js';
import { useNavigate } from 'react-router-dom';
import '../css/Adoption.css';

const Adoption = () => {
  const panelsPerPage = 3;
  const [petData, setPetData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated when the component mounts
    fetch('/api/pets', { credentials: 'include' })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('User not authenticated');
        }
      })
      .then((data) => {
        console.log('Authentication successful:', data);
        setPetData(data);
      })
      .catch((error) => {
        console.error('Authentication failed:', error);
        navigate('/login'); // Redirect to login page if not authenticated
      });
  }, [navigate]);

  const startIndex = (currentPage - 1) * panelsPerPage;
  const endIndex = Math.min(currentPage * panelsPerPage, petData.length);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(1, prevPage - 1));
  };

  return (
    <div className="container flex max-w-none">
      <Navbar />
      <div className="background-image flex ml-12">
        {petData.slice(startIndex, endIndex).map((pet, index) => (
          <div key={index} className="rectangle-shape bg-gray-300 rounded-lg w-[25rem] h-[25rem] bg-opacity-20 mt-[5rem] ml-[5rem] flex flex-col">
            {pet.Image ? (
              <>
                {console.log('Base64 Image:', `data:image/jpeg;base64,${uint8ArrayToBase64(pet.Image.data)}`)}
                <img
                  src={`data:image/jpeg;base64,${pet.Image}`}
                  alt={pet.PetName}
                  style={{
                    width: '50%',
                    height: '50%',
                    objectFit: 'cover',
                    borderRadius: '0.5rem 0.5rem 0.5rem 0.5rem',
                    border: '0.2rem solid grey',
                  }}
                />

                <div className="panel-content flex-1 ml-[12.4rem] p-1 flex flex-col absolute justify-center items-center w-[12.5rem] h-[12.5rem] top-[1.5rem]">
                  <div className="text-green-400 font-bold text-4xl mb-0">{pet.PetName}</div>
                  <div className="text-green-400 text-sm ">Birthday: {pet.DateOfBirth}</div>
                  <div className="text-green-400 text-sm">Owner: {pet.OwnerName}</div>
                </div>

                <div className="text-green-400 text-sm m-5">{pet.Description}</div>
              </>
            ) : (
              <div className={`text-green-400 font-bold flex items-center mt-[1rem] justify-center text-4xl ${index % 2 !== 0 ? 'panel-text' : ''}`}>
                {pet.PetName}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="absolute bottom-4 ml-[12rem]">
        {currentPage > 1 && (
          <div className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300 ml-[1rem] h-[2.5rem]" onClick={handlePreviousPage}>
            Previous Page
          </div>
        )}
        {currentPage < Math.ceil(petData.length / panelsPerPage) && (
          <div className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300 ml-[1rem] h-[2.5rem]" onClick={handleNextPage}>
            Next Page
          </div>
        )}
      </div>
    </div>
  );
};

function uint8ArrayToBase64(uint8Array) {
  if (!uint8Array) {
    return '';
  }

  let binary = '';
  uint8Array.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

export default Adoption;
