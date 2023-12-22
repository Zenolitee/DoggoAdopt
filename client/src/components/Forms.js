import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Forms = () => {
  const { PetName } = useParams();
  const [petDetails, setPetDetails] = useState(null);

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

  return (
    <div>
      <h1>Adopting {PetName}</h1>
      
      {petDetails ? (
        <div>
          <p>Birthday: {petDetails.DateOfBirth}</p>
          <p>Owner: {petDetails.OwnerName}</p>
          <p>Description: {petDetails.Description}</p>
          {/* Add more details as needed */}
        </div>
      ) : (
        <p>Loading pet details...</p>
      )}

      {/* Other form components */}
    </div>
  );
};

export default Forms;
