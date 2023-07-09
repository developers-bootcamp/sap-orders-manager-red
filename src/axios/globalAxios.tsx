import axios from "axios";
import { LOG_IN } from "../config/config";
import { getFromLocalStorage } from "../storageUtils";

axios.interceptors.request.use(
    (config: any) => {
        let userToken = getFromLocalStorage("userToken");
        if (config.url.indexOf(LOG_IN) !== 0 && userToken) {
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
        if (error.response.status !== 401)
            alert("ארע שגיאה אנא פנה למהנל המערכת");
        return Promise.reject(error);
    }
);
