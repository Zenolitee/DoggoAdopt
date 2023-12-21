import React, { useState, useEffect } from 'react';
import Navbar from './Navbar.js';
import '../css/Adoption.css';

const Adoption = () => {
  const panelsPerPage = 3;
  const [petData, setPetData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Fetch pet information from the backend when the component mounts
    fetch('http://localhost:3001/api/pets')
      .then(response => response.json())
      .then(data => setPetData(data))
      .catch(error => console.error('Error fetching pet data:', error));
  }, []);

  const startIndex = (currentPage - 1) * panelsPerPage;
  const endIndex = Math.min(currentPage * panelsPerPage, petData.length);

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(prevPage => Math.max(1, prevPage - 1));
  };

  return (
    <div className="container flex max-w-none">
      <Navbar />
      <div className="background-image flex ml-12">
        {petData.slice(startIndex, endIndex).map((pet, index) => (
          <div key={index} className="rectangle-shape bg-gray-300 rounded-lg w-[25rem] h-[25rem] bg-opacity-20 mt-[5rem] ml-[11rem] flex flex-col">
            {pet.Image ? (
              <>
                {console.log('Base64 Image:', `data:image/jpeg;base64,${uint8ArrayToBase64(pet.Image.data)}`)}
                <img
                  src={`data:image/jpeg;base64,${uint8ArrayToBase64(pet.Image.data)}`}
                  alt={pet.PetName}
                  style={{ width: '50%', height: '50%', objectFit: 'cover', borderRadius: '0.5rem 0.5rem 0.5rem 0.5rem', 	border: '0.2rem solid grey', }}
                />
                <div className="panel-content flex-1 ml-[12.4rem] p-1 flex flex-col absolute justify-center items-center w-[12.5rem] h-[12.5rem] top-[1.5rem]">
                  <div className="text-green-400 font-bold text-4xl mb-0">{pet.PetName}</div>
                  <div className="text-green-400 text-sm ">Birthday: {pet.DateOfBirth}</div>
                  <div className="text-green-400 text-sm">Owner: {pet.OwnerName}</div>
                  </div>
                  
                  <div className="text-green-400 text-sm m-5">{pet.Description}</div>
                  
                  {/* Add more information as needed */}
                
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
  let binary = '';
  uint8Array.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

export default Adoption;