import axios from "axios"
import { LOG_IN } from "../config/config"
import { GET_ALL_USER } from "../config/config"

export const logIn = async (email: String, password: String) => {
    return await axios.get(`${LOG_IN}/${email}/${password}`)
}

export const getAllUser=async(pageNumber:number)=>{
    return await axios.get(`${GET_ALL_USER}/${pageNumber}`)
}


