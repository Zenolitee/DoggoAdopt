import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Forms = () => {
  const { PetName } = useParams();
  const [petDetails, setPetDetails] = useState(null);

  useEffect(() => {
    // Fetch details for the selected pet using petId
    fetch(`/api/pets/${PetName}`, { credentials: 'include' })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.error('Error response:', response);
          throw new Error('Error fetching pet details');
        }
      })
      .then((data) => {
        console.log('Pet details:', data);
        setPetDetails(data);
      })
      .catch((error) => {
        console.error('Error fetching pet details:', error);
      });
  }, [PetName]);

  if (!petDetails) {
    return <div>Loading...</div>;
  }

  // Implement your adoption form logic here

  return (
    <div>
      <h2>Adoption Form for {petDetails.PetName}</h2>
      {/* Your form components go here */}
    </div>
  );
};

export default Forms;