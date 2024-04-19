import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {
    persistStore, persistReducer, FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import appReducer from '../store/app/appSlice';
import productReducer from '../store/products/productSlice';
import userReducer from '../store/user/userSlice';

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    app: appReducer,
    product: productReducer,
    user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);
