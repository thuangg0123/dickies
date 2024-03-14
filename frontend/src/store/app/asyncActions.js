import { createAsyncThunk } from '@reduxjs/toolkit'
import * as apis from '../../apis'

export const getCategories = createAsyncThunk(
    'app/categories',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apis.apiGetCategories()
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    },
)

export const getProductByCategory = createAsyncThunk(
    'app/productsByCategory',
    async (category, { rejectWithValue }) => {
        try {
            const response = await apis.apiGetProductByCategory(category)
            return response.dataProduct
        } catch (error) {
            rejectWithValue(error)
        }
    },
)