import React, { useState, useEffect } from 'react';
import Navbar from './Navbar.js';
import '../css/Adoption.css';

const Adoption = () => {
  const panelsPerPage = 3;
  const [petData, setPetData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Fetch pet information from the backend when the component mounts
    fetch('http://localhost:3001/api/pets')  // Update the URL if your server is running on a different port or domain
      .then(response => response.json())
      .then(data => setPetData(data))
      .catch(error => console.error('Error fetching pet data:', error));
  }, []); // Empty dependency array to run the effect only once on mount

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
          <div key={index} className="rectangle-shape bg-gray-300 rounded-lg w-[25rem] h-[25rem] bg-opacity-20 mt-[5rem] ml-[4.6rem]">
            {index % 2 === 0 && pet.Image ? (
              <>
                <img
                  src={`data:image/jpeg;base64,${pet.Image.toString('base64')}`}  // Convert Buffer to base64
                  alt={pet.PetName}
                  className="w-full h-full object-cover rounded-t-lg"
                />
                <div className="text-green-400 font-bold flex items-center mt-[1rem] justify-center text-4xl">{pet.PetName}</div>
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

export default Adoption;
