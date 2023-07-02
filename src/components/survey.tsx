//import axios from 'axios';
// import { useState, useEffect } from 'react';
// import { Alert } from '@mui/material';
// import {BASE_URL} from '../config/.config';

export const BASE_URL= process.env.DASHBOARD_API_BASE_URL;

const axios = require('axios');
const refreshTokenEndpoint = `${BASE_URL}//refresh_token`;
let accessToken = localStorage.getItem("accessToken");
let refreshToken = localStorage.getItem("refreshToken");
const Survey: React.FC = () => {

    // Function to refresh the access token using the refresh token
    async function refreshAccessToken() {
        try {
            const response = await axios.post(refreshTokenEndpoint, {
                refresh_token: refreshToken
            });
            accessToken = response.data.access_token;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
    axios.interceptors.request.use(
        (config: any) => {
            if (accessToken) {
                config.headers["Authorization"] = 'Bearer' + accessToken;
            }
            console.log(config);
            return config;
        },
        (error: any) => {
            return Promise.reject(error);
        }
    );
    axios.interceptors.response.use(
        (response: any) => response,
        (error: any) => {
            const originalRequest = error.config;
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                return refreshAccessToken().then(() => {
                    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                    return axios(originalRequest);
                });
                // return Promise.reject(err);
            }
        }
    );
    async function example() {
        try {
            const response = await axios.get("https://glitch.com/:");
            console.log(response.data);
        }
        catch (err) {
            console.error(err);
        }
    }
    return (
        <div>
            <h1>hello</h1>
            <button onClick={example}></button>
        </div>
    )

};
export default Survey;

