// src/AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Adoption from './Adoption';
import Create from './CreateAccount';
import Forms from './Forms';
import Admin from './Admin';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/adoption" element={<Adoption/>} />
        <Route exact path="/create" element={<Create/>} />
        <Route exact path="/admin" element={<Admin/>} />
        <Route path="/forms/:PetName" element={<Forms/>} />
        <Route path="/adoption_page/:pageid" element={<Adoption />} />
        
        </Routes>
    </Router>
  );
}

export default AppRouter;
