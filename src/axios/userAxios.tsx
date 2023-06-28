import axios from "axios"
import { LOG_IN } from "../config/config"
import './globalAxios'

console.log(LOG_IN);

export const logIn = (email: String, password: String) => {
    console.log(LOG_IN);
    
    console.log(email + " " + password);
    return axios.get("http://localhost:8080/User/err");
    // return axios.get(`${LOG_IN}/${email}/${password}`);

}