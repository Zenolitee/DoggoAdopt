import React, { useState } from 'react';
import "../css/Login.css";
import Navbar from "./Navbar.js";
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onFinish = async () => {
    try {
      const response = await axios.post('http://localhost:3001/validatePassword', { username, password });

      console.log('Login response:', response);  // Add this line

      if (response.data.validation) {
        alert('Login successful.');
      } else {
        alert('Incorrect password or user not registered.');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="container flex max-w-none">
      <Navbar />

      <div className="background-image ml-12">
        <div className="rectangle-shape place-content-center bg-gray-300 m-[5rem] p-10 rounded-lg w-[30rem] h-[30rem] bg-opacity-10">
          <div className="mb-4">
            <div className="text-green-400 text-4xl ml-[9rem] font-bold">Login</div>

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
            <Link to="/create" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring focus:border-green-300">
              Register
            </Link>
            <button
              type="button"
              onClick={onFinish}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300 ml-[1rem]"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
