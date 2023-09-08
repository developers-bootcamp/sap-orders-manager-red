import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import IOrder from "../../interfaces/IOrder"
import IOrderItem from "../../interfaces/IOrderItem"


export interface IOrderState {
    orders: Array<IOrder>,
    statusOrders: Array<IOrder>
    failedOrders: Array<IOrder>,
    order: IOrder,
    firstPaginationModel:{pageSize: number, page: number}
    secondPaginationModel:{pageSize: number, page: number}
    filters:any,
}

const initialState: IOrderState = {
    orders: [],
    statusOrders: [],
    failedOrders: [],
    order: {},
    firstPaginationModel:{pageSize: 3, page: 0},
    secondPaginationModel:{pageSize: 3, page: 0},
    filters:{}
}

export const orderSlice = createSlice({
    name: 'orderReducer',
    initialState,
    reducers: {
        setOrders: (state, action: PayloadAction<Array<IOrder>>) => {
            state.orders = action.payload;
        },
        addOrder: (state, action) => {
            if(action.payload.orderStatus=="CANCELLED")
                state.failedOrders.unshift(action.payload);
            else
                state.statusOrders.unshift(action.payload);

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
        setfirstPaginationModel: (state) => {
            console.log("message in first page")
            state.firstPaginationModel.page+=1;
        },
        setSecondPaginationModel: (state) => {          
            console.log("message in second page")
            state.secondPaginationModel.page+=1;
        },
        setFilters: (state, action: PayloadAction<IOrder>) => {
            state.filters = action.payload;
        },
        insertProductsToOrder: (state, action: PayloadAction<Array<IOrderItem>>) => {
            state.order.orderItemsList = action.payload
        },
        insertCustomerToOrder: (state, action: PayloadAction<string>) => {
            state.order.customerId = { id: action.payload }
        },
    },
})

export const { setOrders, insertProductsToOrder, addOrder,insertCustomerToOrder, setOrder, setFailedOrders, setStatusOrders,setSecondPaginationModel,setfirstPaginationModel,setFilters } = orderSlice.actions
export default orderSlice.reducer;

