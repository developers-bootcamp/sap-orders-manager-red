import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ICurrencyState {
    listOfCurrencies: string[],
}

const initialState: ICurrencyState = {
    listOfCurrencies: [],
}

export const currencySlice = createSlice({
    name: 'currencyReducer',
    initialState,
    reducers: {
        setCurrencies: (state, action: PayloadAction<Array<string>>) => {
            state.listOfCurrencies = action.payload;
        },
    },
})

export const { setCurrencies } = currencySlice.actions
export default currencySlice.reducer

