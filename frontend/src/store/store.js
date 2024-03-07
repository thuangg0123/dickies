import { configureStore } from '@reduxjs/toolkit'
import appReducer from '../store/appSlice'

export const store = configureStore({
    reducer: {
        app: appReducer,
    },
})