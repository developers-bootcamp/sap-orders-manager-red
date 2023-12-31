import axios from "axios"
import { UPDATE_ORDER, GET_ALL_ORDERS_URL, GET_ORDERS_FILTERING_URL, GET_FAILED_ORDERS_FILTERING_URL, GET_COUNT_OF_ORDERS_BY_FAILED, GET_COUNT_OF_ORDERS } from "../config/config"
import IOrder from "../interfaces/IOrder"

export const updateOrder = async (order: IOrder) => {
    return await axios.put(`${UPDATE_ORDER}`, order)
}

export const getAllOrders = async () => {
    return await axios.get(`${GET_ALL_ORDERS_URL}`)
}

export const getOrders = async (pageSize: number, map:{}) => {
    console.log('sf ax');
    return await axios.post(`${GET_ORDERS_FILTERING_URL}/${pageSize}`,map)
}

export const getFailedOrders = async (pageSize: number, map:{}) => {
    console.log('ss axios')
    return await axios.post(`${GET_FAILED_ORDERS_FILTERING_URL}/${pageSize}`,map)
}

export const getCountOfOrders = async () => {
    return await axios.get(`${GET_COUNT_OF_ORDERS}`,{})
}

export const getCountOfOrdersByFailed = async () => {
    return await axios.get(`${GET_COUNT_OF_ORDERS_BY_FAILED}`,{})
}
