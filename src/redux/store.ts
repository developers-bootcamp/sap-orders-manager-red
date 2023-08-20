import { configureStore } from "@reduxjs/toolkit"

import orderReducer from './slices/sliceOrder'
import currencyReducer from './slices/sliceCurrency'
import userReducer from './slices/sliceUser'
import productReducer from './slices/sliceProduct'
import loadingReducer from './slices/sliceLoader'
import { useDispatch } from "react-redux"

export const store = configureStore({
    reducer: {
        orderReducer,
        currencyReducer,
        userReducer,
        productReducer,
        loadingReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
