import React from 'react';
import './App.css';
import { BrowserRouter, Route , Link} from 'react-router-dom';
import { Routes } from 'react-router';
import LandingPage from "./pages/landing";
import Login from "./pages/login";
import CatalogManager from './components/catalogManager';
import Dashboard from './components/dashboard';
import PendingOrders from './components/pendingOrders';
import UserManagements from './components/usersManagement';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

// import SignUpComp from './components/signup';

function App() {
  return (

    <BrowserRouter>
      <Tabs>
          <Tab label="pendingOrders" component={Link} to="/pendingOrders" />
          <Tab label="dashboard" component={Link} to="/dashboard" />
          <Tab label="catalogManager" component={Link} to="/catalogManager" />
          <Tab label="usersManagement" component={Link} to="/usersManagement" />
      </Tabs>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/catalogManager" element={<CatalogManager />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pendingOrders" element={<PendingOrders />} />
        <Route path="/usersManagement" element={<UserManagements />} />
        {/* <Route path="/signUp" element={<SignUpComp />} /> */}
      </ Routes>
    </BrowserRouter>
  );
}

export default App;
