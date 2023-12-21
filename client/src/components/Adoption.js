import React, { useState, useEffect, useContext } from 'react';
import Navbar from './Navbar.js';
import '../css/Adoption.css';
import { useAuth } from '../context/Auth';

const Adoption = () => {
  const panelsPerPage = 3;
  const [petData, setPetData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useAuth();

  useEffect(() => {
    console.log('User in useEffect:', user);
  
    if (!user) {
      console.log('User not authenticated:', user);
      // Redirect or handle unauthenticated state
    } else {
      // Rest of your code
    }
  }, [user]);
  

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
          // Pet rendering logic
          <div key={index} className="rectangle-shape bg-gray-300 rounded-lg w-[25rem] h-[25rem] bg-opacity-20 mt-[5rem] ml-[11rem] flex flex-col">
            {/* Pet content rendering logic */}
          </div>
        ))}
      </div>
      {/* Pagination controls */}
    </div>
  );
};

export default Adoption;
