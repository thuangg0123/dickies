import { createAsyncThunk } from '@reduxjs/toolkit'
import * as apis from '../../apis'

export const getProductByGender = createAsyncThunk(
    'product/getProductByGender',
    async ({ gender }, { rejectWithValue }) => {
        try {
            const response = await apis.apiGetProductByGender({ gender });
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

export const getProductByGenderAndCategory = createAsyncThunk(
    'app/getProductByGenderAndCategory',
    async ({ category, gender }, { rejectWithValue }) => {
        try {
            const response = await apis.apiGetProductByGenderAndCategory(gender, category);
            return response
        } catch (error) {
            rejectWithValue(error)
        }
    },
)

export const getProductParams = createAsyncThunk(
    'product/getProductParams',
    async (param, { rejectWithValue }) => {
        try {
            const response = await apis.apiGetProductByQuery(param);
            return response
        } catch (error) {
            rejectWithValue(error)
        }
    },
)

export const submitRating = createAsyncThunk(
    'product/submitRating ',
    async (data, { rejectWithValue }) => {
        try {
            const response = await apis.apiRatings(data);
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    },
)
