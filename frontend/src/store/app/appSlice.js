import { createSlice } from '@reduxjs/toolkit'
import * as actions from './asyncActions'

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        categories: [],
        isLoading: false,
        isError: false,
        productByCategory: [],
        isLoadingProducts: false,
        isErrorProducts: false,
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(actions.getCategories.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(actions.getCategories.fulfilled, (state, action) => {
            state.isLoading = false
            state.categories = action.payload
        })
        builder.addCase(actions.getCategories.rejected, (state, action) => {
            state.isLoading = false
            state.categories = []
            state.isError = true
        })

        // get product by category
        builder.addCase(actions.getProductByCategory.pending, (state, action) => {
            state.isLoadingProducts = true
        })
        builder.addCase(actions.getProductByCategory.fulfilled, (state, action) => {
            state.isLoadingProducts = false;
            state.productByCategory = [...state.productByCategory, ...action.payload];
        })
        builder.addCase(actions.getProductByCategory.rejected, (state, action) => {
            state.isLoadingProducts = false
            state.isErrorProducts = true
        })
    }
})

export const { } = appSlice.actions

export default appSlice.reducer