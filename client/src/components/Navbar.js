// Navbar.js

import React from 'react';
import { FaHouseChimney, FaDog, FaGear, FaUser, FaDoorOpen } from "react-icons/fa6";
import { useAuth } from '../context/Auth';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex flex-col h-screen w-16 bg-primary text-secondary shadow-lg fixed top-0">
      <a href="/"><NavbarIcon icon={<FaHouseChimney size="30" />} /></a>
      <a href="/adoption"><NavbarIcon icon={<FaDog size="30" />} /></a>

      <div className="flex-grow"></div>

      {user ? (
        <div className="flex flex-col mt-[auto] ml-[0.1rem]">
          <a href="/settings"><NavbarIcon icon={<FaGear size="30" />} /></a>
          <a href="#" onClick={logout}><NavbarIcon icon={<FaDoorOpen size="30" />} /></a>
        </div>
      ) : (
        <a href="/login"><NavbarIcon icon={<FaUser size="30" />} /></a>
      )}
    </div>
  );
}

const NavbarIcon = ({ icon }) => (
  <div className="sidebar-icon">
    {icon}
  </div>
);

export default Navbar;
