import axios from "axios"
import { UPDATE_ORDER, GET_ALL_ORDERS_URL} from "../config/config"
import IOrder from "../interfaces/IOrder"

export const updateOrder = async (order: IOrder) => {
    return await axios.put(`${UPDATE_ORDER}`, order)
}

export const getAllOrders = async () => {
    return await axios.get(`${GET_ALL_ORDERS_URL}`)
}

