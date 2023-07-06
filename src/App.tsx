import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import { Routes } from 'react-router';
import LandingPage from "./pages/landingPage/LandingPage";
import { LogIn } from "./pages/Login";

// App.tsx
import React, { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import Loader from '../src/axios/loading/Loader';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        setLoading(true);
        return config;
      }
    );
debugger;
    const responseInterceptor = axios.interceptors.response.use(
      (response: AxiosResponse) => {
        setLoading(false);
        return response;
      },
      (error: AxiosError) => {
        setLoading(false);
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return (
    <div>
       <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LogIn />} />
      </ Routes>
    </BrowserRouter>
      {loading && <Loader />}
      {/* Your app content */}
    </div>
  );
};

export default App;
