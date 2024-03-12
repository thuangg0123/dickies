import { createSlice } from '@reduxjs/toolkit'
import * as actions from './asyncActions'

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        listProducts: [],
        isLoading: false,
        isError: ''
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(actions.getProductByGender.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(actions.getProductByGender.fulfilled, (state, action) => {
            state.isLoading = false
            state.listProducts = action.payload
        })
        builder.addCase(actions.getProductByGender.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
        })
    }
})

export const { } = productSlice.actions

export default productSlice.reducer