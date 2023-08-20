import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import IProduct from '../../interfaces/IProduct'

interface IProductState {
    prooducts: Array<IProduct>,
}

const initialState: IProductState = {
    prooducts: [],
}

export const productSlice = createSlice({
    name: 'productReducer',
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<Array<IProduct>>) => {
            state.prooducts = action.payload;
        },
    },
})

export const { setProducts } = productSlice.actions
export default productSlice.reducer;

