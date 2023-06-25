import axios from 'axios';
import { useState, useEffect } from 'react';
import { Alert } from '@mui/material';
const Survey: React.FC = () => {

    axios.interceptors.request.use(
        (config: any) => {
            const token = localStorage.getItem("access_token");
            if (token) {
                config.headers["Authorization"] = 'Bearer' + token;
            }
            console.log(config);
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
    axios.interceptors.response.use(
        (res) => {
            return res;
        },
        async (err) => {
            if (err.response.status != 404) {
                alert("ארע שגיאה אנא פנה למנהל המערכת");
            }
            return Promise.reject(err);
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

