import { createAsyncThunk } from '@reduxjs/toolkit'
import * as apis from '../../apis'

export const getProductByGender = createAsyncThunk(
    'product/getProductByGender',
    async ({ gender }, { rejectWithValue }) => {
        try {
            const response = await apis.apiGetProductByGender(gender);
            console.log("response: ", response.dataProduct);
            return response.dataProduct;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    },
)