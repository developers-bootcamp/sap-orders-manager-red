import axios from "axios"
import { GET_ALL_PRODUCT } from "../config/config"

export const getAllProduct = async () => {
    return await axios.get(`${GET_ALL_PRODUCT}`)
}


