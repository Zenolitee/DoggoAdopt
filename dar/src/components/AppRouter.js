// src/AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import About from './About';
import Create from './CreateAccount';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/about" element={<About/>} />
        <Route exact path="/create" element={<Create/>} />
        
        </Routes>
    </Router>
  );
}

export default AppRouter;
