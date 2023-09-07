import axios from "axios"
import { UPDATE_ORDER, GET_ALL_ORDERS_URL, GET_ORDERS_FILTERING_URL, GET_FAILED_ORDERS_FILTERING_URL } from "../config/config"
import IOrder from "../interfaces/IOrder"
import { mainModule } from "process"
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { IOrderState } from "../redux/slices/sliceOrder"

export const updateOrder = async (order: IOrder) => {
    return await axios.put(`${UPDATE_ORDER}`, order)
}

export const getAllOrders = async () => {
    return await axios.get(`${GET_ALL_ORDERS_URL}`)
}

export const getOrders = async (pageSize: number, map: Map<string, object>) => {
    console.log('sf ax');
    return await axios.post(`${GET_ORDERS_FILTERING_URL}/${pageSize}`,map)
}

export const getFailedOrders = async (pageSize: number, map: Map<string, object>) => {
    console.log('ss axios')
    return await axios.post(`${GET_FAILED_ORDERS_FILTERING_URL}/${pageSize}`,map)
}
