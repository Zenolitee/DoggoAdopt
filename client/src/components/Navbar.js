// src/Home.js
import React from 'react';
import "../css/Navbar.css";
import { FaHouseChimney, FaDog, FaGear, FaUser } from "react-icons/fa6";


const Navbar = () => {
  return (
    
    <div className="container top-0 left-0 h-screen w-16 flex flex-col
                    bg-primary text-secondary shadow-lg">
    
    <a href="/"><NavbarIcon icon={<FaHouseChimney size="30" />}/></a>
    <a href="/adoption"><NavbarIcon icon={<FaDog size="30" />}/></a>

    <div className = "fixed bottom-0 left-0 flex flex-col ml-[0.4rem]">
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
