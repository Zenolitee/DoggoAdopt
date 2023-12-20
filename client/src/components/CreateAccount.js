// src/CreateAccount.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';

const CreateAccount = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const navigate = useNavigate();

  const onRegister = async () => {
    // Check if username or password is empty
    if (username.trim() === '' || password.trim() === '') {
      alert('Please enter a username and password.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/register', { username, password });

      console.log('Registration response:', response);

      if (response.data.registration) {
        setRegistrationSuccess(true);
        alert('Registration successful. You can now log in.');
          navigate('/login');
      } else {
        alert('Registration failed. ' + response.data.message);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  if (registrationSuccess) {
    return null; // or render a different component/page if needed
  }

  return (
    <div className="container flex max-w-none">
      <Navbar />

      <div className="background-image flex items-center justify-center ml-12">
        <div className="rectangle-shape place-content-center bg-gray-300 m-[5rem] p-10 rounded-lg w-[30rem] h-[30rem] bg-opacity-10">
          <div className="mb-4">
            <div className="text-green-400 text-4xl ml-[5rem] font-bold">Create Account</div>

            <label htmlFor="username" className="block text-sm font-medium text-gray-600">
              <div className="text-green-400 font-bold">Username</div>
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 p-2 w-[25rem] border rounded-md"
              placeholder="Enter your username"
            />

            <div className="mb-4 pt-10">
              <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                <div className="text-green-400 font-bold">Password</div>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 p-2 w-[25rem] border rounded-md"
                placeholder="Enter your password"
              />
            </div>
              <button
                type="button"
                onClick={onRegister}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring focus:border-green-300"
              >
              Register
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
