import axios from "axios"
import { SIGN_UP } from "../config/config"

export const signUp = async (fullName: string, companyName: string, currency: string, email: string, password: string) => {
    return await axios.post(`${SIGN_UP}?fullName=${fullName}&companyName=${companyName}&currency=${currency}&email=${email}&password=${password}`)

}


