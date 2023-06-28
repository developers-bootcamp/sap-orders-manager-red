import axios from "axios";
import { LOG_IN } from "../config/config";
let userToken = localStorage.getItem("userToken");

axios.interceptors.request.use(
    (config: any) => {
        if (config.url.indexOf(LOG_IN) != 0 && userToken) {
            config.headers["Authorization"] = 'Bearer' + userToken
        }
        console.log(config);
        return config;
    },
    (error: any) => {
        return Promise.reject(error);
    }
);
axios.interceptors.response.use(
    (response: any) => {
        console.log("I come interceptore response");
        return response;
    },
    (error: any) => {
        if (error.response.status != 401)
            alert("ארע שגיאה אנא פנה למהנל המערכת");
        else
            return Promise.reject(error);
    }
);
