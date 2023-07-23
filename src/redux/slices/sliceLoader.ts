import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export interface ILoadingState {
   loading:boolean,
}

const initialState: ILoadingState = {
    loading: false,
}

export const loadingSlice = createSlice({
    name: 'loadingReducer',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
    },
})

export const { setLoading } = loadingSlice.actions
export default loadingSlice.reducer;
