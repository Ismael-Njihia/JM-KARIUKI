import {configureStore } from '@reduxjs/toolkit';
import {apiSlice} from './reducers/apiSlice';
import AuthSlice from './reducers/AuthSlice'


const store = configureStore({
    reducer:{
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: AuthSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

export default store;