import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import { Routes } from 'react-router';

import LandingPage from "./pages/landingPage";
import {LogIn} from "./pages/login";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LogIn />} />
      </ Routes>
    </BrowserRouter>
  );
}

export default App;
