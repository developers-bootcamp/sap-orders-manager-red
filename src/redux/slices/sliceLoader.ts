import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export interface ILoadingState {
    loading: boolean,
    isExistLoading: number
}

const initialState: ILoadingState = {
    loading: false,
    isExistLoading: 0
}

export const loadingSlice = createSlice({
    name: 'loadingReducer',
    initialState,
    reducers: {
        startLoading: (state, action: PayloadAction<void>) => {
            state.loading = true;
            state.isExistLoading++;
        },
        stopLoading: (state, action: PayloadAction<void>) => {
            state.isExistLoading--;
            if (state.isExistLoading == 0) {
                state.loading = false;
            }
        }
    },
})

export const { startLoading, stopLoading } = loadingSlice.actions
export default loadingSlice.reducer;
