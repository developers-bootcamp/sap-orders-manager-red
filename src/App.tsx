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

        {/* <Route path="/catalogManager" element={<CatalogManager />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pendingOrders" element={<PendingOrders />} />
        <Route path="/usersManagement" element={<UserManagements />} /> */}
        {/* <Route path="/signUp" element={<SignUpComp />} /> */}

      </ Routes>
    </BrowserRouter>
  );
}

export default App;
