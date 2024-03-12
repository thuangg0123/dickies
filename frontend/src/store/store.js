import { configureStore } from '@reduxjs/toolkit'
import appReducer from '../store/app/appSlice'
import productReducer from '../store/products/productSlice'

export const store = configureStore({
    reducer: {
        app: appReducer,
        product: productReducer,
    },
})