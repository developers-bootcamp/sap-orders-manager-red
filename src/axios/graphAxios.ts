import axios from "axios"
import { TOP_EMPLOYEE } from "../config/config"

export const topEmployee = async() => {
    return await axios.get(TOP_EMPLOYEE)
}