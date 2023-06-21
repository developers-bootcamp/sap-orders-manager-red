import axios from "axios"
import { LOG_IN } from "../config/config"

console.log(LOG_IN);

export const logIn = (email: String, password: String) => {
    console.log(LOG_IN);
    
    debugger
    console.log(email + " " + password);
    return axios.get(`${LOG_IN}/${email}/${password}`)
}