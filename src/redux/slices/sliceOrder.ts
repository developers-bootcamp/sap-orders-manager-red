import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import IOrder from "../../interfaces/IOrder"

interface IOrderState {
    orders: Array<IOrder>,
}

const initialState: IOrderState = {
    orders: [],
}

export const orderSlice = createSlice({
    name: 'orderReducer',
    initialState,
    reducers: {
        setOrders: (state, action: PayloadAction<Array<IOrder>>) => {
            state.orders = action.payload;
        },
    },
})

export const { setOrders } = orderSlice.actions
export default orderSlice.reducer;

