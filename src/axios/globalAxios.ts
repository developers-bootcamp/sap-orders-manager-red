import axios from "axios";
import { GET_CURRENCIES, LOG_IN , SIGN_UP } from "../config/config";
import { getFromLocalStorage } from "../storageUtils";

axios.interceptors.request.use(
    (config: any) => {
        console.log("token: " +getFromLocalStorage("userToken")); 
        let userToken = getFromLocalStorage("userToken");
        if (config.url.indexOf(GET_CURRENCIES) === 0 && config.url.indexOf(LOG_IN) === 0 && config.url.indexOf(SIGN_UP) === 0) {
            config.headers["token"] = userToken;
        }
        console.log(config);
        return config;
    },
    (error: any) => {
        return Promise.reject(error);
    }
)

axios.interceptors.response.use(
    (response: any) => {
        console.log("I come interceptore response");
        console.log(response);
        return response;
    },
    (error: any) => {
        // if (error.response.status !== 401)
        //     alert("ארע שגיאה אנא פנה למנהל המערכת");
        return Promise.reject(error);
    }
);
