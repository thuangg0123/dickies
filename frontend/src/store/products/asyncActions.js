import { createAsyncThunk } from '@reduxjs/toolkit'
import * as apis from '../../apis'

export const getProductByGender = createAsyncThunk(
    'product/getProductByGender',
    async ({ gender }, { rejectWithValue }) => {
        try {
            const response = await apis.apiGetProductByGender(gender);
            return response
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    },
)

export const getDetailProduct = createAsyncThunk(
    'product/getDetailProduct',
    async ({ productId }, { rejectWithValue }) => {
        try {
            const response = await apis.apiGetDetailProduct(productId);
            return response
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    },
)
