// src/Login.js
import React from 'react';
import "../css/Login.css";
import Navbar from "./Navbar.js"


const Login = () => {
  return (
    
    
  <div className="container flex max-w-none">
  <Navbar />
  <div className="background-image">
  <div className="mb-4 place-content-center">
  <div className="pl-8 rectangle-shape bg-gray-300 p-8 rounded-lg w-[30rem] h-[30rem] bg-opacity-20">
  
            <label htmlFor="username" className="block text-sm font-medium text-gray-600">
              <div className = "text-green-400 font-bold">Username</div>
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="mt-1 p-2 w-[30rem] border rounded-md"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
            <div className = "text-green-400 font-bold">Password</div>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 p-2 w-[30rem] border rounded-md"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
          >
            Login
          </button>
         
        
          </div>
    
  </div>
    
  
</div>
  

  );
}

export default Login;
