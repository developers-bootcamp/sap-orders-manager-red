import React, { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { GET_CURRENCIES, LOG_IN } from "../config/config";
import { getFromLocalStorage } from "../storageUtils";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../redux/store'

import { useAppDispatch } from "../redux/store";
import { startLoading, stopLoading } from "../redux/slices/sliceLoader";

const GlobalAxios: React.FC = () => {

  const dispatch = useAppDispatch();
  const requestInterceptor = axios.interceptors.request.use(
    (config: any) => {


      let userToken = getFromLocalStorage("userToken");
      if (config.url.indexOf(LOG_IN) !== 0 && userToken) {
        config.headers["token"] = userToken;
      }
      console.log(config);
      dispatch(startLoading());
      return config;
    },
    (error: any) => {
      return Promise.reject(error);
    }
  )
  const responseInterceptor = axios.interceptors.response.use(
    (response: any) => {
      console.log("I come interceptore response");
      console.log(response);
      dispatch(stopLoading());
      return response;
    },
    (error: any) => {
      // if (error.response.status !== 401)
      //     alert("ארע שגיאה אנא פנה למנהל המערכת");
      return Promise.reject(error);
    }
  );

  return (
    <></>
  );
};
export default GlobalAxios
