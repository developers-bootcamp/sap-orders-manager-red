import { configureStore } from "@reduxjs/toolkit"

import orderReducer from './slices/sliceOrder'
import globalReducer from './slices/sliceGlobal'
import userReducer from './slices/sliceUser'
import productReducer from './slices/sliceProduct'

export const store = configureStore({
    reducer: {
        orderReducer,
        globalReducer,
        userReducer,
        productReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>