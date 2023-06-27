import React from 'react';
import './App.css';
import { BrowserRouter, Route , Link} from 'react-router-dom';
import { Routes } from 'react-router';
import LandingPage from "./pages/landingPage";
import Login from "./pages/login";

// import SignUpComp from './components/signup';

function App() {
  return (

    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
      </ Routes>
    </BrowserRouter>
  );
}

export default App;
