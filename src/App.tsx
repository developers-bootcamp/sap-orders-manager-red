import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import { Routes } from 'react-router';
import LandingPage from "./pages/landingPage/LandingPage";
import { LogIn } from "./pages/Login";

import  GlobalLoader from './axios/loading/GlobalLoader';
import  './axios/GlobalAxios';
const App: React.FC = () => {


  return (
    <div>
      <GlobalLoader></GlobalLoader>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LogIn />} />
        </ Routes>
      </BrowserRouter>

    </div>
  );
};

export default App;
