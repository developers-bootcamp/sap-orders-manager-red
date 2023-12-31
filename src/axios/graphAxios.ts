import axios from "axios"
import { TOP_EMPLOYEE, TOP_PRODUCTS, DYNAMIC_GRAPH, GET_STATUS } from "../config/config"

export const topEmployee = async () => {
    return await axios.get(TOP_EMPLOYEE)
}

export const topProducts = async (rangeOfMonths: number) => {
    return await axios.get(`${TOP_PRODUCTS}/${rangeOfMonths}`)
}

export const getStatus = async () => {
    return await axios.get(`${GET_STATUS}`)
}

export const dynamicGraph = async (subject: string, field: string) => {
    return await axios.get(`${DYNAMIC_GRAPH}/${subject}/${field}`)
}