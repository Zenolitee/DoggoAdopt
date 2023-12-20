// src/About.js
import React from 'react';
import Navbar from "./Navbar.js"
import "../css/Adoption.css"

const About = () => {
  return (
    <div className="container flex max-w-none">
      <Navbar />
      <div className="background-image flex flex-wrap">
        <div className="rectangle-shape bg-gray-300 rounded-lg w-[30rem] h-[30rem] bg-opacity-20 mt-[5rem] ml-[13rem]">
          <div className="text-green-400 font-bold flex items-center mt-[1rem] justify-center text-4xl">T e s t</div>
        </div>

        <div className="rectangle-shape bg-gray-300 rounded-lg w-[30rem] h-[30rem] bg-opacity-20 mt-[5rem] ml-[3rem]">
          <p>test</p>
        </div>

        <div className="rectangle-shape bg-gray-300 rounded-lg w-[30rem] h-[30rem] bg-opacity-20 mt-[5rem] ml-[3rem]">
          <p>test</p>
        </div>

        <div className="rectangle-shape bg-gray-300 rounded-lg w-[30rem] h-[30rem] bg-opacity-20 mt-[5rem] ml-[3rem]">
          <p>test</p>
        </div>

        {/* Add another panel below the first one */}
        <div className="rectangle-shape bg-gray-300 rounded-lg w-[30rem] h-[30rem] bg-opacity-20 mt-[5rem] ml-[13rem]">
          <div className="text-green-400 font-bold flex items-center mt-[1rem] justify-center text-4xl">New Panel</div>
        </div>

        <div className="rectangle-shape bg-gray-300 rounded-lg w-[30rem] h-[30rem] bg-opacity-20 mt-[5rem] ml-[3rem]">
          <p>test</p>
        </div>

        <div className="rectangle-shape bg-gray-300 rounded-lg w-[30rem] h-[30rem] bg-opacity-20 mt-[5rem] ml-[3rem]">
          <p>test</p>
        </div>

        <div className="rectangle-shape bg-gray-300 rounded-lg w-[30rem] h-[30rem] bg-opacity-20 mt-[5rem] ml-[3rem]">
          <p>test</p>
        </div>
        
        
      </div>
    </div>
  );
}

export default About;
