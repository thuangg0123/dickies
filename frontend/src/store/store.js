import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import appReducer from '../store/app/appSlice';
import productReducer from '../store/products/productSlice';

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, combineReducers({
    app: appReducer,
    product: productReducer,
}));

export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);
