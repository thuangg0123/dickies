import { createSlice } from '@reduxjs/toolkit'
// import * as actions from './asyncActions'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        current: null,
        token: null
    },
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
            state.current = action.payload.userData
            state.token = action.payload.token
        }
    },
    extraReducers: (builder) => {
    }
})

export const { login } = userSlice.actions

export default userSlice.reducer
