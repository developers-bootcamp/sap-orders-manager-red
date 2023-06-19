import React from 'react';
import './App.css';
// import SignUpComp from './login.tsx/signup/signup';
import { BrowserRouter, Route } from 'react-router-dom';
import { Routes } from 'react-router';
import LandingPage from "./pages/landing/landing";
import Login from "./pages/login/login";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
      </ Routes>
    </BrowserRouter>
    // <div className="App">

    //   <SignUpComp></SignUpComp>
    // </div>
  );
}

export default App;
