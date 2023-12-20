// src/Home.js
import React from 'react';
import "../css/Navbar.css";
import { FaHouseChimney, FaDog, FaGear, FaUser } from "react-icons/fa6";


const Navbar = () => {
  return (
    
    <div className="flex flex-col h-screen w-16 flex flex-col
                    bg-primary text-secondary shadow-lg fixed top-0">
    
    <a href="/"><NavbarIcon icon={<FaHouseChimney size="30" />}/></a>
    <a href="/adoption"><NavbarIcon icon={<FaDog size="30" />}/></a>

    <div className="flex-grow"></div> {/* This div will take up the remaining space */}

    <div className = "flex flex-col mt-[auto] ml-[0.1rem]">
    <a href="/login"><NavbarIcon icon={<FaUser size="30" />}/></a>
    <a href="/settings"><NavbarIcon icon={<FaGear size="30" />}/></a></div> 
        
    
        
     

    </div>
  );
}

const NavbarIcon = ({icon}) =>(
    <div className="sidebar-icon">
      {icon}
    </div>
    );

export default Navbar;
