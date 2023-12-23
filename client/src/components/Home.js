// src/Home.js
import React, { useState, useEffect } from 'react';
import "../css/Home.css";
import Navbar from "./Navbar.js"
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [user, setUser] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated when the component mounts
    fetch('/api/dashboard', { credentials: 'include' })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('User not authenticated');
        }
      })
      .then((data) => {
        console.log('Authentication successful:', data.user);
        setUser(data.user);
        setIsAdmin(data.user.username === 'admin'); // Check if username is 'admin'
      })
      .catch((error) => {
        console.error('Authentication failed:', error);
        navigate('/login'); // Redirect to login page if not authenticated
      });
  }, [navigate]);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };

  const handleRegisterPet = () => {
    // Collect form data from your actual form fields
    const petFormData = new FormData();
    petFormData.append('petName', document.getElementById('petName').value);
    petFormData.append('ownerName', document.getElementById('ownerName').value);
    petFormData.append('description', document.getElementById('description').value);
    petFormData.append('age', document.getElementById('age').value);
    petFormData.append('dogBreed', document.getElementById('dogBreed').value);
    petFormData.append('dateOfBirth', document.getElementById('dateOfBirth').value);
  
    // Get the file input element
    const imageInput = document.getElementById('image');
  
    // Check if a file is selected
    if (imageInput.files.length > 0) {
      // Append the selected file to the FormData object
      petFormData.append('image', imageInput.files[0]);
    }
  
    // Send a request to the server to handle the pet registration
    fetch('/api/register-pet', {
      method: 'POST',
      body: petFormData,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Pet registration failed');
        }
      })
      .then((data) => {
        console.log('Pet registration successful:', data);
        // You can handle the response from the server as needed
        // For example, you may want to display a success message to the user
        // and close the modal
        setModalOpen(false);
      })
      .catch((error) => {
        console.error('Pet registration failed:', error);
        // Handle error, display an error message, etc.
      });
  };

  const handleLogout = () => {
    // Send a request to logout endpoint to clear the session on the server
    fetch('/logout', { method: 'POST', credentials: 'include' })
      .then(() => {
        // Remove user information from state and redirect to login page
        setUser(null);
        navigate('/login');
      })
      .catch((error) => console.error('Logout failed!!!:', error));
  };

  return (
    <div className="container flex max-w-none">
      <Navbar />
      <div className="background-image ml-12">
        <style>{`
          @import url('https://fonts.googleapis.com/css?family=Nunito:400,700&display=swap');
        `}</style>
        {user ? (
          <div>
            <h1 className="text-white ml-[4rem] mt-20 text-4xl font-nunito w-[24rem]">
              Welcome to the homepage, {user.username}!
            </h1>

            <div className="user-status ml-[4rem]">
              <p className="text-green-400">Your application status: <strong>{user.status}</strong></p>
            </div>

            <button
              type="button"
              className="focus:outline-none text-white bg-red-500 hover:bg-red-800 focus:ring-1 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5  mb-2 dark:bg-green-400 dark:hover:bg-green-500 dark:focus:ring-green-600 ml-[4rem] mt-[2rem]"
              onClick={() => navigate('/adoption')}
            >
              Browse Pets
            </button>

            <button
              type="button"
              className="focus:outline-none text-white bg-red-500 hover:bg-red-800 focus:ring-1 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5  mb-2 dark:bg-green-400 dark:hover:bg-green-500 dark:focus:ring-green-600 ml-[2rem] mt-[2rem]"
              onClick={handleModalOpen}
            >
              Register a Pet
            </button>

            {isAdmin && (
              <button
                type="button"
                className="focus:outline-none text-white bg-blue-500 hover:bg-blue-800 focus:ring-1 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-400 dark:hover:bg-blue-500 dark:focus:ring-blue-600 ml-[2rem] mt-[2rem]"
                onClick={() => navigate('/admin')}
              >
                Admin Panel
              </button>
            )}

            <button
              type="button"
              className="focus:outline-none text-white bg-red-500 hover:bg-red-800 focus:ring-1 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 ml-[4rem] mt-[30rem] absolute flex "
              onClick={handleLogout}
            >
              Logout
            </button>
            {isModalOpen && (
  <div className="modal fixed top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/4 bg-gray">
    <div className="modal-content bg-grey-400 p-8">
      <h2 className="flex justify-center text-3xl">Register a Pet</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="petName">Pet Name:</label>
          <input type="text" id="petName" name="petName" required className="block w-full border rounded-md p-2" />
        </div>

        <div className="mb-4">
          <label htmlFor="ownerName">Owner Name:</label>
          <input type="text" id="ownerName" name="ownerName" required className="block w-full border rounded-md p-2" />
        </div>

        <div className="mb-4">
          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" rows="4" required className="block w-full border rounded-md p-2"></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="age">Age:</label>
          <input type="text" id="age" name="age" required className="block w-full border rounded-md p-2" />
        </div>

        <div className="mb-4">
          <label htmlFor="dogBreed">Dog Breed:</label>
          <input type="text" id="dogBreed" name="dogBreed" required className="block w-full border rounded-md p-2" />
        </div>

        <div className="mb-4">
          <label htmlFor="dateOfBirth">Date of Birth:</label>
          <input type="date" id="dateOfBirth" name="dateOfBirth" required className="block w-full border rounded-md p-2" />
        </div>

        <label htmlFor="image">Image:</label>
              <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} />

        <div className="flex justify-center mt-4">
          <button type="button" onClick={handleRegisterPet} className="bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg py-2 px-4 mr-2">
            Submit
          </button>
          <button type="button" onClick={handleModalClose} className="bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg py-2 px-4">
            Close
          </button>
        </div>
      </form>
    </div>
  </div>
)}
            
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Home;

