import axios from "axios"
import { LOG_IN } from "../config/config"

export const logIn = async (email: String, password: String) => {
    return await axios.get(`${LOG_IN}/${email}/${password}`)
}