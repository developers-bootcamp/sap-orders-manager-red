import axios from "axios"
import { LOG_IN } from "../config/config"

export const logIn = (email: String, password: String) => {
    return axios.get(`${LOG_IN}/${email}/${password}`)
}