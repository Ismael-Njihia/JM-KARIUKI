import {configureStore } from '@reduxjs/toolkit';
import {apiSlice} from './slices/apiSlice';
import AuthSlice from './slices/AuthSlice'


const store = configureStore({
    reducer:{
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: AuthSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

export default store;