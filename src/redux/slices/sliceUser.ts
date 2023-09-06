import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import IUser from '../../interfaces/IUser';

export interface IUserState {
    users: Array<IUser>,
    role: string,
}

const initialState: IUserState = {
    users: [],
    role: "",
}

export const userSlice = createSlice({
    name: 'userReducer',
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<Array<IUser>>) => {
            state.users = action.payload;
        },
        setRole: (state, action: PayloadAction<string>) => {
            state.role = action.payload;
        },
    },
})

export const { setUsers, setRole } = userSlice.actions
export default userSlice.reducer
