import React from 'react';
import './App.css';
// import SignUpComp from './login.tsx/signup/signup';
import { BrowserRouter, Route } from 'react-router-dom';
import { Routes } from 'react-router';
import LandingPage from "./pages/landing";
import Login from "./pages/login";
import SignUpComp from './components/signup';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUpComp />} />
      </ Routes>
    </BrowserRouter>
  );
}

export default App;
