import axios from "axios"
import { ADD_PRODUCT, DELETE_PRODUCT, EDIT_PRODUCT, GET_ALL_PRODUCT } from "../config/config"
import IProduct from "../interfaces/IProduct"

export const getAllProduct = async () => {
    return await axios.get(`${GET_ALL_PRODUCT}`)
}
export const deleteProduct = async (id:string) => {
    return await axios.delete(`${DELETE_PRODUCT}/${id}`)
}

export const editProduct = async (id: string, product:IProduct) => {
    return await axios.put(`${EDIT_PRODUCT}/${id}`,product)
}

export const addProduct = async (product: IProduct) => {
    return await axios.post(`${ADD_PRODUCT}`, product)
}



