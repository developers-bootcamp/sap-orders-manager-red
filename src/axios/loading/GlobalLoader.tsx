import React, { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import Loader from './Loader';

const GlobalLoader: React.FC = () => {
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
      // Clean up interceptors to avoid memory leaks
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return (
    <div>
      {loading && <Loader />}
      {/* Your app content */}
    </div>
  );
};

export default GlobalLoader;