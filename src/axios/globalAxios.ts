import axios from "axios";
import { GET_CURRENCIES, LOG_IN, SIGN_UP } from "../config/config";
import { getFromLocalStorage } from "../storageUtils";

axios.interceptors.request.use(
    (config: any) => {
        debugger
        const logIn: string = LOG_IN, signUp: string = SIGN_UP , getCurrencies: string = GET_CURRENCIES       
        let userToken = getFromLocalStorage("userToken");
        if (!(config.url.indexOf(logIn) !== 0 || config.url.indexOf(signUp) !== 0 || config.url.indexOf(getCurrencies) !== 0)) {
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
