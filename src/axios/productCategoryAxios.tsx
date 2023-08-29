import axios from "axios"
import { GET_ALL_CATEGORY, DELETE_CATEGORY, EDIT_CATEGORY, ADD_CATEGORY } from "../config/config"
import IProductCategory from "../interfaces/IProductCategory"


export const getAllCategory = async () => {
    return await axios.get(`${GET_ALL_CATEGORY}`)
}

export const deleteCategory = async (id: string) => {
    return await axios.delete(`${DELETE_CATEGORY}/${id}`)
}

export const editCategory = async (productCategory: IProductCategory) => {
    return await axios.put(`${EDIT_CATEGORY}`, productCategory)
}

export const addCategory = async (productCategory: IProductCategory) => {
    return await axios.post(`${ADD_CATEGORY}`, productCategory)
}


