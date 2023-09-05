import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import IOrder from "../../interfaces/IOrder"
import IOrderItem from "../../interfaces/IOrderItem"
import IUser from "../../interfaces/IUser"

export interface IOrderState {
    orders: Array<IOrder>,
    statusOrders: Array<IOrder>
    failedOrders: Array<IOrder>,
    order: IOrder
}

const initialState: IOrderState = {
    orders: [],
    statusOrders: [],
    failedOrders: [],
    order: {}
}

export const orderSlice = createSlice({
    name: 'orderReducer',
    initialState,
    reducers: {
        setOrders: (state, action: PayloadAction<Array<IOrder>>) => {
            state.orders = action.payload;
        },
        setStatusOrders:(state, action: PayloadAction<Array<IOrder>>) => {
            state.statusOrders = action.payload;
        },
        setFailedOrders: (state, action: PayloadAction<Array<IOrder>>) => {
            state.failedOrders = action.payload;
        },
        setOrder: (state, action: PayloadAction<IOrder>) => {
            state.order = action.payload;
        },
        insertProductsToOrder: (state, action: PayloadAction<Array<IOrderItem>>) => {
            state.order.orderItemsList = action.payload
        },
        insertCustomerToOrder: (state, action: PayloadAction<string>) => {
            state.order.customerId = { id: action.payload }
        },
    },
})

export const { setOrders, insertProductsToOrder, insertCustomerToOrder, setOrder, setFailedOrders, setStatusOrders } = orderSlice.actions
export default orderSlice.reducer;

