import axios from "axios"
import { UPDATE_ORDER, GET_ALL_ORDERS_URL, GET_ORDERS_FILTERING_URL, GET_FAILED_ORDERS_FILTERING_URL,GET_LENGTH_OF_LIST_URL } from "../config/config"
import IOrder from "../interfaces/IOrder"

export const updateOrder = async (order: IOrder) => {
    return await axios.put(`${UPDATE_ORDER}`, order)
}

export const getAllOrders = async () => {
    return await axios.get(`${GET_ALL_ORDERS_URL}`)
}

export const getOrders = async (pageSize: number, map: Map<string, object>) => {
    return await axios.post(`${GET_ORDERS_FILTERING_URL}/${pageSize}`, map)
}

export const getFailedOrders = async (pageSize: number, map: Map<string, object>) => {
    return await axios.post(`${GET_FAILED_ORDERS_FILTERING_URL}/${pageSize}`, map)
}
 export const getAmountOfOrders= async (flag:boolean)=>{
    
 }
