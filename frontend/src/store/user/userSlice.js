import { createSlice } from '@reduxjs/toolkit'
import * as actions from './asyncActions'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        current: null,
        token: null,
        isLoading: false,
        message: "",
        currentCart: []
    },
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
            state.token = action.payload.token
        },
        logout: (state) => {
            state.isLoggedIn = false
            state.token = null
            state.current = null
            state.isLoading = false
            state.message = ""
            state.currentCart = []
        },
        clearMessage: (state) => {
            state.message = ''
        },
        updateCart: (state, action) => {
            const { productId, quantity, color } = action.payload
            const updatingCart = JSON.parse(JSON.stringify(state.currentCart))
            state.currentCart = updatingCart.map(element => {
                if (element.color === color && element.product?._id === productId) {
                    return { ...element, quantity }
                }
                else {
                    return element
                }
            })
        }
    },
    extraReducers: (builder) => {
        builder.addCase(actions.getCurrent.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(actions.getCurrent.fulfilled, (state, action) => {
            state.isLoading = false
            state.isLoggedIn = true
            state.current = action.payload;
            state.currentCart = action.payload.cart
        })
        builder.addCase(actions.getCurrent.rejected, (state, action) => {
            state.isLoading = false
            state.current = null
            state.isLoggedIn = false
            state.token = null
            state.message = "Your session has expired, please log in again."
        })
    }
})

export const { login, logout, clearMessage, updateCart } = userSlice.actions

export default userSlice.reducer
