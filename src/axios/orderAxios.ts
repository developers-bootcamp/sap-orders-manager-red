import axios from "axios"
import { UPDATE_ORDER } from "../config/config"
import IOrder from "../interfaces/IOrder"

export const updateOrder = async (order: IOrder) => {
    return await axios.put(`${UPDATE_ORDER}`, order)
}

