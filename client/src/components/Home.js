// src/Home.js
import React from 'react';
import "../css/Home.css";
import Navbar from "./Navbar.js"
const Home = () => {
  return (
    
    
  <div className="container flex max-w-none">
  <Navbar />
  <div className="background-image">
  <style>
  @import url('https://fonts.googleapis.com/css?family=Nunito:400,700&display=swap');
  </style>
    <h1 className="text-white ml-[4rem] mt-20 text-4xl font-nunito w-[24rem]">Bringing Love Home, One Paw at a Time.</h1>
    <p className="text-white ml-[4rem] mt-[0.5rem] w-[36rem] text-base font-nunito">Did you know? Studies show that people who have dogs often form strong parent-like bonds with their furry companions, treating them as cherished members of the family.</p>


    <button type="button" class="focus:outline-none text-white bg-green-500 hover:bg-green-800 focus:ring-1 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 ml-[4rem] mt-[1rem]">Learn More</button>
    
  </div>
</div>
  

  );
}

export default Home;
