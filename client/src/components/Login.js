import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { useAuth } from '../context/Auth';

const Login = () => {
  const { login, user } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onFinish = async () => {
    try {
      const loginResult = await login(username, password);
  
      console.log('Login result:', loginResult);
  
      if (loginResult.success) {
        // Redirect or handle successful login
        console.log('Login successful');
      } else {
        // Handle failed login
        console.log('Login failed');
      }
    } catch (error) {
      // Handle the error...
      console.error('Error during login:', error);
    }
  };
  

  console.log('User:', user);

  return (
    <div className="container flex max-w-none">
      <Navbar />

      <div className="background-image flex items-center justify-center ml-12">
        <div className="rectangle-shape place-content-center bg-gray-300 m-[5rem] p-10 rounded-lg w-[30rem] h-[30rem] bg-opacity-10">
          <div className="mb-4">
            {user ? (
              <div className="text-green-400 text-4xl ml-[9rem] font-bold">You are logged in!</div>
            ) : (
              <>
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
                  className="bg-blue-500
                  text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300 ml-[1rem]"
                >
                  Login
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
