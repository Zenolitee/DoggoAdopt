// src/Home.js
import React, { useState, useEffect } from 'react';
import "../css/Home.css";
import Navbar from "./Navbar.js"
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [user, setUser] = useState(null);
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
      })
      .catch((error) => {
        console.error('Authentication failed:', error);
        navigate('/login'); // Redirect to login page if not authenticated
      });
  }, [navigate]);

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
            <button
              type="button"
              className="focus:outline-none text-white bg-red-500 hover:bg-red-800 focus:ring-1 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 ml-[4rem] mt-[1rem]"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Home;
