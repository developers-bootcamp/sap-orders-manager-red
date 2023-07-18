import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface IGlobalState {
    listOfCurrencies: string[],
}

const initialState: IGlobalState = {
    listOfCurrencies: [],
}

export const globalSlice = createSlice({
    name: 'globalReducer',
    initialState,
    reducers: {
        setCurrencies: (state, action: PayloadAction<Array<string>>) => {
            state.listOfCurrencies = action.payload;
        },
    },
})

export const { setCurrencies } = globalSlice.actions
export default globalSlice.reducer

