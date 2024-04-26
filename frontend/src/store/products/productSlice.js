import { createSlice, current } from '@reduxjs/toolkit'
import * as actions from './asyncActions'

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        listProducts: [],
        isLoading: false,
        isError: '',
        counts: 0,
        detailProduct: {},
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(actions.getDetailProduct.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(actions.getDetailProduct.fulfilled, (state, action) => {
            state.isLoading = false
            state.detailProduct = action.payload.dataProduct
        })
        builder.addCase(actions.getDetailProduct.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
        })

        builder.addCase(actions.getProductParams.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(actions.getProductParams.fulfilled, (state, action) => {
            state.isLoading = false
            state.listProducts = action.payload.dataProduct
            state.counts = action.payload.counts
        })
        builder.addCase(actions.getProductParams.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
        })

        builder.addCase(actions.submitRating.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(actions.submitRating.fulfilled, (state, action) => {
            state.isLoading = false
            state.detailProduct = action.payload
        })
        builder.addCase(actions.submitRating.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
        })
    }
})

export const { } = productSlice.actions

export default productSlice.reducer
