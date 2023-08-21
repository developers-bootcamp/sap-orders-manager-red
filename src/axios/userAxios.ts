import axios from "axios"
import { ADD_USER, DELETE_USER, EDIT_USER, LOG_IN } from "../config/config"
import { GET_ALL_USER } from "../config/config"

import IUser from "../interfaces/IUser"

export const logIn = async (email: String, password: String) => {
    return await axios.get(`${LOG_IN}/${email}/${password}`)
}

export const getAllUser=async(pageNumber:number)=>{
    return await axios.get(`${GET_ALL_USER}/${pageNumber}`)
}

export const deleteUser = async (id: string) => {
    return await axios.delete(`${DELETE_USER}/${id}`)
}

export const editUser = async (id: string, user: IUser) => {
    return await axios.put(`${EDIT_USER}/${id}`, user)
}

export const addUser = async (user: IUser) => {
    return await axios.post(`${ADD_USER}`, user)
}



