import React from 'react';
import './App.css';
import Navigation from "./Navigation.js";
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.js';
import SignIn from './pages/SignIn.js';
import Calls from './pages/Calls.js';
import SignUp from './pages/SignUp.js';
import Profile from './pages/Profile.js';
import RoutesDrive from './pages/Routes.js';
import EitherOr from './pages/VolunteerOrAdmin.js';
import TrueProfile from './pages/TrueProfile.js';



function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/home" element={<Home/>} />
        <Route path="/" element={<SignIn/>} />
        <Route path="/calls" element={<Calls/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/routes" element={<RoutesDrive/>} />
        
        <Route path="/trueprofile" element={<TrueProfile/>} />

        <Route path="/volunteeroradmin" element={<EitherOr/>} />

      </Routes>
    </Router>
  );
}

export default App;