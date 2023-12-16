// src/Home.js
import React from 'react';
import "../css/Navbar.css";
import { FaHouseChimney, FaDog } from "react-icons/fa6";


const Navbar = () => {
  return (
    
    <div className="container top-0 left-0 h-screen w-16 flex flex-col
                    bg-primary text-secondary shadow-lg">
    
    <a href="/"><NavbarIcon icon={<FaHouseChimney size="30" />}/></a>
    <a href="/about"><NavbarIcon icon={<FaDog size="30" />}/></a>
        
    
        
     

    </div>
  );
}

const NavbarIcon = ({icon}) =>(
    <div className="sidebar-icon">
      {icon}
    </div>
    );

export default Navbar;
